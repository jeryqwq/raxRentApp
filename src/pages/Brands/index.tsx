import { myRequest } from '@/utils';
import { createElement, useEffect, useState } from 'rax';

function Brands() {
  const [brands, setBrands] = useState<any[]>([])
  useEffect(() => {
    (async () => {
      const res = await myRequest( {
        url: '/mallBrandInfo/all',
        method: 'post',
        data: {}
      })
      setBrands(res)
    })()
  }, [])
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '20rpx 0'}}>
      {
        brands.map(i => <div style={{textAlign: 'center', width: '230rpx', margin: '10rpx 0'}}>
          <img style={{width: '230rpx', height: '100rpx'}} src={'https://www.fjrongshengda.com/lease-center/' + i.brandLogo} alt="" />
          <div>{i.brandName}</div>
        </div>)
      }
    </div>
  );
}

export default Brands;
