"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (imageElement && scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else if (imageElement) {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[107px] pb-6 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">
          Manage Your Finances <br /> with Intelligence
        </h1>

        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          An AI-powered personal finance app that helps you track your expenses,
          set budgets, and achieve your financial goals effortlessly.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link href={"/dashboard"}>
            <Button size={"lg"} className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button size={"lg"} className="px-8" variant={"outline"}>
              Add Transaction
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              alt="Finance dashboard illustration"
              width={1280}
              height={720}
              priority
              className="rounded-lg shadow-2xl border mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
