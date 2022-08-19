import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './index.module.less';
function PartItem() {
  return (
    <div className={styles['item-wrap']}>
        <img src='http://121.204.145.151:8087/lease-center/appfile/download?id=e26aaa8d2a9648cabec31d7aca0e4f70'/>
        <div className="price">
          <span>¥550</span> <span style={{color: '#999999', fontSize: '12px'}}>福州市</span>
        </div>
        <div className='tit'>久保田15洋马30玉柴徐工立派犀牛小微</div>
        <div className="comp">合肥安弘工程设备</div>
    </div>
  );
}

export default PartItem;
