import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams } from 'rax-app';
import { Slider } from '@alifd/meet';
import styles from './index.module.less';
const apis = {
  
}
function Rentdetail() {
  const { id, type } = getSearchParams()
  if(!id || !type) return <div>非法访问</div>

  return (
    <div className={styles['page']}>
      <div className={styles['wrap']}>
       <Slider width={690} height={372}  autoplay infinite >
            {['http://121.204.145.151:8087/lease-center//appfile/download?id=324e8ef626da4c9989dde953b1c901ae'].map((img) => {
              return (
                <Slider.Item key={img}>
                  <View>
                    <img
                      src={img}
                      style={{
                        width: 690,
                        height: 372,
                      }}
                    />
                  </View>
                </Slider.Item>
              );
            })}
          </Slider>
      <div className="line1">
        <div className="lf">
          <div className="tit">福建省福州市鼓楼区挖掘机设备出租</div>
          <div className="price">租金：<span style={{color: '#FF0505', fontSize: '21px'}}>￥16500元</span>/月</div>
        </div>
        <div className="rg"></div>
      </div>
      <div className="line2">
        <div className="item">沃尔沃</div>
        <div className="item">沃尔沃</div>
        <div className="item">沃尔沃</div>
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line3">
        <div className="mtit">
          产品属性
        </div>
        <div className="info">
          <div className="item">
            设备型号: <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
          <div className="item">
            设备型号:  <span className='val'>xxxxx</span>
          </div>
        </div>
        <div className="mtit">
          产品详情
        </div>
        <div style={{fontSize: '12px', color: '#033333'}}>请对设备的技术参数、设备状况、提供的配套辅件、服务项目、服务商实力进行说明（限200字）</div>
        <image style={{width: '100%'}}src="http://121.204.145.151:8087/lease-center//appfile/download?id=324e8ef626da4c9989dde953b1c901ae" alt="" />
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line4">
        <div className="mtit">
          商家
        </div>
        <div className="cnt">
        <div className="lf">
            <image src="http://121.204.145.151:8087/images/store.png" style={{width: '60px', height: '60px'}}/>
            <div className="rg">
              <div className="name">商家名称</div>
              <div className="stat">身份认证</div>
            </div>
          </div>
          <div className="rg">
            <div className="btn">联系商家</div>
          </div>
        </div>
      </div>
      <div style={{height: '8px', background: '#F1F1F1'}}></div>
      <div className="line4">
        <div className="mtit">
            其他商品相关推荐
        </div>
        <div className='list-wrap'> 
          {
            new Array(6).fill(1).map(i => <div className='item'>
              <image style={{width: '325rpx'}} src="http://121.204.145.151:8087/lease-center//appfile/download?id=324e8ef626da4c9989dde953b1c901ae" alt="" />
              <div className="tit">福建省福州市鼓楼区挖掘机设备出租</div>
              <div className="price"><span>￥16500元/月</span> <span style={{fontSize: '12px', color: '#999'}}>福州市</span></div>
            </div>)
          }
        </div>
      </div>
    </div>
        
      <div className={styles['buy']}></div>
    </div>
  );
}

export default Rentdetail;
