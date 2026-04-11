import dynamic from "next/dynamic";

// Above-fold: static imports (SSR + eager JS)
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProjectOverview from "@/components/ProjectOverview";
import Footer from "@/components/Footer";

// Below-fold: code-split into separate JS chunks (reduces initial bundle, lowers TBT)
const StickyContact   = dynamic(() => import("@/components/StickyContact"));
const VideoGallery    = dynamic(() => import("@/components/VideoGallery"));
const PhotoGallery    = dynamic(() => import("@/components/PhotoGallery"));
const ApartmentTypes  = dynamic(() => import("@/components/ApartmentTypes"));
const PricingPlans    = dynamic(() => import("@/components/PricingPlans"));
const LocationSection = dynamic(() => import("@/components/LocationSection"));
const CatalogViewer   = dynamic(() => import("@/components/CatalogViewer"));
const LeadForm        = dynamic(() => import("@/components/LeadForm"));
const CampaignSection = dynamic(() => import("@/components/CampaignSection"));

export default function Home() {
  return (
    <>
      <Navigation />
      <StickyContact />
      <Hero />
      <TrustBar />
      <ProjectOverview />
      <VideoGallery />
      <PhotoGallery />
      <ApartmentTypes />
      <PricingPlans />
      <LocationSection />
      <CatalogViewer />
      <LeadForm />
      <CampaignSection />
      <Footer />
    </>
  );
}
