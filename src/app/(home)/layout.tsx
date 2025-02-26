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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NotifyNotificationChange>
            <Navbar></Navbar>
            {children}
          </NotifyNotificationChange>
          <AntdRegistry />
          <Footer></Footer>
          <ToastContainer position="top-center" autoClose={1000} />
        </Providers>
      </body>
    </html>
  );
}
