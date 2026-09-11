import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

const nodes = [
  { id: 'a', position: { x: 50, y: 100 }, data: { label: 'Image Source' }, style: { background: '#0f172a', color: '#fff', borderColor: '#22d3ee' } },
  { id: 'b', position: { x: 260, y: 100 }, data: { label: 'Preprocess' }, style: { background: '#0f172a', color: '#fff', borderColor: '#38bdf8' } },
  { id: 'c', position: { x: 470, y: 100 }, data: { label: 'Inference' }, style: { background: '#0f172a', color: '#fff', borderColor: '#a78bfa' } },
  { id: 'd', position: { x: 680, y: 100 }, data: { label: 'Trust Check' }, style: { background: '#0f172a', color: '#fff', borderColor: '#34d399' } },
];

const edges = [
  { id: 'e1', source: 'a', target: 'b', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e2', source: 'b', target: 'c', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
  { id: 'e3', source: 'c', target: 'd', markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
];

export default function VisualPipeline() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Pipeline view</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Visual Pipeline</h1>
      </div>

      <div className="soft-panel h-[500px]">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#475569" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
