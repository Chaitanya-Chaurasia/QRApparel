"use client";
import React, { useState } from "react";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!fullName || !email || !orderId) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, orderId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setFullName("");
        setEmail("");
        setOrderId("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error occurred while registering.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <h2 className="text-3xl font-bold">Register</h2>
      {message && <p>{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-end items-end gap-2"
      >
        <div className="space-x-5">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="rounded-lg border"
          />
        </div>
        <div className="space-x-5">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border"
          />
        </div>
        <div className="space-x-5">
          <label>Order ID:</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="rounded-lg border"
          />
        </div>
        <button type="submit" className="border p-3 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
