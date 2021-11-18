import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getBanks, getCurrencies, addAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";
import { Loader } from "../../../components/UI/loader.component";
import { AddThirdForm } from "../components/forms/add-third-form.component";
import { Alert } from "../../../components/UI/alert.component";
import { AccountsScroll } from "../components/accounts.styles";

export const AddThirdAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isLoading, isProcessing, accountsError } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getBanks());
      dispatch(getCurrencies());
    }, [dispatch])
  );

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values, "third"));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardView offset={Dimensions.get("screen").height / 6}>
        <AccountsScroll>
          <Text>Agrega la cuenta de un tercero para recibir tu cambio. Recuerda que debes tener pleno consentimiento del tercero para usar sus datos.</Text>
          <AddThirdForm banks={banks} currencies={currencies} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} />
        </AccountsScroll>
      </KeyboardView>
      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
