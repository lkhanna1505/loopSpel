import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { HiX, HiBadgeCheck, HiCalendar, HiTrendingUp, HiMap } from "react-icons/hi";

export default function ProfileModal() {
  const { isProfileOpen, toggleProfile, user, score } = useStore();

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleProfile}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101] px-4"
          >
            <div className="glass rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden relative">
              <div className="h-32 bg-gradient-to-br from-neon-green/20 to-cyber-blue/20 relative">
                <button 
                  onClick={toggleProfile}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                >
                  <HiX />
                </button>
              </div>

              <div className="absolute top-16 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-3xl bg-dark-bg border-4 border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-neon-green to-cyber-blue opacity-80" />
                  <span className="absolute text-3xl font-bold font-orbitron text-white">R</span>
                </div>
              </div>

              <div className="px-8 pt-12 pb-10 text-center">
                <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                <p className="text-neon-green text-xs font-bold tracking-widest uppercase mb-6 flex items-center justify-center gap-1">
                  <HiBadgeCheck /> Professional Runner
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Rank</p>
                    <p className="font-orbitron text-sm">{user.rank}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Tiles</p>
                    <p className="font-orbitron text-sm">{score}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">XP</p>
                    <p className="font-orbitron text-sm">2.4k</p>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default group">
                    <HiCalendar className="text-gray-500 group-hover:text-neon-green" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Member Since</p>
                      <p className="text-sm font-medium">{user.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default group">
                    <HiMap className="text-gray-500 group-hover:text-cyber-blue" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Total Distance</p>
                      <p className="text-sm font-medium">{user.totalDistance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default group">
                    <HiTrendingUp className="text-gray-500 group-hover:text-electric-purple" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Achievements</p>
                      <div className="flex gap-1 mt-1">
                        {user.achievements.map(a => (
                          <span key={a} className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded border border-white/5 text-gray-400">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={toggleProfile}
                  className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-neon-green to-cyber-blue text-black font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
