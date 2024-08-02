import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="-z-10 fixed top-4 -full h-screen">
      <Image
        src={"/Landing_bg2.gif"}
        alt="Hero"
        height={1000}
        width={1000}
        objectFit="contain"
        unoptimized
        className="-z-10 fixed top-4 h-screen"
      />
    </div>
  );
};

export default Hero;
