"use client";
import Image from "next/image";
import React from "react";

interface NavItem {
  label: string;
  targetId?: string; 
  href?: string; // id of the section
  count?: number;
}

interface ModernHeaderProps {
  title: string;
  tagline?: string;
  since?: string;
  lang?: string;
  navItems?: NavItem[];
}

const ModernHeader: React.FC<ModernHeaderProps> = ({
  title,
  tagline,
  since,
  lang = "EN",
  navItems = [],
}) => {
  return (
    <header className="w-full bg-gradient-to-b from-blue-800 to-blue-900 border-b border-gray-300 mt-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-6 py-10">
        {/* Left: Big Title */}
        <div className="flex items-start">
          <h1 className="w-full text-justify md:text-left text-[clamp(1.25rem,4vw,6rem)] font-bold leading-wide tracking-tight text-neutral-200 font-special-gothic">
            {title}.
          </h1>
        </div>

        {/* Right: Nav + Tagline + Info */}
        <div className="flex flex-col justify-between w-full overflow-hidden">
          {/* Nav */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 text-sm">
            <nav className="flex gap-2">
              {navItems.map((item, i) => (
                  <a
                  key={i}
                  href={`#${item.targetId}`}
                  className="flex items-center gap-1 text-white hover:text-blue-200 transition"
                >
                <span className="border-l border-gray-300 pl-2 text-xs  uppercase font-ubuntu">
                {item.label}
                  {item.count && (
                    <span className="text-gray-500">({item.count})</span>
                    
                )}
                </span>
                         
           
                </a>
                
            ))}
              
            </nav>
            <span className="border-l border-gray-300 pl-4 text-xs font-medium">
              <Image
              src="/logo.png"
              alt="OP Logo"
              width={24}
              height={24}
              />
            </span>
          </div>

          {/* Tagline */}
          {tagline && (
            <p className="text-lg md:text-2xl font-medium text-blue-200 py-6 leading-snug">
              {tagline}
            </p>
          )}

          {/* Since */}
          {since && (
            <div className="flex items-center gap-2 text-xs text-gray-100 mt-auto">
              <span className="px-2 py-1 border border-gray-400 rounded-sm uppercase">
                Shaping Future since
              </span>
              <span className="border border-gray-400 rounded px-3 py-1 font-medium">
                {since}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
