import { useCheckReferralStatusQuery } from '../../services/exchange'

export function useReferral(profileType) {
  const { data = {}, isFetching } = useCheckReferralStatusQuery('checkReferral', {
    skip: profileType !== 'natural',
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  return { data, isFetching }
}
