import { CITYS, getBrand, getUuid, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Form, Input, NumberPicker, UploadField, Select, Radio } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useState } from 'rax';
let tempCity = [...CITYS]
tempCity.shift()
function Rent() {
  const [uuid, setUuid] = useState( getUuid())
  return (
    <div>
      <Form scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          const res = await myRequest({
            url: '/equipmentRent',
            method: 'post',
            data: {...values, id: uuid, releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}
          })
          showToast({
            type: 'success',
            content: '新增成功!'
          })
          naviTo('/pages/Index/index', '/')
        }
      }}>
        <div style={{fontSize: '18px', margin: '10px'}}>
          发布地址
        </div>
        <Form.Item hasFeedback label="请选择发布城市" required >
          <CascaderSelect
            dataSource={tempCity}
            name="releaseCityName" 
            placeholder="请选择省市" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="详细地址" required requiredMessage="详细地址不能为空">
          <Input outline={false} name="detailAddress" placeholder="请输入详细地址" />
        </Form.Item>
        <div style={{fontSize: '18px', margin: '10px'}}>
          联系人信息
        </div>
        <Form.Item hasFeedback label="联系人"  required requiredMessage="联系人不能为空">
          <Input outline={false}  name="contactName" placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item hasFeedback label="联系人电话"  required requiredMessage="手机号码不能为空">
          <Input outline={false}  name="contactNumber" placeholder="请输入手机号码" />
        </Form.Item>

       <div style={{fontSize: '18px', margin: '10px'}}>
          设备需求
        </div>
        <Form.Item hasFeedback label="设备名称" required requiredMessage="设备名称不能为空">
          <Input outline={false} name="equipName" placeholder="请输入设备名称" />
        </Form.Item>
        <Form.Item hasFeedback label="设备型号" required requiredMessage="设备型号不能为空">
          <Input outline={false} name="equipType" placeholder="请输入设备型号" />
        </Form.Item>
        <Form.Item hasFeedback label="需求数量" required requiredMessage="需求数量不能为空">
          <NumberPicker name="demandAmount" min={1}  defaultValue={1} />
        </Form.Item>
        <Form.Item hasFeedback label="工期长度/天" required requiredMessage="工期长度不能为空">
          <NumberPicker name="projectDuration" min={1}  defaultValue={1} />
        </Form.Item>
        <Form.Item hasFeedback label="进场时间" required requiredMessage="进场时间不能为">
          <DatePicker name="startTime" placeholder="请选择进场时间" />
        </Form.Item>
        <div style={{fontSize: '18px', margin: '10px'}}>
          起他信息
        </div>
        <Form.Item label="发票">
          <Radio.Group direction="hoz" dataSource={[{
            label: '不需要',
            value: 0
          },{
            label: '增值税普票',
            value: 1
          }, {
            label: '增值税专票',
            value:2
          }]} name="invoiceType" />
        </Form.Item>
        <Form.Item label="机手">
          <Radio.Group direction="hoz" dataSource={[{
            label: '需要',
            value:1
          },{
            label: '不需要',
            value: 0
          }]} name="reqOperator" />
        </Form.Item>
        <Form.Item label="付款方式">
          <Radio.Group direction="hoz" dataSource={[{
            label: '预付',
            value: 1
          },{
            label: '后付',
            value: 2
          }, {
            label: '现付',
            value: 3
          }]} name="paymentMethod" />
        </Form.Item>
        <Form.Item hasFeedback label="备注说明" required requiredMessage="备注说明不能为空">
          <Input TextArea name="description" rows={5} placeholder="请对运输方式、原材料（如燃油）提供、应用情况、环境工况、特殊配置等的说明（限100字）"/>
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
