import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";

export const useBiometrics = () => {
  const [isBiometricsSupported, setIsBiometricsSupported] = useState(false);

  useEffect(() => {
    (async () => {
      let isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (isCompatible) {
        let isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (isEnrolled) return setIsBiometricsSupported(true);
      }
      setIsBiometricsSupported(false);
    })();
  }, []);

  return { isBiometricsSupported };
};
