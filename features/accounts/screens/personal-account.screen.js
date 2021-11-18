import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getBanks, getCurrencies, addAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { AddPersonalForm } from "../components/forms/add-personal-form.component";
import { AccountsWrapper } from "../components/accounts.styles";
import { Loader } from "../../../components/UI/loader.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";

export const AddPersonalAccountScreen = ({ route }) => {
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
  const onAddAccount = (values) => dispatch(addAccount(values, "personal"));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardView>
        <DismissKeyboard>
          <AccountsWrapper>
            <Text>Agrega una cuenta donde recibirás tu cambio.</Text>
            <Spacer variant="top" />

            <AddPersonalForm banks={banks} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} currencies={currencies} />
          </AccountsWrapper>
        </DismissKeyboard>
      </KeyboardView>
      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
