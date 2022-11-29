import { myRequest } from '@/utils';
import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
import { isWeChatMiniProgram } from '@uni/env';
import { navigate } from '@uni/apis';
function DataCount({rents = []}: { rents: any[] }) {
  const [buys, setBuy] = useState<any>({ list: [], total: 0 });
  const [jobs, setJobs] = useState<any>({ list: [], total: 0 });
  const [findJob, setFindjob] = useState<any>({ list: [], total: 0 });
  const [newRents, setnewRents] = useState<any>({ list: [], total: 0 });

  const [counts, setCount] = useState({});
  useEffect(() => {
    (async () => {
      const res12 = await myRequest({
        url: '/sysindex/getHomeCount',
        method: 'get',
      });
      setCount(res12);
        const res9 = await myRequest( {
          url: '/equipmentPurchase/page',
          data: {
            page: 0,
            size: 6,
          },
          method: 'post',
        });
          setBuy({
            list: res9.records || [],
            total: res9.total,
          });
        const res10 = await myRequest( {
          url: '/robotrecreuitment/page',
          data: {
            page: 0,
            size: 6,
          },
          method: 'post',
        });
          setJobs({
            list: res10?.records || [],
            total: res10.total,
          });
        const res11 = await myRequest( {
          url: '/jobhunting/page',
          data: {
            page: 0,
            size: 6,
          },
          method: 'post',
        });
          setFindjob({
            list: res11?.records || [],
            total: res11.total,
          });
          const res13 = await myRequest( {
            url: '/equipmentRent/page',
            data: {
              page: 0,
              size: 6,
            },
            method: 'post',
          });
          setnewRents({
              list: res13?.records || [],
              total: res13.total,
            });
    })()
  }, [])
  return (
    <div>
     <div className={styles['count-item']}>
     <div className={styles.dataItem}>
        <div className="lf">发布设备</div>
        <div className="rg">
          <img  width={30} height={30} src="https://www.fjrongshengda.com/images/1068.png" /> {counts.fbsbNum}
          <span className="unit">台</span>
        </div>
      </div>
      <div className={styles.dataItem}>
          <div className="lf">发布需求</div>
          <div className="rg">
            <img width={30} height={30} src="https://www.fjrongshengda.com/images/1069.png" /> {counts.fbxqNum}
            <span className="unit">条</span>
          </div>
        </div>
        <div className={styles.dataItem}>
          <div className="lf">服务订单</div>
          <div className="rg">
            <img  width={30} height={30} src="https://www.fjrongshengda.com/images/1070.png" /> {counts.orderNum}
            <span className="unit">单</span>
          </div>
        </div>

      <div className='add-item'>
          <div className="title" onClick={() =>{
            navigate.push({
              url: isWeChatMiniProgram ? '/pages/CommonList/index?type=rent' : '#/commonList?type=rent'
            })
          } }>最新求租[{newRents.total}] </div>
            {newRents?.list?.map((i) => (
              <div className={'item-item'}>
                {i.releaseCityName}, {i.equipName}
              </div>
            ))}
        </div>

        <div className="add-item">
        <div className="title"  onClick={() =>{
            navigate.push({
              url: isWeChatMiniProgram ? '/pages/CommonList/index?type=buy' : '#/commonList?type=buy'
            })
          } }>最新求购[{buys.total}] </div>
              {buys.list?.map((i) => (
                <div className={'item-item'}>
                  {i.remark}
                </div>
              ))}
        </div>

        <div className="add-item">
        <div className="title"  onClick={() =>{
            navigate.push({
              url: isWeChatMiniProgram ? '/pages/CommonList/index?type=jobed' : '#/commonList?type=jobed'
            })
          } }>机手招聘[{jobs.total}] </div>
              {jobs.list?.map((i) => (
                <div className={'item-item'}>
                  {i.countyName}, {i.cityName},要求：{i.skillRequirements}
                </div>
              ))}
        </div>

        <div className="add-item">
        <div className="title" onClick={() =>{
            navigate.push({
              url: isWeChatMiniProgram ? '/pages/CommonList/index?type=findJob' : '#/commonList?type=findJob'
            })
          } }>机手求职[{findJob.total}] </div>
              {findJob.list?.map((i) => (
                <div className={'item-item'}>
                    {i.name}-{i.cityName}:{i.specialty}
                </div>
              ))}
        </div>

     </div>
    </div>
  );
}

export default DataCount;
