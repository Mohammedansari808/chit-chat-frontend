import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import MyFriends from '../MyFriends'
import "./frdsboard.css"

function FrdsBoard({ id, setConvoId, setReceiver_id }) {

    const [otherUsers, setOtherUsers] = useState()
    const token = localStorage.getItem('token')
    //to display friends
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

    //to show the current chat of the other users
    const openConvo = (convo_id, getAnotherUser) => {
        setConvoId(convo_id)
        const data = getAnotherUser.filter((member) => member !== id)
        setReceiver_id(data)

    }
    return (
        <div>
            <div><h3>Your Friends</h3></div>
            <div className='frds-box'>
                {
                    otherUsers ? (
                        otherUsers.map((user, ind) => {
                            return (
                                <div key={ind} style={{ marginBottom: "2px" }}>
                                    <button onClick={() => { openConvo(user.conversation_id, user.members) }} class="per-frd-button">
                                        <MyFriends id={id} user={user.members} /></button>
                                    <hr style={{ margin: "0", padding: "0" }} />
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