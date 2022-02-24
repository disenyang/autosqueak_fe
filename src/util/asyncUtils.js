/**
 * 异步超时
 * @param {*} promise
 * @param {*} timeout
 */
export function asyncTimeout(promise, timeout) {
  return Promise.race([
    promise,
    // eslint-disable-next-line prefer-promise-reject-errors
    new Promise((resolve, reject) => setTimeout(() => reject('timeout'), timeout)),
  ]);
}
