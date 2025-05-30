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
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
          Artists
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div className="py-1">
          {artists.map((name, index) => (
            <MenuItem key={index}>
              <Link
                to={`/concerts/artist/${encodeURIComponent(name)}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {name}
              </Link>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
