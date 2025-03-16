import { Link, useLoaderData } from "react-router-dom";
import { FaGlobe, FaFileAlt, FaClock, FaDollarSign, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"; // For animations
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllVisa = () => {
const visas = useLoaderData()



    // Loading spinner
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#0D9C8A]"></div>
    //         </div>
    //     );
    // }

    return (
        <div className="bg-gradient-to-b from-[#F4F3F0] to-[#E0F2F1] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold text-[#0D9C8A] text-center mb-8"
                >
                    Explore All Visas
                </motion.h1>

                {/* Visa Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visas.map((visa) => (
                        <motion.div
                            key={visa._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            {/* Country Image */}
                            <div className="relative h-48">
                                <img
                                    src={visa.countryImage}
                                    alt={visa.countryName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h2 className="text-2xl font-bold text-white">{visa.countryName}</h2>
                                </div>
                            </div>

                            {/* Visa Details */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    {/* Visa Type */}
                                    <div className="flex items-center space-x-2">
                                        <FaFileAlt className="text-[#0D9C8A]" />
                                        <p className="text-gray-700">{visa.visaType}</p>
                                    </div>

                                    {/* Processing Time */}
                                    <div className="flex items-center space-x-2">
                                        <FaClock className="text-[#0D9C8A]" />
                                        <p className="text-gray-700">{visa.processingTime}</p>
                                    </div>

                                    {/* Fee */}
                                    <div className="flex items-center space-x-2">
                                        <FaDollarSign className="text-[#0D9C8A]" />
                                        <p className="text-gray-700">${visa.fee}</p>
                                    </div>

                                    {/* Validity */}
                                    <div className="flex items-center space-x-2">
                                        <FaCalendarAlt className="text-[#0D9C8A]" />
                                        <p className="text-gray-700">{visa.validity}</p>
                                    </div>
                                </div>

                                {/* See Details Button */}
                                <Link
                                    to={`/visa-details/${visa._id}`}
                                    className="mt-6 w-full flex items-center justify-center space-x-2 bg-[#0D9C8A] text-white px-4 py-2 rounded-lg hover:bg-[#0DC1AD] transition duration-300"
                                >
                                    <span>See Details</span>
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllVisa;