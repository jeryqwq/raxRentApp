import { CITYS, getBrand, getUuid, loadUser, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Dialog, Form, Input, NumberPicker, Radio, Select, UploadField } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useState } from 'rax';
let tempCity = [...CITYS]
tempCity.shift()
function Rent() {
  const [uuid, setUuid] = useState( getUuid())
  const [list, setList] = useState([])
  useEffect(() => {
    (async () => {
      const res2  = await myRequest({
        url: '/appdict/' + 'qztc',
        method: 'get'
      })
        setList(res2)
    })()
  }, [])
  return (
    <div>
      <Form scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          async function submit () {
            if(values) {
              const res = await myRequest({
                url: '/sourceTransportation',
                method: 'post',
                data:{...values, id: uuid}
              })
                showToast('发布成功!')
            }
          }
          const user = await loadUser()
          if(user.user.vipLevel !== 2) {
            // message.error('您还未缴纳会员费，请缴纳重新登录后重试!')
            Dialog.alert({
              footerActions: [],
              showIcon: false,
              content:  <Form scrollToFirstError onSubmit={async (values, error) => {
                if(values) {
                  await myRequest({
                    url: '/sysuserMember', 
                    method: 'post',
                    data: {
                      price	: 0,
                      userId: user.user.id,
                      ...values
                    }
                  })
                  submit()
                } else {
                  showToast("请完整输入信息")
                }
              }} >
                <Form.Item hasFeedback label="身份证号" required >
                  <Input outline={false} name="cardNum" placeholder="请输入身份证号" />
                </Form.Item>
                <Form.Item hasFeedback label="请选择缴纳的会费" required >
                  <Radio.Group dataSource={[{
                          label: '0',
                          value: 0
                        },{
                          label: '50',
                          value: 3,
                          disabled: true
                        },{
                          label: '100',
                          value: 4,
                          disabled: true

                        }]}
                        name="status"
                    />
                </Form.Item>
                <Form.Submit  type="primary" style={{width: '300rpx', height: '50px', margin: '20px 0 0 200rpx'}}>
                  确定
                </Form.Submit>
              </Form>
            })
          }else{
            submit()
          }
        }
      }}>
       
        <Form.Item hasFeedback label="司机姓名" required >
          <Input outline={false} name="name" placeholder="请输入司机姓名" />
        </Form.Item>
        <Form.Item hasFeedback label="联系电话" required requiredMessage="问题描述联系电话">
          <Input TextArea name="phone" rows={5} placeholder="请输入联系电话"/>
        </Form.Item>
        <Form.Item hasFeedback label="目前板车位置" required >
          <Input outline={false}  name="location" placeholder="请输入目前板车位置" />
        </Form.Item>
        <Form.Item hasFeedback label="希望运输目的地"  required requiredMessage="希望运输目的地不能为空">
          <Input outline={false}  name="destination" placeholder="请输入希望运输目的地" />
        </Form.Item>
       <Form.Item hasFeedback label="板车可装货物"  required requiredMessage="板车可装货物不能为空">
        <Input TextArea outline={false}  name="carrys" placeholder="请输入板车可装货物" />
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

export default Rent;
