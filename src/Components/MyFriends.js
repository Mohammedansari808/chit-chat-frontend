import React, { useEffect, useState } from 'react'
import { fullLink } from './link'

function MyFriends({ user, id }) {
    const [users, setUsers] = useState()
    console.log(user)
    const data = user.filter((member) => member !== id)
    useEffect(() => {
        fetch(`${fullLink}/otheruserdata/${data[0]}`).then(res => res.json())
            .then(res => setUsers(res))
    }, [])
    console.log(users)
    return (
        <div>
            {users ? <h2>{users.username}</h2> : null}

        </div>
    )
}

export default MyFriends