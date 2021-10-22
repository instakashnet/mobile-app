import React from "react";
import { useFormik } from "formik";

// COMPONENTS
import { Snack } from "../transfer-code.styles";
import { Spacer } from "../../../../components/utils/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";

export const TransferCodeForm = ({ isProcessing, onCancel, onSubmit }) => {
  // FORMIK
  const formik = useFormik({ initialValues: { transaction_code: "" }, onSubmit });

  return (
    <>
      <Input
        name="transaction_code"
        label="Nro. de operación"
        value={formik.values.transaction_code}
        onChange={formik.handleChange("transaction_code")}
        onBlur={formik.handleBlur("transaction_code")}
      />
      <Spacer variant="top" />
      <Snack visible>
        <Text variant="bold" style={{ color: "#FFF" }}>
          Solo dispones de 15 minutos para completar el cambio.
        </Text>
      </Snack>
      <Spacer variant="top" />
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Completar cambio
      </Button>
      <Button variant="secondary" onPress={onCancel}>
        Cancelar
      </Button>
    </>
  );
};
