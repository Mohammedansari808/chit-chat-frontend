import React, { useContext, useEffect } from 'react'
import Conversation from '../Conversation/Conversation'
import OnlineBoard from '../OnlineBoard/OnlineBoard'
import FrdsBoard from '../FrdsBoard/FrdsBoard'
import { fullLink } from '../link'
import Search from '../Search/Search'

function Msg() {
    const id = localStorage.getItem("u_id")
    useEffect(() => {
        fetch(`${fullLink}/conversation/${id}`, {
            method: "GET"
        }).then(res => res.json())
            .then(res => console.log(res))
    })
    return (
        <div><Search />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <FrdsBoard id={id} />
                <Conversation />

            </div>
        </div>
    )
}

export default Msg