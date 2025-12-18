import { motion } from 'motion/react';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowRight,
  BookOpen,
  FileText,
  Shield,
  HelpCircle,
  Users,
  Zap,
  Database,
  Tag,
  Upload,
  Home,
} from 'lucide-react';
import logoImage from '@/assets/2720cdc199386b59c9b01130b544a827061306b3.png';

interface FooterLink {
  label: string;
  href?: string;
  topic?: string; // For blog links
  external?: boolean;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  // Blog topics - easily scalable
  const blogTopics: FooterLink[] = [
    { label: 'Data Labeling', topic: 'data-labeling' },
    { label: 'Machine Learning', topic: 'machine-learning' },
    { label: 'Dataset Management', topic: 'dataset-management' },
    { label: 'AI Best Practices', topic: 'ai-best-practices' },
    { label: 'Cloud Storage', topic: 'cloud-storage' },
    { label: 'Data Augmentation', topic: 'data-augmentation' },
    { label: 'Annotation Tools', topic: 'annotation-tools' },
    { label: 'ML Workflows', topic: 'ml-workflows' },
    { label: 'Enterprise AI', topic: 'enterprise-ai' },
    { label: 'Data Quality', topic: 'data-quality' },
    { label: 'Model Training', topic: 'model-training' },
    { label: 'Industry Insights', topic: 'industry-insights' },
  ];

  // Product links
  const productLinks: FooterLink[] = [
    { label: 'Dashboard', href: '#', onClick: () => onNavigate?.('dashboard') },
    { label: 'Massive Import', href: '#', onClick: () => onNavigate?.('import') },
    { label: 'Dataset Generation', href: '#', onClick: () => onNavigate?.('generation') },
    { label: 'Labeling Studio', href: '#', onClick: () => onNavigate?.('studio') },
  ];

  // Resources
  const resourcesLinks: FooterLink[] = [
    { label: 'Documentation', href: 'https://doc.igot.ai', external: true },
    { label: 'API Reference', href: 'https://doc.igot.ai/api', external: true },
    { label: 'Tutorials', topic: 'tutorials' },
    { label: 'Case Studies', topic: 'case-studies' },
    { label: 'Webinars', topic: 'webinars' },
    { label: 'Community', href: 'https://community.igot.ai', external: true },
  ];

  // Company
  const companyLinks: FooterLink[] = [
    { label: 'About Us', topic: 'about' },
    { label: 'Careers', topic: 'careers' },
    { label: 'Partners', topic: 'partners' },
    { label: 'Press Kit', topic: 'press-kit' },
    { label: 'Contact', topic: 'contact' },
  ];

  // Legal
  const legalLinks: FooterLink[] = [
    { label: 'Privacy Policy', topic: 'privacy-policy' },
    { label: 'Terms of Service', topic: 'terms-of-service' },
    { label: 'Cookie Policy', topic: 'cookie-policy' },
    { label: 'GDPR Compliance', topic: 'gdpr-compliance' },
    { label: 'Security', topic: 'security' },
  ];

  const footerSections: FooterSection[] = [
    { title: 'Product', links: productLinks },
    { title: 'Resources', links: resourcesLinks },
    { title: 'Company', links: companyLinks },
    { title: 'Legal', links: legalLinks },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/igotai', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/igotai', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/igotai', label: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@igot.ai', label: 'Email' },
  ];

  const handleLinkClick = (link: FooterLink) => {
    if (link.onClick) {
      link.onClick();
      return;
    }

    if (link.topic) {
      // Blog link
      window.open(`https://blog.igot.ai/${link.topic}`, '_blank');
    } else if (link.href) {
      if (link.external) {
        window.open(link.href, '_blank');
      } else {
        window.location.href = link.href;
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <img
                  src={logoImage}
                  alt="iGOT.ai"
                  className="h-10 w-auto mb-4 brightness-0 invert"
                />
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Enterprise-grade data labeling and dataset management platform. 
                  Scale your AI workflows with confidence.
                </p>
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <motion.button
                        onClick={() => handleLinkClick(link)}
                        whileHover={{ x: 4 }}
                        className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group"
                      >
                        <span>{link.label}</span>
                        {(link.external || link.topic) && (
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Blog Topics Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {blogTopics.map((topic) => (
                  <motion.button
                    key={topic.topic}
                    onClick={() => handleLinkClick(topic)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-indigo-500"
                  >
                    {topic.label}
                  </motion.button>
                ))}
              </div>
              <motion.a
                href="https://blog.igot.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="inline-flex items-center mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors group"
              >
                View All Posts
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800"
          >
            <div className="max-w-md">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest insights on AI, data labeling, and ML workflows delivered to your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle newsletter subscription
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© {new Date().getFullYear()} iGOT.ai. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Enterprise Security
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <motion.a
                href="https://status.igot.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center"
              >
                <Zap className="w-4 h-4 mr-1" />
                System Status
              </motion.a>
              <motion.a
                href="https://support.igot.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Support
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

