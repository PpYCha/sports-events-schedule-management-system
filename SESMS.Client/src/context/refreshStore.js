import { jwtDecode } from "jwt-decode";
import create from "zustand";

const refreshStore = create((set) => ({
  loadingSportEvent: false,
  loadingVenue: false,

  refreshSportEvents: () => {
    try {
      set((state) => ({
        loadingSportEvent: !state.loadingSportEvent,
      }));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  },
  refreshVenue: () => {
    try {
      set((state) => ({
        loadingVenue: !state.loadingVenue,
      }));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  },
}));

export default refreshStore;
