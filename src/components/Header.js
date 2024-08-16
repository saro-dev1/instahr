import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'; // Import the logo
import avatar from '../images/default-avatar.jpg';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const username = localStorage.getItem('username');
    const userType = localStorage.getItem('userType'); // Retrieve userType from localStorage
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        window.location.href = '/';
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleManageUsers = () => {
        navigate('/manage-users'); // Navigate to the Manage Users page
    };
    const handleDashboard = () => {
        navigate('/dashboard'); // Navigate to the Manage Users page
    };

    return (
        <header className="flex justify-between items-center p-4 bg-purple-200 shadow-md">
            <div className="flex items-center">
                <img src={logo} alt="INSTAHR Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-xl font-bold text-purple-900">INSTAHR</h1>
            </div>
            <div className="flex items-center">
                <button
                    onClick={handleDashboard}
                    className="mr-4 text-purple-900  py-2 px-4 rounded"
                >
                    Dashboard
                </button>
                {username && userType === 'admin' && (
                    <button
                        onClick={handleManageUsers}
                        className="mr-4 bg-purple-900 text-white py-2 px-4 rounded"
                    >
                        Manage Users
                    </button>
                )}

                <div className="">
                    <button
                        onClick={toggleDropdown}
                        className="text-lg font-medium text-gray-800 focus:outline-none flex items-center"
                    >
                        <img src={avatar} alt="Avatar" className="h-10 w-10 mr-2 rounded-full" />
                        {username}
                    </button>
                    {dropdownVisible && (
                        <div className="absolute right-5 mt-2 w-48 bg-white text-red-500 border border-red-600 border-2 hover:bg-red-600 hover:text-white rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
