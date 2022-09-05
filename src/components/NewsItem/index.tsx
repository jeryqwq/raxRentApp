import { createElement } from 'rax';
import styles from './index.module.less';
import navigate from '@uni/navigate'

function NewsItem({item}) {
  return (
    <div className={styles['wrap']} onClick={() => {
      navigate.push({
        url: "/pages/Rentdetail/index?id=" + item.id + '&type=' + ('EquipmentSale')
      })
    }}>
      <div className="lf">
        <div className="txt">{item.title}</div>
        <div className="info">{item.publishTime}   {item.readNum}阅</div>
      </div>
      <div className="rg">
        <image src={'https://www.fjrongshengda.com/lease-center/' + item.headUrl} alt="" style={{width: '240rpx'}}/>
        {/* <img src="https://www.fjrongshengda.com/wxapp/repairbg.png" style={{width: '240rpx', height: '130rpx'}}/> */}
      </div>
      
    </div>
  );
}

export default NewsItem;
