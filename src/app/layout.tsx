import type { Metadata } from "next";
import "@styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Fyntrax",
  description: "Your financial brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className="fixed inset-0 z-[-1] bg-[url(/black-dot.png)] dark:bg-[url(/light-dot.png)] bg-[length:5px_5px]
        before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-background/50 before:to-background/50"
        />
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
