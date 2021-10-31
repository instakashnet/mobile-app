import React from "react";

// ASSETS
import { Coin3d } from "../../../assets/illustrations/coin-3d";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { EmptyWrapper } from "./activity.styles";

export const EmptyActivity = () => {
  return (
    <EmptyWrapper>
      <Coin3d />
      <Spacer variant="top" size={2} />
      <Text variant="title">Realiza tu primera operación</Text>
      <Text>Aún no has realizado ningún cambio. Para poder operar debes primero agregar Kash a tu cuenta</Text>
      <Spacer variant="top" size={4} />
      <Button>Hacer un cambio</Button>
    </EmptyWrapper>
  );
};
