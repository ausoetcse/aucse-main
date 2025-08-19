'use client';

import { IconBrandGoogleMaps } from "@tabler/icons-react";
import { Instagram, Linkedin, Youtube, Facebook, Phone } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";
const footerColumns = [
	{
		title: 'Explore',
		links: [
			{ name: 'NAAC', href: 'https://www.aucse.in/naac' },
			{ name: 'Clubs', href: 'https://www.aucse.in/club' },
			{ name: 'Downloads', href: 'https://www.aucse.in/downloads' },
		],
	},
	{
		title: 'Study With Us',
		links: [
			{ name: 'Syllabus', href: 'https://www.aucse.in/syllabus' },
			{ name: 'Projects', href: 'https://www.aucse.in/projects' },
			{ name: 'Placements', href: 'https://www.aucse.in/placements' },
		],
	},
	{
		title: 'Research',
		links: [
			{ name: 'Media Release', href: 'https://www.aucse.in/media-release' },
			{ name: 'Blogs', href: 'https://www.aucse.in/blogs' },
			{ name: 'People', href: 'https://www.aucse.in/people' },
		],
	},
	{
		title: 'Connect',
		links: [
			{ name: 'Career Cell', href: 'https://www.aucse.in/career' },
			{ name: 'Placement', href: 'https://www.aucse.in/placement' },
			{ name: 'Office', href: 'https://www.aucse.in/contact' },
			{ name: 'Our Team', href: '/dev' },
		],
	},
];

const legalLinks = [
	{ name: 'Terms of Service', href: 'https://www.aucse.in/terms' },
	{ name: 'Privacy Policy', href: 'https://www.aucse.in/privacy' },
	{ name: 'Cookie Settings', href: 'https://www.aucse.in/cookies' },
	{ name: 'Accessibility', href: 'https://www.aucse.in/accessibility' },
];

const socialIcons = [
	{ icon: <Phone className="h-5 w-5" />, href: "tel:18004197423", label: "Call us" },
	{ icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/adamasuniversity", label: "Instagram" },
	{ icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com/adamasuniversitywestbengal", label: "Facebook" },
	{ icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/@adamasuniversitykolkata?si=wBSQDPbO3N63dx-g", label: "YouTube" },
	{ icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/adamasuniversity", label: "LinkedIn" },
	{ icon: <IconBrandGoogleMaps className="h-5 w-5" />, href: "https://maps.app.goo.gl/uTHjfYFhinTzcqUQ8", label: "Maps" },
];

export default function FooterNewsletter() {
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
      toast.success("Success!", {
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
		<footer className="relative w-full pb-10 pt-20 bg-zinc-900 text-white">
			<div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
				<div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-blue-600 opacity-10 blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-600 opacity-10 blur-3xl" />
			</div>
			<div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
				{/* Newsletter Section */}
				<div className="glass-effect mb-16 rounded-2xl p-8 md:p-12 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
					<div className="grid items-center gap-8 md:grid-cols-2">
						<div>
							<h3 className="mb-4 text-2xl  md:text-3xl text-white font-special-gothic">
								Stay Updated with Adamas University
							</h3>
							<p className="mb-6 text-gray-300 font-ubuntu">
								Join thousands of students and professionals who trust Adamas University for cutting-edge education and career opportunities.
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
							<form className="flex flex-col gap-4 sm:flex-row" onSubmit={onSubmit}>
								<input
									type="email"
									name="email"
									required
									placeholder="Enter your email"
									className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 font-ubuntu"
								/>
								<button type="submit" className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-medium shadow-lg shadow-blue-600/20 transition hover:shadow-blue-600/30 hover:scale-105 font-ubuntu">
									Subscribe
								</button>
							</form>
							</div>
						</div>
						<div className="hidden justify-end md:flex">
							<div className="relative">
								<div className="absolute inset-0 rotate-6 rounded-xl " />
								<Image
									src="/logo_op.png"
									alt="Adamas University"
									width={300}
									height={200}
									className="relative w-60 rounded-xl object-cover"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
					<div className="col-span-2 lg:col-span-1">
						<div className="mb-6 flex items-center space-x-2">
							<Image src="/logo.png" alt="Adamas Logo" width={60} height={60} className="h-15 w-15 object-contain" />
							<span className="text-xl  font-special-gothic">Adamas University</span>
						</div>
						<p className="mb-6 text-gray-400 font-ubuntu">
							Empowering students with world-class education, innovative research, and exceptional career opportunities in computer science and engineering.
						</p>
						<div className="flex space-x-4">
							{socialIcons.map((item, i) => (
								<a
									key={i}
									href={item.href}
									aria-label={item.label}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 hover:bg-blue-600 transition-all duration-300 text-gray-300 hover:text-white"
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					{footerColumns.map((col) => (
						<div key={col.title}>
							<h4 className="mb-4 text-lg font-semibold text-white font-ubuntu">{col.title}</h4>
							<ul className="space-y-3">
								{col.links.map((link) => (
									<li key={link.name}>
										<a
											href={link.href}
											className="text-gray-400 hover:text-white transition-colors duration-300 font-ubuntu"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="flex flex-col items-center justify-between border-t border-zinc-700 pt-8 md:flex-row">
					<p className="mb-4 text-sm text-gray-400 md:mb-0 font-ubuntu">
						© 2025 Adamas University. All rights reserved.
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						{legalLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-ubuntu"
							>
								{link.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
