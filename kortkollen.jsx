// ─── Firebase ─────────────────────────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNOMnKHmCmLRSEanFi0yMDEN7FSYAR4HU",
  authDomain: "kortkollen-c6dcc.firebaseapp.com",
  projectId: "kortkollen-c6dcc",
  storageBucket: "kortkollen-c6dcc.firebasestorage.app",
  messagingSenderId: "900791021312",
  appId: "1:900791021312:web:f9a2e247a669a4f7bc7b06"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const DATA_DOC = doc(db, "kortkollen", "shared");

async function saveToFirebase(data) {
  try { await setDoc(DATA_DOC, { payload: JSON.stringify(data) }); }
  catch(e) { console.error("Firebase save error", e); }
}

// ─── React ────────────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

const USERS = ["Douglas", "Camilla"];

const STORE_EMOJIS = {
  "ICA": "🛒", "Coop": "🛒", "Willys": "🛒", "Lidl": "🛒",
  "H&M": "👗", "Zara": "👗", "Lindex": "👗", "Gina Tricot": "👗",
  "IKEA": "🛋️", "Jysk": "🛋️", "Elgiganten": "🔌", "MediaMarkt": "🔌",
  "Netflix": "🎬", "Spotify": "🎵", "Steam": "🎮", "Zalando": "👟",
  "Stadium": "⚽", "Intersport": "⚽", "Kicks": "💄", "Åhléns": "🏬",
  "NK": "🏬", "Amazon": "📦", "Apple": "🍎", "Google": "🔍",
};

function getEmoji(store) {
  for (const [k, v] of Object.entries(STORE_EMOJIS)) {
    if (store.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return "🎁";
}

function uid() { return Math.random().toString(36).slice(2, 10); }

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { year: "numeric", month: "short", day: "numeric" });
}

function isExpiringSoon(iso) {
  if (!iso) return false;
  const days = (new Date(iso) - new Date()) / 86400000;
  return days >= 0 && days <= 30;
}

function isExpired(iso) {
  if (!iso) return false;
  return new Date(iso) < new Date();
}

const S = {
  app: {
    minHeight: "100vh",
    background: "#0e0e14",
    color: "#f0ece4",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    background: "linear-gradient(160deg, #1a1520 0%, #0e0e14 100%)",
    padding: "28px 20px 20px",
    borderBottom: "1px solid #2a2535",
  },
  card: {
    background: "linear-gradient(135deg, #1e1b2e 0%, #16131f 100%)",
    border: "1px solid #2a2535",
    borderRadius: 16,
    padding: "16px 18px",
    marginBottom: 12,
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.15s ease, border-color 0.15s ease",
  },
  cardGlow: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    borderRadius: "16px 16px 0 0",
  },
  btn: {
    background: "linear-gradient(135deg, #d4a847, #b8891f)",
    color: "#1a1200",
    border: "none",
    borderRadius: 10,
    padding: "11px 20px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.3px",
  },
  btnGhost: {
    background: "transparent",
    color: "#d4a847",
    border: "1px solid #d4a847",
    borderRadius: 10,
    padding: "9px 16px",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  btnDanger: {
    background: "transparent",
    color: "#e07070",
    border: "1px solid #e07070",
    borderRadius: 10,
    padding: "9px 16px",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  input: {
    background: "#1e1b2e",
    border: "1px solid #2a2535",
    borderRadius: 10,
    padding: "11px 14px",
    color: "#f0ece4",
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  },
  label: {
    fontSize: 12,
    color: "#8a7fa0",
    fontWeight: 600,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: 6,
    display: "block",
  },
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "flex-end",
    zIndex: 100,
    backdropFilter: "blur(4px)",
  },
  modalBox: {
    background: "#1a1520",
    borderRadius: "20px 20px 0 0",
    padding: "24px 20px 36px",
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
    border: "1px solid #2a2535",
    borderBottom: "none",
    animation: "slideUp 0.25s ease",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    background: "#2a2535",
    borderRadius: 20,
    padding: "3px 10px",
    fontSize: 12,
    color: "#b8a8d0",
    fontWeight: 500,
  },
  tag: (color) => ({
    background: color + "22",
    color: color,
    border: `1px solid ${color}44`,
    borderRadius: 6,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.4px",
  }),
};

// ─── Splash ───────────────────────────────────────────────────────────────────
function Splash({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0e0e14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: none } }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.6 } }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center" }}>
        {/* SVG Gift Card Icon */}
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" style={{ marginBottom: 24 }}>
          <rect x="8" y="28" width="74" height="46" rx="8" fill="#1e1b2e" stroke="#d4a847" strokeWidth="1.5"/>
          <rect x="8" y="36" width="74" height="10" fill="#d4a847" opacity="0.15"/>
          <line x1="45" y1="28" x2="45" y2="74" stroke="#d4a847" strokeWidth="1.5" opacity="0.4"/>
          {/* ribbon top */}
          <path d="M32 28 C32 18 45 14 45 28" stroke="#d4a847" strokeWidth="2" fill="none"/>
          <path d="M58 28 C58 18 45 14 45 28" stroke="#d4a847" strokeWidth="2" fill="none"/>
          {/* bow */}
          <circle cx="45" cy="28" r="3" fill="#d4a847"/>
          {/* card shine */}
          <rect x="16" y="50" width="18" height="3" rx="1.5" fill="#d4a847" opacity="0.5"/>
          <rect x="16" y="57" width="12" height="3" rx="1.5" fill="#d4a847" opacity="0.3"/>
        </svg>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, color: "#d4a847", margin: "0 0 6px", letterSpacing: "-0.5px" }}>KortKollen</h1>
        <p style={{ color: "#8a7fa0", fontSize: 15, margin: "0 0 52px", lineHeight: 1.5 }}>Håll koll på era presentkort</p>

        <p style={{ color: "#5a5070", fontSize: 12, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Vem är du?</p>
        <div style={{ display: "flex", gap: 12 }}>
          {USERS.map((u, i) => (
            <button key={u} onClick={() => onSelect(u)} style={{
              ...S.btn,
              flex: 1,
              fontSize: 16,
              padding: "14px 0",
              borderRadius: 12,
              animation: `fadeIn ${0.5 + i * 0.1}s ease`,
            }}>
              {u}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card Visual ──────────────────────────────────────────────────────────────
function GiftCardItem({ card, onClick }) {
  const expired = isExpired(card.expiry);
  const expiringSoon = isExpiringSoon(card.expiry);
  const accentColor = expired ? "#e07070" : expiringSoon ? "#e0a847" : "#d4a847";
  const isEmpty = card.balance <= 0;

  return (
    <div onClick={onClick} style={{ ...S.card, opacity: isEmpty ? 0.5 : 1 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2535"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ ...S.cardGlow, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44, transparent)` }} />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ fontSize: 30, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{getEmoji(card.store)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: "#f0ece4", fontWeight: 700 }}>{card.store}</span>
            {expired && <span style={S.tag("#e07070")}>Utgånget</span>}
            {!expired && expiringSoon && <span style={S.tag("#e0a847")}>Snart</span>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: accentColor }}>{card.balance} <span style={{ fontSize: 14, fontWeight: 500, color: "#8a7fa0" }}>kr</span></span>
            {card.expiry && <span style={{ ...S.pill, fontSize: 11 }}>📅 {formatDate(card.expiry)}</span>}
            {card.code && <span style={{ ...S.pill, fontSize: 11 }}>🔢 ••••{card.code.slice(-4)}</span>}
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: "#5a5070" }}>Tillagd av {card.addedBy}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit Modal ───────────────────────────────────────────────────────────
function CardModal({ card, userName, onSave, onClose, onArchive }) {
  const isEdit = !!card;
  const [store, setStore] = useState(card?.store || "");
  const [balance, setBalance] = useState(card?.balance ?? "");
  const [expiry, setExpiry] = useState(card?.expiry || "");
  const [code, setCode] = useState(card?.code || "");
  const [spend, setSpend] = useState("");
  const storeRef = useRef(null);

  useEffect(() => { storeRef.current?.focus(); }, []);

  function handleSave() {
    if (!store.trim() || balance === "") return;
    const bal = parseFloat(String(balance).replace(",", "."));
    if (isNaN(bal) || bal < 0) return;
    onSave({ store: store.trim(), balance: bal, expiry, code: code.trim(), addedBy: card?.addedBy || userName });
  }

  function handleSpend() {
    const amount = parseFloat(String(spend).replace(",", "."));
    if (isNaN(amount) || amount <= 0) return;
    const newBal = Math.max(0, card.balance - amount);
    onSave({ ...card, balance: newBal }, newBal === 0);
  }

  return (
    <div style={S.modal} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modalBox}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, margin: 0, color: "#d4a847" }}>
            {isEdit ? `${getEmoji(card.store)} ${card.store}` : "✨ Nytt presentkort"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#5a5070", fontSize: 22, cursor: "pointer", padding: 0 }}>×</button>
        </div>

        {isEdit ? (
          <>
            <div style={{ background: "#16131f", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#8a7fa0", marginBottom: 4 }}>Nuvarande saldo</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#d4a847" }}>{card.balance} kr</div>
              {card.expiry && <div style={{ fontSize: 12, color: "#5a5070", marginTop: 4 }}>Giltig till {formatDate(card.expiry)}</div>}
              {card.code && <div style={{ fontSize: 12, color: "#5a5070" }}>Kod: {card.code}</div>}
            </div>
            <label style={S.label}>Använd belopp (kr)</label>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <input ref={storeRef} type="number" inputMode="decimal" placeholder="0" value={spend} onChange={e => setSpend(e.target.value)}
                style={{ ...S.input, flex: 1 }} onKeyDown={e => e.key === "Enter" && handleSpend()} />
              <button onClick={handleSpend} style={S.btn}>Dra av</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onArchive} style={{ ...S.btnDanger, flex: 1 }}>🗄 Arkivera</button>
              <button onClick={onClose} style={{ ...S.btnGhost, flex: 1 }}>Stäng</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={S.label}>Butik / Varumärke</label>
              <input ref={storeRef} type="text" placeholder="t.ex. ICA, H&M, Steam…" value={store} onChange={e => setStore(e.target.value)}
                style={S.input} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={S.label}>Saldo (kr)</label>
              <input type="number" inputMode="decimal" placeholder="500" value={balance} onChange={e => setBalance(e.target.value)}
                style={S.input} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={S.label}>Utgångsdatum</label>
              <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} style={S.input} />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={S.label}>Kortnummer / Kod</label>
              <input type="text" placeholder="Valfritt — sista 4 siffror visas" value={code} onChange={e => setCode(e.target.value)}
                style={S.input} onKeyDown={e => e.key === "Enter" && handleSave()} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleSave} style={{ ...S.btn, flex: 1, padding: "13px 0" }} disabled={!store.trim() || balance === ""}>Lägg till</button>
              <button onClick={onClose} style={{ ...S.btnGhost }}>Avbryt</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────
function ActivityFeed({ activity }) {
  if (!activity.length) return null;
  return (
    <div style={{ margin: "0 0 24px" }}>
      <div style={{ fontSize: 11, color: "#5a5070", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Aktivitet</div>
      {activity.slice(0, 8).map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4a847", marginTop: 5, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, color: "#c0b8d0" }}>{a.msg}</div>
            <div style={{ fontSize: 11, color: "#5a5070" }}>{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const DEFAULT_DATA = { cards: [], activity: [] };

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem("kk_user") || null);
  const [data, setData] = useState(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(null); // null | "add" | { card }
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState("");
  const width = useWindowWidth();
  const isWide = width >= 700;
  const isNarrow = width < 320;

  useEffect(() => {
    if (userName) localStorage.setItem("kk_user", userName);
  }, [userName]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    const unsub = onSnapshot(DATA_DOC, snap => {
      clearTimeout(timer);
      if (snap.exists()) {
        try { setData(JSON.parse(snap.data().payload)); } catch {}
      }
      setLoaded(true);
    }, () => { clearTimeout(timer); setLoaded(true); });
    return () => { clearTimeout(timer); unsub(); };
  }, []);

  function save(newData) {
    setData(newData);
    saveToFirebase(newData);
  }

  function addActivity(msg) {
    const now = new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
    return { msg, time: `Idag ${now}` };
  }

  function handleAdd(fields) {
    const card = { id: uid(), ...fields, archived: false };
    const newActivity = addActivity(`${userName} lade till "${fields.store}" (${fields.balance} kr)`);
    save({ ...data, cards: [card, ...data.cards], activity: [newActivity, ...(data.activity || [])] });
    setModal(null);
  }

  function handleSpend(card, newFields, autoArchive) {
    const spent = card.balance - newFields.balance;
    let newCards = data.cards.map(c => c.id === card.id ? { ...card, ...newFields, archived: autoArchive || false } : c);
    const msg = autoArchive
      ? `${userName} använde ${spent} kr på "${card.store}" — kortet är tomt och arkiverades`
      : `${userName} använde ${spent} kr på "${card.store}" (${newFields.balance} kr kvar)`;
    const newActivity = addActivity(msg);
    save({ ...data, cards: newCards, activity: [newActivity, ...(data.activity || [])] });
    setModal(null);
  }

  function handleArchive(card) {
    const newCards = data.cards.map(c => c.id === card.id ? { ...c, archived: true } : c);
    const newActivity = addActivity(`${userName} arkiverade "${card.store}"`);
    save({ ...data, cards: newCards, activity: [newActivity, ...(data.activity || [])] });
    setModal(null);
  }

  if (!userName) return <Splash onSelect={u => { setUserName(u); }} />;

  if (!loaded) return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap'); @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} @keyframes slideUp{from{transform:translateY(100%)}to{transform:none}} * { -webkit-tap-highlight-color:transparent; }`}</style>
      <div style={{ color: "#d4a847", animation: "pulse 1.2s infinite", fontFamily: "'Fraunces',serif", fontSize: 20 }}>KortKollen…</div>
    </div>
  );

  const activeCards = data.cards.filter(c => !c.archived);
  const archivedCards = data.cards.filter(c => c.archived);
  const totalBalance = activeCards.reduce((s, c) => s + c.balance, 0);
  const expiringSoonCount = activeCards.filter(c => isExpiringSoon(c.expiry)).length;
  const expiredCount = activeCards.filter(c => isExpired(c.expiry)).length;

  const searchLower = search.toLowerCase();
  const displayCards = (showArchived ? archivedCards : activeCards)
    .filter(c => !searchLower || c.store.toLowerCase().includes(searchLower));

  const editCard = modal && typeof modal === "object" ? modal.card : null;

  return (
    <div style={S.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: none } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
        ::-webkit-scrollbar { width: 0; }
      `}</style>

      {/* Header — centrat innehåll på breda skärmar */}
      <div style={S.header}>
        <div style={{ maxWidth: isWide ? 960 : "100%", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: isNarrow ? 20 : isWide ? 30 : 26, color: "#d4a847", margin: "0 0 2px", letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: 8 }}>
                <img src="/icon.png" alt="" style={{ width: isNarrow ? 24 : 32, height: isNarrow ? 24 : 32, borderRadius: 8 }} />
                KortKollen
              </h1>
              <p style={{ margin: 0, fontSize: isNarrow ? 11 : 13, color: "#5a5070" }}>Hej, <span style={{ color: "#c0b8d0", fontWeight: 600 }}>{userName}</span></p>
            </div>
            <button onClick={() => { setUserName(null); localStorage.removeItem("kk_user"); }}
              style={{ background: "none", border: "none", color: "#5a5070", fontSize: 12, cursor: "pointer", padding: "4px 0" }}>
              Byt →
            </button>
          </div>

          {/* Stats — fler kolumner på breda skärmar */}
          <div style={{ display: "grid", gridTemplateColumns: isWide ? "repeat(4, 1fr)" : "1fr 1fr", gap: 10 }}>
            <div style={{ background: "linear-gradient(135deg,#2a2016,#1e1b2e)", border: "1px solid #3a3020", borderRadius: 12, padding: isNarrow ? "10px 10px" : "12px 14px" }}>
              <div style={{ fontSize: isNarrow ? 9 : 11, color: "#8a7030", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Totalt saldo</div>
              <div style={{ fontSize: isNarrow ? 18 : 24, fontWeight: 700, color: "#d4a847", marginTop: 2 }}>{totalBalance.toFixed(0)} <span style={{ fontSize: 13, color: "#8a7030" }}>kr</span></div>
            </div>
            <div style={{ background: "#1e1b2e", border: "1px solid #2a2535", borderRadius: 12, padding: isNarrow ? "10px 10px" : "12px 14px" }}>
              <div style={{ fontSize: isNarrow ? 9 : 11, color: "#8a7fa0", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Aktiva kort</div>
              <div style={{ fontSize: isNarrow ? 18 : 24, fontWeight: 700, color: "#c0b8d0", marginTop: 2 }}>{activeCards.length}</div>
              {(expiringSoonCount > 0 || expiredCount > 0) && (
                <div style={{ fontSize: 11, color: expiredCount > 0 ? "#e07070" : "#e0a847", marginTop: 2 }}>
                  {expiredCount > 0 ? `${expiredCount} utgånget` : `${expiringSoonCount} snart utgår`}
                </div>
              )}
            </div>
            {isWide && <>
              <div style={{ background: "#1e1b2e", border: "1px solid #2a2535", borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#8a7fa0", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Arkiverade</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#5a5070", marginTop: 2 }}>{archivedCards.length}</div>
              </div>
              <div style={{ background: "#1e1b2e", border: "1px solid #2a2535", borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "#8a7fa0", fontWeight: 700, letterSpacing: "0.8px", textTransform: "uppercase" }}>Utgångna</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: expiredCount > 0 ? "#e07070" : "#5a5070", marginTop: 2 }}>{expiredCount}</div>
              </div>
            </>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: isNarrow ? "12px 10px 100px" : isWide ? "20px 32px 100px" : "16px 16px 100px", maxWidth: isWide ? 960 : "100%", margin: "0 auto" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#5a5070", fontSize: 15 }}>🔍</span>
          <input type="text" placeholder="Sök butik…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...S.input, paddingLeft: 36 }} />
        </div>

        {/* Toggle archived */}
        {archivedCards.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button onClick={() => setShowArchived(false)} style={{ ...showArchived ? S.btnGhost : S.btn, padding: "7px 14px", fontSize: 12 }}>
              Aktiva ({activeCards.length})
            </button>
            <button onClick={() => setShowArchived(true)} style={{ ...(showArchived ? S.btn : S.btnGhost), padding: "7px 14px", fontSize: 12 }}>
              Arkiverade ({archivedCards.length})
            </button>
          </div>
        )}

        {/* Cards — grid på breda skärmar */}
        {displayCards.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#5a5070" }}>
            <img src="/icon.png" alt="" style={{ width: 72, height: 72, borderRadius: 16, marginBottom: 12, opacity: 0.5 }} />
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: "#8a7fa0", marginBottom: 6 }}>
              {showArchived ? "Inga arkiverade kort" : "Inga aktiva kort"}
            </div>
            {!showArchived && <div style={{ fontSize: 13 }}>Tryck på + för att lägga till ett presentkort</div>}
          </div>
        ) : (
          <div style={{ display: isWide ? "grid" : "block", gridTemplateColumns: isWide ? "repeat(2, 1fr)" : undefined, gap: isWide ? 12 : undefined }}>
            {displayCards.map((card, i) => (
              <div key={card.id} style={{ animation: `fadeIn ${0.1 + i * 0.06}s ease` }}>
                <GiftCardItem card={card} onClick={() => setModal({ card })} />
              </div>
            ))}
          </div>
        )}

        {/* Activity feed */}
        {!showArchived && <ActivityFeed activity={data.activity || []} />}
      </div>

      {/* FAB */}
      {!showArchived && (
        <button onClick={() => setModal("add")} style={{
          position: "fixed",
          bottom: 28, right: 20,
          width: 58, height: 58,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #d4a847, #b8891f)",
          color: "#1a1200",
          fontSize: 28,
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px #d4a84755",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
        }}>+</button>
      )}

      {/* Modals */}
      {modal === "add" && (
        <CardModal userName={userName} onSave={handleAdd} onClose={() => setModal(null)} />
      )}
      {editCard && (
        <CardModal card={editCard} userName={userName}
          onSave={(fields, autoArchive) => handleSpend(editCard, fields, autoArchive)}
          onArchive={() => handleArchive(editCard)}
          onClose={() => setModal(null)} />
      )}
    </div>
  );
}
