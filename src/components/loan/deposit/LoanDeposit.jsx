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
import Snackbar from '../../snackbar/snackbar';
import UnlockModal from '../../unlock/unlockModal.jsx';
import Store from "../../../stores";
import cookie from 'react-cookies';
import LoanBackDialog from './LoanBackDialog.jsx';
import LoanMentDialog from './LoanMentDialog.jsx';
import LoanDepositAlert from '../alert/LoanDepositAlert.jsx';
import { Tooltip } from 'antd';
import { 
  getTokenLogoURLWithName, 
  _getValuemultip1, 
  _getValueDivided3,
  _getValueAdd2,
  _getValueMinus4,
  _getValueDivided,
  _getValuemultip,
  SaveToTwoWei,
  isNoEmpty,
  priceSort,
  getStyleClass
} from '../../../config/constantFunction'

import {
  
} from '../../../constants';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
  switch: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
  },
  switchContent: {
    borderRadius: '4px',
    padding: '1px',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
        padding: '2px',
    },
    '& div': {
        width: '100px',
        height: '30px',
        lineHeight: '30px',
        borderRadius: '4px',
        fontWeight: 'bold',
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            width: '160px',
            lineHeight: '36px',
            height: '36px',
        },
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },        
    },
  },
  switchhecoContent: {
    backgroundColor: '#22253F',
  },
  depSwit: {
    width: '100%',
    float: 'left',
    marginTop: '16px',
    justifyContent: 'center',
    fontSize: '14px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
      width: '48.5%',
    },
  },
  depConbg: {
    width: '100%',
    background: '#20233C',
    padding: '20px',
    borderRadius: '12px',
    [theme.breakpoints.up('sm')]: {
      // width: '48.5%',
      // float: 'left',
      // margin: 'auto',
      // marginBottom: '20px',
    },
  },
  depConTit: {
    fontSize: '19px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deploanTit: {
    '& img': {
      width: '35px',
      verticalAlign: 'middle',
      marginRight: '10px',
    }
  },
  depOpen: {
    fontSize: '13px',
    paddingTop: '5px',
    '& img': {
      width: '40px',
      verticalAlign: 'middle',
      marginRight: '5px',
      cursor: 'pointer',
    },
    '& span': {
      opacity: '.6',
    }
  },
  depcomti: {
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #2D2F45',
    paddingBottom: '6px',
    marginBottom: '6px',
    '& span': {
      opacity: '.8',
      lineHeight: '35px',
    },
    '& em': {
      fontStyle: 'inherit',
      textAlign: 'right',
    },
    '& i': {
      display: 'inherit',
      fontStyle: 'inherit',
      opacity: '.6',
      fontSize: '12px',
    },
    '& img': {
      width: '12px',
      height: '12px',
      marginLeft: '5px',
      cursor: 'pointer',
    }
  },
  deplvse: {
    lineHeight: '35px',
  },
  depbottom: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  bxh_new_btn: {
    width: '45%',
    height: '40px',
    lineHeight: '40px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    marginRight: '10px',
    color: '#FFFFFF',
    textDecoration: 'none',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 1)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  bxh_new_btn2: {
    width: '45%',
    height: '40px',
    lineHeight: '36px',
    border: '1px solid #30BE85',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#30BE85',
    textDecoration: 'none',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 0.3)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  depnot: {
    width: '100%',
    textAlign: 'center',
    padding: '30px 0',
    borderRadius: '12px',
    marginTop: '16px',
    '& img': {
      width: '120px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '20px',
    }
  },
  depnotconts: {
    marginTop: '20px',
    '& span': {
      display: 'block',
      fontSize: '14px',
      color: '#F2F2F2',
      paddingBottom: '5px',
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      fontSize: '12px',
      opacity: '.6',
    },
  },
  deperconter: {
    float:'left', 
    width: '100%', 
    marginTop: '0px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '18px'
    }
  },
  woindlotone: {
    width: '100%', 
  },
  deploading: {
    textAlign: 'center',
    padding: '50px',
  }
})

class LoanDeposit extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedIndex: 0,
      modalSend: false,
      modalMentSend: false,
      modalDepositAlert: false,
      modalMortgageBackType: '0',
    }
  }
  
  componentDidMount() {
    
  }
  componentWillMount() {
    
  }
  componentWillUnmount() {
    
  }


  render() {
    const { classes, t, moduleConfig } = this.props
    const { selectedIndex, modalSend, modalMentSend, modalDepositAlert } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    let moduleListArray = [], marketListArray = [], moduleListLength = 0, marketListLength = 0,balanceStored = 0
    if(moduleConfig&&moduleConfig.length > 0){
      moduleConfig.map((obj,idx)=>{
        //存款
        if(obj.accountCTokens&&obj.accountCTokens.length > 0&&obj.accountCTokens[0].cTokenBalance!== '0'){
          moduleListArray.push(obj)
          moduleListLength = idx
        }
        //借贷
        if(obj.accountCTokens&&obj.accountCTokens.length > 0){
          //借贷金额
          balanceStored = obj.balanceStored
          if(balanceStored > 0){
            marketListArray.push(obj)
            marketListLength = idx
          }
        }
      })
    }

    return (
      <div>

        <div className={classes.switch}>
            <div className={getStyleClass('fontremenbd',classes.switchContent)}>
                <div onClick={()=>{this.setState({selectedIndex:0})}} className={selectedIndex==0?getStyleClass('PC_new_btn1'):null}>{t('BXH.myDeposit')}</div>
                <div onClick={()=>{this.setState({selectedIndex:1})}}className={selectedIndex==1?getStyleClass('PC_new_btn1'):null}>{t('BXH.myLoan')}</div>
            </div>
        </div>
        {
          selectedIndex==0?(
            <div>
              <div className={classes.deperconter}>
       
                {/* 我的存款 */}
                {
                  moduleListArray.length===0?
                  this.noData()
                  :
                  moduleListArray.map((obj,idx)=>this.savings(obj,idx,moduleListLength,moduleListArray))
                }
              </div>
              <div style={{ clear:'both' }}></div>
            </div>
          ):(
            <div>
              <div className={classes.deperconter}>
                {/* 我的借贷 */}
                {
                  marketListArray.length===0?
                  this.noData()
                  :
                  marketListArray.map((obj,idx)=>this.myLoan(obj,idx,marketListLength,marketListArray))
                }
              </div>
              <div style={{ clear:'both' }}></div>
            </div>
          )
        }

        { modalDepositAlert && this.renderDepositAlert() }
        {/* 提取存款 */}
        { modalSend && this.renderSendModal() }
        {/* 还款 */}
        { modalMentSend && this.renderMentModal() }
        
      </div>
    )
  };

  // 加载
  noLoading(){
    const { classes, t } = this.props;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={[classes.deploading, chainID === '56' ? 'bsclistConter' : chainID === '66' ? 'okexlistConter' : chainID === '1' ? 'ethlistConter' : 'hecolistConter'].join(' ')}>
        {
          chainID === '56' ? 
          <img src={require('../../../assets/bxh/load1.png')} className='stateIcoImage' />
          :
          chainID === '66' ? 
          <img src={require('../../../assets/bxh/load2.png')} className='stateIcoImage' />
          :
          chainID === '1' ? 
          <img src={require('../../../assets/bxh/load3.png')} className='stateIcoImage' />
          :
          <img src={require('../../../assets/bxh/load.png')} className='stateIcoImage' />
        }
      </div>
    )
  }

  //暂无数据
  noData(){
    const { classes, t } = this.props;
    const { selectedIndex } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div className={[classes.depnot, chainID === '56' ? 'bsclistConter' : chainID === '66' ? 'okexlistConter' : chainID === '1' ? 'ethlistConter' : 'hecolistConter'].join(' ')}>
        {
          selectedIndex===0?
          <div>
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/loannot.png" />
            <div className={classes.depnotconts}>
              <span>{t('BXH.loanTip1')}</span>
              <em>{t('BXH.loanTip2')}</em>
            </div>
          </div>
          :
          <div>
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/loannot1.png" />
            <div className={classes.depnotconts}>
              <span>{t('BXH.loanTip3')}</span>
              <em>{t('BXH.loanTip4')}</em>
            </div>
          </div>
        }
      </div>
    )
  }


  // 我的存款
  savings(obj,idx,moduleListLength,moduleListArray) {
    const { classes, t, openUnlockModal, bxhInfo, address } = this.props;
    let chainID = localStorage.getItem('chainIDSwitch')
    const symbol = (obj&&obj.param2)||"--";  //币种
    const balance = obj&&obj.balance;  //钱包余额
    const price = obj&&obj.price;  //当前币种价值
    //存款金额(cTokenBalance * exchangeRate 算出当前值多少个 token)
    const totalBalance = obj&&obj.accountCTokens[0]&&obj.market&&_getValuemultip1(obj.accountCTokens[0].cTokenBalance, obj.market.exchangeRate)
    const walletPrice = _getValuemultip1(balance, price) //钱包余额价值
    const depositPrice = _getValuemultip1(totalBalance, price) //存款金额价值
    const totalCollateral = obj&&obj.market&&_getValuemultip1(_getValuemultip1(totalBalance, obj.market.collateralFactor), price)  //抵押价值(存款金额*抵押率*当前币种价值)
    //存款利率
    let supplyRate = obj&&obj.market&&_getValuemultip(obj.market.supplyRate,100,6);
    const supplyRateStr = isNoEmpty(supplyRate)?SaveToTwoWei(supplyRate)+'%':'--';
    //补贴利率
    const dayOutput = obj&&obj.compSpeed&&_getValueDivided(_getValuemultip(_getValuemultip(obj.compSpeed,3600,18),24,18),3,18)
    const tvl = obj&&obj.market&&_getValuemultip(obj.market.cash,obj.price,18)
    let subsidyRate = bxhInfo&&_getValuemultip(_getValueDivided(_getValuemultip(dayOutput,bxhInfo.bxh_price,18),tvl,18),36500,18)
    const subsidyRateStr = isNoEmpty(subsidyRate)?SaveToTwoWei(subsidyRate)+'%':'--';
    //抵押价值提示框
    const tooltipStr = obj&&obj.market&&t('BXH.depositAmount')+'*'+t('BXH.Mortgage')+'('+obj.market.collateralFactor+')';

    // console.log(obj.accountCTokens[0])
    // console.log(obj.market)
    // console.log(obj)

    return (
        <div key={idx} className={[classes.depSwit, moduleListArray.length <= 1 ? classes.woindlotone : null, 'deplistConter'].join(' ')} >

          <div className={getStyleClass('listConter',classes.depConbg)}>
            <div className={classes.depConTit}>
              <div className={classes.deploanTit}>
                <img src={getTokenLogoURLWithName(symbol)} />
                {symbol}
              </div>
              {
                obj.accountCTokens[0].enteredMarket === false ?
                <div className={classes.depOpen} onClick={() => { this.openMarkets(obj, 0) }}>
                  <img src={ require('../../../assets/bxh/loanoff.png') } />
                  <span>{t('BXH.startMortgage')}</span>
                </div>
                :
                <div className={classes.depOpen} onClick={() => { this.openMarkets(obj, 1) }}>
                  {
                    chainID === '56' ? 
                    <img src={ require('../../../assets/bxh/loanon1.png') } />
                    :
                    chainID === '66' ? 
                    <img src={ require('../../../assets/bxh/loanon2.png') } />
                    :
                    chainID === '1' ? 
                    <img src={ require('../../../assets/bxh/loanon3.png') } />
                    :
                    <img src={ require('../../../assets/bxh/loanon.png') } />
                  }
                  <span>{t('BXH.cancelMortgage')}</span>
                </div>
              }
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.depositRate')}</span>
              <em className={classes.deplvse}>
                {supplyRateStr}
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.subsidyRate')} (BXH)
                <Tooltip overlayClassName="global_tooltip" title={t('BXH.mentliquidity')}>
                    <img src={require('../../../assets/bxh/question.png')}/>
                </Tooltip>
              </span>
              <em className={classes.deplvse}>
                {subsidyRateStr}
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.depositAmount')}</span>
              <em>
                {SaveToTwoWei(totalBalance, 4)}{symbol}
                <i>${isNoEmpty(depositPrice)?SaveToTwoWei(depositPrice, 4):'--'}</i>
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.walletBalance')}</span>
              <em>
                {isNoEmpty(balance)?SaveToTwoWei(balance, 4):'--'}{symbol}
                <i>${isNoEmpty(walletPrice)?SaveToTwoWei(walletPrice, 4):'--'}</i>
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.collateralValue')}
                <Tooltip overlayClassName="global_tooltip" title={tooltipStr}>
                    <img src={require('../../../assets/bxh/question.png')}/>
                </Tooltip>
              </span>
              {
                obj.accountCTokens[0].enteredMarket==true?
                <em className={classes.deplvse}>${isNoEmpty(totalCollateral)?SaveToTwoWei(totalCollateral, 4):'--'}</em>
                :
                <em className={classes.deplvse}>$0</em>
              }
            </div>
            <div className={classes.depbottom}>
              <div className={getStyleClass('PC_new_btn2', classes.bxh_new_btn2)} onClick={() => { this.openMortBack(obj, depositPrice, moduleListArray, '0') }}>
                {t('BXH.withdrawDeposit')}
              </div>
              <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)}>
                {
                  address?(
                    (!obj.param3||obj.param3==='')||(obj.allowance&&obj.allowance>0)?
                    <div onClick={()=>this.openDepositAlert(obj)}>{t('BXH.deposit')}</div>
                    :
                    <div onClick={()=>this.approve(obj)}>Approve</div>
                  ):(
                    <div onClick={()=>openUnlockModal()}>Unlock</div>
                  )
                }
              </div>
            </div>
          </div>

        </div>
    )
  }


  // 我的借贷
  myLoan(obj,idx,marketListLength,marketListArray) {
    const { classes, t, bxhInfo } = this.props;
    const symbol = (obj&&obj.param2)||"--";  //币种
    const balance = obj.balance;  //钱包余额
    const price = obj.price;  //当前币种价值
    const loanBalance = obj.balanceStored  //借贷金额
    const walletPrice = _getValuemultip1(balance, price) //钱包余额价值
    const depositPrice = _getValuemultip1(loanBalance, price) //存款金额价值
    let borrowRate = null;//贷款利率
    let subsidyRate = null;//补贴利率
    //总利率
    let totalRate = null;
    if(obj.market&&isNoEmpty(obj.market.borrowRate)){
        borrowRate = _getValuemultip(obj.market.borrowRate,100,6);
        if(bxhInfo&&bxhInfo.bxh_price>0&&isNoEmpty(obj.compSpeed)&&isNoEmpty(obj.price)&&obj.price>0){
            const dayOutput = _getValueDivided(_getValuemultip(_getValuemultip(obj.compSpeed,3600,18),24,18),3,18)
            const tvl = _getValuemultip(obj.market.cash,obj.price,18)
            subsidyRate = _getValuemultip(_getValueDivided(_getValuemultip(dayOutput,bxhInfo.bxh_price,18),tvl,18),36500,18)
            totalRate = _getValueMinus4(borrowRate,subsidyRate);
        }else{
            totalRate = borrowRate;
        }
    }
    //使用利率
    let usageRate = '--';
    if(obj.market&&isNoEmpty(obj.market.totalBorrows)&&isNoEmpty(obj.market.cash)){
      if(obj.market.cash>0){
          let temp = _getValueAdd2(obj.market.totalBorrows,obj.market.cash,4)
          if(isNoEmpty(obj.market.reserves)&&obj.market.reserves>0){
              temp = _getValueMinus4(temp,obj.market.reserves,4);
          }
          usageRate = _getValuemultip(_getValueDivided(obj.market.totalBorrows,temp,4),100)
      }else{
          usageRate = '0.00';
      }
    }
    //贷款利率提示框
    const borrowRateStr = isNoEmpty(borrowRate)?SaveToTwoWei(borrowRate)+'%':'--';
    const subsidyRateStr = isNoEmpty(subsidyRate)?SaveToTwoWei(subsidyRate)+'%':'';
    const tooltipStr = t('BXH.loanRate')+':'+borrowRateStr+(isNoEmpty(subsidyRate)?(' - '+t('BXH.subsidyRate')+':'+subsidyRateStr):'');
    // console.log(obj.accountCTokens[0])
    // console.log(obj)

    return (
        <div key={idx} className={[classes.depSwit, marketListArray.length <= 1 ? classes.woindlotone : null, 'deplistConter'].join(' ')} >

          <div className={getStyleClass('listConter',classes.depConbg)}>
            <div className={classes.depConTit}>
              <div className={classes.deploanTit}>
                <img src={getTokenLogoURLWithName(symbol)} />
                {symbol}
              </div>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.mentRate')}
                <Tooltip overlayClassName="global_tooltip" title={tooltipStr}>
                    <img src={require('../../../assets/bxh/question.png')}/>
                </Tooltip>
              </span>
              <em className={classes.deplvse}>
                {isNoEmpty(totalRate)?SaveToTwoWei(totalRate)+'%':'--'}
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.usageRate')}
                <Tooltip overlayClassName="global_tooltip" title={t('BXH.usageRateTip')}>
                    <img src={require('../../../assets/bxh/question.png')}/>
                </Tooltip>
              </span>
              <em className={classes.deplvse}>{SaveToTwoWei(usageRate)}%</em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.loanAmount')}</span>
              <em>
                {SaveToTwoWei(loanBalance, 4)}{symbol}
                <i>${SaveToTwoWei(depositPrice, 4)}</i>
              </em>
            </div>
            <div className={classes.depcomti}>
              <span>{t('BXH.walletBalance')}</span>
              <em>
                {SaveToTwoWei(balance, 4)}{symbol}
                <i>${SaveToTwoWei(walletPrice, 4)}</i>
              </em>
            </div>
            <div className={classes.depbottom}>
              {
                (!obj.param3||obj.param3==='')||(obj.allowance&&obj.allowance>0)?
                <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} style={{ width:'100%' }} onClick={() => { this.repayment(obj, '0') }}>
                  {t('BXh.repayment')}
                </div>
                :
                <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} style={{ width:'100%' }} onClick={()=>this.approve(obj)}>
                  Approve
                </div>
              }
              
              {/* <div className={getStyleClass('PC_new_btn2', classes.bxh_new_btn2)} style={{ width:'100%' }} onClick={() => { this.repayment(obj, '0') }}>
                还款
              </div> */}
              {/* <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} onClick={() => { this.repayment(obj, '1') }}>
                换币还款
              </div> */}
              {/* <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)}>
                换币还款
              </div> */}
            </div>
          </div>

        </div>
    )

  }

  approve = (obj) => {
    const msgContent = "Approve "+obj.param2;
    this.props.contractRequst(msgContent);
    store.loanApproveToken({contractAddress:obj.param1,token:obj.param3,msgContent})
  }

  openDepositAlert = (obj) => {
    this.setState({modalDepositAlert: true, depositToken: obj})
    document.body.style.overflow = 'hidden';
  }

  renderDepositAlert = () => {
    const { depositToken } = this.state;
    return <LoanDepositAlert tokenInfo={depositToken} onClose={()=>{this.setState({ modalDepositAlert: false });document.body.style.overflow = 'auto';}} onSure={this.depositAction} />
  }
  depositAction = (amount) => {
    const { depositToken } = this.state;
    const msgContent = "Deposit "+amount+depositToken.param2;
    this.props.contractRequst(msgContent);
    store.loanDepositToken({contractAddress:depositToken.param1,token:depositToken.param3,msgContent,amount})
  }

  // 开启/关闭 抵押
  openMarkets = (obj, type) => {
    const { t, comptrollerAddress, totalBorrow } = this.props;
    let msgContent = ''
    if(type === 0){
      msgContent = "Open "+obj.param2;
      this.props.contractRequst(msgContent);
      let symbolOpenArray = []
      symbolOpenArray.push(obj.param1)
      store.loanOpenMarkets({contractAddress:symbolOpenArray, comptrollerAddress:comptrollerAddress, msgContent, type})
    }else{
      // 如果有借贷，提示不能关闭抵押
      if(totalBorrow > 0){
        const msgContent = t('BXH.existingLoans');   
        this.props.contractMsg(msgContent);
      }else{
        msgContent = "Close "+obj.param2;
        this.props.contractRequst(msgContent);
        store.loanCloseMarkets({contractAddress:obj.param1, comptrollerAddress:comptrollerAddress, msgContent, type})
      }
    }
  }


  // 提取存款
  openMortBack = (obj, depositPrice, moduleListArray, type) => {
    this.setState({ 
      modalMortgageBackType: type, 
      modalSend: true,
      depositToken: obj,
      depositPrice: depositPrice,
      moduleListArray: moduleListArray,
    })
    document.body.style.overflow = 'hidden';
  }
  renderSendModal = () => {
    const { modalMortgageBackType, depositToken, depositPrice, moduleListArray } = this.state
    const { totalBorrow, totalDepositVal, totalDeposit } = this.props;
    return (
        <LoanBackDialog moduleListArray={moduleListArray} moduleList={depositToken} depositPrice={depositPrice} type={modalMortgageBackType} onClose={()=>{this.setState({ modalSend: false });document.body.style.overflow = 'auto';}} onSure={this.withdrawal} onMAXSure={this.withdrawalMAX} totalBorrow={totalBorrow} totalDepositVal={totalDepositVal} totalDeposit={totalDeposit} />
    )
  }
  //部分提取
  withdrawal = (amount) => {
    const { depositToken } = this.state;
    const msgContent = "Withdraw "+amount;   
    this.props.contractRequst(msgContent);
    store.loanWithdrawToken({contractAddress:depositToken.param1, token:depositToken.param3, msgContent, amount})
  }
  //全部提取
  withdrawalMAX = (cTokenBalance, amount) => {
    const { depositToken } = this.state;
    const msgContent = "Withdraw "+amount;   
    this.props.contractRequst(msgContent);
    store.loanWithdrawMAXToken({contractAddress:depositToken.param1, token:depositToken.param3, msgContent, cTokenBalance})
  }

  //还款
  repayment = (obj, type) => {
    this.setState({ 
      modalMortgageBackType: type, 
      modalMentSend: true,
      depositToken: obj
    })
  }
  renderMentModal = () => {
    const { modalMortgageBackType, depositToken } = this.state
    return (
        <LoanMentDialog moduleList={depositToken} type={modalMortgageBackType} onClose={()=>{this.setState({ modalMentSend: false })}} onApprove={this.mentApprove} onSure={this.ractRequst} onMAXSure={this.ractRequstMAX} />
    )
  }
  mentApprove = () => {
    const msgContent = "Approve ";   
    this.props.contractRequst(msgContent);
  }
  //部分还款
  ractRequst = (amount) => {
    const { depositToken } = this.state;
    const msgContent = "Repayment "+amount;   
    this.props.contractRequst(msgContent);
    store.loanRactRequstToken({contractAddress:depositToken.param1, token:depositToken.param3, msgContent, amount})
  }
  //全部还款
  ractRequstMAX = (amount) => {
    const { depositToken } = this.state;
    const msgContent = "Repayment "+amount;   
    this.props.contractRequst(msgContent);
    store.loanRactRequstMAXToken({contractAddress:depositToken.param1, token:depositToken.param3, msgContent, amount})
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(LoanDeposit)));
