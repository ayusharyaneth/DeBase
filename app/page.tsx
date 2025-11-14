"use client";

import React, { useEffect, useState } from "react";
import { useMiniApp } from "@neynar/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DailyCheckinModal from "../components/DailyCheckinModal";

export default function Home() {
  const { fc } = useMiniApp();
  const [showCheckin, setShowCheckin] = useState(false);
  const [neynar, setNeynar] = useState<{ score: number; delta24h: number } | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    // placeholder: load Neynar via serverless function / API (replace later)
    setNeynar({ score: 72, delta24h: 3 });
  }, []);

  // trigger first-open Add-to-Favorites via Neynar MiniApp SDK
  useEffect(() => {
    if (!fc) return;
    (async () => {
      try {
        const fav = await fc.isFavorited();
        if (!fav) {
          // show the native popup
          await fc.openAddToFavorites();
          // optional: if you want to display your own modal afterwards, toggle showAdd
          // setShowAdd(true);
        }
      } catch (err) {
        console.error("Neynar favorite check failed", err);
      }
    })();
  }, [fc]);

  return (
    <main style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: "#0052FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>DB</div>
          <h1 style={{ margin: 0 }}>DeBase</h1>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#666" }}>Neynar</div>
            <div style={{ fontWeight: 700 }}>{neynar ? neynar.score : "—"}</div>
          </div>
          <ConnectButton />
        </div>
      </header>

      <section style={{ display: "flex", gap: 20, marginTop: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={card}>
            <h3>Today’s Boosting Tasks</h3>
            <p style={{ color: "#666" }}>Small verified actions that increase your onchain presence</p>
            <ul>
              <li>Daily Onchain Check-in (cheap tx)</li>
              <li>Cast in a trending Farcaster channel</li>
              <li>Interact / Mint on Zora</li>
            </ul>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button style={primaryBtn} onClick={() => setShowCheckin(true)}>Boost Today</button>
              <button style={ghostBtn} onClick={() => alert("Open tasks list (TBD)")}>See Tasks</button>
            </div>
          </div>

          <div style={card}>
            <h3>Neynar Score</h3>
            {neynar ? (
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 28 }}>{neynar.score}</div>
                <div style={{ color: neynar.delta24h >= 0 ? "green" : "crimson" }}>{neynar.delta24h >= 0 ? "+" : ""}{neynar.delta24h} (24h)</div>
              </div>
            ) : <div>Loading...</div>}
            <div style={{ marginTop: 10 }}>
              <button style={linkBtn} onClick={() => alert("Open full Neynar details (TBD)")}>View full Neynar details</button>
            </div>
          </div>
        </div>

        <div style={{ width: 420 }}>
          <div style={card}>
            <h3>Activity timeline</h3>
            <div style={{ height: 220, background: "#111", borderRadius: 8, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Activity feed placeholder
            </div>
          </div>
        </div>
      </section>

      {showCheckin && <DailyCheckinModal onClose={() => setShowCheckin(false)} />}
    </main>
  );
}

const card = { padding: 18, borderRadius: 12, boxShadow: "0 6px 20px rgba(2,6,23,0.06)", background: "#fff", marginBottom: 18 } as const;
const primaryBtn = { background: "#0052FF", color: "#fff", padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer" } as const;
const ghostBtn = { background: "transparent", border: "1px solid #eee", padding: "10px 14px", borderRadius: 10 } as const;
const linkBtn = { background: "transparent", color: "#0052FF", border: "none", cursor: "pointer" } as const;
