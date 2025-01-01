import {
  DateString,
  DateStringFormat,
  HourString,
  RemainingTimeFormat,
} from "@/types";

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

/** from a string with format 22:21, return total number of seconds */
export function hourStringToTotalSeconds(s: HourString): number {
  const hourNumber = Number(s.slice(0, 2));
  const minuteNumber = Number(s.slice(3, 5));
  return 3600 * hourNumber + 60 * minuteNumber;
}

export function getTotalSeconds(date: Date): number {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

export const ONE_DAY_IN_SECONDS = 86400;

export function dateToString(
  date: Date,
  format: DateStringFormat,
  $t: (key: string) => string
) {
  let monthStr = $t("month" + date.getMonth()).toString();
  let weekdayStr = $t("weekday" + date.getDay()).toString();
  const weekdayShortStr = $t("weekdayShort" + date.getDay()).toString();
  if (format.month === "MMM") {
    monthStr = monthStr.substring(0, 3);
  } else if (format.month === "MM") {
    monthStr = intToStr(date.getMonth() + 1);
  }
  let year = date.getFullYear() + "";
  if (format.year === "YY") {
    year = year.substring(2, 4);
  } else if (format.year === "-") {
    year = "";
  }
  if (format.weekDay === "DDD") {
    weekdayStr = weekdayShortStr;
  } else if (format.weekDay === "-") {
    weekdayStr = "";
  }
  return [intToStr(date.getDate()), monthStr, year, weekdayStr]
    .filter((x) => x)
    .join(" ");
}

export function prefix0(n: number) {
  if (n > 99 || n < -99) throw new Error("Can only process 2 digits integers!");
  return (n + "").padStart(2, "0");
}

export function extractTimeFromDate(
  d: Date,
  timezoneOffset: number
): HourString {
  d.setMinutes(d.getMinutes() + timezoneOffset);
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();
  return (prefix0(hour) + ":" + prefix0(minute)) as HourString;
}

export function dateToStandardString(date: Date): DateString {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${prefix0(month)}-${prefix0(day)}` as DateString;
}

/** zero hour, minute, second and ms
 * @param  {Date} d
 */
export function clearHours(d: Date): Date {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

export function isToday(d: Date) {
  return dateToStandardString(new Date()) === dateToStandardString(d);
}

export function getCalendarDayDifference(date1: Date, date2: Date): number {
  // Normalize both dates to midnight UTC
  const startOfDay1 = new Date(
    Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
  );
  const startOfDay2 = new Date(
    Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );

  // Calculate the difference in days
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.abs((startOfDay1.getTime() - startOfDay2.getTime()) / msPerDay);
}

export function getHumanReadableDayDifference(
  date: Date,
  $t: (key: string) => string
) {
  const today = new Date();
  console.log("today: ", today, " date: ", date);
  const diff = getCalendarDayDifference(today, date);
  console.log("diff: ", diff);
  if (diff === 0) return $t("today");
  else if (diff === 1) return $t("tomorrow");
  return diff + $t("daysLater");
}
