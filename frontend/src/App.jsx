import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import Leaderboard from './components/Leaderboard';
import ProfileModal from './components/ProfileModal';
import { HiLightningBolt, HiMap, HiChartBar, HiShieldCheck } from 'react-icons/hi';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function App() {
  useEffect(() => {
    console.log('🎮 Game Initialized');
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-neon-green selection:text-black">
      <div className="fixed inset-0 cyber-grid -z-10" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-green/5 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-blue/5 blur-[120px] rounded-full -z-10" />

      <Navbar />
      
      <main className="p-4 md:p-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
            <div className="glass p-1 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-4 left-6 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]" />
                <span className="text-xs font-bold tracking-widest text-gray-300">LIVE TACTICAL MAP</span>
              </div>
              <MapView />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Territory', value: '12%', icon: HiMap, color: 'text-neon-green' },
                { label: 'GPS Accuracy', value: '5m', icon: HiShieldCheck, color: 'text-cyber-blue' },
                { label: 'Energy', value: '85%', icon: HiLightningBolt, color: 'text-yellow-400' },
                { label: 'Rank', value: '#4', icon: HiChartBar, color: 'text-electric-purple' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center group"
                >
                  <stat.icon className={`text-2xl mb-2 ${stat.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{stat.label}</span>
                  <span className="text-lg font-bold font-orbitron">{stat.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <Leaderboard />
            
            <div className="glass p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-3xl rounded-full" />
              
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <HiChartBar className="text-neon-green" />
                DASHBOARD STATS
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 text-sm">Zone Conquest</span>
                  <span className="text-neon-green font-bold font-orbitron">72%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-neon-green shadow-[0_0_10px_rgba(57,255,20,0.5)]" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Time Played</p>
                    <p className="font-orbitron text-sm text-gray-200">2h 45m</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Distance</p>
                    <p className="font-orbitron text-sm text-gray-200">12.4 km</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </main>

      <ProfileModal />
    </div>
  );
}

export default App;