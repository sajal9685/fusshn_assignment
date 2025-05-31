import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
import Dropdown from '../components/dropdown'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
      
        const photoRef = ref(db, `users/${currentUser.uid}/photo`);
        const snapshot = await get(photoRef);
        if (snapshot.exists()) {
          setPhotoBase64(snapshot.val());
        } else {
          setPhotoBase64(null);
        }
      } else {
        setPhotoBase64(null);
      }
    });

    return () => unsubscribe();
  }, []);


const navigation = [
  { name: 'Available Concerts', href: '/concert' },
  { name: 'Artists', href: '/concerts/artist' },
 
];
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => 
                      item.name === 'Artists' ? (
        <Dropdown key={item.name} />)
        : (
                      <a
                       key={item.name}
          href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                      )
    )}
                  </div>
                </div>
              </div>

              {/* Optional profile dropdown - you can remove this if not needed */}
             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
  {user ? (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
          className="h-8 w-8 rounded-full"
          src={photoBase64 || 'https://via.placeholder.com/150'}
          alt="Profile"
        />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem>
          {({ active }) => (
            <a
              href={`/profile/${user.uid}`}
              className={classNames(
                active ? 'bg-gray-100' : '',
                'block px-4 py-2 text-sm text-gray-700'
              )}
            >
              Your Profile
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ active }) => (
            <button
              onClick={() => {
                const auth = getAuth();
                signOut(auth);
              }}
              className={classNames(
                active ? 'bg-gray-100' : '',
                'block w-full text-left px-4 py-2 text-sm text-gray-700'
              )}
            >
              Sign Out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  ) : (
    <a
      href="/signIn"
      className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
    >
      Sign In
    </a>
  )}
</div>


            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
