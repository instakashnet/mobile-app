import React from "react";

// ASSETS
import { CompanyIcon } from "../../../assets/icons/company";

// COMPONENTS
import { CompanyBox, CompanyWrapper } from "./select-profile.styles";
import { Text } from "../../../components/typography/text.component";

export const CompanyProfile = ({ onSelect, companyName }) => {
  return (
    <CompanyWrapper>
      <CompanyBox onPress={onSelect}>
        <CompanyIcon />
      </CompanyBox>
      <Text variant="caption">
        <Text variant="bold">{companyName.length > 20 ? companyName.substring(0, 15) + "..." : companyName}</Text>
      </Text>
    </CompanyWrapper>
  );
};
