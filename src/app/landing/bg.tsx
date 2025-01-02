"use client";

import bg1 from "@/assets/images/landing/1.png";
import bg2 from "@/assets/images/landing/2.png";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Bg() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      setApi={setApi}
      className="h-screen w-screen"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src={bg1} alt="background image" className="object-cover" />
        </CarouselItem>
        <CarouselItem>
          <Image src={bg2} alt="background image" className="object-cover" />
        </CarouselItem>
      </CarouselContent>
      <div
        className={cn([
          "absolute bottom-40 z-10 flex justify-center items-center w-full gap-2",
          current === 1 && "flex-row-reverse",
        ])}
      >
        <div className="size-1.5 bg-white rounded-full" />
        <div className="w-5 h-1.5 bg-[#c1d7ee] rounded-full" />
      </div>
    </Carousel>
  );
}
