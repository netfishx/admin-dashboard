"use client";

import bg1 from "@/assets/images/landing/1.png";
import bg2 from "@/assets/images/landing/2.png";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="relative h-[100dvh] w-[100dvw]">
          <Image src={bg1} alt="background image" priority fill />
        </CarouselItem>
        <CarouselItem className="relative h-[100dvh] w-[100dvw]">
          <Image src={bg2} alt="background image" priority fill />
        </CarouselItem>
      </CarouselContent>
      <div className="absolute bottom-[20dvh] z-10 flex w-full items-center justify-center gap-2 *:data-[current=true]:w-5 *:data-[current=true]:bg-slate-300 *:data-[current=true]:border">
        <div
          className="size-1.5 rounded-full bg-white"
          data-current={current === 0}
        />
        <div
          className="size-1.5 rounded-full bg-white"
          data-current={current === 1}
        />
      </div>
    </Carousel>
  );
}
