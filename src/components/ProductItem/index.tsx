import { createElement } from 'rax';
import Text from 'rax-text';
import styles from './index.module.less';
function ProductItem({item}: {item: any}) {
  return (
    <div className={styles['product-wrap']}>
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
