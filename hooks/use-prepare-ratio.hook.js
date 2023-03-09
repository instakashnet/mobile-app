import { useState } from 'react';
import { Dimensions, Platform } from 'react-native';

export const usePrepareRatio = () => {
  const [ratio, setRatio] = useState('4:3'),
    [isRatioSet, setIsRatioSet] = useState(false),
    [imagePadding, setImagePadding] = useState(null),
    { height, width } = Dimensions.get('window'),
    screenRatio = height / width;

  const prepareRatio = async () => {
    try {
      let desiredRatio = '4:3'; // Start with the system default
      // This issue only affects Android
      if (Platform.OS === 'android') {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();

        // Calculate the width/height of each of the supported camera ratios
        // These width/height are measured in landscape mode
        // find the ratio that is closest to the screen ratio without going over
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of ratios) {
          const parts = ratio.split(':');
          const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
          realRatios[ratio] = realRatio;
          // ratio can't be taller than screen, so we don't want an abs()
          const distance = screenRatio - realRatio;
          distances[ratio] = realRatio;
          if (minDistance == null) {
            minDistance = ratio;
          } else {
            if (distance >= 0 && distance < distances[minDistance]) {
              minDistance = ratio;
            }
          }
        }
        // set the best match
        desiredRatio = minDistance;
        //  calculate the difference between the camera width and the screen height
        const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
        // set the preview padding and preview ratio
        setImagePadding(remainder);
        setRatio(desiredRatio);
        // Set a flag so we don't do this
        // calculation each time the screen refreshes
        setIsRatioSet(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  setCameraReady = async () => {
    try {
      if (!isRatioSet) await prepareRatio();
    } catch (error) {
      console.error(error);
    }
  };

  return { ratio, imagePadding, setCameraReady };
};
