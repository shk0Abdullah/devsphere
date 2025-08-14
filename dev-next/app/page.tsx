import Hero from "./components/Home/Hero";
import Services from "./components/Home/Services";
import Impact from "./components/Home/Impact";
import WhatWeDo from "./components/Home/WhatWeDo";
import WhoWeAre from "./components/Home/WhoWeAre";
import Footer from "./components/Home/Footer";

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
