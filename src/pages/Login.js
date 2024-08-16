// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpModal from '../components/OtpModal';
import loginimg from '../images/login3dpng.png'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error

        try {
            const response = await axios.post('https://instareact-9vx0.onrender.com/api/auth/login', { username, password });
            setUserId(response.data.userId);
            console.log("response", response)
            setUserType(response.data.userType);
            setShowOtpModal(true);
        } catch (error) {
            console.error('Login Error:', error); // Log error
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-purple-200 ">
            <div className="flex items-center justify-between px-6 py-4 shadow " style={{"background-color":"transparent"}}>
                <div className="flex items-center gap-2">
                    <svg className="h-6 w-6 text-purple-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                    <span className="text-lg font-bold text-purple-900">InstaHR</span>
                </div>
            </div>
            <main className="flex flex-1 items-center justify-center bg-purple-200 px-4 py-4 sm:px-6 lg:px-8 alice ">
                <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-12 rounded-2xl p-8 shadow-lg shadow-purple-300 sm:p-12 lg:gap-20 ">
                    <div className="hidden w-full max-w-lg lg:block">
                        <img
                            src={loginimg}
                            alt="Login Illustration"
                            className="rounded-2xl object-cover w-full"
                            style={{ aspectRatio: '1 / 1' }}
                        />
                    </div>
                    <div className="w-full max-w-sm space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-purple-900">Welcome!</h1>
                            <p className="text-gray-600">Enter your credentials to access your account.</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-sm font-medium text-purple-900 hover:text-purple-600">Forgot password?</a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full border border-gray-300 rounded-md p-2"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="w-full bg-purple-900 text-white py-2 px-4 rounded">Login</button>
                        </form>
                    </div>
                </div>
            </main>
            <footer className=" p-6 text-center text-sm text-purple-900">
                &copy; 2023 InstaHr. All rights reserved.
            </footer>
            {showOtpModal && <OtpModal userId={userId} username={username} userType={userType} onClose={() => setShowOtpModal(false)} />}
        </div>
    );
};

export default Login;
