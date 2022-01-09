import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { CouponWrapper, CouponText } from "../calculator.styles";

export const CouponApplied = ({ coupon, onRemove }) => {
  return (
    <>
      <Text variant="title" style={{ textAlign: "center" }}>
        !Se ha aplicado el cupón!
      </Text>
      <Spacer variant="top" />
      <CouponWrapper>
        <CouponText>{coupon.name}</CouponText>
        {!coupon.name.includes("REFERIDO") && (
          <TouchableOpacity onPress={onRemove}>
            <Ionicons name="close-sharp" size={30} color="#0D8284" />
          </TouchableOpacity>
        )}
      </CouponWrapper>
      <Spacer variant="top" />
      {coupon.name.includes("REFERIDO") && <Text variant="button">Solo válido para tu primer cambio.</Text>}
    </>
  );
};
