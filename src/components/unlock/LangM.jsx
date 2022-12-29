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
import InvitationDialog from '../InvitationDialog/InvitationDialog.jsx';
import Store from "../../stores";
import cookie from 'react-cookies';
import './rotateTranstion.css';
import getLangURLWithURL from '../../util/linkHelper';
import { getStyleClass } from '../../config/constantFunction'

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHCOOKIEREFRESHEVENT,
  STAKEBXH_CHAINID,
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher

const styles = theme => ({
  lanMg: {
    display: 'inline-block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
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
  roaddress: {
    color: '#FFFFFF',
    cursor: 'pointer',
    '& img': {
      marginLeft: '3px',
      width: '15px',
      verticalAlign: 'middle',
    },
  },
  logo: {
    cursor: 'pointer',
    width: '76px',
  },
  langConter: {
    position: 'relative',
    cursor: 'pointer',
    display: 'inline-block',
    textAlign: 'left',
    '& img':{
      width: '16px',
      marginRight: '5px',
      marginLeft: '5px',
      verticalAlign: 'sub',
    },
  },
  langzhu: {
    position: 'absolute',
    right: '-10px',
    top: '30px',
    background: '#072747',
    padding: '0 10px',
    width: '130px',
    borderRadius: '5px',
    zIndex: '999',
    '& div':{
      padding: '10px 0',
    }
  },
  bxhmorsbomt: {
    width: '100%',
  },
  langclose: {
    '& img': {
      width: '16px !important',
    }
  },
  langbgoption: {
    position: 'fixed',
    left: '0px',
    top: '64px',
    background: '#0E0F11',
    width: '100%',
    height: '100%',
    zIndex: '9999',
    opacity: '.8',
  },
  langbgomtsi: {
    // position: 'fixed',
    // left: '0px',
    // top: '0px',
    // zIndex: '999999',
    // width: '100%',
    // opacity: '1',
    // padding: '20px',
    // background: '#181B1E',
  },
  langliebiao: {
    position: 'absolute',
    left: '0px',
    width: '100%',
    zIndex: '9999',
    background: '#191B2E',
    padding: '10px 25px',
    '& span': {
      display: 'block',
      fontSize: '15px',
      fontWeight: 'bold',
      padding: '10px 0',
      '&:active': {
        filter: 'brightness(50%)',
      },
    },
    '& i': {
      fontStyle: 'inherit',
    },
    '& img': {
      width: '18px',
      verticalAlign: 'text-bottom',
      marginRight: '10px',
    }
  },
  line: {
    height: '1px',
    background: 'rgba(151,151,151,0.1)',
    margin: '5px 0',
  },
  topContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '54px',
    padding: '0 20px',
    background: 'none',
  },
  pendingContent: {
    display: 'inline-block',
    height: '22px',
    lineHeight: '22px',
    borderRadius: '11px',
    padding: '0 10px',
    backgroundColor: '#2EBC84',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 'bold',
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
  bscpendingContent: {
    display: 'inline-block',
    height: '22px',
    lineHeight: '22px',
    borderRadius: '11px',
    padding: '0 10px',
    backgroundColor: '#FDD436',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 'bold',
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
  okexpendingContent: {
    display: 'inline-block',
    height: '22px',
    lineHeight: '22px',
    borderRadius: '11px',
    padding: '0 10px',
    backgroundColor: '#3E7EFF',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 'bold',
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
  ethpendingContent: {
    display: 'inline-block',
    height: '22px',
    lineHeight: '22px',
    borderRadius: '11px',
    padding: '0 10px',
    backgroundColor: '#7E8CCB',
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: 'bold',
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
  chaidqiehuan: {
    position: 'absolute',
    left: '-100px',
    borderRadius: '12px',
    fontSize: '12px',
    padding: '2px 7px',
    top: '2px',
  },
  addressContent: {
    position: 'relative',
    display: 'inline-block',
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  address: {
    color: '#FFFFFF',
    display: 'flex',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    borderRadius: '12px',
    lineHeight: '24px',
    alignItems: 'center',
    position: 'absolute',
    top: '-12px',
    right: '5px',
    '& img': {
      marginLeft: '5px',
      width: '18px',
      height: '15px',
    },
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  unlockWallet: {
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    border: '1px solid #2EBC84',
    padding: '0 10px',
    color: '#2EBC84',
    width: '110px',
    position: 'absolute',
    right: '0px',
    fontSize: '12px',
    top: '-15px',
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  bscunlockWallet: {
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    border: '1px solid #FDD436',
    padding: '0 10px',
    color: '#FDD436',
    width: '110px',
    position: 'absolute',
    right: '0px',
    fontSize: '12px',
    top: '-15px',
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  okexunlockWallet: {
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    border: '1px solid #3E7EFF',
    padding: '0 10px',
    color: '#3E7EFF',
    width: '110px',
    position: 'absolute',
    right: '0px',
    fontSize: '12px',
    top: '-15px',
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  ethunlockWallet: {
    height: '24px',
    lineHeight: '24px',
    borderRadius: '12px',
    border: '1px solid #7E8CCB',
    padding: '0 10px',
    color: '#7E8CCB',
    width: '110px',
    position: 'absolute',
    right: '0px',
    fontSize: '12px',
    top: '-15px',
    '&:active': {
      filter: 'brightness(80%)',
    },
  },
  pcRoot: {
    height: '65px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '99999',
    background: '#191B2E',
  },
  pcContent: {
    width: '80%',
    minWidth: '1300px',
    maxWidth: '1800px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pcContentLeft: {
    display:'flex',
    alignItems:'center',
  },
  pcContentRight: {
    display:'flex',
    alignItems:'center',
  },
  pcContentRightItem: {
    position: 'relative',
    height: '40px',
    padding: '0 20px',
    border: '1px solid rgba(151, 151, 151, 0.15)',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '40px',
    marginRight: '20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(48, 190, 133, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(48, 190, 133, 0.5)',
    },
  },
  pcLanguage: {
    height: '40px',
    padding: '0 20px',
    borderRadius: '20px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(48, 190, 133, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(48, 190, 133, 0.5)',
    },
  },
  lanNews: {
    display: 'inline-block',
    verticalAlign: '-webkit-baseline-middle',
    marginRight: '10px',
    marginTop: '-10px',
  },
  card: {
    position: 'absolute',
    bottom: '0',
    right: '90px',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#414040',
    color: '#FFFFFF',
    fontSize: '14px',
    padding: '10px',
    top: '10px',
    height: '135px',
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
        width: '120px',
        padding: '10px',
        paddingLeft: '20px',
        paddingBottom: '0',
        top: '57px',
        height: '165px',
        left: '-15px',
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
   roaddresswall: {
    width: '40px',
    textAlign: 'center',
    '& img': {
      position: 'absolute',
      top: '11px',
      left: '3px',
      marginLeft: '0px',
    }
   }
})

class LangM extends Component {
  constructor(props){
    super(props);
    const { openUnlockModal, pagetype } = this.props;
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    this.state = {
      isShow: false,
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
      modalInvitation: false,
      rewardBXHFactory: rewardBXHFactory,
      bxhInfo: {},
    }
  }
  
  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.on(BXHCOOKIEREFRESHEVENT, this.refreshPending);
    //监听窗口大小改变
    window.addEventListener('resize', this.handleResize)
    setTimeout(this.iTimer,0);
    this._checkAccountTracaction()
    this.handleResize()
  }
  componentDidMount() {
    document.addEventListener('click', this.hideAllMenu);
    this.refreshAccount()
    this.refreshData();
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
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.removeListener(BXHCOOKIEREFRESHEVENT, this.refreshPending);
    window.addEventListener('resize', this.handleResize)
    clearInterval(this.timer);
    this.setState = (state,callback) =>{
      return;
    }
  }
  timer = null;
  // 定时器
  iTimer = () => {
    this.timer = setInterval(() => {
      this._checkAccountTracaction()
    }, 5000);
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
            // count = count + 1
            count = 1
          }
        })
      }
      this.setState({pendingCount: count})
    }else{
      this.setState({pendingCount: 0})
    }
  }
  hideAllMenu = () => {
    this.setState({
      isShow: false,
      webmodalChainID: false,
      webmodalSwap: false,
    })
    this.closePop();
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
    document.body.style.overflow = 'hidden';
  }
  closePop(){
    // window.removeEventListener('touchmove',self.stopScroll);
    //添加事件监听时添加了passive参数，在ios9中移除事件监听也需要加此参数
    window.removeEventListener('touchmove',this.stopScroll,{passive: true});
    // document.body.style.overflow = 'auto';
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }
  //点击地址
  onOpenAccount = () => {
    this.setState({ modalAccount: true })
  }
  onCloseAccount = () => {
    this.setState({ modalAccount: false })
  }
  onOverAccount = () => {
    this.setState({ modalAccount: true })
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
      this.setState({ webmodalChainID: false })
    }else{
      this.setState({ webmodalChainID: true })
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
    // this.nav('swap')
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "1"){
      window.open(getLangURLWithURL('https://ethswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "137"){
      window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/swap'),'_self')
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
    // this.nav('createLiquidityPool')
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
  
  renderInvitationModal = () => {
    return (
      <InvitationDialog onClose={this.onCloseInvitation} />
    )
  }
  onCloseInvitation = () => {
    this.setState({ modalInvitation: false })
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
    }else if(chainID === "137"){
      
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
  service = () => {
    var oScript = document.createElement("script");
    oScript.src = "https://static.zdassets.com/ekr/snippet.js?key=5de0d8ab-4fd8-4d9a-95a3-51af0cb1471f";
    document.body.appendChild( oScript );
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
  solo = () => {
    window.open('https://solo.top');
  }
  contactAddress = (address) => {
    window.open(address);
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  render() {
    const { isMobile, modalAccount, modalChainID } = this.state;
    return (
      <div style={{width:'100%'}}>
      {
        isMobile ?
        (
          this.renderMobile()
        ):(
          this.renderContent()
        )
      }
      { modalAccount && this.renderAccountModal() }
      { modalChainID && this.renderChainIdModal() }
      </div>
    )
  };

  renderAccountModal = () => {
    const { rewardBXHFactory, bxhInfo } = this.state;
    let bxhbanance = rewardBXHFactory[0].tokens[0].bxhbanance
    let bxh_price = bxhInfo.bxh_price
    // console.log("rewardBXHFactory==>", rewardBXHFactory)
    // console.log("bxhbanance123==>", bxhbanance)
    // console.log("bxhInfo0000==>", bxhInfo.bxh_price)
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
    const { classes, t, i18n, isHome } = this.props;
    const { snackbarMessage, modalOpen, pendingCount, address, modalInvitation, webmodalChainID, webmodalSwap } = this.state;
    let language = i18n.language;
    let chainID = localStorage.getItem('chainIDSwitch')
    let loanOpenSatus = localStorage.getItem('loanOpenSatus')
    let pathname = this.props.location.pathname

    return (
      <div className={getStyleClass('PCheaderbg',classes.pcRoot)}>
        <div className={classes.pcContent}>
          <div className={getStyleClass('head-wp',classes.pcContentLeft)}>
             <img className={classes.logo} 
              src={require('../../assets/bxh/logo.png')} 
              onClick={ () => { this.props.history.push('/'); document.documentElement.scrollTop = document.body.scrollTop = 0; }} />
              <div class="exch flex flex_crosscenter is_pc">
                <i style={{fontStyle: 'inherit'}} onClick={()=>{this.contactAddress('https://ex.bxh.com/')}}>Exchange</i>
                <span>DEFI</span>
              </div>
          </div>
          <div className={classes.pcContentRight}>
            {
              isHome?
              (
                <div style={{display:'flex',alignItems:'center'}} className={'hecoPCContent'}>
                  <div className={classes.pcContentRightItem} 
                  onClick={ () => { this.props.history.push('/'); document.documentElement.scrollTop = document.body.scrollTop = 0; }}>
                    {t('BXH.home')}
                  </div>

                  {
                    chainID === '56' ?
                    <div style={{ position: 'relative' }}>
                      <div className={classes.pcContentRightItem} onClick={(e) => {this.webOpenSwap(e)}}>
                        {t('BXH.swap')}
                        {
                          webmodalSwap ?
                          <span className={"hecoPCjiantou2"}></span>
                          :
                          <span className={"hecoPCjiantou1"}></span>
                        }
                      </div>
                      {
                        webmodalSwap ?
                        <Card className={classes.card} style={{ height: '105px' }}>
                          <div className={classes.chainhoverlog}>
                              <div className={classes.chainlog} onClick={ this.bxhDuihuan }>
                                {t('BXH.swap')}
                              </div>
                              <div className={classes.chainlog} onClick={ this.XDTDuihuan }>
                                XDT{t('BXH.swap')}
                              </div>
                              <div className={classes.chainlog} onClick={ this.XTokenDuihuan }>
                                XToken{t('BXH.swap')}
                              </div>
                          </div>
                        </Card>
                        :
                        null
                      }
                    </div>
                    :
                    <div className={classes.pcContentRightItem} onClick={ this.bxhDuihuan }>{t('BXH.swap')}</div>
                  }
                  
                  <div className={classes.pcContentRightItem} onClick={ this.createPool }>{t('BXH.zijinchititle')}</div>
                  <div className={classes.pcContentRightItem} onClick={ this.bxhList }>{t('BXH.fluidMining')}</div>
                  {/* {
                    loanOpenSatus === '1' ?
                    <div className={classes.pcContentRightItem} style={{ padding: '0 25px 0px 20px' }} onClick={ this.bxhLoan }>{t('BXH.loan')}
                      <img src={require('../../assets/bxh/loannew.png')} style={{ position: 'absolute', width: '20px', right: '7px', top: '5px' }} />
                    </div>
                    :
                    null
                  } */}
                  <div className={classes.pcContentRightItem} onClick={ this.bxhBridge }>{t('BXH.bridge')}</div>
                  {
                    chainID === '137' ?
                    null
                    :
                    <div className={classes.pcContentRightItem} onClick={ this.market }>{t('BXH.hangqing')}</div>
                  }
                  {
                    chainID === '128' ?
                    <div className={classes.pcContentRightItem} onClick={ this.dao }>DAO</div>
                    :
                    null
                  }
                  <div className={classes.pcContentRightItem} onClick={ this.announcement }>{t('BXH.announcement')}</div>
                  <span className={getStyleClass('PCContentRightChain',classes.pcContentRightItem)} onClick={(e) => {this.webOpenChainID(e)}}>
                    {
                      chainID === '56' ?
                      <span>BSC</span>
                      :
                      chainID === '66' ?
                      <span>OKC</span>
                      :
                      chainID === '1' ?
                      <span>ETH</span>
                      // :
                      // chainID === '137' ?
                      // <span>POLYGON</span>
                      :
                      chainID === '43114' ?
                      <span>AVAX</span>
                      :
                      <span>HECO</span>
                    }
                    {
                      webmodalChainID ?
                      <span className={getStyleClass('PCjiantou2')}></span>
                      :
                      <span className={getStyleClass('PCjiantou1')}></span>
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
                            {/* <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('137')}}>
                                <img src={require('../../assets/bxh/polygon.png')} style={{ width: '10px' }} />
                                POLYGON
                            </div> */}
                            <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('43114')}}>
                                <img src={require('../../assets/bxh/AVAX.png')} style={{ width: '10px' }} />
                                AVAX
                            </div>
                         </div>
                      </Card>
                     :
                     null
                    }
                  </span>
                </div>
              ):(
              <div style={{ display: 'flex' }}>
                <div className={getStyleClass('PCaddress',classes.roaddressparentContent)}>
                  {
                    pendingCount > 0?
                    <div className={[chainID === '66' ? classes.roaddressparent1 : chainID === '1' ? classes.roaddressparent2 : classes.roaddressparent].join(' ')} onClick={()=>{this.onOpenAccount()}}>
                      {pendingCount} pending ...
                      <img src={ require('../../assets/bxh/send.png') } alt='' className='stateTransImage'/>
                    </div>
                    :
                    <div style={{ position: 'relative' }}>
                      <div className={classes.roaddress} onClick={()=>this.onOverAccount()} >
                        <span>{address}</span>
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
                           chainID === '137' ?
                           <img src={ require('../../assets/bxh/tesol4.png') }/>
                           :
                           chainID === '43114' ?
                           <img src={ require('../../assets/bxh/tesol5.png') }/>
                           :
                           <img src={ require('../../assets/bxh/tesol.png') }/>
                        }
                      </div>
                    </div>
                  }
                </div>
                {
                  !pathname.includes('twist') && !pathname.includes('bxhstakepc') && !pathname.includes('bxhTradeStake') && !pathname.includes('bxhTradeMobility') && !pathname.includes('dao') ?
                    <div className={getStyleClass('PCContentRightChain',classes.pcContentRightItem)} style={{ cursor: 'initial' }} onClick={this.webOpenChainID}>
                    {
                      chainID === '56' ?
                      <span style={{ cursor: 'pointer' }}>BSC</span>
                      :
                      chainID === '66' ?
                      <span style={{ cursor: 'pointer' }}>OKC</span>
                      :
                      chainID === '1' ?
                      <span style={{ cursor: 'pointer' }}>ETH</span>
                      // :
                      // chainID === '137' ?
                      // <span style={{ cursor: 'pointer' }}>POLYGON</span>
                      :
                      chainID === '43114' ?
                      <span style={{ cursor: 'pointer' }}>AVAX</span>
                      :
                      <span style={{ cursor: 'pointer' }}>HECO</span>
                    }
                    {
                      webmodalChainID ?
                      <span className={getStyleClass('PCjiantou2')} style={{ cursor: 'pointer' }}></span>
                      :
                      <span className={getStyleClass('PCjiantou1')} style={{ cursor: 'pointer' }}></span>
                    }
                    {
                      webmodalChainID ?
                      <Card className={classes.card} onClick={(e) => {e.stopPropagation()}}>
                         <div>
                            <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('128')}}>
                               <img src={require('../../assets/bxh/huobi.png')} style={{ width: '10px' }} />
                                HECO
                            </div>
                            <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('56')}}>
                                <img src={require('../../assets/bxh/bian.png')} style={{ width: '10px' }} />
                                BSC
                            </div>
                            <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('66')}}>
                                <img src={require('../../assets/bxh/okex.png')} style={{ width: '10px' }} />
                                OKC
                            </div>
                            <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('1')}}>
                                <img src={require('../../assets/bxh/eth.png')} style={{ width: '10px' }} />
                                ETH
                            </div>
                            {/* <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('137')}}>
                                <img src={require('../../assets/bxh/polygon.png')} style={{ width: '10px' }} />
                                POLYGON
                            </div> */}
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
                   :
                   null
                }
                
                </div>
              )
            }
            <div className={getStyleClass('PCaddress',classes.roaddressparentContent, classes.roaddresswall)}>
              <div style={{ position: 'relative' }}>
                <div className={classes.roaddress} onClick={()=>this.onOverAccount()} >
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
                      chainID === '137' ?
                      <img src={ require('../../assets/bxh/tesol4.png') }/>
                      :
                      chainID === '43114' ?
                      <img src={ require('../../assets/bxh/tesol5.png') }/>
                      :
                      <img src={ require('../../assets/bxh/tesol.png') }/>
                  }
                </div>
              </div>
            </div>
            {
              language === 'zh' || language === 'zh-CN' ? (
                <div onClick={this.notClick} className={getStyleClass('PCaddress',classes.roaddressparentContent)} style={{ width:'40px' }}>
                  <img src={ require('../../assets/en.png') } width="20px" height="20px" style={{     position: 'absolute', top: '11px' }} />
                </div>
              ) : (
                <div onClick={this.notClick} className={getStyleClass('PCaddress',classes.roaddressparentContent)} style={{ width:'40px' }}>
                  <img src={ require('../../assets/HK.png') } width="20px" height="20px" style={{     position: 'absolute', top: '11px' }} />
                </div>
              )
            }
          </div>
          <div className={classes.penging}>
            {
              pendingCount > 0?
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
        </div>
        { snackbarMessage && this.renderSnackbar() }
        { modalOpen && this.renderUnlockWalletModal() }
        {/* 邀请奖励弹窗 */}
        { modalInvitation && this.renderInvitationModal()}
      </div>
    )
  }
  renderMobile = () => {
    const { classes, t, i18n, bgColor } = this.props;
    const { pendingCount, address, snackbarMessage, modalOpen, pagetype } = this.state;
    let language = i18n.language;
    let chainID = localStorage.getItem('chainIDSwitch')
    let pathname = this.props.location.pathname
    let chainName = 'HECO'
    if(chainID === '56'){
      chainName = 'BSC'
    }else if(chainID === '66'){
      chainName = 'OKC'
    }else if(chainID === '1'){
      chainName = 'ETH'
    }
    // else if(chainID === '137'){
    //   chainName = 'POLYGON'
    // }
    else if(chainID === '43114'){
      chainName = 'AVAX'
    }else{
      chainName = 'HECO'
    }

    return (
      <div style={{backgroundColor:bgColor}} className={ classes.bxhmorsbomt }>
        <div className={ classes.langbgomtsi }>
          <div className={getStyleClass('mbg',classes.topContent)}>
            <img className={classes.logo} src={require('../../assets/bxh/logo.png')} onClick={ () => { this.props.history.push('/') }}/>
            
            <div style={{ position: 'relative' }} className={getStyleClass('Chain')}>
              {
                address ? (
                  pendingCount>0 ?
                  (
                    <div>
                      {
                        !pathname.includes('twist') && !pathname.includes('bxhstakepc') && !pathname.includes('bxhTradeStake') && !pathname.includes('bxhTradeMobility') && !pathname.includes('dao') ?
                          <div className={getStyleClass('fontborder',classes.chaidqiehuan)} style={{ left: '-70px' }}
                            onClick={this.onOpenChainID}>
                            {chainName}
                          </div>  
                          :
                          null
                      }
                    </div>
                  ) : (
                    <div>
                      {
                        !pathname.includes('twist') && !pathname.includes('bxhstakepc') && !pathname.includes('bxhTradeStake') && !pathname.includes('bxhTradeMobility') && !pathname.includes('dao') ?
                          <div className={getStyleClass('fontborder',classes.chaidqiehuan)} onClick={this.onOpenChainID}>
                            {chainName}
                          </div>  
                          :
                          null
                      }
                    </div>
                  )
                )
                
                :
                null
              }
              
              <div className={classes.addressContent}>
              {
                address ? (
                  pendingCount>0 ?
                  (
                    <div onClick={this.onOpenAccount} className={[chainID === '56' ? classes.bscpendingContent : chainID === '66' ? classes.okexpendingContent : chainID === '1' ? classes.ethpendingContent : classes.pendingContent].join(' ')}>
                      {pendingCount} Pending
                      <img className="pendingImage" src={ require('../../assets/bxh/pending.png') }/>
                    </div>
                  ):(
                    <div className={ classes.address } onClick={this.onOpenAccount}> 
                      {/* {address}  */}
                      <img src={ require('../../assets/bxh/teaddress.png') }/>
                    </div>
                  )
                ) : (
                  <div className={[chainID === '56' ? classes.bscunlockWallet : chainID === '66' ? classes.okexunlockWallet : chainID === '1' ? classes.ethunlockWallet : classes.unlockWallet].join(' ')} onClick={this.openUnlockModal}>Unlock Wallet</div>
                )
              }
              </div>
              <div className={ classes.lanNews } onClick={ this.announcement }>
                <img src={ require('../../assets/bxh/gonggao.png') } width="19px" />
              </div>
              <div className={ classes.lanMg }>
                <div className={ classes.langConter }>
                  {
                    !this.state.isShow ? (
                      <div onClick={ (e) => { this.clickOpen(e) }}>
                        <img src={ require('../../assets/bxh/tabnav.png') } width="16px" height="15px"/>
                      </div>
                    ) : (
                      <div className={ classes.langclose } onClick={ () => { this.clickClose() } }>
                        <img src={ require('../../assets/bxh/tabnavClose.png') } width="16px" height="15px"/>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          
          {
            this.state.isShow ? (
              <div>
                <div className={ classes.langbgoption }></div>
                <div style={{backgroundColor: bgColor}} className={getStyleClass('bxhlistbg',classes.langliebiao)}>

                  {
                    chainID === '56'?
                    <span>
                      <span onClick={ this.XDTDuihuan }>
                         <img src={ require('../../assets/bxh/footer_on2_2.png') } /> 
                         XDT{t('BXH.swap')}
                      </span>
                      <span onClick={ this.XTokenDuihuan }>
                         <img src={ require('../../assets/bxh/footer_on2_2.png') } /> 
                         XToken{t('BXH.swap')}
                      </span>
                    </span>
                    :
                    null
                  }
                  
                  <div className={classes.line}></div>
                  <span onClick={()=>{this.contactAddress('https://github.com/BXHash/contracts')}}>
                    {
                      chainID === '56' ?
                      <img src={ require('../../assets/bxh/menu_1_1.png') } /> 
                      :
                      chainID === '66' ?
                      <img src={ require('../../assets/bxh/menu_1_2.png') } /> 
                      :
                      chainID === '1' ?
                      <img src={ require('../../assets/bxh/menu_1_3.png') } /> 
                      :
                      <img src={ require('../../assets/bxh/menu_1.png') } /> 
                    }
                    GitHub
                  </span>
                  <span onClick={()=>{this.contactAddress('https://twitter.com/BXH_Blockchain')}}>
                    {
                      chainID === '56' ?
                      <img src={ require('../../assets/bxh/menu_2_2.png') } />
                      :
                      chainID === '66' ? 
                      <img src={ require('../../assets/bxh/menu_2_3.png') } />
                      :
                      chainID === '1' ? 
                      <img src={ require('../../assets/bxh/menu_2_4.png') } />
                      :
                      <img src={ require('../../assets/bxh/menu_2.png') } />
                    }
                    Twitter
                  </span>
                  <span onClick={()=>{this.contactAddress('https://t.me/BXH_global')}}>
                    {
                      chainID === '56' ?
                      <img src={ require('../../assets/bxh/menu_3_3.png') } />
                      :
                      chainID === '66' ?
                      <img src={ require('../../assets/bxh/menu_3_4.png') } />
                      :
                      chainID === '1' ?
                      <img src={ require('../../assets/bxh/menu_3_5.png') } />
                      :
                      <img src={ require('../../assets/bxh/menu_3.png') } />
                    }
                    Telegram
                  </span>
                  <div className={classes.line}></div>
                  {/* <span onClick={()=>{
                    setTimeout(()=>{                            
                      let launcher = document.querySelector("#launcher")
                      launcher.contentWindow.document.querySelector('button').click()                     
                    },100)
                  }}>
                    {
                      chainID === '56' ?
                      <img src={ require('../../assets/bxh/menu_5_5.png') } />
                      :
                      chainID === '66' ?
                      <img src={ require('../../assets/bxh/menu_5_6.png') } />
                      :
                      chainID === '1' ?
                      <img src={ require('../../assets/bxh/menu_5_7.png') } />
                      :
                      <img src={ require('../../assets/bxh/menu_5.png') } />
                    }
                    { (language === 'zh' || language === 'zh-CN')  ?'在线客服':'Online Service'}
                  </span> */}
                  <span >
                    {
                      chainID === '56' ?
                      <img src={ require('../../assets/bxh/menu_5_5.png') } />
                      :
                      chainID === '66' ?
                      <img src={ require('../../assets/bxh/menu_5_6.png') } />
                      :
                      chainID === '1' ?
                      <img src={ require('../../assets/bxh/menu_5_7.png') } />
                      :
                      <img src={ require('../../assets/bxh/menu_5.png') } />
                    }
                    {
                      language === 'zh' || language === 'zh-CN' ?
                      <em style={{ fontStyle: 'inherit' }} onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/contact')}}>聯繫我們</em>
                      :
                      <em style={{ fontStyle: 'inherit' }} onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/contact')}}>Contact us</em>
                    }
                  </span>
                  {
                    language === 'zh' || language === 'zh-CN' ? (
                      <span onClick={this.notClick}>
                        {
                          chainID === '56' ?
                          <img src={ require('../../assets/bxh/menu_4_4.png') } />
                          :
                          chainID === '66' ?
                          <img src={ require('../../assets/bxh/menu_4_5.png') } />
                          :
                          chainID === '1' ?
                          <img src={ require('../../assets/bxh/menu_4_6.png') } />
                          :
                          <img src={ require('../../assets/bxh/menu_4.png') } />
                        }
                        English
                      </span>
                    ) : (
                      <span onClick={this.notClick}>
                        {
                          chainID === '56' ?
                          <img src={ require('../../assets/bxh/menu_4_4.png') } width="16px" />
                          :
                          chainID === '66' ?
                          <img src={ require('../../assets/bxh/menu_4_5.png') } width="16px" />
                          :
                          chainID === '1' ?
                          <img src={ require('../../assets/bxh/menu_4_6.png') } width="16px" />
                          :
                          <img src={ require('../../assets/bxh/menu_4.png') } width="16px" />
                        }
                        繁体中文
                      </span>
                    )
                  }
                </div>
              </div>
            ) : null
          }
        </div>
        { snackbarMessage && this.renderSnackbar() }
        { modalOpen && this.renderUnlockWalletModal() }
      </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(LangM)));
