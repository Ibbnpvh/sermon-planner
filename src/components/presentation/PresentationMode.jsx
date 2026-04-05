import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { buildSlides } from './buildSlides'
import { TitleSlide } from './slides/TitleSlide'
import { PointSlide } from './slides/PointSlide'
import { TextSlide } from './slides/TextSlide'
import styles from './PresentationMode.module.css'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function SlideRenderer({ slide, fontSize }) {
  if (slide.type === 'title') {
    return <TitleSlide data={slide.data} preacherInfo={slide.preacherInfo} fontSize={fontSize} />
  }
  if (slide.type === 'point') {
    return <PointSlide data={slide.data} index={slide.index} total={slide.total} fontSize={fontSize} />
  }
  return <TextSlide type={slide.type} data={slide.data} fontSize={fontSize} />
}

export function PresentationMode({ isOpen, onClose, state, stats }) {
  const [current, setCurrent] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [fontSize, setFontSize] = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef(null)
  const startTime = useRef(null)
  const touchStart = useRef(null)

  const slides = useMemo(() => buildSlides(state), [state])

  const goTo = useCallback((index) => {
    if (index < 0 || index >= slides.length || transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setTransitioning(false)
    }, 180)
  }, [slides.length, transitioning])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Fullscreen + reset on open
  useEffect(() => {
    if (!isOpen) return
    setCurrent(0)
    setElapsed(0)
    startTime.current = Date.now()
    containerRef.current?.requestFullscreen?.().catch(() => {})
    return () => {
      if (document.fullscreenElement) document.exitFullscreen?.()
    }
  }, [isOpen])

  // Sync close when user presses browser's native Esc to exit fullscreen
  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement && isOpen) onClose()
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [isOpen, onClose])

  // Timer
  useEffect(() => {
    if (!isOpen) return
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [isOpen])

  // Keyboard
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      else if (e.key === 'Escape') onClose()
      else if (e.key === '+' || e.key === '=') setFontSize(s => Math.min(+(s + 0.1).toFixed(1), 1.8))
      else if (e.key === '-') setFontSize(s => Math.max(+(s - 0.1).toFixed(1), 0.6))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, next, prev, onClose])

  // Touch swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStart.current = null
  }

  if (!isOpen || slides.length === 0) return null

  const slide = slides[current]

  return (
    <div
      ref={containerRef}
      className={styles.overlay}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.fontControls}>
          <button
            className={styles.iconBtn}
            onClick={() => setFontSize(s => Math.max(+(s - 0.1).toFixed(1), 0.6))}
            title="Reduzir fonte (−)"
            aria-label="Reduzir fonte"
          >
            A−
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => setFontSize(s => Math.min(+(s + 0.1).toFixed(1), 1.8))}
            title="Aumentar fonte (+)"
            aria-label="Aumentar fonte"
          >
            A+
          </button>
        </div>
        <div className={styles.slideTitle}>
          {slide.type === 'title' && (state?.titleTheme?.sermonTitle || 'Sermão')}
          {slide.type === 'point' && `Ponto ${slide.index + 1} de ${slide.total}`}
          {slide.type === 'intro' && 'Introdução'}
          {slide.type === 'conclusion' && 'Conclusão'}
          {slide.type === 'prayer' && 'Oração Final'}
        </div>
        <button className={styles.closeBtn} onClick={onClose} title="Sair (Esc)" aria-label="Sair da apresentação">
          ✕
        </button>
      </div>

      {/* Slide content */}
      <div className={`${styles.slideArea} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
        <SlideRenderer slide={slide} fontSize={fontSize} />
      </div>

      {/* Nav arrows */}
      {current > 0 && (
        <button className={`${styles.navBtn} ${styles.navLeft}`} onClick={prev} aria-label="Slide anterior">
          ‹
        </button>
      )}
      {current < slides.length - 1 && (
        <button className={`${styles.navBtn} ${styles.navRight}`} onClick={next} aria-label="Próximo slide">
          ›
        </button>
      )}

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.timer}>{formatTime(elapsed)}</span>
        <div className={styles.dots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
        <span className={styles.counter}>{current + 1} / {slides.length}</span>
      </div>
    </div>
  )
}
