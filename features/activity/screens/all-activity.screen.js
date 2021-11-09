import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Title } from "../components/activity.styles";

export const AllActivityScreen = () => {
  return (
    <SafeArea>
      <Spacer variant="top" size={6} />
      <Title>
        <Text variant="subtitle">Cambios realizados</Text>
        <Ionicons name="swap-horizontal-outline" color="#0D8284" size={25} />
      </Title>
    </SafeArea>
  );
};
