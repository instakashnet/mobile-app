import * as Yup from 'yup'

export const selectAccountsSchema = Yup.object()
  .shape({
    account_from_id: Yup.number().required('Debes seleccionar tu cuenta de origen.'),
    account_to_id: Yup.number().required('Debes seleccionar tu cuenta de destino.'),
    funds_origin: Yup.string().required('Debes seleccionar el origen de los fondos.')
  })
  .required()

export const transactionCodeSchema = Yup.object()
  .shape({
    transaction_code: Yup.string()
      .required('Debes ingresar el no. de operación de tu transferencia.')
      .matches(/^[0-9]+$/, 'El no. de operación debe tener solo dígitos.')
  })
  .required()
