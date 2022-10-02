import { myRequest, naviTo } from '@/utils';
import { Button, Form, Input } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { createElement, useRef } from 'rax';

function FIndPwd() {
  const ref = useRef<FormComponent>()
  return (
   <div>
      <div style={{ fontSize: '30px', margin: '40px 40px 40px 20px' }}>重置密码</div>

     <Form  ref={ref} defaultValue={{ }}  scrollToFirstError onSubmit={async (values, errors) => {
        if (values) {
          await myRequest({
            url: '/login/forgetPswVcode',
            method: 'post',
            data: {
              ...values
            }
          })
          showToast('重置密码成功!')
          naviTo('/pages/Index/index', '/')
        }
      }}
      >
      <Form.Item hasFeedback label="请输入手机号" required style={{ position: 'relative' }} >
        <Input outline={false} name="phone" placeholder="请输入手机号" />
          <span style={{ color: '#105cce',position: 'absolute', right: '20px' }} 
            onClick={async() => {
              const {phone} = ref.current?.getValue(['phone'])
              if(/^1[3-9]\d{9}$/.test(phone)) {
                await myRequest({
                  url: '/login/getCode',
                  method: 'get',
                  data: {
                    phone,
                    service: 'forget'
                  }
                })
                showToast('验证码发送成功，请在手机短信查看')
              }else{
                showToast({
                  type: 'fail',
                  content: '手机号验证失败'
                })
              }
            }}
          >发送验证码</span>
      </Form.Item>
      <Form.Item hasFeedback label="请输入验证码" required  >
        <Input outline={false} name="vcode" placeholder="请输入验证码" />
      </Form.Item>
      <Form.Item hasFeedback label="请输入新密码" required  >
        <Input keyboardType="password" name="password" placeholder="请输入新密码" />
      </Form.Item>
        <Form.Submit type="primary" style={{ margin: '40px 0 0 300rpx' }}>
          提交
        </Form.Submit>
      </Form>
   </div>
  );
}

export default FIndPwd;
