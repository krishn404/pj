"use client"

import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/admin/primitives/status-badge"
import { AdminSortableList } from "@/components/admin/primitives/sortable-list"
import { DeleteConfirmationDialog } from "@/components/admin/primitives/delete-dialog"

type Item = {
  id: string
  title: string
  status: "draft" | "published"
  isVisible: boolean
}

export function EntityList({
  title,
  description,
  newHref,
  items,
  table,
  onDelete,
  editBasePath,
}: {
  title: string
  description?: string
  newHref: string
  items: Item[]
  table: Parameters<typeof AdminSortableList>[0]["table"]
  onDelete: (id: string) => Promise<{ success: boolean }>
  /** e.g. `/admin/work/` — item id is appended */
  editBasePath: string
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button asChild size="sm">
          <Link href={newHref}>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Link>
        </Button>
      </div>
      <AdminSortableList
        items={items}
        table={table}
        renderItem={(item, handle) => (
          <div className="flex items-center gap-3 rounded-lg border admin-panel border-border bg-secondary/50 px-3 py-3">
            {handle}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
              <StatusBadge status={item.status} visible={item.isVisible} />
            </div>
            <Button asChild variant="ghost" size="icon">
              <Link href={`${editBasePath}${item.id}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <DeleteConfirmationDialog
              title="Delete item?"
              description="This cannot be undone."
              onConfirm={() => onDelete(item.id)}
              trigger={
                <Button type="button" variant="ghost" size="sm" className="text-destructive">
                  Delete
                </Button>
              }
            />
          </div>
        )}
      />
    </div>
  )
}
