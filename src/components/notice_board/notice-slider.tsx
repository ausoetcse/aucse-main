"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Notice {
  id: number
  title: string
  description: string
  content: string
  date: string
  priority: "high" | "medium" | "low"
  category: string
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Annual Company Meeting",
    description: "Join us for the annual company meeting to discuss Q4 results and 2025 planning.",
    content:
      "We are excited to announce our annual company meeting scheduled for January 15th, 2025. This meeting will cover our Q4 performance, achievements, and strategic planning for the upcoming year. All employees are required to attend. The meeting will be held in the main conference hall from 10:00 AM to 12:00 PM. Light refreshments will be provided. Please confirm your attendance with HR by January 10th.",
    date: "2025-01-15",
    priority: "high",
    category: "Meeting",
  },
  {
    id: 2,
    title: "New Security Protocols",
    description: "Important updates to our security protocols effective immediately.",
    content:
      "Effective immediately, we are implementing new security protocols to enhance our workplace safety. All employees must now use their ID cards to access the building and individual floors. The new system includes biometric verification for sensitive areas. Please update your emergency contact information and review the new evacuation procedures posted on the company intranet. Training sessions will be conducted next week.",
    date: "2025-01-08",
    priority: "high",
    category: "Security",
  },
  {
    id: 3,
    title: "Holiday Schedule Update",
    description: "Updated holiday schedule for the remainder of the year.",
    content:
      "Please note the updated holiday schedule for 2025. Martin Luther King Jr. Day (January 20th) will be observed as a company holiday. Presidents Day (February 17th) will be a half-day with offices closing at 1:00 PM. Memorial Day (May 26th) will be a full company holiday. Please plan your projects and deadlines accordingly. The complete holiday calendar is available on the HR portal.",
    date: "2025-01-05",
    priority: "medium",
    category: "HR",
  },
  {
    id: 4,
    title: "Office Renovation Notice",
    description: "Temporary office space changes due to renovation work.",
    content:
      "The 3rd floor will undergo renovation starting January 20th, 2025. Affected departments will be temporarily relocated to the 5th floor conference rooms. The renovation is expected to complete by March 1st, 2025. During this period, there may be some noise and dust. We apologize for any inconvenience. Temporary parking arrangements have been made for construction vehicles. Please use the north entrance during renovation hours (8 AM - 5 PM).",
    date: "2025-01-03",
    priority: "medium",
    category: "Facilities",
  },
  {
    id: 5,
    title: "Team Building Event",
    description: "Join us for a fun team building event at the local park.",
    content:
      "We're organizing a team building event on Saturday, January 25th, 2025, at Riverside Park. Activities include team challenges, BBQ lunch, and networking games. The event starts at 10:00 AM and ends at 4:00 PM. Transportation will be provided from the office. Please wear comfortable clothing and bring sunscreen. RSVP to the HR team by January 20th. Family members are welcome to join us for lunch (12:00 PM - 2:00 PM).",
    date: "2025-01-03",
    priority: "low",
    category: "Event",
  },
  {
    id: 6,
    title: "IT System Maintenance",
    description: "Scheduled maintenance for all IT systems this weekend.",
    content:
      "All IT systems will undergo maintenance this Saturday from 2 AM to 6 AM. Services may be temporarily unavailable.",
    date: "2025-01-03",
    priority: "medium",
    category: "IT",
  },
  {
    id: 7,
    title: "New Employee Orientation",
    description: "Welcome session for new team members joining this month.",
    content: "New employee orientation will be held every Monday at 9 AM in Conference Room A.",
    date: "2025-01-15",
    priority: "low",
    category: "HR",
  },
  {
    id: 8,
    title: "Quarterly Review Meeting",
    description: "Department heads quarterly performance review.",
    content: "All department heads are required to attend the quarterly review meeting to discuss performance metrics.",
    date: "2025-01-08",
    priority: "high",
    category: "Meeting",
  },
]

interface NoticeSliderProps {
  selectedDate?: Date
}

export function NoticeSlider({ selectedDate }: NoticeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Filter notices by selected date
  const filteredNotices = selectedDate
    ? notices.filter((notice) => {
        const noticeDate = new Date(notice.date)
        return noticeDate.toDateString() === selectedDate.toDateString()
      })
    : notices

  const displayNotices = filteredNotices.length > 0 ? filteredNotices : notices
  const noticesPerView = 3
  const maxIndex = Math.max(0, displayNotices.length - noticesPerView)

  useEffect(() => {
    setCurrentIndex(0) // Reset to first slide when date changes
  }, [selectedDate])

  useEffect(() => {
    if (!isMounted || !isPlaying || displayNotices.length <= noticesPerView) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (maxIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isMounted, isPlaying, maxIndex])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1))
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white"
      case "medium":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      case "low":
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
    }
  }

  const visibleNotices = displayNotices.slice(currentIndex, currentIndex + noticesPerView)

  if (!isMounted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Loading Notices...
          </h2>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                    <div className="h-6 w-12 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                  <div className="h-4 w-full bg-slate-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {selectedDate ? "Notices for Selected Date" : "Latest Notices"}
          </h2>
          {selectedDate && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedDate.toLocaleDateString()}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs bg-slate-100">
            {displayNotices.length} notice{displayNotices.length !== 1 ? "s" : ""}
          </Badge>
          {displayNotices.length > noticesPerView && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={togglePlayPause} className="h-8 w-8 p-0 hover:bg-slate-100">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="h-8 w-8 p-0 hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Notices Grid */}
      {displayNotices.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <CalendarIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No notices for this date</p>
              <p className="text-slate-400 text-sm">Select a different date to view notices</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {visibleNotices.map((notice) => (
            <Card
              key={notice.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`${getPriorityColor(notice.priority)} text-xs font-medium px-2 py-1`}>
                        {notice.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                        {notice.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500 ml-auto">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(notice.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{notice.description}</p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setSelectedNotice(notice)}
                      >
                        Read More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getPriorityColor(notice.priority)}>{notice.priority.toUpperCase()}</Badge>
                          <Badge variant="outline" className="bg-slate-50">
                            {notice.category}
                          </Badge>
                        </div>
                        <DialogTitle className="text-xl text-slate-900">{notice.title}</DialogTitle>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                      </DialogHeader>
                      <DialogDescription className="text-base leading-relaxed whitespace-pre-line text-slate-700">
                        {notice.content}
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Progress indicator */}
      {displayNotices.length > noticesPerView && (
        <div className="flex justify-center gap-2 pt-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 w-8"
                  : "bg-slate-300 w-2 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
