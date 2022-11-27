import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams } from 'rax-app';
import { myRequest } from '@/utils';

const urlMaps = {
  jobed: '/robotrecreuitment/page',
  findJob: '/jobhunting/page',
  buy: '/equipmentPurchase/page',
  rent: '/equipmentRent/page'
}

function CommonList() {
  const { type } = getSearchParams()
  const [list, setList] = useState([])
  const [params, setParams] = useState({
    page: 0,
    size: 30,
  })
  useEffect(() => {
    (async () => {
      const res = await myRequest({
        url: urlMaps[type],
        data: params,
        method: 'post',
      })
      setList(res.records)
    })()
  }, [params])
  return (
    <div>
     {
      list.map(i =>{
        const dom = {
          jobed: <div style={{padding: '10rpx'}}>{ i.provinceName + i.countyName + i.address + (i.skillRequirements  ? '  要求：' + i.skillRequirements : '' )+ '  待遇：' + i.salary }</div>,
          findJob: <div style={{padding: '10rpx'}} >{ i.name  +  ' 地址: ' + i.detailAddress + '  技能：' + i.specialty}</div>,
          buy: <div style={{padding: '10rpx'}}>{ '求购：' + '  型号：' + i.equipBrand + "  城市：" +  i.releaseCityName  + '  要求： '+  i.remark}</div> ,
          rent: <div style={{padding: '10rpx'}} >{ i.contactName  +  ' 地址: '+ i.releaseCityName + i.detailAddress + '  求租：' + i.equipType + '  备注： '+ i.remark} </div>
        }
        return dom[type]
      })
     }
    </div>
  );
}

export default CommonList;
