//react
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import axios from "axios";
import axiosInstance from "../exios/axiosInstance.js";
import urlPage from "../url/urlPath.js";

//atom
import { useAtom } from "jotai";
import { tokenAtom, userInfo } from "./atoms/atomsFile.jsx";

//pages
import AppLayout from "./components/AppLayout.jsx";
import SignUp from "./components/login/signup.jsx";
import SignIn from "./components/login/signin.jsx";
import { GetCode } from "./components/login/getCodeByEmail.jsx";
import WheelWaitingLogo from "./components/Features/wheelWaitingLogo.jsx";
import Forgot from "./components/forgetPassword/forgot.jsx";
import NotFound from "./components/NotFound.jsx";
import ErrorConection from "./components/Features/errorConection.jsx";

import AppSpecs from "remoteSpecs/AppSpecs";
// import AppProjects from "remotePro/AppProjects";
// import AppCommunication from "remoteCommunication/AppCommunication";


export default function App() {
  const [token, setToken] = useAtom(tokenAtom);
  const [info, setUserInfo] = useAtom(userInfo);
  const [imp, setImp] = useState("");

  useEffect(() => {
    async function tokencheck() {
      setImp();

      const localStorageToken = localStorage.getItem("jsonwebtoken");
      const localStorageUser = localStorage.getItem("user");

      if (!localStorageToken || !localStorageUser) {
        setToken(false);
        return;
      } else {
        try {
          const sendData = { token: localStorageToken };
          const response = await axios.post(urlPage + "users/token", sendData, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status === 200) {
            setToken(true);
            setUserInfo(JSON.parse(localStorageUser));
            try {
              axiosInstance.interceptors.request.use((config) => {
                config.headers["x-auth-token"] = localStorageToken;
                return config;
              });
            } catch (error) {
              console.error(error);
            }
          } else {
            setToken(false);
          }
        } catch (error) {
          setToken(false);
        }
      }
    }
    tokencheck();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<AppLayout />}>
        <Route path="" element={<p>Dashboard</p>} />
        <Route path="Specs">{AppSpecs}</Route>
        <Route
          path="Board"
          element={
            <ErrorBoundary fallback={<ErrorConection />}>
              <h3>AppProjects</h3>
              {/* <AppProjects /> */}
            </ErrorBoundary>
          }
        />
        <Route path="AddUser" element={<h2>AddUser</h2>} />
        <Route
          path="Messages"
          element={
            <ErrorBoundary fallback={<ErrorConection />}>
              <h3>AppCommunication</h3>
              {/* <AppCommunication /> */}
            </ErrorBoundary>
          }
        />
        <Route path="Settings" element={<h2>Settings</h2>} />
        <Route path="Info" element={<h2>Info</h2>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  const routerLogin = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/getcode",
      element: <GetCode />,
    },
    {
      path: "/forgot",
      element: <Forgot />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const routerDefult = createBrowserRouter([
    {
      path: "*",
      element: <WheelWaitingLogo open={true} />,
    },
  ]);

  return (
    <div style={{ backgroundColor: "darkblue.main" }}>
      <RouterProvider
        router={token ? router : token == false ? routerLogin : routerDefult}
      />
    </div>
  );
}
