import React, { type FC } from "react";

type UnauthHeaderType = {
  title: string | null;
  description?: string | null | React.ReactNode;
  variant?: "start" | "center";
};

const Unauth_Header: FC<UnauthHeaderType> = ({
  title,
  description,
  variant = "start",
}) => {
  const style = {
    center: "text-center items-center justify-center lg:max-w-[450px] mx-auto",
    start: "text-start",
  };
  return (
    <header className={`flex flex-col gap-6 ${style[variant]} `}>
      {title && (
        <h1 className="text-slate-800 font-bold headline_md">{title}</h1>
      )}
      {description && (
        <div className="body_md text-slate-500">{description}</div>
      )}
    </header>
  );
};

export default Unauth_Header;
