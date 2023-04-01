import React, { useState } from 'react'

function Conversation() {
    const [msgbox, setMsgbox] = useState('')

    const handleSubmit = () => {
        console.log("helo")
    }


    return (
        <>


            <textarea value={msgbox} onChange={(e) => { setMsgbox(e.target.value) }}>Type message here...</textarea>
            <button onClick={() => { handleSubmit() }}>send</button>

        </>

    )
}

export default Conversation