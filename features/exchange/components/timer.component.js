import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Timer, TimerWrapper } from "./calculator.styles";

export const CountdownTimer = ({ duration, onFinish, countdown }) => {
  const [countRunnig, setCountRunning] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCountRunning(true);

      return () => setCountRunning(false);
    }, [])
  );

  return (
    <TimerWrapper>
      <CountdownCircleTimer key={countdown.toString()} isPlaying duration={duration} size={18} strokeWidth={2.5} colors="#0D8284" />
      <Timer
        id={countdown.toString()}
        running={countRunnig}
        until={Math.round(Number(duration))}
        size={14}
        onFinish={onFinish}
        timeToShow={["M", "S"]}
        timeLabels={{ m: "", s: "" }}
      />
    </TimerWrapper>
  );
};
