import { createElement } from 'rax';
import styles from './index.module.less';
function NewsItem() {
  return (
    <div className={styles['wrap']}>
      <div className="lf">
        <div className="txt">国家科技计划（专项、基金等）战略咨询与综合评审特邀委员会召开全体会议</div>
        <div className="info">2020年3月23日   xxxx阅</div>
      </div>
      <div className="rg">
        <img src="https://www.fjrongshengda.com/wxapp/repairbg.png" style={{width: '240rpx', height: '130rpx'}}/>
      </div>
      
    </div>
  );
}

export default NewsItem;
