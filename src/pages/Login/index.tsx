import { createElement } from 'rax';
import styles from './index.module.less';
import Image from 'rax-image';
import { isWeChatMiniProgram } from '@uni/env';
import { myRequest } from '@/utils';
import { setStorage } from '@uni/storage';

function Login() {
  return (
    <div>
      <div className={styles['login-wrap']}>
        <Image style={{width: '600rpx', height: '300rpx'}} source={{ uri: 'http://121.204.145.151:8087/icons/head2.png'}}/>
        <div
          onClick={() => {
          if (isWeChatMiniProgram) {
            wx.login({
              success: async (res) =>  {
                if (res.code) {
                  const res2 = await myRequest({
                    data: { code: res.code },
                    mehtod: 'get',
                    url: 'login/getOpenId',
                  })
                    const { openid } = res2;
                    setStorage({
                      key: 'openid',
                      data: openid,
                    });
                  const res3 = await myRequest({
                    data: {openid},
                    url: "/login/openIdLogin",
                    method: 'get'
                  })
                  if(res3) {
                    console.log(res3)
                    // setStorage({
                    //   key: 'key',
                    //   data: res3,
                    // });
                  }
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              },
            })
          }
        }} 
        className={'login'} style={{marginTop: '70px'}}>
          微信用户一键登录
        </div>
        <div className={'login reg'}>
          手机号登录注册
        </div>
      </div>
      <div style={{fontSize: '14px', color: '#999', textAlign: 'center', marginTop: '30rpx'}}>
        <div>登录代表您同意融勝达的</div>
      <div style={{color: "#294A99"}}>用户服务协议、隐私政策</div>
      </div>
    </div>
  );
}

export default Login;
