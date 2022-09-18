import CourseItem from '@/components/CourseItem';
import { myRequest } from '@/utils';
import { Radio } from '@alifd/meet';
import { createElement, useEffect, useState } from 'rax';
import ScrollView from 'rax-scrollview';
import styles from './index.module.less'
function CourseList() {
  const [list, setList] = useState<any[]>([])
  const [dict, setDict] = useState<any[]>([])

  const [params, setParams] = useState({
    current: 0,
    size: 6
  })
  async function loadData() {
    let conditions = [];
    if(params.course_type) {
      conditions.push({
        column: "course_type",
        operator: "eq",
        value: params.course_type,
      })
    }
    const res = await myRequest({
      url: '/trainingCourse/page',
      data: {
        ...params,
        conditions
      },
      method: 'post'
    })
    setList(res.records)
  }
  useEffect(() => {
    (async () => {
      // loadData()
      const res2 = await myRequest({
        url: '/appdict/kcpxlx',
        method: 'get'
      })
      setDict(res2)
    })()
  }, [])
  useEffect(() => {
    loadData()
  }, [params])
  return (
    <div className={styles.wrap}>
      <Radio.Group
      direction='hoz'
      style={{margin: '5px'}}
      onChange={(val) => {
        setParams({
          ...params,
          course_type: val
        })
      }}
        dataSource={dict.map(i => ({label: i.name, value: i.code}))}
      />
      <ScrollView  onEndReached={() => {
        setParams({
          ...params,
          current: params.current+1
        })
      }}className={styles['list']} style={{height: `calc( 100vh - 33px )`}}>
              {
        list.map(i => <CourseItem item={i}/>)
      }
      </ScrollView>

    </div>
  );
}

export default CourseList;
