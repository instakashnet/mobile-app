import React from "react";

// FORMIK
import { useFormik } from "formik";
import { transferCodeSchema } from "../../validations/schemas";

// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { SnackBar } from "../../../../components/UI/snack.component";
import { Input } from "../../../../components/forms/input.component";
import { Button } from "../../../../components/UI/button.component";
import { CopyButton } from "../../../../components/UI/copy-button.component";

// STYLED COMPONENTS
import { ShadowCard, TransferCard, Info } from "../transfer-code.styles";

export const TransferCodeForm = ({ isProcessing, onCancel, direct, onSubmit }) => {
  // FORMIK
  const formik = useFormik({ initialValues: { transaction_code: "", direct }, enableReinitialize: true, validationSchema: transferCodeSchema, onSubmit });

  return (
    <>
      {direct ? (
        <>
          <Text>
            Una vez realizado coloque el <Text variant="bold">número de operación emitido por su banco</Text> dentro del casillero mostrado debajo y debe darle al botón de
            "completar cambio".
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
