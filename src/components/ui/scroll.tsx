"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ChevronUp } from "lucide-react"

interface ScrollToTopButtonProps {
  variant?: "circular" | "pill" | "minimal"
  position?: "bottom-left" | "bottom-right"
  showAfter?: number
  color?: "emerald" | "blue" | "purple" | "gray"
}

export default function Scroll({
  variant = "pill",
  position = "bottom-right",
  showAfter = 300,
  color = "blue",
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / maxScroll) * 100

      setScrollProgress(progress)
      setIsVisible(scrolled > showAfter)
    }

    const handleScroll = () => {
      requestAnimationFrame(toggleVisibility)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const colorClasses = {
    emerald: "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
    blue: "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
    purple: "from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700",
    gray: "from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900",
  }

  const positionClasses = {
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  }

  if (variant === "circular") {
    return (
      <button
        onClick={scrollToTop}
        className={`fixed ${positionClasses[position]} z-50 w-14 h-14 bg-gradient-to-r ${colorClasses[color]} text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out group ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
            className="transition-all duration-300"
          />
        </svg>

        <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-200 relative z-10" />

        {/* Hover glow effect */}
        <span
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300`}
        ></span>
      </button>
    )
  }

  if (variant === "pill") {
    return (
      <button
        onClick={scrollToTop}
        className={`fixed ${positionClasses[position]} z-50 px-4 py-3 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:shadow-xl border border-gray-200 transform transition-all duration-300 ease-in-out group ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center`}
          >
            <ArrowUp className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          </div>
          <span className="text-sm font-medium pr-1">Back to Top</span>
        </div>
      </button>
    )
  }

  // Minimal variant
  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClasses[position]} z-50 p-3 bg-black/80 hover:bg-black/90 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out group ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
    </button>
  )
}
