import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database,
  Wand2,
  Image,
  FileText,
  Music,
  Video,
  Sliders,
  Play,
  CheckCircle,
  Copy,
  RotateCw,
  Zap,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react';

type DataType = 'image' | 'text' | 'audio' | 'video';
type GenerationStatus = 'idle' | 'generating' | 'completed';

interface GeneratedSample {
  id: string;
  type: DataType;
  preview: string;
  metadata: string;
}

export function DatasetGeneration() {
  const [selectedType, setSelectedType] = useState<DataType>('image');
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [config, setConfig] = useState({
    samples: 1000,
    augmentation: true,
    validation_split: 0.2,
    quality: 'high',
  });

  const [generatedSamples] = useState<GeneratedSample[]>([
    {
      id: '1',
      type: 'image',
      preview: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=400',
      metadata: 'vehicle_001.jpg • 1920x1080 • Augmented',
    },
    {
      id: '2',
      type: 'image',
      preview: 'https://images.unsplash.com/photo-1617049037028-d4746ed5e6bc?w=400',
      metadata: 'vehicle_002.jpg • 1920x1080 • Augmented',
    },
    {
      id: '3',
      type: 'image',
      preview: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=400',
      metadata: 'vehicle_003.jpg • 1920x1080 • Original',
    },
    {
      id: '4',
      type: 'image',
      preview: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=400',
      metadata: 'vehicle_004.jpg • 1920x1080 • Augmented',
    },
  ]);

  const dataTypes = [
    { id: 'image' as DataType, name: 'Images', icon: Image, color: 'from-blue-500 to-blue-600' },
    { id: 'text' as DataType, name: 'Text', icon: FileText, color: 'from-green-500 to-green-600' },
    { id: 'audio' as DataType, name: 'Audio', icon: Music, color: 'from-purple-500 to-purple-600' },
    { id: 'video' as DataType, name: 'Video', icon: Video, color: 'from-pink-500 to-pink-600' },
  ];

  const augmentations = [
    { name: 'Rotation', enabled: true },
    { name: 'Flip & Mirror', enabled: true },
    { name: 'Color Adjustment', enabled: true },
    { name: 'Crop & Scale', enabled: true },
    { name: 'Noise Injection', enabled: false },
    { name: 'Blur & Sharpen', enabled: false },
  ];

  const handleGenerate = () => {
    setGenerationStatus('generating');
    setTimeout(() => {
      setGenerationStatus('completed');
      setTimeout(() => setGenerationStatus('idle'), 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        <div className="space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Dataset Generation</h1>
              <p className="text-slate-600">
                Generate synthetic datasets with advanced augmentation and quality validation
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl"
            >
              <Wand2 className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Data Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-4">Select Data Type</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {dataTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} inline-block mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-slate-900">{type.name}</div>
                    {isSelected && (
                      <motion.div
                        layoutId="selected-type"
                        className="absolute top-3 right-3"
                      >
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-6"
            >
              <div className="flex items-center space-x-3">
                <Sliders className="w-5 h-5 text-slate-600" />
                <h2 className="text-xl font-bold text-slate-900">Generation Configuration</h2>
              </div>

              {/* Number of Samples */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Samples
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={config.samples}
                    onChange={(e) => setConfig({ ...config, samples: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="text-lg font-bold text-indigo-600 min-w-[100px] text-right">
                    {config.samples.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quality Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['standard', 'high', 'ultra'].map((quality) => (
                    <motion.button
                      key={quality}
                      onClick={() => setConfig({ ...config, quality })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg border-2 transition-all capitalize ${
                        config.quality === quality
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {quality}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Validation Split */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Validation Split: {(config.validation_split * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={config.validation_split}
                  onChange={(e) => setConfig({ ...config, validation_split: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Augmentation Options */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    Augmentation Techniques
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={config.augmentation}
                      onChange={(e) => setConfig({ ...config, augmentation: e.target.checked })}
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className="text-sm text-slate-600">Enable All</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {augmentations.map((aug) => (
                    <div
                      key={aug.name}
                      className={`flex items-center space-x-2 p-3 rounded-lg border ${
                        aug.enabled && config.augmentation
                          ? 'border-indigo-200 bg-indigo-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={aug.enabled && config.augmentation}
                        disabled={!config.augmentation}
                        className="w-4 h-4 rounded accent-indigo-600"
                        readOnly
                      />
                      <span className="text-sm text-slate-700">{aug.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={generationStatus === 'generating'}
                whileHover={{ scale: generationStatus === 'generating' ? 1 : 1.02 }}
                whileTap={{ scale: generationStatus === 'generating' ? 1 : 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generationStatus === 'generating' ? (
                  <>
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>Generating Dataset...</span>
                  </>
                ) : generationStatus === 'completed' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Generation Complete!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Dataset</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4">Estimated Output</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-slate-600">Training Samples</span>
                    <span className="font-bold text-slate-900">
                      {Math.floor(config.samples * (1 - config.validation_split)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-slate-600">Validation Samples</span>
                    <span className="font-bold text-slate-900">
                      {Math.floor(config.samples * config.validation_split).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-slate-600">Total Size (est.)</span>
                    <span className="font-bold text-slate-900">
                      {(config.samples * 2.5 / 1024).toFixed(1)} GB
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm text-slate-600">Processing Time</span>
                    <span className="font-bold text-slate-900">
                      ~{Math.ceil(config.samples / 200)} min
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white"
              >
                <Zap className="w-8 h-8 mb-3" />
                <h3 className="font-bold mb-2">Pro Tip</h3>
                <p className="text-sm text-white/90">
                  Enable augmentation to increase dataset diversity and improve model generalization.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-slate-600" />
                <h2 className="text-xl font-bold text-slate-900">Generated Samples Preview</h2>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {generatedSamples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={sample.preview}
                      alt={`Sample ${sample.id}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-slate-600">{sample.metadata}</p>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                      <Copy className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
