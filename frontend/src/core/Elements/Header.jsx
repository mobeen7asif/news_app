import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { currentUser } from "./Utils";
import { UserMenu } from "./UserMenu";

const Header = () => {
  const { pathname } = useLocation();
  const currentSlug = pathname.slice(1);

  return (
    <Disclosure as="nav" className="bg-background shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-secondary hover:text-text focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className="font-bold text-2xl text-primary">
                    News App
                  </h1>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className={`${
                      currentSlug
                        ? "text-text hover:text-primary"
                        : "text-primary border-b-2 border-accent"
                    } inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
                  >
                    Home
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Disclosure.Button
                as={Link}
                to="/"
                className={`${
                  currentSlug ? "text-text" : "text-primary bg-secondary bg-opacity-20"
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Home
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
