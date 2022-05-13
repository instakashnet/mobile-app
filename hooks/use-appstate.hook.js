import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export const useAppState = () => {
  const appState = useRef(AppState.currentState),
    [returned, setReturned] = useState(false);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
      setReturned(true);
    } else setReturned(false);

    appState.current = nextAppState;
  };

  return { state: appState.current, returned };
};
