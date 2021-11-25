import React from "react";
import { Drawer } from "react-native-paper";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions";

// COMPONENTS
import { Male } from "../../../assets/icons/male";
import { Female } from "../../../assets/icons/female";
import { NavItem } from "./nav-item.component";
import { Header, Name, HeaderInfo } from "./drawer.styles";
import { Button } from "../button.component";

export const CustomDrawer = (props) => {
  const dispatch = useDispatch(),
    { isProcessing, user } = useSelector((state) => state.authReducer);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ alignItems: "center" }}>
      <Header>
        <HeaderInfo>
          {user.identitySex === "male" ? <Male width={45} /> : <Female />}
          <Name>{user.name}</Name>
        </HeaderInfo>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="arrow-forward" size={30} color="#FFF" />
        </TouchableOpacity>
      </Header>
      <Drawer.Section style={styles.section}>
        <NavItem onPress={() => props.navigation.navigate("Profile", { screen: "MyProfile" })} label="Mis datos" icon="user-alt" />
        <NavItem onPress={() => props.navigation.navigate("Accounts", { screen: "MyAccounts" })} label="Mis cuentas" icon="university" />
      </Drawer.Section>
      <Drawer.Section style={styles.section}>
        <NavItem onPress={() => props.navigation.navigate("Exchange")} label="Cambiar divisas" icon="exchange-alt" />
        <NavItem onPress={() => props.navigation.navigate("Activity")} label="Mis cambios" icon="chart-bar" />
        <NavItem onPress={() => props.navigation.navigate("Affiliates")} label="Recomienda y gana" icon="trophy" />
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
  },
});
