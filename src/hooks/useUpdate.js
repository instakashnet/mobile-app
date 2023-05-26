import { useEffect, useRef } from 'react'

export function useUpdate(effect, dependencies = []) {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      effect()
    }
  }, dependencies)
}
