import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="border-0 p-0 aspect-auto">
      <nav>
        <NavLink to="/">
          <div>
            <img src="/layoutIcons/dashboard.svg" alt="" />
            Dashboard
          </div>
        </NavLink>
        <NavLink to="Projects">
          <div>
            <img src="/layoutIcons/projects.svg" alt="" />
            {/*The SVG is missing here */}
            Projects
          </div>
        </NavLink>
        <NavLink to="Board">
          <div>
            <img src="/layoutIcons/board.svg" alt="" />
            Board
          </div>
        </NavLink>
        <NavLink to="AddUser">
          <div>
            <img src="/layoutIcons/addUser.svg" alt="" />
            Add User
          </div>
        </NavLink>
        <NavLink to="Messages">
          <div>
            <img src="/layoutIcons/messages.svg" alt="" />
            Messages
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
