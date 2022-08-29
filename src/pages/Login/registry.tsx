import { createElement, useRef, useState } from 'rax';
import styles from './index.module.less';
import navigate from '@uni/navigate';
import { myRequest } from '@/utils';
import { getStorage, setStorage } from '@uni/storage';
import { Form, Input, Radio, Switch, DatePicker, Checkbox, NumberPicker } from '@alifd/meet';
import { showToast } from '@uni/toast';
const opts = {
  labelAlign: 'top',
  contentAlign: 'left',
  labelWidth: 'auto',
  labelTextAlign: 'left',
  size: 'medium',
  isPreview: 0,
}
function Login() {
  const form = useRef(null);

  return (
    <div className={styles.commonwrap}>
      <div className={styles['title']}>融勝达注册</div>
      <Form ref={form} {...opts} scrollToFirstError onSubmit={async (values, errors) => {
        const openId = await getStorage({
          key: 'openid'
        })
        if (values) {
          if (values['repassword'] === values.psw) {
            const res = await myRequest({
              url: '/login/register',
              data: {
                ...values,
                openid: openId.data,
                type: 1
              },
              method: 'post',
            })
            showToast({
              content: '注册成功，请登录!',
              type: 'success',
            })
            navigate.push({
              url: '/pages/Login/commonLogin',
            })
          } else {
            showToast({
              content: '两次密码输入不一致!',
              type: 'fail',
            })
          }
        }
      }}>
        <Form.Item hasFeedback label="手机号" required format="tel" requiredMessage="手机号不能为空">
          <Input outline={false} name="phone" placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item hasFeedback label="验证码" required requiredMessage="手机验证码不能为空" style={{position: 'relative'}}>
          <Input outline={false} name="vcode" placeholder="请输入验证码" />
          <div
            style={{ width: '200rpx', color: '#0e5ecc', position: 'absolute', right: 0, zIndex: 3 }}
            onClick={async () => {
              const values = form.current.getValue()
              if (values.phone) {
                await myRequest({
                  url: '/login/getCode',
                  data: {
                    phone: values.phone,
                    service: 'register',
                  },
                  method: 'get',
                })
                showToast({
                  content: '验证码发送成功，请打开手机查看!',
                  type: 'success',
                })
              }
            }}
          >发送验证码</div>
        </Form.Item>
        <Form.Item
          label="登录密码"
          required
          requiredMessage="密码不能为空"
          minLength={6}
          maxLength={16}
          hasFeedback
          minmaxMessage="密码必须6-16位"
        >
          <Input name="psw" isPassword hasClear placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          label="确认登录密码"
          required
          requiredMessage="密码不能为空"
          minLength={6}
          maxLength={16}
          hasFeedback
          minmaxMessage="密码必须6-16位"
        >
          <Input name="repassword" isPassword hasClear placeholder="请输入确认密码" />
        </Form.Item>
        <Form.Item hasFeedback label="推广码" >
          <Input outline={false} name="shareCode" placeholder="推广码可不填写" />
        </Form.Item>
        <Form.Submit style={{ marginLeft: '40rpx' }} block type="primary"  className={styles['login']}>
          注册
        </Form.Submit>
      </Form>
    </div>
  );
}

export default Login;
