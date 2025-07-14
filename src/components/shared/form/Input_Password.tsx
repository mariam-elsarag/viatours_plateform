import React, { useState } from "react";
import { EyeOffIcon, EyeOnIcon } from "../../../assets/icons/Icon";

const Input_Password = ({ error, value, disabled, item, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="flex flex-col gap-1">
      <div
        className={`flex input gap-4 ${disabled ? "disabled" : ""} ${
          error ? "error" : ""
        } focus-within:!border-primary-500 `}
      >
        {item?.icon && <span className="flex_center">{item.icon}</span>}
        <input
          id={item?.id}
          name={item?.name}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          placeholder={item?.placeholder || ""}
          className={`flex-1 ${item?.inputClassName}`}
          onWheel={(e) => e.target.blur()}
          autoComplete="off"
        />
        <span
          className="cursor-pointer"
          onClick={() => setShowPassword((pre) => !pre)}
        >
          {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
        </span>
      </div>
    </section>
  );
};

export default Input_Password;
