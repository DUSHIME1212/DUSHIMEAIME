
import { Icons } from "./../components/Icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

// Sample project data
export const jobs = [
  {
    id: 1,
    title: "product Designer",
    company: "code empowerment progress",
    location: "Kigali, rwanda",
    link: "https://www.linkedin.com/company/code-empowerment-progress/posts/?feedView=all",
    img: "https://media.licdn.com/dms/image/v2/D4D0BAQFgkXwXcNwcQA/company-logo_200_200/company-logo_200_200/0/1711536557698/code_empowerment_progress_logo?e=1750291200&v=beta&t=BCRfjUxFKxEgpeoILoHQfOaWscxjasF0zcJDaKmDSz4",
  },
  {
    id: 1,
    title: "Creative Director",
    company: "Founder's Society",
    location: "Kigali, rwanda",
    link: "https://www.linkedin.com/company/founders-society-alu/about/",
    img: "https://media.licdn.com/dms/image/v2/D4D0BAQHg3Lx5bwSVeg/img-crop_100/img-crop_100/0/1727089063618?e=1750291200&v=beta&t=lGLM0f7ENJK0dEI8_p0jUp-c3h9oSe-EXr0Pjxo4I8c",
  },
];
export enum ProjectType {
  GRAPHIC_DESIGN = "graphic design",
  UX_UI_DESIGN = "ux/ui design",
  WEBSITE = "website",
}
export enum ProjectStatus {
  IN_PROGRESS = "in progress",
  COMPLETED = "completed",
}

export const projects = [
  {
    id: 1,
    role: "Full Stack Developer",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-blue-700",
    },
    links: [
      {
        type: "Website",
        href: "https://bookstoretech.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "Source Code",
        href: "https://github.com/DUSHIME1212/Bookstore",
        icon: Icons.github,
      },
    ],
    technologies: [
      "Next.js",
      "Typescript",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    title: "Literary Haven - Modern Bookstore Platform",
    category: "E-Commerce Development",
    description: "A full-featured online bookstore with personalized recommendations, seamless checkout, and an admin dashboard for inventory management. Built with React, Node.js, and MongoDB.",
    image: "/assets/bookstore.png",
    link: "https://bookstoretech.vercel.app/",
    tags: ["React", "Node.js", "MongoDB", "Redux", "Responsive Design"],
    mobile: true,
    mobileimgs: [
      "/assets/bookstore-mobile-1.jpg",
      "/assets/bookstore-mobile-2.jpg",
    ],
    Timeframe: "Q3 2023 - Q1 2024",
    Goals: [
      "Implement personalized recommendation engine",
      "Reduce checkout abandonment by 25%",
      "Achieve sub-2s page load times"
    ],
    desktop: true,
    githublink: "https://github.com/DUSHIME1212/Bookstore.git",
    Completed: "March 2024",
    Challenge: `Creating a bookstore platform that stood out in a crowded market required:
    - Developing an algorithm for personalized recommendations without compromising performance
    - Balancing rich content with fast load times
    - Implementing a frictionless mobile checkout process
    The existing solution had a 65% cart abandonment rate and poor mobile experience.`,
    Howigrown: `This project was pivotal in advancing my full-stack capabilities:
    - Mastered performance optimization techniques like code splitting and lazy loading
    - Gained deep experience with JWT authentication flows
    - Developed skills in building scalable backend services
    - Learned to implement analytics for user behavior tracking`,
    Solution: `
    - Developed a hybrid recommendation system combining collaborative filtering and content-based approaches
    - Implemented a progressive web app for reliable offline access to reading lists
    - Created a streamlined 3-step checkout with multiple payment options
    - Built an admin dashboard with real-time inventory tracking
    - Optimized critical rendering path to achieve 1.8s average load time`,
    Results: `
    - 38% reduction in checkout abandonment (exceeding goal)
    - 72% of users engaged with personalized recommendations
    - Achieved 1.7s average page load time (Google PageSpeed score of 92)
    - 40% increase in average order value through effective upselling`,
    ClientTestimonial: {
      testimonial: `The development team delivered beyond our expectations. Their technical expertise transformed our online presence, resulting in a 210% increase in online revenue within six months of launch. The system's reliability during peak traffic periods has been exceptional.`,
      name: "Emily Rodriguez",
      position: "Director of Digital Commerce, PageTurner Books",
    },
  },
  {
    id: 2,
    role: "Lead Developer",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-red-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Stripe",
      "Shadcn UI",
      "Magic UI",
      "Three js",
    ],
    video: "/assets/Macbook-Air-imigogomotors.vercel.app-3s_pkv6gxz_xb8.webm",
    links: [
      {
        type: "Website",
        href: "https://imigogomotors.vercel.app/",
        icon: Icons.globe,
      },
      {
        type: "Source Code",
        href: "https://github.com/DUSHIME1212/Imigogo-cars-rental",
        icon: Icons.github,
      },
    ],
    title: "AutoSphere - NextGen Automotive Marketplace in rwanda",
    category: "E-Commerce Platform",
    description: "A comprehensive vehicle marketplace featuring advanced search, 360° view technology, and AI-powered pricing recommendations for both dealers and private sellers.",
    // image: "/assets/cars.png",
    link: "https://imigogomotors.vercel.app/",
    tags: ["React", "Node.js", "Three.js", "TensorFlow.js", "AWS"],
    mobile: true,
    mobileimgs: [
      "/assets/automotive-mobile-1.jpg",
      "/assets/automotive-mobile-2.jpg",
    ],
    Timeframe: "Q4 2022 - Q2 2023",
    Goals: [
      "Implement vehicle configuration with real-time pricing",
      "Reduce search-to-listing time by 40%",
      "Increase dealer adoption by 35%"
    ],
    desktop: true,
    githublink: "https://github.com/DUSHIME1212/Imigogo-cars-rental",
    Completed: "June 2023",
    Challenge: `The automotive sector presented unique challenges:
    - Complex vehicle data with hundreds of attributes per listing
    - Need for immersive visual experiences without sacrificing performance
    - Requirement for both B2C and B2B functionality in a single platform
    Existing solutions either catered to dealers or consumers, but not both effectively.`,
    Howigrown: `This project accelerated my growth in several areas:
    - Gained expertise in 3D visualization using Three.js
    - Developed skills in implementing machine learning models client-side
    - Learned to optimize complex data structures for real-time updates
    - Mastered AWS deployment strategies for global scalability`,
    Solution: `
    - Developed a unified data model serving both consumer and dealer needs
    - Implemented interactive 360° vehicle views with hotspot annotations
    - Created a machine learning model for fair price recommendations
    - Built a dealer portal with inventory management and lead tracking
    - Designed a progressive loading system for media-heavy pages`,
    Results: `
    - 52% reduction in time from search to listing creation
    - 68% of dealers adopted the platform within first 90 days
    - Achieved 4.8/5 average rating for search relevance
    - Processed $28M in transactions during first quarter post-launch`,
    ClientTestimonial: {
      testimonial: `The technical depth and innovative approach brought to this project set a new standard for automotive platforms. Their solution handles our complex business requirements while delivering an exceptional user experience that has become our competitive advantage.`,
      name: "James Wilson",
      position: "CTO, AutoNation Connect",
    },
  },
  {
    id: 3,
    role: "UX/UI Lead",
    type: ProjectType.GRAPHIC_DESIGN,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    title: "AgriNext - Digital Transformation for Agriculture",
    category: "Brand Identity & Digital Design",
    description: "Complete brand system and digital platform for a agtech startup, including logo, marketing materials, and a responsive web portal connecting farmers with precision agriculture tools.",
    image: "/assets/agrinextgen.png",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create distinctive brand identity in competitive sector",
      "Develop design language scalable across digital and print",
      "Design intuitive interface for non-technical users"
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Agricultural technology faces unique adoption barriers:
    - Need to appeal to both tech-savvy investors and traditional farmers
    - Complex data visualization requirements
    - Accessibility challenges in rural areas with poor connectivity
    Existing solutions either looked too corporate or failed to communicate technical value simply.`,
    Howigrown: `This project expanded my design capabilities:
    - Developed skills in creating accessible interfaces for low-bandwidth environments
    - Mastered data visualization techniques for agricultural metrics
    - Learned to balance brand personality with technical credibility
    - Gained experience designing for extreme environmental conditions (sunlight readability)`,
    Solution: `
    - Created a vibrant brand identity combining organic and tech elements
    - Developed a comprehensive design system with agricultural-specific components
    - Designed offline-first interfaces for field use
    - Implemented high-contrast modes for outdoor visibility
    - Produced illustrated educational materials to ease technology adoption`,
    Results: `
    - 92% of farmers reported the interface was "easy to understand"
    - Company recognized with "Best Brand Launch 2023" by AgTech Weekly
    - Investor presentations credited with helping secure $4.2M Series A
    - Design system reduced new feature development time by 45%`,
    ClientTestimonial: {
      testimonial: `Our brand transformation exceeded all expectations. The design team's ability to bridge the gap between cutting-edge technology and practical farm applications was remarkable. They've created assets that resonate equally with our investors, agronomists, and farming communities.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 3,
    role: "UX/UI Lead",
    type: ProjectType.GRAPHIC_DESIGN,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    video:"/assets/Macbook-Air-codeempowementtech.vercel.app-thwlgla-zbx0mg.webm",
    title: "Code Empowerment progress - Digital Transformation for Edtech",
    category: "Brand Identity & Digital Design",
    description: "Complete brand system and digital platform for a agtech startup, including logo, marketing materials, and a responsive web portal connecting farmers with precision agriculture tools.",
    // image: "/assets/agrinextgen.png",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create distinctive brand identity in competitive sector",
      "Develop design language scalable across digital and print",
      "Design intuitive interface for non-technical users"
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Agricultural technology faces unique adoption barriers:
    - Need to appeal to both tech-savvy investors and traditional farmers
    - Complex data visualization requirements
    - Accessibility challenges in rural areas with poor connectivity
    Existing solutions either looked too corporate or failed to communicate technical value simply.`,
    Howigrown: `This project expanded my design capabilities:
    - Developed skills in creating accessible interfaces for low-bandwidth environments
    - Mastered data visualization techniques for agricultural metrics
    - Learned to balance brand personality with technical credibility
    - Gained experience designing for extreme environmental conditions (sunlight readability)`,
    Solution: `
    - Created a vibrant brand identity combining organic and tech elements
    - Developed a comprehensive design system with agricultural-specific components
    - Designed offline-first interfaces for field use
    - Implemented high-contrast modes for outdoor visibility
    - Produced illustrated educational materials to ease technology adoption`,
    Results: `
    - 92% of farmers reported the interface was "easy to understand"
    - Company recognized with "Best Brand Launch 2023" by AgTech Weekly
    - Investor presentations credited with helping secure $4.2M Series A
    - Design system reduced new feature development time by 45%`,
    ClientTestimonial: {
      testimonial: `Our brand transformation exceeded all expectations. The design team's ability to bridge the gap between cutting-edge technology and practical farm applications was remarkable. They've created assets that resonate equally with our investors, agronomists, and farming communities.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 3,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    video:"/assets/Macbook-Air-iphone13-orpin.vercel.app-4okyi94k8v8whu.webm",
    title: "Iphone 13 - showcase website clone",
    category: "Brand Identity & Digital Design",
    description: "Complete brand system and digital platform for a agtech startup, including logo, marketing materials, and a responsive web portal connecting farmers with precision agriculture tools.",
    // image: "/assets/agrinextgen.png",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create distinctive brand identity in competitive sector",
      "Develop design language scalable across digital and print",
      "Design intuitive interface for non-technical users"
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Agricultural technology faces unique adoption barriers:
    - Need to appeal to both tech-savvy investors and traditional farmers
    - Complex data visualization requirements
    - Accessibility challenges in rural areas with poor connectivity
    Existing solutions either looked too corporate or failed to communicate technical value simply.`,
    Howigrown: `This project expanded my design capabilities:
    - Developed skills in creating accessible interfaces for low-bandwidth environments
    - Mastered data visualization techniques for agricultural metrics
    - Learned to balance brand personality with technical credibility
    - Gained experience designing for extreme environmental conditions (sunlight readability)`,
    Solution: `
    - Created a vibrant brand identity combining organic and tech elements
    - Developed a comprehensive design system with agricultural-specific components
    - Designed offline-first interfaces for field use
    - Implemented high-contrast modes for outdoor visibility
    - Produced illustrated educational materials to ease technology adoption`,
    Results: `
    - 92% of farmers reported the interface was "easy to understand"
    - Company recognized with "Best Brand Launch 2023" by AgTech Weekly
    - Investor presentations credited with helping secure $4.2M Series A
    - Design system reduced new feature development time by 45%`,
    ClientTestimonial: {
      testimonial: `Our brand transformation exceeded all expectations. The design team's ability to bridge the gap between cutting-edge technology and practical farm applications was remarkable. They've created assets that resonate equally with our investors, agronomists, and farming communities.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 3,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    image:"/assets/Macbook-Air-weather-five-ashy-69.vercel.app (1).png",
    title: "Weather App - showcase website",
    category: "Brand Identity & Digital Design",
    description: "Complete brand system and digital platform for a agtech startup, including logo, marketing materials, and a responsive web portal connecting farmers with precision agriculture tools.",
    // image: "/assets/agrinextgen.png",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create distinctive brand identity in competitive sector",
      "Develop design language scalable across digital and print",
      "Design intuitive interface for non-technical users"
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Agricultural technology faces unique adoption barriers:
    - Need to appeal to both tech-savvy investors and traditional farmers
    - Complex data visualization requirements
    - Accessibility challenges in rural areas with poor connectivity
    Existing solutions either looked too corporate or failed to communicate technical value simply.`,
    Howigrown: `This project expanded my design capabilities:
    - Developed skills in creating accessible interfaces for low-bandwidth environments
    - Mastered data visualization techniques for agricultural metrics
    - Learned to balance brand personality with technical credibility
    - Gained experience designing for extreme environmental conditions (sunlight readability)`,
    Solution: `
    - Created a vibrant brand identity combining organic and tech elements
    - Developed a comprehensive design system with agricultural-specific components
    - Designed offline-first interfaces for field use
    - Implemented high-contrast modes for outdoor visibility
    - Produced illustrated educational materials to ease technology adoption`,
    Results: `
    - 92% of farmers reported the interface was "easy to understand"
    - Company recognized with "Best Brand Launch 2023" by AgTech Weekly
    - Investor presentations credited with helping secure $4.2M Series A
    - Design system reduced new feature development time by 45%`,
    ClientTestimonial: {
      testimonial: `Our brand transformation exceeded all expectations. The design team's ability to bridge the gap between cutting-edge technology and practical farm applications was remarkable. They've created assets that resonate equally with our investors, agronomists, and farming communities.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 3,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    video:"/assets/Macbook-Air-hotelaccomodation.vercel.app-17p1rnpikn8r3b.webm",
    title: "Weather App - showcase website",
    category: "Brand Identity & Digital Design",
    description: "Complete brand system and digital platform for a agtech startup, including logo, marketing materials, and a responsive web portal connecting farmers with precision agriculture tools.",
    // image: "/assets/agrinextgen.png",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create distinctive brand identity in competitive sector",
      "Develop design language scalable across digital and print",
      "Design intuitive interface for non-technical users"
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Agricultural technology faces unique adoption barriers:
    - Need to appeal to both tech-savvy investors and traditional farmers
    - Complex data visualization requirements
    - Accessibility challenges in rural areas with poor connectivity
    Existing solutions either looked too corporate or failed to communicate technical value simply.`,
    Howigrown: `This project expanded my design capabilities:
    - Developed skills in creating accessible interfaces for low-bandwidth environments
    - Mastered data visualization techniques for agricultural metrics
    - Learned to balance brand personality with technical credibility
    - Gained experience designing for extreme environmental conditions (sunlight readability)`,
    Solution: `
    - Created a vibrant brand identity combining organic and tech elements
    - Developed a comprehensive design system with agricultural-specific components
    - Designed offline-first interfaces for field use
    - Implemented high-contrast modes for outdoor visibility
    - Produced illustrated educational materials to ease technology adoption`,
    Results: `
    - 92% of farmers reported the interface was "easy to understand"
    - Company recognized with "Best Brand Launch 2023" by AgTech Weekly
    - Investor presentations credited with helping secure $4.2M Series A
    - Design system reduced new feature development time by 45%`,
    ClientTestimonial: {
      testimonial: `Our brand transformation exceeded all expectations. The design team's ability to bridge the gap between cutting-edge technology and practical farm applications was remarkable. They've created assets that resonate equally with our investors, agronomists, and farming communities.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  }
];


export function filterproject(id:number) {
  const project = projects.find((project) => project.id === id);
  if (!project) {
    return null;
  }
  return project;

}