export const documentOptions = [
  { label: 'DNI', value: 'DNI' },
  { label: 'CE', value: 'CE' },
  { label: 'PTP', value: 'PTP' },
  { label: 'Pasaporte', value: 'Pasaporte' },
]

export const sexOptions = [
  { label: 'Hombre', value: 'male' },
  { label: 'Mujer', value: 'female' },
  { label: 'Otro', value: 'other' },
]

export const accountTypesOptions = [
  { label: 'Corriente', value: 'checking' },
  { label: 'Ahorros', value: 'savings' },
]

export const getBanksOptions = (banks = []) =>
  banks.map(bank => ({
    label: bank.name,
    value: bank.id,
  }))

export const getCurrenciesOptions = (currencies = []) =>
  currencies.map(currency => ({
    label: `${currency.name} (${currency.Symbol})`,
    value: currency.id,
  }))

export const occupationOptions = [
  { label: 'Ama de casa', value: 'Ama de casa' },
  { label: 'Comerciante', value: 'Comerciante' },
  { label: 'Conductor', value: 'Conductor' },
  { label: 'Desempleado', value: 'Desempleado' },
  { label: 'Empleado', value: 'Empleado' },
  { label: 'Empleador', value: 'Empleador' },
  { label: 'Estudiante', value: 'Estudiante' },
  { label: 'Jubilado', value: 'Jubilado' },
  { label: 'Miembro de las Fuerzas Armadas', value: 'Miembro de las Fuerzas Armadas' },
  { label: 'Obrero', value: 'Obrero' },
  { label: 'Trabajador independiente', value: 'Trabajador independiente' },
  { label: 'Otro', value: 'otro' },
]

export const fundsOriginOptions = [
  { label: 'Ahorros', value: 'ahorros' },
  {
    label: 'Alquiler de bienes inmuebles',
    value: 'alquiler de bienes inmuebles',
  },
  {
    label: 'Alquiler de bienes muebles',
    value: 'alquiler de bienes muebles',
  },
  { label: 'Venta de bienes inmuebles', value: 'venta de bienes inmuebles' },
  { label: 'Venta de bienes muebles', value: 'venta de bienes muebles' },
  { label: 'Donación o sorteo', value: 'donación o sorteo' },
  { label: 'Trabajo independiente', value: 'trabajo independiente' },
  { label: 'Regalía', value: 'regalía' },
  { label: 'Préstamos', value: 'préstamos' },
  { label: 'Otros', value: 'otros' },
]
