"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, Code, Palette, Server, GraduationCap, Search, ArrowLeft, Star, Award, Users, Zap, Target, Heart, Sparkles } from 'lucide-react'
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ScrollAnimation, StaggeredAnimation } from "@/components/ui/scroll-animation"
import FooterNewsletter from "@/components/mvpblocks/footer-newsletter"

type TeamMember = {
  id: string
  name: string
  role: string
  designation: string
  year: string
  image: string
  fullImage: string
  group: "mentors" | "frontend" | "backend" | "design" | "fullstack"
  bio: string
  skills: string[]
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  location: string
  experience: string
  achievements?: string[]
  quote?: string
  color?: string
  specialty?: string
}

const teamData: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sajal Saha",
    role: "Project Mentor",
    designation: "HOD Computer Science",
    year: "Faculty",
    image: "/faculty/sajal_saha.png?height=200&width=200&text=Dr.+Sajal",
    fullImage: "/faculty/sajal_saha.png?height=600&width=400&text=Dr.+Sajal+Saha",
    group: "mentors",
    bio: "Leading computer science education with 15+ years of experience in software engineering and research. Passionate about nurturing the next generation of developers.",
    skills: ["Research", "Software Architecture", "Team Leadership", "Academic Excellence", "Machine Learning"],
    social: {
      linkedin: "#",
      email: "sajal.saha@college.edu",
    },
    location: "Kolkata, India",
    experience: "15+ years",
    achievements: ["Published 50+ Research Papers", "IEEE Senior Member", "Best Teacher Award 2023"],
    quote: "Innovation distinguishes between a leader and a follower.",
    color: "from-zinc-800 via-zinc-700 to-zinc-600",
    specialty: "Academic Leadership"
  },
  {
    id: "2",
    name: "Prof. Prabhat Das",
    role: "Technical Advisor",
    designation: "Associate Professor",
    year: "Faculty",
    image: "/faculty/prabhat_das.png?height=200&width=200&text=Prof.+Prabhat",
    fullImage: "/faculty/prabhat_das.png?height=200&width=400&text=Prof.+Prabhat+Das",
    group: "mentors",
    bio: "Expert in web technologies and database systems with a passion for innovative teaching methods and student mentorship.",
    skills: ["Database Design", "Web Technologies", "System Analysis", "Mentoring", "Cloud Computing"],
    social: {
      linkedin: "#",
      email: "prabhat.das@college.edu",
    },
    location: "Kolkata, India",
    experience: "12+ years",
    achievements: ["Database Expert Certification", "Google Cloud Certified", "Student Mentor of the Year"],
    quote: "Teaching is the profession that creates all other professions.",
    color: "from-blue-900 via-blue-800 to-blue-700",
    specialty: "Database Systems"
  },
  {
    id: "3",
    name: "Prof. Ayushman Bilas Thakur",
    role: "Technical Advisor",
    designation: "Associate Professor",
    year: "Faculty",
    image: "/faculty/ayushman_bilas_thakur.png?height=200&width=200&text=Prof.+Ayushman",
    fullImage: "/faculty/ayushman_bilas_thakur.png?height=600&width=400&text=Prof.+Ayushman+Thakur",
    group: "mentors",
    bio: "Specialist in artificial intelligence and machine learning with extensive research background in computational intelligence.",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Science", "Research", "Python"],
    social: {
      linkedin: "#",
      email: "ayushman.thakur@college.edu",
    },
    location: "Kolkata, India",
    experience: "10+ years",
    achievements: ["AI Research Excellence Award", "TensorFlow Certified", "Published ML Textbook"],
    quote: "The future belongs to those who understand data.",
    color: "from-zinc-700 via-zinc-600 to-zinc-500",
    specialty: "AI & ML"
  },
  {
    id: "4",
    name: "Subham Karmakar",
    role: "Frontend Developer",
    designation: "Lead Developer",
    year: "2024",
    image: "/team/subham.jpg?height=400&width=400&text=Subham",
    fullImage: "/team/subham.jpg?height=200&width=200&text=Priyam",
    group: "frontend",
    bio: "Passionate Frontend developer with expertise in modern web technologies. Loves creating beautiful and functional user interfaces.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "UI/UX"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "rikk4335@gmail.com",
    },
    location: "Kolkata, India",
    experience: "3 years",
    achievements: ["React Certified Developer", "Hackathon Winner 2023", "Open Source Contributor"],
    quote: "Code is poetry written in logic.",
    color: "from-blue-800 via-blue-700 to-blue-600",
    specialty: "React & Next.js"
  },
  {
    id: "5",
    name: "Snehasish Mondal",
    role: "Frontend Developer",
    designation: "UI Specialist",
    year: "2023",
    image: "/team/snehasish.png?height=200&width=200&text=Snehasish",
    fullImage: "/placeholder.svg?height=600&width=400&text=Snehasish+Mondal",
    group: "frontend",
    bio: "Creative frontend developer with a passion for crafting exceptional user experiences and responsive web applications.",
    skills: ["React", "Vue.js", "CSS3", "SASS", "Animation", "Responsive Design"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "snehasish@example.com",
    },
    location: "Kolkata, India",
    experience: "2 years",
    achievements: ["CSS Animation Expert", "Design System Creator", "Frontend Mentor"],
    quote: "Design is not just what it looks like - design is how it works.",
    color: "from-zinc-600 via-zinc-500 to-zinc-400",
    specialty: "UI/UX Design"
  },
  {
    id: "6",
    name: "Souvik Biswas",
    role: "Frontend Developer",
    designation: "React Specialist",
    year: "2023",
    image: "/placeholder.svg?height=200&width=200&text=Souvik",
    fullImage: "/placeholder.svg?height=600&width=400&text=Souvik+Biswas",
    group: "frontend",
    bio: "React enthusiast with strong problem-solving skills and attention to detail in creating pixel-perfect interfaces.",
    skills: ["React", "Redux", "JavaScript", "HTML5", "CSS3", "Git"],
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
      email: "souvik@example.com",
    },
    location: "Kolkata, India",
    experience: "2 years",
    achievements: ["React Expert Badge", "Code Review Champion", "Team Collaboration Award"],
    quote: "Every expert was once a beginner.",
    color: "from-blue-700 via-blue-600 to-blue-500",
    specialty: "React Ecosystem"
  },
  {
    id: "7",
    name: "Priyam Ghorui",
    role: "Backend Developer",
    designation: "API Architect",
    year: "2024",
    image: "/team/priyam.png?height=200&width=200&text=Priyam",
    fullImage: "/placeholder.svg?height=600&width=400&text=Priyam+Ghorui",
    group: "backend",
    bio: "Backend specialist focused on scalable architectures and high-performance API development with expertise in microservices.",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Microservices", "AWS"],
    social: {
      github: "#",
      linkedin: "#",
      email: "priyam@example.com",
    },
    location: "Kolkata, India",
    experience: "2.5 years",
    achievements: ["AWS Certified", "API Design Expert", "Performance Optimization Specialist"],
    quote: "Scalability is not an afterthought, it's a mindset.",
    color: "from-zinc-800 via-zinc-700 to-zinc-600",
    specialty: "Backend Architecture"
  },
  {
    id: "8",
    name: "Pratyasha Basak",
    role: "UI/UX Designer",
    designation: "Designer",
    year: "2023",
    image: "/placeholder.svg?height=200&width=200&text=Pratyasha",
    fullImage: "/placeholder.svg?height=600&width=400&text=Pratyasha+Banik",
    group: "design",
    bio: "Creative designer with a keen eye for user experience and modern design principles. Specializes in creating intuitive and beautiful interfaces.",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems", "Illustration"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "pratyasha@example.com",
    },
    location: "Kolkata, India",
    experience: "2 years",
    achievements: ["Design Excellence Award", "UX Research Certified", "Dribbble Featured Designer"],
    quote: "Good design is invisible, great design is unforgettable.",
    color: "from-blue-900 via-blue-800 to-blue-700",
    specialty: "Creative Design"
  },
    {
    id: "9",
    name: "Subarthy Kuiry",
    role: "React Developer",
    designation: "Frontend Developer",
    year: "2023",
    image: "/placeholder.svg?height=200&width=200&text=Pratyasha",
    fullImage: "/placeholder.svg?height=600&width=400&text=Pratyasha+Banik",
    group: "frontend",
    bio: "Creative designer with a keen eye for user experience and modern design principles. Specializes in creating intuitive and beautiful interfaces.",
    skills: ["React","Node.Js"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "#",
    },
    location: "Kolkata, India",
    experience: "2 years",
    achievements: ["Design Excellence Award", "UX Research Certified", "Dribbble Featured Designer"],
    quote: "Good design is invisible, great design is unforgettable.",
    color: "from-blue-900 via-blue-800 to-blue-700",
    specialty: "Creative Design"
  },
    {
    id: "8",
    name: "Sneha Bhowmick",
    role: "UI/UX Designer",
    designation: "Designer",
    year: "2023",
    image: "/placeholder.svg?height=200&width=200&text=Pratyasha",
    fullImage: "/placeholder.svg?height=600&width=400&text=Pratyasha+Banik",
    group: "design",
    bio: "Creative designer with a keen eye for user experience and modern design principles. Specializes in creating intuitive and beautiful interfaces.",
    skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems", "Illustration"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sneha@example.com",
    },
    location: "Kolkata, India",
    experience: "2 years",
    achievements: ["Design Excellence Award", "UX Research Certified", "Dribbble Featured Designer"],
    quote: "Good design is invisible, great design is unforgettable.",
    color: "from-blue-900 via-blue-800 to-blue-700",
    specialty: "Creative Design"
  },
]

const groups = [
  {
    label: "Faculty & Mentors",
    key: "mentors" as const,
    icon: GraduationCap,
    gradient: "from-zinc-800 via-zinc-700 to-zinc-600",
    description: "Academic leaders guiding innovation"
  },
  {
    label: "Frontend Team",
    key: "frontend" as const,
    icon: Palette,
    gradient: "from-blue-800 via-blue-700 to-blue-600",
    description: "Crafting beautiful user experiences"
  },
  {
    label: "Backend Team",
    key: "backend" as const,
    icon: Server,
    gradient: "from-zinc-700 via-zinc-600 to-zinc-500",
    description: "Building robust server solutions"
  },
  {
    label: "Design Team",
    key: "design" as const,
    icon: Sparkles,
    gradient: "from-blue-900 via-blue-800 to-blue-700",
    description: "Creating visual magic"
  },
]

export default function TeamPortfolio() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const filteredMembers = teamData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesGroup = selectedGroup === "all" || member.group === selectedGroup
    return matchesSearch && matchesGroup
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-gray-50 to-slate-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/90 via-gray-50/50 to-slate-50/70"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-zinc-300/10 to-gray-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-300/8 to-slate-300/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-gray-300/10 to-zinc-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-slate-300/8 to-blue-300/8 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <ScrollAnimation animation="slideDown">
          <header className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-gray-800 to-slate-800"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-6 py-20">
              <div className="text-center text-white">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <Image
                    src="/logo.png"
                    alt="Adamas Logo"
                    width={120}
                    height={120}
                    className="mx-auto h-24 w-24 object-contain drop-shadow-2xl"
                  />
                </motion.div>
                
                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-zinc-100 bg-clip-text text-transparent"
                >
                  Meet Our Team
                </motion.h1>
                
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                >
                  The brilliant minds behind Adamas University's Department of Computer Science
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex justify-center gap-4"
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Users className="h-5 w-5" />
                    <span className="font-medium">{teamData.length} Team Members</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Zap className="h-5 w-5" />
                    <span className="font-medium">Innovation Driven</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">Excellence Focused</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </header>
        </ScrollAnimation>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Back Button */}
          <ScrollAnimation animation="slideLeft">
            <Link href="/">
              <Button
                variant="ghost"
                className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/80 px-6 py-3 h-auto mb-12 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Home</span>
              </Button>
            </Link>
          </ScrollAnimation>

          {/* Search and Filter */}
          <ScrollAnimation animation="slideUp" delay={0.2}>
            <div className="mb-16">
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search team members, skills, or roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3 flex-wrap">
                                  <Button
                    variant={selectedGroup === "all" ? "default" : "outline"}
                    onClick={() => setSelectedGroup("all")}
                    className={
                      selectedGroup === "all"
                        ? "bg-gradient-to-r from-zinc-800 via-gray-700 to-slate-700 hover:from-zinc-900 hover:via-gray-800 hover:to-slate-800 text-white shadow-lg"
                        : "border-slate-300 text-slate-600 hover:bg-white/80 hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                    }
                  >
                    All Teams
                  </Button>
                {groups.map(({ label, key, gradient }) => (
                  <Button
                    key={key}
                    variant={selectedGroup === key ? "default" : "outline"}
                    onClick={() => setSelectedGroup(key)}
                    className={
                      selectedGroup === key
                        ? `bg-gradient-to-r ${gradient} hover:shadow-lg text-white transition-all duration-300`
                        : "border-slate-300 text-slate-600 hover:bg-white/80 hover:shadow-md transition-all duration-300 backdrop-blur-sm"
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Team Groups */}
          {groups.map(({ label, key, icon: Icon, gradient, description }) => {
            const members = filteredMembers.filter((m) => m.group === key)
            if (members.length === 0) return null

            return (
              <ScrollAnimation key={key} animation="slideUp" delay={0.3}>
                <section className="mb-24">
                  <div className="flex items-center gap-6 mb-12">
                    <div className={`p-6 rounded-3xl bg-gradient-to-r ${gradient} shadow-xl`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-slate-800 mb-2">{label}</h2>
                      <p className="text-slate-600 text-lg">{description}</p>
                      <p className="text-slate-500 font-medium">
                        {members.length} talented member{members.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <StaggeredAnimation animation="slideUp" staggerDelay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {members.map((member) => (
                        <motion.div
                          key={member.id}
                          onHoverStart={() => setHoveredMember(member.id)}
                          onHoverEnd={() => setHoveredMember(null)}
                          whileHover={{ y: -10, scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                          className="mb-8"
                        >
                          <Card className="group cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <CardContent className="p-0">
                              {/* Header with gradient */}
                              <div className={`relative h-24 bg-gradient-to-r ${member.color} p-6 flex items-end`}>
                                <div className="absolute inset-0 bg-black/20"></div>
                              </div>

                              {/* Avatar */}
                              <div className="relative -mt-12 px-6">
                                <div className="relative">
                                  <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl mx-auto">
                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700">
                                      {member.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full p-2 shadow-lg">
                                    <Star className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 pt-8">
                                <div className="text-center mb-4">
                                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                  <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                                  <p className="text-slate-600 font-medium mb-1">{member.designation}</p>
                                  <p className="text-sm text-slate-500">{member.specialty}</p>
                                </div>

                                <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed text-center">
                                  {member.bio}
                                </p>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                  {member.skills.slice(0, 3).map((skill) => (
                                    <Badge
                                      key={skill}
                                      variant="secondary"
                                      className="text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-300"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                  {member.skills.length > 3 && (
                                    <Badge variant="outline" className="text-xs font-medium border-slate-300 text-slate-600">
                                      +{member.skills.length - 3}
                                    </Badge>
                                  )}
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-2 justify-center mb-4">
                                  {member.social.github && (
                                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-slate-100 rounded-full">
                                      <Github className="h-4 w-4 text-slate-600" />
                                    </Button>
                                  )}
                                  {member.social.linkedin && (
                                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-blue-50 rounded-full">
                                      <Linkedin className="h-4 w-4 text-blue-600" />
                                    </Button>
                                  )}
                                  {member.social.twitter && (
                                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-sky-50 rounded-full">
                                      <Twitter className="h-4 w-4 text-sky-600" />
                                    </Button>
                                  )}
                                  {member.social.email && (
                                    <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-green-50 rounded-full">
                                      <Mail className="h-4 w-4 text-green-600" />
                                    </Button>
                                  )}
                                </div>

                                {/* View Profile Button */}
                                <Button
                                  onClick={() => setSelectedMember(member)}
                                  className="w-full bg-gradient-to-r from-zinc-800 via-gray-700 to-slate-700 hover:from-zinc-900 hover:via-gray-800 hover:to-slate-800 text-white transition-all duration-300"
                                >
                                  View Profile
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </StaggeredAnimation>
                </section>
              </ScrollAnimation>
            )
          })}

          {filteredMembers.length === 0 && (
            <ScrollAnimation animation="fadeIn">
              <div className="text-center py-20">
                <div className="text-slate-400 mb-6">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-light text-slate-600 mb-2">No team members found</h3>
                <p className="text-slate-500 font-light">Try adjusting your search or filter criteria</p>
              </div>
            </ScrollAnimation>
          )}
        </div>

        {/* Enhanced Member Detail Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl w-full max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
              >
                <div className="relative">
                  {/* Header with full image */}
                  <div className={`relative h-100 bg-gradient-to-br ${selectedMember.color} overflow-hidden rounded-t-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
                    <Image
                      src={selectedMember.fullImage}
                      alt={selectedMember.name}
                      fill

                      className="object-cover flex items-start justify-center"

                    />
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedMember(null)}
                      className="absolute top-4 right-4 text-white hover:text-slate-200 hover:bg-white/20 backdrop-blur-sm rounded-full h-12 w-12 p-0"
                    >
                      ✕
                    </Button>
                    <div className="absolute bottom-8 left-8 text-white">
                      <h2 className="text-4xl font-bold mb-2">{selectedMember.name}</h2>
                      <p className="text-2xl font-medium opacity-90 mb-1">{selectedMember.role}</p>
                      <p className="text-lg opacity-75">
                        {selectedMember.designation} • {selectedMember.year}
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Quote */}
                        {selectedMember.quote && (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-l-4 border-blue-500">
                            <p className="text-slate-700 font-medium italic text-xl">"{selectedMember.quote}"</p>
                          </div>
                        )}

                        {/* About */}
                        <div>
                          <h3 className="font-bold text-slate-800 mb-4 text-2xl flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                            About
                          </h3>
                          <p className="text-slate-600 font-light leading-relaxed text-lg">{selectedMember.bio}</p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h3 className="font-bold text-slate-800 mb-4 text-2xl flex items-center gap-3">
                            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                            Skills & Technologies
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {selectedMember.skills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className="font-medium bg-slate-100 text-slate-700 px-4 py-2 text-sm hover:bg-slate-200 transition-all duration-300"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        {selectedMember.achievements && (
                          <div>
                            <h3 className="font-bold text-slate-800 mb-4 text-2xl flex items-center gap-3">
                              <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                              Achievements
                            </h3>
                            <div className="space-y-4">
                              {selectedMember.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center gap-4 bg-yellow-50 p-4 rounded-xl">
                                  <Award className="h-6 w-6 text-yellow-600" />
                                  <span className="text-slate-700 font-medium">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        {/* Contact Info */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-slate-800 mb-4 text-lg">Contact Information</h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-slate-500" />
                              <span className="text-slate-600 font-medium">{selectedMember.location}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Calendar className="h-5 w-5 text-slate-500" />
                              <span className="text-slate-600 font-medium">{selectedMember.experience}</span>
                            </div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl">
                          <h4 className="font-bold text-slate-800 mb-4 text-lg">Connect</h4>
                          <div className="space-y-3">
                            {selectedMember.social.github && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start gap-3 border-slate-300 text-slate-600 hover:bg-slate-100"
                              >
                                <Github className="h-4 w-4" />
                                GitHub
                              </Button>
                            )}
                            {selectedMember.social.linkedin && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start gap-3 border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                              </Button>
                            )}
                            {selectedMember.social.twitter && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start gap-3 border-sky-300 text-sky-600 hover:bg-sky-50"
                              >
                                <Twitter className="h-4 w-4" />
                                Twitter
                              </Button>
                            )}
                            {selectedMember.social.email && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start gap-3 border-green-300 text-green-600 hover:bg-green-50"
                              >
                                <Mail className="h-4 w-4" />
                                Email
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FooterNewsletter />
    </div>
  )
}
