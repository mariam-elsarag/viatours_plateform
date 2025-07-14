import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../loader/Spinner";

interface buttonPropsType {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  type?: "primary" | "error" | "outline" | "error_outline";
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  round?: "lg" | "full";
  size?: "lg" | "md" | "sm";
  hasFullWidth?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;

  loaderDir?: "right" | "left";
}

const Button: React.FC<buttonPropsType> = ({
  children,
  onClick,
  to,
  type = "primary",
  buttonType = "submit",
  disabled,
  loading,
  className,
  target,
  round = "lg",
  size = "lg",
  hasFullWidth = true,
  iconRight,
  iconLeft,
  loaderDir,
}) => {
  const radious = {
    lg: "rounded-xl",
    full: "rounded-full",
  };
  const sizes = {
    lg: "h-[48px] ",
    sm: "h-[38px] ",
    md: "h-[40px] ",
  };
  const base = ` ${radious[round]} ${sizes[size]} body_lg outline-none  ${
    hasFullWidth ? "w-full" : "w-fit"
  }   font-normal  flex items-center justify-center gap-2  px-4  transation-all ease-in-out duration-300 ${
    disabled || loading ? "cursor-not-allowed" : "cursor-pointer"
  }`;
  const styles = {
    primary: `${base} border-primary-500 bg-primary-500 text-white hover:bg-primary-600 `,
    outline: `${base} border border-slate-300 text-slate-600 hover:bg-slate-50 `,
    error: `${base} bg-error-700 hover:bg-error-600 text-white`,
    error_outline: `${base} border border-error-700 text-error-700 hover:bg-neutral-50 `,
  };
  const spinnerFillColor = {
    primary: "!fill-white",
    outline: "!fill-primary-500",

    error: "!fill-error-500",
  };
  if (to)
    return (
      <Link to={to} target={target} className={`${styles[type]} ${className}`}>
        {iconRight}
        {children}
        {iconLeft}
      </Link>
    );
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      type={buttonType}
      className={`${styles[type]} ${className}`}
    >
      {" "}
      {loading ? (
        loaderDir === "right" && <Spinner className={spinnerFillColor[type]} />
      ) : (
        <span>{iconRight}</span>
      )}
      {children}
      {loading ? (
        loaderDir === "left" && <Spinner className={spinnerFillColor[type]} />
      ) : (
        <span>{iconLeft}</span>
      )}
    </button>
  );
};

export default Button;
