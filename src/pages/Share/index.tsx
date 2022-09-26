import { createElement, useEffect, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import QRCode  from 'qrcode';
import styles from './index.module.less';
function Share() {
  let { code } = getSearchParams()
  let [base64, setBase64] = useState('')
  useEffect(() => {
    QRCode.toDataURL(`https://www.fjrongshengda.com/invite?code=${code}`, function (err, url) {
      setBase64(url)
    })
  })

  return (
    <div className={styles['wrap']} style={{ textAlign: 'center' }}>
      <div className="tit">推荐好友领福利</div>
      <div className="stit">邀请码</div>
      <div className="code">{ code }</div>
      <img src={base64} alt=""  style={{ margin: '10px', width: '300rpx' }}/>
    </div>
  );
}

export default Share;
