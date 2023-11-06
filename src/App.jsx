import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//pages
// The pages need to be prepared and updated here

//Layout
import AppLayout from "./components/AppLayout.jsx";
import NotFound from "./components/NotFound.jsx";
import SignUp from './components/login/signup.jsx'
import SignIn from "./components/login/signin.jsx";
import {GetCode} from "./components/login/getCodeByEmail.jsx"
import Forgot from "./components/login/forgot.jsx"





export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="signin" element={<SignIn/>} />
      <Route path="getcode" element={<GetCode/>} />
      <Route path="forgot" element={<Forgot/>} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p >Dashboard</p>} />
        <Route path="Projects" element={<p>Projects</p>} />
        <Route path="Board" element={<p>Board </p>} />
        <Route path="AddUser" element={<p>Add User </p>} />
        <Route path="Messages" element={<p>Messages </p>} />
        <Route path="Settings" element={<p>Settings </p>} />
        <Route path="Info" element={<p>Info </p>} />
        <Route path="*" element={<NotFound/>} />
      </Route>
      </>
    )
  );

  return (
    <div style={{ backgroundColor: 'darkblue.main'}}>
      <RouterProvider router={router} />
      
    </div>
  );
}