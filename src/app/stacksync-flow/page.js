'use client'

import ReactFlow, { applyNodeChanges, Background, Controls,
  useEdgesState, addEdge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useCallback } from 'react';
import FloatingEdge from '../components/FloatingEdge';
import CustomNode from '../components/CustomNode';
import CustomConnectionLine from '../components/CustomConnectionLine';

// -------------- NODE AND EDGE DEFINITIONS -------------- \\

const edgeTypes = {
  floating: FloatingEdge,
};
const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'custom',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    type: 'custom',
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};



const Stacksync_flow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const exportAsJson = () => {
    const flowData = {
      nodes: nodes,
      edges: edges,
    };
    const jsonData = JSON.stringify(flowData);
    console.log(jsonData);

    //download jsonData as a file
    const element = document.createElement('a');
    const file = new Blob([jsonData], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'flow.json';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  
  function addNode() {  
    const newNode = {
      id: (nodes.length + 1).toString(),
      position: { x: 100, y: 300 },
      type:'custom'
    };
    setNodes((nodes) => nodes.concat(newNode));
  }

  return (
    <div style={{width:'100vw', height:'100vh'}}>
      <div className="buttons-container">
        <button className='styled-button' onClick={addNode}>Add Node</button>
        <button className='styled-button' onClick={exportAsJson}>Export</button>
      </div>

      <ReactFlow 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        connectionLineComponent={CustomConnectionLine}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};


export default Stacksync_flow;