import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import AddFavoriteModal from '../components/AddFavoriteModal'
import DailyCheckinModal from '../components/DailyCheckinModal'
import { useAccount } from 'wagmi'

export default function Home () {
  const { address } = useAccount()
  const [showAdd, setShowAdd] = useState(false)
  const [showCheckin, setShowCheckin] = useState(false)
  const [firstOpenSeen, setFirstOpenSeen] = useState(false)
  const [neynarScore, setNeynarScore] = useState(null)

  // Show add-to-favorites modal on first load (persisted in localStorage)
  useEffect(() => {
    const seen = localStorage.getItem('debase_add_seen')
    if (!seen) {
      setShowAdd(true)
      localStorage.setItem('debase_add_seen', '1')
    }
  }, [])

  useEffect(() => {
    // TODO: Replace with real Neynar API fetch
    setNeynarScore({ score: 72, delta24h: +3 })
  }, [address])

  return (
    <div>
      <Head>
        <title>DeBaseApp — Daily</title>
      </Head>

      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={styles.avatarBox}>DB</div>
          <h1 style={{ margin: 0 }}>DeBase</h1>
        </div>
        <ConnectButton />
      </header>

      <main style={styles.container}>
        <section style={styles.leftColumn}>
          <div style={styles.card}>
            <h3>Today’s Boosting Tasks</h3>
            <p>Daily tasks that raise Neynar & Base activity</p>
            <ul>
              <li>Daily Onchain Check-in (cheap tx)</li>
              <li>Cast in a trending channel</li>
              <li>Mint or interact on Zora</li>
            </ul>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button style={styles.primaryBtn} onClick={() => setShowCheckin(true)}>Boost Today</button>
              <button style={styles.ghostBtn} onClick={() => alert('Open tasks list (TBD)')}>See Tasks</button>
            </div>
          </div>

          <div style={styles.card}>
            <h3>Neynar Score</h3>
            {neynarScore
              ? <div>
                  <div style={{ fontSize: 28 }}>{neynarScore.score}</div>
                  <div style={{ color: neynarScore.delta24h >= 0 ? 'green' : 'crimson' }}>
                    {neynarScore.delta24h >= 0 ? '+' : ''}{neynarScore.delta24h} (24h)
                  </div>
                </div>
              : <div>Loading...</div>}
            <div style={{ marginTop: 10 }}>
              <button style={styles.linkBtn} onClick={() => alert('Open full Neynar page (TBD)')}>View full Neynar details</button>
            </div>
          </div>
        </section>

        <section style={styles.rightColumn}>
          <div style={styles.card}>
            <h3>Activity timeline</h3>
            <p>Recent onchain interactions (placeholder)</p>
            <div style={{ height: 120, background: '#111', borderRadius: 8, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Activity feed placeholder
            </div>
          </div>
        </section>
      </main>

      {showAdd && <AddFavoriteModal onClose={() => setShowAdd(false)} onAdd={() => { setShowAdd(false); alert('Added to favorites (UX placeholder)') }} />}
      {showCheckin && <DailyCheckinModal onClose={() => setShowCheckin(false)} />}

      <footer style={styles.footer}>
        <div>© DeBaseApp</div>
      </footer>
    </div>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #eee' },
  avatarBox: { width: 40, height: 40, borderRadius: 8, background: '#0052FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  container: { display: 'flex', gap: 20, padding: 24, maxWidth: 1100, margin: '0 auto' },
  leftColumn: { flex: 1, display: 'flex', flexDirection: 'column', gap: 18 },
  rightColumn: { flex: 1 },
  card: { padding: 18, borderRadius: 12, boxShadow: '0 4px 18px rgba(0,0,0,0.04)', background: '#fff' },
  primaryBtn: { background: '#0052FF', color: '#fff', padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer' },
  ghostBtn: { background: 'transparent', border: '1px solid #ddd', padding: '10px 14px', borderRadius: 10, cursor: 'pointer' },
  linkBtn: { background: 'transparent', color: '#0052FF', border: 'none', cursor: 'pointer' },
  footer: { padding: 20, borderTop: '1px solid #eee', textAlign: 'center', marginTop: 40 }
}
