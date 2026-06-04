import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/site/PageLoader";
import ClickSpark from "@/components/site/ClickSpark";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  title: "TERNEX | Food Import Company",
  description:
    "TERNEX is an Amman-based food import company bringing global chocolate, snacks, and packaged food products to Jordan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable}`}>
        <PageLoader />
        <ClickSpark
          sparkColor="#c98222"
          sparkSize={12}
          sparkRadius={22}
          sparkCount={8}
          duration={450}
          extraScale={1.2}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
