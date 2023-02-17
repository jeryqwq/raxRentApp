import { CITYS, getBrand, getUuid, loadUser, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Dialog, Form, Input, NumberPicker, Radio, Select, UploadField } from '@alifd/meet';
import { navigate } from '@uni/apis';
import { isWeChatMiniProgram } from '@uni/env';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useState } from 'rax';
let tempCity = [...CITYS]
tempCity.shift()
function Rent() {
 
  return (
    <div>
      <Form scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          async function submit () {
            if(values) {
              const res = await myRequest({
                url: '/robotrecreuitment',
                method: 'post',
                data:{...values,  provinceName: values.citys[0],
                  countyName: values.citys[1],}
              })
              showToast('发布成功!')
               naviTo('/pages/Index/index', '/')
            }
          }
          submit()
        }
      }}>
       
        <Form.Item hasFeedback label="待遇" required >
          <Input outline={false} name="salary" />
        </Form.Item>
        <Form.Item hasFeedback label="要求" required>
          <Input TextArea name="skillRequirements" rows={5} />
        </Form.Item>
        <Form.Item hasFeedback label="工作年限" required>
          <Input TextArea name="workingYears" rows={5} />
        </Form.Item>
        <Form.Item hasFeedback label="请选择发布城市" required >
          <CascaderSelect
            dataSource={tempCity}
            name="citys" 
            placeholder="请选择省市" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="详细地址"  required requiredMessage="详细地址不能为空">
          <Input outline={false}  name="address" placeholder="请输入详细地址" />
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
