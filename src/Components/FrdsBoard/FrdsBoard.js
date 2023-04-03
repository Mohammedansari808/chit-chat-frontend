import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import MyFriends from '../MyFriends'

function FrdsBoard({ id, setConvoId, setReceiver_id }) {

    const [otherUsers, setOtherUsers] = useState()
    const token = localStorage.getItem('token')
    console.log(token)
    useEffect(() => {

        fetch(`${fullLink}/getconversations/${id}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then(res => res.json())
            .then(result => setOtherUsers(result)
            )
    }, [])
    const openConvo = (convo_id, getAnotherUser) => {
        setConvoId(convo_id)
        const data = getAnotherUser.filter((member) => member !== id)
        setReceiver_id(data)

    }
    return (
        <div>
            <div><h3>Your Friends</h3></div>
            <div style={{
                backgroundColor: "rgb(240, 237, 237)",
                overflow: "scroll", minHeight: "400px", overflowX: "hidden", margin: "15px", padding: "20px", display: "flex", flexDirection: "column", borderRadius: "6px", boxShadow: "2px 2px 7px black",
            }}>
                {
                    otherUsers ? (
                        otherUsers.map((user) => {
                            return (
                                <div style={{ marginBottom: "2px" }}>
                                    <button onClick={() => { openConvo(user.conversation_id, user.members) }} style={{ textDecoration: "none", borderRadius: "7px", cursor: "pointer", border: "none", width: "200px", background: "none" }}>
                                        <MyFriends id={id} user={user.members} /></button>
                                    <hr />
                                </div>
                            )
                        })
                    ) : <div>Please wait</div>
                }
            </div>
        </div>

    )
}

export default FrdsBoard