import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  // Fetch visa applications for the logged-in user
  useEffect(() => {

      fetch(`http://localhost:5000/my-applications?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setApplications(data))
        .catch((error) => {
          console.error("Error fetching applications:", error);
        });
  }, [user]);

  // Handle cancel application
  const handleCancelApplication = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/visa-applications/${applicationId}?email=${user.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Remove the canceled application from the UI
              const updatedApplications = applications.filter(
                (app) => app._id !== applicationId
              );
              setApplications(updatedApplications);
              Swal.fire({
                title: "Canceled!",
                text: "Your visa application has been canceled.",
                icon: "success",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to cancel the application. Please try again.",
              });
            }
          });
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#F0F4F8] to-[#E0F2F1] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-[#0D9C8A] text-center mb-12">
          My Visa Applications
        </h1>

        {/* Applications Grid */}
        {applications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                {/* Country Image */}
                <img
                  src={application.countryImage}
                  alt={application.countryName}
                  className="w-full h-48 object-cover"
                />

                {/* Application Details */}
                <div className="p-6">
                  {/* Country Name and Visa Type */}
                  <h2 className="text-2xl font-bold text-[#0D9C8A] mb-4">
                    {application.countryName}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Visa Type:</span>{" "}
                    {application.visaType}
                  </p>

                  {/* Processing Time and Fee */}
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Processing Time:</span>{" "}
                      {application.processingTime}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Fee:</span> $
                      {application.fee}
                    </p>
                  </div>

                  {/* Validity and Application Method */}
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Validity:</span>{" "}
                      {application.validity}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Method:</span>{" "}
                      {application.applicationMethod}
                    </p>
                  </div>

                  {/* Applicant Details */}
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Applicant:</span>{" "}
                      {application.firstName} {application.lastName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span>{" "}
                      {application.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Applied Date:</span>{" "}
                      {application.appliedDate}
                    </p>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancelApplication(application._id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#EF4444] to-[#F87171] text-white font-semibold rounded-lg hover:from-[#F87171] hover:to-[#EF4444] transition-all duration-300 shadow-md"
                  >
                    Cancel Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center">
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
            <h2 className="text-3xl font-bold text-[#4B5563] mb-4">
              No Applications Found
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              You haven't applied for any visas yet. Start your journey today!
            </p>
            <Link
              to="/all-visas"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#0D9C8A] to-[#0DC1AD] text-white font-semibold rounded-lg hover:from-[#0DC1AD] hover:to-[#0D9C8A] transition-all duration-300 shadow-md"
            >
              Explore Visas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;