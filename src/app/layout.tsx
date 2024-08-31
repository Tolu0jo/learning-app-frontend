import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../redux/store"
import ClientComponent from "@/components/ClientComponent";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning App",
  description: "",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
<ClientComponent>
      {children}
</ClientComponent>
    
  
        </body>
    </html>
  );
}
