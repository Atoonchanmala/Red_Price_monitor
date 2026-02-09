// ======== API v2 current price response =========
export interface CurrentPriceV2Response {
  data: CurrentPriceV2Item[]
  difference: CurrentPriceV2Difference
  error: boolean
  priceToken: string
  total: number
}

export interface CurrentPriceV2Item {
  id: string
  one_baht_sale_price: number
  one_baht_buy_price: number
  one_baht_sale_price_gold_bar: number
  one_baht_buy_price_gold_bar: number
  created_at: string
}

export interface CurrentPriceV2Difference {
  id: string
  one_baht_sale_price: number
  one_baht_buy_price: number
  one_baht_sale_price_gold_bar: number
  one_baht_buy_price_gold_bar: number
  created_at: string
}

// ======== API v1 current price response =========
export interface CurrentPriceV1Response {
  data: CurrentPriceV1Item[]
  error: boolean
  priceToken: string
  total: number
}

export interface CurrentPriceV1Item {
  id: string
  one_baht_sale_price: number
  one_baht_buy_price: number
  two_salung_sale_price: number
  two_salung_buy_price: number
  one_salung_sale_price: number
  one_salung_buy_price: number
  five_hun_sale_price: number
  five_hun_buy_price: number
  three_hun_sale_price: number
  three_hun_buy_price: number
  two_hun_sale_price: number
  two_hun_buy_price: number
  one_hun_sale_price: number
  one_hun_buy_price: number
  one_baht_sale_price_gold_bar: number
  one_baht_buy_price_gold_bar: number
  two_salung_sale_price_gold_bar: number
  two_salung_buy_price_gold_bar: number
  one_salung_sale_price_gold_bar: number
  one_salung_buy_price_gold_bar: number
  five_hun_sale_price_gold_bar: number
  five_hun_buy_price_gold_bar: number
  three_hun_sale_price_gold_bar: number
  three_hun_buy_price_gold_bar: number
  two_hun_sale_price_gold_bar: number
  two_hun_buy_price_gold_bar: number
  one_hun_sale_price_gold_bar: number
  one_hun_buy_price_gold_bar: number
  one_baht_sale_priceTHB: number
  one_baht_buy_priceTHB: number
  two_salung_sale_priceTHB: number
  two_salung_buy_priceTHB: number
  one_salung_sale_priceTHB: number
  one_salung_buy_priceTHB: number
  five_hun_sale_priceTHB: number
  five_hun_buy_priceTHB: number
  three_hun_sale_priceTHB: number
  three_hun_buy_priceTHB: number
  two_hun_sale_priceTHB: number
  two_hun_buy_priceTHB: number
  one_hun_sale_priceTHB: number
  one_hun_buy_priceTHB: number
  one_baht_sale_price_gold_barTHB: number
  one_baht_buy_price_gold_barTHB: number
  two_salung_sale_price_gold_barTHB: number
  two_salung_buy_price_gold_barTHB: number
  one_salung_sale_price_gold_barTHB: number
  one_salung_buy_price_gold_barTHB: number
  five_hun_sale_price_gold_barTHB: number
  five_hun_buy_price_gold_barTHB: number
  three_hun_sale_price_gold_barTHB: number
  three_hun_buy_price_gold_barTHB: number
  two_hun_sale_price_gold_barTHB: number
  two_hun_buy_price_gold_barTHB: number
  one_hun_sale_price_gold_barTHB: number
  one_hun_buy_price_gold_barTHB: number
  one_baht_sale_price_gold_bar_kpv: number
  one_baht_buy_price_gold_bar_kpv: number
  show_date_time: string
  created_by: string
  created_by_full_name: string
  update_by_full_name: string
  updated_by: string
  created_at: string
  updated_at: string
}
