import React from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { addAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AddPersonalForm } from "../components/forms/add-personal-form.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Alert } from "../../../components/UI/alert.component";

export const AddPersonalAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isProcessing, accountsError } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values, "personal"));

  return (
    <SafeArea>
      <KeyboardScrollAware>
        <Text>Agrega una cuenta donde recibirás tu cambio.</Text>
        <Spacer variant="top" />
        <AddPersonalForm banks={banks} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} currencies={currencies} />
      </KeyboardScrollAware>
      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
