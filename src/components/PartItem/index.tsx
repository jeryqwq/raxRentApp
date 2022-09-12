import { createElement } from 'rax';
import styles from './index.module.less';
import { naviTo } from '@/utils';
function PartItem({item}) {
  return (
    <div className={styles['item-wrap']} onClick={() => {
     const q = "?id=" + item.id + '&type=' + ('EquipmentParts')
      naviTo("/pages/Rentdetail/index" + q, 'rentDetail' + q)
    }}>
        <img src={'https://www.fjrongshengda.com/lease-center/' + item.mainImgPath}/>
        <div className="price">
          <span>¥{item.price}</span> <span style={{color: '#999999', fontSize: '12px'}}>{item.releaseCityName}</span>
        </div>
        <div className='tit'>{item.partsName}</div>
        <div className="comp">{item.organName}</div>
    </div>
  );
}

export default PartItem;
