import React from "react";
import { Circle as ProgressCircle } from "react-native-progress";
import { ActivityIndicator } from "react-native-paper";
import { Dimensions } from "react-native";
import { Text } from "../../../components/typography/text.component";
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
        size={Dimensions.get("window").width < 380 ? 80 : 90}
        animated={false}
        borderWidth={1}
        thickness={3}
        showsText
        textStyle={{ color, fontFamily: "lato-black", fontSize: 22 }}
        color={color}
      />
      <CompletedInfo>
        <Text variant="bold">{percentage < 100 ? "Por completar" : "Perfil completado"}</Text>
        <CompletedItem>
          <MaterialCommunityIcons size={20} color={user.phone ? "#0D8284" : "#AFAFAF"} name={user.phone ? "check" : "minus"} style={{ marginRight: 5 }} />
          <CompletedText color={user.phone ? "#0D8284" : "#AFAFAF"}>Datos personales</CompletedText>
        </CompletedItem>

        <CompletedItem>
          {user.identityDocumentValidation === "pending" ? (
            <ActivityIndicator color="#EB9824" size={20} style={{ marginRight: 5 }} />
          ) : (
            <MaterialCommunityIcons
              size={20}
              color={user.identityDocumentValidation === "success" ? "#0D8284" : "#AFAFAF"}
              name={user.identityDocumentValidation === "success" ? "check" : "minus"}
              style={{ marginRight: 5 }}
            />
          )}

          <CompletedText color={user.identityDocumentValidation === "success" ? "#0D8284" : user.identityDocumentValidation === "pending" ? "#EB9824" : "#AFAFAF"}>
            {user.identityDocumentValidation === "success"
              ? "Identidad verificada"
              : user.identityDocumentValidation === "pending"
              ? "Verificando identidad"
              : "Debes verificar tu identidad"}
          </CompletedText>
        </CompletedItem>

        <CompletedItem>
          <MaterialCommunityIcons
            size={20}
            color={user.address && user.dateBirth ? "#0D8284" : "#AFAFAF"}
            name={user.address && user.dateBirth ? "check" : "minus"}
            style={{ marginRight: 5 }}
          />
          <CompletedText color={user.address && user.dateBirth ? "#0D8284" : "#AFAFAF"}>
            {user.address && user.dateBirth ? "Datos adicionales" : "Faltan datos adicionales"}
          </CompletedText>
        </CompletedItem>
      </CompletedInfo>
    </CompletedWrapper>
  );
};
