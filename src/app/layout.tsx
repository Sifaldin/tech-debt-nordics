import type { Metadata } from 'next';
import {
  Chakra_Petch,
  Inter,
  JetBrains_Mono,
  Rajdhani,
  Share_Tech_Mono,
} from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  weight: ['500', '700'],
  subsets: ['latin'],
});

const chakraPetch = Chakra_Petch({
  variable: '--font-chakra',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  weight: ['500', '600', '700'],
  subsets: ['latin'],
});

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tech Debt Nordics - Web Consultancy',
  description:
    'Tech Debt Nordics or Tech Debt Nordics AB helps companies manage and reduce technical debt through modern web consultancy and engineering expertise.',
  openGraph: {
    title: 'Tech Debt Nordics - Web Consultancy',
    description:
      'Helping companies reduce technical debt and build modern web products.',
    url: 'https://techdebtnordics.se',
    siteName: 'Tech Debt Nordics',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Debt Nordics - Web Consultancy',
    description:
      'Helping companies reduce technical debt and build modern web products.',
    images: ['https://techdebtnordics.se/assets/techdebt.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${chakraPetch.variable} ${rajdhani.variable} ${shareTechMono.variable} saldo-backdrop antialiased flex min-h-dvh flex-col`}
      >
        <NavBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
