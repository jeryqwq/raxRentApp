import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
import { Badge, Avatar, Icon } from '@alifd/meet';
import Menu from '@/components/Menu';
import { myRequest, naviTo, setCommonData } from '@/utils';
import { isWeChatMiniProgram } from '@uni/env';
import { navigate } from '@uni/apis';
import { List, Checkbox, Switch } from '@alifd/meet';

 const orderStatus = {
  1: '下单待支付',
   2:'已经支付',
    3:'已经发货' ,
    10:'结束'
}

function User() {
  const [_user, setUser] = useState({ user: {} })
  const [nums, setNums] = useState<any[]>([])
  const [msg, setMsg] = useState({})
  useEffect(() => {
    loadUser()
    reload()
  }, [])
  async function loadUser() {
    const res = await myRequest({
      url: '/sysuser/getUserInfo',
      method: 'get'
    })
    setUser(res)
  }
  const reload = async () => {
    const res = await myRequest( {
      method: 'post',
      url: '/mallOrderMaster/pageMy',
      data:{
        "current": 0,
        size: 99999
      }
    })
    const res2 = await myRequest({
      url: '/businessCenter/pageBusinessNotice',
      data: {
        current: 0,
        size: 1
      },
      method: 'post'
    })
    res2.records.length && setMsg(res2.records[0])
    let temp:any = {};
    (res.records || []).forEach(i => {
      temp[i.orderStatus] ? temp[i.orderStatus]++ : (temp[i.orderStatus] = 1)
    })
    setNums(temp);
  }
  const {user} = _user as any
  console.log(user.shareCode)
  return (
    <div className="content-wrap">
      <div className="content" style={{paddingBottom: 0}}>
        <div className={styles.wrap}>
          <div className="line1">
            <div className="lf">
                <Avatar  style={{width:'70px', height: '70px' }} shape='circle' icon={<Icon name="account" />} />
            </div>
            <div className="rg">
              <div className="icons">
                <img className='item' style={{ width: '22px', height: '22px' }} src='https://www.fjrongshengda.com/wxapp/server.png'/>
                <img className='item' style={{ width: '22px', height: '22px' }} src='https://www.fjrongshengda.com/wxapp/chat.png'  onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/message/index' : '#/message',
                  refresh: !isWeChatMiniProgram
                })
              }}/>
              </div>
              <div className="info">
                {user.name} <span style={{fontSize: '10px'}}>{_user?.brand?.status === 1 ? '企业认证' : '个人'}</span>
              </div>
              <div className="phone">
                {user.username}
              </div>
            </div>
          </div>
          <div className="line2">
            <div className="more">
            我的订单<span className='tip' onClick={() => {
              navigate.push({
                url: isWeChatMiniProgram ? '/pages/orders/index' : '#/orders',
                refresh: !isWeChatMiniProgram
              })
            }}>查看更多</span>
            </div>
            <div className="items">
              <div className="item"onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/orders/index?status=1' : '#/orders?status=1',
                  refresh: !isWeChatMiniProgram
                })
              }}>
                <Badge count={nums[1]}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step0.png'}/>
                </Badge>
                <div>{orderStatus[1]}</div></div>
              <div className="item"onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/orders/index?status=2' : '#/orders?status=2',
                  refresh: !isWeChatMiniProgram
                })
              }}>
                <Badge count={nums[2]}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step1.png'}/>
                </Badge>
                <div>{orderStatus[2]}</div>
              </div>
              <div className="item" onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/orders/index?status=3' : '#/orders?status=3',
                  refresh: !isWeChatMiniProgram
                })
              }}>
              <Badge count={nums[3]}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step2.png'}/>
                </Badge>
                <div>{orderStatus[3]}</div></div>
              <div className="item" onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/orders/index?status=10' : '#/orders?status=10',
                  refresh: !isWeChatMiniProgram
                })
              }}>
              <Badge count={nums[10]}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step3.png'}/>
                </Badge>
                <div>{orderStatus['10']}</div></div>
            </div>
          </div>
          <div className="line3" onClick={() => {
            navigate.push({
              url: isWeChatMiniProgram ? '/pages/message/index' : '#/message',
              refresh: !isWeChatMiniProgram
            })
          }}>
            <span style={{ fontSize: '16px' }}>通知</span><span style={{margin: '0 10px'}}>|</span><span className='txt'>{msg.msg ? msg.msg : '暂无'}</span> {'>'}
          </div>

          <div className="line2">
            <div className="items2">
              <div className="item sty2" onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/AddressMan/index?open=0' : '#/addressMan?open=0',
                  refresh: !isWeChatMiniProgram
                })
              }}>
              <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/address.png'}/>
                常用地址</div>
              <div className="item sty2"  onClick={() => {
                navigate.push({
                  url: isWeChatMiniProgram ? '/pages/repairList/index' : '#/repairList',
                  refresh: !isWeChatMiniProgram
                })
              }}>
                <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/repaire.png'}/>
                维修订单
              </div>
              <div className="item sty2" onClick={() => {
                naviTo('/pages/ChangePwd/index', '/changePwd')
              }}>
              <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/msg.png'}/>
                修改密码</div>
                <div className="item sty2" onClick={() => {
                  naviTo('/pages/WebView/index?url=' + encodeURIComponent(`https://www.fjrongshengda.com/h5app/#/share?code=${user.shareCode}`), '/share?code=' + user.shareCode)
                }}>
                <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/shar.png'}/>
                  分享
                </div>
            </div>
          </div>

          <div className="line2">
              <div className="item3">
                <span>平台规则</span>
                <span className='in-arr'>{'>'}</span>
              </div>
              <div className="item3">
                <span>用户协议</span>
                <span className='in-arr'>{'>'}</span>
              </div>
              <div className="item3">
                <span>服务保障</span>
                <span className='in-arr'>{'>'}</span>
              </div>
              <div className="item3">
                <span>服务规则</span>
                <span className='in-arr'>{'>'}</span>
              </div>
          </div>
        </div>
      </div>
      <Menu index={3}/>
    </div>
  );
}

export default User;
