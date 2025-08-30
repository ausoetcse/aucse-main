'use client'

import FooterNewsletter from "@/components/footer/footer-newsletter";
import ModernHeader from "@/components/header-old/page";
import SectionHeader from "@/components/header-old/page";
import Header from "@/components/header/page";
import { LoadingScreen } from "@/components/loader/loading-screen";
import Navigation from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Target, Zap, Play, Pause, Users, Award, Globe, Lightbulb, ArrowRight, Code, Database, Shield, Cloud, Brain, Cpu } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface OverviewSectionProps{
    title?: string;
    content?: string;
    navigationItems?: string[];
}

interface TeamMember {
    id: number;
    name: string;
    designation: string;
    image: string;
    message?: string;
}

interface LeadershipTeamSectionProps {
    title?: string;
    teamMembers?: TeamMember[];
}

// Floating particles background component
const FloatingParticles: React.FC = () => {
    const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);

    useEffect(() => {
        const newParticles = Array.from({length: 20}, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${particle.duration}s`
                    }}
                />
            ))}
        </div>
    );
};

// Interactive stats component
const StatsSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counts, setCounts] = useState({ students: 0, faculty: 0, research: 0, industry: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const element = document.getElementById('stats-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const targets = { students: 2500, faculty: 85, research: 150, industry: 45 };
            const duration = 2000;
            const steps = 50;
            const stepDuration = duration / steps;

            Object.entries(targets).forEach(([key, target]) => {
                let current = 0;
                const increment = target / steps;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
                }, stepDuration);
            });
        }
    }, [isVisible]);

    const stats = [
        { label: 'Students Enrolled', value: counts.students, icon: Users, color: 'from-blue-500 to-cyan-400' },
        { label: 'Expert Faculty', value: counts.faculty, icon: Award, color: 'from-purple-500 to-pink-400' },
        { label: 'Research Projects', value: counts.research, icon: Lightbulb, color: 'from-green-500 to-emerald-400' },
        { label: 'Industry Partners', value: counts.industry, icon: Globe, color: 'from-orange-500 to-red-400' }
    ];

    return (
        <div id="stats-section" className="relative py-20 bg-gray-900 overflow-hidden">
            <FloatingParticles />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
            
            <div className="relative max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
                        Excellence in Numbers
                    </h2>
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="group relative"
                            style={{
                                animation: isVisible ? `slideUp 0.8s ease-out ${index * 0.2}s both` : 'none'
                            }}
                        >
                            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                                
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${stat.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-full h-full text-white" />
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-white mb-2 font-mono">
                                            {stat.value.toLocaleString()}+
                                        </div>
                                        <div className="text-gray-300 font-medium">{stat.label}</div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

// Enhanced specialization showcase
const SpecializationShowcase: React.FC = () => {
    const [activeSpec, setActiveSpec] = useState(0);

    const specializations = [
        { 
            name: 'Artificial Intelligence', 
            icon: Brain, 
            color: 'from-purple-500 to-pink-500',
            description: 'Machine Learning, Deep Learning, Natural Language Processing',
            features: ['Neural Networks', 'Computer Vision', 'Robotics', 'Expert Systems']
        },
        { 
            name: 'Data Science', 
            icon: Database, 
            color: 'from-blue-500 to-cyan-500',
            description: 'Big Data Analytics, Statistical Computing, Data Visualization',
            features: ['Data Mining', 'Predictive Analytics', 'Business Intelligence', 'Statistical Modeling']
        },
        { 
            name: 'Cybersecurity', 
            icon: Shield, 
            color: 'from-red-500 to-orange-500',
            description: 'Network Security, Ethical Hacking, Digital Forensics',
            features: ['Penetration Testing', 'Cryptography', 'Incident Response', 'Security Auditing']
        },
        { 
            name: 'Cloud Computing', 
            icon: Cloud, 
            color: 'from-green-500 to-emerald-500',
            description: 'Distributed Systems, Microservices, Container Orchestration',
            features: ['AWS/Azure/GCP', 'DevOps', 'Serverless', 'Infrastructure as Code']
        },
        { 
            name: 'Software Engineering', 
            icon: Code, 
            color: 'from-indigo-500 to-purple-500',
            description: 'Full-Stack Development, Mobile Apps, System Design',
            features: ['Agile Methodologies', 'Clean Architecture', 'Testing', 'Performance Optimization']
        },
        { 
            name: 'Computer Architecture', 
            icon: Cpu, 
            color: 'from-yellow-500 to-orange-500',
            description: 'High Performance Computing, Embedded Systems, VLSI Design',
            features: ['Parallel Processing', 'GPU Computing', 'IoT Systems', 'Hardware Optimization']
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSpec(prev => (prev + 1) % specializations.length);
        }, 4000);
        return () => clearInterval(interval);
    },);

    return (
        <div className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Areas of <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Specialization</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore cutting-edge technologies and build expertise in tomorrows most in-demand fields
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4">
                        {specializations.map((spec, index) => (
                            <div
                                key={spec.name}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                                    index === activeSpec 
                                        ? 'bg-white shadow-2xl scale-105 border-l-4 border-blue-500' 
                                        : 'bg-white/60 hover:bg-white/80 hover:scale-102'
                                }`}
                                onClick={() => setActiveSpec(index)}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${spec.color} p-2 transition-transform duration-300 ${index === activeSpec ? 'scale-110' : ''}`}>
                                        <spec.icon className="w-full h-full text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-lg transition-colors duration-300 ${index === activeSpec ? 'text-blue-600' : 'text-gray-800'}`}>
                                            {spec.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {spec.description}
                                        </p>
                                    </div>
                                    <ChevronRight className={`transition-transform duration-300 ${index === activeSpec ? 'rotate-90 text-blue-500' : 'text-gray-400'}`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-md p-8 shadow-2xl border border-gray-100">
                            <div className="mb-8">
                                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${specializations[activeSpec].color} p-4 mb-6`}>
                                    {React.createElement(specializations[activeSpec].icon, { className: "w-full h-full text-white" })}
                                </div>
                                <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
                                    {specializations[activeSpec].name}
                                </h3>
                                <p className="text-center text-gray-600 mb-8">
                                    {specializations[activeSpec].description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {specializations[activeSpec].features.map((feature, idx) => (
                                    <div 
                                        key={feature}
                                        className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200"
                                        style={{
                                            animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`
                                        }}
                                    >
                                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 text-center">
                                <Button className={`bg-gradient-to-r ${specializations[activeSpec].color} hover:scale-105 transition-transform duration-300 text-white border-0`}>
                                    Explore Program <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

// Video Component with enhanced UI
const VideoSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="w-full py-24 bg-transparent relative overflow-hidden">
            {/* <FloatingParticles /> */}
            
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
                        Our Journey in Education Excellence
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover how we're shaping the future of Computer Science & Engineering education through innovation and dedication
                    </p>
                </div> */}

                <div 
                    className="relative bg-black rounded-md overflow-hidden shadow-2xl group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full md:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/course-video.mp4" type="video/mp4" />
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
                            <div className="text-center text-white">
                                <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Play className="w-12 h-12" />
                                </div>
                                <p className="text-xl font-medium">Experience Our Excellence</p>
                            </div>
                        </div>
                    </video>
                    
                    
                    <button
                        onClick={togglePlay}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-6 rounded-full transition-all duration-500 backdrop-blur-sm border border-white/20 hover:scale-110 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    >
                        {isPlaying ? <Pause size={40} /> : <Play size={40} />}
                    </button>

                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-center justify-between text-white">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Empowering Minds, Shaping Futures</h3>
                                <p className="text-gray-200">Department of Computer Science & Engineering</p>
                            </div>

                        </div>
                    </div>
                    
                   
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30"></div>
                </div>
            </div>
        </div>
    );
};

// Enhanced Leadership Team Section
const LeadershipTeamSection: React.FC<LeadershipTeamSectionProps> = ({
    title = "Leadership Team",
    teamMembers = []
}) => {
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);
    const [hoveredMember, setHoveredMember] = React.useState<number | null>(null);

    const handleViewMessage = (member: TeamMember) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    return (
        <div className="w-full py-24 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-wide font-special-gothic">
                        Meet Our Leadership Team
                    </h2>
                    <div className="h-0 border w-full  mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto font-ubuntu">
                        Visionary leaders driving innovation and excellence in computer science education
                    </p>
                </div>

                <div className="space-y-16">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id}
                            className={`group relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            onMouseEnter={() => setHoveredMember(member.id)}
                            onMouseLeave={() => setHoveredMember(null)}
                            style={{
                                animation: `slideIn 0.8s ease-out ${index * 0.2}s both`
                            }}
                        >
                            <div className={`flex flex-col lg:flex-row items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} bg-white/70 backdrop-blur-sm border-2 border-blue-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500`}>
                                {/* Image Section */}
                                <div className="relative w-full lg:w-96 h-96 overflow-hidden  transition-transform duration-700">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=3b82f6&color=ffffff`;
                                        }}
                                    />
                                
                                    
                                 
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 p-10 lg:p-12 h-96 flex flex-col justify-center relative">
                                    {/* Background decoration */}
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="mb-8">
                                            <h3 className="text-3xl lg:text-4xl font-bold  mb-4 font-special-gothic">
                                                {member.name}
                                            </h3>
                                            <div className="h-0 w-full border mb-6 font-ubuntu"></div>
                                            <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8">
                                                {member.designation}
                                            </p>
                                        </div>

                                        <Button
                                            variant="outline"
                                            onClick={() => handleViewMessage(member)}
                                            className="flex justify-center items-center  group/btn border-2 border-blue-500/50 text-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 hover:scale-105 transition-all duration-300 px-2 py-3 rounded-md font-semibold shadow-md hover:shadow-lg"
                                        >
                                                   <Image
                                                src={"/logo_op.png"}
                                                width={20}
                                                height={20}
                                                alt="Logo"
                                               
                                            />
                                            Read Message 
                                     
                                            
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Modal */}
                {selectedMember && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-white shadow-2xl w-full max-w-5xl border border-gray-200 flex flex-col lg:flex-row rounded-3xl overflow-hidden animate-slideUp">
                            <div className="relative w-full lg:w-96 h-64 lg:h-auto ">
                                <Image
                                    src={selectedMember.image}
                                    width={500}
                                    height={500}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover "
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                            
                            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="mb-8">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                            {selectedMember.name}
                                        </h3>
                                        <p className="text-lg text-blue-600 font-semibold mt-2">
                                            {selectedMember.designation}
                                        </p>
                                        <div className="h-0 w-full border mt-4"></div>
                                    </div>
                                    
                                    <div className=" border-gray-100 pt-8">
                                        <h4 className="font-bold text-gray-900 mb-4 text-xl flex items-center">
                                           
                                            Leadership Message
                                        </h4>
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                                            <p className="text-gray-700 leading-relaxed text-base italic">
                                                {selectedMember.message || "No message available at this time."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end mt-8">
                                    <Button
                                        onClick={closeModal}
                                        className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.4s ease-out;
                }
            `}</style>
        </div>
    );
};

// Keep your original OverviewSection exactly as is
const OverviewSection: React.FC<OverviewSectionProps> = ({
    title = "Overview",
    content = "Overview content",
    navigationItems = ["About Us", "Our Mission", "Our Vision"],
}) => {
    const [activeItem, setActiveItem] = React.useState("About Us");

    const contentMap: Record<string, {title: string, content: string}> = {
        "About Us": {
            title: "ABOUT DEPARTMENT", 
            content: "The Department of Computer Science & Engineering prepares students to address the most compelling challenges of the world, backed by sound knowledge, integrity, research, and innovation. We provide options for specialization in contemporary topics like Artificial Intelligence, Machine Learning, Data Science, Cyber Security and Forensics, Cloud Computing and more. With state-of-the-art infrastructure, faculty of the highest professional standards, a carefully crafted curriculum, active industry-academia collaborations, and global exposure, we provide students with specialised knowledge and practical skills along with value-added courses to prepare them for life."
        },
        "Our Mission": {
            title: "OUR MISSION", 
            content: "To prepare students to excel in Computer Science and Engineering programs and succeed in computing industry profession or as successful entrepreneurs through quality education. We aim to provide students an ability to analyse and solve computer science and engineering problems through application of fundamental knowledge of mathematics, science and engineering. Our mission includes training students with good CSE breadth to comprehend, analyse, design and create innovative computing products and solutions for real-life problems."
        },
        "Our Vision": {
            title: "OUR VISION", 
            content: "To be a leading department that shapes the future of technology through excellence in education, research, and innovation. We envision creating graduates who are not only technically competent but also ethically responsible, globally aware, and committed to lifelong learning. Our vision includes maintaining a specialized research centre on high performance computing and fostering an environment of continuous improvement and technological advancement."
        },
        "Program Objectives": {
            title: "PROGRAM EDUCATIONAL OBJECTIVES", 
            content: "PEO 1: Prepare students to excel in CSE post-graduate programs and succeed in computing industry or as entrepreneurs. PEO 2: Provide ability to analyse and solve CSE problems through fundamental knowledge application. PEO 3: Train students with good CSE breadth to create innovative computing solutions. PEO 4: Inculcate professional ethics, communication skills, teamwork, and lifelong learning. PEO 5: Equip students with excellent academic environment for successful careers as engineers, scientists, and entrepreneurs."
        },
        "Program Outcomes": {
            title: "PROGRAM OUTCOMES", 
            content: "Our graduates will demonstrate: Engineering knowledge application, Problem analysis and solution design, Modern tool usage, Understanding of engineer's role in society, Environmental awareness and sustainability, Professional ethics, Individual and team work capabilities, Effective communication skills, Project management understanding, and Life-long learning commitment. These outcomes ensure our graduates are well-prepared for the challenges of the modern technology landscape."
        }
    };

    const getCurrentContent = () => {
        return contentMap[activeItem] || {
            title: "ABOUT US",
            content: "Content coming soon.",
        };
    };

    const currentSection = getCurrentContent();

    return (
        <div className="w-full bg-gray-50 py-16" >
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 ">
                    <div className="lg:col-span-1">
                        <nav className="bg-white shadow-sm p-6 sticky top-8 rounded-l-md h-full">
                            <ul className="space-y-2">
                                {navigationItems.map((item) => (
                                    <li key={item}>
                                        <button
                                            onClick={() => setActiveItem(item)}
                                            className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 rounded-sm ${
                                                activeItem === item
                                                    ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600 font-medium'
                                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white shadow-sm p-8 h-full rounded-r-md">
                            <div className="mb-8">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
                                    {currentSection.title}
                                </h2>
                                <div className="h-1 w-full bg-blue-600"></div>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-gray-700 leading-relaxed text-justify mb-8 text-lg">
                                    {currentSection.content}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AboutUsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const aboutNavigationItems = [
        "About Us",
        "Our Mission", 
        "Our Vision",
        "Program Objectives",
        "Program Outcomes"
    ];

    const customTeamMembers: TeamMember[] = [
        {
            id: 1,
            name: "Prof. Samit Ray",
            designation: "The Chancellor",
            image: "/about/samit_ray.jpg",
            message: "I am committed to driving our institution forward through innovation, excellence, and sustainable growth. Our dedication to quality education and research remains our top priority as we shape the future leaders of technology."
        },
        {
            id: 2,
            name: "Prof. Suranjan Das",
            designation: "The Vice Chancellor",
            image: "/about/suranjan_das.jpg",
            message: "Education is the backbone of our nation's progress. We continuously invest in cutting-edge technology and pedagogical innovations to stay ahead of industry trends and deliver exceptional value to our students and society."
        },
        {
            id: 3,
            name: "Dr. Radha Tamal Goswami",
            designation: "The Pro Vice Chancellor",
            image: "/about/radha_tamal_goswami.jpg",
            message: "Academic excellence and strategic vision are key to our sustainable growth. We maintain transparent practices and make data-driven decisions to ensure our students receive world-class education and research opportunities."
        },
        {
            id: 4,
            name: "Dr. Sajal Saha",
            designation: "Associate Dean & HOD | Computer Science & Engineering",
            image: "/about/sajal_saha.png",
            message: "Our department represents innovation, research excellence, and practical learning. We focus on building strong industry-academia partnerships and creating value-driven educational experiences that prepare students for the challenges of tomorrow."
        },
        {
            id: 5,
            name: "Dr. Debashis Chakraborty",
            designation: "HOD | Computer Applications",
            image: "/about/debashis_chakraborty.jpg",
            message: "Technology and applications go hand in hand. Our focus on practical implementation of theoretical concepts ensures our students are well-equipped with both fundamental knowledge and hands-on experience in computer applications."
        }
    ];
  if (isLoading) {
      
      const handleLoadComplete = () => {
        setIsLoading(false)
      }
      return (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      );
  
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />

         <ModernHeader
        title="About Us"
        tagline="Distinctive digital solutions for leading and rising companies"
        since="2014"
        navItems={[
          { label: "Mission & Vision", targetId: "about" },
          { label: "Message", targetId: "message", count: 5 },
        ]}
      />
            
            {/* Video Section - Enhanced version */}
            <VideoSection />

            {/* Overview Section - Your original component */}
            <section id="about">
            <OverviewSection 
                title="DEPARTMENT OVERVIEW"
                navigationItems={aboutNavigationItems}
               
            />
            </section>

            <div className="max-w-full mx-auto relative z-10 " >
                <Image 
                src={"/naac.jpg"}
                alt="NAAC A"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover"
                />
            </div>

            <section id="message">
            {/* Leadership Team Section - Enhanced version */}
            <LeadershipTeamSection 
                title="Meet Our Leadership Team"
                teamMembers={customTeamMembers}
            />
            </section>


            <FooterNewsletter />
            <style jsx>{`
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};