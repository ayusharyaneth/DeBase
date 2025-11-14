import { useState } from 'react'
import { useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { CHECKIN_ABI, CHECKIN_CONTRACT_ADDRESS } from '../lib/contract'

export default function DailyCheckinModal ({ onClose }) {
  const { data: signer } = useSigner()
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState(null)
  const [error, setError] = useState(null)

  async function handleCheckin () {
    setError(null)
    if (!signer) return setError('Connect wallet first')
    setLoading(true)
    try {
      const contract = new ethers.Contract(CHECKIN_CONTRACT_ADDRESS, CHECKIN_ABI, signer)
      const tx = await contract.mark({ gasLimit: 200000 })
      setTxHash(tx.hash)
      await tx.wait()
      setLoading(false)
      alert('Check-in complete. Transaction: ' + tx.hash)
      onClose()
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Transaction failed')
      setLoading(false)
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginTop: 0 }}>Daily Onchain Check-In</h2>
        <p style={{ color: '#666' }}>This will perform a small on-chain action to boost your Neynar score and keep your streak alive.</p>

        <div style={{ marginTop: 12 }}>
          <button onClick={handleCheckin} disabled={loading} style={primaryBtn}>{loading ? 'Processing...' : 'Complete Today\'s Check-in'}</button>
          <button onClick={onClose} style={{ marginLeft: 8, padding: '10px 12px' }}>Close</button>
        </div>

        {txHash && <div style={{ marginTop: 12 }}>Tx: <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a></div>}
        {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  )
}

const overlay = { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', zIndex: 1000 }
const modal = { width: 520, background: '#fff', color: '#111', padding: 20, borderRadius: 12, position: 'relative', boxShadow: '0 10px 40px rgba(2,6,23,0.1)' }
const primaryBtn = { background: '#0052FF', color: '#fff', padding: '12px 16px', borderRadius: 10, border: 'none', cursor: 'pointer' }
