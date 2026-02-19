import { dataService } from "@/lib/services/dataService";
import ActivityDetailClient from "@/components/ActivityDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await dataService.getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found - Khojii",
    };
  }

  const city = (property as any).locations?.city;

  return {
    title: `${property.title} in ${city || "India"} - Khojii`,
    description: property.description?.slice(0, 160) || `Book a stay at ${property.title}. Experience luxury and adventure with Khojii.`,
    openGraph: {
      images: [(property as any).property_images?.[0]?.image_url || ""],
    },
  };
}

export default async function ActivityDetail({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    const property = await dataService.getPropertyBySlug(slug);

    if (!property) {
      return notFound();
    }

    return <ActivityDetailClient property={property as any} />;
  } catch (error) {
    console.error("Error fetching property:", error);
    return notFound();
  }
}
