import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Facilitators from "./pages/facilatators/Facilitators.jsx";
import Players from "./pages/players/Players.jsx";
import Teams from "./pages/teams/Teams.jsx";
import SportsEvents from "./pages/sportsEvent/SportsEvents.jsx";

import Settings from "./pages/Settings.jsx";
import Login from "./pages/login/Login.jsx";
import Schedules from "./pages/schedules/Schedules.jsx";
import Venues from "./pages/venues/Venues.jsx";
import { Home } from "./home/Home.jsx";
import useAuthStore from "./context/authStore.js";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route errorElement={<ErrorPage />}>
        <Route
          index
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="facilitators"
          element={
            <ProtectedRoute>
              <Facilitators />
            </ProtectedRoute>
          }
        />
        <Route
          path="players"
          element={
            <ProtectedRoute>
              <Players />
            </ProtectedRoute>
          }
        />
        <Route
          path="teams"
          element={
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          }
        />
        <Route
          path="sportevents"
          element={
            <ProtectedRoute>
              <SportsEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="venues"
          element={
            <ProtectedRoute>
              <Venues />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedules"
          element={
            <ProtectedRoute>
              <Schedules />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Route>,
  ),
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );

const Root = () => {
  const refreshAuth = useAuthStore((state) => state.refresh);

  useEffect(() => {
    refreshAuth(); // Check authentication status on app initialization
  }, [refreshAuth]);

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
