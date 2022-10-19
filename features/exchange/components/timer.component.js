import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Timer, TimerWrapper } from "./calculator.styles";

export const CountdownTimer = ({ duration, onFinish, countDownId }) => {
  const [countRunnig, setCountRunning] = useState(false);
  const [id, setId] = useState(countDownId);

  useFocusEffect(
    useCallback(() => {
      setCountRunning(true);

      return () => setCountRunning(false);
    }, [])
  );

  useEffect(() => {
    const newId = new Date().getTime().toString();

    setId(newId);
  }, [duration]);

  return (
    <TimerWrapper>
      <CountdownCircleTimer key={countDownId} isPlaying duration={duration} size={18} strokeWidth={2.5} colors="#0D8284" />
      <Timer id={countDownId} running={countRunnig} until={duration} size={14} onFinish={onFinish} timeToShow={["M", "S"]} timeLabels={{ m: "", s: "" }} />
    </TimerWrapper>
  );
};
