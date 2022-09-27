import { naviTo } from '@/utils';
import { createElement } from 'rax';
import styles from './index.module.less';

function NewsItem({item}) {
  return (
    <div className={styles['wrap']} onClick={() => {
      const query = "?id=" + item.id 
      naviTo('/pages/WebView/index?url=' + encodeURIComponent('https://www.fjrongshengda.com/h5app/#/newsDetail' + query), '/newsDetail' + query)
    }}>
      <div className="lf">
        <div className="txt">{item.title}</div>
        <div className="info">{item.publishTime}   {item.readNum}阅</div>
      </div>
      <div className="rg">
        <img src={'https://www.fjrongshengda.com/lease-center/' + item.headUrl} alt="" style={{width: '240rpx'}}/>
        {/* <img src="https://www.fjrongshengda.com/wxapp/repairbg.png" style={{width: '240rpx', height: '130rpx'}}/> */}
      </div>
      
    </div>
  );
}

export default NewsItem;
