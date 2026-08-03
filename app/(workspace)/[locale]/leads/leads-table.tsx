"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns, Lead } from "./columns"

interface LeadsTableProps {
  data: Lead[]
}

export function LeadsTable({ data }: LeadsTableProps) {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="email" 
      searchPlaceholder="Search leads by email..." 
    />
  )
}
