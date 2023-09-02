import { useMemo } from 'react'

import { DISCOUNTS } from '../../../data/discounts'
import Banner from '../UI/Banner'
import Text from '../utils/Text'

function DiscountsBanner({ isReferral, level, onAddCoupon }) {
  const activeDiscount = useMemo(() => {
    if (isReferral) return DISCOUNTS.REFERRAL
    return DISCOUNTS[level?.replace('KASH ', '')]
  }, [isReferral, level])

  return activeDiscount ? (
    <Banner>
      <Text>
        {activeDiscount?.description}{' '}
        <Text variant="button" className="underline" onPress={() => onAddCoupon(activeDiscount?.coupon)}>
          Activar
        </Text>
      </Text>
    </Banner>
  ) : null
}

export default DiscountsBanner
