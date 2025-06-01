import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import app from '../firebase'; // ensure this path is correct

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
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) =>
              editUserId === user.uid ? (
                <tr key={user.uid} className="bg-yellow-50">
                  <td className="p-3 border">
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      name="firstName"
                      value={editData.firstName || ''}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                      placeholder="First Name"
                    />
                    <input
                      name="lastName"
                      value={editData.lastName || ''}
                      onChange={handleChange}
                      className="w-full border p-1 rounded mt-1"
                      placeholder="Last Name"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      name="email"
                      value={editData.email || ''}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      name="phone"
                      value={editData.phone || ''}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                    />
                  </td>
                  <td className="p-3 border">
                    <input
                      name="age"
                      value={editData.age || ''}
                      onChange={handleChange}
                      className="w-full border p-1 rounded"
                      type="number"
                    />
                  </td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditUserId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={user.uid}>
                  <td className="p-3 border">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No photo</span>
                    )}
                  </td>
                  <td className="p-3 border">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.phone}</td>
                  <td className="p-3 border">{user.age}</td>
                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.uid)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
