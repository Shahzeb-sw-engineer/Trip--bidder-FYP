import React from 'react'

export default function Messages(props) {
    const onSendMessageClick = () => {
        props.handleSendMessage();
    };


    return (
        <div className='side side-xl profile-details messages-section' >
            <div className="messages" ref={props.chatContainerRef}>

                {
                    props.messages && props.messages.length > 0 ? (
                        props.messages.map((message) => {
                            return (
                                <div key={message.time} className="message-bubble my-message">{message.message}</div>
                            )
                        })
                    )
                        :
                        (<p className='text-center'>No Chats found with this user</p>)
                }
            </div>
            <div className="send-message form-group">
                <textarea row="1" type="text" id="" className="sendMessageInput" style={{ maxHeight: "50px" }} onChange={(e) => { props.setNewMessage(e.target.value) }} value={props.newMessage}></textarea>
                <button className="btn-nav" onClick={props.handleSendMessage}>Send</button>
            </div>
        </div>
    )
}
