import { createElement, useEffect, useState } from 'rax';
import { getStorage } from '@uni/storage';
import navigator from '@uni/navigate';
import { naviTo } from '@/utils';

function IsLogin() {
  const [islogin, setLogin] = useState<any>(false)
  useEffect(() => {
    getStorage({
      key: 'token',
      success(res) {
        setLogin({})
      }
    })
  }, [])
  return (
    !islogin &&  <div
      onClick={() => {
        naviTo('/pages/Login/index', '#/login')
      }}
      style={{position: 'fixed', top: '0', left: '0', width: '100vw', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', padding: '5px'}}>
      <span style={{ color: 'white', fontSize: '15px' }}>您暂未登录，点击跳转登录页</span>
    </div>
  );
}

export default IsLogin;
