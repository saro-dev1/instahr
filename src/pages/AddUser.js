// src/components/AddUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        userType: '',
        email_id: '',
        mobile_no: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the userType in localStorage is admin
        const userType = localStorage.getItem('userType');
        if (userType !== 'admin') {
            navigate('/dashboard'); // Redirect if not admin
        }
    }, [navigate]);

    const handleAddUser = async () => {
        try {
            await axios.post('https://instareact-9vx0.onrender.com/api/users', newUser);
            setNewUser({
                username: '',
                password: '',
                userType: '',
                email_id: '',
                mobile_no: ''
            }); // Reset form
            navigate('/manage-users'); // Redirect to the users list page
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <input
                    type="text"
                    placeholder="Email ID"
                    value={newUser.email_id}
                    onChange={(e) => setNewUser({ ...newUser, email_id: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <input
                    type="text"
                    placeholder="Mobile No"
                    value={newUser.mobile_no}
                    onChange={(e) => setNewUser({ ...newUser, mobile_no: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
                <select
                    value={newUser.userType}
                    onChange={(e) => setNewUser({ ...newUser, userType: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select User Type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button 
                    onClick={handleAddUser}
                    className="bg-purple-900 text-white py-2 px-4 rounded"
                >
                    Add User
                </button>
            </div>
        </div>
    );
};

export default AddUser;
