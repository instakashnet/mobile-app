import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// REDUx
import { useSelector, useDispatch } from "react-redux";
import { editAccount, getCurrencies } from "../../../store/actions";

// COMPONENTS
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import { EditAccount } from "../components/forms/edit-account.component";
import { Spacer } from "../../../components/utils/spacer.component";
import { Loader } from "../../../components/UI/loader.component";
import { AccountsWrapper } from "../components/accounts.styles";

export const EditAccountScreen = ({ route }) => {
  const dispatch = useDispatch(),
    { account } = route.params,
    { isProcessing, isLoading, currencies } = useSelector((state) => state.accountsReducer);

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      dispatch(getCurrencies());
    }, [dispatch])
  );

  // HANDLERS
  const onEdit = (values, accId) => dispatch(editAccount(values, accId));

  return (
    <SafeArea>
      {isLoading && <Loader />}
      <AccountsWrapper>
        <Text>Edita los datos de cuenta bancaria.</Text>
        <Spacer variant="top" />
        <EditAccount currencies={currencies} isProcessing={isProcessing} account={account} onEdit={onEdit} />
      </AccountsWrapper>
    </SafeArea>
  );
};
