import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Impact from "./components/Impact";
import WhatWeDo from "./components/WhatWeDo";
import WhoWeAre from "./components/WhoWeAre";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Impact />
      <WhatWeDo />
      <WhoWeAre />
      <Footer />
    </>
  );
}
