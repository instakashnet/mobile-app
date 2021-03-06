import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import _ from "lodash";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getAccounts } from "../../../store/actions";

// ASSETS
import { BankIcon } from "../../../assets/icons/bank";

// COMPONENTS
import { Button } from "../../../components/UI/button.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Loader } from "../../../components/UI/loader.component";
import { AccountsSection } from "../components/accounts-section.component";
import { Text } from "../../../components/typography/text.component";

// STYLED COMPONENTS
import { AccountsScroll, NoAccountsCard } from "../components/accounts.styles";

export const AccountsScreen = ({ navigation }) => {
  const dispatch = useDispatch(),
    { accounts, isLoading } = useSelector((state) => state.accountsReducer),
    groupedAccounts = _.map(_.groupBy(accounts, (account) => account.currency.id));

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getAccounts("users"));
    }, [dispatch])
  );

  // HANDLERS
  const onAddAccount = () => navigation.navigate("AddAccount");
  const onDetailsAccount = (account) => navigation.navigate("AccountDetails", { account });

  return (
    <SafeArea>
      {isLoading ? (
        <Loader />
      ) : (
        <AccountsScroll>
          {accounts.length ? (
            groupedAccounts.map((accounts, key) => <AccountsSection key={key} accounts={accounts} onDetails={onDetailsAccount} />)
          ) : (
            <NoAccountsCard>
              <BankIcon />
              <Spacer variant="top" size={2} />
              <Text style={{ textAlign: "center" }}>Debes agregar una cuenta para poder realizar tus cambios de divisa.</Text>
            </NoAccountsCard>
          )}
          <Spacer variant="top" />
          <Button onPress={onAddAccount}>Agregar cuenta</Button>
          <Spacer variant="top" />
        </AccountsScroll>
      )}
    </SafeArea>
  );
};
