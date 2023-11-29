import { jwtDecode } from "jwt-decode";
import create from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  currentUser: null,
  login: (token) => {
    // Simulate user authentication (you can replace this with your authentication logic)
    set({ isAuthenticated: true });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.removeItem("token");
  },
  refresh: () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { firstName, lastName, userRole } = decoded;

        set({
          isAuthenticated: true,
          currentUser: { firstName, lastName, userRole },
        });
      } else {
        set({ currentUser: null });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      set({ currentUser: null });
    }
  },
}));

export default useAuthStore;
