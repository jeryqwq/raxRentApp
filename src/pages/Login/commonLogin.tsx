import { createElement, useState } from 'rax';
import { Input, Icon, Radio } from '@alifd/meet';
import styles from './index.module.less';
import navigate from '@uni/navigate';
import { myRequest, naviTo } from '@/utils';
import { getStorageSync, setStorage } from '@uni/storage';
import { showToast } from '@uni/toast';

function Login() {
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [userType, setType] = useState(1)
  return (
    <div className={styles.commonwrap}>
      <div className={styles['title']}>登录融胜达工程机械网</div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{flex: 1}} className="item-tit">个人登录</span>
        <span style={{flex: 1}} className="item-tit">法人登录</span>
      </div> */}
      <Radio.Group
          size="large"
          direction="hoz"
          style={{margin: '10px'}}
          value={userType}
          onChange={(val) => {
            setType(val)
          }}
          dataSource={[
            {
              label: '个人登录',
              value: 1,
            },
            {
              label: '企业登录',
              value: 2,
            },
          ]}
        />
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
              userType: userType
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
      <div className="tip">
        <span>还没有账号？<span
      style={{ color: '#294A99' }}
      onClick={() => {
        navigate.push({
          url: '/pages/Login/registry'
        })
      }}
      >去注册</span></span>
      <span
      style={{ color: '#294A99' }}
      onClick={() => {
        naviTo('/pages/FindPwd/registry', '/findPwd')
      }}
      >找回密码</span>
      </div>
    </div>
  );
}

export default Login;
