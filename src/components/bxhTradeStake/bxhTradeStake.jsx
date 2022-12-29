import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  ClickAwayListener
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

import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import { getStyleClass,numberDecimal, _getValueDivided, _getValuemultip, _getValueMinus, _getValuemultip1, _getValueDivided1 } from '../../config/constantFunction'
import DefaultImage from '../defaultImage/defaultImage';
import BottomReceivedDialog from '../dialog/receivedialog.jsx'
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import BscCustomTooltip from '../customTooltip/bscCustomTooltip.jsx';
import OKEXCustomTooltip from '../customTooltip/okexCustomTooltip.jsx';
import Footer from '../unlock/Footer.jsx';
import cookie from 'react-cookies'
import {
  ERROR,
  GET_BXHTRADESTAKEINIT,
  GET_BXHTRADESTAKEINIT_RETURNED,
  GET_BXHTRADESTAKEApprove,
  GET_BXHTRADESTAKEApprove_RETURNED,
  GET_BXHTRADESTAKEApprove1,
  GET_BXHTRADESTAKEApprove1_RETURNED,
  BXHADDLIQUIDITY,
  BXHADDLIQUIDITY_RETURNED,
  BXHREMOVELIQUIDITY,//减少流动性
  BXHREMOVELIQUIDITY_RETURNED,
  BXHCALCULATION,
  BXHCALCULATION_RETURNED,
  BXHCALCULATION2,
  BXHCALCULATION2_RETURNED,
  BXHPAGEREFRESH_RETURN,
  BXHGETPOOLINFOBYID,
  BXHGETPOOLINFOBYID_RETURNED,
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
  bxhtTit: {
    marginBottom: '20px',
    marginTop: '60px',
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
        marginTop: '5px',
        color: '#fff',
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
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '20px'
    }
  },
  imgparent: {
    position: 'absolute',
    top: '22px',
    right: '25px',
    '& img': {
      width: '15px',
      cursor: 'pointer',
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
      fontWeight: 'bold',
      fontFamily: "consola",
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
    border: '1px solid #1C1E22'
  },
  bxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #2ebc84'
  },
  bscbxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #FDD436'
  },
  okexbxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #3E7EFF'
  },
  ethbxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #7E8CCB'
  },
  polybxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #8841FF'
  },
  avaxbxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #E84142'
  },
  bxhicosl: {
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '27px',
    cursor: 'pointer',
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& svg': {
      marginTop: '10px',
      marginLeft: '5px',
    }
  },
  bxhicosl_pc: {
    fontSize: '14px',
    fontWeight: 'bold',
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& em': {
      fontStyle: 'normal',
      position: 'relative',
      top: '2px'
    }
  },
  bxhfield: {
    position: 'relative',
    width: '40%',
    paddingTop: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    }
  },
  bxhInput: {
    width: '90%',
    '& input': {
      fontFamily: "consola",
      padding: '0px',
    }
  },
  bxhmax: {
    display: 'inline-block',
    marginRight: '10px',
    background: '#1E2D2B',
    borderRadius: '6px',
    color: '#2EBC84',
    width: '50px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  bxhjgfen: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '10px',
    position: 'relative',
    textAlign: 'left',
    '& div': {
      width: '100%'
    },
    '& span': {
      opacity: '.7',
    },
    '& em': {
      fontStyle: 'inherit',
      position: 'absolute',
      right: '0px',
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
  bxhbottomUnAbleClickflex: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #4F5257, #4F5257)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  bxhbottomUnAbleClick: {
    height: '45px',
    lineHeight: '45px',
    background: 'linear-gradient(to right, #4F5257, #4F5257)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '10px 0 10px',
    cursor: 'pointer',
  },
  bxhbottom: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #2EBC84)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '20px 0 10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 1)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  bxhbottomUnAbleClickflex2: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 1)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  bxhbottomApproval0: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginRight: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  bxhbottomApproval1: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  bxhCangwei: {
    background: 'rgba(38, 41, 70, 0.3)',
    borderRadius: '12px',
    marginTop: '20px',
    padding: '20px',
    marginBottom: '30px',
  },
  bxhcwtit: {
    fontSize: '14px',
    '& img': {
      height: '14px',
      marginRight: '5px',
      position: 'relative',
      top: '3px'
    }
  },
  bxhcwshumg: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontWeight: '400',
    marginTop: '10px',
    '& span': {
      fontSize: '13px',
      opacity: '.7',
      fontFamily: "consola",
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
      color: '#FFF',
      fontSize: '13px',
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
  approvalparent: {
    display: 'flex'
  },
  bxhTopM: {
    display: 'block',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  toolmsgdialog: {
    background: 'red'
  },
  tooltip: {
    backgroundColor: '#000000'
  },

});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class BxhTradeStake extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const pool = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    const rewardBXHPools = store.getStore('rewardBXHPools')
    const rewardBXHTokens = store.getStore('rewardBXHTokens')
    const rewardBXHFactory = store.getStore('rewardBXHFactory')

    //获取携带的id参数
    const { match } = props;
    // console.log("pool---->>>>>>>>",pool)

    store.setStore({ rewardBXHTokens: pool })
    this.state = {
      rewardBXHPools: rewardBXHPools,
      pool: pool,
      rewardBXHTokens: rewardBXHTokens,
      rewardBXHFactory: rewardBXHFactory,
      isNoClickShouQuan: true,
      tokenCalculaResult: null,
      isReserve: false,
      isCanShow: false,
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
      isBtnStateNnormal: true,
      btnTextContent: "",
      modalMesage: false,
      modalReceiveDialog: false,
      isMobile: 1,
      open: false,
      value: 0,
      amount0Focus: 0,
      amount1Focus: 0,
      formOnFocus: 0,
      toOnFocus: 0,
      isAllowance0Enough: true,
      isAllowance1Enough: true,
      token0AllowanceAmount: 1,
      token1AllowanceAmount: 1,
      approve0Title: "Approve",
      approve1Title: "Approve",
      match: match,
      footerMShow: true,
      wHeight: '',
      lastInputPositionIsUp: true,
    }

  }


  // 组件加载完毕 启动定时器
  componentDidMount() {
    setTimeout(this.iTimer, 0);

    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    const pool = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pool && pool.symbol0Address && pool.symbol1Address && pool.symbol0Address !== "" && pool.symbol1Address !== "") {
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
      dispatcher.dispatch({ type: BXHCALCULATION2, content: { asset: pool, amount: "1" } })
    } else {
      //通过id获取币对及详情
      dispatcher.dispatch({ type: BXHGETPOOLINFOBYID, content: { id: this.state.match.params.id } })
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

    const { wHeight } = this.state;
    var hh = window.innerHeight; //当前可视窗口高度 
    if (wHeight > hh) {
      this.setState({
        footerMShow: false,
      })
    } else {
      this.setState({
        footerMShow: true,
      })
    }
  }

  timer = null;
  // 定时器
  iTimer = () => {
    this.timer = setInterval(() => {
      const { pool } = this.state
      if (pool) {
        dispatcher.dispatch({ type: BXHCALCULATION2, content: { asset: pool, amount: "1" } })
        dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
      }
    }, 5000);
  }

  componentWillMount() {
    emitter.on(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);
    emitter.on(GET_BXHTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
    emitter.on(BXHCALCULATION2_RETURNED, this.calculatCount);
    emitter.on(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    emitter.on(BXHGETPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户

    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // 钱包切换时，实时切换页面链
      ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }

  componentWillUnmount() {
    emitter.removeListener(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);
    emitter.removeListener(GET_BXHTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
    emitter.removeListener(BXHCALCULATION2_RETURNED, this.calculatCount);
    emitter.removeListener(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(BXHGETPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    clearInterval(this.timer);
    this.setState = (state, callback) => {
      return;
    }
  };

  handleAccountsChanged = () => {
    this.props.history.push('/liquidity')
  }

  changeAccount = () => {
    const pool = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pool && pool.symbol0Address && pool.symbol1Address && pool.symbol0Address !== "" && pool.symbol1Address !== "") {
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
      dispatcher.dispatch({ type: BXHCALCULATION2, content: { asset: pool, amount: "1" } })
    } else {
      //通过id获取币对及详情
      dispatcher.dispatch({ type: BXHGETPOOLINFOBYID, content: { id: this.state.match.params.id } })
    }
  }

  getPoolItemInfo = (data) => {
    // console.log("返回的poolItemInfo------>>>>>>>",data)
    let pool = data[0].tokens[0].poolItemInfo
    this.setState({ pool: pool })
    store.setStore({ rewardBXHTokens: pool })
    dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
    dispatcher.dispatch({ type: BXHCALCULATION2, content: { asset: pool, amount: "1" } })
  }
  pageRefreshEvent = (data) => {
    const { pool } = this.state
    const account = store.getStore('account')
    if (data && pool) {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: data })
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })
      dispatcher.dispatch({ type: BXHCALCULATION2, content: { asset: pool, amount: "1" } })
    }
  }
  // 新加的
  balancesReturned = (data) => {
    const { classes, t } = this.props
    this.setState({ approve0Title: t('BXH.allowanccetitle') })
    this.setState({ approve1Title: t('BXH.allowanccetitle') })
    this.setState({ rewardBXHFactory: data, token0AllowanceAmount: data[0].tokens[0].alloWance0, token1AllowanceAmount: data[0].tokens[0].alloWance1 })
  }
  //授权
  showHashByAPPROVEBXH_RETURNED = (txHash) => {
    this.setState({ isNoClickShouQuan: true })
    this.showHash(txHash)
  }

  calculatCount = (data) => {
    // console.log("计算的比例---->>>>>>",data)
    this.setState({ tokenCalculaResult: data })
    const { lastInputPositionIsUp, currentAmountSymbol0, currentAmountSymbol1, pool, rewardBXHFactory } = this.state
    var token1Amount, token0Amount = ""
    if (!currentAmountSymbol0 || currentAmountSymbol0 === "") {
      this.setState({ currentAmountSymbol0: "" })
      this.setState({ currentAmountSymbol1: "" })
    } else {
      if (lastInputPositionIsUp) {
        token1Amount = _getValuemultip1(currentAmountSymbol0, data[0].tokens[0].bili_decimal)
        token0Amount = currentAmountSymbol0
        this.setState({ currentAmountSymbol1: token1Amount })
      } else {
        token0Amount = _getValueDivided1(currentAmountSymbol1, data[0].tokens[0].bili_decimal)
        token1Amount = currentAmountSymbol1
        this.setState({ currentAmountSymbol0: token0Amount })
      }
    }

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"

    if (parseFloat(token0Amount) <= parseFloat(balance0) && parseFloat(token1Amount) <= parseFloat(balance1)) {
      this.setState({ isBtnStateNnormal: true })
    } else if (token0Amount == "" || token1Amount === "") {
      this.setState({ isBtnStateNnormal: false })
    } else {
      this.setState({ isBtnStateNnormal: false })
    }
  }

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

  render() {
    const { classes, t, location } = this.props;
    const { pool, rewardBXHTokens, isNoClickShouQuan, isCanShow, modalSend, modalMesage, modalReceiveDialog, isMobile, value, token0AllowanceAmount, token1AllowanceAmount, approveTitle, footerMShow } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    // if (!pool) {
    //   return null;
    // }

    return (
      <div style={{ width: '100%' }}>
        <div className={getStyleClass('PCbroot',classes.root)}>
          <Header pagetype="liquidity" />

          <div className={classes.root1}>
            <div className={classes.bxhtTit}>
              <h2>{t('BXH.tigongliudongxing')}</h2>
              <h3>{t('BXH.tigongtip')} {pool && pool.symbolPair && pool.symbolPair !== "" ? pool.symbolPair : ""} {t('BXH.zhuanqubxh')}</h3>
            </div>

            <div className={getStyleClass('PCTDaoCard',classes.bxhtConter)}>
              <div className={classes.bxhttabs}>
                <span className={getStyleClass('PCTabOn',classes.TabOn)}>
                  {t('BXH.addzijin')}<em></em>
                </span>
                <span onClick={() => { this.nav(pool) }}>
                  {isMobile == 2 ? t('BXH.mineliudongxing') : t('BXH.jianshaoliudong')}
                </span>
              </div>

              <ClickAwayListener onClickAway={this.handleTooltipClose}>
                {
                chainID === '56' ?
                <BscCustomTooltip 
                  title={t('BXH.msgtip1')}
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  arrow
                  placement="bottom-end">
                  <i className={classes.imgparent}>
                    <img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.handleTooltipOpen() }} />
                  </i>
                </BscCustomTooltip>
                :
                chainID === '66' ?
                <OKEXCustomTooltip 
                  title={t('BXH.msgtip1')}
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  arrow
                  placement="bottom-end">
                  <i className={classes.imgparent}>
                    <img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.handleTooltipOpen() }} />
                  </i>
                </OKEXCustomTooltip>
                :
                <CustomTooltip 
                  title={t('BXH.msgtip1')}
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={this.handleTooltipClose}
                  open={this.state.open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  arrow
                  placement="bottom-end">
                  <i className={classes.imgparent}>
                    <img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.handleTooltipOpen() }} />
                  </i>
                </CustomTooltip>
                }
              </ClickAwayListener>

              {/* 流动资金 */}
              {
                this.renderWorking()
              }
            </div>

            {/* 我的仓位 */}
            {
              isCanShow ?
                this.renderPosition()
                :
                null
            }

            {modalSend && this.renderSendModal()}
            {modalMesage && this.renderMessageModal()}
            {modalReceiveDialog && this.renderReceiveModal()}
          </div>

        </div>
        
        <Footer pagetype="liquidity" />
      </div>
    )

  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  handleTooltipClose = () => {
    this.setState({ open: false });
  };
  renderReceiveModal = () => {
    const { tokenCalculaResult, pool, rewardBXHFactory, currentAmountSymbol0, currentAmountSymbol1 } = this.state
    return (
      <BottomReceivedDialog onClose={this.closeSeceive} onSure={this.sureSeceive} caluData={tokenCalculaResult} tokensData={rewardBXHFactory} pairData={pool} amount0={currentAmountSymbol0} amount1={currentAmountSymbol1} isHave={true} />
    )
  }
  closeSeceive = () => {
    this.setState({ modalReceiveDialog: false })
  }
  sureSeceive = () => {
    this.closeSeceive()
    const {
      rewardBXHFactory,
      pool,
      msgContent
    } = this.state

    const amount0 = this.state["currentAmountSymbol0"]
    const amount1 = this.state["currentAmountSymbol1"]

    let msg = "Supplying " + amount0 + " " + pool.symbol0 + " for " + amount1 + " " + pool.symbol1
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    if (!amount0 || !amount1 || amount1 <= 0 || amount0 <= 0) {
      return;
    }
    var senddata = {
      amountADesired: amount0 + "",
      amountBDesired: amount1 + "",
      amountAMin: 0,
      amountBMin: 0,
      msgContent: msg,
      isOut: true,
    }
    dispatcher.dispatch({ type: BXHADDLIQUIDITY, content: { asset: rewardBXHFactory, pair: pool, senddata: senddata } })
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

  // 流动资金
  renderWorking = () => {
    const { classes, t } = this.props

    const { pool, rewardBXHTokens, rewardBXHFactory, tokenCalculaResult, isReserve, currentAmountSymbol0, isCanShow, isBtnStateNnormal, btnTextContent, isMobile, amount0Focus, amount1Focus, formOnFocus, toOnFocus, token0AllowanceAmount, token1AllowanceAmount, approve0Title, approve1Title } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    const amount0 = this.state["currentAmountSymbol0"]
    const amount1 = this.state["currentAmountSymbol1"]
    return (
      <div>
        {/* 第一个输入 */}
        <div className={classes.bxhcfetm}>
          <div className={classes.bxhshuruks}>
            <span>{t('BXH.inputtitle')}</span>
            <span>
              <em>{t('BXH.yuetitle')}</em>
              {rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance > 0.0001 ? this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].symbol0balance, 4) : "0.0000"}
            </span>
          </div>

          {
            chainID === '56' ?
            <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.bscbxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'bscPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                  <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                  {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '66' ?
             <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.okexbxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'okexPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                  <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                  {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '1' ?
             <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.ethbxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'ethPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                  <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                  {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '137' ?
             <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.polybxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'polyPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                  <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                  {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '43114' ?
             <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.avaxbxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'avaxPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                  <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                  {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
             :
             <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus}>
               {this.renderAssetInput1()}
               <div className={classes.bxhicosl} >
                 <span className={[classes.bxhmax, 'hecoPCDialogmax'].join(' ')} onClick={() => { this.MaxValue0() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol0ImgURl && pool.symbol0ImgURl !== "" ? pool.symbol0ImgURl : ""} />
                   {pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}
                 </span>
               </div>
             </div>
          }
        </div>

        <div className={classes.bxhjiamt}>
          <img src={require('../../assets/bxh/Combined.png')} />
        </div>

        {/* 第二个输入 */}
        <div className={classes.bxhcfetm}>
          <div className={classes.bxhshuruks}>
            <span>{t('BXH.inputtitle')}</span>
            <span>
              <em>{t('BXH.yuetitle')}</em>
              {rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance > 0.0001 ? this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].symbol1balance, 4) : "0.0000"}
            </span>
          </div>
          {
            chainID === '56' ?
            <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.bscbxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'bscPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '66' ?
             <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.okexbxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'okexPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '1' ?
             <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.ethbxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'ethPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '137' ?
             <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.polybxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'polyPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
             </div>
             :
             chainID === '43114' ?
             <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.avaxbxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'avaxPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
             </div>
             :
             <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus}>
               {this.renderAssetInput2()}
               <div className={classes.bxhicosl}>
                 <span className={[classes.bxhmax, 'hecoPCDialogmax'].join(' ')} onClick={() => { this.MaxValue1() }}>MAX</span>
                 <span>
                   <img src={pool && pool.symbol1imgURl && pool.symbol1imgURl !== "" ? pool.symbol1imgURl : ""} />
                   {pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}
                 </span>
               </div>
          </div>
          }
        </div>

        <div className={classes.bxhjghei}></div>
        {/* 价格 */}
        <div>
          {
            isCanShow ?
              <div className={classes.bxhjgfen}>
                <span>{t('BXH.jiagetitle')}</span>
                {
                  isReserve ?
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? _getValueDivided(tokenCalculaResult[0].tokens[0].tokenB, tokenCalculaResult[0].tokens[0].tokenA, 6) : "0"} &nbsp;
                      {pool && pool.symbol1 && pool.symbol0 && pool.symbol1 !== "" && pool.symbol0 !== "" ? pool.symbol1 + " per " + pool.symbol0 : ""}
                    </em>
                    :
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? _getValueDivided(tokenCalculaResult[0].tokens[0].tokenA, tokenCalculaResult[0].tokens[0].tokenB, 6) : "0"} &nbsp;
                      {pool && pool.symbol1 && pool.symbol0 && pool.symbol1 !== "" && pool.symbol0 !== "" ? pool.symbol0 + " per " + pool.symbol1 : ""}
                    </em>
                }
              </div>
              :
              null
          }
        </div>

        {/* 预计份额 */}
        <div className={classes.bxhjgfen}>
          {
            isCanShow ?
              <div>
                <span>
                  {t('BXH.yujititle')}
                  <img src={require('../../assets/bxh/wenti.png')} />
                </span>
                <em>
                  {
                    tokenCalculaResult && currentAmountSymbol0 && _getValueDivided(currentAmountSymbol0, tokenCalculaResult[0].tokens[0].reserveA, 6) * 100 > 0.01 ?
                      (_getValueDivided(currentAmountSymbol0, tokenCalculaResult[0].tokens[0].reserveA, 6) * 100) + "%"
                      :
                      "<0.01%"
                  }
                </em>
              </div>
              :
              null
          }

        </div>

        {/* 确认按钮 */}
        <div>
          {
            isBtnStateNnormal ?
              <div>
                {
                  //两个币都没授权
                  token0AllowanceAmount == 0 && token1AllowanceAmount == 0 ?
                    <div>
                      <div className={classes.approvalparent}>
                        {
                          token0AllowanceAmount == 0 && pool && pool.symbol0 !== "" && pool.symbol0 != 'HT' ?
                            <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                            :
                            null
                        }
                        {
                          token1AllowanceAmount == 0 && pool && pool.symbol1 && pool.symbol1 !== "" && pool.symbol1 != 'HT' ?
                            <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval1)} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                            :
                            null
                        }
                      </div>

                      {
                        token0AllowanceAmount !== 0 && token1AllowanceAmount !== 0 ?
                          <div style={{ width: '100%' }}>
                            {
                              pool && pool.symbol1 && pool.symbol0 && tokenCalculaResult && tokenCalculaResult[0].tokens[0].bili_decimal ?
                                <div style={{ width: '100%' }}>
                                  {
                                    amount0 == 0 || amount1 == 0 || !isCanShow ?
                                      <div className={classes.bxhbottomUnAbleClick}>{t('BXH.weishurutitle')}-1</div>
                                      :
                                      <div className={classes.bxhbottom} onClick={() => { this.onAddLiquidity() }}>{t('BXH.confirmtitle')}</div>
                                  }
                                </div>
                                :
                                <div className={classes.bxhbottomUnAbleClick}>
                                  {
                                    chainID === '56' ? 
                                    <img src={require('../../assets/bxh/load1.png')} className='stateIcoImage' />
                                    :
                                    chainID === '66' ? 
                                    <img src={require('../../assets/bxh/load2.png')} className='stateIcoImage' />
                                    :
                                    chainID === '1' ? 
                                    <img src={require('../../assets/bxh/load3.png')} className='stateIcoImage' />
                                    :
                                    <img src={require('../../assets/bxh/load.png')} className='stateIcoImage' />
                                  }
                                </div>
                            }
                          </div>
                          :
                          null
                      }
                    </div>
                    :
                    <div className={classes.approvalparent}>
                      {
                        token0AllowanceAmount == 0 && pool && pool.symbol0 && pool.symbol0 !== "" && pool.symbol0 != 'HT' ?
                          <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                          :
                          null
                      }
                      {
                        token1AllowanceAmount == 0 && pool && pool.symbol1 && pool.symbol1 !== "" && pool.symbol1 != 'HT' ?
                          <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                          :
                          null
                      }

                      {
                        token0AllowanceAmount !== 0 && token1AllowanceAmount !== 0 ?
                          <div style={{ width: '100%' }}>
                            {
                              pool && pool.symbol1 && pool.symbol0 && tokenCalculaResult && tokenCalculaResult[0].tokens[0].bili_decimal ?
                                <div style={{ width: '100%' }}>
                                  {
                                    amount0 == 0 || amount1 == 0 || !isCanShow ?
                                      <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>{t('BXH.weishurutitle')}</div>
                                      :
                                      <div className={getStyleClass('PC_new_btn1',classes.bxhbottomUnAbleClickflex2)} onClick={() => { this.onAddLiquidity() }}>{t('BXH.confirmtitle')}</div>
                                  }
                                </div>
                                :
                                <div>
                                  {
                                    chainID === '56' ? 
                                    <div className={[classes.bxhbottomUnAbleClick, "bscsureDisable"].join(' ')} >
                                        <img src={require('../../assets/bxh/load1.png')} className='stateIcoImage' />
                                    </div>
                                    :
                                    chainID === '66' ? 
                                    <div className={[classes.bxhbottomUnAbleClick, "okexsureDisable"].join(' ')} >
                                        <img src={require('../../assets/bxh/load2.png')} className='stateIcoImage' />
                                    </div>
                                    :
                                    chainID === '1' ? 
                                    <div className={[classes.bxhbottomUnAbleClick, "ethsureDisable"].join(' ')} >
                                        <img src={require('../../assets/bxh/load3.png')} className='stateIcoImage' />
                                    </div>
                                    :
                                    <div className={classes.bxhbottomUnAbleClick}>
                                        <img src={require('../../assets/bxh/load.png')} className='stateIcoImage' />
                                    </div>
                                  }
                                </div>
                            }
                          </div>
                          :
                          null
                      }

                    </div>
                }
              </div>
              :
              <div>
                {
                  token0AllowanceAmount == 0 && token1AllowanceAmount == 0 ?
                    <div>
                      <div className={classes.approvalparent}>
                        {
                          token0AllowanceAmount == 0 && pool && pool.symbol0 && pool.symbol0 !== "" && pool.symbol0 != 'HT' ?
                            <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                            :
                            null
                        }
                        {
                          token1AllowanceAmount == 0 && pool && pool.symbol1 && pool.symbol1 !== "" && pool.symbol1 != 'HT' ?
                            <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval1)} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                            :
                            null
                        }
                      </div>
                      {
                        token0AllowanceAmount == 0 || token1AllowanceAmount == 0 ?
                          null
                          :
                          <div style={{ width: '100%' }}>
                            {
                              amount0 == 0 && amount1 == 0 ?
                                <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>{t('BXH.weishurutitle')}</div>
                                :
                                <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>{t('BXH.yuebuzutitle')}</div>
                            }
                          </div>
                      }

                    </div>
                    :
                    <div className={classes.approvalparent}>
                      {
                        token0AllowanceAmount == 0 && pool && pool.symbol0 && pool.symbol0 !== "" && pool.symbol0 != 'HT' ?
                          <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                          :
                          null
                      }
                      {
                        token1AllowanceAmount == 0 && pool && pool.symbol1 && pool.symbol1 !== "" && pool.symbol1 != 'HT' ?
                          <div className={getStyleClass('PC_new_btn1',classes.bxhbottomApproval0)} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                          :
                          null
                      }

                      {
                        token0AllowanceAmount == 0 || token1AllowanceAmount == 0 ?
                          null :
                          <div style={{ width: '100%' }}>
                            {
                              amount0 == 0 && amount1 == 0 ?
                                <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>{t('BXH.weishurutitle')}</div>
                                :
                                <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>{t('BXH.yuebuzutitle')}</div>
                            }
                          </div>
                      }
                    </div>
                }
              </div>
          }
        </div>

      </div>
    )
  }

  // 第一个输入
  renderAssetInput1 = (asset, type) => {
    const { classes, t } = this.props
    const amount0 = this.state["currentAmountSymbol0"]
    const {
      rewardBXHFactory,
    } = this.state

    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          // disabled={ loading }
          className={classes.bxhInput}
          // id={ '' + asset.id + '_' + type }
          value={amount0 || ''}
          // error={ amountError }
          onChange={this.onChange0.bind(this, rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? (Math.floor(rewardBXHFactory[0].tokens[0].symbol0balance * 10000) / 10000) : '0.00')}
          onFocus={this.onFocusFrom.bind()}  // 获得焦点
          onBlur={this.onBlurFrom.bind()} // 失去焦点
          placeholder="0.00"
          variant="outlined"
        />
        {/* <div className={classes.bxhmax} onClick={() => { this.MaxValue0() }}>MAX</div> */}
      </div>
    )
  }
  MaxValue0 = (assetId, type) => {
    const {
      pool,
      rewardBXHFactory,
      tokenCalculaResult
    } = this.state
    this.setState({ lastInputPositionIsUp: true })
    let balance = rewardBXHFactory[0].tokens[0].symbol0balance && rewardBXHFactory[0].tokens[0].symbol0balance > 0.0001 ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let val = []
    this.setState({ amount0: balance + '' })
    val["currentAmountSymbol0"] = balance + ''
    val["currentAmountSymbol1"] = this._getToolNumber(val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili_decimal)
    this.setState(val)

    // if(balance > 0){
    //   this.state.isNoClickZhuanRu = true
    // }else{
    //   this.state.isNoClickZhuanRu = false
    // }

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (balance0 >= parseFloat(val["currentAmountSymbol0"]) && balance1 >= parseFloat(val["currentAmountSymbol1"])) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false
    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
  }
  MaxValue1 = (assetId, type) => {
    const {
      pool,
      rewardBXHFactory,
      tokenCalculaResult
    } = this.state
    this.setState({ lastInputPositionIsUp: false })
    let balance = rewardBXHFactory[0].tokens[0].symbol1balance && rewardBXHFactory[0].tokens[0].symbol1balance > 0.0001 ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"
    let val = []
    this.setState({ amount1: balance + '' })
    val["currentAmountSymbol1"] = balance + ''
    val["currentAmountSymbol0"] = this._getToolNumber(val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili_decimal)
    this.setState(val)

    // if(balance > 0){
    //   this.state.isNoClickZhuanRu = true
    // }else{
    //   this.state.isNoClickZhuanRu = false
    // }
    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (balance0 >= parseFloat(val["currentAmountSymbol0"]) && balance1 >= parseFloat(val["currentAmountSymbol1"])) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false
    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }
    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
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
  onFocusFrom = () => {
    const formOnFocus = this.state
    this.setState({
      formOnFocus: 1
    })
  }
  onBlurFrom = () => {
    const formOnFocus = this.state
    this.setState({
      formOnFocus: 0
    })
  }
  onFocusTo = () => {
    const toOnFocus = this.state
    this.setState({
      toOnFocus: 1
    })
  }
  onBlurTo = () => {
    const toOnFocus = this.state
    this.setState({
      toOnFocus: 0
    })
  }
  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }
  onChange0 = (value, event) => {
    let val = []
    const {
      rewardBXHFactory,
      tokenCalculaResult,
      isBtnStateNnormal, btnTextContent, pool
    } = this.state
    this.setState({ lastInputPositionIsUp: true })
    val["currentAmountSymbol0"] = event.target.value
    this.setState(val)
    this.setState({ amount0: event.target.value })

    val["currentAmountSymbol1"] = tokenCalculaResult ? val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili_decimal : "0.00"

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"

    if (!tokenCalculaResult) {
      return;
    }
    if (parseFloat(balance0) >= parseFloat(event.target.value) && parseFloat(balance1) >= parseFloat(val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili_decimal)) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false

      if (balance0 < event.target.value && pool) {
        this.state.btnTextContent = pool.symbol0
      } else if (pool) {
        this.state.btnTextContent = pool.symbol1
      }
    }

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
  }

  onChange1 = (value, event) => {
    this.setState({ lastInputPositionIsUp: false })
    let val = []
    const {
      rewardBXHFactory,
      tokenCalculaResult,
      pool
    } = this.state
    val["currentAmountSymbol1"] = event.target.value
    this.setState(val)
    this.setState({ amount1: event.target.value })

    // console.log("currentAmountSymbol1---->>>>",val["currentAmountSymbol1"])

    val["currentAmountSymbol0"] = tokenCalculaResult ? val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili_decimal : "0.00"
    // console.log("tokenCalculaResult[0].tokens[0].bili---->>>",tokenCalculaResult[0].tokens[0].bili_decimal)
    // console.log("currentAmountSymbol0--->>>>>>",val["currentAmountSymbol0"])

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"
    if (parseFloat(balance0) >= parseFloat(val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili_decimal) && parseFloat(balance1) >= parseFloat(event.target.value)) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false

      if (balance0 < event.target.value && pool) {
        this.state.btnTextContent = pool.symbol0
      } else if (pool) {
        this.state.btnTextContent = pool.symbol1
      }
    }

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
  }

  // 第二个输入
  renderAssetInput2 = (asset, type) => {
    const { classes, t } = this.props
    const amount1 = this.state["currentAmountSymbol1"]
    const {
      rewardBXHFactory,
    } = this.state
    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          // disabled={ loading }
          className={classes.bxhInput}
          // id={ '' + asset.id + '_' + type }
          value={amount1 || ''}
          // error={ amountError }
          onChange={this.onChange1.bind(this, rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? (Math.floor(rewardBXHFactory[0].tokens[0].symbol1balance * 10000) / 10000) : '0.00')}
          onFocus={this.onFocusTo.bind()}  // 获得焦点
          onBlur={this.onBlurTo.bind()} // 失去焦点
          placeholder="0.00"
          variant="outlined"
        />
        {/* <div className={classes.bxhmax} onClick={() => { this.MaxValue1() }}>MAX</div> */}
      </div>
    )
  }

  //判断token0授权额度是否足够
  onCheckAllowance0IsEnough = (amount0, amount1) => {
    const { pool, isAllowance0Enough, isAllowance1Enough } = this.state
    const { classes, t } = this.props
    if (!amount0 || amount0 === "" || amount0 === "0" || amount0 === "0.") {
      amount0 = "0"
    }

    store._getAllowanceCount(pool.symbol0Address, pool.router_address, amount0, pool.decimals0, (data) => {
      this.setState({ isAllowance0Enough: data.isEnough })
      // sureSeceiveStepTwo

      if (data.isEnough) {
        this.setState({ token0AllowanceAmount: data.allow_decimals })
      } else {
        this.setState({ token0AllowanceAmount: 0, approve0Title: t('BXH.allowanceamountup') })
      }

    });
  }
  //判断token1授权额度是否足够
  onCheckAllowance1IsEnough = (amount0, amount1) => {
    const { pool, isAllowance0Enough, isAllowance1Enough } = this.state
    const { classes, t } = this.props
    if (!amount1 || amount1 === "" || amount1 === "0" || amount1 === "0.") {
      amount1 = "0"
    }

    store._getAllowanceCount(pool.symbol1Address, pool.router_address, amount1, pool.decimals1, (data) => {
      this.setState({ isAllowance1Enough: data.isEnough })
      if (data.isEnough) {
        this.setState({ token1AllowanceAmount: data.allow_decimals })
      } else {
        this.setState({ token1AllowanceAmount: 0, approve1Title: t('BXH.allowanceamountup') })
      }

    });

  }

  //授权 token0
  onApprove0 = () => {
    this.setState({ amountError: false })
    const { rewardBXHFactory, pool, msgContent } = this.state

    this.setState({ loading: true })
    this.setState({ isNoClickShouQuan: false })

    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve " + pool.symbol0 })

    dispatcher.dispatch({ type: GET_BXHTRADESTAKEApprove, content: { asset: rewardBXHFactory, pair: pool, msgContent: "Approve " + pool.symbol0, } })
  }
  //授权 token1
  onApprove1 = () => {
    this.setState({ amountError: false })
    const { rewardBXHFactory, pool, msgContent } = this.state

    this.setState({ loading: true })
    this.setState({ isNoClickShouQuan: false })

    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve " + pool.symbol1 })

    dispatcher.dispatch({ type: GET_BXHTRADESTAKEApprove1, content: { asset: rewardBXHFactory, pair: pool, msgContent: "Approve " + pool.symbol1 } })
  }


  // 我的仓位
  renderPosition = () => {
    const { classes, t } = this.props
    const {
      rewardBXHFactory,
      pool,
      tokenCalculaResult
    } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={getStyleClass('PCTDaoCard',classes.bxhCangwei)}>
        <div className={classes.bxhcwtit}>
          <img src={require('../../assets/bxh/Fill.png')} />
          {t('BXH.minecangweititle')}
        </div>
        <div className={classes.bxhcwshumg}>
          <em>
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/HT%402x.png" className={classes.bxhmos1} />
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/USDT%402x.png" className={classes.bxhmos2} />
            <i>{pool && pool.symbolPair && pool.symbolPair !== "" ? pool.symbolPair : ""}</i>
          </em>
          <em>{rewardBXHFactory && rewardBXHFactory[0].tokens[0].mineLpAmount ?
            numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].mineLpAmount))
            :
            0.00}</em>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool && pool.symbol0 && pool.symbol0 !== "" ? pool.symbol0 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].mineLpAmount / rewardBXHFactory[0].tokens[0].poolTotal) * tokenCalculaResult[0].tokens[0].reserveA + "")) : "0"}</span>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool && pool.symbol1 && pool.symbol1 !== "" ? pool.symbol1 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].mineLpAmount / rewardBXHFactory[0].tokens[0].poolTotal) * tokenCalculaResult[0].tokens[0].reserveB + "")) : "0"}</span>
        </div>
      </div>
    )
  }


  nav = (pairData) => {
    store.setStore({ currentdTradePool: pairData })
    this.props.history.push('/bxhTradeMobility/' + pairData.id)
  }
  changeReverse = () => {
    this.setState({ isReserve: !this.state.isReserve })
  }

  onAddLiquidity = () => {
    this.setState({ modalReceiveDialog: true })
  }

  renderSendModal = () => {
    const { rewardSymbolPrice, modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }

  onFocusAmount0 = () => {
    const amount0Focus = this.state
    this.setState({
      amount0Focus: 1
    })
  }
  onBlurAmount0 = () => {
    const amount0Focus = this.state
    this.setState({
      amount0Focus: 0
    })
  }
  onFocusAmount1 = () => {
    const amount1Focus = this.state
    this.setState({
      amount1Focus: 1
    })
  }
  onBlurAmount1 = () => {
    const amount1Focus = this.state
    this.setState({
      amount1Focus: 0
    })
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(BxhTradeStake)));
