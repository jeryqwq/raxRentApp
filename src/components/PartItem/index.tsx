import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.less';
function PartItem({item}) {
  return (
    <div className={styles['item-wrap']}>
        <image src={'http://121.204.145.151:8087/lease-center/' + item.mainImgPath}/>
        <div className="price">
          <span>¥{item.price}</span> <span style={{color: '#999999', fontSize: '12px'}}>{item.releaseCityName}</span>
        </div>
        <div className='tit'>{item.partsName}</div>
        <div className="comp">{item.organName}</div>
    </div>
  );
}

export default PartItem;
