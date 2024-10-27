import React from 'react'

export default function MessageItem(props) {
  let isMyMessage = false
  const user = JSON.parse(localStorage.getItem("user"))
  if (user._id === props.messageData.senderID) {
    isMyMessage = true
  }

  return (
    <div className={`message-bubble ${isMyMessage? "my-message" : "other-message"}`}>

      {props.messageData && props.messageData.message}
    </div>
  )
}
