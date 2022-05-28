import React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { CouponIcon } from "../../../../assets/icons/coupon";
import { Text } from "../../../../components/typography/text.component";
import { CouponButton, CouponInput, CouponInputWrapper } from "../calculator.styles";

export const InputCoupon = ({ couponName, setCouponName, onAddCoupon }) => {
  return (
    <>
      <CouponInputWrapper>
        <CouponInput
          left={<TextInput.Icon style={{ top: 5 }} name={() => <CouponIcon />} />}
          autoCorrect={false}
          autoComplete="off"
          value={couponName}
          label="Agrega tu cupón aquí"
          onChangeText={setCouponName}
        />
        <CouponButton onPress={() => onAddCoupon(couponName)} disabled={!couponName}>
          <Text variant="button" style={{ color: !couponName ? "#676767" : "#0D8284" }}>
            Agregar
          </Text>
        </CouponButton>
      </CouponInputWrapper>
      <HelperText visible>Al agregar uno de nuestros cupones obtendrás una mejor tasa.</HelperText>
    </>
  );
};
