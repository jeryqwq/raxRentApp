import { createElement, useEffect, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import styles from './index.module.less';
import { Dialog, Picker, Icon, Search } from '@alifd/meet';
import ScrollView from 'rax-scrollview';
import { navigationBar } from '@uni/apis';
import { API_TYPES, CITYS, myRequest, naviTo } from '@/utils';
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

const types = API_TYPES
let temp = []
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
    searchName: '',
    isNew: type === 'OLD' ? 0 : type === 'NEW' ? 1 : undefined,
    equipType: cateId,
    partsType: type === 'PART' && name
  })
  const [list, setList] = useState([])
  navigationBar.setNavigationBarTitle({
    title: typeMap[type] + ( name ? '--' + name : ''),
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
        setCates(cacheMenu)
      }
    }else{
      const res = await myRequest({
        url,
        method: 'get'
      })
      cacheMenu = [{ label: '全部', value: '全部',}].concat(res.map(i => ({ label: i.name, value: i.code })))
      setCates([cacheMenu])
    }
  }
  async function queryList (searchName, isReset = false) {
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
    if(params.partsType) {
      conditions.push({
        "column": "parts_type",
        "operator": "eq",
        "value": params.partsType
      })
    }
    if(searchName) {
      conditions.push({
        column: 'equip_name',
        operator: 'like',
        value: searchName
      })
    }
    if(params.partsBrand) {
      conditions.push({
        "column": "parts_brand",
        "operator": "eq",
        "value": params.partsBrand
      })
    }
    if(!apis[type]) {
      return
    }
      const res = await myRequest({
        url: apis[type],
        method: 'post',
        data: {
          ...params,
          conditions,
        }
      })
      isReset ? setList(res.records || []) : setList(list.concat(res.records || []))
    
  }
  useEffect(() => {
    queryList('')
  }, [params])
  useEffect(() => {
    if(type !== 'PART') {
      loadCate()
    }else{
      loadCate('/appdict/partsType')
    }
    (async () => {
      const res = await myRequest({
        url: type === 'PART' ?'/appdict/partsBrand' : '/mallBrandInfo/all' , 
        method: type === 'PART' ? 'get' :'post',
        data: {}
      })
      setBrands(res)
    })()
  }, [])
  const [ showDialog, setDia ] = useState(false)
  // if(!cateId) {
  //   return <div>非法访问</div>
  // }
  return (
    <div className={styles['wrap']}>
      <div className="search-wrap">
        <div className="item" onClick={() => {
            setDia(true);
          if(type === 'PART') {
           setCates([cacheMenu])
          }else{
            setCates([cacheMenu, cacheMenu[0].children])
          }
          curType = 'CATE'
          temp = []
        }}>{ type === 'PART' ? '类型' : '设备' }<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item" onClick={() => {
          curType = 'BRAND'
          if(type === 'PART') {
            setCates([[{label: '全部', value: '全部'}, ...brands.map(i => ({ label:i.name, value: i.code }))]])
          }else{
            setCates([[{label: '全部', value: '全部', children: [{label: '全部', value: '全部'}]}, ...brands.map(i => ({ label: i.brandName, value: i.brandName }))]])
          }
          setDia(true);
          temp = []
        }}>{ type === 'PART' ? '品名' : '品牌' }<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item"
         onClick={() => {
          curType = 'ADDRESS'
          setCates([CITYS, CITYS[0].children])
          setDia(true);
          temp = []
        }}
        >地区<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
      </div>
      <Search
        hasClear
        hasCancel
        onSearch={(val) =>{
          queryList(val, true)
        }}
        onCancel={() => {
          queryList('', true)
        }}
        onClear={() => {
          queryList('', true)
        }}
      />
      <ScrollView  onEndReached={() => {
        setParams({
          ...params,
          current: params.current+1
        })
      }}className={styles['list']} style={{height: `calc( 100vh - 33px )`}}>
       {
        list.map(i =>  <div className="item" onClick={() => {
          const q = "?id=" + i.id + '&type=' + (i.type || types[type === 'ALL'? 'NEW' : type])
          naviTo("/pages/Rentdetail/index" + q, "/rentDetail" + q)
        }}>
        <img style={{width: '230rpx', height: '199rpx'}} src={"https://www.fjrongshengda.com/lease-center/" + i.mainImgPath} alt="" mode="widthFix"/>
        <div className="rg">
          <div className="tit">{i.equipName || i.partsName}</div>
          <div className="txt">{ i.description || i.equipBrand} <span className='status'>{(type === 'RENT' || i.type === 'EquipmentLease') ?  '待租' : '待售'}</span> </div>
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
            equipType: type === 'PART' ? undefined : val,
            partsType: type === 'PART' && temp[0] === '全部' ? undefined : temp[0],
          })
        }else if(curType === 'BRAND') {
          const val = temp[0] === '全部' ? undefined : temp[0]
          let _params = {
            ...params,
            current: 1,
          }
          if(type === 'PART' ) {
            _params.partsBrand = temp[0] === '全部' ? undefined : temp[0]
          }else{
            _params.equipBrand = val
          }
          setParams(_params)
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
