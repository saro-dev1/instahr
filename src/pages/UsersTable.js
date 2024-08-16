import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the userType in localStorage is admin
        const userType = localStorage.getItem('userType');
        if (userType !== 'admin') {
            navigate('/dashboard'); // Redirect if not admin
        } else {
            // Fetch users from the server if userType is admin
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/users');
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            fetchUsers();
        }
    }, [navigate]);

    const handleSelectUser = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleDeleteSelected = async () => {
        if (window.confirm('Are you sure you want to delete the selected users?')) {
            try {
                await Promise.all(selectedUsers.map((id) => axios.delete(`http://localhost:5000/api/users/${id}`)));
                setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
                setSelectedUsers([]);
            } catch (error) {
                console.error('Error deleting users:', error);
            }
        }
    };
    const handleStatusToggle = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await axios.put(`http://localhost:5000/api/users/${userId}`, { status: newStatus });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, status: newStatus } : user
            ));
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>
            <button
                onClick={() => navigate('/add-user')}
                className="bg-purple-900 text-white py-2 px-4 rounded mb-4"
            >
                Add User
            </button>
            <button
                onClick={handleDeleteSelected}
                className="bg-red-600 text-white py-2 px-4 rounded mb-4 ml-2"
                disabled={selectedUsers.length === 0}
            >
                Delete Selected
            </button>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md text-center">
                <thead >
                    <tr>
                        <th className="px-4 py-2 border-b">
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedUsers(users.map((user) => user._id));
                                    } else {
                                        setSelectedUsers([]);
                                    }
                                }}
                            />
                        </th>
                        <th className="px-4 py-2 border-b">Username</th>
                        <th className="px-4 py-2 border-b">Email ID</th>
                        <th className="px-4 py-2 border-b">Mobile No</th>
                        <th className="px-4 py-2 border-b">User Type</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => handleSelectUser(user._id)}
                                />
                            </td>
                            <td className="px-4 py-2 border-b">{user.username}</td>
                            <td className="px-4 py-2 border-b">{user.email_id}</td>
                            <td className="px-4 py-2 border-b">{user.mobile_no}</td>
                            <td className="px-4 py-2 border-b">{user.user_type}</td>
                            <td className="px-4 py-2 border-b flex flex-col items-center justify-center">
                                <div className="toggle-container">
                                    <input
                                        type="checkbox"
                                        className="toggle-input"
                                        checked={user.status === 'active'}
                                        onChange={() => handleStatusToggle(user._id, user.status)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 142" className="toggle">
                                        <path d="M71 142C31.7878 142 0 110.212 0 71C0 31.7878 31.7878 0 71 0C110.212 0 119 30 146 30C173 30 182 0 221 0C260 0 292 31.7878 292 71C292 110.212 260.212 142 221 142C181.788 142 173 112 146 112C119 112 110.212 142 71 142Z" className="toggle-background"></path>
                                        <rect rx="6" height="64" width="12" y="39" x="64" className="toggle-icon on"></rect>
                                        <path d="M221 91C232.046 91 241 82.0457 241 71C241 59.9543 232.046 51 221 51C209.954 51 201 59.9543 201 71C201 82.0457 209.954 91 221 91ZM221 103C238.673 103 253 88.6731 253 71C253 53.3269 238.673 39 221 39C203.327 39 189 53.3269 189 71C189 88.6731 203.327 103 221 103Z" fillRule="evenodd" className="toggle-icon off"></path>
                                        <g filter="url('#goo')">
                                            <rect fill="#fff" rx="29" height="58" width="116" y="42" x="13" className="toggle-circle-center"></rect>
                                            <rect fill="#fff" rx="58" height="114" width="114" y="14" x="14" className="toggle-circle left"></rect>
                                            <rect fill="#fff" rx="58" height="114" width="114" y="14" x="164" className="toggle-circle right"></rect>
                                        </g>
                                        <filter id="goo">
                                            <feGaussianBlur stdDeviation="10" result="blur" in="SourceGraphic"></feGaussianBlur>
                                            <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
                                        </filter>
                                    </svg>
                                </div>
                                {user.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
