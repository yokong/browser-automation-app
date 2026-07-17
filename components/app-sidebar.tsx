"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { PanelLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflownav"

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
        <WorkflowNav />
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
