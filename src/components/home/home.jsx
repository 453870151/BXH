import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  TextField,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { List } from 'antd';
import { colors } from '../../theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import OpeningModal from '../unlock/openingModal.jsx'
import Header from '../unlock/Header.jsx';
import Footer from '../unlock/Footer.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import CountUp from 'react-countup';
import { toShowDollar, formatDate, formatDate1, formatTimeDate, _getValuemultip1, _getValueAdd2, _getValuemultip, getStyleClass,getNewStyleClass,isEmpty,isNoEmpty } from '../../config/constantFunction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import getLangURLWithURL from '../../util/linkHelper';
import { getModuleData } from '../../constants/api'
import { client } from '../../constants/apollo/client'
import { Market } from '../../constants/apollo/queries'
  
import {
  ERROR,
  BXHGETAIRDROP,
  BXHGETAIRDROP_RETURNED,
  BXHYIELDGETAIRDROP,
  BXHYIELDGETAIRDROP_RETURNED,
  GET_PASSEXCHANGE_PERPETUAL,
  BXH_HOMEBALANCE,
  BXH_HOMEBALANCE_RETURNED,
  BXHCHNAGEACCOUNT,
  BXHMENUHEADER_RETURN,
  BXHINDEXBANNER,
  BXHINDEXBANNER_RETURN,
  BXHINDEXNOTICE,
  BXHINDEXNOTICE_RETURN,
} from '../../constants'
  
const styles = theme => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minWidth: '900px',
      justifyContent: 'center',
    }
  },
});
  
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
  
class Home extends Component {
  
  constructor(props) {
    super()
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const storageMenuList = JSON.parse(localStorage.getItem("menuList"))
    const storageBannerList = JSON.parse(localStorage.getItem("bxhBanner"))
    this.state = {
      isMobile: true,
      modalUnlock: false,
      bxhInfo: {},
      airdrop: {},
      team_lock: {},
      oldBuyHT: 0,
      oldTvl_total: 0,
      oldTotal_ex_volume: 0,
      oldDaoRewardWait: 0,
      oldDao_reward: 0,
      oldTotal_ex_fee: 0,
      oldTotal_black_hole: 0,
      yieldAirDropCount: 0,
      oldTvl_news_total: 0,
      modalSendType: null, // ??????????????????????????????0????????? 1?????? -1?????????
      modalSend: false,
      msgContent: "",
      txHash: "",
      strategicCooperationList: [{name:'gate'}, {name:'biki'}, {name:'jb'}, {name:'brinkAsset'}, {name:'tokenpockt'}, {name:'bitkeep',link:'https://bitkeep.org/'}, {name:'codebank'}, {name:'bicc'}, {name:'bibox'}, {name:'hotbit'}, {name:'hypay'}],
      thankSupportList: [{name:'cvn'}, {name:'ruff'}, {name:'hpt'}, {name:'earnDefi'}, {name:'converter'}, {name:'pilot'}, {name:'luck'}, {name:'depth'}, {name:'starlink'}, {name:'hbo'}, {name:'solo'}],
      rewardBXHFactory: rewardBXHFactory,
      day: '--',
      hour: '--',
      minute: '--',
      second: '--',
      bxh_ex_new: {}, //??????????????????
      bxh_ex_pool: {},  //????????????
      bscbxh_ex_pool: {},  //bsc????????????
      bxh_ex_twist: [],
      bxh_ex_Stake: [],
      tvlTotal: '',
      moduleConfig: [],
      priceOracle: null,//???????????????
      sumDeposit: '',//?????????
      sumBorrow: '',//?????????
      farmsListArr: [],
      bxh_pool: [],
      tvl_total_list:[],
      tvl_total_mlist:[],
      notice_list:[],
      listMarginTop:"0",
      noticeMarginTop:"0",
      animate:false,
      noticeAnimate:false,
      bridgeTotal: '',  //?????????????????????
      NoticeArray: [], //??????
      MenuArray: storageMenuList,  //?????????????????????????????????????????????????????????
      BannerArray: storageBannerList,
    }
 
    dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
  }

  timer = null;
  createTimer = () => {
    const that = this;
    this.invateTimer();
    this.timer = setInterval(() => {
      that.refreshData();
      that.indexBXHTvlList();
    }, 10000);
  }
  invateTimer = () => {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  componentWillMount() {
    emitter.on(BXHGETAIRDROP_RETURNED, this.airDropReturn);
    emitter.on(ERROR, this.errorReturned);  // ??????????????????
    emitter.on(BXHYIELDGETAIRDROP_RETURNED, this.checkYieldLpAirDrop)
    emitter.on(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    emitter.on(BXHMENUHEADER_RETURN, this.menuReturned);
    emitter.on(BXHINDEXBANNER_RETURN, this.bannerReturned);
    emitter.on(BXHINDEXNOTICE_RETURN, this.NoticeReturned);
    // banner???
    dispatcher.dispatch({ type: BXHINDEXBANNER, content: {} })
    // ??????
    dispatcher.dispatch({ type: BXHINDEXNOTICE, content: {} })
 
    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // ???????????????????????????????????????
      ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }

  componentWillUnmount() { //???????????????????????????????????????????????????????????????this???????????????
    emitter.removeListener(BXHGETAIRDROP_RETURNED, this.airDropReturn);
    emitter.removeListener(ERROR, this.errorReturned);  // ??????????????????
    emitter.removeListener(BXHYIELDGETAIRDROP_RETURNED, this.checkYieldLpAirDrop)
    emitter.removeListener(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    emitter.removeListener(BXHMENUHEADER_RETURN, this.menuReturned);
    emitter.removeListener(BXHINDEXBANNER_RETURN, this.bannerReturned);
    emitter.removeListener(BXHINDEXNOTICE_RETURN, this.NoticeReturned);
  
    window.removeEventListener('resize', this.handleResize.bind(this))
    this.invateTimer();
    clearInterval(this.timerDate);
    this.setState = (state, callback) => {
      return;
    }
  }
  
  componentDidMount = () => {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: true })
    } else {  // PC???
      this.setState({ isMobile: false })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //????????????????????????
    this.createTimer();
    this.refreshData();

    // ??????????????????
    this.menuTimer();
    this.indexBXHTvlList(); // ?????????????????????(????????????????????????????????????????????????)
    setTimeout(()=>{
      this.startNoticeScrollUp();
    },3000)
    setTimeout(()=>{
      this.startTvlScrollUp();
    },3000)
    this.indexBXHBridgeTotal();  // ?????????????????????
    
    this.indexBXHInfo();
    this.storageBXHInfo();  // ???storage
    this.requestFarmsInfo();
    const { i18n } = this.props;
    let changeLanguage = "";
    if(window.location.hash === "#/?lang=en"){
      changeLanguage = "en";
    }else if(window.location.hash === "#/?lang=zh-CN"){
      changeLanguage = "zh";
    }
    i18n.changeLanguage(changeLanguage)
  }

  // ????????????????????????????????????
  handleAccountsChanged = () => {
    setTimeout(()=>{
      this.refreshData();
      this.indexBXHInfo();
      this.storageBXHInfo();  // ???storage
      this.requestFarmsInfo();
      this.menuTimer();
      this.indexBXHBridgeTotal();  // ?????????????????????
      dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
      clearInterval(this.timerDate);
    },100);
  }
  requestFarmsInfo = ()=>{
    // let farmsContract = '0x30c6e1a43e4A93Bab7Fd15c5b55A753342e10207';
    store._getFarmsPool(data=>{
      let farmsListArr = data.pool;
      for(let i=0;i<farmsListArr.length;i++){
        let item = farmsListArr[i];
        store._getSingleSimpleInfo(item.contractAddress,item.exId,(err,info)=>{
          if(isEmpty(err)){
            item.userInfo = info;
            this.setState({farmsListArr:[...farmsListArr]});
          }
        });
      }
      this.setState({farmsListArr});
    });
  }

  // ??????
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

  //banner
  bannerReturned = (data) => {
    localStorage.setItem("bxhBanner", JSON.stringify(data));
    this.setState({ BannerArray: data })
  }
  //banner??????
  bannerClick = (idx) => {
    const { BannerArray } = this.state;
    if (BannerArray && BannerArray.length > idx) {
      const obj = BannerArray[idx];
      if (obj && obj.clickUrl && obj.clickUrl.length > 0) {
        window.open(obj.clickUrl);
      }
    }
  }

  //??????
  NoticeReturned = (data) => {
    localStorage.setItem("bxhNotice", JSON.stringify(data));
    this.setState({ NoticeArray: data, notice_list: data.data })
  }

  indexBXHTvlList = () => {
    const { i18n } = this.props;
    store._getIndexBXHTvlList(i18n.language, (data) => {
      let dataList = data.data.data.body
      this.setState({ tvlTotal: dataList.bxh_tvl_total, tvl_total_list: dataList.bxh_tvl_list, tvl_total_mlist: dataList.bxh_tvl_list, });
    })
  }

  // pc???5?????????????????????????????? start
  startTvlScrollUp = () => {
    if(this.state.tvl_total_list[0]){
      this.endScroll();
      this.scrollUp();
      this.scrollInterval=setInterval(this.scrollUp, 3000);
    }
  }
  scrollUp = () => {
    // this.state.tvl_total_list.push(this.state.tvl_total_list[0]);
    this.setState({ 
      tvl_total_list: [...this.state.tvl_total_list, this.state.tvl_total_list[0]],
      animate: true,
      listMarginTop: "-30px",
    }); 
    setTimeout(() => { 
      this.state.tvl_total_list.shift();    
      this.setState({ 
        animate: false,
        listMarginTop: "0",
      }); 
      this.forceUpdate();
    }, 2000)
  }
  endScroll= e =>{
    clearInterval(this.scrollInterval);
  }
  // pc???5?????????????????????????????? end

  // ???????????? start
  startNoticeScrollUp = () => {
    if(this.state.notice_list[0]){
      this.endNoticeScroll();
      this.scrollNoticeUp();
      this.scrollNoticeInterval=setInterval(this.scrollNoticeUp, 3000);
    }
  }
  scrollNoticeUp = () => {
    this.setState({ 
      notice_list: [...this.state.notice_list, this.state.notice_list[0]],
      noticeAnimate: true,
      noticeMarginTop: "-30px",
    }); 
    setTimeout(() => { 
      this.state.notice_list.shift();    
      this.setState({ 
        noticeAnimate: false,
        noticeMarginTop: "0",
      }); 
      this.forceUpdate();
    }, 2000)
  }
  endNoticeScroll= e =>{
    clearInterval(this.scrollNoticeInterval);
  }
  // ???????????? end

  indexBXHBridgeTotal = () => {
    store._getIndexBXHBridgeTotal((data) => {
      let dataList = data.data.data.body
      this.setState({ bridgeTotal: dataList.bridgeTotal });
    })
  }

  indexBXHInfo = () => {
    const that = this;
    store._getIndexBXHInfo((data) => {
      let dataList = data.data
      let sourceData = data.sourceData
      // ???????????????
      let timeDate
      timeDate = formatDate1(dataList.bxh_info.minus_time)
      let end = Date.parse(new Date(timeDate))
      this.countFun(end);
      // ??????????????????
      that.setState({ bxh_ex_new: dataList.bxh_ex_new });
      // ????????????
      let poolArray = []
      let bscpoolArray = []
      for (var g = 0; g < sourceData.pool_6.length; g++) {
        if (sourceData.pool_6[g].is_hot === 1) {
          poolArray.push(sourceData.pool_6[g])
        }
      }
      for (var b = 0; b < sourceData.pool_5.length; b++) {
        if (sourceData.pool_5[b].is_hot === 1) {
          poolArray.push(sourceData.pool_5[b])
        }
      }
      for (var i = 0; i < sourceData.pool_1.length; i++) {
        if (sourceData.pool_1[i].is_hot === 1) {
          poolArray.push(sourceData.pool_1[i])
          bscpoolArray.push(sourceData.pool_1[i])
        }
      }
      for (var j = 0; j < sourceData.pool_2.length; j++) {
        if (sourceData.pool_2[j].is_hot === 1) {
          poolArray.push(sourceData.pool_2[j])
          bscpoolArray.push(sourceData.pool_2[j])
        }
      }
      for (var n = 0; n < sourceData.pool_3.length; n++) {
        if (sourceData.pool_3[n].is_hot === 1) {
          poolArray.push(sourceData.pool_3[n])
          bscpoolArray.push(sourceData.pool_3[n])
        }
      }
      for (var c = 0; c < sourceData.pool_7.length; c++) {
        if (sourceData.pool_7[c].is_hot === 1) {
          poolArray.push(sourceData.pool_7[c])
          bscpoolArray.push(sourceData.pool_7[c])
        }
      }
      if (poolArray.length > 0) {
        let poolArrayLen = []
        let length = poolArray.length > 8 ? 8 : poolArray.length
        for (var m = 0; m < length; m++) {
          poolArrayLen.push(poolArray[m])
        }

        // ?????????????????????
        for(let i=0;i<poolArrayLen.length;i++){
          let item = poolArrayLen[i];
          store._getBXHShouYi(item, (err,value)=>{
            if(isEmpty(err)){
              item.shouyi = value;
              this.setState({bxh_ex_pool:[...poolArrayLen]});
            }
          });
        }
        that.setState({ bxh_ex_pool: poolArrayLen });
      }else{
        that.setState({ bxh_ex_pool: [] });
      }

      that.setState({ 
        bxh_ex_twist: sourceData.pool_5,
        bxh_ex_Stake: sourceData.pool_2,
      });
      if (bscpoolArray.length > 0) {
        let bscpoolArrayLen = []
        let bsclength = bscpoolArray.length > 8 ? 8 : bscpoolArray.length
        for (var m = 0; m < bsclength; m++) {
          bscpoolArrayLen.push(bscpoolArray[m])
        }
        that.setState({ bscbxh_ex_pool: bscpoolArrayLen });
      }else{
        that.setState({ bscbxh_ex_pool: [] });
      }
    })

    // ?????????????????? Timo
    store._getBXHPool((data) => {
      let dataList = data.body
      let dataPool = []
      if(dataList.length > 0){
        dataList.map((obj, idx) => {
          if(idx < 4){
            dataPool.push(obj)
          }
        })
        this.setState({
          bxh_pool: dataPool,
        })
      }else{
        this.setState({
          bxh_pool: [],
        })
      }
    });

  }
  storageBXHInfo = () => {
    // ???Storage??????
    let data = JSON.parse(localStorage.getItem('IndexBXHInfo'))
    if (data) {
      const that = this;
      let sourceData = data.sourceData

      // ????????????
      let poolArray = []
      let bscpoolArray = []
      for (var b = 0; b < sourceData.pool_5.length; b++) {
        if (sourceData.pool_5[b].is_hot === 1) {
          poolArray.push(sourceData.pool_5[b])
        }
      }
      for (var i = 0; i < sourceData.pool_1.length; i++) {
        if (sourceData.pool_1[i].is_hot === 1) {
          poolArray.push(sourceData.pool_1[i])
          bscpoolArray.push(sourceData.pool_1[i])
        }
      }
      for (var j = 0; j < sourceData.pool_2.length; j++) {
        if (sourceData.pool_2[j].is_hot === 1) {
          poolArray.push(sourceData.pool_2[j])
          bscpoolArray.push(sourceData.pool_2[j])
        }
      }
      for (var n = 0; n < sourceData.pool_3.length; n++) {
        if (sourceData.pool_3[n].is_hot === 1) {
          poolArray.push(sourceData.pool_3[n])
          bscpoolArray.push(sourceData.pool_3[n])
        }
      }
      if (poolArray.length > 0) {
        let poolArrayLen = []
        let length = poolArray.length > 8 ? 8 : poolArray.length
        for (var m = 0; m < length; m++) {
          poolArrayLen.push(poolArray[m])
        }
        that.setState({ bxh_ex_pool: poolArrayLen });
      }
      if (bscpoolArray.length > 0) {
        let bscpoolArrayLen = []
        let bsclength = bscpoolArray.length > 8 ? 8 : bscpoolArray.length
        for (var m = 0; m < bsclength; m++) {
          bscpoolArrayLen.push(bscpoolArray[m])
        }
        that.setState({ bscbxh_ex_pool: bscpoolArrayLen });
      }
    }
  }
  countFun = (end) => {
    let now_time = Date.parse(new Date());
    var remaining = end - now_time;
    this.timerDate = setInterval(() => {
      //??????????????????
      if (remaining > 1000) {
        remaining -= 1000;
        let day = Math.floor((remaining / 1000 / 3600) / 24);
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor(remaining / 1000 % 60);
  
        this.setState({
          day: day,
          hour: hour < 10 ? "0" + hour : hour,
          minute: minute < 10 ? "0" + minute : minute,
          second: second < 10 ? "0" + second : second
        })
      } else {
        clearInterval(this.timerDate);
      }
    }, 1000);
  }
  
  refreshData = () => {
    const that = this;
    store._getBXHInfo((data) => {
      const tempBxhInfo = that.state.bxhInfo;
      if (tempBxhInfo) {
        that.setState({
          oldTvl_total: tempBxhInfo.tvl_total ? tempBxhInfo.tvl_total : 0,
          oldTotal_ex_volume: tempBxhInfo.total_ex_volume ? tempBxhInfo.total_ex_volume : 0,
          oldTotal_ex_fee: tempBxhInfo.total_ex_fee ? tempBxhInfo.total_ex_fee : 0,
          oldBuyHT: tempBxhInfo.buy_ht ? tempBxhInfo.buy_ht : 0,
          oldDaoRewardWait: tempBxhInfo.dao_reward_wait ? tempBxhInfo.dao_reward_wait : 0,
          oldDao_reward: tempBxhInfo.dao_reward ? tempBxhInfo.dao_reward : 0,
        });
      }
      that.setState({ bxhInfo: data.bxh_info, airdrop: data.airdrop, team_lock: data.team_lock });
  
      const { bxhInfo } = that.state
      const account = store.getStore('account');
      if (account.address && bxhInfo && bxhInfo.air_address) {
        dispatcher.dispatch({ type: BXHYIELDGETAIRDROP, content: { airDropcontractAddress: bxhInfo.air_address } })
      }
      //???????????????
      const rewardSymbolList = store.getStore('rewardSymbolList');
      if (account.address && (!rewardSymbolList || rewardSymbolList.length == 0)) {
        dispatcher.dispatch({ type: GET_PASSEXCHANGE_PERPETUAL, content: { token_list: data.token_list, needRefresh: false } })
      }
    });
  }
  
  // BXH??????
  getBalance = (data) => {
    this.setState({ rewardBXHFactory: data })
  }
  
  airDropReturn = (data) => {
    const that = this;
    store._getBXHInfo((data) => {
      that.setState({ bxhInfo: data.bxh_info, airdrop: data.airdrop, team_lock: data.team_lock });
      const { bxhInfo } = that.state
      const account = store.getStore('account');
      if (account.address && bxhInfo && bxhInfo.air_address) {
        dispatcher.dispatch({ type: BXHYIELDGETAIRDROP, content: { airDropcontractAddress: bxhInfo.air_address } })
      }
    });
  }
  checkYieldLpAirDrop = (data) => {
    this.setState({ yieldAirDropCount: data[0].tokens[0].amount.amount })
  }
  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };
  
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: true })
    } else {  // PC???
      this.setState({ isMobile: false })
    }
  }
  getAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
  }
  navigateBXHStakePC = (item) => {
    const account = store.getStore('account');
    const address = account.address
    if(!address){
      this.getAccount();
      return false
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    let chainID = localStorage.getItem('chainIDSwitch')
    store.setStore({ currentdTradePool: item })
    if (item.pair_token_type === 1 && item.pool_type !== 3 && item.pool_type !== 4 && item.pool_type !== 5) { // ??????
      this.props.history.push('/singletoken/' + item.ex_id + '_' + item.id_centerdata)
    } else if(item.pool_type === 3){
      // ????????????
      this.props.history.push('/twist/' + item.ex_id)
    } else if(item.pool_type === 4){
      // ?????????????????????
      if(chainID === '128'){
        this.props.history.push('/pledgeUSDT/' + item.ex_id)
      }else{
        this.props.history.push('/pledge/' + item.ex_id)
      }
    } else if(item.pool_type === 5){
      // ??????(V2)
      this.props.history.push('/bxhstakeUSDTpc/' + item.ex_id)
    } else {  // ??????
      this.props.history.push('/bxhstakepc/' + item.ex_id)
    }
  }
  navigateBXHSinglePC = (item) => {
    store.setStore({ currentdTradePool: item })
    this.props.history.push('/single/' + item.id)
  }

  navigateBXHStake = (item) => {
    const account = store.getStore('account');
    const address = account.address
    if(!address){
      this.getAccount();
      return false
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.setStore({ currentdTradePool: item })
    if(item.pool_type !== 3 && item.pool_type !== 5){
      // ????????????
      this.props.history.push('/bxhTradeStake/' + item.ex_id)
    }else if(item.pool_type === 5){
       // ??????(V2)
       this.props.history.push('/bxhTradeUSDTStake/' + item.ex_id)
    }else{
      // ?????????????????????
      this.props.history.push('/twist/' + item.ex_id)
    }
  }
  navigateStakeTwist = (item) => {
    const account = store.getStore('account');
    const address = account.address
    if(!address){
      this.getAccount();
      return false
    }
    let chainID = localStorage.getItem('chainIDSwitch')
    store.setStore({ currentdTradePool: item })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    if(chainID === '128'){
      this.props.history.push('/pledgeUSDT/' + item.ex_id)
    }else{
      this.props.history.push('/pledge/' + item.ex_id)
    }
  }

  nav = (screen) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push('/' + screen)
  }

  saveToTwoWei = (number) => {
    return this.saveToWei(number, 2);
  }
  saveToWei = (number, scale = 4) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  openClick = (address) => {
    if(address){
      window.open(address);
    }
  }

  renderSendModal = () => {
    const { modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }
  
  renderModal = () => {
    return (
      <OpeningModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }
  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={this.closeUnlockModal} modalOpen={this.state.modalUnlock} />
    )
  }
  
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
  openUnlockModal = () => {
    this.setState({ modalUnlock: true })
  }
  closeUnlockModal = () => {
    this.setState({ modalUnlock: false })
  }

 
  render() {
    const { classes, t, i18n } = this.props;
    const { modalOpen, modalUnlock, modalSend, MenuArray } = this.state
    return (
      <div style={{width:'100%'}}>
        {/* ???????????? */}
        <Header openUnlockModal={this.openUnlockModal} />

        <div className="pcContent">
          {/* banner??? */}
          {this.renderBanner()}
          <div className="container">
            {/* ?????? */}
            {this.renderNews()}
            {/* ?????????????????? */}
            {this.renderTvlTotal()}
            {/* ???????????????????????????????????????????????? */}
            {this.renderCount()}
            {/* BXH???????????????BXH??????????????????????????????????????????????????????????????????7????????? */}
            {this.renderStatistics()}
            {/* ???????????? */}
            {this.renderRecommendPool()}
            {/* ???????????? */}
            {this.renderHotPool()}
            {/* ???????????? */}
            {
              MenuArray&&MenuArray.friend.length > 0 ?
              this.renderPartners()
              :
              null
            }
            {/* ???????????? */}
            {
              MenuArray&&MenuArray.check.length > 0 ?
              this.renderAudit()
              :
              null
            }
          </div>
        </div>

        {/* ???????????? */}
        <Footer pagetype="home"/>

        { modalOpen && this.renderModal()}
        { modalUnlock && this.renderUnlockWalletModal()}
        { modalSend && this.renderSendModal()}
      </div>
    )
  };

  // banner???
  renderBanner = () => {
    const { classes, i18n } = this.props;
    const { isMobile, BannerArray } = this.state
    return (
      <div>
        {
            !isMobile ?
            // pc??????
            <div>
              {
                BannerArray ?
                  (
                    <Carousel className={classes.banner} onClickItem={this.bannerClick} interval={5000} autoPlay={true} showThumbs={false} showIndicators={BannerArray.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                      {
                        BannerArray.map((obj, idx) => {
                          return <div key={idx} >
                            {
                              obj.clickUrl ?
                                <img src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ cursor: 'pointer', pointerEvents: 'auto' }} />
                                :
                                <img src={isMobile ? obj.imgH5 : obj.imgWeb} />
                            }
                          </div>
                        })
                      }
                    </Carousel>
                  ) :
                  <div>
                    <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-moren.png" />
                  </div>
              }
            </div>
            :
            // m??????
            <div className="container">
              {
                BannerArray ?
                  (
                    <Carousel className={classes.banner} onClickItem={this.bannerClick} interval={5000} autoPlay={true} showThumbs={false} showIndicators={BannerArray.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                      {
                        BannerArray.map((obj, idx) => {
                          return <img key={idx} src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ borderRadius: '8px' }} />
                        })
                      }
                    </Carousel>
                  ) :
                  <div>
                    <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-h5-moren.png" />
                  </div>
              }
            </div>
          }
      </div>
    )
  }

  // ??????
  renderNews = () => {
    const { t } = this.props;
    const { NoticeArray, notice_list, noticeMarginTop, noticeAnimate } = this.state
    return (
      <div className={getNewStyleClass('tongzhi-box', 'mt15')}>
        <div className={getNewStyleClass('bg1', 'tongzhi-bg')}>
          <div className="h flex flex_mjustify flex_crosscenter">
              <div>
                {
                  NoticeArray&&NoticeArray.data ?
                  <ul>
                    <div className="noticeContainer">
                      {
                        notice_list&&notice_list.length>0?
                        <List
                          itemLayout="horizontal"
                          style={{marginTop: noticeMarginTop}}
                          className={noticeAnimate ? "noticeAnimate" : ''}
                          dataSource={notice_list}
                          renderItem={(item, idx) => (
                            <li key={idx} onClick={()=>{this.openClick(item.forwardPath)}}>
                                {item.title}
                            </li>
                          )}
                        />
                        :
                        null
                      }
                    </div>
                  </ul>
                  // <ul>
                  //     {
                  //       NoticeArray.data[0] ?
                  //       <li onClick={()=>{this.openClick(NoticeArray.data[0].forwardPath)}}>
                  //         {NoticeArray.data[0].title}
                  //       </li>
                  //       :
                  //       null
                  //     }
                  // </ul>
                  :
                  null
                }
              </div>
              <div className={getNewStyleClass('a-more', 'news-more', 'is_pc')} onClick={()=>{this.openClick(NoticeArray&&NoticeArray.more_link)}}>{t('BXH.newsMore')}</div>
          </div>
        </div>
      </div>
    )
  }

  // ??????????????????
  renderTvlTotal = () => {
    const { t } = this.props;
    const { isMobile, oldTvl_total, tvlTotal, animate, listMarginTop, tvl_total_list, tvl_total_mlist } = this.state
    return (
      <div className={getNewStyleClass('item-box1', 'item-chainbox1', 'bg1', 'mt15')}>
          <div className="flex flex_mjustify flex_crosscenter">
              <div className="left">
                  <div className="n">{t('BXH.pledgeMulti')}</div>
                  <div className="s">
                    {tvlTotal ?
                      (
                        <CountUp
                          start={this.saveToTwoWei(oldTvl_total)}
                          end={this.saveToTwoWei(tvlTotal)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="$">
                        </CountUp>
                      )
                      : '--'}
                  </div>
              </div>

              {/* pc???5?????????????????????????????? */}
              {
                !isMobile ?
                <ul className="pcRight flex">
                  <div className="listContainer">
                    {
                      tvl_total_list&&tvl_total_list.length>0?
                      <List
                        itemLayout="horizontal"
                        id="scrollList"
                        style={{marginTop: listMarginTop}}
                        className={animate ? "animate" : ''}
                        dataSource={tvl_total_list}
                        renderItem={(item, idx) => (
                          <li key={idx}>
                              <span className="n">
                                {item.chainName}{t('BXH.homeTotalStaking')}???
                              </span>
                              <span className="s">
                                ${item.total ? this.saveToTwoWei(item.total) : '--'}
                              </span>
                          </li>
                        )}
                      />
                      :
                      null
                    }
                  </div>
                </ul>
                :
                null
              }       
              
              {/* ?????????5?????????????????? */}
              {
                isMobile ?
                <div className="right">
                  <ul className="flex">
                    <div className="listContainer">
                      {
                        tvl_total_list&&tvl_total_list.length>0?
                        <List
                          itemLayout="horizontal"
                          id="scrollList"
                          style={{marginTop: listMarginTop}}
                          className={animate ? "animate" : ''}
                          dataSource={tvl_total_list}
                          renderItem={(item, idx) => (
                            <li key={idx}>
                                <span className="n">
                                  <i>{item.chainName}</i>{t('BXH.homeTotalStaking')}???
                                </span>
                                <span className="s">
                                  ${item.total ? this.saveToTwoWei(item.total) : '--'}
                                </span>
                            </li>
                          )}
                        />
                        :
                        null
                      }
                    </div>
                  </ul>
                </div>
                :
                null
              }
          </div>
      </div>
    )
  }

  // ????????????????????????????????????????????????
  renderCount = () => {
    const { t } = this.props;
    const { oldTvl_total, oldTvl_news_total, bridgeTotal } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        {/* pc */}
        <div className="item-box2 mt15 is_pc">
          <div className="row">
              <div className="col-md-6">
                  <div className={getNewStyleClass('bg1', 'flex', 'flex_crosscenter', 'bgn')}>
                      <div className="n">BXH{t('BXH.will')}</div>
                      <div className={getNewStyleClass('item-time', 'time', 'c-fff')}>
                          <span>{this.state.day}</span> {t('BXH.daytime')}&nbsp;
                          <span>{this.state.hour}</span> : <span>{this.state.minute}</span> : <span>{this.state.second}</span> 
                          <i>{t('BXH.reduce')}</i>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className={getNewStyleClass('bg1', 'flex', 'flex_mjustify', 'flex_crosscenter', 'bgn')}>
                      <div className="n">
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
                          chainID === '137' ?
                          <span>POLYGON</span>
                          :
                          chainID === '43114' ?
                          <span>AVAX</span>
                          :
                          <span>HECO</span>
                        }
                        {t('BXH.Cumulative')}(USDT)
                      </div>
                      <div className="s c-fff">
                        {bridgeTotal ?
                          (
                            <CountUp
                              start={this.saveToTwoWei(oldTvl_news_total)}
                              end={this.saveToTwoWei(bridgeTotal)}
                              duration={2.0}
                              separator=","
                              decimals={2}
                              decimal="."
                              prefix="$">
                            </CountUp>
                          )
                          : '--'}
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* ?????? */}
        <div className={getNewStyleClass('bg1', 'item-box2', 'mt15', 'is_wap')}>
            <div className="flex flex_mjustify flex_crosscenter">
                <div className="txt">{t('BXH.daytit1')}<br/>{t('BXH.daytit2')}</div>
                <div className={getNewStyleClass('item-time', 'time', 'c-fff')}>
                    <span>{this.state.day}</span> {t('BXH.daytime')}&nbsp;
                    <span>{this.state.hour}</span> : <span>{this.state.minute}</span> : <span>{this.state.second}</span> 
                </div>
            </div>
        </div>
        <div className={getNewStyleClass('bg1', 'item-box2', 'mt15', 'is_wap')}>
            <div className="flex flex_crosscenter flex_mjustify">
                <div className="n">
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
                    chainID === '137' ?
                    <span>POLYGON</span>
                    :
                    chainID === '43114' ?
                    <span>AVAX</span>
                    :
                    <span>HECO</span>
                  }
                  {t('BXH.Cumulative')}(USDT)
                </div>
                <div className="s c-fff">
                  {bridgeTotal ?
                    (
                      <CountUp
                        start={this.saveToTwoWei(oldTvl_news_total)}
                        end={this.saveToTwoWei(bridgeTotal)}
                        duration={2.0}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix="$">
                      </CountUp>
                    )
                    : '--'}
                </div>
            </div>
        </div>
      </div>
    )
  }
 
  // BXH???????????????BXH??????????????????????????????????????????????????????????????????7?????????
  renderStatistics = () => {
    const { t } = this.props;
    const { bxhInfo, rewardBXHFactory, oldTvl_total, oldTotal_ex_volume } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={getNewStyleClass('bg1', 'item-box3', 'mt15')}>
        <div className={getNewStyleClass('item-bordbox3')}>
          <div className="row">
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">BXH{t('BXH.homeprice')}(USDT)</div>
                      <div className="s s1">
                        {bxhInfo && bxhInfo.bxh_price ?
                          (
                            '$' + this.saveToWei(bxhInfo.bxh_price)
                          )
                          : '--'}
                      </div>
                  </div>
              </div>
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">{t('BXH.homeHold')}BXH</div>
                      <div className="s s1">
                        {
                          rewardBXHFactory ?
                            rewardBXHFactory[0].tokens[0].bxhbanancehome ?
                              <span>{this.saveToWei(rewardBXHFactory[0].tokens[0].bxhbanancehome + "")}</span>
                              : '--'
                            :
                            "0.00"
                        }
                      </div>
                  </div>
              </div>
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">
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
                          chainID === '137' ?
                          <span>POLYGON</span>
                          :
                          chainID === '43114' ?
                          <span>AVAX</span>
                          :
                          <span>HECO</span>
                        }
                        {t('BXH.homeTotalStaking')}
                      </div>
                      <div className="s">
                        {bxhInfo && bxhInfo.tvl_total ?
                        (
                          <CountUp
                            start={this.saveToTwoWei(oldTvl_total)}
                            end={this.saveToTwoWei(bxhInfo.tvl_total)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="$">
                          </CountUp>
                        )
                        : '--'}
                      </div>
                  </div>
              </div>
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">{t('BXH.volume')}(24h)</div>
                      <div className="s">
                        {bxhInfo && bxhInfo.total_ex_volume ?
                        (
                          <CountUp
                            start={this.saveToTwoWei(oldTotal_ex_volume)}
                            end={this.saveToTwoWei(bxhInfo.total_ex_volume)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="$">
                          </CountUp>
                        )
                        : '--'}
                      </div>
                  </div>
              </div>
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">{t('BXH.Cumulativeoutput')}</div>
                      <div className="s">
                        {bxhInfo && bxhInfo.bxh_total_mine && bxhInfo.bxh_price ?
                          (
                            <CountUp
                              start={this.saveToTwoWei(oldTotal_ex_volume)}
                              end={this.saveToTwoWei(bxhInfo.bxh_total_mine * bxhInfo.bxh_price)}
                              duration={2.0}
                              separator=","
                              decimals={2}
                              decimal="."
                              prefix="$">
                            </CountUp>
                          )
                          : '--'}
                      </div>
                  </div>
              </div>
              <div className="col-md-2 col-xs-6">
                  <div className="info">
                      <div className="n">{t('BXH.Outputdays')}
                        {
                          chainID === '128' ?
                          '(USDT)'
                          :
                          '(BXH)'
                        }
                      </div>
                      <div className="s">
                        {
                          chainID === '128' ?
                          <div>
                            {bxhInfo && bxhInfo.sevenMineAmount ?
                            (
                              <CountUp
                                start={this.saveToTwoWei(oldTotal_ex_volume)}
                                end={this.saveToTwoWei(bxhInfo.sevenMineAmount)}
                                duration={2.0}
                                separator=","
                                decimals={2}
                                decimal="."
                                prefix="$">
                              </CountUp>
                            )
                            : '--'}
                          </div>
                          :
                          <div>
                            {bxhInfo && bxhInfo.sevenMineAmount ?
                            (
                              <CountUp
                                start={this.saveToTwoWei(oldTotal_ex_volume)}
                                end={this.saveToTwoWei(bxhInfo.sevenMineAmount)}
                                duration={2.0}
                                separator=","
                                decimals={2}
                                decimal="."
                                prefix="">
                              </CountUp>
                            )
                            : '--'}
                          </div>
                        }
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }

  // ????????????
  renderRecommendPool = () => {
    const { t } = this.props;
    const { bxh_pool } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={getNewStyleClass('item-chainbox4', 'item-box4', 'mt15')}>
        <div className={getNewStyleClass('title11', 'is_wap')}>
          {t('BXH.hotdoortuijian')}
        </div>
        <div className="row row-no-gutters">
            {
              bxh_pool && bxh_pool.length > 0 ?
              (
                bxh_pool.map((item, index) => {
                  return (
                    <div key={index} onClick={() => {this.navigateStakeTwist(item)}} className="col-md-3 col-xs-6">
                      <div className={getNewStyleClass('bg1', 'bgpadding')}>
                          <div className="b1 flex flex_mjustify flex_crosscenter">
                              <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token_0}.png`} />
                              <span>{item.token_0}</span>
                          </div>
                          <ul className="b2 is_wap">
                              <li className="flex flex_mjustify">
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="%">
                                  </CountUp>
                                  <span>APR</span>
                              </li>
                          </ul>
                          <ul className="b2 flex is_pc">
                              <li>
                                  <p>Farm</p>
                                  <span>{item.token_0}</span>
                              </li>
                              <li>
                                  <p>APR</p>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="%">
                                  </CountUp>
                              </li>
                          </ul>
                          <div className="b3">
                              <em>{t('BXH.homeLiquidity')}</em>
                              <var>
                                $
                                <CountUp
                                  start={0}
                                  end={this.saveToTwoWei(item.tvl_pool ? item.tvl_pool : 0)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  suffix="">
                                </CountUp>
                              </var>
                          </div>
                      </div>
                    </div>
                  )
                })
              ) : null
            }
        </div>
      </div>
    )
  }

  // ????????????
  renderHotPool = () => {
    const { t } = this.props;
    const { bxh_ex_pool, bxhInfo } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        {/* pc */}
        <div className={getNewStyleClass('bg1')}>
          <div className={getNewStyleClass('item-chainbox5', 'item-box5', 'mt15', 'is_pc')}>
              <div className="titles flex flex_mjustify flex_crosscenter">
                  <div className="t">{t('BXH.hotpool')}</div>
                  <div className={getNewStyleClass('a-more', 'news-more')} onClick={() => {this.nav('liquidity')}}>
                    {t('BXH.More')}
                  </div>
              </div>
              {
                bxh_ex_pool && bxh_ex_pool.length > 0 ?
                <table>
                  <tbody>
                  <tr>
                      <th>{t('BXH.jiaoyiduititle')}</th>
                      <th className={'c2'}>{t('BXH.daylyoutput')}</th>
                      <th className={'c2'}>TVL</th>
                      <th className={'c2'}>APR</th>
                      {
                        chainID === '128' ?
                        <th className={'c2'}>{t('BXH.StayClaim')}(USDT)</th>
                        :
                        <th className={'c2'}>{t('BXH.StayClaim')}(BXH)</th>
                      }
                      <th width="25%"></th>
                  </tr>
                  {
                    bxh_ex_pool && bxh_ex_pool.length > 0 ?
                    (
                      bxh_ex_pool.map((item, index) => {
                        // ??????
                        if(item.pool_type === 3 || item.pool_type === 4){
                          return (
                            <tr key={index}>
                              <td>
                                <img src={item.symbol0Img_Show} />{item.symbol0}
                              </td>
                              {/* HECO??????????????????USDT??????BXH????????? * BXH??????(V2) */}  
                              {
                                chainID === '128' && item.pool_type === 4 ?
                                <td className={'c2'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.bxh_day&&bxhInfo.bxh_price ? item.bxh_day * bxhInfo.bxh_price : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>&nbsp;USDT
                                </td>
                                :
                                <td className={'c2'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.bxh_day ? item.bxh_day : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>&nbsp;BXH
                                </td>
                              }
                              <td className={'c3'}>
                                $
                                <CountUp
                                  start={0}
                                  end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  suffix="">
                                </CountUp>
                              </td>
                              <td className={getNewStyleClass('c1', 'c2')}>
                                <CountUp
                                  start={0}
                                  end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  suffix="%">
                                </CountUp>
                              </td>
                              {
                                chainID === '128' && item.pool_type === 4 ?
                                <td className={'c3'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.shouyi&&bxhInfo.bxh_price ? item.shouyi * bxhInfo.bxh_price : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </td>
                                :
                                <td className={'c3'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.shouyi ? item.shouyi : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </td>
                              }
                              <td>
                                <button onClick={() => {this.navigateBXHStakePC(item)}}>
                                  {t('BXH.diyatitle')}
                                </button>
                              </td>
                            </tr>
                          )
                        }else{
                          // ??????
                          return (
                            <tr key={index}>
                              <td>
                                <img src={item.symbol0Img_Show} />
                                <img src={item.symbol1Img_Show} style={{ marginLeft: '-10px' }} />
                                {item.symbolPair_Show}
                              </td>
                              {/* HECO??????????????????USDT??????BXH????????? * BXH??????(V2) */}  
                              {
                                chainID === '128' ?
                                <td className={'c2'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.bxh_day&&bxhInfo.bxh_price ? item.bxh_day * bxhInfo.bxh_price : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>&nbsp;USDT
                                </td>
                                :
                                <td className={'c2'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.bxh_day ? item.bxh_day : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>&nbsp;BXH
                                </td>
                              }
                              <td className={'c3'}>
                                $
                                <CountUp
                                  start={0}
                                  end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  suffix="">
                                </CountUp>
                              </td>
                              <td className={getNewStyleClass('c1', 'c2')}>
                                <CountUp
                                  start={0}
                                  end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  suffix="%">
                                </CountUp>
                              </td>
                              {
                                chainID === '128' ?
                                <td className={'c3'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.shouyi&&bxhInfo.bxh_price ? item.shouyi * bxhInfo.bxh_price : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </td>
                                :
                                <td className={'c3'}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.shouyi ? item.shouyi : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </td>
                              }
                              <td>
                                  <button className="btn2" onClick={() => {this.navigateBXHStake(item)}}>{t('BXH.addzijin')}</button>
                                  <button onClick={() => {this.navigateBXHStakePC(item)}}>{t('BXH.diyatitle')}</button>
                              </td>
                            </tr>
                          )
                        }
                      })
                    ) : null
                  }
                  </tbody>
                </table>
                :
                <table>
                  <tbody>
                    <tr>
                        <th>{t('BXH.jiaoyiduititle')}</th>
                        <th className={'c2'}>{t('BXH.daylyoutput')}</th>
                        <th className={'c2'}>TVL</th>
                        <th className={'c2'}>APR</th>
                        <th className={'c2'}>{t('BXH.StayClaim')}(BXH)</th>
                        <th width="25%"></th>
                    </tr>
                    <tr>
                        <td>--</td>
                        <td className={'c2'}>--</td>
                        <td className={'c3'}>--</td>
                        <td className={'c2'}>--</td>
                        <td className={'c2'}>--</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>--</td>
                        <td className={'c2'}>--</td>
                        <td className={'c3'}>--</td>
                        <td className={'c2'}>--</td>
                        <td className={'c2'}>--</td>
                        <td></td>
                    </tr>
                  </tbody>
                </table>
              }
          </div>
        </div>

        {/* ?????? */}
        <div className={getNewStyleClass('bg1')}>
          <div className={getNewStyleClass('item-chainbox5', 'item-box5', 'mt15', 'is_wap')}>
              <div className={getNewStyleClass('title11', 'is_wap', 'c1')}>
                {t('BXH.hotpool')}
              </div>
              <ul className="list2">
                  {
                    bxh_ex_pool && bxh_ex_pool.length > 0 ?
                    (
                      bxh_ex_pool.map((item, index) => {
                        // ??????
                        if(item.pool_type === 3 || item.pool_type === 4){
                          return (
                            <li key={index} onClick={() => {this.navigateBXHStakePC(item)}}>
                              <div className="b1 flex flex_crosscenter flex_mjustify">
                                  <div className="n">
                                    <img src={item.symbol0Img_Show} />{item.symbol0}
                                  </div>
                                  <div className="s">
                                      <span className="f1">
                                        <CountUp
                                          start={0}
                                          end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                          duration={2.0}
                                          separator=","
                                          decimals={2}
                                          decimal="."
                                          suffix="%">
                                        </CountUp>
                                      </span>
                                      <span>APR</span>
                                  </div>
                              </div>
                              <div className="b2">
                                  <i>{t('BXH.loanLiquidity')}</i>
                                  <span className="c-fff">
                                    $
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>
                                  </span>
                              </div>
                            </li>
                          )
                        }else{
                          // ??????
                          return (
                            <li key={index} onClick={() => {this.navigateBXHStake(item)}}>
                              <div className="b1 flex flex_crosscenter flex_mjustify">
                                  <div className="n">
                                    <img src={item.symbol0Img_Show} />
                                    <img src={item.symbol1Img_Show} style={{ marginLeft: '-15px' }} />
                                    {item.symbolPair_Show}
                                  </div>
                                  <div className="s">
                                      <span className="f1">
                                        <CountUp
                                          start={0}
                                          end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                          duration={2.0}
                                          separator=","
                                          decimals={2}
                                          decimal="."
                                          suffix="%">
                                        </CountUp>
                                      </span>
                                      <span>APR</span>
                                  </div>
                              </div>
                              <div className="b2">
                                  <i>{t('BXH.loanLiquidity')}</i>
                                  <span className="c-fff">
                                    $
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>
                                  </span>
                              </div>
                            </li>
                          )
                        }
                      })
                    ) : null
                  }
              </ul>
          </div>
        </div>

      </div>
    )
  }

  // ????????????
  renderPartners = () => {
    const { t } = this.props;
    const { MenuArray } = this.state
    return (
      <div className={getNewStyleClass('item-chainbox6', 'item-box6')}>
          <div className={getNewStyleClass('title11', 'is_wap', 'c1')}>
            {t('BXH.bscPartners')}
          </div>
          <div className={getNewStyleClass('c1', 'title15', 'is_pc')}>
            <div className={getNewStyleClass('title10', 'flex', 'flex_mcenter', 'flex_crosscenter')}>
                <span></span>
                {t('BXH.bscPartners')}
                <span></span>
            </div>
          </div>
          <div className={getNewStyleClass('parlist1', 'list1')}>
              {
                MenuArray&&MenuArray.friend.length > 0 ? MenuArray.friend.map((item, idx) => {
                  return <li key={idx}>
                    <span>
                      {
                        item.href!==''?
                        <a href={item.href} target="_blank">
                          <img src={item.imageUrl} />
                        </a>
                        :
                        <img src={item.imageUrl} />
                      }
                    </span>
                  </li>
                }) : null
              }
          </div>
      </div>
    )
  }

  // ????????????
  renderAudit = () => {
    const { t } = this.props;
    const { MenuArray } = this.state
    return (
      <div className={getNewStyleClass('item-chainbox7', 'item-box7')}>
          <div className={getNewStyleClass('title11', 'is_wap', 'c1')}>
            {t('BXH.bscAudited')}
          </div>
          <div className={getNewStyleClass('c1', 'title15', 'is_pc')}>
            <div className={getNewStyleClass('title10', 'flex', 'flex_mcenter', 'flex_crosscenter')}>
                <span></span>
                {t('BXH.bscAudited')}
                <span></span>
            </div>
          </div>
          <ul className="list1">
              {
                MenuArray&&MenuArray.check.length > 0 ? MenuArray.check.map((item, idx) => {
                  return <li key={idx} onClick={()=>{this.openClick(item.href)}}>
                      <span>
                        <img src={item.imageUrl} />
                      </span>
                    </li>
                }) : null
              }
          </ul>
      </div>
    )
  }

}
  
export default withNamespaces()(withRouter(withStyles(styles)(Home)));