"use client";

import "./globals.css";
import { MiniAppProvider } from "@neynar/react";
import WalletProvider from "../components/WalletProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MiniAppProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </MiniAppProvider>
      </body>
    </html>
  );
}
