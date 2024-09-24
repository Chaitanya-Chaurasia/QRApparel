"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import bg from "@/public/bg.jpg";
// Navbar component
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold mr-20">QR Apparel</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Hero section component
const Hero = () => {
  return (
    <section className=" h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4">Your Identity, Your QR</h2>
        <p className="text-xl mb-6">
          Print your custom QR code on apparel, let others scan, and get to know
          you better.
        </p>
        <Link href="/signup">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-md text-lg">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

// Landing Page
const HomePage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   // Auto-redirect to login (optional)
  //   // router.push("/login");
  // }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Navbar />
      <Hero />
      <footer className=" p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} QR Apparel. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
