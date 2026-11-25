'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, BookOpen, Camera, Compass, Gamepad2, Menu, Mic2, X } from 'lucide-react'

const colorPalette = [
  { name: "Oudaya Blue", hex: "#276B8C" },
  { name: "Midnight Blue", hex: "#183744" },
  { name: "Chalk White", hex: "#F2EDE3" },
  { name: "Hassan Sand", hex: "#C8A477" },
  { name: "Memory Sepia", hex: "#A87C52" },
  { name: "Olive Green", hex: "#66765A" },
  { name: "Terracotta", hex: "#AB6048" },
  { name: "Charcoal", hex: "#252827" },
];

const gameFeatures = [
  { id: "explore", title: "Explore", description: "Walk through historic streets and discover the places that hold a story." },
  { id: "photograph", title: "Photograph", description: "Look through the lens to recognize familiar places and preserve them." },
  { id: "listen", title: "Listen", description: "Gather voices, footsteps, and the everyday sound of the medina." },
  { id: "remember", title: "Remember", description: "Bring each collected fragment into a journal that slowly comes alive." },
];

const memories = [
  { title: 'The Photograph', place: 'A forgotten home', text: 'An old photograph is all he has to begin with. Its faded edges point toward a street that still remembers.', mark: '01', sketch: '⌂' },
  { title: 'The Blue Door', place: 'Kasbah des Oudayas', text: 'Somewhere behind the blue doors, the neighborhood keeps the shape of a childhood.', mark: '02', sketch: '▤' },
  { title: 'Voices of the Medina', place: 'The traditional souk', text: 'In the rhythm of the souk, familiar voices begin to turn a place into a story.', mark: '03', sketch: '〰' },
  { title: 'Zohra’s Childhood', place: 'A place called home', text: 'Small moments, kept alive by the people who were there to witness them.', mark: '04', sketch: '✳' },
  { title: 'The Journey', place: 'Rabat, Morocco', text: 'Every collected image and sound brings the past a little closer.', mark: '05', sketch: '↗' },
]

const team = [
  ['Montassir BENTAHAR', 'Graphic Designer', 'Environment illustrations · Character artwork'],
  ['Mohamed EL MACHHOUNE', 'UX/UI & Graphic Designer', 'Visual identity · Logo · Game interfaces'],
  ['Saad abdoulmoulah', 'Writer & Producer', 'Screenwriting · Production coordination'],
  ['Salma MAHDAR', 'Game Designer', 'Game mechanics · Level design'],
  ['Nouhaila MAADI', 'Sound Effects Designer', 'Environmental soundscapes · Foley'],
  ['OUFFATA Fatima Ezzahrae', 'Music Designer', 'Original soundtrack · Musical identity'],
  ['EL-HILALY Yahya', 'Game Narrative', 'Interactive storytelling · Dialogue'],
  ['EL RHALLOUCH Mohamed Amine', 'Game Developer', 'Unity development · Gameplay'],
]

const chapters = [
  { title: 'The Photograph', place: 'Café Maure', text: 'A single image becomes a compass. He follows it through the streets where his mother once grew up.', image: '/images/rabat-dusk.png', number: '01' },
  { title: 'The Blue Door', place: 'Kasbah des Oudayas', text: 'Whitewashed walls, painted doors, and the quiet puzzle of finding a place that feels familiar.', image: '/images/rabat-dusk.png', number: '02' },
  { title: 'Voices of the Medina', place: 'The traditional souk', text: 'Listen closely. The medina is full of small sounds—and people who remember.', image: '/images/rabat-dusk.png', number: '03' },
  { title: 'The Way Home', place: 'Rabat at dusk', text: 'As evening settles over the city, scattered memories begin to find their way home.', image: '/images/rabat-dusk.png', number: '04' },
]

const steps = ['Research & exploration', 'Narrative & game concept', 'Visual identity', 'Character & environment design', 'UI/UX design', 'Sound & music production', 'Unity implementation', 'Testing & final presentation']

function Logo({ className = '' }: { className?: string }) {
  return <img className={className} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-png-K86J8SJQiMiSbG90QyUHjWBHKLbLle.png" alt="L’Walida — الوالدة open-book logo" />
}

export default function SiteExperience() {
  const [memory, setMemory] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [turnDirection, setTurnDirection] = useState(1)
  const touchStartX = useRef<number | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const activeMemory = memories[memory]
  const moveMemory = (direction: number) => {
    setTurnDirection(direction)
    setMemory((current) => (current + direction + memories.length) % memories.length)
  }

  useEffect(() => {
    const hero = heroRef.current
    const stage = hero?.querySelector<HTMLElement>('.hero-stage')
    if (!hero || !stage) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const updateOpening = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const travelDistance = Math.max(hero.offsetHeight - stage.offsetHeight, 1)
        const progress = motionPreference.matches
          ? 1
          : Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / travelDistance))
        const reveal = Math.min(1, Math.max(0, (progress - 0.38) / 0.48))
        const parallaxProgress = motionPreference.matches ? 0 : progress
        const insetRatio = window.innerWidth < 640 ? 0.085 : window.innerWidth < 960 ? 0.16 : window.innerWidth > 1600 ? 0.34 : 0.23

        hero.style.setProperty('--opening-progress', progress.toFixed(4))
        hero.style.setProperty('--opening-inset-x', `${(insetRatio * (1 - progress) * 100).toFixed(2)}%`)
        hero.style.setProperty('--opening-curve', `${(50 * (1 - progress)).toFixed(2)}%`)
        hero.style.setProperty('--opening-reveal', reveal.toFixed(4))
        hero.style.setProperty('--opening-content-scale', (0.92 - progress * 0.02).toFixed(4))
        hero.style.setProperty('--opening-bg-shift', `${(-window.innerHeight * parallaxProgress * 0.028).toFixed(2)}px`)
        hero.style.setProperty('--opening-arch-shift', `${(window.innerHeight * parallaxProgress * 0.012).toFixed(2)}px`)
        hero.style.setProperty('--opening-content-shift', `${(-window.innerHeight * parallaxProgress * 0.018).toFixed(2)}px`)
        hero.style.setProperty('--opening-auxiliary-opacity', Math.max(0, 1 - progress * 1.8).toFixed(4))
        hero.style.setProperty('--opening-nav-visibility', reveal > 0.02 ? 'visible' : 'hidden')
      })
    }

    updateOpening()
    window.addEventListener('scroll', updateOpening, { passive: true })
    window.addEventListener('resize', updateOpening)
    motionPreference.addEventListener('change', updateOpening)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateOpening)
      window.removeEventListener('resize', updateOpening)
      motionPreference.removeEventListener('change', updateOpening)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(event.target.tagName)) return
      moveMemory(event.key === 'ArrowRight' ? 1 : -1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main>
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-stage">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-image" />
          <div className="hero-arch-image" aria-hidden="true" />
          <div className="hero-grain" />
          <nav className="site-nav" aria-label="Main navigation">
            <a className="nav-brand" href="#home" aria-label="L’Walida home"><Logo /></a>
            <div className="nav-links">
              <a href="#story">Story</a><a href="#journal">Journal</a><a href="#world">The world</a><a href="#team">Team</a>
            </div>
            <div className="nav-actions">
              <button className="sound-toggle" disabled aria-label="Sound unavailable; no audio supplied" title="No audio files have been supplied"><span className="sound-slash"><AudioLines size={17} /></span></button>
              <a className="nav-cta" href="#play">Enter the story <ArrowUpRight size={15} /></a>
              <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
            </div>
          </nav>
          {menuOpen && <div className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#story">Story</a><a onClick={() => setMenuOpen(false)} href="#journal">Journal</a><a onClick={() => setMenuOpen(false)} href="#world">The world</a><a onClick={() => setMenuOpen(false)} href="#team">Team</a><a onClick={() => setMenuOpen(false)} href="#play">Play L’Walida</a></div>}
          <div className="hero-topline"><span>PROJET_29 PRESENTS</span><span className="topline-rule" /><span>RABAT, MOROCCO · 2026</span></div>
          <div className="hero-center">
            <span className="eyebrow hero-kicker">A NARRATIVE ADVENTURE</span>
            <Logo className="hero-logo" />
            <h1 className="sr-only">L’Walida — Every street holds a memory</h1>
            <p className="hero-tagline">Every street holds a memory.</p>
            <p className="hero-copy">A journey through the places, voices, and stories<br className="desktop-break" /> that made a mother’s world.</p>
            <a href="#story" className="hero-button">Discover the journey <ArrowDown size={16} /></a>
          </div>
          <div className="hero-bottom"><span className="hero-coordinate">34°01′ N&nbsp; 6°50′ W</span><a href="#story" className="scroll-cue"><span className="scroll-line" />SCROLL TO REMEMBER</a><span className="hero-edition">A GAME JAM VGC PROJECT</span></div>
          <span className="hero-side-note">LOST IN THE MEDINA — RABAT</span>
        </div>
      </section>

      <section id="story" className="intro section-paper">
        <div className="intro-index"><span>CHAPTER 01</span><span className="ornament-line" /><span>THE JOURNEY</span></div>
        <div className="intro-grid">
          <div className="intro-heading"><span className="eyebrow ink-eyebrow">A STORY HELD IN PLACE</span><h2>Some streets lead us home.<br /><em>Others lead us to memories.</em></h2></div>
          <div className="intro-copy"><p>L’Walida is an emotional narrative adventure inspired by the historic streets of Rabat. Carrying an old photograph, a young man returns to his mother’s childhood neighborhood to discover the places—and the people—that remember her.</p><a href="#journal" className="text-link">Open the memory journal <ArrowRight size={16} /></a></div>
        </div>
        <div className="intro-collage">
          <div className="collage-photo"><img src="/images/rabat-dusk.png" alt="Sun-washed Moroccan medina rooftops" /><span className="photo-caption">RABAT · AN AFTERNOON REMEMBERED</span></div>
          <div className="collage-note"><span className="note-star">✳</span><p>“The walls knew her<br />before I did.”</p><span className="note-sign">— from the journal</span></div>
          <div className="collage-stamp"><span>MEMORY<br />NO. 01</span><strong>R</strong><span>34°01′ N</span></div>
          <div className="collage-label">A city is made<br />of what it keeps.</div>
        </div>
      </section>

      <section id="journal" className="journal-section">
        <div className="section-heading light-heading"><span className="eyebrow">A JOURNAL OF FRAGMENTS</span><h2>Keep what time<br /><em>cannot erase.</em></h2><p>Each memory is a small door. Turn the page and step inside.</p></div>
        <div className="book-wrap" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }} onTouchEnd={(event) => { const endX = event.changedTouches[0]?.clientX; if (touchStartX.current !== null && endX !== undefined && Math.abs(endX - touchStartX.current) > 45) moveMemory(endX < touchStartX.current ? 1 : -1); touchStartX.current = null }}>
          <div className="book-spine" aria-hidden="true" />
          <article className="book-page book-left" key={`left-${memory}`}>
            <div className="page-top"><span>L’WALIDA · JOURNAL</span><span>RABAT, MOROCCO</span></div>
            <div className="memory-photo"><span className={`memory-drawing drawing-${memory}`}>{activeMemory.sketch}</span><span className="photo-date">A PLACE REMEMBERED</span></div>
            <p className="hand-note">“There was a blue door<br />at the end of this street.”</p>
            <span className="page-number">{activeMemory.mark}</span>
          </article>
          <article className={`book-page book-right ${turnDirection > 0 ? 'turn-forward' : 'turn-backward'}`} key={`right-${memory}`} aria-live="polite">
            <span className="memory-kicker">FRAGMENT {activeMemory.mark} / 05</span>
            <h3>{activeMemory.title}</h3><span className="memory-place">{activeMemory.place}</span>
            <p className="memory-text">{activeMemory.text}</p>
            <div className="memory-flourish">✳</div>
            <span className="memory-written">A memory, collected.</span>
            <span className="page-number">{String(memory + 2).padStart(2, '0')}</span>
          </article>
        </div>
        <div className="journal-controls"><button onClick={() => moveMemory(-1)} aria-label="Previous memory"><ArrowLeft size={18} /></button><div className="journal-progress"><span>MEMORY</span><strong>{String(memory + 1).padStart(2, '0')}</strong><span className="progress-slash">/</span><span>05</span><div className="progress-track"><span style={{ width: `${((memory + 1) / memories.length) * 100}%` }} /></div></div><button onClick={() => moveMemory(1)} aria-label="Next memory"><ArrowRight size={18} /></button></div>
        <p className="journal-hint"><span className="turn-hint-arrows" aria-hidden="true"><ArrowLeft size={12} /><ArrowRight size={12} /></span> Use the arrows, swipe, or keyboard to turn each page</p>
      </section>

      <section className="story-scroll section-paper">
        <div className="story-title"><div><h2>Follow the<br /><em>familiar.</em></h2></div><p>Four fragments from a city that has kept these stories close.</p></div>
        <div className="chapter-list">{chapters.map((chapter) => <article className="chapter-row" key={chapter.number}><div className="chapter-meta"><span>{chapter.number}</span><span className="chapter-rule" /><span>{chapter.place}</span></div><div className="chapter-image"><img src={chapter.image} alt={`${chapter.place}, a place in the L’Walida story`} /><span className="image-index">L’W · {chapter.number}</span></div><div className="chapter-copy"><h3>{chapter.title}</h3><p>{chapter.text}</p><span className="chapter-coord">RABAT, MOROCCO</span></div></article>)}</div>
      </section>

      <section id="world" className="world-section">
        <div className="world-header"><div><h2>A city that<br /><em>remembers.</em></h2></div><p>Inspired by the real streets, courtyards, and landmarks of Rabat.</p></div>
        <div className="location-strip"><article className="location-card location-large"><img src="/images/rabat-dusk.png" alt="Blue and white architecture inspired by the Kasbah des Oudayas" /><span className="location-no">01 / KASBAH DES OUDAYAS</span><h3>Blue walls.<br />Open skies.</h3><span className="location-arrow"><ArrowUpRight /></span></article><article className="location-card location-small"><img src="/images/rabat-dusk.png" alt="A sunlit market street inspired by Rabat’s old medina" /><span className="location-no">02 / THE OLD MEDINA</span><h3>Every turn,<br />a story.</h3><span className="location-arrow"><ArrowUpRight /></span></article><article className="location-card location-small"><div className="location-art"><span>✳</span><strong>حسن</strong><i>RABAT · MOROCCO</i></div><span className="location-no">03 / HASSAN TOWER</span><h3>A landmark<br />in the distance.</h3><span className="location-arrow"><ArrowUpRight /></span></article><article className="location-card location-wide"><img src="/images/rabat-dusk.png" alt="Illustrated Rabat skyline at golden hour" /><span className="location-no">04 / THE BOUREGREG</span><h3>Where the city<br />meets the light.</h3><span className="location-arrow"><ArrowUpRight /></span></article></div>
      </section>

      

      <section className="art-section"><div className="art-intro"><span className="eyebrow">A WORLD MADE BY HAND</span><h2>Designed from heritage.<br /><em>Built from memories.</em></h2><p>An open book, a living archive. The visual language of L’Walida draws from Rabat’s old walls, treasured photographs, and the warmth of well-kept pages.</p><Logo className="art-logo" /></div><div className="brand-board"><div className="brand-logo-card"><span className="board-label">THE MARK — AN OPEN BOOK</span><Logo /></div><div className="palette-card"><span className="board-label">FOUR COLORS, ONE MEMORY</span><div className="swatches">{colorPalette.map((color, i) => (<div key={i} style={{ background: color.hex }}><span>{color.name}</span><b>{color.hex}</b></div>))}</div></div><div className="texture-card"><span>ARCHITECTURE / PATTERN / PLACE</span><div className="zellige-mark">✳</div><strong>Made to feel<br />like it was kept.</strong></div></div></section>

      <section className="sound-section"><div className="sound-ornament">♫</div><span className="eyebrow">CHAPTER 04 — CLOSE YOUR EYES</span><h2>The medina<br /><em>has a voice.</em></h2><p>Footsteps on old stone. A cup set down in a café. The hush between two stories. Original sound and music are part of the world L’Walida is building.</p><div className="audio-placeholder"><div className="audio-play"><AudioLines size={22} /></div><div className="audio-info"><span>ORIGINAL SOUND & MUSIC</span><strong>Listen for the memories</strong><small>Audio coming soon</small></div><div className="waveform" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ height: `${10 + ((index * 13) % 27)}px` }} />)}</div><span className="audio-unavailable">NOT YET AVAILABLE</span></div><span className="sound-credit">SOUND DESIGN & ORIGINAL MUSIC · PROJET_29</span></section>

      <section className="trailer-section"><div className="trailer-art"><img src="/images/rabat-dusk.png" alt="Rabat rooftops at sunset, the world of L’Walida" /><div className="trailer-overlay" /></div><div className="trailer-content"><span className="eyebrow">A GLIMPSE INTO THE WORLD</span><h2>Step inside<br /><em>the memories.</em></h2><span className="trailer-coming"><span /> TRAILER COMING SOON</span></div><span className="trailer-mark">L’W · 2.5D NARRATIVE ADVENTURE</span></section>

      <section id="team" className="team-section section-paper"><div className="team-heading"><div><span className="eyebrow ink-eyebrow">THE PEOPLE BEHIND THE PAGES</span><h2>Eight creatives.<br /><em>One story.</em></h2></div><p>A shared passion for Moroccan culture, art, and interactive storytelling.<br /><span>MEET PROJET_29</span></p></div><div className="team-grid">{team.map(([name, role, work], index) => <article className="team-member" key={name}><div className="portrait-placeholder"><span className="portrait-initials">{name.split(' ').filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join('').replace(/[^A-Za-z]/g, '').slice(0, 2)}</span><span className="portrait-number">0{index + 1}</span><span className="portrait-note">PROJET_29</span></div><div className="member-meta"><span>{role}</span><h3>{name}</h3><p>{work}</p></div></article>)}</div></section>

      <section className="process-section"><div className="process-heading"><span className="eyebrow">THE MAKING OF A MEMORY</span><h2>From an idea<br /><em>to a living world.</em></h2><p>A collaborative journey across story, image, sound, and play.</p></div><ol className="timeline">{steps.map((step, index) => <li key={step}><span className="timeline-number">0{index + 1}</span><span className="timeline-dot" /><div><h3>{step}</h3><span>PROJET_29 · GAME JAM VGC</span></div></li>)}</ol></section>

      <section className="jam-section"><span className="jam-star">✳</span><span className="eyebrow">MADE FOR GAME JAM VGC</span><h2>Lost in the Medina.<br /><em>Found in a memory.</em></h2><p>L’Walida brings storytelling, graphic design, game development, music, and sound together to celebrate Moroccan cultural heritage through an emotional interactive experience.</p><div className="jam-signature"><span>AN ORIGINAL PROJECT BY</span><strong>PROJET_29</strong><span>RABAT, MOROCCO · 2026</span></div></section>

      <section id="play" className="final-cta"><div className="cta-image" /><div className="cta-content"><span className="eyebrow">THE JOURNEY IS BEING PREPARED</span><h2>Every street<br /><em>holds a memory.</em></h2><p>Begin your journey through the medina.</p><span className="availability"><Gamepad2 size={16} /> GAME COMING SOON</span></div><span className="cta-coordinate">34°01′ N&nbsp; 6°50′ W</span></section>

      <footer className="footer"><div className="footer-top"><a href="#home" className="footer-logo"><Logo /></a><div className="footer-arabic" lang="ar" dir="rtl">الوالدة</div><div className="footer-nav"><a href="#story">Story</a><a href="#journal">Journal</a><a href="#world">The world</a><a href="#team">Team</a></div><a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight /></a></div><div className="footer-bottom"><span>MADE WITH MEMORIES. MADE IN MOROCCO.</span><span>© 2026 PROJET_29 — L’WALIDA</span><span>GAME JAM VGC</span></div></footer>
    </main>
  )
}
