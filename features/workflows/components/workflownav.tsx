"use client"

import { PlusIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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

const dummyWorkflows = [
  { id: "1", name: "Login flow" },
  { id: "2", name: "Checkout journey" },
  { id: "3", name: "Onboarding wizard" },
  { id: "4", name: "Data extraction" },
  { id: "5", name: "Form filler" },
]

export function WorkflowNav() {
  const { state } = useSidebar()

  if (state === "expanded") {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Workflows</SidebarGroupLabel>
        <SidebarGroupAction title="New workflow">
          <PlusIcon />
          <span className="sr-only">New workflow</span>
        </SidebarGroupAction>
        <SidebarGroupContent>
          <SidebarMenu>
            {dummyWorkflows.map((workflow) => (
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
            <Button variant="ghost" size="icon-sm" aria-label="New workflow">
              <PlusIcon />
            </Button>
          </div>
          <div className="flex flex-col gap-0.5">
            {dummyWorkflows.map((workflow) => (
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