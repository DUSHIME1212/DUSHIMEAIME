"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '~/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "What truly sets Aime apart is his remarkable reliability and efficiency. He consistently delivers high-quality work, bringing technical precision and creativity to every project. During our collaborative work, he exceeded expectations and offered strategic and impactful innovative solutions.",
    by: "Ayomide agbaje, CEO at Afresearch",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQGTAQ6txJYS-A/profile-displayphoto-shrink_200_200/B4DZRHWykLGkAY-/0/1736363945646?e=1770249600&v=beta&t=ixH_XODLXRu6U_MtwECqOvYCtJe4jhe_1cnOdNO_3ZU"
  },
  {
    tempId: 1,
    testimonial: "Aime is outstanding ability to translate complex goals into compelling visual narratives as a designer. His design work communicates core messages with remarkable clarity and vision. And on top of that, he brings a rare combination of infectious enthusiasm and commitment to excellence that inspires those around him.",
    by: "SUGIRA Herve, Software Engineer",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQEuqMqFT514rA/profile-displayphoto-scale_400_400/B4DZrkmmdmIAAg-/0/1764771918171?e=1770854400&v=beta&t=8nxb9pQwV5W4KmKSEBPWWq0bJ-3cGx9ctQKz0W2EouI"
  },
  {
    tempId: 2,
    testimonial: "Lee don Aime is a highly talented designer who consistently brings ideas to life with clarity and originality. HE is great at turning rough ideas into clean, functional, and beautiful designs. Their ability to listen, adapt, and improve makes them a valuable collaborator.",
    by: "Igor NTWARI, Senior Developer at Evolve",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQFkPeb0UiMPKQ/profile-displayphoto-shrink_200_200/B4DZb7gowsGYAY-/0/1747976362224?e=1770249600&v=beta&t=q4TAs08rAmCQyK9e3PBMbiMCe7_QlnwXyFSzb-11nCA"
  },
  {
    tempId: 4,
    testimonial: "We have truly enjoyed working with DUSHIME and would absolutely welcome the opportunity to collaborate again in the future",
    by: "Fiona hayes, CEO at Viewpoint simulations",
    imgSrc: "https://ca.slack-edge.com/T086V2ZDM7F-U086HC1Q6BZ-14c7121b00d5-512"
  },
  {
    tempId: 5,
    testimonial: "DUSHIME Aime is reliable, innovative, and easy to work with. They consistently delivered high-quality designs on time and were always open to feedback. I would confidently recommend them to anyone looking for a skilled and dependable designer.",
    by: "Kevin NTWARI, C0O at Codes empowerment",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQFghERCy4Iuuw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731397267213?e=1770249600&v=beta&t=VObB10gcj57WUZ7DwilE37Rs2Vvi6sUO-x0SwI0aVP4"
  },
  {
    tempId: 6,
    testimonial: "I had the opportunity to work closely with Aime Don, and their design skills are exceptional. He combines creativity with practicality, ensuring designs are not only attractive but also user-friendly. Their work ethic and commitment to quality really stand out.",
    by: "Ornella NDAHIRO, CEO at Codes empowerment",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQH4z0gE6OA6CQ/profile-displayphoto-shrink_800_800/B4DZavkaVBHEAc-/0/1746702285137?e=1770249600&v=beta&t=mbexX-DPFBF45ziy-K2Z4UHMgPjm3JPaCLAZNYJQOGs"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-sm font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden "
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};