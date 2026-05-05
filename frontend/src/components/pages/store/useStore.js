import { create } from "zustand";

export const useStore = create((set) => ({
  capturedTiles: [],
  score: 0,

  addTile: (tile) =>
    set((state) => {
      const exists = state.capturedTiles.find(
        (t) => t.id === tile.id
      );

      if (exists) return state;

      return {
        capturedTiles: [...state.capturedTiles, tile],
        score: state.score + 1
      };
    }),
}));