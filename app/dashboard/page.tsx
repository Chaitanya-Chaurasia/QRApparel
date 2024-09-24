"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface UserInfo {
  name: string;
  email: string;
  orderId: string;
  qrCode?: string;
  link?: string;
}

const Dashboard = () => {
  const searchParams = useSearchParams();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [newLink, setNewLink] = useState("");
  const emailOrOrderId = searchParams.get("emailOrOrderId");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (emailOrOrderId) {
      const fetchUserInfo = async () => {
        try {
          const res = await fetch(`/api/user?emailOrOrderId=${emailOrOrderId}`);
          if (res.status === 200) {
            const data: UserInfo = await res.json();
            if (data.qrCode) {
              setQrCode(data.qrCode);
              setLink(data.link || "");
            } else {
              setError("QR Code processing. Please try again later.");
            }
            setUserInfo(data);
          } else {
            setError("Failed to fetch user info.");
          }
        } catch (err) {
          setError("An error occurred while fetching user info.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [emailOrOrderId]);

  const handleUpdateLink = async () => {
    if (newLink.trim() === "") {
      setError("Link cannot be empty.");
      return;
    }

    try {
      const res = await fetch("/api/update-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrOrderId, newLink }),
      });

      if (res.status === 200) {
        setLink(newLink);
        setNewLink("");
        setError("");
      } else {
        setError("Failed to update link.");
      }
    } catch (err) {
      setError("An error occurred while updating the link.");
    }
  };

  const handleGenerateBitlyLink = async () => {
    if (!link) {
      setError("Link cannot be empty to generate a Bitly link.");
      return;
    }

    try {
      const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BITLY_BEARER || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_url: link }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Bitly link");
      }

      const bitlyData = await res.json();
      const bitlyLink = bitlyData.link;

      // Now save the Bitly link in your database and keep the QR code unchanged
      const updateRes = await fetch("/api/update-bitly-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrOrderId, bitlyLink }),
      });

      if (updateRes.ok) {
        setError("");
      } else {
        setError("Failed to update Bitly link.");
      }
    } catch (err) {
      setError("An error occurred while generating the Bitly link.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <div className="mt-5">
        <p>
          <strong>Name:</strong> {userInfo?.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo?.email}
        </p>
        <p>
          <strong>Order Id:</strong> {userInfo?.orderId}
        </p>
        {userInfo?.link && (
          <p>
            <strong>Link when you logged in:</strong> {userInfo?.link || link}
          </p>
        )}
        {qrCode ? (
          <Image src={qrCode} alt="QR Code" width={100} height={100} />
        ) : (
          <p>No QR Code available.</p>
        )}
      </div>
      <div className="border p-4 mt-5 flex flex-col items-center">
        {link && <p>Current Link: {link}</p>}
        <input
          type="text"
          placeholder="New Link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          className="mt-3 p-2 border"
        />
        <button onClick={handleUpdateLink} className="mt-3 p-2 border">
          Save Changes
        </button>
        <button
          onClick={handleGenerateBitlyLink}
          disabled={!link}
          className="mt-3 p-2 border"
        >
          Update Bitly Link
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Dashboard;
