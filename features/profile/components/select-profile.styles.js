import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const HeaderIconsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CompanyProfileView = styled.View`
  flex: 0.55;
  align-items: center;
  justify-content: center;
`;

export const CompanyWrapper = styled.View`
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.space[3]};
  max-width: 125px;
`;

export const CompanyBox = styled.TouchableOpacity`
  border-radius: 5px;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 11px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.colors.bg.primary};
  margin-top: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const AddCompanyBox = styled.TouchableOpacity`
  box-shadow: 5px 11px 20px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.bg.inactive};
  margin-vertical: ${({ theme }) => theme.space[2]};
  margin-horizontal: ${({ theme }) => theme.space[4]};
`;

export const CompanyList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AddCompanyList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddProfileForm = styled.View`
  width: ${Dimensions.get("window").width}px;
  padding-horizontal: ${({ theme }) => theme.space[5]};
  align-items: center;
`;

export const BorderLine = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.ui.border};
`;
