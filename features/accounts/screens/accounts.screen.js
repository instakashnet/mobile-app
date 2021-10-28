import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAccounts } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/UI/button.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { AccountItem } from "../components/account-item.component";
import { Loader } from "../../../components/UI/loader.component";
import { AccountsWrapper } from "../components/accounts.styles";

export const AccountsScreen = () => {
  const dispatch = useDispatch(),
    { accounts, isLoading } = useSelector((state) => state.accountsReducer);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getAccounts("users"));
    }, [dispatch])
  );

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <AccountsWrapper>
        <Text>Las cuentas que agregues deberán ser tuyas o de tu empresa. Puedes tener hasta 20 cuentas agregadas, 10 cuentas en soles y 10 en dólares.</Text>
        <Spacer variant="top" />
        <Button>Agregar cuenta</Button>
        <FlatList data={accounts} renderItem={({ item }) => <AccountItem account={item} />} />
      </AccountsWrapper>
    </SafeArea>
  );
};
