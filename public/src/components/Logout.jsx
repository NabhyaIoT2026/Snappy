import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  svg {
    font-size: 1.4rem;
    color: #ffffff;
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: #7c6bf0;
    transform: scale(1.05);

    svg {
      color: #e0d4ff;
    }
  }

  &:active {
    transform: scale(0.97);
  }
`;
