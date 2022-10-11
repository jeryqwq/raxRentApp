import { createElement, useEffect } from 'rax';
import styles from './index.module.less';
import Image from 'rax-image';
import { isWeChatMiniProgram } from '@uni/env';
import { wxAutoLogin } from '@/utils';
import navigate from '@uni/navigate';

function Login() {
  useEffect(() => {
    
    if (isWeChatMiniProgram) {
      wxAutoLogin()
    }
  }, [])
  return (
    <div>
      <div className={styles['login-wrap']}>
        <img style={{ width: '600rpx', height: '300rpx' }} src={'https://www.fjrongshengda.com/icons/head2.png'}/>
        <div
          onClick={() => {
            if (isWeChatMiniProgram) {
              wxAutoLogin()
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
        <div>登录代表您同意融胜达的</div>
      <div style={{color: "#294A99"}}>用户服务协议、隐私政策</div>
      </div>
    </div>
  );
}

export default Login;
