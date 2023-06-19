import * as Yup from 'yup'

export const withdrawKashSchema = Yup.object({
  kashQty: Yup.string()
    .required('Debes ingresar la cantidad de Kash a retirar')
    .matches(/^[0-9]{1,}$/, 'Debes ingresar un número válido'),
  accountId: Yup.number().required('Debes seleccionar una cuenta')
}).required()
