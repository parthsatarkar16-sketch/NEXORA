import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout title="Home">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block mb-4">
              <span className="text-2xl font-semibold text-[var(--primary-color)]">+</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
              Where Cities Grow
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              A programmable, AI-driven smart city platform designed for native efficiency and seamless integration into urban life.
            </p>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Try it now
              </button>
            </Link>
          </motion.div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16 w-full max-w-6xl mx-auto rounded-[40px] overflow-hidden shadow-2xl relative h-[400px] md:h-[600px] bg-gradient-to-r from-[#d9d4f0] to-[#e4e0f6]"
          >
            {/* Placeholder for the generated hero image */}
            <img 
              src="/hero_background.png" 
              alt="Nexora 3D Landscape" 
              className="w-full h-full object-cover float-gentle"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* What is Nexora Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                What is Nexora?
              </h2>
              <Link href="/about">
                <button className="px-8 py-3.5 bg-[#3b2a5a] text-white rounded-full font-medium hover:bg-opacity-90 transition-all glow-button">
                  Explore now
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                Nexora is an autonomous smart city platform that helps your municipality grow while staying perfectly optimized for its citizens, seamlessly connecting infrastructure, energy, and data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[500px]">
            {/* Large Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#e9e6fa] rounded-[32px] p-10 flex flex-col justify-between relative overflow-hidden h-full"
            >
              <div className="z-10 w-2/3">
                <h3 className="text-3xl font-bold text-[#3b2a5a] mb-4">Cities that grow</h3>
                <p className="text-[#5a4b7a] leading-relaxed">
                  Enhance urban living as your infrastructure is deployed into high-performing autonomous protocols, directly benefiting citizens.
                </p>
              </div>
              <img 
                src="/card_feature.png" 
                alt="Feature 3D" 
                className="absolute bottom-[-10%] right-[-10%] w-[60%] object-contain"
                onError={(e) => e.target.style.display = 'none'}
              />
            </motion.div>

            {/* Small Cards Column */}
            <div className="grid grid-rows-2 gap-6 h-full">
              {/* Top Small Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#2a2542] rounded-[32px] p-10 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Always connected,<br/>always stable</h3>
                <p className="text-gray-300 font-light">
                  Stay fully integrated with instant access to your city's data — no lockups or delays.
                </p>
              </motion.div>

              {/* Bottom Small Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-[#2a2542] rounded-[32px] p-10 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">100%<br/>autonomous</h3>
                <p className="text-gray-300 font-light">
                  No need to manage services manually. Nexora works in the background for you, optimizing 24/7.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/4 text-sm text-[var(--text-secondary)] font-medium">
              Backed by the best companies<br/>and visionary angels.
            </div>
            <div className="md:w-3/4 flex flex-wrap justify-around items-center gap-8 opacity-50 grayscale">
              {['Microsoft', 'Cisco', 'Siemens', 'NVIDIA', 'Intel'].map((partner) => (
                <div key={partner} className="text-xl font-bold tracking-wider">{partner}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-[#f9f9fb]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            <div className="md:w-1/3">
              <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                Nexora in Action
              </div>
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                Use cases
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed font-light mb-8">
                Nexora offers a variety of use cases for developers, businesses and treasuries seeking secure and profitable smart city integrations.
              </p>
            </div>
            
            <div className="md:w-2/3">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col md:flex-row items-center gap-10 h-full"
              >
                <div className="md:w-1/2">
                  <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Business</h3>
                  <p className="text-[var(--text-secondary)] font-light mb-6">
                    Boost engagement by offering Nexora, a secure infrastructure network with high reliability, allowing your citizens to thrive effortlessly on your platform.
                  </p>
                  <Link href="/business" className="flex items-center text-[var(--primary-color)] font-medium hover:underline">
                    <span className="mr-2">→</span> Learn more
                  </Link>
                </div>
                <div className="md:w-1/2 h-full flex items-center justify-center">
                   <img 
                    src="/use_case.png" 
                    alt="Business Use Case" 
                    className="w-full h-auto object-contain drop-shadow-xl"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1541888086225-ee53158c89dc?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;