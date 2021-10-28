import React from "react";

// ASSETS
import { bankIcons } from "../relative-paths/images";

// COMPONENTS
import { AccountCard, BankIcon } from "./accounts.styles";

export const AccountItem = ({ account }) => {
  return (
    <AccountCard>
      <BankIcon bankName={account.bank.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
    </AccountCard>
  );
};
