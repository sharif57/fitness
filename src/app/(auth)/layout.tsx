
import React from 'react';
import '../globals.css';
import { ToastContainer } from 'react-toastify';
import Providers from '@/Providers/Providers';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        <Providers>
        {children}
        <ToastContainer  position="top-center" autoClose={1000}/>
        <AntdRegistry />
        </Providers>
      </body>
    </html> 
  );
}