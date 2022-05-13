import React from "react";
import { TouchableOpacity } from "react-native";
import { HelperText } from "react-native-paper";
// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { CouponText, CouponWrapper } from "../calculator.styles";

export const CouponApplied = ({ coupon, onRemove }) => {
  return (
    <>
      <Spacer variant="top" />
      <CouponWrapper>
        <CouponText>{coupon.name}</CouponText>
        {!coupon.name.includes("REFERIDO") && (
          <TouchableOpacity onPress={onRemove}>
            <Text variant="button" style={{ color: "#0D8284" }}>
              Quitar
            </Text>
          </TouchableOpacity>
        )}
      </CouponWrapper>
      {coupon.name.includes("REFERIDO") ? (
        <Text variant="button">Solo válido para tu primer cambio.</Text>
      ) : (
        <HelperText visible>Si no deseas usar este cupón presiona "Quitar".</HelperText>
      )}
    </>
  );
};
