import React, { useState } from 'react';
import axios from 'axios';

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    // const [otp, setOtp] = useState('');
    // const [showOtpField, setShowOtpField] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:4000/auth/register', formData);
            setSuccess(response.data)
            // setShowOtpField(true);
            setError('');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed. Please check your info.');
            }
            else if (error.request) {
                setError('No response from the server. Please try again later.');
            }
            else {
                setError('Unexpected error. Please try again.');
            }
            setSuccess('');
        }
    }

    return(
        <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name='firstName' onChange={handleInputChange} />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name='lastName' onChange={handleInputChange} />
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={handleInputChange} />
            <label htmlFor="username">Username</label>
            <input type="text" name='username' onChange={handleInputChange} />
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={handleInputChange} />
            <button onClick={handleRegister}>Register</button>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* {showOtpField && (
                <>
                <label htmlFor="otp">OTP:</label>
                <input type="text" name="otp" id={otp} onChange={handleOtpChange} />
                <button onClick={handleFinalRegister}>Verify</button>
                </>
            )} */}
        </div>
    )
}

export default RegisterComponent;