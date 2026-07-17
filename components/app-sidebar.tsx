"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { PanelLeftIcon, PlusIcon, WorkflowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

const dummyWorkflows = [
  { id: "1", name: "Login flow" },
  { id: "2", name: "Checkout journey" },
  { id: "3", name: "Onboarding wizard" },
  { id: "4", name: "Data extraction" },
  { id: "5", name: "Form filler" },
]

export function AppSidebar() {
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
        <OrganizationSwitcher
          appearance={{
            elements: {
              rootBox: "min-w-0 group-data-[collapsible=icon]:!hidden",
              organizationSwitcherTrigger: "w-full justify-between",
            },
          }}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <PanelLeftIcon />
        </Button>
      </SidebarHeader>
      <SidebarContent>
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
                    <WorkflowIcon className="mr-2" />
                    <span>{workflow.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="items-center">
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]:justify-center",
              userButtonOuterIdentifier:
                "group-data-[collapsible=icon]:!hidden",
              rootBox: "w-full",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
