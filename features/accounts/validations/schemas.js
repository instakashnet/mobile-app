import * as Yup from "yup";

export const addAccountSchema = Yup.object().shape({
  account_number: Yup.string().when("isDirect", {
    is: true,
    then: Yup.string()
      .required("Debes colocar tu número de cuenta.")
      .matches(/^[0-9]{13,14}$/, "Número de cuenta inválido. Solo números, de 13 a 14 caracteres."),
    otherwise: Yup.string().notRequired(),
  }),
  cci: Yup.string().when("isDirect", {
    is: false,
    then: Yup.string()
      .required("Debes colocar tu número de cuenta interbancario.")
      .matches(/^[0-9]{20}$/, "CCI inválido. Deben ser solo números y 20 caracteres."),
    otherwise: Yup.string().notRequired(),
  }),
  bankId: Yup.number().required("Debes seleccionar un banco."),
  currencyId: Yup.string().required("Debes seleccionar una moneda."),
  alias: Yup.string().required("Debes ingresar un alias.").min(5, "Debe ser mínimo de 5 caracteres.").max(40, "No deben ser más de 40 caracteres."),
  acc_type: Yup.string().required("Debes seleccionar un tipo de cuenta."),
  accept: Yup.boolean().oneOf([true], "Debes declarar que es tu cuenta personal."),
});

export const addTPAccountSchema = Yup.object().shape({
  account_number: Yup.string().when("isDirect", {
    is: true,
    then: Yup.string()
      .required("Debes colocar tu número de cuenta.")
      .matches(/^[0-9]{13,14}$/, "Número de cuenta inválido. Solo números, de 13 a 14 caracteres."),
    otherwise: Yup.string().notRequired(),
  }),
  cci: Yup.string().when("isDirect", {
    is: false,
    then: Yup.string()
      .required("Debes colocar tu número de cuenta interbancario.")
      .matches(/^[0-9]{20}$/, "Número de CCI inválido. Solo números, 20 caracteres."),
    otherwise: Yup.string().notRequired(),
  }),
  bankId: Yup.number().required("Debes seleccionar un banco."),
  currencyId: Yup.string().required("Debes seleccionar una moneda."),
  alias: Yup.string().required("Debes ingresar un alias.").min(5, "Mínimo 5 caracteres.").max(40, "Máximo 40 caracteres."),
  acc_type: Yup.string().required("Debes seleccionar un tipo de cuenta."),
  accept: Yup.boolean().oneOf([true], "Debes declarar que los datos son válidos."),
  accept2: Yup.boolean().oneOf([true], "Debes aceptar el consentimiento."),
  email: Yup.string().required("Debes colocar un correo electrónico.").email("Coloca un correo válido."),
  documentIdentity: Yup.string()
    .required("Debes colocar un nro. de documento.")
    .matches(/^[0-9]{8,13}$/, "Número de documento ingresado inválido."),
  documentType: Yup.string().required("Debes seleccionar un tipo de documento."),
  razonSocial: Yup.string().when("thirdPartyAccType", {
    is: "juridica",
    then: Yup.string()
      .required("Debes colocar la razón social de la empresa.")
      .matches(/^[a-zA-Z\s]+$/i, "Solo se aceptan letras."),
    otherwise: Yup.string().notRequired(),
  }),
  name: Yup.string().when("thirdPartyAccType", {
    is: "natural",
    then: Yup.string().required("Debes colocar un nombre completo."),
    otherwise: Yup.string().notRequired(),
  }),
  job: Yup.string().when("thirdPartyAccType", {
    is: "natural",
    then: Yup.string().required("Debes colocar una ocupación."),
    otherwise: Yup.string().notRequired(),
  }),
});
