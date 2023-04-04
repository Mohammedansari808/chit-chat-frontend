import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fullLink } from '../link'
import "./search.css"
import { toast } from 'react-toastify'
function Search() {
    const [type, setType] = useState("")
    const username = localStorage.getItem("username")
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem("u_id")
    const [usersData, setUsersData] = useState()

    useEffect(() => {
        //to get the all usersdata
        fetch(`${fullLink}/usersdata`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
        }).then((res) => res.json())
            .then((res) => { setUsersData(res); })
    }, [])
    //to refresh the search list
    const reload = () => {
        fetch(`${fullLink}/usersdata`, {
            method: "GET",
            headers: {
                "x-auth-token": token
            }
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
    //to conversation id between two users
    const sendRequest = (frdUser) => {
        const data = [
            userId,
            frdUser
        ]
        fetch(`${fullLink}/conversation-create`, {
            method: "POST",
            body: JSON.stringify({ data: data }),
            headers: {
                "x-auth-token": token,
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
        <div style={{ position: "relative", padding: "20px" }}>
            <TextField style={{ minWidth: "500px" }} variant='standard' label="Search Friends" value={type} la
                bel="Search frds" onChange={(e) => { handleChange(e.target.value) }} />
            <div className='filter-container' >
                {

                    type ? (usersData !== undefined ? (

                        usersData.filter((ele) => {
                            return ele.username != username
                        }).map((user) => {
                            return (
                                <div className='per-search'>
                                    <div>{user.username}</div>
                                    <Button sx={{ color: "rgb(219, 20, 20)", backgroundColor: "white" }} onClick={() => { sendRequest(user.user_id) }}>send request</Button>
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