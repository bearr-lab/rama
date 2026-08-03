"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, MessageCircle, Sparkles, User, ExternalLink } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

export type Lead = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  ai_intent_score: string
  status: string
  ai_notes: string | null
  created_at: string
}

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead" />
    ),
    cell: ({ row }) => {
      const lead = row.original
      const initials = `${lead.first_name[0] || ""}${lead.last_name[0] || ""}`.toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center border border-ink bg-ink text-surface shadow-sm">
            <span className="font-display text-xs font-semibold tracking-wider">{initials}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-medium text-ink">
              {lead.first_name} {lead.last_name}
            </span>
          </div>
        </div>
      )
    },
    // We want to be able to filter by both first and last name, so we'll need a custom filter fn, 
    // but default uses accessorKey. Let's just use email for search in the wrapper for simplicity for now.
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => {
      const lead = row.original
      return (
        <div className="flex flex-col gap-1 text-xs">
          <span className="font-medium text-ink">{lead.email}</span>
          {lead.phone && (
            <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
              {lead.phone}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "ai_intent_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Intent" />
    ),
    cell: ({ row }) => {
      const intent = row.getValue("ai_intent_score") as string
      const isHigh = intent === "high" || intent === "urgent"
      return (
        <Badge
          variant="outline"
          // eslint-disable-next-line tailwindcss/classnames-order
          className="gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink"
        >
          <span className={`size-1.5 shrink-0 ${isHigh ? 'bg-amber-500' : 'bg-border'}`} />
          {intent}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant="outline"
          // eslint-disable-next-line tailwindcss/classnames-order
          className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("created_at") as string
      const date = new Date(dateStr)
      return (
        <span className="text-xs text-muted-foreground">
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const lead = row.original
      const [sheetOpen, setSheetOpen] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="size-8 p-0" />}>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSheetOpen(true)}>
                  <ExternalLink className="mr-2 size-4" />
                  View Details
                </DropdownMenuItem>
                {lead.phone && (
                  <DropdownMenuItem render={<Link
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello ${lead.first_name}, I'm reaching out from RAMA Real Estate regarding your recent inquiry.`
                      )}`}
                      target="_blank"
                    />}>
                    <MessageCircle className="mr-2 size-4 text-[#25D366]" />
                    WhatsApp Client
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CRM Slide-over Panel */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent className="w-full overflow-y-auto bg-surface-subtle sm:max-w-xl sm:p-0">
              <div className="flex h-full flex-col">
                <div className="border-b border-border/60 bg-surface p-6">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center border border-border bg-surface shadow-sm">
                      <User className="size-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-medium tracking-tight text-ink">
                        {lead.first_name} {lead.last_name}
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{lead.email}</span>
                        {lead.phone && (
                          <>
                            <span>·</span>
                            <span>{lead.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 flex gap-2">
                    <Badge variant={lead.ai_intent_score === 'high' || lead.ai_intent_score === 'urgent' ? "accent" : "neutral"}>
                      {lead.ai_intent_score.toUpperCase()} INTENT
                    </Badge>
                    <Badge variant="neutral">{lead.status.toUpperCase()}</Badge>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    {lead.phone && (
                      <Link
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${lead.first_name}, I'm reaching out from RAMA Real Estate regarding your recent inquiry.`
                        )}`}
                        target="_blank"
                        className="w-full"
                      >
                        <Button variant="primary" className="shadow-resting w-full justify-center">
                          <MessageCircle className="mr-2 size-4 text-[#25D366]" />
                          WhatsApp Client
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" className="w-full justify-center bg-surface">
                      Update Status
                    </Button>
                  </div>
                </div>

                <div className="flex-1 bg-surface-subtle p-6">
                  <div className="border border-border/60 bg-surface shadow-sm">
                    <div className="border-b border-border/60 bg-canvas/50 px-5 py-3">
                      <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-fjord uppercase">
                        <Sparkles className="size-3.5" />
                        AI Concierge Notes
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed font-light whitespace-pre-wrap text-muted-foreground">
                        {lead.ai_notes || "No conversation context provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      )
    },
  },
]
