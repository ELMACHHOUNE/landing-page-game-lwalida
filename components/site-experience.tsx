'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, Gamepad2, Menu, X } from 'lucide-react'
import { useI18n } from '@/components/locale-provider'
import LanguageSwitcher from '@/components/language-switcher'

const paletteHex = ['#0A0A0A', '#1C1915', '#C8A24C', '#E0C078', '#8A6A2F', '#EDE4D3', '#CDB996', '#8A7C63']

function isLightColor(hex: string) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

function Logo({ className = '' }: { className?: string }) {
  return <img className={className} src="/logo.png" width={1040} height={640} alt="L’Walida — الوالدة open-book logo" decoding="async" />
}

export default function SiteExperience() {
  const { t } = useI18n()
  const memories = t.journal.memories
  const steps = t.process.steps
  const teamMembers = t.team.members
  const locations = t.world.locations

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

  const isFirstMount = useRef(true)

  useEffect(() => {
    const hero = heroRef.current
    const stage = hero?.querySelector<HTMLElement>('.hero-stage')
    if (!hero || !stage) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const updateOpening = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (isFirstMount.current) {
          isFirstMount.current = false
          hero.style.setProperty('--opening-reveal', '0')
          hero.style.setProperty('--opening-nav-visibility', 'hidden')
        }
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
          <nav className="site-nav" aria-label={t.nav.label}>
            <a className="nav-brand" href="#home" aria-label={t.nav.home}><Logo /></a>
            <div className="nav-links">
              <a href="#story">{t.nav.story}</a><a href="#journal">{t.nav.journal}</a><a href="#world">{t.nav.world}</a><a href="#team">{t.nav.team}</a>
            </div>
            <div className="nav-actions">
              <button className="sound-toggle" disabled aria-label={t.nav.soundUnavailable} title={t.nav.soundTitle}><span className="sound-slash"><AudioLines size={17} /></span></button>
              <a className="nav-cta" href="#play">{t.nav.enter} <ArrowUpRight size={15} className="rtl-flip" /></a>
              <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
              <LanguageSwitcher />
            </div>
          </nav>
          {menuOpen && <div className="mobile-menu"><a onClick={() => setMenuOpen(false)} href="#story">{t.nav.story}</a><a onClick={() => setMenuOpen(false)} href="#journal">{t.nav.journal}</a><a onClick={() => setMenuOpen(false)} href="#world">{t.nav.world}</a><a onClick={() => setMenuOpen(false)} href="#team">{t.nav.team}</a><a onClick={() => setMenuOpen(false)} href="#play">{t.nav.enter}</a></div>}
          <div className="hero-topline"><span>{t.hero.presents}</span><span className="topline-rule" /><span>{t.hero.location}</span></div>
          <div className="hero-center">
            <span className="eyebrow hero-kicker">{t.hero.kicker}</span>
            <Logo className="hero-logo" />
            <h1 className="sr-only">{t.hero.srTitle}</h1>
            <p className="hero-tagline">{t.hero.tagline}</p>
            <p className="hero-copy">{t.hero.copy}<br className="desktop-break" /> {t.hero.copyBreak}</p>
            <a href="#story" className="hero-button">{t.hero.button} <ArrowDown size={16} /></a>
          </div>
          <span className="hero-side-note">{t.hero.sideNote}</span>
        </div>
      </section>

      <section id="story" className="intro section-paper">
        <div className="intro-index"><span>{t.story.indexLeft}</span><span className="ornament-line" /><span>{t.story.indexRight}</span></div>
        <div className="intro-grid">
          <div className="intro-heading"><span className="eyebrow ink-eyebrow">{t.story.eyebrow}</span><h2>{t.story.headingLine1}<br /><em>{t.story.headingLine2}</em></h2></div>
          <div className="intro-copy"><p>{t.story.paragraph}</p><a href="#journal" className="text-link">{t.story.link} <ArrowRight size={16} className="rtl-flip" /></a></div>
        </div>
        <div className="intro-collage">
          <div className="collage-photo"><img src="/images/rabat-dusk.png" alt={t.story.photoAlt} /><span className="photo-caption">{t.story.photoCaption}</span></div>
          <div className="collage-note"><span className="note-star">✳</span><p>{t.story.noteLine1}<br />{t.story.noteLine2}</p><span className="note-sign">{t.story.noteSign}</span></div>
          <div className="collage-stamp"><span>{t.story.stampTop}<br />{t.story.stampBottom}</span><strong>R</strong><span>{t.story.stampCoord}</span></div>
          <div className="collage-label">{t.story.labelLine1}<br />{t.story.labelLine2}</div>
        </div>
      </section>

      <section id="journal" className="journal-section">
        <div className="section-heading light-heading"><span className="eyebrow">{t.journal.eyebrow}</span><h2>{t.journal.headingLine1}<br /><em>{t.journal.headingLine2}</em></h2><p>{t.journal.paragraph}</p></div>
        <div className="book-wrap" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null }} onTouchEnd={(event) => { const endX = event.changedTouches[0]?.clientX; if (touchStartX.current !== null && endX !== undefined && Math.abs(endX - touchStartX.current) > 45) moveMemory(endX < touchStartX.current ? 1 : -1); touchStartX.current = null }}>
          <div className="book-spine" aria-hidden="true" />
          <article className="book-page book-left" key={`left-${memory}`}>
            <div className="page-top"><span>{t.journal.pageTopLeft}</span><span>{t.journal.pageTopRight}</span></div>
            <div className="memory-photo"><span className={`memory-drawing drawing-${memory}`}>{activeMemory.sketch}</span><span className="photo-date">{t.journal.photoDate}</span></div>
            <p className="hand-note">{t.journal.handNoteLine1}<br />{t.journal.handNoteLine2}</p>
            <span className="page-number">{activeMemory.mark}</span>
          </article>
          <article className={`book-page book-right ${turnDirection > 0 ? 'turn-forward' : 'turn-backward'}`} key={`right-${memory}`} aria-live="polite">
            <span className="memory-kicker">{t.journal.fragment} {activeMemory.mark} / 05</span>
            <h3>{activeMemory.title}</h3><span className="memory-place">{activeMemory.place}</span>
            <p className="memory-text">{activeMemory.text}</p>
            <div className="memory-flourish">✳</div>
            <span className="memory-written">{t.journal.written}</span>
            <span className="page-number">{String(memory + 2).padStart(2, '0')}</span>
          </article>
        </div>
        <div className="journal-controls"><button onClick={() => moveMemory(-1)} aria-label={t.journal.prev}><ArrowLeft size={18} className="rtl-flip" /></button><div className="journal-progress"><span>{t.journal.progress}</span><strong>{String(memory + 1).padStart(2, '0')}</strong><span className="progress-slash">/</span><span>05</span><div className="progress-track"><span style={{ width: `${((memory + 1) / memories.length) * 100}%` }} /></div></div><button onClick={() => moveMemory(1)} aria-label={t.journal.next}><ArrowRight size={18} className="rtl-flip" /></button></div>
        <p className="journal-hint"><span className="turn-hint-arrows" aria-hidden="true"><ArrowLeft size={12} className="rtl-flip" /><ArrowRight size={12} className="rtl-flip" /></span> {t.journal.hint}</p>
      </section>

      <section id="world" className="world-section">
        <div className="world-header"><div><h2>{t.world.headingLine1}</h2></div><p></p></div>
        <div className="location-strip"><article className="location-card location-large"><img src="/images/rabat-dusk.png" alt={locations[0].alt} /><span className="location-no">{locations[0].no}</span><h3>{locations[0].titleLine1}<br />{locations[0].titleLine2}</h3><span className="location-arrow"><ArrowUpRight className="rtl-flip" /></span></article><article className="location-card location-small"><img src="/images/rabat-dusk.png" alt={locations[1].alt} /><span className="location-no">{locations[1].no}</span><h3>{locations[1].titleLine1}<br />{locations[1].titleLine2}</h3><span className="location-arrow"><ArrowUpRight className="rtl-flip" /></span></article><article className="location-card location-small"><div className="location-art"><span>✳</span><strong>{locations[2].art}</strong><i>{locations[2].artLabel}</i></div><span className="location-no">{locations[2].no}</span><h3>{locations[2].titleLine1}<br />{locations[2].titleLine2}</h3><span className="location-arrow"><ArrowUpRight className="rtl-flip" /></span></article><article className="location-card location-wide"><img src="/images/rabat-dusk.png" alt={locations[3].alt} /><span className="location-no">{locations[3].no}</span><h3>{locations[3].titleLine1}<br />{locations[3].titleLine2}</h3><span className="location-arrow"><ArrowUpRight className="rtl-flip" /></span></article></div>
      </section>

      <section className="art-section"><div className="art-intro"><span className="eyebrow">{t.art.eyebrow}</span><h2>{t.art.headingLine1}<br /><em>{t.art.headingLine2}</em></h2><p>{t.art.paragraph}</p><Logo className="art-logo" /></div><div className="brand-board"><div className="brand-logo-card"><span className="board-label">{t.art.markLabel}</span><Logo /></div><div className="palette-card"><span className="board-label">{t.art.paletteLabel}</span><div className="swatches">{t.art.palette.map((name, i) => (<div key={i} style={{ background: paletteHex[i], color: isLightColor(paletteHex[i]) ? '#1A1712' : '#EDE4D3' }}><span>{name}</span><b>{paletteHex[i]}</b></div>))}</div></div><div className="texture-card"><span>{t.art.textureLabel}</span><div className="zellige-mark">✳</div><strong>{t.art.textureStrongLine1}<br />{t.art.textureStrongLine2}</strong></div></div></section>

      <section className="sound-section"><div className="sound-ornament">♫</div><span className="eyebrow">{t.sound.eyebrow}</span><h2>{t.sound.headingLine1}<br /><em>{t.sound.headingLine2}</em></h2><p>{t.sound.paragraph}</p><div className="audio-placeholder"><div className="audio-play"><AudioLines size={22} /></div><div className="audio-info"><span>{t.sound.infoLabel}</span><strong>{t.sound.infoTitle}</strong><small>{t.sound.infoSmall}</small></div><div className="waveform" aria-hidden="true">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ height: `${10 + ((index * 13) % 27)}px` }} />)}</div><span className="audio-unavailable">{t.sound.unavailable}</span></div><span className="sound-credit">{t.sound.credit}</span></section>

      <section className="trailer-section"><div className="trailer-art"><img src="/images/rabat-dusk.png" alt={t.trailer.alt} /><div className="trailer-overlay" /></div><div className="trailer-content"><span className="eyebrow">{t.trailer.eyebrow}</span><h2>{t.trailer.headingLine1}<br /><em>{t.trailer.headingLine2}</em></h2><span className="trailer-coming"><span /> {t.trailer.coming}</span></div><span className="trailer-mark">{t.trailer.mark}</span></section>

      <section id="team" className="team-section section-paper"><div className="team-heading"><div><span className="eyebrow ink-eyebrow">{t.team.eyebrow}</span><h2>{t.team.headingLine1}<br /><em>{t.team.headingLine2}</em></h2></div><p>{t.team.paragraph}<br /><span>{t.team.meet}</span></p></div><div className="team-grid">{teamMembers.map((member, index) => <article className="team-member" key={member.name}><div className="portrait-placeholder"><span className="portrait-initials">{member.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join('').replace(/[^A-Za-z]/g, '').slice(0, 2)}</span><span className="portrait-number">0{index + 1}</span><span className="portrait-note">{t.team.portraitNote}</span></div><div className="member-meta"><span>{member.role}</span><h3>{member.name}</h3><p>{member.work}</p></div></article>)}</div></section>

      <section className="process-section"><div className="process-heading"><span className="eyebrow">{t.process.eyebrow}</span><h2>{t.process.headingLine1}<br /><em>{t.process.headingLine2}</em></h2><p>{t.process.paragraph}</p></div><ol className="timeline">{steps.map((step, index) => <li key={step}><span className="timeline-number">0{index + 1}</span><span className="timeline-dot" /><div><h3>{step}</h3><span>{t.process.subtitle}</span></div></li>)}</ol></section>

      <section className="jam-section"><span className="jam-star">✳</span><span className="eyebrow">{t.jam.eyebrow}</span><h2>{t.jam.headingLine1}<br /><em>{t.jam.headingLine2}</em></h2><p>{t.jam.paragraph}</p><div className="jam-signature"><span>{t.jam.by}</span><strong>{t.jam.signature}</strong><span>{t.jam.location}</span></div></section>

      <section id="play" className="final-cta"><div className="cta-image" /><div className="cta-content"><span className="eyebrow">{t.cta.eyebrow}</span><h2>{t.cta.headingLine1}<br /><em>{t.cta.headingLine2}</em></h2><p>{t.cta.paragraph}</p><span className="availability"><Gamepad2 size={16} /> {t.cta.availability}</span></div><span className="cta-coordinate">{t.cta.coordinate}</span></section>

      <footer className="footer"><div className="footer-top"><a href="#home" className="footer-logo"><Logo /></a><div className="footer-arabic" lang="ar" dir="rtl">{t.footer.arabicName}</div><div className="footer-nav"><a href="#story">{t.footer.story}</a><a href="#journal">{t.footer.journal}</a><a href="#world">{t.footer.world}</a><a href="#team">{t.footer.team}</a></div><a className="back-top" href="#home" aria-label={t.footer.backTop}><ArrowUpRight /></a></div><div className="footer-bottom"><span>{t.footer.made}</span><span>{t.footer.copyright}</span><span>{t.footer.jam}</span></div></footer>
    </main>
  )
}
