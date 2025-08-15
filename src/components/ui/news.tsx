"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

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
        
        const response = await fetch(`https://admin-panel-a-ucse.vercel.app/api/fetchAwardAndAchievementData/?apikey=hello&filter={"number":3}`);
        
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
    <section className="py-16 px-6 bg-gradient-to-b to-white fromt-blue-500/20">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 font-special-gothic px-2">Achievements and Awards</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-ubuntu px-4">
            Showcasing one of a kind achievements and awards received by our students and faculty in the past year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ApiAwardAndAchivement.map((item, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              <CardContent className="p-0 h-full">
                {/* Image Container with Gradient Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imgUrl[0] || "/placeholder.svg"}
                    alt={item.programmeName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.dateOfProgramme}
                    </div>
                  </div>
                  
                  {/* Achievement Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                    <span className="text-white text-lg">
                      {index === 0 ? "🏆" : index === 1 ? "💻" : index === 2 ? "💰" : index === 3 ? "🥇" : index === 4 ? "🤝" : "🏢"}
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  {/* Title with Gradient Text */}
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-300"
                    >
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    
                    {/* Achievement Badge */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Achievement</span>
                    </div>
                  </div>
                </div>
                
                {/* Subtle Border Gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              </CardContent>
            </Card>
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
