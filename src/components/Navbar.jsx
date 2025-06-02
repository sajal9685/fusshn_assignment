// Navbar.jsx
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/tickets.svg"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const navigation = [
    { name: "Available Concerts", href: "/concert" },
    { name: "Artists", href: "/concerts/artist" },
  ];

  return (
    <Disclosure as="nav" className="bg-[#213448]">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Left: Logo and Nav */}
              <div className="flex items-center space-x-6">
                <Link to="/">
                  <img
                    className="h-12 w-auto"
                    src={logo}
                    alt="Logo"
                  />
                </Link>
                <div className="hidden sm:flex sm:space-x-4">
                  {navigation.map((item) =>
                    item.name === "Artists" ? (
                      <Dropdown key={item.name} />
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-[#ECEFCA] hover:bg-[#547792] hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium transition"
                        )}
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Right: User Menu or Sign In */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <button
                    onClick={() => navigate(`/profile/${user.uid}`)}
                    className="text-[#ECEFCA] text-xl hover:text-[#94B4C1] transition"
                    title="Profile"
                  >
                    👤
                  </button>
                ) : (
                  <Link
                    to="/signIn"
                    className="text-sm font-medium text-[#213448] bg-[#94B4C1] hover:bg-[#547792] hover:text-white px-4 py-2 rounded-md transition"
                  >
                    Sign In
                  </Link>
                )}
                <div className="sm:hidden">
                  <DisclosureButton className="p-2 text-[#ECEFCA] hover:text-white hover:bg-[#547792] rounded-md transition">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="sm:hidden px-4 pb-4 pt-2 space-y-2 bg-[#213448]">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#ECEFCA] hover:bg-[#547792] hover:text-white transition"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
