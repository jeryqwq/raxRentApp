import { createElement } from 'rax';
import View from 'rax-view';
import Menu from '@/components/Menu';
import { Slider } from '@alifd/meet';
import Image from 'rax-image';
import styles from './index.module.less';

const menus = [
  {
    src: 'http://121.204.145.151:8087/icons/menu1.png',
    title: '设备租凭'
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
        <Slider   height={372}  autoplay={true} infinite={true}>
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

      </div>
      <Menu index={0}/>
    </div>
  );
}

export default Pages;
