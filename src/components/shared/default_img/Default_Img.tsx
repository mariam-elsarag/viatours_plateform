import React from "react";

type DefautlImgType = {
  avatar: string | null;
  shape?: "full" | "lg";
  size?: "sm" | "lg";
};
const Default_Img: React.FC<DefautlImgType> = ({
  avatar,
  shape = "full",
  size = "sm",
}) => {
  const round = {
    full: "rounded-full",
    lg: "rouded-lg",
  };

  const sizes = {
    lg: "w-[60px] h-[60px]",
    sm: "w-9 h-9",
  };
  return (
    <figure
      className={` border border-neutral-200 ${round[shape]} ${sizes[size]} `}
    >
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className={`w-full h-full  ${round[shape]} object-cover `}
        />
      ) : (
        <div
          className={`w-full h-full  ${round[shape]} object-cover bg-neutral-100 `}
        />
      )}
    </figure>
  );
};

export default Default_Img;
