/**
 * 各种常量数据
 */
export const SERVER_ERROR_MESSAGE = '';

export const formatTimeWithStamp = (val, format) => {
  if (!val) {
    return '';
  }
  const time = new Date(val);
  switch (format) {
    case 'yyyy-mm-dd':
      return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    case 'yyyy-mm-dd hh:mm:ss':
      return `${time.getFullYear()}-${time.getMonth() +
        1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    default:
      return '';
  }
};

export const formatTime = (val, format) => {
  if (!val) {
    return '';
  }
  const time = val;
  switch (format) {
    case 'yyyy-mm-dd':
      return `${time.year}-${time.monthValue}-${time.dayOfMonth}`;
    case 'yyyy-mm-dd hh:mm:ss':
      return `${time.year}-${time.monthValue}-${time.dayOfMonth} ${time.hour}:${time.minute}:${time.second}`;
    default:
      return '';
  }
};
