import type { Metadata } from 'next';
import TeamCarousel from '../components/TeamCarousel';

export const metadata: Metadata = {
  title: 'Our Team - Tech Debt Nordics',
};

export default function TeamPage() {
  return (
    <main>
      <TeamCarousel />
    </main>
  );
}
