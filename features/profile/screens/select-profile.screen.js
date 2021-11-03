import React, { useEffect } from "react";
import { TouchableOpacity, Platform, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProfiles, logoutUser, selectProfile } from "../../../store/actions";

// ASSETS
import { Male } from "../../../assets/icons/male";
import { LogoutIcon } from "../../../assets/icons/logout";

// COMPONENTS
import { SelectProfileCover, Title, SubTitle, CompanyProfileView, AddCompanyList, CompanyList } from "../components/select-profile.styles";
import { CompanyProfile } from "../components/company-profile.component";
import { AddCompany } from "../components/add-company.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Loader } from "../../../components/UI/loader.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Link } from "../../../components/typography/link.component";

export const SelectProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // STORE SELECTORS
  const user = useSelector((state) => state.authReducer.user);
  const { isLoading } = useSelector((state) => state.profileReducer);
  const userProfile = useSelector((state) => state.profileReducer.profiles.find((p) => p.type === "natural"));
  const companyProfiles = useSelector((state) => state.profileReducer.profiles.filter((p) => p.type === "juridica"));

  // HANDLERS
  const onLogout = () => dispatch(logoutUser());
  const onAddProfile = () => navigation.navigate("AddProfile");
  const onSelectProfile = async (type, id = null) => {
    let profile;

    if (type === "juridica") {
      profile = companyProfiles.find((c) => c.id === id);
    } else profile = userProfile;

    try {
      await AsyncStorage.setItem("profileSelected", JSON.stringify(profile));
    } catch (error) {
      console.log(error);
    }

    return dispatch(selectProfile(profile));
  };

  // EFFECTS
  useEffect(() => {
    dispatch(getProfiles());
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10, paddingBottom: Platform.OS === "ios" ? 0 : 20 }}>
          <TouchableOpacity onPress={onLogout}>
            <LogoutIcon />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <SelectProfileCover>
        <Title>Bienvenido</Title>
        <Male width={90} />
        <Spacer variant="top" />
        <SubTitle>Hola, ¿Que perfil usarás hoy?</SubTitle>
        <Spacer variant="top" size={2} />
        <Link style={{ borderBottomColor: "#FFF" }} onPress={onSelectProfile.bind(this, "natural")}>
          <Text variant="bold" style={{ color: "#FFF" }}>
            Continuar como {user.name}
          </Text>
        </Link>
      </SelectProfileCover>
      <CompanyProfileView>
        <Text variant="subtitle">Usar un perfil de empresa</Text>
        {companyProfiles.length > 0 && (
          <CompanyList>
            {companyProfiles.map((c) => (
              <CompanyProfile key={c.id} companyName={c.razon_social} onSelect={onSelectProfile.bind(this, "juridica", c.id)} />
            ))}
            <Spacer variant="top" size={3} />
          </CompanyList>
        )}
        <Spacer variant="vertical" size={2}>
          <AddCompanyList>
            {Array.from({ length: 3 - companyProfiles.length }).map((_, index) => (
              <AddCompany key={index} onAdd={onAddProfile} />
            ))}
          </AddCompanyList>
        </Spacer>
        {companyProfiles.length < 3 && (
          <Link onPress={onAddProfile}>
            <Text variant="bold">Agregar perfil empresa</Text>
          </Link>
        )}
      </CompanyProfileView>
    </SafeArea>
  );
};
