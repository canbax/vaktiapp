import { RemainingTimeFormat } from "@/types";

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
  const hasSec = sec > 0;
  const hourLongStr = hasHour ? `${hour} ${hourStr} ` : "";
  const minLongStr = hasMin ? `${min} ${minStr} ` : "";
  const secLongStr = hasSec ? `${sec} ${secStr} ` : "";
  let s = "";
  switch (timeFormat) {
    case "XX:YY:ZZ":
      s = `${intToStr(hour)}:${intToStr(min)}:${intToStr(sec)}`;
      break;
    case "XX:YY":
      s = `${intToStr(hour)}:${intToStr(min)}`;
      break;
    case "X hour Y minute Z second":
      s = `${hourLongStr}${minLongStr}${secLongStr}`;
      break;
    case "X hour Y minute":
      s = `${hourLongStr}${minLongStr}`;
      break;
    default:
      s = "";
      break;
  }
  const noHourOrMinute = !hasHour && !hasMin;
  if (
    (noHourOrMinute && timeFormat === "X hour Y minute") ||
    (noHourOrMinute && !hasSec && timeFormat === "X hour Y minute Z second")
  )
    return `${sec} ${secStr}`;
  return s.trim();
}

/** converts an integer in range [0,1,...99] to a length 2 string by adding prefix 0 if number is less than 10  */
export function intToStr(n: number) {
  if (!Number.isInteger(n)) throw new Error(`${n} is not an integer`);
  if (n < 0 || n > 99)
    throw new Error(`${n} is less than 0 or greater than 99`);
  if (n < 10) return "0" + n;
  return "" + n;
}
