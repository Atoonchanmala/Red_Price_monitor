export const PRICE_MONITOR_API_BASE_URL = (() => {
  const baseUrl = import.meta.env.VITE_PRICE_MONITOR_API_BASE_URL

  if (!baseUrl) {
    throw new Error('Missing environment variable: VITE_PRICE_MONITOR_API_BASE_URL')
  }

  return baseUrl.replace(/\/$/, '')
})()
