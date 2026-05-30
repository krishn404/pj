"use client"

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { useEffect, useState } from "react"
import { reorderItems } from "@/lib/cms/admin/actions/reorder"
import { toast } from "sonner"

export function SortableItemHandle({ id }: { id: string }) {
  const { attributes, listeners, setActivatorNodeRef } = useSortable({ id })
  return (
    <button
      type="button"
      ref={setActivatorNodeRef}
      className="cursor-grab touch-none p-1 text-muted-foreground hover:text-foreground"
      aria-label="Drag to reorder"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  )
}

function SortableRow({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}

export function AdminSortableList<T extends { id: string }>({
  items: initialItems,
  table,
  onReordered,
  renderItem,
}: {
  items: T[]
  table:
    | "projects"
    | "showreel_videos"
    | "services"
    | "experience_entries"
    | "skill_categories"
    | "experimental_items"
    | "social_links"
    | "testimonials"
    | "company_logos"
  onReordered?: () => void
  renderItem: (item: T, handle: React.ReactNode) => React.ReactNode
}) {
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    setItems(initialItems)
  }, [initialItems])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    const next = arrayMove(items, oldIndex, newIndex)
    setItems(next)

    const result = await reorderItems({
      table: table as never,
      orderedIds: next.map((i) => i.id),
    })

    if (!result.success) {
      toast.error(result.error)
      setItems(initialItems)
      return
    }
    toast.success("Order saved")
    onReordered?.()
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableRow key={item.id} id={item.id}>
              {renderItem(item, <SortableItemHandle id={item.id} />)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
