"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { BookOpen, Play } from "lucide-react"




// Animated loading dots
function LoadingDots() {
  return (
    <span className="inline-block ml-2">
      <motion.span className="inline-block w-2 h-2 bg-blue-500 rounded-full mx-0.5" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
      <motion.span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mx-0.5" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
      <motion.span className="inline-block w-2 h-2 bg-blue-400 rounded-full mx-0.5" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
    </span>
  )
}

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
    "Loading Assets... ",

    "Welcome To Department of CSE",
  ]

  const imagesToPreload = [
    // Banner Images
    "/banners/banner-1.jpg?height=400&width=900",
    "/banners/banner-2.jpg?height=400&width=900",
    "/banners/banner-3.jpg?height=400&width=900",
    "/banners/banner-4.jpg?height=400&width=900",
    "/banners/banner-5.jpg?height=400&width=900",

    
    // Gallery Images

    
    // Company Logos
    "/placement/adobe.png",
    "/placement/amazon.png",
    "/placement/apple.png",
    "/placement/facebook.png",
    "/placement/google.png",
    "/placement/instagram.png",
    "/placement/linkedin.png",
    "/placement/meta.png",
    "/placement/microsoft.png",
    "/placement/netflix.png",
    "/placement/tcs.png",
    "/placement/maity.png",
    "/placement/technook.png",
    "/placement/zenus.png",
    "/placement/juspay.png",
    "/placement/arc.png",
    

    
    // University Assets
    "/logo.png",
    "/naac_a.png",
    "/carousel.jpg",
    "/course-video.mp4",
    

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
    }, 5000)

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
          
              <div className="absolute top-0 left-0 flex justify-start items-start flex-col w-full px-4 ">
              <h1 className="text-[6vw] md:text-[5vw] font-bold  text-zinc-900 mb-0 tracking-widest font-special-gothic text-start " >ADAMAS UNIVERSITY</h1>
              <p className=" text-lg  tracking-wide text-gray-600 font-ubuntu text-start">Department of Computer Science & Engineering</p>
             </div>

             <div className="absolute bottom-0 right-0 flex justify-end items-end flex-col w-full px-0 ">
              <span className="text-gray-800 font-special-gothic text-6xl font-bold px-4">{Math.round(progress)}%</span>
              <div className="w-full h-2 bg-gray-200 overflow-hidden px-0">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-zinc-700 to-zinc-800 "
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
             </div>
          <div className="flex flex-col items-center justify-center">
            {/* Logo Section */}

              <div className="absolute  w-full h-full mx-auto flex items-center justify-center">
                  <img
                    src="/logo_op.png"
                    alt="University Logo"
                    className="w-150 h-150 object-contain"
                  />
              
         
              </div>


            {/* Main Content */}
            <div className="space-y-12 absolute bottom-5 left-2">
              {/* Loading State */}
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-8"
                >


                  {/* Loading Message + Animated Dots
                  <motion.div 
                    className="text-center"
                    key={currentMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-gray-700 text-lg font-light flex items-center justify-center">
                      {loadingMessages[currentMessage]}
                      <LoadingDots />
                    </p>
                  </motion.div>
 */}

                  {/* Completion State */}
                  {isComplete && (
                    <motion.div 
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-md px-6 py-3 shadow-sm">
                        <motion.div 
                          className="w-2 h-2 bg-green-400 rounded-full"
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
                  {/* <div className="space-y-4">
                    <h2 className="text-xl font-light text-gray-700 font-special-gothic" >Welcome to the University Portal</h2>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto font-ubuntu">
                      Experience our comprehensive digital platform showcasing academic excellence, 
                      research achievements, and student success stories.
                    </p>
                  </div> */}
                  
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
                    <span className="font-medium">Get Started</span>
                    
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Footer */}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
