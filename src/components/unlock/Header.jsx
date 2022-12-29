import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  DialogContent,
  Dialog,
  Slide,
  Button,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Snackbar from '../snackbar/snackbar';
import UnlockModal from '../unlock/unlockModal.jsx';
import AccountDialog from '../accountDialog/accountDialog.jsx';
import ChainIdSwitchDialog from '../chainIdSwitchDialog/chainIdSwitchDialog.jsx';
import Store from "../../stores";
import { injected } from "../../stores/connectors";
import cookie from 'react-cookies';
import './rotateTranstion.css';
import getLangURLWithURL from '../../util/linkHelper';
import { getStyleClass, getNewStyleClass } from '../../config/constantFunction'

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHCOOKIEREFRESHEVENT,
  STAKEBXH_CHAINID,
  STAKEBXH_CHAINID_RETURNED,
  BXHMENUHEADER,
  BXHMENUHEADER_RETURN,
  BXHTOKENLIST,
  BXHINDEXBANNER,
  BXHINDEXNOTICE,
  BXHCHNAGEACCOUNT,
  GET__BXHBRIDGEMAIN,
  STAKEBXHPOOL_RETURNED,
  BXH_HOMEBALANCE,
  BXH_HOMEBALANCE_RETURNED,
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher

const styles = theme => ({
  roaddress: {
    '& img': {
      width: '15px',
      verticalAlign: 'sub',
    }
  },
  languas: {
    '& img': {
      width: '21px',
    }
  },
  card: {
    position: 'absolute',
    bottom: '0',
    right: '0px',
    top: '40px',
    left: '0px',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#414040',
    color: '#FFFFFF',
    fontSize: '14px',
    padding: '10px',
    height: '165px',
    width: '100px',
    '&:hover': {
      backgroundColor: '#414040 !important',
    },
    '&:active': {
      backgroundColor: '#414040 !important',
    },
    [theme.breakpoints.up('sm')]: {
        borderRadius: '8px',
        position: 'absolute',
        width: '110px',
        padding: '10px',
        paddingLeft: '20px',
        paddingBottom: '0',
        top: '57px',
        height: '165px',
        left: '-5px',
    }
  },
  chainhoverlog: {
    '&:hover': {
      backgroundColor: '#414040 !important',
    },
    '&:active': {
      backgroundColor: '#414040 !important',
    },
  },
  chainlog: {
    marginBottom: '10px',
    cursor: 'pointer',
    lineHeight: '20px',
    fontWeight: '500',
    textAlign: 'left',
    '&:hover': {
      backgroundColor: '#414040 !important',
    },
    '&:active': {
      backgroundColor: '#414040 !important',
    },
    '& img': {
        verticalAlign: 'baseline',
        marginRight: '8px',
    }
   },
   penging: {
    position: 'fixed',
    top: '75px',
    right: '20px',
   },
   roaddressparentContent: {
    position: 'relative',
    height: '40px',
    padding: '0 10px',
    background: '#4A4C5E',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '35px',
    marginRight: '20px',
    cursor: 'pointer',
  },
  roaddressparent: {
    color: '#30BE85',
    cursor: 'pointer',
  },
  roaddressparent1: {
    color: '#3E7EFF',
    cursor: 'pointer',
  },
  roaddressparent2: {
    color: '#7E8CCB',
    cursor: 'pointer',
  },
  pendingContent: {
    display: 'inline-block',
    height: '30px',
    lineHeight: '28px',
    borderRadius: '11px',
    padding: '0 10px',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 'bold',
    margin: '0 10px',
    '& img': {
      width: '13px',
      height: '13px',
      marginLeft: '5px',
      verticalAlign: 'middle',
    },
    '&:hover': {
      backgroundColor: 'rgba(48, 190, 133, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(48, 190, 133, 0.5)',
    },
  },
  unlockAddressWallet: {
    display: 'none',
    height: '40px',
    lineHeight: '40px',
    borderRadius: '20px',
    padding: '0 10px',
    width: '110px',
    fontSize: '12px',
    margin: '0 0 0 10px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:active': {
      filter: 'brightness(80%)',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  unlockWallet: {
    height: '30px',
    lineHeight: '28px',
    borderRadius: '13px',
    padding: '0 10px',
    width: '110px',
    fontSize: '12px',
    margin: '0 10px',
    cursor: 'pointer',
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  unlockPCWallet: {
    textAlign: 'center',
    margin:'6px 0 0 10px'
  },
  langbgoption: {
    position: 'fixed',
    left: '0px',
    top: '64px',
    background: '#0E0F11',
    width: '100%',
    height: '100%',
    opacity: '.8',
  },
})

class Header extends Component {
  constructor(props){
    super(props);
    const { openUnlockModal, pagetype } = this.props;
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const storageMenuList = JSON.parse(localStorage.getItem("menuList"))
    this.state = {
      isShow: false,
      menuStatus: 1,
      address: null,
      snackbarMessage: null, 
      snackbarType: null,
      modalOpen: false,
      isMobile: true,
      openUnlockModal: openUnlockModal,
      modalAccount: false,
      modalChainID: false,
      webmodalChainID: false,
      webmodalSwap: false,
      pagetype: pagetype,
      pendingCount: 0,//打包中数量
      rewardBXHFactory: rewardBXHFactory,
      bxhInfo: {},
      MenuArray: storageMenuList,  //导航菜单
    }
  }
  
  componentWillMount() {
    // emitter.on(STAKEBXH_CHAINID_RETURNED, this.chainReturned);
    emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.on(BXHCOOKIEREFRESHEVENT, this.refreshPending);
    emitter.on(BXHMENUHEADER_RETURN, this.menuReturned);
    //监听窗口大小改变
    window.addEventListener('resize', this.handleResize)
    setTimeout(this.iTimer,0);
    this._checkAccountTracaction()
    this.handleResize()
  }
  componentWillUnmount() {
    // emitter.removeListener(STAKEBXH_CHAINID_RETURNED, this.chainReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.removeListener(BXHCOOKIEREFRESHEVENT, this.refreshPending);
    emitter.removeListener(BXHMENUHEADER_RETURN, this.menuReturned);
    window.addEventListener('resize', this.handleResize)
    clearInterval(this.timer);
    this.setState = (state,callback) =>{
      return;
    }
  }
  componentDidMount() {
    this.menuTimer();
    this.refreshAccount()
    this.refreshData();
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

  timer = null;
  // 定时器
  iTimer = () => {
    this.timer = setInterval(() => {
      this._checkAccountTracaction()
    }, 5000);
  }

  handleResize = () => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: true })
    } else {  // PC端
      this.setState({ isMobile: false })
    }
  }
  
  refreshData = () => {
    const that = this;
    store._getBXHInfo((data) => {
        that.setState({ bxhInfo: data.bxh_info });
    })
  }

  _checkAccountTracaction=()=>{
    const account = store.getStore('account');
    const address = account.address;
    const transactionList = cookie.load(address)
    var currentPendingHash = ""
    if (!transactionList) {
      return
    }
    for(let i = 0;i<transactionList.length;i++){
      let item = transactionList[i]
      if (item.isPending === true) {
        currentPendingHash = item.hash
        break
      }
    }
    if (currentPendingHash!=="") {
      store._reRequrieStatusByTxHash(currentPendingHash)
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
      this.refreshPending()
    }else{
      this.setState({address: null});
    }
  }
  //刷新是否有pending中
  refreshPending = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address != undefined && address !== null && address != '') {
      const transactionList = cookie.load(address)
      let count = 0
      if(transactionList){
        transactionList.map((item) => {
          if(item.isPending){
            count = 1
          }
        })
      }
      this.setState({pendingCount: count})
    }else{
      this.setState({pendingCount: 0})
    }
  }

  notClick = () => {
    const { i18n } = this.props;
    let language = i18n.language;
    let changeLanguage = "";
    if (language==='zh'||language==='zh-CN') {
      changeLanguage = "en";
    }else{
      changeLanguage = "zh";
    }
    i18n.changeLanguage(changeLanguage)
    let pathname = this.props.location.pathname
    // 导航
    dispatcher.dispatch({ type: BXHMENUHEADER, content: {} })
    if(pathname === '/'){
      // banner图
      dispatcher.dispatch({ type: BXHINDEXBANNER, content: {} })
      // 公告
      dispatcher.dispatch({ type: BXHINDEXNOTICE, content: {} })
    }
    this.setState({
      isShow: false,
    })
    this.closePop();
  }

  clickOpen = (e) => {
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isShow: !this.state.isShow,
    })
    this.showPop();
  }

  clickClose = () => {
    this.setState({
      isShow: false,
    })
    this.closePop();
  }
  stopScroll(e){
    e.stopPropagation();
    e.preventDefault();
  }
  showPop(){
    window.addEventListener("touchmove", this.stopScroll, {passive: false });
  }
  closePop(){
    //添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
    window.removeEventListener('touchmove',this.stopScroll,{passive: true});
  }

  menuLink = (link, target, title) => {
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
        window.open(link,'_self')
      }
    }
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }
  //点击地址
  onOpenAccount = () => {
    this.setState({ modalAccount: true, webmodalChainID: false })
  }
  onCloseAccount = () => {
    this.setState({ modalAccount: false })
  }
  onOverAccount = () => {
    this.setState({ modalAccount: true, webmodalChainID: false })
  }
  
  webOpenSwap = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    if(this.state.webmodalSwap === true){
      this.setState({ webmodalSwap: false })
    }else{
      this.setState({ webmodalSwap: true })
    }
  }
  // 切换HECO、BSC链 - web
  webOpenChainID = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    if(this.state.webmodalChainID === true){
      this.setState({ webmodalChainID: false, modalAccount: false })
    }else{
      this.setState({ webmodalChainID: true, modalAccount: false })
    }
  }
  // 切换HECO、BSC链 - h5
  onOpenChainID = () => {
    if(this.state.modalChainID === true){
      this.setState({ modalChainID: false })
    }else{
      this.setState({ modalChainID: true })
    }
  }
  onCloseChainID = () => {
    this.setState({ modalChainID: false })
  }
  storageChainID = (chainID) => {
    if(chainID === '1'){
      alert('请手动将当前网络设置为Ethereum')
    }else{
      this.setState({ webmodalChainID: false })
      dispatcher.dispatch({ type: STAKEBXH_CHAINID, content: {chainID: chainID} })
    }
  }
  chainReturned = () => {
    // 导航
    // dispatcher.dispatch({ type: BXHMENUHEADER, content: {} })
    // tokenlist
    // dispatcher.dispatch({ type: BXHTOKENLIST, content: {} })
    // emitter.emit(CONNECTION_CONNECTED)
    // emitter.emit(BXHCHNAGEACCOUNT)
    // emitter.emit(GET__BXHBRIDGEMAIN)
    // emitter.emit(STAKEBXHPOOL_RETURNED)
    // emitter.emit(BXH_HOMEBALANCE_RETURNED)
    // dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
  }
  openModalUnlock = () => {
    const { ethereum } = window;
    if(ethereum){
      injected.getAccount().then(account => {

      })
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
  renderSnackbar = () => {
    const {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={ snackbarType } message={ snackbarMessage } open={true}/>
  };
  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }
  //兑换
  bxhDuihuan = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "1"){
      window.open(getLangURLWithURL('https://ethswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "43114"){
      window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/swap'),'_self')
    }else{
      window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self')
    }
  }
  XDTDuihuan = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('xswap')
  }
  XTokenDuihuan = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('xtoken')
  }
  //流动性
  bxhList = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('liquidity')
  }
  bxhLoan = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('loan')
  }
  bxhBridge = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('bridge')
  }
  createPool = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "137"){
      window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "43114"){
      window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/pool'),'_self')
    }else{
      window.open(getLangURLWithURL('https://swap.bxh.com/#/pool'),'_self')
    }
  }
  zuqiuAddress = () => {
    window.open('https://guess.kimchiii.com/#/')
  }

  navigateStake = (link) => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(link)
  }

  market = () => {
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open('https://bscinfo.bxh.com')
    }else if(chainID === "66"){
      window.open('https://okinfo.bxh.com')
    }else if(chainID === "1"){
      window.open('https://ethinfo.bxh.com')
    }else if(chainID === "43114"){
      window.open('https://avaxinfo.bxh.com')
    }else{
      window.open('https://hecoinfo.bxh.com')
    }
  }
  dao = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('dao')
  }
  announcement = () => {
    const { i18n } = this.props;
    let language = i18n.language;
    if(language === 'zh' || language === 'zh-CN'){
      window.open('https://bxh.gitbook.io/bxh/zhong-wen-ou/notice');
    }else{
      window.open('https://bxh.gitbook.io/bxh/v/english/notice');
    }
  }
  combustion = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('combustion')
  }
  starPlan = () => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    this.nav('starPlan')
  }
  contactAddress = (address) => {
    window.open(address);
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  menuTable = (status) => {
    this.setState({
      menuStatus: status
    })
  }

  render() {
    const { modalAccount, modalChainID } = this.state;
    return (
      <div style={{width:'100%'}}>
        { this.renderContent() }
        
        { modalAccount && this.renderAccountModal() }
        { modalChainID && this.renderChainIdModal() }
      </div>
    )
  };

  renderAccountModal = () => {
    const { rewardBXHFactory, bxhInfo } = this.state;
    let bxhbanance = rewardBXHFactory[0].tokens[0].bxhbanance
    let bxh_price = bxhInfo.bxh_price
    return (
        <AccountDialog onClose={ this.onCloseAccount } bxhbanance={bxhbanance} bxh_price={bxh_price} />
    )
  };
  renderChainIdModal = () => {
    return (
        <ChainIdSwitchDialog onClose={ this.onCloseChainID }/>
    )
  };
  renderContent = () => {
    const { classes, t, i18n } = this.props;
    const { isMobile, MenuArray, snackbarMessage, modalOpen, pendingCount, address, webmodalChainID } = this.state;
    let language = i18n.language;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        <div className={getNewStyleClass('header')}>
          <div className={getNewStyleClass('head-wp', 'flex', 'flex_mjustify', 'flex_crosscenter')}>
              <div className="head-left">
                  <div className="flex flex_crosscenter">
                      <div className="logo">
                        <img src={require('../../assets/bxh/logo.png')} onClick={ () => { this.props.history.push('/'); document.documentElement.scrollTop = document.body.scrollTop = 0; }} />
                      </div>
                      <div className="exch flex flex_crosscenter is_pc">
                        <i onClick={()=>{this.contactAddress('https://ex.bxh.com/')}}>CEFI</i>
                        <span>DEFI</span>
                        <i onClick={()=>{this.contactAddress('https://nft.bxh.com')}}>NFT</i>
                        <em>WEB3 WALLET</em>
                      </div>
                  </div>
              </div>
              <div className="head-right">
                  <div className="flex">
                      {/* PC导航菜单 */}
                      {this.renderMenuPC()}
                      
                      <div className="bi-set" onClick={(e) => {this.webOpenChainID(e)}}>
                          {
                            chainID === '56' ?
                            <span>BSC</span>
                            :
                            chainID === '66' ?
                            <span>OKC</span>
                            :
                            chainID === '1' ?
                            <span>ETH</span>
                            :
                            chainID === '43114' ?
                            <span>AVAX</span>
                            :
                            <span>HECO</span>
                          }
                          {
                            !isMobile ?
                            <span className="navxiala">
                              {
                                webmodalChainID ?
                                <span className={getStyleClass('PCjiantou2')}></span>
                                :
                                <span className={getStyleClass('PCjiantou1')}></span>
                              }
                            </span>
                            :
                            null
                          }
                          {
                            webmodalChainID ?
                            <Card className={classes.card} id="PCChainID">
                              <div className={classes.chainhoverlog}>
                                  <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('128')}}>
                                    <img src={require('../../assets/bxh/huobi.png')} style={{ width: '10px' }} />
                                      HECO
                                  </div>
                                  <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('56')}}>
                                      <img src={require('../../assets/bxh/bian.png')} style={{ width: '10px' }} />
                                      BSC
                                  </div>
                                  <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('66')}}>
                                      <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" style={{ width: '10px' }} />
                                      OKC
                                  </div>
                                  <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('1')}}>
                                      <img src={require('../../assets/bxh/eth.png')} style={{ width: '10px' }} />
                                      ETH
                                  </div>
                                  <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('43114')}}>
                                      <img src={require('../../assets/bxh/AVAX.png')} style={{ width: '10px' }} />
                                      AVAX
                                  </div>
                              </div>
                            </Card>
                            :
                            null
                          }
                      </div>
                      
                      {/* 移动端Pending */}
                      <div className="is_wap">
                        {
                          address ? (
                            pendingCount > 0 ? (
                              <div onClick={this.onOpenAccount} className={getNewStyleClass('mpending',classes.pendingContent)}>
                                {pendingCount} Pending
                                <img className="pendingImage" src={ require('../../assets/bxh/pending.png') }/>
                              </div>
                            ) : (
                              <div className="login is_wap" onClick={this.onOpenAccount}>
                                {address}
                              </div>
                            )
                          ) : (
                            <div className={getNewStyleClass('unlock',classes.unlockWallet)} onClick={this.openUnlockModal}>Unlock Wallet</div>
                          )
                        }
                      </div>

                      <div className="is_wap">
                          {
                            !this.state.isShow ? (
                              <a className="menu-btn" onClick={(e) => {this.clickOpen(e)}}>
                                <span></span>
                                <span></span>
                                <span></span>
                              </a>
                            ) : (
                              <a className="menu-btn active" onClick={() => {this.clickClose()}}>
                                <span></span>
                                <span></span>
                                <span></span>
                              </a>
                            )
                          }
                      </div>

                      {
                        address ? (
                          <div className={classes.roaddress}>
                            <div className="head-ico1 ico is_pc" onClick={()=>this.onOverAccount()}>
                                {
                                  chainID === '56' ?
                                  <img src={ require('../../assets/bxh/tesol1.png') }/>
                                  :
                                  chainID === '66' ?
                                  <img src={ require('../../assets/bxh/tesol2.png') }/>
                                  :
                                  chainID === '1' ?
                                  <img src={ require('../../assets/bxh/tesol3.png') }/>
                                  :
                                  chainID === '43114' ?
                                  <img src={ require('../../assets/bxh/tesol5.png') }/>
                                  :
                                  <img src={ require('../../assets/bxh/tesol.png') }/>
                              }
                            </div>
                          </div>
                        ) : (
                          <div className={getNewStyleClass('unlock', 'unlockPC', classes.unlockAddressWallet)} onClick={this.openUnlockModal}>Unlock Wallet</div>
                        )
                      }
                      
                      <div className={classes.languas}>
                        <div className="head-ico2 ico is_pc" onClick={this.notClick}>
                          {
                            language === 'zh' || language === 'zh-CN' ?
                            <img src={require('../../assets/en.png')}/>
                            :
                            <img src={require('../../assets/HK.png')}/>
                          }
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* pc端pending */}
        {
          !isMobile ?
          <div className={classes.penging}>
            {
              pendingCount > 0 ?
              <div className={getStyleClass('PCaddress',classes.roaddressparentContent)}>
                <div className={[chainID === '66' ? classes.roaddressparent1 : chainID === '1' ? classes.roaddressparent2 : classes.roaddressparent].join(' ')} onClick={()=>{this.onOpenAccount()}}>
                  {pendingCount} pending ...
                  <img src={ require('../../assets/bxh/send.png') } alt='' className='stateTransImage'/>
                </div>
              </div>
              :
              null
            }
          </div>
          :
          null
        }

        {/* 移动端导航菜单 */}
        {this.renderMenuM()}

        { snackbarMessage && this.renderSnackbar() }
        { modalOpen && this.renderUnlockWalletModal() }
      </div>
      
    )
  }

  // PC导航菜单
  renderMenuPC = () => {
    const { classes, t } = this.props;
    const { MenuArray, webmodalSwap, pagetype } = this.state
    return (
      <ul className="navs flex is_pc" style={{marginBottom:'0px'}}>
        {
          MenuArray&&MenuArray.info_menu.length > 0 ? MenuArray.info_menu.map((item, idx) => {  
            return <span key={idx}>
              {
                item.nodeList.length === 0 ?
                <li onClick={() => {this.menuLink(item.href, item.target, item.title)}} className={pagetype==item.href ? 'on' : ''}>
                  {item.title}
                </li>
                :
                <li style={{position:'relative'}} onClick={(e) => {this.webOpenSwap(e)}}>
                  {item.title}
                  {
                    webmodalSwap ?
                    <span className={"hecoPCjiantou2"}></span>
                    :
                    <span className={"hecoPCjiantou1"}></span>
                  }
                  {
                    webmodalSwap ?      
                    <Card className={classes.card} style={{ height: '105px' }}>
                      <div className={classes.chainhoverlog}>
                          <div className={classes.chainlog} onClick={() => {this.menuLink(item.href, item.target, item.title)}}>
                            {item.title}
                          </div>
                          {
                            item.nodeList.map((obj, index) => {
                              return <div key={index} className={classes.chainlog} onClick={() => {this.menuLink(obj.href, obj.target)}}>
                                {obj.title}
                              </div>
                            })
                          }
                      </div>
                    </Card>
                    :
                    null
                  }
                </li>
              }
            </span>
          }) : null
        }
      </ul>
    )
  }

  // 移动端导航菜单
  renderMenuM = () => {
    const { classes, t, i18n } = this.props;
    const { MenuArray, menuStatus } = this.state
    let language = i18n.language;
    return (
      <div>
        {
          this.state.isShow ? (
            <div className={getNewStyleClass('wap_nav', 'is_wap')}>
              <div className={classes.langbgoption} onClick={() => {this.clickClose()}}></div>
              <div className="container" id="container">
                  <div className={["it", menuStatus === 1 ? 'on' : ''].join(' ')}>
                      <div className="tit flex flex_mjustify flex_crosscenter" onClick={() => {this.menuTable(1)}}>
                          <div className="n"><span className="ico1"></span>{t('BXH.About')}</div>
                          <div className="arr"></div>
                      </div>
                      <ul>
                        {
                          MenuArray&&MenuArray.boot[0].nodeList.length > 0 ? MenuArray.boot[0].nodeList.map((item, idx) => {
                            return <li key={idx} onClick={() => {this.menuLink(item.href, item.target, item.title)}}>{item.title}</li>
                          }) : null
                        }
                      </ul>
                  </div>
                  <div className={["it", menuStatus === 2 ? 'on' : ''].join(' ')}>
                      <div className="tit flex flex_mjustify flex_crosscenter" onClick={() => { this.menuTable(2)}}>
                          <div className="n"><span className="ico2"></span>{t('BXH.file')}</div>
                          <div className="arr"></div>
                      </div>
                      <ul>
                        {
                          MenuArray&&MenuArray.boot[1].nodeList.length > 0 ? MenuArray.boot[1].nodeList.map((item, idx) => {
                            return <li key={idx} onClick={() => {this.menuLink(item.href, item.target, item.title)}}>{item.title}</li>
                          }) : null
                        }
                      </ul>
                  </div>
                  <div className={["it", menuStatus === 3 ? 'on' : ''].join(' ')}>
                      <div className="tit flex flex_mjustify flex_crosscenter" onClick={() => { this.menuTable(3)}}>
                          <div className="n"><span className="ico3"></span>{t('BXH.Navigation')}</div>
                          <div className="arr"></div>
                      </div>
                      <ul>
                          {
                            MenuArray&&MenuArray.boot[2].nodeList.length > 0 ? MenuArray.boot[2].nodeList.map((item, idx) => {
                              return <li key={idx} onClick={() => {this.menuLink(item.href, item.target, item.title)}}>{item.title}</li>
                            }) : null
                          }
                      </ul>
                  </div>
                  <div className={"it"}>
                      <div className="tit flex flex_mjustify flex_crosscenter" onClick={this.notClick}>
                          <div className="n">
                            {
                              language === 'zh' || language === 'zh-CN' ? (
                                <i style={{fontStyle: 'inherit'}}>
                                  <span className="ico4"></span>English
                                </i>
                              ) : (
                                <i style={{fontStyle: 'inherit'}}>
                                  <span className="ico4"></span>繁体中文
                                </i>
                              )
                            }
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }

}


export default withNamespaces()(withRouter(withStyles(styles)(Header)));
