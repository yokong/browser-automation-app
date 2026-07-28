"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Canvas } from "./canvas"
import { RightSidebar } from "./right-sidebar"

export function WorkflowShell({ workflowId }: { workflowId: string }) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel defaultSize={480} minSize={480}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel minSize={288}>
            <Canvas workflowId={workflowId} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={128} minSize={96}>
            <div className="flex size-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Logs</p>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <RightSidebar />
    </ResizablePanelGroup>
  )
}
