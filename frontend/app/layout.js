// src/app/layout.js
import '../app/globals.css';

export const metadata = {
  title: 'eSalesOne',
  description: 'eCommerce Checkout Flow Simulation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 to-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
