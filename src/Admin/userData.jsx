import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import app from '../firebase';

export default function UserData() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, 'Users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.entries(data).map(([uid, user]) => ({
          uid,
          ...user,
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user.uid);
    setEditData(user);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const db = getDatabase(app);
    const userRef = ref(db, `Users/${editUserId}`);
    update(userRef, editData);
    setEditUserId(null);
  };

  const handleDelete = (uid) => {
    const db = getDatabase(app);
    const userRef = ref(db, `Users/${uid}`);
    if (confirm("Are you sure you want to delete this user?")) {
      remove(userRef);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-light rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-primary">👥 All Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <>
          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-md border border-accent">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-accent text-white">
                <tr>
                  <th className="p-3 text-left">Photo</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) =>
                  editUserId === user.uid ? (
                    <tr key={user.uid} className="bg-yellow-50">
                      <td className="p-3">
                        <img
                          src={user.photo}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="firstName"
                          value={editData.firstName || ''}
                          onChange={handleChange}
                          className="border rounded w-full mb-1 p-1"
                        />
                        <input
                          name="lastName"
                          value={editData.lastName || ''}
                          onChange={handleChange}
                          className="border rounded w-full p-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="email"
                          value={editData.email || ''}
                          onChange={handleChange}
                          className="border rounded w-full p-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="phone"
                          value={editData.phone || ''}
                          onChange={handleChange}
                          className="border rounded w-full p-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          name="age"
                          type="number"
                          value={editData.age || ''}
                          onChange={handleChange}
                          className="border rounded w-full p-1"
                        />
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditUserId(null)}
                          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={user.uid} className="hover:bg-gray-50">
                      <td className="p-3">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="italic text-gray-400">No photo</span>
                        )}
                      </td>
                      <td className="p-3">{user.firstName} {user.lastName}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.age}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.uid)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Card view for mobile */}
          <div className="md:hidden space-y-4 mt-4">
            {users.map((user) => (
              <div
                key={user.uid}
                className="bg-white border border-accent rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={user.photo || 'https://via.placeholder.com/80'}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-primary">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1 mb-3">
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.uid)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
