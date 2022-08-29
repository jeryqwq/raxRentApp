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
    if(url !== '/appdict/partsType') {
      setCurlist(res[0]?.children)
      setMenu(res)
    }else{
      setCurlist(res.map(i => ({name: i.name, code: i.id, img: i.img})))
    }
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
            <Tab.Item key='ALL' title="全部设备">
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
                        url: `/pages/CateSearch/index?cateId=${i.id}&name=${i.name}&type=ALL`
                      })
                    }}>
                      {
                        i.img ? <image mode="aspectFill" style={{width: '251rpx', height: '251rpx'}} src={ i.img }/> : <div style={{height: '251rpx', lineHeight: '251rpx'}}>暂无图片</div>
                      }
                    {i.name}
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
                    curList.map((i) => <div className="item" onClick={() => {
                      navigate.push({
                        url: `/pages/CateSearch/index?cateId=${i.id}&name=${i.name}&type=RENT`
                      })
                    }}>
                      {
                        i.img ? <image mode="aspectFill" style={{width: '251rpx', height: '251rpx'}} src={ i.img }/> : <div style={{height: '251rpx', lineHeight: '251rpx'}}>暂无图片</div>
                      }
                    {i.name}
                  </div>)
                  }
                </div>
              </div>
             </div>
            </Tab.Item>
            <Tab.Item key='PART' title="配件商城">
            <div className="item-wrap">
              <div className="rg">
                <div className="cate-items">
                  {
                    curList.map((i) => <div className="item" onClick={() => {
                      navigate.push({
                        url: `/pages/CateSearch/index?cateId=${i.id}&name=${i.name}&type=PART`
                      })
                    }}>
                      {
                        i.img ? <image mode="aspectFill" style={{width: '251rpx', height: '251rpx'}} src={ i.img }/> : <div style={{height: '251rpx', lineHeight: '251rpx'}}>暂无图片</div>
                      }
                    {i.name}
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
