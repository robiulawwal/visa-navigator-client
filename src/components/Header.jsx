import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip"; // Import React Tooltip
import { useContext, useState, } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import '../components/theme.css'
const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);

  // Simulate login/logout functionality
  // State for handling the light/dark theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <div className="bg-base-300 backdrop-contrast-50 py-4 md:py-7 sticky top-0 z-50">
      <nav className=" flex max-w-[1450px] mx-auto w-11/12 lg:w-full justify-between items-center">
        {/* Navbar Start (Logo and Mobile Menu) */}
        <div className="flex items-center gap-3">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><NavLink to="/" > Home</NavLink> </li>
              <li>     <NavLink to="/all-visas" >All Visas </NavLink></li>
              <li><NavLink to="/add-visa"  >Add Visa </NavLink> </li>
              <li><NavLink to="/my-visas" > My Visas </NavLink>   </li>
              <li><NavLink to="/my-applications" >   My Applications </NavLink> </li>
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
        <div className=" rounded-xl hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2 font-semibold">
            <li>
              <NavLink className="px-3 py-2 rounded-lg text-lg text-base-content" to="/" > Home</NavLink>
            </li>
            <li>
              <NavLink className="px-3 py-2 rounded-lg text-lg text-base-content" to="/all-visas" >All Visas </NavLink>
            </li>
            <li>
              <NavLink className="px-3 py-2 rounded-lg text-lg text-base-content" to="/add-visa"  >Add Visa </NavLink>
            </li>
            <li>
              <NavLink className="px-3 py-2 rounded-lg text-lg text-base-content" to="/my-visas" > My Visas </NavLink>
            </li>
            <li>
              <NavLink className="px-3 py-2 rounded-lg text-lg text-base-content" to="/my-applications" >   My Applications </NavLink>
            </li>
          </ul>
        </div>

        {/* Navbar End (Conditional Login/Register or User Profile) */}
        <div className="flex items-center gap-2 text-xl">
          {/* them changer */}
          <div className="mr-2">
            <label className="switch">
              <span className="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
              <span className="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
              <input onChange={toggleTheme} type="checkbox" className="input"></input>
              <span className="slider"></span>
            </label>
          </div>
          {user ? (
            <div className="flex items-center gap-2 md:gap-3">
              {/* User Profile Photo with Tooltip */}
              <div
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user.displayName}
                className="cursor-pointer border-2 flex-shrink-0 border-white rounded-full p-0.5"
              >
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="md:w-12 w-7 h-7 md:h-12 rounded-full "
                />
              </div>
              <Tooltip id="user-tooltip" place="bottom" />

              {/* Logout Button */}
              <button
                onClick={logOutUser}
                className="bg-gradient-to-b text-sm md:text-xl  from-[#0DC1AD] to-[#0D9C8A] hover:from-[#0D9C8A] hover:to-[#0DC1AD] text-white px-2 md:px-4 py-2 rounded-lg transition duration-300"
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


