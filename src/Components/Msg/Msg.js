import React, { useContext, useEffect, useState } from 'react'
import FrdsBoard from '../FrdsBoard/FrdsBoard'
import { fullLink } from '../link'
import Search from '../Search/Search'
import CurrentChat from '../CurrentChat/CurrentChat'
import { Button } from '@mui/material'
import "./msg.css"
function Msg() {
    //authentication
    const id = localStorage.getItem("u_id")
    const token = localStorage.getItem("token")

    //show and hide frds list
    const [show, setShow] = useState(true)

    //to pass conversation id and other user id as props
    const [convo_id, setConvoId] = useState("")
    const [receiver_id, setReceiver_id] = useState()
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