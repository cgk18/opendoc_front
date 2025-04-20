import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'OpenDoc - Find the Right Doctor',
  description: 'Doctor recommendation system',
  icons: {
    icon: '/favicon.svg', // Use SVG directly
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}