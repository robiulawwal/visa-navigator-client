import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../assets/slide-4.jpg';
import img2 from '../assets/slide-5.jpg';
import img3 from '../assets/slide-8.jpg';
import { FaArrowAltCircleRight, FaArrowRight } from 'react-icons/fa';

const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className="">
            <div className="relative overflow-hidden">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    className="mySwiper h-[300px] md:h-[400px] lg:h-[480px]"
                >
                    <SwiperSlide>
                        <div className="relative h-full flex items-center justify-center">
                            {/* Background Image */}
                            <img
                                src={img1}
                                alt="Slide 1"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> {/* Adjust opacity as needed */}

                            {/* Content */}
                            <div className="absolute inset-0 flex justify-center items-end mb-16">
                                <div className="text-center text-white rounded-lg space-y-5 w-3/4 mx-auto">
                                    <h2 className="text-2xl md:text-6xl font-bold">
                                    Permanent Residency Visa
                                    </h2>
                                    <p className="text-md md:text-xl max-w-2xl mx-auto">
                                    Make your dream come true to settle permanently in Your Dream Country
                                    </p>
                                    <button className='btn mt-10 text-white border-white bg-transparent text-lg py-6 hover:bg-white hover:text-black'>Get Started Now  <FaArrowRight></FaArrowRight> </button>
                                </div>
                            
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full flex items-center justify-center">
                            {/* Background Image */}
                            <img
                                src={img2}
                                alt="Slide 1"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> {/* Adjust opacity as needed */}

                            {/* Content */}
                            <div className="absolute inset-0 flex justify-center items-end mb-16">
                                <div className="text-center text-white rounded-lg md:space-y-7 space-y-4 mt-5 w-3/4 mx-auto">
                                    <h2 className="text-2xl md:text-6xl font-bold">
                                    We’re Most Trusted Immigration Agency
                                    </h2>
                                    <p className="text-md md:text-xl max-w-2xl mx-auto">
                                    Study Abroad
                                    We are your pathfinder at each step of Abroad Education Process
                                    </p>
                                    <button className='btn mt-7 text-white border-white bg-transparent text-lg py-6 hover:bg-white hover:text-black'>Get Started Now  <FaArrowRight></FaArrowRight> </button>
                                </div>
                            
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative h-full flex items-center justify-center">
                            {/* Background Image */}
                            <img
                                src={img3}
                                alt="Slide 1"
                                className="absolute inset-0 w-full h-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div> {/* Adjust opacity as needed */}

                            {/* Content */}
                            <div className="absolute inset-0 flex justify-center items-end mb-16">
                                <div className="text-center text-white rounded-lg space-y-5 w-3/4 mx-auto">
                                    <h2 className="text-2xl md:text-6xl font-bold">
                                    Tourist Visa
                                    </h2>
                                    <p className="text-md md:text-xl max-w-2xl mx-auto">
                                    Travel is only thing you buy that Makes You Richer to start your journey start applying today...
                                    </p>
                                    <button className='btn mt-10 text-white border-white bg-transparent text-lg py-6 hover:bg-white hover:text-black'>Get Started Now  <FaArrowRight></FaArrowRight> </button>
                                </div>
                            
                            </div>
                        </div>
                    </SwiperSlide>
        
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent} className="text-white"></span>
                    </div>
                </Swiper>
                {/* Custom Navigation Buttons */}
                <div className="swiper-button-next hidden md:flex items-center justify-center w-12 h-12 bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <div className="swiper-button-prev hidden md:flex items-center justify-center p-6 w-12 h-12 bg-opacity-20 hover:bg-opacity-30 transition-all duration-30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Slider;