import { auth } from "@clerk/nextjs/server"
import { AppSidebar } from "@/components/app-sidebar"
import { createWorkflowAction } from "@/features/workflows/actions"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { listWorkflows } from "@/features/workflows/data"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <SidebarProvider className="h-svh">
      <AppSidebar workflows={workflows} createWorkflowAction={createWorkflowAction} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}