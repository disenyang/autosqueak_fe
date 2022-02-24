// import 'abort-controller/polyfill';
// import AbortController from 'abort-controller';
import { asyncTimeout } from '../util/asyncUtils';
import { SERVER_ERROR_MESSAGE } from '../constants';
import { Modal, Toast } from 'antd-mobile';

const TIMEOUT = 5000;

/**
 * 申请RequestID
 */
export function generateRequestId() {
  const id = `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx|${Date.now()}`.replace(/x/g, () =>
    // eslint-disable-next-line radix
    parseInt(Math.random() * 16).toString(16),
  );
  return id.toUpperCase();
}

/**
 * 发送请求（fetch）
 * @param {string} url
 * @param {object} init
 */
export async function request(url, init) {
  // const controller = new AbortController();
  try {
    const response = await asyncTimeout(fetch(url, { ...init }), TIMEOUT);
    if (response.status >= 500) {
      let errData;
      try {
        errData = await response.json();
      } catch (e) {
        errData = {
          message: await response.text(),
        };
      }
      console.error(errData);
      throw new Error(SERVER_ERROR_MESSAGE);
    }
    const res = await response.json();
    console.log("res=====",res);
    if(res.error==='Invalid Token'){
      window.location.href = "/#/login";
    }else{
      return res;
    }
    
  } catch (error) {
    if (error === 'timeout') {
      try {
        // controller.abort();
      } catch (err) {
        console.error(err);
      }
      const err = new Error('请求超时');
      err.code = 'TIMEOUT';
      throw err;
    }
    throw error;
  }
}
