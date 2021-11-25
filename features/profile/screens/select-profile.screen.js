import React, { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProfiles, selectProfile } from "../../../store/actions";

// ASSETS
import { Male } from "../../../assets/icons/male";

// COMPONENTS
import { CompanyProfile } from "../components/company-profile.component";
import { AddCompany } from "../components/add-company.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Loader } from "../../../components/UI/loader.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Link } from "../../../components/typography/link.component";

// STYLED COMPONENTS
import { AddCompanyList, CompanyList } from "../components/select-profile.styles";
import { CoverBackground, ProfileWrapper, ProfileScroll, SubTitle, Info } from "../components/profile.styles";

export const SelectProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // STORE SELECTORS
  const user = useSelector((state) => state.authReducer.user);
  const { isLoading } = useSelector((state) => state.profileReducer);
  const userProfile = useSelector((state) => state.profileReducer.profiles.find((p) => p.type === "natural"));
  const companyProfiles = useSelector((state) => state.profileReducer.profiles.filter((p) => p.type === "juridica"));

  // HANDLERS
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
  useFocusEffect(
    useCallback(() => {
      dispatch(getProfiles());
    }, [])
  );

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ProfileScroll>
        <CoverBackground>
          <Male width={90} />
          <Spacer variant="top" />
          <SubTitle>¿Como deseas cambiar?</SubTitle>
          <Spacer variant="top" />
          <Info>Selecciona tu perfil para hacer el cambio.</Info>
          <Spacer variant="top" />
          <Link style={{ borderBottomColor: "#FFF" }} onPress={onSelectProfile.bind(this, "natural")}>
            <Text variant="bold" style={{ color: "#FFF" }}>
              Continuar como {user.name}
            </Text>
          </Link>
        </CoverBackground>
        <ProfileWrapper>
          <Text variant="subtitle">Usar un perfil de empresa</Text>
          {companyProfiles.length > 0 && (
            <CompanyList>
              {companyProfiles.map((c) => (
                <CompanyProfile key={c.id} companyName={c.razon_social} onSelect={onSelectProfile.bind(this, "juridica", c.id)} />
              ))}
              <Spacer variant="top" size={3} />
            </CompanyList>
          )}
          <Spacer variant="top" size={3} />
          <AddCompanyList>
            {Array.from({ length: 3 - companyProfiles.length }).map((_, index) => (
              <AddCompany key={index} onAdd={onAddProfile} />
            ))}
          </AddCompanyList>
          <Spacer variant="top" />
          {companyProfiles.length < 3 && (
            <Link onPress={onAddProfile}>
              <Text variant="bold">Agregar perfil empresa</Text>
            </Link>
          )}
        </ProfileWrapper>
      </ProfileScroll>
    </SafeArea>
  );
};
