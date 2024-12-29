import { motion } from "motion/react";
import Link from "next/link";

interface FlipLinkProps {
  children: any;
  href: string;
  className?: string;
}

export function FlipLink({
  children,
  href,
  className = "",
  ...props
}: FlipLinkProps) {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        {...props}
        initial="initial"
        whileHover="hovered"
        className={`relative block overflow-hidden whitespace-nowrap font-dmsans text-xl max-sm:text-5xl capitalize text-black ${className}`}
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
          className="absolute inset-0 text-sky-700 font-bold font-indie"
          variants={{
            initial: { y: "120%" },
            hovered: { y: 0 },
          }}
        >
          {children}
        </motion.div>
      </motion.a>
    </Link>
  );
}
