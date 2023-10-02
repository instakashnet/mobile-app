import 'dayjs/locale/es'
import 'number-to-locale-string-polyfill'

import dayjs from 'dayjs'

export function formatAmount(amount = 0, symbol = '') {
  const formattedAmount = Number(amount).toFixed(2)
  return `${symbol}${formattedAmount}`
}

export function formatDate(dateString, formatString = '') {
  const date = dayjs(dateString)

  return date.format(formatString)
}

export function formatTimeTo12Hour(time) {
  let hours = time.getHours()
  const minutes = time.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + period
  return formattedTime
}

export function formatAccounts(accounts = []) {
  return accounts.map(account => ({
    id: account.id,
    accNumber: account.accountNumber,
    cci: account.cci,
    bank: {
      name: account.bank?.name,
      isDirect: account.bank?.active,
      id: account.bank?.id,
    },
    accType: account.accType,
    currency: {
      symbol: account.currency?.Symbol,
      name: account.currency?.name,
      id: account.currency?.id,
    },
    alias: account.alias,
    joint: account.joint,
    jointValues: account.jointAccount,
  }))
}
