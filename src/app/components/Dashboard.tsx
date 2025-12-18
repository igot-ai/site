import { motion } from 'motion/react';
import { Upload, Database, Tag, TrendingUp, Users, Clock, CheckCircle, ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Total Datasets', value: '2,847', change: '+12%', icon: Database, color: 'from-blue-500 to-blue-600' },
    { label: 'Labels Created', value: '1.2M', change: '+23%', icon: Tag, color: 'from-indigo-500 to-indigo-600' },
    { label: 'Active Users', value: '156', change: '+8%', icon: Users, color: 'from-purple-500 to-purple-600' },
    { label: 'Completion Rate', value: '94.2%', change: '+5%', icon: TrendingUp, color: 'from-pink-500 to-pink-600' },
  ];

  const recentActivity = [
    { action: 'Dataset imported', name: 'vehicle_detection_v2.zip', time: '5 min ago', status: 'completed' },
    { action: 'Labeling completed', name: 'medical_images_batch_3', time: '12 min ago', status: 'completed' },
    { action: 'Dataset generated', name: 'text_classification_v4', time: '1 hour ago', status: 'completed' },
    { action: 'Import in progress', name: 's3://ml-datasets/new_batch', time: '2 hours ago', status: 'processing' },
  ];

  const workflows = [
    {
      id: 'import',
      title: 'Massive Import',
      description: 'Import large datasets from S3, GCS, or local storage with parallel processing',
      icon: Upload,
      gradient: 'from-blue-600 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMHN0b3JhZ2V8ZW58MXx8fHwxNzY2MDMzMDE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'generation',
      title: 'Dataset Generation',
      description: 'Generate synthetic datasets at scale with advanced augmentation and validation',
      icon: Database,
      gradient: 'from-indigo-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBkYXRhc2V0fGVufDF8fHx8MTc2NjAzMzAxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'studio',
      title: 'Labeling Studio',
      description: 'Professional annotation tools for images, text, video, and audio with ML-assisted labeling',
      icon: Tag,
      gradient: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1617049037028-d4746ed5e6bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2MDA0MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const floatingCards = [
    {
      image: 'https://images.unsplash.com/photo-1758685848521-ff7e4d136384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc2NpZW50aXN0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2MDM0MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Sarah Chen',
      role: 'ML Engineer, US',
      color: 'from-green-500 to-emerald-600',
      delay: 0,
    },
    {
      image: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNoaW5lJTIwbGVhcm5pbmclMjBlbmdpbmVlcnxlbnwxfHx8fDE3NjU5NzA1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: '700K+',
      role: 'Datasets Processed',
      color: 'from-orange-500 to-red-600',
      delay: 0.2,
    },
    {
      image: 'https://images.unsplash.com/photo-1761311984472-fb2e35f645d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHJlc2VhcmNoZXIlMjB3b3JraW5nfGVufDF8fHx8MTc2NjAzNDMwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Marcus Lee',
      role: 'Data Scientist, SG',
      color: 'from-blue-500 to-indigo-600',
      delay: 0.4,
    },
    {
      label: '50',
      sublabel: 'Countries',
      color: 'from-purple-500 to-pink-600',
      delay: 0.1,
    },
    {
      image: 'https://images.unsplash.com/photo-1573497620166-aef748c8c792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTk2MTI2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Alex Rivera',
      role: 'Coding Expert, MX',
      color: 'from-teal-500 to-cyan-600',
      delay: 0.3,
    },
    {
      label: '$500M+',
      sublabel: 'Paid to experts',
      color: 'from-blue-600 to-sky-500',
      delay: 0.5,
    },
    {
      image: 'https://images.unsplash.com/photo-1635768229592-8c2532d33cb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwd29ya2luZ3xlbnwxfHx8fDE3NjYwMzQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Emma Watson',
      role: 'Data Annotator, UK',
      color: 'from-pink-500 to-rose-600',
      delay: 0.6,
    },
    {
      label: '4.1/5',
      sublabel: 'Rated by 3K+ experts',
      color: 'from-green-600 to-emerald-700',
      delay: 0.15,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Full Width Outlier.ai Style Hero Section */}
      <div className="relative -mx-0 overflow-hidden">
        {/* Soft Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
            opacity: 0.15,
          }}
        />
        
        {/* Subtle Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 px-6 lg:px-12 py-24 max-w-[1920px] mx-auto">
          <div className="max-w-7xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full text-slate-700 mb-8 shadow-sm"
            >
              <Shield className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium">Enterprise-Grade On-Premise Solution</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Scale Your ML Operations
              <br />
              <span className="text-indigo-600">Without Limits</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Enterprise data labeling platform designed for on-premise deployment. Process millions
              of data points with complete control, security, and scalability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-white/60 backdrop-blur-sm border border-slate-200 text-slate-900 rounded-lg font-medium hover:bg-white/80 transition-all"
              >
                View Demo
              </motion.button>
            </motion.div>

            {/* Floating Cards Grid */}
            <div className="relative h-80 max-w-6xl mx-auto mb-16">
              {/* Left Side Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute left-0 top-8 w-48 h-56 rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={floatingCards[0].image}
                  alt={floatingCards[0].name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r ${floatingCards[0].color}`}>
                  <div className="text-white font-semibold">{floatingCards[0].name}</div>
                  <div className="text-white/90 text-sm">{floatingCards[0].role}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute left-52 top-32 w-40 h-44 rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={floatingCards[2].image}
                  alt={floatingCards[2].name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-r ${floatingCards[2].color}`}>
                  <div className="text-white font-semibold text-sm">{floatingCards[2].name}</div>
                  <div className="text-white/90 text-xs">{floatingCards[2].role}</div>
                </div>
              </motion.div>

              {/* Center Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className={`absolute left-1/2 -translate-x-1/2 top-4 w-36 h-36 rounded-2xl bg-gradient-to-br ${floatingCards[3].color} shadow-xl flex flex-col items-center justify-center text-white`}
              >
                <div className="text-3xl font-bold">{floatingCards[3].label}</div>
                <div className="text-sm text-white/90">{floatingCards[3].sublabel}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 top-44 w-40 h-44 rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={floatingCards[1].image}
                  alt={floatingCards[1].name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-r ${floatingCards[1].color}`}>
                  <div className="text-white font-bold text-lg">{floatingCards[1].name}</div>
                  <div className="text-white/90 text-xs">{floatingCards[1].role}</div>
                </div>
              </motion.div>

              {/* Right Side Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className={`absolute right-52 top-16 w-32 h-32 rounded-2xl bg-gradient-to-br ${floatingCards[5].color} shadow-xl flex flex-col items-center justify-center text-white`}
              >
                <div className="text-2xl font-bold">{floatingCards[5].label}</div>
                <div className="text-xs text-white/90 text-center px-2">{floatingCards[5].sublabel}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 60, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="absolute right-0 top-8 w-48 h-56 rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={floatingCards[6].image}
                  alt={floatingCards[6].name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r ${floatingCards[6].color}`}>
                  <div className="text-white font-semibold">{floatingCards[6].name}</div>
                  <div className="text-white/90 text-sm">{floatingCards[6].role}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className={`absolute right-52 top-52 w-36 h-36 rounded-2xl bg-gradient-to-br ${floatingCards[7].color} shadow-lg flex flex-col items-center justify-center text-white`}
              >
                <div className="text-3xl font-bold">{floatingCards[7].label}</div>
                <div className="text-xs text-white/90 text-center px-2">{floatingCards[7].sublabel}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="relative z-10 flex flex-wrap items-center justify-center gap-8 px-6 lg:px-12 pb-16"
        >
          <div className="flex items-center space-x-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full shadow-sm">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Lock className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="font-medium text-slate-700">100% On-Premise</span>
          </div>
          <div className="flex items-center space-x-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full shadow-sm">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium text-slate-700">Unlimited Scale</span>
          </div>
          <div className="flex items-center space-x-3 px-6 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-full shadow-sm">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium text-slate-700">Enterprise Security</span>
          </div>
        </motion.div>
      </div>

      {/* Content Section with Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Workflows */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start Workflows</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {workflows.map((workflow, index) => {
              const Icon = workflow.icon;
              return (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => onNavigate(workflow.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={workflow.image}
                      alt={workflow.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${workflow.gradient} opacity-40 group-hover:opacity-50 transition-opacity`} />
                    <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-slate-900" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{workflow.title}</h3>
                    <p className="text-slate-600 mb-4">{workflow.description}</p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`text-transparent bg-gradient-to-r ${workflow.gradient} bg-clip-text font-medium inline-flex items-center`}
                    >
                      Get Started →
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
          >
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + 0.1 * index }}
                className={`flex items-center justify-between p-4 ${
                  index !== recentActivity.length - 1 ? 'border-b border-slate-200' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    activity.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{activity.action}</div>
                    <div className="text-sm text-slate-500">{activity.name}</div>
                  </div>
                </div>
                <div className="text-sm text-slate-500">{activity.time}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}