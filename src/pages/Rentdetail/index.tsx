import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import { getSearchParams } from 'rax-app';
import { Slider } from '@alifd/meet';
import styles from './index.module.less';
import { API_TYPES, getFiles, myRequest, setCommonData } from '@/utils';
import { showToast } from '@uni/toast';
import navigate from '@uni/navigate';


function Rentdetail() {
  let { id, type } = getSearchParams()
  if(!id || !type) return <div>非法访问</div>
  const [imags, setImages] = useState([])
  const [detail, setDetail] = useState({})
  const [otherStores, setOhterStore] = useState<any[]>([])
  let detailType = '';
  if(type === 'equipmentLease' || type === 'EquipmentLease') {
    type = 'EquipmentLease'
    detailType = 'RENT'
  }
  if(type === 'equipmentSale' || type === 'EquipmentSale') {
    detailType = 'OLD'
    type = 'EquipmentSale'
  }
  if(type === 'equipmentParts' || type === 'EquipmentParts') {
    detailType = 'PART'
    type = 'EquipmentParts'
  }
  console.log(type)
  useEffect(() => {
    (async () => {
      const res = await getFiles(id)
      setImages(res)
      const res2 = await myRequest({
        url: `${API_TYPES[detailType]}/${id}`,
        method: 'GET'
      })
      setDetail(res2)
      const res3 = await myRequest({
        url: `/${API_TYPES[detailType]}/page`,
        data: {"conditions": [
          {"operator":"eq","column":"d.organ_id","value": res2.organId}
            ,{"operator":"ne","column":"d.id","value": res2.id}
          ],
          "current": 0,
          "pages": 5,
          "size": 4}
          ,
        method: 'post'
      })
      setOhterStore(res3.records)
    })()
  }, [])
  return (
    <div className={styles['page']}>
      <div className={styles['wrap']}>
       <Slider width={690} height={372}  autoplay infinite >
            {imags.map((item) => {
              return (
                <Slider.Item key={item.path}>
                  <View>
                    <img
                      src={'https://www.fjrongshengda.com/lease-center/' + item.path}
                      style={{
                        width: 690,
                        height: 372,
                      }}
                    />
                  </View>
                </Slider.Item>
              );
            })}
          </Slider>
      <div className="line1">
        <div className="lf">
          <div className="tit">{detail.equipName}</div>
          <div className="price">{ detailType === 'RENT' ?  <span>
            租金：<span style={{color: '#FF0505', fontSize: '21px'}}>￥{detail.monthlyRent}元</span>/月</span> 
             : 
              <span>
                单价：<span style={{color: '#FF0505', fontSize: '21px'}}>￥{detail.salePrice || detail.price }元</span> { detailType !== 'PART' ? '/台' : '/个' }
              </span>
          }
             </div>
        </div>
        <div className="rg"></div>
      </div>
      <div className="line2">
        <div className="item">{detail.equipBrand}</div>
        <div className="item">{detail.releaseCityName}</div>
        <div className="item">{detail.createName}</div>
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line3">
        <div className="mtit">
          产品属性
        </div>
        <div className="info">
          <div className="item">
          地区: <span className='val'>{ detail.releaseCityName?.replace(',', '-') }</span>
          </div>
          <div className="item">
          品牌:  <span className='val'>{detail.equipBrand}</span>
          </div>
          <div className="item">
          发布者:  <span className='val'>{detail.createName}</span>
          </div>
          <div className="item">
          最新更新时间:  <span className='val'>{detail.updateDate}</span>
          </div>
          <div className="item">
          设备品牌:  <span className='val'>{detail.equipBrand}</span>
          </div>
          <div className="item">
          出厂日期:  <span className='val'>{detail.productionDate}</span>
          </div>
          <div className="item">
          整机序列号:  <span className='val'>{detail.serialNumber}</span>
          </div>
          <div className="item">
          设备型号:  <span className='val'>{detail.equipModel}</span>
          </div>
          {
            detailType === 'RENT' &&  <div className="item">
            工作小时数:  <span className='val'>{detail.workTime}</span>
            </div>
          }
          <div className="item">
          设备浏览数:  <span className='val'>{detail.views}</span>
          </div>
        </div>
        <div className="mtit">
          产品详情
        </div>
        <div style={{fontSize: '12px', color: '#033333'}}>{detail.description}</div>
        {imags.map((item) => {
              return (
                  <View>
                    <img
                      src={'https://www.fjrongshengda.com/lease-center/' + item.path}
                      style={{
                        width: '100%',
                      }}
                    />
                  </View>
              );
            })}
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line4">
        <div className="mtit">
          商家
        </div>
        <div className="cnt">
        <div className="lf">
            <img src="https://www.fjrongshengda.com/images/store.png" style={{width: '60px', height: '60px'}}/>
            <div className="rg">
              <div className="name">商家名称</div>
              <div className="stat">身份认证</div>
            </div>
          </div>
          <div className="rg">
            <div className="btn" onClick={() => {
            showToast('电话：' + detail?.organDto?.callPhone)
            }}>联系商家</div>
          </div>
        </div>
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line4">
        <div className="mtit">
            其他商品相关推荐
        </div>
        <div className='list-wrap'> 
          {
           otherStores.map(i => <div className='item' onClick={() => {
            navigate.push({
              url: "/pages/Rentdetail/index?id=" + i.id + '&type=' + type
            })
           }}>
              <img  style={{width: '325rpx', height: '145px'}} src={"https://www.fjrongshengda.com/lease-center/" + i.mainImgPath} alt="" />
              <div className="tit">{i.equipName}</div>
              <div className="price">
              { detailType === 'RENT' ?  <span style={{fontSize: '12px'}}>
              <span style={{color: '#666'}}>租金：</span><span style={{color: '#FF0505'}}>￥{i.monthlyRent}元</span>/月</span> 
              : 
              <span style={{fontSize: '12px'}}>
              单价：<span style={{color: '#FF0505'}}>￥{i.salePrice || i.price}元</span> { detailType !== 'PART' ? '/台' : '/个' }
            </span>
            }
                <span style={{fontSize: '12px', color: '#999'}}>{i.releaseCityName}</span></div>
            </div>)
          }
        </div>
      </div>
    </div>
      <div className={styles['buy']}>
        <div className="lf">
          <img style={{width: '20px', height: '20px',marginLeft: '5px'}} src="https://www.fjrongshengda.com/wxapp/cart.png"/>
          购物车
        </div>
        <div className="rg">
          <div className="item" style={{backgroundColor: '#FEB21F'}}
            onClick={async () => {
              const res = await myRequest({
                url: '/mallCart',
                method: 'post',
                data: {
                  productId: detail.id,
                  productAmount: 1,
                  type
                }
              })
              showToast('加入购物车成功!')
            }}
          >加入购物车</div>
          <div className="item"
            onClick={() => {
              setCommonData('tempOrder', {
                  prods: [
                    {
                      details: [{
                        ...detail,mainImgPath: imags[0].path,
                        price: detail.salePrice || detail.price || detail.monthlyRent,
                        productAmount: 1,
                        productName: detail.partsName || detail.equipName,
                        productBrand: detail.equipBrand,
                        productModel: detail.equipModel,
                        type,
                      }],
                      storeName: detail.createName
                    },
                  ]
                }
              )
              navigate.push({
                url: '/pages/OrderAddress/index',
              })
            }}
          >立即订购</div>
        </div>
      </div>
    </div>
  );
}

export default Rentdetail;
