import React from "react";
import Link from "next/link";

import { urlFor } from "@/lib/client";

const Banner = (heroBanner) => {
  console.log(heroBanner);
  console.log(heroBanner.smallText);
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner && heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src="" alt="tech" className="hero-banner-image" />
        <div>
          <Link href="/product/ID">
            <button className="button">Button text</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;