"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!email || !password) {
      setError("All fields are required"); 
      return 
    }
    if(password.length < 8) { 
      setError("Password must be at least 8 characters");
      return 
    }

    const response = await axios.post("http://localhost:3001/api/users", {
      email,
      password
    },{
      withCredentials: true
    });

    console.log(response);
    const status = response.status;

    if(status === 201){
      router.replace("/dashboard")
    }
    setError(response.data.error);
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="font-bold">
        Log in
      </p>
      <div className="flex flex-col justify-evenly rounded-2xl !p-5 bg-white h-screen max-h-[600px] w-full max-w-[500px]">
        <div>
          <div>Email</div>
          <input
            type="email"
            className="border-2 border-black"
            ref={emailRef}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            className="border-2 border-black"
            ref={passwordRef}
          />
        </div>
        { error ? (
          <p className="text-red-500">{ error }</p>
        ): null }
        <button onClick={handleSubmit} className="cursor-pointer !mt-5">Submit</button>
        
      </div>
    </div>
  );
};

export default Page;
