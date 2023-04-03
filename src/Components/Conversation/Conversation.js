import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import { socket } from '../../App'
import { Button } from '@mui/material'

function Conversation({ chat, setChat, id, convo_id, receiver_id }) {

    const [msgbox, setMsgbox] = useState('')

    const username = localStorage.getItem("username")
    const handleSubmit = () => {
        const data = {
            conversation_id: convo_id,
            sender: id,
            sender_name: username,
            text: msgbox
        }
        socket.emit("sendMessage", {
            sender: id,
            sender_name: username,
            receiver_id: receiver_id,
            text: msgbox
        })
        fetch(`${fullLink}/send-message`, {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    setChat([...chat, data])
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