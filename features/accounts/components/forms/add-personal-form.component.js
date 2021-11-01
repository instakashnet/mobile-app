import React, { useState } from "react";
import { useFormik } from "formik";
import { Image } from "react-native";

// COMPONENTS
import { IconSelect } from "../../../../components/forms/icon-select.component";
import { Checkbox } from "../../../../components/forms/checkbox.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Select } from "../../../../components/forms/select.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";
import { BankIcon } from "../accounts.styles";

export const AddPersonalForm = ({ currencies, currencyId, onAddAccount, isProcessing, banks }) => {
  const [selectedBank, setSelectedBank] = useState(false);

  // FORMIK
  const formik = useFormik({
    initialValues: { bankId: "", currencyId: "", account_number: "", cci: "", acc_type: "", alias: "", interbank: false },
    onSubmit: (values) => onAddAccount(values),
  });

  // SELECT OPTIONS
  const banksOptions = banks.map((bank) => ({
      label: bank.name.toUpperCase(),
      value: bank.id,
      icon: () => <BankIcon bankName={bank.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri} />,
    })),
    currencyOptions = currencies
      .filter((c) => (currencyId ? c.id === currencyId : true))
      .map((currency) => ({
        label: `${currency.Symbol} ${currency.name}`,
        value: currency.id,
      }));
  const accounTypeOptions = [
    { label: "Corriente", value: "checking" },
    { label: "Ahorros", value: "savings" },
  ];

  // HANDLERS
  const onSelect = (name, value) => {
    formik.setFieldValue(name, value);
    if (name === "bankId" && value) {
      let bank = banks.find((b) => b.id === value);
      setSelectedBank(bank);
    }
  };

  return (
    <>
      <IconSelect name="bankId" options={banksOptions} value={formik.values.bankId} onSelect={onSelect} placeholder="Banco" />
      <Input
        name="account_number"
        label="Nro. de cuenta"
        value={formik.values.account_number}
        onChange={formik.handleChange("account_number")}
        onBlur={formik.handleBlur("account_number")}
        infoText="Debe ser entre 13 y 14 caracteres."
      />
      <Select name="acc_type" label="Tipo de cuenta" value={formik.values.acc_type} onChange={onSelect} options={accounTypeOptions} />
      <Select name="currencyId" label="Moneda" value={formik.values.currencyId} onChange={onSelect} options={currencyOptions} />
      <Input
        name="alias"
        label="Alias de la cuenta"
        value={formik.values.alias}
        onChange={formik.handleChange("alias")}
        onBlur={formik.handleBlur("alias")}
        infoText="Ej. nombre + banco + moneda."
      />
      {selectedBank && selectedBank.name.toLowerCase() === "interbank" && (
        <Spacer variant="left">
          <Checkbox status={formik.values.interbank} onPress={() => formik.setFieldValue("interbank", !formik.values.interbank)}>
            <Text variant="caption">¿Esta es una cuenta de provincia?.</Text>
          </Checkbox>
        </Spacer>
      )}
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Agregar cuenta
      </Button>
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
