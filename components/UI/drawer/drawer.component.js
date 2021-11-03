import React, { useState } from "react";
import { Drawer } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../store/actions";

// COMPONENTS
import { Male } from "../../../assets/icons/male";
import { NavItem } from "./nav-item.component";
import { Header, Name, HeaderInfo } from "./drawer.styles";
import { Button } from "../button.component";
import { Spacer } from "../../utils/spacer.component";

export const CustomDrawer = (props) => {
  const dispatch = useDispatch(),
    [active, setActive] = useState(""),
    isProcessing = useSelector((state) => state.authReducer.isProcessing);

  const onSelectPage = (page) => {
    setActive(page);
    props.navigation.navigate("Profile", { screen: page });
  };

  return (
    <DrawerContentScrollView {...props}>
      <Header>
        <HeaderInfo>
          <Male width={45} />
          <Name>Roger Rengifo</Name>
        </HeaderInfo>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialIcons name="arrow-forward" size={30} color="#FFF" />
        </TouchableOpacity>
      </Header>
      <Drawer.Section style={styles.section}>
        <NavItem onPress={onSelectPage} label="Mi perfil" icon="user-alt" active={active === "MyProfile"} />
        <NavItem onPress={() => {}} labelStyle={{ marginLeft: -18 }} label="Cambiar perfil" icon="user-friends" active={active === "change-profile"} />
        <NavItem onPress={() => {}} label="Mis cuentas" icon="university" active={active === "my-accountd"} />
      </Drawer.Section>
      <Spacer variant="top" size={2} />
      <Spacer variant="horizontal" size={6}>
        <Button variant="secondary" onPress={() => dispatch(logoutUser())} loading={isProcessing}>
          Cerrar sesión
        </Button>
      </Spacer>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 4,
    marginTop: 20,
  },
});
