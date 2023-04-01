import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import { toast } from 'react-toastify'

function Search() {
    const [type, setType] = useState("")
    const username = localStorage.getItem("username")
    const userId = localStorage.getItem("u_id")
    const [usersData, setUsersData] = useState()

    useEffect(() => {
        fetch(`${fullLink}/usersdata`, {
            method: "GET"
        }).then((res) => res.json())
            .then((res) => { setUsersData(res); })
    }, [])

    const reload = () => {
        fetch(`${fullLink}/usersdata`, {
            method: "GET"
        }).then((res) => res.json())
            .then((res) => { setUsersData(res); })
    }

    const handleChange = (e) => {
        setType(e)
        if (!e) {
            reload()
        }
        const data = usersData.filter((user) => {
            return user.username.includes(type)
        }).map(user => {
            return user
        })
        setUsersData(data)
    }

    const sendRequest = (frdUser) => {
        const data = [
            userId,
            frdUser
        ]
        fetch(`${fullLink}/conversation-create`, {
            method: "POST",
            body: JSON.stringify({ data: data }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json())
            .then(res => {
                if (res.message == "success") {
                    toast.success("request sent")
                }
            })
    }
    return (
        <div style={{ position: "relative" }}>
            <TextField variant='standard' value={type} la
                bel="Search frds" onChange={(e) => { handleChange(e.target.value) }} />
            <div style={{ transition: "ease-in-out 0.7s", position: "absolute", top: 25, left: 510, backdropFilter: "blur(10px)", background: "transparent" }} >
                {

                    type ? (usersData !== undefined ? (

                        usersData.filter((ele) => {
                            return ele.username != username
                        }).map((user) => {
                            return (
                                <div style={{ width: "300px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <div>{user.username}</div>
                                    <Button onClick={() => { sendRequest(user.user_id) }}>send request</Button>
                                </div>


                            )

                        })
                    )
                        : <div>no frds</div>) : null
                }

            </div>
        </div>
    )
}

export default Search