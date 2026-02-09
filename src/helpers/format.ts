export const formatPrice = (value?: number): string =>
  value != null ? `${value.toLocaleString('th-TH')} ກີບ` : '—'
