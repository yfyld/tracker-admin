/**

获取本周、本季度、本月、上月的开端日期、停止日期
*/
const now = new Date(); //当前日期
const nowDayOfWeek = now.getDay(); //今天本周的第几天
const nowDay = now.getDate(); //当前日
const nowMonth = now.getMonth(); //当前月
let nowYear = now.getFullYear(); //当前年
nowYear += nowYear < 2000 ? 1900 : 0; //
const lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
const lastYear = lastMonthDate.getFullYear();
const lastMonth = lastMonthDate.getMonth();

//获得某月的天数
export function getMonthDays(myMonth: number) {
  var monthStartDate = new Date(nowYear, myMonth, 1).getTime();
  var monthEndDate = new Date(nowYear, myMonth + 1, 1).getTime();
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//获得本季度的开端月份
export function getQuarterStartMonth() {
  var quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

//获得本周的开端日期
export function getWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek).setHours(0, 0, 0, 0);
}

//获得本周的停止日期
export function getWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)).setHours(23, 59, 59, 999);
}

//获得本月的开端日期
export function getMonthStartDate() {
  return new Date(nowYear, nowMonth, 1).setHours(0, 0, 0, 0);
}

//获得本月的停止日期
export function getMonthEndDate() {
  return new Date(nowYear, nowMonth, getMonthDays(nowMonth)).setHours(23, 59, 59, 999);
}

//获得上月开端时候
export function getLastMonthStartDate() {
  return new Date(nowYear, lastMonth, 1).setHours(0, 0, 0, 0);
}

//获得上月停止时候
export function getLastMonthEndDate() {
  return new Date(nowYear, lastMonth, getMonthDays(lastMonth)).setHours(23, 59, 59, 999);
}

//获得本季度的开端日期
export function getQuarterStartDate() {
  return new Date(nowYear, getQuarterStartMonth(), 1).setHours(0, 0, 0, 0);
}

//获得上季度的开端日期
export function getLastQuarterStartDate() {
  const nowQuarter = getQuarterStartMonth();
  let lastQuarter = nowQuarter - 3;
  let year = nowYear;
  if (nowQuarter === 1) {
    lastQuarter = 10;
    year = nowYear - 1;
  }
  return new Date(year, lastQuarter, 1).setHours(0, 0, 0, 0);
}

//获得本年的开端日期
export function getYearStartDate() {
  return new Date(nowYear, 0, 1).setHours(0, 0, 0, 0);
}

//获得去年的开端日期
export function getLastYearStartDate() {
  return new Date(nowYear - 1, 0, 1).setHours(0, 0, 0, 0);
}
