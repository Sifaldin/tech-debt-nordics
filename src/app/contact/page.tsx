import type { Metadata } from 'next';
import ContactSection from '../components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact — Tech Debt Nordics',
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
