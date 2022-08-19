import { createElement } from 'rax';
import styles from './index.module.less';
function OldItem() {
  return (
    <div className={styles['item-wrap']}>
      <img src={'http://121.204.145.151:8087/lease-center//appfile/download?id=a85fb1107e0a47e09404313c442cbcc6'} alt="" />
      <div className='item'>
        <div className="lf">设备型号</div>
        <div className="rg">xxxx</div>
      </div>
      <div className='item'>
        <div className="lf">采购时间</div>
        <div className="rg">xxxx</div>
      </div>
      <div className='item'>
        <div className="lf">工作小时数</div>
        <div className="rg">xxxx</div>
      </div>
      <div className='item'>
        <div className="lf">停放时间</div>
        <div className="rg">xxxx</div>
      </div>
    </div>
  );
}

export default OldItem;
