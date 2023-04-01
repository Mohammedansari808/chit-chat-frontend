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

const socket = io.connect("http://localhost:4000")
function App() {
  const [sendMessage, setSendMessage] = useState(null)
  const token = localStorage.getItem("token")
  // const [mes, setMes] = useState("")


  useEffect(() => {
    // fetch(`${fullLink}/conversation/${auth}`, {
    //   method: "GET"
    // })



    // socket.emit("addUsers", mes)

    // socket.on("getUsers", (users) => {
    //   console.log(users)
    // })

    // socket.on("getMessage", (data) => {
    //   console.log(data)
    // })

  }, [])


  const handleSubmit = () => {
    // setMes(sendMessage)
  }
  const sendsms = () => {
    socket.emit("sendMessage", {
      senderId: "6426ea3079a058f5f63038a2",
      receiver_id: "6426ea3079a058f5f63038a1",
      text: "hi how are you from"
    })
  }


  return (
    <div className="App">

      <form>
        <input type="text" name='sendMessage' value={sendMessage} onChange={(e) => { setSendMessage(e.target.value) }} />

      </form>
      <button onClick={() => handleSubmit()}>submit</button>
      <button onClick={() => { sendsms() }}>send</button>

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
