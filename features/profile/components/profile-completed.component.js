import React from "react";
import { Circle as ProgressCircle } from "react-native-progress";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useProfileCompleted } from "../../../hooks/use-completed.hook";

// STLYED COMPONENTS
import { CompletedWrapper, CompletedInfo, CompletedText, CompletedItem } from "./profile.styles";

export const ProfileCompleted = ({ user }) => {
  const [percentage, color] = useProfileCompleted(user);

  return (
    <CompletedWrapper>
      <ProgressCircle
        progress={percentage / 100}
        size={95}
        animated={false}
        borderWidth={1}
        thickness={3}
        showsText
        textStyle={{ color, fontFamily: "lato-black", fontSize: 22 }}
        color={color}
      />
      <Spacer variant="left" />
      <CompletedInfo>
        <Text variant="bold">{percentage < 100 ? "Por completar" : "Perfil completado"}</Text>
        <CompletedItem>
          <MaterialCommunityIcons size={20} color={user.level > 0 ? "#0D8284" : "#AFAFAF"} name={user.level > 0 ? "check" : "minus"} style={{ marginRight: 5 }} />
          <CompletedText color={user.level > 0 ? "#0D8284" : "#AFAFAF"}>Datos personales</CompletedText>
        </CompletedItem>

        <CompletedItem>
          {user.identityDocumentValidation === "pending" ? (
            <ActivityIndicator color="#EB9824" size={20} style={{ marginRight: 5 }} />
          ) : (
            <MaterialCommunityIcons size={20} color={user.level === 3 ? "#0D8284" : "#AFAFAF"} name={user.level === 3 ? "check" : "minus"} style={{ marginRight: 5 }} />
          )}

          <CompletedText color={user.identityDocumentValidation === "success" ? "#0D8284" : user.identityDocumentValidation === "pending" ? "#EB9824" : "#AFAFAF"}>
            {user.level === 3 ? "Identidad verificada" : user.identityDocumentValidation === "pending" ? "Verificando identidad" : "Debes verificar tu identidad"}
          </CompletedText>
        </CompletedItem>

        <CompletedItem>
          <MaterialCommunityIcons size={20} color={user.level > 1 ? "#0D8284" : "#AFAFAF"} name={user.level > 1 ? "check" : "minus"} style={{ marginRight: 5 }} />
          <CompletedText color={user.level > 1 ? "#0D8284" : "#AFAFAF"}>{user.level > 1 ? "Datos adicionales" : "Faltan datos adicionales"}</CompletedText>
        </CompletedItem>
      </CompletedInfo>
    </CompletedWrapper>
  );
};
