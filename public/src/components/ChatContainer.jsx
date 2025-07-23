import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.2rem;
  overflow: hidden;
  background-color: rgba(19, 19, 36, 0.8);
  backdrop-filter: blur(6px);

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid #ffffff25;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }
      }

      .username {
        h3 {
          color: #ffffff;
          font-size: 1.2rem;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff33;
      border-radius: 10px;
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 1rem 1.2rem;
        font-size: 1rem;
        border-radius: 1rem;
        color: #f1f1f1;
        word-break: break-word;
        transition: all 0.2s ease;

        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 75%;
        }
      }
    }

    .sended {
      justify-content: flex-end;

      .content {
        background: linear-gradient(135deg, #5d00ff33, #4e0eff44);
        box-shadow: 0 2px 8px rgba(78, 14, 255, 0.2);
        border-bottom-right-radius: 0;
      }
    }

    .recieved {
      justify-content: flex-start;

      .content {
        background: linear-gradient(135deg, #9900ff22, #6600ff30);
        box-shadow: 0 2px 8px rgba(153, 0, 255, 0.1);
        border-bottom-left-radius: 0;
      }
    }
  }
`;
