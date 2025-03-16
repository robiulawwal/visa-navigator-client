import { FaGlobe, FaFileAlt, FaClock, FaCheckCircle, FaInfoCircle, FaUser, FaDollarSign, FaCalendarAlt, FaUpload, FaRegCopy, FaRegArrowAltCircleUp, FaArrowDown, } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import bgPngForm from '../assets/hero_bg.png';
import { toast } from "react-toastify";
import { useState } from "react";
import '../pages/addButton.css'
const AddVisa = () => {

    const [showGallery, setShowGallery] = useState(false);

    // Hosted country images on ImgBB
    const countryImages = [
        { name: "Albania", url: "https://i.ibb.co.com/FbK12q2y/AL.jpg" },
        { name: "Indonesia", url: "https://i.ibb.co.com/1fkJFHwx/ID.jpg" },
        { name: "Canada", url: "https://i.ibb.co.com/pvtfBbjs/CA.jpg" },
        // Add more images as needed
    ];

    const handleCopyLink = (url) => {
        navigator.clipboard.writeText(url);

        // Auto-fill the Country Image URL field
        const countryImageField = document.querySelector('input[name="countryImage"]');
        if (countryImageField) {
            countryImageField.value = url;
            setShowGallery(false); // Close gallery

        }
    };

    const handleAddVisa = (e) => {
        e.preventDefault();

        // Get the form element
        const form = e.target;

        // Get all values from the form fields
        const countryImage = form.countryImage.value;
        const countryName = form.countryName.value;
        const visaType = form.visaType.value;
        const processingTime = form.processingTime.value;
        const requiredDocuments = Array.from(form.requiredDocuments)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        const description = form.description.value;
        const ageRestriction = form.ageRestriction.value;
        const fee = form.fee.value;
        const validity = form.validity.value;
        const applicationMethod = form.applicationMethod.value;

        // Validate required fields
        if (!countryImage || !countryName || !visaType || !processingTime || requiredDocuments.length === 0 || !description || !ageRestriction || !fee || !validity || !applicationMethod) {
            toast.error("Please fill all the required fields.");
            return
        }

        // Create an object with the form data
        const formData = {
            countryImage, countryName, visaType, processingTime, requiredDocuments, description, ageRestriction, fee, validity, applicationMethod,
        };

        // Simulate form submission (replace with actual API call)
        fetch('http://localhost:5000/visas', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    toast.success("Visa added successfully!");
                }
            })
        console.log("Form Data:", formData);
       

    };

    return (
        <div style={{ backgroundImage: `url(${bgPngForm})` }} className="mt-8 md:pt-8 mb-4 md:mb-0 md:pb-4 bg-repeat-round bg-auto">
            <div className="max-w-[1100px] mx-auto rounded-sm px-8 md:px-12 py-6 md:py-12 bg-[#F4F3F0]">
                <h2 className="text-5xl text-[#0D9C8A] font-bold text-center mb-2 font-rancho">
                    Add New Visa Details
                </h2>
                <p className="text-[#7d5a50] text-center text-lg font-normal my-6">
                    Planning your next international trip? Our Visa Navigator Portal makes it easy to manage all your visa requirements in one place.
                </p>
                <form onSubmit={handleAddVisa} className="md:grid grid-cols-2 gap-3">
                    {/* Country Image */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaGlobe className="mr-2 text-stone-600" /> Country Image URL
                        </label>
                        <input
                            name="countryImage"
                            type="text"
                            placeholder="Enter country image URL"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                        <button
                            type="button"
                            onClick={() => setShowGallery(!showGallery)}
                            className="btns mt-2"
                        >
                            <strong className="inline-flex items-center gap-2">
                                {showGallery ? (
                                    <>
                                        Hide Image Gallery <IoIosArrowUp className="text-xl" />
                                    </>
                                ) : (
                                    <>
                                        Click to Choose country image link<IoIosArrowDown className="text-xl" />
                                    </>
                                )}
                            </strong>
                            <div id="container-stars">
                                <div id="stars"></div>
                            </div>
                            <div id="glow">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </button>

                        {/* Image Gallery */}
                        {showGallery && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {countryImages.map((image, index) => (
                                    <div key={index} className=" rounded-lg overflow-hidden shadow-sm">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-16 object-cover"
                                        />
                                        <div className="pl-2 bg-white">
                                            <p className="text-sm font-medium text-[#4b3832]">{image.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => handleCopyLink(image.url)}
                                                className="mt-1 text-sm items-center inline-flex gap-2 text-[#0D9C8A] hover:underline"
                                            >
                                                <FaRegCopy></FaRegCopy> Copy Link
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Country Name */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaGlobe className="mr-2 text-stone-600" /> Country Name
                        </label>
                        <input
                            name="countryName"
                            type="text"
                            placeholder="Enter country name"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Visa Type */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaFileAlt className="mr-2 text-stone-600" /> Visa Type
                        </label>
                        <select
                            name="visaType"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                            <option value="">Select Visa Type</option>
                            <option value="Tourist Visa">Tourist Visa</option>
                            <option value="Student Visa">Student Visa</option>
                            <option value="Official Visa">Official Visa</option>
                        </select>
                    </div>

                    {/* Processing Time */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaClock className="mr-2 text-stone-600" /> Processing Time
                        </label>
                        <input
                            name="processingTime"
                            type="text"
                            placeholder="example: 7-10 business days"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Required Documents */}
                    <div className="col-span-2">
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaCheckCircle className="mr-2 text-stone-600" /> Required Documents
                        </label>
                        <div className="space-y-2 md:flex md:justify-between mt-4">
                            <label className="flex items-center">
                                <input type="checkbox" name="requiredDocuments" value="Valid Passport" className="mr-2 checkbox accent-stone-600" />
                                Valid Passport
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" name="requiredDocuments" value="Visa Application Form" className="mr-2 checkbox accent-stone-600" />
                                Visa Application Form
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" name="requiredDocuments" value="Recent Passport-Sized Photograph" className="mr-2 checkbox accent-stone-600" />
                                Recent Passport-Sized Photograph
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaInfoCircle className="mr-2 text-stone-600" /> Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter visa description"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                            rows="2"
                        />
                    </div>

                    {/* Age Restriction */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaUser className="mr-2 text-stone-600" /> Age Restriction
                        </label>
                        <input
                            name="ageRestriction"
                            type="number"
                            placeholder="example: 18"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Fee */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaDollarSign className="mr-2 text-stone-600" /> Fee (USD)
                        </label>
                        <input
                            name="fee"
                            type="number"
                            placeholder="example: 100"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Validity */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaCalendarAlt className="mr-2 text-stone-600" /> Validity
                        </label>
                        <input
                            name="validity"
                            type="text"
                            placeholder="example: 6 months"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>

                    {/* Application Method */}
                    <div>
                        <label className="block text-[#4b3832] font-medium my-2 flex items-center">
                            <FaUpload className="mr-2 text-stone-600" /> Application Method
                        </label>
                        <input
                            name="applicationMethod"
                            type="text"
                            placeholder="example: Online or Embassy"
                            className="w-full p-4 rounded-lg bg-white outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                    </div>
                    {/* Submit Button */}
                    <input
                        type="submit"
                        value="Add Visa Details"
                        className="w-full bg-gradient-to-r from-emerald-500 to-[#0D9C8A] text-white px-6 py-4 mt-6 rounded-lg hover:from-[#0D9C8A] hover:to-emerald-600 transition duration-300 flex items-center justify-center col-span-2"
                    />
                </form>
            </div>


        </div>
    );
};

export default AddVisa;