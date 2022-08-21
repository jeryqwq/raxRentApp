import { createElement } from 'rax';
import View from 'rax-view';
import Menu from '@/components/Menu';
import { Slider } from '@alifd/meet';
import Image from 'rax-image';
import styles from './index.module.less';
import Title from '@/components/Title'
import TriggerList from '@/components/TriggerList';
import ProductItem from '@/components/ProductItem';
import OldItem from '@/components/OldItem';
import PartItem from '@/components/PartItem';
import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
const menus = [
  {
    src: 'http://121.204.145.151:8087/icons/menu1.png',
    title: '设备租赁'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu2.png',
    title: '新机出售'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu3.png',
    title: '二手设备'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu4.png',
    title: '配件商城'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu5.png',
    title: '机手求职'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu6.png',
    title: '设备维修'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu7.png',
    title: '品牌设备'
  },
  {
    src: 'http://121.204.145.151:8087/icons/menu8.png',
    title: '物流运输'
  },

]

function Pages() {

const items = [
  {
    type: 'image',
    src: 'http://121.204.145.151:8087/lease-center//appfile/download?id=f85e9accfe704fa89911f2274fd8286c',
  },
  {
    type: 'image',
    src: 'http://121.204.145.151:8087/lease-center//appfile/download?id=f85e9accfe704fa89911f2274fd8286c',
  },
];

  return (
    <div className={'content-wrap'}>
      <div className="content">
        <Slider  height={372}  autoplay={true} infinite={true}>
              {items.map((img, idx) => {
                return (
                  <Slider.Item key={idx}>
                    <View>
                      <Image
                        source={{
                          uri: img.src,
                        }}
                        style={{
                          width: '100%',
                          height: 372,
                        }}
                      />
                    </View>
                  </Slider.Item>
                );
              })}
        </Slider>
        
        <div className={styles.menus}>
              {
                menus.map((i) =><div className="item">
                <img src={i.src} />
                <div>{i.title}</div>
              </div> )
              }
              
        </div>
        
        <Title title='设备租赁' path=''/>
        <TriggerList defaultVal='' onChange={(value) => {
        
        }} list={[{label: 'xxx', value: ''}, {label: 'xxxx2', value: '1'}]} />
        <div className={styles['prod-list']}>
        {
          new Array(6).fill(1).map(i => <ProductItem />)
        }
        </div>
        {/* 设备租赁 end */}

        <Title title="品牌设备" path=''/>
        <div className={styles['brands']}>
          {
            new Array(6).fill(1).map(i => <div className="item">
            <img src="http://121.204.145.151:8087/lease-center/appfile/download?id=e26aaa8d2a9648cabec31d7aca0e4f70" alt="" />
            <div className="tit">卡特彼勒</div>
          </div>)
          }
        </div>

        <Title title='二手设备' path=''/>
        <div className={styles['old-wrap']}>
          {
            new Array(4).fill(1).map(i => <div style={{width: '46%'}}>
              <OldItem />
            </div>)
          }
        </div>

        <Title title='零件配件' path=''/>
        <div className={styles['parts']}>
          {
            new Array(3).fill(1).map(i => <PartItem />)
          }
        </div>

        <img src="https://www.fjrongshengda.com/wxapp/repairbg.png" style={{width: '700rpx', height: '300rpx', margin: '25rpx auto auto 25rpx'}}/>

        <Title title='培训课程' path=''/>
        <CourseItem />
        <CourseItem />

        <Title title='行业动态' path=''/>
        <NewsItem />
      </div>
      <Menu index={0}/>
    </div>
  );
}

export default Pages;
