import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

type Params = Promise<{ id: string }>

export default async function WorkflowPage({ params }: { params: Params }) {
  const { id } = await params
  return <WorkflowShell workflowId={id} />
}
