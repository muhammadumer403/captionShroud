import React, { useState } from "react";
import AuthForm from "../componets/auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../utils/redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fields = [
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
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
      validator: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];
  const handleSubmit = async (data) => {
    try {
      dispatch(
        login({
          user: data,
          token: "dummy-token",
        })
      );

      alert("Login Successful");
      navigate("/upload");
    } catch (error) {
      setErrors({ message: "Invalid Credentials" });
    }
  };
  return (
    <div className="flex items-center justify-center !min-h-screen bg-zinc-900  ">
      <AuthForm fields={fields} onSubmit={handleSubmit} />
      {errors && <div className="text-red-600 mt-4">{errors.message}</div>}
    </div>
  );
};

export default Login;
