"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-white dark:bg-gray-200/50 text-muted-foreground inline-flex h-auto w-fit items-center justify-center rounded-xl p-1.5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 data-[state=active]:shadow-md data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-none text-gray-600 dark:text-gray-400 inline-flex h-auto flex-1 items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* Subtle background animation */}
      <div className="absolute inset-0   data-[state=active]:from-blue-500/10 data-[state=active]:via-blue-500/20 data-[state=active]:to-blue-500/10 transition-all duration-300" />
      <span className="relative z-10">{props.children}</span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:rounded-lg",
        "data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-left-1/4 data-[state=inactive]:duration-300",
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-1/4 data-[state=active]:duration-300",
        className
      )}
      {...props}
    />
  )
}

// Enhanced variant for modern card-style tabs
function ModernTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="modern-tabs-list"
      className={cn(
        "bg-white/80 dark:bg-gray-900/80 text-muted-foreground inline-flex h-auto w-fit items-center justify-center rounded-2xl p-2 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

function ModernTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="modern-tabs-trigger"
      className={cn(
        "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:outline-none text-gray-700 dark:text-gray-300 inline-flex h-auto flex-1 items-center justify-center gap-2 rounded-xl border border-transparent px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-102 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 relative overflow-hidden group",
        className
      )}
      {...props}
    >
      {/* Gradient background for active state */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-indigo-600/0 data-[state=active]:from-blue-500 data-[state=active]:via-blue-500 data-[state=active]:to-indigo-600 transition-all duration-300" />
      <span className="relative z-10 flex items-center gap-2">{props.children}</span>
    </TabsPrimitive.Trigger>
  )
}

// Compact variant for space-constrained layouts
function CompactTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="compact-tabs-list"
      className={cn(
        "bg-gray-50/80 dark:bg-gray-800/80 text-muted-foreground inline-flex h-8 w-fit items-center justify-center rounded-lg p-0.5 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50",
        className
      )}
      {...props}
    />
  )
}

function CompactTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="compact-tabs-trigger"
      className={cn(
        "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 data-[state=active]:shadow-sm focus-visible:ring-1 focus-visible:ring-blue-500/20 focus-visible:outline-none text-gray-600 dark:text-gray-400 inline-flex h-7 flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-xs font-medium whitespace-nowrap transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  ModernTabsList,
  ModernTabsTrigger,
  CompactTabsList,
  CompactTabsTrigger
}
