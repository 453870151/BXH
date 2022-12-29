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
import AccountDialog from '../accountDialog/accountDialog.jsx';
import InvitationDialog from '../InvitationDialog/InvitationDialog.jsx';
import getLangURLWithURL from '../../util/linkHelper';

import { Dispatcher } from "flux";

import cookie from 'react-cookies'

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHLISTBALANCEHOME,
  BXHLISTBALANCEHOME_RETURNED,
  BXHCOOKIEREFRESHEVENT,
  BXHCHNAGEACCOUNT
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher

const styles = theme => ({
  lanMg: {
    
  },
  pcRoot: {
    position: 'fixed',
    top: '75px',
    left: '10%',
    // marginLeft: '-700px',
    width: '260px',
    zIndex: '99',
  },
  rozichan: {
    background: '#1D1F36',
    borderRadius: '6px',
    margin: '10px 0',
    padding: '12px 30px',
    height:'75px',
    '& span': {
      display: 'block',
      fontSize: '13px',
      opacity: '.4',
      marginBottom: '5px',
    },
    '& i': {
      fontStyle: 'inherit',
      fontSize: '20px',
      fontWeight: 'bold',
      fontFamily: "consola",
    }
  },
  rotabls: {
    position: 'relative',
    background: '#1D1F36',
    borderRadius: '6px',
    padding: '10px 0',
    minHeight: '70vh',
    '& span': {
      display: 'block',
      height:'50px',
      lineHeight: '50px',
      paddingLeft: '30px',
      position:'relative',
      cursor: 'pointer',
      '& em': {
        marginLeft:'10px',
        fontStyle: 'normal',
      },
      '&:hover': {
        backgroundImage: 'none',
        backgroundColor: '#2a2d42',
      },
    },
  },
  leftfoot: {
    position: 'absolute',
    bottom: '20px',
  },
  showLine:{
    width:'5px',
    height:'15px',
    borderRadius: '10px',
    backgroundImage: 'linear-gradient(to bottom, #31BF86, #2FBD85)',
    position:'absolute',
    right:'20px',
    bottom:'18px',
  },
  hideLine:{
    display:'none'
  },
  selectFontcolor:{
    color:'#30BE85',
    fontStyle:'normal',
    position:'relative',
    bottom:'2px'
  },
  noselectFontcolor:{
    color:'rgba(255, 255, 255, 0.8)',
    fontStyle:'normal',
    position:'relative',
    bottom:'2px'
  },
  line:{
    width:'180px',
    background:'rgba(151,151,151,0.1)',
    height:'1px',
    marginLeft:'40px',
    marginTop: '5px',
    marginBottom: '5px',
  },
      stateImage: {
        width: '15px',
        height: '15px',
    },
    guanfangtongxun:{
      filter: 'grayscale(100%)',
      '&:hover': {
        filter: 'none',
      },
      '&:active': {
        filter: 'brightness(50%)',
      },
    }
})

class LeftPC extends Component {
  constructor(props){
    super(props);

    const { pagetype } = this.props;

    this.state = {
      isShow: false,
      address: null,
      addressSelected: false,
      modalOpen: false,
      balanceData:null,
      pagetype,pagetype,
      snackbarMessage: null, 
      snackbarType: null,
      modalAccount:false,
      modalInvitation: false,
    }
    let bxhaddress = cookie.load("bxhaddress")

    dispatcher.dispatch({ type: BXHLISTBALANCEHOME, content: {asset:bxhaddress} })
  }

  // timer = null;
  // // 定时器
  // iTimer = () => {
  //   this.timer = setInterval(() => {

      
  //   }, 500);
  // }
  
  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);

    emitter.on(BXHLISTBALANCEHOME_RETURNED,this.refreshBalance);
    //BXHCOOKIEREFRESHEVENT
    emitter.on(BXHCOOKIEREFRESHEVENT,this.refreshCookieData);

    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    this._checkAccountTracaction()
    setTimeout(this.iTimer,0);
  }
  componentDidMount() {
    // setTimeout(this.iTimer,0);
    document.addEventListener('click', this.hideAllMenu);
    this.refreshAccount()
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);

    emitter.removeListener(BXHLISTBALANCEHOME_RETURNED,this.refreshBalance);

    emitter.removeListener(BXHCOOKIEREFRESHEVENT,this.refreshCookieData);

    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount)//切换账户
    clearInterval(this.timer);
    // clearInterval(this.timer);
    this.setState = (state,callback) =>{
      return;
    }
  }

  changeAccount = () => {
    const { pool, isHave } = this.state
    let bxhaddress = cookie.load("bxhaddress")
    dispatcher.dispatch({ type: BXHLISTBALANCEHOME, content: {asset:bxhaddress} })
    this.refreshAccount()
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
    if (!transactionList) {
      return
    }
    var currentPendingHash = ""
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

  refreshCookieData = (res) => {
    const account = store.getStore('account');
    const address = account.address;
    const{pendingCount} = this.state
    
    let count = 0
    let transactionData = cookie.load(address)
    if(address && transactionData){
      transactionData.map((item) => {
        if(item.isPending){
          count = count + 1
        }
      })
    }
    this.setState({pendingCount:count})
  }

  refreshBalance = (data) => {
    this.setState({ balanceData:data })
  }
  connectionConnected = () => {
    this.refreshAccount()
  };
  connectionDisconnected = () => {
    this.refreshAccount()
  }
  refreshAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    var tempAddr = null
    if (address != undefined && address !== null) {
      const digits = 4
      tempAddr = address.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += address.substr(address.length-digits, digits)
    }
    this.setState({address: tempAddr})
  }
  hideAllMenu = () => {
    this.setState({
      isShow: false,
    })
    this.closePop();
  }

  notClick = (value) => {
    const { i18n } = this.props;
    i18n.changeLanguage(value)
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
    document.body.style.overflow = 'auto';
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }
  //复制地址
  copyAddress = () => {
    const account = store.getStore('account')
    const spanText = account.address;
    const oInput = document.createElement('input');
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.style.display = 'none';
    document.body.removeChild(oInput);

    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: 'Copy Succeeded', snackbarType: 'Success' }
      that.setState(snackbarObj)
    })
  }
  //授权账号
  openUnlockModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
  addressTouchBegin = () => {
    this.setState({addressSelected: true})
  }
  addressTouchEnd = () => {
    this.setState({addressSelected: false})
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
    const account = store.getStore('account');
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
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
  zijinchi = () => {
    // this.nav('createliquiditypool')
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "1"){
      window.open(getLangURLWithURL('https://ethswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "137"){
      window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/pool'),'_self')
    }else if(chainID === "43114"){
      window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/pool'),'_self')
    }else{
      window.open(getLangURLWithURL('https://swap.bxh.com/#/pool'),'_self')
    }
  }
  //流动性
  bxhList = () => {
    const account = store.getStore('account')
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('liquidity')
  }
  dao = () => {
    const account = store.getStore('account')
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('dao')
  }
  announcement = () => {
    window.open('https://bxh.zendesk.com/hc/zh-cn/sections/360001153655-%E5%92%A8%E8%AE%AF%E4%B8%AD%E5%BF%83');
  }
  combustion = () => {
    const account = store.getStore('account')
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
    this.nav('combustion')
  }
  starPlan = () => {
    const account = store.getStore('account')
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
    this.nav('starPlan')
  }
  navigateStake = (link) => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(link)
  }
  loan = () => {
    this.nav('loan')
  }
  market = () => {
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open('https://bscinfo.bxh.com')
    }else if(chainID === "66"){
      window.open('https://okinfo.bxh.com')
    }else if(chainID === "1"){
      window.open('https://ethinfo.bxh.com')
    }else{
      window.open('https://hecoinfo.bxh.com')
    }
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }


  render() {
    const isMobile = this._isMobile();
    return (
      <div style={{width:'100%'}}>
      {
        isMobile ?
        (
          null
        ):(
          this.renderContent()
        )
      }
      </div>
    )
  };
  renderContent = () => {
    const { classes, t, i18n, isHome } = this.props;
    const { address,balanceData,pagetype,pendingCount,snackbarMessage,modalAccount,modalInvitation } = this.state;
    let language = i18n.language;
    let chainID = localStorage.getItem('chainIDSwitch')
    let loanOpenSatus = localStorage.getItem('loanOpenSatus')

    return (
      <div className={classes.pcRoot}>
        <div className={[classes.rozichan, chainID === '56' ? 'bscPCleftbg' : chainID === '66' ? 'okexPCleftbg' : chainID === '1' ? 'ethPCleftbg' : 'hecoPCleftbg'].join(' ')}>
        <span>{t('BXH.nidezichan')}</span>
          <i>{balanceData&&balanceData[0].tokens[0].bxhbanance>0.0001?this.SaveToTwoWei(balanceData[0].tokens[0].bxhbanance+"",4)+"":"0.0000"}</i>
        </div>
        <div className={[classes.rotabls, chainID === '56' ? 'bscPCleftbg' : chainID === '66' ? 'okexPCleftbg' : chainID === '1' ? 'ethPCleftbg' : 'hecoPCleftbg'].join(' ')}>
          <span onClick={ () => { this.props.history.push('/');document.documentElement.scrollTop = document.body.scrollTop = 0; }}>
            <img src={ pagetype=='home'?require('../../assets/bxh/home_select.png'):require('../../assets/bxh/home.png') } width="17px" /> 
            <em className={pagetype=='home'?classes.selectFontcolor:classes.noselectFontcolor}>Home</em> 
            <i className={pagetype=='home'?classes.showLine:classes.hideLine}></i>
          </span>
          <span onClick={() => {this.bxhDuihuan()}}>
            <img src={ pagetype=='swap'?require('../../assets/bxh/duihuan1_select.png'):require('../../assets/bxh/duihuan1.png') } width="17px" /> 
            <em className={pagetype=='swap'?classes.selectFontcolor:classes.noselectFontcolor}>{t('BXH.swap')}</em> 
            <i className={pagetype=='swap'?classes.showLine:classes.hideLine}></i>
          </span>
          <span onClick={() => {this.zijinchi()}}>
            <img src={ pagetype=='zijinchi'?require('../../assets/bxh/zijinc_select.png'):require('../../assets/bxh/zijinc.png') } width="17px" /> 
            <em className={pagetype=='zijinchi'?classes.selectFontcolor:classes.noselectFontcolor}>{t('BXH.zijinchititle')}</em> 
            <i className={pagetype=='zijinchi'?classes.showLine:classes.hideLine}></i>
          </span>
          <span onClick={()=>{this.bxhList()}}>
            {
              chainID === '56' ?
              <i>
                <img src={ pagetype=='bxhList'?require('../../assets/bxh/liudx_select1.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                <em className={pagetype=='bxhList'?"bscselectFontcolor":"bscnoseFontcolor"}>{t('BXH.liudongxingwakuangtitle')}</em> 
                <i className={pagetype=='bxhList'?"bscshowLine":"bschideLine"}></i>
              </i>
              :
              chainID === '66' ?
              <i>
                <img src={ pagetype=='bxhList'?require('../../assets/bxh/liudx_select2.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                <em className={pagetype=='bxhList'?"okexselectFontcolor":"okexnoseFontcolor"}>{t('BXH.liudongxingwakuangtitle')}</em> 
                <i className={pagetype=='bxhList'?"okexshowLine":"okexhideLine"}></i>
              </i>
              :
              chainID === '1' ?
              <i>
                <img src={ pagetype=='bxhList'?require('../../assets/bxh/liudx_select3.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                <em className={pagetype=='bxhList'?"ethselectFontcolor":"ethnoseFontcolor"}>{t('BXH.liudongxingwakuangtitle')}</em> 
                <i className={pagetype=='bxhList'?"ethshowLine":"ethhideLine"}></i>
              </i>
              :
              <i>
                <img src={ pagetype=='bxhList'?require('../../assets/bxh/liudx_select.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                <em className={pagetype=='bxhList'?"hecoselectFontcolor":"heconoseFontcolor"}>{t('BXH.liudongxingwakuangtitle')}</em> 
                <i className={pagetype=='bxhList'?"hecoshowLine":"hecohideLine"}></i>
              </i>
              }
            </span>

            <div className={classes.line}></div>

            {
              loanOpenSatus === '1' ?
              <span onClick={this.loan}>
                {
                  chainID === '56' ?
                  <i>
                    <img src={ pagetype=='loan'?require('../../assets/bxh/jiedai_select1.png'):require('../../assets/bxh/jiedai.png') } width="15px" /> 
                    <em className={pagetype=='loan'?"bscselectFontcolor":"bscnoseFontcolor"}>{t('BXH.loan')}</em> 
                    <i className={pagetype=='loan'?"bscshowLine":"bschideLine"}></i>
                  </i>
                  :
                  chainID === '66' ?
                  <i>
                    <img src={ pagetype=='loan'?require('../../assets/bxh/jiedai_select2.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                    <em className={pagetype=='loan'?"okexselectFontcolor":"okexnoseFontcolor"}>{t('BXH.loan')}</em> 
                    <i className={pagetype=='loan'?"okexshowLine":"okexhideLine"}></i>
                  </i>
                  :
                  chainID === '1' ?
                  <i>
                    <img src={ pagetype=='loan'?require('../../assets/bxh/jiedai_select3.png'):require('../../assets/bxh/liudx.png') } width="18px" /> 
                    <em className={pagetype=='loan'?"ethselectFontcolor":"ethnoseFontcolor"}>{t('BXH.loan')}</em> 
                    <i className={pagetype=='loan'?"ethshowLine":"ethhideLine"}></i>
                  </i>
                  :
                  <i>
                    <img src={ pagetype=='loan'?require('../../assets/bxh/jiedai_select.png'):require('../../assets/bxh/jiedai.png') } width="15px" /> 
                    <em className={pagetype=='loan'?"hecoselectFontcolor":"heconoseFontcolor"}>{t('BXH.loan')}</em> 
                    <i className={pagetype=='bxhList'?"hecoshowLine":"hecohideLine"}></i>
                  </i>
                }
              </span>
              :
              null
            }

            <span onClick={this.market}>
              <img src={ pagetype=='hangqing'?require('../../assets/bxh/hqing_select.png'):require('../../assets/bxh/hqing.png') } width="15px" /> 
              <em className={pagetype=='hangqing'?classes.selectFontcolor:classes.noselectFontcolor}>{t('BXH.hangqing')}</em> 
              <i className={pagetype=='hangqing'?classes.showLine:classes.hideLine}></i>
            </span>
            {
              chainID === '128' ?
              <span onClick={() => {this.dao()}}>
                <i>
                    <img src={ pagetype=='dao'?require('../../assets/bxh/daoshe_select.png'): require('../../assets/bxh/daoshe.png')} width="16px" /> 
                    <em className={pagetype=='dao'?"hecoselectFontcolor":"heconoseFontcolor"}>{t('BXH.daozhilititle')}</em> 
                    <i className={pagetype=='dao'?"hecoshowLine":"hecohideLine"}></i>
                </i>
            </span>
            :
            null
          }
          
          <span onClick={() => {this.announcement()}}>
            <img src={ pagetype=='news'?require('../../assets/bxh/news_select.png'): require('../../assets/bxh/news.png')} width="16px" /> 
            <em className={pagetype=='news'?classes.selectFontcolor:classes.noselectFontcolor}>{t('BXH.announcement')}</em> 
            <i className={pagetype=='news'?classes.showLine:classes.hideLine}></i>
          </span>

          <div className={classes.line}></div>

          <div className={classes.leftfoot}>
            <div style={{marginTop:'10px'}}>
              <a href="https://github.com/BXHash/contracts"><img className={classes.guanfangtongxun} src={ require('../../assets/bxh/Github.png') } alt="" style={{width:"20px",marginLeft:'30px',verticalAlign: 'middle'}}/></a>
              <a href="https://twitter.com/BXH_Blockchain"><img className={classes.guanfangtongxun} src={ require('../../assets/bxh/Twitter.png') } alt="" style={{width:"20px",marginLeft:'10px',verticalAlign: 'middle'}}/></a>
              {/* <a href="https://bxh-blockchain.medium.com"><img className={classes.guanfangtongxun} src={ require('../../assets/bxh/Medium.png') } alt="" style={{width:"20px",marginLeft:'10px',verticalAlign: 'middle'}}/></a> */}
              <a href="https://t.me/BXH_global"><img className={classes.guanfangtongxun} src={ require('../../assets/bxh/Telegram.png') } alt="" style={{width:"20px",marginLeft:'10px',marginTop:'2px',verticalAlign: 'top'}}/></a>
            </div>

            <div style={{fontSize:'12px',opacity:0.8,marginLeft:'30px',marginTop:'10px'}}>Powered by BXH</div>
            <div style={{fontSize:'12px',opacity:0.5,marginLeft:'30px'}}>© 2021 BXH. All rights reserved.</div>
          </div>
        </div>
        { modalAccount && this.renderAccountModal() }
        {/* 邀请奖励弹窗 */}
        { modalInvitation && this.renderInvitationModal()}
      </div>
    )
  }
  renderAccountModal = () => {
    return (
        <AccountDialog onClose={ this.onCloseAccount }/>
    )
  };

  renderInvitationModal = () => {
    return (
      <InvitationDialog onClose={this.onCloseInvitation} />
    )
  }
  onCloseInvitation = () => {
    this.setState({ modalInvitation: false })
  }

    //点击地址
    onOpenAccount = () => {
      this.setState({ modalAccount: true })
    }
    onCloseAccount = () => {
      this.setState({ modalAccount: false })
    }
  SaveToTwoWei = (number,scale) => {
    var scaleP = Math.pow(10,scale);
    var result = Math.floor(number * scaleP) /scaleP;
    return result;
  }
  renderMobile = () => {
    const { classes, t, i18n, bgColor } = this.props;
    const { address, snackbarMessage, modalOpen, addressSelected } = this.state;
    let language = i18n.language;
    return (
      <div style={{backgroundColor:bgColor}} className={ classes.bxhmorsbomt }>
        <div className={ classes.langbgomtsi }>
          <div style={{backgroundColor:bgColor}} className={classes.topContent}>
            <img
                src={ require('../../assets/bxh/logo.png') }
                width="76px"
                height="26px"
              onClick={ () => { this.props.history.push('/') }}/>
            <div>
              <div className={classes.addressContent}>
              {
                address ? (
                  <div className={ (addressSelected ? classes.addressTouch : classes.address) } onTouchStart={this.addressTouchBegin} onTouchEnd={this.addressTouchEnd} onTouchCancel={this.addressTouchEnd} onClick={this.copyAddress}> 
                    {address} 
                    <img src={ require('../../assets/bxh/copy.png') }/>
                  </div>
                ) : (
                  <div className={classes.unlockWallet} onClick={this.openUnlockModal}>Unlock Wallet</div>
                )
              }
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
                <div style={{backgroundColor: bgColor}} className={ classes.langliebiao }>
                  <span onClick={ this.bxhDuihuan }>{t('BXH.exchange')}</span>
                  <span onClick={ this.bxhList }>{t('BXH.fluidMining')}</span>
                  <span onClick={ this.dao }>DAO</span>
                  {
                    language === 'zh' ? (
                      <span onClick={ () => { this.notClick('en') } }>English</span>
                    ) : (
                      <span onClick={ () => { this.notClick('zh') } }>简体中文</span>
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

export default withNamespaces()(withRouter(withStyles(styles)(LeftPC)));
