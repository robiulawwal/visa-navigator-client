import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#c3f2eb6f] to-[#baece57d] backdrop-blur-md py-12">
            <div className="container mx-auto px-6">
                {/* Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Information */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0D9C8A] mb-4">VisaVoyager</h3>
                        <p className="text-gray-700 mb-4">
                            Simplifying visa applications for a seamless travel experience.
                        </p>
                        <div className="flex space-x-4 justify-center md:justify-start">
                            <a
                                href="https://facebook.com"
                                className="text-gray-700 hover:text-[#0DC1AD] transition duration-300"
                            >
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://twitter.com"
                                className="text-gray-700 hover:text-[#0DC1AD] transition duration-300"
                            >
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a
                                href="https://instagram.com"
                                className="text-gray-700 hover:text-[#0DC1AD] transition duration-300"
                            >
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                className="text-gray-700 hover:text-[#0DC1AD] transition duration-300"
                            >
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0D9C8A] mb-4">Quick Links</h3>
                        <ul className="text-gray-700">
                            <li className="mb-2">  About Us   </li>
                            <li className="mb-2">  All Visas  </li>
                            <li className="mb-2"> Add Visa </li>
                            <li className="mb-2">  Contact Us  </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0D9C8A] mb-4">Contact Us</h3>
                        <ul className="text-gray-700">
                            <li className="flex items-center justify-center md:justify-start mb-2">
                                <FaMapMarkerAlt className="mr-2 text-[#0DC1AD]" />
                                123, Feni, Bangladesh
                            </li>
                            <li className="flex items-center justify-center md:justify-start mb-2">
                                <FaEnvelope className="mr-2 text-[#0DC1AD]" />
                                info@visavoyager.com

                            </li>
                            <li className="flex items-center justify-center md:justify-start mb-2">
                                <FaPhone className="mr-2 text-[#0DC1AD]" />

                                +1 (234) 567-890

                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0D9C8A] mb-4">Subscribe</h3>
                        <p className="text-gray-700 mb-4">
                            Get the latest updates and offers directly in your inbox.
                        </p>
                        <button
                            className="bg-gradient-to-r w-full from-[#0DC1AD] to-[#0D9C8A] text-white px-4 py-2 rounded-lg hover:from-[#0D9C8A] hover:to-[#0DC1AD] transition duration-300"
                        >
                            Subscribe
                        </button>

                    </div>
                </div>

                {/* Copyright Section */}
                <div className="text-center mt-6 pt-4 border-t border-[#0DC1AD] border-opacity-20">
                    <p className="text-gray-700">
                        © {new Date().getFullYear()} VisaVoyager. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;