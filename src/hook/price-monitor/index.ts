import { useCallback, useEffect, useState } from 'react'
import { fetchCurrentPriceV1, fetchCurrentPriceV2 } from '../../service/price-monitor'
import type { PriceMonitorRow, PriceMonitorState } from '../../types/userTypes'
import {
  calculateFiveHoon,
  calculateOneSalung,
  calculateOneGram,
  calculateOneBahtBuy,
  calculateOneHoon,
  calculateTwoSalung,
  calculateThreeHoon,
  calculateTwoHoon,
} from './calculations'
import { isValidRecentDate, pickLatestByDate } from '../../helpers/date'

const initialState: PriceMonitorState = {
    data: null,
    isLoading: false,
    error: null,
};

export function usePriceMonitor(): PriceMonitorState & { refresh: () => Promise<void> } {
    const [state, setState] = useState<PriceMonitorState>(initialState);

    const refresh = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {

            const [currentPriceV1, currentPriceV2] = await Promise.all([
                fetchCurrentPriceV1(),
                fetchCurrentPriceV2(),
            ])

            const latestV1 = pickLatestByDate(currentPriceV1.data);
            const latestV2 = pickLatestByDate(currentPriceV2.data);

            if (!latestV1 || !latestV2) {
                throw new Error('Error fetching price data from API')
            }

            const oneGramPrice = calculateOneGram(
                latestV1.one_baht_sale_price_gold_bar,
                latestV1.one_baht_buy_price_gold_bar,
            )

            // ຄຳແທ່ງ
            const goldbarRows: PriceMonitorRow[] = [
                {
                    labelKey: 'one_baht',
                    sell: latestV1.one_baht_sale_price_gold_bar_kpv ?? latestV1.one_baht_sale_price_gold_bar,
                    buy: latestV1.one_baht_buy_price_gold_bar_kpv ?? latestV1.one_baht_buy_price_gold_bar,
                },
                {
                    labelKey: 'one_gram',
                    sell: oneGramPrice.SellPrice,
                    buy: oneGramPrice.BuyPrice,
                },
            ]

            // ຄຳຮູບປະພັນ
            const oneSalungPrice = calculateOneSalung(latestV1.one_baht_sale_price);
            const twoSalungPrice = calculateTwoSalung(latestV1.one_baht_sale_price);

            const compositionRows: PriceMonitorRow[] = [
                {
                    labelKey: 'one_baht',
                    sell: latestV1.one_baht_sale_price,
                    buy: calculateOneBahtBuy(latestV1.one_baht_sale_price),
                },
                {
                    labelKey: 'two_salung',
                    sell: twoSalungPrice.SellPrice,
                    buy: twoSalungPrice.BuyPrice,
                },
                {
                    labelKey: 'one_salung',
                    sell: oneSalungPrice.SellPrice,
                    buy: oneSalungPrice.BuyPrice,
                },
                {
                    labelKey: 'five_hun',
                    sell: calculateFiveHoon(latestV1.one_baht_sale_price).SellPrice,
                    buy: calculateFiveHoon(latestV1.one_baht_sale_price).BuyPrice,
                },
                {
                    labelKey: 'three_hun',
                    sell: calculateThreeHoon(latestV1.one_baht_sale_price).SellPrice,
                    buy: calculateThreeHoon(latestV1.one_baht_sale_price).BuyPrice,
                },
                {
                    labelKey: 'two_hun',
                    sell: calculateTwoHoon(latestV1.one_baht_sale_price).SellPrice,
                    buy: calculateTwoHoon(latestV1.one_baht_sale_price).BuyPrice,
                },
                {
                    labelKey: 'one_hun',
                    sell: calculateOneHoon(latestV1.one_baht_sale_price).SellPrice,
                    buy: calculateOneHoon(latestV1.one_baht_sale_price).BuyPrice,
                },
            ];

            const showDateTime = (() => {
                if (isValidRecentDate(latestV1.show_date_time)) {
                    return latestV1.show_date_time as string
                }

                if (isValidRecentDate(latestV2.created_at)) {
                    return latestV2.created_at
                }

                if (isValidRecentDate(latestV1.created_at)) {
                    return latestV1.created_at
                }
                return ''
            })();
            const priceToken = currentPriceV1.priceToken ?? currentPriceV2.priceToken ?? ''

            setState({
                data: {
                    goldbarRows,
                    compositionRows,
                    metadata: {
                        showDateTime,
                        priceToken,
                    },
                    raw: {
                        v1Item: latestV1,
                        v2Item: latestV2,
                        v2Difference: currentPriceV2.difference,
                    },
                },
                isLoading: false,
                error: null,
            });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                error: error instanceof Error ? error.message : 'error',
            });
        };
    }, []);

// Auto refresh every 60 seconds
    useEffect(() => {
        refresh();
        const intervalId = setInterval(() => {
            refresh();
        }, 30_000);

        return () => {
            clearInterval(intervalId);
        };
    }, [refresh]);
    return { ...state, refresh };
};