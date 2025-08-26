"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardFooter,
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
  //     const [apiError, setApiError] = useState<string | null>(null);
  //     useEffect(() => {
  //   async function fetchAwardAndAchivement() {
  //     try {
  //       setLoading(true);
  //       setApiError(null);
        
  //       const response = await fetch(`https://admin-panel-aucse.vercel.app/api/fetchAwardAndAchievementData/?apikey=hello&filter={"number":6}`);
        
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
        
  //       const json = await response.json();

      
  //       setApiAwardAndAchivement(json.data);
  //     } catch (error) {
  //       console.error("Failed to fetch notices:", error);
  //       setApiError(error instanceof Error ? error.message : 'Unknown error occurred');
  //       setApiAwardAndAchivement([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
    
  //   fetchAwardAndAchivement();
  // }, []);
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 font-special-gothic px-2">Achievements and Awards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-ubuntu px-4">
            Showcasing one of a kind achievements and awards received by our students and faculty in the past year.
          </p>
        </div>

        <div className="w-full flex justify-center items-center gap-2 mb-8 flex-col lg:flex-row">
          {ApiAwardAndAchivement.map((item, index) => (
            <MinimalCard className="m-2 w-[300px] h-full cursor-pointer" key={item.id || index}>
              <MinimalCardImage
                className=" w-full object-cover"
                src={item.imgUrl?.[0] || "/placeholder.svg"}
                alt={item.programmeName}
              />
              <div className="w-full h-10">
              <MinimalCardTitle>{item.programmeName}</MinimalCardTitle>
              </div>
              <MinimalCardFooter className="items-center w-full flex justify-end px-2 mt-5 gap-2 ">

                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-[12px] font-monsterrat font-semibold text-muted-foreground ">{item.dateOfProgramme}</span>
              </MinimalCardFooter>
  

            </MinimalCard>
   
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 hover:bg-gray-100 bg-transparent" asChild>
            <Link href="/achievements" target="_blank" rel="noopener noreferrer">
              View More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
            
     
        </div>
      </div>
    </section>
  )
}
