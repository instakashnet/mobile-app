export function formatAmount(amount = 0, symbol = '') {
  const formattedAmount = Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
  return `${symbol}${formattedAmount}`
}

export function formatDate(dateString, options) {
  const date = new Date(dateString)
  let dateOptions = options ?? {}

  return date.toLocaleDateString('es-ES', dateOptions)
}
