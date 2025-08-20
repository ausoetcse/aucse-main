'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, ArrowLeft } from "lucide-react";
import { IconBrandGoogleMaps } from "@tabler/icons-react";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
   const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    formData.append("access_key", "be01cf84-0963-4f00-871a-e4de12fbcdaf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
      console.log("Success", data);
      toast.success("Message Sent!", {
        description: "Thank you for reaching out. We'll get back to you soon.",
        duration: 4000
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
      toast.error("Failed to Send", {
        description: data.message || "Something went wrong. Please try again.",
        duration: 5000
      });
    }
  };
  return (
    <main className="min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center py-12 px-4">
          <div className="flex justify-between items-start w-full top-0 absolute">                     
              <Link href="/" >
            <span className="m-4  rounded-2xl flex justify-center  items-center outline p-4 hover:bg-white hover:text-black transition ease-in-out duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />Go Back to Main Page
            </span>
          </Link>
          </div>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row overflow-hidden mb-6">


        {/* Left Section */}
        <section className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-special-gothic text-gray-900">Contact Us</h1>
            <p className="text-gray-500 mb-8 font-ubuntu">Department of Computer Science | Adamas University</p>
            <div className="space-y-6 text-gray-700 text-base">
              <div>
                <div className="font-semibold mb-1">Find us</div>
                <div className="flex gap-4 text-gray-500 text-lg">
                  <a href="tel:18004197423" target="_blank" rel="noopener noreferrer" aria-label="Call us">
                    <Phone className="h-5 w-5 hover:text-primary transition" />
                  </a>
                  <a href="https://instagram.com/adamasuniversity" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5 hover:text-pink-500 transition" />
                  </a>
                  <a href="https://facebook.com/adamasuniversitywestbengal" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5 hover:text-blue-600 transition" />
                  </a>
                  <a href="https://youtube.com/@adamasuniversitykolkata?si=wBSQDPbO3N63dx-g" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="h-5 w-5 hover:text-red-600 transition" />
                  </a>
                  <a href="https://linkedin.com/adamasuniversity" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5 hover:text-blue-700 transition" />
                  </a>
                  <a href="https://maps.app.goo.gl/uTHjfYFhinTzcqUQ8" target="_blank" rel="noopener noreferrer" aria-label="Maps">
                    <IconBrandGoogleMaps className="h-5 w-5 hover:text-green-600 transition" />
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <div className="font-semibold mb-1">Address</div>
                <div className="flex flex-1 items-start justify-start flex-col gap-2 text-blue-500 text-start w-full">
                  Adamas University, Barasat - Barrackpore Rd, Jagannathpur, Kolkata, West Bengal 700126
              <div className="overflow-hidden rounded-sm shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14718.916880339579!2d88.43755960464475!3d22.738303787598152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f898ec702e5daf%3A0xfa41b06da8478350!2sAdamas%20University!5e0!3m2!1sen!2sin!4v1755687968336!5m2!1sen!2sin"
                    width="400"
                    height="300"
                    style={{  padding: "10px", background: "#d6d6d6" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone className="w-4 h-4" />
                  
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  ausoetcse@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section: Contact Form */}
        <section className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-[#fafbfc]">
          <form className="w-full max-w-lg mx-auto space-y-8" onSubmit={onSubmit}>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 tracking-tight">Say hello</h2>
            <p className="text-gray-500 mb-6 text-base">We would love to hear from you. Fill out the form and our team will get back to you soon.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="font-medium">Name</Label>
                <Input id="name" name="name" placeholder="Your name" autoComplete="name" className="mt-2 focus:ring-2 focus:ring-primary/50 transition" />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Email address" autoComplete="email" required className="mt-2 focus:ring-2 focus:ring-primary/50 transition" />
              </div>
              <div>
                <Label htmlFor="department" className="font-medium">Department</Label>
                <Select name="department">
                  <SelectTrigger id="department" className="mt-2 w-full focus:ring-2 focus:ring-primary/50 transition">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="AIML">AIML</SelectItem>
                    <SelectItem value="CSBS">CSBS</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject" className="font-medium">Subject</Label>
                <Select name="subject">
                  <SelectTrigger id="subject" className="mt-2 w-full focus:ring-2 focus:ring-primary/50 transition">
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="font-medium">Message</Label>
              <textarea
                id="message"
                name="message"
                placeholder="Start typing here..."
                className="mt-2 min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/50 transition outline-none"
              />
            </div>
            <div className="pt-2 flex justify-center w-full">
              <Button 
              
              type="submit" className="group flex items-center w-full gap-2 font-semibold px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 shadow-md transition">
                Submit <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
