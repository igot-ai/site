import { useState } from 'react';
import { Home, Upload, Database, Tag, Menu, X, BookOpen, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '@/assets/2720cdc199386b59c9b01130b544a827061306b3.png';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'import', label: 'Massive Import', icon: Upload },
    { id: 'generation', label: 'Dataset Generation', icon: Database },
    { id: 'studio', label: 'Labeling Studio', icon: Tag },
    { id: 'blog', label: 'Blog', icon: BookOpen, external: true, url: 'https://blog.igot.ai' },
    { id: 'docs', label: 'Docs', icon: FileText, external: true, url: 'https://doc.igot.ai' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.external && item.url) {
      window.open(item.url, '_blank');
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with Refined Elegant Design */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo - New PNG Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('dashboard')}
            >
              <img 
                src={logoImage} 
                alt="iGOT.ai" 
                className="h-12 w-auto"
              />
            </motion.div>

            {/* Desktop Navigation - Refined Elegant Style */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id && !item.external;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-5 py-2.5 rounded-full transition-all group"
                  >
                    <div className={`flex items-center gap-2 relative z-10 transition-colors ${
                      isActive
                        ? 'text-slate-900'
                        : 'text-slate-500 group-hover:text-slate-900'
                    }`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    
                    {/* Active Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-slate-100 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Background */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    
                    {/* Active Indicator Dot */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full font-medium text-sm hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-sm hover:shadow-md"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
            >
              <nav className="px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id && !item.external;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavClick(item);
                        if (!item.external) {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-3 rounded-full transition-all font-medium ${
                        isActive
                          ? 'bg-slate-100 text-slate-900'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}