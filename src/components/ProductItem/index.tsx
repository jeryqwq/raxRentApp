import { createElement } from 'rax';
import Text from 'rax-text';
import styles from './index.module.less';
function ProductItem(item: any) {
  return (
    <div className={styles['product-wrap']}>
        <img src={'http://121.204.145.151:8087/lease-center//appfile/download?id=a85fb1107e0a47e09404313c442cbcc6'} alt="" />
        <div className="tit">
          xxxxxxxx
        </div>
        <div><span className='price'>¥9000</span>/月 <span className='status'>待租</span> </div>
        <div className='loc'>福建省福州市</div>
    </div>
  );
}

export default ProductItem;
