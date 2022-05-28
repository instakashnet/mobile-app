import React from "react";

// ASSETS
import { Add } from "../../../assets/icons/add";

// COMPONENTS
import { AddCompanyBox } from "./select-profile.styles";

export const AddCompany = ({ onAdd }) => {
  return (
    <AddCompanyBox onPress={onAdd}>
      <Add />
    </AddCompanyBox>
  );
};
