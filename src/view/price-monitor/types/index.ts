import type { PriceMonitorRow } from '../../../types/userTypes'

export interface PriceDisplayRow {
  label: string
  sell: string
  buy: string
}

export interface GoldbarPageProps {
  rows?: PriceMonitorRow[]
  lastUpdated?: string
  isLoading?: boolean
}

export interface CompositionPageProps {
  rows?: PriceMonitorRow[]
  isLoading?: boolean
}
