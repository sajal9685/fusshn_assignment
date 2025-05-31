import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebase'; // make sure this path is correct

export default function UserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, 'Users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const userList = Object.entries(data).map(([uid, user]) => ({
          uid,
          ...user,
        }));
        setUsers(userList);
      } else {
        console.warn('No user data found');
        setUsers([]);
      }
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.uid}
              className="p-4 bg-white shadow-md rounded-lg border"
            >
              <div className="flex items-center gap-4">
                {user.photo && (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border object-cover"
                  />
                )}
                <div>
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
