import { createElement, useEffect, useState } from 'rax';
import { Tab, Icon} from '@alifd/meet';
import styles from './index.module.less';
import Menu from '@/components/Menu';
import navigate from '@uni/navigate';
import { myRequest } from '@/utils';
import MyNav from '@/components/MyNav'
function Category() {
  const [activePicker, setActive] = useState<'ALL'|'RENT' | 'PART'>()
  const [curList,  setCurlist] = useState<any[]>([])
  const [menus, setMenu] = useState<any[]>([])
  useEffect(() => {
    loadCate()
  }, [])
  const loadCate = async (url = '/equipmentType/tree') => {
    const res = await myRequest({
      url,
      method: 'get'
    })
    setMenu(res)
  }
  return (
   <div className="content-wrap">
    <div className="content">
    <div className={styles['wrap']}>
       <Tab onChange={(key) => {
        setActive(key)
        if(key === 'PART') {
          loadCate('/appdict/partsType')
        }else{
          loadCate()
        }
       }} defaultActiveKey="ALL" contentStyle={{padding: 0}}>
            <Tab.Item key='ALL' title="设备出售">
             <div className="item-wrap">
              <div className="lf">
              <MyNav  dataSource={menus} onChange={(i) => {
                setCurlist(i.children)
              }}/>
              </div>
              <div className="rg">
                <div className="cate-items">
                  {
                    curList.map((i) => <div className="item" onClick={() => {
                      navigate.push({
                        url: '/pages/CateSearch/index?cateId=123123'
                      })
                    }}>
                    <img style={{width: '251rpx', height: '251rpx'}} src='http://121.204.145.151:8087/lease-center//appfile/download?id=f85e9accfe704fa89911f2274fd8286c'/>
                    轮式挖掘机
                  </div>)
                  }
                </div>
              </div>
             </div>
            </Tab.Item>
            <Tab.Item key='RENT' title="设备出租">
            <div className="item-wrap">
              <div className="lf">
              <MyNav  dataSource={menus} onChange={(i) => {
                setCurlist(i.children)
              }}/>
              </div>
              <div className="rg">
                <div className="cate-items">
                  {
                    new Array(5).fill(1).map((i) => <div className="item" onClick={() => {
                      navigate.push({
                        url: '/pages/CateSearch/index?cateId=123123'
                      })
                    }}>
                    <img style={{width: '251rpx', height: '251rpx'}} src='http://121.204.145.151:8087/lease-center//appfile/download?id=f85e9accfe704fa89911f2274fd8286c'/>
                    轮式挖掘机
                  </div>)
                  }
                </div>
              </div>
             </div>
            </Tab.Item>
            <Tab.Item key='PART' title="配件商城">
            <div className="item-wrap">
              <div className="lf">
              <MyNav  dataSource={menus} onChange={(i) => {
                setCurlist([i])
              }}/>
              </div>
              <div className="rg">
                <div className="cate-items">
                  {
                    new Array(5).fill(1).map((i) => <div className="item" onClick={() => {
                      navigate.push({
                        url: '/pages/CateSearch/index?cateId=123123'
                      })
                    }}>
                    <img style={{width: '251rpx', height: '251rpx'}} src='http://121.204.145.151:8087/lease-center//appfile/download?id=f85e9accfe704fa89911f2274fd8286c'/>
                    轮式挖掘机
                  </div>)
                  }
                </div>
              </div>
             </div>
            </Tab.Item>
        </Tab>
      </div>
     
      <div>

      </div>
    </div>
    <Menu index={1}/>
   </div>
  );
}

export default Category;
