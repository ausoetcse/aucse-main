"use client";

import Image from "next/image";
import { Users, Zap, Target, ChevronDown, ChevronUp, Search, Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import FooterNewsletter from "@/components/footer/footer-newsletter";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import Navigation from "@/components/navbar/navbar";

type RawApiNotice = {
  _id?: string;
  noticeTitle?: string;
  noticeDescription?: string;
  noticeDate?: string;
  noticePriority?: string;
  department?: string;
  __v?: number;
};

type EnhancedNotice = {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  priority: "high" | "medium" | "low";
  department: string;
};

export default function MainPage() {
  const [notices, setNotices] = useState<EnhancedNotice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<EnhancedNotice | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch("https://admin-panel-aucse.vercel.app/api/fetchNoticeBoardData/?apikey=hello");
        const data: RawApiNotice[] | { data: RawApiNotice[] } = await res.json();

        const rawArray: RawApiNotice[] = Array.isArray(data)
          ? data
          : Array.isArray((data as any)?.data)
          ? (data as any).data
          : [];

        const enhanced: EnhancedNotice[] = rawArray.map((n) => ({
          id: n._id || crypto.randomUUID(),
          title: n.noticeTitle || "Untitled",
          description: n.noticeDescription || "",
          date: n.noticeDate
            ? new Date(n.noticeDate).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          priority: (n.noticePriority?.toLowerCase() as "high" | "medium" | "low") || "low",
          department: n.department || "General",
        }));

        setNotices(enhanced);
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const noticesToShow = expanded ? filteredNotices : filteredNotices.slice(0, 6);

  const priorityColor = (priority: EnhancedNotice["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      default:
        return "bg-green-500 text-white";
    }
  };

  return (
    <>
      <div className=" z-10">
        
        <Navigation />
        
              {/* Hero Header */}
              <ScrollAnimation animation="slideDown">
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
                        className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-zinc-100 bg-clip-text text-transparent"
                      >
                        Notices
                      </motion.h1>
                      
                      <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
                      >
                        Notices calendar to keep you updated
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
      </div>
    <main className="container mx-auto ">
              <div className="max-w-7xl mx-auto px-6 py-12 flex flex-row gap-8 justify-between">

                {/* Back Button */}
                <ScrollAnimation animation="slideLeft">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-white/80 px-6 py-3 h-auto mb-5 transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="font-medium">Back to Home</span>
                    </Button>
                  </Link>       
                </ScrollAnimation>

            <div className="flex items-center gap-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search notices..."
              className="border p-2 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
              </div>
              
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">

        </div>

        {loading ? (
          <p>Loading notices...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {noticesToShow.map((notice) => (
                <motion.div
                  key={notice.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                  onClick={() => setSelectedNotice(notice)}
                >
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${priorityColor(notice.priority)}`}>
                      {notice.priority.toUpperCase()}
                    </span>
                    <span className="text-gray-500 text-sm">{notice.date}</span>
                  </div>
                  <h3 className="mt-2 font-bold">{notice.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{notice.description}</p>
                  <p className="text-xs mt-1 text-gray-500">{notice.department}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={() => setExpanded(!expanded)}>
                {expanded ? (
                  <>
                    Show Less <ChevronUp className="ml-2" size={16} />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-2" size={16} />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </section>

      {selectedNotice &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center"
            onClick={() => setSelectedNotice(null)}
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{selectedNotice.title}</h2>
                <span className={`px-2 py-1 rounded-full text-xs ${priorityColor(selectedNotice.priority)}`}>
                  {selectedNotice.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-500 text-sm">{selectedNotice.date}</p>
              <p className="mt-4">{selectedNotice.description}</p>
              <p className="text-xs mt-2 text-gray-500">{selectedNotice.department}</p>
              <div className="mt-4 text-right">
                <Button variant="outline" onClick={() => setSelectedNotice(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
    <FooterNewsletter />
    </>
  );
}
