import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../App';



function Logout() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("u_id")

    const logout = () => {
        socket.emit("disconnection", userId)
        socket.on('disusers', (data) => {
            console.log(data)
        })
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
                {token ? <Button sx={{
                    backgroundColor: "white", color: "red", '&:hover': {
                        backgroundColor: "black", color: "whitesmoke"
                    }
                }} style={{ margin: "10px", }} onClick={() => logout()} color="success" variant="contained">logout</Button>
                    : <div><Button sx={{
                        backgroundColor: "white", color: "red", '&:hover': {
                            backgroundColor: "black", color: "whitesmoke"
                        }
                    }} style={{ margin: "10px", }} onClick={() => navigate("/")} color="success" variant="contained">login</Button>
                        <Button sx={{
                            backgroundColor: "white", color: "red", '&:hover': {
                                backgroundColor: "black", color: "whitesmoke"
                            }
                        }} style={{ margin: "10px", }} onClick={() => navigate("/signup")} color="success" variant="contained">signup</Button>

                    </div>
                }
            </div>
        </div>

    )
}

export default Logout