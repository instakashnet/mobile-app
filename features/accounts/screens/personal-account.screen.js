import React from "react";
import { Dimensions } from "react-native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { addAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardView } from "../../../components/utils/keyboard-view.component";
import { DismissKeyboard } from "../../../components/utils/dismiss-keyobard.component";
import { AddPersonalForm } from "../components/forms/add-personal-form.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";

// STYLED COMPONENTS
import { AccountsScroll } from "../components/accounts.styles";

export const AddPersonalAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isProcessing, accountsError } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values, "personal"));

  return (
    <SafeArea>
      <KeyboardView offset={Dimensions.get("screen").height / 6}>
        <DismissKeyboard>
          <AccountsScroll>
            <Text>Agrega una cuenta donde recibirás tu cambio.</Text>
            <Spacer variant="top" />

            <AddPersonalForm banks={banks} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} currencies={currencies} />
          </AccountsScroll>
        </DismissKeyboard>
      </KeyboardView>
      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
