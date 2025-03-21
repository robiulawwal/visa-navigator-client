import React from "react";
import Lottie from "lottie-react";

const Section = () => {
  // Array of animations with titles, descriptions, and public URLs
  const animations = [
    {
      title: "Explore the World",
      description: "Discover new destinations and plan your next adventure.",
      url: "https://assets10.lottiefiles.com/packages/lf20_gn0tojcq.json", // Travel animation
    },
    {
      title: "Fast Visa Processing",
      description: "Get your visa approved quickly with our seamless process.",
      url: "https://assets1.lottiefiles.com/packages/lf20_5tkzkblw.json", // Passport stamp animation
    },
    {
      title: "Global Coverage",
      description: "We support visa applications for over 100 countries.",
      url: "https://assets8.lottiefiles.com/packages/lf20_2cwDXD.json", // Globe animation
    },
    {
      title: "Easy Application",
      description: "Apply for your visa online in just a few simple steps.",
      url: "https://assets10.lottiefiles.com/packages/lf20_gn0tojcq.json", // Travel animation
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#d6fcf66f] to-[#9bede27d] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-emerald-400 text-center mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {animations.map((animation, index) => (
            <div
              key={index}
              className="bg-base-100 flex flex-col justify-between rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              {/* Animation */}
              <div className="p-6">
                <Lottie
                  animationData={null} // Use `path` instead of `animationData`
                  path={animation.url} // Load animation from URL
                  loop={true}
                  autoplay={true}
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-gradient-to-b from-base-300 to-base-100">
                <h3 className="text-2xl font-bold text-[#0D9C8A] mb-4">
                  {animation.title}
                </h3>
                <p className="text-gray-600">{animation.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;