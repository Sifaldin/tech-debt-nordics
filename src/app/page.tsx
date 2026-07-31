import HeroSection from './components/HeroSection';
import Locations from './components/Locations';
import ServicesSection from './components/ServicesSection';
import TrackRecord from './components/TrackRecord';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrackRecord />
      <ServicesSection />
      <Locations />
    </main>
  );
}
