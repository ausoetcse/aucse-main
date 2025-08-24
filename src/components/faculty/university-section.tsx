"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

export default function UniversitySection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedFaculty, setExpandedFaculty] = useState<Set<string>>(
    new Set()
  );

  // Embla carousel setup for faculty
  const [facultyEmblaRef, facultyEmblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    startIndex: 0,
  });
  //
  // Embla carousel setup for companies
  const [companiesEmblaRef, companiesEmblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    startIndex: 0,
  });

  const scrollFacultyPrev = useCallback(() => {
    if (facultyEmblaApi) facultyEmblaApi.scrollPrev();
  }, [facultyEmblaApi]);

  const scrollFacultyNext = useCallback(() => {
    if (facultyEmblaApi) facultyEmblaApi.scrollNext();
  }, [facultyEmblaApi]);

  const scrollCompaniesPrev = useCallback(() => {
    if (companiesEmblaApi) companiesEmblaApi.scrollPrev();
  }, [companiesEmblaApi]);

  const scrollCompaniesNext = useCallback(() => {
    if (companiesEmblaApi) companiesEmblaApi.scrollNext();
  }, [companiesEmblaApi]);

  const toggleFacultyExpansion = (name: string) => {
    setExpandedFaculty((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const [autoScroll, setAutoScroll] = useState(true);
  useEffect(() => {
    setIsLoaded(true);

    if (!autoScroll) return;
    // Auto-scroll functionality
    const facultyInterval = setInterval(() => {
      if (facultyEmblaApi) facultyEmblaApi.scrollNext();
    }, 4000);

    const companiesInterval = setInterval(() => {
      if (companiesEmblaApi) companiesEmblaApi.scrollNext();
    }, 4500);

    return () => {
      clearInterval(facultyInterval);
      clearInterval(companiesInterval);
    };
  }, [facultyEmblaApi, companiesEmblaApi, autoScroll]);

const [facultyMembers, setFacultyMembers] = useState<any[]>([]);

useEffect(() => {
  const fetchFacultyData = async () => {
    try {
      const response = await fetch('https://admin-panel-aucse.vercel.app/api/fetchFacultyMemeberData/?apikey=hello'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch faculty data');
      }
      const data = await response.json();
      // console.log(data?.data);
      
      setFacultyMembers(data?.data);

    } catch (error) {
      console.error(error);
    }
  };
  fetchFacultyData();
}, []);


  const placementCompanies = [
    {
      name: "Juspay",
      logo: "/placement/juspay.jpg",
      sector: "Technology",
    },
    {
      name: "Technook",
      logo: "/placement/technook.png",
      sector: "Technology",
    },
    {
      name: "TCS",
      logo: "/placement/tcs.png",
      sector: "Consultancy",
    },
    {
      name: "Amazon",
      logo: "/placement/amazon.png",
      sector: "E-commerce",
    },
    {
      name: "Maity's Group",
      logo: "/placement/maity.jpg",
      sector: "Technology",
    },
    {
      name: "Wavity",
      logo: "/placement/wavity.png",
      sector: "AI",
    },
    {
      name: "Zenus",
      logo: "/placement/zenus.jpg",
      sector: "Entertainment",
    },
    {
      name: "Wipro",
      logo: "/placement/wipro.jpg",
      sector: "Technology",
    },
  ];

  const stats = [
    { label: "Placement Rate", value: 97, suffix: "%", icon: TrendingUp },
    {
      label: "Average Package",
      value: 6,
      suffix: "LPA",
      prefix: "INR",
      icon: Award,
    },
    { label: "Top Package", value: 55, suffix: "LPA", prefix: "INR", icon: Star },
    { label: "Companies Visited", value: 250, suffix: "+", icon: Users },
  ];

  const StatCard = ({
    stat,
    index,
  }: {
    stat: (typeof stats)[0];
    index: number;
  }) => {
    const { count, ref } = useCounterAnimation(stat.value, 2500);

    return (
      <Card
        ref={ref}
        className={`text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105 ${
          isLoaded ? "animate-fade-in-up" : "opacity-0"
        }`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <CardContent className="p-0">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-4 animate-pulse-glow">
            <stat.icon className="h-8 w-8" />
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2 font-ubuntu">
            <span className="text-lg text-zinc-700">{stat.prefix}</span>
            {count}
            <span className="text-lg text-zinc-700"> {stat.suffix}</span>
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {stat.label}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="flex justify-center w-full py-5 md:py-10 lg:py-10 bg-gradient-to-br from-zinc-900 via-blue-800 to-zinc-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-800/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 ${
            isLoaded ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-gradient font-special-gothic">
            Meet Our Distinguished Faculty &
            <br />
            Top Placement Partners
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-zinc-100 font-ubuntu">
            Learn from industry experts and get placed in world&apos;s leading
            companies. Our faculty brings decades of experience while our
            placement record speaks for itself.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Faculty Section */}
        <div className="mb-20">
          <div
            className={`text-center mb-12 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1000ms" }}
          >
            <h3 className="text-3xl font-bold mb-4 text-white font-special-gothic">
              Our Expert Faculty
            </h3>
            <p className="text-lg  max-w-2xl mx-auto text-gray-50 font-ubuntu">
              Learn from distinguished professors and industry veterans who
              bring real-world experience to the classroom
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-lg"
              onClick={scrollFacultyPrev}
            >
              <ChevronLeft className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-lg"
              onClick={scrollFacultyNext}
            >
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </Button>

            <div className="overflow-hidden py-8" ref={facultyEmblaRef}>
              <div className="flex hover:blur-other-cards">
                {facultyMembers.map((faculty, index) => (
                  <div key={index} className="flex-[0_0_auto] w-96 px-3">
                    <Card
                      className={`border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-110 group cursor-grab active:cursor-grabbing ${
                        expandedFaculty.has(faculty.facultyName) ? "h-full" : "h-96"
                      }`}
                    >
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="relative ">
                            
                            <div className="h-20 w-20">
                            <Image
                              src={faculty.imgUrl || "/logo.png"}
                              alt={faculty.facultyName}
                              width={100}
                              height={100}
                              className="rounded-full aspect-square object-cover border-4 border-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {faculty.facultyName}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="mb-2 text-xs group-hover:bg-blue-100 transition-colors"
                            >
                              {/* {faculty.department} */}
                              Computer Science & Engineering
                            </Badge>
                            <p className="text-sm text-muted-foreground mb-2">
                              {faculty.facultyDesignation || "NA"} , Computer Science & Engineering
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              {/* <span className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-1 group-hover:animate-spin" />
                                 {faculty.facultyRating || "NA"}
                              </span> */}
                              <span>{faculty.facultyPublications || "NA"} pubs</span>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedFaculty.has(faculty.facultyName) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-100 space-y-3"
                          >
                            {/* Email */}
                            {faculty.facultyEmail && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-600 truncate">
                                  {faculty.facultyEmail}
                                </span>
                              </div>
                            )}

                            {/* Experience & Publications */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">Experience:</span>
                                <span className="text-blue-600">
                                  {faculty.facultyExperience || "NA"}+ years
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <span className="font-medium">
                                  Publications:
                                </span>
                                <span className="text-blue-600">
                                  {faculty.facultyPublications || "NA"}
                                </span>
                              </div>
                            </div>

                            {/* Designation */}
                            <div className="text-sm">
                              <span className="font-medium text-gray-600">
                                Designation:{" "}
                              </span>
                              <span className="text-gray-900">
                                {faculty.facultyDesignation || "NA"}
                              </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 text-sm">
                              {/* <span className="font-medium text-gray-600">
                                Rating:{" "}
                              </span> */}
                              <div className="flex items-center">
                                {/* <Star className="h-3 w-3 text-yellow-500 mr-1" /> */}
                                <span className="text-gray-900">
                                  {/* {faculty.facultyRating || "NA"}/5.0 */}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                              Experience
                            </span>
                            <span className="font-semibold text-blue-600">
                              {faculty.facultyExperience || "NA"}+ years
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm mt-2">
                            <span className="text-muted-foreground">
                              Designation
                            </span>
                            <span className="font-semibold text-gray-900 text-right">
                              {faculty.facultyDesignation || "NA"}
                            </span>
                          </div>

                          {/* Toggle Button */}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFacultyExpansion(faculty.facultyName);
                              if (expandedFaculty.has(faculty.facultyName)) {                  
                                setAutoScroll(true);
                              } else {
                                // Opening view more
                                setAutoScroll(false);
                              }
                            }}
                            variant="outline"
                            size="sm"
                            className="w-full mt-3 text-xs"
                          >
                            {expandedFaculty.has(faculty.facultyName)
                              ? "Show Less"
                              : "Show More"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Placement Companies Section */}
        <div className="mb-16">
          <div
            className={`text-center mb-12 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "1000ms" }}
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-100 font-special-gothic">
              Top Placement Partners
            </h3>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto font-ubuntu">
              Our graduates are recruited by leading global companies across
              various industries
            </p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-lg"
              onClick={scrollCompaniesPrev}
            >
              <ChevronLeft className="h-4 w-4 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-lg"
              onClick={scrollCompaniesNext}
            >
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </Button>

            <div className="overflow-hidden py-6" ref={companiesEmblaRef}>
              <div className="flex hover:blur-other-cards">
                {[
                  ...placementCompanies,
                  ...placementCompanies,
                  ...placementCompanies,
                ].map((company, index) => (
                  <div key={index} className="flex-[0_0_auto] w-60 px-4">
                    <Card className="h-56 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-110 group overflow-hidden cursor-grab active:cursor-grabbing">
                      <CardContent className="p-0 h-full relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="h-full flex flex-col items-center justify-center p-6 relative z-10">
                          <div className="bg-white rounded-xl p-6 mb-4 group-hover:scale-105 transition-transform duration-300 w-full h-24 flex items-center justify-center shadow-sm">
                            <Image
                              src={company.logo || "/logo.png"}
                              alt={`${company.name} logo`}
                              width={120}
                              height={60}
                              className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-center">
                            {company.name}
                          </h4>
                          <Badge
                            variant="outline"
                            className="group-hover:bg-blue-100 group-hover:border-blue-300 transition-colors duration-300"
                          >
                            {company.sector}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .scale-120 {
          transform: scale(1.2);
        }

        .hover\:blur-other-cards:hover > *:not(:hover) {
          filter: blur(1px);
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}