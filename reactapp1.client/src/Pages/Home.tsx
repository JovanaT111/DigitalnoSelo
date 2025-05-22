import AuthorizeView from "../Components/AuthorizeView.tsx";
import HeroSection from "../Components/HeroSection/HeroSection.tsx";
import Features from "../Components/Features/Features.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import Map from "../Components/Map/Map.tsx";
import TextSection from "../Components/TextSection/TextSection.tsx";

function Home() {
    return (
        <AuthorizeView>
            <HeroSection imageSrc="../src/assets/home.png" />
            <TextSection />
            <Map />
            <Features />
            <Footer />
        </AuthorizeView>
    );
}

export default Home;