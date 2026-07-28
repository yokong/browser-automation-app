"use client"

import { useState, useTransition } from "react"
import { PlayIcon, Loader2Icon, CheckCircleIcon, XCircleIcon } from "lucide-react"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import type { helloWorldTask } from "@/trigger/example"

import { Button } from "@/components/ui/button"
import { ResizablePanel } from "@/components/ui/resizable"
import { runWorkflowAction } from "@/features/workflows/actions"

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [runId, setRunId] = useState<string | undefined>(undefined)
  const [publicAccessToken, setPublicAccessToken] = useState<string | undefined>(undefined)

  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken: publicAccessToken,
    enabled: !!runId && !!publicAccessToken,
    skipColumns: ["payload", "output"],
  })

  const isRunning =
    !!run && run.status !== "COMPLETED" && run.status !== "FAILED" && run.status !== "CRASHED"
  const isDone = run?.status === "COMPLETED"
  const isFailed = run?.status === "FAILED" || run?.status === "CRASHED"

  const handleRun = () => {
    startTransition(async () => {
      const result = await runWorkflowAction()
      setRunId(result.runId)
      setPublicAccessToken(result.publicAccessToken)
    })
  }

  return (
    <ResizablePanel defaultSize={256} minSize={224} maxSize={576}>
      <div className="flex size-full flex-col items-center justify-center gap-3">
        <Button onClick={handleRun} disabled={isPending || isRunning}>
          {isPending || isRunning ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <PlayIcon />
          )}
          Run
        </Button>

        {runId && (
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              {isRunning ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : isDone ? (
                <CheckCircleIcon className="size-4 text-green-500" />
              ) : isFailed ? (
                <XCircleIcon className="size-4 text-red-500" />
              ) : error ? (
                <span className="text-red-500">Error: {error.message}</span>
              ) : null}
              <span className="font-medium">
                {isRunning ? run.status : isDone ? "Done" : isFailed ? "Failed" : ""}
              </span>
            </div>
            {run?.metadata && (
              <span className="text-muted-foreground">
                {String(run.metadata.status ?? "")}
              </span>
            )}
          </div>
        )}
      </div>
    </ResizablePanel>
  )
}