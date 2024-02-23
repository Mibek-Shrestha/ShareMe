import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../assets/styles/style.css";
function SignUp() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpRequest = () => {
        navigate('/otp-verification', { state: { email } });
        fetch('http://localhost:8000/otp/sendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, role }),
        })
            .then(response => response.text())
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div className="bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center sm:p-8"  >
                <div className="border-2 space-y-3 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl bg-white p-3 sm:p-8">
                    <h2 className="font-semibold text-2xl text-center">Sign Up</h2>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className="border-2 outline-none w-full text-center h-10 rounded-md placeholder:text-center"
                    />
                    <select
                        name="options"
                        id="options"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border-2 outline-none  w-full text-center h-10 rounded-md placeholder:text-center"
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>

                    </select>
                    <button
                        onClick={handleOtpRequest}
                        className="text-white flex items-center justify-center h-10 w-full border-2 rounded-md bg-[#9c6f44] p-1 hover:bg-[#7a5432]"
                    >
                        Send OTP
                    </button>
                </div>
            </div>

        </>

    );
}

export default SignUp;