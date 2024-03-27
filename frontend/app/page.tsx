"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://mind-care-server-t1by.vercel.app/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
          }),
        }
      );

      if (!email) {
        throw new Error("Email is required");
      }

      if (!name) {
        throw new Error("Password is required");
      }

      if (response.status === 200) {
        toast.success("Logged in successfully");
        const data = await response.json();

        console.log(data);
      } else {
        toast.error("Invalid name or password");
      }
    } catch (error: any) {
      toast.error(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-sky-400 to-blue-900">
      <div className="w-full flex flex-col mt-16">
        <div className="border-gray-300 p-8 mt-4 md:mt-6">
          <h2 className="text-white text-3xl text-center  font-semibold mb-2">
            Welcome back
          </h2>
          <p className=" text-whitetext-md text-center  mb-4">
            Enter your account details
          </p>

          <div className="md:w-72 lg:w-80 mx-auto">
            <div className="mb-4">
              <label className="font-bold text-white">Name</label>
              <input
                className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="mb-2">
              <label className="font-bold text-white">Email</label>
              <input
                className="w-full px-3 py-2 border bg-gray-100 text-black rounded-lg placeholder-gray-900 focus:outline-none border-gray-400"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <button
              disabled={loading}
              onClick={handleLogin}
              className="w-full px-3 mt-8 py-2 border font-semibold text-gray-100 bg-black rounded-lg focus:outline-none focus:border-gray-900 hover:bg-gray-900"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
