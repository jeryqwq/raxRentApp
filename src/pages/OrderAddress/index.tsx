import { getCommonData, myRequest } from '@/utils';
import { createElement, useEffect, useState } from 'rax';
import { Dialog, Drawer, Select} from '@alifd/meet';
import styles from './index.module.less';
import { Icon } from '@alifd/meet';
import { navigate } from '@uni/apis';
import { getSearchParams } from 'rax-app';
import { showToast } from '@uni/toast';

function OrderAddress() {
  const prods = getCommonData('tempOrder')
  // if(!prods) return <div>非法进入</div>
  const [disVis, setDia] = useState(false)
  const { id, receiveUser, contactNumber, address } = getSearchParams()
  const isCart = prods.isCart
  let totalCount = 0
  let  totalPrice = 0;
  let allProdus:any[] = []
  console.log(prods)
  prods?.prods.forEach((j: any) => {
    totalCount +=(j?.details?.length || 0)
    allProdus.push(...j?.details);
    totalPrice += j?.details?.map((i: any) => (i.productAmount) * (i.price || i.nowPrice) ).reduce((a: number,b: number) => a + b)
  })
  useEffect(()=>{
    (async() => {
  
    })()
  },[])
  return (
    <div>
      <div className={styles['wrap']}>
        <div className="inner">
          <div className="address">
            <div className="tit">收货地址</div>
            {
              id ? <div className="desc">
              <div className="lf">
                <div className="item">
                  <span className="label">收货人</span>
                  <span className="txt">{receiveUser}</span>
                </div>
                <div className="item">
                  <span className="label">手机号</span>
                  <span className="txt">{contactNumber}</span>
                </div>
                <div className="item">
                  <span className="label">手机地址</span>
                  <span className="txt">{address}</span>
                </div>
              </div>
              <div className="rg">
                <Icon type='arrow-right'onClick={() => {
              navigate.push({
                url: '/pages/AddressMan/index'
              })
            }} style={{color: '#999999'}}/>
              </div>
            </div> : <span 
            onClick={() => {
              navigate.push({
                url: '/pages/AddressMan/index'
              })
            }}
            style={{ fontSize: '20px', color: '#105CCE', textAlign: 'center' }}>请选择收货地址</span>
            }
          </div>
          <div className="pay-method">
            <Select
              placeholder={'付款方式'}
              onChange={(v) => {
                
              }}
            >
              <Select.Option value={1}>先下后付</Select.Option>
            </Select>
          </div>
          {
            prods.prods.map(i => <div className="prods">
            <div className="store">{i.storeName}</div>
            {
              i.details.map(j => (<div className="item">
              <div className="lf">
                <img mode="widthFix" style={{width: '200rpx'}} src={"https://www.fjrongshengda.com/lease-center/" + j.mainImgPath}/>
              </div>
              <div className="rg">
                <div className="tit">{j.productName}</div>
                <div className="price">¥{j.price} <span>*{j.productAmount}</span></div>
              </div>
            </div>))
            }
          </div>)
          }
         
        </div>
        <div className='action-wrap'>
        <div className="line"></div>
        <div className="infos">
             <div className="item">
                <span className="label">商品件数</span>
                <span className="txt">{totalCount}件</span>
              </div>
              <div className="item">
                <span className="label">运费</span>
                <span className="txt">¥0</span>
              </div>
              <div className="item">
                <span className="label">商品总价</span>
                <span className="txt">¥{totalPrice}</span>
              </div>
              <div className="item">
                <span className="label">应付总额</span>
                <span className="txt">¥{totalPrice}</span>
              </div>
          </div>
        <div className="action">
          <div className="lf">应付金额<span className='price'>¥{totalPrice}</span></div>
          <div className="rg"
            onClick={async () => {
              if(!id) {
                showToast({
                  content: '请选择收货地址',
                  type: 'fail'
                })
                return
              }
              await myRequest({
                method: 'post',
                url: '/mallOrderMaster/addOrder', 
                data:{
                  "address": id,
                  "contactNumber": contactNumber,
                  "productVos": allProdus.map((i: any) => ({ carId:i.id ,isCart: isCart === 1 ? 1 : 0, num: 1, productId: i.productId || i.id, type: i.type })),
                  "receiveUser": receiveUser
                }
              })
                setDia(true)
            }}
          >确认下单</div>
        </div>
        </div>
      </div>
      <Dialog
        visible={disVis}
        centered
        title="请确认"
        content="订单生成成功，是否前往个人中心查看？"
        type="confirm"
        onClose={() => setDia(false)}
        onOk={() => {
          navigate.push({
            url: ''
          })
        }}
        onCancel={() => {
          navigate.push({
            url: ''
          })
        }}
      />

    </div>
  );
}

export default OrderAddress;
