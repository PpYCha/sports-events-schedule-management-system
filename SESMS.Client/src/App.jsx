import React from "react";
import Sidebar from "./components/Sidebar";
import NavbarComponent from "./components/NavbarComponent";
import { Outlet, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  const location = useLocation();
  const pathname = location.pathname;
  if (pathname === "/login" || pathname === "/") {
    return <Login />;
  } else {
    return (
      <div className="flex bg-[#e9ecf1]">
        <Sidebar />
        <div className="m-10 w-full rounded-xl  p-10">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default App;
