import React, { useContext, useEffect, useState } from 'react'
import { fullLink } from './link'

function MyFriends({ user, id }) {
    const [users, setUsers] = useState()
    const token = localStorage.getItem("token")
    const data = user.filter((member) => member !== id)
    //to display each username on friends list
    useEffect(() => {
        fetch(`${fullLink}/otheruserdata/${data[0]}`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }

        }).then(res => res.json())
            .then(res => setUsers(res))
    }, [])

    return (
        <div>
            {users ? <h2>{users.username}</h2> : null}
        </div>
    )
}

export default MyFriends