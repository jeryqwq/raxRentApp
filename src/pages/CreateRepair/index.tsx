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
  const [files, setFiles] = useState<string[]>([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    (async () => {
      const res2 = await getBrand()
      setBrands(res2.map((i: any) => ({label: i.brandName, value: i.brandName})))
    })()
  }, [])
  return (
    <div>
        <div style={{fontSize: '18px', margin: '10px'}}>
          维护需求
        </div>
      <Form scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          const res = await myRequest({
            url: '/equipmentRepairInfo',
            method: 'post',
            data: {...values, 
              
              id: uuid,releaseCityName:  Array.isArray(values.releaseCityName) ? values.releaseCityName.join(',') : values.releaseCityName}
          })
          showToast({
            type: 'success',
            content: '新增成功!'
          })
          naviTo('/pages/Index/index', '/')
        }
      }}>
       
        <Form.Item hasFeedback label="品牌" required requiredMessage="请选择设备品牌">
        <Select
            dataSource={brands}
            name="equipBrand" 
            placeholder="请选择品牌" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="设备型号" required >
          <Input outline={false} name="equipModel" placeholder="请输入设备型号" />
        </Form.Item>
        <Form.Item hasFeedback label="问题描述" required requiredMessage="问题描述不能为空">
          <Input TextArea name="problemDesc" rows={5} placeholder="请输入问题描述"/>
        </Form.Item>
      
       <Form.Item label="请上传相关图片" >
        <UploadField
            limit={10}
            formatter={(response, file) => {
              return {
                success: response.status === 200,
                url: file.imgURL,
                img: response.data.data.path
              };
            }}
            onChange={(files) => {
              setFiles(files.map(i => i.response.img))
            }}
            data={{
              serviceId: uuid,
              serviceType: 'MAIN_IMG',
              sort: 0
            }}
            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
          />
       </Form.Item>
       <div style={{fontSize: '18px', margin: '10px'}}>
          联系方式
        </div>
       <Form.Item hasFeedback label="联系人"  required requiredMessage="联系人不能为空">
          <Input outline={false}  name="contactName" placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item hasFeedback label="联系人电话"  required requiredMessage="手机号码不能为空">
          <Input outline={false}  name="contactNumber" placeholder="请输入手机号码" />
        </Form.Item>

       <Form.Item hasFeedback label="请选择发布城市" required >
          <CascaderSelect
            dataSource={tempCity}
            name="releaseCityName" 
            placeholder="请选择省市" 
          />
        </Form.Item>
        <Form.Item hasFeedback label="详细地址"  required requiredMessage="详细地址不能为空">
          <Input outline={false}  name="detailAddress" placeholder="请输入详细地址" />
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
