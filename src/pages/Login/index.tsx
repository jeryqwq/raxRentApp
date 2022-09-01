import { createElement, useEffect } from 'rax';
import styles from './index.module.less';
import Image from 'rax-image';
import { isWeChatMiniProgram } from '@uni/env';
import { myRequest } from '@/utils';
import navigate from '@uni/navigate';
import { setStorage } from '@uni/storage';
import { showToast } from '@uni/toast';

function Login() {
  useEffect(() => {
    if (isWeChatMiniProgram) {
      wx.login({
        success: async (res) => {
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
              data: { openid },
              url: '/login/openIdLogin',
              method: 'get',
            })
            if (res3) {
              setStorage({
                key: 'token',
                data: res3,
              });
              navigate.push({
                url: '/pages/Index/index',
              })
              showToast({
                content: '登录成功!',
                type: 'success',
                duration: 1000,
              });
            }
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
      })
    }
  }, [])
  return (
    <div>
      <div className={styles['login-wrap']}>
        <Image style={{ width: '600rpx', height: '300rpx' }} source={{ uri: 'https://www.fjrongshengda.com/icons/head2.png'}}/>
        <div
          onClick={() => {
            if (isWeChatMiniProgram) {
              wx.login({
                success: async (res) => {
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
                      data: { openid },
                      url: '/login/openIdLogin',
                      method: 'get',
                    })
                    if (res3) {
                      setStorage({
                        key: 'token',
                        data: res3,
                      });
                      navigate.push({
                        url: '/pages/Index/index',
                      })
                      showToast({
                        content: '登录成功',
                        type: 'success',
                        duration: 1000,
                      });
                    }else{

                    }
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                },
              })
            }
          }}
          className={'login'}
          style={{ marginTop: '70px' }}
        >
          微信用户一键登录
        </div>
        <div
          className={'login reg'}
          onClick={() => {
            navigate.push({
              url: '/pages/Login/commonLogin',
            })
          }}
        >
          手机号登录注册
        </div>
      </div>
      <div style={{ fontSize: '14px', color: '#999', textAlign: 'center', marginTop: '30rpx' }}>
        <div>登录代表您同意融勝达的</div>
      <div style={{color: "#294A99"}}>用户服务协议、隐私政策</div>
      </div>
    </div>
  );
}

export default Login;
