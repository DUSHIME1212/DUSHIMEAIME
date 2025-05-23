import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  testimonial: string;
}

export const links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Work", href: "/works" },
  {
    title: "Resume",
    href: "https://docs.google.com/document/d/1x5Tt1xOyvsUtmal1Ba1ZVVL0qlDbttVsVh4CAYvwpgo/edit?usp=sharing",
  },
  { title: "gallery", href: "/gallery" },
  // { title: "Testimonial", href: "/testimonials" },
  // { title: "Contact", href: "/contact" },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO, TechCorp",
    image: "https://i.pravatar.cc/150?img=1",
    testimonial:
      "I had the pleasure of working with Jordyn during her summer internship at Adobe, where she made a significant impact on our team. Jordyn worked on a complex disambiguation project for our AI Assistant product, and from day one, she demonstrated an exceptional level of independence and initiative. She approached challenges with a sharp mind, always eager to learn and contribute, which made her an invaluable asset to our team. Beyond her technical skills, Jordyn brought a vibrant energy to the workplace—her enthusiasm, sense of humor, and positive attitude made her a joy to work with every day. She’s not only smart and resourceful but also a natural self-starter who doesn’t shy away from taking on new challenges. Jordyn’s contributions were truly appreciated, and I have no doubt she will excel in any future endeavor. Hoping to work with her again in any capacity, she's a true gem to work with.",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Product Manager, InnovateTech",
    image: "https://i.pravatar.cc/150?img=2",
    testimonial:
      "I worked with Jordyn in WhatsApp payments while she was an intern. Her product thinking, thoroughness and self motivation were evident from our first 1:1. For example, by the time we met for the first time she had read all the research and came with questions. Then throughout there internship she provided updates and thoughtfully incorporated the feedback provided. Further, given limited resources, she did extensive in-depth secondary research to inform designs. Overall it was a pleasure to have the opportunity to work with Jordyn. She is a delight to work with and a valuable asset to any team.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    title: "Lead Developer, CodeMasters",
    image: "https://i.pravatar.cc/150?img=3",
    testimonial:
      "Jordyn was initially brought onto the team as a Product Designer, a position in which her UX Design and cross-functional collaboration skills really shined. Almost immediately after being onboarded onto the team, Jordyn demonstrated outstanding technical skills as well as leadership capabilities as she generously took it upon herself to mentor less-experienced members of our team.",
  },
];

export const experience = [
  {
    title: "Product Designer",
    company: "Code Empowerment Progress ",
    location: "Kigali, Kigali City, Rwanda",
    dates: "Oct 2024 - Present · 3 mos",
    description:
      "I collaborate with cross-functional teams to craft user-centered products, guiding a team of 20+ individuals in design, user experience research, and product strategy. I nurture the growth of our design system, ensuring seamless integration with our cloud-based software suite. By harnessing the power of APIs, LLMs, and NLP, I create intuitive interfaces that streamline backend processes and drive organizational efficiency. I champion design strategies that balance user needs with business objectives, delivering modern enterprise solutions that delight and inspire."
  },
  {
    title: "Creative Director",
    company: "Founders' Society",
    location: "Kigali City, Rwanda · Hybrid",
    dates: "Sep 2024 - Present · 4 mos",
    description:
      "I developed visual concepts that align with our brand identity and ensure that our designs communicate the right message.I ensure that our design work maintains a high standard of quality and consistency. Staying updated on design trends is essential, as it helps us innovate and keep our work fresh."
  },
  {
    title: "Digital Marking Intern",
    company: "Extern · Internship",
    location: "United States · Remote",
    dates: "Mar 2024 - Present · 10 mos",
    description:
      "SEO keyword-optimized blog posts to enhance the website's search engine visibility.."
  },
];
