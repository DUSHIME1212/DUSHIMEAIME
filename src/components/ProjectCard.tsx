import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "~/lib/utils";
import { Badge } from "./ui/badge";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates?: string;
  tags?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Link
      href={href || "#"}
      className={
        "relative flex rounded-2xl h-full min-h-96 flex-col overflow-hidden border bg-none transition-all duration-300 ease-out hover:shadow-lg"
      }
    >
      <div className="absolute size-full bg-gradient-to-b from-transparent to-yellow-700/50 to-50%" />
      <div
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-72 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="-z-10 h-72 w-full overflow-hidden object-cover object-top"
          />
        )}
      </div>
      <div className="absolute bottom-0 left-4 right-4 p-2 md:p-4 lg:p-8">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-xl text-muted lg:w-2/3">
            {title}
          </CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted dark:prose-invert">
            <Markdown>
              {description}
            </Markdown>
          </div>
        </div>
      </div>
      <CardContent className="x-2 mt-auto flex flex-col px-2 md:px-4 lg:w-2/3 lg:px-8">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2 md:px-4 lg:px-8">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Link>
  );
}
