import { useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";

const VisaDetails = () => {
    const navigate = useNavigation();
    const visa = useLoaderData();
    const { _id, ...copiedVisa } = visa;
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: "",
        lastName: "",
        appliedDate: new Date().toISOString().split("T")[0], // Current date
        fee: visa.fee,
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,

        });

    };
    // Handle form submission
    const handleApply = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (!formData.firstName || !formData.lastName) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Prepare application data
        const applicationData = {
            ...formData,
            ...copiedVisa,
        };
        console.log(applicationData)
        // Submit application data to the server
        fetch("http://localhost:5000/visa-applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(applicationData),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                        toast.success("Visa application submitted successfully!");
                        setIsModalOpen(false); // Close modal
                        
                    } else {
                        toast.error("Failed to submit visa application.");
                    }
            })

    };

    return (
        <div className="bg-gradient-to-b from-[#F4F3F0] to-[#E0F2F1] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 mt-10 items-center">
                    {/* Visa Image */}
                    <div className="border-accent border-dashed border-r-2 border-b-2 p-5">
                        <img
                            className="rounded-2xl mx-auto"
                            src={visa.countryImage}
                            alt={visa.countryName}
                        />
                    </div>

                    {/* Visa Details */}
                    <div className="">
                        {/* Country Name and Visa Type */}
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-[#0D9C8A] mb-6">{visa.countryName}</h1>
                            <p className="text-xl text-gray-600"><span className="font-semibold">Visa Type:</span> {visa.visaType}</p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-300 mb-2"></div>

                        {/* Processing Time */}
                        <p className="text-xl text-gray-600 mb-4"><span className="font-semibold">Processing Time:</span> {visa.processingTime}</p>
                        <div className="border-t border-gray-300 mb-2"></div>

                        {/* Required Documents */}
                        <div className="mb-4">
                            <p className="text-gray-600">
                                <span className="font-bold text-lg text-[#0D9C8A]">Required Documents: </span>
                                {visa.requiredDocuments.join(", ")}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-300 mb-2"></div>

                        {/* Metadata */}
                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <div className="space-y-3">
                                <p className="text-gray-600">Fee:</p>
                                <p className="text-gray-600">Validity:</p>
                                <p className="text-gray-600">Application Method:</p>
                                <p className="text-gray-600">
                                    Age Restriction:</p>
                            </div>
                            <div className="space-y-3">
                                <p className="font-semibold text-[#0D9C8A]">${visa.fee}</p>
                                <p className="font-semibold text-[#0D9C8A]">{visa.validity}</p>
                                <p className="font-semibold text-[#0D9C8A]">{visa.applicationMethod}</p>
                                <p className="font-semibold text-[#0D9C8A]">{visa.ageRestriction}</p>
                            </div>
                            <p className="text-lg text-gray-600"><span className="font-semibold">Description:</span> {visa.description}</p>
                        </div>

                        {/* Apply for Visa Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-7 py-3 bg-[#0D9C8A] text-white rounded-lg font-semibold hover:bg-[#0DC1AD] transition duration-300"
                        >
                            Apply for Visa
                        </button>
                    </div>
                </div>
            </div>

            {/* Apply for Visa Modal */}
            {isModalOpen && (
                <div className="fixed bottom-0 inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold text-[#0D9C8A] mb-6">Apply for Visa</h2>
                        <form onSubmit={handleApply}>
                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* First Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            {/* Applied Date */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Applied Date</label>
                                <input
                                    type="date"
                                    name="appliedDate"
                                    value={formData.appliedDate}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* Fee */}
                            <div className="mb-6">
                                <label className="block text-gray-700">Fee</label>
                                <input
                                    type="text"
                                    name="fee"
                                    value={`$${formData.fee}`}
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-7 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700  hover:bg-gray-200 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-7 py-3 bg-[#0D9C8A] text-white rounded-lg font-semibold hover:bg-[#0DC1AD] transition duration-300"
                                >
                                    Apply
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaDetails;