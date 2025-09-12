import React, { useState } from "react";
import AuthForm from "../componets/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../utils/redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user, token, errors } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [fields, setFields] = useState([
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
  ]);
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
          token: "login-dummy-token",
        })
      );
      console.log(json);
      navigate("/upload");
      alert("welcome back" + json?.email);
      localStorage.setItem("token", "login-dummy-token");
    } catch (error) {
      dispatch(loginFailure({ error: error.message }));
    }
  };
  const handleFocus = (id, focusInput) => {
    setFields((prev) =>
      prev.map((field) =>
        field.name === id ? { ...field, focused: focusInput } : field
      )
    );
    console.log(fields);
  };
  return (
    <div className="flex items-center justify-center !min-h-screen bg-primary max-h-screen overflow-hidden">
      
      <AuthForm
        fields={fields}
        onSubmit={handleSubmit}
        handleFocus={handleFocus}
      />
      {errors && <div className="text-red-600 mt-4">{errors.message}</div>}
    </div>
  );
};

export default Login;
