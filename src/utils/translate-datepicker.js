import { registerTranslation } from 'react-native-paper-dates'

export function translateDatepicker() {
  return registerTranslation('es', {
    save: 'Guardar',
    selectSingle: 'Seleccionar fecha',
    selectMultiple: 'Selccionar fechas',
    selectRange: 'Seleccionar periodo',
    notAccordingToDateFormat: (inputFormat) => `El formato de fecha debe ser ${inputFormat}`,
    mustBeHigherThan: (date) => `Debe ser despues de ${date}`,
    mustBeLowerThan: (date) => `Debe ser antes de ${date}`,
    mustBeBetween: (startDate, endDate) => `Debe ser entre ${startDate} - ${endDate}`,
    dateIsDisabled: 'Día no está habilitado',
    previous: 'Anterior',
    next: 'Siguiente',
    typeInDate: 'Escribe una fecha',
    pickDateFromCalendar: 'Elige una fecha del calendario',
    close: 'Cerrar'
  })
}
