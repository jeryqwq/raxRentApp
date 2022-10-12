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
  const [vcode, setCcode] = useState('')
  const [uuid, setUuid] = useState(Math.random() * 99999 + "" + +new Date())
  const [userType, setType] = useState(1)

  return (
    <div className={styles.commonwrap}>
      <div className={styles['title']}>登录融胜达工程机械网</div>
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
      <div className="label">验证码</div>
      <div style={{ margin: '0 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Input placeholder="验证码" highlightable onChange={setCcode} style={{width: '500rpx'}}/>
      <img src={`https://www.fjrongshengda.com/lease-center/login/kaptcha?code=${uuid}`} style={{width: '100rpx', height: 47, cursor: 'pointer'}} onClick={()=>{
        setUuid(Math.random() * 9999 + "" + +new Date())
      }}/>
      </div>
      <div
        className={styles['login']}
        onClick={async () => {
          if (!pwd || !name) {
            showToast({
              content: '请输入登录名或者验证码',
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
              vcode,
              codeNum: uuid,
              userType:  userType
            }
          })
          localStorage.setItem('TK', res)
          if(res) {
            navigate.push({
              url: '#/'
            })
          }
        }}
      >
        登录
      </div>
      <div className="tip">
        <span>
        还没有账号？<span
      style={{ color: '#294A99' }}
      onClick={() => {
        naviTo('/pages/Login/registry', '/registry')
      }}
      >去注册</span>
        </span>
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
