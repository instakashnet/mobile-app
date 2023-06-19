export function calculateAmountToReceive(buy = 0, sell = 0, amountToSend, exchangeType) {
  return (exchangeType === 'sell' ? amountToSend / sell : amountToSend * buy).toFixed(2)
}
