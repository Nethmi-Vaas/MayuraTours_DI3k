"use client"

import { ArrowRight, Heart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PeacockLogo from "./PeacockLogo"

// Actual Sri Lanka tour images
const tourImages = {
  elephant: "https://images.unsplash.com/photo-1588598198321-4c4e5b13e6ba?w=600&q=80",
  teaPlantation: "https://images.unsplash.com/photo-1546587348-d12660c30c50?w=600&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  sigiriya: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80",
  trainBridge: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
  buddha: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
  lighthouse: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  wildlife: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&q=80",
  temple: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
  palmBeach: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
}

const packages = [
  {
    id: "cultural-triangle",
    title: "Cultural Triangle Heritage",
    duration: "5-8 Days",
    groupSize: "Max 6 Pax",
    category: "Hotels",
    originalPrice: 2490,
    price: 1890,
    rating: 4.9,
    imageUrl: tourImages.elephant,
    tags: ["HERITAGE", "LUXURY"],
    badge: "Limited Offer",
  },
  {
    id: "tea-country",
    title: "Tea Country Serenity",
    duration: "D-6 Days",
    groupSize: "Max 2 Pax",
    category: "Boutique",
    price: 1360,
    rating: 5.0,
    imageUrl: tourImages.teaPlantation,
    tags: ["NATURE", "HONEYMOON"],
    badge: "20% Off",
  },
  {
    id: "southern-coastal",
    title: "Southern Coastal Escape",
    duration: "D-10 Days",
    groupSize: "Max 8 Pax",
    category: "Beachcrest",
    price: 2100,
    rating: 4.8,
    imageUrl: tourImages.beach,
    tags: ["BEACH", "WELLNESS"],
  },
  {
    id: "echoes-ancient",
    title: "Echoes of Ancient Cities",
    duration: "D-5 Days",
    groupSize: "Max 6 Pax",
    category: "Heritage",
    originalPrice: 1200,
    price: 950,
    rating: 4.7,
    imageUrl: tourImages.buddha,
    tags: ["CULTURE", "HISTORY"],
    badge: "Hot Deal",
  },
  {
    id: "grand-ceylon",
    title: "The Grand Ceylon Tour",
    duration: "D-14 Days",
    groupSize: "Max 10 Pax",
    category: "Luxury 5*",
    price: 3200,
    rating: 5.0,
    imageUrl: tourImages.trainBridge,
    tags: ["ALL-INCLUSIVE", "GRAND"],
  },
  {
    id: "wild-horizons",
    title: "Wild Horizons Safari",
    duration: "5-7 Days",
    groupSize: "Max 6 Pax",
    category: "Glamping",
    price: 1550,
    rating: 4.9,
    imageUrl: tourImages.wildlife,
    tags: ["WILDLIFE", "ADVENTURE"],
    badge: "Limited Offer",
  },
  {
    id: "southern-coastal-2",
    title: "Southern Coastal Escape",
    duration: "D-10 Days",
    groupSize: "Max 8 Pax",
    category: "Beachcrest",
    price: 2100,
    rating: 4.8,
    imageUrl: tourImages.palmBeach,
    tags: ["BEACH", "WELLNESS"],
    badge: "20% Off",
  },
  {
    id: "tea-country-2",
    title: "Tea Country Serenity",
    duration: "D-6 Days",
    groupSize: "Max 2 Pax",
    category: "Boutique",
    price: 1360,
    rating: 5.0,
    imageUrl: tourImages.teaPlantation,
    tags: ["NATURE", "HONEYMOON"],
  },
  {
    id: "cultural-triangle-2",
    title: "Cultural Triangle Heritage",
    duration: "D-8 Days",
    groupSize: "Max 6 Pax",
    category: "Hotels",
    price: 1890,
    rating: 5.0,
    imageUrl: tourImages.sigiriya,
    tags: ["HERITAGE", "LUXURY"],
    badge: "Limited Offer",
  },
  {
    id: "grand-ceylon-2",
    title: "The Grand Ceylon Tour",
    duration: "D-14 Days",
    groupSize: "Max 10 Pax",
    category: "Luxury 5*",
    price: 3200,
    rating: 5.0,
    imageUrl: tourImages.trainBridge,
    tags: ["ALL-INCLUSIVE", "GRAND"],
  },
]

export default function SignaturePackages() {
  return (
    <section className="py-16 px-6 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <PeacockLogo className="w-16 h-20" />
            <div>
              <p className="text-xs tracking-widest text-[#d4a853] uppercase font-medium">
                Popular This Season
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f3d4c] uppercase tracking-wide">
                Signature Tour Packages
              </h2>
            </div>
          </div>
          <Link
            href="/packages"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium hover:bg-[#0f3d4c] hover:text-white transition-colors"
          >
            All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Package Grid - First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
          {packages.slice(0, 5).map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>

        {/* Package Grid - Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {packages.slice(5, 10).map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>

        {/* Mobile All Packages Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0f3d4c] text-[#0f3d4c] rounded-full text-sm font-medium"
          >
            All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

interface PackageCardProps {
  id: string
  title: string
  duration: string
  groupSize: string
  category: string
  originalPrice?: number
  price: number
  rating: number
  tags: string[]
  badge?: string
  imageUrl: string
}

function PackageCard({
  id,
  title,
  duration,
  groupSize,
  category,
  originalPrice,
  price,
  rating,
  tags,
  badge,
  imageUrl,
}: PackageCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium ${
            badge.includes("Off") ? "bg-[#1a6b5c] text-white" : 
            badge === "Hot Deal" ? "bg-red-500 text-white" :
            "bg-[#e07a38] text-white"
          }`}>
            {badge}
          </div>
        )}
        <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-3 h-3 text-[#0f3d4c]" />
        </button>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                index === 0
                  ? "bg-[#0f3d4c] text-white"
                  : "bg-[#d4a853] text-[#0f3d4c]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-[#0f3d4c] text-xs leading-tight">{title}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star className="w-3 h-3 fill-[#d4a853] text-[#d4a853]" />
            <span className="text-[10px] font-medium text-[#0f3d4c]">{rating}</span>
          </div>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-gray-500">
          <span>{duration}</span>
          <span>•</span>
          <span>{groupSize}</span>
          <span>•</span>
          <span>{category}</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between">
          <div>
            {originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">${originalPrice.toLocaleString()}</span>
            )}
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-bold text-[#0f3d4c]">${price.toLocaleString()}</span>
              <span className="text-[9px] text-gray-500">/person</span>
            </div>
          </div>
          <Link
            href={`/packages/${id}`}
            className="px-2.5 py-1.5 bg-[#0f3d4c] text-white text-[10px] font-medium rounded hover:bg-[#1a5568] transition-colors uppercase tracking-wide"
          >
            View Journey
          </Link>
        </div>
      </div>
    </div>
  )
}
