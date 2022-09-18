import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
import { myRequest } from '@/utils';
import { Radio } from '@alifd/meet';
import { createElement, useEffect, useState } from 'rax';
import ScrollView from 'rax-scrollview';
import styles from './index.module.less'
function CourseList() {
  const [list, setList] = useState<any[]>([])

  const [params, setParams] = useState({
    current: 0,
    size: 6
  })
  async function loadData() {
    const res = await myRequest({
      url: '/appnews/page',
      data: {
        ...params
      },
      method: 'post'
    })
    setList(res.records)
  }

  useEffect(() => {
    loadData()
  }, [params])
  return (
    <div className={styles.wrap}>
      <ScrollView  onEndReached={() => {
        setParams({
          ...params,
          current: params.current+1
        })
      }} style={{height: `calc( 100vh )`}}>
              {
        list.map(i => <div style={{margin: '5px '}}>
          <NewsItem item={i}/>
        </div>)
      }
      </ScrollView>

    </div>
  );
}

export default CourseList;
