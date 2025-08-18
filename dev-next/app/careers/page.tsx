import React from "react";
import CtaHiring from "../components/Careers/CtaHiring";
import WhyWorkWithUs from "../components/Careers/WhyWorkWithUs";
import GrayFooter from "../components/Careers/GrayFooter";
import Role from "../components/Careers/Role";
import Positions from "../components/Careers/Positions";
function Careers() {
  return (
    <>
      <CtaHiring />
      <Positions />
      <WhyWorkWithUs />
      <Role />
      <GrayFooter />
    </>
  );
}

export default Careers;
