import type { PriceDisplayRow } from '../types'

export const GOLD_BAR_LABEL_MAP: Record<string, string> = {
  one_baht: '1 ບາດ',
  one_gram: '1 ກຣັມ',
}

export const GOLD_BAR_FALLBACK_ROWS: PriceDisplayRow[] = [
  { label: '1 ບາດ', sell: '-', buy: '-' },
  { label: '1 ກຣັມ', sell: '-', buy: '-' },
]
