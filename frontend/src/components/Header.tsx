"use client";

import { useState, useEffect, MouseEvent, useRef } from "react";
import { gsap } from "gsap";

interface ImageItem {
  id: number;
  name: string;
  src: string;
  description?:string
}

const images: ImageItem[] = [
  {
    id: 1,
    name: "Image 1",
    src: "../../images/notre mission.jpg",
    description:""
  },
  {
    id: 2,
    name: "Image 2",
    src: "../../images/Excellence.png",
    description:""
  },
  {
    id: 3,
    name: "Image 3",
    src: "../../images/stacking-wooden-blocks-is-risk-creating-business-growth-ideas.jpg",
    description:""
  },
  {
    id: 4,
    name: "Image 4",
    src: "../../images/Partenariat.png",
    description:""
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  // Animation de transition entre les images
  const animateImage = (direction: "next" | "prev") => {
    if (!imgRef.current) return;

    gsap.to(imgRef.current, {
      opacity: 0,
      x: direction === "next" ? -100 : 100,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prevIndex) =>
          direction === "next"
            ? prevIndex === images.length - 1
              ? 0
              : prevIndex + 1
            : prevIndex === 0
              ? images.length - 1
              : prevIndex - 1,
        );

        gsap.fromTo(
          imgRef.current,
          { opacity: 0, x: direction === "next" ? 100 : -100, scale: 1.05 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        );
      },
    });
  };

  const nextImage = () => animateImage("next");
  const prevImage = () => animateImage("prev");

  // Auto-défilement
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Drag souris
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>): void => {
    if (isDragging && startX !== null) {
      const endX = e.clientX;
      const diff = startX - endX;

      if (diff > 50) {
        nextImage();
      } else if (diff < -50) {
        prevImage();
      }
    }
    setIsDragging(false);
    setStartX(null);
  };

  const handleMouseLeave = (): void => {
    setIsDragging(false);
    setStartX(null);
  };

  // Animation des boutons au survol
  useEffect(() => {
    const buttons = [prevBtnRef.current, nextBtnRef.current];
    buttons.forEach((btn) => {
      if (btn) {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.2,
            backgroundColor: "rgba(0,0,0,0.7)",
            duration: 0.3,
            ease: "elastic.out(1,0.3)",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            duration: 0.3,
            ease: "power3.out",
          });
        });
      }
    });
  }, []);

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center bg-gray-100 overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={images[currentIndex].src}
        alt={images[currentIndex].name}
        className="w-full h-full object-cover shadow-lg"
      />

      <button
        ref={prevBtnRef}
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ◀
      </button>

      <button
        ref={nextBtnRef}
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ▶
      </button>
    </div>
  );
}
