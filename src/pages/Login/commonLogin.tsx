import { createElement, useState } from 'rax';
import { Input, Icon } from '@alifd/meet';
import styles from './index.module.less';
import navigate from '@uni/navigate';
import { myRequest } from '@/utils';
import { getStorageSync, setStorage } from '@uni/storage';
import { showToast } from '@uni/toast';

function Login() {
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  return (
    <div className={styles.commonwrap}>
      <div className={styles['title']}>登录融勝达</div>
      <div className="label">手机号</div>
      <div style={{ margin: '0 10px' }}><Input placeholder="用户名" highlightable onChange={setName} /></div>
      <div className="label">登录密码</div>
      {/* <Icon type="lock" style={{ margin: '0px 10px 0 0' }} /> */}
      <div style={{ margin: '0 10px' }}><Input placeholder="请输入密码" keyboardType="password" onChange={setPwd} /></div>
      <div
        className={styles['login']}
        onClick={async () => {
          const openid =  getStorageSync({
            key: 'openid',
          })
          if (!pwd || !name) {
            showToast({
              content: '请输入登录名或者验证码',
              type: 'fail',
            })
            return
          }
          if (!openid.data) {
            showToast({
              content: 'openId读取异常，请重新登录',
              type: 'fail',
            })
            return
          }
          const res = await myRequest({
            url: '/login/pclogin',
            method: 'get',
            data: {
              password: pwd,
              username: name,
              openid: openid.data,
            }
          })
          setStorage({
            key: 'TK',
            data: res
          })
          if(res) {
            navigate.push({
              url: '/pages/Login/index'
            })
          }
        }}
      >
        登录
      </div>
      <div className="tip">还没有账号？<span
      style={{ color: '#294A99' }}
      onClick={() => {
        navigate.push({
          url: '/pages/Login/registry'
        })
      }}
      >去注册</span></div>
    </div>
  );
}

export default Login;
