import { createElement } from 'rax';
import navigate from '@uni/navigate';
import styles from './index.module.less';
function ProductItem({item}: {item: any}) {
  return (
    <div className={styles['product-wrap']} onClick={() => {
      navigate.push({
        url: "/pages/Rentdetail/index?id=" + item.id + '&type=' + ('EquipmentLease')
      })
    }}>
        <img src={'https://www.fjrongshengda.com/lease-center/' + item.mainImgPath} alt="" />
        <div className="tit">
          {item.equipName}
        </div>
        <div><span className='price'>¥{item.monthlyRent}</span>/月 <span className='status'>待租</span> </div>
        <div className='loc'>{item.releaseCityName}</div>
    </div>
  );
}

export default ProductItem;
