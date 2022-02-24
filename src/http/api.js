import { destroyFns } from 'antd/lib/modal/Modal';
import env from '../config/config';
import { request } from './request';

export async function post(pathname, data) {
  let res = await apiDo('post',pathname,data);
  return res;
}

export async function put(pathname, data) {
  let res = await apiDo('put',pathname,data);
  return res;
}

export async function get(pathname, data) {
  let res = await apiDo('get',pathname,data);
  return res;
}

export async function apiDo(method,pathname, data) {
  try {
    const requestID = `${uuid()
      .replace(/-/g, '')
      .toUpperCase()}|${Date.now()}`;
    
      if(method==="post" || method==="put"){
        const response = await request(`${env.prefix}${pathname}`, {
          method: method,
          // requestMode: "cors",
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Eleme-RequestID': requestID,
            Authorization:localStorage.getItem("token")
          },
          params: { method: pathname },
          body: JSON.stringify(data),
        });
        return response;
      }else{
        const response = await request(`${env.prefix}${pathname}`, {
          method: method,
          // requestMode: "cors",
          headers: {
            Accept: 'application/json, text/plain, */*',
            'X-Eleme-RequestID': requestID,
            Authorization:localStorage.getItem("token")
          },
          params: { method: pathname },
        });
        console.log("response===",response);
        if(response.error==='Invalid Token'){
          window.location.href = "/login";
        }else{
          return response;
        }
        
      }
    

    
  } catch (err) {
    console.error(err)
    return { result: null, error: '系统异常，请稍后再试' };
  }
}

/**
 * 生成uuid
 * @returns {string}
 */
export default function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
