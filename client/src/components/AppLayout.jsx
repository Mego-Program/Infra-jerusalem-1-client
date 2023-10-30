import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div>
      <header>
        <nav>
          <NavLink to="/">
            <div>
              <img src="/layoutIcons/dashboard.svg" alt=""/>
              Dashboard
            </div>
          </NavLink>
          <NavLink to="Projects">
            <div>
              <img src="/layoutIcons/projects.svg" alt=""/>
              {/*The SVG is missing here */}
              Projects
            </div>
          </NavLink>
          <NavLink to="Board">
            <div >
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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}