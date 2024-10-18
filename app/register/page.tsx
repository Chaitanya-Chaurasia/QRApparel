"use client";
import React, { useState } from "react";
const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [qrCode, setQrCode] = useState(""); // To store the scanned QR code
  const [tempLink, setTempLink] = useState(""); // To store the temporary link
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false); // To handle scanning state

  const handleScan = (data: any) => {
    if (data) {
      setQrCode(data.text); // Store scanned QR code
      setScanning(false); // Stop scanning after successful scan
    }
  };

  const handleError = (error: any) => {
    console.error(error);
    setMessage("Error occurred while scanning QR code.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!fullName || !email || !orderId || !qrCode || !tempLink) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          orderId,
          qrCode, // Include QR code in the request
          tempLink, // Include the temporary link in the request
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
        setFullName("");
        setEmail("");
        setOrderId("");
        setQrCode("");
        setTempLink("");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error occurred while registering.");
    }
  };

  const previewStyle = {
    height: 240,
    width: 320,
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
        {!qrCode && (
          <div className="space-x-5">
            <button
              type="button"
              onClick={() => setScanning(true)} // Enable scanning mode
              className="border p-2 rounded-lg"
            >
              Scan QR Code
            </button>
          </div>
        )}
        {scanning && (
          <div>
            <button
              type="button"
              onClick={() => setScanning(false)} // Allow users to stop scanning
              className="border p-2 mt-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
        {qrCode && (
          <div className="space-x-5">
            <p>QR Code Scanned: {qrCode}</p>
            <label>Temporary Link:</label>
            <input
              type="text"
              value={tempLink}
              onChange={(e) => setTempLink(e.target.value)}
              placeholder="Enter a temporary link"
              required
              className="rounded-lg border"
            />
            <p className="text-xs">This link can be changed later.</p>
          </div>
        )}
        <button type="submit" className="border p-3 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
