import { Asset } from 'expo-asset'
import { loadAsync as loadFontsAsync } from 'expo-font'
import { Image } from 'react-native'

export function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export function cacheFonts(fonts) {
  return fonts.map((font) => loadFontsAsync(font))
}
