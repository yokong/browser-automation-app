"use client"

import { useCallback, useTransition } from "react"

import type { Workflow } from "@/lib/db/schema"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import { PlusIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function WorkflowNav({
  workflows,
  createWorkflowAction,
}: {
  workflows: Workflow[]
  createWorkflowAction: (name: string) => Promise<void>
}) {
  const [isPending, startTransition] = useTransition()
  const { state } = useSidebar()

  const handleCreate = useCallback(() => {
    startTransition(() => {
      createWorkflowAction(generateSlug())
    })
  }, [createWorkflowAction])

  if (state === "expanded") {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Workflows</SidebarGroupLabel>
        <SidebarGroupAction
          title="New workflow"
          onClick={handleCreate}
          disabled={isPending}
        >
          <PlusIcon />
          <span className="sr-only">New workflow</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {workflows.map((workflow) => (
              <SidebarMenuItem key={workflow.id}>
                <SidebarMenuButton>
                  <span>{workflow.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <Popover>
        <SidebarMenu>
          <SidebarMenuItem>
            <PopoverTrigger asChild>
              <SidebarMenuButton tooltip="Workflows">
                <WorkflowIcon />
              </SidebarMenuButton>
            </PopoverTrigger>
          </SidebarMenuItem>
        </SidebarMenu>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={8}
          className="w-56 p-2"
        >
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-medium text-muted-foreground">
              Workflows
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="New workflow"
              onClick={handleCreate}
              disabled={isPending}
            >
              <PlusIcon />
            </Button>
          </div>
          <div className="flex flex-col gap-0.5">
            {workflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant="ghost"
                className="h-8 w-full justify-start px-2 text-sm font-normal"
              >
                {workflow.name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </SidebarGroup>
  )
}