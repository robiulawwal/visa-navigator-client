import React from 'react';
import Slider from './Slider';
import HeroSection from './HeroSection';
import LatestVisas from './LatestVisas';
import VisaTimeline from './VisaTimeline';
import Section from './Section';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <Slider></Slider>
            <LatestVisas></LatestVisas>
            <VisaTimeline></VisaTimeline>
            <Section></Section>
        </div>
    );
};

export default Home;