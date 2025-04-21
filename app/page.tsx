"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CategoryCard from "@/components/CategoryCard";
import TrendingSection from "@/components/TrendingSection";
import CollectionSpotlight from "@/components/CollectionSpotlight";



export default function Home() {
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-screen max-h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <iframe 
              src='https://my.spline.design/theorbhand-49fe0e3341818c4ccd128ed9c080eb6b/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="w-full h-full object-cover"
            ></iframe>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 left-0 w-full h-17 bg-black"></div>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 neon-text">
                NEW SEASON DROPS
              </h1>
              <p className="text-xl text-white mb-8">
                Exclusive merch from your favorite NFT collections
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground neon-box">
                  <Link href="/marketplace">WEAR YOUR ART</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CategoryCard title="T-SHIRTS" image="/placeholder.svg" href="/marketplace/tshirts" />
            <CategoryCard title="HOODIES" image="/placeholder.svg" href="/marketplace/hoodies" />
            <CategoryCard title="ACCESSORIES" image="/placeholder.svg" href="/marketplace/accessories" />
            <CategoryCard title="LIMITED EDITIONS" image="/placeholder.svg" href="/marketplace/limited" />
          </div>
        </div>
      </section>

      {/* Collections Banner */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">EXCLUSIVE NFT COLLECTIONS</h2>
              <p className="text-lg mb-6">Merch inspired by the world's most iconic NFT collections</p>
              <Button asChild>
                <Link href="/collections">BROWSE COLLECTIONS</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg"
                alt="NFT Collections"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">TRENDING NOW</h2>
          <TrendingSection />
        </div>
      </section>

      {/* Collection Spotlight */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">COLLECTION SPOTLIGHT</h2>
          <CollectionSpotlight />
        </div>
      </section>

      {/* Artist Banner */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">MEET THE ARTISTS</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Discover the talented artists behind your favorite NFT collections and their exclusive merchandise
              collaborations.
            </p>
            <Button asChild>
              <Link href="/artists">EXPLORE ARTISTS</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">STAY UPDATED</h2>
          <p className="text-lg mb-6">
            Subscribe to our newsletter for exclusive drops, limited editions and special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded border border-muted"
              required
            />
            <Button type="submit">SUBSCRIBE</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </section>
    </div>
  );
}

