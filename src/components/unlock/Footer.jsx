import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  DialogContent,
  Dialog,
  Slide,
  Button,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Snackbar from '../snackbar/snackbar';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import cookie from 'react-cookies';
import './rotateTranstion.css';
import getLangURLWithURL from '../../util/linkHelper';
import { getStyleClass, getNewStyleClass } from '../../config/constantFunction';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHMENUHEADER_RETURN,
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
  
})

class Footer extends Component {
  constructor(props){
    super(props);
    const { openUnlockModal, pagetype } = this.props;
    const storageMenuList = JSON.parse(localStorage.getItem("menuList"))
    this.state = {
      isShow: false,
      address: null,
      snackbarMessage: null, 
      snackbarType: null,
      modalOpen: false,
      isMobile: true,
      openUnlockModal: openUnlockModal,
      pagetype,pagetype,
      wHeight: '',
      hh: '',
      type: 1,
      MenuArray: storageMenuList,
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.on(BXHMENUHEADER_RETURN, this.menuReturned);
  }
  componentDidMount() {
    this.menuTimer();
    this.refreshAccount()
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    //监听窗口大小改变
    window.addEventListener('resize', this.handleResize) 
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.removeListener(BXHMENUHEADER_RETURN, this.menuReturned);
    this.setState = (state,callback) =>{
      return;
    }
  }

  timerMenu = null;
  menuTimer = () => {
    this.timerMenu = setInterval(() => {
      const storageMenuList = JSON.parse(localStorage.getItem("menuList"))
      this.setState({ MenuArray: storageMenuList })
      if(storageMenuList){
        clearInterval(this.timerMenu);
      }
    }, 1000);
  }
  menuReturned = (data) => {
    localStorage.setItem("menuList", JSON.stringify(data));
    this.setState({ MenuArray: data })
  }

  handleResize = () => {
    const { wHeight } = this.state;
    var hh = window.innerHeight; //当前可视窗口高度 
    this.state.hh = hh
    this.state.type = 4
    if(wHeight > hh){ //可以作为虚拟键盘弹出事件 
      this.state.type = 3
    }else{ //可以作为虚拟键盘关闭事件 
      this.state.type = 2
     } 
  }
  refreshAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address != undefined && address !== null && address != '') {
      var tempAddr = null
      const digits = 4
      tempAddr = address.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += address.substr(address.length-digits, digits)
      this.setState({address: tempAddr})
    }else{
      this.setState({address: null});
    }
  }

  //授权账号
  openUnlockModal = () => {
    if (this.state.openUnlockModal) {
      this.state.openUnlockModal();
    }else{
      this.setState({ modalOpen: true })
    }
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }

  contactAddress = (address) => {
    window.open(address);
  }

  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  navigateStake = (link) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(link)
  }

  menuLink = (link, target) => {
    if(target === '_self'){
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if(link === '/'){
        this.props.history.push('/')
      }else{
        this.props.history.push('/' + link)
      }
    }else{
      window.open(link)
    }
  }

  menuMLink = (link, target, title) => {
    if(target === '_self'){
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if(link === '/'){
        this.props.history.push('/')
      }else{
        this.props.history.push('/' + link)
      }
    }else{
      if(title==='兌換' || title==='Swap'){
        window.open(getLangURLWithURL(link),'_self')
      }else{
        window.open(link)
      }
    }
  }

  render() {
    const { classes, t, i18n } = this.props
    const { pagetype, MenuArray } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    let pathname = this.props.location.pathname
    return (
      <div>
        {/* pc */}
        <div className={getNewStyleClass('chainfooter', 'footer', 'is_pc')}>
          <div className="container">
              <div className="flex flex_mjustify">
                  <div className="left">
                      <div className="blogo">
                        <img src={require('../../assets/bxh/logo.png')} />
                      </div>
                      <p>{t('BXH.footercolt')}</p>
                      <div className="fav flex">
                          <span className="fav1" onClick={()=>{this.contactAddress('https://twitter.com/BXH_Blockchain')}}></span>
                          <span className="fav2" onClick={()=>{this.contactAddress('https://t.me/BXH_global')}}></span>
                      </div>
                      <p>© 2022 BXH. All righs reserved.</p>
                  </div>
                  <div className="right info flex flex_mjustify">
                      {
                        MenuArray&&MenuArray.boot.length > 0 ? MenuArray.boot.map((item, idx) => {
                          return <span key={idx}>
                            <div className="it">
                                <div className="t">{item.title}</div>
                                <ul>
                                    {
                                      item.nodeList.map((obj, index) => {
                                        return <li key={index} onClick={() => {this.menuLink(obj.href, obj.target)}}>{obj.title}</li>
                                      })
                                    }
                                </ul>
                            </div>
                          </span>
                        }) : null
                      }
                  </div>
              </div>
          </div>
        </div>

        {/* 移动 */}
        <div className={getNewStyleClass('fbottom', 'is_wap')}>
          <ul className="flex flex_mjustify">
              {
                MenuArray&&MenuArray.info_menu.length > 0 ? MenuArray.info_menu.map((item, idx) => { 
                  return <li key={idx} onClick={() => {this.menuMLink(item.href, item.target, item.title)}} className={[item.href==='/'&&pathname==='/'?'on':('/'+item.href)===pathname ? 'on' : pagetype===item.href? 'on' : ''].join(' ')}>
                    <div className="ico">
                      {
                        item.href==='/'?
                        <span>
                          {
                            item.href===pathname ?
                            <img src={item.imageUrlSelect} />
                            :
                            <img src={item.imageUrl} />
                          }
                        </span>
                        :
                        <span>
                          {
                            ('/'+item.href)===pathname||pagetype===item.href ?
                            <img src={item.imageUrlSelect} />
                            :
                            <img src={item.imageUrl} />
                          }
                        </span>
                      }
                    </div>
                    <div className="n">{item.title}</div>
                  </li>
                }) : null
              }
          </ul>
        </div>
        <div className="fh is_wap"></div>
      </div>
    )
  };


}

export default withNamespaces()(withRouter(withStyles(styles)(Footer)));
