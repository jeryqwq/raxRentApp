import request from '@uni/request';
import { showToast } from '@uni/toast';
import { getStorage } from '@uni/storage';
import navigate from '@uni/navigate';

export const myRequest = (params) => {
  return new Promise((resolve, rej) => {
    (async () => {
      const code = await getStorage({
        key: 'token',
      })
      request({
        ...params,
        headers: {
          Authorization: `bearer ${ code.data }`,
        },
        url: 'https://www.fjrongshengda.com/lease-center/' + params.url,
        success: (res) => {
          if (res.data.code === '0') {
            resolve(res.data.data)
          }else if ( res.data.code === '401' ) {
            showToast({
              content: res.data.msg,
              type: 'fail',
              duration: 1000,
            });
            navigate.push({
              url: '/pages/Login/index'
            })
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
    })()
  })
}
