import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useCompleteRegistrationMutation, useLazyGetSessionQuery } from '@/services/auth'
import { completeValidationSchema } from '@/schemas/auth'

export function useCompleteForm() {
  const [completeRegistration, { isLoading }] = useCompleteRegistrationMutation()
  const [getSession] = useLazyGetSessionQuery()

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      type: 'natural',
      first_name: '',
      last_name: '',
      identity_sex: '',
      phone: '',
      document_type: 'DNI',
      document_identification: '',
      accept: false,
    },
    mode: 'onTouched',
    resolver: yupResolver(completeValidationSchema),
  })

  const onSubmit = async values => {
    try {
      await completeRegistration(values).unwrap()
      await getSession().unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    formState,
    isLoading,
  }
}
