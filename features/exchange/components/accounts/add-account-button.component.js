import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { theme } from "../../../../theme";

// COMPONENTS
import { AddWrapper } from "../accounts.styles";
import { Text } from "../../../../components/typography/text.component";

export const AddAccountButton = ({ onPress }) => {
  return (
    <AddWrapper onPress={onPress}>
      <Text>Agregar cuenta</Text>
      <TouchableOpacity onPress={onPress}>
        <Ionicons color={theme.colors.brand.primary} name="add-circle-sharp" size={30} />
      </TouchableOpacity>
    </AddWrapper>
  );
};
