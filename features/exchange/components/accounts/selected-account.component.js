import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../../components/typography/text.component';
import { bankIcons } from '../../relative-paths/images';
import { BankDescription, BankIcon } from '../accounts.styles';

export default function SelectedAccount({ account = {} }) {
  return (
    <BankDescription>
      <BankIcon bankName={account.bank?.name.toLowerCase()} source={bankIcons.find((icon) => icon.bankName === account.bank.name.toLowerCase()).uri} />
      <View>
        <Text variant='bold'>{account.alias}</Text>
        <Text variant='button'>
          ****
          {account.accountNumber
            ? account.accountNumber.substring(account.accountNumber.length - 4, account.accountNumber.length)
            : account.cci.substring(account.cci.length - 4, account.cci.length)}
        </Text>
      </View>
    </BankDescription>
  );
}
