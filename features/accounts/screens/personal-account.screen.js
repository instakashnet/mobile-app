import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getBanks, getCurrencies, addAccount } from "../../../store/actions";

// COMPONENTS
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { AddPersonalForm } from "../components/forms/add-personal-form.component";
import { AccountsWrapper } from "../components/accounts.styles";
import { Loader } from "../../../components/UI/loader.component";
import { Spacer } from "../../../components/utils/spacer.component";

export const AddPersonalAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { banks, currencies, isLoading, isProcessing } = useSelector((state) => state.accountsReducer),
    currencyId = route.params ? route.params.currencyId : null;

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getBanks());
      dispatch(getCurrencies());
    }, [dispatch])
  );

  // HANDLERS
  const onAddAccount = (values) => dispatch(addAccount(values));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <AccountsWrapper>
        <Text>Agrega una cuenta donde recibirás tu cambio.</Text>
        <Spacer variant="top" />
        <AddPersonalForm banks={banks} currencyId={currencyId} isProcessing={isProcessing} onAddAccount={onAddAccount} currencies={currencies} />
      </AccountsWrapper>
    </SafeArea>
  );
};
