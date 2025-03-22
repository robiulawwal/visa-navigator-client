import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextData/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]); // All applications
  const [filteredApplications, setFilteredApplications] = useState([]); // Filtered applications
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Fetch visa applications for the logged-in user
  useEffect(() => {
    fetch(`https://visa-navigator-server-rose-beta.vercel.app/my-applications?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setApplications(data); // Set all applications
        setFilteredApplications(data); // Initially, show all applications
      })
      .catch(() => {
        toast.error("Failed to fetch visa applications. Please try again.");
      });
  }, [user]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If the search query is empty, show all applications
      setFilteredApplications(applications);
    } else {
      // Filter applications based on the country name
      const filtered = applications.filter((app) =>
        app.countryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredApplications(filtered);
    }
  };

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
        fetch(`https://visa-navigator-server-rose-beta.vercel.app/visa-applications/${applicationId}?email=${user.email}`, {
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
              setFilteredApplications(updatedApplications); // Update filtered list
              Swal.fire({
                title: "Canceled!",
                text: "Your visa application has been canceled.",
                icon: "success",
              });
            } else {
              toast.error("Failed to cancel the application. Please try again.");
            }
          })
          .catch(() => {
            toast.error("An error occurred. Please try again.");
          });
      }
    });
  };

  return (
    <div className="bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-[#0D9C8A] text-center mb-12">
          My Visa Applications
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search by country name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Trigger search on Enter
              className="w-full p-3 outline-none focus:ring-2 focus:ring-[#0D9C8A] bg-base-100"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-[#0D9C8A] to-[#0DC1AD] text-white font-semibold hover:from-[#0DC1AD] hover:bg-accent"
            >
              Search
            </button>
          </div>
        </div>

        {/* Applications Grid */}
        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className=" rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                {/* Country Image */}
                <img
                  src={application.countryImage}
                  alt={application.countryName}
                  className="w-full h-48 object-cover"
                />

                {/* Application Details */}
                <div className="p-6 bg-gradient-to-b bg-base-200">
                  {/* Country Name and Visa Type */}
                  <h2 className="text-2xl font-bold text-[#1F2937] mb-4">
                    {application.countryName}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-[#4B5563]">Visa Type:</span>{" "}
                    <span className="text-[#6B46C1]">{application.visaType}</span>
                  </p>

                  {/* Processing Time and Fee */}
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#4B5563]">Processing Time:</span>{" "}
                      <span className="text-[#10B981]">{application.processingTime}</span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#4B5563]">Fee:</span>{" "}
                      <span className="text-[#EF4444]">${application.fee}</span>
                    </p>
                  </div>

                  {/* Validity and Application Method */}
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#4B5563]">Validity:</span>{" "}
                      <span className="text-[#3B82F6]">{application.validity}</span>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#4B5563]">Method:</span>{" "}
                      <span className="text-[#F59E0B]">{application.applicationMethod}</span>
                    </p>
                  </div>

                  {/* Applicant Details */}
                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-semibold text-[#4B5563]">Applicant:</span>{" "}
                      <span className="text-[#9333EA]">{application.firstName} {application.lastName}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold text-[#4B5563]">Email:</span>{" "}
                      <span className="text-[#3B82F6]">{application.email}</span>
                    </p>
                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold text-[#4B5563]">Applied Date:</span>{" "}
                      <span className="text-[#10B981]">{application.appliedDate}</span>
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
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
              alt="No Data"
              className="w-40 h-40 mb-4 mx-auto"
            />
            <h2 className="text-3xl font-bold text-[#4B5563] mb-4">
              No Applications Found
            </h2>
            <p className="text-gray-500 text-lg mb-6">
              {searchQuery.trim() === ""
                ? "You haven't applied for any visas yet. Start your journey today!"
                : `No applications found for "${searchQuery}".`}
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