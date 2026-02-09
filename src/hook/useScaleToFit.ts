import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

type Dimensions = {
  width: number
  height: number
}

type ScaleOptions = {
  padding?: number
  maxScale?: number
  minScale?: number
}

const defaultDimensions: Dimensions = { width: 0, height: 0 }

export function useScaleToFit<T extends HTMLElement>(
  targetRef: React.RefObject<T | null>,
  options: ScaleOptions = {}
) {
  const { padding = 32, maxScale = 1, minScale = 0.35 } = options;

  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);
  const [scale, setScale] = useState(1);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useLayoutEffect(() => {
    const element = targetRef.current
    if (!element || typeof ResizeObserver === 'undefined') {
      return
    };

    resizeObserverRef.current = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      };

      let width: number;
      let height: number;

      if (entry.contentBoxSize) {
        const boxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize
        width = boxSize.inlineSize
        height = boxSize.blockSize
      } else {
        width = entry.contentRect.width
        height = entry.contentRect.height
      };

      setDimensions({ width, height });
    });

    resizeObserverRef.current.observe(element)

    return () => {
      resizeObserverRef.current?.disconnect()
      resizeObserverRef.current = null
    }
  }, [targetRef])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (!dimensions.width || !dimensions.height) {
      return
    }

    const handleResize = () => {
      const availableWidth = Math.max(window.innerWidth - padding * 2, 0)
      const availableHeight = Math.max(window.innerHeight - padding * 2, 0)

      if (availableWidth === 0 || availableHeight === 0) {
        return
      }

      const scaleByWidth = availableWidth / dimensions.width
      const scaleByHeight = availableHeight / dimensions.height

      const nextScale = Math.min(scaleByWidth, scaleByHeight, maxScale)
      const boundedScale = Math.max(nextScale, minScale)

      setScale(Number.isFinite(boundedScale) ? boundedScale : 1)
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions.height, dimensions.width, maxScale, minScale, padding])

  const scaledSize = useMemo(() => {
    if (!dimensions.width || !dimensions.height) {
      return defaultDimensions
    }

    return {
      width: dimensions.width * scale,
      height: dimensions.height * scale,
    }
  }, [dimensions.height, dimensions.width, scale])

  return { scale, dimensions, scaledSize }
};