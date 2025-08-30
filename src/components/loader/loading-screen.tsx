"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { BookOpen, Play } from "lucide-react"

interface LoadingScreenProps {
  onLoadComplete: () => void
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isDissolving, setIsDissolving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(true)

  const loadingMessages = [
    "Loading University Assets...",
    "Preloading Banner Images...",
    "Loading Company Logos...",
    "Initializing Gallery Content...",
    "Loading Media Files...",
    "Preparing University Portal...",
    "Loading SVG Icons...",
    "Initializing Animations...",
    "Welcome To Department of CSE",
  ]

  const imagesToPreload = [
    // Banner Images
    "/banner1.png",
    "/banner1.svg",
    "/banner2.png",
    "/banner3.jpg",
    "/banner4.png",
    "/banner5.jpg",
    "/banner5.png",
    "/banner7.png",
    
    // Gallery Images
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    
    // Company Logos
    "/adobe.png",
    "/amazon.png",
    "/apple.png",
    "/facebook.png",
    "/google.png",
    "/instagram.png",
    "/linkedin.png",
    "/meta.png",
    "/microsoft.png",
    "/netflix.png",
    "/tcs.png",
    "/youtube.png",
    
    // University Assets
    "/logo.png",
    "/naac.jpg",
    "/carousel.jpg",
    "/course-video.mp4",
    
    // SVG Icons
    "/file.svg",
    "/globe.svg",
    "/next.svg",
    "/vercel.svg",
    "/window.svg",
  ]

  useEffect(() => {
    // Check if this is a refresh or first visit
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setIsFirstVisit(false)
      startLoading()
    }
  }, [])

  const startLoading = () => {
    setIsLoading(true)
    setIsFirstVisit(false)
    sessionStorage.setItem('hasVisited', 'true')

    const preloadImages = async () => {
      const imagePromises = imagesToPreload.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            setProgress((prev) => prev + 100 / imagesToPreload.length)
            resolve()
          }
          img.onerror = () => {
            setProgress((prev) => prev + 100 / imagesToPreload.length)
            resolve()
          }
          img.src = src
        })
      })

      // Simulate additional loading time for realism
      const additionalDelay = new Promise<void>((resolve) => {
        setTimeout(resolve, 3000)
      })

      await Promise.all([...imagePromises, additionalDelay])
      setIsComplete(true)

      // Wait a bit more before dissolving
      setTimeout(() => {
        setIsDissolving(true)
        setTimeout(() => {
          onLoadComplete()
        }, 1500)
      }, 1500)
    }

    preloadImages()
  }

  useEffect(() => {
    if (!isLoading) return

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length)
    }, 1000)

    return () => clearInterval(messageInterval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {!isDissolving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center z-50"
          style={{ fontFamily: 'Ubuntu, system-ui, sans-serif' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative w-full max-w-2xl px-8">
            {/* Logo Section */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div 
                className="w-32 h-32 mx-auto mb-8 relative"
                animate={{ 
                  scale: isLoading ? [1, 1.05, 1] : 1,
                  rotate: isLoading ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 3, repeat: isLoading ? Infinity : 0 },
                  rotate: { duration: 4, repeat: isLoading ? Infinity : 0 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center">
                  <img
                    src="/logo.png" 
                    alt="University Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </motion.div>
              
              <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-wide font-special-gothic" >ADAMAS UNIVERSITY</h1>
              <p className="text-gray-600 text-sm tracking-wide font-medium font-ubuntu">Department of Computer Science & Engineering</p>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Loading State */}
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-8"
                >
                  {/* Progress Bar */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 font-medium">Loading Assets</span>
                      <span className="text-gray-800 font-light">{Math.round(progress)}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <motion.div
                        className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full shadow-lg"
                        animate={{ 
                          x: `${progress - 2}%`,
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          x: { duration: 0.8, ease: "easeOut" },
                          scale: { duration: 1.5, repeat: Infinity }
                        }}
                      />
                    </div>
                  </div>

                  {/* Loading Message */}
                  <motion.div 
                    className="text-center"
                    key={currentMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-gray-700 text-lg font-light">
                      {loadingMessages[currentMessage]}
                    </p>
                  </motion.div>

                  {/* Loading Dots */}
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>

                  {/* Completion State */}
                  {isComplete && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-sm">
                        <motion.div 
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-gray-800 text-sm font-medium">Ready to Launch</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* Initial State */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-4">
                    <h2 className="text-xl font-light text-gray-700 font-special-gothic" >Welcome to the University Portal</h2>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto font-ubuntu">
                      Experience our comprehensive digital platform showcasing academic excellence, 
                      research achievements, and student success stories.
                    </p>
                  </div>
                  
                  <motion.button
                    onClick={startLoading}
                    className="group relative inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 px-8 py-4 rounded-full hover:bg-white hover:border-gray-300 transition-all duration-500 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <span className="font-medium">Begin Experience</span>
                    <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <motion.div 
              className="text-center mt-16 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-gray-500 text-xs tracking-wide">2025 Adamas University • Empowering minds, shaping futures</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}