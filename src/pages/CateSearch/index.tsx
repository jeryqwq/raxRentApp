import { createElement, useEffect, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import styles from './index.module.less';
import { Dialog, Picker, Icon } from '@alifd/meet';
import ScrollView from 'rax-scrollview';
import navigate from '@uni/navigate';
import { navigationBar } from '@uni/apis';
import { CITYS, myRequest } from '@/utils';
const typeMap  = {
  'ALL': '全部设备',
  PART: '零件',
  RENT: '设备出租',
  OLD: '二手',
  NEW: '新机'
}
const apis = {
  'ALL': '/equipmentLease/pageAllEquipment',
  PART: '/equipmentParts/page',
  RENT: '/equipmentLease/page',
  OLD: '/equipmentSale/page',
  NEW: '/equipmentSale/page'
}
let temp, curBrand, curAddress
let curType
let cacheMenu
function CategoryCopy() {
  const { cateId, name, type } = getSearchParams()
  const [cates, setCates] = useState<any[]>([])
  const [brands, setBrands] = useState<any[]>([])
  const [params, setParams] = useState({
    current: 1,
    pages: 10,
    size: 12,
    isNew: type === 'OLD' ? 0 : type === 'NEW' ? 1 : undefined
  })
  const [list, setList] = useState([])
  navigationBar.setNavigationBarTitle({
    title: typeMap[type] + '--' + name,
  });
  const loadCate = async (url = '/equipmentType/tree') => {
    function deep(item, isChildrent = false) {
      return {
        label: item.name,
        value: item.id,
        children: item?.children?.map(deep)
      }
    }
    if(url !== '/appdict/partsType') {
      if(cacheMenu) {
        setCates([cacheMenu, cacheMenu[0].children])
      }else{
        const res = await myRequest({
          url,
          method: 'get'
        })
        cacheMenu = [{ label: '全部', value: '全部', children: [{ label: '全部', value: '全部'}] }].concat(res.map(deep))
      }
    }else{
      
    }
  }
  useEffect(() => {
    (async () => {
      let conditions = []
    if(params.isNew) {
      conditions.push( {
        "column": "is_new",
        "operator": "eq",
        "value": params.isNew
    })
    }
    if(params.releaseCityName) {
      conditions.push({
        "column": "release_city_name",
        "operator": "like",
        "value": params.releaseCityName
    },)
    }
    if(params.equipBrand) {
      conditions.push({
          "column": "equip_brand",
          "operator": "eq",
          "value": params.equipBrand
      })
    }
      const res = await myRequest({
        url: apis[type],
        method: 'post',
        data: {
          ...params,
          conditions
        }
      })
      setList(list.concat(res.records || []))
    })()
  }, [params])
  useEffect(() => {
    if(type !== 'PART') {
      loadCate()
    }
    (async () => {
      const res = await myRequest({
        url: '/mallBrandInfo/all', 
        method: 'post',
        data: {}
      })
      setBrands(res)
    })()
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
          setCates([cacheMenu, cacheMenu[0].children])
          curType = 'CATE'
        }}>设备<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item" onClick={() => {
          curType = 'BRAND'
          setCates([[{label: '全部', value: '全部', children: [{label: '全部', value: '全部'}]}, ...brands.map(i => ({ label: i.brandName, value: i.brandName }))]])
          setDia(true);
        }}>品牌<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item"
         onClick={() => {
          curType = 'ADDRESS'
          setCates([CITYS, CITYS[0].children])
          setDia(true);
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
            url: "/pages/Rentdetail/index?id=" + i.id + '&type=' + i.type
          })
        }}>
        <image style={{width: '230rpx', height: '199rpx'}} src={"https://www.fjrongshengda.com/lease-center/" + i.mainImgPath} alt="" mode="widthFix"/>
        <div className="rg">
          <div className="tit">{i.equipName || i.partsName}</div>
          <div className="txt">{ i.description || i.equipBrand}</div>
          <div className="price">¥{i.price || i.salePrice || i.monthlyRent} { (type === 'RENT' || i.type === 'EquipmentLease') && '/ 月' } <span style={{color: '#333', fontSize: '12px'}}>{i.releaseCityName}</span></div>
          <div className="comp">{i.organName}</div>
        </div>
      </div>)
       }
      </ScrollView>
      <Dialog onOk={() => {
        setList([])
        if(curType === 'CATE') {
          const val = temp[1] === '全部' ? temp[0] === '全部' ? undefined : temp[0] : temp[1]
          setParams({
            ...params,
            current: 1,
            equipType: val
          })
        }else if(curType === 'BRAND') {
          const val = temp[0] === '全部' ? undefined : temp[0]
          setParams({
            ...params,
            current: 1,
            equipBrand: val,
          })
        }else if (curType === 'ADDRESS'){
          const val = temp[1] === '全部' ? temp[0] === '全部' ? undefined : temp[0] : temp[1]
          setParams({
            ...params,
            current: 1,
            equipBrand: val,
          })
        }
      }} visible={showDialog} closeMode={['ok', 'cancel', 'mask']} title="请选择" onClose={() => setDia(false)}>
        <Picker data={cates} onChange={(value) => {
          temp = value
          if(curType === 'CATE' || curType === 'ADDRESS') {
            const item = cates[0]?.find(i => value[0] === i.value)
            if(item) {
              setCates([cates[0], [{ label: '全部', value: '全部' }, ...item.children]])
            }
          }
        }}/>
      </Dialog>
    </div>
  );
}

export default CategoryCopy;
