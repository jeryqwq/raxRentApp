import { isWeChatMiniProgram } from '@uni/env';

export const request =  ({ url, data, params, method }) =>  {
  if(isWeChatMiniProgram) {
    return wx.request({
      url,
      data,
      params,
      method
    })
  }
}
