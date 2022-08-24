import request from '@uni/request';
import { showToast } from '@uni/toast';

export const myRequest = (params) => {
  return new Promise((resolve, rej) => {
    request({
      ...params,
      url: 'https://www.fjrongshengda.com/lease-center/' + params.url,
      success: (res) => {
        if (res.data.code === '0') {
          resolve(res.data.data)
        } else {
          showToast({
            content: res.data.msg,
            type: 'fail',
            duration: 1000,
          });
          rej(res.data.msg)
        }
      },
    })
  })
}
