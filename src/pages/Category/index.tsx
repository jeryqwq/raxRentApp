import { createElement, useState } from 'rax';
import { Tab, Nav, Icon} from '@alifd/meet';
import styles from './index.module.less';
import Menu from '@/components/Menu';
import navigate from '@uni/navigate';

function Category() {
  const [activePicker, setActive] = useState<'All'|'Brand' | 'Addr'>()
  return (
   <div className="content-wrap">
    <div className="content">
    <div className={styles['wrap']}>
       <Tab defaultActiveKey="all" contentStyle={{padding: 0}}>
            <Tab.Item key='all' title="全部设备">
             <div className="item-wrap">
             <div className="lf">
             <Nav dataSource={[{ key: 'nav2', label: <span style={{fontSize: '14px'}}>Nav2</span>},{ key: 'nav3', label: <span style={{fontSize: '14px'}}>Nav3</span>}]} onSelect={() => {

             }} >
              </Nav>
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
            <Tab.Item key='rent' title="设备出租">
              <div style={{ textAlign: 'center', padding: '50rpx' }}>设备出租</div>
            </Tab.Item>
            <Tab.Item key='part' title="配件商城">
              <div style={{ textAlign: 'center', padding: '50rpx' }}>配件商城</div>
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
