import { createElement } from 'rax';
import styles from './index.module.less';
function CourseItem({item}) {
  return (
    <div className={styles['course-wrap']}>
        <div className="lf">
          <image style={{ height: '340rpx'}} src={"https://www.fjrongshengda.com/lease-center/" + item.mainImgPath}/>
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
