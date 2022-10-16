import { CITYS, getBrand, getUuid, loadUser, myRequest, naviTo } from '@/utils';
import { CascaderSelect, DatePicker, Form, Input, NumberPicker, Select, UploadField } from '@alifd/meet';
import { FormComponent } from '@alifd/meet/types/form';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useLayoutEffect, useRef, useState } from 'rax';
import { getSearchParams } from 'rax-app';
let tempCity = [...CITYS]
tempCity.shift()
function genFile(url1){
  const url = 'https://www.fjrongshengda.com/lease-center/' + url1
  return {
    dataURL: url,
    downloadURL: url,
    file: url,
    imgURL: url,
    isImage: true,
    name: "file",
    percent: 100,
    response: {success: true, url: url1, img: url1,},
    state: "done",
    uid: url,
    url
  }
}
function Rent() {
  const [uuid, setUuid] = useState( getUuid())
  const [yyzzUrlfileList, setFileList] = useState<any[]>([])
  const [cardUrl1fileList, setFileList1] = useState<any[]>([])
  const [cardUrl2fileList, setFileList2] = useState<any[]>([])
  const [otherfileList, setOthers] = useState<any[]>([])
  const {user: userId} = getSearchParams()
  const [user, setUser] = useState({})
  const ref = useRef<FormComponent>()
  console.log(userId)
  useEffect(() => {
    setTimeout(() => {
      (async () => {
        const res = await myRequest({ url: '/sysOrgan/findMy', method: 'get', data: { type: 1 } })
         ref.current?.setValue(res)
         if(res) {
           if(res.status === 1) {
             showToast('您已认证过，不需要认证了')
             naviTo('/pages/Index/index', '/')
             return
           }
           res?.yyzzUrl && setFileList([genFile(res?.yyzzUrl)])
           res?.cardUrl1 && setFileList1([genFile(res?.cardUrl1)])
           res?.cardUrl2 && setFileList2([genFile(res?.cardUrl2)])
           res?.otherUrl && setOthers(res?.otherUrl.split(',').map(i => genFile(i)))
          }else{
           const res2 = await myRequest( {url: '/sysOrgan/findMy', method: 'get', data: { type: 2 } })
            ref.current?.setValue(res2)
            res2?.yyzzUrl && setFileList([genFile(res2?.yyzzUrl)])
            res2?.cardUrl1 && setFileList1([genFile(res2?.cardUrl1)])
            res2?.cardUrl2 && setFileList2([genFile(res2?.cardUrl2)])
            res2?.otherUrl && setOthers(res2?.otherUrl.split(',').map(i => genFile(i)))
          }
       })()
    }, 0);
    (async () => {
      const res = await loadUser()
      setUser(res)
    })()
  }, [])
  return (
    <div>
      <Form ref={ref} scrollToFirstError onSubmit={async (values, error) => {
        if(values) {
          await myRequest({
            url: '/sysOrgan',
            method: 'post',
            data: {
              ...values, 
              id: uuid,
              yyzzUrl: yyzzUrlfileList[0]?.response?.img, // items.map(i => i.response.img)
              cardUrl1: cardUrl1fileList[0]?.response?.img,
              cardUrl2: cardUrl2fileList[0]?.response?.img,
              otherUrl: otherfileList?.map(i => i?.response?.img).join(','),
              type: 1,
              serverId: userId,
              serverType: 'user',
              compName: values.name
            }
          })
          showToast({
            type: 'success',
            content: '新增成功!'
          })
          naviTo('/pages/Index/index', '/')
        }
      }}>
        <div style={{fontSize: '18px', margin: '10px'}}>
          企业信息
        </div>
        <Form.Item hasFeedback label="请输入联系人"  >
          <Input outline={false} name="callUser" placeholder="请输入联系人" />
        </Form.Item>
        <Form.Item hasFeedback label="联系电话"   requiredMessage="手机号码不能为空">
          <Input outline={false}  name="callPhone" placeholder="请输入手机号码" />
        </Form.Item>
        <Form.Item hasFeedback label="企业名称"  >
          <Input outline={false} name="name" placeholder="请输入企业名称" />
        </Form.Item>
        <Form.Item hasFeedback label="统一社会信用代码" required={user.brand}  requiredMessage="统一社会信用代码不能为空">
          <Input outline={false}  name="compCode" placeholder="请输入统一社会信用代码" />
        </Form.Item>
       <Form.Item label="企业营业执照" >
        <UploadField
            limit={1}
            formatter={(response, file) => {
              return {
                success: response.status === 200,
                url: file.imgURL,
                img: response.data.data.path
              };
            }}
            data={{
              serviceId: uuid,
              serviceType: 'AUTH_IMG',
              sort: 0
            }}
            onChange={(items) => {
              setFileList(items.map(i => i.response.img))
            }}
            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
          />
       </Form.Item>
       <div style={{fontSize: '18px', margin: '10px'}}>
          个人信息
        </div>
        <Form.Item hasFeedback label="个人姓名"  >
          <Input outline={false} name="legalUser" placeholder="请输入个人姓名" />
        </Form.Item>
        <Form.Item hasFeedback label="个人身份证号码" required={!user.brand}  requiredMessage="个人身份证号码不能为空">
          <Input outline={false}  name="legalIdCard" placeholder="请输入个人身份证号码" />
        </Form.Item>
        <Form.Item hasFeedback label="身份证正面"  >
        <UploadField
            limit={1}
            formatter={(response, file) => {
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
            value={cardUrl1fileList}
            onChange={(items) => {
              setFileList1(items)
            }}
            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
            onSuccess={(item, value) => console.log('onSuccess', item)}
            onError={(item, value) => console.log('error', item)}
          />
        </Form.Item>
        <Form.Item hasFeedback label="身份证反面"  >
          <UploadField
              limit={1}
              formatter={(response, file) => {
                return {
                  success: response.status === 200,
                  url: file.imgURL,
                  img: response.data.data.path
                };
              }}
              value={cardUrl2fileList}
              onChange={(items) => {
                setFileList2(items)
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
        <div style={{fontSize: '18px', margin: '10px'}}>
        其他资质材料
        </div>
        <Form.Item hasFeedback label="其他材料扫描件（最多6张）"  >
        <UploadField
              limit={6}
              onChange={(items) => {
                setOthers(JSON.parse(JSON.stringify(items)))
              }}
              value={otherfileList}
              formatter={(response, file) => {
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
