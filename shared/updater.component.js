import { useEffect, useRef, useState } from "react";
import { useInaccurateTimestamp } from "react-native-use-timestamp";
import { UpdateModal } from "../components/modals/update-modal.component";
import { checkForUpdates } from "./helpers/check-updates";

const INTERVAL_RENDER = 1000 * (__DEV__ ? 10 : 60),
  INTERVAL_OTA_CHECK = 1000 * 60 * 15;

export default function Updater() {
  const now = useInaccurateTimestamp({ every: INTERVAL_RENDER });
  const isMounted = useRef(true);
  const [updateIsAvailable, setUpdateAvailable] = useState(false);

  const lastUpdate = useRef(0);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (updateIsAvailable) return;
    if (now - lastUpdate.current < INTERVAL_OTA_CHECK) return;

    lastUpdate.current = now;

    checkForUpdates()
      .then(() => {
        isMounted.current && setUpdateAvailable(true);
      })
      .catch((_reason) => {
        /* you can inspect _reason */
        console.error(_reason);
      });
  }, [now]);

  return <UpdateModal isVisible={updateIsAvailable} />;
}