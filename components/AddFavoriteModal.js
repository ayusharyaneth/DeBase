export default function AddFavoriteModal ({ onClose, onAdd }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ marginTop: 0 }}>Add DeBase to your apps</h2>
        <p style={{ color: '#666' }}>Add DeBase to your favorites to get daily reminders and quick access to boosts.</p>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={onClose} style={laterBtn}>Later</button>
          <button onClick={onAdd} style={addBtn}>Add DeBase</button>
        </div>

        <button onClick={onClose} style={closeBtn}>✕</button>
      </div>
    </div>
  )
}

const overlay = {
  position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', zIndex: 1000
}
const modal = {
  width: 420, background: '#0f1720', color: '#fff', padding: 20, borderRadius: 12, position: 'relative', boxShadow: '0 10px 40px rgba(2,6,23,0.6)'
}
const addBtn = { marginLeft: 'auto', background: '#00D1FF', color: '#022', border: 'none', padding: '10px 14px', borderRadius: 10, cursor: 'pointer' }
const laterBtn = { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.08)', padding: '10px 14px', borderRadius: 10, cursor: 'pointer' }
const closeBtn = { position: 'absolute', top: 8, right: 10, background: 'transparent', color: '#fff', border: 'none', fontSize: 16, cursor: 'pointer' }
