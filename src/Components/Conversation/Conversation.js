import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import { socket } from '../../App'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

function Conversation({ chat, setChat, id, convo_id, receiver_id }) {

    const [msgbox, setMsgbox] = useState('')
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")


    //to send msg to database
    const handleSubmit = () => {
        const data = {
            conversation_id: convo_id,
            sender: id,
            sender_name: username,
            text: msgbox,
            createdAt: Date.now()
        }
        setChat([...chat, data])

        //sending msg using socketio
        socket.emit("sendMessage", {
            sender: id,
            sender_name: username,
            receiver_id: receiver_id,
            text: msgbox,
            createdAt: Date.now()
        })

        //saving messages to database
        fetch(`${fullLink}/send-message`, {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-type": "application/json",
                "x-auth-token": token

            }
        }).then(res => res.json())
            .then(res => {
                if (res.message !== "success") {
                    toast.error("error saving in database")

                } else {
                    setMsgbox("")
                }
            })

    }


    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "15px" }}>
            <textarea style={{ minWidth: "60%", borderRadius: "7px" }} value={msgbox} onChange={(e) => { setMsgbox(e.target.value) }}>Type message here...</textarea>
            <Button sx={{
                boxShadow: "1px 1px 10px black", backgroundColor: "white", color: "red", marginLeft: "15px", "&:hover": {
                    backgroundColor: "black", color: "white"
                }
            }} onClick={() => { handleSubmit() }}>send</Button>
        </div>

    )
}

export default Conversation