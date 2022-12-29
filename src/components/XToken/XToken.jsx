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
import Store from "../../stores";
import ExchangeDialog from '../exchangeDialog/exchangeDialog.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import cookie from 'react-cookies'
import { getStyleClass, isNoEmpty, getTokenLogoURLWithName } from '../../config/constantFunction'
import {
  numberDecimal,
  _getValuemultip1,
  _getValueDivided,
  _getValueDivided1,
  _getValueDivided3,
  _getValueAdd,
} from '../../config/constantFunction'
import PassDialog from '../passDialog/passDialog.jsx';

import Snackbar from '../snackbar/snackbar'
import Footer from '../unlock/Footer.jsx';
import { debounce } from 'lodash'
import './duihuanDialog.css';
import getLangURLWithURL from '../../util/linkHelper';
import SymbolMarket from './SymbolMarket';
import SymbolFromMarket from './SymbolFromMarket';

import {
  ERROR,
  GET_XDTALLOWANCE,
  GET_XDTALLOWANCE_RETURNED,
  GET_XDTSTATRE,
  GET_XDTSTATRE_RETURNED,
  GET_XDTSUCCEE_RETURNED,
  GET_XTOKENPRICE,
  GET_XTOKENSTATRE,
  GET_XTOKENSTATRE_RETURNED,
  GET_XTOKENALLOWANCE,
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
    marginBottom: '30px !important',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
      margin: 'auto',
    }
  },
  bxhtTit: {
    marginBottom: '20px',
    color: '#fff',
    fontSize: '24px',
    marginTop: '60px',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '30px',
    }
  },
  windowparent: {
    position: 'relative',
    display: 'flex',
    height: '56px',
    borderRadius: '15px 15px 0px 0px',
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
    borderRadius: '4px',
    width: '130px',
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
  bxhjiamt: {
    textAlign: 'center',
    paddingRight: '10px',
    margin: '15px 0 5px',
    '& img': {
      width: '14px',
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
  bxhicosl: {
    display: 'flex',
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
  bxhjghei: {
    marginTop: '20px',
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
});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class XToken extends Component {

  constructor(props) {
    super()

    const rewardBXHPools = store.getStore('rewardBXHPools')[0]
    const { t } = props;
    this.state = {
      address: null,
      rewardBXHPools: rewardBXHPools,
      isMobile: 1,
      footerMShow: true,
      notFromImages: false,
      symbolList: [],  //单币币种列表
      symbolFromShow: false,  //From选择币种弹窗
      symbolShow: false,  //选择币种弹窗
      fromSymbol: [],  //选中币种
      toSymbol: [],  //选中币种
      XDTContract: '',  //XDT合约地址
      XDTAllowance: '1000000000000000000', //XDT合约是否授权
      symbolPrice: '--',  //当前价格
      fromInputValue: '', //from input
      toInputValue: '', //to input
      priceShow: false,
      modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
    }
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    emitter.on(GET_XDTALLOWANCE_RETURNED, this.showHashROVETWIST);
    emitter.on(GET_XDTSTATRE_RETURNED, this.showHash);
    emitter.on(GET_XDTSUCCEE_RETURNED, this.resultSuccess);
  }

  componentWillUnmount() {
    // this.stopTimer();
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(GET_XDTALLOWANCE_RETURNED, this.showHashROVETWIST);
    emitter.removeListener(GET_XDTSTATRE_RETURNED, this.showHash);
    emitter.removeListener(GET_XDTSUCCEE_RETURNED, this.resultSuccess);
    this.setState = (state, callback) => {
      return;
    }
  };

  componentDidMount() {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    this.refreshData();
    this.refreshAccount();
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

  showHash = (hash) => {
    setTimeout(() => {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: hash, isMax: 1 })
    }, 2000)
  };

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

  showHashROVETWIST = (data) => {
    this.setState({ modalSend: false })
    this.XDTTokenBalance();  //获取XToken授权
  }

  resultSuccess = () => {
    this.setState({ modalSend: false })
    this.XDTTokenBalance();  //获取XToken授权
    this.refreshAccount(true);
    this.setState({
      fromInputValue: '',
      toInputValue: '',
      priceShow: false,
    })
  }

  //刷新数据
  refreshData = () => {
    store._getXDTInfo((data)=>{
      let symbolList = data.bxh_ex_pool_type_3
      let pool = []
      for(let i=0,count=symbolList.length;i<count;i++){
        let obj = symbolList[i];
        // 0x开头才显示兑换
        if(obj.symbolPair_Show.indexOf('0x') === 0){
          pool.push(obj)
          this.setState({
            symbolList: pool,
            XDTContract: pool[0].symbolPair_Show
          })
        }
      }
      this.refreshAccount(true);
    })
  }

  //刷新账户相关信息
  refreshAccount = (isLoad=false) => {
    const account = store.getStore('account');
    const address = account.address;
    if (isNoEmpty(address)) {
        this.setState({ address: address });
        if(isLoad){
          this.tokenInfo();  //获取单币币种信息
        }
    } else {
        this.setState({ address: null });
    }
  }

  // 获取XToken授权
  XDTTokenBalance = () => {
    const { fromSymbol } = this.state
    if(fromSymbol.length!==0){
      store._getXTokenAllowance(fromSymbol.lptokenAddress, (err,info)=>{
        // console.log('XDTallowance111===>', info)
        this.setState({
          XDTAllowance: info.allowance,
        })
      })
    }
  }

  //获取单币币种信息
  tokenInfo = () => {
    const { symbolList } = this.state
    let total = 0;
    for(let i=0,count=symbolList.length;i<count;i++){
      let obj = symbolList[i];
      store._getXTokenBalance(obj.lptokenAddress, (err,info)=>{
        if(err==null){
          obj.XTokenBalance = info.XTokenBalance;
        }
        total += 1;
        if(total===count){//查询完成
          this.setState({
            symbolList:[...symbolList],
          })
        }
      })
      store._getXDTTokenBalance(obj.symbol0Address, "0xa5d7b0032bE749580082D030B75d265E4034b59A", (err,info)=>{
        if(err==null){
          obj.balance = info.balance;
          obj.contractBalance = info.contractBalance;
        }
        total += 1;
        if(total===count){//查询完成
          this.setState({
            symbolList:[...symbolList],
          })
        }
      })
    }
  }


  render() {
    const { classes, t } = this.props;
    const { isMobile, footerMShow, modalSend } = this.state

    return (
      <div className={classes.root}>
        <Header openUnlockModal={this.openUnlockModal} />

        <div className={classes.content}>
          <div className={classes.bxhtTit}>{t('BXH.XTokenTitle')}</div>

          <div className={getStyleClass('PCTDaoCard',classes.windowparent)}>
            <div className={classes.windowparentContent}>
              <div>{t('BXH.dhduihuan')}</div>
            </div>
          </div>
          <div className={getStyleClass('PCTDaoCard',classes.bxhtConter)}>
            <div className={classes.bxhttabs}>
              <span>{t('BXH.dhduihuan')}</span>
            </div>
            {/* 兑换 */}
            {this.renderDuihuan()}
          </div>
        </div>

        <Footer pagetype="swap" />

        { modalSend && this.renderSendModal()}

      </div>
    )
  };


  // 兑换
  renderDuihuan = () => {
    const { classes, t } = this.props
    const {  } = this.state

    return (
      <div>
        {/* From */}
        { this.renderFromSymbol()}

        <div className={classes.bxhjiamt}>
          <img src={require('../../assets/bxh/jiantoushangsheng.png')} />
        </div>

        {/* To */}
        { this.renderToSymbol()}

        {/* 价格、可兑换数量 */}
        { this.renderPrice()}

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
      fromSymbol,
      symbolFromShow,
    } = this.state
    const asset = rewardBXHPools.tokens[0]

    return (
      <div>
        <div className={classes.bxhshuruks}>
          <span>From</span>
          <span>
            <em>{t('BXH.dhbalance')}:</em>
            {
              fromSymbol&&fromSymbol.XTokenBalance?
              <i>{fromSymbol.XTokenBalance}</i>
              :
              <i>--</i>
            }
          </span>
        </div>
        <div className={classes.bxhbtestm} >
          {this.renderAssetInput1(asset, 'stake1')}
          {
            fromSymbol && fromSymbol.symbolPair ?
            // 已经选择通证
            <div className={classes.bxhicosl}>
              <span className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={() => { this.MAXBalance() }}>MAX</span>
              <div onClick={(e) => { this.onSymbolFromShow() }}>
                <img src={getTokenLogoURLWithName(fromSymbol.symbolPair)} />
                {fromSymbol && fromSymbol.symbol1}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </div>
            </div>
            :
            // 未选择通证
            <div className={classes.bxhicosl}>
              <span className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={() => { this.MAXBalance() }}>MAX</span>
              <div onClick={(e) => { this.onSymbolFromShow() }}>
                <img src={require('../../assets/bxh/BXHtong.png')} />
                {t('BXH.dhtongzheng')}
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
              </div>
            </div>
          } 
        </div>
        {/* 选择from币种弹窗 */}
        {
          symbolFromShow && this.renderFromSymbol1()
        }
      </div>
    )
  }

  // To 币种信息、输入框
  renderToSymbol = () => {
    const { classes, t } = this.props
    const {
      rewardBXHPools,
      symbolShow,
      toSymbol,
    } = this.state
    const asset = rewardBXHPools.tokens[0]

    return (
      <div>
        <div className={classes.bxhshuruks}>
          <span>To</span>
        </div>
        <div className={classes.bxhbtestm}>
          {this.renderAssetInput2(asset, 'stake2')}
          {
            toSymbol && toSymbol.symbolPair ?
              // 已经选择通证
              <div className={classes.bxhicosl} onClick={(e) => { this.onSymbolShow() }}>
              <img src={getTokenLogoURLWithName(toSymbol.symbolPair)} />
              {toSymbol && toSymbol.symbolPair}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
            </div>
            :
            // 未选择通证
            <div className={classes.bxhicosl} onClick={(e) => { this.onSymbolShow() }}>
              <img src={require('../../assets/bxh/BXHtong.png')} />
              {t('BXH.dhtongzheng')}
              <svg width="12" height="7" viewBox="0 0 12 7" fill="none" color="#fff" ><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
            </div>
          }
          
        </div>
        {/* 选择to币种弹窗 */}
        {
          symbolShow && this.renderSymbol()
        }
      </div>
    )
  }

  // From 输入
  renderAssetInput1 = (asset, type) => {
    const { classes, t } = this.props
    const { fromInputValue, fromSymbol } = this.state
    const amountError = this.state[asset.id + '_' + type + '_error']

    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          className={classes.bxhInput}
          id={'' + asset.id + '_' + type}
          value={fromInputValue || ''}
          error={amountError}
          onChange={this.onChangeFrom.bind(this, fromSymbol.XTokenBalance ? (Math.floor(fromSymbol.XTokenBalance * 10000) / 10000) : '0.00')}  
          // onFocus={this.onFocusFrom.bind()}  // 获得焦点
          // onBlur={this.onBlurFrom.bind()} // 失去焦点
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
    const { toInputValue } = this.state
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
          // onChange={this.onChangeTo.bind(this, toSymbol && toSymbol.balance ? (Math.floor(toSymbol.balance * 10000) / 10000) : '0.00')}
          // onFocus={this.onFocusTo.bind()}  // 获得焦点
          // onBlur={this.onBlurTo.bind()} // 失去焦点
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

  // 价格、可兑换数量
  renderPrice = () => {
    const { classes, t } = this.props
    const { fromSymbol, toSymbol, symbolPrice, fromInputValue, toInputValue, priceShow } = this.state
    return (
      <div>
        {
          toSymbol && toSymbol.symbolPair && priceShow ?
          <div className={classes.bxhjghei}>
            <div className={classes.bxhjgfen}>
              <span>{t('BXH.XTokenBili')}</span>
              <em>
                {fromInputValue} {fromSymbol.symbol1} = {toInputValue} {toSymbol.symbol0}
              </em>
            </div>
            <div className={classes.bxhjgfen}>
              <span>{t('BXH.XDTRemaining')}</span>
              <em>{toSymbol.contractBalance}&nbsp;{toSymbol.symbolPair}</em>
            </div>
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
      XDTAllowance,
      fromInputValue,
      toInputValue,
      toSymbol,
    } = this.state

    return (
      <div>
        {
          XDTAllowance !== '0' ?
          <div>
          {
            fromInputValue !== "" && toInputValue !== "" ?
            <div>
              {
                toSymbol && toSymbol.symbolPair ?
                <div>
                  {
                    parseFloat(toInputValue) > parseFloat(toSymbol.contractBalance) ?
                    <div className={classes.bxhnotbottom}>
                      <div>{t('BXH.XDTNotRemaining')}</div>
                    </div>
                    :
                    <div className={getStyleClass('PC_new_btn1',classes.bxhbottom)}>
                      <div onClick={this.onExchange}>{t('BXH.confirm')}</div>
                    </div>
                  }
                </div>
                :
                <div className={classes.bxhnotbottom}>
                  <div>{t('BXH.dhtongzheng')}</div>
                </div>
              }
            </div>
            :
            <div className={classes.bxhnotbottom}>
              <div>{t('BXH.dhbottom1')}</div>
            </div>
          }
          </div>
          :
          // 授权
          <div className={getStyleClass('PC_new_btn1',classes.bxhbottom)}>
            <div onClick={() => { this.alloWance() }}>{t('BXH.dhAuthorization')}</div>
          </div>
        }
      </div>
    )
  }


  // true:数值型的，false：非数值型
  myIsNumber = (value) => {
    if (value == undefined || value == null) {
      return false;
    }
    return !isNaN(value);
  }

  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  // 选择from币种弹窗
  renderFromSymbol1 = () => {
    const { symbolList, fromSymbol } = this.state
    return (
      <SymbolFromMarket onClose={this.onSymbolFromClose} symbolList={symbolList} toSymbol={fromSymbol} onSure={this.onFromSymbol} />
    )
  }
  onSymbolFromClose = () => {
    this.setState({ symbolFromShow: false })
  }
  onSymbolFromShow = () => {
    this.setState({ symbolFromShow: true });
  }
  onFromSymbol = (selectSymbol) => {
    this.setState({
      fromSymbol: selectSymbol, //选中币种
      symbolPrice: '--',
      fromInputValue: '',
      toInputValue: '',
    }, () => {
      this.toNumber()
    });
  }


  // 选择to币种弹窗
  renderSymbol = () => {
    const { symbolList, toSymbol } = this.state
    return (
      <SymbolMarket onClose={this.onSymbolClose} symbolList={symbolList} toSymbol={toSymbol} onSure={this.onSymbol} />
    )
  }
  onSymbolClose = () => {
    this.setState({ symbolShow: false })
  }
  onSymbolShow = () => {
    this.setState({ symbolShow: true });
  }
  onSymbol = (selectSymbol) => {
    this.setState({
      toSymbol: selectSymbol, //选中币种
      symbolPrice: '--',
    }, () => {
      this.toNumber()
    });
  }

  //XToken查询当前兑换数量
  toNumber = () => {
    const { fromSymbol, toSymbol, fromInputValue } = this.state
    if(fromInputValue){
      this.XDTTokenBalance();  //获取XToken授权
      store.getXTokenPrice(fromSymbol.ex_id, fromInputValue, toSymbol.symbol0Address, (err,info)=>{
        if(info){
          this.setState({
            symbolPrice: info.amount,
            toInputValue: info.amount,
            priceShow: true,
          })
        }
      })
    }
  }

  // 输入框input onChange事件
  onChangeFrom = (value, event) => {
    const { fromSymbol, toSymbol } = this.state
    var val = event.target.value;
    if (this.myIsNumber(val)&&this.myIsNumber(fromSymbol.XTokenBalance)) {
        if (parseFloat(val)<0||parseFloat(val)>parseFloat(fromSymbol.XTokenBalance)) {
            val = fromSymbol.XTokenBalance;
        }
    }else{
        return;
    }
    if(val){
      if(fromSymbol.length!==0&&toSymbol.length!==0){
        this.setState({
          fromInputValue: val,
        }, () => {
          this.toNumber()
        });
      }else{
        this.setState({
          fromInputValue: val,
        })
      }
    }else{
      this.setState({
        fromInputValue: val,
        toInputValue: '',
        priceShow: false,
      })
    }
  }

  MAXBalance = () => {
    const { fromSymbol, toSymbol } = this.state
    if(fromSymbol.length!==0&&toSymbol.length!==0){
      this.setState({
        fromInputValue: fromSymbol.XTokenBalance,
      }, () => {
        this.toNumber()
      });
    }else{
      this.setState({
        fromInputValue: fromSymbol.XTokenBalance,
      })
    }
  }

  // 授权
  alloWance = () => {
    const { fromSymbol } = this.state
    this.setState({ modalSend: false })
    const msgContent = "Approve " + fromSymbol.symbol1;
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
    dispatcher.dispatch({ type: GET_XTOKENALLOWANCE, content: { contract: fromSymbol.lptokenAddress, msgContent: msgContent } })
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

  //确定
  onExchange = () => {
    const { fromInputValue, fromSymbol, toSymbol } = this.state
    this.setState({ modalSend: false })
    const msgContent = "Swap " + fromInputValue + " " + fromSymbol.symbol1;
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
    dispatcher.dispatch({ type: GET_XTOKENSTATRE, content: { pid: fromSymbol.ex_id, amount: fromInputValue, destToken: toSymbol.symbol0Address, msgContent: msgContent } })
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(XToken)));