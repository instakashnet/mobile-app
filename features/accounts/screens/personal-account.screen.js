import React from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
// COMPONENTS
import { Text } from '../../../components/typography/text.component';
import { Alert } from '../../../components/UI/alert.component';
import { KeyboardScrollAware } from '../../../components/utils/keyboard-scroll.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Spacer } from '../../../components/utils/spacer.component';
import { addAccount, clearAccountsError } from '../../../store/actions';
// STYLED COMPONENTS
import { AccountsWrapper } from '../components/accounts.styles';
import { AddPersonalForm } from '../components/forms/add-personal-form.component';

export const AddPersonalAccountScreen = () => {
  const dispatch = useDispatch(),
    { banks, currencies, isProcessing, accountsError } = useSelector((state) => state.accountsReducer);

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values, 'personal'));

  return (
    <SafeArea>
      <KeyboardScrollAware>
        <AccountsWrapper>
          <Text>Agrega una cuenta donde recibirás tu cambio.</Text>
          <Spacer variant='top' />
          <AddPersonalForm banks={banks} isProcessing={isProcessing} onAddAccount={onAddAccount} currencies={currencies} />
        </AccountsWrapper>
      </KeyboardScrollAware>
      <Alert type='error' onClose={clearAccountsError} visible={!!accountsError}>
        {accountsError}
      </Alert>
    </SafeArea>
  );
};
