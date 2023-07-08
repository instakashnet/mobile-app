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

export function formatTimeTo12Hour(time) {
  let hours = time.getHours()
  const minutes = time.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedTime = hours + ':' + (minutes < 10 ? '0' : '') + minutes + period
  return formattedTime
}
