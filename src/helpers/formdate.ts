export const formatDisplayDate = (value?: string): string => {
  if (!value) {
    return '—'
  }

  const parsedDate = (() => {
    const isoCandidate = new Date(value)
    if (!Number.isNaN(isoCandidate.getTime())) {
      return isoCandidate
    }

    const [datePart] = value.split(' ')
    if (datePart) {
      const replaced = datePart.replace(/\./g, '-').replace(/\//g, '-')
      const parts = replaced.split('-')
      if (parts.length === 3) {
        const [year, month, day] = parts.map((part) => Number.parseInt(part, 10))
        if ([year, month, day].every((num) => Number.isFinite(num))) {
          const fallbackDate = new Date(year, month - 1, day)
          if (!Number.isNaN(fallbackDate.getTime())) {
            return fallbackDate
          }
        }
      }
    }

    return null
  })()

  if (!parsedDate) {
    return '—'
  }

  const day = String(parsedDate.getDate()).padStart(2, '0')
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const year = String(parsedDate.getFullYear()).slice(-4)

  return `${day}.${month}.${year}`
}