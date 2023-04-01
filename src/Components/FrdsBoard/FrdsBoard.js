import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import OnlineBoard from '../OnlineBoard/OnlineBoard'
import MyFriends from '../MyFriends'

function FrdsBoard({ id }) {

    const [otherUsers, setOtherUsers] = useState()

    useEffect(() => {

        fetch(`${fullLink}/getconversations/${id}`, {
            method: "GET"
        }).then(res => res.json())
            .then(result => setOtherUsers(result)
            )


        console.log(otherUsers)
    }, [])
    return (
        <div>
            {
                otherUsers ? (
                    otherUsers.map((user) => {
                        return (
                            <MyFriends id={id} user={user.members} />
                        )
                    })
                ) : <div>Please wait</div>
            }
        </div>
    )
}

export default FrdsBoard