'use client'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/navbar/resizable-navbar"
import {
  GraduationCap,
  Calendar,
  Microscope,
  Users,
  Briefcase,
  MapPin,
  BookOpen,
  HeadphonesIcon,
  Library,
  Trophy,
  Globe,
  ChevronRight,
  ArrowRight, 
  Bell,
  ArrowUp,
  X,
  Menu,
  ArrowDown,
  BookUser,
  Calendar1,
  Calendar1Icon,
  CalendarRange,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import { BaseUrl } from "@/lib/baseurl"
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"

export default function Navigation() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const navItems = [
    {
      name: "Home",
      link: "/",

    },
    {
      name: "About",
      link: `/aboutus`,
    },
    {
      name: "Notice",
      link: "/notice",
    },
    {
      name: "Programs",
      link: `/programs`,
       dropdown: [
        { name: "B.Tech", link: "/programs/courses" },
        { name: "BCA", link: "/programs/courses" },
        { name: "M.Tech", link: "/programs/courses" },
        { name: "MCA", link: "/programs/courses" },
      ]
    },
    {
      name: "Timetable",
      link: `${BaseUrl.base}/programs`,
       dropdown: [
        { name: "2025-29", link: "/" },
        { name: "2024-28", link: "/" },
        { name: "2023-27", link: "/" },
        { name: "2022-26", link: "/"},
      ]
    },
    {
      name: "Events",
      link: "/achievements",
    },
    // {
    //   name: "Calendar",
    //   link: `${BaseUrl.base}/calendar`,
    // },
    {
      name: "Contact",
      link: "/contact",
    },

  ]


  // Enhanced dropdown menu items organized in three grids
  const drawerSections = [
    {
      title: "Academic",
      gradient: "from-neutral-600/10 to-white/20 border-2",
      items: [
        {
          name: "Faculty",
          link: `${BaseUrl.base}/people/faculty`,
          icon: GraduationCap,
          description: "Meet our expert faculty",
        },
        {
          name: "Timetable",
          link: `${BaseUrl.base}/timetable`,
          icon: Calendar,
          description: "Class schedules & timing",
        },
        {
          name: "Research",
          link: `${BaseUrl.base}/research`,
          icon: Microscope,
          description: "Cutting-edge research",
        },
        { name: "Library", link: "#", icon: Library, description: "Digital & physical resources" },
      ],
    },
    {
      title: "Student Life",
      gradient: "from-neutral-600/10 to-white/20 border-2",
      items: [
        {
          name: "Alumni",
          link: `${BaseUrl.base}/alumni`,
          icon: Users,
          description: "Connect with graduates",
        },
        {
          name: "Placements",
          link: `${BaseUrl.base}/placement`,
          icon: Briefcase,
          description: "Career opportunities",
        },
        { name: "Campus Life", link: "#", icon: MapPin, description: "Student activities & events" },
        { name: "Achievements", link: "#", icon: Trophy, description: "Student accomplishments" },
      ],
    },
    {
      title: "Resources",
      gradient: "from-neutral-600/10 to-white/20 border-2",
      items: [
        { name: "Explore", link: `${BaseUrl.base}/explore`, icon: Globe, description: "Discover more features" },
        { name: "Our Team", link: "./dev", icon: Users, description: "Development team" },
        { name: "Support", link: "#", icon: HeadphonesIcon, description: "Get help & assistance" },
        { name: "Resources", link: "#", icon: BookOpen, description: "Study materials & guides" },
      ],
    },
  ]

  const quickLinks = [
     {
      title: "Quick Links",
      gradient: "from-neutral-600/10 to-white/20 border-2",
      items: [
        {
          name: "Home",
          link: `${BaseUrl.base}/people/faculty`,
          icon: GraduationCap,
          description: "Meet our expert faculty",
        },
        {
          name: "About",
          link: `${BaseUrl.base}/timetable`,
          icon: Calendar,
          description: "Class schedules & timing",
        },
        {
          name: "Notice",
          link: `${BaseUrl.base}/research`,
          icon: Microscope,
          description: "Cutting-edge research",
        },
        
        {
          name: "Programs",
          link: `${BaseUrl.base}/research`,
          icon: BookUser,
          description: "Cutting-edge research",
        },
        {
          name: "Events",
          link: `${BaseUrl.base}/research`,
          icon: CalendarRange,
          description: "Cutting-edge research",
        },
        {
          name: "Calendar",
          link: `${BaseUrl.base}/research`,
          icon: Calendar1Icon,
          description: "Cutting-edge research",
        },
        

        
      ],
    },
  ]


    return (
        <div>
            <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems}/>
           {/* Enhanced More Dropdown */}
           <div className="relative top-0 right-0 items-center ">

            
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
              </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>

            <NavbarLogo />
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white" 
            >
              <Menu className="w-5 h-5" />
            </button>
           
          </MobileNavHeader>
          
        </MobileNav>
      </Navbar>



      {/* Drawer Sidebar with outside click handler */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay for outside click */}
            <motion.div
              key="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
              onClick={() => setIsDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col"
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center mb-6 p-4 border-b border-neutral-200 dark:border-neutral-700">
                <h5 className="text-base font-semibold text-gray-600 uppercase dark:text-gray-400">
                  Explore More
                </h5>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Drawer Content (reusing your dropdownSections grid) */}
              <div className="space-y-6 p-4 flex-1 overflow-y-auto">
                <div className="md:hidden">
                {quickLinks.map((section, sectionIndex) => (
                  <div key={section.title} className="pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                    <div className={`bg-gradient-to-r ${section.gradient} p-3 rounded-lg mb-3`}>
                      <h4 className="text-zinc-900 font-semibold text-sm">{section.title}</h4>
                    </div>
                    <div className="space-y-2 ">
                      {section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.link}
                          className="cursor-pointer flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-700 transition-all"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient}`}>
                            <item.icon className="h-4 w-4 text-zinc-900" />
                          </div>
                          <div>
                            <h5 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                              {item.name}
                            </h5>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
                {drawerSections.map((section, sectionIndex) => (
                  <div key={section.title} className="pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0">
                    <div className={`bg-gradient-to-r ${section.gradient} p-3 rounded-lg mb-3`}>
                      <h4 className="text-zinc-900 font-semibold text-sm">{section.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item) => (
                        <a
                          key={item.name}
                          href={item.link}
                          className="cursor-pointer flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-700 transition-all"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${section.gradient}`}>
                            <item.icon className="h-4 w-4 text-zinc-900" />
                          </div>
                          <div>
                            <h5 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                              {item.name}
                            </h5>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Drawer Footer */}
              <div className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400 p-4">
                Need help?{" "}
                <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Support
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

        </div>
    )
};