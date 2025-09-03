import React, { useState } from "react";
import AuthForm from "../componets/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../utils/redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    {
      name: "username",
      type: "text",
      required: true,
      label: "Username",
      focused: false,
      validator: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
      focused: false,

      validator: {
        required: "Email is required",
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      type: "password",
      required: true,
      label: "Password",
      focused: false,

      validator: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      required: true,
      focused: false,
      label: "Confirm Password",
    },
  ]);
  const handleFocus = (id, focus) => {
    setFields((prev) =>
      prev.map((field) =>
        field.name === id ? { ...field, focused: focus } : field
      )
    );
    console.log(fields);
  };
  const handleSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      dispatch(
        loginSuccess({
          user: json,
          token: "SignUp-dummy-token",
        })
      );

      navigate("/upload");
      alert("welcome back" + json?.username);
      localStorage.setItem("token", "SignUp-dummy-token");
    } catch (error) {
      dispatch(loginFailure({ error: error.message }));
    }
  };

  return (
    <div className="flex items-center justify-center !min-h-screen bg-primary  max-h-screen overflow-hidden">
      <AuthForm fields={fields} onSubmit={handleSubmit} handleFocus={handleFocus} />
    </div>
  );
};

export default SignUp;
