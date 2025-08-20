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
} from "@/components/navbar/resizable-navbar"
import BannerSlider from "@/components/banner/banner"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Component from "@/components/faculty/university-section"
import TestimonialCarousel from "@/components/testimonial/TestimonialCarousel"
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
  X,
  Menu,
} from "lucide-react"
import NoticeBoard from "@/components/notice_board/notice-board"
import { GallerySection } from "@/components/ui/gallery"
import { NewsSection } from "@/components/award/news"
import AboutUs1 from "@/components/about/about-us-1"
import FooterNewsletter from "@/components/footer/footer-newsletter"
import { ScrollAnimation, StaggeredAnimation, ParallaxScroll, ScrollCounter } from "@/components/ui/scroll-animation"
import WrapButton from "@/components/ui/wrap-button"




export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
      link: "/achievements",
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


  // Enhanced dropdown menu items organized in three grids
  const dropdownSections = [
    {
      title: "Academic",
      gradient: "from-neutral-600/10 to-white/20 border-2",
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
      gradient: "from-neutral-600/10 to-white/20 border-2",
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
      gradient: "from-neutral-600/10 to-white/20 border-2",
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
          <NavItems items={navItems} />
           {/* Enhanced More Dropdown */}
           <div className="relative top-0 right-0 items-center ">

            
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
              </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>

            <NavbarLogo />
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white" 
            >
              <Menu className="w-5 h-5" />
            </button>
           
          </MobileNavHeader>
          
        </MobileNav>
      </Navbar>



      {/* Drawer Sidebar with outside click handler */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay for outside click */}
            <motion.div
              key="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
              onClick={() => setIsDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-6 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h5 className="text-base font-semibold text-gray-600 uppercase dark:text-gray-400">
                  Explore More
                </h5>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Drawer Content (reusing your dropdownSections grid) */}
              <div className="space-y-6 p-4 flex-1 overflow-y-auto">
                {dropdownSections.map((section, sectionIndex) => (
                  <div key={section.title} className="pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                    <div className={`bg-gradient-to-r ${section.gradient} p-3 rounded-lg mb-3`}>
                      <h4 className="text-zinc-900 font-semibold text-sm">{section.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.link}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-700 transition-all"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient}`}>
                            <item.icon className="h-4 w-4 text-zinc-900" />
                          </div>
                          <div>
                            <h5 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                              {item.name}
                            </h5>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Drawer Footer */}
              <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400 p-4">
                Need help?{" "}
                <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Support
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>


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


