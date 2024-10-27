import React from 'react'
import defaultProfile from '../../assets/images/profile.jpg'

export default function ChatItem(props) {

    const handleChatClick = () => {
        props.setActiveChat(props.chatData.receiverDetails._id)
        props.fetchUserChats(props.chatData.receiverID)
    }

    return (
        <div className={`chat-item ${props.activeChatID === props.chatData.receiverDetails._id ? 'active' : ''}`} onClick={handleChatClick} >
            <div className="image">
                {/* <img src={props.chatData ? props.chatData.receiverDetails.profileImage : defaultProfile} alt="" /> */}
                <img src={defaultProfile} alt="" />
            </div>
            <div className="info">
                <p className='fs-6'>{props.chatData && props.chatData.receiverDetails.username}</p>
                <p className="paragraph-sm">{props.chatData && props.chatData.message}</p>
            </div>
        </div>
    )
}
