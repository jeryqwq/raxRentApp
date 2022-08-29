import { createElement, useEffect, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import styles from './index.module.less';
import { Dialog, Picker, Icon } from '@alifd/meet';
import ScrollView from 'rax-scrollview';
import navigate from '@uni/navigate';
import {  } from '@uni/apis';
import { navigationBar } from '@uni/apis';
import { myRequest } from '@/utils';
const typeMap  = {
  'ALL': '全部设备',
  PART: '零件',
  RENT: '设备出租'
}
let temp
let curType
function CategoryCopy() {
  const { cateId, name, type } = getSearchParams()
  const [cates, setCates] = useState<any[]>([])
  const [params, setParams] = useState({
    current: 0,
    pages: 10,
    size: 12,
  })
  const [list, setList] = useState([])
  navigationBar.setNavigationBarTitle({
    title: typeMap[type] + '--' + name,
  });
  const loadCate = async (url = '/equipmentType/tree') => {
    const res = await myRequest({
      url,
      method: 'get'
    })
    function deep(item, isChildrent = false) {
      return {
        label: item.name,
        value: item.id,
        children: item?.children?.map(deep)
      }
    }
    if(url !== '/appdict/partsType') {
      const transed = res.map(deep)
      setCates([transed, transed[0].children])
    }else{
      
    }
  }
  useEffect(() => {
    (async () => {
      const res = await myRequest({
        url: '/equipmentLease/pageAllEquipment',
        method: 'post',
        data: {
          ...params
        }
      })
      setList(list.concat(res.records))
    })()
  }, [params])
  useEffect(() => {
   
    if(type === 'ALL' || type === 'RENT') {
      loadCate()
    }
  }, [])
  const [ showDialog, setDia ] = useState(false)
  if(!cateId) {
    return <div>非法访问</div>
  }
  return (
    <div className={styles['wrap']}>
      <div className="search-wrap">
        <div className="item" onClick={() => {
          setDia(true);
          curType = 'CATE'
        }}>设备<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item" onClick={() => {
          curType = 'BRAND'
        }}>品牌<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item"
         onClick={() => {
          curType = 'ADDRESS'
        }}
        >地区<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
      </div>
      <ScrollView  onEndReached={() => {
        setParams({
          ...params,
          current: params.current+1
        })
      }}className={styles['list']} style={{height: `calc( 100vh - 33px )`}}>
       {
        list.map(i =>  <div className="item" onClick={() => {
          navigate.push({
            url: "/pages/Rentdetail/index?id=" + '123123'
          })
        }}>
        <image style={{width: '230rpx'}} src={"http://121.204.145.151:8087/lease-center/" + i.mainImgPath} alt="" mode="widthFix"/>
        <div className="rg">
          <div className="tit">{i.equipName}</div>
          <div className="txt">{i.equipBrand}</div>
          <div className="price">¥{i.price} / 月  <span style={{color: '#333', fontSize: '12px'}}>{i.releaseCityName}</span></div>
          <div className="comp">{i.organName}</div>
        </div>
      </div>)
       }
      </ScrollView>
      <Dialog onOk={() => {
        setParams({
          ...params,
          current: 0
        })
      }} visible={showDialog} closeMode={['ok', 'cancel', 'mask']} title="请选择" onClose={() => setDia(false)}>
        <Picker data={cates} onChange={(value) => {
          temp = value
          const item = cates[0]?.find(i => value[0] === i.value)
          if(item) {
            setCates([cates[0], item.children])
          }
        }}/>
      </Dialog>
    </div>
  );
}

export default CategoryCopy;
