import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="-z-10 fixed top-4 -full h-screen">
      <Image
        src={"/landing_bg2.gif"}
        alt="Hero"
        fill
        objectFit="contain"
        unoptimized
        className="-z-10 fixed top-4 h-screen"
      />
    </div>
  );
};

export default Hero;
