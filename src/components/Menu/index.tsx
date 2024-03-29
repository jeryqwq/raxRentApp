import { createElement, useState } from 'rax';
import styles from './index.module.less'
import { ActionSheet, Dialog, Icon } from '@alifd/meet';
import navigate from '@uni/navigate';
import { isWeChatMiniProgram } from '@uni/env';
import { loadUser, myRequest, naviTo } from '@/utils';
import { showToast } from '@uni/toast';
let user
function Menu({ index } : {index: number}) {
 
  async function check(url,h5) {
    const _user = user || await loadUser()
    if(_user?.brand?.status === 1) {
      naviTo(url, h5)
    }else{
      let states: any, authRes: any
        const res = await myRequest( { url: '/sysOrgan/findMy', method: 'get', data: { type: 1 } })
          states = res?.status
          authRes = res
          user = undefined
          if(states === 0) {
            showToast('认证中，请稍后')
          }else if(states === -1){
            showToast('认证失败，原因：' + authRes?.statusMsg + '  请重新提交')
            naviTo('/pages/SalerAuth/indec?user=' + _user.user.id, '/salerAuth?user=' + _user.user.id)
          }else if(states === 1){
            showToast('您已认证，无需认证')
          }else{
            naviTo('/pages/SalerAuth/index?user=' + _user.user.id, '/salerAuth?user=' + _user.user.id)
          }
      }
  }
  async function checkBuy(url,h5) {
    const _user = user || await loadUser()
    console.log(_user, '-user')
    if(_user?.construction?.status === 1) {
      naviTo(url, h5)
    }else{
      let states: any, authRes: any
        const res = await myRequest( { url: '/sysOrgan/findMy', method: 'get', data: { type: 2 } })
          states = res?.status
          authRes = res
          user = undefined
          if(states === 0) {
            showToast('认证中，请稍后')
          }else if(states === -1){
            showToast('认证失败，原因：' + authRes?.statusMsg + '  请重新提交')
            naviTo('/pages/BuyAuth/index?user=' + _user.user.id, '/buyAuth?user=' + _user.user.id)
          }else if(states === 1){
            showToast('您已认证，无需认证')
          }else{
            naviTo('/pages/BuyAuth/index?user=' + _user.user.id, '/buyAuth?user=' + _user.user.id)
          }
      }
  }
  return (
    <div style={{position: 'relative', zIndex: 1}}>
    <div className={ styles['menu-wrap']}>
      <div className="item" onClick={() => {
        navigate.push({
          url: isWeChatMiniProgram ? '/pages/Index/index' : '/',
          isHash: !isWeChatMiniProgram
        })
      }}>
        {
          index === 0 ? 
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABS1JREFUaEPtmk9oHHUUx7/vF2v1IG4PodRWshKV+qd0IgiiYGegBw89RBCpVXD2kIOFYFKoGqWtQWvFiEkptIccdnNoq1BoDh48CJvqJVAwkQYL/UNSamlphI4UDDXu78lvdn6zs7uZ3Znd2WQp3cvml/ebP5/fe9957/dmCffJh+4TDjwAieLJ1J4ZAwI73LkS55xTPbNRjmtkTks8krJnUlRAloh6mRmkrsIACUwWCBkn1+M0crO1jkkcREE8xJQHwVA3r4KXFYQHw4QFAX5zMZesdxIF6bRnDJA4S0TpoicIK32D4EBKK0mYxEA6++YMIWUeQCpi2DhSCGtx/MVEdJMIyOa+OUMy50GU0h7Q8VRrTEQOAdaNBGCaBlEQILgQxZvXmvD+KOrcDbMQuwNuHqYpkM175wwqUJ5EyRO1tBGmGSI4kti6cbzxMGsYJL13zpAQeYBS3prrtW/wGw4zMtdPPD8ZUWNl0xoCSfdftME0qoQdRxPqGVxvPiRnFo4/l4sLExuku/+SLSFVsis6wl3/4qM2qTFBZq4eiwcTC6R74JINZheiMS3EOA7IXB17NrJnIoM8s09BUDauy5uaz5y5HBEmEsjWfVdsBrJurazrDb/8CIRVC+ySkbn83dN1PVMXZOv+KzYpT3i1kr/CqzkmDFwc6T7acNH4wkfzowweCOQyL7kFHOMVhF4ubJ1dcu6Pke5MGEyoR7Z9Mp9lwG4qxhM+mIDcha+fWhFmRZDtn17LMrOtn046rNphLCFzF76qhqkCMT67pp5M9ppqQnmytgZzs4e7yjxTBvLSwetjzPyhnydAfrJz80YbjSFx9LcvnxzQ0euDvHzoT0OCZyqXQt98KdzLl2ot7QLUc354i7ufCYLYJEhpo7gvDezw2nUMgcz5g1vcHOODvPLFTZNZ7fB0p6BUOxU7B3p/0T52AlnTBzZNlYGYh+ZT99Y9MsvgriqNaG2EaWQt7JJ/nz7whFGlEfWPVw/fNohkjoHtWgnlitCCLympNI8nmLEQK3UQTALt8Ipot44uaq76/LrO9jR5ThLs6aFN/vVWzCPmkZvpZaZeIWg0imYINPHr0MaGkudrR24tEFFXJE0KDHb8sz43Nbyhqi8WmtnNkUVTSlZdkeKn5nOdh3/5eOPnsbzhTX79m9szYKh9v7+fCbueKJA1NdTpaqLyUxMEQL7YOFAPsUq3B8ZEC1hetqYCro4CZX77l+pEnq1/fv/61tT+BkBIUL5SK2s5lpLjg+wcXTSBjrzu3QbSi/8kLu0UQ6phfyeZlF1YPw9uiBdaO0fvmERRNVJPQ8nYWVJ8kDeO3TGZKe82Fvw8oRs/Xg1WmT/8RlBr7IJg/dQf0yMKBNReGmHm+CC7lEc6tEZidD9qdOGb7b4IIawfP3gsnkZ2nbhrAkGNlHq5KyYWvxYLSTyJ2NEYiBCU16oo10pJA6tp75CwJuN6pHf8rslQGglUU57wK29+tcaAtCb7YoZW7/iSKQR7eaQ9NNLBwjrT92g8jbyVXTKZ4dVauh7V8a/3J4Fx2Zvu1tiJYJ3JxATZnV1KF4jmw8Km8lWC1lDYK4Yk7OqFUGwQtdZvT9xziPB42LpXFoaVfkvUzvj7h/fXh76frNky3X3yXxtSd98DVbBbQ63uGMDg6fceHgurquv2fvecXFb7DNV28T0TpURPeM7wqXfX1dzv1AVRN2Sf5vR/XDBAZKjfYgDC/U1Gq7+JhbNMYvL7d6juFjoSSMKr25LTPQBpybI2cdL/AVHW8W8aGKIhAAAAAElFTkSuQmCC"/>
          :
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA8FJREFUaEPtmV1OGzEQgD0rhddyg8IJyg0aTlA4AYkUW7yRnqDpCYA3ZCMRTkB6AugNyAlKT9DympV2qlmtV8bYWXvXmyIUvxAlXu988+eZAdg7WfBOOFhvIEKIE0QcMcYOKmU9MsYWSqnLPpSXHIRzToLfAIAGeCE3IhLQWClFf5OtpCAVxD0A7BoSPlefP+jvEPEvY+wwJUwyEAfEMyJOlVJzAhBCHDHG6HMJlBomCYgHYmhrnPYBwEMfMJ1BQiG0W7lgAGAspVx0CZhOIJxzykrnRkyQO72yhC2gDVO5GiWA0g3brNYgBAEAN2ZQh0BYliHBPxlJoDVMKxAHxDLLsqOrq6unGG2ORqPdnZ0dipnOMNEgLojVajWcz+eUUqNXKpgokNQQmjoFTDBIXxANMHQPBZU0QSBCiHPG2NTwm2UXd/L5n8cyc6XUuMlnG0E451Q3UZrVqxcI0zKDwWABAJ+NbNYIsxbEAXG7Wq2mbQO7Savm70IISs0noTBeEBeElNK0TIxcrfbGwDhB3gKEJg+FeQXyliBiYGoQyhiDweAOAIaGH9xu2p18PuiwzGOe54c6XmsQIcQdY4x6Br3eDITPMtQ6SymP6fcSpGp6CESvr1LKi1YR2vNDjov5mFqAEoRzTnn7SyXDdynlrGd5Oh0vhCD5vtEhiPhDKXWkLfKLMbZHP2RZth9bxXaSqsXDp6ene0VRkMy0nqSU+9oiD8ZNWpoq5vyqwTrzTU58Z9FEBQDIA6LeZ4YCIv5USg21Rcxb9AkRKT7KcU2e58t1N7lnchKjh0YvqDKq7llozDTTXSkiXiqlpiVIVaxRU1SPbLQkRVEcXl9fU/PjXFZ8RQEYm9fG5WQyGWZZdm8fjoi/8zw/IEXX6bfSLAX9R/OBAJA/Wjsx8WVln7Wp3gVCEHRd6EnNi5u9ssyI5lEaqAlECIEaXErZWE3rvaZw2s995rT2EsAsz/OF6fK+WqsO/gAQiqXSfxFxDgBBfTsNKowqIti1fNApQKjhosar9ULEtdOTEOt1BiHpuwR8k1vR+RsDoZdVud05gfeZqiiKh3UZMSaekliktU8FPrhRiwTK1GrbFoRzHpx+W6k48qGtRbYWiXSZ0O1b17ImFtGNVqimQ/dZMwVnpey8EM2emDH236cplmKdBaYTxOqJSXGzLMtuN93LV3LQ/Lcehvh6Hm//YFkl1Av63uct95um8RcAcNa3dCHn697ct7exo6PUBwDUMdK4qP6nZcjLE+xZImI5DGmqkhtBEgizkSPeDcg/uuT7UUp64JYAAAAASUVORK5CYII="/>
        }
        <div style={{color: index === 0 ?  '#105CCE' : '' }}>首页</div>
      </div>
      <div className="item" onClick={() => {
        navigate.push({
          url: isWeChatMiniProgram ? '/pages/Category/index' : '/category',
          isHash: !isWeChatMiniProgram
        })
      }}>
      {
          index === 1 ? 
        <img src="data:image/png;base64,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" alt="" />
          :
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA6NJREFUaEPtWV1OGzEQ9qxEXgsnKD1B4QSEE8ANGqTY4q30BIUTAG/IRiI9QeEEwAkIJwBOQHjdSDvVRN7IeO21N4nZiGZf1z/zzf98BvZJPvgkONgKyLJZMmgRzvkOAHTbFBwRb5RSwzoZaoEIIf4yxvbbBFHejYgDpdSBTxYvECEEASAgS/MVRbF7eXl55xKoDsgxY+y33vTGGDtrCdERY+yLvvtESklyVT4vEM75AwBshQ5IDU4IMVUoIg6VUtvRQHq93nqn03k1/HM7FGypAHHOtwDgoTw/z/ONwWAwsu9zWoRz3gOAK1qMiC9Kqc1Ugsacyzl/BoCvWp4DpdQgCogQghb+0It/SSnbio+JCJzzMwD4qeX5I6XsRQHhnL8CwLrWQGtuVQpruhcijpRSG0Eg1qbW3coAY7pXRbmVGLGyxB0AOPN2jG8vcg0i7tdl0VogixRkwWdV6sn/AQQR75fItboAsOMr0CGLeFuCBbtK8DgzdhljjV1rBSSo4oYLVhZpu+u1DZbUIrpL3qNL8zy/cXWldR7UZH8yICTE2trabVltaVYYj8e7sWCa7k8GRAhBk9upqXFEdLbYLqs03f+hQBhj0S3/0gDRrjE0Bp6X8Xi81cS1Op0ONaTftcUe8zzv+vYnswhdHjo8VCr6/X43y7JbPffcK6W8/FnorrlaFIsyatwFmEAYY87Jr1RGUiCWRr0Mh88y1ghbq4ikQLR7EaMx4Z3qCDQbjI6xp9iR+iOAvOOdYmsJ5/wKAEoS4VFKWXJoTgMmB6Kr87PBBl7neX5Ql72EEMRgThnDGEsmB6Ldy+aJCdix3bb0+/09ADgy2X1EPFdKUXGt/T4ECElgknpWtR8BAMWRi+SrzVTmObMAmbYesdoqL9RUEpF7ZZHzafkNEY9cjGFkhqt0EJU6Mm9KNaxDxY1crmTSiX4lDoBiaBDbARhKmpLqrphycr9CCCwPiAnEkH/P+98qnG9SygkLan4+IFPuFxHvlFK78wozz37riSOe+z08PNwsiuKpvDz07DWPkKG9Vr1hWZZ9u7i4oKwYtohOqe/mDbIMIp74nr5CAjX9T+4EAKcGTUpHeMeE0GOo+bwwkYUmQU3aVR5bmgrrWb+OiATCrvS1qTr4PO0agBYkcJNjggNbEAjdpmOGWop36bSJJDOspQfY6yzLjl0xER0jvot1KiSzV1LgDMK6toyKohg2jcUoiyxIwKTHrIAkVe8Mh38ai/wDaueuUcXt9eAAAAAASUVORK5CYII=" alt="" />
        }
        <div style={{color: index === 1 ?  '#105CCE' : '' }}>分类</div>
      </div>
      <div style={{height: '60px', position: 'relative', zIndex: 1}}>
        <div className='public' onClick={() => {
          Dialog.alert({
            centered: true,
            content: <div style={{lineHieght: '40px', fontSize: '15px'}}>
              <div  style={{display: 'flex', color: '#105CCE',
              alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#E4F0FF',fontSize: '17px',
              height: '50px',width: '540rpx'}}><img src='https://www.fjrongshengda.com/wxapp/wjj.png' style={{width: '40px', height: '40px'}}/>发布设备</div>
              <div onClick={async () => {
                check('/pages/Rent/index', 'rent')
              }} style={{margin: '15px'}}>设备出租</div>
              <div onClick={() => {
                check('/pages/SallOld/index', 'sallOld')
              }} style={{margin: '15px'}}>出售二手设备</div>
              <div onClick={() => {
                check('/pages/SallNew/index', 'sallNew')
              }} style={{margin: '15px'}}>出售新机</div>
              <div style={{display: 'flex', color: '#105CCE',
              alignItems: 'center',justifyContent: 'center',
              backgroundColor: '#E4F0FF',fontSize: '17px',
              height: '50px',width: '540rpx'}}><img src='https://www.fjrongshengda.com/wxapp/paper.png' style={{width: '40px', height: '40px'}}/>发布需求</div>
              <div onClick={() => {
                checkBuy('/pages/ForRent/index', 'forRent')
              }} style={{margin: '15px'}}>求租设备</div>
              <div onClick={() => {
                checkBuy('/pages/BuyOld/index', 'buyOld')
              }} style={{margin: '15px'}}>求购二手</div>
              <div onClick={() => {
                checkBuy('/pages/BuyNew/index', 'buyNew')
              }} style={{margin: '15px'}}>求购新机</div>
              <div onClick={() => {
                checkBuy('/pages/ForJob/index', 'forJob')
              }} style={{margin: '15px'}}>招聘机手</div>
            </div>,
            footer: false
          })
        }}>
          <Icon size="s" type={'edit'} style={{marginTop: '6px'}} />
          <div >发布</div>
        </div>
      </div>
      <div className="item" onClick={() => {
         navigate.push({
          url: isWeChatMiniProgram ? '/pages/Cart/index' : '/cart',
          isHash: !isWeChatMiniProgram
        })
      }}>
      {
          index === 2 ? 
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABS9JREFUaEPdWm1oW1UYft7bpFIdLnVsFHQ2ETeduq0VQUSwKYKCIM1EsJ80RSfqYLbghk6kLX5NBbsVJmN+JHU26S/NEFFw0EQE/wySMWWbYzZFio6hTUVX1zT3lXOTe9ukN+bm4zZ3zZ/bwznnnvc5z/vxnHNLWCM/WiM4kAXE0RXtBclOQAIgA5ASkBFJBJpjVgesAdnQE/UywadrMGPgz+PNh6wMZgmIN+qVIPkYDChEZT8XIbsS/ua4VcFkudZGb7SpxmZzLAKwCedKsReEXgGKQX2XP9nhvyaA5BrZ8MwZN4DJDD/Dv3+0feiaBHLz7h+bmBAVxhMQmTl2jwBmyV/B9HvLcz8xgSCD4zNH73ZZEkUmqv/XtsY9Z2PMvFOAIRmu+NFtlgz4gow495wLkYQ2ZuFeFGNwIh0zLNo6TzXnmdcPJn/8yB1jyxkoCOS2vedFgA+uTMi5CXq123T44ujWfhVMQSBb+n/2gsjHzCAiWOoJNF84tFVRHQWB3PnSBbcsY1KAUGqk6laWaPPA+fe3KIqjIBAxaNu+i4IIKLZb6SnxrrPv3h4yDOSu/b/EidCYR72sdnBo66WIXOcOupQsaoiR7a9MhcFoEZSoMaJSU832mYMuzX5DQHYcmB4iwmB+RlR/09Wby/yxcv0EjsTecmpKwxCQe1+b7memER1RXDW3YsZY7I1bvYbTrxh43+CvbgYmNUbU2fqKf6lOmdhPwPCp4c2aiDXESNPglMNO9lm1jqjpq5ptluXWU8Obw0UxIgbf//pMAqD16UKSiYlcZrS2+f1XUwv1sWFXomggD7z5W5iAFivUERDN/fBqg6MoraUOfvDtS36Ae60g44kR+f5AQ9bZyFCMCOMfeufSEECDmtZS1W8+DWZmP+jwdy9v0gSj4YIoBrrfu6xkrlwVrKqvtKRfeW1hRj+Y+8L7N2XdHxhmxD0y65Tk1JRmbD7NpYIxsb9G5taT+zZqGasoRsTgh0f+4OXITSwTGZWtdzEFnBzYsIIAw4yINz8yOhtjmXcq9SM3BlarDZ7+9sWbnLlJpyggj47OhoioTQWRL4OZ2s984pu99Z6ygDx2ZG6Iq33sJXnX1y/UK2eQkuqImPT4B395mPBFtWoJA2NfPX+jJhRLBuI59ndTijmaSbXTRIgrdUW9Tcl3pq9EP8H/5bPr8l7ZFhUjYgc8H/6jntwjod3rLHPzWDSQJz6+Eody7OXE50/fUF8tNysrRsTkJ33zohC1iL9tgGuir84SN49FM/LUp//2M2hESHkihJlpqcKqH7rU7apwW5LkyERPXVZFL1rGqxPaffNO2GpiIKxX77mUPlWELX9zJpoq1U+MRLCnVtedi2ZEGNU5vtAEQBTHxtU8n4hzSKDTlnUOKZmR5UEmAEkS6b7YjCRggy3u7yDdmCyJETOMLPedZQFpD7KTeLFRGBHstEfKNSZ3fvvxpJtqwPNXbadDfaSdz/XWKRlIR2DRQzL7QFBcixnhYLe9tRJgPD52XF+bnARIxKJQ2nGW7K0TedxKzTUlrd0xnhQffNK3KpkfMw8Eu2vL/h7f8dmCn4hy7wdOBLrsK1RvWcGe3rHF2dwdYOaxYHetrqgrZrc6xpPKjU3WHEYi0G3PqyRKdy0TGekcTwqZ3pYDvvKMiAWUGGHWJD0zn55P2t2FgtIIMyKJSHIyDJCSSBiYI9jcgS7K+z8xJTMiFkgvmHLLMscneuy60sGI4XpjhPvWXZdyE8NxZaEmVGiDygJSqpFmzFszQP4DeUryYPtl/5gAAAAASUVORK5CYII=" alt="" />
          :
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA3pJREFUaEPdmt1RGzEQx3dvgNeYCgIVhFQQU0GSCuLMIA1vSSpIUkHIG6NlBlNBSAVABYQKMBUkvNrDbWY90o0sfHe6w/dh7tHGuv1pV//9EAjP5MFnwgELIFrrDwCw4+CY+R8AXBHRn74DZyBKqREinuYY/MUYc9RnmFgQSJJk9/j4eNJXmIXQUkrtMfPAGZskyQgAJNyAmT8S0XgtQEIjDw4OhkmSXNjPvxtjvq0liHgIEa+tR+TQD9cSRIzWWrM1fmKM2V1nEJHeVwLQ5wNfmhCVUueI+NaGl0BJbun0QcSxMebMN6IURGstB/xrp5YveTkz/ySiz+6rUpCSRNkpHzO/dlVHKUggwWfGGMktnT1KqSNE/GQNyCqOUhBfuZi5cwkOQv29MeZcbIwCUUpNEPGl/MAYE/Wbplzmi4+volFGKaUuEfFNHyRYKXWNiHvhpkaB+O5M03T/5OTksqkdL1vXJegwzGNBROZ+dF1z+SUTACwITxRIX5RLa/0OAH4t29AokNFoNNja2vrrsjsRvS4LgSa+LwrxKBArwVKavOhSuXzFmk6n2+PxOCuXokF85fIzahM7n7emZ8O9MSZrAKPziPWIdIfzbhEAskTUJkieYlUF8YvH1rvFw8PDnTRNb+05XSgYK4H4ysXMv4lIFKS1J3j/o/lB9BkJdqT1mqssKUeD+MVjF8qltc7O6LJ6rypI1vaG8td0jDnFYuY7Isqmoe69lUB8HW+z5pKEvLm5eYuIg7zzWQnEj1Nmbq1/R0TxgPPCUumvCuLXOk1H07L1czvUSiDBwO4OANqcBY+LRraVQHzl6kPb67usMohre+XuhIi2u4ivZe+sA9KbtvdJHtFaZ90iMwtUa21vmqZXeW12ZY/YUkWkd96btPkUhXNlEDFc1AsAZCY8HxG1+DzqQ2pl9tDg8IaraaCNjY1J3vVfLY80bXCd9Z8EIufl4eFhHl5EdFXHgKLfSA+CiDybzW78/nwl8usWkdEMM59KISefiYIR0f4qYGyReOEmilJBJEmyX3SrXNsjWutsquIZv5L7eL/3cGuXdaW1QPw5V+CBlVw7+BMbD6SwkqgFYmuuxjzi9z2NesSChCX9zXQ6HZYdypgzZEVEqgaXp+6ZeVj0PzG1PSIG2RcOmXmy6gm9DV9ZezCbzc7LNuhJIDG729bfPBuQ//Un80Kvl9wUAAAAAElFTkSuQmCC" alt="" />
        }
        <div style={{color: index === 2 ?  '#105CCE' : '' }}>购物车</div>
        </div>
      <div className="item" onClick={() => {
         navigate.push({
          url: isWeChatMiniProgram ? '/pages/userCenter/index' : '/userCenter',
          isHash: !isWeChatMiniProgram
        })
      }}>
      {
          index === 3 ? 
      <img src="data:image/png;base64,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" alt="" />
          :
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABRBJREFUaEPdWl1OHDkQLvcIxNuSEyycYOEEy5xg2RNkkLDF2w4nCDlB2DdkI2U4QcgJwp4gwwmWnCDw2q3pimpkj9w1btvd9JAIv4xQd9v1uf6/QsArWeKV4ICNAJFSHgDAbwBwIITYpctCxEcAmAPAkzGGfgddgwAhwYUQbxGRfo9yJETEOyHEHBFvhgDWG8hkMtnd3t7+CwAuAGAvR/jIOw+0T1mWn2ezGWmu8+oFRClFt3/pzCZ2KiL+R8+FEH+mpCPzE0JMtdY3qXf5805Azs7O9haLxccW83kCgFsymdFodHd1dUW3vLbsHkd2j2PrS4337B4nbXuE9s0GopQ6RkQCsXRet+jGEfHi+vr6rust0vunp6cE6oJrzGrnRGt9m7NvFhAp5UQI8ZFteF/X9bQvAC4cASqK4hIA/mAXdWKMmaXAJIGEQCDiv8aYaWrzPs+llOR7/3QFEwVC5gQAn7xNyQ8mueruA4S+seeSFigXufV37NxWINYpv/o+Udf1eChTSoHkl0g+MxqNDtsCQCsQKeUXPzohYpatpgTs8pybNUUzY8w4O2oF/OK91poS34svpRSd+86LksELDWpEKfW/y9aI+K2qqoO+Gfe5yKmC2Nramgshfrd7PWit9/m+a0ACDh51sucKmvN9wELWZFoDIqW8FUJQDUXrXmtNlexPX1LKB6cVRPxsjKGIulohjaD3/FxrTUnqpy+eX7TWDdkbf9js+sVJXRTFfpd6Z5NoKR3UdU2+u1w8FTSAsAjxy5iVE943LwBoRFIOhLLpW/qQikFjTFaTtElN+HtLKakZc+3AjdZ64p43gMRefClhY+f4gYhfdAxINAm6kIiI86qqxn3zjC3jPwkhHouiGMd80jf9wYAopYhAcCV371zDwn308rKBKKV8H1mL1RF77V3CMHNOWcHKR3gr0Rq1Us4+lD9JKb97FXZUszHQ3EcanSBPOr5GlFLUWH2wEe6xqqr9rn7Cy6FY3rKszXdPhgboBhD+cqz/4AmKx/WcKOcXp6lyiIMuy/KNf3GhEsV34kas5sL5PhXKtolQSkTGKg+kmjZ21lqyDgFp1P8xdVutEPBlS2pp0fMYWWDL8g8+iJQ/5mh/DYg1L+KknHBRoiFQ9hMgii4znzm0rfOSmfTb55x+h2njqSzLPe6PbY3VKgznmEwLXZTjJveIOIlxv7yQBYCguQeBcK0AwENZloexqGQZeOplXCeXAnJTluU0tqeV46vHLQe1QQe1kg8BFmNujDlMSUfaAYBjrznzP1nSqnVdz1JsjPUlIkD8xq41z6R4rYaJIeKsqqrz3HxBZrGqToV4zB0fhAJCm0kFq19+21a1xOmuaMznFokpjdqgQEWkr4n7siyPYheYpExbwPSm/2NAWsYVSRBRH/EPtKomR27MOCjMIuL7lL2ntGBL+Xd8XEEkQ1VVkxxTTmqEVbxrBLNNhMQ7XXYd0JAG2iZeXYnyTkBI6Db63wECAGICo8NOO3Mkcjw0sus1rugMxGnIhlnK0o28YcuUcRsYm28orPKB0TfSTs4sJGSqvYG4zewka8r8J5hAQyCozrJmmTWZavO3ZwPxAPGc0+jlA1maarLBGP7BgBAgXta7nLOzs7O7WCx4bujdHm/EtPimjExwpT2Np32fiPY5qXD9IkDaco53+OAgshNinxsKDDWpYKRcs5GB0aA+wgF7/xxA5Nt8k4T4RoH00WTfb14NkB/3nlxgik0+ewAAAABJRU5ErkJggg==" alt="" />
        }
        <div style={{color: index === 3 ?  '#105CCE' : '' }}>我的</div></div>
    </div>
    </div>
  );
}

export default Menu;
