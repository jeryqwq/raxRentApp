import CourseItem from '@/components/CourseItem';
import NewsItem from '@/components/NewsItem';
import { myRequest } from '@/utils';
import { Radio } from '@alifd/meet';
import { createElement, useEffect, useState } from 'rax';
import { getSearchParams } from 'rax-app';
import ScrollView from 'rax-scrollview';
import styles from './index.module.less'
function CourseList() {
  const [list, setList] = useState<any[]>([])
  const { type } = getSearchParams()
  const [params, setParams] = useState({
    current: 0,
    size: 12,
  })
  async function loadData() {
    let conditions:any = []
    if(type) {
      conditions.push({
        column: "type_id",
      operator:  "eq",
      value: "flgw"
    })
    }else{
      conditions.push({
        column: "type_id",
      operator:  "ne",
      value: "flgw"
    })
    }
    const res = await myRequest({
      url: '/appnews/page',
      data: {
        ...params,
        conditions
      },
      method: 'post'
    })
    setList(list.concat(res.records))
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
