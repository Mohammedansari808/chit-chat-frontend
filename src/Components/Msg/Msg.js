import React, { useContext, useEffect, useState } from 'react'
import FrdsBoard from '../FrdsBoard/FrdsBoard'
import { fullLink } from '../link'
import Search from '../Search/Search'
import CurrentChat from '../CurrentChat/CurrentChat'
import { Button } from '@mui/material'
import "./msg.css"
function Msg() {
    const id = localStorage.getItem("u_id")
    const token = localStorage.getItem("token")

    const [show, setShow] = useState(true)
    const [convo_id, setConvoId] = useState("")
    const [receiver_id, setReceiver_id] = useState()
    useEffect(() => {
        fetch(`${fullLink}/conversation/${id}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then(res => res.json())
            .then(res => console.log(res.data))
    }, [])
    return (
        <div><div><Search /><Button sx={{
            backgroundColor: "rgb(219, 20, 20)", color: "white", "&:hover": {
                color: "black"
            }
        }} onClick={() => setShow(!show)}>{show ? "hide friends" : "show friends"}</Button>
        </div>
            <div class={show ? "show-frds" : "hide-frds"} >
                {show ? <FrdsBoard receiver_id={receiver_id} setReceiver_id={setReceiver_id} id={id} convo_id={convo_id} setConvoId={setConvoId} /> : null
                }                <CurrentChat receiver_id={receiver_id} id={id} convo_id={convo_id} setConvoId={setConvoId} />
            </div>
        </div>
    )
}

export default Msg