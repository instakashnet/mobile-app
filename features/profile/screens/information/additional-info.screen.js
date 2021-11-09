import React from "react";
import { View } from "react-native";
import { format } from "date-fns";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, NavItem, ItemWrapper, RightArrow } from "../../components/profile.styles";

export const AdditionalInfoScreen = ({ route, navigation }) => {
  const { profile } = route.params;

  return (
    <SafeArea>
      <HeaderProfile>
        <Text variant="button" style={{ color: "#FFF" }}>
          Gestiona toda tu información adicional para poder generar ordenes mayores a 5mil USD.
        </Text>
      </HeaderProfile>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { profile })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Fecha de nacimiento</Text>
            <Text>{profile.dateBirth ? format(new Date(profile.dateBirth), "dd/MM/yyyy") : "Agregar fecha"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { profile })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Dirección</Text>
            <Text>{profile.address || "Agregar dirección"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { profile })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Ocupación</Text>
            <Text>{profile.job || "Agregar ocupación"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { profile })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Profesión</Text>
            <Text>{profile.profession || "Agregar profesión"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
