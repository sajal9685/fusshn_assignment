// Navbar.jsx
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Dropdown from "../components/dropdown";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Left: Logo and Nav */}
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                  />
                </Link>
                <div className="hidden sm:flex sm:space-x-4 ml-6">
                  {navigation.map((item) =>
                    item.name === "Artists" ? (
                      <Dropdown key={item.name} />
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
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
                    className="text-white text-xl hover:text-indigo-400"
                    title="Profile"
                  >
                    👤
                  </button>
                ) : (
                  <Link
                    to="/signIn"
                    className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                  >
                    Sign In
                  </Link>
                )}
                <div className="sm:hidden">
                  <DisclosureButton className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
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

          <DisclosurePanel className="sm:hidden px-2 pb-3 pt-2 space-y-1">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
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
