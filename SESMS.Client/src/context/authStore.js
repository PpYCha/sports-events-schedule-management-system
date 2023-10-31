import create from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  login: (username, password) => {
    // Simulate user authentication (you can replace this with your authentication logic)
    if (username === "admin" && password === "admin") {
      set({ user: "admin" });
    } else if (username === "client" && password === "client") {
      set({ user: "client" });
    }
  },
  logout: () => set({ user: null }),
}));

export default useAuthStore;
