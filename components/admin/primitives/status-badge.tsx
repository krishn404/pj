import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function StatusBadge({
  status,
  visible,
}: {
  status: "draft" | "published"
  visible: boolean
}) {
  return (
    <div className="flex flex-wrap gap-1">
      <Badge
        variant={status === "published" ? "default" : "secondary"}
        className={cn(
          "text-[10px] uppercase",
          status === "published" ? "bg-emerald-600/90 hover:bg-emerald-600" : ""
        )}
      >
        {status}
      </Badge>
      {!visible && (
        <Badge variant="outline" className="text-[10px] uppercase">
          hidden
        </Badge>
      )}
    </div>
  )
}
