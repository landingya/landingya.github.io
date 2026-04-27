import { useEffect, useRef } from 'react'

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

export default function GlobeViz({ size = 500 }) {
  const containerRef = useRef(null)
  const globeInstanceRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    let isCancelled = false

    import('globe.gl').then(({ default: Globe }) => {
      if (isCancelled) return

      const PERU_LAT = -12.05
      const PERU_LNG = -77.04
      const C = '#22d3ee'

      // 7 arcos clave — uno por región, bien distribuidos
      const allArcs = [
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 40.7,  endLng: -74.0,  color: C, alt: 0.35, speed: 1600, dash: 0.5 }, // Nueva York
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: -23.5, endLng: -46.6,  color: C, alt: 0.14, speed: 1200, dash: 0.6 }, // São Paulo
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 51.5,  endLng: -0.1,   color: C, alt: 0.46, speed: 1900, dash: 0.5 }, // Londres
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 40.4,  endLng: -3.7,   color: C, alt: 0.40, speed: 2300, dash: 0.4 }, // Madrid
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 25.2,  endLng: 55.2,   color: C, alt: 0.48, speed: 1700, dash: 0.55 }, // Dubái
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 35.6,  endLng: 139.6,  color: C, alt: 0.54, speed: 2000, dash: 0.45 }, // Tokio
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: -33.8, endLng: 151.2,  color: C, alt: 0.52, speed: 2200, dash: 0.5 }, // Sídney
      ]

      const mobileArcs = [allArcs[0], allArcs[2], allArcs[4], allArcs[5]]

      const arcsData = isMobile() ? mobileArcs : allArcs

      const pointsData = [
        { lat: PERU_LAT, lng: PERU_LNG,  size: 0.9, color: '#ffffff' },
        { lat: 40.7,  lng: -74.0,  size: 0.45, color: C },
        { lat: -23.5, lng: -46.6,  size: 0.45, color: C },
        { lat: 51.5,  lng: -0.1,   size: 0.45, color: C },
        { lat: 40.4,  lng: -3.7,   size: 0.45, color: C },
        { lat: 25.2,  lng: 55.2,   size: 0.45, color: C },
        { lat: 35.6,  lng: 139.6,  size: 0.45, color: C },
        { lat: -33.8, lng: 151.2,  size: 0.45, color: C },
      ]

      const globe = Globe()(container)
        .width(size)
        .height(size)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#a855f7')
        .atmosphereAltitude(0.28)
        .arcsData(arcsData)
        .arcColor('color')
        .arcAltitude('alt')
        .arcDashLength('dash')
        .arcDashGap(0.08)
        .arcDashAnimateTime('speed')
        .arcStroke(1.4)
        .pointsData(pointsData)
        .pointColor('color')
        .pointAltitude(0.01)
        .pointRadius('size')
        .pointsMerge(false)
        .enablePointerInteraction(false)

      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.5
      globe.controls().enableZoom = false
      globe.controls().enablePan = false

      globe.pointOfView({ lat: -12, lng: -60, altitude: 2.0 })
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      const handleVisibility = () => {
        globe.controls().autoRotate = !document.hidden
      }
      document.addEventListener('visibilitychange', handleVisibility)

      globeInstanceRef.current = { globe, handleVisibility }
    })

    return () => {
      isCancelled = true
      const instance = globeInstanceRef.current
      if (instance) {
        const { globe, handleVisibility } = instance
        document.removeEventListener('visibilitychange', handleVisibility)
        try {
          globe.pauseAnimation()
          globe.renderer().dispose()
          globe.renderer().forceContextLoss()
        } catch (_) {}
      }
      if (container) container.innerHTML = ''
      globeInstanceRef.current = null
    }
  }, [size])

  return (
    <div
      style={{
        filter: 'drop-shadow(0 0 70px rgba(34,211,238,0.5)) drop-shadow(0 0 30px rgba(168,85,247,0.3))',
      }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        style={{
          width: size,
          height: size,
          filter: 'brightness(1.1) saturate(1.4) contrast(1.05)',
        }}
      />
    </div>
  )
}
