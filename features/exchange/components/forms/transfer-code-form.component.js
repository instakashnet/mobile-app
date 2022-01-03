import React from "react";

// FORMIK
import { useFormik } from "formik";
import { transferCodeSchema } from "../../validations/schemas";

// COMPONENTS
import { SnackBar } from "../../../../components/UI/snack.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";

export const TransferCodeForm = ({ isProcessing, onCancel, onSubmit }) => {
  // FORMIK
  const formik = useFormik({ initialValues: { transaction_code: "" }, validationSchema: transferCodeSchema, onSubmit });

  return (
    <>
      <Input
        name="transaction_code"
        label="Nro. de operación"
        value={formik.values.transaction_code}
        error={formik.touched.transaction_code && formik.errors.transaction_code}
        onChange={formik.handleChange("transaction_code")}
        onBlur={formik.handleBlur("transaction_code")}
      />
      <SnackBar type="info">Solo dispones de 15 minutos para completar el cambio.</SnackBar>
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Completar cambio
      </Button>
      <Button variant="secondary" onPress={onCancel}>
        Cancelar
      </Button>
    </>
  );
};
