import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProjectOverview from "@/components/ProjectOverview";
import VideoGallery from "@/components/VideoGallery";
import PhotoGallery from "@/components/PhotoGallery";
import ApartmentTypes from "@/components/ApartmentTypes";
import PricingPlans from "@/components/PricingPlans";
import LocationSection from "@/components/LocationSection";
import CampaignSection from "@/components/CampaignSection";
import CatalogViewer from "@/components/CatalogViewer";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";

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
      <CampaignSection />
      <CatalogViewer />
      <LeadForm />
      <Footer />
    </>
  );
}
