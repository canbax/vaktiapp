import { isDefined } from '@vueuse/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isValidGPS(latitude: any, longitude: any): boolean {
  const isValidNumbers =
    isDefined(latitude) &&
    isDefined(longitude) &&
    typeof latitude === 'number' &&
    typeof longitude === 'number';

  if (!isValidNumbers) return false;
  const isLatitudeValid = latitude >= -90 && latitude <= 90;
  const isLongitudeValid = longitude >= -180 && longitude <= 180;

  return isLatitudeValid && isLongitudeValid;
}
