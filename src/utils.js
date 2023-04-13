
/**
 * @function Returns the result of adding two numbers.
 * @param {number} a - The first number to add.
 * @param {number} b - The second number to add.
 * @returns {number} The sum of a and b.
 */
export function add(a, b) {
  return a + b;
}

/**
 * @function 输出 "Hello, World!" 在控制台
 * @returns {undefined}
 */
export function sayHello() {
  console.log('Hello, World!');
}
 
/**
 * @function 检查对象是否为空
 * @param {*} obj 
 * @returns {boolean} 是否为空 
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * @function 生成指定长度的随机ID
 * @param {number} length - ID的长度
 * @returns {string} 随机ID
 */
export function generateRandomID(length) {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    randomID += charSet[randomIndex];
  }
  return randomID;
}


/**
 * @function获取URL参数
 * @param {string} key 参数名字
 * @returns {string} 参数值
 */
export function getURLParam(key) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}

/**
 * @function 格式化日期
 * @param {Date} date 日期
 * @param {string} format 格式
 * @returns 格式化后的日期
 */
export function formatDate(date, format) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const keys = {
    'yyyy': year,
    'MM': month.toString().padStart(2, '0'),
    'M': month,
    'dd': day.toString().padStart(2, '0'),
    'd': day,
    'HH': hours.toString().padStart(2, '0'),
    'H': hours,
    'mm': minutes.toString().padStart(2, '0'),
    'm': minutes,
    'ss': seconds.toString().padStart(2, '0'),
    's': seconds,
  };

  let formattedDate = format;
  for (const key in keys) {
    formattedDate = formattedDate.replace(key, keys[key]);
  }

  return formattedDate;
}