import React, { useState } from "react";

// FORMIK
import { useFormik } from "formik";
import { addAccountSchema } from "../../validations/schemas";

// COMPONENTS
import { Checkbox } from "../../../../components/forms/checkbox.component";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Select } from "../../../../components/forms/select.component";
import { IconSelect } from "../../../../components/forms/icon-select.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";

// STYLED COMPONENTS
import { BankIcon } from "../accounts.styles";

export const AddPersonalForm = ({ currencies, currencyId, onAddAccount, isProcessing, banks }) => {
  const [selectedBank, setSelectedBank] = useState(false);

  // FORMIK
  const formik = useFormik({
      initialValues: { bankId: "", isDirect: true, currencyId: "", account_number: "", cci: "", acc_type: "", alias: "", interbank: false, accept: false },
      validationSchema: addAccountSchema,
      onSubmit: (values) => onAddAccount(values),
    }),
    { isDirect } = formik.values;

  // SELECT OPTIONS
  const banksOptions = banks.map((bank) => ({
      label: bank.name.toUpperCase(),
      value: bank.id,
      icon: () => (
        <BankIcon
          bankName={bank.name.toLowerCase()}
          defaultSource={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri}
          source={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri}
        />
      ),
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
  const onSelect = async (name, value) => {
    await formik.setFieldValue(name, value);
    if (name === "bankId" && value) {
      let bank = banks.find((b) => b.id === value);
      formik.setFieldValue("isDirect", bank.active);
      setSelectedBank(bank);
    } else formik.setFieldTouched(name, true);
  };

  return (
    <>
      <IconSelect
        name="bankId"
        label="Banco"
        error={formik.touched.bankId && formik.errors.bankId}
        value={formik.values.bankId}
        onChange={onSelect}
        options={banksOptions}
        hasIcon
      />
      {isDirect ? (
        <Input
          name="account_number"
          label="Nro. de cuenta"
          value={formik.values.account_number}
          onChange={formik.handleChange("account_number")}
          onBlur={formik.handleBlur("account_number")}
          error={formik.touched.account_number && formik.errors.account_number}
          infoText="Debe ser entre 13 y 14 caracteres."
        />
      ) : (
        <Input
          name="cci"
          label="Nro. de cuenta interbancario"
          value={formik.values.cci}
          onChange={formik.handleChange("cci")}
          error={formik.touched.cci && formik.errors.cci}
          onBlur={formik.handleBlur("cci")}
          infoText="Debe ser de 20 caracteres."
        />
      )}

      <Select
        name="acc_type"
        label="Tipo de cuenta"
        error={formik.touched.acc_type && formik.errors.acc_type}
        value={formik.values.acc_type}
        onChange={onSelect}
        options={accounTypeOptions}
      />
      <Select
        name="currencyId"
        error={formik.touched.currencyId && formik.errors.currencyId}
        label="Moneda"
        value={formik.values.currencyId}
        onChange={onSelect}
        options={currencyOptions}
      />
      <Input
        name="alias"
        label="Alias de la cuenta"
        value={formik.values.alias}
        onChange={formik.handleChange("alias")}
        error={formik.touched.alias && formik.errors.alias}
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
      <Spacer variant="top" />
      <Checkbox status={formik.values.accept} onPress={() => formik.setFieldValue("accept", !formik.values.accept)}>
        <Text variant="caption">Declaro que toda la información colocada es correcta, actual y asumo total responsabilidad de su veracidad.</Text>
      </Checkbox>
      <Spacer variant="top" />
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
