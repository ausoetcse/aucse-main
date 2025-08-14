"use client"

import { ScrollAnimation, StaggeredAnimation, ParallaxScroll, ScrollCounter } from "./scroll-animation"

export const ScrollAnimationDemo = () => {
  return (
    <div className="space-y-32 py-20">
      {/* Basic Fade In */}
      <ScrollAnimation animation="fadeIn">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Fade In Animation</h2>
          <p className="text-lg text-gray-600">This element fades in when it comes into view</p>
        </div>
      </ScrollAnimation>

      {/* Slide Up */}
      <ScrollAnimation animation="slideUp" delay={0.2}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Slide Up Animation</h2>
          <p className="text-lg text-gray-600">This element slides up from below</p>
        </div>
      </ScrollAnimation>

      {/* Slide Left */}
      <ScrollAnimation animation="slideLeft" delay={0.3}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Slide Left Animation</h2>
          <p className="text-lg text-gray-600">This element slides in from the right</p>
        </div>
      </ScrollAnimation>

      {/* Scale */}
      <ScrollAnimation animation="scale" delay={0.4}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Scale Animation</h2>
          <p className="text-lg text-gray-600">This element scales up when it appears</p>
        </div>
      </ScrollAnimation>

      {/* Staggered Animation */}
      <StaggeredAnimation animation="slideUp" staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Card 1</h3>
            <p>This card animates with a stagger effect</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Card 2</h3>
            <p>Each card appears one after another</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Card 3</h3>
            <p>Creating a smooth sequence effect</p>
          </div>
        </div>
      </StaggeredAnimation>

      {/* Parallax Effect */}
      <ParallaxScroll speed={0.3}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-lg">
          <h2 className="text-4xl font-bold mb-4">Parallax Effect</h2>
          <p className="text-xl">This element moves at a different speed while scrolling</p>
        </div>
      </ParallaxScroll>

      {/* Counter Animation */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Counter Animation</h2>
        <p className="text-lg text-gray-600 mb-8">Numbers that count up when in view:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <ScrollCounter 
              end={15000} 
              prefix="+" 
              className="text-4xl font-bold text-blue-600"
            />
            <p className="text-gray-600 mt-2">Students</p>
          </div>
          <div>
            <ScrollCounter 
              end={200} 
              prefix="+" 
              className="text-4xl font-bold text-green-600"
            />
            <p className="text-gray-600 mt-2">Programs</p>
          </div>
          <div>
            <ScrollCounter 
              end={50} 
              suffix="+" 
              className="text-4xl font-bold text-purple-600"
            />
            <p className="text-gray-600 mt-2">Rankings</p>
          </div>
        </div>
      </div>

      {/* Blur Effect */}
      <ScrollAnimation animation="blur" delay={0.5}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Blur Animation</h2>
          <p className="text-lg text-gray-600">This element starts blurred and comes into focus</p>
        </div>
      </ScrollAnimation>

      {/* Rotate Effect */}
      <ScrollAnimation animation="rotate" delay={0.6}>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Rotate Animation</h2>
          <p className="text-lg text-gray-600">This element rotates into place</p>
        </div>
      </ScrollAnimation>
    </div>
  )
} 