import "../globals.css";
import WalletProvider from "../components/WalletProvider";
import MiniAppWrapper from "../components/MiniAppWrapper";

export const metadata = {
  title: "DeBaseApp",
  description: "Daily Neynar + Base + Zora booster"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MiniAppWrapper>
          <WalletProvider>
            {children}
          </WalletProvider>
        </MiniAppWrapper>
      </body>
    </html>
  );
}
