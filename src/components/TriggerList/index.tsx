import { createElement, useState } from 'rax';
import styles from './index.module.less';

function TriggerList({ list, defaultVal, onChange }: { list: {label: string; value: string}[]; defaultVal: string, onChange: (val: string) => void }) {
  const [active, setActive] = useState(defaultVal)
  return (
    <div className={styles['trigger-wrap']}>
        {
          list.map(i => <div className={`item ${i.value === active ? 'cur' : ''}`} key={i.value} onClick={() => {
            setActive(i.value)
            onChange(i.value)
          }}>
            {i.label}
          </div>)
        }
    </div>
  );
}

export default TriggerList;
