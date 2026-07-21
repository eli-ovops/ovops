"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

type ShowcaseImage = {
  src: string;
  alt: string;
  showBrand?: boolean;
};

type ShowcaseCarouselProps = {
  images: ShowcaseImage[];
  note: string;
};

export function ShowcaseCarousel({ images, note }: ShowcaseCarouselProps) {
  const initialActive = images.length > 1 ? 1 : 0;
  const [active, setActive] = useState(initialActive);
  const [paused, setPaused] = useState(false);
  const gestureStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  function goPrevious() {
    setActive((current) => (current - 1 + images.length) % images.length);
  }

  function goNext() {
    setActive((current) => (current + 1) % images.length);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return;

    gestureStartRef.current = { x: event.clientX, y: event.clientY };
    setPaused(true);

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = gestureStartRef.current;
    gestureStartRef.current = null;
    setPaused(false);

    if (!start || images.length < 2) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;

    if (!isHorizontalSwipe) return;

    event.preventDefault();
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 400);

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  }

  function handlePointerCancel() {
    gestureStartRef.current = null;
    setPaused(false);
  }

  function handleNavPointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setPaused(true);
  }

  function handleNavPointerUp(event: PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setPaused(false);
  }

  function handleNavPointerCancel(event: PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setPaused(false);
  }

  function getPosition(index: number) {
    if (index === active) return "showcase-card-primary";
    if (index === (active - 1 + images.length) % images.length) return "showcase-card-left";
    return "showcase-card-right";
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="showcase-stack"
        aria-label="Selected Origin Vector showcase posters"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <button
          type="button"
          className="showcase-nav showcase-nav-prev"
          aria-label="Previous showcase"
          onPointerDown={handleNavPointerDown}
          onPointerUp={handleNavPointerUp}
          onPointerCancel={handleNavPointerCancel}
          onClick={goPrevious}
        >
          <ArrowLeft aria-hidden="true" size={18} />
        </button>

        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`showcase-card ${getPosition(index)}`}
            aria-label={`Show showcase ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={(event) => {
              if (suppressClickRef.current) {
                event.preventDefault();
                return;
              }
              setActive(index);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover"
              width={1024}
              height={1536}
              priority={index === active}
              unoptimized
            />
            {image.showBrand !== false ? (
              <span className="showcase-card-brand">
                <BrandLogo variant="en" className="h-5 w-5 rounded-full object-cover" />
                Origin Vector
              </span>
            ) : null}
          </button>
        ))}

        <button
          type="button"
          className="showcase-nav showcase-nav-next"
          aria-label="Next showcase"
          onPointerDown={handleNavPointerDown}
          onPointerUp={handleNavPointerUp}
          onPointerCancel={handleNavPointerCancel}
          onClick={goNext}
        >
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </div>

      <div className="showcase-dots mt-3" aria-label="Showcase slides">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={`showcase-dot ${index === active ? "showcase-dot-active" : ""}`}
            aria-label={`Go to showcase ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-semibold text-slate-400">{note}</p>
    </div>
  );
}
