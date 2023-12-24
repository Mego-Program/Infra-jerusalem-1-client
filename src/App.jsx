//react
import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

// import AppProjects from "remotePro/AppProjects";
// import AppCommunication from "remoteCommunication/AppCommunication";
// import AppSpecs from "remoteSpecs/AppSpecs";


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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <p>Dashboard</p>,
        },
        {
          path: "Board",
          element: <h1>Board</h1>
        },
        {
          path: "Specs",
          element: <h1>Specs</h1>
          // element: (
          //   <ErrorBoundary fallback={<ErrorConection />}>
          //     <>{AppSpecs}</>
          //   </ErrorBoundary>
          // ),
        },
        {
          path: "AddUser",
          element: <p>AddUser</p>,
        },
        {
          path: "Messages",

          element: <h1>Messages</h1>
        },
        {
          path: "Settings",
          element: <p>Settings</p>,
        },
        {
          path: "Info",
          element: <p>Info</p>,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
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
