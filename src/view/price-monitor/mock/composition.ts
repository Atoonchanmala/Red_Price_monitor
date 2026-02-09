import type { PriceDisplayRow } from '../types'

export const COMPOSITION_LABEL_MAP: Record<string, string> = {
  one_baht: '1 ບາດ',
  two_salung: '2 ສະຫຼຶງ',
  one_salung: '1 ສະຫຼຶງ',
  five_hun: '5 ຫຸນ',
  three_hun: '3 ຫຸນ',
  two_hun: '2 ຫຸນ',
  one_hun: '1 ຫຸນ',
}

export const COMPOSITION_FALLBACK_ROWS: PriceDisplayRow[] = [
  { label: '1 ບາດ', sell: '-', buy: '-' },
  { label: '2 ສະຫຼຶງ', sell: '-', buy: '-' },
  { label: '1 ສະຫຼຶງ', sell: '-', buy: '-' },
  { label: '5 ຫຸນ', sell: '-', buy: '-' },
  { label: '3 ຫຸນ', sell: '-', buy: '-' },
  { label: '2 ຫຸນ', sell: '-', buy: '-' },
  { label: '1 ຫຸນ', sell: '-', buy: '-' },
]
