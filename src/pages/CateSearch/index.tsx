import { createElement, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import styles from './index.module.less';
import { Dialog, Picker, Icon } from '@alifd/meet';
import ScrollView from 'rax-scrollview';

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];
function CategoryCopy() {
  const { cateId } = getSearchParams()
  const [ showDialog, setDia ] = useState(false)
  if(!cateId) {
    return <div>非法访问</div>
  }
  return (
    <div className={styles['wrap']}>
      <div className="search-wrap">
        <div className="item" onClick={() => {
          setDia(true);
        }}>设备<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item">品牌<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
        <div className="item">地区<Icon type="arrow-down" style={{fontSize: '13px'}}/></div>
      </div>
      <ScrollView  onEndReached={() => {
        
      }}className={styles['list']} style={{height: `calc( 100vh - 33px )`}}>
       {
        new Array(10).fill(1).map(i =>  <div className="item">
        <image style={{width: '230rpx'}} src="http://121.204.145.151:8087/lease-center//appfile/download?id=324e8ef626da4c9989dde953b1c901ae" alt="" mode="widthFix"/>
        <div className="rg">
          <div className="tit">出租美通LMT5094摊铺机</div>
          <div className="txt">设备租赁公司挖掘机出租、挖掘机出租、出租挖掘机、上海挖掘机租赁、挖掘机租赁、租赁挖掘机。立足上海，面向铁路、公路、水利电力、市政建设市场，与中建三局、中铁隧道、上海城建等诸多单位合作过，诚实守信，服务周到！期待与您合作！空压机；挖掘机：50-330型，服务周到、24小时随时为您服务，诚邀您　 主营：挖掘机出租;吊车出租;压路机出租;叉</div>
          <div className="price">¥9999 / 月  <span style={{color: '#333', fontSize: '12px'}}>福州市</span></div>
          <div className="comp">合肥安弘工程设备租赁有限公司</div>
        </div>
      </div>)
       }
      </ScrollView>
      <Dialog visible={showDialog} closeMode={['ok', 'cancel', 'mask']} title="请选择" onClose={() => setDia(false)}>
        <Picker data={seasons}/>
      </Dialog>
    </div>
  );
}

export default CategoryCopy;
