import { AboutusSection, HeroSection, OurTeamSection, OurservicesSection, PriceListSection } from "@/components/sections";
import ContactFormSection from "@/components/sections/ContactFormSection";
import StatisticSection from "@/components/sections/StatisticSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutusSection />
      <OurservicesSection />
      <OurTeamSection />
      <PriceListSection />
      <StatisticSection />
      <ContactFormSection />
    </main>
  );
}
