import HeroUOL from "./HeroUOL";
import PlansSection from "./PlansSection";
import WhatIs from "./WhatIs";
import HowItWorks from "./HowItWorks";
import MapSection from "./MapSection";
import Testimonials from "./Testimonials";
import Blog from "./Blog";
import PartnerForm from "./PartnerForm";
import Developers from "./Developers";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomeUOL() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroUOL />
        <PlansSection />
        <WhatIs />
        <HowItWorks />
        <MapSection />
        <Testimonials />
        <Blog />
        <PartnerForm />
        <Developers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
