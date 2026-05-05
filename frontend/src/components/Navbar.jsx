import { useStore } from "../store/useStore";
import { motion } from "framer-motion";
import { HiLightningBolt, HiUserCircle, HiGlobeAlt } from "react-icons/hi";

export default function Navbar() {
  const { score, toggleProfile } = useStore();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-auto max-w-7xl px-4 mb-8"
    >
      <div className="glass rounded-2xl px-6 py-4 flex justify-between items-center border border-white/10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-neon-green/5 animate-pulse -z-10" />
        
        <div className="flex items-center gap-3">
          <div className="bg-neon-green p-2 rounded-lg shadow-[0_0_15px_rgba(57,255,20,0.5)]">
            <HiGlobeAlt className="text-black text-2xl" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent font-orbitron">
            LOOP<span className="text-neon-green">SPEL</span>
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl font-bold group cursor-default"
          >
            <HiLightningBolt className="text-neon-green group-hover:animate-bounce" />
            <span className="text-sm md:text-base">
              {score} <span className="text-gray-500 font-normal">Tiles</span>
            </span>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleProfile}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <HiUserCircle className="text-2xl text-gray-300" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}