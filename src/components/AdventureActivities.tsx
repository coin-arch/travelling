import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";

const activities = [
    { name: "Mumbai", count: "26 Activities", image: "/mumbai.jpg" },
    { name: "Pune", count: "26 Activities", image: "/pune.jpg" },
    { name: "Bangalore", count: "11 Activities", image: "/adventures/bangalore_activity.jpg" },
    { name: "Kerala", count: "11 Activities", image: "/adventures/kerala_activity.jpg" },
    { name: "Kovalam", count: "11 Activities", image: "/adventures/kovalam_activity.jpg" },
];

export default function AdventureActivities() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Subtle light background pattern or image */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image
                    src="/adventures/mountains_bg.jpg"
                    alt="Mountains Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/50" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    {/* EXACT REQUESTED HEADING */}
                    <h2 className="heading-display mb-4">
                        Adventure Activities
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">
                        Experience unforgettable thrills, crafted for every kind of adventurer.
                    </p>
                </div>

                {/* Horizontal Scrolling Container or Wrap Grid */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {activities.map((activity, idx) => (
                        <Link
                            href={`/search?location=${activity.name.toLowerCase()}`}
                            key={idx}
                            className="group flex-shrink-0 bg-white border border-slate-200 shadow-sm p-2 pr-6 rounded-full flex items-center space-x-4 hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:pr-8"
                        >
                            <div className="relative h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-50 group-hover:border-accent transition-all">
                                <Image
                                    src={activity.image}
                                    alt={activity.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <span className="text-primary font-bold text-lg leading-tight">{activity.name}</span>
                                <div className="flex items-center text-slate-500 space-x-1">
                                    <Compass className="h-3 w-3 text-accent" />
                                    <span className="text-xs font-medium">{activity.count}</span>
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors ml-4 shrink-0">
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
