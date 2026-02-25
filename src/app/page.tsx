import Link from "next/link";
import Hero from "@/components/Hero";
import CuratedCollections from "@/components/CuratedCollections";
import WhyBookWithUs from "@/components/WhyBookWithUs";
import DreamDestinations from "@/components/DreamDestinations";
import AdventureActivities from "@/components/AdventureActivities";
import Testimonials from "@/components/Testimonials";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { dataService } from "@/lib/services/dataService";
import Image from "next/image";

export default async function Home() {
  const [properties, categories, locations] = await Promise.all([
    dataService.getProperties(),
    dataService.getCategories(),
    dataService.getLocations(),
  ]);

  return (
    <div className="flex flex-col bg-slate-50">
      <Hero locations={locations || []} />

      {/* 1. Curated Collections (Shiny Redesign) */}
      <CuratedCollections
        categories={
          [
            "Luxury Villas",
            "Water Sports",
            "Paragliding",
            "Luxury Sailing"
          ].map(name =>
            (categories || []).find((cat: any) => cat.name === name) ||
            (categories || []).find((cat: any) => cat.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
          ).filter(Boolean).slice(0, 4)
        }
      />

      {/* 2. Why Book With Us Section */}
      <WhyBookWithUs />

      {/* 3. Dream Destinations Section */}
      <DreamDestinations />

      {/* 4. Adventure Activities Section */}
      <AdventureActivities />

      {/* 5. Popular Adventures */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="heading-display mb-4">Popular Adventures</h2>
              <p className="text-slate-500 font-medium">Top-rated adventures across popular locations in India.</p>
            </div>
            <Link href="/search" className="flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
              <span>View All Experiences</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(properties || []).slice(0, 3).map((card: any) => (
              <Link href={`/activities/${card.slug}`} key={card.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-200 block">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-primary flex items-center shadow-sm">
                    <Star className="h-3 w-3 text-accent mr-1 fill-accent" />
                    <span>4.9 Rating</span>
                  </div>
                  <Image
                    src={card.property_images?.[0]?.image_url || '/images/hero_bg_1.jpg'}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="p-8 relative bg-white">
                  <div className="flex items-center space-x-1 text-slate-500 mb-3">
                    <MapPin className="h-3 w-3 text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {card.locations?.city} • {card.categories?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors h-14 overflow-hidden text-ellipsis text-primary">
                    {card.title}
                  </h3>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">Starts From</span>
                      <span className="text-xl font-black text-primary">₹{card.price.toLocaleString()}</span>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors shadow-sm">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Premium Testimonials Slider */}
      <Testimonials />
    </div>
  );
}
