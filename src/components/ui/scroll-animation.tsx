"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale" | "rotate" | "blur"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  triggerOnce?: boolean
}

export const ScrollAnimation = ({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  triggerOnce = true,
}: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  })

  const getAnimationVariants = () => {
    switch (animation) {
      case "fadeIn":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
      
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        }
      
      case "slideDown":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 }
        }
      
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        }
      
      case "slideRight":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        }
      
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
      
      case "rotate":
        return {
          hidden: { opacity: 0, rotate: -10 },
          visible: { opacity: 1, rotate: 0 }
        }
      
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)" }
        }
      
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// Staggered animation for multiple children
interface StaggeredAnimationProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "scale"
  staggerDelay?: number
  duration?: number
  threshold?: number
}

export const StaggeredAnimation = ({
  children,
  className,
  animation = "fadeIn",
  staggerDelay = 0.1,
  duration = 0.6,
  threshold = 0.1,
}: StaggeredAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
  })

  const getStaggeredVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        }
      }
    }

    let childVariants: any = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }

    switch (animation) {
      case "slideUp":
        childVariants = {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }
        break
      
      case "slideLeft":
        childVariants = {
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0 }
        }
        break
      
      case "scale":
        childVariants = {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
        break
    }

    return { container: baseVariants, children: childVariants }
  }

  const variants = getStaggeredVariants()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants.container}
      transition={{ duration }}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div 
          key={index} 
          variants={variants.children}
          transition={{ duration }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Parallax scroll effect
interface ParallaxScrollProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
}

export const ParallaxScroll = ({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        setOffset(rate)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        style={{
          transform: `translateY(${direction === "up" ? offset : -offset}px)`,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Scroll-triggered counter animation
interface ScrollCounterProps {
  end: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  threshold?: number
}

export const ScrollCounter = ({
  end,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
  threshold = 0.1,
}: ScrollCounterProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: threshold, once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
} 