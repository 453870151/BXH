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
import { numberDecimal, _getValueDivided, _getValuemultip, _getValueMinus, _getValuemultip1, _getValueDivided1, 
  _getValueDivided3, getStyleClass, isNoEmpty, getTokenLogoURLWithName, unique, sortSymbol, defaultSymbol, filterCategory,
   _getValueMinus4, isEmpty } from '../../config/constantFunction'
import Footer from '../unlock/Footer.jsx';
import TransactionMarket from './TransactionMarket';
import SymbolMarket from './SymbolMarket';
import BridgeMarket from './BridgeMarket';
import ConfirmationMarket from './ConfirmationMarket';
import cookie from 'react-cookies'
import {
  ERROR,
  BXHLoanDeposit_RETURN,
  BXHBRIDGESTAKE_RETURN,
  GET_TOKENPRICE_RETURNED,
  GET_TOKENPAYPRICE_RETURNED,
  GET__BRIDGEMAINRETURNED,
  GET__BXHBRIDGEMAIN,
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
    marginTop: '70px',
    [theme.breakpoints.up('sm')]: {
      width: '500px',
      margin: 'auto',
      marginTop: '0px',
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
      marginTop: '20px'
    }
  },
  bxhttabs: {
    position: 'relative',
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'space-between',
    '& img': {
      width: '12px',
      cursor: 'pointer',
    }
  },
  bxhshuruks: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '10px',
    '& span': {
      display: 'block',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: "consola",
    },
    '& i': {
      fontStyle: 'inherit',
      marginLeft: '7px',
      fontSize: '12px',
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
  bxhicosl: {
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '27px',
    cursor: 'pointer',
    '& img': {
      width: '20px',
      verticalAlign: 'middle',
      marginRight: '5px',
      marginTop: '-2px',
    },
    '& svg': {
      marginTop: '10px',
      marginLeft: '5px',
    }
  },
  bxhxiala: {
    width: '7px !important',
    marginRight: '0px',
    marginLeft: '5px !important',
  },
  bxhfield: {
    position: 'relative',
    width: '40%',
    paddingTop: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    },
    '& input::-webkit-input-placeholder': {
      fontWeight: '500',
      fontSize: '13px',
    },
    '& input::-moz-input-placeholder': {
      fontWeight: '500',
      fontSize: '13px',
    },
    '& input::-ms-input-placeholder': {
      fontWeight: '500',
      fontSize: '13px',
    },
  },
  bxhInput: {
    width: '100%',
    '& input': {
      fontFamily: "consola",
      padding: '0px',
    }
  },
  bxhaddressInput: {
    width: '100%',
    '& input': {
      fontWeight: '500',
      fontSize: '12px',
      border: '1px solid #2D2F45',
      borderRadius: '6px',
      padding: '5px',
    }
  },
  bxhcontbg: {
    background: '#1C1E22',
    borderRadius: '6px',
  },
  bxhmax: {
    display: 'inline-block',
    marginRight: '10px',
    background: '#1E2D2B',
    borderRadius: '6px',
    color: '#2EBC84',
    width: '40px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  bxhzjianico: {
    margin: '15px 0',
    textAlign: 'center',
    '& img': {
      width: '18px'
    }
  },
  bxhwelladdress: {
    marginTop: '10px',
  },
  bxhaddress: {
    textAlign: 'left',
    border: '1px solid #2D2F45',
    borderRadius: '6px',
    padding: '10px',    
    marginTop: '10px',
  },
  bxhaddtit: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  bxhaddnei: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    lineHeight: '25px',
    '& em': {
      fontStyle: 'inherit',
      opacity: '.5',
    },
    '& i': {
      fontStyle: 'inherit',
    }
  },
  bxhtishiaddress: {
    textAlign: 'left',
    fontSize: '12px',
    color: '#FF8F6B',
    paddingLeft: '10px',
    paddingTop: '10px',
    '& img': {
      width: '14px',
      marginRight: '5px',
      verticalAlign: 'text-top',
    }
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
  bxhklian: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginTop: '20px',
    '& em': {
      fontStyle: 'inherit',
      opacity: '.8',
    }
  },
  bxhklxian: {
    width: '100%',
    height: '8px',
    background: '#4A4C5E',
    borderRadius: '4px',
    marginTop: '10px',
  },
  bxhklusedxian: {
    height: '8px',
    background: '#30BE85',
    borderRadius: '4px',
  },
  bxhinputmin: {
    position: 'absolute',
    fontSize: '12px',
    color: '#FF8F6B',
    marginTop: '5px',
  },
  bxhaddconter: {
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  bxhisaddress: {
    color: '#FF8F6B',
    fontSize: '12px',
  }
});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Bridge extends Component {

  constructor(props) {
    super()

    this.state = {
      address: null,
      addressSubstr: null,
      isMobile: 1,
      footerMShow: true,
      transactionShow: false,  //??????????????????
      symbolShow: false,  //??????????????????
      symbolContract: [],
      bridgeSymbolConfig: [],
      bridgeConfigList: [],
      bridgeWallet: [],  //????????????????????????
      bridgeShow: false,  //??????????????????
      bridgeList: [], //????????????
      bridgeSelect: [], //????????????
      symbolList: [],  //????????????(??????,?????????)
      symbolUnList: [],  //????????????(?????????)
      fromSymbol: {
        symbol: 'BXH',
        balance: '0.00',
        allowance: '0',
      },  //???????????????????????????BXH???
      inputVal: null,
      limitUsed: '0',  //???????????????????????????
      limitNumber: '0',  //???????????????????????????
      limitTotal: '10000000',  //?????????????????????
      limitTotalWhite: '10000000', //????????????????????????????????????
      modalSend: false,
      feeValue: '0.00', //?????????
      toInputVal: '--',
      feeToInputVal: '--', //????????????
      bridgeOrderList: [],  //??????????????????
      confirmationShow: false,  //??????????????????
      addressShow: false, //????????????????????????
      addressVal: null,
      senderPrice: '',
      payPrice: '',
      isAddress: true,  //????????????????????????
    }
  }


  componentDidMount() {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: 2 })
    } else {  // PC???
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //?????????????????????????????? 
    window.addEventListener('resize', this.handleResize.bind(this)) //????????????????????????

    this.refreshData();
    this.refreshAccount();
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: 2 })
    } else {  // PC???
      this.setState({ isMobile: 1 })
    }

    const { wHeight } = this.state;
    var hh = window.innerHeight; //???????????????????????? 
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

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);  // ??????????????????
    emitter.on(BXHLoanDeposit_RETURN,this.renderReturned)
    emitter.on(BXHBRIDGESTAKE_RETURN,this.renderBootReturned)
    emitter.on(GET__BXHBRIDGEMAIN,this.renderDataMain)
    emitter.on(GET_TOKENPRICE_RETURNED,this.renderPrice)
    emitter.on(GET_TOKENPAYPRICE_RETURNED,this.renderPayPrice)

    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // ????????????heco???bsc???????????????????????????
      ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }
  
  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);  // ??????????????????
    emitter.removeListener(BXHLoanDeposit_RETURN,this.renderReturned)
    emitter.removeListener(BXHBRIDGESTAKE_RETURN,this.renderBootReturned)
    emitter.removeListener(GET__BXHBRIDGEMAIN,this.renderDataMain)
    emitter.removeListener(GET_TOKENPRICE_RETURNED,this.renderPrice)
    emitter.removeListener(GET_TOKENPAYPRICE_RETURNED,this.renderPayPrice)
    clearInterval(this.timer);
    this.setState = (state, callback) => {
      return;
    }
  };

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

  handleAccountsChanged = () => {
    this.setState({
      inputVal: '',
      feeToInputVal: '',
      transactionShow: false,
    })
  }

  renderReturned = (data) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 1 ,txHash:data})
    this.renderMain()
    //???????????????????????????
    // let storage = JSON.parse(localStorage.getItem('bridgeBottomArray'))
    // storage[0]['senderTx'] = data
    // localStorage.setItem("bridgeBottomArray", JSON.stringify(storage))
  }
  renderDataMain = () => {
    this.refreshData();
    this.refreshAccount();
  }
  renderMain = () => {
    this.refreshData(0);
    this.refreshAccount();
  }

  renderBootReturned = (data) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 1 ,txHash:data})
    this.renderMain();
  }

  renderPrice = (data) => {
    this.setState({ senderPrice: data })
  }
  renderPayPrice = (data) => {
    this.setState({ payPrice: data })
    const { inputVal, senderPrice, payPrice } = this.state
    let pricePro = _getValueDivided(senderPrice, payPrice, 4)
    let priceValue
    if(inputVal){
      priceValue = _getValuemultip(inputVal, pricePro, 4)
    }else{
      priceValue = ''
    }
    this.setState({toInputVal: priceValue}); //??????????????????????????????
    this.serviceBXHCharge(inputVal, priceValue)  //????????????????????????
  }

  renderGetPrice = (input, Ratio) => {
    let priceValue
    if(input){
      priceValue = _getValuemultip(input, Ratio, 4)
    }else{
      priceValue = ''
    }
    this.setState({toInputVal: priceValue}); //??????????????????????????????
    this.serviceBXHCharge(input, priceValue)  //????????????????????????
  }

  //????????????????????????
  refreshAccount = (isLoad=false) => {
    const account = store.getStore('account');
    const address = account.address;
    if (isNoEmpty(address)) {
        this.setState({ address: address });
        if(isLoad){
          this.loadData();
        }
    } else {
        this.setState({ address: null });
    }

    if (address != undefined && address !== null && address != '') {
      var tempAddr = null
      const digits = 10
      tempAddr = address.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += address.substr(address.length-digits, digits)
      this.setState({addressSubstr: tempAddr})
    }else{
      this.setState({addressSubstr: null});
    }
  }

  loadData = () => { 
    this.bridgeTokenInfo()
  }

  //????????????
  refreshData = (ref) => {
    const { inputVal } = this.state
    store.getBXHBridgeMain((data)=>{
      const { fromSymbol, bridgeSelect } = this.state
      if(data.bridge_token.length === 0){
        this.setState({
          fromSymbol: {
            symbol: 'BXH',
            balance: '0.00',
            allowance: '0',
          },
          symbolList: [],
          bridgeList: [],
        })
        return
      }
      let uniqueList = unique(data.bridge_token).sort(sortSymbol('tokenExType'))  //??????symbol??????,?????????
      let symbolDefault = {}
      symbolDefault = defaultSymbol(uniqueList, fromSymbol.symbol)  //???????????????????????????BXH???
      if(symbolDefault.length!==0){
        symbolDefault = symbolDefault
      }else{
        symbolDefault = uniqueList[0]
      }
      let ids= [];
      ids.push(symbolDefault.symbol)
      const list = data.bridge_token
      let filterList = filterCategory(list, ids)  //??????????????????
      // if(symbolDefault.tokenExType === 1){
      //   this.tokenPrice(symbolDefault, filterList[0]) //?????????????????????
      // }
      if(bridgeSelect.tokenExType===1){
        this.tokenPrice(symbolDefault, filterList[0]) //?????????????????????
      }else{
        // ???tokenExType=0,??????tokenRatio????????????
        this.renderGetPrice(inputVal, bridgeSelect.tokenRatio) //????????????
      }

      this.setState({ 
        symbolContract: data.bridge_contract, 
        bridgeSymbolConfig: data.bridge_config_list[0],
        bridgeConfigList: data.bridge_config_list,
        symbolList: uniqueList, //????????????(??????)
        symbolUnList: data.bridge_token, //????????????(?????????)
        fromSymbol: symbolDefault, //???????????????????????????BXH???
        bridgeList: filterList, //??????????????????
        bridgeSelect: ref===0 ? bridgeSelect : filterList[0], //????????????
        limitUsed: data.bridge_config_list[0].senderTokenAmount,  //???????????????????????????
        limitNumber: data.bridge_config_list[0].senderNumber,  //???????????????????????????
        limitTotal: data.bridge_config_list[0].maxValue,  //?????????????????????
        limitTotalWhite: data.bridge_config_list[0].maxValueWhite,  //????????????????????????????????????
        bridgeWallet: data.bridge_wallet,  //????????????????????????
      })
      this.refreshAccount(true);
    })

    //????????????????????????
    store.getBXHBridgeOrder((data)=>{
      this.setState({ 
        bridgeOrderList: data
      })
    })
  }

  //??????????????????
  bridgeTokenInfo = () => {
    const { symbolList, symbolContract } = this.state
    let total = 0;
    for(let i=0,count=symbolList.length;i<count;i++){
      let obj = symbolList[i];
      store._getBridgeTokenInfo(obj.senderToken,symbolContract[0].bridgeContract, (err,info)=>{
        if(err==null){
          obj.balance = info.balance;
          obj.allowance = info.allowance;
        }
        total += 1;
        if(total===count){//????????????
          this.setState({
            symbolList:[...symbolList],
          })
        }
      })
    }
  }


  render() {
    const { classes, t } = this.props;
    const { isMobile, footerMShow, transactionShow, symbolShow, bridgeShow, confirmationShow, modalSend, fromSymbol, inputVal, bridgeSelect } = this.state

    return (
      <div style={{ width: '100%' }}>
        <div className={getStyleClass('PCbroot',classes.root)}>
          <Header pagetype="bridge" />

          <div className={classes.root1}>
            <div className={classes.bxhtTit}>
              <h2>{t('BXH.BrTitle')}</h2>
              <h3>{t('BXH.BrDes')}</h3>
            </div>

            <div className={getStyleClass('PCTDaoCard',classes.bxhtConter)}>
              <div className={classes.bxhttabs}>
                <span style={{ fontWeight: 'bold' }}>{t('BXH.BrlontTitle')}</span>
                <span onClick={() => { this.onTransactionShow() }}>
                  <img src={require('../../assets/bxh/jilu.png')}/>
                </span>
              </div>
              
              {/* ????????? */}
              {
                this.renderBridge()
              }

              {
                parseFloat(inputVal)<parseFloat(bridgeSelect.senderTokenMin)?
                <div className={classes.bxhinputmin}>
                  {t('BXH.BrBelow')} {bridgeSelect.senderTokenMin} {bridgeSelect.symbol}
                </div>  
                :
                parseFloat(inputVal)>parseFloat(bridgeSelect.senderTokenMax)?
                <div className={classes.bxhinputmin}>
                  {t('BXH.BrAbove')} {bridgeSelect.senderTokenMax} {bridgeSelect.symbol}
                </div>  
                :
                null
              }
              
              <div className={classes.bxhzjianico}>
                <img src={require('../../assets/bxh/jiantoushangsheng.png')} />
              </div>

              {/* ???????????? */}
              {
                this.renderEstimate()
              }
              
              {/* ???????????? */}
              {
                this.renderAddress()
              }

              {/* ?????? */}
              {
                this.renderBottom()
              }
              
              {/* ?????????????????? */}
              {
                this.renderQuota()
              }

              {/* ???????????? */}
              {
                transactionShow && this.renderTransaction()
              }
              {/* ?????????????????? */}
              {
                symbolShow && this.renderSymbol()
              }
              {/* ?????????????????? */}
              {
                bridgeShow && this.renderBridgeList()
              }
              {/* ?????????????????? */}
              {
                confirmationShow && this.renderConfirmation()
              }

              { modalSend && this.renderSendModal()}

            </div>
          </div>
        </div>
        
        <Footer pagetype="bridge"/>
      </div>
    )

  };

  // ?????????
  renderBridge = () => {
    const { classes, t } = this.props
    const { fromSymbol } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div className={classes.bxhcontbg}>
        <div className={classes.bxhshuruks}>
          <span>{t('BXH.BrFrom')}
            {
              chainID === '1'?
              <i style={{ color: '#7E8CCB' }}>
                <img src={require('../../assets/bxh/ico_eth.png')} style={{ height: '17px' }} /> ETH
              </i>
              :
              chainID === '56'?
              <i style={{ color: '#FDD436' }}>
                <img src={require('../../assets/bxh/ico_bsc.png')} style={{ height: '17px' }} /> BSC
              </i>
              :
              chainID === '66'?
              <i style={{ color: '#3E7EFF' }}>
                <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" style={{ height: '17px' }} /> OKC
              </i>
              :
              chainID === '137'?
              <i style={{ color: '#8841FF' }}>
                <img src={require('../../assets/bxh/ico_poly.png')} style={{ height: '17px' }} /> POLYGON
              </i>
              :
              chainID === '43114'?
              <i style={{ color: '#E84142' }}>
                <img src={require('../../assets/bxh/ico_avax.png')} style={{ height: '17px' }} /> AVAX
              </i>
              :
              <i style={{ color: '#2EBC84' }}>
                <img src={require('../../assets/bxh/ico_heco.png')} style={{ height: '17px' }} /> HECO
              </i>
            }
          </span>
          <span>
            <em>{t('BXH.yuetitle')}</em>
            {fromSymbol.balance&&fromSymbol.balance||'0.00'}
          </span>
        </div>

        <div className={classes.bxhbtestm}>
          {this.renderAssetInput1()}
          <div className={classes.bxhicosl} >
            <span className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={ this.MAXBalance }>MAX</span>
            <span style={{ fontSize: '16px' }} onClick={() => { this.onSymbolShow() }}>
              <img src={getTokenLogoURLWithName(fromSymbol.symbol)} />
              {fromSymbol.symbol}
              <img src={require('../../assets/bxh/jiantou1.png')} className={classes.bxhxiala} />
            </span>
          </div>
        </div>
      </div>
    )
  }

  // ???????????????
  renderAssetInput1 = (asset, type) => {
    const { classes, t } = this.props
    const { fromSymbol, inputVal } = this.state
    let senderTokenMin = (fromSymbol&&fromSymbol.senderTokenMin)||'1'
    let placeholder = t('BXH.BrMinimum') + senderTokenMin

    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          className={classes.bxhInput}
          value={ inputVal || '' }
          onChange={ this.onChangeTo.bind(this, fromSymbol.balance ? (Math.floor(fromSymbol.balance*10000)/10000): '0.00') }
          placeholder={placeholder}
          variant="outlined"
        />
      </div>
    )
  }

  // ????????????
  renderEstimate = () => {
    const { classes, t } = this.props
    const { fromSymbol, feeValue, inputVal, feeToInputVal, bridgeSelect } = this.state
    let feeToVal = feeToInputVal
    if(feeToVal&&feeToVal!==NaN&&feeToVal!=='NaN'){
      feeToVal = feeToInputVal
    }else{
      feeToVal = (inputVal&&_getValueMinus4(inputVal, feeValue))||'--'
    }
    //tokenExType=1????????????=????????????-????????????
    // let feeValueType = '--'
    // feeValueType = (inputVal&&feeToInputVal&&_getValueMinus4(inputVal, feeToInputVal))||'--'

    return (
      <div>
      <div className={classes.bxhcontbg}>
        <div className={classes.bxhshuruks}>
          <span style={{cursor: 'pointer'}} onClick={() => { this.onBridgeShow() }}>
            {t('BXH.BrTo')}
            {
              bridgeSelect.payChainId===1?
              <i style={{ color: '#7E8CCB' }}>
                <img src={require('../../assets/bxh/ico_eth.png')} style={{ height: '17px' }} /> ETH
              </i>
              :
              bridgeSelect.payChainId===56?
              <i style={{ color: '#FDD436' }}>
                <img src={require('../../assets/bxh/ico_bsc.png')} style={{ height: '17px' }} /> BSC
              </i>
              :
              bridgeSelect.payChainId===66?
              <i style={{ color: '#3E7EFF' }}>
                <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" style={{ height: '17px' }} /> OKC
              </i>
              :
              bridgeSelect.payChainId===128?
              <i style={{ color: '#2EBC84' }}>
                <img src={require('../../assets/bxh/ico_heco.png')} style={{ height: '17px' }} /> HECO
              </i>
              :
              bridgeSelect.payChainId===137?
              <i style={{ color: '#8841FF' }}>
                <img src={require('../../assets/bxh/ico_poly.png')} style={{ height: '17px' }} /> POLYGON
              </i>
              :
              bridgeSelect.payChainId===43114?
              <i style={{ color: '#E84142' }}>
                <img src={require('../../assets/bxh/ico_avax.png')} style={{ height: '17px' }} /> AVAX
              </i>
              :
              <i>{t('BXH.BrSelectChain')}</i>
            }
            <img src={require('../../assets/bxh/jiantou1.png')} className={classes.bxhxiala} />
          </span>
        </div>

        <div className={classes.bxhbtestm}>
          <div>{feeToVal}</div>
          <div className={classes.bxhicosl} >
            <span style={{ fontSize: '16px' }}>
              <img src={getTokenLogoURLWithName(fromSymbol.symbol)} />
                {fromSymbol.symbol}
            </span>
          </div>
        </div>

      </div>

      <div className={classes.bxhshuruks}>
        <span style={{ opacity: '.6' }}>{t('BXH.BrServiceCharge')}???</span>
        <span>
            {feeValue}&nbsp;<em>{fromSymbol.symbol}</em>
        </span>
      </div>
      </div>
    )
  }

  // ????????????
  renderAddress = () => {
    const { classes, t } = this.props
    const { address, addressSubstr, addressShow, addressVal, isAddress, isMobile, bridgeSelect } = this.state

    return (
      <div className={classes.bxhwelladdress}>
        <div className={classes.bxhaddress}>
          <div className={classes.bxhaddtit}>{t('BXH.BrCollectionAddress')}</div>
          {
            !addressShow ?
            <div className={classes.bxhaddnei}>
              {
                isMobile === 1?
                <em>{address}</em>
                :
                <em>{addressSubstr}</em>
              }
              <span className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={this.addressPro}>{t('BXH.BrModify')}</span>
            </div>
            :
            null
          }
          {
            addressShow ?
            <div className={classes.bxhaddnei}>
              <em className={classes.bxhaddconter}>
                <TextField
                  fullWidth
                  className={classes.bxhaddressInput}
                  value={ addressVal || '' }
                  onChange={ this.onChangeAddress.bind(this) }
                  placeholder={address}
                  variant="outlined"
                />
              </em>
              <span>
                <i className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={this.addressBottom}>{t('BXH.BrConfirm')}</i>
                <i className={getStyleClass('PCDialogmax',classes.bxhmax)} style={{ marginRight: '0px' }} onClick={this.addressClose}>{t('BXH.BrCancel')}</i>
              </span>
            </div>
            :
            null
          }
          {
            isAddress?
            null
            :
            <div className={classes.bxhisaddress}>{t('BXH.BrInvalid')}</div>
          }
        </div>
        <div className={classes.bxhtishiaddress}>
          <img src={require('../../assets/bxh/zhuyi.png')} />
          {
            bridgeSelect.payChainId === 1?
            <span>{t('BXH.BrPleaseBe')}ERC20{t('BXH.BrCollection')}</span>
            :
            bridgeSelect.payChainId === 56?
            <span>{t('BXH.BrPleaseBe')}BEP20{t('BXH.BrCollection')}</span>
            :
            bridgeSelect.payChainId === 66?
            <span>{t('BXH.BrPleaseBe')}OKCChain{t('BXH.BrCollection')}</span>
            :
            bridgeSelect.payChainId === 137?
            <span>{t('BXH.BrPleaseBe')}POLYGON{t('BXH.BrCollection')}</span>
            :
            bridgeSelect.payChainId === 43114?
            <span>{t('BXH.BrPleaseBe')}AVAX{t('BXH.BrCollection')}</span>
            :
            <span>{t('BXH.BrPleaseBe')}HECO{t('BXH.BrCollection')}</span>
          }
        </div>
      </div>
    )
  }

  // ??????
  renderBottom = () => {
    const { classes, t } = this.props
    const { fromSymbol, inputVal, bridgeSelect } = this.state

    return (
      <div style={{ width: '100%' }}>
        {
          fromSymbol.allowance>0?
          <div>
            {
              inputVal>0&&parseFloat(inputVal)>=parseFloat(bridgeSelect.senderTokenMin)&&parseFloat(inputVal)<=parseFloat(bridgeSelect.senderTokenMax)?
              <div className={getStyleClass('PC_new_btn1',classes.bxhbottomUnAbleClickflex)} onClick={() => { this.onConfirmationShow() }}>
                {t('BXH.confirm')}
              </div>
              :
              <div className={getStyleClass('sureDisable',classes.bxhbottomUnAbleClickflex)}>
                {t('BXH.weishurutitle')}
              </div>
            }
          </div>    
          :
          <div className={getStyleClass('PC_new_btn1',classes.bxhbottomUnAbleClickflex)} onClick={this.approve}>
            Approve
          </div>
        }
      </div>
    )
  }

  // ??????????????????
  renderQuota = () => {
    const { classes, t } = this.props
    const { fromSymbol, limitUsed, limitTotal, limitTotalWhite, bridgeWallet } = this.state
    let baifenbi = _getValueDivided(limitUsed, limitTotal, 4) + '%'
    let baifenbiWhite = _getValueDivided(limitUsed, limitTotalWhite, 4) + '%'

    return (
      <div>
        <div className={classes.bxhklian}>
          <span>{t('BXH.BrDaily')}</span>
          <span>
            {limitUsed}/
            {
              bridgeWallet?
              <em>{limitTotalWhite}</em>
              :
              <em>{limitTotal}</em> 
            }&nbsp;
            {fromSymbol.symbol}
          </span>
        </div>
        <div className={classes.bxhklxian}>
          {
            bridgeWallet?
            <div className={classes.bxhklusedxian} style={{ width: baifenbiWhite }}></div>
            :
            <div className={classes.bxhklusedxian} style={{ width: baifenbi }}></div>
          }
        </div>
      </div>
    )
  }

  renderSendModal = () => {
    const { modalSendType, msgContent, txHash } = this.state
    return (
        <SendDialog onClose={()=>{this.setState({modalSend:false})}} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }

  // ????????????
  renderTransaction = () => {
    const { bridgeOrderList, bridgeSymbolConfig, isMobile } = this.state
    return (
      <TransactionMarket onClose={this.onTransactionClose} bridgeOrderList={bridgeOrderList} bridgeSymbolConfig={bridgeSymbolConfig} isMobile={isMobile} />
    )
  }
  onTransactionClose = () => {
    this.setState({ transactionShow: false })
    clearInterval(this.timer);  //???????????????  
  }
  onTransactionShow = () => {
    this.setState({ transactionShow: true });
    setTimeout(this.iTimer, 0); //???????????????
  }

  timer = null;
  //????????????????????????????????????
  iTimer = () => {
    this.timer = setInterval(() => {
      store.getBXHBridgeOrder((data)=>{
        this.setState({ 
          bridgeOrderList: data
        })
      })
    }, 2000);
  }

  // ??????????????????
  renderSymbol = () => {
    const { symbolList, fromSymbol } = this.state
    return (
      <SymbolMarket onClose={this.onSymbolClose} symbolList={symbolList} fromSymbol={fromSymbol} onSure={this.onSymbol} />
    )
  }
  onSymbolClose = () => {
    this.setState({ symbolShow: false })
  }
  onSymbolShow = () => {
    this.setState({ symbolShow: true });
  }
  onSymbol = (selectSymbol) => {
    const { bridgeSelect, inputVal, bridgeConfigList, symbolUnList } = this.state
    let symbolConfig = defaultSymbol(bridgeConfigList, selectSymbol.symbol)  //????????????????????????config
    this.setState({ 
      fromSymbol: selectSymbol, //??????????????????
      bridgeSymbolConfig: symbolConfig, //????????????????????????config
      limitTotal: symbolConfig.maxValue,  //?????????????????????
      limitTotalWhite: symbolConfig.maxValueWhite,  //????????????????????????????????????
      limitUsed: symbolConfig.senderTokenAmount,  //???????????????????????????
      limitNumber: symbolConfig.senderNumber,  //???????????????????????????
    })

    if(selectSymbol.tokenExType === 0){
      // this.setState({toInputVal: inputVal}); //??????????????????????????????
      // this.serviceCharge(inputVal)  //????????????????????????
      // ???tokenExType=0,??????tokenRatio????????????
      this.renderGetPrice(inputVal, selectSymbol.tokenRatio) //????????????
    }else{
      this.tokenPrice(selectSymbol, bridgeSelect) //?????????????????????
    }

    //????????????????????????????????????????????????
    let uniqueList = unique(symbolUnList).sort(sortSymbol('tokenExType'))  //??????symbol??????,?????????
    let symbolDefault = defaultSymbol(uniqueList, selectSymbol.symbol)  //???????????????????????????BXH???
    let ids= [];
    ids.push(symbolDefault.symbol)
    let filterList = filterCategory(symbolUnList, ids)  //??????????????????
    this.setState({ 
      bridgeList: filterList, //??????????????????
      bridgeSelect: filterList[0], //????????????
    })
  }

  // ??????????????????
  renderBridgeList = () => {
    const { bridgeList, bridgeSelect } = this.state
    return (
      <BridgeMarket onClose={this.onBridgeClose} bridgeList={bridgeList} bridgeSelect={bridgeSelect} onSure={this.onBridge} />
    )
  }
  onBridgeClose = () => {
    this.setState({ bridgeShow: false })
  }
  onBridgeShow = () => {
    this.setState({ bridgeShow: true });
  }
  onBridge = (selectBridge) => {
    const { fromSymbol, inputVal } = this.state
    this.setState({ 
      bridgeSelect: selectBridge, //????????????
    })
    if(selectBridge.tokenExType===1){
      this.tokenPrice(fromSymbol, selectBridge) //?????????????????????
    }else{
      // ???tokenExType=0,??????tokenRatio????????????
      this.renderGetPrice(inputVal, selectBridge.tokenRatio) //????????????
    }
  }

  // true:???????????????false???????????????
  myIsNumber = (value) => {
    if (value==undefined||value==null) {
        return false;
    }
    return !isNaN(value);
  }

  onChangeTo = (value, event) => {
    const { fromSymbol, senderPrice, payPrice, bridgeSelect } = this.state
    let tokenExType = bridgeSelect.tokenExType
    var val = event.target.value;

    this.setState({inputVal: val});
    //tokenExType token???????????????????????????0??????1:1???????????????1?????????????????????????????????????????????USDT??????????????????
    if(tokenExType === 0){
      // this.setState({toInputVal: val}); //??????????????????????????????
      // this.serviceCharge(val)  //????????????????????????
      // ???tokenExType=0,??????tokenRatio????????????
      this.renderGetPrice(val, bridgeSelect.tokenRatio) //????????????
    }else{
      let pricePro = _getValueDivided(senderPrice, payPrice, 4)
      let priceValue
      if(val){
        priceValue = _getValuemultip(val, pricePro, 4)
      }else{
        priceValue = ''
      }
      this.setState({toInputVal: priceValue}); //??????????????????????????????
      this.serviceBXHCharge(val, priceValue)  //????????????????????????(BXH)
    }
  }

  // MAX??????(??????From??????)
  MAXBalance = async () => {
    const { fromSymbol, senderPrice, payPrice, bridgeSelect } = this.state
    let balance = fromSymbol.balance
    let tokenExType = bridgeSelect.tokenExType
    if(balance<0) {
      balance = "0";
    }
    this.setState({inputVal: balance});
    //tokenExType token???????????????????????????0??????1:1???????????????1?????????????????????????????????????????????USDT??????????????????
    if(tokenExType === 0){
      // this.setState({toInputVal: val}); //??????????????????????????????
      // this.serviceCharge(val)  //????????????????????????
      // ???tokenExType=0,??????tokenRatio????????????
      this.renderGetPrice(balance, bridgeSelect.tokenRatio) //????????????
    }else{
      let pricePro = _getValueDivided(senderPrice, payPrice, 4)
      let priceValue
      if(balance){
        priceValue = _getValuemultip(balance, pricePro, 4)
      }else{
        priceValue = ''
      }
      this.setState({toInputVal: priceValue}); //??????????????????????????????
      this.serviceCharge(priceValue)  //????????????????????????
    }
  }

  //?????????????????????
  tokenPrice = async (symbolDefault, bridgeSelect) => {
    store.getBXHTokenPrice(symbolDefault.senderChainId,symbolDefault.symbol,(price)=>{
      
    })
    store.getBXHTokenPayPrice(bridgeSelect.payChainId,symbolDefault.symbol,(price)=>{
      
    })
  }

  // ????????????????????????
  serviceCharge = (val) => {
    const { bridgeSymbolConfig } = this.state
    //?????????
    const bridgeFee = bridgeSymbolConfig&&_getValueDivided1(bridgeSymbolConfig.bridgeFee, 1000)
    let fee = '0.00'
    fee = _getValuemultip(val, bridgeFee, 4)
    if(!this.myIsNumber(fee)){
      this.setState({ feeValue: '0.00' })
    }else{
      this.setState({ feeValue: fee })
    }
    //????????????
    if(val){
      this.setState({ feeToInputVal: _getValueMinus4(val, fee) })
    }else{
      this.setState({ feeToInputVal: '--' })
    }
  }
  
  //????????????????????????(BXH)
  serviceBXHCharge = (val, priceValue) => {
    const { bridgeSymbolConfig } = this.state
    //?????????
    const bridgeFee = bridgeSymbolConfig&&_getValueDivided1(bridgeSymbolConfig.bridgeFee, 1000)
    let fee = '0.00'
    fee = _getValuemultip(val, bridgeFee, 4)
    if(!this.myIsNumber(fee)){
      this.setState({ feeValue: '0.00' })
    }else{
      this.setState({ feeValue: fee })
    }
    //????????????
    if(priceValue){
      this.setState({ feeToInputVal: _getValueMinus4(priceValue, fee) })
    }else{
      this.setState({ feeToInputVal: '--' })
    }
  }


  //??????????????????
  addressPro = () => {
    this.setState({ addressShow: true, addressVal: null })
  }
  addressBottom = () => {
    const { address, addressVal } = this.state
    if(addressVal){
      var tempAddr = null
      const digits = 10
      tempAddr = addressVal.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += addressVal.substr(addressVal.length-digits, digits)
      this.setState({ address: addressVal, addressSubstr: tempAddr })
      store.bridgeAddressToken(addressVal, (data)=>{
        this.setState({ isAddress: data })
      })
    }else{
      this.setState({ address: address, addressSubstr: address })
    }
    this.setState({ addressShow: false })
  }
  addressClose = () => {
    this.setState({ addressShow: false, addressVal: null })
  }
  onChangeAddress = (event) => {
    var val = event.target.value;
    this.setState({addressVal: val});
  }


  contractRequst = (msgContent) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
  }

  approve = () => {
    const { t } = this.props
    const { addressShow, symbolContract, fromSymbol } = this.state
    if(addressShow){
      this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.PleaseAddress') })
      return false
    }

    if(isEmpty(fromSymbol.allowance)){
        return;
    }
    const msgContent = "Approve "+fromSymbol.symbol;
    this.contractRequst(msgContent);
    store.bridgeApproveToken({senderToken:fromSymbol.senderToken, contractAddress:symbolContract[0].bridgeContract, msgContent})
  }

  // ??????????????????
  renderConfirmation = () => {
    const { fromSymbol, inputVal, feeToInputVal, feeValue, bridgeSelect, address, addressSubstr, isMobile } = this.state
    return (
      <ConfirmationMarket onClose={this.onConfirmationClose} onSure={this.onBottom} address={address} addressSubstr={addressSubstr} isMobile={isMobile} fromSymbol={fromSymbol} bridgeSelect={bridgeSelect} inputVal={inputVal} feeToInputVal={feeToInputVal} feeValue={feeValue} />
    )
  }
  onConfirmationClose = () => {
    this.setState({ confirmationShow: false })
  }
  onConfirmationShow = () => {
    const { t } = this.props
    const { addressShow, isAddress, bridgeSymbolConfig, bridgeWallet, limitNumber, inputVal, limitUsed, limitTotal, limitTotalWhite } = this.state

    if(addressShow){
      this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.PleaseAddress') })
      return false
    }

    //??????????????????
    if(bridgeWallet){

      //????????????????????????????????????
      if( inputVal > (limitTotalWhite*1 - limitUsed*1) ){
        this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.BrExceeding') })
        return false
      }

      //????????????????????????????????????
      if(limitNumber >= bridgeSymbolConfig.maxCountWhite){
        this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.BrItTrade') + bridgeSymbolConfig.maxCountWhite + t('BXH.BrTimesDay') })
      }else{
        if(isAddress){
          this.setState({ confirmationShow: true });
        }
      }
    }else{

      //????????????????????????????????????
      if( inputVal > (limitTotal*1 - limitUsed*1) ){
        this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.BrExceeding') })
        return false
      }

      //????????????????????????????????????
      if(limitNumber >= bridgeSymbolConfig.maxCount){
        this.setState({ modalSend: true, loading: false, modalSendType: -2, msgContent: t('BXH.BrItTrade') + bridgeSymbolConfig.maxCount + t('BXH.BrTimesDay') })
      }else{
        if(isAddress){
          this.setState({ confirmationShow: true });
        }
      }
    }
  }

  // ??????
  onBottom = () => {
    const { symbolContract, fromSymbol, inputVal, feeToInputVal, toInputVal, bridgeSelect, address } = this.state
    if(isEmpty(toInputVal)){
      return;
    }
    this.onTransaction()  //???????????????????????????
    const msgContent = "Trasferred "+feeToInputVal+" "+fromSymbol.symbol;
    this.contractRequst(msgContent);

    //?????????????????????v,r,s???
    store._getBridgeSign(bridgeSelect.payChainId, fromSymbol.senderToken, address, inputVal, (data)=>{
      if(data.status === 200){
        //??????
        store.bridgeBottomToken({
          contractAddress:symbolContract[0].bridgeContract, 
          token:fromSymbol.senderToken, 
          payToken:bridgeSelect.payToken, 
          payChainId:bridgeSelect.payChainId, 
          msgContent, 
          inputVal, 
          address,
          r: data.data.body.r,
          s: data.data.body.s,
          v: data.data.body.v,
        })
      }
    })
    
  }

  //???????????????????????????
  onTransaction = () => {
    const { address, fromSymbol, bridgeSelect, inputVal, feeToInputVal } = this.state
    const payChainId = (bridgeSelect&&bridgeSelect.payChainId)||"--";
    let chainID = localStorage.getItem('chainIDSwitch')
    let bridgeBottomArray = []
    bridgeBottomArray.push({
      orderStatus: 0,
      senderTx: '',
      payAddress: address,
      symbol: fromSymbol.symbol,
      senderChainId: parseInt(chainID),
      payChainId: payChainId,
      senderTokenAmount: parseFloat(inputVal),
      payTokenAmount: parseFloat(feeToInputVal),
    })
    // localStorage.setItem("bridgeBottomArray", JSON.stringify(bridgeBottomArray))
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(Bridge)));
