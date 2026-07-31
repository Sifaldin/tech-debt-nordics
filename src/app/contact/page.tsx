import type { Metadata } from 'next';
import ContactSection from '../components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Tech Debt Nordics about B2B frontend, backend, full-stack, AI, native app or platform engineering work. Based in Stockholm, working in Dubai, Abu Dhabi, Riyadh, Amman and Damascus.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
