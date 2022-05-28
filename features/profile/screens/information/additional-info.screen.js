import React from "react";
import { View } from "react-native";
import { format } from "date-fns";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import { SafeArea } from "../../../../components/utils/safe-area.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { HeaderProfile, NavItem, ItemWrapper, RightArrow } from "../../components/profile.styles";

export const AdditionalInfoScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <SafeArea>
      <HeaderProfile>
        <Text numberOfLines={3} variant="button" style={{ color: "#FFF" }}>
          Gestiona toda tu información adicional para poder generar ordenes mayores a 5mil USD.
        </Text>
      </HeaderProfile>
      <Spacer variant="top" size={6} />
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { user })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Fecha de nacimiento</Text>
            <Text>{user.dateBirth ? format(new Date(user.dateBirth), "dd/MM/yyyy") : "Agregar fecha"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { user })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Dirección</Text>
            <Text>{user.address || "Agregar dirección"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { user })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Ocupación</Text>
            <Text>{user.job || "Agregar ocupación"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
      <NavItem onPress={() => navigation.navigate("EditAdditionals", { user })}>
        <ItemWrapper>
          <View>
            <Text variant="caption">Profesión</Text>
            <Text>{user.profession || "Agregar profesión"}</Text>
          </View>
          <RightArrow />
        </ItemWrapper>
      </NavItem>
    </SafeArea>
  );
};
