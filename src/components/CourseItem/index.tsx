import { createElement } from 'rax';
import styles from './index.module.less';
function CourseItem() {
  return (
    <div className={styles['course-wrap']}>
        <div className="lf">
          <img style={{width: '100%', height: '340rpx'}} src="http://121.204.145.151:8087/lease-center//appfile/download?id=a85fb1107e0a47e09404313c442cbcc6"/>
        </div>
        <div className="rg">
          <div className="title">八大员岗前培训    </div>
          <div className="stit">面向施工现场专业人员培训</div>
          <div className="txt">旅工员(土建、装防装修、没备安装、市政工程)质量员(土建、装饰装体、设备安装、市政工程)材料员、机械员、劳务员、资料员,标准员</div>
        </div>
    </div>
  );
}

export default CourseItem;
