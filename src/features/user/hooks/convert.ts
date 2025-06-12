export const convertTextHasAssets = (hasAssets: string | number | null | undefined) => {
  return hasAssets !== null && hasAssets !== undefined ? (hasAssets === 1 ? '有り' : 1) : '-'
}

export const convertIsPaidText = (isPaid: string | number | undefined | null) => {
  return isPaid !== null && isPaid !== undefined ? (isPaid === 1 ? '有料' : '-') : '-'
}

export const convertWillingText = (willing: number | undefined) => {
  return willing ? '-' : '-'
}
