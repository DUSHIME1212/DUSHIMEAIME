"use client"

import { motion } from "framer-motion"

export default function SignatureMarqueeSection() {
  return (
    <div className="relative bg-blue-700 w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden">
      <div className="w-full flex flex-col gap-4 md:gap-8 py-10 select-none pointer-events-none">
        {/* Top Line - Moving Right */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Using negative value for left-to-right movement illusion or adjust direction
            // Let's start from -1000 to 0 to move RIGHT, or use negative keyframes for Left.
            // Moving RIGHT: x: [-1000, 0]
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="text-[12vw] md:text-[8vw] font-instrumentserif italic text-blue-100 leading-[0.9] tracking-tight px-4"
              >
                FRONTEND DEVELOPER | FULLSTACK DEVELOPMENT
              </h2>
            ))}
          </motion.div>
          {/* Duplicate for seamless loop if needed, or just map above ensures enough width */}
        </div>

        {/* Bottom Line - Moving Left */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Moves LEFT
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <h2
                key={i}
                className="font-bold uppercase font-instrumentserif italic text-[12vw] md:text-[8vw] text-white leading-[0.9] tracking-tighter px-4"
              >
                UX/UI Designer | GRAPHIC Designer | Interaction Designer 
              </h2>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
