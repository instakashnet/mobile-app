import React from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { addAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";
import { AddThirdForm } from "../components/forms/add-third-form.component";
import { Alert } from "../../../components/UI/alert.component";

// STYLED COMPONENTS
import { AccountsWrapper } from "../components/accounts.styles";

export const AddThirdAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isProcessing, accountsError } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values, "third"));

  return (
    <SafeArea>
      <KeyboardScrollAware>
        <AccountsWrapper>
          <Text>Agrega la cuenta de un tercero para recibir tu cambio. Recuerda que debes tener pleno consentimiento del tercero para usar sus datos.</Text>
          <AddThirdForm banks={banks} currencies={currencies} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} />
        </AccountsWrapper>
      </KeyboardScrollAware>
      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
