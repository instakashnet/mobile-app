import React from "react";
import { useFormik } from "formik";
import { Image } from "react-native";

// COMPONENTS
import { IconSelect } from "../../../../components/forms/icon-select.component";
import { Button } from "../../../../components/UI/button.component";

export const AddPersonalForm = ({ currencies, banks }) => {
  const formik = useFormik({ initialValues: {}, onSubmit: (values) => console.log(values) });

  const banksOptions = banks.map((bank) => ({
    label: bank.name.toUpperCase(),
    value: bank.id,
    icon: () => <Image source={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri} />,
  }));

  return (
    <>
      <IconSelect options={banksOptions} placeholder="Selecciona un banco" />
      <Button>Agregar cuenta</Button>
    </>
  );
};

export const bankIcons = [
  {
    bankName: "bcp",
    uri: require("../../../../assets/banks/bcp-icon.png"),
  },
  {
    bankName: "interbank",
    uri: require("../../../../assets/banks/interbank-icon.png"),
  },
  {
    bankName: "bbva",
    uri: require("../../../../assets/banks/bbva-icon.png"),
  },
  {
    bankName: "scotiabank",
    uri: require("../../../../assets/banks/scotiabank-icon.png"),
  },
];
