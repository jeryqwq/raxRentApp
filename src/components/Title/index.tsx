import { createElement } from 'rax';
import styles from './index.module.less';

function Title({ title, path }: {title: string, path: string}) {
  return (
    <div className={styles['title-wrap']}>
      <div className='tit'>{title}</div>
      <div className='more' onClick={() => {

      }}>更多</div>
    </div>
  );
}

export default Title;
