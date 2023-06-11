type RemainingTimeFormat =
  | "XX:YY:ZZ"
  | "XX:YY"
  | `X hour Y minute Z second`
  | `X hour Y minute`;

// seconds to human readable string
export function secondsToHumanReadable(
  i: number,
  hourStr: string,
  minStr: string,
  secStr: string,
  timeFormat: RemainingTimeFormat
): string {
  const hour = Math.floor(i / 3600);
  const min = Math.floor((i - 3600 * hour) / 60);
  const sec = i - 3600 * hour - 60 * min;
  const hasHour = hour > 0;
  const hasMin = min > 0;
  const hourShortStr = hasHour ? `${intToStr(hour)}:` : "";
  const hourLongStr = hasHour ? `${hour} ${hourStr} ` : "";
  const minShortStr = hasMin ? `${intToStr(min)}:` : "";
  const minLongStr = hasMin ? `${min} ${minStr} ` : "";
  switch (timeFormat) {
    case "XX:YY:ZZ":
      return `${hourShortStr}${minShortStr}${intToStr(sec)}`;
    case "XX:YY":
      return `${hourShortStr}${intToStr(min)}`;
    case "X hour Y minute Z second":
      return `${hourLongStr}${minLongStr}${sec} ${secStr}`;
    case "X hour Y minute":
      return `${hourLongStr}${min} ${minStr}`;
    default:
      return "";
  }
}

/** converts an integer in range [0,1,...99] to a length 2 string by adding prefix 0 if number is less than 10  */
export function intToStr(n: number) {
  if (!Number.isInteger(n)) throw new Error(`${n} is not an integer`);
  if (n < 0 || n > 99)
    throw new Error(`${n} is less than 0 or greater than 99`);
  if (n < 10) return "0" + n;
  return "" + n;
}
