import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAtom } from "jotai";
import { tokenAtom } from "./atoms/atomsFile.jsx";
import axios from "axios";
import urlPage from "../url/urlPath.js";

//pages
// The pages need to be prepared and updated here

//Layout
import AppLayout from "./components/AppLayout.jsx";
import NotFound from "./components/NotFound.jsx";
import SignUp from "./components/login/signup.jsx";
import SignIn from "./components/login/signin.jsx";
import {GetCode} from "./components/login/getCodeByEmail.jsx"
import Forgot from "./components/forgetPassword/forgot.jsx"





export default function App() {
  const [token, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    async function tokencheck() {
      const localStorageToken = localStorage.getItem("jsonwebtoken");

      if (!localStorageToken) {
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
      <>
        (
        <Route path="/" element={<AppLayout />}>
          <Route index element={<p>Dashboard</p>} />
          <Route path="Projects" element={<p>Projects</p>} />
          <Route path="Board" element={<p>Board </p>} />
          <Route path="AddUser" element={<p>Add User </p>} />
          <Route path="Messages" element={<p>Messages </p>} />
          <Route path="Settings" element={<p>Settings </p>} />
          <Route path="Info" element={<p>Info </p>} />
          <Route path="*" element={<NotFound />} />
        </Route>
        )
      </>
    )
  );
  const routerLogin = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/getcode" element={<GetCode />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <div style={{ backgroundColor: "darkblue.main" }}>
      <RouterProvider router={token ? router : routerLogin} />
    </div>
  );
}
