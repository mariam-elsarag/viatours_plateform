import React from "react";
import { Outlet } from "react-router-dom";
import { AuthImg, Logo } from "../assets/images/images";

const Unauth_Layout = () => {
  return (
    <section className="container flex flex-row-reverse h-full md:min-h-[710px] overflow-hidden   gap-6">
      <figure className=" auth_right_img w-1/2 h-[710px] hidden md:flex flex-col items-center justify-center text-center gap-10 ">
        <img
          src={AuthImg}
          alt="img"
          className="max-w-[350px] lg:max-w-[400px] xl:max-w-[500px]"
        />
        <figcaption className="max-w-[350px] lg:max-w-[450px] xl:max-w-[500px] flex flex-col gap-6">
          <h1 className="text-gray-50 headline_md font-bold">
            Introducing new features
          </h1>
          <p className="text-gray-100 title_xl">
            Analyzing previous trends ensures that businesses always make the
            right decision. And as the scale of the decision and it’s impact
            magnifies...
          </p>
        </figcaption>
      </figure>
      <div className=" px-4 lg:px-10 py-10 h-full md:min-h-[710px] flex-1 w-full flex flex-col gap-10 sm:gap-20   ">
        <header>
          <img src={Logo} alt="logo" className="h-[28px] sm:h-[32px]" />
        </header>
        <div className="max-w-[550px] mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Unauth_Layout;
