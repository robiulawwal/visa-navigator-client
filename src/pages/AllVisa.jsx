import { Link, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFileAlt, FaClock, FaDollarSign, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

const AllVisa = () => {
    const loaderVisas = useLoaderData();
    const [visas, setVisas] = useState(loaderVisas);
    const [filteredVisas, setFilteredVisas] = useState(loaderVisas);
    const [selectedVisaType, setSelectedVisaType] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    // Hardcoded visa types
    const visaTypes = ["Tourist Visa", "Student Visa", "Official Visa"];

    // Handle filter change
    const handleFilterChange = (e) => {
        const selectedType = e.target.value;
        setSelectedVisaType(selectedType);

        if (selectedType) {
            setFilteredVisas(visas.filter(visa => visa.visaType === selectedType));
        } else {
            setFilteredVisas(visas); // Show all visas if no filter is selected
        }
    };

    return (
        <div className="bg-base-300 py-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold text-[#0D9C8A] text-center mb-12 tracking-wide"
                >
                    Explore All Visas
                </motion.h1>

                {/* Visa Type Filter Dropdown */}
                <div className="max-w-md mx-auto mb-8">
                    <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                        <FaFileAlt className="mr-2 text-stone-600" /> Visa Type
                    </label>
                    <select
                        name="visaType"
                        className="w-full p-4 rounded-lg bg-base-300 outline-none focus:ring-2 focus:ring-emerald-600 shadow-md border border-gray-200 transition-all duration-300 hover:border-[#0D9C8A]"
                        value={selectedVisaType}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Visa Type</option>
                        {visaTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Visa Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6">
                    {filteredVisas.length > 0 ? (
                        filteredVisas.map((visa) => (
                            <motion.div
                                key={visa._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative bg-base-100 rounded-2xl overflow-hidden shadow-xl"
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
                                            <p className="text-base-content font-medium">{visa.visaType}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaClock className="text-[#0D9C8A] text-lg" />
                                            <p className="text-base-content font-medium">{visa.processingTime}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaDollarSign className="text-[#0D9C8A] text-lg" />
                                            <p className="text-base-content font-medium">${visa.fee}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCalendarAlt className="text-[#0D9C8A] text-lg" />
                                            <p className="text-base-content font-medium">{visa.validity}</p>
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
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-full flex flex-col items-center justify-center mt-8 p-8 bg-white rounded-2xl shadow-xl"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
                                alt="No Data"
                                className="w-24 h-24 mb-4"
                            />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Visas Found</h3>
                            <p className="text-gray-600 text-center">
                                No visas are available for the selected visa type. Please try another type.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllVisa;