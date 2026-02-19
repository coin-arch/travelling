import Link from "next/link";
import { dataService } from "@/lib/services/dataService";
import { Star, MapPin, ArrowRight, Filter, ChevronDown, Check } from "lucide-react";
import Image from "next/image";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; city?: string; minPrice?: string; maxPrice?: string; amenities?: string }>;
}) {
  const { category, city, minPrice, maxPrice, amenities } = await searchParams;
  const selectedAmenities = amenities ? amenities.split(",") : [];
  
  const [categories, locations, allAmenities, properties] = await Promise.all([
    dataService.getCategories(),
    dataService.getLocations(),
    dataService.getAmenities(),
    dataService.getPropertiesSearch(
      category, 
      city, 
      minPrice ? parseInt(minPrice) : undefined, 
      maxPrice ? parseInt(maxPrice) : undefined,
      selectedAmenities
    )
  ]);

  // Group locations by city name to avoid duplicates in the UI
  const uniqueLocations = locations?.reduce((acc: any[], current) => {
    if (!acc.find(item => item.city === current.city)) {
      acc.push(current);
    }
    return acc;
  }, []) || [];

  const currentCategory = categories?.find(c => c.slug === category);
  const filteredProperties = properties || [];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-300">Adventure Activities</span>
          {currentCategory && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-primary">{currentCategory.name}</span>
            </>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black tracking-tighter">By Cities</h3>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              <div className="space-y-4">
                {uniqueLocations.map((loc) => (
                  <Link 
                    key={loc.id} 
                    href={`/search?${category ? `category=${category}&` : ''}${city === loc.city ? '' : `city=${loc.city}`}`}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-5 w-5 rounded-md border-2 transition-colors flex items-center justify-center ${city === loc.city ? 'border-accent bg-accent' : 'border-slate-200 group-hover:border-accent'}`}>
                        {city === loc.city && <Check className="h-3 w-3 text-primary stroke-[4px]" />}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${city === loc.city ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>
                        {loc.city}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                      {/* Count properties for this city among all properties (ignoring current city filter) */}
                      {properties?.filter(p => p.locations?.city === loc.city).length || 0}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black tracking-tighter">By Price</h3>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "Under ₹10k", min: 0, max: 10000 },
                  { label: "₹10k - ₹25k", min: 10000, max: 25000 },
                  { label: "₹25k - ₹50k", min: 25000, max: 50000 },
                  { label: "Over ₹50k", min: 50000, max: 1000000 },
                ].map((range) => {
                  const isActive = minPrice === range.min.toString() && maxPrice === range.max.toString();
                  const href = `/search?${category ? `category=${category}&` : ''}${city ? `city=${city}&` : ''}${isActive ? '' : `minPrice=${range.min}&maxPrice=${range.max}`}${amenities ? `&amenities=${amenities}` : ''}`;
                  
                  return (
                    <Link 
                      key={range.label} 
                      href={href}
                      className="flex items-center space-x-3 group cursor-pointer"
                    >
                      <div className={`h-5 w-5 rounded-md border-2 transition-colors flex items-center justify-center ${isActive ? 'border-accent bg-accent' : 'border-slate-200 group-hover:border-accent'}`}>
                        {isActive && <Check className="h-3 w-3 text-primary stroke-[4px]" />}
                      </div>
                      <span className={`text-sm font-bold transition-colors ${isActive ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>
                        {range.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* By Amenities */}
            {allAmenities && allAmenities.length > 0 && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black tracking-tighter">By Amenities</h3>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
                <div className="space-y-4">
                  {allAmenities.map((amenity: any) => {
                    const isSelected = selectedAmenities.includes(amenity.id);
                    const newAmenities = isSelected 
                      ? selectedAmenities.filter(id => id !== amenity.id)
                      : [...selectedAmenities, amenity.id];
                    
                    const href = `/search?${category ? `category=${category}&` : ""}${city ? `city=${city}&` : ""}${minPrice ? `minPrice=${minPrice}&` : ""}${maxPrice ? `maxPrice=${maxPrice}&` : ""}${newAmenities.length > 0 ? `amenities=${newAmenities.join(",")}` : ""}`;

                    return (
                      <Link 
                        key={amenity.id} 
                        href={href}
                        className="flex items-center space-x-3 group cursor-pointer"
                      >
                        <div className={`h-5 w-5 rounded-md border-2 transition-colors flex items-center justify-center ${isSelected ? "border-accent bg-accent" : "border-slate-200 group-hover:border-accent"}`}>
                          {isSelected && <Check className="h-3 w-3 text-primary stroke-[4px]" />}
                        </div>
                        <span className={`text-sm font-bold transition-colors ${isSelected ? "text-primary" : "text-slate-600 group-hover:text-primary"}`}>
                          {amenity.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black tracking-tighter">By Popular Locations</h3>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              <div className="space-y-4">
                {['Goa', 'Banglore', 'Pune', 'Mumbai'].map((pop) => (
                  <div key={pop} className="flex items-center justify-between group opacity-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-md border-2 border-slate-200" />
                      <span className="text-sm font-bold text-slate-600">{pop}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">0</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">
                  {filteredProperties.length} activities found
                </span>
                <h1 className="text-4xl font-black tracking-tighter">
                  {currentCategory?.name || "All Adventures"}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-border shadow-sm">
                  <span className="text-xs font-bold text-slate-400">Show</span>
                  <span className="text-xs font-black text-primary">30</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-border shadow-sm text-nowrap">
                  <span className="text-xs font-bold text-slate-400">Sort by:</span>
                  <span className="text-xs font-black text-primary">Latest Added</span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((card: any) => (
                  <Link href={`/activities/${card.slug}`} key={card.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100">
                    <div className="relative h-60 overflow-hidden">
                      <Image 
                        src={card.property_images?.[0]?.image_url || `https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2670`} 
                        alt={card.title} 
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <h3 className="text-lg font-black tracking-tighter group-hover:text-primary transition-colors h-14 overflow-hidden text-ellipsis line-clamp-2">
                          {card.title}
                        </h3>
                        {card.averageRating > 0 && (
                          <div className="flex items-center space-x-1 bg-accent text-primary px-3 py-1 rounded-full text-[10px] font-black tracking-tighter shadow-sm border border-primary/5 whitespace-nowrap">
                            <span className="text-[10px]">★</span>
                            <span>{card.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 leading-none">Duration</span>
                          <span className="text-xs font-black text-slate-700 leading-none">{card.duration || '24 HRS'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 leading-none">Group Size</span>
                          <span className="text-xs font-black text-slate-700 leading-none">4 - 12 Pax</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <div>
                          <span className="text-xl font-black">₹{Number(card.price).toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block leading-none mt-1">onwards</span>
                        </div>
                        <button className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-accent hover:text-primary transition-all shadow-lg shadow-primary/10">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[3rem] shadow-sm border border-slate-100">
                  <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="h-8 w-8 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter mb-2">No activities found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your filters or search for another category.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
