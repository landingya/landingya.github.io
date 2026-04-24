import { useEffect, useRef } from 'react'

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

export default function GlobeViz({ size = 500 }) {
  const containerRef = useRef(null)
  const globeInstanceRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Limpiar instancia previa si existe
    container.innerHTML = ''
    let isCancelled = false

    // Importar globe.gl dinámicamente para evitar SSR issues
    import('globe.gl').then(({ default: Globe }) => {
      if (isCancelled) return

      // Datos de arcos entre ciudades/puntos del mundo
      // Lima, Perú — punto de origen
      const PERU_LAT = -12.05
      const PERU_LNG = -77.04

      // 14 arcos desktop, 8 en mobile — buena cobertura geográfica sin sobrecargar
      const allArcs = [
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 40.7,  endLng: -74.0,  color: '#22D3EE' }, // Nueva York
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 34.0,  endLng: -118.2, color: '#22D3EE' }, // Los Ángeles
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 19.4,  endLng: -99.1,  color: '#22D3EE' }, // Ciudad de México
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 51.5,  endLng: -0.1,   color: '#22D3EE' }, // Londres
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 40.4,  endLng: -3.7,   color: '#22D3EE' }, // Madrid
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 48.8,  endLng: 2.3,    color: '#22D3EE' }, // París
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 52.5,  endLng: 13.4,   color: '#22D3EE' }, // Berlín
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 35.6,  endLng: 139.6,  color: '#22D3EE' }, // Tokio
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 25.2,  endLng: 55.2,   color: '#22D3EE' }, // Dubái
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 1.3,   endLng: 103.8,  color: '#22D3EE' }, // Singapur
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: -33.8, endLng: 151.2,  color: '#22D3EE' }, // Sídney
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: -23.5, endLng: -46.6,  color: '#22D3EE' }, // São Paulo
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: -34.6, endLng: -58.3,  color: '#22D3EE' }, // Buenos Aires
        { startLat: PERU_LAT, startLng: PERU_LNG, endLat: 30.0,  endLng: 31.2,   color: '#22D3EE' }, // El Cairo
      ]

      // Mobile: solo 8 (uno por región principal)
      const mobileArcs = [allArcs[0], allArcs[2], allArcs[3], allArcs[4], allArcs[7], allArcs[8], allArcs[10], allArcs[11]]

      const arcsData = isMobile() ? mobileArcs : allArcs

      const pointsData = [
        // Perú — destacado en blanco/amarillo, más grande
        { lat: PERU_LAT, lng: PERU_LNG, size: 1.0, color: '#ffffff' },
        // Resto del mundo
        { lat: 40.7, lng: -74.0, size: 0.5, color: '#22D3EE' },
        { lat: 51.5, lng: -0.1, size: 0.5, color: '#22D3EE' },
        { lat: 35.6, lng: 139.6, size: 0.5, color: '#22D3EE' },
        { lat: 22.3, lng: 114.1, size: 0.4, color: '#22D3EE' },
        { lat: -23.5, lng: -46.6, size: 0.4, color: '#22D3EE' },
        { lat: 48.8, lng: 2.3, size: 0.5, color: '#22D3EE' },
        { lat: 19.4, lng: -99.1, size: 0.4, color: '#22D3EE' },
        { lat: 1.3, lng: 103.8, size: 0.4, color: '#22D3EE' },
        { lat: 55.7, lng: 37.6, size: 0.4, color: '#22D3EE' },
        { lat: 28.6, lng: 77.2, size: 0.4, color: '#22D3EE' },
        { lat: -33.8, lng: 151.2, size: 0.4, color: '#22D3EE' },
        { lat: 31.2, lng: 121.4, size: 0.45, color: '#22D3EE' },
        { lat: 25.2, lng: 55.2, size: 0.4, color: '#22D3EE' },
        { lat: 37.5, lng: 126.9, size: 0.4, color: '#22D3EE' },
      ]

      const globe = Globe()(container)
        .width(size)
        .height(size)
        .backgroundColor('rgba(0,0,0,0)')
        // Blue Marble NASA — continentes reales, se oscurece con CSS
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        // Atmósfera azul prominente
        .showAtmosphere(true)
        .atmosphereColor('#38BDF8')
        .atmosphereAltitude(0.32)
        // Arcos entre ciudades
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(0.15)
        .arcDashAnimateTime(2500)
        .arcStroke(0.6)
        .arcAltitude(0.3)
        // Puntos en ciudades
        .pointsData(pointsData)
        .pointColor('color')
        .pointAltitude(0.01)
        .pointRadius('size')
        .pointsMerge(false)
        // Sin interacción del usuario
        .enablePointerInteraction(false)

      // Rotación automática lenta
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.5
      globe.controls().enableZoom = false
      globe.controls().enablePan = false

      // Vista inicial centrada en Perú
      globe.pointOfView({ lat: -12, lng: -60, altitude: 2.0 })

      // Limitar pixel ratio a 1.5x máximo — reduce GPU hasta un 75% en retina
      globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

      // Pausar animación cuando el usuario cambia de pestaña
      const handleVisibility = () => {
        if (document.hidden) {
          globe.controls().autoRotate = false
        } else {
          globe.controls().autoRotate = true
        }
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
        filter: 'drop-shadow(0 0 60px rgba(14,165,233,0.6)) drop-shadow(0 0 25px rgba(34,211,238,0.35))',
      }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        style={{
          width: size,
          height: size,
          filter: 'brightness(1.0) saturate(1.2) contrast(1.0)',
        }}
      />
    </div>
  )
}
