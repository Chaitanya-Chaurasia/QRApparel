"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Smartphone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState<"orderId" | "phoneNumber">(
    "orderId"
  );
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  // const [dbConnected, setDbConnected] = useState(false);
  // const [dbError, setDbError] = useState("");
  // const [message, setMessage] = useState("");
  // const router = useRouter();

  // useEffect(() => {
  //   const checkDbConnection = async () => {
  //     try {
  //       const res = await fetch("/api/check-db");
  //       if (res.ok) {
  //         setDbConnected(true);
  //         setMessage("Connected to database!");
  //       } else {
  //         setDbConnected(false);
  //         setDbError(
  //           "We're facing technical difficulties. Please try again later!"
  //         );
  //       }
  //     } catch (error) {
  //       setDbConnected(false);
  //       setDbError("Failed to check database connection." + error);
  //     }
  //   };

  //   checkDbConnection();
  // }, []);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   const loginData =
  //     loginMethod === "orderId"
  //       ? { orderId, password }
  //       : { phoneNumber, password };

  //   try {
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(loginData),
  //     });

  //     if (res.ok) {
  //       router.push("/dashboard");
  //     } else {
  //       setError("Login failed. Please check your credentials.");
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again." + error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center p-10 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tighter">
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <RadioGroup
              defaultValue="orderId"
              onValueChange={(value) =>
                setLoginMethod(value as "orderId" | "phoneNumber")
              }
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="orderId" id="orderId" />
                <Label htmlFor="orderId" className="flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Order ID
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phoneNumber" id="phoneNumber" />
                <Label htmlFor="phoneNumber" className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Phone Number
                </Label>
              </div>
            </RadioGroup>
            <div className="space-y-2">
              <Label
                htmlFor={loginMethod === "orderId" ? "orderId" : "phoneNumber"}
              >
                {loginMethod === "orderId" ? "Order ID" : "Phone Number"}
              </Label>
              <Input
                id={loginMethod === "orderId" ? "orderId" : "phoneNumber"}
                type={loginMethod === "orderId" ? "text" : "tel"}
                placeholder={
                  loginMethod === "orderId"
                    ? "Enter your Order ID"
                    : "Enter your Phone Number"
                }
                value={loginMethod === "orderId" ? orderId : phoneNumber}
                onChange={(e) =>
                  loginMethod === "orderId"
                    ? setOrderId(e.target.value)
                    : setPhoneNumber(e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black"
              // disabled={!dbConnected}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-row gap-2 items-center justify-center w-full">
          <Button variant="outline" asChild>
            <Link
              href="/login-otp"
              className="tracking-tighter bg-black text-white text-xs"
            >
              Log in with OTP
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              href="/register"
              className="tracking-tighter bg-black text-white text-xs"
            >
              First order? Get started here
            </Link>
          </Button>
        </CardFooter>
      </Card>
      {/* {dbError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{dbError}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {message && (
        <Alert className="mt-4">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )} */}
    </div>
  );
};

export default LoginPage;
