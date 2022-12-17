import { useMemo } from "react";
import { View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const CountdownTimer = ({ timeLeft, onFinish }) => {
  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;
  const circleTime = Math.floor(timeLeft / 1000);

  useMemo(() => {
    if (timeLeft === 0) onFinish();
  }, [timeLeft]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <CountdownCircleTimer isPlaying duration={circleTime} size={20} strokeWidth={2.5} colors="#20A2A5" />
      <Spacer variant="left" />
      <Text variant="bold">
        {`${minutes < 10 ? "0" : ""}${minutes}`}:{`${seconds < 10 ? "0" : ""}${seconds}`}
      </Text>
    </View>
  );
};
