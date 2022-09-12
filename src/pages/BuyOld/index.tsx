import { CITYS, getBrand, getUuid, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Form, Input, NumberPicker, Select, UploadField } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useState } from 'rax';
let tempCity = [...CITYS]
tempCity.shift()
function Rent() {
  const [uuid, setUuid] = useState( getUuid())
  const [prodTypes, setProds] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    (async () => {
      const res = await myRequest({
        url: '/equipmentType/tree',
        method: 'get'
      })
      function trans (items: any[], parent?: any): any {
        return items.map((i: any) => {
          return ({label: i.name, value: i.id, children: i.children ? trans(i.children, i) : undefined})
        })
      }
      setProds(trans(res))
      const res2 = await getBrand()
      setBrands(res2.map((i: any) => ({label: i.brandName, value: i.brandName})))
    })()
  }, [])
  return (
    <div>
      <Form scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          const res = await myRequest({
            url: '/equipmentPurchase',
            method: 'post',
            data: {...values, id: uuid, equipType: values.equipType[values.equipType.length - 1], releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}
          })
          showToast({
            type: 'success',
            content: '新增成功!'
          })
          naviTo('/pages/Index/index', '/')
        }
      }}>
        <div style={{fontSize: '18px', margin: '10px'}}>
          设备信息
        </div>
        <Form.Item hasFeedback label="请选择发布城市" required >
          <CascaderSelect
            dataSource={tempCity}
            name="releaseCityName" 
            placeholder="请选择省市" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="联系人电话"  required requiredMessage="手机号码不能为空">
          <Input outline={false}  name="contactNumber" placeholder="请输入手机号码" />
        </Form.Item>
       <div style={{fontSize: '18px', margin: '10px'}}>
          设备信息
        </div>
        <Form.Item hasFeedback label="请选择设备类型" required >
          <CascaderSelect
            dataSource={prodTypes}
            name="equipType" 
            placeholder="请选择设备类型" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="设备品牌" required requiredMessage="设备品牌不能为空">
          <Select
            dataSource={brands}
            name="equipBrand" 
            placeholder="请选择设备品牌" 
          />
        </Form.Item>
       
        <Form.Item hasFeedback label="设备型号" required requiredMessage="设备型号不能为空">
          <Input outline={false} name="equipModel" placeholder="请输入设备型号" />
        </Form.Item>
        <Form.Item hasFeedback label="详细说明" required requiredMessage="详细说明不能为空">
          <Input TextArea name="remark" rows={5} placeholder="请对设备的技术参数、设备状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字）"/>
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
