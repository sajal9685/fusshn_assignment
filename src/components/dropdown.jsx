import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const concertsRef = dbRef(db, "concerts");

    const unsubscribe = onValue(concertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const artistSet = new Set();
        Object.values(data).forEach((concert) => {
          if (concert.artist_name) {
            artistSet.add(concert.artist_name);
          }
        });
        setArtists(Array.from(artistSet));
      } else {
        setArtists([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#ECEFCA] px-4 py-2 text-sm font-semibold text-[#213448] shadow-md ring-1 ring-[#94B4C1] hover:bg-[#94B4C1] hover:text-white transition">
          Artists
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-[#547792]"
          />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#ECEFCA] shadow-lg ring-1 ring-[#94B4C1] focus:outline-none">
        <div className="py-1">
          {artists.map((name, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <Link
                  to={`/concerts/artist/${encodeURIComponent(name)}`}
                  className={`block px-4 py-2 text-sm rounded ${
                    active
                      ? "bg-[#94B4C1] text-white"
                      : "text-[#213448] hover:bg-[#94B4C1] hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
