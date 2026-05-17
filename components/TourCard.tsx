"use client"

import { Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TourCardProps {
  id: string
  title: string
  description: string
  image: string
  rating: number
  duration: string
  groupSize: string
  category: string
  originalPrice?: number
  price: number
  tags: string[]
  badge?: string
  badgeColor?: "green" | "orange" | "red"
}

export default function TourCard({
  id,
  title,
  description,
  image,
  rating,
  duration,
  groupSize,
  category,
  originalPrice,
  price,
  tags,
  badge,
  badgeColor = "green",
}: TourCardProps) {
  const badgeColors = {
    green: "bg-[#1a6b5c] text-white",
    orange: "bg-[#e07a38] text-white",
    red: "bg-red-500 text-white",
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${badgeColors[badgeColor]}`}>
            {badge}
          </div>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-[#0f3d4c]" />
        </button>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                index === 0
                  ? "bg-[#0f3d4c] text-white"
                  : index === 1
                  ? "bg-[#1a6b5c] text-white"
                  : "bg-[#d4a853] text-[#0f3d4c]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#0f3d4c] text-sm leading-tight">{title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-[#d4a853] text-[#d4a853]" />
            <span className="text-xs font-medium text-[#0f3d4c]">{rating}</span>
          </div>
        </div>

        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{description}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span>{duration}</span>
          <span>•</span>
          <span>{groupSize}</span>
          <span>•</span>
          <span>{category}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">${originalPrice.toLocaleString()}</span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
              <span className="text-xs text-gray-500">/person</span>
            </div>
          </div>
          <Link
            href={`/packages/${id}`}
            className="px-4 py-2 bg-[#0f3d4c] text-white text-xs font-medium rounded hover:bg-[#1a5568] transition-colors uppercase tracking-wide"
          >
            View Journey
          </Link>
        </div>
      </div>
    </div>
  )
}
