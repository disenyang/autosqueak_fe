
import { extend } from '@alipay/bigfish/sdk/request';
import { notification } from '@alipay/bigfish/antd';
import history from '@alipay/bigfish/sdk/history';

const codeMessage = {
  
};

const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  notification.error({
    message: `request error ${status}: ${url}`,
    description: errortext,
  });

  if (status === 401) {
    
  } // environment should not be used

  if (status === 403) {
    history.push('/exception/403');
    return;
  }

  if (status <= 504 && status >= 500) {
    history.push('/exception/500');
    return;
  }

  if (status >= 404 && status < 422) {
    history.push('/exception/404');
  }
};


const request = extend({
  errorHandler,
  credentials: 'include', 
});
export default request;
