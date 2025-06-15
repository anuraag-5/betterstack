"use client";

import { useRef } from "react";

const Page = () => {
  const emailRef = useRef<HTMLDivElement | null>(null);
  const passwordRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="rounded-2xl !p-5 bg-white h-screen max-h-[600px] w-full max-w-[500px]">
        <div ref={emailRef}>Email</div>
        <div ref={passwordRef}>Password</div>
      </div>
    </div>
  );
};

export default Page;
