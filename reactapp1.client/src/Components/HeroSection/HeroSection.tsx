import React from 'react';

interface HeroSectionProps {
    imageSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc }) => {
    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <img src={imageSrc} alt="Hero Image" className="hero-image" />
            </div>
        </section>
    );
};

export default HeroSection;