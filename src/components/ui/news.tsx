"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"

const newsItems = [
  {
    id: 1,
    title: "Adamas University Achieves NAAC A++ Accreditation",
    date: "20 Dec 2024",
    image: "/naac.jpg",
    description: "Adamas University has been awarded the prestigious NAAC A++ accreditation, recognizing our commitment to academic excellence and quality education.",
  },
  {
    id: 2,
    title: "CSE Department Hosts National Hackathon 2024",
    date: "15 Dec 2024",
    image: "/banner2.png",
    description: "Over 500 students from across India participated in our 48-hour hackathon, showcasing innovative solutions in AI, cybersecurity, and sustainable technology.",
  },
  {
    id: 3,
    title: "Faculty Research Grant of ₹50 Lakhs Awarded",
    date: "10 Dec 2024",
    image: "/banner3.jpg",
    description: "Our Computer Science faculty received a major research grant for developing AI-powered educational tools and blockchain-based security systems.",
  },
  
]

export function NewsSection() {
    const [loading, setLoading] = useState(true);
    const [ApiAwardAndAchivement, setApiAwardAndAchivement] = useState([]);
      const [apiError, setApiError] = useState<string | null>(null);
      useEffect(() => {
    async function fetchAwardAndAchivement() {
      try {
        setLoading(true);
        setApiError(null);
        
        const response = await fetch(`https://admin-panel-aucse.vercel.app/api/fetchAwardAndAchievementData/?apikey=hello&filter={"number":3}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();

      
        setApiAwardAndAchivement(json.data);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setApiError(error instanceof Error ? error.message : 'Unknown error occurred');
        setApiAwardAndAchivement([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAwardAndAchivement();
  }, []);
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 font-special-gothic px-2">Achievements and Awards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-ubuntu px-4">
            Showcasing one of a kind achievements and awards received by our students and faculty in the past year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ApiAwardAndAchivement.map((item, index) => (
            <MinimalCard className="m-2 max-w-[460px]" key={item.id || index}>
              <MinimalCardImage
                className="h-[320px]"
                src={item.imgUrl?.[0] || "/placeholder.svg"}
                alt={item.programmeName}
              />
              <div className="w-full h-10">
              <MinimalCardTitle>{item.programmeName}</MinimalCardTitle>
              </div>
              <MinimalCardDescription>
                {item.description}
              </MinimalCardDescription>
              <div className="items-center w-full flex justify-end px-4">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-ubuntu text-sm text-blue-400 hover:underline hover:text-blue-700 cursor-pointer transition-all duration-300 ease-linear">Read More</a>
                </div>
            </MinimalCard>
   
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 hover:bg-gray-100 bg-transparent" asChild>
            <Link href="https://aucse-awards-achievements.vercel.app/" target="_blank" rel="noopener noreferrer">
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
            
     
        </div>
      </div>
    </section>
  )
}
