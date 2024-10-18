"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [emailOrOrderId, setEmailOrOrderId] = useState("");
  const [error, setError] = useState("");
  const [dbConnected, setDbConnected] = useState(false); // Track DB connection status
  const [dbError, setDbError] = useState(""); // DB error message if connection fails
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Check database connection on component mount
  useEffect(() => {
    const checkDbConnection = async () => {
      try {
        const res = await fetch("/api/check-db");
        if (res.ok) {
          setDbConnected(true);
          setMessage("Connected to database!");
        } else {
          setDbConnected(false);
          setDbError(
            "We're facing technical difficulties. Please refresh again!"
          );
        }
      } catch (error) {
        setDbConnected(false);
        setDbError("Failed to check database connection.");
      }
    };

    checkDbConnection();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrOrderId }),
    });

    if (res.status === 200) {
      router.push(`/dashboard?emailOrOrderId=${emailOrOrderId}`);
    } else {
      setError("Login failed. Please check your email/order-id.");
    }
  };

  return (
    <div className=" flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold ">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-10 items-center"
      >
        <input
          type="text"
          placeholder="Email or Order ID"
          value={emailOrOrderId}
          onChange={(e) => setEmailOrOrderId(e.target.value)}
          className="bg-transparent border p-2 rounded-lg"
        />
        <button
          type="submit"
          disabled={!dbConnected}
          className="border rounded-lg w-44"
        >
          Login
        </button>
      </form>
      <p>
        First time?{" "}
        <Link href="/register">
          <span className="text-blue-600 underline">
            Register with OrderID!
          </span>
        </Link>
      </p>{" "}
      {/* Register link added */}
      {dbError && <p style={{ color: "red" }}>{dbError}</p>}{" "}
      {error && <p style={{ color: "yellow" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default LoginPage;
