import { MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Drawer } from "react-native-paper";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Female } from "../../../assets/icons/female";
// COMPONENTS
import { Male } from "../../../assets/icons/male";
import { useBiometrics } from "../../../hooks/use-biometrics.hook";
import { logoutUser } from "../../../store/actions";
import { Button } from "../button.component";
import { Header, HeaderInfo, Name } from "./drawer.styles";
import { NavItem } from "./nav-item.component";

export const CustomDrawer = (props) => {
  const dispatch = useDispatch(),
    { isBiometricsSupported } = useBiometrics(),
    { isProcessing, user } = useSelector((state) => state.authReducer),
    porfileName = user.name.split(" ");

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ alignItems: "center" }}>
      <Header>
        <HeaderInfo>
          {user.identitySex === "male" ? <Male width={45} /> : <Female width={45} />}
          <Name>{porfileName.length > 2 ? `${porfileName[0]} ${porfileName[2]}` : `${porfileName[0]} ${porfileName[1]}`}</Name>
        </HeaderInfo>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
      </Header>
      <Drawer.Section style={styles.section}>
        <NavItem onPress={() => props.navigation.navigate("Profile", { screen: "MyProfile" })} label="Mi perfil" icon="user-alt" />
        <NavItem onPress={() => props.navigation.navigate("Accounts", { screen: "MyAccounts" })} label="Mis cuentas" icon="university" />
      </Drawer.Section>
      <Drawer.Section style={styles.section}>
        <NavItem onPress={() => props.navigation.navigate("Exchange")} label="Cambiar divisas" icon="exchange-alt" />
        <NavItem onPress={() => props.navigation.navigate("Activity")} label="Mis cambios" icon="chart-bar" />
        <NavItem onPress={() => props.navigation.navigate("Affiliates")} label="Recomienda y gana" icon="trophy" />
      </Drawer.Section>

      <Drawer.Section style={styles.section}>
        <NavItem onPress={() => props.navigation.navigate("Notifications")} label="Notificaciones" icon="bell" />
        {isBiometricsSupported && <NavItem onPress={() => props.navigation.navigate("Biometrics")} label="Inicio rápido de sesión" icon="fingerprint" />}
      </Drawer.Section>

      <Button variant="secondary" onPress={() => dispatch(logoutUser())} loading={isProcessing}>
        Cerrar sesión
      </Button>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 4,
    marginTop: 20,
    width: Dimensions.get("window").width,
    borderColor: "#20A2A5",
  },
});
