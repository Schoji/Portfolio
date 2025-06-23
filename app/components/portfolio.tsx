"use client";
import Image from "next/image";
import React from "react";
import CustomBadge from "./badge";
import { ChevronRight, Code } from "lucide-react";
import { motion } from "motion/react";
import { SiGithub } from "react-icons/si";

const Portfolio = ({
  imageSource,
  title,
  description,
  features,
  technologies,
  invertOrder = false,
  phone = true,
  buttonText = null,
  buttonURL = null,
}: {
  imageSource: string;
  title: string;
  description: string;
  features: Array<string>;
  technologies: Array<string>;
  invertOrder: boolean;
  phone: boolean;
  buttonText: string | null;
  buttonURL: string | null;
}) => {
  return (
    <div className="p-4 sm:p-8 md:p-12 lg:p-20 min-h-screen gap-10 md:gap-16 lg:gap-20 grid grid-cols-1 lg:grid-cols-2 items-center border-b border-zinc-600">
      <div className={invertOrder ? "lg:order-2" : "lg:order-1"}>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {phone ? (
            <div className="mockup-phone border-2">
              <div className="mockup-phone-display relative">
                <Image
                  className=""
                  src={imageSource}
                  alt="Portfolio"
                  fill={true}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ) : (
            <div className="mockup-window border border-zinc-500">
              <div className="relative w-full p-2">
                <Image
                  className="object-contain"
                  src={imageSource}
                  alt="Portfolio"
                  width={3796}
                  height={1842}
                  layout="responsive"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 900px"
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <div className={invertOrder ? "lg:order-1" : "lg:order-2"}>
        <motion.div
          className="flex flex-col p-2 sm:p-4 md:p-6 justify-center gap-4 md:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-zinc-400 text-base sm:text-lg">{description}</p>
          <div></div>
          <div className="flex gap-2 items-center">
            <ChevronRight size={18} />
            <p className="font-bold">Key Features</p>
          </div>
          <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-2 sm:gap-3 text-zinc-400 pl-5">
            {features.map((feature, index) => (
              <li key={index} className="text-zinc-400 p-1">
                {feature}
              </li>
            ))}
          </ul>
          <div></div>
          <div className="flex gap-2 items-center">
            <Code size={18} />
            <p className="font-bold">Technologies</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {technologies.map((technology, index) => (
              <CustomBadge key={index} content={technology} />
            ))}
          </div>
          <div></div>
          <div className="flex">
            {buttonText != null ? (
              <a
                className="btn rounded-2xl text-sm sm:text-base"
                href={buttonURL ?? undefined}
              >
                <SiGithub />
                {buttonText}
              </a>
            ) : (
              <button
                className="btn rounded-2xl text-sm sm:text-base"
                disabled={true}
              >
                Currently in development
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
