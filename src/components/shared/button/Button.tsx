import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../loader/Spinner";

interface buttonPropsType {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  type?:
    | "primary"
    | "error"
    | "outline"
    | "error_outline"
    | "error_tertiery"
    | "tertiery";
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
  round = "xl",
  size = "lg",
  hasFullWidth = true,
  iconRight,
  iconLeft,
  loaderDir,
}) => {
  const radious = {
    xl: "rounded-xl",
    lg: "rounded-xl",
    full: "rounded-full",
  };
  const sizes = {
    lg: "h-[48px] body_lg",
    sm: "h-[38px] body_md ",
    md: "h-[40px] body_lg font-medium ",
  };
  const base = ` ${radious[round]} ${
    sizes[size]
  } text-nowrap body_lg outline-none px-4  ${
    hasFullWidth ? "w-full" : "w-fit"
  }   font-normal  flex items-center justify-center gap-2    transation-all ease-in-out duration-300 ${
    disabled || loading ? "cursor-not-allowed" : "cursor-pointer"
  }`;
  const styles = {
    primary: `${base} border-primary-500 bg-primary-500 text-white hover:bg-primary-600 `,
    outline: `${base} border border-neutral-300 text-neutral-600 hover:bg-neutral-50 `,
    tertiery: `${base} b text-primary-500  hover:bg-neutral-50 `,
    error: `${base} bg-error-700 hover:bg-error-600 text-white`,
    error_outline: `${base} border border-error-700 text-error-700 hover:bg-error-50 `,
    error_tertiery: `${base}  text-error-700 hover:bg-error-50 `,
  };
  const spinnerFillColor = {
    primary: "!fill-white",
    outline: "!fill-primary-500",

    error: "!fill-error-500",
  };
  if (to)
    return (
      <Link to={to} target={target} className={`${styles[type]} ${className}`}>
        {iconLeft}
        {children}
        {iconRight}
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
      {loading
        ? loaderDir === "right" && (
            <Spinner className={spinnerFillColor[type]} />
          )
        : iconRight}
      {children && children}
      {loading
        ? loaderDir === "left" && <Spinner className={spinnerFillColor[type]} />
        : iconLeft}
    </button>
  );
};

export default Button;
