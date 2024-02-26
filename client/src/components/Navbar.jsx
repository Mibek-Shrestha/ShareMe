import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const cookie = Cookies.get('notesharing');
        if (cookie) {
            const { email } = JSON.parse(cookie);
            setEmail(email);
        }
    }, []);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Logo</span>
            </div>
            <div className="block lg:hidden">
                <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
                </button>
            </div>
            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
                    <Link to="/" className=" text-xl block mt-4 lg:inline-block lg:mt-0 text-teal-50 hover:text-white mr-10">
                        Home
                    </Link>
                    {email ? (
                        <span className="text-xl block mt-4 lg:inline-block lg:mt-0 text-teal-200">Welcome,{email}</span>
                    ) : (
                        <Link to="/logout" className="text-xl block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                            Logout
                        </Link>
                    )}
                    <Link to="/signup" className="text-xl ml-5 block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                        Logout
                    </Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;