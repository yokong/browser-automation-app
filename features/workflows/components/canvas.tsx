"use client"

import { useCallback, useSyncExternalStore } from "react"
import {
  ReactFlow,
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  type Connection,
  ConnectionLineType,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useTheme } from "next-themes"

const emptySubscribe = () => () => {}

const initialNodes = [
  {
    id: "start",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 0 },
  },
  {
    id: "process",
    data: { label: "Process" },
    position: { x: 250, y: 150 },
  },
  {
    id: "end",
    type: "output",
    data: { label: "End" },
    position: { x: 250, y: 300 },
  },
]

const initialEdges = [
  { id: "start->process", source: "start", target: "process" },
  { id: "process->end", source: "process", target: "end" },
]

export function Canvas({ workflowId: _workflowId }: { workflowId: string }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const { resolvedTheme } = useTheme()
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  const colorMode = mounted
    ? resolvedTheme === "dark"
      ? "dark"
      : "light"
    : "light"

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode={colorMode}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { stroke: "var(--border)" },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
