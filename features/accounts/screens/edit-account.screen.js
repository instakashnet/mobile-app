import React from "react";

// REDUx
import { useSelector, useDispatch } from "react-redux";
import { editAccount, clearAccountsError } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { EditAccount } from "../components/forms/edit-account.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Loader } from "../../../components/UI/loader.component";
import { Alert } from "../../../components/UI/alert.component";
import { KeyboardScrollAware } from "../../../components/utils/keyboard-scroll.component";

// STYLED COMPONENTS
import { AccountsWrapper } from "../components/accounts.styles";

export const EditAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { account } = route.params,
    { isProcessing, isLoading, currencies, accountsError } = useSelector((state) => state.accountsReducer);

  // HANDLERS
  const onEdit = (values, accId) => dispatch(editAccount(values, accId));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <KeyboardScrollAware>
        <AccountsWrapper>
          <Text>Edita los datos de cuenta bancaria.</Text>
          <Spacer variant="top" />
          <EditAccount currencies={currencies} isProcessing={isProcessing} account={account} onEdit={onEdit} />
        </AccountsWrapper>
      </KeyboardScrollAware>

      <Alert type="error" onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
