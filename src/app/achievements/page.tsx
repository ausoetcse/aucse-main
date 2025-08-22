'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FlipWords from '@/components/ui/FlipWords';
import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { Session } from '@/types';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Navigation from '@/components/navbar/navbar';
import Image from 'next/image';
import { Users, Zap, Target, ChevronDown, ChevronUp, Search, Sparkles, ArrowLeft } from "lucide-react";
import FooterNewsletter from '@/components/footer/footer-newsletter';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const Achievements: React.FC = () => {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [allAwards, setAllAwards] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const words: string[] = [
    "Celebrating milestones",
    "Honouring excellence",
    "Flipping challenges",
    "Turning dreams",
    "Into achievements"
  ];

 useEffect(() => {
  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await fetch('https://admin-panel-aucse.vercel.app/api/fetchSessions/?apikey=hello');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data: {data: Session[]} = await res.json();
      if (data?.data) {
        setAllAwards(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

  // Extract unique years from API data
  const uniqueYears: string[] = [...new Set(allAwards.map(item => item.year))].sort().reverse();

  // Filtered cards
  const filteredData: Session[] = selectedYear
    ? allAwards.filter(item => item.year === selectedYear)
    : allAwards;

  // Repeat data for infinite scroll illusion (if no filter selected)
  const displayData: Session[] = !selectedYear
    ? Array(3).fill(filteredData).flat()
    : filteredData;

  const handleCardClick = (year: string): void => {
    router.push(`/achievements/${year}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 via-blue-300 to-white">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (

        
                  <div>
                    
                    <ScrollAnimation animation="slideDown">
                      <Navigation />
                    
                      <header className="relative overflow-hidden mt-[9vh]">
                        <div className=" absolute inset-0 bg-gradient-to-br from-zinc-900 via-gray-800 to-slate-800"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
                        <div className="relative max-w-7xl mx-auto px-6 py-20">
                          <div className="text-center text-white">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8 }}
                              className="mb-8"
                            >
                              <Image
                                src="/logo.png"
                                alt="Adamas Logo"
                                width={120}
                                height={120}
                                className="mx-auto h-24 w-24 object-contain drop-shadow-2xl"
                              />
                            </motion.div>
                            
                            <motion.h1
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-zinc-100 bg-clip-text text-transparent flex justify-center items-center"
                            >
                              Awards and Achievements
                            </motion.h1>
                            
                            <motion.p
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.4 }}
                              className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                            >
                              Awards and achievements are a testament to our commitment to excellence and innovation.
                            </motion.p>
            
                            <motion.div
                              initial={{ y: 50, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.8, delay: 0.6 }}
                              className="flex justify-center gap-4"
                            >
                              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <Sparkles className="h-5 w-5" />
                                <span className="font-medium">Creative Minds</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <Zap className="h-5 w-5" />
                                <span className="font-medium">Innovation Driven</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                <Target className="h-5 w-5" />
                                <span className="font-medium">Excellence Focused</span>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </header>
                    </ScrollAnimation>
                    
 
      {/* <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-10 pb-7 flex flex-col items-center text-center px-4 space-y-4"
      >
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-classic text-white flex items-center justify-center gap-3 leading-tight tracking-wide">
          Awards & Achievements
          <Trophy size={40} className="text-white" strokeWidth={2.5} />
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white max-w-4xl px-2 font-medium leading-relaxed">
          A journey of resilience, creativity, and excellence — where every milestone reflects hard work and passion.
        </p>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-yellow-300">
          <FlipWords words={words} className="font-black" />
        </p>
      </motion.div> */}

      {/* Filter Dropdown */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-row gap-3 items-center justify-center mb-15 py-5"
      >
        <label className="text-lg font-semibold text-zinc-900 flex items-center gap-2 font-ubuntu">
          <Calendar /> Select Year
        </label>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedYear(e.target.value)}
            className="appearance-none bg-transparent text-zinc-900 text-base font-medium px-4 py-1 rounded-sm shadow-lg backdrop-blur-sm border border-white focus:outline-none focus:ring-2 focus:ring-white w-40"
          >
            <option value="" className="bg-gray-800 text-zinc-900">All Years</option>
            {uniqueYears.map((year, idx) => (
              <option key={idx} value={year} className="bg-gray-800 text-white">
                {year}
              </option>
            ))}
          </select>
          <svg 
            className="w-4 h-4 text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>


       {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className={`w-full ${!selectedYear ? 'animate-marquee' : ''}`}
      >
        <div className={`flex ${!selectedYear ? 'whitespace-nowrap' : 'flex-wrap justify-center'} gap-6 px-6 py-5`}>

          {displayData.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={`${item._id}-${index}`}
              onClick={() => handleCardClick(item.year)}
              className="relative min-w-[17.3rem] max-w-[17.3rem] bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl h-82 flex flex-col items-center justify-start cursor-pointer shadow-zinc-900 shadow-lg"
            >

              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(/banner3.jpg)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  boxShadow: "0 0 10px rgba(255,255,255,0.4)"
                }}
                className="w-[100%] h-[40%] rounded-t-xl"
              />
              <p className="absolute text-2xl font-bold text-white top-7 text-center">{item.year}</p>
              <div className="text-center w-[100%] h-[60%] bg-white/60 rounded-b-xl flex flex-col p-2">
                <div className="w-full flex items-center justify-between text-gray-900 px-1">
                  <Image src="/logo.png" width={50} height={50} alt="Logo" />
                  <Logo size={14} />
                </div>
                <div className="py-2 h-full text-gray-600 max-w-full overflow-hidden">
                  <p className="whitespace-normal break-words text-xs font-medium text-left pt-2 px-3">
                    Adamas University achieved NAAC A++ accreditation,
                    recognizing its commitment to academic excellence,
                    advanced research, and robust infrastructure,
                    placing it among the top-rated institutions in India.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div> 
      <FooterNewsletter />
    </div>
    
   
    
  );
};

export default Achievements;