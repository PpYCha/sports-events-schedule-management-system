import React from "react";
import Sidebar from "./components/Sidebar";
import NavbarComponent from "./components/NavbarComponent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex bg-[#e9ecf1]">
      <Sidebar />
      <div className="m-10 w-full rounded-xl  p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
