import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Facilitators from "./pages/Facilitators.jsx";
import Players from "./pages/players/Players.jsx";
import Teams from "./pages/teams/Teams.jsx";
import SportsEvents from "./pages/SportsEvents.jsx";
import Venues from "./pages/Venues.jsx";
import Schedules from "./pages/Schedules.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/login/Login.jsx";

const router1 = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "facilitators",
        element: <Facilitators />,
      },
      {
        path: "players",
        element: <Players />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "sportevents",
        element: <SportsEvents />,
      },
      {
        path: "venues",
        element: <Venues />,
      },
      {
        path: "schedules",
        element: <Schedules />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index path="/login" element={<Login />} />
      <Route errorElement={<ErrorPage />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="facilitators" element={<Facilitators />} />
        <Route path="players" element={<Players />} />
        <Route path="teams" element={<Teams />} />
        <Route path="sportevents" element={<SportsEvents />} />
        <Route path="venues" element={<Venues />} />
        <Route path="schedules" element={<Schedules />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
