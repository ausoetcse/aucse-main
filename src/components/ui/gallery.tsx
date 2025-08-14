"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
const artworks = [
  { id: 1, image: "./1.jpg", title: "AUCSE" },
  { id: 2, image: "./2.jpg", title: "AUCSE" },
  { id: 3, image: "./3.jpg", title: "AUCSE" },
  { id: 4, image: "./4.jpg", title: "AUCSE" },
  { id: 5, image: "./5.jpg", title: "AUCSE" },

]

export function GallerySection() {
  return (
    <section className="py-10 px-6 bg-gradient-to-b from-[#fafafa] to-[#d1d1d12a] ">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl text-gray-900 mb-4 font-special-gothic">Gallery</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed font-ubuntu">
            Visit our gallery to know more about our department.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {artworks.map((artwork, index) => (
            <Card
              key={artwork.id}
              className={`overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                index % 7 === 0 ? "md:col-span-2" : ""
              } ${index % 5 === 0 ? "lg:row-span-2" : ""}`}
            >
              <CardContent className="p-0 m-0 h-full">
                <img
                  src={artwork.image || "/placeholder.svg"}
                  alt={artwork.title}
                  className="w-full h-full object-fill"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="rounded-full px-6 py-2 border-gray-300 hover:bg-gray-100 bg-transparent">
            <Link href="https://www.aucse.in/gallery">Explore More</Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
