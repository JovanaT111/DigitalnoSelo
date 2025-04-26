import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <img src="../src/assets/home.png" alt="Hero Image" className="hero-image" />
            </div>
        </section>
    );
};

export default HeroSection;