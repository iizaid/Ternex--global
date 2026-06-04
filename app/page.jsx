import Navbar from "@/components/site/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutStorySection from "@/components/sections/AboutStorySection";
import BrandIntroSection from "@/components/sections/BrandIntroSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutStorySection />
        <BrandIntroSection />
        <FooterSection />
      </main>
    </>
  );
}
