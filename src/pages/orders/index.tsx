import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
import { Tab } from '@alifd/meet';
import { myRequest } from '@/utils';
import ScrollView from 'rax-scrollview';
import { getSearchParams } from 'rax-app';

function Orders() {
  const { status: st } = getSearchParams()
  const [orders, setOrders] = useState<any[]>([])
  const [status, setStatus] = useState<any>(st)
  const [current, setCurrent] = useState(0)
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
    loadOrder({orderStatus:status })
  },[status])
  return (
    <div className={styles.wrap}>
      <Tab defaultActiveKey={1} activeKey={status} onChange={(key) => {
        setStatus(Number(key));
        loadOrder({}, true)
      }}>
        <Tab.Item key={1} title="待确认">
        </Tab.Item>
        <Tab.Item key={2} title="待发货">
        </Tab.Item>
        <Tab.Item key={3} title="待收货">
        </Tab.Item>
        <Tab.Item key={10} title="售后">
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
                    <div className="stat">待确认</div>
                  </div>
                 {
                  i.details.map(j =>  <div className="line2">
                      <div className="lf">
                        <img src={'https://www.fjrongshengda.com/lease-center/' + j.mainImgPath} style={{width: '75px', height: '75px'}} />
                      </div>
                      <div className="rg">
                        <div className="txt"> {j.productName}</div>
                        <div className="price">¥{j.price || j.equipPrice}     <span className='num'>*{i.equipAmount}</span> </div>
                      </div>
                  </div>)
                    }
                  <div className="line3">
                  共{i.details.length}件商品 <span style={{fontSize: '12px'}}>合计</span> ￥{i.paymentMoney}
                  </div>
                </div>
                  ))
                }
              </div>
      </ScrollView>
      
    </div>
  );
}

export default Orders;
