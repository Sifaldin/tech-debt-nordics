import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Capability Statement',
  description:
    'Tech Debt Nordics AB capability statement: B2B frontend, backend, full-stack, AI, native app, cloud and integration engineering services, track record, team and technology stack.',
  alternates: { canonical: '/capability-statement' },
};

export default function CapabilityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
