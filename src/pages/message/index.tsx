import { myRequest } from '@/utils';
import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
function Message() {
  const [list, setList] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(0)

  async function load() {
    const res = await myRequest({
      url: 'appnotice/pageMy',
      data: {
        current,
        size: 8
      },
      method: 'post'
    })
    setList(res.records || [])
  }
  useEffect(() => {
    load()
  },[current])
  return (
    <div className={styles.wrap}>
     {
      list.map(i =>  <div className="item">
      <div className="line1">
        <div className="lf">
          <img src="https://www.fjrongshengda.com/wxapp/icon_notice.png" style={{width: '24px', height: '24px'}} alt="" />
          系统消息提示
        </div>
        <div className="rg">
        {i.createDate}
        </div>
      </div>
      <div className="txt">{i.msg}</div>
    </div>)
     }
    </div>
  );
}

export default Message;
