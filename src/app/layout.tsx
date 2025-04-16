import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ICM',
  description: 'ICM - Visual Studio Code Clone',
  icons: {
    icon: '/avatar.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="overflow-hidden h-screen">
      <body className={`${inter.className} bg-gradient-to-br from-purple-500 to-cyan-500 h-screen overflow-hidden`} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
