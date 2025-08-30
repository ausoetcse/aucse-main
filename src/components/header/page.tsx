"use client";
import Image from "next/image";
import React from "react";

interface TextProps {
  text: string;
  tagline?: string;
  className?: string;
}

const Header: React.FC<TextProps> = ({ text, tagline, className }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">


   
      <div className="flex justify-center flex-col max-w-full w-full mx-auto max-h-[500px]">
       <h1
          className={`w-full text-center font-extrabold relative tracking-wide uppercase leading-none text-zinc-900 font-special-gothic text-[clamp(1.25rem,5vw,3rem)] ${className}`}
        >
          {text}
        </h1>

            <div className="flex w-full justify-center items-center max-w-full mb-2 mx-auto px-6">
        {/* {tagline && (
          <span className="text-sm text-justify text-gray-600 font-ubuntu">{tagline}</span>
        )} */}
      </div>
        <span className="border border-black/20"></span>
      </div>

    

    </div>
  );
};

export default Header;
