// src/components/OtpModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpStyles.css'; // Import the CSS file

const OtpModal = ({ userId, username, userType, onClose }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to next input
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { userId, otp: otpString });
            localStorage.setItem('token', response.data.token); // Save JWT token
            localStorage.setItem('userId', userId); // Save user ID
            localStorage.setItem('username', username); // Save username
            console.log('otp res',response)
            localStorage.setItem('userType', response.data.userType);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            alert('Invalid OTP');
        }
    };

    return (
        <div className="otp-modal">
            <div className="otp-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2 className="otp-title">Enter OTP</h2>
                <p className="otp-description">Please enter the 6-digit one-time password sent to your phone.</p>
                <div className="otp-inputs">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="otp-input"
                        />
                    ))}
                </div>
                <button className="submit-button bg-purple-900" onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
        </div>
    );
};

export default OtpModal;
