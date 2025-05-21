"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ToastContainer } from "react-toastify";
import Providers from "@/Providers/Providers";
import NotifyNotificationChange, {
  NotificationContext,
} from "@/Providers/NotifyNotificationChange";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Check if current route is /chat or /chat/:id
  const hideLayout = pathname ? /^\/chat(\/[^\/]*)?$/.test(pathname) : false;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NotifyNotificationChange>
            {/* <Navbar></Navbar>
            {children} */}
            {!hideLayout && <Navbar />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
          </NotifyNotificationChange>
          <AntdRegistry />
          {/* <Footer></Footer> */}
          <ToastContainer position="top-center" autoClose={1000} />
        </Providers>
      </body>
    </html>
  );
}
