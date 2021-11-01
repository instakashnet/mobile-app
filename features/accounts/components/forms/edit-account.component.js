import React from "react";

// FORMIK
import { useFormik } from "formik";

// COMPONENTS
import { Input } from "../../../../components/forms/input.component";
import { Select } from "../../../../components/forms/select.component";
import { Button } from "../../../../components/UI/button.component";

export const EditAccount = ({ currencies, isProcessing, account, onEdit }) => {
  const formik = useFormik({
    initialValues: { account_number: account.accountNumber, acc_type: account.accType, currencyId: account.currency.id, alias: account.alias },
    enableReinitialize: true,
    onSubmit: (values) => onEdit(values, account.id),
  });

  // HANDLERS
  const onSelect = (name, value) => formik.setFieldValue(name, value);

  // OPTIONS
  const accounTypeOptions = [
      { label: "Corriente", value: "checking" },
      { label: "Ahorros", value: "savings" },
    ],
    currencyOptions = currencies.map((currency) => ({
      label: `${currency.Symbol} ${currency.name}`,
      value: currency.id,
    }));

  return (
    <>
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
      <Button onPress={formik.handleSubmit} loading={isProcessing} disabled={!formik.isValid || isProcessing}>
        Editar cuenta
      </Button>
    </>
  );
};
