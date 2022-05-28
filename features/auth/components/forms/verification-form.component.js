import React, { useRef } from "react";
import { useFormik } from "formik";

// COMPONENTS
import { OtpWrapper } from "../auth.styles";
import { OtpInput } from "../../../../components/forms/otp-input.component";
import { Text } from "../../../../components/typography/text.component";
import { Link } from "../../../../components/typography/link.component";
import { Button } from "../../../../components/UI/button.component";
import { Spacer } from "../../../../components/utils/spacer.component";

export const VerificationForm = ({ onSubmit, isProcessing, onRefreshCode }) => {
  // REF
  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);
  const otpRef4 = useRef(null);

  // FORMIK
  const formik = useFormik({ initialValues: { otp1: "", otp2: "", otp3: "", otp4: "" }, onSubmit });

  // HANDLERS

  // HANDLERS
  const refCallback = (ref, textInputRef) => {
    textInputRef.current = ref;
  };

  const focusPrevious = (key, index) => {
    if (key === "Backspace" && index !== 0) {
      if (index === 1 && !formik.values.otp3) otpRef1.current.focus();
      if (index === 2 && !formik.values.otp4) otpRef2.current.focus();
      if (index === 3) otpRef3.current.focus();
    }
  };

  const onChange = (index, value) => {
    formik.setFieldValue(`otp${index + 1}`, value);

    if (value !== "") {
      if (index === 0) otpRef2.current.focus();
      if (index === 1) otpRef3.current.focus();
      if (index === 2) otpRef4.current.focus();
    }
  };

  return (
    <>
      <OtpWrapper>
        {[otpRef1, otpRef2, otpRef3, otpRef4].map((textInputRef, i) => (
          <OtpInput
            value={formik.values[`otp${i + 1}`]}
            refCallback={(ref) => refCallback(ref, textInputRef)}
            onCode={(value) => onChange(i, value)}
            onKeyPress={(e) => focusPrevious(e.nativeEvent.key, i)}
            key={i}
            autoFocus={i === 0 || false}
            selectionColor={formik.values[`otp${i + 1}`] ? "white" : "blue"}
          />
        ))}
      </OtpWrapper>
      <Text variant="caption">¿No lo recibiste?</Text>

      <Link onPress={onRefreshCode}>
        <Text variant="bold" style={{ textTransform: "uppercase" }}>
          Reenviar código
        </Text>
      </Link>
      <Spacer variant="top" size={4} />
      <Button variant="primary" disabled={!formik.isValid || isProcessing} loading={isProcessing} onPress={formik.handleSubmit}>
        {isProcessing ? "Validando..." : "Validar correo"}
      </Button>
    </>
  );
};
