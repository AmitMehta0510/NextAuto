import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/common/Button.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await register(userData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
