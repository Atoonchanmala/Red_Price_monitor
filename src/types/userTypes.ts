import type {
  CurrentPriceV1Item,
  CurrentPriceV2Difference,
  CurrentPriceV2Item,
} from './apiTypes';
import type { BoxProps } from '@chakra-ui/react'

export interface PriceMonitorRow {
  labelKey: string
  sell: number
  buy: number
};

export interface PriceMonitorData {
  goldbarRows: PriceMonitorRow[]
  compositionRows: PriceMonitorRow[]
  metadata: {
    showDateTime: string
    priceToken: string
  }
  raw: {
    v1Item: CurrentPriceV1Item
    v2Item: CurrentPriceV2Item
    v2Difference: CurrentPriceV2Difference
  }
};

export interface PriceMonitorState {
  data: PriceMonitorData | null
  isLoading: boolean
  error: string | null
};

export type GoldDividerProps = {
  width: BoxProps['width']
  height?: BoxProps['height']
};