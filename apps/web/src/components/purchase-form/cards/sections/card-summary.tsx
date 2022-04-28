import useTranslation from 'next-translate/useTranslation'

import css from './card-summary.module.css'

import Button from '@/components/button'
import Heading from '@/components/heading'
import { useCurrency } from '@/contexts/currency-context'
import { useI18n } from '@/contexts/i18n-context'
import { usePaymentContext } from '@/contexts/payment-context'
import { useLocale } from '@/hooks/use-locale'
import { formatCurrency } from '@/utils/currency'

export default function CardSummary() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { isAuctionActive, price, release } = usePaymentContext()
  const { currency } = useCurrency()
  const { conversionRate } = useI18n()
  const userCurrencyAmount = formatCurrency(
    price,
    locale,
    currency,
    conversionRate
  )
  const settlementCurrencyAmount = formatCurrency(price)

  return (
    <div className={css.root}>
      <Heading level={1}>{t('forms:sections.Summary')}</Heading>
      <table className={css.paymentGrid}>
        <tbody>
          <tr>
            <th scope="row">{t('forms:fields.paymentMethods.label')}</th>
            <td>{t('forms:sections.Credit Card')}</td>
          </tr>
          <tr>
            <th scope="row">{release?.title}</th>
            <td>{userCurrencyAmount}</td>
          </tr>
        </tbody>
      </table>
      <p className={css.disclaimer}>
        {t('forms:fields.price.disclaimer', {
          currency,
          amount: settlementCurrencyAmount,
        })}
      </p>
      {/* Submit */}
      <Button disabled={!release} fullWidth type="submit" variant="primary">
        {isAuctionActive()
          ? t('common:actions.Place Bid')
          : t('common:actions.Purchase')}
      </Button>
    </div>
  )
}
