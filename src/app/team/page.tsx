import type { Metadata } from 'next';
import TeamCarousel from '../components/TeamCarousel';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Senior frontend, backend, full-stack and AI engineers who have built and scaled software at Klarna, Visa, Tink, Tietoevry, Kindred and Ubiquiti.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return (
    <main>
      <TeamCarousel />
    </main>
  );
}
