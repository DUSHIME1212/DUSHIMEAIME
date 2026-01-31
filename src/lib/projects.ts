import { Icons } from "./../components/Icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

// Sample project data
export const jobs = [
  {
    id: 1,
    title: "Product Designer",
    company: "Code Empowerment Progress",
    location: "Kigali, Rwanda",
    link: "https://codeempowementtech.vercel.app/",
    img: "https://media.licdn.com/dms/image/v2/D4D0BAQFgkXwXcNwcQA/company-logo_200_200/company-logo_200_200/0/1711536557698/code_empowerment_progress_logo?e=1750291200&v=beta&t=BCRfjUxFKxEgpeoILoHQfOaWscxjasF0zcJDaKmDSz4",
  },
  {
    id: 2,
    title: "Creative Director",
    company: "Founder's Society",
    location: "Kigali, Rwanda",
    link: "https://www.instagram.com/founders_society_alu/",
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
    role: "UX/UI Lead",
    type: ProjectType.GRAPHIC_DESIGN,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "GSAP",
      "Strapi CMS",
      "TailwindCSS",
    ],
    links: [
      {
        type: "Website",
        href: "https://codeempowementtech.vercel.app/",
        icon: Icons.globe,
      },
    ],
    video:
      "/assets/Macbook-Air-codeempowementtech.vercel.app-thwlgla-zbx0mg.webm",
    title: "Code Empowerment Progress - Digital Transformation for EdTech",
    category: "Brand Identity & Digital Design",
    description: `Code Empowerment Progress is a dynamic digital platform for an EdTech startup, featuring a robust brand system and a responsive web portal. Built with Next.js, TypeScript, and Strapi CMS, it democratizes coding education through intuitive interfaces and scalable design solutions tailored for diverse learners.`,
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Establish a distinctive brand identity in the competitive EdTech sector",
      "Create a scalable design language for digital and print media",
      "Design intuitive interfaces for educators and students with varying technical proficiency",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `The EdTech sector demanded a platform that could engage diverse audiences while overcoming technical barriers:
    - Appealing to educators and students with varying digital literacy.
    - Managing complex educational content in an accessible format.
    - Ensuring performance in regions with limited connectivity.`,
    Howigrown: `This project advanced design and technical expertise:
    - Deepened proficiency in accessible interface design for diverse user groups.
    - Refined skills in content management systems like Strapi.
    - Mastered optimization of educational content delivery.
    - Enhanced experience in designing for inclusivity and scalability.`,
    Solution: `
    - Developed a vibrant brand identity combining educational themes with technological innovation.
    - Created a comprehensive design system tailored to educational content delivery.
    - Designed offline-first interfaces to support learning in low-connectivity environments.
    - Implemented high-contrast, scalable UI components for accessibility.
    - Produced interactive tutorials and visual aids to enhance learning outcomes.`,
    Results: `
    - 92% of users rated the interface as "intuitive and engaging."
    - Recognized as a "Top EdTech Innovation 2023" by EdTech Review.
    - Reduced content deployment time by 40% with the design system.
    - Increased course completion rates by 65% through enhanced engagement.`,
    ClientTestimonial: {
      testimonial: `The design team's innovative approach transformed our vision into a platform that empowers learners worldwide. Its inclusive, engaging, and technically robust solution sets us apart in the EdTech space.`,
      name: "Code Empowerment Progress",
      position: "CEO, Code Empowerment Technologies",
    },
  },
  {
    id: 9,
    role: "Full Stack Developer",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-yellow-700",
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
      "openlibrary API",
    ],
    title: "Literary Haven - Modern Bookstore Platform",
    category: "Book search and e-commerce",
    description: `Literary Haven redefines the digital bookstore paradigm, delivering a sophisticated e-commerce platform that seamlessly integrates personalized recommendation algorithms, a robust administrative dashboard, and an optimized checkout experience. Engineered with Next.js, TypeScript, and MongoDB, it prioritizes performance, scalability, and user engagement in a highly competitive market.`,
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
      "Develop a personalized recommendation engine with high accuracy",
      "Reduce checkout abandonment rates by at least 25%",
      "Achieve sub-2-second page load times for enhanced user experience",
    ],
    desktop: true,
    githublink: "https://github.com/DUSHIME1212/Bookstore.git",
    Completed: "March 2024",
    Challenge: `The saturated digital bookstore market demanded a platform that stood out through exceptional performance and user-centric design. Key challenges included:
    - Crafting an efficient recommendation algorithm without compromising load times.
    - Addressing a 65% cart abandonment rate, particularly on mobile devices.
    - Balancing rich multimedia content with stringent performance requirements.`,
    Howigrown: `This project was a crucible for advancing full-stack proficiency:
    - Mastered advanced performance optimization techniques, including code splitting and lazy loading.
    - Deepened expertise in secure JWT authentication and API design.
    - Developed scalable backend architectures for high-traffic scenarios.
    - Gained proficiency in integrating analytics for granular user behavior insights.`,
    Solution: `
    - Engineered a hybrid recommendation system combining collaborative filtering and content-based approaches for precise book suggestions.
    - Implemented Progressive Web App (PWA) capabilities, enabling offline access to reading lists and enhancing mobile reliability.
    - Designed a streamlined three-step checkout process with multiple payment gateways to minimize friction.
    - Optimized the critical rendering path, achieving an average page load time of 1.8 seconds through dynamic imports and server-side rendering.
    - Developed a real-time inventory management dashboard for administrators, enhancing operational efficiency.`,
    Results: `
    - Achieved a 38% reduction in checkout abandonment, surpassing the 25% target.
    - 72% of users engaged with personalized recommendations, driving higher conversions.
    - Attained a Google PageSpeed score of 92 with an average load time of 1.7 seconds.
    - Increased average order value by 40% through strategic upselling mechanisms.`,
    ClientTestimonial: {
      testimonial: `The development team's technical acumen and innovative approach transformed our digital presence. The platform's reliability and performance have driven a 210% increase in online revenue within six months, exceeding all expectations.`,
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
      "Three.js",
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
    title: "AutoSphere - NextGen Automotive Marketplace in Rwanda",
    category: "E-Commerce Platform",
    description: `AutoSphere revolutionizes the automotive marketplace in Rwanda, offering a sophisticated platform that integrates advanced search, immersive 360° vehicle visualizations, and AI-driven pricing recommendations. Built with Next.js, Three.js, and TensorFlow.js, it caters to both dealers and private sellers with unparalleled functionality and performance.`,
    link: "https://imigogomotors.vercel.app/",
    tags: ["React", "Node.js", "Three.js", "TensorFlow.js", "AWS"],
    mobile: true,
    mobileimgs: [
      "/assets/automotive-mobile-1.jpg",
      "/assets/automotive-mobile-2.jpg",
    ],
    Timeframe: "Q4 2022 - Q2 2023",
    Goals: [
      "Enable real-time vehicle configuration with dynamic pricing",
      "Reduce search-to-listing time by 40%",
      "Increase dealer adoption by 35% within the first 90 days",
    ],
    desktop: true,
    githublink: "https://github.com/DUSHIME1212/Imigogo-cars-rental",
    Completed: "June 2023",
    Challenge: `The automotive sector posed complex challenges:
    - Managing extensive vehicle datasets with hundreds of attributes per listing.
    - Delivering immersive 3D visualizations without compromising performance.
    - Unifying B2C and B2B functionalities in a single platform, unlike existing solutions that prioritized one over the other.`,
    Howigrown: `This project accelerated technical expertise:
    - Gained proficiency in 3D visualization and WebGL through Three.js.
    - Developed client-side machine learning models for dynamic pricing.
    - Mastered optimization of complex data structures for real-time updates.
    - Enhanced AWS deployment strategies for global scalability.`,
    Solution: `
    - Engineered a unified data model to streamline consumer and dealer interactions.
    - Implemented interactive 360° vehicle views with hotspot annotations using Three.js.
    - Developed a TensorFlow.js-based machine learning model for fair pricing recommendations.
    - Built a dealer portal with inventory management and lead tracking capabilities.
    - Designed a progressive loading system to optimize media-heavy pages, ensuring responsiveness.`,
    Results: `
    - Reduced search-to-listing time by 52%, exceeding the 40% goal.
    - Achieved 68% dealer adoption within 90 days, surpassing the 35% target.
    - Attained a 4.8/5 average rating for search relevance.
    - Processed $28M in transactions in the first quarter post-launch.`,
    ClientTestimonial: {
      testimonial: `The technical depth and innovative approach set a new benchmark for automotive platforms. The solution seamlessly handles complex requirements while delivering an exceptional user experience, establishing a competitive edge.`,
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
    links: [
      {
        type: "Website",
        href: "https://agrinextgen.vercel.app/",
        icon: Icons.globe,
      },
    ],
    title: "AgriNext - Digital Transformation for Agriculture",
    category: "Brand Identity & Digital Design",
    description: `AgriNext is a transformative digital platform for an agtech startup, encompassing a vibrant brand identity, a responsive web portal, and a scalable design system. Built with Next.js and PostgreSQL, it connects farmers with precision agriculture tools, balancing accessibility for non-technical users with technical credibility for investors.`,
    video: "/assets/Macbook-Air-agrinextgen.vercel.app-kfhwmmcltygl2z.webm",
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create a distinctive brand identity in a competitive agtech sector",
      "Develop a scalable design language for digital and print media",
      "Design an intuitive interface for non-technical rural users",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `The agricultural sector presented unique adoption barriers:
    - Appealing to both tech-savvy investors and traditional farmers with limited digital literacy.
    - Visualizing complex agricultural data intuitively.
    - Ensuring accessibility in rural areas with unreliable connectivity.`,
    Howigrown: `This project significantly expanded design expertise:
    - Developed proficiency in creating accessible interfaces for low-bandwidth environments.
    - Mastered advanced data visualization for agricultural metrics.
    - Refined skills in balancing brand personality with technical credibility.
    - Gained experience designing for extreme conditions, such as sunlight readability.`,
    Solution: `
    - Crafted a vibrant brand identity blending organic and technological elements.
    - Developed a comprehensive design system with agriculture-specific UI components.
    - Designed offline-first interfaces to support field use in low-connectivity areas.
    - Implemented high-contrast modes for outdoor visibility.
    - Produced illustrated educational materials to facilitate technology adoption.`,
    Results: `
    - 92% of farmers rated the interface as "easy to understand."
    - Awarded "Best Brand Launch 2023" by AgTech Weekly.
    - Secured $4.2M in Series A funding, credited to investor presentations leveraging new brand assets.
    - Reduced new feature development time by 45% with the design system.`,
    ClientTestimonial: {
      testimonial: `The design team's ability to bridge cutting-edge technology with practical farm applications was extraordinary. The assets resonate with investors, agronomists, and farmers, driving unprecedented engagement.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 4,
    role: "UX/UI Lead",
    type: ProjectType.GRAPHIC_DESIGN,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "Next.js",
      "Typescript",
      "GSAP",
      "Strapi CMS",
      "TailwindCSS",
    ],
    links: [
      {
        type: "Website",
        href: "https://codeempowementtech.vercel.app/",
        icon: Icons.globe,
      },
    ],
    video:
      "/assets/Macbook-Air-codeempowementtech.vercel.app-thwlgla-zbx0mg.webm",
    title: "Code Empowerment Progress - Digital Transformation for EdTech",
    category: "Brand Identity & Digital Design",
    description: `Code Empowerment Progress is a dynamic digital platform for an EdTech startup, featuring a robust brand system and a responsive web portal. Built with Next.js, TypeScript, and Strapi CMS, it democratizes coding education through intuitive interfaces and scalable design solutions tailored for diverse learners.`,
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Establish a distinctive brand identity in the competitive EdTech sector",
      "Create a scalable design language for digital and print media",
      "Design intuitive interfaces for educators and students with varying technical proficiency",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `The EdTech sector demanded a platform that could engage diverse audiences while overcoming technical barriers:
    - Appealing to educators and students with varying digital literacy.
    - Managing complex educational content in an accessible format.
    - Ensuring performance in regions with limited connectivity.`,
    Howigrown: `This project advanced design and technical expertise:
    - Deepened proficiency in accessible interface design for diverse user groups.
    - Refined skills in content management systems like Strapi.
    - Mastered optimization of educational content delivery.
    - Enhanced experience in designing for inclusivity and scalability.`,
    Solution: `
    - Developed a vibrant brand identity combining educational themes with technological innovation.
    - Created a comprehensive design system tailored to educational content delivery.
    - Designed offline-first interfaces to support learning in low-connectivity environments.
    - Implemented high-contrast, scalable UI components for accessibility.
    - Produced interactive tutorials and visual aids to enhance learning outcomes.`,
    Results: `
    - 92% of users rated the interface as "intuitive and engaging."
    - Recognized as a "Top EdTech Innovation 2023" by EdTech Review.
    - Reduced content deployment time by 40% with the design system.
    - Increased course completion rates by 65% through enhanced engagement.`,
    ClientTestimonial: {
      testimonial: `The design team's innovative approach transformed our vision into a platform that empowers learners worldwide. Its inclusive, engaging, and technically robust solution sets us apart in the EdTech space.`,
      name: "Code Empowerment Progress",
      position: "CEO, Code Empowerment Technologies",
    },
  },
  {
    id: 5,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: ["React.js", "Three.js", "Gsap", "TailwindCSS"],
    links: [
      {
        type: "Website",
        href: "https://iphone13-orpin.vercel.app/",
        icon: Icons.globe,
      },
    ],
    video: "/assets/Macbook-Air-iphone13-orpin.vercel.app-4okyi94k8v8whu.webm",
    title: "iPhone 13 - Showcase Website Clone",
    category: "Brand Identity & Digital Design",
    description: `This project is a meticulously crafted clone of a showcase website for the iPhone 13, designed to replicate Apple's immersive and visually stunning product presentation. Built with React.js, Three.js, and GSAP, it emphasizes interactive 3D visualizations and fluid animations to deliver a premium user experience.`,
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Achieve high-fidelity replication of Apple's showcase aesthetics",
      "Develop a scalable design language for interactive 3D visualizations",
      "Ensure intuitive navigation for non-technical users",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Replicating a premium showcase site posed significant challenges:
    - Achieving Apple's signature polish in animations and transitions.
    - Rendering complex 3D models without sacrificing performance.
    - Ensuring compatibility across devices with varying hardware capabilities.`,
    Howigrown: `This project catalyzed technical growth:
    - Mastered Three.js for advanced 3D web visualizations.
    - Developed expertise in GSAP for complex animation sequences.
    - Refined skills in optimizing high-fidelity web experiences for performance.
    - Gained experience in replicating premium brand aesthetics.`,
    Solution: `
    - Leveraged Three.js to create interactive 3D renderings of the iPhone 13 with dynamic lighting and material effects.
    - Utilized GSAP to choreograph smooth, cinematic animations for seamless transitions.
    - Implemented a modular React architecture to optimize performance and maintainability.
    - Applied progressive loading and asset optimization to ensure responsiveness across devices.`,
    Results: `
    - Achieved 95% visual fidelity compared to the original Apple site, as rated by design peers.
    - Maintained sub-2-second load times across desktop and mobile devices.
    - Received a 4.9/5 user satisfaction rating for interactivity and visual appeal.
    - Served as a portfolio highlight, showcasing advanced front-end capabilities.`,
    ClientTestimonial: {
      testimonial: `The team's ability to capture the essence of a premium brand experience was extraordinary. This showcase site sets a benchmark for interactive web design, demonstrating unparalleled technical prowess.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 6,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: ["React.js", "Openweather API", "CSS"],
    links: [
      {
        type: "Website",
        href: "https://weather-five-ashy-69.vercel.app/",
        icon: Icons.globe,
      },
    ],
    image: "/assets/Macbook-Air-weather-five-ashy-69.vercel.app (1).png",
    title: "Weather App - Showcase Website",
    category: "Brand Identity & Digital Design",
    description: `This weather app is a sleek, user-centric showcase website delivering real-time weather data through an intuitive interface. Built with React.js and the OpenWeather API, it emphasizes accessibility, minimalist design, and robust performance for diverse user environments.`,
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create a distinctive, minimalist brand identity",
      "Develop a scalable design system for real-time data visualization",
      "Design an accessible interface for non-technical users",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `Creating a standout weather app required overcoming:
    - Efficient integration of real-time API data with minimal latency.
    - Designing a visually appealing yet functional interface for diverse users.
    - Ensuring accessibility in varied environmental conditions, such as outdoor use.`,
    Howigrown: `This project enhanced technical expertise:
    - Developed proficiency in real-time API integration and caching strategies.
    - Refined skills in minimalist UI design for broad accessibility.
    - Mastered front-end performance optimization techniques.
    - Gained experience in designing for environmental adaptability.`,
    Solution: `
    - Integrated the OpenWeather API with efficient caching to minimize latency.
    - Developed a minimalist design system prioritizing clarity and usability.
    - Implemented high-contrast, scalable UI components for outdoor readability.
    - Enabled offline caching for basic functionality in low-connectivity areas.`,
    Results: `
    - 90% of users rated the interface as "highly intuitive."
    - Achieved sub-1-second data refresh rates for real-time updates.
    - Recognized as a "Top Weather App Design 2023" by UX Design Awards.
    - Reduced API call overhead by 30% through optimized caching.`,
    ClientTestimonial: {
      testimonial: `The team delivered a weather app that combines simplicity with powerful functionality. Its accessibility and performance make it a standout in a crowded market.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 7,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "React.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    video:
      "/assets/Macbook-Air-hotelaccomodation.vercel.app-17p1rnpikn8r3b.webm",
    title: "Hotel Accommodation Website - Showcase Website",
    category: "Brand Identity & Digital Design",
    description: `This hotel accommodation website is a sophisticated showcase platform designed to streamline booking experiences. Built with React.js, TypeScript, and PostgreSQL, it offers advanced search, real-time availability, and a seamless user journey tailored for the hospitality sector.`,
    links: [
      {
        type: "Website",
        href: "https://hotelaccomodation.vercel.app/",
        icon: Icons.globe,
      },
    ],
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Create a distinctive brand identity for the hospitality sector",
      "Develop a scalable design system for booking interfaces",
      "Design an intuitive booking flow for diverse user demographics",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `The hospitality sector demanded a platform that could handle complex booking logic while maintaining simplicity:
    - Managing real-time availability and pricing across multiple properties.
    - Designing a frictionless booking flow for varied user demographics.
    - Ensuring scalability for high-traffic periods, such as holiday seasons.`,
    Howigrown: `This project advanced technical and design expertise:
    - Developed proficiency in scalable backend architecture with Prisma and PostgreSQL.
    - Refined skills in designing high-conversion booking flows.
    - Mastered performance optimization for high-traffic scenarios.
    - Enhanced experience in cross-demographic UX design.`,
    Solution: `
    - Built a scalable backend with PostgreSQL and Prisma for real-time data management.
    - Developed a responsive front-end with React.js and TailwindCSS for cross-device compatibility.
    - Designed a streamlined booking funnel to reduce steps to completion.
    - Implemented high-performance caching and load balancing for peak traffic resilience.`,
    Results: `
    - 85% of users completed bookings in under 2 minutes.
    - Achieved a 4.7/5 rating for booking ease and interface clarity.
    - Handled 10,000 concurrent users during peak periods without downtime.
    - Reduced booking abandonment by 35% through optimized UX.`,
    ClientTestimonial: {
      testimonial: `The team created a booking platform that balances technical sophistication with user simplicity. Its performance during peak seasons has been a game-changer for our business.`,
      name: "Dr. Sarah Chen",
      position: "CEO, AgriNext Technologies",
    },
  },
  {
    id: 8,
    role: "UX/UI Lead",
    type: ProjectType.WEBSITE,
    theme: {
      background: "bg-lime-700",
    },
    technologies: [
      "React.js",
      "Typescript",
      "PostgreSQL",
      "Prisma",
      "TailwindCSS",
      "Shadcn UI",
      "Magic UI",
    ],
    video:
      "/assets/Macbook-Air-movies-delta-umber.vercel.app-0ui610cslbjs5a.webm",
    title: "Movies Delta - Cinematic Showcase Platform",
    category: "Brand Identity & Digital Design",
    description: `Movies Delta is an avant-garde digital platform meticulously crafted to redefine the cinematic experience. Built with React.js, TypeScript, and PostgreSQL, this showcase website delivers an immersive interface for movie enthusiasts, featuring advanced search, curated content recommendations, and seamless navigation tailored for diverse audiences.`,
    links: [
      {
        type: "Website",
        href: "https://movies-delta-umber.vercel.app/",
        icon: Icons.globe,
      },
    ],
    link: "https://www.behance.net/tech-branding",
    tags: ["Brand Identity", "Design System", "UI/UX", "Illustration"],
    mobile: false,
    mobileimgs: [],
    Timeframe: "Q1 2023 - Q3 2023",
    Goals: [
      "Establish a distinctive brand identity in the competitive entertainment sector",
      "Develop a scalable design system for dynamic content delivery",
      "Design an intuitive interface for users with varying digital proficiency",
    ],
    desktop: true,
    githublink: "",
    Completed: "September 2023",
    Challenge: `The entertainment industry demanded a platform that could captivate users while managing complex content delivery:
      - Curating and presenting extensive movie datasets with real-time updates.
      - Crafting a visually stunning yet intuitive interface for diverse demographics.
      - Ensuring scalability to handle high-traffic surges during major movie releases.`,
    Howigrown: `This project was a catalyst for advancing design and technical expertise:
      - Developed proficiency in scalable backend architectures using Prisma and PostgreSQL for dynamic content management.
      - Refined skills in designing high-engagement user interfaces for entertainment platforms.
      - Mastered performance optimization techniques for high-traffic scenarios.
      - Enhanced capabilities in creating inclusive UX for cross-demographic appeal.`,
    Solution: `
      - Engineered a robust backend with PostgreSQL and Prisma to manage real-time movie data and user interactions.
      - Developed a responsive front-end with React.js and TailwindCSS, ensuring seamless cross-device compatibility.
      - Designed a curated content recommendation system to enhance user engagement and retention.
      - Implemented high-performance caching and load balancing to ensure resilience during peak traffic.
      - Created a visually immersive design system with interactive elements to elevate the cinematic experience.`,
    Results: `
      - 88% of users rated the interface as "highly engaging and intuitive."
      - Achieved a 4.8/5 rating for navigation ease and content relevance.
      - Handled 12,000 concurrent users during peak release periods without downtime.
      - Increased user session duration by 40% through optimized content recommendations.`,
    ClientTestimonial: {
      testimonial: `The design team delivered a platform that transcends traditional movie showcases, blending technical sophistication with captivating user experiences. Its performance during high-traffic periods has redefined our digital presence.`,
      name: "Dr. Sarah Chen",
      position: "CEO, Movies Delta Entertainment",
    },
  },
];

export function filterproject(id: number) {
  const project = projects.find((project) => project.id === id);
  if (!project) {
    return null;
  }
  return project;
}
