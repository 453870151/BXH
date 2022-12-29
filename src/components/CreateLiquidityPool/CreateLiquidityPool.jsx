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
import LiquidityDialog from '../liquidityDialog/liquidityDialog.jsx';  //减少流动性
import ReduceDialog from '../reduceDialog/reduceDialog.jsx'; //移除流动性确认

import './loadingRotate.css';
import '../bxhTradeMobility/requestDataLoadingRotate.css';

import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import { numberDecimal, _getValuemultip1, _getValueDivided1, _getValuemultip, _getValueDivided3, _getValueMinus, judgeSizeForNumber } from '../../config/constantFunction'
import getLangURLWithURL from '../../util/linkHelper';

import BottomReceivedDialog from '../dialog/receivedialog.jsx'
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import PassDialog from '../passDialog/passDialog.jsx';
import DefaultImage from '../defaultImage/defaultImage';
import cookie from 'react-cookies'
import Footer from '../unlock/Footer.jsx';
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
  BXHPAGEREFRESH_RETURN,
  BXHGETPAIRBYTOKENS,
  BXHGETPAIRBYTOKENS_RETURNED,
  BXHALLOWANCEREMOVELIQUIDITY, //授权减少流动性
  BXHALLOWANCEREMOVELIQUIDITY_RETURNED,
  BXHCHNAGEACCOUNT//切换账户
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      padding: '26px 24px',
    }
  },
  root1: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '260px',
    }
  },
  bxhtTit: {
    marginBottom: '20px',

    '& h2': {
      fontSize: '25px',
      margin: '0px',
    },
    '& h3': {
      fontSize: '17px',
      margin: '0px',
      fontWeight: '400',
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
    borderRadius: '0px 0px 15px 15px',
    padding: '20px',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '0px',
      borderRadius: '15px',
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
      marginRight: '10px',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
        marginRight: '30px',
      }
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
  TabOff: {

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
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #1C1E22'
  },
  bxhbtestmFocus: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #2ebc84'
  },
  bxhicosl: {
    position: 'absolute',
    right: '10px',
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
    // display: 'inline-block',
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
    marginBottom: '10px'
  },
  bxhbottomUnAbleClick: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #4F5257, #4F5257)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '10px 0 10px',
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
    marginBottom: '10px'

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
    marginBottom: '10px'
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
  btnwenti: {

  },
  toolmsgdialog: {
    background: 'red'
  },
  tooltip: {
    backgroundColor: '#000000'
  },
  windowparent: {
    display: 'flex',
    height: '56px',
    borderRadius: '15px 15px 0px 0px',
    background: '#292C4C',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  windowparentContent: {
    padding: '1px',
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    background: '#22253F',
    borderRadius: '4px',
    width: '205px',
    '& div': {
      lineHeight: '30px',
      width: '50%',
      borderRadius: '4px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        filter: 'brightness(80%)',
      },
      '&:active': {
        filter: 'brightness(50%)',
      },
    },
  },
  youPostion: {
    textAlign: 'left',
  },
  bxhcwtit1: {
    marginLeft: '5px',
    fontSize: '14px',
    '& img': {
      height: '14px',
      marginRight: '5px',
      position: 'relative',
      top: '3px'
    }
  },
  cardRow: {
    marginTop: '15px',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  cardRowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    color: '#FFFFFF',
    height: '50px',
    fontSize: '14px',
    // background: '#32375E',
    border: '1px solid rgba(151, 151, 151, 0.1)',
    padding: '0 10px',
  },
  coinLogo: {
    width: '22px',
    height: '22px',
    position: 'absolute',
    border: '1px solid #2C3036',
    borderRadius: '11px',
  },
  cardRowLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  cardRowLeftName: {
    marginLeft: '5px',
    fontWeight: 'bold',
    '& span': {
      color: 'rgba(255,255,255,0.6)',
      fontWeight: 'normal',
    },
  },
  cardRowRight: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  cardRowContent: {
    padding: '15px',
    border: '1px solid rgba(151, 151, 151, 0.1)',
    borderRadius: '0 0 6px 6px',
  },
  cardRowContentItem: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardRowContentItemTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    '& img': {
      marginRight: '5px',
      width: '20px',
      height: '20px',
    },
  },
  cardRowContentItemAccounted: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'normal',
  },
  cardRowContentBtn: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    color: '#FFFFFF',
    '& div': {
      borderRadius: '2px',
      cursor: 'pointer',
      width: '100px',
      height: '25px',
      lineHeight: '25px',
      textAlign: 'center',
      backgroundColor: 'rgba(102, 105, 108, 0.25)',
      '&:hover': {
        filter: 'brightness(80%)',
      },
      '&:active': {
        filter: 'brightness(50%)',
      },
    },
  },
  cardRowContentBtnAdd: {
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
  },
  cardRowContentBtnStaked: {
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    marginLeft: '20px',
  },
  cardRowContentBtnReduce: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: '20px',
  },
  addziji: {
    background: 'linear-gradient(360deg, #2EBC84 0%, #35C288 100%)',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginLeft: '30px',
    marginRight: '30px',
    borderRadius: '4px',
    textAlign: 'center',
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

class CreateLiquidityPool extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    // const pool = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    const rewardBXHPools = store.getStore('rewardBXHPools')
    const rewardBXHTokens = store.getStore('rewardBXHTokens')
    const rewardBXHFactory = store.getStore('rewardBXHFactory')

    const pool_address = store.getStore("pool_address")
    const router_address = store.getStore("router_address")
    const factory_address = store.getStore("factory_address")

    const current_pool = store.getStore("currentdTradePool1")

    const MyLiquidityPoolList = JSON.parse(localStorage.getItem(account.address + "_myAllLiquidity"))//store.getStore("MyLiquidityPoolList")
    // console.log("MyLiquidityPoolList----->>>>>>>>",MyLiquidityPoolList)

    let pool_t = {}

    store.setStore({ currentdTradePool1: {} })


    // console.log(" props.match.params.token0address --->>>> ", props.match.params.token0address)
    // console.log(" props.match.params.token1address --->>>> ", props.match.params.token1address)

    if (props.match.params.token0address && props.match.params.token1address) {
      store._getPoolInfoByTwoTokenAddress(props.match.params.token0address, props.match.params.token1address, (data) => {
        // console.log("通过两个地址获取到的poolinfo--->>>>",data)
        if (!data.lptokenAddress || data.lptokenAddress === "0x0000000000000000000000000000000000000000") {
          // console.log("false")
          this.setState({ isHave: false })
        } else {
          // console.log("true")
          this.setState({ isHave: true })
        }
        store.setStore({ rewardBXHTokens: data })
        this.setState({ pool: data })
        setTimeout(() => {
          this.getTwoTokenInfo(data)
        }, 1)

      })
    } else {
      if (current_pool && current_pool.symbol0Address && current_pool.symbol0Address !== "" && current_pool.symbol1Address && current_pool.symbol1Address !== "") {
        pool_t = current_pool
      } else {
        pool_t = {
          symbol0ImgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/HT.png",
          symbol0: "HT",
          symbol0Address: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
          decimals0: 18,
          balance0: 0,
          pool_address: pool_address,
          router_address: router_address,
          factory_address: factory_address,
          lptokenAddress: null,
          symbol1: '',
          symbol1Address: '',
          decimals1: 0,
          balance1: 0,
          symbol1imgURl: "",
        }
      }
      pool_t.pool_address = pool_address
      pool_t.router_address = router_address
      pool_t.factory_address = factory_address
    }

    // if (!pool) {
    //   props.history.push('/bxhList')
    // }

    const { match } = props;

    this.state = {
      rewardBXHPools: rewardBXHPools,
      pool: pool_t,
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
      isHave: false,
      modalPass: false,
      modalPassbottom: false,
      currentShowType: 1,//1添加流动性 2我的流动性 3创建流动性
      lastInputPositionIsUp: true,
      myAllLiquidity: MyLiquidityPoolList,
      isShowRemoveLiquidity: false,
      isShowRemoveLiquidityConfirm: false,
      removeLiquidityAmount: 0,
      needRemoveLiquidityPool: null,
      curSelectPoolindex: null,
      NeedAproveval: false,
      isConfirmBtnAble: false,
      txConfirmBtn: "",
      upNoImg: false,
      bottomNoImg: false,
      footerMShow: true,
      wHeight: '',
      match: match,
      upSelecting: true,
      bottomSelecting: true
    }
    store.setStore({ rewardBXHTokens: this.state.pool })

    // console.log("cookie --->>>>> ",cookie.load(account.address))
  }

  // 组件加载完毕 启动定时器
  componentDidMount() {
    const { t } = this.props
    setTimeout(this.iTimer, 0);
    this.setState({ txConfirmBtn: t('BXH.weishurutitle') })
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    const { pool, isHave } = this.state //上页面传来的两个币的数据
    dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
    if (isHave) {
      dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: pool, amount: "1" } })
    }
  }
  //
  getTwoTokenInfo = (pool) => {
    // const{ pool } = this.state
    // console.log("开始查询----------->>>>>>>>", pool)
    let upTokenInfo = {
      address: pool.symbol0Address,
      symbol: pool.symbol0,
      balance: 0,
      allowance: 0,
      decimals: pool.decimals0
    }
    let bottomTokenInfo = {
      address: pool.symbol1Address,
      symbol: pool.symbol1,
      balance: 0,
      allowance: 0,
      decimals: pool.decimals1
    }

    if (pool.lptokenAddress && pool.lptokenAddress !== "0x0000000000000000000000000000000000000000") {
      dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: pool, amount: "1" } }) //可优化
    }
    dispatcher.dispatch({ type: BXHGETPAIRBYTOKENS, content: { upTokenInfo: upTokenInfo, bottomTokenInfo: bottomTokenInfo } })
    // console.log("1111111")
    dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })
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
      const { pool, isHave } = this.state
      // console.log("倒计时")
      if (pool && pool.symbol0Address && pool.symbol1Address && pool.symbol0Address !== "" && pool.symbol1Address !== "") {
        this.getTwoTokenInfo(pool)
      }
      if (pool && isHave || pool.symbol0Address && pool.symbol0Address !== "" && pool.symbol1Address && pool.symbol1Address !== "") {
        // console.log("查询")
        dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: pool, amount: "1" } })
      }

    }, 5000);
  }

  RefreshFunction = () => {

  }

  componentWillMount() {
    emitter.on(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);
    emitter.on(GET_BXHTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
    emitter.on(BXHCALCULATION_RETURNED, this.calculatCount);

    emitter.on(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);

    emitter.on(ERROR, this.errorReturned);  // 取消合约提示

    emitter.on(BXHGETPAIRBYTOKENS_RETURNED, this.getTokensPairAndAllowance) //获取两个token资产和授权

    emitter.on(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.removeliquidity_return);

    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
  }

  componentWillUnmount() {
    emitter.removeListener(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);
    emitter.removeListener(GET_BXHTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
    emitter.removeListener(BXHCALCULATION_RETURNED, this.calculatCount);
    emitter.removeListener(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(BXHGETPAIRBYTOKENS_RETURNED, this.getTokensPairAndAllowance) //获取两个token资产和授权

    emitter.removeListener(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.removeliquidity_return);

    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount)//切换账户
    clearInterval(this.timer);
    this.setState = (state, callback) => {
      return;
    }
  };

  changeAccount = () => {
    const { pool, isHave } = this.state //上页面传来的两个币的数据
    dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })//两个token余额和授权 用户数据 可领取收益 池子 、、、授权，减少流动性时用到了router地址  用户数据，收益用到了pool地址
    if (isHave) {
      dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: pool, amount: "1" } })
    }
    this.checkUpDateMyQuidity()

  }

  removeliquidity_return = () => {
    // console.log("111111111sssss")
    store._getMyAllLiquidityFirest((data) => [
      this.setState({ myAllLiquidity: data })
    ])
  }

  getTokensPairAndAllowance = (data) => {
    // console.log("getTokensPairAndAllowance data --------- >>>>>>> ",data)

    // const { t } = this.props
    // this.setState({approve0Title:t('BXH.allowanccetitle')})
    // this.setState({approve1Title:t('BXH.allowanccetitle')})
    // console.log("查询token的数据----->>>>>",data)
    // this.setState({upTokenInfo:data.upTokenInfo,bottomTokenInfo:data.bottomTokenInfo,lpcontractAddress:data.lpTokenAddress,isHave:data.isHave})

    if (this.state.upTokenInfo && this.state.upTokenInfo.address) {
      this.setState({ token0AllowanceAmount: data.upTokenInfo.allowance })
    }

    if (this.state.bottomTokenInfo && this.state.bottomTokenInfo.address) {
      this.setState({ token1AllowanceAmount: data.bottomTokenInfo.allowance })
    }

    this.setState({ isHave: data.isHave })

    if (data.lpTokenAddress && data.lpTokenAddress !== "0x0000000000000000000000000000000000000000") {

      let temp_pool = this.state.pool

      temp_pool.lptokenAddress = data.lpTokenAddress

      this.setState({ pool: temp_pool })
      store.setStore({ rewardBXHTokens: temp_pool })
    }

    if (!data.isHave) {
      // const{ currentAmountSymbol0,currentAmountSymbol1 } = this.state
      this.setState({ currentAmountSymbol1: "", isCanShow: false })//, currentShowType: 3
    } else {
      // this.setState({ currentShowType: 1 })
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: this.state.pool } })
      dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: this.state.pool, amount: "1" } }) //可优化
    }

  }

  pageRefreshEvent = (data) => {
    const { pool, isHave } = this.state
    const account = store.getStore('account')
    if (data && pool) {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: data })
      // console.log("11111111")
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool } })
      if (isHave) {
        dispatcher.dispatch({ type: BXHCALCULATION, content: { asset: pool, amount: "1" } })
      }
    }
  }
  // 新加的
  balancesReturned = (data) => {

    // this.setState({
    //   BXHSymbol0: data[0].tokens[0].symbol0balance,
    //   BXHSymbol1: data[0].tokens[0].symbol1balance
    // })
    // console.log("data---->>>>", data)
    const { classes, t } = this.props

    this.setState({ approve0Title: t('BXH.allowanccetitle'), upSelecting: false, bottomSelecting: false })
    this.setState({ approve1Title: t('BXH.allowanccetitle'), upSelecting: false, bottomSelecting: false })
    this.setState({ rewardBXHFactory: data, token0AllowanceAmount: data[0].tokens[0].alloWance0, token1AllowanceAmount: data[0].tokens[0].alloWance1 })
  }
  //授权
  showHashByAPPROVEBXH_RETURNED = (txHash) => {
    this.setState({ isNoClickShouQuan: true })
    this.showHash(txHash)
  }

  calculatCount = (data) => {
    // tokenCalculaResult[0].tokens[0].tokenB / tokenCalculaResult[0].tokens[0].tokenA
    // console.log("tokenCalculaResult------->>>>>>>>>",data)

    const { currentAmountSymbol0, currentAmountSymbol1, lastInputPositionIsUp, isHave } = this.state
    if (!currentAmountSymbol0 || currentAmountSymbol0 === "") {
      this.setState({ currentAmountSymbol0: "" })
      this.setState({ currentAmountSymbol1: "" })
    } else {
      if (isHave) {
        if (lastInputPositionIsUp) {
          let token1Amount = _getValuemultip1(currentAmountSymbol0, data[0].tokens[0].bili_decimal)
          // console.log("token1Amount--->>>>>>",token1Amount)

          // console.log("token1Amount--->>>>>>",token1Amount)
          this.setState({ currentAmountSymbol1: token1Amount })
          this.checkInputRight(currentAmountSymbol0, token1Amount)
        } else {
          let token0Amount = _getValueDivided1(currentAmountSymbol1, data[0].tokens[0].bili_decimal)
          // console.log("token0Amount--->>>>>>",token0Amount)

          this.setState({ currentAmountSymbol0: token0Amount })
          this.checkInputRight(token0Amount, currentAmountSymbol1)
        }
      }
    }
    this.setState({ tokenCalculaResult: data })
  }

  checkInputRight = (input0, input1) => {
    const { rewardBXHFactory, pool } = this.state
    const { classes, t } = this.props
    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"

    // console.log("input1--->>>>",input1)
    // console.log("balance1--->>",balance1)
    // console.log("parseFloat(input0)>=parseFloat(balance0)--->>",parseFloat(input0)>=parseFloat(balance0))
    // console.log("parseFloat(input1) >= parseFloat(balance1)--->>>",parseFloat(input1) >= parseFloat(balance1))
    if (parseFloat(input0) <= parseFloat(balance0) && parseFloat(input1) <= parseFloat(balance1)) {
      this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
    } else if (input0 == "" || input1 === "") {
      this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
    } else {
      this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
    }

  }

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };
  //跳转兑换
  goExchange = () => {
    // this.props.history.push('/swap')
    window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self')
  }

  render() {
    const { classes, t, location } = this.props;
    const { pool, rewardBXHTokens, isNoClickShouQuan, isCanShow, modalSend, modalMesage, modalReceiveDialog, isMobile, value, token0AllowanceAmount, token1AllowanceAmount, approveTitle, modalPass, modalPassbottom, isHave, currentShowType, isShowRemoveLiquidity, isShowRemoveLiquidityConfirm, rewardBXHFactory, footerMShow } = this.state

    return (
      <div className={classes.root}>
        <Header />

        <div className={classes.root1}>
          <div className={classes.bxhtTit}>
            <h2>{t('BXH.tigongliudongxing')}</h2>
            <h3>{t('BXH.liquiditytitlenew')}</h3>
          </div>
          <div className={classes.windowparent}>
            <div className={classes.windowparentContent}>
              <div onClick={this.goExchange} style={{ opacity: '0.8' }}>兑换</div>
              <div style={{ backgroundImage: 'linear-gradient(360deg, #2EBC84 0%, #35C288 100%)' }}>资金池</div>
            </div>
          </div>
          <div className={classes.bxhtConter}>
            <div className={classes.bxhttabs}>
              <span className={currentShowType == 1 ? classes.TabOn : classes.TabOff} onClick={() => { this.selectShowTypeToMyLiquidity(1) }}>
                {t('BXH.addzijin')}
                {
                  currentShowType == 1 ?
                    <em></em>
                    :
                    null
                }
              </span>
              {/* <span>
                {isMobile == 2 ? t('BXH.mineliudongxing') : t('BXH.jianshaoliudong')}
              </span> */}
              <span className={currentShowType == 2 ? classes.TabOn : classes.TabOff} onClick={() => { this.selectShowTypeToMyLiquidity(2) }}>
                {t('BXH.mineliquidity')}

                {
                  currentShowType == 2 ?
                    <em></em>
                    :
                    null
                }
              </span>

              <span className={currentShowType == 3 ? classes.TabOn : classes.TabOff} onClick={() => { this.selectShowTypeToMyLiquidity(3) }}>
                {t('BXH.createliquidity')}
                {
                  currentShowType == 3 ?
                    <em></em>
                    :
                    null
                }
              </span>

            </div>

            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <CustomTooltip title={t('BXH.msgtip1')}
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
            </ClickAwayListener>

            {/* 流动资金 */}
            {
              currentShowType == 1 || currentShowType == 3 ?
                this.renderWorking()
                :
                this.renderMyLiquidity()
            }
          </div>

          {/* 我的仓位 */}
          {
            isCanShow && isHave && parseFloat(rewardBXHFactory[0].tokens[0].mineLpAmount) > 0.000000001 ?
              this.renderPosition()
              :
              null
          }


          {modalSend && this.renderSendModal()}
          {modalMesage && this.renderMessageModal()}
          {modalReceiveDialog && this.renderReceiveModal()}
          {modalPass && this.renderPassModal()}
          {modalPassbottom && this.renderPassModalbottom()}

          {
            isShowRemoveLiquidity && this.renderLiquidityModal()//减少流动性1
          }
          {
            isShowRemoveLiquidityConfirm && this.renderModal()//减少流动性2
          }
        </div>

        {
          isMobile == 1 ?
            null
            :
            <div>
              {
                footerMShow ?
                  <Footer pagetype="swap" />
                  :
                  null
              }
            </div>
        }

      </div>
    )

  };

  renderLiquidityModal = () => {
    //isShowRemoveLiquidity
    const { rewardBXHFactory, needRemoveLiquidityPool } = this.state
    return (
      <LiquidityDialog onClose={this.onCloseLiquidity} onSure={this.onSureLiquidity} tokensData={rewardBXHFactory[0].tokens[0]} pairData={needRemoveLiquidityPool} />
    )
  }
  onCloseLiquidity = () => {
    this.setState({ isShowRemoveLiquidity: false })
  }
  onSureLiquidity = (inputVal) => {
    this.onCloseLiquidity();
    this.setState({ isShowRemoveLiquidityConfirm: true, removeLiquidityAmount: inputVal });
  }

  renderModal = () => {
    //removeLiquidityAmount
    const { rewardBXHFactory, needRemoveLiquidityPool, removeLiquidityAmount } = this.state
    return (
      <ReduceDialog onClose={this.onClose} onNext={this.onNext} tokensData={rewardBXHFactory[0].tokens[0]} pairData={needRemoveLiquidityPool} amount={removeLiquidityAmount} />
    )
  }
  onClose = () => {
    this.setState({ isShowRemoveLiquidityConfirm: false })
  }
  //移除流动
  onNext = () => {
    this.onClose();
    const { rewardBXHFactory, needRemoveLiquidityPool, removeLiquidityAmount, isMobile, msgContent } = this.state
    const { classes, t } = this.props

    store._getAllowanceCount(needRemoveLiquidityPool.lptokenAddress, needRemoveLiquidityPool.router_address, removeLiquidityAmount, 18, (data) => {
      if (data.isEnough) {
        this.setState({ RemoveLiquidityAllowanceAmount: data.allow_decimals })
        this.sendRemoveLiquidity()
      } else {
        this.setState({ RemoveLiquidityAllowanceAmount: 0, approve1Title: t('BXH.approvejianshaoliudongagain'), NeedAproveval: true })
      }

    });

  }
  sendRemoveLiquidity = () => {
    const { rewardBXHFactory, needRemoveLiquidityPool, removeLiquidityAmount, isMobile, msgContent } = this.state

    let token1Amount = 0
    let token2Amount = 0
    let tokensData = rewardBXHFactory[0].tokens[0]

    if (tokensData) {
      token1Amount = _getValuemultip(needRemoveLiquidityPool.lpzanbi, needRemoveLiquidityPool.reserveA, 6)
      token2Amount = _getValuemultip(needRemoveLiquidityPool.lpzanbi, needRemoveLiquidityPool.reserveB, 6)
    }
    let msg = "Get " + token1Amount + " " + needRemoveLiquidityPool.symbol0 + " and " + token2Amount + " " + needRemoveLiquidityPool.symbol1
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    var senddata = {
      amount: removeLiquidityAmount,
      amountAMin: "0",
      amountBMin: "0",
      amountADesired: token1Amount + "",
      amountBDesired: token2Amount + ""
    }
    dispatcher.dispatch({ type: BXHREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: needRemoveLiquidityPool, senddata: senddata, msgContent: msg } })
  }

  selectShowTypeToMyLiquidity = (index) => {
    const account = store.getStore('account')
    const mypoollist = JSON.parse(localStorage.getItem(account.address + "_myAllLiquidity"))//store.getStore("MyLiquidityPoolList")
    this.setState({ myAllLiquidity: mypoollist })
    this.setState({ currentShowType: index, isCanShow: false, currentAmountSymbol0: "", currentAmountSymbol1: "" })
    if (!mypoollist) {
      // console.log("执行第一次")
      store._getMyAllLiquidityFirest((data) => {
        this.setState({ myAllLiquidity: data })
      })
    } else {
      // console.log("执行第二次")
      store._getMyliquidityPoolbalance(mypoollist, (data) => {
        this.setState({ myAllLiquidity: data })
      })
    }

  }

  checkUpDateMyQuidity = () => {
    const mypoollist = null//JSON.parse(localStorage.getItem("myAllLiquidity"))//store.getStore("MyLiquidityPoolList")
    // console.log("mypoollist---->>>>>>>",mypoollist)
    this.setState({ myAllLiquidity: mypoollist })
    // if (index !== this.state.currentShowType) {
    //   this.setState({tokenCalculaResult:null})
    // }
    if (!mypoollist) {
      store._getMyAllLiquidityFirest((data) => {
        // console.log("第一次_getMyAllLiquidityFirest--->>>>>>", data)
        this.setState({ myAllLiquidity: data })
      })
    } else {
      // console.log("执行第二次")
      store._getMyliquidityPoolbalance(mypoollist, (data) => {
        // console.log("第二次_getMyliquidityPoolbalance--->>>>>>", data)
        this.setState({ myAllLiquidity: data })
      })
    }
  }

  renderPassModal = () => {
    return (
      <PassDialog onClose={() => { this.setState({ modalPass: false }) }} onSure={(val) => {
        this.onSureUpTokenSelect(val)
      }} />
    )
  }

  onSureUpTokenSelect = (val) => {
    // console.log("up token is ----->>>>>>>",val)

    let pool = this.changeSelectToken("up", val)
    this.setState({ upSelecting: true, bottomSelecting: true })
    if (pool.symbol0Address && pool.symbol0Address !== "" && pool.symbol1Address && pool.symbol0Address !== "") {
      this.getTwoTokenInfo(pool)
    }
  }

  renderPassModalbottom = () => {
    return (
      <PassDialog onClose={() => { this.setState({ modalPassbottom: false }) }} onSure={(val) => {
        this.onSureBottomTokenSelect(val)
      }} />
    )
  }

  onSureBottomTokenSelect = (val) => {
    // console.log("bottom token is ----->>>>>>>",val)

    let pool = this.changeSelectToken("bottom", val)
    this.setState({ upSelecting: true, bottomSelecting: true })
    if (pool.symbol0Address && pool.symbol0Address !== "" && pool.symbol1Address && pool.symbol0Address !== "") {
      this.getTwoTokenInfo(pool)
    }
  }
  //选择token，切换两个token
  changeSelectToken = (position, data) => {
    // console.log("1234")
    const { pool, rewardBXHFactory, currentAmountSymbol0, currentAmountSymbol1 } = this.state

    let pool_temp = {}
    let rewardBXHFactory_temp = rewardBXHFactory
    let currentAmountSymbol0_temp = currentAmountSymbol0
    let currentAmountSymbol1_temp = currentAmountSymbol1

    if (position === "up") { //正在选择上面的币种
      if (pool.symbol1 === data.symbol) { //选中上面的币种与下面的币种一致，就互换
        pool_temp.symbol0ImgURl = pool.symbol1imgURl
        pool_temp.symbol0 = pool.symbol1
        pool_temp.symbol0Address = pool.symbol1Address
        pool_temp.decimals0 = pool.decimals1
        pool_temp.balance0 = pool.balance1

        pool_temp.symbol1imgURl = pool.symbol0ImgURl
        pool_temp.symbol1 = pool.symbol0
        pool_temp.decimals1 = pool.decimals0
        pool_temp.balance1 = pool.balance0
        pool_temp.symbol1Address = pool.symbol0Address

        rewardBXHFactory_temp[0].tokens[0].symbol0balance = pool.balance1
        rewardBXHFactory_temp[0].tokens[0].symbol1balance = pool.balance0

        this.setState({ currentAmountSymbol0: currentAmountSymbol1_temp, currentAmountSymbol1: currentAmountSymbol0_temp })
      } else {
        pool_temp.symbol0ImgURl = data.logoURI
        pool_temp.symbol0 = data.symbol
        pool_temp.symbol0Address = data.address
        pool_temp.decimals0 = data.decimals
        pool_temp.balance0 = data.balance

        pool_temp.symbol1imgURl = pool.symbol1imgURl
        pool_temp.symbol1 = pool.symbol1
        pool_temp.decimals1 = pool.decimals1
        pool_temp.balance1 = pool.balance1
        pool_temp.symbol1Address = pool.symbol1Address

        rewardBXHFactory_temp[0].tokens[0].symbol0balance = pool.balance0
        rewardBXHFactory_temp[0].tokens[0].symbol1balance = pool.balance1

      }
    } else if (position === "bottom") {
      if (pool.symbol0 === data.symbol) {
        pool_temp.symbol0ImgURl = pool.symbol1imgURl
        pool_temp.symbol0 = pool.symbol1
        pool_temp.symbol0Address = pool.symbol1Address
        pool_temp.decimals0 = pool.decimals1
        pool_temp.balance0 = pool.balance1

        pool_temp.symbol1imgURl = pool.symbol0ImgURl
        pool_temp.symbol1 = pool.symbol0
        pool_temp.decimals1 = pool.decimals0
        pool_temp.balance1 = pool.balance0
        pool_temp.symbol1Address = pool.symbol0Address


        rewardBXHFactory_temp[0].tokens[0].symbol0balance = pool.balance1
        rewardBXHFactory_temp[0].tokens[0].symbol1balance = pool.balance0

        this.setState({ currentAmountSymbol0: currentAmountSymbol1_temp, currentAmountSymbol1: currentAmountSymbol0_temp })
      } else {
        pool_temp.symbol1imgURl = data.logoURI
        pool_temp.symbol1 = data.symbol
        pool_temp.decimals1 = data.decimals
        pool_temp.balance1 = data.balance
        pool_temp.symbol1Address = data.address

        pool_temp.symbol0ImgURl = pool.symbol0ImgURl
        pool_temp.symbol0 = pool.symbol0
        pool_temp.decimals0 = pool.decimals0
        pool_temp.balance0 = pool.balance0
        pool_temp.symbol0Address = pool.symbol0Address

        rewardBXHFactory_temp[0].tokens[0].symbol0balance = pool.balance0
        rewardBXHFactory_temp[0].tokens[0].symbol1balance = pool.balance1

      }
    }
    pool_temp.factory_address = pool.factory_address
    pool_temp.lptokenAddress = pool.lptokenAddress
    pool_temp.pool_address = pool.pool_address
    pool_temp.router_address = pool.router_address

    let address0_url = pool_temp && pool_temp.symbol0Address ? "/" + pool_temp.symbol0Address : ""
    let address1_url = pool_temp && pool_temp.symbol1Address ? "/" + pool_temp.symbol1Address : ""

    const href = "/#/createliquiditypool" + address0_url + address1_url;
    window.history.pushState({}, 0, href);

    this.setState({ pool: pool_temp, upNoImg: false, bottomNoImg: false })
    store.setStore({ rewardBXHTokens: pool_temp, rewardBXHFactory: rewardBXHFactory_temp })
    // console.log("11111")
    dispatcher.dispatch({ type: GET_BXHTRADESTAKEINIT, content: { asset: pool_temp } })
    return pool_temp
  }

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  handleTooltipClose = () => {
    this.setState({ open: false });
  };
  renderReceiveModal = () => {
    // tokenCalculaResult && currentAmountSymbol0   rewardBXHFactory[0].tokens[0].symbol0balance
    const { tokenCalculaResult, pool, rewardBXHFactory, currentAmountSymbol0, currentAmountSymbol1, isHave } = this.state
    return (
      <BottomReceivedDialog onClose={this.closeSeceive} onSure={this.sureSeceive} caluData={tokenCalculaResult} tokensData={rewardBXHFactory} pairData={pool} amount0={currentAmountSymbol0} amount1={currentAmountSymbol1} isHave={isHave} />
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

    let msg = "Supplying " + amount0 + " " + pool.symbol0 + " and " + amount1 + " " + pool.symbol1
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

  handleChange = () => {

  }

  // 流动资金
  renderWorking = () => {
    const { classes, t } = this.props

    const { isConfirmBtnAble, txConfirmBtn, pool, rewardBXHTokens,
      rewardBXHFactory, tokenCalculaResult, isReserve,
      currentAmountSymbol0, isCanShow, formOnFocus, toOnFocus,
      token0AllowanceAmount, token1AllowanceAmount, approve0Title,
      approve1Title, isHave, upNoImg, bottomNoImg, upSelecting, bottomSelecting } = this.state

    // console.log("token0AllowanceAmount--->>>>>",token0AllowanceAmount)
    // console.log("token1AllowanceAmount----->>>>",token1AllowanceAmount)
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
              {
                upSelecting ?
                  "--"
                  :
                  <i style={{ fontStyle: 'normal' }}>
                    {rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance > 0.0001 ? this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].symbol0balance, 4) : "0.0000"}
                  </i>
              }
            </span>
          </div>
          {/* <div className={ amount0Focus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus }>
            <div className={ isMobile == 2 ? classes.bxhicosl:classes.bxhicosl_pc }>
              <img src={pool.symbol0ImgURl} />
              <em>{pool.symbol0}</em>
            </div>
            <div>
              { this.renderAssetInput1() }
            </div>

          </div> */}
          <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus} >
            {this.renderAssetInput1()}
            <div className={classes.bxhicosl} >
              <span className={classes.bxhmax} onClick={() => { this.MaxValue0() }}>MAX</span>
              <span onClick={() => { this.onclickupchange() }}>
                {/* {
                  !upNoImg?
                  <img src={pool && pool.symbol0ImgURl ? pool.symbol0ImgURl : require('../../assets/bxh/BXHtong.png')} onError={() => { this.handleImageErrored("up") }}/>
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} />
                } */}
                <DefaultImage key={pool.symbol0} src={pool && pool.symbol0ImgURl ? pool.symbol0ImgURl : require('../../assets/bxh/BXHtong.png')} />
                {pool && pool.symbol0 ? pool.symbol0 : t('BXH.dhtongzheng')}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#48587B"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </span>
            </div>
          </div>
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
              {
                bottomSelecting ?
                  "--"
                  :
                  <i style={{ fontStyle: 'normal' }}>
                    {rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance > 0.0001 ? this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].symbol1balance, 4) : "0.0000"}
                  </i>
              }

            </span>
          </div>
          {/* <div className={amount1Focus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus}>
            <div className={isMobile == 2 ? classes.bxhicosl : classes.bxhicosl_pc}>
              <img src={pool.symbol1imgURl} />
              <em>{pool.symbol1}</em>
            </div>
            <div>
              {this.renderAssetInput2()}
            </div>
          </div> */}
          <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus}>
            {this.renderAssetInput2()}
            <div className={classes.bxhicosl}>
              <span className={classes.bxhmax} onClick={() => { this.MaxValue1() }}>MAX</span>
              <span onClick={() => { this.onclickbottomchange() }}>
                {/* {
                  !bottomNoImg?
                  <img src={pool && pool.symbol1imgURl ? pool.symbol1imgURl : require('../../assets/bxh/BXHtong.png')} onError={() => { this.handleImageErrored("bottom") }}/>
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} />
                } */}
                <DefaultImage key={pool.symbol1} src={pool && pool.symbol1imgURl ? pool.symbol1imgURl : require('../../assets/bxh/BXHtong.png')} />
                {pool && pool.symbol1 ? pool.symbol1 : t('BXH.dhtongzheng')}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#48587B"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </span>
            </div>
          </div>
        </div>

        <div className={classes.bxhjghei}></div>
        {/* 价格 */}
        <div>
          {
            isCanShow && isHave ?
              <div className={classes.bxhjgfen}>
                <span>{t('BXH.jiagetitle')}</span>
                {
                  isReserve ?
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? numberDecimal(parseFloat(tokenCalculaResult[0].tokens[0].tokenB / tokenCalculaResult[0].tokens[0].tokenA)) : "0"} &nbsp;
                      {pool ? pool.symbol1 + " per " + pool.symbol0 : ""}
                    </em>
                    :
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? numberDecimal(parseFloat(tokenCalculaResult[0].tokens[0].tokenA / tokenCalculaResult[0].tokens[0].tokenB)) : "0"} &nbsp;
              {pool ? pool.symbol0 + " per " + pool.symbol1 : ""}
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
            isCanShow && isHave ?
              <div>
                <span>
                  {t('BXH.yujititle')}
                  <img src={require('../../assets/bxh/wenti.png')} />
                </span>
                <em>
                  {
                    tokenCalculaResult && currentAmountSymbol0 && numberDecimal(parseFloat((currentAmountSymbol0 / tokenCalculaResult[0].tokens[0].reserveA) * 100)) > 0.01 ?
                      numberDecimal(parseFloat((currentAmountSymbol0 / (parseFloat(tokenCalculaResult[0].tokens[0].reserveA) + parseFloat(currentAmountSymbol0))) * 100)) + "%"
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
            token0AllowanceAmount == 0 && token1AllowanceAmount == 0 ?
              // 两个token都为授权
              <div>
                <div className={classes.approvalparent}>
                  {
                    //token0授权按钮
                    pool.symbol0Address && token0AllowanceAmount == 0 && pool.symbol0 != 'HT' ?
                      <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                      :
                      null
                  }
                  {
                    //token1授权按钮
                    pool.symbol1Address && token1AllowanceAmount == 0 && pool.symbol1 != 'HT' ?
                      <div className={classes.bxhbottomApproval1} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                      :
                      null
                  }
                </div>

                {/* 确认按钮  是否可以点击isConfirmBtnAble  按钮显示的文字 txConfirmBtn*/}
                <div className={isConfirmBtnAble ? classes.bxhbottom : classes.bxhbottomUnAbleClick} onClick={() => { this.onAddLiquidity() }}>{txConfirmBtn}</div>
              </div>
              :
              //有一个或者没有需要授权的按钮
              <div className={classes.approvalparent}>
                {
                  pool.symbol0Address && token0AllowanceAmount == 0 && pool.symbol0 != 'HT' ?
                    <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{approve0Title} {pool.symbol0}</div>
                    :
                    null
                }
                {
                  pool.symbol1Address && token1AllowanceAmount == 0 && pool.symbol1 != 'HT' ?
                    <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove1() }}>{approve1Title} {pool.symbol1}</div>
                    :
                    null
                }
                {/* bxhbottomUnAbleClickflex2 可点击 */}
                {/* bxhbottomUnAbleClickflex 不可点击 */}
                <div className={isConfirmBtnAble ? classes.bxhbottomUnAbleClickflex2 : classes.bxhbottomUnAbleClickflex} onClick={() => { this.onAddLiquidity() }}>{txConfirmBtn}</div>
              </div>
          }
        </div>



      </div>
    )
  }

  handleImageErrored(direction) {
    if (direction === 'up') {
      this.setState({ upNoImg: true });
    } else {
      this.setState({ bottomNoImg: true });
    }
  }


  renderAllTokensAllowance = () => {

  }


  renderMyLiquidity = () => {
    const { classes, t } = this.props
    const { myAllLiquidity } = this.state
    // console.log("myAllLiquidity----->>>>>>>",myAllLiquidity)
    return (
      <div>
        {
          myAllLiquidity ?
            myAllLiquidity.length > 0 ?
              this.renderYouPostion()
              :
              <div style={{ textAlign: 'center', opacity: '0.6' }}>
                <img src={require('../../assets/bxh/emptydata.png')} alt="" style={{ width: '40px', marginTop: '30px' }} />

                <div style={{ fontSize: '13px', marginTop: '10px', marginBottom: '40px', color: 'rgba(255,255,255,0.6)' }}>
                  {t('BXH.zhaobudaoliudongxing')}，<span style={{ borderBottom: '1px solid #93C4AA', color: '#93C4AA' }} onClick={() => { this.toAddLiquidity2() }}>{t('BXH.dianjitianjia')}</span>
                </div>
              </div>
            :
            <div className={classes.stateTrans}>
              <img src={require('../../assets/bxh/send.png')} alt='' className='stateTransImagecreate' />
              <div style={{ marginTop: '10px', marginBottom: '30px' }}>loading...</div>
            </div>
        }
      </div>
    )
  }
  renderYouPostion = () => {
    const { classes, t } = this.props
    const { myAllLiquidity } = this.state
    return (
      <div className={classes.youPostion}>
        {/* <div className={classes.bxhcwtit1}>
          <img src={require('../../assets/bxh/Fill.png')} />
          {t('BXH.minecangweititle')}
        </div> */}
        {
          myAllLiquidity.map((obj, idx) => {
            return this.renderYouPositionItem(obj, idx);
          })
        }
      </div>
    )
  }
  renderYouPositionItem = (obj, idx) => {
    const { classes, t } = this.props
    const { curSelectPoolindex, NeedAproveval } = this.state
    const selected = obj.selected
    return (
      <div className={classes.cardRow} key={idx}>
        <div className={classes.cardRowHeader} onClick={() => { this.changeitemShow(idx) }}>
          <div className={classes.cardRowLeft}>
            <div style={{ width: '36px', height: '22px', position: 'relative' }}>
              <DefaultImage key={obj.symbol0} src={obj.symbol0ImgURl} alt='' className={classes.coinLogo} style={{ left: '0' }} />
              <DefaultImage key={obj.symbol1} src={obj.symbol1imgURl} alt='' className={classes.coinLogo} style={{ right: '0' }} />
            </div>
            <div className={classes.cardRowLeftName}>
              {obj.symbol0}<span>/{obj.symbol1}-LP</span>
            </div>
          </div>
          <div className={classes.cardRowRight}>
            {/* {obj.myLpAmount} */}
            <img src={require('../../assets/bxh/down.png')} alt='' style={{ transform: 'rotate(' + (selected ? '180' : '0') + 'deg)', marginLeft: '5px', width: '9px', height: '6px' }} />
          </div>
        </div>
        {
          selected ?
            (
              <div className={classes.cardRowContent}>

                <div className={classes.cardRowContentItem}>
                  <div className={classes.cardRowContentItemAccounted}>
                    {t('BXH.minelptitle')}
                  </div>
                  {
                    obj.myLpAmount ?
                      <div>
                        {_getValuemultip(obj.myLpAmount, 1, 8)}
                        {/* <img src={require('../../assets/bxh/down.png')} alt='' style={{ transform: 'rotate(' + (selected ? '180' : '0') + 'deg)', marginLeft: '5px', width: '9px', height: '6px' }} /> */}
                      </div>
                      :
                      <img src={require('../../assets/bxh/send.png')} alt='' className='stateTransImage' />
                  }
                </div>

                <div className={classes.cardRowContentItem}>
                  <div className={classes.cardRowContentItemAccounted}>
                    {t('BXH.fenezhanbi')}
                  </div>
                  <span>{obj.lpzanbi ? _getValuemultip(obj.lpzanbi, 100, 4) >= 0.001 ? _getValuemultip(obj.lpzanbi, 100, 4) : "<0.001" : <img src={require('../../assets/bxh/send.png')} alt='' className='stateTransImage' />}{obj.lpzanbi ? '%' : ""}</span>
                </div>
                <div className={classes.cardRowContentItem}>
                  <div className={classes.cardRowContentItemTitle}>
                    <DefaultImage key={obj.symbol0} src={obj.symbol0ImgURl} alt='' />
                    {obj.symbol0}
                  </div>
                  {
                    obj.lptotoken0Amount ?
                      <span>{_getValuemultip(obj.lptotoken0Amount, 1, 8)}</span>
                      :
                      <img src={require('../../assets/bxh/send.png')} alt='' className='stateTransImage' />
                  }
                </div>
                <div className={classes.cardRowContentItem}>
                  <div className={classes.cardRowContentItemTitle}>
                    <DefaultImage key={obj.symbol1} src={obj.symbol1imgURl} alt='' />
                    {obj.symbol1}
                  </div>
                  {
                    obj.lptotoken1Amount ?
                      <span>{_getValuemultip(obj.lptotoken1Amount, 1, 8)}</span>
                      :
                      <img src={require('../../assets/bxh/send.png')} alt='' className='stateTransImage' />
                  }

                </div>

                <div className={classes.cardRowContentBtn}>

                  <div className={classes.cardRowContentBtnAdd} onClick={() => { this.toAddLiquidity(obj) }}>+ Liquidity</div>
                  {/* <div className={classes.cardRowContentBtnStaked} onClick={() => { this.navigateBXHStakePC(obj) }}>+ Staked</div> */}
                  {
                    curSelectPoolindex == idx && NeedAproveval || obj.removeLiquidityAllowanceAmount <= 0 ?
                      <div className={classes.cardRowContentBtnReduce} onClick={() => { this.onAllowanceRemoveLiquidity(obj) }}>Approve</div>
                      :
                      <div className={classes.cardRowContentBtnReduce} onClick={() => { this.showRemoveliquidityDialog(obj, idx) }}>- Liquidity</div>
                  }

                </div>
              </div>
            ) : null
        }
      </div>
    )
  }

  onAllowanceRemoveLiquidity = (pool) => {
    //BXHALLOWANCEREMOVELIQUIDITY

    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve" })
    const { rewardBXHFactory, needRemoveLiquidityPool, msgContent } = this.state
    dispatcher.dispatch({ type: BXHALLOWANCEREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: pool, msgContent: "Approve" } })
  }

  showRemoveliquidityDialog = (pool, idx) => {
    this.setState({ isShowRemoveLiquidity: true, needRemoveLiquidityPool: pool, curSelectPoolindex: idx })
  }

  changeitemShow = (index) => {
    // console.log("点击了---->>>>>>",index)
    let currentList = this.state.myAllLiquidity

    for (let i = 0; i < currentList.length; i++) {
      if (i !== index) {
        currentList[i].selected = false
      }
    }
    // var currentState = currentList[index].selected
    // console.log("currentState---->>>>>>>",currentState)
    currentList[index].selected = !currentList[index].selected

    this.renderYouPostion()
  }

  toAddLiquidity = (data) => {
    this.setState({ pool: data, currentShowType: 1 })
    store.setStore({ rewardBXHTokens: this.state.pool })
    this.getTwoTokenInfo(data)
  }

  navigateBXHStakePC = (rewardPool) => {
    store.setStore({ currentdTradePool: rewardPool })
    this.props.history.push('/bxhstakepc')
  }
  toAddLiquidity2 = () => {
    const pool_address = store.getStore("pool_address")
    const router_address = store.getStore("router_address")
    const factory_address = store.getStore("factory_address")
    let pool_tem = {
      symbol0ImgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/HT.png",
      symbol0: "HT",
      symbol0Address: "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
      decimals0: 18,
      balance0: 0,
      pool_address: pool_address,
      router_address: router_address,
      factory_address: factory_address,
      lptokenAddress: null,
      symbol1: '',
      symbol1Address: '',
      decimals1: 0,
      balance1: 0,
      symbol1imgURl: "",
    }
    this.setState({ pool: pool_tem, currentShowType: 1 })
  }

  onclickupchange = () => {
    this.setState({ modalPass: true })
  }
  onclickbottomchange = () => {
    // console.log("bottom show")
    this.setState({ modalPassbottom: true })
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
    const { t } = this.props
    this.setState({ lastInputPositionIsUp: true })
    const {
      pair,
      rewardBXHFactory,
      tokenCalculaResult, isHave, currentAmountSymbol0, currentAmountSymbol1, pool
    } = this.state

    let balance = rewardBXHFactory[0].tokens[0].symbol0balance && rewardBXHFactory[0].tokens[0].symbol0balance > 0.0001 ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let val = []
    val["currentAmountSymbol0"] = balance + ''
    this.setState(val)
    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (isHave) {
      if (parseFloat(balance0) >= parseFloat(val["currentAmountSymbol0"]) && parseFloat(balance1) >= _getValuemultip1(val["currentAmountSymbol0"], tokenCalculaResult && tokenCalculaResult[0].tokens ? tokenCalculaResult[0].tokens[0].bili_decimal : 0)) {
        if (balance > 0) {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }

      } else {
        if (val["currentAmountSymbol0"] !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    } else {
      if (pair && pair.symbol1Address && pair.symbol0Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
        if (parseFloat(balance0) >= currentAmountSymbol0 && parseFloat(balance1) >= currentAmountSymbol1) {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          if (val["currentAmountSymbol0"] !== "") {
            this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
          } else {
            this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
          }
        }
      } else {
        this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
      }

    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }
    if (!isHave) {
      this.setState({ currentShowType: 3 })
      this.state.isCanShow = true
      return;
    } else {
      this.setState({ currentShowType: 1 })
    }
    val["currentAmountSymbol1"] = this._getToolNumber(val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili_decimal)
    this.setState(val)

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
  }
  MaxValue1 = (assetId, type) => {
    const { t } = this.props
    this.setState({ lastInputPositionIsUp: false })
    const {
      pair,
      rewardBXHFactory,
      tokenCalculaResult, isHave, currentAmountSymbol0, currentAmountSymbol1, pool
    } = this.state

    let balance = rewardBXHFactory[0].tokens[0].symbol1balance && rewardBXHFactory[0].tokens[0].symbol1balance > 0.0001 ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"
    let val = []
    val["currentAmountSymbol1"] = balance + ''
    this.setState(val)
    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (isHave) {
      if (parseFloat(balance1) >= parseFloat(val["currentAmountSymbol1"]) && parseFloat(balance0) >= _getValueDivided1(val["currentAmountSymbol1"], tokenCalculaResult && tokenCalculaResult[0].tokens ? tokenCalculaResult[0].tokens[0].bili_decimal : 0)) {
        this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        if (balance > 0) {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      } else {
        if (val["currentAmountSymbol1"] !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    } else {
      if (parseFloat(balance0) >= currentAmountSymbol0 && parseFloat(balance1) >= currentAmountSymbol1) {
        this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
      } else {
        if (val["currentAmountSymbol0"] !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }
    if (!isHave) {
      this.setState({ currentShowType: 3 })
      this.state.isCanShow = true
      return;
    } else {
      this.setState({ currentShowType: 1 })
    }
    val["currentAmountSymbol0"] = this._getToolNumber(val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili_decimal)
    this.setState(val)

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
    // console.log("111111111111111111")
    this.setState({ lastInputPositionIsUp: true })
    const { t } = this.props
    // console.log("变1")
    let val = []
    const {
      pair,
      rewardBXHFactory,
      tokenCalculaResult,
      isBtnStateNnormal, btnTextContent, pool, isHave, currentAmountSymbol0, currentAmountSymbol1
    } = this.state
    val["currentAmountSymbol0"] = event.target.value
    this.setState(val)

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"

    // isConfirmBtnAble:false,
    // txConfirmBtn:""

    if (isHave) {
      if (tokenCalculaResult) {
        let bg2 = _getValuemultip1(val["currentAmountSymbol0"], tokenCalculaResult[0].tokens[0].bili_decimal)

        if (judgeSizeForNumber(balance0, event.target.value) && judgeSizeForNumber(balance1, bg2)) {

          if (event.target.value !== "0") {
            this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
          } else {
            this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
          }
        } else {
          // this.state.isBtnStateNnormal = false
          // console.log("2")
          // if (balance0 < event.target.value && pool) {
          //   this.state.btnTextContent = pool.symbol0
          // } else if (pool) {
          //   this.state.btnTextContent = pool.symbol1
          // }
          if (event.target.value !== "") {
            this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
          } else {
            this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
          }
        }
      }
    } else {
      // console.log("else0--->>>>>currentAmountSymbol1-->>>",currentAmountSymbol1)

      if (judgeSizeForNumber(balance0, event.target.value) && judgeSizeForNumber(balance1, currentAmountSymbol1)) {
        if (_getValuemultip1(event.target.value, 1) > 0) {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      } else {
        if (event.target.value !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    }

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    if (!isHave) {
      this.setState({ currentShowType: 3 })
      this.state.isCanShow = true
      return;
    } else {
      this.setState({ currentShowType: 1 })
    }
    val["currentAmountSymbol1"] = tokenCalculaResult && val["currentAmountSymbol0"] && val["currentAmountSymbol0"] != "" ? _getValuemultip1(val["currentAmountSymbol0"], tokenCalculaResult[0].tokens[0].bili_decimal) : ""

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

  }

  onChange1 = (value, event) => {
    // console.log("222222222222222")
    this.setState({ lastInputPositionIsUp: false })
    // console.log("变2")
    const { t } = this.props
    let val = []
    const {
      pair,
      rewardBXHFactory,
      tokenCalculaResult,
      pool,
      isHave, currentAmountSymbol0, currentAmountSymbol1
    } = this.state
    val["currentAmountSymbol1"] = event.target.value
    this.setState(val)

    // console.log("pair---->>>>",pool)
    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? pool && pool.symbol0 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol0balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol0balance, 0.01) : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? pool && pool.symbol1 !== "HT" ? rewardBXHFactory[0].tokens[0].symbol1balance : _getValueMinus(rewardBXHFactory[0].tokens[0].symbol1balance, 0.01) : "0"

    if (isHave) {
      let bg2 = _getValueDivided1(event.target.value, tokenCalculaResult && tokenCalculaResult[0].tokens && tokenCalculaResult[0].tokens[0].bili_decimal ? tokenCalculaResult[0].tokens[0].bili_decimal : 0)

      if (judgeSizeForNumber(balance0, bg2) && judgeSizeForNumber(balance1, event.target.value)) {
        if (event.target.value !== "0") {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }

      } else {

        if (event.target.value !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    } else {
      if (judgeSizeForNumber(balance1, event.target.value) && judgeSizeForNumber(balance0, currentAmountSymbol0)) {
        if (_getValuemultip1(event.target.value, 1) > 0) {
          this.setState({ isConfirmBtnAble: true, txConfirmBtn: t('BXH.confirmtitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      } else {
        if (event.target.value !== "") {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.yuebuzutitle') })
        } else {
          this.setState({ isConfirmBtnAble: false, txConfirmBtn: t('BXH.weishurutitle') })
        }
      }
    }



    // if (parseFloat(balance0) >= parseFloat(event.target.value) && parseFloat(balance1) >= _getValuemultip1(val["currentAmountSymbol0"], tokenCalculaResult[0].tokens[0].bili)) {
    //   this.setState({isConfirmBtnAble:true,txConfirmBtn:t('BXH.confirmtitle')})
    // } else {
    //   // this.state.isBtnStateNnormal = false
    //   // console.log("2")
    //   // if (balance0 < event.target.value && pool) {
    //   //   this.state.btnTextContent = pool.symbol0
    //   // } else if (pool) {
    //   //   this.state.btnTextContent = pool.symbol1
    //   // }
    //   this.setState({isConfirmBtnAble:false,txConfirmBtn:t('BXH.yuebuzutitle')})
    // }


    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"], val["currentAmountSymbol1"])
    if (!isHave) {
      this.setState({ currentShowType: 3 })
      this.state.isCanShow = true
      return;
    } else {
      this.setState({ currentShowType: 1 })
    }
    val["currentAmountSymbol0"] = tokenCalculaResult && val["currentAmountSymbol1"] && val["currentAmountSymbol1"] != "" ? _getValueDivided1(val["currentAmountSymbol1"], tokenCalculaResult[0].tokens[0].bili_decimal) : ""

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }
    // console.log("tokenCalculaResult--->>>>>>",tokenCalculaResult)

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

    if (pool && pool.symbol0Address && pool.symbol0Address != "") {
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

  }
  //判断token1授权额度是否足够
  onCheckAllowance1IsEnough = (amount0, amount1) => {
    const { pool, isAllowance0Enough, isAllowance1Enough } = this.state
    const { classes, t } = this.props
    if (!amount1 || amount1 === "" || amount1 === "0" || amount1 === "0.") {
      amount1 = "0"
    }

    if (pool && pool.symbol1Address && pool.symbol1Address != "") {
      store._getAllowanceCount(pool.symbol1Address, pool.router_address, amount1, pool.decimals1, (data) => {
        this.setState({ isAllowance1Enough: data.isEnough })
        if (data.isEnough) {
          this.setState({ token1AllowanceAmount: data.allow_decimals })
        } else {
          this.setState({ token1AllowanceAmount: 0, approve1Title: t('BXH.allowanceamountup') })
        }

      });
    }


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
    // console.log("rewardBXHFactory.mineLpAmount--->>>>>>>",rewardBXHFactory[0].tokens[0].mineLpAmount)
    return (
      <div className={classes.bxhCangwei}>
        <div className={classes.bxhcwtit}>
          <img src={require('../../assets/bxh/Fill.png')} />
          {t('BXH.minecangweititle')}
        </div>
        <div className={classes.bxhcwshumg}>
          <em>
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/HT%402x.png" className={classes.bxhmos1} />
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/USDT%402x.png" className={classes.bxhmos2} />
            <i>{pool ? pool.symbolPair : ""}</i>
          </em>
          <em>{rewardBXHFactory && rewardBXHFactory[0].tokens[0].mineLpAmount ?
            numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].mineLpAmount))
            :
            0.00}</em>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool ? pool.symbol0 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? _getValuemultip1(_getValueDivided1(rewardBXHFactory[0].tokens[0].mineLpAmount, rewardBXHFactory[0].tokens[0].poolTotal), tokenCalculaResult[0].tokens[0].reserveA) : "0"}</span>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool ? pool.symbol1 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? _getValuemultip1(_getValueDivided1(rewardBXHFactory[0].tokens[0].mineLpAmount, rewardBXHFactory[0].tokens[0].poolTotal), tokenCalculaResult[0].tokens[0].reserveB) : "0"}</span>
        </div>
      </div>
    )
  }


  nav = (pairData) => {
    store.setStore({ currentdTradePool1: pairData })
    this.props.history.push('/bxhTradeMobility')
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

export default withNamespaces()(withRouter(withStyles(styles)(CreateLiquidityPool)));
