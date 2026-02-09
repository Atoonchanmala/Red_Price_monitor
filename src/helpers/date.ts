export const isValidRecentDate = (value?: string): boolean => {
  if (!value) {
    return false
  }

  const date = new Date(value)
  return !Number.isNaN(date.getTime()) && date.getFullYear() >= 2000
}

export const pickLatestByDate = <T extends { created_at?: string }>(items: T[]): T | undefined => {
  if (!items.length) {
    return undefined
  }

  return items.reduce((latest, current) => {
    if (!latest) {
      return current
    }

    const latestTime = latest.created_at ? Date.parse(latest.created_at) : -Infinity
    const currentTime = current.created_at ? Date.parse(current.created_at) : -Infinity

    return currentTime > latestTime ? current : latest
  })
}
