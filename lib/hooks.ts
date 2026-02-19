import { useState, useEffect, RefObject } from "react"
import type { InViewOptions } from "@/types/hooks"

export function useInView(
  ref: RefObject<Element | null>,
  options: InViewOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const { root, rootMargin, threshold } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, { root, rootMargin, threshold })

    observer.observe(element)

    return () => observer.unobserve(element)

  }, [ref, root, rootMargin, threshold])

  return isIntersecting
}
