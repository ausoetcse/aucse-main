"use client";
import React from "react";

import Link from "next/link";
import ModernHeader from "@/components/header-old/page";
import FooterNewsletter from "@/components/footer/footer-newsletter";
import Navigation from "@/components/navbar/navbar";
import Image from "next/image";

const programs = [
  {
    title: "B.Tech",
    desc: "Undergraduate engineering program to build strong technical foundations.",
    href: "/programs/courses",
    className: "md:col-span-2 ",
    image: "/btech.jpg",
  },
  {
    title: "BCA",
    desc: "Bachelor of Computer Applications for future IT professionals.",
    href: "/programs/courses",
    className: "",
    image: "/bca.jpg",
  },
  {
    title: "M.Tech",
    desc: "Postgraduate program for advanced engineering and research.",
    href: "/programs/courses",
    className: "",
    image: "/mtech.jpg",
  },
  {
    title: "MCA",
    desc: "Master of Computer Applications for advanced IT and software expertise.",
    href: "/programs/courses",
    className: "md:col-span-2",
    image: "/mca.jpg",
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen flex flex-col">
        <Navigation />
      {/* Header */}
      <ModernHeader
        title="Programs"
        tagline="Explore our undergraduate and postgraduate programs designed to nurture innovators, engineers, and tech leaders."
        since="2014"
        navItems={[
          { label: "B.Tech", href: "/programs/courses" },
          { label: "M.Tech", href: "/programs/courses" },
          { label: "BCA", href: "/programs/courses" },
          { label: "MCA", href: "/programs/courses" },
        ]}
      />

      {/* Main Section */}
     <main
        id="programs"
        className="flex-1 flex justify-center items-center max-w-full mx-auto px-6 py-16"
        >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px] md:auto-rows-[250px]">
            {programs.map((program, i) => (
            <Link
                key={i}
                href={program.href}
                className={`relative rounded-md flex flex-col justify-between hover:scale-[1.02] transition-transform shadow-lg ${program.className} border-2 border-blue-900 shadow-inner overflow-hidden`}
            >
                {/* Background Image */}
                <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover opacity-40 "
                />

                {/* Content */}
                <div className="relative z-10 p-6 text-zinc-900">
                <h3 className="text-2xl font-bold font-special-gothic">
                    {program.title}
                </h3>
                <p className="text-sm opacity-90 font-ubuntu">{program.desc}</p>
                </div>
            </Link>
            ))}
        </div>
        </main>

      {/* Footer */}
      <FooterNewsletter />
    </div>
  );
}
