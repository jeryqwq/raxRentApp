import { createElement, useEffect, useRef, useState } from 'rax';
import styles from './index.module.less';
import { Button, Tab, Modal, Dialog, UploadField, Input, Form, Message } from '@alifd/meet';
import { myRequest } from '@/utils';
import ScrollView from 'rax-scrollview';
import { getSearchParams } from 'rax-app';
import { isWeChatMiniProgram } from '@uni/env';
import { getStorage } from '@uni/storage';

function Orders() {
  const { status: st } = getSearchParams()
  const [orders, setOrders] = useState<any[]>([])
  const [status, setStatus] = useState<any>(st)
  const [current, setCurrent] = useState(0)
  const [fileList, setFileList] = useState([])
  const [curId, setCurId] = useState('')
  const [vis, setVis] = useState(false)
  const ref= useRef<any>()
  async function loadOrder(params, connect = false) {
    const conditions = [{ column: 'order_status', operator: 'eq', value: params.orderStatus}]
    let query = {
      current,
      size: 10,
    }
    params.orderStatus && (query.conditions = conditions)
    const res = await myRequest( {
      method: 'post',
      url: '/mallOrderMaster/pageMy',
      data: query
    })
    res.records && setOrders(connect ? orders.concat(res.records) :res.records )
  }
  useEffect(() => {
    setCurrent(0)
    loadOrder({orderStatus:status }, false)
  },[status])
  return (
    <div className={styles.wrap}>
      <Tab defaultActiveKey={1} activeKey={status} onChange={(key) => {
        setStatus(Number(key));
      }}>
        <Tab.Item key={1} title="下单待支付">
        </Tab.Item>
        <Tab.Item key={10} title="结束">
        </Tab.Item>
      </Tab>
      <ScrollView  onEndReached={() => {
        setCurrent(current+1)
      }}className={styles['list']} style={{height: `calc( 100vh - 46px )`}}>
       <div  className='items'>
                {
                  orders.map(i => (
                <div className="item">
                  <div className="line1">
                    <div className="num">订单号：{i.id}</div>
                    <div className="stat"
                    
                    >{i.paymentMethod === 1 ?'待支付' : '待确认'}</div>
                  </div>
                 {
                  i.details.map(j =>  <div className="line2">
                      <div className="lf">
                        <img src={'https://www.fjrongshengda.com/lease-center/' + j.mainImgPath} style={{width: '75px', height: '75px'}} />
                      </div>
                      <div className="rg">
                        <div className="txt"> {j.productName}</div>
                        <div className="price">¥{j.price || j.equipPrice}     <span className='num'>*{j.equipAmount}</span> </div>
                      </div>
                  </div>)
                    }
                  <div className="line3">
                  共{i.details.length}件商品 <span style={{fontSize: '12px', marginRight: 10}}>  合计</span> ￥<span className='price'>{i.paymentMoney}</span>
                  </div>
                 
                  <div style={{textAlign: 'right', margin: '5px'}} >
                    {i.paymentMethod === 3 ? <Button type='primary' size='small' 
                    onClick={() => {
                      setCurId(i.id)
                      setVis(true)
                    }}
                    >上传凭证</Button> :
                    i.orderPayStatus !== '00' ? <Button type='primary' size='small' 
                    onClick={async () => {
                      if(isWeChatMiniProgram) {
                        getStorage({
                          key: 'openid',
                          async success(res){
                          if(!res.data) return 
                            const res2 = await myRequest({
                              method: 'post',
                              url: '/pay/orderAppletPay',
                              data: {
                                "appId": 'wxd0f39c0fe7d35ddb',
                                "openId": res.data,
                                "orderId": i.id,
                                "tradeType": "MINIPRO"
                              }
                            })
                            console.log(res2, '---')
                          wx.requestPayment({
                          timeStamp: res2.timeStamp,
                          nonceStr: res2.nonceStr,
                          package: res2.datePackage,
                          signType: res2.signType,
                          paySign: res2.paySign,
                            success(r) {
                              setTimeout(() => {
                                loadOrder({orderStatus:status }, false)
                              }, 3000);
                          },
                          fail(e) {
                              console.error(e)
                          }
                          })
                          }
                        })
                      }else{
                          const res = await myRequest({
                            method: 'post',
                              url: '/pay/orderH5Payment/'+i.id,
                          })
                          window.location.href = res
                      }
                    }}
                    >支付</Button> : '已支付'
                    }
                  </div>
                </div>
                  ))
                }
              </div>
      </ScrollView>
      <Dialog  visible={vis}
        onOk={async () => {
          const res = await ref.current.getValue()
          const {remarks} = res
          if(fileList.length) {
            await myRequest( {
              method: 'post',
              url: '/mallOrderMaster/offlinePaymentApplication',
              data: {
                orderId: curId,
                remarks: remarks,
                imgPath: fileList[0]?.response?.img,
                id: curId,
              },
            },
          );
          Message.success('上传成功，请等待审核');
          setStatus(1)
          setVis(false)
          }else{
            Message.error('请上传相关凭证')
          }
        }}
        onCancel={() => {
          setVis(false)
        }}
      >
      <Form  ref={ref}>
                        <Form.Item hasFeedback label="请输入描述"  >
                          <Input name='remarks'/>
                        </Form.Item>
                        <Form.Item hasFeedback label="相关凭证"  >
                          <UploadField
                            limit={1}
                            formatter={(response, file) => {
                              return {
                                success: response.status === 200,
                                url: file.imgURL,
                                img: response.data.data.path,
                              };
                            } }
                            data={{
                              serviceId: curId,
                              serviceType: 'PAY_IMG',
                              sort: 0
                            }}
                            value={fileList}
                            onChange={(items) => {
                              setFileList(items);
                            } }
                            action="https://www.fjrongshengda.com/lease-center/appfile/upload"
                            />
                          </Form.Item>
                        </Form>
      </Dialog>
    </div>
  );
}

export default Orders;
