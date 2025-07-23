import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  padding: 1rem 0;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 2.5rem;
    }

    h3 {
      color: #ffffff;
      text-transform: uppercase;
      font-size: 1.3rem;
      letter-spacing: 1px;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    overflow-y: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }

    .contact {
      background-color: #ffffff1a;
      width: 100%;
      padding: 0.6rem 1rem;
      border-radius: 0.8rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background-color: #ffffff2b;
      }

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.1);
        }
      }

      .username {
        h3 {
          color: #ffffff;
          font-size: 1rem;
        }
      }
    }

    .selected {
      background-color: #9a86f3 !important;
      box-shadow: 0 0 12px rgba(154, 134, 243, 0.4);
    }
  }

  .current-user {
    background-color: #0d0d30;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    border-top: 1px solid #1f1f3a;

    .avatar {
      img {
        height: 3.5rem;
        border-radius: 50%;
      }
    }

    .username {
      h2 {
        color: white;
        font-size: 1.1rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.8rem;

      .username h2 {
        font-size: 0.9rem;
      }
    }
  }
`;
