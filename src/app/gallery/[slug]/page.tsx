"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { GalleryProject, getGalleryBySlug } from "~/sanity/schemaTypes/Gallery";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const GridItem = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileTap={{ scale: 0.95 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// MasonryGrid component
const MasonryGrid = ({
  items,
  renderItem,
  className = "",
  gap = "1rem",
  staggerDelay = 0.05,
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // Updated to use an array for ease
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`columns-1 md:columns-2 lg:columns-3 ${className}`}
      style={{ columnGap: gap }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      role="list"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="mb-4 break-inside-avoid"
          role="listitem"
        >
          <GridItem>{renderItem(item, index)}</GridItem>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Lightbox Modal Component
const Lightbox = ({
  image,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalImages,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute right-4 top-4 z-10 text-white transition-colors hover:text-gray-300"
        onClick={onClose}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation Buttons */}
      {totalImages > 1 && (
        <>
          <button
            className="absolute left-4 z-10 p-2 text-white transition-colors hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="absolute right-4 z-10 p-2 text-white transition-colors hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <svg
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Image Counter */}
      <div className="absolute left-4 top-4 text-sm text-white">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Image */}
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        src={image.url}
        alt={image.alt || "Gallery image"}
        className="max-h-full max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
};

const Page = ({ params }) => {
  const { slug } = useParams();
  const [gallery, setGallery] = React.useState<GalleryProject | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = React.useState(false); // Moved here
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0); // Moved here

  console.log("Slug param:", slug);

  useEffect(() => {
    async function fetchGallery() {
      try {
        setLoading(true);
        setError(null);
        const res = await getGalleryBySlug(slug as string);
        console.log(res);
        console.log("Fetched gallery response:", res);
        console.log("Gallery images:", res?.projectGallery?.gallery);
        console.log("Main image:", res?.projectGallery?.mainImage);
        setGallery(res);
      } catch (error) {
        console.error("Error fetching gallery:", error);
        setError("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchGallery();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          <p className="text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Gallery not found</p>
        </div>
      </div>
    );
  }

  // Check if we have a main image URL - FIXED: Use .url instead of .asset.url
  const mainImageUrl = gallery.projectGallery?.mainImage?.url;
  console.log("Main image URL:", mainImageUrl);

  // Check if we have gallery images
  const galleryImages = gallery.projectGallery?.gallery || [];
  console.log("Number of gallery images:", galleryImages.length);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-5xl font-bold">
            {gallery.projectGallery?.title || "Untitled Gallery"}
          </h1>

          {/* Tags */}
          {gallery.projectGallery?.tags &&
            gallery.projectGallery.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {gallery.projectGallery.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-black px-3 py-1 text-sm text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          {/* Short Description */}
          {gallery.projectGallery?.shortDescription && (
            <p className="max-w-3xl text-lg text-gray-700">
              {gallery.projectGallery.shortDescription}
            </p>
          )}
        </div>

        {/* Main Image */}
        {gallery.projectGallery?.mainImage?.url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative mb-16 h-[70vh] w-full cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
            onClick={() => openLightbox(0)}
          >
            <img
              alt={gallery.projectGallery.mainImage?.alt || "Main image"}
              src={gallery.projectGallery.mainImage.url}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <svg
                className="h-16 w-16 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          </motion.div>
        )}

        {/* Gallery Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-4xl font-bold">Gallery Collection</h2>
          <p className="text-gray-600">Click any image to view in fullscreen</p>
        </motion.div>

        {/* Masonry Grid */}
        {galleryImages.length > 0 ? (
          <MasonryGrid
            items={galleryImages}
            gap="1.5rem"
            staggerDelay={0.08}
            renderItem={(image, index) => (
              <div
                className="group relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                onClick={() => openLightbox(index)}
              >
                <img
                  alt={image.alt || `Gallery image ${index + 1}`}
                  src={image.url}
                  className="h-auto w-full object-cover transition-all duration-300 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-semibold">View Image</p>
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          <div className="rounded-3xl bg-white py-20 text-center shadow-lg">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-lg text-gray-500">No gallery images found.</p>
          </div>
        )}
      </div>
      {/* Lightbox */}
      <Lightbox
        image={galleryImages[currentImageIndex]}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNextImage} // Changed from nextImage to goToNextImage
        onPrev={goToPreviousImage} // Changed from prevImage to goToPreviousImage
        currentIndex={currentImageIndex}
        totalImages={galleryImages.length}
      />
    </div>
  );
};

export default Page;
