import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { sendPostRequest } from "../ApiService";
import { Link } from "react-router-dom";

export function UserMenu({ currentUser }) {
  const onClickSignOut = (e) => {
    e.preventDefault();

    sendPostRequest("logout").then(function (response) {
      if (response.status) {
        localStorage.removeItem("currentUser");
        window.location.reload();
      }
    });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const userMenuItems = [
    { label: "Home", href: "/" },
    { label: "Preferences", href: "/preferences" },
    { label: "Sign out", href: "#", onClick: onClickSignOut },
  ];

  const authMenuItems = [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  return (
    <>
      {currentUser() ? (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
              <span className="mr-2">{currentUser()?.name}</span>
              <ArrowDownCircleIcon
                className="h-5 w-5 text-secondary"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userMenuItems.map((menuItem) => (
                <Menu.Item key={menuItem.label}>
                  {({ active }) => (
                    <Link
                      to={menuItem.href}
                      className={classNames(
                        active ? "bg-secondary bg-opacity-10" : "",
                        "block px-4 py-2 text-sm text-text hover:text-primary"
                      )}
                      onClick={menuItem.onClick}
                    >
                      {menuItem.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <div className="flex space-x-4">
          {authMenuItems.map((menuItem) => (
            <Link
              key={menuItem.label}
              to={menuItem.href}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              {menuItem.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
