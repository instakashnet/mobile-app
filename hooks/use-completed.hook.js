import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useProfileCompleted = (level) => {
  const [percentage, setPercentage] = useState(33);
  const [color, setColor] = useState('#FF4B55');

  useFocusEffect(
    useCallback(() => {
      if (level === 2) {
        setPercentage(66);
        setColor('#EB9824');
      } else if (level === 3) {
        setPercentage(100);
        setColor('#0D8284');
      } else {
        setPercentage(33);
        setColor('#FF4B55');
      }
    }, [level]),
  );

  return [percentage, color];
};
