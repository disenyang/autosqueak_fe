import env from '@/config';

/**
 * ncp接口
 */
import { generateRequestId, request } from './request';

let metas = {
  appName: 'melody',
  appVersion: '1.1.1',
};
let headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json;charset=UTF-8',
  accept: 'json',
};

export function setMetas(params) {
  metas = { ...metas, ...params };
}

export function getMetas() {
  return metas;
}

export function setHeaders(params) {
  headers = { ...headers, ...params };
}

export function getHeaders() {
  return headers;
}

export default async function invoke(
  servname,
  params = {},
  options = { exMetas: {}, exHeaders: {} },
) {
  const requestid = generateRequestId();
  const [service, method] = servname.split('.');
  const response = await request(`${env.ncp.alchemy}?method=${servname}`, {
    method: 'POST',
    headers: {
      ...headers,
      'x-eleme-requestid': requestid,
      ...options.exHeaders,
    },
    credentials: 'include',
    requestMode: 'cors',
    body: JSON.stringify({
      id: requestid,
      ncp: '2.0.0',
      metas: {
        ...metas,
        ...options.exMetas,
      },
      service,
      method,
      params,
    }),
  });
  if (response.error) {
    throw response.error;
  }
  return response.result;
}

invoke.alchemy = (...args) => invoke('alchemy', ...args);
invoke.arena = (...args) => invoke('arena', ...args);
