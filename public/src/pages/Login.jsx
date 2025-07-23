import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  padding: 1rem;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;

    img {
      height: 4.5rem;
    }

    h1 {
      color: #ffffff;
      text-transform: uppercase;
      font-size: 2rem;
      letter-spacing: 1px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease-in-out;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 1px solid #4e0eff;
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 1rem;
    transition: border 0.2s;

    &:focus {
      border-color: #997af0;
      outline: none;
    }
  }

  button {
    background: linear-gradient(135deg, #6e3bff, #4e0eff);
    color: #ffffff;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #7e5aff, #5e2eff);
    }
  }

  span {
    color: #ffffff;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
