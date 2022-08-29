import { createElement } from 'rax';
import styles from './index.module.less';
function OldItem({item}) {
  return (
    <div className={styles['item-wrap']}>
      <img src={'http://121.204.145.151:8087/lease-center/' + item.mainImgPath} alt="" />
      <div className='item'>
        <div className="lf">设备型号</div>
        <div className="rg">{item.equipModel}</div>
      </div>
      <div className='item'>
        <div className="lf">采购时间</div>
        <div className="rg">{ item.productionDate.slice(0, 10) }</div>
      </div>
      <div className='item'>
        <div className="lf">工作小时数</div>
        <div className="rg">{ item.workTime }</div>
      </div>
      <div className='item'>
        <div className="lf">设备类型</div>
        <div className="rg">{ item.equipTypeText }</div>
      </div>
    </div>
  );
}

export default OldItem;