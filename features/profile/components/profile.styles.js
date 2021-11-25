import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const ProfileWrapper = styled.View`
  min-height: 50%;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.space[5]};
  padding-horizontal: ${({ theme }) => theme.space[4]};
  width: ${Dimensions.get("window").width}px;
`;

export const ProfileScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingBottom: 65,
  },
})``;

export const NoCameraWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
`;

export const CoverBackground = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brand.primary, theme.colors.brand.tertiary],
}))`
  min-height: 50%;
  align-items: center;
  justify-content: center;
  width: ${Dimensions.get("window").width}px;
  padding-horizontal: ${({ theme }) => theme.space[4]};
`;

export const InfoWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[3]};
  flex: 0.55;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderProfile = styled.View`
  padding-vertical: ${({ theme }) => theme.space[4]};
  padding-horizontal: ${({ theme }) => theme.space[6]};
  min-height: 100px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.primary};
  width: 100%;
`;

export const Title = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.title};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 40px;
  margin-vertical: ${({ theme }) => theme.space[3]};
`;

export const SubTitle = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.button};
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: #fff;
`;

export const Info = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-align: center;
  color: #fff;
`;

export const ListWrapper = styled.View`
  align-items: flex-start;
`;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.space[1]};
`;

export const NavItem = styled(TouchableRipple)`
  background-color: #fff;
  border-color: ${({ theme }) => theme.colors.text.inactive};
  border-bottom-width: 1px;
  padding: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const InfoItem = styled.View`
  background-color: #fff;
  border-color: ${({ theme }) => theme.colors.text.inactive};
  border-bottom-width: 1px;
  padding: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RightArrow = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 18,
  color: theme.colors.brand.primary,
  name: "arrow-forward-ios",
}))``;

export const Check = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 25,
  color: theme.colors.brand.primary,
  name: "check",
}))``;

export const FormWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.space[6]};
  width: 100%;
  margin-top: ${({ theme }) => theme.space[6]};
`;

export const GooglePlacesInput = styled(GooglePlacesAutocomplete).attrs(({ theme }) => ({
  styles: {
    container: {
      flex: 0,
      marginTop: 10,
      zIndex: 10,
      elevation: 3,
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.ui.border,
      fontSize: 14,
    },
    listView: {
      position: "absolute",
      zIndex: 10,
      elevation: 3,
      top: 47,
      borderRadius: 5,
    },
  },
  textInputProps: {
    placeholderTextColor: theme.colors.text.body,
  },
}))``;
