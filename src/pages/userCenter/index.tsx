import { createElement, useEffect, useState } from 'rax';
import styles from './index.module.less';
import { Badge, Avatar, Icon } from '@alifd/meet';
import Menu from '@/components/Menu';
import { myRequest, setCommonData } from '@/utils';
import { showToast } from '@uni/toast';
import { navigate } from '@uni/apis';
import Title from '@/components/Title';

function User() {

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
                <img className='item' style={{ width: '22px', height: '22px' }} src='https://www.fjrongshengda.com/wxapp/chat.png'/>
              </div>
              <div className="info">
                吐泡泡的鱼 <span style={{fontSize: '10px'}}>xxx认证</span>
              </div>
              <div className="phone">
                132312312321
              </div>
            </div>
          </div>
          <div className="line2">
            <div className="more">
            我的订单<span className='tip'>查看更多</span>
            </div>
            <div className="items">
              <div className="item">
                <Badge count={2}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step0.png'}/>
                </Badge>
                <div>待确认</div></div>
              <div className="item">
                <Badge count={2}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step1.png'}/>
                </Badge>
                <div>待确认</div>
              </div>
              <div className="item">
              <Badge count={2}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step2.png'}/>
                </Badge>
                <div>待确认</div></div>
              <div className="item">
              <Badge count={2}>
                  <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/step3.png'}/>
                </Badge>
                <div>待确认</div></div>
            </div>
          </div>
          <div className="line3">
            <span style={{ fontSize: '16px' }}>通知</span><span style={{margin: '0 10px'}}>|</span><span className='txt'>商家已经确认您的租赁订单，挖掘机沃尔商家已经确认您的租赁订单，挖掘机沃尔</span> {'>'}
          </div>

          <div className="line2">
            <div className="items">
              <div className="item sty2">
              <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/address.png'}/>
                常用地址</div>
              <div className="item sty2">
                <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/repaire.png'}/>
                维修订单
              </div>
              <div className="item sty2">
              <img style={{width: '35px', height: '35px'}} src={'https://www.fjrongshengda.com/wxapp/msg.png'}/>
                
                修改密码</div>
            </div>
          </div>
        </div>
      </div>
    <Menu index={3}/>

    </div>
  );
}

export default User;
