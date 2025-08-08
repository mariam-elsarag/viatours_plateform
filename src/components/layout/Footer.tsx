import React from "react";
import { Logo, LogoLight, LogoLightSm } from "../../assets/images/images";
import { Link } from "react-router-dom";

const footerList = [
  {
    title: "Main pages",
    list: [
      { link: "/", link_name: "Home" },
      { link: "packages", link_name: "Packages" },
      { link: "/travel-guides", link_name: "Travel Guides" },
    ],
  },
  {
    title: "support",
    list: [
      { link: "terms", link_name: "Terms and conditions" },
      { link: "privacy", link_name: "Privacy policy" },
    ],
  },
];
const Footer = () => {
  return (
    <footer className="bg-primary-700 py-6 sm:py-8">
      {/* top */}
      <section className="container grid grid-cols-1 sm:grid-cols-[300px_1fr_1fr] lg:grid-cols-[400px_1fr_1fr] gap-8 sm:gap-6 py-6 ">
        <div className="flex flex-col gap-4 sm:gap-6">
          <img
            src={LogoLight}
            alt="logo"
            className="w-fit sm:flex h-[28px] sm:h-[32px]"
          />

          <p className="text-neutral-300 max-w-[250px] body_lg">
            Book your trip in minute, get full Control for much longer.
          </p>
        </div>
        {footerList?.map((item) => (
          <div key={item?.title} className="flex flex-col gap-4 sm:gap-6">
            <h2 className="text-neutral-200 font-semibold title_lg">
              {item?.title}
            </h2>
            <div className="flex flex-col gap-2 sm:gap-4">
              {item?.list?.map((nav) => (
                <Link
                  key={nav.link}
                  to={nav.link}
                  className="text-neutral-300 body_lg"
                >
                  {nav?.link_name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
      {/* bootom */}
      <p className="container text-neutral-300 py-4 text-center border-t border-primary-500 body_lg">
        All rights reserve &copy; viatours
      </p>
    </footer>
  );
};

export default Footer;
