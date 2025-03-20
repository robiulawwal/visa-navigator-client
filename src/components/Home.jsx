import React from 'react';
import Slider from './Slider';
import HeroSection from './HeroSection';
import LatestVisas from './LatestVisas';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <Slider></Slider>
            <LatestVisas></LatestVisas>
        </div>
    );
};

export default Home;