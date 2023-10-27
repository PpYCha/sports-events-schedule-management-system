import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Facilitators from "./pages/Facilitators.jsx";
import Players from "./pages/players/Players.jsx";
import Teams from "./pages/Teams.jsx";
import SportsEvents from "./pages/SportsEvents.jsx";
import Venues from "./pages/Venues.jsx";
import Schedules from "./pages/Schedules.jsx";
import Settings from "./pages/Settings.jsx";

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
