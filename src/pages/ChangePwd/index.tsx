import { createElement } from 'rax';
import { Form, Input } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { loadUser, myRequest, naviTo } from '@/utils';

function ChangePwd() {
  return (
    <div>
      <Form onSubmit={async(vals) => {
        if(vals) {
          if(vals.newPassword === vals.repwd) {
            const user = await loadUser()
            await myRequest({
              url: '/apiuser/updatePassword', 
              method: 'post',
              data:{
                ...vals,
                phone: user?.user.phone
              }
            })
            showToast('修改成功!')
            naviTo('/pages/Index/index', '#/')
          }else{
            showToast({
              type: 'fail',
              content: '两次输入密码不一致'
            })
          }
        }
      }}>
        <Form.Item hasFeedback label="原始密码"  required requiredMessage="原始密码不能为空">
          <Input outline={false}  name="oldPassword" placeholder='请输入原始密码' />
        </Form.Item>
        <Form.Item hasFeedback label="新密码"  required requiredMessage="新密码不能为空">
          <Input outline={false}  keyboardType="password" name="newPassword" placeholder='请输入新密码'/>
        </Form.Item>
        <Form.Item hasFeedback label="再次输入新密码"  required requiredMessage="新密码不能为空">
          <Input outline={false} keyboardType="password" name="repwd" placeholder='请再次输入新密码'/>
        </Form.Item>
        <div style={{textAlign: 'center', margin: '20px auto'}}>
          <Form.Submit block type="primary">
                  提交
          </Form.Submit>
        </div>
      </Form>
    </div>
  );
}

export default ChangePwd;
