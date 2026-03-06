"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
  const drawWidth = imgWidth * scale;
  const drawHeight = imgHeight * scale;
  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;
  ctx.drawImage(img, 0, 0, imgWidth, imgHeight, x, y, drawWidth, drawHeight);
}

export default function ScrollCleanVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let isMounted = true;

    loadImage("/frames/frame-0001.jpg")
      .then((firstFrame) => {
        if (!isMounted) return;
        imagesRef.current[0] = firstFrame;
        setFirstFrameReady(true);
        return Promise.all(
          Array.from({ length: TOTAL_FRAMES - 1 }, (_, i) =>
            loadImage(
              `/frames/frame-${(i + 2).toString().padStart(4, "0")}.jpg`
            )
          )
        );
      })
      .then((rest) => {
        if (!isMounted) return;
        const first = imagesRef.current[0];
        if (first && Array.isArray(rest)) {
          imagesRef.current = [first, ...rest];
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Failed to load frames");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!firstFrameReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[0];
    if (!img) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    drawImageCover(ctx, img, width, height);
  }, [firstFrameReady]);

  useEffect(() => {
    if (isLoading || error || !sectionRef.current || !pinRef.current || !canvasRef.current) return;
    if (!logoRef.current || !contentRef.current || !overlayRef.current) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const logo = logoRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const scrollArrow = scrollArrowRef.current;
    if (!ctx) return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    const progressData = { value: 0 };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const img = images[Math.round(progressData.value * (TOTAL_FRAMES - 1))];
      if (img) {
        ctx.clearRect(0, 0, width, height);
        drawImageCover(ctx, img, width, height);
      }
    };

    resizeCanvas();

    gsap.to(progressData, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: pin,
        start: "top top",
        end: "+=100%",
        scrub: true,
        anticipatePin: 1,
      },
      onUpdate: () => {
        const progress = progressData.value;

        // Draw frame
        const img = images[Math.round(progress * (TOTAL_FRAMES - 1))];
        if (img) {
          const width = window.innerWidth;
          const height = window.innerHeight;
          ctx.clearRect(0, 0, width, height);
          drawImageCover(ctx, img, width, height);
        }

        // Logo: scale 0.3→1 and opacity 0.7→1 over 0–85% progress; fade out 85–100%
        if (progress < 0.85) {
          const p = progress / 0.85;
          const scale = 0.3 + p * 0.7;
          const opacity = 0.7 + p * 0.3;
          logo.style.transform = `scale(${scale})`;
          logo.style.opacity = String(opacity);
        } else {
          const fadeP = (progress - 0.85) / 0.15;
          logo.style.transform = "scale(1)";
          logo.style.opacity = String(1 - fadeP);
        }

        // Content fade out + white overlay fade in (last 15%)
        if (progress >= 0.85) {
          const fadeP = (progress - 0.85) / 0.15;
          content.style.opacity = String(1 - fadeP);
          overlay.style.opacity = String(fadeP);
        } else {
          content.style.opacity = "1";
          overlay.style.opacity = "0";
        }

        // Scroll arrow: fade out at 10–15% progress
        if (scrollArrow) {
          if (progress <= 0.12) {
            scrollArrow.style.opacity = String(1 - progress / 0.12);
          } else {
            scrollArrow.style.opacity = "0";
          }
        }
      },
    });

    const handleResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, [isLoading, error]);

  if (error) {
    return (
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-4xl px-6 text-center text-light-gray">
          <p>
            Unable to load animation. Please ensure frame images are in
            /public/frames/
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-scroll-video-spacer
      className="relative overflow-hidden bg-teal-tint"
      style={{ height: "120vh", margin: 0, padding: 0 }}
    >
      <div
        ref={pinRef}
        suppressHydrationWarning
        className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      >
        <div
          ref={contentRef}
          className="absolute inset-0"
          style={{ opacity: 1 }}
        >
          {/* Placeholder img shows instantly while frames preload; hidden once canvas draws first frame */}
          <img
            src="/frames/frame-0001.jpg"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              firstFrameReady ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ width: "100vw", height: "100vh" }}
            fetchPriority="high"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ width: "100vw", height: "100vh" }}
          />
          <div
            ref={logoRef}
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{
              transform: "scale(0.3)",
              opacity: 0.7,
            }}
          >
            <Image
              src="/light-logo.png"
              alt="RS Cleaning"
              width={200}
              height={200}
              className="w-[200px]"
              priority
            />
          </div>
        </div>
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-[5] bg-teal-tint"
          style={{ opacity: 0 }}
        />
        {!firstFrameReady && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-transparent">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-accent border-t-transparent" />
              <p className="text-sm text-light-gray drop-shadow-md">Loading animation...</p>
            </div>
          </div>
        )}
        <div
          ref={scrollArrowRef}
          className="absolute bottom-[7rem] left-1/2 z-10 flex flex-col items-center gap-4 -translate-x-1/2"
          style={{ opacity: 1 }}
        >
          <p className="text-xs text-light-gray">Scroll to explore</p>
          <svg
            className="h-8 w-8 animate-bounce-down text-cyan-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
