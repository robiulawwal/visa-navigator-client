import { FaFacebook, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";
const Login = () => {
    const navigate = useNavigate();
    const { loginUser, loginWIthGoogle } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(true);
    const [error, setLoginError] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email) {
            setLoginError("enter a valid email")
            return
        }
        if (password.length < 6) {
            setLoginError("enter 6 digit password")
            return
        }
        loginUser(email, password)
            .then(() => {
                // Signed in 
                navigate(location?.state ? location.state : "/")
                // ...
            })
            .catch((error) => {
                toast.error(error.message.replace("Firebase: ", ""));
                setLoginError("invalid username or password")
            });
    }

    const loginGoogle = () => {
        loginWIthGoogle()
            .then((result) => {
                // navigate(location?.state ? location.state : "/")
                console.log(result.user)
            })
            .catch((error) => {
                toast.error(error.message.split('(')[1].split(')')[0])
            });
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >

            <div className="flex items-center justify-center">
                <div className="border-[#d9efec93] border-3 rounded-3xl shadow-lg p-8 w-[450px]">
                    {/* Header */}
                    <div className="mb-7">
                        <h3 className="text-2xl font-bold text-[#0D9C8A] text-center">Sign In</h3>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleForm} className="space-y-5">
                        {/* Email Input */}
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                        />

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "password" : "text"}
                                placeholder="Password"
                                className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DC1AD]"
                            />
                            <button className="absolute right-3 top-3 text-[#0D9C8A] hover:text-[#0DC1AD]">
                                {
                                    showPassword ?
                                        <FaRegEyeSlash className="text-lg hover:text-gray-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></FaRegEyeSlash>
                                        :
                                        <FaRegEye className="text-lg hover:text-gray-300 cursor-pointer" onClick={() => setShowPassword(!showPassword)}></FaRegEye>
                                }
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <p className="text-sm text-[#0DC1AD] hover:underline">
                                Forgot your password?
                            </p>
                        </div>
                        {
                            error && <p className="text-red-600">{error}</p>
                        }
                        {/* Sign In Button */}
                        <button type="submit" className="w-full bg-[#0DC1AD] text-white p-3 rounded-lg hover:bg-[#0D9C8A] transition duration-300">
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-gray-300"></span>
                            <span className="text-gray-500">or</span>
                            <span className="h-px w-16 bg-gray-300"></span>
                        </div>
                    </form>
                    {/* Social Login Buttons */}
                    <div onClick={loginGoogle} className="flex gap-4 mt-3 w-fit cursor-pointer mx-auto bg-gray-100 text-gray-700 py-3 px-5 rounded-lg hover:bg-gray-200 transition duration-300">
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
                        <button className="">
                            Google

                        </button>
                    </div>
                    <div className="mt-7 text-center text-gray-500 text-sm">
                        <p className="text-gray-500">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[#0DC1AD] hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;