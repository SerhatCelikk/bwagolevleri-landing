import dynamic from "next/dynamic";

// Above-fold: static imports (SSR + eager JS)
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProjectOverview from "@/components/ProjectOverview";
import Footer from "@/components/Footer";

// Below-fold decorative (ssr:false — no SSR, JS deferred until scroll)
const StickyContact  = dynamic(() => import("@/components/StickyContact"),  { ssr: false });
const VideoGallery   = dynamic(() => import("@/components/VideoGallery"),   { ssr: false });
const PhotoGallery   = dynamic(() => import("@/components/PhotoGallery"),   { ssr: false });
const CatalogViewer  = dynamic(() => import("@/components/CatalogViewer"),  { ssr: false });
const CampaignSection = dynamic(() => import("@/components/CampaignSection"), { ssr: false });

// Below-fold content (SSR preserved for SEO, JS code-split)
const ApartmentTypes = dynamic(() => import("@/components/ApartmentTypes"));
const PricingPlans   = dynamic(() => import("@/components/PricingPlans"));
const LocationSection = dynamic(() => import("@/components/LocationSection"));
const LeadForm       = dynamic(() => import("@/components/LeadForm"));

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
