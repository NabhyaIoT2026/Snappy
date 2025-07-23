import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  height: 10vh;
  border-top: 1px solid #1f1f3a;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: #ffff00c8;
        cursor: pointer;
        transition: transform 0.2s ease;
        &:hover {
          transform: scale(1.1);
        }
      }

      .emoji-picker-react {
        position: absolute;
        top: -360px;
        z-index: 100;
        background-color: #1f1f3a;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        border: 1px solid #9a86f3;
        border-radius: 1rem;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          width: 6px;
          background-color: transparent;

          &-thumb {
            background-color: #9a86f3;
            border-radius: 1rem;
          }
        }

        .emoji-categories button {
          filter: contrast(0);
        }

        .emoji-search {
          background-color: #080420;
          color: white;
          border: 1px solid #9a86f3;
        }

        .emoji-group:before {
          background-color: #1f1f3a;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff1a;
    border-radius: 2rem;
    padding: 0.5rem 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    input {
      flex: 1;
      background-color: transparent;
      color: #ffffff;
      border: none;
      font-size: 1.1rem;
      padding: 0.5rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #9a86f3;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;

      svg {
        font-size: 1.6rem;
        color: #ffffff;
        transition: transform 0.2s ease;
      }

      &:hover svg {
        transform: scale(1.1);
      }

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.4rem 1rem;

        svg {
          font-size: 1.2rem;
        }
      }
    }
  }
`;
