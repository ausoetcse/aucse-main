"use client"


import BannerSlider from "@/components/banner/banner"
import { useEffect, useState } from "react"

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
import Navigation from "@/components/navbar/navbar"




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





  return (
    <div className="w-full bg-neutral-50 overflow-hidden mt-20">
      
    <Navigation />
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


