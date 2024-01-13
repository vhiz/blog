import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--poppins-font",
});

export const metadata = {
  title: "Blog",
  description: "The best blog app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col justify-between w-full m-auto px-[20px]  min-h-[100vh] md:px-[30px] xl:w-[80vw] xl:px-[50px]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
