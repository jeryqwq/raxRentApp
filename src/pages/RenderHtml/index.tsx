import { createElement, useEffect, useState } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import { getSearchParams } from 'rax-app';
import { myRequest } from '@/utils';

function RenderHtml() {
  const { type } = getSearchParams()
  const [html, setHtml] = useState('')
  async function render (name) {
    const res =  await myRequest({
      url: '/appdict/param/' + name,
      method: 'get'
     })
    setHtml(res.msg)
   }
  useEffect(() => {
    type && render(type)
  }, [])
  return (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
  );
}

export default RenderHtml;
