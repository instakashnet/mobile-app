// FORMIK
import { useFormik } from "formik";
import React from "react";
import { Input } from "../../../../components/forms/input.component";
// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Button } from "../../../../components/UI/button.component";
import { CopyButton } from "../../../../components/UI/copy-button.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { transferCodeSchema } from "../../validations/schemas";
// STYLED COMPONENTS
import { Info, ShadowCard, TransferCard } from "../transfer-code.styles";

export const TransferCodeForm = ({ isProcessing, onCancel, direct, onSubmit }) => {
  // FORMIK
  const formik = useFormik({ initialValues: { transaction_code: "", direct }, enableReinitialize: true, validationSchema: transferCodeSchema, onSubmit });

  return (
    <>
      {direct ? (
        <>
          <Text>
            <Text variant="bold">Copia el número de operación</Text> generado por tu banco en tu voucher, colocalo en el casillero debajo y completa tu operación.
          </Text>
          <Input
            name="transaction_code"
            label="Nro. de operación"
            value={formik.values.transaction_code}
            error={formik.touched.transaction_code && formik.errors.transaction_code}
            onChange={formik.handleChange("transaction_code")}
            onBlur={formik.handleBlur("transaction_code")}
          />
        </>
      ) : (
        <>
          <Text>
            Ahora deberás enviarnos la constancia de tu transferencia a nuestro correo <Text variant="bold">desde la APP de tu banco.</Text>
          </Text>
          <Spacer variant="top" />
          <ShadowCard>
            <TransferCard>
              <Info>pagos@instakash.net</Info>
              <CopyButton text="pagos@instakash.net" />
            </TransferCard>
          </ShadowCard>
          <Spacer variant="top" />
        </>
      )}
      <Button onPress={formik.handleSubmit} disabled={!formik.isValid || isProcessing} loading={isProcessing}>
        Completar cambio
      </Button>
      <Button variant="secondary" onPress={onCancel}>
        Regresar
      </Button>
    </>
  );
};
