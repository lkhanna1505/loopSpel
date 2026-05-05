import { motion } from "framer-motion";
import { HiStar, HiUser, HiChevronRight } from "react-icons/hi";

const players = [
  { name: "Rohit", score: 12, rank: 1, active: true },
  { name: "Lakshya", score: 9, rank: 2, active: false },
  { name: "Ram", score: 7, rank: 3, active: false },
  { name: "Sarah", score: 5, rank: 4, active: false },
  { name: "Singh", score: 3, rank: 5, active: false },
];

export default function Leaderboard() {
  return (
    <div className="glass p-6 rounded-3xl border border-white/10 h-full min-h-[500px] flex flex-col">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <HiStar className="text-yellow-500 text-xl" />
          </div>
          LEADERBOARD
        </h2>
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-400 font-bold tracking-widest uppercase">
          Global
        </span>
      </div>

      <div className="space-y-4 flex-grow">
        {players.map((player, index) => (
          <motion.div 
            key={player.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
              player.active 
                ? "bg-neon-green/10 border-neon-green/30 shadow-[0_0_15px_rgba(57,255,20,0.1)]" 
                : "bg-white/5 border-white/5 hover:border-white/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-orbitron ${
                player.rank === 1 ? "bg-yellow-500 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]" :
                player.rank === 2 ? "bg-gray-300 text-black" :
                player.rank === 3 ? "bg-orange-400 text-black" :
                "bg-white/10 text-gray-400"
              }`}>
                {player.rank}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${player.active ? "text-neon-green" : "text-gray-200"}`}>
                    {player.name}
                  </span>
                  {player.active && (
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
                  )}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                  <HiUser className="text-[10px]" />
                  Verified Runner
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-bold font-orbitron text-white leading-none">
                  {player.score}
                </div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Zones</div>
              </div>
              <HiChevronRight className="text-gray-600 group-hover:text-neon-green transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
      >
        View Full Rankings
      </motion.button>
    </div>
  );
}