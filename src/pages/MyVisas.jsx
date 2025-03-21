import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyVisas = () => {
    const { user } = useContext(AuthContext);
    // const loaderVisas = useLoaderData();
    const [visas, setVisas] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedVisa, setSelectedVisa] = useState(null);
    // Fetch visas added by the logged-in user
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/my-added-visas?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setVisas(data));
        }
        else {
            setVisas([])
        }
    }, [user]);

    // Handle delete visa
    const handleDeleteVisa = (visaId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/my-visas/${visaId}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            const updatedVisas = visas.filter(visa => visa._id !== visaId);
                            setVisas(updatedVisas);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Visa has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Failed to delete the visa try again!",
                            });
                        }
                    })

            }
        });

    };

    // Handle update visa
    const handleUpdateVisa = (visa) => {
        setSelectedVisa(visa); 
        setIsUpdateModalOpen(true);
    };

    // // Handle update form submission
    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const updatedVisa = {
            ...selectedVisa,
            countryImage: e.target.countryImage.value,
            countryName: e.target.countryName.value,
            visaType: e.target.visaType.value,
            processingTime: e.target.processingTime.value,
            fee: e.target.fee.value,
            validity: e.target.validity.value,
            applicationMethod: e.target.applicationMethod.value,
            ageRestriction: e.target.ageRestriction.value,
        };

        fetch(`http://localhost:5000/update-visa/${selectedVisa._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVisa),
        })
            .then( res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    const updatedVisas = visas.map(visa =>
                        visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
                    );
                    setVisas(updatedVisas); // Update the state
                    setIsUpdateModalOpen(false); // Close the modal
                    Swal.fire("Visa updated successfully!", "Success", "success");
                } else {
                    Swal.fire("No changed was made!","Failed", "error");
                }
            })
            .catch(() => {
                toast.error("Failed to update visa. Please try again.");
               
            });

    };

    if (visas.length > 0) {
        return (
            <div className="py-12 bg-base-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-[#0D9C8A] text-center mb-12">My Added Visas</h1>

                    {/* Visa Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visas.map((visa) => (
                            <div key={visa._id} className="backdrop-sepia-100 rounded-lg shadow-lg overflow-hidden">
                                {/* Visa Image */}
                                <img
                                    src={visa.countryImage}
                                    alt={visa.countryName}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Visa Details */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-[#0D9C8A] mb-4">{visa.countryName}</h2>
                                    <p className="text-base-content mb-2"><span className="font-semibold">Visa Type:</span> {visa.visaType}</p>
                                    <p className="text-base-content mb-2"><span className="font-semibold">Processing Time:</span> {visa.processingTime}</p>
                                    <p className="text-base-content mb-2"><span className="font-semibold">Fee:</span> ${visa.fee}</p>
                                    <p className="text-base-content mb-2"><span className="font-semibold">Validity:</span> {visa.validity}</p>
                                    <p className="text-base-content mb-4"><span className="font-semibold">Application Method:</span> {visa.applicationMethod}</p>

                                    {/* Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleUpdateVisa(visa)}
                                            className="px-4 py-2 bg-[#0D9C8A] text-white rounded-lg hover:bg-[#0DC1AD] transition duration-300"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVisa(visa._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Update Visa Modal */}
                {isUpdateModalOpen && selectedVisa && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-2xl font-bold text-[#0D9C8A] mb-6">Update Visa</h2>

                            <form onSubmit={handleUpdateSubmit} className="space-y-6">
                                {/* Grid Layout for Input Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                                    {/* Country Image */}
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Country Photo</label>
                                        <input
                                            type="text"
                                            name="countryImage"
                                            defaultValue={selectedVisa.countryImage}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Country Name */}
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">Country Name</label>
                                        <input
                                            type="text"
                                            name="countryName"
                                            defaultValue={selectedVisa.countryName}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Visa Type */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-2">Visa Type</label>
                                        <input
                                            type="text"
                                            name="visaType"
                                            defaultValue={selectedVisa.visaType}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Processing Time */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-2">Processing Time</label>
                                        <input
                                            type="text"
                                            name="processingTime"
                                            defaultValue={selectedVisa.processingTime}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Fee */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-2">Fee</label>
                                        <input
                                            type="number"
                                            name="fee"
                                            defaultValue={selectedVisa.fee}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Validity */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-2">Validity</label>
                                        <input
                                            type="text"
                                            name="validity"
                                            defaultValue={selectedVisa.validity}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Application Method */}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-gray-700 font-medium mb-2">Application Method</label>
                                        <input
                                            type="text"
                                            name="applicationMethod"
                                            defaultValue={selectedVisa.applicationMethod}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Age Restriction */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Age Restriction</label>
                                        <input
                                            type="text"
                                            name="ageRestriction"
                                            defaultValue={selectedVisa.ageRestriction}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9C8A] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 justify-end mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsUpdateModalOpen(false)}
                                        className="px-6 py-2.5 border border-gray-500 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#0D9C8A] text-white rounded-lg font-semibold hover:bg-[#0DC1AD] transition duration-300"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    else {
        return (
            <div className="bg-gradient-to-b from-white to-[#E0F2F1] py-10 flex items-center justify-center">
                <div className="text-center max-w-2xl px-4">
                    {/* Minimalistic Empty State SVG */}
                    <svg
                        className="w-40 h-40 mx-auto mb-6 text-[#9CA3AF]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>

                    {/* Heading */}
                    <h1 className="text-3xl font-bold text-[#4B5563] mb-6">
                        No Visas Added Yet
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-lg mb-9">
                        It looks like you haven't added any visas yet. Start by adding a new visa to simplify your travel planning!
                    </p>

                    {/* Add Visa Button */}
                    <Link
                        to="/add-visa"
                        className="inline-flex mb-8 items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#0D9C8A] to-[#0DC1AD] text-white font-semibold rounded-lg hover:from-[#0DC1AD] hover:to-[#0D9C8A] transition-all duration-300 shadow-md"
                    >
                        <span>Add Visa</span>
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }
};

export default MyVisas;