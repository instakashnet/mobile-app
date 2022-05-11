import React from "react";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/utils/spacer.component";
import { BorderLine, Price, RatesWrapper } from "../exchange.styles";

export const Rates = ({ couponRates, rates }) => {
  return (
    <>
      {couponRates && (
        <RatesWrapper>
          <Text variant="caption" style={{ textDecorationLine: "line-through" }}>
            Antes: {rates.buy}
          </Text>
          <Spacer variant="left" size={6} />
          <Text variant="caption" style={{ textDecorationLine: "line-through" }}>
            Antes: {rates.sell}
          </Text>
        </RatesWrapper>
      )}
      <RatesWrapper>
        <Price>Compramos: {couponRates ? couponRates.buy : rates.buy}</Price>
        <BorderLine />
        <Price>Vendemos: {couponRates ? couponRates.sell : rates.sell}</Price>
      </RatesWrapper>
    </>
  );
};
