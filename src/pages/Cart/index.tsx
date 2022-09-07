import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
import { Radio, NumberPicker } from '@alifd/meet';
import Menu from '@/components/Menu';
import { myRequest, setCommonData } from '@/utils';
import { showToast } from '@uni/toast';
import { navigate } from '@uni/apis';

function Cart() {
  const [stores,setCarts] = useState<any>({})
  const [choose, setChoose] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [flag,reload] = useState({})
  const [products, setProduct] = useState([])
  const [isAllChoose, setIsAll] = useState(false)
  let chooseAll = function(e: any){
    if(e) {
    setChoose(products)
    setIsAll(true)
    }else{
    setChoose([])
    setIsAll(false)
    }
  }
  useEffect(() => {
    (async () => {
      const res = await myRequest( {
        url: '/mallCart/myCart',
        method: 'get'
      })
        let stores:any = {}
        setTotal(res?.length)
        res?.forEach((i: any) => {
          stores[i.storeId] ? stores[i.storeId].push(i) : (stores[i.storeId] = [i])
        })
        setProduct(res)
        setCarts(stores)
    })()
  }, [flag])
  const totalPrice = choose.map((i:any) => i.productAmount * i.nowPrice).reduce((a: number,b: number) => a + b, 0)
  return (
    <div className="content-wrap">
      <div className="content" style={{paddingBottom: 0}}>
        <div className={styles.wrap}>
          <div className="content">
           {
            Object.keys(stores).map(storeId => <div className="item">
            <div className="store"> <Radio 
              checked={stores[storeId].every((i:any) => choose.find((j:any) => j.id === i.id))} onChange={(e) => {
                const val = e
                let temp:any = [...choose]
                stores[storeId].forEach((i:any) => {
                    if(val) {
                      if(!choose.some((j:any) => j.id === i.id)) {
                        temp.push(i)
                      }
                    }else{
                      const idx= temp.findIndex((j:any) => j.id === i.id)
                      idx !== -1 && temp.splice(idx, 1)
                      setIsAll(false)
                    }
                })
               setChoose(temp)
              }} 
            >{stores[storeId][0]?.storeName}</Radio></div>
            {
              stores[storeId].map(i => <div className="sitem">
              <div className='lf'><Radio
               checked={choose.some((j:any) => i.id === j.id)}
               onChange={(e) => {
                 const checked = e
                 const index = choose.findIndex((j:any) => j.id === i.id)
                 if(!checked) {
                   setIsAll(false)
                 }
                 if(index === -1) {
                   setChoose(choose.concat(i))
                 }else{
                   choose.splice(index, 1)
                   setChoose([...choose])
                 }
               }}
              /></div>
              <div className="rg">
                <image src={`https://www.fjrongshengda.com/lease-center/${i.mainImgPath}`} style={{ width: '75px', height: '75px' }}/>
                <div className="inner">
                  <div className="tit">{i.productName}</div>
                  <div className="info">
                    <div className="price">{i.productAmount * i.nowPrice}</div>
                    <NumberPicker  onChange={async (val) => {
                      const res = await myRequest({
                        method: 'put',
                        url: '/mallCart/changeNum', 
                        data: {
                          id: i.id,
                          productAmount: val
                        }
                      })
                      i.productAmount = res.productAmount
                      setCarts({...stores})
                    }}min={1} defaultValue={1} value={i.productAmount} />
                  </div>
                </div>
              </div>
              </div>)
            }
          </div>)
           }
          </div>
          <div className="action">
          <Radio  onClick={chooseAll}  checked={products.length === choose.length ||isAllChoose}>全选</Radio>
          <span style={{fontSize: '13px'}}>合计(不含运费)</span>
          <div className="price" style={{fontSize: '18px'}}>{totalPrice}</div>
          <div className="ok" onClick={() => {
            if(!choose.length) {
              showToast('您还未选择结算商品，请选择后下单！')
              return 
            }
            let prods: any[] = []
            for (const key in stores) {
              const element = stores[key];
              const items = element.filter((i: any) => choose.map((j: any) => j.id).includes(i.id))
              if(items && items.length) {
                prods.push({
                  storeName: element[0].storeName,
                  details: items
                })
              }
            }
            setCommonData('tempOrder',{
              prods,
              isCart: 1
            } )
            navigate.push({
              url: '/pages/OrderAddress/index',
            })
          }}>选好了</div>
          </div>
        </div>
      </div>
    <Menu index={2}/>

    </div>
  );
}

export default Cart;
