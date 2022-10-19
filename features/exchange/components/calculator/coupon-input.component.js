import React, { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";
import { CouponIcon } from "../../../../assets/icons/coupon";
import { Text } from "../../../../components/typography/text.component";
import { CouponButton, CouponInput, CouponInputWrapper } from "../calculator.styles";

export const InputCoupon = ({ onAddCoupon }) => {
  const [value, setValue] = useState("");

  const addCouponHandler = () => {
    onAddCoupon(value);
  };

  return (
    <>
      <CouponInputWrapper>
        <CouponInput
          left={<TextInput.Icon style={{ top: 5 }} name={() => <CouponIcon />} />}
          autoCorrect={false}
          autoComplete="off"
          value={value}
          label="Agrega tu cupón aquí"
          onChangeText={setValue}
        />
        <CouponButton onPress={addCouponHandler} disabled={!value}>
          <Text variant="button" style={{ color: !value ? "#676767" : "#0D8284" }}>
            Agregar
          </Text>
        </CouponButton>
      </CouponInputWrapper>
      <HelperText visible>Al agregar uno de nuestros cupones obtendrás una mejor tasa.</HelperText>
    </>
  );
};
