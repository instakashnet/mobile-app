import * as Yup from 'yup'

export const addAccountSchema = Yup.object({
  account_number: Yup.string().when('isDirect', {
    is: true,
    then: () =>
      Yup.string()
        .required('Ingresa un número de cuenta.')
        .matches(/^[0-9]{13,14}$/, 'La cuenta debe ser entre 13 a 14 números.'),
    otherwise: () => Yup.string().notRequired()
  }),
  cci: Yup.string().when('isDirect', {
    is: false,
    then: () =>
      Yup.string()
        .required('Ingresa un número de CCI.')
        .matches(/^[0-9]{20}$/, 'el CCI debe ser de 20 números.'),
    otherwise: () => Yup.string().notRequired()
  }),
  bankId: Yup.number('Selecciona un banco.').required('Selecciona un banco.'),
  currencyId: Yup.number('Selecciona una moneda.').required('Selecciona una moneda.'),
  alias: Yup.string().required('Ingresa un alias, ej.: Tu nombre + banco + moneda.').min(5, 'Debe ser mínimo de 5 caracteres.'),
  accType: Yup.string('Selecciona un tipo de cuenta.').required('Selecciona un tipo de cuenta.'),
  firstNameJoint: Yup.string().when('joint', {
    is: true,
    then: () => Yup.string().required('Ingresa el nombre completo.'),
    otherwise: () => Yup.string().notRequired()
  }),
  fatherSurname: Yup.string().when('joint', {
    is: true,
    then: () => Yup.string().required('Ingresa el apellido paterno.'),
    otherwise: () => Yup.string().notRequired()
  }),
  motherSurname: Yup.string().when('joint', {
    is: true,
    then: () => Yup.string().required('Ingresa el apellido materno.'),
    otherwise: () => Yup.string().notRequired()
  }),
  documentTypeJoint: Yup.string().when('joint', {
    is: true,
    then: () => Yup.string().required('Selecciona el tipo de documento.'),
    otherwise: () => Yup.string().notRequired()
  }),
  documentNumberJoint: Yup.string().when('joint', {
    is: true,
    then: () => Yup.string().required('Ingresa el no. de documento.'),
    otherwise: () => Yup.string().notRequired()
  })
}).required()
