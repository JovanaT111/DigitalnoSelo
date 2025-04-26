import AuthorizeView from "../Components/AuthorizeView.tsx";
import Header from "../Components/Header/Header.tsx";
import HeroSection from "../Components/HeroSection/HeroSection.tsx";
import Features from "../Components/Features/Features.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import Map from "../Components/Map/Map.tsx";

function Home() {
    return (
        <AuthorizeView>
            <Header />
            <HeroSection />
            <Map />
            <Features />
            <Footer />
        </AuthorizeView>
    );
}

export default Home;