import React, { useEffect, useRef, useState } from 'react'
import Loader from '../../Components/Common/Loader'
import CustomAlert from '../../Components/Common/CustomAlert'
import Navbar from '../../Components/Common/Navbar'
import Footer from '../../Components/Common/Footer'
import ChatItem from '../../Components/Common/ChatItem'
import Messages from '../../Components/Common/Messages'
import showAlert from '../../utils/showAlert'
import MessageItem from '../../Components/Common/MessageItem'
import { FaMessage } from 'react-icons/fa6'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function Chats() {
    // IMPORTANT: Chats modal link https://chat.openai.com/share/be4a705c-dfbb-43dc-b28f-9952f2046eae
    const [showLoader, setShowLoader] = useState(false)
    const [fetchMessages, setFetchMessages] = useState(false) // if it is false then Welcome screen will appear
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [activeChatID, setActiveChatID] = useState('')
    const [chats, setChats] = useState([])
    const [userDetails, setUserDetails] = useState(null)
    const [receiverID, setReceiverID] = useState('')
    const chatContainerRef = useRef(null);

    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUserDetails(user)
    }, [])

    const fetchChatList = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chats/getContactList/${user._id}`)
            .then(res => {
                let response = res.data
                if (response.status) {
                    console.log(response.data)
                    setChats(response.data)
                }
                else {
                    setChats([])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchChatList()
    }, [])


    const fetchUserMessages = () => {
        const receipientID = searchParams.get('recepientID')
        setActiveChatID(receipientID)
        setReceiverID(receipientID)
        const user = JSON.parse(localStorage.getItem('user'))
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/chats/getMessages/${user._id}/${receipientID}`)
            .then(res => {
                let response = res.data
                if (response.status) {
                    console.log(response.data)
                    setFetchMessages(true)
                    setMessages(response.data)
                }
                else {
                    setChats([])
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (searchParams.size > 0 )
        fetchUserMessages()
    }, [activeChatID])


    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const sendMessage = async () => {
        try {
            if (newMessage.trim() !== '') {
                const messageData = {
                    senderID: userDetails._id,
                    receiverID: receiverID && receiverID,
                    message: newMessage,
                    timestamp: Date.now(),
                };

                setMessages((prevMessages) => [...prevMessages, messageData]);
                // setMessages((prevMessages) => [messageData, ...prevMessages]);

                axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chats/sendMessage`, messageData)
                    .then(res => {
                        let response = res.data
                        if (response.status) {
                            console.log(response.data)

                        }
                        else {
                            console.log("error sending")
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

                setNewMessage('');
                // console.log(messages)
            }
            else {
                showAlert("Type something to send a message", "danger")
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const setActiveChat = (chatID) => {
        setActiveChatID(chatID)
        // now fetch messages of user with id: chatID 
        setFetchMessages(true)
    }

    const fetchUserChats = (id) => {
        console.log(id)
        setReceiverID(id)
        navigate(`?recepientID=${id}`)
    }


    return (
        <>
            <Loader show={showLoader} />
            <CustomAlert />
            <Navbar />
            <section className="chats main-layout">
                <div className="custom-container">
                    <h4 className='my-2'>Chats</h4>
                    <div className="flex-layout">
                        <div className="side side-sm allchats">
                            <p className="paragraph-sm mb-3">ALL CONVERSATIONS</p>
                            {
                                chats && chats.length > 0 ? (
                                    chats.map((chatData, i) => {
                                        return (
                                            <ChatItem key={i} chatData={chatData} activeChatID={activeChatID} setActiveChat={setActiveChat} fetchUserChats={fetchUserChats} />
                                        )
                                    })
                                )
                                    :
                                    (
                                        <p>You have not chat with anyone</p>
                                    )

                            }
                        </div>
                        {/* <Messages chatContainerRef={chatContainerRef} messages={messages} setNewMessage={setNewMessage} newMessage={newMessage} handleSendMessage={handleSendMessage} /> */}
                        <div className='side side-xl profile-details messages-section' >
                            <div className="messages" ref={chatContainerRef}>
                                {
                                    fetchMessages ? (
                                        messages && messages.length > 0 ? (
                                            messages.map((message) => {
                                                return (
                                                    // <div key={message.time} className="message-bubble my-message">{message.message}</div>
                                                    <MessageItem key={message.createdAt} messageData={message} />
                                                )
                                            })
                                        )
                                            :
                                            (<p className='text-center'>No Chats found with this user</p>)
                                    )
                                        :
                                        (
                                            <div className="messageIntroSection d-flex flex-column align-items-center justify-content-center" style={{ height: "100%" }}>
                                                <FaMessage className='color-primary fs-1 mb-3' />
                                                <p>Welcome to Trip-Bidder Chats</p>
                                            </div>
                                        )
                                }

                            </div>
                            {
                                fetchMessages && (
                                    <div className="send-message form-group">
                                        <textarea row="1" type="text" id="" className="sendMessageInput" style={{ maxHeight: "50px" }} onChange={(e) => { setNewMessage(e.target.value) }} value={newMessage}></textarea>
                                        <button className="btn-nav" onClick={sendMessage}>Send</button>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
