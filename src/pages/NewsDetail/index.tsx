import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams } from 'rax-app';
import { myRequest } from '@/utils';

function NewsDetail() {
  const { id } = getSearchParams() as any
  const [newItem, setNewItem] = useState<any>({content: 'loadding...'})
  useEffect(() => {
    (async () => {
      const res = await myRequest({
        url: `/appnews/${id}`,
        method: 'get'
      })
      setNewItem(res)
    })()
  }, [id])
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ fontSize: '18px' }}>{newItem.title}</div>
      <div style={{ fontSize: '12px', color: '#999', margin: '5px' }}>发布时间：{newItem.publishTime}</div>
      <div dangerouslySetInnerHTML={{__html: newItem.content}} style={{textAlign:'left', padding: 50}}></div>
    </div>
  );
}

export default NewsDetail;
