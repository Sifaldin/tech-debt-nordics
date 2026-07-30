import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Capability Statement — Tech Debt Nordics',
  description:
    'Tech Debt Nordics AB — capability statement: services, track record, team, and technology stack.',
};

export default function CapabilityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
