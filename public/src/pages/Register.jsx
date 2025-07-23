import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
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
    margin-bottom: 1.5rem;

    img {
      height: 4.5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2rem;
      letter-spacing: 1px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 3rem 4rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease-in-out;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 1px solid #4e0eff;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    transition: border 0.2s ease;

    &:focus {
      border-color: #997af0;
      outline: none;
    }
  }

  button {
    background: linear-gradient(135deg, #4e0eff, #6c3bff);
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #6d4eff, #7f5aff);
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s ease;

      &:hover {
        text-decoration: underline;
        color: #a78bfa;
      }
    }
  }

  @media screen and (max-width: 480px) {
    form {
      padding: 2rem;
      border-radius: 1rem;
    }

    .brand h1 {
      font-size: 1.5rem;
    }
  }
`;

