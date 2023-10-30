import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import './AppLayout.css'

export default function AppLayout() {
  return (
    <div className="main-layout">
      <header className="header">
        <nav>
          <NavLink className={"NavLink"} to="/">
            <div className="name">
              <img src="/layoutIcons/dashboard.svg" alt="" />
              Dashboard
            </div>
          </NavLink>
          <NavLink className={"NavLink"} to="Projects">
            <div className="name">
              <img src="/layoutIcons/projects.svg" alt="" />{" "}
              {/*The SVG is missing here */}
              Projects
            </div>
          </NavLink>
          <NavLink className={"NavLink"} to="Board">
            <div className="name">
              <img src="/layoutIcons/board.svg" alt="" />
              Board
            </div>
          </NavLink>
          <NavLink className={"NavLink"} to="AddUser">
            <div className="name">
              <img src="/layoutIcons/addUser.svg" alt="" />
              Add User
            </div>
          </NavLink>
          <NavLink className={"NavLink"} to="Messages">
            <div className="name">
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
