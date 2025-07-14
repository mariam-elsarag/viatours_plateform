import React, { type FC } from "react";

type UnauthHeaderType = {
  title: string | null;
  description?: string | null | React.ReactNode;
};

const Unauth_Header: FC<UnauthHeaderType> = ({ title, description }) => {
  return (
    <header className="flex flex-col gap-6">
      {title && (
        <h1 className="text-slate-950 font-bold headline_lg">{title}</h1>
      )}
      {description && (
        <div className="body_md text-slate-500">{description}</div>
      )}
    </header>
  );
};

export default Unauth_Header;
