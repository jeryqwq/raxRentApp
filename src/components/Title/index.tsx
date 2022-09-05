import { createElement } from 'rax';
import styles from './index.module.less';
import navigate from '@uni/navigate';

function Title({ title, path }: {title: string, path: string}) {
  return (
    <div className={styles['title-wrap']}>
      <div className='tit'>{title}</div>
      <div className='more' onClick={() => {
         navigate.push({
          url: path
        })
      }}>更多</div>
    </div>
  );
}

export default Title;
