"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [tempLink, setTempLink] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   if (!fullName || !email || !orderId || !qrCode || !tempLink) {
  //     setMessage("Please fill in all fields.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         fullName,
  //         email,
  //         orderId,
  //         qrCode,
  //         tempLink,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setMessage("User registered successfully!");
  //       setFullName("");
  //       setEmail("");
  //       setOrderId("");
  //       setQrCode("");
  //       setTempLink("");
  //     } else {
  //       setMessage(data.error || "Something went wrong.");
  //     }
  //   } catch (error) {
  //     setMessage("Error occurred while registering.");
  //   }

  //   setIsLoading(false);
  // };

  return (
    <div className="flex items-center justify-center p-10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tighter">
            Register
          </CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin bg-black" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {message && (
            <Alert
              variant={
                message.includes("successfully") ? "default" : "destructive"
              }
            >
              <AlertTitle>
                {message.includes("successfully") ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
