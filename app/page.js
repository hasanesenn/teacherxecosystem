'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ecosystemItems } from '../data/ecosystem.js'

const ANGLES = [270, 321, 13, 64, 116, 167, 219]

function getXY(angle, radius) {
  const rad = (angle * Math.PI) / 180
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius }
}

const ICONS = ['🎓','📡','👥','🤖','⚡','🧭','🛠️']

export default function Home() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    let frame
    let cur = rotation
    if (spinning) {
      const tick = () => { cur += 0.25; setRotation(cur); frame = requestAnimationFrame(tick) }
      frame = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(frame)
  }, [spinning])

  return (
    <main style={{ background: '#0a0a0a', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* Başlık */}
      <motion.div
        animate={{ x: selected ? '-20%' : '0%', opacity: selected ? 0.2 : 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 180 }}
        style={{ textAlign: 'center', paddingTop: '2rem', position: 'relative', zIndex: 2 }}
      >
        <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: '700', letterSpacing: '3px', margin: 0 }}>
          TEACHER<span style={{ color: '#CC0000' }}>X</span>
        </h1>
        <p style={{ color: '#555', fontSize: '0.82rem', marginTop: '0.4rem' }}>Öğretmenleri Güçlendiren Öğrenme Ekosistemi</p>
      </motion.div>

      {/* Orbit wrapper — tam ekran ortası */}
      <motion.div
        animate={{
          x: selected ? '-20%' : '0%',
          filter: selected ? 'blur(4px)' : 'blur(0px)',
          scale: selected ? 0.82 : 1,
          opacity: selected ? 0.35 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 180 }}
        onMouseEnter={() => setSpinning(true)}
        onMouseLeave={() => setSpinning(false)}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
          pointerEvents: selected ? 'none' : 'auto',
        }}
      >
        <div style={{ position: 'relative', width: 800, height: 800 }}>

          {/* Halkalar */}
          {[230, 320, 400].map(r => (
            <div key={r} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: r * 2, height: r * 2,
              marginLeft: -r, marginTop: -r,
              borderRadius: '50%',
              border: '1px solid rgba(204,0,0,0.13)',
              pointerEvents: 'none',
            }} />
          ))}

          {/* Merkez X */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '5rem', fontWeight: '900', color: '#CC0000',
            textShadow: '0 0 60px rgba(204,0,0,0.6)',
            lineHeight: 1, userSelect: 'none', zIndex: 3,
          }}>X</div>

          {/* Kartlar */}
          {ecosystemItems.map((item, i) => {
            const angle = ANGLES[i] + rotation
            const { x, y } = getXY(angle, 320)
            const isHov = hovered === item.id
            return (
              <motion.div
                key={item.id}
                onClick={() => setSelected(item)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: 170, height: 72,
                  marginLeft: -85, marginTop: -36,
                  x, y,
                  background: isHov ? 'rgba(204,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isHov ? 'rgba(204,0,0,0.8)' : 'rgba(204,0,0,0.2)'}`,
                  borderRadius: '12px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '4px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isHov ? '0 0 24px rgba(204,0,0,0.25)' : 'none',
                  zIndex: 4,
                  scale: isHov ? 1.12 : 1,
                  transition: 'scale 0.2s, background 0.2s, border 0.2s, box-shadow 0.2s',
                }}
              >
                <span style={{ color: 'white', fontSize: '1.35rem', fontWeight: '700', textAlign: 'center', lineHeight: 1.2, padding: '0 10px' }}>{item.title}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Detay Paneli */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Arka plana tıklayınca menüyü kapat */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => { setSelected(null); setSpinning(true) }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                zIndex: 15,
                cursor: 'pointer',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'fixed', right: 0, top: 0, bottom: 0,
                width: '42%',
                background: 'linear-gradient(160deg, #111 0%, #1c0606 100%)',
                borderLeft: '1px solid rgba(204,0,0,0.25)',
                zIndex: 20, padding: '2.5rem 2rem',
                overflowY: 'auto', display: 'flex', flexDirection: 'column',
              }}
            >
              <button
                type="button"
                aria-hidden="true"
                style={{ alignSelf: 'flex-end', background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: '#888', fontSize: '0.9rem', cursor: 'default', borderRadius: '50%', width: '34px', height: '34px', marginBottom: '1.5rem' }}
              >
                ✕
              </button>

            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring' }}
              style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
              {ICONS[ecosystemItems.findIndex(e => e.id === selected.id)]}
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
              <p style={{ color: '#CC0000', fontSize: '0.7rem', letterSpacing: '2px', margin: '0 0 0.3rem', textTransform: 'uppercase' }}>{selected.subtitle}</p>
              <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', margin: '0 0 1rem', lineHeight: 1.2 }}>{selected.title}</h2>
            </motion.div>

            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              {selected.description}
            </motion.p>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
              <p style={{ color: '#555', fontSize: '0.68rem', letterSpacing: '2px', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Ne Kazanırsınız</p>
              {selected.features.map((f, i) => (
                <motion.div key={i}
                  initial={{ x: 16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#CC0000', flexShrink: 0 }} />
                  <span style={{ color: '#ccc', fontSize: '0.85rem' }}>{f}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.65 }} style={{ marginTop: '2rem' }}>
              {selected.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', background: '#CC0000', color: 'white', textAlign: 'center', padding: '0.9rem', borderRadius: '10px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.5px' }}>
                  {link.label} →
                </a>
              ))}
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Alt link */}
      <motion.div animate={{ opacity: selected ? 0 : 1 }}
        style={{ textAlign: 'center', position: 'fixed', bottom: '1.25rem', width: '100%', zIndex: 1 }}>
        <a href="https://teacherx.online" style={{ color: '#333', fontSize: '0.78rem', textDecoration: 'none' }}>
          www.<strong style={{ color: '#666' }}>teacherx</strong>.online
        </a>
      </motion.div>

    </main>
  )
}
