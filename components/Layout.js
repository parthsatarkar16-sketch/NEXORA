import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import NexoraBotWidget from './NexoraBotWidget';

const Layout = ({ children, title = "Smart City Management" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Theme is kept for compatibility but we are forcing the new clean aesthetic
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'City Overview', href: '/' },
    { name: 'Business', href: '/dashboard' },
    { name: 'Treasury', href: '/services' },
    { name: 'Developers', href: '/decision-engine' },
    { name: 'Join us', href: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background-light)] text-[var(--text-primary)] font-sans">
      <Head>
        <title>{`${title} | Nexora Smart City`}</title>
        <meta name="description" content="Smart City Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="text-2xl font-bold text-[var(--primary-color)]">
                  + Nexora
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-600">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="hover:text-[var(--primary-color)] transition-colors cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA and Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <button className="hidden md:block px-6 py-2.5 bg-[var(--primary-color)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all glow-button">
                  Launch BETA
                </button>
              </Link>
              <button
                className="md:hidden text-gray-800 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link href="/dashboard">
                  <span className="block mt-4 px-4 py-3 bg-[var(--primary-color)] text-white text-center rounded-lg font-medium">
                    Launch BETA
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-bold text-[var(--primary-color)] mb-4">
                + Nexora
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Building smarter, safer, and sustainable cities for tomorrow in Nexora, Maharashtra.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-[var(--primary-color)]">Overview</Link></li>
                <li><Link href="/dashboard" className="hover:text-[var(--primary-color)]">Dashboard</Link></li>
                <li><Link href="/decision-engine" className="hover:text-[var(--primary-color)]">AI Engine</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/services" className="hover:text-[var(--primary-color)]">Treasury</Link></li>
                <li><Link href="/energy" className="hover:text-[var(--primary-color)]">Energy</Link></li>
                <li><Link href="/waste" className="hover:text-[var(--primary-color)]">Infrastructure</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/contact" className="hover:text-[var(--primary-color)]">Contact Us</Link></li>
                <li><a href="#" className="hover:text-[var(--primary-color)]">Twitter</a></li>
                <li><a href="#" className="hover:text-[var(--primary-color)]">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nexora Smart City Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Nexora Bot Widget */}
      <NexoraBotWidget />
    </div>
  );
};

export default Layout;