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
        <CompanyIcon width={45} />
      </CompanyBox>
      <Text variant="bold" numberOfLines={1}>
        {companyName}
      </Text>
    </CompanyWrapper>
  );
};
