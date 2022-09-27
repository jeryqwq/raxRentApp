import { createElement } from 'rax';
import { getSearchParams } from 'rax-app';

function WebView() {
  let { url } = getSearchParams()
  url = decodeURIComponent(url)
  return (
    <web-view src={url}/>
  );
}

export default WebView;
