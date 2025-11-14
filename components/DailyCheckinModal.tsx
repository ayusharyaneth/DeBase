"use client";

import React, { useState } from "react";
import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { CHECKIN_ABI, CHECKIN_CONTRACT_ADDRESS } from "../lib/contract";

export default function DailyCheckinModal({ onClose }: { onClose: () => void }) {
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckin() {
    setError(null);
    if (!signer) return setError("Connect wallet first");
    try {
      setLoading(true);
      const contract = new ethers.Contract(CHECKIN_CONTRACT_ADDRESS, CHECKIN_ABI, signer);
      const tx = await contract.mark({ gasLimit: 200000 });
      setTxHash(tx.hash);
      await tx.wait();
      setLoading(false);
      alert("Check-in complete: " + tx.hash);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Tx failed");
      setLoading(false);
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Daily Onchain Check-In</h2>
        <p>Perform a minimal transaction to keep your Neynar momentum and streak alive.</p>
        <div style={{ marginTop: 12 }}>
          <button onClick={handleCheckin} disabled={loading} style={primaryBtn}>
            {loading ? "Processing..." : "Complete Today's Check-in"}
          </button>
          <button onClick={onClose} style={{ marginLeft: 8 }}>Close</button>
        </div>

        {txHash && <div style={{ marginTop: 12 }}>Tx: <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a></div>}
        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}

const overlay = { position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", zIndex: 1000 } as const;
const modal = { width: 520, background: "#fff", color: "#111", padding: 20, borderRadius: 12, position: "relative", boxShadow: "0 10px 40px rgba(2,6,23,0.1)" } as const;
const primaryBtn = { background: "#0052FF", color: "#fff", padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer" } as const;
