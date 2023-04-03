import logo from './logo.svg';
import './App.css';
import io from "socket.io-client"
import Login from "./Components/Credentials/Login"
import Logout from "./Components/Credentials/Logout"
import PasswordChange from "./Components/Credentials/PasswordChange"
import Signup from "./Components/Credentials/Signup"
import Verification from "./Components/Credentials/Verification"
import VerifyComplete from "./Components/Credentials/VerifyComplete"
import Forget from "./Components/Credentials/Forget"
import NotFound from "./Components/NotFound"


import { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Msg from './Components/Msg/Msg';
import { fullLink } from './Components/link';

export const socket = io.connect("http://localhost:4000")
function App() {
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("u_id")
  useEffect(() => {
    socket.emit("addUsers", userId)

  }, [])


  return (
    <div className="App">
      <ToastContainer />
      {token ? <Logout /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify_link/:username/:id" element={<VerifyComplete />} />
        <Route path="/verification-link/:username/:id" element={<Verification />} />
        <Route path="/password-change/:username" element={<Protectedroute><PasswordChange /></Protectedroute>} />
        <Route path="/forgetpassword" element={<Forget />} />
        <Route path="/msg" element={<Msg />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}


function Protectedroute({ children }) {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem('token')
  if (isAuth) {
    return (
      children
    )
  } else {
    navigate("/login")
  }

}
export default App;
