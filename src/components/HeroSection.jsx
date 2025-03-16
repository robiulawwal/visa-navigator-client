import React from "react";
import { Typewriter } from "react-simple-typewriter"; // Import React Simple Typewriter
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon

const HeroSection = () => {
  return (
      <div className="relative z-10 border-emerald-300 text-center text-gray-700 px-4 mt-8 mb-10 md:mb-14 border-l-4 w-3/4 md:w-fit mx-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading with Typewriter Effect */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Visa,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              <Typewriter
               words={["Your Way...", "Fast...", "Easy...", "Stress-Free...", "Reliable...", "Efficient..."]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl font-light max-w-[1300px] mx-auto ">
            Whether you're traveling for{" "}
            <span className="font-semibold text-pink-300">tourism</span>,{" "}
            <span className="font-semibold text-purple-300">business</span>,{" "}
            <span className="font-semibold text-blue-300">education</span>, or{" "}
            <span className="font-semibold text-green-300">work</span>, we simplify the visa process so you can focus on what matters most.
          </p>
        </div>
      </div>
  );
};

export default HeroSection;