import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  Highlighter,
  Link2,
  Share2,
  SkipForward,
  Sparkles,
  BookOpen,
  Info,
} from 'lucide-react';
import exampleImage from '@/assets/fcb0f671f54f276bd729484d9724d164846357ec.png';

interface Entity {
  id: string;
  text: string;
  type: 'law' | 'regulation' | 'article' | 'section';
  x: number;
  y: number;
  connections: string[];
}

interface Relationship {
  id: string;
  from: string;
  to: string;
  label: string;
}

export function LabelingStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTask, setCurrentTask] = useState(1);
  const [currentPage, setCurrentPage] = useState(7);
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: '1',
      text: 'Municipal\nLaw',
      type: 'law',
      x: 400,
      y: 200,
      connections: ['2'],
    },
    {
      id: '2',
      text: 'Regulation',
      type: 'regulation',
      x: 400,
      y: 320,
      connections: [],
    },
  ]);
  const [relationships, setRelationships] = useState<Relationship[]>([
    { id: 'r1', from: '1', to: '2', label: '1-of' },
  ]);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [highlightedText, setHighlightedText] = useState<string[]>([
    'Article 28',
    'municipality',
    'chief executive officer',
  ]);

  const totalTasks = 1;
  const totalPages = 10;

  // Draw entities and relationships on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw relationships first (so they appear behind entities)
    relationships.forEach((rel) => {
      const fromEntity = entities.find((e) => e.id === rel.from);
      const toEntity = entities.find((e) => e.id === rel.to);

      if (fromEntity && toEntity) {
        // Draw arrow line
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromEntity.x + 70, fromEntity.y + 30);
        ctx.lineTo(toEntity.x + 70, toEntity.y);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(
          toEntity.y - (fromEntity.y + 30),
          toEntity.x + 70 - (fromEntity.x + 70)
        );
        ctx.fillStyle = '#94A3B8';
        ctx.beginPath();
        ctx.moveTo(toEntity.x + 70, toEntity.y);
        ctx.lineTo(
          toEntity.x + 70 - 10 * Math.cos(angle - Math.PI / 6),
          toEntity.y - 10 * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          toEntity.x + 70 - 10 * Math.cos(angle + Math.PI / 6),
          toEntity.y - 10 * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // Draw label
        ctx.fillStyle = '#64748B';
        ctx.font = '12px sans-serif';
        const midX = (fromEntity.x + toEntity.x + 140) / 2;
        const midY = (fromEntity.y + toEntity.y + 30) / 2;
        ctx.fillText(rel.label, midX + 10, midY);
      }
    });

    // Draw entities
    entities.forEach((entity) => {
      const isSelected = selectedEntity === entity.id;
      const width = 140;
      const height = 60;

      // Entity background
      ctx.fillStyle = entity.type === 'law' ? '#4ADE80' : '#94A3B8';
      ctx.beginPath();
      ctx.roundRect(entity.x, entity.y, width, height, 8);
      ctx.fill();

      // Selection border
      if (isSelected) {
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Entity text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      const lines = entity.text.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, entity.x + width / 2, entity.y + 25 + i * 18);
      });

      // Connection points
      if (entity.connections.length > 0 || isSelected) {
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.arc(entity.x + width / 2, entity.y + height, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(entity.x + width / 2, entity.y + height, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    ctx.textAlign = 'left';
  }, [entities, relationships, selectedEntity]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((e.clientY - rect.top) * canvas.height) / rect.height;

    // Check if clicked on an entity
    const clickedEntity = entities.find(
      (entity) =>
        x >= entity.x &&
        x <= entity.x + 140 &&
        y >= entity.y &&
        y <= entity.y + 60
    );

    setSelectedEntity(clickedEntity ? clickedEntity.id : null);
  };

  const handleNextTask = () => {
    if (currentTask < totalTasks) {
      setCurrentTask(currentTask + 1);
    }
  };

  const handlePrevTask = () => {
    if (currentTask > 1) {
      setCurrentTask(currentTask - 1);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4 px-4 py-3 bg-white rounded-xl shadow-sm border border-slate-200"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevTask}
            disabled={currentTask === 1}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-900">
            Task {currentTask} of {totalTasks}
          </span>
          <button
            onClick={handleNextTask}
            disabled={currentTask === totalTasks}
            className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 text-sm text-slate-500">
          <span>09 / 17</span>
          <span className="px-2 py-1 bg-slate-100 rounded text-slate-700 font-mono text-xs">
            Task ID: d73946a5b
          </span>
          <button className="p-1.5 hover:bg-slate-100 rounded">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Left Sidebar - Article Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-5 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Chunk Header */}
          <div className="px-5 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Chunk</h3>
          </div>

          {/* Article Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div>
              <div className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-medium rounded mb-3">
                Article 28
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                The head of the municipality shall, in his capacity as the chief executive officer, take all measures necessary to ensure that the municipality performs its duties in accordance with the Law and other laws, regulations, and decisions, particularly the following:
              </p>

              <ol className="space-y-2 text-sm text-slate-700">
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">1.</span>
                  <span>Manage the municipality's revenues, funds, and expenditures; and monitor its accounts and protect its rights.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">2.</span>
                  <span>Prepare a comprehensive bi-annual report on the municipality's activities, and submit it to the municipal council.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">3.</span>
                  <span>Prepare the municipal draft budget and plans of projects to be implemented during the following fiscal year and submit the same to the municipal council.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">4.</span>
                  <span>Implement the budget.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">5.</span>
                  <span>Prepare the final accounts for the ending fiscal year and submit the same to the municipal council.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">6.</span>
                  <span>Conclude contracts.</span>
                </li>
                <li className="flex space-x-2">
                  <span className="text-red-500 font-medium flex-shrink-0">7.</span>
                  <span>Monitor projects implemented for the municipality and approve receipt thereof.</span>
                </li>
              </ol>
            </div>

            {/* Highlight Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Highlight Entities
            </motion.button>

            {/* Annotated Version */}
            <div className="pt-4 border-t border-slate-200">
              <div className="inline-block px-2 py-1 bg-green-500 text-white text-xs font-medium rounded mb-3">
                Article 28
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                The head of the municipality shall, in his capacity as the chief executive officer, take all measures necessary to ensure that the municipality performs its duties in accordance with the Law and other laws, regulations, and decisions.
              </p>

              <div className="mt-3 space-y-2">
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">1.</span>
                  <p className="text-slate-700">
                    <span className="bg-yellow-100 px-1">Manage the municipality's revenues, funds, and expenditures</span>; and <span className="bg-yellow-100 px-1">monitor its accounts and protect its rights</span>.
                  </p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">2.</span>
                  <p className="text-slate-700">
                    <span className="bg-yellow-100 px-1">Prepare a comprehensive bi-annual report on the municipality's activities</span>, and submit it to the municipal council.
                  </p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">3.</span>
                  <p className="text-slate-700">
                    Prepare the municipal draft budget and plans of projects to be implemented during the following fiscal year and submit the same to the municipal council.
                  </p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">4.</span>
                  <p className="text-slate-700">Implement the budget.</p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">5.</span>
                  <p className="text-slate-700">
                    Prepare the final accounts for the ending fiscal year and submit the same to the municipal council.
                  </p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">6.</span>
                  <p className="text-slate-700">Conclude contracts.</p>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-500 flex-shrink-0">7.</span>
                  <p className="text-slate-700">
                    <span className="bg-yellow-100 px-1">Monitor projects implemented for the municipality</span> and approve receipt thereof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Document & Graph */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-7 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Instructions Panel */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-5 h-5 bg-slate-300 rounded flex items-center justify-center">
                  <Info className="w-3 h-3 text-slate-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">
                  Entity-Relationship Graph <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Establish the ent-relationship tree for the laws.
                </p>
                <p className="text-xs text-slate-500 mt-1">2 entities • 1 relationship</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <button className="p-1.5 hover:bg-slate-200 rounded">
                  <Share2 className="w-4 h-4 text-slate-600" />
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Add Entity</span>
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Area with Document Preview */}
          <div className="flex-1 relative overflow-hidden">
            {/* Document Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full max-w-2xl">
                {/* Document Preview */}
                <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={exampleImage}
                    alt="Document page"
                    className="w-full h-auto opacity-90"
                  />
                </div>

                {/* Graph Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    className="w-full h-full pointer-events-auto cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Page Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm text-white text-sm rounded-lg font-medium">
              Page {currentPage} / {totalPages}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Instructions</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1"
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Submit
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
