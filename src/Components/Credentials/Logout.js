import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../App';



function Logout() {
    const navigate = useNavigate()
    const role_id = localStorage.getItem("role_id")
    const userId = localStorage.getItem("u_id")
    const [load, setLoad] = useState(false)

    const logout = () => {
        socket.emit("disconnection", userId)
        setLoad(true)
        //removing 
        localStorage.removeItem('token')
        localStorage.removeItem("role_id")
        localStorage.removeItem("u_id")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        navigate("/")
    }
    return (

        <div style={{
            backgroundColor: "rgb(219, 20, 20)", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
            <h3 style={{ marginLeft: "10px", color: "white" }} >CHIT CHAT</h3>
            <div>
                <Button sx={{
                    backgroundColor: "white", color: "red", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} style={{ margin: "10px", }} onClick={() => logout()} color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}logout</Button>

            </div>
        </div>

    )
}

export default Logout