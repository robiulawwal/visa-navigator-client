import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // For navigation
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // For animations
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Register = () => {
    const { createNewUser, updateUser, loginWIthGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const location = useLocation();

    const handleRegister = (e) => {
        let regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        setErrorMessage(null)
        if (!email) {
            setErrorMessage("enter valid email");
            return;
        }
        if (!regex.test(password)) {
            setErrorMessage("Use Uppercase, lowercase and minimum 6 digit")
            return;
        }
        const profile = {
            displayName: name,
            photoURL: photo
        }
        // console.log(name, photo, email, password)
        createNewUser(email, password)
            .then(() => {
                // console.log('from create new user', result.user)
                updateUser(profile)
                    .then(() => {
                        navigate(location?.state?.from || "/");
                    }).catch((error) => {
                        toast.error(error.message.replace("Firebase: ", ""));

                    });
            })
            .catch((error) => {
                toast.error(error.message.replace("Firebase: ", ""))
            });

    }

    const loginGoogle = () => {
        loginWIthGoogle()
            .then(() => {
                navigate(location?.state?.from || "/");
                // console.log(result.user)
            })
            .catch((error) => {
                toast.error(error.code.replace("auth/", "").replace(/-/g, ' '));
            });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col items-center">
                {/* Right Pane: Registration Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center my-5">
                    <div className="w-full p-10 bg-gradient-to-b border-2 border-emerald-200 from-emerald-50 via-purple-100  to-pink-100 rounded-lg shadow-emerald-100 shadow-2xl">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-black text-center">
                            Register
                        </h1>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Join our community with full access and free benefits.
                        </p>

                        {/* Social Login Button (Google) */}
                        <div className="mb-4">
                            <button
                                onClick={loginGoogle}
                                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-3 cursor-pointer rounded-md hover:bg-gray-100 border border-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-4"
                                    id="google"
                                >
                                    <path
                                        fill="#fbbb00"
                                        d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
                                    ></path>
                                    <path
                                        fill="#518ef8"
                                        d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
                                    ></path>
                                    <path
                                        fill="#28b446"
                                        d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
                                    ></path>
                                    <path
                                        fill="#f14336"
                                        d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
                                    ></path>
                                </svg>
                                Sign Up with Google
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>or with email</p>
                        </div>

                        {/* Registration Form */}
                        <form className="space-y-4" onSubmit={handleRegister}>
                            {/* Name Field */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="User name"
                                    className="w-full p-3 bg-white outline-1 outline-lime-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="w-full p-3 bg-white outline-1 outline-lime-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                                    required
                                />
                            </div>

                            {/* Photo URL Field */}
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Photo URL
                                </label>
                                <input
                                    type="url"
                                    name="photo"
                                    placeholder="Photo URL"
                                    className="w-full p-3 bg-white outline-1 outline-lime-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type={showPassword ? "password" : "text"}
                                    placeholder="Password"
                                    className="w-full p-3 bg-white outline-1 outline-lime-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                                />
                                <div className="absolute right-3 top-[60%] text-[#0D9C8A] hover:text-[#0DC1AD]">
                                    {
                                        showPassword ?
                                            <FaRegEyeSlash className="text-lg hover:text-gray-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></FaRegEyeSlash>
                                            :
                                            <FaRegEye className="text-lg hover:text-gray-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></FaRegEye>
                                    }
                                </div>
                                {/* Password Validation Error */}
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                                )}
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="relative cursor-pointer inline-flex items-center justify-center w-full px-5 py-3 text-white font-semibold tracking-[1.2px] bg-[#40B3A2] rounded shadow-lg hover:opacity-95 overflow-hidden">
                                <span className="absolute w-4 h-4 bg-transparent rounded-full top-1/2 left-3 -translate-y-1/2 animate-[ripple_0.6s_linear_infinite]"></span>
                                Register Now
                                <span className="absolute w-4 h-4 bg-transparent rounded-full right-3 top-1/2 -translate-y-1/2 animate-[ripple_0.6s_linear_infinite]"></span>
                            </button>
                        </form>

                        {/* Login Link */}
                        <div className="mt-4 text-gray-600 text-center">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login" className="text-[#0D9C8A] hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Register;