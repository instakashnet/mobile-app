export const accounts = [
  {
    id: 1,
    accNumber: '1234567891234',
    cci: null,
    bank: {
      name: 'bcp',
      isDirect: true
    },
    accType: 'corriente',
    currency: {
      symbol: '$',
      name: ' dólares',
      id: 1
    },
    alias: 'Roger prueba BCP',
    pooled: null
  },
  {
    id: 2,
    accNumber: '1234567891277',
    cci: null,
    bank: {
      name: 'interbank',
      isDirect: true
    },
    accType: 'corriente',
    currency: {
      symbol: 'S/.',
      name: ' soles',
      id: 2
    },
    alias: 'Roger prueba Interbank',
    pooled: null
  },
  {
    id: 3,
    accNumber: null,
    cci: '12345678912775423291',
    bank: {
      name: 'scotiabank',
      isDirect: false
    },
    accType: 'ahorros',
    currency: {
      symbol: 'S/.',
      name: ' soles',
      id: 2
    },
    alias: 'Roger prueba scotiabank',
    pooled: {
      firstName: 'Roger',
      lastName: 'Rengifo Carrizo',
      documentType: 'DNI',
      documentNumber: '12345678'
    }
  }
]
