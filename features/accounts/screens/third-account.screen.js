import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getBanks, getCurrencies, addAccount } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Loader } from "../../../components/UI/loader.component";
import { AccountsWrapper } from "../components/accounts.styles";

export const AddThirdAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isLoading, isProcessing } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getBanks());
      dispatch(getCurrencies());
    }, [dispatch])
  );

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <AccountsWrapper>
        <Text>Agrega la cuenta de un tercero para recibir tu cambio. Recuerda que debes tener pleno consentimiento del tercero para usar sus datos.</Text>
      </AccountsWrapper>
    </SafeArea>
  );
};
