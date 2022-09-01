import { createElement, useEffect, useState } from 'rax';
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
import { myRequest } from '@/utils';
import IsLogin from '@/components/isLogin';
const menus = [
  {
    src: 'https://www.fjrongshengda.com/icons/menu1.png',
    title: '设备租赁'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu2.png',
    title: '新机出售'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu3.png',
    title: '二手设备'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu4.png',
    title: '配件商城'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu5.png',
    title: '机手求职'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu6.png',
    title: '设备维修'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu7.png',
    title: '品牌设备'
  },
  {
    src: 'https://www.fjrongshengda.com/icons/menu8.png',
    title: '物流运输'
  },

]

function Pages() {
  const [lunbo, setLunbo] = useState([])
  const [brands, setBrands] = useState<any[]>([])
  const [sales, setSale] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [parts, setParts] = useState<any[]>([])
  const [course, setCourse] = useState<any[]>([])
  const [rents, setRent] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      const res = await myRequest({
        url: '/appnews/findLunbo',
        method: 'get',
      })
      setLunbo(res.map(i => ({
        type: 'image',
        src: 'https://www.fjrongshengda.com/lease-center/' + i.headUrl,
      })))
      const res2 = await myRequest({
        url: '/mallBrandInfo/page',
        method: 'post',
        data: {
          page: 0,
          size: 6,
        },
      })
      setBrands(res2.records)
      const res3 = await myRequest({
        url: '/equipmentLease/getRecommList',
        method: 'get'
      })
      setRent(res3)
      const res4 = await myRequest({
        method: 'get',
        url: '/equipmentSale/getRecommList'
      })
      setSale(res4)
      const res5 = await myRequest({ method: 'post', url:'/appnews/findRecomand' })
      setNews(res5)
      const res6 = await myRequest({
        method: 'get',
        url: '/equipmentParts/getRecommList'
      })
      setParts(res6)
      const res8 = await myRequest({
        method: 'get',
        url: '/trainingCourse/getRecommList'
      })
      setCourse(res8)
    })()
  }, [])

  return (
    <div className={'content-wrap'}>
      <div className="content">
        <Slider  height={372}  autoplay={true} infinite={true}>
              {lunbo.map((img, idx) => {
                return (
                  <Slider.Item key={idx}>
                    <View>
                      <Image
                        source={{
                          uri: img.src
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
        {/* <TriggerList defaultVal='' onChange={(value) => {
        
        }} list={[{label: 'xxx', value: ''}, {label: 'xxxx2', value: '1'}]} /> */}
        <div className={styles['prod-list']}>
        {
          rents.map(i => <ProductItem item={i}/>)
        }
        </div>
        {/* 设备租赁 end */}

        <Title title="品牌设备" path=''/>
        <div className={styles['brands']}>
          {
           brands.map(i => <div className="item">
            <img src={"https://www.fjrongshengda.com/lease-center/" + i.brandLogo} alt="" />
            <div className="tit">{ i.brandName }</div>
          </div>)
          }
        </div>

        <Title title='二手设备' path=''/>
        <div className={styles['old-wrap']}>
          {
            sales.slice(0, 3).map(i => <div style={{width: '46%'}}>
              <OldItem item={i}/>
            </div>)
          }
        </div>

        <Title title='零件配件' path=''/>
        <div className={styles['parts']}>
          {
           parts.map(i => <PartItem item={i}/>)
          }
        </div>

        <img src="https://www.fjrongshengda.com/wxapp/repairbg.png" style={{width: '700rpx', height: '300rpx', margin: '25rpx auto auto 25rpx'}}/>

        <Title title='培训课程' path=''/>
        {
          course.map(i => <CourseItem item={i}/>)
        }
        <Title title='行业动态' path=''/>
        {
          news.map(i => <NewsItem item={i}/>)
        }
      </div>
      <Menu index={0}/>
      <IsLogin />
    </div>
  );
}

export default Pages;

