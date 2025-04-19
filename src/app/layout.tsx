import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'OpenDoc - Find the Right Doctor',
  description: 'Doctor recommendation system',
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
        {children}
      </body>
    </html>
  );
}