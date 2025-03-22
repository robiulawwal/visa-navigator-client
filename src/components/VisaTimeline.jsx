import { useState } from "react";

const VisaTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Application Submitted",
      description: "Your visa application has been successfully submitted.",
      icon: "📄",
    },
    {
      title: "Under Review",
      description: "Our team is reviewing your application.",
      icon: "🔍",
    },
    {
      title: "Document Verification",
      description: "Your documents are being verified.",
      icon: "📑",
    },
    {
      title: "Approval Pending",
      description: "Waiting for final approval from the authorities.",
      icon: "⏳",
    },
    {
      title: "Visa Approved",
      description: "Congratulations! Your visa has been approved.",
      icon: "✅",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-base-100 to-base-300  pt-8 pb-35 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0D9C8A] dark:text-[#34D399] text-center mb-20">
          Visa Processing Timeline
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute hidden md:flex left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 top-1/3 transform -translate-y-1/2"></div>

          {/* Steps */}
          <div className="flex justify-between md:flex-row flex-col gap-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl transition-all duration-300 ${
                    activeStep === index
                      ? "bg-[#0D9C8A] dark:bg-[#34D399] text-white scale-110"
                      : "bg-base-100 dark:bg-gray-700 text-base-content "
                  }`}
                >
                  {step.icon}
                </div>

                {/* Step Title */}
                <p
                  className={`mt-2 text-sm font-semibold text-center transition-all duration-300 ${
                    activeStep === index
                      ? "text-[#0D9C8A] dark:text-[#34D399]"
                      : "text-base-content "
                  }`}
                >
                  {step.title}
                </p>

                {/* Step Descriptions */}
                {activeStep === index && (
                  <div className="absolute z-10 top-22 w-48 p-4 bg-base-100 rounded-lg shadow-lg text-sm text-base-content ">
                    {step.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaTimeline;
