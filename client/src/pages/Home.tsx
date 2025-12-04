import Hero from "./Hero";
import WhatIs from "./WhatIs";
import HowItWorks from "./HowItWorks";
import Impact from "./Impact";
import PartnerForm from "./PartnerForm";
import MapSection from "./MapSection";
import Developers from "./Developers";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <WhatIs />
        <HowItWorks />
        <Impact />
        <MapSection />
        <PartnerForm />
        <Developers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
