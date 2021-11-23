import React, { useState } from "react";
import { View } from "react-native";

// FORMIK
import { useFormik } from "formik";
import { addTPAccountSchema } from "../../validations/schemas";

// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Radio } from "../../../../components/forms/radio.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";
import { Button } from "../../../../components/UI/button.component";
import { ThirdInfo } from "./third-info.component";
import { Checkbox } from "../../../../components/forms/checkbox.component";

// STYLED COMPONENTS
import { BankIcon, DocumentWrapper } from "../accounts.styles";

export const AddThirdForm = ({ banks, currencies, currencyId, onAddAccount, isProcessing }) => {
  const [selectedBank, setSelectedBank] = useState(null);

  // FORMIK
  const formik = useFormik({
      initialValues: {
        account_number: "",
        cci: "",
        isDirect: true,
        bankId: "",
        currencyId: "",
        alias: "",
        acc_type: "",
        isThird: true,
        thirdPartyAccType: "natural",
        documentType: "",
        documentIdentity: "",
        job: "",
        name: "",
        razonSocial: "",
        email: "",
        accept: false,
        accept2: false,
      },
      validationSchema: addTPAccountSchema,
      onSubmit: (values) => onAddAccount(values),
    }),
    { isDirect } = formik.values;

  // SELECT OPTIONS
  const banksOptions = banks.map((bank) => ({
      label: bank.name.toUpperCase(),
      value: bank.id,
      icon: () => <BankIcon bankName={bank.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === bank.name.toLowerCase()).uri} />,
    })),
    accounTypeOptions = [
      { label: "Corriente", value: "checking" },
      { label: "Ahorros", value: "savings" },
    ],
    currencyOptions = currencies
      .filter((c) => (currencyId ? c.id === currencyId : true))
      .map((currency) => ({
        label: `${currency.Symbol} ${currency.name}`,
        value: currency.id,
      }));

  // HANDLERS
  const onSelectChange = async (name, value) => {
      await formik.setFieldValue(name, value);
      formik.setFieldTouched(name, true);
      if (name === "bankId" && value) {
        let bank = banks.find((b) => b.id === value);
        formik.setFieldValue("isDirect", bank.active);
        setSelectedBank(bank);
      }
    },
    onTypePress = (value) => {
      formik.setFieldValue("thirdPartyAccType", value);
      if (value === "juridica") {
        formik.setFieldValue("documentType", "RUC");
      } else formik.setFieldValue("documentType", "");
    };

  return (
    <>
      <Spacer variant="top" size={4} />
      <Text variant="subtitle">¿A quien le pertenece esta cuenta?</Text>
      <DocumentWrapper>
        <Radio value={formik.values.thirdPartyAccType} onPress={() => onTypePress("natural")} status={formik.values.thirdPartyAccType === "natural" ? "checked" : "unchecked"}>
          <Text>Persona</Text>
        </Radio>
        <Radio value={formik.values.thirdPartyAccType} onPress={() => onTypePress("juridica")} status={formik.values.thirdPartyAccType === "juridica" ? "checked" : "unchecked"}>
          <Text>Empresa</Text>
        </Radio>
      </DocumentWrapper>
      <ThirdInfo onSelect={onSelectChange} formik={formik} />
      <Select
        name="bankId"
        options={banksOptions}
        value={formik.values.bankId}
        error={formik.touched.bankId && formik.errors.bankId}
        hasIcon
        onChange={onSelectChange}
        label="Banco"
      />
      {isDirect ? (
        <Input
          name="account_number"
          label="Nro. de cuenta"
          value={formik.values.account_number}
          error={formik.touched.account_number && formik.errors.account_number}
          onChange={formik.handleChange("account_number")}
          onBlur={formik.handleBlur("account_number")}
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
        error={formik.touched.acc_type && formik.errors.acc_type}
        label="Tipo de cuenta"
        value={formik.values.acc_type}
        onChange={onSelectChange}
        options={accounTypeOptions}
      />
      <Select
        name="currencyId"
        error={formik.touched.currencyId && formik.errors.currencyId}
        label="Moneda"
        value={formik.values.currencyId}
        onChange={onSelectChange}
        options={currencyOptions}
      />
      <Input
        name="alias"
        label="Alias de la cuenta"
        value={formik.values.alias}
        onChange={formik.handleChange("alias")}
        onBlur={formik.handleBlur("alias")}
        infoText="Ej. nombre + banco + moneda."
      />
      <Spacer variant="top" />
      {selectedBank && selectedBank.name.toLowerCase() === "interbank" && (
        <Checkbox status={formik.values.interbank} onPress={() => formik.setFieldValue("interbank", !formik.values.interbank)}>
          <Text variant="caption">¿Esta es una cuenta de provincia?.</Text>
        </Checkbox>
      )}
      <Spacer variant="top" />
      <Checkbox status={formik.values.accept} onPress={() => formik.setFieldValue("accept", !formik.values.accept)}>
        <Text variant="caption">Declaro que toda la información colocada es correcta, actual y asumo total responsabilidad de su veracidad.</Text>
      </Checkbox>
      <Spacer variant="top" />
      <Checkbox status={formik.values.accept2} onPress={() => formik.setFieldValue("accept2", !formik.values.accept2)}>
        <Text variant="caption">
          Declaro que cuento con el consentimiento para el uso de los datos de la persona y/o empresa acá expuesta, en conformidad con el tratamiento de los mismos en relación a
          sus políticas y privacidad.
        </Text>
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
