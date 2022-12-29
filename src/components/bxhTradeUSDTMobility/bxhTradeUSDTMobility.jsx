import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  TextField,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import Header from '../unlock/Header.jsx';
import Store from "../../stores";

import ReduceDialog from '../reduceDialog/reduceDialog.jsx'; //移除流动性确认
import MortgageBackDialog from '../mortgageBackDialog/mortgageBackDialog.jsx'; //抵押 取回流动性
import LiquidityDialog from '../liquidityDialog/liquidityDialog.jsx';  //减少流动性
import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import { getStyleClass,numberDecimal, toolNumber, _getValueDivided, _getValueDivided1, _getValuemultip, _getValuemultip1 } from '../../config/constantFunction'
import Footer from '../unlock/Footer.jsx';

import './requestDataLoadingRotate.css';

import {
  GET_TOKENBALANCEANOUNT,
  GET_TOKENBALANCEANOUNT_RETURNED,
  APPROVEDFK,
  APPROVEDFK_RETURNED,
  GETDFK_REWARDS,//领取收益
  GETDFK_REWARDS_RETURNED,
  STAKEDFK,//抵押
  STAKEDFK_RETURNED,
  BXHREMOVELIQUIDITY,//减少流动性
  BXHREMOVELIQUIDITY_RETURNED,
  EXITDFK,
  EXITDFK_RETURNED,
  BXHALLOWANCEREMOVELIQUIDITY, //授权减少流动性
  BXHALLOWANCEREMOVELIQUIDITY_RETURNED,
  BXHPAGEREFRESH_RETURN,
  ERROR,
  BXHUSDTGETPOOLINFOBYID,
  BXHUSDTGETPOOLINFOBYID_RETURNED,
  GET_BXHTRADESTAKEINIT,
  GET_BXHTRADESTAKEINIT_RETURNED,
  BXHCHNAGEACCOUNT

} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      // maxWidth: '800px',
      maxWidth: '100%',
      padding: '26px 24px',
    }
  },
  root1: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      margin: 'auto',
      marginTop: '0px',
    }
  },
  bxhTopM: {
    display: 'block',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  bxhtTit: {
    marginBottom: '20px',
    '& h2': {
      fontSize: '25px',
      margin: '0px',
      color: '#fff',
    },
    '& h3': {
      fontSize: '17px',
      margin: '0px',
      fontWeight: '400',
      color: '#fff',
      [theme.breakpoints.up('sm')]: {
        opacity: 0.6,
        fontSize: '20px',
        marginTop: '5px'
      }
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '70px'
    }
  },
  bxhtConter: {
    background: 'rgba(38, 41, 70, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '20px'
    }
  },
  bxhttabs: {
    position: 'relative',
    display: 'flex',
    marginBottom: '30px',
    '& span': {
      position: 'relative',
      display: 'block',
      fontSize: '15px',
      opacity: '.6',
      marginRight: '30px',
      cursor: 'pointer',
      // '&:hover': {
      //   backgroundImage: 'none',
      //   backgroundColor: 'rgba(28, 163, 109, 1)',
      // },
      // '&:active': {
      //   backgroundImage: 'none',
      //   backgroundColor: 'rgba(19, 119, 80, 1)',
      // },
    },
    '& i': {
      position: 'absolute',
      right: '0px',
    },
    '& img': {
      width: '15px',
    }
  },
  TabOn: {
    color: '#2EBC84',
    opacity: '1 !important',
    '& em': {
      display: 'block',
      position: 'absolute',
      background: '#2EBC84',
      width: '16px',
      height: '3px',
      left: '50%',
      marginLeft: '-8px',
      bottom: '-8px',
    }
  },
  bxhshuruks: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '10px',
    '& span': {
      display: 'block',
      fontSize: '13px',
    },
    '& em': {
      fontStyle: 'inherit',
      opacity: '.4',
      paddingRight: '5px',
    }
  },
  bxhbtestm: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
  },
  bxhicosl: {
    fontSize: '13px',
    fontWeight: 'bold',
    width: '40%',
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    }
  },
  bxhfield: {
    position: 'relative',
  },
  bxhInput: {
    position: 'absolute',
    top: '0px',
    right: '50px',
    height: '30px',
    width: '100px',
    '& input': {
      padding: '0px',
      textAlign: 'right',
    }
  },
  // bxhmax: {
  //   position: 'absolute',
  //   right: '0px',
  //   top: '0px',
  //   background: 'rgba(46, 188, 132, 0.1)',
  //   borderRadius: '6px',
  //   color: '#2EBC84',
  //   width: '50px',
  //   textAlign: 'center',
  //   cursor: 'pointer',
  // },
  bxhjgfen: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '10px',
    marginTop: '10px',
    '& span': {
      opacity: '.7',
    },
    '& em': {
      fontStyle: 'inherit',
      fontFamily: "consola",
    },
    '& img': {
      height: '14px',
      verticalAlign: 'middle',
      margin: '0 8px',
      cursor: 'pointer',
    }
  },
  bxhjiamt: {
    textAlign: 'right',
    paddingRight: '10px',
    margin: '10px 0',
    '& img': {
      width: '13px',
    }
  },
  bxhjghei: {
    height: '20px',
  },
  bxhbottom: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '30px 0 10px',
  },
  bxhCangwei: {
    background: '#1D2124',
    borderRadius: '12px',
    marginTop: '20px',
    padding: '20px',
    marginBottom: '30px',
  },
  bxhcwtit: {
    fontSize: '14px',
    fontWeight: 'bold',
    '& img': {
      height: '14px',
      marginRight: '5px',
      position: 'relative',
      top: '3px'
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    }
  },
  bxhcwshumg: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontWeight: '500',
    marginTop: '10px',
    '& span': {
      fontSize: '13px',
      fontWeight: 'bold'
    },
    '& img': {
      width: '25px',
    },
    '& i': {
      display: 'inline-block',
      fontStyle: 'inherit',
      marginLeft: '50px',
      paddingTop: '5px',
    },
    '& em': {
      fontStyle: 'inherit',
      color: '#FFFFFF',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: "consola",
    }
  },
  bxhmos1: {
    position: 'absolute',
    left: '0px',
  },
  bxhmos2: {
    position: 'absolute',
    left: '20px',
  },
  bxhldxcont: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    height: '38px',
    lineHeight: '38px',
    background: 'rgba(50, 55, 94, 0.5)',
    borderRadius: '6px',
    marginBottom: '10px',
    padding: '0 15px',
    '& span': {
      fontSize: '13px',
      opacity: '.8',
    },
    '& em': {
      fontStyle: 'inherit',
      fontSize: '15px',
      fontWeight: 'bold',
      fontFamily: "consola",
    }
  },
  bxhldxwei: {
    margin: '20px 0',
    paddingBottom: '20px',
    borderBottom: '1px solid #373C45',
  },
  bxhldyatm: {
    opacity: '.4',
    fontSize: '11px',
    margin: '5px 0 10px',
    textAlign: 'left'
  },
  bxhdiyalp: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '0 15px',
    '& span': {
      fontSize: '13px',
      opacity: '.7',
    },
    '& em': {
      fontStyle: 'inherit',
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily: "consola",
    }
  },
  bxhclickbottm: {
    height: '45px',
    lineHeight: '45px',
    border: '1px solid #2DB982',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2DB982',
    marginBottom: '10px',
    letterSpacing: '1px',
  },
  bxhbotomflex: {
    display: 'flex',
  },
  bxhflexman: {
    flex: '2',
    marginRight: '10px',
  },
  bxhfene: {
    opacity: 0.7
  },
  bxhaddmobility: {
    margin: '20px 20px 0px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '45px',
    lineHeight: '45px',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    marginTop: '100px',
    marginBottom: '100px'
  },
  cardRow: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '15px',
    color: 'rgba(255,255,255,0.6)',
  },
  coinLogo: {
    width: '22px',
    height: '22px',
    position: 'absolute',
    border: '1px solid #2C3036',
    borderRadius: '11px',
  },
  cardTipInput: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '0 5px',
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: "consola",
  },
  cardInput: {
    position: 'relative',
    marginTop: '10px',
    height: '45px',
    borderRadius: '6px',
    backgroundColor: '#1C1E22',
    fontFamily: "consola",
    '& input': {
      fontFamily: "consola",
    }
  },
  bxhmax: {
    position: 'absolute',
    right: '15px',
    top: '8px',
    background: 'rgba(46, 188, 132, 0.1)',
    borderRadius: '6px',
    color: '#2EBC84',
    width: '50px',
    height: '30px',
    lineHeight: '30px',
    textAlign: 'center',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  progressContent: {
    margin: '20px 5px',
  },
  progress: {
    position: 'relative',
    height: '6px',
  },
  progressBack: {
    position: 'absolute',
    left: '0',
    right: '0',
    backgroundColor: '#4F5257',
    borderRadius: '5px',
    height: '6px',
  },
  progressFront: {
    position: 'absolute',
    left: '0',
    right: '0',
    backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
    borderRadius: '5px',
    height: '6px',
    width: '0%',
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    marginTop: '12px',
    fontFamily: "consola",
    '& label': {

    }
  },
  selectType_select: {
    flex: '2',
    width: '20%',
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '5px',
    backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
  },
  selectType_unselect: {
    flex: '2',
    width: '20%',
    textAlign: 'center',
    cursor: 'pointer',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '5px',
    background: 'linear-gradient(to right, #373950 , #373950)',
  },

  titleParent: {
    color: '#FFFFFF',
    fontSize: '15px',
    marginBottom: '5px',
    textAlign: 'left',
    '& img': {
      width: '15px',
      marginLeft: '5px',
      position: 'relative',
      top: '3px'
    }
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: 'bold',
    height: '20px',
    fontFamily: "consola",
  },
  rowItemTitle: {
    fontSize: '13px',
    fontWeight: 'normal',
  },
  line: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: 'bold',
    height: '0.5px',
    background: '#FFFFFF',
    opacity: '0.1',
    marginTop: '15px'
  },
  sure: {
    backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
    marginTop: '30px',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  sureDisable: {
    backgroundColor: '#4F5257',
    marginTop: '30px',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  bottomCard: {
    margin: '15px 0',
    height: '180px',
    background: 'rgba(33, 35, 60, 0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '12px',
    padding: '25px 35px 20px 25px',
    width: '100%',
  },
  rowTitle: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 'bold',
    height: '24px',
  },
  rowItemCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  rowBoldText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  stateTrans: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class BxhTradeUSDTMobility extends Component {

  constructor(props) {
    super()
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据

    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const { match } = props;

    this.state = {
      pair: pair,
      rewardBXHFactory: rewardBXHFactory,
      isNoClickShouQuan: true,
      isShowDeposit: false,
      isShowQuHuiLiuDongXing: false,
      isShowRemoveLiquidity: false,
      isShowRemoveLiquidityConfirm: false,
      removeLiquidityAmount: "",
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
      modalMesage: false,
      isMobile: 1,
      inputVal: null,
      progress: '0%',
      balance: '5',
      sureEnable: false,
      isReserve: false,
      tokensData: null,
      fenezhanbi: 0,
      LingQAndDepoAllowanceAmount: 1,
      RemoveLiquidityAllowanceAmount: 1,
      approve0Title: "Approve",
      approve1Title: "Approve",
      match: match
    }

  }

  componentDidMount() {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
      dispatcher.dispatch({ type: GET_TOKENBALANCEANOUNT, content: { asset: pair } })
    } else {
      //通过id获取币对及详情
      dispatcher.dispatch({ type: BXHUSDTGETPOOLINFOBYID, content: { id: this.state.match.params.id } })
    }

  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
  }

  componentWillMount() {
    emitter.on(GET_TOKENBALANCEANOUNT_RETURNED, this.balancesReturned);
    emitter.on(APPROVEDFK_RETURNED, this.showHashByAPPROVEDFK_RETURNED);
    emitter.on(GETDFK_REWARDS_RETURNED, this.showHashByGETDFK_REWARDS_RETURNED); //领取收益
    emitter.on(STAKEDFK_RETURNED, this.showHashBySTAKEDFK_RETURNED);//抵押
    emitter.on(BXHREMOVELIQUIDITY_RETURNED, this.showHashByEXITDFK_RETURNED);//减少流动性
    emitter.on(EXITDFK_RETURNED, this.showHashByEXITDFK_RETURNED); //赎回
    emitter.on(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.showHash);
    emitter.on(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    emitter.on(BXHUSDTGETPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户

    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // 钱包切换时，实时切换页面链
      ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }

  componentWillUnmount() {
    emitter.removeListener(GET_TOKENBALANCEANOUNT_RETURNED, this.balancesReturned);
    emitter.removeListener(APPROVEDFK_RETURNED, this.showHashByAPPROVEDFK_RETURNED);
    emitter.removeListener(GETDFK_REWARDS_RETURNED, this.showHashByGETDFK_REWARDS_RETURNED);
    emitter.removeListener(STAKEDFK_RETURNED, this.showHashBySTAKEDFK_RETURNED);
    emitter.removeListener(BXHREMOVELIQUIDITY_RETURNED, this.showHashByEXITDFK_RETURNED);
    emitter.removeListener(EXITDFK_RETURNED, this.showHashByEXITDFK_RETURNED);
    emitter.removeListener(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.showHash);
    emitter.removeListener(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    emitter.removeListener(BXHUSDTGETPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
    this.setState = (state, callback) => {
      return;
    }
  };

  handleAccountsChanged = () => {
    this.props.history.push('/liquidity')
  }

  changeAccount = () => {
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
      dispatcher.dispatch({ type: GET_TOKENBALANCEANOUNT, content: { asset: pair } })
    } else {
      //通过id获取币对及详情
      dispatcher.dispatch({ type: BXHUSDTGETPOOLINFOBYID, content: { id: this.state.match.params.id } })
    }
  }

  getPoolItemInfo = (data) => {
    // console.log("返回的poolItemInfo------>>>>>>>",data)
    let pool = data[0].tokens[0].poolItemInfo
    this.setState({ pair: pool })
    store.setStore({ rewardBXHTokens: pool })
    store.setStore({ currentdTradePool: pool })
    dispatcher.dispatch({ type: GET_TOKENBALANCEANOUNT, content: { asset: pool } })
    // dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
  }

  pageRefreshEvent = (data) => {
    const { pair } = this.state
    if (data && pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: data })
      dispatcher.dispatch({ type: GET_TOKENBALANCEANOUNT, content: { asset: pair } })
    }
  }

  balancesReturned = (data) => {
    const { classes, t } = this.props
    this.setState({ approve0Title: t('BXH.allowanccetitle') })
    this.setState({ approve1Title: t('BXH.approvejianshaoliudong') })
    this.setState({ rewardBXHFactory: data, tokensData: data[0].tokens[0], LingQAndDepoAllowanceAmount: data[0].tokens[0].alloWance, RemoveLiquidityAllowanceAmount: data[0].tokens[0].removeLiquidAllowance })
  }
  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };
  //授权
  showHashByAPPROVEDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickShouQuan:true})
    // this.showHash(txHash)
  }

  //领取奖励
  showHashByGETDFK_REWARDS_RETURNED = (txHash) => {
    // this.setState({isNoClickLingqu:true})
    // this.setState({isOpertioning:false})
    // this.showHash(txHash)
  }
  //抵押
  showHashBySTAKEDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickZhuanRu:true})
    // const idType = this.state.assetId+ '_' +this.state.assetType
    // this.state[idType] =""
    // this.showHash(txHash)
  }
  //取回流动性
  showHashByEXITDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickZhuanChu:true})
    // this.state.isOpertioning = false
    // this.showHash(txHash)
  }
  showHash = (txHash) => {

  }

  render() {
    const { classes, t, location } = this.props;
    const { pair, tokensData, rewardBXHFactory, modalSend, modalMesage, isMobile, inputVal, balance, progress, sureEnable, isReserve, isShowRemoveLiquidityConfirm, LingQAndDepoAllowanceAmount, RemoveLiquidityAllowanceAmount, approve0Title, approve1Title } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    if (isMobile == 2) {
      return (
        <div className={getStyleClass('PCbroot',classes.root)}>
          <Header pagetype="liquidity" />

          <div className={classes.root1}>
            <div className={classes.bxhtTit}>
              <h2>{t('BXH.tigongliudongxing')}</h2>
              <h3>{t('BXH.tigongtip')} {pair && pair.symbolPair && pair.symbolPair !== "" ? pair.symbolPair : ""} {t('BXH.zhuanquUSDT')}</h3>
            </div>

            <div className={getStyleClass('PCTDaoCard',classes.bxhtConter)}>
              <div className={classes.bxhttabs}>
                <span onClick={() => { this.nav() }}>
                  {t('BXH.addzijin')}
                </span>
                <span className={getStyleClass('PCTabOn',classes.TabOn)}>
                  {t('BXH.mineliudongxing')}<em></em>
                </span>
              </div>

              {/* 我的流动性 */}
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo ?
                  <div>
                    {
                      rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount > 0 && rewardBXHFactory[0].tokens[0].zanbi > 0 ||
                        rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount <= 0 && rewardBXHFactory[0].tokens[0].zanbi > 0 ||
                        rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount > 0 && rewardBXHFactory[0].tokens[0].zanbi <= 0 ?
                        this.renderMobility()
                        :
                        this.renderNoHaveTrade()
                    }
                  </div>
                  :
                  this.renderDataNoReturn()
              }

            </div>

            {modalSend && this.renderSendModal()}
            {modalMesage && this.renderMessageModal()}
          </div>

          <Footer pagetype="liquidity" />

        </div>
      )
    } else {

      return (
        <div style={{ width: '100%' }}>
          <div className={getStyleClass('PCbroot',classes.root)}>
            <Header />

            <div className={classes.root1}>
              <div className={classes.bxhtTit}>
                <h2>{t('BXH.tigongliudongxing')}</h2>
                <h3>{t('BXH.tigongtip')} {pair && pair.symbolPair && pair.symbolPair !== "" ? pair.symbolPair : ""} {t('BXH.zhuanquUSDT')}</h3>
              </div>

              <div className={getStyleClass('PCTDaoCard',classes.bxhtConter)}>
                <div className={classes.bxhttabs}>
                  <span onClick={() => { this.nav() }}>
                    {t('BXH.addzijin')}
                  </span>
                  <span className={getStyleClass('PCTabOn',classes.TabOn)}>
                    {t('BXH.jianshaoliudong')}<em></em>
                  </span>
                </div>

                {
                  rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount > 0 && rewardBXHFactory[0].tokens[0].zanbi > 0 ||
                    rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount <= 0 && rewardBXHFactory[0].tokens[0].zanbi > 0 ||
                    rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount > 0 && rewardBXHFactory[0].tokens[0].zanbi <= 0 ?
                    <div>
                      <div className={classes.cardRow}>
                        <div style={{ width: '36px', height: '22px', position: 'relative' }}>
                          {
                            pair && pair.symbol0ImgURl && pair.symbol0ImgURl !== "" ?
                              <img src={pair ? pair.symbol0ImgURl : ""} className={classes.coinLogo} style={{ left: '0' }} />
                              :
                              <img src={require('../../assets/bxh/BXHtong.png')} className={classes.coinLogo} style={{ left: '0' }} />
                          }
                          {
                            pair && pair.symbol1imgURl && pair.symbol1imgURl !== "" ?
                              <img src={pair ? pair.symbol1imgURl : ""} className={classes.coinLogo} style={{ right: '0' }} />
                              :
                              <img src={require('../../assets/bxh/BXHtong.png')} className={classes.coinLogo} style={{ right: '0' }} />
                          }
                        </div>
                        <label style={{ marginLeft: '5px' }}>{pair && pair.symbolPair && pair.symbolPair !== "" ? pair.symbolPair || "" : ""}-LP</label>
                      </div>

                      <div className={classes.cardTipInput}>
                        <label>输入</label>

                        <label><span style={{ color: 'rgba(255,255,255,0.4)', marginRight: '5px' }}>余额:</span>{tokensData ? numberDecimal(parseFloat(tokensData.mineLpAmount)) || "0.00" : "0.00"}</label>
                      </div>
                      <div className={classes.cardInput}>
                        <TextField
                          fullWidth
                          style={{ right: '0px' }}
                          id={''}
                          type='number'
                          value={inputVal || ''}
                          onChange={this.onChangeTo.bind(this, balance ? (Math.floor(balance * 10000) / 10000) : '0.00')}
                          placeholder="0.00"
                          variant="outlined"
                        />
                        <div className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={this.MAXBalance}>MAX</div>
                      </div>
                      <div className={classes.progressContent}>
                        <div className={classes.progressText}>
                          <label onClick={() => { this.refreshCount('0') }} className={[progress === "0%" ? classes.selectType_select : classes.selectType_unselect, progress === "0%" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" : "hecosureDisable"].join(' ')}>0%</label>
                          <label onClick={() => { this.refreshCount('25') }} className={[progress === "25%" ? classes.selectType_select : classes.selectType_unselect, progress === "25%" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" :  "hecosureDisable"].join(' ')}>25%</label>
                          <label onClick={() => { this.refreshCount('50') }} className={[progress === "50%" ? classes.selectType_select : classes.selectType_unselect, progress === "50%" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" :  "hecosureDisable"].join(' ')}>50%</label>
                          <label onClick={() => { this.refreshCount('75') }} className={[progress === "75%" ? classes.selectType_select : classes.selectType_unselect, progress === "75%" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" :  "hecosureDisable"].join(' ')}>75%</label>
                          <label onClick={() => { this.refreshCount('100') }} className={[progress === "100%" ? classes.selectType_select : classes.selectType_unselect, progress === "100%" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" :  "hecosureDisable"].join(' ')}>100%</label>
                        </div>
                      </div>

                      {
                        sureEnable ?
                          <div>
                            <div className={classes.titleParent}>{t('BXH.expectedAssetsAcquired')}<img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.onSetMessageState() }} /></div>
                            <div className={classes.row}>
                              <label className={classes.rowItemTitle}>{pair && pair.symbol0 && pair.symbol0 !== "" ? pair.symbol0 : ""}</label>
                              <label>{tokensData ? numberDecimal(parseFloat((inputVal / tokensData.poolTotal) * tokensData.reserveA)) : "0"}</label>
                            </div>
                            <div className={classes.row}>
                              <label className={classes.rowItemTitle}>{pair && pair.symbol1 && pair.symbol1 !== "" ? pair.symbol1 : ""}</label>
                              <label>{tokensData ? numberDecimal(parseFloat((inputVal / tokensData.poolTotal) * tokensData.reserveB)) : "0"}</label>
                            </div>

                            <em className={classes.line} />

                            <div className={classes.bxhjgfen}>
                              <span>{t('BXH.price')}</span>
                              {
                                isReserve ?
                                  <em>
                                    <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                                    {tokensData ? numberDecimal(parseFloat(((tokensData.tokenB / tokensData.tokenA)))) : "0"} &nbsp;
                                    {pair && pair.symbol1 && pair.symbol1 !== "" ? pair.symbol1 : ""}&nbsp;per&nbsp;
                                    {pair && pair.symbol0 && pair.symbol0 !== "" ? pair.symbol0 : ""}
                                  </em>
                                  :
                                  <em>
                                    <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                                    {tokensData ? numberDecimal(parseFloat(((tokensData.tokenA / tokensData.tokenB)))) : "0"} &nbsp;
                                    {pair && pair.symbol0 && pair.symbol0 !== "" ? pair.symbol0 : ""}&nbsp;per&nbsp;
                                    {pair && pair.symbol1 && pair.symbol1 !== "" ? pair.symbol1 : ""} 
                                  </em>
                              }
                            </div>
                          </div>
                          :
                          null
                      }
                      <div>
                        {
                          RemoveLiquidityAllowanceAmount > 0 ?
                            <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : chainID === '137' ? "polyPC_new_btn1" : chainID === '43114' ? "avaxPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : chainID === '137' ? "polysureDisable" : chainID === '43114' ? "avaxsureDisable" : "hecosureDisable"].join(' ')} onClick={() => { this.onSureLiquidityPc(inputVal) }}>{t('BXH.confirm')}</div>
                            :
                            <div className={getStyleClass('PC_new_btn1',classes.sure)} style={{ marginRight: '0px' }} onClick={() => { this.onAllowanceRemoveLiquidity() }}>{approve1Title}</div>
                        }
                      </div>

                    </div>
                    :
                    <div style={{ textAlign: 'center', opacity: '0.6' }}>
                      {
                        chainID === '56' ?
                        <img src={require('../../assets/bxh/emptydata1.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                        :
                        chainID === '66' ?
                        <img src={require('../../assets/bxh/emptydata2.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                        :
                        chainID === '1' ?
                        <img src={require('../../assets/bxh/emptydata3.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                        :
                        chainID === '137' ?
                        <img src={require('../../assets/bxh/emptydata4.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                        :
                        chainID === '43114' ?
                        <img src={require('../../assets/bxh/emptydata5.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                        :
                        <img src={require('../../assets/bxh/emptydata.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
                      }
                      <div style={{ fontSize: '13px', marginTop: '10px', marginBottom: '40px', color: 'rgba(255,255,255,0.6)' }}>
                        {t('BXH.zhaobudaoliudongxing')}
                      </div>
                    </div>
                }

              </div>
              {
                isShowRemoveLiquidityConfirm && this.renderModal()//减少流动性2
              }
              {sureEnable && this.renderBottomCard()}
              {modalSend && this.renderSendModal()}
            </div>

          </div>
          {
            isMobile == 1 ?
            <Footer />
            :
            null
          }
        </div>
      )
    }

  };

  MAXBalance = () => {
    const balance = this.state.tokensData&&this.state.tokensData.mineLpAmount;

    this.setState({ inputVal: balance });
    this.refreshSureBtn(balance);
    this.setState({ removeLiquidityAmount: balance })
  }
  changeReverse = () => {
    this.setState({ isReserve: !this.state.isReserve })
  }
  refreshCount = (count) => {
    var progress = count + '%';
    this.setState({ progress: progress });

    let temp_count = _getValueDivided1(count, 100)
    var val = _getValuemultip1(this.state.tokensData?this.state.tokensData.mineLpAmount:0, temp_count)//parseFloat(this.state.tokensData.mineLpAmount) * (count / 100)

    this.setState({ inputVal: val });

    this.refreshSureBtn(val);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    const balance = this.state.rewardBXHFactory[0].tokens[0].mineLpAmount;
    const radio = inputVal / balance * 100;
    var progress = radio + '%';
    this.setState({ sureEnable: inputVal > 0, progress: progress });
  }
  onSetMessageState = () => {
    this.setState({ modalMesage: true })
  }
  renderMessageModal = () => {
    return (
      <MessageDialog message="当您增加流动性时，将获得代表您比例的资产池代币。这些令牌会自动赚取与您池中有占份额成比例的费用。" onClose={this.onCloseMessage} />
    )
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }

  //抵押弹窗
  renderMortgageModal = () => {
    const { rewardBXHFactory, pair } = this.state
    return (
      <MortgageBackDialog type='0' onClose={this.onCloseMortgage} onSure={this.onSureMortgage} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} />
    )
  }
  onCloseMortgage = () => {
    this.setState({ isShowDeposit: false })
  }
  //抵押弹窗
  onSureMortgage = (inputVal) => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    const { classes, t } = this.props
    store._getAllowanceCount(pair.lptokenAddress, pair.pool_address, inputVal, 18, (data) => {
      if (data.isEnough) {
        this.setState({ LingQAndDepoAllowanceAmount: data.allow_decimals })
        this.sendStake(inputVal)
      } else {
        this.setState({ LingQAndDepoAllowanceAmount: 0, approve0Title: t('BXH.allowanceamountup') })
      }

    });

  }

  sendStake = (inputVal) => {
    this.onCloseMortgage();
    const { rewardBXHFactory, pair, msgContent } = this.state

    let msg = "Deposit " + inputVal + " " + pair.symbolPair + "-LP"
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0 })

    dispatcher.dispatch({ type: STAKEDFK, content: { asset: rewardBXHFactory, pair: pair, amount: inputVal, msgContent: msg, oldAmount: rewardBXHFactory[0].tokens[0].oldBalance } })
  }

  onChangeTo = (value, event) => {

    const balance = this.state.rewardBXHFactory[0].tokens[0].mineLpAmount;
    var val = event.target.value;
    if (parseFloat(val) > parseFloat(balance)) {
      val = balance;
    }

    this.setState({ inputVal: val });
    this.refreshSureBtn(val);

    this.setState({ removeLiquidityAmount: val })
  }
  refreshSureBtn = (inputVal) => {
    const balance = this.state.rewardBXHFactory[0].tokens[0].mineLpAmount;
    const radio = inputVal / balance * 100;
    var progress = radio + '%';
    this.setState({ sureEnable: inputVal > 0, progress: progress });
  }
  //取回流动性弹窗
  renderBackModal = () => {
    const { rewardBXHFactory, pair } = this.state
    return (
      <MortgageBackDialog type='1' onClose={this.onCloseBack} onSure={this.onSureBack} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} />
    )
  }

  renderLiquidityModal = () => {
    const { rewardBXHFactory, pair } = this.state
    return (
      <LiquidityDialog onClose={this.onCloseLiquidity} onSure={this.onSureLiquidity} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} isHave={true} />
    )
  }
  renderModal = () => {
    const { rewardBXHFactory, pair, removeLiquidityAmount } = this.state
    let isHave = true
    return (
      <ReduceDialog onClose={this.onClose} onNext={this.onNext} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} amount={removeLiquidityAmount} isHave={true} />
    )
  }
  onClose = () => {
    this.setState({ isShowRemoveLiquidityConfirm: false })
  }
  //移除流动
  onNext = () => {
    this.onClose();
    const { rewardBXHFactory, pair, removeLiquidityAmount, isMobile, msgContent } = this.state
    const { classes, t } = this.props
    store._getAllowanceCount(pair.lptokenAddress, pair.router_address, removeLiquidityAmount, 18, (data) => {
      if (data.isEnough) {
        this.setState({ RemoveLiquidityAllowanceAmount: data.allow_decimals })
        this.sendRemoveLiquidity()
      } else {
        this.setState({ RemoveLiquidityAllowanceAmount: 0, approve1Title: t('BXH.approvejianshaoliudongagain') })
      }
    });

  }

  sendRemoveLiquidity = () => {
    const { rewardBXHFactory, pair, removeLiquidityAmount, isMobile, msgContent } = this.state

    let token1Amount = 0
    let token2Amount = 0
    let tokensData = rewardBXHFactory[0].tokens[0]

    if (tokensData) {
      token1Amount = numberDecimal(parseFloat((removeLiquidityAmount / tokensData.poolTotal) * tokensData.reserveA))
      token2Amount = numberDecimal(parseFloat((removeLiquidityAmount / tokensData.poolTotal) * tokensData.reserveB))
    }
    let msg = "Get " + token1Amount + " " + pair.symbol0 + " and " + token2Amount + " " + pair.symbol1
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    var senddata = {
      amount: removeLiquidityAmount,
      amountAMin: "0",
      amountBMin: "0",
      amountADesired: token1Amount + "",
      amountBDesired: token2Amount + ""
    }
    dispatcher.dispatch({ type: BXHREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: pair, senddata: senddata, msgContent: msg } })
  }
  onOpenLiquidity = () => {
    this.setState({ isShowRemoveLiquidity: true })
  }
  onCloseLiquidity = () => {
    this.setState({ isShowRemoveLiquidity: false })
  }
  onSureLiquidity = (inputVal) => {
    this.onCloseLiquidity();
    this.setState({ isShowRemoveLiquidityConfirm: true, removeLiquidityAmount: inputVal });
  }
  onSureLiquidityPc = (inputVal) => {
    this.setState({ isShowRemoveLiquidityConfirm: true, removeLiquidityAmount: inputVal });
  }
  onCloseBack = () => {
    this.setState({ isShowQuHuiLiuDongXing: false })
  }
  onSureBack = (inputVal) => {
    this.onCloseBack();

    const { rewardBXHFactory, pair, msgContent } = this.state

    let msg = "Unstake " + inputVal + " " + pair.symbolPair + "-LP"
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    dispatcher.dispatch({ type: EXITDFK, content: { asset: rewardBXHFactory, pair: pair, amount: inputVal, msgContent: msg, oldamount: rewardBXHFactory[0].tokens[0].userInfo.oldamount } })
  }

  renderNoHaveTrade = () => {
    const { classes, t } = this.props
    const { pair, rewardBXHFactory } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div style={{ textAlign: 'center', opacity: '0.6' }}>
        {
          chainID === '56' ?
          <img src={require('../../assets/bxh/emptydata1.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
          :
          chainID === '66' ?
          <img src={require('../../assets/bxh/emptydata2.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
          :
          chainID === '1' ?
          <img src={require('../../assets/bxh/emptydata3.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
          :
          chainID === '137' ?
          <img src={require('../../assets/bxh/emptydata4.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
          :
          chainID === '43114' ?
          <img src={require('../../assets/bxh/emptydata5.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
          :
          <img src={require('../../assets/bxh/emptydata.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />
        }

        <div style={{ fontSize: '13px', marginTop: '10px', marginBottom: '40px', color: 'rgba(255,255,255,0.6)' }}>
          {t('BXH.zhaobudaoliudongxing')}，<span style={{ borderBottom: '1px solid #93C4AA', color: '#93C4AA' }} onClick={() => { this.nav() }}>{t('BXH.dianjitianjia')}</span>
        </div>
      </div>
    )
  }


  renderDataNoReturn = () => {
    const { classes, t } = this.props
    const { pair, rewardBXHFactory } = this.state

    return (
      <div>
        <div className={classes.stateTrans}>
          <img src={require('../../assets/bxh/load.png')} alt='' className='stateTransRequestRotate' />
          <div style={{ marginTop: '10px', marginBottom: '30px' }}>loading...</div>
        </div>
      </div>
    )
  }

  //减少流动性确定后的弹窗
  renderBottomCard = () => {
    const { classes, t, i18n } = this.props;
    const { tokensData, pair } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <Card className={getStyleClass('PCTDaoCard',classes.bottomCard)}>
        <div className={classes.rowTitle, classes.rowItemCenter}>
          <img src={require('../../assets/bxh/countdown.png')} alt='' style={{ width: '14px', height: '16px' }} />
          <label style={{ marginLeft: '5px' }}>{t('BXH.minecangweititle')}</label>
        </div>
        <div className={classes.row}>
          <span className={classes.rowItemCenter}>
            <div style={{ width: '36px', height: '22px', position: 'relative' }}>
              <img src={pair ? pair.symbol0ImgURl : ""} alt='' className={classes.coinLogo} style={{ left: '0', zIndex: '1' }} />
              <img src={pair ? pair.symbol1imgURl : ""} alt='' className={classes.coinLogo} style={{ right: '0' }} />
            </div>
            <span style={{ marginLeft: '5px' }}>
              <label className={classes.rowBoldText}>{pair ? pair.symbol0 : ""}</label>
              <label className={classes.rowItemTitle}>/{pair ? pair.symbol1 : ""}</label>
            </span>
          </span>
          <label className={classes.rowBoldText}>{tokensData ? numberDecimal(parseFloat((tokensData.mineLpAmount))) || "0.00" : "0.00"}</label>
        </div>

        <div className={classes.row}>
          <label className={classes.rowItemTitle}>{pair ? pair.symbol0 : ""}</label>
          <label>{tokensData ? numberDecimal(parseFloat(((tokensData.mineLpAmount / tokensData.poolTotal) * tokensData.reserveA))) : "0"}</label>
        </div>
        <div className={classes.row}>
          <label className={classes.rowItemTitle}>{pair ? pair.symbol1 : ""}</label>
          <label>{tokensData ? numberDecimal(parseFloat(((tokensData.mineLpAmount / tokensData.poolTotal) * tokensData.reserveB))) : "0"}</label>
        </div>
      </Card>
    )
  }

  // 我的流动性
  renderMobility = () => {
    const { classes, t } = this.props
    const { pair, rewardBXHFactory, isShowDeposit, isShowQuHuiLiuDongXing, isShowRemoveLiquidity, isShowRemoveLiquidityConfirm, fenezhanbi, LingQAndDepoAllowanceAmount, RemoveLiquidityAllowanceAmount, approve0Title, approve1Title } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    let bxh_price = rewardBXHFactory&&rewardBXHFactory[0].tokens[0].symbolTokens ? rewardBXHFactory[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0

    return (
      <div>
        {
          rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi > 0 ?
            <div className={getStyleClass('PCheaderbg',classes.bxhldxcont)}>
              <span>{t('BXH.weilingqutitle')}</span>   
              <em>
                {
                  rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi ?
                    numberDecimal(rewardBXHFactory[0].tokens[0].shouyi * bxh_price)
                    :
                    0.00
                }
              </em>
            </div>
            :
            null
        }

        {/* <div className={ classes.bxhldxcont }>
          <span>未领取分红</span>
          <em>20</em>
        </div> */}

        {/* 我的仓位 */}
        <div className={classes.bxhldxwei}>
          <div className={classes.bxhcwtit}>
            <img src={require('../../assets/bxh/Fill.png')} />
            {t('BXH.minecangweititle')}
          </div>
          <div className={classes.bxhcwshumg}>
            <em>
              {
                pair && pair.symbol0ImgURl && pair.symbol0ImgURl !== "" ?
                  <img src={pair ? pair.symbol0ImgURl : ""} className={classes.bxhmos1} />
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} className={classes.bxhmos1} />
              }
              {
                pair && pair.symbol1imgURl && pair.symbol1imgURl !== "" ?
                  <img src={pair ? pair.symbol1imgURl : ""} className={classes.bxhmos2} />
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} className={classes.bxhmos2} />
              }

              <i>
                {
                  pair && pair.symbolPair && pair.symbolPair !== "" ?
                    pair.symbolPair
                    :
                    "-"
                }
              </i>
            </em>
            <em>
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].mineLpAmount ?
                  this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].mineLpAmount, 6)
                  :
                  0.00
              }
            </em>
          </div>
          <div className={classes.bxhcwshumg}>
            <span className={classes.bxhfene}>{t('BXH.fenezhanbi')}</span>
            <em>
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].zanbi && numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].zanbi * 100))) > 0.01 ?
                  numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].zanbi * 100))) + "%"
                  :
                  "<0.01%"
              }
            </em>
          </div>
        </div>

        {/* 抵押 */}
        <div>
          <div className={classes.bxhcwtit}>
            <img src={require('../../assets/bxh/Shape.png')} />
            {t('BXH.diyatitle')}
          </div>
          <div className={classes.bxhldyatm}>{t('BXH.diyatip')}</div>
          <div className={classes.bxhdiyalp}>
            <span>{t('BXH.yidiyalp')}</span>
            <em>
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount && rewardBXHFactory ?
                  this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].userInfo.amount, 6)
                  :
                  0.00
              }
            </em>
          </div>
        </div>

        {/* 领取收益 */}
        <div>
          {
            LingQAndDepoAllowanceAmount == 0 ?
              <div className={getStyleClass('PC_new_btn1',classes.bxhbottom)} onClick={() => { this.onApprove() }}>{approve0Title}</div>
              :
              <div className={getStyleClass('PC_new_btn1',classes.bxhbottom)} onClick={() => { this.onWithDrawShouYi() }}>{t('BXH.lingqushouyititle')}</div>
          }
        </div>

        {/* 抵押 LP */}
        <div>
          {
            LingQAndDepoAllowanceAmount == 0 ?
              <div className={getStyleClass('PC_new_btn2',classes.bxhclickbottm)} onClick={() => { this.onApprove() }}>{approve0Title}</div>
              :
              <div className={getStyleClass('PC_new_btn2',classes.bxhclickbottm)} onClick={() => { this.onDeposit() }}>{t('BXH.diyatitle')}</div>
          }
        </div>

        {/* 减少流动性 LP */}
        <div className={getStyleClass('PC_new_btn2',classes.bxhclickbottm)} onClick={() => { this.onWithDraw() }}>{t('BXH.quhuiliudongxing')}</div>
        {/* 领取分红、流动资金 */}
        <div className={classes.bxhbotomflex}>
          {
            RemoveLiquidityAllowanceAmount > 0 ?
              <div className={getStyleClass('PC_new_btn2',classes.bxhclickbottm, classes.bxhflexman)} style={{ marginRight: '0px', width: '100%' }} onClick={() => { this.onRemoveLiquidity() }}>{t('BXH.jianshaoliudong')}</div>
              :
              <div className={getStyleClass('PC_new_btn2',classes.bxhclickbottm, classes.bxhflexman)} style={{ marginRight: '0px', width: '100%' }} onClick={() => { this.onAllowanceRemoveLiquidity() }}>{approve1Title}</div>//approve0Title
          }

        </div>

        <div>
          {
            isShowDeposit && this.renderMortgageModal()  //抵押弹窗
          }
          {
            isShowQuHuiLiuDongXing && this.renderBackModal() //取回流动性弹窗
          }
          {
            isShowRemoveLiquidity && this.renderLiquidityModal()//减少流动性1
          }
          {
            isShowRemoveLiquidityConfirm && this.renderModal()//减少流动性2
          }
        </div>
      </div>
    )
  }

  renderPC = () => {

  }

  caluZanBi = () => {
    const { rewardBXHFactory } = this.state
    if (rewardBXHFactory) {
      let count = rewardBXHFactory[0].token[0].mineLpAmount + rewardBXHFactory[0].token[0].userInfo.amount
      let data = this.toolNumber(count / rewardBXHFactory[0].tokens[0].poolTotal)
      this.setState({ fenezhanbi: data })
    } else {
      this.setState({ fenezhanbi: '<0.01%' })
    }

  }

  nav = () => {
    this.props.history.push('/bxhTradeUSDTStake/' + this.state.pair.id)
  }

  //领取收益授权
  onApprove = () => {
    if (this.state.isNoClickShouQuan) {
      this.setState({ amountError: false })
      const { rewardBXHFactory, pair, msgContent } = this.state

      this.setState({ loading: true })
      this.setState({ isNoClickShouQuan: false })

      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve" })

      dispatcher.dispatch({ type: APPROVEDFK, content: { asset: rewardBXHFactory, pair: pair, msgContent: "Approve" } })
    }
  }
  // 领取收益
  onWithDrawShouYi = () => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    const { classes, t } = this.props
    store._getAllowanceCount(pair.lptokenAddress, pair.pool_address, rewardBXHFactory[0].tokens[0].shouyi, 18, (data) => {
      if (data.isEnough) {
        this.setState({ LingQAndDepoAllowanceAmount: data.allow_decimals })
        this.sendWithdrawSY()
      } else {
        this.setState({ LingQAndDepoAllowanceAmount: 0, approve0Title: t('BXH.allowanceamountup') })
      }

    });
  }

  sendWithdrawSY = () => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    this.setState({ modalSend: false })
    let bxh_price = rewardBXHFactory&&rewardBXHFactory[0].tokens[0].symbolTokens ? rewardBXHFactory[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0

    let msg = ""
    if (rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi) {
      msg = "Claim " + numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].shouyi * bxh_price)) + " USDT"
    } else {
      msg = "Claim 0 USDT"
    }
    this.setState({
      modalSend: true, loading: false, modalSendType: 0, msgContent: msg
    })

    dispatcher.dispatch({ type: STAKEDFK, content: { asset: rewardBXHFactory, pair: pair, amount: "0", msgContent: msg } })
  }
  //抵押 LP
  onDeposit = () => {
    this.setState({ isShowDeposit: true })
  }
  //赎回 LP
  onWithDraw = () => {
    //renderBackModal
    this.setState({ isShowQuHuiLiuDongXing: true })
  }
  //减少流动性
  onRemoveLiquidity = () => {
    this.onOpenLiquidity()
  }

  onAllowanceRemoveLiquidity = () => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve" })
    const { rewardBXHFactory, pair, msgContent } = this.state
    dispatcher.dispatch({ type: BXHALLOWANCEREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: pair, msgContent: "Approve" } })
  }

  renderSendModal = () => {
    const { rewardSymbolPrice, modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} rewardSymbolPrice={rewardSymbolPrice} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }

  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  _getToolNumber = (num_str) => {
    num_str = num_str.toString();
    if (num_str.indexOf("+") != -1) {
      num_str = num_str.replace("+", "");
    }
    if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
      var resValue = "",
        power = "",
        result = null,
        dotIndex = 0,
        resArr = [],
        sym = "";
      var numStr = num_str.toString();
      if (numStr[0] == "-") {
        // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
        numStr = numStr.substr(1);
        sym = "-";
      }
      if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
        var regExp = new RegExp(
          "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
          "ig"
        );
        result = regExp.exec(numStr);
        if (result != null) {
          resValue = result[2];
          power = result[5];
          result = null;
        }
        if (!resValue && !power) {
          return false;
        }
        dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
        resValue = resValue.replace(".", "");
        resArr = resValue.split("");
        if (Number(power) >= 0) {
          var subres = resValue.substr(dotIndex);
          power = Number(power);
          //幂数大于小数点后面的数字位数时，后面加0
          for (var i = 0; i < power - subres.length; i++) {
            resArr.push("0");
          }
          if (power - subres.length < 0) {
            resArr.splice(dotIndex + power, 0, ".");
          }
        } else {
          power = power.replace("-", "");
          power = Number(power);
          //幂数大于等于 小数点的index位置, 前面加0
          for (var i = 0; i < power - dotIndex; i++) {
            resArr.unshift("0");
          }
          var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
          resArr.splice(n, 0, ".");
        }
      }
      resValue = resArr.join("");

      return sym + resValue;
    } else {
      return num_str;
    }
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(BxhTradeUSDTMobility)));
