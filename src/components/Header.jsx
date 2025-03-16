
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip"; // Import React Tooltip
import { useContext, } from "react";
import { AuthContext } from "../contextData/AuthProvider";

const Header = () => {
    const {user, logOutUser} = useContext(AuthContext);

    // Simulate login/logout functionality
  

    return (
        <div className="bg-gradient-to-b from-[#93ede0c6] py-7">
            <nav className="navbar max-w-[1450px] mx-auto w-11/12 lg:w-full">
                {/* Navbar Start (Logo and Mobile Menu) */}
                <div className="navbar-start gap-3">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li> <NavLink to="/">Home</NavLink>  </li>
                            <li> <NavLink to="/start-learning">Start-Learning</NavLink>  </li>
                            <li><NavLink to="/tutorials">Tutorials</NavLink></li>
                            {/* {
                                user && <li><NavLink to="/profile">my-profile</NavLink></li>
                            } */}
                        </ul>
                    </div>

                    {/* Custom Logo */}
                    <div className="flex items-center space-x-2">
                        {/* Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 64 64"
                            className="h-12 w-12 text-[#0DC1AD]"
                        >
                            {/* Gradient Background */}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: "#0DC1AD", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#0D9C8A", stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* Circle */}
                            <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />

                            {/* Airplane Icon */}
                            <path
                                d="M32 16l-8 12h6v12h4V28h6l-8-12z"
                                fill="#FFFFFF"
                            />
                            {/* Globe Icon */}
                            <circle cx="32" cy="32" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                            <path
                                d="M32 22a10 10 0 010 20"
                                fill="none"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                            />
                        </svg>
                        {/* Animated Gradient Text */}
                        <div className="text-xl md:flex hidden lg:text-3xl font-bold text-[#0D9C8A]">
                            VisaVoyager
                        </div>
                    </div>

                </div>

                {/* Navbar Center (Desktop Menu) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2 font-semibold">
                        <li>
                            <NavLink className="px-3 py-2 rounded-lg text-lg text-gray-700" to="/" > Home</NavLink>
                        </li>
                        <li>
                             <NavLink className="px-3 py-2 rounded-lg text-lg text-gray-700" to="/all-visas" >All Visas </NavLink>
                        </li>
                        <li>
                            <NavLink className="px-3 py-2 rounded-lg text-lg text-gray-700" to="/add-visa"  >Add Visa </NavLink>
                        </li>
                        <li>
                            <NavLink className="px-3 py-2 rounded-lg text-lg text-gray-700" to="/my-visas" > My Visas </NavLink>
                        </li>
                        <li>
                            <NavLink className="px-3 py-2 rounded-lg text-lg text-gray-700" to="/my-applications" >   My Applications </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Navbar End (Conditional Login/Register or User Profile) */}
                <div className="navbar-end text-xl">
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* User Profile Photo with Tooltip */}
                            <div
                                data-tooltip-id="user-tooltip"
                                data-tooltip-content={user.displayName}
                                className="cursor-pointer"
                            >
                                <img
                                    src={user?.photoURL}
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <Tooltip id="user-tooltip" place="bottom" />

                            {/* Logout Button */}
                            <button
                                onClick={logOutUser}
                                className="bg-gradient-to-b from-[#0DC1AD] to-[#0D9C8A] hover:from-[#0D9C8A] hover:to-[#0DC1AD] text-white px-4 py-2 rounded-lg transition duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            {/* Login Button */}
                            <Link to="/login">
                                <button
                                    className="border-2 border-[#0DC1AD] text-[#0DC1AD] font-bold px-3 md:px-5 py-2 rounded-lg transition duration-300 hover:text-white"
                                >
                                    Login
                                </button>
                            </Link>

                            {/* Register Button */}
                            <Link to="/register">
                                <button className="border-2 border-[#0DC1AD] text-[#0DC1AD] font-bold px-3 md:px-5 py-2 rounded-lg transition duration-300 hover:text-white">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;