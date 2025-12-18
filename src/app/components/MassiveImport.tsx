import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Play,
  Database,
  FolderOpen,
  Plus,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

interface Node {
  id: string;
  type: 's3-connector' | 'collection';
  label: string;
  sublabel: string;
  x: number; // percentage-based position
  y: number; // percentage-based position
  connections: string[];
}

export function MassiveImport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'node-1',
      type: 's3-connector',
      label: 'S3 Connector 1',
      sublabel: 's3 connector',
      x: 10, // percentage
      y: 45, // percentage
      connections: ['node-2'],
    },
    {
      id: 'node-2',
      type: 'collection',
      label: 'students',
      sublabel: 'collection',
      x: 42, // percentage
      y: 15, // percentage
      connections: ['node-3'],
    },
    {
      id: 'node-3',
      type: 'collection',
      label: 'student_hackathon',
      sublabel: 'collection',
      x: 72, // percentage
      y: 45, // percentage
      connections: [],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>('node-3');
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [configForm, setConfigForm] = useState({
    name: 'student_hackathon',
    collection: 'student_hackathon',
    classificationInstructions: '',
    editMetadata: true,
  });

  const [isDraggingComponent, setIsDraggingComponent] = useState<'s3-connector' | 'collection' | null>(null);

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !containerRef.current) return;

    setSelectedNode(nodeId);
    setDraggedNode(nodeId);

    const rect = containerRef.current.getBoundingClientRect();
    const nodeX = (node.x / 100) * rect.width;
    const nodeY = (node.y / 100) * rect.height;

    setDragOffset({
      x: e.clientX - nodeX - rect.left,
      y: e.clientY - nodeY - rect.top,
    });

    // Update config form
    setConfigForm({
      name: node.label,
      collection: node.label,
      classificationInstructions: '',
      editMetadata: true,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === draggedNode
          ? { ...node, x: Math.max(0, Math.min(92, x)), y: Math.max(0, Math.min(88, y)) } // clamp to container
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const handleDragStart = (type: 's3-connector' | 'collection') => {
    setIsDraggingComponent(type);
  };

  const handleContainerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggingComponent || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - 70) / rect.width) * 100; // 70px offset for center
    const y = ((e.clientY - rect.top - 40) / rect.height) * 100; // 40px offset for center

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: isDraggingComponent,
      label: isDraggingComponent === 's3-connector' ? `S3 Connector ${nodes.length + 1}` : `collection_${nodes.length + 1}`,
      sublabel: isDraggingComponent === 's3-connector' ? 's3 connector' : 'collection',
      x: Math.max(0, Math.min(92, x)),
      y: Math.max(0, Math.min(88, y)),
      connections: [],
    };

    setNodes([...nodes, newNode]);
    setIsDraggingComponent(null);
  };

  const getConnectionPath = (fromNode: Node, toNode: Node) => {
    const fromX = fromNode.x + 12; // adjust for node width (140px = ~12%)
    const fromY = fromNode.y + 6; // adjust for node height center (80px = ~6%)
    const toX = toNode.x;
    const toY = toNode.y + 6;
    return { fromX, fromY, toX, toY };
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 pt-8">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-slate-900">Massive Upload</h2>
              <span className="text-slate-400">-</span>
              <span className="text-slate-600">university</span>
            </div>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-sm">Project</span>
              <span className="text-slate-400">-</span>
              <span className="text-slate-600 text-sm">university</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center space-x-2 shadow-sm hover:shadow-md"
          >
            <Play className="w-4 h-4" />
            <span>Run Pipeline</span>
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Components */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Components</h3>
            </div>

            <div className="p-4 space-y-3">
              <motion.div
                draggable
                onDragStart={() => handleDragStart('s3-connector')}
                whileHover={{ scale: 1.02, y: -2 }}
                className="px-4 py-3.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl cursor-move flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">S3 Connector</span>
              </motion.div>

              <motion.div
                draggable
                onDragStart={() => handleDragStart('collection')}
                whileHover={{ scale: 1.02, y: -2 }}
                className="px-4 py-3.5 bg-gradient-to-r from-teal-300 to-teal-400 text-slate-900 rounded-xl cursor-move flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Collection</span>
              </motion.div>
            </div>

            <div className="mt-4 px-5 py-4 border-t border-slate-100">
              <h4 className="font-semibold text-slate-900 text-sm mb-3">Instructions</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Drag components onto canvas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Click nodes to configure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Drag from Object to connect</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-500 mr-2">•</span>
                  <span>Each node has 1 output</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Canvas Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-7 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden relative min-h-[700px]"
          >
            {/* Canvas Toolbar */}
            <div className="absolute top-6 left-6 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-slate-200 p-1.5 z-10">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Plus className="w-4 h-4 text-slate-700" />
              </button>
              <div className="w-px h-4 bg-slate-300" />
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ZoomIn className="w-4 h-4 text-slate-700" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ZoomOut className="w-4 h-4 text-slate-700" />
              </button>
              <div className="w-px h-4 bg-slate-300" />
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Maximize2 className="w-4 h-4 text-slate-700" />
              </button>
            </div>

            {/* Node Canvas */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleContainerDrop}
              className="flex-1 relative p-6 cursor-default"
              style={{ background: 'linear-gradient(to bottom right, #F8FAFC, #F1F5F9)' }}
            >
              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node) =>
                  node.connections.map((targetId) => {
                    const targetNode = nodes.find((n) => n.id === targetId);
                    if (!targetNode) return null;
                    const { fromX, fromY, toX, toY } = getConnectionPath(node, targetNode);
                    return (
                      <g key={`${node.id}-${targetId}`}>
                        <line
                          x1={`${fromX}%`}
                          y1={`${fromY}%`}
                          x2={`${toX}%`}
                          y2={`${toY}%`}
                          stroke="#CBD5E1"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        <polygon // arrow
                          points={`${toX},${toY} ${toX - 0.8},${toY - 0.5} ${toX - 0.8},${toY + 0.5}`}
                          fill="#CBD5E1"
                        />
                      </g>
                    );
                  })
                )}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  className={`absolute w-[140px] h-[80px] rounded-xl cursor-move select-none flex items-center px-4 space-x-3 shadow-lg transition-all ${
                    node.type === 's3-connector'
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                      : 'bg-gradient-to-r from-teal-300 to-teal-400'
                  } ${
                    selectedNode === node.id
                      ? 'ring-3 ring-slate-900'
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center">
                    {node.type === 's3-connector' ? (
                      <Database className="w-5 h-5 text-orange-600" />
                    ) : (
                      <FolderOpen className="w-5 h-5 text-teal-700" />
                    )}
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate">
                      {node.label}
                    </h4>
                    <p className="text-xs text-slate-600 truncate">
                      {node.sublabel}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mini Map */}
            <div className="absolute bottom-6 right-6 w-52 h-36 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="w-full h-full bg-slate-50 p-4 flex items-center justify-center">
                <div className="space-y-3 scale-[0.4] origin-center">
                  {nodes.map((node) => (
                    <div
                      key={node.id}
                      className={`w-[140px] h-[80px] rounded-xl ${
                        node.type === 's3-connector' ? 'bg-orange-400' : 'bg-teal-300'
                      }`}
                      style={{
                        position: 'absolute',
                        left: `${node.x * 0.4}%`,
                        top: `${node.y * 0.4}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Configure Node */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden max-h-[700px]"
          >
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Configure Node</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={configForm.name}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Collection (Catalog)
                </label>
                <select
                  value={configForm.collection}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, collection: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                >
                  <option value="student_hackathon">student_hackathon</option>
                  <option value="students">students</option>
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Select the target collection from your project
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Classification Instructions
                </label>
                <textarea
                  value={configForm.classificationInstructions}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      classificationInstructions: e.target.value,
                    })
                  }
                  placeholder="If required, give highest score to, we can proceed by hackathon..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-shadow"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Instructions for AI to classify documents belonging to this collection
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  F-edit All Metadata
                </label>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-sm text-slate-600">
                    Autopopulate metadata from all collections
                  </span>
                  <button
                    onClick={() =>
                      setConfigForm({
                        ...configForm,
                        editMetadata: !configForm.editMetadata,
                      })
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      configForm.editMetadata ? 'bg-indigo-500' : 'bg-slate-300'
                    }`}
                  >
                    <motion.div
                      layout
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{
                        left: configForm.editMetadata ? '24px' : '4px',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}