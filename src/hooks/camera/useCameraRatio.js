import Camera from 'expo-camera'
import { useState } from 'react'

export function useCameraRatio() {
  const [isRatioSet, setIsRatioSet] = useState(false)
  const [ratio, setRatio] = useState('4:3')

  const prepareRatio = async () => {
    let desiredRatio = '4:3' // Start with the system default
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await Camera.getSupportedRatiosAsync()

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {}
      let realRatios = {}
      let minDistance = null
      for (const ratio of ratios) {
        const parts = ratio.split(':')
        const realRatio = parseInt(parts[0]) / parseInt(parts[1])
        realRatios[ratio] = realRatio
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio
        distances[ratio] = realRatio
        if (minDistance == null) {
          minDistance = ratio
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio
          }
        }
      }
      // set the best match
      desiredRatio = minDistance
      // set the preview ratio
      setRatio(desiredRatio)
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true)
    }
  }

  return { ratio, isRatioSet, prepareRatio }
}
