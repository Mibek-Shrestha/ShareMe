import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();

    async function logout() {
        try {
            await axios.post('http://localhost:8000/api/logout');
            navigate('/signup');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    // Call logout inside a useEffect hook
    useEffect(() => {
        logout();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return null; // This component does not render anything
}

export default Logout;