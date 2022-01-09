import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Text } from "../../../components/typography/text.component";

export const ProfileInfoWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.space[4]};
  padding-horizontal: ${({ theme }) => theme.space[3]};
  width: ${Dimensions.get("window").width}px;
  max-width: 400px;
`;

export const ProfileSection = styled.View`
  flex: 1;
  width: ${Dimensions.get("window").width}px;
  padding-horizontal: ${({ theme }) => theme.space[4]};
  margin-vertical: ${({ theme }) => theme.space[4]};
  align-items: center;
  justify-content: center;
  min-height: 55%;
`;

export const ProfileScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingBottom: 30,
  },
})``;

export const CompletedWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${Dimensions.get("window").width}px;
  padding: ${({ theme }) => theme.space[1]};
`;

export const CompletedInfo = styled.View`
  margin-horizontal: ${({ theme }) => theme.space[2]};
`;

export const CompletedText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.button};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ color }) => color};
`;

export const CompletedItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[1]};
`;

export const CoverBackground = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brand.primary, theme.colors.brand.tertiary],
}))`
  min-height: 45%;
  align-items: center;
  justify-content: center;
  width: ${Dimensions.get("window").width}px;
  padding-horizontal: ${({ theme }) => theme.space[4]};
`;

export const InfoWrapper = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [theme.colors.brand.primary, theme.colors.brand.tertiary],
}))`
  padding: ${({ theme }) => theme.space[3]};
  min-height: 32%;
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

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 40px;
`;

export const WhiteTitle = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.title};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: 40px;
  margin-vertical: ${({ theme }) => theme.space[1]};
`;

export const SubTitle = styled.Text.attrs({
  allowFontScaling: false,
})`
  font-family: ${({ theme }) => theme.fonts.button};
  font-size: ${({ theme }) => theme.fontSizes.title};
  color: #fff;
`;

export const DocumentsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.space[1]};
  width: 100%;
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
  width: 100%;
  margin-top: ${({ theme }) => theme.space[5]};
  align-items: center;
  justify-content: center;
`;

export const GooglePlacesInput = styled(GooglePlacesAutocomplete).attrs(({ theme }) => ({
  styles: {
    container: {
      flex: 0,
      marginTop: 10,
      elevation: 3,
      width: "100%",
    },
    textInput: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.colors.ui.border,
      fontSize: 16,
      height: 50,
    },
  },
}))``;
