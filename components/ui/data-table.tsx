"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey = "email",
  searchPlaceholder = "Filter...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const exportToCSV = () => {
    const rows = table.getFilteredRowModel().rows
    const headers = columns
      .filter((col) => col.id !== "actions" && "accessorKey" in col)
      .map((col) => (col as { accessorKey?: string }).accessorKey as string)

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        headers
          .map((header) => {
            const val = row.getValue(header)
            // Handle quotes and commas
            const strVal = typeof val === "string" ? val : String(val ?? "")
            return `"${strVal.replace(/"/g, '""')}"`
          })
          .join(",")
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "leads_export.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    const rows = table.getFilteredRowModel().rows
    const headers = columns
      .filter((col) => col.id !== "actions" && "accessorKey" in col)
      .map((col) => (col as { accessorKey?: string }).accessorKey as string)

    const tableData = rows.map((row) =>
      headers.map((header) => {
        const val = row.getValue(header)
        return typeof val === "string" ? val : String(val ?? "")
      })
    )

    // Capitalize headers
    const formattedHeaders = headers.map(
      (h) => h.charAt(0).toUpperCase() + h.slice(1).replace(/_/g, " ")
    )

    autoTable(doc, {
      head: [formattedHeaders],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 8, font: "helvetica" },
      headStyles: { fillColor: [30, 41, 59] }, // slate-800
    })

    doc.save("leads_export.pdf")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm shadow-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" className="shadow-sm" />}>
            <Download className="mr-2 size-4" />
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={exportToCSV}>
                <FileSpreadsheet className="mr-2 size-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="mr-2 size-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden border-y border-border/60 bg-surface shadow-sm">
        <Table>
          <TableHeader className="bg-surface-subtle">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-surface-subtle/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
