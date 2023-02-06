import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { storeData } from '../../../hooks/use-storage.hook';

// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../../store/actions';

// COMPONENTS
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/utils/spacer.component';
import { Button } from '../../../components/UI/button.component';
import { Loader } from '../../../components/UI/loader.component';
// import { BanksList } from '../components/accounts/banks-list.component';
import { AccountsList } from '../components/accounts/accounts-list.component';
import { AddAccountButton } from '../components/accounts/add-account-button.component';

// STYLED COMPONENTS
import { ExchangeWrapper } from '../components/exchange.styles';

export const AccountSelectScreen = ({ route, navigation }) => {
  const dispatch = useDispatch(),
    { type, currencyToReceive } = route.params,
    { isLoading } = useSelector((state) => state.accountsReducer),
    accountsTo = useSelector((state) => state.accountsReducer.accounts.filter((acc) => acc.currency.id === currencyToReceive)),
    accountsFrom = useSelector((state) => state.accountsReducer.accounts.filter((acc) => acc.currency.id !== currencyToReceive)),
    [accFromSelected, setAccFrom] = useState(null),
    [accToSelected, setAccTo] = useState(null);

  // EFFECT
  useFocusEffect(
    useCallback(() => {
      dispatch(getAccounts('orders'));
    }, [dispatch, type]),
  );

  // HANDLERS
  const handleSelectAccFrom = (acc) => setAccFrom(acc);
  const handleSelectAccTo = (acc) => setAccTo(acc);
  const onConfirm = async () => {
    try {
      type === 'accFrom' ? await storeData('@selectedFromAcc', accFromSelected) : await storeData('@selectedToAcc', accToSelected);
      navigation.navigate('Accounts');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <ExchangeWrapper>
        <Text variant='title'>{type === 'accFrom' ? 'Selecciona cuenta de origen' : 'Selecciona cuenta de destino'}</Text>
        <Text>Debes seleccionar {type === 'accFrom' ? 'la cuenta donde enviarás los fondos' : 'la cuenta donde recibirás'}</Text>
        <Spacer variant='top' />
        {type === 'accFrom' ? (
          <AccountsList accounts={accountsFrom} accountSelected={accFromSelected} onSelect={handleSelectAccFrom} />
        ) : (
          <AccountsList accounts={accountsTo} accountSelected={accToSelected} onSelect={handleSelectAccTo} />
        )}
        <AddAccountButton onPress={() => navigation.navigate('AddAccount')} />
        <Button onPress={onConfirm} disabled={(type === 'accFrom' && !accFromSelected) || (type === 'accTo' && !accToSelected)}>
          Confirmar
        </Button>
      </ExchangeWrapper>
    </SafeArea>
  );
};
