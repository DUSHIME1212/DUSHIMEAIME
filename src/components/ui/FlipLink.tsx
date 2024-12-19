import { motion } from "motion/react"
import Link from "next/link"

interface FlipLinkProps {
  children: string
  href: string
  className?: string
}

export function FlipLink({ children, href, className = "" }: FlipLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        initial="initial"
        whileHover="hovered"
        className={`relative block overflow-hidden font-dmsans text-xl text-black whitespace-nowrap ${className}`}
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
        >
          {children}
        </motion.div>
        <motion.div
          className="absolute inset-0 font-indie"
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
        >
          {children}
        </motion.div>
      </motion.a>
    </Link>
  )
}

