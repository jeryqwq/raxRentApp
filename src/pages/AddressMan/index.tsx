import { createElement, useEffect, useRef, useState } from 'rax';
import styles from './index.module.less';
import { Checkbox,CascaderSelect, Drawer, Input , Form, Dialog, Picker, Button} from '@alifd/meet';
import { myRequest, CITYS } from '@/utils';
import navigate from '@uni/navigate';
import { showToast } from '@uni/toast';
let tempCity = [...CITYS]
tempCity.shift()
let addressId = ''
function AddressMan() {
  const [address, setAddress] = useState<any[]>([])
  const [vis, setVis] = useState<boolean>(false)
  const formInstance = useRef(null);
  async function loadData() {
    const res = await myRequest({
      method: 'get',
      url: '/mallReceiveAddress/findMy', 
    })
    setAddress(res || [])
  }
  useEffect(()=>{
    loadData()
  },[])
  return (
    <div className={styles.wrap}>
       <Drawer
        title={addressId ? '编辑' : '新增'}
        placement={'bottom'}
        visible={vis}
        containerClassName="drawer-container"
        onClose={(reason) => {
          setVis(false)
        }}
      >
        <div>
          <Form scrollToFirstError ref={formInstance} onSubmit={() => {

          }}>
            <Form.Item label="姓名" hasFeedback required requiredMessage="姓名不能为空">
              <Input  outline={false} name="receiveUser" placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item hasFeedback label="手机号码" required requiredMessage="手机号码不能为空">
              <Input outline={false} name="contactNumber" placeholder="请输入手机号码" />
            </Form.Item>
            <Form.Item hasFeedback label="地址" required requiredMessage="地址不能为空">
              <CascaderSelect
                dataSource={tempCity}
                name="city" 
                placeholder="请选择省市" 
              />
            </Form.Item>
            <Form.Item hasFeedback label="详细地址" required requiredMessage="详细地址不能为空">
              <Input outline={false} name="address" placeholder="请输入详细地址" />
            </Form.Item>
            <Form.Item hasFeedback label="邮编" required requiredMessage="邮编不能为空">
              <Input outline={false} name="zipCode" placeholder="请输入邮编" />
            </Form.Item>
          </Form>
          <Button type="primary"  size="large" fullWidth onClick={() => {
            if (formInstance.current) {
              formInstance.current?.submit(async(data, errors) => {
                if(data) {
                  await myRequest({
                    url: '/mallReceiveAddress',
                    data: {
                      ...data,
                      provinceName: data.city[0],
                      cityName: data.city[1],
                      isDefault: 0,
                      id: addressId
                    },
                    method: addressId ? 'put' : 'post'
                  })
                  showToast(addressId ? '编辑成功！': '新增成功!')
                  setVis(false)
                  loadData()
                }
              });
            }
          }}>提交</Button>
        </div>
      </Drawer>
      <div className="button" onClick={() => {
        setVis(true)
        addressId = ''
      }}>
        <span>+</span> 新增地址
      </div>
      <div className="line"></div>
        {
          address.map(i => <>
          <div className="item" onClick={() => {
            navigate.push({
              url: `/pages/OrderAddress/index?id=${i.id}&receiveUser=${i.receiveUser}&contactNumber=${i.contactNumber}&address=${i.address}`
            })
          }}>
          <div className="lf">
            <div className="name">{i.receiveUser} <span>{i.contactNumber}</span>
            <span style={{color: '#666', float: 'right'}}>{i.zipCode}</span>
            </div>
            <div className='addr'>{i.address}</div>
            <div  onClick={async () => {
              await myRequest({
                url: '/mallReceiveAddress',
                data: {
                  ...i,
                  isDefault: i.isDefault === 1 ? 0 : 1,
                },
                method: 'put'
              })
              loadData()
            }}><Checkbox checked={i.isDefault === 1} ><span style={{fontSize: '12px'}}>默认地址</span></Checkbox></div></div>
          <div className="rg" onClick={() => {
            setVis(true)
            addressId = i.id
            setTimeout(() => {
              formInstance?.current.setValue({
                ...i,
                city: [i.provinceName, i.cityName]
              })
            },200)
          }}>
            {'>'}
          </div>
        </div>
        <div className="line"></div>
          </>)
        }
    </div>
  );
}

export default AddressMan;
