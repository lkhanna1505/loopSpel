import { create } from 'zustand';

export const useStore = create((set) => ({
  capturedTiles: [],
  score: 0,
  isProfileOpen: false,
  user: {
    name: "Rohit",
    rank: "#4",
    totalDistance: "12.4 km",
    joinDate: "April 2026",
    achievements: ["Early Bird", "Explorer", "10km Club"]
  },
  
  addTile: (tile) => set((state) => {
    const exists = state.capturedTiles.some(t => t.id === tile.id);
    if (exists) return state;
    
    return {
      capturedTiles: [...state.capturedTiles, tile],
      score: state.score + 1
    };
  }),
  
  toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen })),
  setProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
  
  clearTiles: () => set({ capturedTiles: [], score: 0 })
}));
