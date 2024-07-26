import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="-z-10 fixed top-4 -full h-screen">
      <Image
        src={"/landing_bg.gif"}
        alt="Hero"
        height={1000}
        width={1000}
        className="-z-10 fixed top-4 -full h-screen"
      />
    </div>
  );
};

export default Hero;
