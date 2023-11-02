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
import SignUp from './components/login/signup.jsx'
import SignIn from "./components/login/signin.jsx";


export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Dashboard</p>} />
        <Route path="Projects" element={<p>Projects</p>} />
        <Route path="Board" element={<p>Board </p>} />
        <Route path="AddUser" element={<p>AddUser </p>} />
        <Route path="Messages" element={<p>Messages </p>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="signin" element={<SignIn/>} />
        <Route path="*" element={<p>NotFound </p>} />
      </Route>
    )
  );

  return (
    <div style={{ backgroundColor: '#21213E'}}>
      <RouterProvider router={router} />
    </div>
  );
}