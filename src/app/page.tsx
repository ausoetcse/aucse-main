"use client"

import { useState } from "react"

import HomePage from "./home/page";
import { LoadingScreen } from "@/components/ui/loading-screen";
export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
    const handleLoadComplete = () => {
      setIsLoading(false)
    }
  
    if (isLoading) {
      return <LoadingScreen onLoadComplete={handleLoadComplete} />
    }
  return <HomePage />
}
