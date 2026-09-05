import { useEffect, useRef } from 'react'

export function useMagnetic(intensity = 0.25) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const elX = rect.left + rect.width / 2
      const elY = rect.top + rect.height / 2
      const distanceX = e.clientX - elX
      const distanceY = e.clientY - elY

      const distance = Math.hypot(distanceX, distanceY)
      const triggerArea = Math.max(rect.width, rect.height) * 1.25

      if (distance < triggerArea) {
        // Pull element slightly towards cursor with spring-like physics interpolation
        const targetX = distanceX * intensity
        const targetY = distanceY * intensity
        el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
        el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
      } else {
        el.style.transform = 'translate3d(0, 0, 0)'
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
      }
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)'
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return ref
}
