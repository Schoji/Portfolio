import { motion } from "motion/react";
import React, { useState } from "react";

const Card = ({
  icon: Icon,
  title,
  description,
  name,
  url,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  name: string;
  url: string | null;
}) => {
  const [toastVisibility, setToastVisibility] = useState<boolean>(false);
  const [toastContent, setToastContent] = useState<string>(
    "Discord username was copied to clipboard!"
  );
  const sendToast = (content: string) => {
    setToastVisibility(true);
    setToastContent(content);
    setTimeout(() => {
      setToastVisibility(false);
    }, 5000);
  };
  return (
    <>
      <motion.a
        className="card card-dash bg-zinc-900 border border-zinc-800 hover:border-blue-600 rounded-xl w-full hover:bg-neutral hover:cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        href={url ?? undefined}
        onClick={
          url == null
            ? () => {
                navigator.clipboard.writeText(name);
                sendToast("Link was copied to clipboard.");
              }
            : undefined
        }
        viewport={{ once: true }}
      >
        <div className="card-body text-center flex flex-col items-center">
          <div className="avatar avatar-online avatar-placeholder">
            <div className="bg-zinc-800 text-neutral-content w-16 rounded-full">
              <Icon size={24} />
            </div>
          </div>
          <div></div>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-zinc-400">{description}</p>
          <p className="text-zinc-500">{name}</p>
        </div>
      </motion.a>
      {toastVisibility ? (
        <div className="toast z-50 bg-zinc-900 border-zinc-950 ">
          <div className="alert alert-info">
            <span>{toastContent}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Card;
