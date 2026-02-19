import Link from "next/link";
import Hero from "@/components/Hero";
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
    <div className="flex flex-col">
      <Hero locations={locations || []} />

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Explore by Category</h2>
            <p className="text-slate-500 font-medium">Discover curated adventures and stays tailored to your interests.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(categories || []).slice(0, 8).map((cat) => (
              <Link 
                href={`/search?category=${cat.slug}`} 
                key={cat.id} 
                className="group relative h-[400px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                {/* Background Image */}
                <Image 
                  src={cat.image_url || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670'} 
                  alt={cat.name} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end">
                  <div className="text-white">
                    <h3 className="text-2xl font-black tracking-tighter mb-1 leading-none">{cat.name}</h3>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-none">
                      Explore Activities
                    </span>
                  </div>
                  
                  <div className="h-10 w-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-accent group-hover:text-primary transition-all">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Adventures */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Most Loved Experiences</h2>
              <p className="text-slate-500 font-medium">Top-rated adventures across popular locations in India.</p>
            </div>
            <button className="flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors mt-6 md:mt-0">
              <span>View All Experiences</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(properties || []).slice(0, 3).map((card: any) => (
              <Link href={`/activities/${card.slug}`} key={card.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-primary flex items-center">
                    <Star className="h-3 w-3 text-accent mr-1 fill-accent" />
                    <span>4.9 Rating</span>
                  </div>
                  <Image 
                    src={card.property_images?.[0]?.image_url || `https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2670&auto=format&fit=crop`} 
                    alt={card.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="p-8 relative bg-white">
                  <div className="flex items-center space-x-1 text-accent mb-3">
                    <MapPin className="h-3 w-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {card.locations?.city} • {card.categories?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-4 tracking-tighter group-hover:text-primary transition-colors h-14 overflow-hidden text-ellipsis">
                    {card.title}
                  </h3>
                  <div className="flex justify-between items-center border-t border-slate-50 pt-6">
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">Starts From</span>
                      <span className="text-xl font-black">₹{card.price.toLocaleString()}</span>
                    </div>
                    <div className="p-4 bg-muted rounded-2xl group-hover:bg-accent group-hover:text-primary transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Social Proof) */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute -top-24 -right-24 h-96 w-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tighter">Don&apos;t take our word for it</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur text-left">
              <p className="text-xl font-medium italic mb-8 text-slate-300 italic">
                &quot;Khojii made our weekend unforgettable. We booked paragliding through the platform and everything was seamless — from the details to the actual experience. It felt safe, premium, and perfectly organized.&quot;
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center font-black text-primary">RS</div>
                <div>
                  <h4 className="font-bold">Rohit S.</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur text-left">
              <p className="text-xl font-medium italic mb-8 text-slate-300 italic">
                &quot;The villa we booked in Lonavala was exactly as shown — clean, luxurious, and beautifully maintained. Khojii’s team guided us throughout and ensured a smooth check‑in. It felt like a curated experience.&quot;
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center font-black text-white">PK</div>
                <div>
                  <h4 className="font-bold">Priya & Karan</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Pune</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
