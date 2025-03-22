import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import passportPng from "../assets/passport1.png";
import dubaiPng from '../assets/dubai.png'
import germanyPng from '../assets/f1.png'
import australiaPng from '../assets/flag-1 (1).jpg'
import englandPng from '../assets/f5.png'
import { Typewriter } from 'react-simple-typewriter';
const LatestVisas = () => {
    const [latestVisas, setLatestVisas] = useState([]);

    useEffect(() => {
        fetch("https://visa-navigator-server-rose-beta.vercel.app/latest-visas")
            .then((res) => res.json())
            .then((data) => setLatestVisas(data));
    }, []);

    return (
        <div>
            {/* Latest Visas Section */}
            <div className="max-w-7xl mx-auto py-12 px-6">
                <div className="text-4xl font-bold text-center mb-8">
                    <span className="text-gray-600">Latest Visas...</span>
                    <h2 className="text-accent mt-3">
                        <Typewriter
                            words={['Click see all to see all the visas']}
                            loop={false} // Set to true if you want it to repeat
                            cursor
                            cursorStyle="_"
                            typeSpeed={50}
                            deleteSpeed={30}
                        />
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {latestVisas.length < 1 &&
                        <div className=" col-span-3 py-10 flex items-center justify-center bg-gradient-to-b from-[#F4F3F0] to-[#E0F2F1]">
                            <div className="text-center">
                                {/* Loading Spinner */}
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#0D9C8A] border-opacity-50 mx-auto"></div>
                                <p className="mt-8 text-lg text-[#0D9C8A] font-semibold">Loading visas...</p>
                            </div>
                        </div>}
                    {latestVisas.map((visa) => (
                        <div
                            key={visa._id}
                            className="border border-gray-200 p-6 rounded-lg bg-white/30"

                        >
                            {visa.countryImage && (
                                <img
                                    src={visa.countryImage}
                                    alt={visa.countryName || "Country"}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{visa.countryName || "N/A"}</h3>
                            <p className="text-gray-600 mb-1"><span className="font-medium text-gray-700">Visa Type:</span> {visa.visaType || "N/A"}</p>
                            <p className="text-gray-600 mb-1"><span className="font-medium text-gray-700">Processing Time:</span> {visa.processingTime || "N/A"}</p>
                            <p className="text-gray-600 mb-1"><span className="font-medium text-gray-700">Fee:</span> ${visa.fee || "N/A"}</p>
                            <p className="text-gray-600 mb-1"><span className="font-medium text-gray-700">Validity:</span> {visa.validity || "N/A"}</p>
                            <p className="text-gray-600 mb-4"><span className="font-medium text-gray-700">Application:</span> {visa.applicationMethod || "N/A"}</p>
                            <Link
                                to={`/visa-details/${visa._id}`}
                                className="mt-4 block btn btn-soft btn-accent border-accent py-2 px-4 text-center rounded-md  transition-colors"
                            >
                                See Details <FaArrowRight className="inline ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8 border-2 w-fit mx-auto rounded-md p-2 border-accent">
                    <Link
                        to="/all-visas"
                        className="inline-block bg-accent hover:bg-accent/80 text-white py-3 px-6 rounded-md  transition-colors"
                    >
                        See All Visas
                    </Link>
                </div>
            </div>

            {/* Extra Section 1 - Styled as per the given image */}
            <div className="bg-base-200 py-12">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
    <img src={passportPng} alt="Passport" className="w-2/3 md:w-1/3 object-contain" />
    <div className="md:w-2/3 md:pl-8">
      <h2 className="text-3xl font-bold mb-4 text-base-content">Choose Your Destination</h2>
      <div className="grid grid-cols-2 gap-2 md:gap-6">
        {[{ name: "Australia", flag: australiaPng }, { name: "Germany", flag: germanyPng }, { name: "England", flag: englandPng }, { name: "Dubai", flag: dubaiPng }].map((country) => (
          <div key={country.name} className="flex items-center justify-between border-2 p-4 rounded-lg border-base-300 gap-2 backdrop-blur-sm bg-base-100/30">
            <div className="flex items-center space-x-3">
              <img className="w-8 md:w-20" src={country.flag} alt="" />
              <h3 className="text-lg font-semibold text-base-content">{country.name}</h3>
            </div>
            <FaArrowRight className="text-base-content/50 md:text-2xl" />
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

        </div>
    );
};

export default LatestVisas;