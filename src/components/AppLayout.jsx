import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="w-[270px] h-[1323px] bg-slate-900 container None" >
      <nav>
        <NavLink to="/">
        <div className="w-[246px] h-[66px] bg-amber-400 rounded-[10px] shadow" >
            <img src="/layoutIcons/dashboard.svg" alt="" className="w-5 h-[18px] relative"/>
            <div className="text-white text-[17px] font-semibold font-['Poppins']">Dashboard</div>
          </div>
        </NavLink>
        <NavLink to="Projects">
          <div>
            <img src="/layoutIcons/projects.svg" alt="" />
            {/*The SVG is missing here */}
            <div className="text-white text-[17px] font-semibold font-['Poppins']">Projects</div>
          </div>
        </NavLink>
        <NavLink to="Board">
          <div>
            <img src="/layoutIcons/board.svg" alt="" />
            <div className="text-white text-[17px] font-semibold font-['Poppins']">Board</div>
          </div>
        </NavLink>
        <NavLink to="AddUser">
          <div>
            <img src="/layoutIcons/addUser.svg" alt="" />
            <div className="text-white text-[17px] font-semibold font-['Poppins']">Add User</div>
          </div>
        </NavLink>
        <NavLink to="Messages">
          <div>
            <img src="/layoutIcons/messages.svg" alt="" />
            <div className="text-white text-[17px] font-semibold font-['Poppins']">Messages</div>
          </div>
        </NavLink>
      </nav>
      <nav>
        <NavLink to="Settings">
          <div>
            <img src="/layoutIcons/settings.svg" alt="" />
            Settings
          </div>
        </NavLink>
        <NavLink to="Info">
          <div>
            <img src="/layoutIcons/info.svg" alt="" />
            Info
          </div>
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
