"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Archive, FileText, Calendar, MapPin, Users, Search as SearchIcon, Filter as FilterIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type RawApiNotice = {
  _id?: string
  noticeTitle?: string
  noticeDescription?: string
  noticeDate?: string
  noticePriority?: string
  department?: string
  __v?: number
}

type EnhancedNotice = {
  id: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  priority: "high" | "medium" | "low"
  department: string
}

type EventItem = {
  id: string | number
  title: string
  date: string
  time?: string
  location?: string
  category?: string
  attendees?: number
  priority?: "high" | "medium" | "low" | string
  department?: string
  description?: string
}

/* Mock events (fallback) */
const mockEvents: Record<string, EventItem[]> = {
  upcoming: [
    {
      id: "up-1",
      title: "Art Exhibition Opening",
      date: "2024-01-15",
      time: "18:00",
      location: "Green Hall Gallery",
      category: "exhibition",
      attendees: 45,
      priority: "high",
      department: "Art Department",
      description: "Opening night for the Fall 2021 Art Exhibition featuring student works.",
    },
  ],
  ongoing: [
    {
      id: "on-1",
      title: "Ongoing Workshop",
      date: "2024-01-20",
      time: "10:00",
      location: "Workshop Room A",
      category: "workshop",
      attendees: 20,
      priority: "medium",
      department: "Training",
      description: "Hands-on workshop for new tools.",
    },
  ],
  past: [
    {
      id: "past-1",
      title: "Past Lecture",
      date: "2023-12-01",
      time: "09:00",
      location: "Lecture Hall 2",
      category: "lecture",
      attendees: 75,
      priority: "low",
      department: "Science Department",
      description: "Guest lecture on recent discoveries.",
    },
  ],
}

const departments = ["All", "Computer Science And Engineering", "Computer Applications"]
const eventCategories = ["All", "exhibition", "workshop", "lecture", "review"]

const categoryColors: Record<string, string> = {
  exhibition: "bg-purple-100 text-purple-800 border-purple-200",
  workshop: "bg-blue-100 text-blue-800 border-blue-200",
  lecture: "bg-green-100 text-green-800 border-green-200",
  review: "bg-orange-100 text-orange-800 border-orange-200",
}

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export default function NoticeBoard() {
  const [activeTab, setActiveTab] = useState<string>("latest")
  const [notices, setNotices] = useState<EnhancedNotice[]>([]) // store enhanced notices (stable ids)
  const [loading, setLoading] = useState<boolean>(true)
  const [apiError, setApiError] = useState<string | null>(null)

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    priority: "all",
    dateFrom: "",
    dateTo: "",
    eventCategory: "all",
  })

  /* Fetch & transform once; produce stable IDs */
  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    async function fetchNotices() {
      try {
        setLoading(true)
        setApiError(null)

        const res = await fetch("https://admin-panel-a-ucse.vercel.app/api/fetchNoticeBoardData/?apikey=hello", {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const json = await res.json()

        // Normalize raw array from possible shapes
        let rawArray: RawApiNotice[] = []
        if (Array.isArray(json)) rawArray = json
        else if (json?.data && Array.isArray(json.data)) rawArray = json.data
        else if (json?.notices && Array.isArray(json.notices)) rawArray = json.notices
        else {
          // if unexpected structure: keep empty (or you could log json for debugging)
          rawArray = []
        }

        // transform to EnhancedNotice and generate stable fallback id if needed
        const enhanced = rawArray.map((r, idx) => {
          const stableId = r._id ?? `api-fallback-${String(idx)}-${String(r.noticeTitle ?? "").slice(0, 10)}`
          const date = r.noticeDate ?? new Date().toISOString().split("T")[0]
          const priority = ((r.noticePriority ?? "medium") as "high" | "medium" | "low")
          return {
            id: String(stableId),
            title: r.noticeTitle ?? "Untitled Notice",
            description: r.noticeDescription ?? "No description available",
            date,
            priority,
            department: r.department ?? "General",
          } as EnhancedNotice
        })

        if (mounted) {
          setNotices(enhanced)
        }
      } catch (err) {
        if ((err as any)?.name === "AbortError") {
          // ignore abort
        } else {
          console.error("Fetch error", err)
          setApiError(err instanceof Error ? err.message : String(err))
          setNotices([])
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchNotices()

    return () => {
      mounted = false
      controller.abort()
    }
  }, [])

  /* Categorize notices by date (memoized) */
  const categorizedNotices = useMemo(() => {
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const latest = notices.filter((n) => new Date(n.date) >= sevenDaysAgo)
    const old = notices.filter((n) => {
      const d = new Date(n.date)
      return d >= thirtyDaysAgo && d < sevenDaysAgo
    })
    const archived = notices.filter((n) => new Date(n.date) < thirtyDaysAgo)

    return { latest, old, archived }
  }, [notices])

  /* Generic notice filter (memoized per relevant inputs) */
  const filterNotices = (noticesToFilter: EnhancedNotice[]) =>
    noticesToFilter.filter((notice) => {
      const q = filters.search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        notice.title.toLowerCase().includes(q) ||
        notice.description.toLowerCase().includes(q)

      const matchesDepartment = filters.department === "all" || notice.department === filters.department
      const matchesPriority = filters.priority === "all" || notice.priority === filters.priority

      const noticeDate = new Date(notice.date)
      const matchesDateFrom = !filters.dateFrom || noticeDate >= new Date(filters.dateFrom)
      const matchesDateTo = !filters.dateTo || noticeDate <= new Date(filters.dateTo)

      return matchesSearch && matchesDepartment && matchesPriority && matchesDateFrom && matchesDateTo
    })

  /* Event filtering for mockEvents (simple) */
  const filterEvents = (events: EventItem[]) =>
    events.filter((event) => {
      const q = filters.search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        (event.title && event.title.toLowerCase().includes(q)) ||
        (event.description && event.description.toLowerCase().includes(q)) ||
        (event.location && event.location.toLowerCase().includes(q))

      const matchesDepartment = filters.department === "all" || event.department === filters.department
      const matchesPriority = filters.priority === "all" || event.priority === filters.priority

      const eventDate = new Date(event.date)
      const matchesDateFrom = !filters.dateFrom || eventDate >= new Date(filters.dateFrom)
      const matchesDateTo = !filters.dateTo || eventDate <= new Date(filters.dateTo)

      const matchesCategory = filters.eventCategory === "all" || event.category === filters.eventCategory

      return matchesSearch && matchesDepartment && matchesPriority && matchesDateFrom && matchesDateTo && matchesCategory
    })

  /* Renderers */
  const renderNoticeTable = (list: EnhancedNotice[]) => {
    const filtered = filterNotices(list)

    if (loading) {
      return (
        <div className="text-center py-8 text-slate-500">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-2" />
          <p>Loading notices...</p>
        </div>
      )
    }

    if (apiError) {
      return (
        <div className="text-center py-8 text-red-500">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Failed to load notices</p>
          <p className="text-sm text-slate-500 mt-1">{apiError}</p>
        </div>
      )
    }

    if (filtered.length === 0) {
      return (
        <div className="text-center py-8 text-slate-500">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No notices found matching your filters</p>
        </div>
      )
    }

    return (
      <div className="relative space-y-3 gap-x-4  w-full h-[500px] overflow-auto">
        {filtered.map((notice) => (
          <Card key={`notice-${notice.id}`} className="border border-slate-200 hover:shadow-md transition-shadow w-full h-[200px]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900 truncate">{notice.title}</h3>
                    <Badge variant="outline" className={`text-xs ${priorityColors[notice.priority] ?? ""}`}>
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-2 line-clamp-2">{notice.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notice.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {notice.department}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderEventTable = (events: EventItem[]) => {
    const filtered = filterEvents(events)

    if (filtered.length === 0) {
      return (
        <div className="text-center py-8 text-slate-500">
          <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No events found matching your filters</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {filtered.map((event) => {
          const eventKey = `event-${String(event.id)}-${(event.title || "").slice(0, 12)}`
          return (
            <Card key={eventKey} className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900 truncate">{event.title}</h3>

                      {event.category && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${categoryColors[event.category] ?? "bg-gray-100 text-gray-800 border-gray-200"}`}
                        >
                          {event.category}
                        </Badge>
                      )}

                      {event.priority && (
                        <Badge variant="outline" className={`text-xs ${priorityColors[String(event.priority)] ?? ""}`}>
                          {event.priority}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{event.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}{event.time ? ` at ${event.time}` : ""}
                      </span>

                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}

                      {typeof event.attendees !== "undefined" && (
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees} attendees
                        </span>
                      )}

                      {event.department && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {event.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }

  const clearFilters = () =>
    setFilters({
      search: "",
      department: "all",
      priority: "all",
      dateFrom: "",
      dateTo: "",
      eventCategory: "all",
    })

  return (
    <div className="h-auto bg-slate-50">
      <div className="max-w-8xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border border-slate-200 h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-slate-800 text-lg pt-5">
                  <FilterIcon className="h-5 w-5 text-blue-600" />
                  Filters
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium">
                    Search
                  </Label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="Search notices..."
                      value={filters.search}
                      onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Department Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Department</Label>
                  <Select
                    value={filters.department}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, department: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.slice(1).map((dept) => (
                        <SelectItem key={`dept-${dept}`} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Priority</Label>
                  <Select
                    value={filters.priority}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Event Category Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Event Category</Label>
                  <Select
                    value={filters.eventCategory || "all"}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, eventCategory: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {eventCategories.slice(1).map((category) => (
                        <SelectItem key={`cat-${category}`} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="space-y-2 flex items-start flex-col lg:flex-row justify-between w-full gap-5">
                    <div className="">
                    <Label className="space-y-1 py-1 text-muted-foreground">From</Label>
                    <Input
                      type="date"
                      placeholder="From date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
                    />
                    </div>
                    <div className="">
                    <Label className="space-y-1 py-1 text-muted-foreground">To</Label>
                    <Input
                      type="date"
                      placeholder="To date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
                    />
                  </div>
                  </div>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full flex items-center gap-2 bg-transparent">
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notices Section */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border border-slate-200">
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-slate-800 text-lg">Notices & Announcements</CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-[500px]">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-6 gap-2 p-1">
                    <TabsTrigger value="latest" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2.5 px-3 rounded-md">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Latest</span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterNotices(categorizedNotices.latest).length})</span>
                    </TabsTrigger>

                    <TabsTrigger value="old" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2.5 px-3 rounded-md">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Old</span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterNotices(categorizedNotices.old).length})</span>
                    </TabsTrigger>

                    <TabsTrigger value="archived" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2.5 px-3 rounded-md">
                      <Archive className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Archived</span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterNotices(categorizedNotices.archived).length})</span>
                    </TabsTrigger>

                    {/* <TabsTrigger value="events" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2.5 px-3 rounded-md">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Events</span>
                      <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterEvents(mockEvents.upcoming).length})</span>
                    </TabsTrigger> */}
                  </TabsList>

                  <TabsContent value="latest" className="mt-0">
                    {renderNoticeTable(categorizedNotices.latest)}
                  </TabsContent>

                  <TabsContent value="old" className="mt-0">
                    {renderNoticeTable(categorizedNotices.old)}
                  </TabsContent>

                  <TabsContent value="archived" className="mt-0">
                    {renderNoticeTable(categorizedNotices.archived)}
                  </TabsContent>

                  <TabsContent value="events" className="mt-0">
                    <div className="space-y-6">
                      <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 p-1">
                          <TabsTrigger value="upcoming" className="text-xs sm:text-sm py-2.5 px-3 rounded-md flex items-center justify-center gap-1">
                            <span>Upcoming</span>
                            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterEvents(mockEvents.upcoming).length})</span>
                          </TabsTrigger>

                          <TabsTrigger value="ongoing" className="text-xs sm:text-sm py-2.5 px-3 rounded-md flex items-center justify-center gap-1">
                            <span>Ongoing</span>
                            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterEvents(mockEvents.ongoing).length})</span>
                          </TabsTrigger>

                          <TabsTrigger value="past" className="text-xs sm:text-sm py-2.5 px-3 rounded-md flex items-center justify-center gap-1">
                            <span>Past</span>
                            <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">({filterEvents(mockEvents.past).length})</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming" className="mt-4">
                          {renderEventTable(mockEvents.upcoming)}
                        </TabsContent>

                        <TabsContent value="ongoing" className="mt-4">
                          {renderEventTable(mockEvents.ongoing)}
                        </TabsContent>

                        <TabsContent value="past" className="mt-4">
                          {renderEventTable(mockEvents.past)}
                        </TabsContent>
                      </Tabs>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
