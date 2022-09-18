import { myRequest } from '@/utils';
import { Dialog } from '@alifd/meet';
import { showToast } from '@uni/toast';
import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
function RepairList() {
  const [list, setList] = useState<any[]>([])
  async function reload() {
    const res = await myRequest({
      url: '/equipmentRepairInfo/pageMySend',
      method: 'post',
      data: {
        current: 0,
        size: 999
      }
    })
    setList(res.records || [])
  }
  useEffect(() => {
    reload()
  }, [])
  return (
   <div className={styles['wrap']}>
      {
        list.map(i => <div className="item">
        <div className="tit">
          {i.problemDesc}  <div className="stat">{i.takeNum === 1 ? '已接单' : '未接单'}</div>
        </div>
        <div className="sitem">
          <div className="label">型号</div>
          <div>{i.equipModel}</div>
        </div>
        <div className="sitem">
          <div className="label">城市</div>
          <div>{i.releaseCityName}</div>
        </div>
        <div className="sitem">
          <div className="label">品牌</div>
          <div>{i.equipBrand}</div>
        </div>
        <div className="sitem">
          <div className="label">地址</div>
          <div>{i.detailAddress}</div>
        </div>
        <div className="foot">
          <div className='action' onClick={async () => {
            Dialog.confirm({
              content: '是否删除？',
              onOk: async() =>  {
                await myRequest({
                  url: '/equipmentRepairInfo/' + i.id,
                  method: 'delete',
                })
                showToast('删除成功!')
                reload()
              }
            })
          }}>取消</div>
        </div>
      </div>)
      }
   </div>
  );
}

export default RepairList;
