"use client"

import React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SliderProps {
  items: Array<{
    id: string
    title?: string
    description?: string
    image?: string
    content?: React.ReactNode
  }>
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

export default function Slider({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className = "",
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1))
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, items.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) {
    return <div className="text-center">No items to display</div>
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-2xl h-full">
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full h-full flex-shrink-0">
              {item.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={item.image || "/logo.png"}
                    alt={item.title || `Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  {(item.title || item.description) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      {item.title && <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>}
                      {item.description && <p className="text-white/90 text-sm">{item.description}</p>}
                    </div>
                  )}
                </div>
              ) : item.content ? (
                <div className="w-full h-full">{item.content}</div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center">
                    {item.title && <h3 className="text-xl font-semibold mb-2">{item.title}</h3>}
                    {item.description && <p className="text-muted-foreground">{item.description}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && items.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-12 w-12 rounded-full backdrop-blur-sm"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 h-12 w-12 rounded-full backdrop-blur-sm"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-8" : "bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
