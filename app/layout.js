// app/layout.js — Root layout
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Providers } from './providers';

export const metadata = {
  title: 'AI Rural Health Care — Smart Health Assistant',
  description: 'AI-powered health guidance for rural communities. Symptom checking, emergency help, and hospital connectivity.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
