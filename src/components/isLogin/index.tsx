import { createElement, useEffect, useState } from 'rax';
import { getStorage, getStorageSync } from '@uni/storage';
import navigator from '@uni/navigate';
import { naviTo, wxAutoLogin } from '@/utils';
import { isWeChatMiniProgram } from '@uni/env';

function IsLogin() {
  const [islogin, setLogin] = useState<any>(false)
  useEffect(() => {
    if(isWeChatMiniProgram) {
      getStorage({
        key: 'TK',
        success(){
          setLogin({})
        }
      })
      wxAutoLogin(false)
    }else{
      localStorage.getItem('TK') && setLogin({})
    }
  }, [])
  return (
    !islogin &&  <div
      onClick={() => {
        naviTo('/pages/Login/index', '/h5Login')
      }}
      style={{position: 'fixed', top: '0', left: '0', width: '100vw', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', padding: '5px'}}>
      <span style={{ color: 'white', fontSize: '15px' }}>您暂未登录，点击跳转登录页</span>
    </div>
  );
}

export default IsLogin;
