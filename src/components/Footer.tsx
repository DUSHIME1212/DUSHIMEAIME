import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowUpRight, Github } from "@geist-ui/icons";
import { BlurFade } from "./magicui/blur-fade";
import { Dribbble, Figma } from "lucide-react";
import { RiBehanceLine, RiDribbbleLine, RiFigmaLine, RiGithubLine, RiHeartFill, RiInstagramLine } from "@remixicon/react";

const Footer = () => {
  return (
    <footer className="bg-background border-t whisper-border py-12 w-full font-notion">
      <div className="mx-auto px-8 md:px-20 lg:px-32">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:justify-between">
          {/* Social Links */}
          <div className="flex gap-8">
            <a
              href="https://github.com/DUSHIME1212"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-notion-blue transition-all duration-300 transform hover:scale-110"
              aria-label="GitHub Profile"
            >
              <RiGithubLine size={24}/>
            </a>
            <a
              href="https://dribbble.com/DMATT250__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-notion-pink transition-all duration-300 transform hover:scale-110"
              aria-label="Dribbble Profile"
            >
              <RiDribbbleLine size={24}/>
            </a>
            <a
              href="https://behance.net/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-notion-blue-focus transition-all duration-300 transform hover:scale-110"
              aria-label="Behance Profile"
            >
              <RiBehanceLine size={24}/>
            </a>
            <a
              href="https://www.figma.com/@deejaymatttunez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-notion-purple transition-all duration-300 transform hover:scale-110"
              aria-label="Figma Profile"
            >
              <RiFigmaLine size={24}/>
            </a>
            <a
              href="https://www.instagram.com/__matt360/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-notion-pink transition-all duration-300 transform hover:scale-110"
              aria-label="Figma Profile"
            >
              <RiInstagramLine size={24}/>
            </a>
          </div>
          {/* Copyright */}
          <div className="flex flex-col md:items-end gap-2">
            <p className="text-foreground text-[14px] font-medium tracking-notion-body-large">
              Built with precision in Kigali, Rwanda.
            </p>
            <p className="text-muted-foreground text-[12px] font-medium tracking-notion-badge uppercase">
              &copy; {new Date().getFullYear()} Dushime Aime. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
