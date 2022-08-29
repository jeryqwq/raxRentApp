import { createElement, useState } from 'rax';
import styles from './index.module.less';
function MyNav({dataSource, onChange}) {
  const [cur, setCur] = useState('')
  return (
    <div className={styles['nav-wrap']}>
      {
        dataSource.map(i => <div onClick={() => {
          setCur(i.id);
          onChange && onChange(i)
        }} className={ "item " +  (cur === i.id ? 'cur' : '') }>{i.name}</div>)
      }
    </div>
  );
}

export default MyNav;
