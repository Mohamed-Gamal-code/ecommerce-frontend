/** @format */
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-montserrat",
});


export const metadata = {
  title: {
    default: "VELOCORE | Premium Digital Store",
    template: "%s | VELOCORE"
  },
  description: "Experience the next generation of seamless digital shopping with VELOCORE. High-end curation for modern users.",
  keywords: ["E-commerce", "VELOCORE", "Next.js Store", "Modern Shopping", "Premium Tech"],
  authors: [{ name: "VELOCORE Team" }],
  icons: {
    icon: "/favicon.ico", 
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-20 min-h-screen">
              {children}
            </main>
            <Toaster richColors position="top-right" />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}