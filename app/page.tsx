"use client";

import { useEffect } from "react";
import { useMiniApp } from "@neynar/react";

export default function Home() {
  const { fc } = useMiniApp();

  useEffect(() => {
    if (!fc) return;

    async function handleFavorite() {
      try {
        const isFav = await fc.isFavorited();
        if (!isFav) {
          fc.openAddToFavorites();
        }
      } catch (err) {
        console.error("Favorite check failed:", err);
      }
    }

    handleFavorite();
  }, [fc]);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>DeBase</h1>
      <p>Your Farcaster + Zora + Base boost dashboard.</p>
    </main>
  );
}
