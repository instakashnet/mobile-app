import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'number-to-locale-string-polyfill'

export function formatAmount(amount = 0, symbol = '') {
  const formattedAmount = Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  return `${symbol}${formattedAmount}`
}

export function formatDate(dateString, formatString = '') {
  const date = dayjs(dateString)

  return date.format(formatString)
}
