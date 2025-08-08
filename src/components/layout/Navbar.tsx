import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth/Auth_Context";
import { Logo } from "../../assets/images/images";
import Button from "./../shared/button/Button";
import {
  BoxIcon,
  BurgerIcon,
  FlightIcon,
  HomeIcon,
  LoginIcon,
  UserIcon,
} from "./../../assets/icons/Icon";
import { useOutsideClick } from "../../hooks/useOutsideClick";
const navLink = [
  { link: "/", link_name: "Home", icon: HomeIcon },
  { link: "packages", link_name: "Packages", icon: BoxIcon },
  { link: "/travel-guides", link_name: "Travel Guides", icon: FlightIcon },
];

const Navbar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  return (
    <>
      <header className="container py-4 main_shadow flex items-center justify-between gap-4  ">
        <Link to="/">
          <img src={Logo} alt="logo" className="h-[24px] sm:h-[28px]" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLink?.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `body_lg text-neutral-500 font-medium  transition-color ease-in-out duration-200 hover:text-primary-500  ${
                  isActive ? "text-primary-500" : ""
                } `
              }
              to={item?.link}
            >
              {item?.link_name}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2 w-fit">
          <Button size="sm" type="outline" to="/account">
            Sign In
          </Button>
          <Button size="sm"> Sign Up </Button>
        </div>
        <Button
          iconLeft={<BurgerIcon />}
          hasFullWidth={false}
          type="tertiery"
          size="sm"
          className="!w-[40px] !px-0 flex md:hidden"
          onClick={() => setToggleNavbar((pre) => !pre)}
        />
      </header>
      <Mobile_Navbar
        isOpen={toggleNavbar}
        onClose={() => setToggleNavbar(false)}
      />
    </>
  );
};
const Mobile_Navbar = ({ isOpen, onClose }) => {
  const { token, user, logout } = useAuth();
  const ref = useOutsideClick(onClose);
  const userNavList = [
    { link: "/profile", link_name: "Profile", icon: UserIcon },
  ];
  const additionalList = !token ? userNavList : [];
  return (
    <div
      className={`flex md:hidden ${
        isOpen ? "fixed bg-black/5 inset-0 z-30" : ""
      } `}
    >
      <div
        ref={ref}
        className={`bg-white w-[260px] fixed h-dvh rounded-tr-2xl rounded-br-2xl py-8 px-6 transition-all ease-in-out duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col justify-between gap-12  `}
      >
        <Link to="/" className="flex_center" onClick={onClose}>
          <img src={Logo} alt="logo" className="h-[26px] " />
        </Link>{" "}
        <nav className="flex flex-col gap-6 flex-1">
          {[...navLink, ...additionalList].map((item) => {
            const Icon = item?.icon;
            return (
              <NavLink key={item?.link} to={item?.link} onClick={onClose}>
                {({ isActive }) => (
                  <div
                    className={`body_lg text-neutral-500 font-medium transition-colors ease-in-out duration-200  ${
                      isActive ? "text-primary-500" : ""
                    } flex items-center gap-2`}
                  >
                    {item?.icon && (
                      <Icon
                        fill={
                          isActive
                            ? "var(--color-primary-500)"
                            : "var(--color-icon)"
                        }
                      />
                    )}
                    {item?.link_name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
        <footer className="flex flex-col gap-6">
          {token ? (
            <>
              <Button
                size="md"
                round="lg"
                type="error_tertiery"
                onClick={() => {
                  logout();
                  onClose();
                }}
                iconLeft={
                  <span className="rotate-180">
                    <LoginIcon fill="var(--color-error-700)" />
                  </span>
                }
                className=" !justify-start !text-start"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              size="md"
              round="lg"
              type="tertiery"
              to="/account"
              onClick={onClose}
              iconLeft={<LoginIcon fill="var(--color-primary-500)" />}
              className=" !justify-start !text-start"
            >
              Sign In
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};
export default Navbar;
