"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { easeInOut, motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDownRight, ArrowUpRight } from "@geist-ui/icons";
import { TextAnimate } from "./magicui/text-animate";
import { jobs } from "~/lib/projects";
import { BlurFade } from "./magicui/blur-fade";
import { Badge } from "./ui/badge";
import { fetchExperience } from "~/lib/sanity/experience";
import Imigongo from "./Imigongo";
import Posters from "./Posters";
import { LinkPreview } from "./ui/link-preview";

const Hero = () => {
  const [experience, setExperience] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchExperience();
        setExperience(response);
      } catch (error) {
        console.error("Error fetching experience data:", error);
      }
    }
    fetchData();
  }, []);

  const typewriterRef = useRef(null);
  const BLUR_FADE_DELAY = 0.04;

  const skills = [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ];

  return (
    <div className="mt-8 flex flex-col gap-8 overflow-clip">
      <div className="relative flex w-full flex-col gap-4 overflow-hidden">
        {/* <div className="absolute top-0 right-0 opacity-30 -z-10  ">
          <Imigongo className="rotate-90" color="black" />
        </div> */}
        <h2 className="group text-gray-700">
          {/* <span className="relative text-blue-800 max-md:text-2xl">
          Dushime Aime
          <svg
            className="absolute -bottom-4 left-4 -translate-x-2 scale-110"
            strokeWidth={2}
            viewBox="0 0 729 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              stroke="blue"
              strokeWidth={10}
              strokeLinecap="round"
              fill="transparent"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: [0, 1],
              }}
              transition={{
                ease: "easeInOut",
              }}
              d="M259.093 53.2118C257.634 53.4414 255.487 53.1202 253.721 53.2622C246.383 53.8543 243.637 53.7758 237.017 54.325C231.394 54.8362 218.118 56.4273 210.541 58.0928C204.278 59.7562 199.403 60.5835 198.939 59.1925C198.939 59.1924 198.939 59.1923 198.939 59.1922C198.928 59.1587 198.919 59.1239 198.913 59.0878C198.794 58.4036 200.939 56.8983 201.047 56.0437C201.155 55.1891 199.304 50.5193 202.598 49.1239C203.739 48.6503 205.299 48.1362 207.049 47.6152C213.551 45.7933 221.148 45.6469 223.293 45.2417C225.219 44.9216 227.462 44.1563 229.848 43.7719C237.611 42.5403 241.683 42.4538 248.574 40.5132C251.491 40.8791 254.354 41.2624 257.161 41.6593C260.82 41.0159 266.468 41.3901 268.599 41.1644C270.382 40.9748 271.532 40.3614 273.347 40.1886C275.418 39.989 278.813 40.2743 282.625 39.8952C288.984 39.2707 290.019 37.8483 293.793 37.3996C297.707 36.9357 303.882 37.2325 308.932 36.4149C309.542 36.225 310.155 36.035 310.772 35.8448C310.3 35.541 309.83 35.2371 309.362 34.9332C311.856 34.6078 313 35.2192 315.377 35.0739C318.129 34.9068 319.424 34.1704 321.289 34.0525C322.793 33.9581 324.982 34.3405 326.864 34.1885C329.687 33.9647 329.027 33.2517 330.558 33.0144C331.239 32.9135 342.447 31.8106 343.172 31.7643C348.024 31.4445 348.457 32.4527 352.396 32.3126C353.098 32.2875 353.804 32.2578 354.514 32.224C354.545 32.2226 354.638 32.2176 354.669 32.217C364.769 31.9895 375.013 30.9357 384.363 30.3783C388.806 30.1125 393.463 30.0457 397.908 30.0928C390.963 32.9173 406.547 34.5603 400.641 30.5844C405.542 31.0437 409.096 29.8375 413.743 29.9096C416.753 29.9573 418.908 30.4766 423.216 30.3567C430.88 30.1397 439.23 28.3175 441.524 31.2078C450.5 30.4816 458.338 31.3758 461.529 28.7074C463.868 28.4969 469.825 29.9145 472.445 30.0685C474.921 30.2113 493.828 30.511 496.926 30.4874C500.02 30.4623 505.434 30.3936 508.032 30.1128C511.299 29.7642 513.537 27.0243 519.418 30.0561C526.204 29.6647 528.583 29.7075 534.914 29.9478C536.056 29.9913 536.194 30.4563 536.86 30.4435C538.236 30.4162 540.543 30.025 543.005 29.9343C547.046 29.7856 549.354 30.7244 548.878 29.2307C551.517 28.9268 554.176 28.6227 556.833 28.3186C557.772 28.5903 558.709 28.8621 559.644 29.1339C561.058 28.7901 562.452 28.4467 563.875 28.1028C562.25 30.3095 572.238 28.831 568.964 27.6469C574.078 27.997 579.313 28.3449 584.415 28.6952C583.771 31.1799 595.732 28.7592 594.686 27.4355C595.282 27.4258 595.876 27.4161 596.469 27.4064C601.654 27.9616 606.389 27.331 612.655 27.6475C618.956 27.963 618.389 28.2147 620.313 29.3132C621.796 29.2184 623.206 29.1249 624.729 29.029C632.467 25.7543 631.188 31.1799 644.426 28.5117C648.662 30.3821 659.211 29.1261 666.044 28.3742C666.871 28.2863 666.878 27.9058 667.967 27.7634C669.186 27.6059 671.246 27.5905 673.041 27.5027C675.311 27.3956 677.193 27.1881 677.055 26.5271C679.316 26.8266 681.736 27.1206 684.038 27.4155C685.855 27.1452 687.843 26.8689 689.711 26.594C689.691 26.2116 689.671 25.8292 689.65 25.4468C693.416 26.6495 699.565 25.9602 702.39 26.1728C703 26.2148 703.178 26.7381 705.009 26.816C707.022 26.9152 711.114 26.5961 713.641 26.6354C714.501 26.008 715.601 25.3653 716.498 24.7285C720.915 24.1474 722.684 25.5627 725.003 25.3568C725.059 25.3502 725.161 25.3361 725.398 25.2906C725.516 25.2678 725.632 25.2419 725.705 25.2222C725.741 25.2126 725.767 25.2046 725.772 25.2021C725.782 25.1999 725.742 25.2024 725.551 25.2913C725.455 25.338 725.319 25.4067 725.121 25.5464C725.071 25.5816 725.018 25.6216 724.96 25.6679C724.927 25.6949 724.916 25.703 724.858 25.754C724.788 25.8149 724.713 25.8851 724.635 25.9673C724.328 26.2882 723.907 26.8486 723.716 27.6928C723.513 28.5297 723.69 29.5217 724.005 30.1245C724.386 30.8289 724.484 30.8451 724.643 31.0337C724.937 31.3347 725.151 31.4689 725.294 31.5583C725.591 31.7291 725.589 31.7055 725.586 31.7109C725.579 31.7099 725.534 31.6957 725.458 31.6755C725.274 31.6262 725.103 31.5886 724.883 31.5434C724.672 31.4999 724.363 31.442 724.117 31.4003C722.017 31.0471 719.745 30.8188 719.542 30.8053C715.709 30.6165 716.613 31.9801 705.606 30.6374C703.567 30.3952 702.088 29.8037 700.263 29.6218C697.121 29.3011 687.378 29.5096 686.59 30.4038C682.787 28.8847 672.538 28.5393 669.441 27.9456C669.162 27.8912 668.952 27.7835 668.717 27.6486C668.198 27.3358 667.562 26.8764 665.604 26.6057C663.283 26.2869 657.428 26.4314 654.456 26.0951C651.401 25.7427 650.374 25.0217 648.986 24.8675C647.693 24.7241 646.364 25.1375 644.647 25.0008C639.125 24.5529 634.183 23.3408 629.745 22.9877C623.454 22.4848 617.711 23.5855 612.34 23.8675C611.006 23.6695 609.751 23.2483 608.383 23.1446C591.32 21.8397 572.036 20.2031 554.926 18.7408C546.965 18.0525 527.314 14.7314 532.376 18.5178C529.535 18.9372 509.571 16.3195 505.707 16.0803C501.898 15.8355 498.828 16.2793 495.812 16.1161C486.749 15.6276 480.377 14.8261 469.299 14.7855C466.442 14.7774 463.346 15.3544 461.655 15.2602C459.615 15.1447 457.469 14.3255 454.834 14.1502C448.55 13.7345 436.832 13.4203 430.806 13.0353C429.706 12.9628 429.347 12.3226 427.781 12.0594C421.68 11.0308 414.8 10.8202 415.937 12.8595C408.12 11.4113 400.809 12.1693 393.527 11.9807C378.142 11.5476 350.069 10.3653 336.665 11.0355C336.005 11.0669 335.398 11.1017 334.835 11.1386C328.118 11.578 327.462 12.2587 315.973 11.4628C313.247 11.2742 310.446 11.0295 307.108 10.8159C299.276 10.3135 292.047 8.68233 286.061 10.7064C277.343 10.243 270.372 10.6923 263.902 9.08857C263.154 9.5078 262.39 9.92764 261.628 10.3478C260.551 10.3752 259.478 10.4033 258.408 10.4321C258.067 10.0489 257.727 9.66589 257.386 9.2829C249.737 9.31119 240.01 11.1388 233.559 11.3098C222.672 11.5506 194.648 12.0046 184.342 12.0201C178.837 12.0094 178.586 12.8598 175.392 11.3092C174.159 11.4926 172.934 11.6765 171.716 11.8609C170.97 12.2763 170.227 12.6919 169.488 13.1077C162.44 13.5046 154.156 13.4101 147.433 13.842C135.247 14.6108 117.056 16.9447 104.769 17.2295C101.725 17.2941 97.8027 16.8279 94.8017 17.0766C90.4356 17.4382 89.4721 18.8036 83.9225 19.2784C83.0006 19.3571 82.0123 19.4272 80.9784 19.4896C70.9935 20.0973 55.5706 20.1424 47.4019 20.9141C44.7474 21.1644 43.5327 21.7429 41.6584 21.9475C33.8954 22.803 27.5461 23.2853 20.1345 24.6377C12.0314 24.0736 12.596 22.435 9.98254 21.0446C8.00645 19.9955 2.00895 17.6838 1.10357 16.6969C0.467166 16.0034 2.53324 14.8711 1.65983 14.1222C11.1923 12.6717 15.2766 13.0557 23.1605 13.5613C37.5572 12.329 51.9152 11.1106 66.2994 9.89178C67.6491 10.2302 68.9572 10.572 70.3283 10.9087C70.3284 10.9097 70.3285 10.9106 70.3286 10.9116C75.2633 10.9697 77.5662 9.92006 80.1513 9.32865C80.46 9.25608 80.7732 9.1906 81.0964 9.13526C109.441 4.17719 165.865 2.22046 197.422 1.32632C204.193 1.06794 226.344 -0.309165 230.989 0.309748C232.206 0.464006 232.562 1.14335 233.858 1.13748C245.314 0.411434 256.777 -0.232513 268.253 -0.794492C290.219 -0.0926393 312.774 -0.774508 335.004 -0.69108C336.692 -0.685031 338.384 -0.674457 340.077 -0.658459C404.472 0.00395872 468.101 2.69921 531.247 6.7977C543.44 7.59423 558.936 8.09774 570.872 9.25213C575.87 9.73402 577.84 10.9791 584.458 10.6171C584.506 10.9194 584.554 11.2217 584.602 11.524C590.341 11.5678 594.059 11.1527 600.437 11.5451C605.885 11.8792 620.053 12.8841 624.873 13.3654C627.337 13.6086 626.379 14.0949 628.658 14.2649C632.624 14.556 641.148 14.438 646.512 14.8572C651.522 15.2469 659.731 16.5399 663.513 16.7494C665.551 16.8636 667.573 16.9638 669.569 17.0549C681.619 17.6244 694.254 17.9779 706.704 19.3556C710.718 19.7989 715.815 21.0556 717.133 21.1896C719.56 21.422 720.507 20.8332 722.154 20.9611C723.324 21.063 724.459 21.1875 725.772 21.4021C726.037 21.4447 726.487 21.5258 726.857 21.6016C727.048 21.6405 727.236 21.6808 727.422 21.7236C727.515 21.745 727.608 21.767 727.7 21.7898C727.807 21.8159 727.966 21.8569 728.1 21.8938C728.379 21.9702 728.662 22.055 728.973 22.1651C729.147 22.228 729.233 22.2572 729.524 22.3792C729.864 22.5262 730.251 22.704 730.772 23.045C731.032 23.2181 731.329 23.4347 731.668 23.7494C731.837 23.9072 732.017 24.0903 732.203 24.3097C732.297 24.4197 732.391 24.537 732.488 24.6687C732.675 24.923 732.865 25.2187 733.042 25.5639C733.81 26.8858 734.01 29.3786 733.248 30.9819C732.908 31.7913 732.47 32.3883 732.075 32.8259C731.876 33.0457 731.684 33.2283 731.504 33.3849C731.396 33.4783 731.337 33.5256 731.257 33.589C730.048 34.4929 729.413 34.6316 728.841 34.8377C724.412 35.8974 722.465 35.6751 719.541 35.8653C713.992 36.0654 708.649 36.0413 704.552 36.1755C694.232 36.4991 683.852 36.7791 673.27 37.0663C656.277 37.5227 639.005 37.965 622.452 38.2194C605.6 38.4788 577.497 39.1476 561.909 38.9245C558.558 38.8761 559.436 38.0899 556.612 38.1452C553.473 38.2068 551.784 38.7594 550.332 38.83C540.203 39.322 517.882 40.2913 508.31 39.9568C506.488 39.892 505.156 39.3168 504.066 39.3413C503.515 39.3526 502.277 39.7892 500.546 39.8669C485.263 40.5544 474.106 40.5509 459.12 40.7411C430.406 41.1117 397.235 42.6657 367.063 43.1772C360.554 43.2871 355.944 42.2483 355.079 42.2887C355.053 42.2899 355.028 42.2912 355.002 42.2926L355.097 42.2883C353.082 42.449 351.772 43.309 347.774 43.7412C334.241 45.1891 315.793 45.5055 302.92 46.8178C296.512 47.4633 287.921 49.1152 281.591 49.8384C276.585 50.3997 264.75 50.9958 262.581 51.6474C261.322 52.0304 260.684 52.9576 259.093 53.2118ZM427.83 30.9145C426.966 32.3208 436.39 30.9453 432.834 30.2855C432.049 30.1363 428.047 30.5493 427.83 30.9145ZM585.694 19.0756C585.752 19.4765 585.811 19.8775 585.869 20.2784C587.118 20.2015 588.361 20.1246 589.6 20.0476C588.927 19.7611 588.253 19.4747 587.577 19.1883C586.951 19.1507 586.323 19.1131 585.694 19.0756Z"
            />
          </svg>
        </span>{" "} */}
          <h4 className="text-gray-900/60">
            I am a{" "}
            <LinkPreview
              url="/"
              imageSrc="/image.png"
              isStatic
              className="font-bold"
            >
              Designer enthusiast based in Rwanda
            </LinkPreview>
            , I craft human centered experiences and scalable systems where
            design meets logic, and emotion meets code. From pixel to product, I
            merge aesthetics with functionality to grow brands and simplify
            lives.I am enthusiastic about joining a dynamic team to{" "}
            <LinkPreview
              url="https://coursera.org/share/45d02afe3a482586006b893d291be290"
              className="font-bold">learn UX best practices</LinkPreview>, collaborate cross-functionally, and
            contribute to innovative tech projects
          </h4>
        </h2>
      </div>
      <BlockinText
        tag={"/support"}
        examples={[
          "I design apps, and websites that blow your mind",
          "I am a UX/UI Designer based in RWANDA",
          "I am a Developer based in RWANDA",
          "My favourite Gerne is Afrobeats",
        ]}
      />
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1 lg:w-1/3">
            {skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  className="bg-blue-700 duration-500 hover:bg-blue-500"
                  key={skill}
                >
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm opacity-60">Currently</p>
        <div className="group m-0 h-fit w-fit px-0 no-underline">
          {experience.map((item, index) => (
            <div
              key={index}
              className="group flex w-full flex-col justify-between gap-2"
            >
              {item.isCurrentlyWorkingHere == true && (
                <Link
                  href={""}
                  className="capitalizer flex w-full items-center justify-between gap-2 text-xl"
                >
                  <img
                    src={item.companyLogo.url}
                    alt=""
                    className="size-16 object-cover"
                  />
                  {item.title}{" "}
                  <span className="font-indie group-hover:text-blue-700 group-hover:underline">
                    {item.company}
                  </span>
                  <ArrowUpRight />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <p className="text-sm opacity-60">previous roles</p>

        <div className="group m-0 h-fit w-fit px-0 no-underline">
          {experience.map((item, index) => (
            <div
              key={index}
              className="group flex w-full flex-col justify-between gap-2"
            >
              {item.isCurrentlyWorkingHere == false && (
                <Link
                  href={""}
                  className="capitalizer flex w-full items-center justify-between gap-2 text-xl"
                >
                  <img
                    src={item.companyLogo.url}
                    alt=""
                    className="size-16 object-cover"
                  />
                  {item.title}{" "}
                  <span className="font-indie group-hover:text-blue-700 group-hover:underline">
                    {item.company}
                  </span>
                  <ArrowUpRight />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant={"gooeyLeft"}
        size={"lg"}
        className="w-fit gap-2 rounded-full bg-blue-700 from-blue-400"
      >
        <Link href={"works"} className="flex items-center">
          View all my work <ArrowUpRight />
        </Link>
      </Button>
    </div>
  );
};

export default Hero;

export function BlockinText({ tag, examples }) {
  return (
    <>
      <Typewrite examples={examples} />
      <hr />
    </>
  );
}

const letterDelays = 0.025;
const Box_fade = 0.125;
const fadedelays = 5;
const Mainfadedelays = 0.25;

const swapdelayms = 5500;

export function Typewrite({ examples }) {
  const [exampleindex, setexampleindex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setexampleindex((pv) => (pv + 1) % examples.length);
    }, swapdelayms);
    return () => clearInterval(intervalId);
  }, [swapdelayms]);
  return (
    <h6>
      {examples[exampleindex].split("").map((l, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={`${exampleindex}-${i}`}
          className="relative"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * letterDelays,
              duration: Box_fade,
              ease: easeInOut,
            }}
            className="font-dmsans text-3xl text-yellow-500"
          >
            {l}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              times: [0, 0.1, 1],
              delay: i * letterDelays,
              duration: Box_fade,
              ease: easeInOut,
            }}
            className="bg-700 absolute bottom-[3px] left-[1px] right-0 top-[3px]"
          />
        </motion.span>
      ))}
    </h6>
  );
}
