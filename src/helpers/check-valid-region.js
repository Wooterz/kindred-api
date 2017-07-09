// @flow

import REGIONS from '../constants/regions'

const check = (region: string): boolean => {
  for (const r of Object.keys(REGIONS))
    if (REGIONS[r] === region) return true

  return false
}

export default check