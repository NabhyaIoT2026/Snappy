import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!user) navigate("/login");
  }, [navigate]);

  const generateRandomName = () => Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    const generateAvatars = () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const randomName = generateRandomName();
        const svgCode = multiavatar(randomName);
        const encoded = btoa(unescape(encodeURIComponent(svgCode)));
        data.push(encoded);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    generateAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image: avatars[selectedAvatar],
    });

    if (data.isSet) {
      user.isAvatarImageSet = true;
      user.avatarImage = data.image;
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      navigate("/");
    } else {
      toast.error("Error setting avatar. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  height: 100vh;
  width: 100vw;
  padding: 2rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      font-size: 2rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;

    .avatar {
      border: 0.3rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease, border 0.3s ease;
      background-color: rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      img {
        height: 6rem;
        border-radius: 50%;
        transition: transform 0.3s ease;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    .selected {
      border: 0.3rem solid #4e0eff;
      box-shadow: 0 0 20px #4e0effaa;
      background-color: rgba(78, 14, 255, 0.1);
    }
  }

  .submit-btn {
    background: linear-gradient(135deg, #4e0eff, #6c3bff);
    color: white;
    padding: 1rem 2.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.6rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
      background: linear-gradient(135deg, #5e2eff, #7a5cff);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    gap: 2rem;

    .avatars {
      gap: 1.2rem;

      .avatar img {
        height: 5rem;
      }
    }

    .submit-btn {
      font-size: 1rem;
      padding: 0.8rem 2rem;
    }
  }
`;

