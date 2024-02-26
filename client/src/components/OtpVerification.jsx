import axios from 'axios';
import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const location = useLocation();
  const email = location.state.email;
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const handleChange = (event, index) => {
    const newOtp = [...otp];
    newOtp[index] = event.target.value;
    setOtp(newOtp);

    // Move focus to the next input if there is a value
    if (event.target.value && index < 3) {
      refs[index + 1].current.focus();
    }
  };

  const handleBackspace = (event, index) => {
    if (event.keyCode === 8 && !otp[index] && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');

    axios
      .post(
        'http://localhost:8000/api/login',
        {
          email: email,
          otp: otpString,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          navigate('/userDashboard');
        } else {
          alert('Invalid OTP');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h2 className="text-2xl mb-4">Verify OTP for {email}</h2>
      <div className="flex mb-4">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            maxLength="1"
            ref={refs[index]}
            className="w-12 h-12 mx-1 text-center bg-blue-800 rounded-lg text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
}

export default OtpVerification;
