import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileAlt, FaClock, FaDollarSign, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useEffect } from "react";

const AllVisa = () => {
    const visas = useLoaderData();
    
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);
    return (
        <div className="bg-gradient-to-b from-white to-[#d8f8f6] py-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold text-[#0D9C8A] text-center mb-12 tracking-wide"
                >
                    Explore All Visas
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6">
                    {visas.map((visa) => (
                        <motion.div
                            key={visa._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
                        >
                            <div className="relative h-52">
                                <img src={visa.countryImage} alt={visa.countryName} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h2 className="text-2xl font-bold text-white">{visa.countryName}</h2>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <FaFileAlt className="text-[#0D9C8A] text-lg" />
                                        <p className="text-gray-700 font-medium">{visa.visaType}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaClock className="text-[#0D9C8A] text-lg" />
                                        <p className="text-gray-700 font-medium">{visa.processingTime}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaDollarSign className="text-[#0D9C8A] text-lg" />
                                        <p className="text-gray-700 font-medium">${visa.fee}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FaCalendarAlt className="text-[#0D9C8A] text-lg" />
                                        <p className="text-gray-700 font-medium">{visa.validity}</p>
                                    </div>
                                </div>

                                <Link to={`/visa-details/${visa._id}`} className="mt-6 flex items-center justify-center space-x-2 bg-[#0D9C8A] text-white px-4 py-2 rounded-lg hover:bg-[#0DC1AD] transition-all duration-300 shadow-md w-full">
                                    <span>See Details</span>
                                    <FaArrowRight className="text-sm" />
                                </Link>
                            </div>

                            <div className="absolute top-2 right-2 bg-gradient-to-r from-[#0D9C8A] to-[#0DC1AD] text-white px-4 py-1 transform rotate-45 translate-x-8 -translate-y-2 shadow-lg">
                                <span className="text-xs font-bold">Featured</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVisa;
