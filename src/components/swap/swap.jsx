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
import Header from '../unlock/Header.jsx';
import Footer from '../unlock/Footer.jsx';
import Store from "../../stores";
import Huadian from '../bxhHuadian/bxhHuadian.jsx';
import ExchangeDialog from '../exchangeDialog/exchangeDialog.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import cookie from 'react-cookies'
import {
  numberDecimal,
  _getValuemultip1,
  _getValueDivided1,
  _getValueDivided3,
  _getValueAdd,
} from '../../config/constantFunction'
import PassDialog from '../passDialog/passDialog.jsx';

import Loader from '../loader'
import Snackbar from '../snackbar/snackbar'
import { debounce } from 'lodash'
import './duihuanDialog.css';
import getLangURLWithURL from '../../util/linkHelper';

import {
  ERROR,
  GET_BXHEXCHANGE_PERPETUAL,
  GET_BXHEXCHANGE_PERPETUAL_RETURNED,
  STAKESYMBOLTOKNES,
  STAKESYMBOLTOKNES_RETURNED,
  APPEXCHANGETOKENS,
  APPEXCHANGETOKENS_RETURNED,
  GET_WRAPTOKENS,
  GET_WRAPTOKENS_RETURNED,
  APPALLOWANCE,
  APPALLOWANCE_RETURNED,
  APPSWAPALLOWANCE,
  SEARCHSYBMOL,
  SEARCHSYBMOL_RETURNED,
  BXHBALANCE_RETURNED,
  BXHSWAPSYBMOL,
  BXHSWAPSYBMOL_RETURNED,
  BXHCHNAGEACCOUNT,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vw',
    [theme.breakpoints.up('sm')]: {
      minWidth: '480px',
      paddingTop: '65px',
    }
  },
  content: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      // position: 'absolute',
      // right: '50%',
      // width: '480px',
      // marginRight: '-350px',
      width: '480px',
      marginLeft: '260px',
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
      fontWeight: '500',
      [theme.breakpoints.up('sm')]: {
        fontSize: '20px',
        opacity: '.6',
        marginTop: '5px',
      }
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '30px',
    }
  },
  bxhtConter: {
    background: '#232641',
    borderRadius: '0 0 15px 15px',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      borderRadius: '15px',
    }
  },
  bxhttabs: {
    position: 'relative',
    display: 'none',
    marginBottom: '30px',
    '& span': {
      position: 'relative',
      display: 'block',
      fontSize: '15px',
      marginRight: '30px',
      fontWeight: '500',
    },
    '& i': {
      position: 'absolute',
      right: '0px',
    },
    '& img': {
      width: '15px',
      cursor: 'pointer',
      '&:hover': {
        opacity: '.8',
      }
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    }
  },
  TabOn: {
    color: '#EC5340',
    opacity: '1 !important',
    '& em': {
      display: 'block',
      position: 'absolute',
      background: '#EC5340',
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
      fontFamily: "consola",
      display: 'block',
      fontSize: '13px',
      fontWeight: 'bold',
    },
    '& em': {
      fontStyle: 'inherit',
      opacity: '.4',
      paddingRight: '5px',
    },
    '& i': {
      fontStyle: 'inherit',
      paddingLeft: '2px',
      opacity: '.8',
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
  bxhfield: {
    position: 'relative',
    width: '50%',
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
    '& span': {
      opacity: '.7',
    },
    '& em': {
      fontFamily: "consola",
      fontStyle: 'inherit',
    },
    '& img': {
      height: '14px',
      verticalAlign: 'middle',
      margin: '0 8px',
      cursor: 'pointer',
    },
  },
  bxhjiamt: {
    textAlign: 'center',
    paddingRight: '10px',
    margin: '15px 0 5px',
    '& img': {
      width: '30px',
      cursor: 'pointer',
      opacity: '.8',
    }
  },
  bxhjghei: {
    marginTop: '20px',
  },
  bxhbottom: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '30px 0 10px',
    cursor: 'pointer',
    '&:hover': {
      backgroundImage: 'linear-gradient(to right, #10754c, #1a9564)',
    }
  },
  bxhnotbottom: {
    height: '45px',
    lineHeight: '45px',
    background: '#4F5257',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '30px 0 10px',
  },
  bxhCangwei: {
    background: '#1C1E35',
    borderRadius: '12px',
    marginTop: '20px',
    padding: '8px 20px 20px',
    marginBottom: '30px',
  },
  bxhcwtit: {
    fontSize: '14px',
    '& img': {
      height: '14px',
      marginRight: '5px',
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
      opacity: '.8',
    },
    '& img': {
      width: '14px',
      marginLeft: '5px',
      verticalAlign: 'text-bottom',
      cursor: 'pointer',
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
  bxhbdxom: {
    color: '#35C288'
  },
  bxhtzlistbg: {
    position: 'fixed',
    background: '#0E0F11',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    opacity: '.8',
    zIndex: '9999',
  },
  bxhtzlistcont: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    background: '#262946',
    zIndex: '999999',
    borderRadius: '22px 22px 0 0',
    height: '350px',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
      left: '50%',
      marginLeft: '-150px',
      top: '50%',
      marginTop: '-230px',
      height: '480px',
      borderRadius: '22px',
    }
  },
  bxhtztitle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '20px 20px 0 20px',
  },
  bxhtzcolse: {
    '& img': {
      width: '15px',
      cursor: 'pointer',
      '&:hover': {
        opacity: '.8',
      }
    },
  },
  bxhtztcols: {
    width: '80%',
    fontSize: '17px',
    color: '#fff',
    fontWeight: '500',
    '& img': {
      width: '14px',
      marginLeft: '5px',
      cursor: 'pointer',
    },
  },
  bxhtzimliso: {
    padding: '20px',
  },
  BXHTokensInput: {
    background: '#1C1E22',
    borderRadius: '6px',
    paddingLeft: '15px',
    paddingRight: '10px',
    '& input': {
      fontFamily: "consola",
      fontSize: '14px',
      lineHeight: '25px',
      height: '25px',
      padding: '5px',
    }
  },
  bxhsyconter: {
    marginTop: '20px',
  },
  bxhsylist: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    lineHeight: '25px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  bxhsyname: {
    '& img': {
      width: '25px',
      verticalAlign: 'bottom',
      marginRight: '8px'
    },
    '& span': {
      display: 'inline-block',
      opacity: '.8',
      background: '#2EBC84',
      marginLeft: '10px',
      fontSize: '13px',
      lineHeight: '20px',
      padding: '0 8px',
      borderRadius: '8px',
    }
  },
  bxhtzsyscroll: {
    height: '220px',
    overflowY: 'scroll',
    marginTop: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '350px',
    }
  },
  pairlist: {
    borderTop: '1px solid rgba(151,151,151,0.1)',
    marginTop: '15px',
    textAlign: 'center',
    '& span': {
      display: 'inline-block',
      paddingTop: '15px',
      fontSize: '14px',
      opacity: '.8',
    },
    '& img': {
      width: '20px',
      height: '20px',
      verticalAlign: 'bottom',
      marginRight: '5px',
    },
    '& svg': {
      margin: '0 10px',
      verticalAlign: 'bottom',
    },
  },
  pairRoute: {
    textAlign: 'left',
    marginTop: '15px',
    opacity: '.8',
    fontSize: '13px',
    '& img': {
      width: '14px',
      height: '14px',
      cursor: 'pointer',
      marginLeft: '5px',
      verticalAlign: 'text-bottom',
    }
  },
  windowparent: {
    position: 'relative',
    display: 'flex',
    height: '56px',
    borderRadius: '15px 15px 0px 0px',
    background: '#292C4C',
    justifyContent: 'center',
    alignItems: 'center',
    '& i': {
      position: 'absolute',
      right: '20px',
    },
    '& img': {
      width: '15px',
      cursor: 'pointer',
    },
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
});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Swap extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const rewardBXHPools = store.getStore('rewardBXHPools')[0]
    const rewardSymbolList = store.getStore('rewardSymbolList')
    const rewardSymbolPrice = store.getStore('rewardSymbolPrice')
    localStorage.setItem("symbolHT", '1');

    const { t } = props;
    this.state = {
      rewardBXHPools: rewardBXHPools,
      rewardSymbolPrice: rewardSymbolPrice,
      rewardSwapSymbolPrice: [],
      loading: !(account && rewardBXHPools),
      rewardSymbolList: rewardSymbolList, // 选择通证列表
      searchSymbolList: rewardSymbolList,
      tokensListShow: false,  // 通证弹窗是否显示
      direction: '',  // 方向（选择币种时候传值，Form，To）
      formSymbol: {
        symbol: 'HT',
        address: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',  // HT主链地址为WHT地址
        decimals: 18,
        logoURI: 'https://bxh-images.s3.ap-east-1.amazonaws.com/coin/HT.png',
        balance: 0,
      }, // Form 币种
      toSymbol: [], // To 币种
      isReverse: false,//是否反转s
      currentRouter: null,//路由数组,可能为null
      reverseRouter: null,
      symbolStatus: 1,  // From、To兑换状态（1:From->To，2:To->From）
      formOnSymbol: '',  // 当前选中币种名称(form)
      toOnSymbol: '',  // 当前选中币种名称(to)
      formInputValue: '', // Form 输入框value
      toInputValue: '', // To 输入框value
      calcFormInputVal: '',//计算之后的Form val
      calcToInputVal: '',//计算之后的To val
      formOnFocus: 0,
      toOnFocus: 0,
      symbolInputValue: '', // 选择通证 输入框value
      point: '0.5', // 滑点大小（默认0.5%，千分之五）
      transactionTime: '20',  // 交易截止时间（默认20分钟）  
      priceStatus: 1, // 价格 后面的值状态（1: From or To 2:To or From）
      bottomStatus: 1,  // 按钮状态，默认是1 (0:兑换，1:输入金额，2:选择通证，4:Wrap，5:Unwrap)
      bottomValue: t('BXH.dhbottom1'),  // 按钮默认文案
      modalHuadian: false, // 是否显示滑点设置弹窗
      settingStorage: 0,  // 状态： 1 专家模式 0 普通模式
      modalExchange: false, // 点击兑换后弹窗
      modalSend: false,  // 合约调用后弹窗
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalMesage: false, // 提示弹窗
      txHash: '',
      msgContent: '',
      priceChange: '<0.01%',
      switchStatus: 1,  // 是否点击中间切换箭头（1未点击，2点击正在切换中）
      isMobile: 1,
      isMax: 1, // 是否点击Max按钮（1未点击 2点击）
      isStatusValue: 0, // 输入框默认状态（0未点击， 1输入内容）
      isStatusInput: '', // 输入框状态（''初始化 1：from输入内容 2:to输入内容）
      isMaxInput: '',
      isSwapStatus: 1, // 兑换状态（1:显示兑换 2:兑换按钮转圈）
      reservesPrice: [],
      reservesSuan: [],
      nameArray: [],
      reservesStatus: 1,
      symbolAlloWance: 0,  // 是否需要授权
      liquidity: 1,   // 流动性是否充足(0流动性不足，否则流动性充足)
      valueOneFromInput: '',
      valueOneToInput: '',
      valuePriceMath: "",
      priceMath: "",
      notImages: false,
      notFromImages: false,
      notToImages: false,
      footerMShow: true,
      wHeight: '',
    }

    dispatcher.dispatch({ type: GET_BXHEXCHANGE_PERPETUAL, content: {} })
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    emitter.on(GET_WRAPTOKENS_RETURNED, this.showHash); // 点击合约确认后，头部滚动条、合约调用成功后提示
    emitter.on(BXHSWAPSYBMOL_RETURNED, this.symbolSwapPrice); // 定时更新币种、价格变化
    emitter.on(APPALLOWANCE_RETURNED, this.showHash); // 授权调用成功后提示
    emitter.on(APPSWAPALLOWANCE, this.showAllowance); // 授权调用成功后

    emitter.on(GET_BXHEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);
    emitter.on(STAKESYMBOLTOKNES_RETURNED, this.balancesReturned);
    emitter.on(SEARCHSYBMOL_RETURNED, this.resultSearch); // 搜索通证列表
    emitter.on(BXHBALANCE_RETURNED, this.resultBalance); // 成功后更新余额
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户

    // 状态： 1 专家模式 0 普通模式
    // let setting = localStorage.getItem("setting")
    // if(setting === '1'){
    //   this.setState({
    //     settingStorage: 1
    //   })
    // }
  }

  componentWillUnmount() {
    this.stopTimer();
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(GET_WRAPTOKENS_RETURNED, this.showHash); // 点击合约确认后，头部滚动条、合约调用成功后提示
    emitter.removeListener(BXHSWAPSYBMOL_RETURNED, this.symbolSwapPrice); // 定时更新币种、价格变化
    emitter.removeListener(APPALLOWANCE_RETURNED, this.showHash); // 授权调用成功后提示
    emitter.removeListener(APPSWAPALLOWANCE, this.showAllowance); // 授权调用成功后

    emitter.removeListener(GET_BXHEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);
    emitter.removeListener(STAKESYMBOLTOKNES_RETURNED, this.balancesReturned);
    emitter.removeListener(SEARCHSYBMOL_RETURNED, this.resultSearch); // 搜索通证列表
    emitter.removeListener(BXHBALANCE_RETURNED, this.resultBalance); // 成功后更新余额
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    this.setState = (state, callback) => {
      return;
    }
  };

  changeAccount = () => {
    dispatcher.dispatch({ type: GET_BXHEXCHANGE_PERPETUAL, content: {} })
  }

  componentDidMount() {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    setTimeout(this.iTimer, 0);

    // 监听到返回事件，注意，只有触发了返回才会执行这个方法
    // window.addEventListener('popstate',(state) => {
    //   document.documentElement.scrollTop = document.body.scrollTop = 0;
    // })
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

  resultBalance = (from, to) => {
    const { t } = this.props;
    setTimeout(() => {
      this.setState({
        modalSend: false,
        formSymbol: from,
        toSymbol: to,
        formInputValue: '',
        toInputValue: '',
        bottomStatus: 1,
        bottomValue: t('BXH.dhbottom1'),
      })
    })
  }

  balancesReturned = (rewardSymbolList) => {
    const rewardPools = store.getStore('rewardBXHPools')[0]
    this.setState({ rewardBXHPools: rewardPools })
    const that = this

    setTimeout(() => {
      that.setState({
        rewardSymbolList: rewardSymbolList,
        searchSymbolList: rewardSymbolList,
        formSymbol: rewardSymbolList ? rewardSymbolList[0] : null,  // 把数组里第一个值HT余额赋值
      })
    })
    // if (localStorage.getItem("symbolHT") === '1') {
    //   localStorage.setItem("symbolHT", '2');
    //   setTimeout(() => {
    //     that.setState({
    //       rewardSymbolList: rewardSymbolList,
    //       searchSymbolList: rewardSymbolList,
    //       formSymbol: rewardSymbolList ? rewardSymbolList[0] : null,  // 把数组里第一个值HT余额赋值
    //     })
    //   })
    // } else {
    //   setTimeout(() => {
    //     that.setState({
    //       rewardSymbolList: rewardSymbolList,
    //       searchSymbolList: rewardSymbolList,
    //       formSymbol: this.state.formSymbol ? this.state.formSymbol : null,
    //     })
    //   })
    // }
  }

  resultSearch = (rewardSymbolList) => {
    const that = this
    that.setState({
      rewardSymbolList: rewardSymbolList,
    })
  }

  showHash = (hash) => {
    setTimeout(() => {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: hash, isMax: 1 })
    }, 2000)
  };

  showAllowance = () => {
    setTimeout(() => {
      this.setState({ symbolAlloWance: 10000000000 })
    }, 1000)
  }

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };

  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  timer = null;
  // 定时器
  iTimer = () => {
    this.stopTimer();
    const that = this;

    this.timer = setInterval(() => {
      this.refreshPrice()
      if (!this.checkIsCanShowBalance()) {
        const { formInputValue, toInputValue, point, formSymbol, toSymbol } = this.state
        let parameter = [], fromValue = formInputValue, toValue = toInputValue
        parameter = [{
          formSymbol: formSymbol,
          toSymbol: toSymbol,
          point: point,
          fromValue,
          toValue,
        }]
        this.checkRouter(parameter, formSymbol, toSymbol)
      }
    }, 5000);
  }
  refreshPrice = () => {
    const that = this;
    const { symbolStatus, formSymbol, toSymbol, point, formInputValue, toInputValue } = that.state

    if (formSymbol.length !== 0 && toSymbol.length !== 0) {
      // 计算价格
      if (symbolStatus === 1) {
        this.getInputReservesPrice(formSymbol, toSymbol, formInputValue, '')
      } else {
        this.getInputReservesPrice(formSymbol, toSymbol, '', toInputValue)
      }

      // const { point } = that.state
      // let parameter = []
      // if(symbolStatus === 1){
      //   parameter = [{
      //     formSymbol: formSymbol,
      //     toSymbol: toSymbol,
      //     point: point,
      //     formInputValue: formInputValue,
      //     toInputValue: toInputValue,
      //     fromValue: formInputValue,
      //     toValue: toInputValue,
      //   }]
      // }else{
      //   parameter = [{
      //     formSymbol: formSymbol,
      //     toSymbol: toSymbol,
      //     point: point,
      //     formInputValue: '',
      //     toInputValue: toInputValue,
      //     fromValue: '',
      //     toValue: toInputValue,
      //   }]
      // }

      // setTimeout(function () {
      //   dispatcher.dispatch({ type: BXHSWAPSYBMOL, content: { parameter: parameter, router: that.state.currentRouter } })
      // }, 1);
    }
  }
  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  renderSendModal = () => {
    const { rewardSymbolPrice, modalSendType, txHash, msgContent } = this.state
    const fromPrice = numberDecimal(rewardSymbolPrice.fromPrice)
    const toPrice = numberDecimal(rewardSymbolPrice.toPrice)
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }

  // renderSymbolList = () => {
  //   const {  } = this.state

  //   return (
  //       <SymbolList onClose={ this.onCloseSymbol }  />
  //   )
  // }
  // onCloseSymbol = () => {
  //   this.setState({ tokensListShow: false })
  // }

  sortNumber = (property, symbol) => {
    return function (a, b) {
      if (b[symbol] !== 'HT') {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }
  }

  render() {
    const { classes, t } = this.props;
    const { loading, modalHuadian, modalSend, isMobile, rewardSymbolList, tokensListShow, footerMShow } = this.state

    return (
      <div className={classes.root}>
        <Header />

        <div className={classes.content}>
          <div className={classes.bxhtTit}>
            <h2>{t('BXH.dhtitle1')}</h2>
            <h3>{t('BXH.dhtitle2')}</h3>
          </div>

          <div className={classes.windowparent}>
            <div className={classes.windowparentContent}>
              <div style={{ backgroundImage: 'linear-gradient(360deg, #2EBC84 0%, #35C288 100%)' }}>{t('BXH.dhduihuan')}</div>
              <div style={{ opacity: '0.8' }} onClick={() => { this.navigateStake() }}>{t('BXH.zijinchititle')}</div>
              <i onClick={this.onOpenHuadian} >
                <img src={require('../../assets/bxh/setting.png')} />
              </i>
            </div>
          </div>
          <div className={classes.bxhtConter}>
            <div className={classes.bxhttabs}>
              <span>{t('BXH.dhduihuan')}</span>
              <i onClick={this.onOpenHuadian} >
                <img src={require('../../assets/bxh/setting.png')} />
              </i>
            </div>
            {/* 兑换 */}
            {this.renderDuihuan()}
          </div>

          {/* 滑点切换 */}
          {modalHuadian && this.renderHuadianModal()}

          {/* 数量、价格变动、提供者费用 */}
          {this.renderPrice()}

          {/* 选择通行证列表 */}
          {this.state.tokensListShow ? this.renderTokenList() : null}
        </div>

        { modalSend && this.renderSendModal()}
        {/* { loading && <Loader /> } */}

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


  // 兑换
  renderDuihuan = () => {
    const { classes, t } = this.props
    const { switchStatus } = this.state

    return (
      <div>
        {/* From */}
        { this.renderFromSymbol()}

        {/* 把From 和 To 币种互换 */}
        <div className={classes.bxhjiamt}>
          <img src={require('../../assets/bxh/jtou1.png')} onClick={() => { this.symbolExchange() }} />
        </div>

        {/* To */}
        { this.renderToSymbol()}

        {/* 价格、滑点大小 */}
        { this.renderPoint()}

        {/* 兑换按钮 */}
        { this.renderBottom()}

      </div>
    )
  }

  // From 币种信息、输入框
  renderFromSymbol = () => {
    const { classes, t } = this.props
    const {
      rewardBXHPools,
      formSymbol,
      toSymbol,
      symbolStatus,
      toInputValue,
      formOnFocus,
      isMax,
      notFromImages,
    } = this.state
    const asset = rewardBXHPools.tokens[0]

    return (
      <div className={classes.bxhcfetm}>
        <div className={classes.bxhshuruks}>
          <span>From
            {
              symbolStatus === 2 ?
                <i>(estimated)</i> : null
            }
          </span>
          <span>
            <em>{t('BXH.dhbalance')}:</em>
            {
              this.checkIsCanShowBalance() ?
                formSymbol && formSymbol.balance ? this.SaveToTwoWei(formSymbol.balance, 4) : '--'
                :
                '--'
            }

          </span>
        </div>
        <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus} >
          {this.renderAssetInput1(asset, 'stake1')}
          {
            formSymbol && formSymbol.symbol ?
              // 已经选择通证
              <div className={classes.bxhicosl} >
                {
                  isMax === 1 ?
                    <span className={classes.bxhmax} onClick={() => { this.MAXBalance() }}>MAX</span>
                    :
                    null
                }
                <span onClick={(e) => { this.tokenListStatus(e, 'Form') }}>
                  {
                    !notFromImages ?
                      <img src={formSymbol && formSymbol.logoURI ? formSymbol.logoURI : require('../../assets/bxh/BXHtong.png')} />
                      :
                      <img src={require('../../assets/bxh/BXHtong.png')} />
                  }
                  {formSymbol && formSymbol.symbol}
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#48587B" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
                </span>
              </div>
              :
              // 未选择通证
              <div className={classes.bxhicosl} onClick={(e) => { this.tokenListStatus(e, 'Form') }}>
                <img src={require('../../assets/bxh/BXHtong.png')} />
                {t('BXH.dhtongzheng')}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </div>
          }
        </div>
      </div>
    )
  }

  checkIsCanShowBalance = () => {
    const { formSymbol, toSymbol, reservesPrice, router, reverseRouter } = this.state
    if (formSymbol && formSymbol.length !== 0 && toSymbol && toSymbol.length === 0) {
      return true
    } else if (formSymbol && formSymbol.length === 0 && toSymbol.length !== 0) {
      return true
    }
    else {
      // return router&&reverseRouter&&router.length>0&&reverseRouter.length>0&&reservesPrice

      if (router && router.length > 0 && reservesPrice) {
        return true
      } else if (reverseRouter && reverseRouter.length > 0 && reservesPrice) {
        return true
      }

      return false
    }
  }

  // To 币种信息、输入框
  renderToSymbol = () => {
    const { classes, t } = this.props
    const {
      rewardBXHPools,
      formSymbol,
      toSymbol,
      symbolStatus,
      formInputValue,
      toOnFocus,
      notToImages,
    } = this.state
    const asset = rewardBXHPools.tokens[0]
    

    return (
      <div className={classes.bxhcfetm}>
        <div className={classes.bxhshuruks}>
          <span>To
            {
              symbolStatus === 1 ?
                <i>(estimated)</i> : null
            }
          </span>
          <span>
            <em>{t('BXH.dhbalance')}:</em>
            {
              this.checkIsCanShowBalance() ?
                toSymbol && toSymbol.balance ? this.SaveToTwoWei(toSymbol.balance, 4) : '--'
                :
                '--'
            }

          </span>
        </div>
        <div className={toOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus}>
          {this.renderAssetInput2(asset, 'stake2')}
          {
            toSymbol && toSymbol.symbol ?
              // 已经选择通证
              <div className={classes.bxhicosl} onClick={(e) => { this.tokenListStatus(e, 'To') }}>
                {
                  !notToImages ?
                    <img src={toSymbol && toSymbol.logoURI ? toSymbol.logoURI : require('../../assets/bxh/BXHtong.png')} />
                    :
                    <img src={require('../../assets/bxh/BXHtong.png')} />
                }
                {toSymbol && toSymbol.symbol}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </div>
              :
              // 未选择通证
              <div className={classes.bxhicosl} onClick={(e) => { this.tokenListStatus(e, 'To') }}>
                <img src={require('../../assets/bxh/BXHtong.png')} />
                {t('BXH.dhtongzheng')}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </div>
          }
        </div>
      </div>
    )

  }

  // From 输入
  renderAssetInput1 = (asset, type) => {
    const { classes, t } = this.props
    const { formSymbol, formInputValue } = this.state
    const amountError = this.state[asset.id + '_' + type + '_error']
    let formValue
    if (formInputValue === 'NaN') {
      formValue = ''
    } else {
      formValue = formInputValue
    }

    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          className={classes.bxhInput}
          id={'' + asset.id + '_' + type}
          value={formValue || ''}
          error={amountError}
          onChange={this.onChangeFrom.bind(this, formSymbol && formSymbol.balance ? (Math.floor(formSymbol.balance * 10000) / 10000) : '0.00')}
          onFocus={this.onFocusFrom.bind()}  // 获得焦点
          onBlur={this.onBlurFrom.bind()} // 失去焦点
          placeholder="0.00"
          variant="outlined"
          inputProps={{
            pattern: "^[0-9]*[.]?[0-9]*$",
            inputMode: 'decimal',
            autoComplete: 'off' // 禁掉自动填充
          }}
        />
      </div>
    )
  }

  // To 输入
  renderAssetInput2 = (asset, type) => {
    const { classes, t } = this.props
    const { toSymbol, toInputValue } = this.state
    const amountError = this.state[asset.id + '_' + type + '_error']
    let toValue
    if (toInputValue === 'NaN') {
      toValue = ''
    } else {
      toValue = toInputValue
    }

    return (
      <div className={classes.bxhfield} style={{ width: '60%' }}>
        <TextField
          fullWidth
          className={classes.bxhInput}
          style={{ right: '0px' }}
          id={'' + asset.id + '_' + type}
          value={toValue || ''}
          error={amountError}
          onChange={this.onChangeTo.bind(this, toSymbol && toSymbol.balance ? (Math.floor(toSymbol.balance * 10000) / 10000) : '0.00')}
          onFocus={this.onFocusTo.bind()}  // 获得焦点
          onBlur={this.onBlurTo.bind()} // 失去焦点
          placeholder="0.00"
          variant="outlined"
          inputProps={{
            pattern: "^[0-9]*[.]?[0-9]*$",
            inputMode: 'decimal',
            autoComplete: 'off' // 禁掉自动填充
          }}
        />
      </div>
    )
  }

  // 价格、滑点大小
  renderPoint = () => {
    const { classes, t } = this.props
    const {
      bottomStatus,
      point,
      priceStatus,
      calcFormInputVal,
      calcToInputVal,
      isSwapStatus,
      reservesSuan,
      liquidity,
      reservesPrice,
      formSymbol,
      toSymbol,
      isReverse,
      formInputValue,
      toInputValue
    } = this.state
    return (
      <div>
        {
          // 流动性是否充足
          liquidity !== 0 && (calcFormInputVal && calcToInputVal) && isSwapStatus === 1 && formInputValue !== '0.000000000000' && toInputValue !== '0.000000000000' ?
            <div>
              {
                bottomStatus === 0 ?
                  <div className={classes.bxhjghei}>
                    <div className={classes.bxhjgfen}>
                      <span>{t('BXH.dhprice')}</span>
                      {
                        priceStatus === 1 ?
                          <em>
                            <i onClick={() => { this.onPriceStatus(2) }}>
                              <img src={require('../../assets/bxh/ziyuan.png')} />
                            </i>
                            {calcFormInputVal && calcToInputVal ? numberDecimal(_getValueDivided1(calcFormInputVal, calcToInputVal)) : "0.00"}&nbsp;{formSymbol.symbol} per {toSymbol.symbol}
                          </em>
                          :
                          <em>
                            <i onClick={() => { this.onPriceStatus(1) }}>
                              <img src={require('../../assets/bxh/ziyuan.png')} />
                            </i>
                            {calcFormInputVal && calcToInputVal ? numberDecimal(_getValueDivided1(calcToInputVal, calcFormInputVal)) : '0.00'}&nbsp;{toSymbol.symbol} per {formSymbol.symbol}
                          </em>
                      }
                    </div>
                    <div className={classes.bxhjgfen}>
                      <span>{t('BXH.dhSlippage')}</span>
                      <em>{point}%</em>
                    </div>
                  </div>
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

  // 兑换按钮
  renderBottom = () => {
    const { classes, t } = this.props
    const {
      rewardSymbolPrice,
      formSymbol,
      formInputValue,
      toSymbol,
      toInputValue,
      bottomStatus,
      bottomValue,
      point,
      modalExchange,
      symbolStatus,
      isSwapStatus,
      reservesPrice,
      symbolAlloWance,
      liquidity,
      priceMath,
      settingStorage,
    } = this.state
    let formInputmaiAdd, formInputmaiValue
    if (formInputValue) {
      formInputmaiAdd = _getValueAdd(formInputValue, formInputValue * 0.003)
      formInputmaiValue = _getValueAdd(formInputmaiAdd, _getValueDivided1(_getValuemultip1(formInputValue, point), 100))
    }

    return (
      <div>
        {/* 1:输入金额、2:选择通证 */}
        {
          bottomStatus === 1 || bottomStatus === 2 ?
            <div className={classes.bxhnotbottom}>
              <div>{bottomValue}</div>
            </div>
            :
            <div>
              {
                // 流动性不足
                liquidity === 0 ?
                  <div className={classes.bxhnotbottom}>
                    <div>{t('BXH.dhliquidity')}</div>
                  </div>
                  :
                  <div>
                    {symbolAlloWance === '0' ?
                      // 授权
                      <div className={classes.bxhbottom}>
                        <div onClick={() => { this.onApprove() }}>{t('BXH.dhAuthorization')}</div>
                      </div>
                      :
                      <div>
                        {
                          formInputValue !== "" && toInputValue !== "" ?
                            <div>
                              {
                                formSymbol && parseFloat(formSymbol.balance) >= parseFloat(formInputValue) ?
                                  <div>
                                    {
                                      (symbolStatus === 2 && parseFloat(formInputmaiValue) > parseFloat(formSymbol.balance)) && formInputValue !== "" ?
                                        // 余额不足
                                        <div className={classes.bxhnotbottom}>
                                          <div>{t('BXH.dhbalanceof')}</div>
                                        </div>
                                        :
                                        <div>
                                          {
                                            formInputValue && toInputValue && isSwapStatus === 1 && formInputValue !== "" && toInputValue !== "" ?
                                              <div>
                                                {
                                                  bottomStatus === 4 || bottomStatus === 5 ?
                                                    // 4:Wrap、5:Unwrap
                                                    <div className={classes.bxhbottom}>
                                                      <div onClick={() => { this.bottomHTClick() }}>{bottomValue}</div>
                                                    </div>
                                                    :
                                                    <div>
                                                      {
                                                        priceMath > point && priceMath > 5 ?
                                                          <div className={classes.bxhnotbottom}>
                                                            <div>{t('BXH.dhSlipdapage')}</div>
                                                          </div>
                                                          :
                                                          // 0:兑换
                                                          <div className={classes.bxhbottom}>
                                                            <div onClick={this.onOpenExchange}>{bottomValue}</div>
                                                          </div>
                                                      }
                                                    </div>
                                                }
                                              </div>
                                              :
                                              <div className={classes.bxhnotbottom}>
                                                <img src={require('../../assets/bxh/load.png')} className='stateIcoImage' />
                                              </div>
                                          }
                                        </div>
                                    }
                                  </div>
                                  :
                                  // 余额不足
                                  <div className={classes.bxhnotbottom}>
                                    <div>{t('BXH.dhbalanceof')}</div>
                                  </div>
                              }
                            </div>
                            :
                            <div className={classes.bxhnotbottom}>
                              <img src={require('../../assets/bxh/load.png')} className='stateIcoImage' />
                            </div>
                        }
                      </div>

                    }
                  </div>
              }
            </div>
        }

        { modalExchange && this.renderExchangeModal()}
      </div>
    )
  }


  // 预计到账最少数量、价格变动、提供者费用
  renderPrice = () => {
    const { classes, t } = this.props
    const {
      point,
      bottomStatus,
      symbolStatus,
      modalMesage,
      formSymbol,
      toSymbol,
      formInputValue,
      toInputValue,
      priceChange,
      switchStatus,
      isSwapStatus,
      reservesSuan,
      reservesPrice,
      nameArray,
      liquidity,
      valuePriceMath,
      valuePriceInput,
      priceMath
    } = this.state

    // console.log("valuePriceMath------>>>>",valuePriceMath)

    let priceChangeMath = '0.1'
    let shouxufeiValue, formInputmaiAdd, formInputmaiValue
    if (formInputValue) {
      formInputmaiAdd = _getValueAdd(formInputValue, formInputValue * 0.003)
      formInputmaiValue = _getValueAdd(formInputmaiAdd, _getValueDivided1(_getValuemultip1(formInputValue, point), 100))
      shouxufeiValue = numberDecimal(this._getToolNumber(formInputValue * 0.003))
    }

    return (
      <div>
        {
          // 流动性是否充足
          liquidity !== 0 && (formInputValue && toInputValue) && isSwapStatus === 1 && formInputValue !== '0.000000000000' && toInputValue !== '0.000000000000' ?
            <div>
              {
                bottomStatus === 0 ?
                  <div>
                    {
                      symbolStatus === 1 ?
                        <div className={classes.bxhCangwei}>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhMinimum')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('Your transaction will revert if there is a large，unfavorable price movement before it is confirmed.') }} />
                            </span>
                            {/* 预计到账最少数量: To数量 - （To数量 * 滑点大小 / 100） */}
                            {
                              switchStatus === 1 ?
                                <span>
                                  {toInputValue ? numberDecimal(_getValueDivided3(toInputValue, _getValueDivided1(_getValuemultip1(toInputValue, point), 100))) : '0.00'}&nbsp;{toSymbol.symbol}
                                </span>
                                :
                                <span>--</span>
                            }
                          </div>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhPiceImpact')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('The difference between the market price and estimated price due to rade size.') }} />
                            </span>
                            <span className={classes.bxhbdxom}>
                              {
                                switchStatus === 1 ?
                                  <span className={classes.bxhbdxom}>
                                    {
                                      formInputValue && priceMath !== "--" ?
                                        <span>
                                          {
                                            priceMath < 0.01 ?
                                              <span>{priceChange}</span>
                                              :
                                              <span>{valuePriceMath}%</span>
                                          }
                                        </span>
                                        :
                                        '--'
                                    }
                                  </span>
                                  :
                                  <span>--</span>
                              }
                            </span>
                          </div>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhLiquidityFee')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('A portion of each trade(0.30%) goes to liquidity providers as a protocol incentive.') }} />
                            </span>
                            {
                              switchStatus === 1 ?
                                <span>
                                  {formInputValue ? shouxufeiValue : '0.00'} {formSymbol && formSymbol.symbol}
                                </span>
                                :
                                <span>--</span>
                            }
                          </div>
                          {/* 路由显示币种 */}
                          {
                            nameArray ?
                              <div className={classes.pairlist}>
                                <div className={classes.pairRoute}>Route
                                  <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('Routing through these tokens resulted in the best price for your trade.') }} />
                                </div>
                                {this.renderPairsList()}
                              </div>
                              :
                              null
                          }
                        </div>
                        :
                        <div className={classes.bxhCangwei}>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhSales')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('Your transaction will revert if there is a large，unfavorable price movement before it is confirmed.') }} />
                            </span>
                            {/* 预计卖出最多数量: From数量 + (From数量 * 0.003) +（From数量 * 滑点大小 / 100） */}
                            {
                              switchStatus === 1 ?
                                <span>
                                  {formInputmaiValue ? numberDecimal(formInputmaiValue) : '0.00'}&nbsp;
                                  {formSymbol && formSymbol.symbol}
                                </span>
                                :
                                <span>--</span>
                            }
                          </div>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhPiceImpact')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('The difference between the market price and estimated price due to rade size.') }} />
                            </span>
                            <span className={classes.bxhbdxom}>
                              {
                                priceMath !== "--" ?
                                  <span className={classes.bxhbdxom}>
                                    {
                                      priceMath < 0.01 ?
                                        <span>{priceChange}</span>
                                        :
                                        <span>{valuePriceMath}%</span>
                                    }

                                  </span>
                                  : "--"
                              }

                            </span>

                          </div>
                          <div className={classes.bxhcwshumg}>
                            <span>{t('BXH.dhLiquidityFee')}
                              <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('A portion of each trade(0.30%) goes to liquidity providers as a protocol incentive.') }} />
                            </span>
                            {
                              switchStatus === 1 ?
                                <span>
                                  {formInputValue ? shouxufeiValue : '0.00'} {formSymbol && formSymbol.symbol}
                                </span>
                                :
                                <span>--</span>
                            }
                          </div>
                          {/* 路由显示币种 */}
                          {
                            nameArray ?
                              <div className={classes.pairlist}>
                                <div className={classes.pairRoute}>Route
                                  <img src={require('../../assets/bxh/wenti.png')} onClick={(e) => { this.onChangeQuestion('Routing through these tokens resulted in the best price for your trade.') }} />
                                </div>
                                {this.renderPairsList()}
                              </div>
                              :
                              null
                          }
                        </div>
                    }
                  </div>
                  :
                  null
              }
            </div>
            :
            null
        }

        { modalMesage && this.renderMessageModal()}
      </div>
    )
  }

  // 路由显示币种
  renderPairsList = () => {
    const { nameArray } = this.state
    if (nameArray) {
      return nameArray.map((item, index) => {
        return this.renderPairsPoolList(item, index, nameArray.length)
      })
    }

  }
  renderPairsPoolList = (item, index, length) => {
    const { classes } = this.props
    return (
      <span key={index}>
        <img src={item.logoURI} />
        { item.symbol}
        {
          index !== length - 1 ?
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48587B"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </i>
            :
            null
        }
      </span>
    )
  }

  // 选择通行证列表
  renderTokenList = () => {
    return (
      <PassDialog onClose={ ()=>{this.setState({ tokensListShow: false })}} onSure={ (val)=>{
          this.tokenSymbol(val)
      } }  />
    )
  }
  // 图片加载失败，将默认值赋值给src
  handleImageErrored() {
    const { direction } = this.state
    this.setState({ notImages: true });
    if (direction === 'Form') {
      this.setState({ notFromImages: true });
    } else {
      this.setState({ notToImages: true });
    }
  }
  storageAddToken = (symbol) => {
    // 取Storage数组
    let getSymbolList = JSON.parse(localStorage.getItem('addSymbolList'))
    // 存Storage数组
    let addArrayList = []
    if (getSymbolList) {
      addArrayList = getSymbolList
      addArrayList.push(symbol)
    } else {
      addArrayList.push(symbol)
    }
    localStorage.setItem("addSymbolList", JSON.stringify(addArrayList));
  }


  renderMessageModal = () => {
    return (
      <MessageDialog message={this.state.message} onClose={this.onCloseMessage} />
    )
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }
  openMessage = (message) => {
    this.setState({ message: message, modalMesage: true })
  }
  // ？弹窗
  onChangeQuestion = (message) => {
    this.openMessage(message);
  }


  // 通证弹窗打开/隐藏
  tokenListStatus = (e, status) => {    
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      symbolInputValue: '',
      rewardSymbolList: this.state.searchSymbolList,
      tokensListShow: !this.state.tokensListShow,
      direction: status,
      notImages: false,
      notFromImages: false,
      notToImages: false,
    })
  }

  // 打开通证弹窗时候选中币种 
  tokenSymbol = (selectSymbol) => {
    const {
      direction,
      formSymbol,
      toSymbol,
      formInputValue,
      toInputValue,
      symbolStatus,
      isSwapStatus,
      reservesPrice,
      isStatusInput,
    } = this.state

    // 把币种添加到Storage中
    if (selectSymbol.status === 1) {
      // 取Storage数组
      let getSymbolList = JSON.parse(localStorage.getItem('addSymbolList'))
      // 存Storage数组
      let addArrayList = []
      if (getSymbolList) {
        addArrayList = getSymbolList
        addArrayList.push(selectSymbol)
      } else {
        addArrayList.push(selectSymbol)
      }
      localStorage.setItem("addSymbolList", JSON.stringify(addArrayList));
    }

    if (formInputValue && toInputValue) {
      if (symbolStatus === 1) {
        this.setState({
          toInputValue: ''
        })
      } else if (symbolStatus === 2) {
        this.setState({
          formInputValue: ''
        })
      }
    }

    // 判断当前选中的币种为Form or To
    if (direction === 'Form') {

      this.setState({
        formSymbol: selectSymbol, // from 币种
        formOnSymbol: selectSymbol.symbol, // 当前选中币种名称(form)
        tokensListShow: false,
        isStatusInput: isStatusInput,
      })
      // 确认按钮状态
      this.symbolSubmitStatus(selectSymbol, toSymbol, formInputValue, toInputValue)
      if (selectSymbol.symbol === formSymbol.symbol) {
        this.setState({
          symbolStatus: 1,
          formSymbol: formSymbol,
          toSymbol: toSymbol,
          formInputValue: formInputValue,
          toInputValue: toInputValue,
        })
      } else if (selectSymbol.symbol === toSymbol.symbol) {
        this.setState({
          symbolStatus: 1,
          formSymbol: toSymbol,
          toSymbol: formSymbol,
        })
        // 计算价格
        this.getReservesPrice(selectSymbol, formSymbol)
      } else {
        // 计算价格
        this.getReservesPrice(selectSymbol, toSymbol)
      }

    } else {

      this.setState({
        toSymbol: selectSymbol, // to 币种
        toOnSymbol: selectSymbol.symbol,  // 当前选中币种名称(to)
        tokensListShow: false,
        isStatusInput: isStatusInput,
      })

      // 确认按钮状态
      this.symbolSubmitStatus(formSymbol, selectSymbol, formInputValue, toInputValue)
      if (selectSymbol.symbol === formSymbol.symbol) {
        this.setState({
          symbolStatus: 1,
          formSymbol: toSymbol,
          toSymbol: formSymbol,
        })
        // 计算价格
        this.getReservesPrice(selectSymbol, toSymbol)
      } else if (selectSymbol.symbol === toSymbol.symbol) {
        this.setState({
          symbolStatus: 1,
          formSymbol: formSymbol,
          toSymbol: toSymbol,
          formInputValue: formInputValue,
          toInputValue: toInputValue,
        })
      } else {
        // console.log('需要计算价格222')
        this.getReservesPrice(formSymbol, selectSymbol)
      }

    }
  }


  // 新增--选择通证计算价格
  getReservesPrice = (formSymbol, toSymbol) => {
    const { formInputValue, toInputValue, point } = this.state

    if ((formSymbol.symbol === 'HT' && toSymbol.symbol === 'WHT') ||
      (formSymbol.symbol === 'WHT' && toSymbol.symbol === 'HT')) {
      this.setState({
        formInputValue: formInputValue,
        toInputValue: formInputValue,
        liquidity: 1,
      })
      return
    }

    this.setState({
      reservesStatus: 2,
      reservesPrice: [],
      nameArray: [],
    })
    if (formInputValue === '') {
      this.setState({
        symbolStatus: 1,
      })
    } else if (toInputValue === '') {
      this.setState({
        symbolStatus: 1,
      })
    }
    let parameter = [], fromValue = formInputValue, toValue = toInputValue
    parameter = [{
      formSymbol: formSymbol,
      toSymbol: toSymbol,
      point: point,
      fromValue,
      toValue,
    }]
    this.setState({ isReverse: false });
    this.checkRouter(parameter, formSymbol, toSymbol)
  }

  checkRouter = (parameter, formSymbol, toSymbol) => {
    //路由null
    this.setState({ currentRouter: null, reverseRouter: null });
    const that = this;
    store.calcRouteWithSymbol(formSymbol, toSymbol, (router, reverseRouter, tempFormSymbol, tempToSymbol) => {
      if (router == null) {
        return;
      }

      const aFormSymbol = that.state.formSymbol;
      const aToSymbol = that.state.toSymbol;
      if (aFormSymbol && tempFormSymbol && aFormSymbol.address == tempFormSymbol.address
        && aToSymbol && tempToSymbol && aToSymbol.address == tempToSymbol.address) {
        that.setState({ currentRouter: router, reverseRouter: reverseRouter });
        debugger
        dispatcher.dispatch({ type: BXHSWAPSYBMOL, content: { parameter: parameter, router: router } })
      }
    });
  }

  // 新增--输入数量计算价格
  getInputReservesPrice = (formSymbol, toSymbol, fromValue, toValue) => {
    const { formInputValue, toInputValue, point, isReverse } = this.state
    if (!fromValue && !toValue) {
      return
    }
    // console.log("刷新价格")
    let parameter = []
    parameter = [{
      formSymbol: formSymbol,
      toSymbol: toSymbol,
      point: point,
      formInputValue,
      toInputValue,
      fromValue,
      toValue,
    }]
    debugger
    const router = isReverse ? this.state.reverseRouter : this.state.currentRouter;    
    setTimeout(function () {
      dispatcher.dispatch({ type: BXHSWAPSYBMOL, content: { parameter: parameter, router: router } })
    }, 1);
  }

  // 查询from、to数量
  symbolSwapPrice = (reservesPrice) => {
    const { formSymbol, toSymbol, formInputValue, toInputValue, symbolStatus, isStatusInput } = this.state
    debugger
    if (!reservesPrice || reservesPrice.length == 0) {
      this.setState({
        liquidity: 0,
      })
      return;
    }
    this.setState({
      reservesPrice: reservesPrice,
      nameArray: reservesPrice[4],
      symbolAlloWance: reservesPrice[5],
      liquidity: 1,
    })
    if ((formSymbol.symbol === 'HT' && toSymbol.symbol === 'WHT') ||
      (formSymbol.symbol === 'WHT' && toSymbol.symbol === 'HT')) {
      this.setState({
        formInputValue: formInputValue,
        toInputValue: formInputValue,
        liquidity: 1,
      })

      return
    }

    // console.log('定时刷新==》', reservesPrice)
    // console.log(symbolStatus)
    // console.log(isStatusInput)
    if (formInputValue !== '' || toInputValue !== '') {
      if (formInputValue !== '' && toInputValue === '') {
        // 根据from数量，得出to数量
        this.setState({
          symbolStatus: 1,
          toInputValue: reservesPrice[0] ? reservesPrice[0] : '',
          valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
        })
        // console.log("reservesPrice---->>>>>>>>",reservesPrice)
        this.calcPriceChangeValue(1, formInputValue, reservesPrice[0] ? reservesPrice[0] : '', reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
      } else if (formInputValue === '' && toInputValue !== '') {
        // 根据to数量，得出from数量
        this.setState({
          symbolStatus: 2,
          formInputValue: reservesPrice[0] ? reservesPrice[0] : '',
          valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
        })
        // console.log("reservesPrice---->>>>>>>>",reservesPrice)
        this.calcPriceChangeValue(1, reservesPrice[0] ? reservesPrice[0] : '', toInputValue, reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
      } else {
        // 根据选择的币种，计算出选中币种数量
        if (symbolStatus === 1 && isStatusInput === 'From') {
          this.setState({
            toInputValue: reservesPrice[0] ? reservesPrice[0] : '',
            valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
          })
          // console.log("reservesPrice---->>>>>>>>",reservesPrice)
          this.calcPriceChangeValue(1, formInputValue, reservesPrice[0] ? reservesPrice[0] : '', reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
        } else if (symbolStatus === 1 && isStatusInput === 'To') {
          this.setState({
            formInputValue: reservesPrice[0] ? reservesPrice[0] : '',
            valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
          })
          // console.log("reservesPrice---->>>>>>>>",reservesPrice)
          this.calcPriceChangeValue(1, reservesPrice[0] ? reservesPrice[0] : '', toInputValue, reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
        } else {
          if (symbolStatus === 2 && isStatusInput === 'From') {
            this.setState({
              toInputValue: reservesPrice[0] ? reservesPrice[0] : '',
              valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
            })
            // console.log("reservesPrice---->>>>>>>>",reservesPrice)
            this.calcPriceChangeValue(1, formInputValue, reservesPrice[0] ? reservesPrice[0] : '', reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
          } else if (symbolStatus === 2 && isStatusInput === 'To') {
            this.setState({
              formInputValue: reservesPrice[0] ? reservesPrice[0] : '',
              valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
            })
            // console.log("reservesPrice---->>>>>>>>",reservesPrice)
            this.calcPriceChangeValue(1, reservesPrice[0] ? reservesPrice[0] : '', toInputValue, reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
          } else {
            this.setState({
              formInputValue: reservesPrice[0] ? reservesPrice[0] : '',
              valuePriceInput: reservesPrice[2] ? reservesPrice[2] : '',
            })
            // console.log("reservesPrice---->>>>>>>>",reservesPrice)
            this.calcPriceChangeValue(1, reservesPrice[0] ? reservesPrice[0] : '', toInputValue, reservesPrice[2] ? reservesPrice[2] : '',reservesPrice)
          }
        }
      }
    }
    this.setState({
      calcFormInputVal: this.state.formInputValue,
      calcToInputVal: this.state.toInputValue,
    })
  }

  calcPriceChangeValue = (status, priceFormInputValue, priceToInputValue, amount,reservesPrice) => {
    debugger
    const { valuePriceInput, priceMath, formInputValue, toInputValue } = this.state
    if (!amount || amount === NaN || amount === "") {
      amount = valuePriceInput
    }

    if (reservesPrice[10] !== priceFormInputValue && reservesPrice[10] !== priceToInputValue) {
      return
    }

    // console.log("amount---->>>>>", amount)
    // console.log("reservesPrice---->>>>>", reservesPrice)
    // console.log("status--->>>>>>", status)
    // console.log("priceFormInputValue--->>>>>>", priceFormInputValue)
    // console.log("priceToInputValue--->>>>>>", priceToInputValue)
    // console.log(reservesPrice[10].getFromNumber)
    // console.log(reservesPrice[10].getToNumber)

    setTimeout(() => {
      let priceCalcMath
      if (status === 1) {
        // console.log("1")
        let currentPrice = _getValueDivided1(0.001, amount) //除 得到当前价格
        // console.log("currentPrice---->>>>>",currentPrice)
        let laterPrice_temp = _getValueDivided1(priceFormInputValue, priceToInputValue)
        // console.log("laterPrice_temp---->>>>>",laterPrice_temp)
        let laterPrice = Math.abs(_getValueDivided3(laterPrice_temp, currentPrice)) //减
        priceCalcMath = _getValuemultip1(_getValueDivided1(laterPrice, currentPrice), 100)
        // console.log(currentPrice)
        // console.log(laterPrice_temp)
        // console.log(laterPrice)
        // console.log("priceCalcMath==>", priceCalcMath)
      } else {
        // console.log("2")
        // priceCalcMath = parseFloat(numberDecimal(_getValueDivided3(priceFormInputValue/priceToInputValue, amount/1) * 100))
        let currentPrice = _getValueDivided1(amount, 0.001) //除
        let laterPrice_temp = _getValueDivided1(priceFormInputValue, priceToInputValue)
        let laterPrice = Math.abs(_getValueDivided3(laterPrice_temp, currentPrice)) //减
        // let currentPrice100 = _getValuemultip1(currentPrice,100)
        priceCalcMath = _getValuemultip1(_getValueDivided1(laterPrice, currentPrice), 100)
      }
      // console.log("priceCalcMath-->>>>",priceCalcMath)
      let count = this.SaveToTwoWei(priceCalcMath, 2);
      this.setState({
        priceMath: priceCalcMath,
        valuePriceMath: count,
      })
    }, 1)

  }


  symbolSubmitStatus = (formSymbol, toSymbol, formInputValue, toInputValue) => {
    let inputValue = '';
    if (formInputValue !== '') {
      inputValue = formInputValue
    } else if (toInputValue !== '') {
      inputValue = toInputValue
    }
    this.dhInputStatus(inputValue, formSymbol, toSymbol)
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
  // true:数值型的，false：非数值型
  myIsNumber = (value) => {
    if (value == undefined || value == null) {
      return false;
    }
    return !isNaN(value);
  }


  // 输入框input onChange事件
  onChangeFrom = (value, event) => {
    const { t } = this.props
    const { formSymbol, toSymbol, reservesPrice, formInputValue } = this.state
    if (!this.myIsNumber(event.target.value)) {
      return;
    }
    this.setState({
      formInputValue: event.target.value,
      symbolStatus: 1,
      isStatusInput: 'From'
    })
    if (formSymbol.address && toSymbol.address) {
      if (event.target.value === '') {
        this.setState({
          formInputValue: '',
          toInputValue: '',
          bottomStatus: 1,
          bottomValue: t('BXH.dhbottom1'),
          isStatusValue: 0,
        })
      } else {
        // 计算价格
        this.getInputReservesPrice(formSymbol, toSymbol, event.target.value, '')
      }
    }

    // 确认按钮状态
    this.symbolSubmitStatus(formSymbol, toSymbol, event.target.value, '')
  }
  onChangeTo = (value, event) => {
    const { t } = this.props
    const { formSymbol, toSymbol, reservesPrice } = this.state
    if (!this.myIsNumber(event.target.value)) {
      return;
    }
    this.setState({
      toInputValue: event.target.value,
      symbolStatus: 2,
      isStatusInput: 'To'
    })
    if (formSymbol.address && toSymbol.address) {
      if (event.target.value === '') {
        this.setState({
          formInputValue: '',
          toInputValue: '',
          bottomStatus: 1,
          bottomValue: t('BXH.dhbottom1'),
          isStatusValue: 0,
        })
      } else {
        // 计算价格
        this.getInputReservesPrice(formSymbol, toSymbol, '', event.target.value)
      }
    }

    // 确认按钮状态
    this.symbolSubmitStatus(formSymbol, toSymbol, '', event.target.value)
  }

  onChangeSymbol = (event) => {
    const { searchSymbolList } = this.state
    this.setState({
      symbolInputValue: event.target.value,
      notImages: false,
    })

    dispatcher.dispatch({ type: SEARCHSYBMOL, content: { symbolList: searchSymbolList, searchValue: event.target.value } })
  }

  // 如果只有一个通证选中，输入金额后，把另一个输入框金额清空, 并修改bottom文案
  symbolOn = (status, inputValue) => {
    const { formSymbol, toSymbol } = this.state
    if (!formSymbol.symbol || !toSymbol.symbol) {
      if (status === 'From') {
        this.setState({
          toInputValue: '',
        })
      } else {
        this.setState({
          formInputValue: '',
        })
      }
    }
    this.dhInputStatus(inputValue, formSymbol, toSymbol)
  }


  // input输入 判断确认按钮状态: 
  // 默认是1 (0:兑换，1:输入金额，2:选择通证，4:Wrap，5:Unwrap)
  dhInputStatus = (inputValue, formSymbolPre, toSymbolPre) => {
    const { t } = this.props
    const { formSymbol, toSymbol } = this.state
    if (inputValue === 0 || inputValue === '0' || inputValue <= 0 || inputValue <= '0') {
      this.setState({
        bottomStatus: 1,
        bottomValue: t('BXH.dhbottom1'),
        isStatusValue: 0,
      })
      return
    }

    if (inputValue && (!formSymbolPre.symbol || !toSymbolPre.symbol)) {
      // From、To input有一个有值时，并且通证只选中一个时 （选择通证）
      this.setState({
        bottomStatus: 2,
        bottomValue: t('BXH.dhtongzheng'),
      })
      return true
    } else if ((!formSymbol.symbol || !toSymbol.symbol) && (formSymbolPre.symbol === toSymbolPre.symbol)) {
      this.setState({
        bottomStatus: 2,
        bottomValue: t('BXH.dhtongzheng'),
      })
      return true
    } else if ((formSymbolPre.symbol && toSymbolPre.symbol) && inputValue === '') {
      // 2个通证都选中时，并且From、To input都没有值时 （输入金额）
      this.setState({
        bottomStatus: 1,
        bottomValue: t('BXH.dhbottom1'),
      })
      return true
    } else if ((!formSymbolPre.symbol || !toSymbolPre.symbol) && inputValue === '') {
      // 只有一个通证选中时，并且From、To input都没有值时 （输入金额）
      this.setState({
        bottomStatus: 1,
        bottomValue: t('BXH.dhbottom1'),
      })
      return true
    } else if (inputValue && ((formSymbolPre.symbol === 'HT' && toSymbolPre.symbol === 'WHT'))) {
      this.setState({
        bottomStatus: 4,
        bottomValue: 'Wrap',
      })
      return true
    }
    else if (inputValue && ((formSymbolPre.symbol === 'WHT' && toSymbolPre.symbol === 'HT'))) {
      this.setState({
        bottomStatus: 5,
        bottomValue: 'Unwrap',
      })
      return true
    } else if (inputValue && formSymbolPre.symbol && toSymbolPre.symbol) {
      // 兑换
      this.setState({
        bottomStatus: 0,
        bottomValue: t('BXH.dhduihuan'),
      })
      return true
    }
  }

  // 价格 后面的值状态（0: From or To 1:To or From）
  onPriceStatus = (status) => {
    this.setState({
      priceStatus: status
    })
  }


  // 把From 和 To 币种互换
  symbolExchange = () => {
    const { t } = this.props
    const {
      formSymbol,
      toSymbol,
      formInputValue,
      toInputValue,
      symbolStatus,
      switchStatus,
      reservesPrice,
      nameArray,
      valueOneFromInput,
      valueOneToInput,
      valuePriceInput,
      isStatusInput,
      isMaxInput
    } = this.state
    this.stopTimer();
    this.setState({
      isReverse: !this.state.isReverse,
    });

    if (!formInputValue && !toInputValue) {
      this.setState({
        formSymbol: toSymbol,
        toSymbol: formSymbol,
      })
      return false
    }
    if (switchStatus !== 1) {
      return false
    }

    this.setState({
      switchStatus: 1,
      priceMath: '--',
    })

    // this.setState({symbolStatus:this.state.symbolStatus===1?2:1})

    if (formSymbol.symbol === 'HT' && toSymbol.symbol === 'WHT') {
      // console.log("ht")
      if (!formInputValue && !toInputValue) {
        this.setState({
          bottomStatus: 1,
          bottomValue: t('BXH.dhbottom1'),
        })
      } else {
        this.setState({
          bottomStatus: 5,
          bottomValue: 'Unwrap',
          formSymbol: toSymbol,
          toSymbol: formSymbol,
          switchStatus: 1,
        })
      }
      return true
    } else if (formSymbol.symbol === 'WHT' && toSymbol.symbol === 'HT') {
      // console.log("ht")
      if (!formInputValue && !toInputValue) {
        this.setState({
          bottomStatus: 1,
          bottomValue: t('BXH.dhbottom1'),
        })
      } else {
        this.setState({
          bottomStatus: 4,
          bottomValue: 'Wrap',
          formSymbol: toSymbol,
          toSymbol: formSymbol,
          switchStatus: 1,
        })
      }
      return true
    } else {
      this.setState({
        isSwapStatus: 1,
      })

      // console.log("ddddd_互换reservesPrice--->>>>>", reservesPrice)
      // console.log('位置互换', reservesPrice)
      // console.log('isStatusInput', isStatusInput)
      // console.log('llll_symbolStatus', symbolStatus)

      // if (symbolStatus === 1) {
      //   this.setState({
      //     symbolStatus: 2
      //   }, () => {
      //     console.log('llll_symbolStatus', symbolStatus)
      //   });
      // }

      // console.log('symbolStatus', symbolStatus)

      if (symbolStatus === 1) {

        if (isStatusInput === 'To') {
          // console.log('111111111')
          this.setState({
            formSymbol: toSymbol,
            toSymbol: formSymbol,
            formInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? reservesPrice[0] : "0",
            toInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? formInputValue : "0",
            calcFormInputVal: reservesPrice[0],
            calcToInputVal: formInputValue,
            symbolStatus: 2,
            symbolAlloWance: reservesPrice[6],
            nameArray: reservesPrice[4] ? reservesPrice[4].reverse() : '',
            isMaxInput: '',
            isStatusInput: 'From'
          }, () => {

          });
          // console.log("reservesPrice---->>>>",reservesPrice)
          // this.calcPriceChangeValue(1, reservesPrice[0], formInputValue, reservesPrice[2])
        } else {
          // console.log('222222222')
          this.setState({
            formSymbol: toSymbol,
            toSymbol: formSymbol,
            formInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? reservesPrice[1] : "0",
            toInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? formInputValue : "0",
            calcFormInputVal: reservesPrice[1],
            calcToInputVal: formInputValue,
            symbolStatus: 2,
            symbolAlloWance: reservesPrice[6],
            nameArray: reservesPrice[4] ? reservesPrice[4].reverse() : '',
            isMaxInput: '',
            isStatusInput: 'To'
          }, () => {

          });
          // console.log("reservesPrice---->>>>",reservesPrice)
          // this.calcPriceChangeValue(1, reservesPrice[1], formInputValue, reservesPrice[3])
        }

      } else {
        if (isMaxInput === 'From') {
          this.setState({
            formSymbol: toSymbol,
            toSymbol: formSymbol,
            formInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? reservesPrice[1] : "0",
            toInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? formInputValue : "0",
            calcFormInputVal: reservesPrice[1],
            calcToInputVal: formInputValue,
            symbolStatus: 2,
            symbolAlloWance: reservesPrice[6],
            nameArray: reservesPrice[4] ? reservesPrice[4].reverse() : '',
            isMaxInput: '',
          }, () => {

          });
          // console.log("reservesPrice---->>>>", reservesPrice)
          this.calcPriceChangeValue(2, reservesPrice[1], formInputValue, reservesPrice[3],reservesPrice)
        } else {

          if (isStatusInput === 'To') { //输入上还是下
            // console.log('333')
            this.setState({
              formSymbol: toSymbol,
              toSymbol: formSymbol,
              formInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? toInputValue : "0",
              toInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? reservesPrice[0] : "0",
              calcFormInputVal: toInputValue,
              calcToInputVal: reservesPrice[0],
              symbolStatus: 1, //
              symbolAlloWance: reservesPrice[5],
              nameArray: reservesPrice[4] ? reservesPrice[4].reverse() : '',
              isMaxInput: '',
              isStatusInput: 'From'
            }, () => {

            });
            // console.log("reservesPrice---->>>>",reservesPrice)
            // this.calcPriceChangeValue(1, toInputValue, reservesPrice[0], reservesPrice[2])
          } else {
            // console.log('444')
            this.setState({
              formSymbol: toSymbol,
              toSymbol: formSymbol,
              formInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? toInputValue : "0",
              toInputValue: parseFloat(formInputValue) !== 0 && parseFloat(toInputValue) !== 0 ? reservesPrice[1] : "0",
              calcFormInputVal: toInputValue,
              calcToInputVal: reservesPrice[1],
              symbolStatus: 1,
              symbolAlloWance: reservesPrice[5],
              nameArray: reservesPrice[4] ? reservesPrice[4].reverse() : '',
              isMaxInput: '',
              isStatusInput: 'To'
            }, () => {

            });
            // console.log("reservesPrice---->>>>",reservesPrice)
            // this.calcPriceChangeValue(1, toInputValue, reservesPrice[1], reservesPrice[3])
          }

        }

      }

      setTimeout(() => {
        this.refreshPrice()
      }, 1)

      setTimeout(this.iTimer, 0);

    }
  }

  // MAX按钮(获取From余额)
  MAXBalance = () => {
    const { t } = this.props
    const { formSymbol, toSymbol, symbolStatus, reservesPrice } = this.state
    let balance
    if (formSymbol.symbol === 'HT') {
      balance = formSymbol.balance ? this.SaveToTwoWei(formSymbol.balance - 0.01, 4) : "0.00"
    } else {
      balance = formSymbol.balance ? this.SaveToTwoWei(formSymbol.balance, 4) : "0.00"
    }

    this.setState({
      formInputValue: balance,
      isStatusInput: 'From',
      symbolStatus: 1,
    })

    if (symbolStatus === 2) {
      this.setState({
        isMaxInput: 'From',
      })
    } else {
      this.setState({
        isMaxInput: '',
      })
    }

    if (balance === 0 || balance === '0.00') {
      this.setState({
        formInputValue: '0',
        toInputValue: '0',
      })
      this.dhInputStatus(balance, formSymbol, toSymbol)
      return false
    }
    if (formSymbol.symbol && toSymbol.symbol) {
      this.setState({
        bottomStatus: 0,
        bottomValue: t('BXH.dhduihuan'),
      })
    } else {
      this.setState({
        bottomStatus: 2,
        bottomValue: t('BXH.dhtongzheng'),
      })
    }
    this.dhInputStatus(formSymbol.balance, formSymbol, toSymbol)

    if (formSymbol.symbol && toSymbol.symbol) {
      this.getInputReservesPrice(formSymbol, toSymbol, balance, '')
    }
  }

  // 授权
  onApprove = () => {
    const { rewardBXHPools, formSymbol, msgContent } = this.state
    const tokens = rewardBXHPools.tokens[0]

    this.setState({
      modalSend: true,
      loading: true,
      modalSendType: 0,
      msgContent: "Approve " + formSymbol.symbol,
    })
    let msgContent1 = 'Approve ' + formSymbol.symbol

    dispatcher.dispatch({ type: APPALLOWANCE, content: { asset: tokens, formSymbol: formSymbol, msgContent: msgContent1 } })
  }


  // 滑点弹窗
  renderHuadianModal = () => {
    return (
      <Huadian onClose={this.onCloseHuadian} point={this.state.point} transactionTime={this.state.transactionTime} />
    )
  }
  onOpenHuadian = () => {
    this.setState({ modalHuadian: true })
  }
  onCloseHuadian = (data) => {
    // 状态： 1 专家模式 0 普通模式
    // let setting = localStorage.getItem("setting")
    this.setState({
      modalHuadian: false,
      point: data.huadianValue ? data.huadianValue : '0.5', // 滑点大小
      transactionTime: data.transactionValue ? data.transactionValue : '20',  // 交易截止时间
      // settingStorage: setting // 专家模式
    })
  }

  //兑换 确定弹窗
  renderExchangeModal = () => {
    const {
      point,
      symbolStatus,
      formSymbol,
      toSymbol,
      formInputValue,
      toInputValue,
      reservesSuan,
      valuePriceInput
    } = this.state
    let dialogArray = []
    dialogArray = {
      formSymbol: formSymbol,
      toSymbol: toSymbol,
      formInputValue: formInputValue,
      toInputValue: toInputValue,
      symbolStatus: symbolStatus,
      fromPrice: reservesSuan.fromPrice,
    }

    // this.calcPriceChangeValue(2, reservesPrice[1], formInputValue, valuePriceInput)
    return (
      <ExchangeDialog onClose={this.onCloseExchange} onNext={this.onNextExchange} dialogArray={dialogArray} point={point} symbolStatus={symbolStatus} formSymbol={formSymbol} toSymbol={toSymbol} formInputValue={formInputValue} toInputValue={toInputValue} valuePriceInput={valuePriceInput} />
    )
  }
  onOpenExchange = () => {
    this.setState({ modalExchange: true })
  }
  onCloseExchange = () => {
    this.setState({ modalExchange: false })
  }
  sureSeceive = () => {
    this.onCloseExchange()
    const {
      rewardBXHPools,
      rewardSymbolPrice,
      formInputValue,
      formSymbol,
      toSymbol,
      msgContent
    } = this.state
    const tokens = rewardBXHPools.tokens[0]
    const fromPrice = numberDecimal(rewardSymbolPrice.fromPrice)
    const toPrice = numberDecimal(rewardSymbolPrice.toPrice)

    let msg = "Supplying " + fromPrice + " " + rewardSymbolPrice.fromSymbol + " for " + toPrice + " " + rewardSymbolPrice.toSymbol
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    if (!fromPrice || !toPrice || fromPrice <= 0 || toPrice <= 0) {
      return;
    }
    var senddata = {
      amountADesired: fromPrice + "",
      amountBDesired: toPrice + "",
      amountAMin: 0,
      amountBMin: 0,
      msgContent: msg,
      isOut: true,
    }
    dispatcher.dispatch({ type: GET_WRAPTOKENS, content: { asset: tokens, formInputValue: formInputValue, formSymbol: formSymbol, toSymbol: toSymbol, senddata: senddata } })
  }
  onNextExchange = () => {
    const {
      point,
      symbolStatus,
      formInputValue,
      toInputValue,
      formSymbol,
      toSymbol,
    } = this.state
    const fromPrice = numberDecimal(formInputValue)
    const toPrice = numberDecimal(toInputValue)
    let leastNumber
    if (symbolStatus === 1) {
      // 预计到账最少数量: To数量 - （To数量 * 滑点大小 / 100）
      leastNumber = Math.abs(toInputValue - (toInputValue * point / 100))
    } else {
      // 预计卖出最多: From数量 + (From数量 * 0.003) +（From数量 * 滑点大小 / 100）
      leastNumber = Math.abs(toInputValue)
    }

    this.setState({
      modalExchange: false,
      msgContent: 'Swapping ' + fromPrice + ' ' + formSymbol.symbol + ' for ' + toPrice + ' ' + toSymbol.symbol
    })

    this.bottomHTClick(leastNumber)
  }

  // 兑换按钮
  bottomHTClick = (leastNumber) => {
    const {
      bottomStatus,
      rewardBXHPools,
      formInputValue,
      toInputValue,
      formSymbol,
      toSymbol,
      transactionTime,
      symbolStatus,
      point,
      reservesPrice,
      currentRouter,
      isReverse,
    } = this.state
    const tokens = rewardBXHPools.tokens[0]
    const fromPrice = numberDecimal(formInputValue)
    const toPrice = numberDecimal(toInputValue)

    this.setState({
      modalSend: true,
      loading: true,
      modalSendType: 0,
      msgContent: 'Swapping ' + fromPrice + ' ' + formSymbol.symbol + ' for ' + toPrice + ' ' + toSymbol.symbol
    })
    let msgContent1 = 'Supplying ' + fromPrice + ' ' + formSymbol.symbol + ' for ' + toPrice + ' ' + toSymbol.symbol
    const addressRouter = isReverse ? this.state.reverseRouter : this.state.currentRouter;

    // HT-WHT/WHT-HT Wrap Unwrap
    if (bottomStatus === 4 || bottomStatus === 5) {
      dispatcher.dispatch({ type: GET_WRAPTOKENS, content: { asset: tokens, formInputValue: formInputValue, formSymbol: formSymbol, toSymbol: toSymbol, transactionTime: transactionTime, msgContent: msgContent1, addressRouter: addressRouter } })
    } else {
      // 传值（tokens、From值、预计到账最少数量、formSymbol、toSymbol）
      dispatcher.dispatch({ type: APPEXCHANGETOKENS, content: { tokens: tokens, formInputValue: formInputValue, leastNumber: leastNumber, formSymbol: formSymbol, toSymbol: toSymbol, transactionTime: transactionTime, msgContent: msgContent1, symbolStatus: symbolStatus, point: point, pairsMinimum: currentRouter, addressRouter: addressRouter } })
    }
  }

  navigateStake = () => {
    // this.props.history.push('/createliquiditypool')
    window.open(getLangURLWithURL('https://swap.bxh.com/#/pool'),'_self')
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

export default withNamespaces()(withRouter(withStyles(styles)(Swap)));