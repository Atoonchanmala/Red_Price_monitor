import axios from 'axios'

import type {
  CurrentPriceV1Response,
  CurrentPriceV2Response,
} from '../../types/apiTypes'
import { PRICE_MONITOR_API_BASE_URL } from '../../config/env'

const priceMonitorApi = axios.create({
  baseURL: PRICE_MONITOR_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const CURRENT_PRICE_V2_PATH = '/api/v2/price/current';
const CURRENT_PRICE_V1_PATH = '/api/v1/price';

export const fetchCurrentPriceV2 = async (): Promise<CurrentPriceV2Response> => {
  const response = await priceMonitorApi.get<CurrentPriceV2Response>(CURRENT_PRICE_V2_PATH)
  return response.data
};

export const fetchCurrentPriceV1 = async (): Promise<CurrentPriceV1Response> => {
  const response = await priceMonitorApi.get<CurrentPriceV1Response>(CURRENT_PRICE_V1_PATH)
  return response.data
};
export default priceMonitorApi;