import { createElement } from 'rax';
import styles from './index.module.less';
function CourseItem({item}) {
  return (
    <div className={styles['course-wrap']}>
        <div className="lf">
          <image style={{ height: '340rpx'}} src={"http://121.204.145.151:8087/lease-center/" + item.mainImgPath}/>
        </div>
        <div className="rg">
          <div className="title">{item.courseName}     </div>
          <div className="stit">{item.courseTypeText}</div>
          <div className="txt">{item.description}</div>
        </div>
    </div>
  );
}

export default CourseItem;
