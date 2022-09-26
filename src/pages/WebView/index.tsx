import { createElement } from 'rax';
import { getSearchParams } from 'rax-app';

function WebView() {
  let { url } = getSearchParams()
  return (
    <web-view src={url}/>
  );
}

export default WebView;
