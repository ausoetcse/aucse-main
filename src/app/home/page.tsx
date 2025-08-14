"use client"

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import BannerSlider from "@/components/ui/banner"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Component from "@/components/ui/university-section"
import TestimonialCarousel from "@/components/ui/TestimonialCarousel"
import {
  GraduationCap,
  Calendar,
  Microscope,
  Users,
  Briefcase,
  MapPin,
  BookOpen,
  HeadphonesIcon,
  Library,
  Trophy,
  Globe,
  ChevronRight,
  ArrowRight, 
  Bell,
  ArrowUp,
} from "lucide-react"
import NoticeBoard from "@/components/ui/notice-board"
import { GallerySection } from "@/components/ui/gallery"
import { NewsSection } from "@/components/ui/news"
import AboutUs1 from "@/components/ui/about-us-1"
import FooterNewsletter from "@/components/mvpblocks/footer-newsletter"
import { ScrollAnimation, StaggeredAnimation, ParallaxScroll, ScrollCounter } from "@/components/ui/scroll-animation"
import WrapButton from "@/components/ui/wrap-button"




export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200) // Show button after 200px scroll
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  const navItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "About",
      link: "https://www.aucse.in/About-Us",
    },
    {
      name: "Notice",
      link: "/notice",
    },
    {
      name: "Programs",
      link: "https://www.aucse.in/programs",
    },
    {
      name: "Events",
      link: "https://aucse-awards-achievements.vercel.app/",
    },
    {
      name: "Calendar",
      link: "https://www.aucse.in/calendar",
    },
    {
      name: "Our Team",
      link: "/dev",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },

  ]

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  
  // Enhanced dropdown menu items organized in three grids
  const dropdownSections = [
    {
      title: "Academic",
      gradient: "from-indigo-600 to-indigo-800",
      items: [
        {
          name: "Faculty",
          link: "https://www.aucse.in/people",
          icon: GraduationCap,
          description: "Meet our expert faculty",
        },
        {
          name: "Timetable",
          link: "https://www.aucse.in/timetable",
          icon: Calendar,
          description: "Class schedules & timing",
        },
        {
          name: "Research",
          link: "https://www.aucse.in/more/research",
          icon: Microscope,
          description: "Cutting-edge research",
        },
        { name: "Library", link: "#", icon: Library, description: "Digital & physical resources" },
      ],
    },
    {
      title: "Student Life",
      gradient: "from-blue-600 to-blue-800",
      items: [
        {
          name: "Alumni",
          link: "https://www.aucse.in/people/alumni",
          icon: Users,
          description: "Connect with graduates",
        },
        {
          name: "Placements",
          link: "https://www.aucse.in/more/placement",
          icon: Briefcase,
          description: "Career opportunities",
        },
        { name: "Campus Life", link: "#", icon: MapPin, description: "Student activities & events" },
        { name: "Achievements", link: "#", icon: Trophy, description: "Student accomplishments" },
      ],
    },
    {
      title: "Resources",
      gradient: "from-green-400 to-green-600",
      items: [
        { name: "Explore", link: "https://www.aucse.in/more", icon: Globe, description: "Discover more features" },
        { name: "Our Team", link: "./dev", icon: Users, description: "Development team" },
        { name: "Support", link: "#", icon: HeadphonesIcon, description: "Get help & assistance" },
        { name: "Resources", link: "#", icon: BookOpen, description: "Study materials & guides" },
      ],
    },
  ]

  return (
    <div className="w-full bg-neutral-50 overflow-hidden mt-20">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center space-x-1">
            <NavItems items={navItems} />
           {/* Enhanced More Dropdown */}
           <div className="relative top-0 right-0 items-center ">
              <button
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
                className="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                <NavbarButton variant="primary" className="font-normal"><WrapButton>More</WrapButton></NavbarButton>

                  {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /> */}
        
              </button>
              <AnimatePresence>
                {isMoreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onMouseEnter={() => setIsMoreDropdownOpen(true)}
                    onMouseLeave={() => setIsMoreDropdownOpen(false)}
                    className="absolute top-full right-0 mt-4 w-[700px] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="bg-zinc-900  p-6 text-white flex flex-col">
                      <h3 className="text-xl font-bold mb-2">Explore More</h3>
                      <p className="text-blue-100 text-sm">Discover all the resources and opportunities available</p>
                    </div>

                    {/* Three Grid Sections */}
                    <div className="grid grid-cols-3 gap-0">
                      {dropdownSections.map((section, sectionIndex) => (
                        <motion.div
                          key={section.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: sectionIndex * 0.1 }}
                          className="p-6 border-r border-neutral-200 dark:border-neutral-700 last:border-r-0"
                        >
                          {/* Section Header */}
                          <div className={`bg-gradient-to-r ${section.gradient} p-3 rounded-lg mb-4`}>
                            <h4 className="text-white font-semibold text-sm text-center">{section.title}</h4>
                          </div>

                          {/* Section Items */}
                          <div className="space-y-3">
                            {section.items.map((item, itemIndex) => (
                              <motion.a
                                key={item.name}
                                href={item.link}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                                className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-700 transition-all duration-300 transform hover:scale-[1.02]"
                              >
                                <div
                                  className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient} group-hover:scale-110 transition-transform duration-300`}
                                >
                                  <item.icon className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm group-hover:text-blue-600 transition-colors">
                                      {item.name}
                                    </h5>
                                    <ChevronRight className="h-3 w-3 text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                                  </div>
                                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-tight">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="bg-zinc-900  p-4 text-center">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Need help?{" "}
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                          Contact Support
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}    
              </AnimatePresence>
              </div>
              </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero */}
      <div className="h-auto mt-0 top-0 relative flex justify-center items-center w-full">
        <BannerSlider />
      </div>
      {/* Notice Section */}
      <ScrollAnimation animation="slideUp" delay={0.2}>
        <header className="flex justify-between items-center m-4 mx-4 sm:mx-6 p-4 sm:p-6 rounded-2xl border border-slate-200/50 transition-all duration-300">
          <div className="flex flex-col group cursor-pointer">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-600 font-semibold tracking-wide uppercase group-hover:text-blue-700 transition-colors duration-300">
                Our Notices 
              </span>
              <Bell className="w-4 h-4 text-blue-500 group-hover:animate-bounce" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-special-gothic bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Recent Updates
            </h1>

            <div className="h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 mt-1"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse transition-all duration-75"></div>
              <span className="text-xs font-medium text-slate-600">Live Updates</span>
            </div>

            <Button
              variant="outline"
              className="group relative overflow-hidden bg-white/50 border-slate-200 hover:border-blue-300 hover:bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
            >
              <a href="./notice" className="relative z-10 font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-300">
                Explore More
              </a>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </header>
      </ScrollAnimation>
        <NoticeBoard />
      {/* News Section */}
      <ScrollAnimation animation="slideLeft" delay={0.3}>
        <NewsSection />
      </ScrollAnimation>
      {/* About */}
      <ScrollAnimation animation="slideRight" delay={0.2}>
        <AboutUs1/>
      </ScrollAnimation>

      {/* 


      {/* Feature Section */}
    {/* <Feature3 /> */}

      {/* Gallery */}
      {/* <ScrollAnimation animation="scale" delay={0.4}>
        <GallerySection />
      </ScrollAnimation> */}

      {/* Testimonial */}
      <ScrollAnimation animation="fadeIn" delay={0.3}>
        <TestimonialCarousel />
      </ScrollAnimation>

      {/* Faculty Section */}
      <ScrollAnimation animation="slideUp" delay={0.2}>
        <Component />
      </ScrollAnimation>

      <ScrollAnimation animation="slideUp" delay={0.1}>
        <FooterNewsletter />
      </ScrollAnimation>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}


