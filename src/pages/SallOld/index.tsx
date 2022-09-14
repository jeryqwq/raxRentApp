import { CITYS, getBrand, getUuid, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Form, Input, NumberPicker, Select, UploadField } from '@alifd/meet';
import { navigate } from '@uni/apis';
import { isWeChatMiniProgram } from '@uni/env';
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
            url: '/equipmentSale',
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
        <Form.Item hasFeedback label="设备名称" required requiredMessage="设备名称不能为空">
          <Input outline={false} name="equipName" placeholder="请输入设备名称" />
        </Form.Item>
        <Form.Item hasFeedback label="联系人电话"  required requiredMessage="手机号码不能为空">
          <Input outline={false}  name="contactNumber" placeholder="请输入手机号码" />
        </Form.Item>
        <div style={{fontSize: '18px', margin: '10px'}}>
          设备图片
        </div>
       <Form.Item label="请上传主图(一张)" >
        <UploadField
            limit={1}
            formatter={(response, file) => {
              console.log(response)
              return {
                success: response.status === 200,
                url: file.imgURL,
                img: response.data.data.path

              };
            }}
            data={{
              serviceId: uuid,
              serviceType: 'MAIN_IMG',
              sort: 0

            }}
            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
            onSuccess={(item, value) => console.log('onSuccess', item)}
            onError={(item, value) => console.log('error', item)}
          />
       </Form.Item>
       <Form.Item label="请上传副图(最多10张)" >
        <UploadField
            limit={10}
            formatter={(response, file) => {
              console.log(response)
              return {
                success: response.status === 200,
                url: file.imgURL,
                img: response.data.data.path
              };
            }}
            data={{
              serviceId: uuid,
              serviceType: 'DETAIL_IMG',
              sort: 0
            }}
            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
            onSuccess={(item, value) => console.log('onSuccess', item)}
            onError={(item, value) => console.log('error', item)}
          />
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
        <Form.Item hasFeedback label="设备型号" required requiredMessage="设备型号不能为空">
          <Select
            dataSource={brands}
            name="equipModel" 
            placeholder="请选择设备型号" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="出厂日期" required requiredMessage="出厂日期不能为">
          <DatePicker name="productionDate" placeholder="请选择出厂日期" />
        </Form.Item>
        <Form.Item hasFeedback label="工作小时数" required requiredMessage="工作小时数不能为空">
          <NumberPicker inputStyle={{width: '300rpx'}}  name="workTime" min={0}  defaultValue={0} />
        </Form.Item>
        <Form.Item hasFeedback label="整机序列号" required requiredMessage="整机序列号不能为空">
          <Input outline={false} name="serialNumber" placeholder="请输入整机序列号" />
        </Form.Item>
        <Form.Item hasFeedback label="出售价格" required requiredMessage="出售价格不能为空">
          <NumberPicker inputStyle={{width: '300rpx'}} name="salePrice" min={0}  defaultValue={0} />
        </Form.Item>
        <Form.Item hasFeedback label="详细说明" required requiredMessage="详细说明不能为空">
          <Input TextArea name="description" rows={5} placeholder="请对设备的技术参数、设备状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字"/>
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
