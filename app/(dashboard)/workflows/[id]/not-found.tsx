import { FileXIcon } from "lucide-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { notFound } from "next/navigation"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <FileXIcon className="size-6" />
          </EmptyMedia>
          <EmptyTitle>Workflow not found</EmptyTitle>
          <EmptyDescription>
            The workflow you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
