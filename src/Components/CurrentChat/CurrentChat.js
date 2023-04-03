import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../Conversation/Conversation'
import { fullLink } from '../link'
import "./currentChat.css"
import { socket } from '../../App'
import ScrollToBottom from 'react-scroll-to-bottom'

function CurrentChat({ id, convo_id, setConvoId, receiver_id }) {

    const [chat, setChat] = useState([])
    const [arrMsg, setArrMsg] = useState({})
    const token = localStorage.getItem('token')
    useEffect(() => {

        socket.on("getUsers", (users) => {

        })
        socket.on("getMessage", (user) => {
            console.log(user)
            setArrMsg({
                conversation_id: user.conversation_id,
                sender: user.sender,
                sender_name: user.sender_name,
                text: user.text
            })
        })

    }, [])
    useEffect(() => {
        arrMsg && setChat([...chat, arrMsg])
        console.log(arrMsg)
    }, [arrMsg])
    useEffect(() => {
        fetch(`${fullLink}/get-chat/${convo_id}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        })
            .then(res => res.json())
            .then(res => {
                setChat(res);
            }).catch(err => console.log(err))
    }, [convo_id])


    return (
        <div>
            {
                convo_id && chat !== undefined ? (
                    <>

                        <ScrollToBottom className='msg-container' >
                            {
                                chat.map(info => {
                                    return (
                                        <div className={info.sender == id ? "text-send-box" : "text-receive-box"}>
                                            <div className={info.sender == id ? "text-box" : "text-box-own"}>
                                                <h4 className={info.sender == id ? "text" : "text-own"}>{info.sender_name}</h4>
                                                <div style={{ margin: "0", marginBottom: "4px", overflowWrap: "break-word" }} className={info.sender == id ? "text" : "text-own"}>{info.text}</div>
                                            </div>
                                            <div></div>
                                        </div>

                                    )
                                })
                            }
                        </ScrollToBottom>

                        <div style={{ padding: "15px", margin: "25px", boxShadow: "1px 1px 10px black", borderRadius: "7px" }}>
                            {convo_id ? <Conversation setChat={setChat} chat={chat} receiver_id={receiver_id} id={id} convo_id={convo_id} /> : null
                            }
                        </div>
                    </>
                ) : <h2>Open a Chat</h2>
            }
        </div >

    )
}

export default CurrentChat