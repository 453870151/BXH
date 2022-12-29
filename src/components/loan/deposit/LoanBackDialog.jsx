import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import LoanUsageRate from '../LoanUsageRate'

import { 
    getTokenLogoURLWithName, 
    _getValuemultip1,
    _getValueDivided1,
    _getValueDivided3,
    _getValuemultip,
    _getValueDivided,
    SaveToTwoWei,
    isNoEmpty,
    priceAddArray,
    getStyleClass,
} from '../../../config/constantFunction'
import {
    Card,
    TextField,
} from '@material-ui/core';
import Store from "../../../stores";
import {

} from '../../../constants';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: '999999',
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        }
    },
    content: {
        position: 'absolute',
        top: '150px',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#191B2E',
        padding: '15px',
        color: '#FFFFFF',
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        heigth: '50px',
        color: '#FFFFFFF',
        fontSize: '17px',
        fontWeight: 'bold',
        '& img': {
            width: '16px',
            heigth: '16px',
            cursor: 'pointer',
        },
    },
    coinLogo: {
        width:'40px',
        height:'40px',
        border: '1px solid #2C3036',
        borderRadius: '11px',
    },
    card: {
        width: '100%',
        borderRadius: '22px 22px 0 0',
        background: '#232640',
        padding: '25px 20px 67px',
        [theme.breakpoints.up('sm')]: {
            width: '460px',
            borderRadius: '22px',
            padding: '25px 25px 47px',
        }
    },
    cardRowPC: {
        display: 'inline-block;',
        marginTop: '15px',
        fontSize: '15px',
        color: '#fff',
        textAlign: 'center',
        '& span': {
            display: 'block',
            letterSpacing: '1px',
            marginTop: '5px',
            fontWeight: 'bold',
            fontSize: '18px',
        },
        '& img': {
            verticalAlign: 'bottom',
        }
    },
    cardTip: {
        fontSize: '13px',
        color: '#6D7682',
        margin: '15px 5px 0',
    },
    cardRow: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '21px',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        }
    },
    cardTipInput: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '0 5px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    cardInput: {
        position: 'relative',
        marginTop: '10px',
        paddingRight: '70px',
        height: '45px',
        borderRadius: '6px',
        backgroundColor: '#1C1E22',
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
    sure: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        width: '180px',
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
        backgroundColor: '#4A4C5E',
        width: '180px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    tiqucontyu: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tiqubalance: {
        fontSize: '12px',
        marginTop: '5px',
        '& span': {
            opacity: '.4',
        },
    },
    cardbalance: {
        fontSize: '12px',
        textAlign: 'right',
        marginTop: '5px',
        '& span': {
            opacity: '.4',
        },
    },
    cardclose: {
        width: '90px',
        marginTop: '10px',
        color: '#30BE85',
        border: '1px solid #30BE85',
        lineHeight: '43px',
        borderRadius: '6px',
        textAlign: 'center',
        marginRight: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(28, 163, 109, 0.3)',
          },
          '&:active': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(19, 119, 80, 1)',
          },
    },
    progressContent: {
        margin: '20px 5px 10px',
    },
    progressText: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        marginTop: '12px',
        fontFamily: "consola",
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
    qufexian: {
        fontSize: '12px',
        opacity: '.6',
        marginTop: '20px',
    },
    btnRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '35px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
            justifyContent: 'flex-end',
        }
    },
    btnBorder: {
        marginRight: '10px',
        width: '50%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            width: '94px',
            marginRight: '15px',
        }
    },
})

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

class LoanBackDialog extends Component {
  constructor(props){
    super(props);
    const { t, onClose, onSure, onMAXSure, type, moduleList, totalBorrow, totalDepositVal, totalDeposit, depositPrice, moduleListArray } = this.props;
    var conters = '';
    var tmpType = type;
    let tmpBalance = null;
    let cTokenBalance = null;
    let loanBalance = null;
    let rate = 0;
    if (tmpType===undefined||tmpType===null||tmpType==='') {
        tmpType = '0'
    }
    if (tmpBalance===undefined||tmpBalance===null||tmpBalance==='') {
        tmpBalance = '0'
    }
    if(moduleList){
        cTokenBalance = moduleList.accountCTokens[0].cTokenBalance
        //借贷金额
        loanBalance = moduleList.balanceStored  
        // 贷款使用率
        if(isNoEmpty(totalBorrow)&&isNoEmpty(totalDepositVal)&&totalDepositVal>0) {
            rate = _getValuemultip(_getValueDivided(totalBorrow,totalDepositVal,4),100)
        }
        if(totalBorrow > 0){
            // 已借贷
            if(rate >= 85){
                tmpBalance = 0
            }else{

                //判断存了几个币种
                let arrayLength = 0
                moduleListArray.map((obj,idx)=>{
                    if(obj.accountCTokens&&obj.accountCTokens.length > 0&&obj.accountCTokens[0].cTokenBalance!== '0'){
                        arrayLength += idx
                    }
                })

                // 算出来是金本位，在除以当前币的价值，求出币本位
                if(arrayLength === 0){
                    //存了一个币种，计算安全最大值
                    // 安全最大值
                    // 存款一个币种( ((当前币种存款金额-X) * 贷款使用率 * 0.85) = 总的贷款金额 ) -- 算出X 当前币种存款金额 -（总的贷款金额÷0.85÷0.75）
                    // tmpBalance = (depositPrice - (totalBorrow / moduleList.market.collateralFactor / 0.85 )) / moduleList.price
                    tmpBalance = _getValueDivided1(_getValueDivided3(depositPrice, _getValueDivided1(_getValueDivided1(totalBorrow, moduleList.market.collateralFactor), 0.85)), moduleList.price)
                }else{
                    //存了多个币种，计算安全最大值
                    let maxNumber = priceAddArray(moduleListArray, moduleList, totalBorrow)
                    //存款金额
                    let depositAmount = _getValuemultip1(moduleList.accountCTokens[0].cTokenBalance, moduleList.market.exchangeRate)
                    //如果安全最大值大于存款金额，取存款金额
                    if(maxNumber >= depositAmount){
                        tmpBalance = depositAmount
                    }else{
                        tmpBalance = maxNumber
                    }
                    
                }

            }
        }else{
            // 未借贷
            // 存款金额(cTokenBalance * exchangeRate 算出当前值多少个 token)
            tmpBalance = _getValuemultip1(moduleList.accountCTokens[0].cTokenBalance, moduleList.market.exchangeRate)
        }
    }
    this.state = {
        onClose: onClose,
        onSure: onSure,
        onMAXSure: onMAXSure,
        type: tmpType,
        conters: conters,
        balance: tmpBalance,
        loanBalance: loanBalance,
        inputVal: null,
        sureEnable: false,
        progress: '0',
        moduleList: moduleList,
        depositPrice: depositPrice,
        cTokenBalance: cTokenBalance,
        totalBorrow: totalBorrow,//总贷款
        totalDepositVal: totalDepositVal,//总抵押价值
        rate: 0,
    }

  }

  componentWillMount() {
    
  }
  componentWillUnmount() {
    
  }

  // true:数值型的，false：非数值型
  myIsNumber = (value) => {
    if (value==undefined||value==null) {
        return false;
    }
    return !isNaN(value);
  }
  onChangeTo = (value, event) => {
    const { balance } = this.state
    var val = event.target.value;
    if (this.myIsNumber(val)&&this.myIsNumber(balance)) {
        if (parseFloat(val)<0||parseFloat(val)>parseFloat(balance)) {
            val = balance;
        }
    }else{
        return;
    }
    this.setState({inputVal: val});
    this.refreshSureBtn(val);
  }
  
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  //返回
  back = () => {
    if (this.state.onClose != null) {
        this.state.onClose();
    }
  }

  render() {
    const { classes, t } = this.props;
    const { title } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
        <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
            {this.renderCard()}
        </div>
    )
  };
  renderCard = () => {
    const { classes, t } = this.props;
    const { type, sureEnable, balance, inputVal, progress, moduleList, loanBalance, totalBorrow, depositPrice } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    const isMobile = this._isMobile();
    const symbol = moduleList.param2

    return (
        <Card className={getStyleClass('PCDialogbg',classes.card)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div style={{fontWeight:'bold'}}>
                    {
                        totalBorrow > 0 ?
                        <span>{t('BXH.withdrawBorrowed')}</span>
                        :
                        <span>{t('BXH.withdrawNot')}</span>
                    }
                </div>
                <div style={{padding:'5px',height:'25px',cursor:'pointer'}} onClick={ this.back }>
                    <img src={ require('../../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
            </div>
            <div className={classes.cardRow}>
                <img src={getTokenLogoURLWithName(symbol)} alt='' className={classes.coinLogo}/>
                <label style={{marginTop:'10px'}}>
                    {symbol}
                </label>
            </div>
            <div className={classes.tiqucontyu}>
                {/* 最高可取值 */}
                {
                    totalBorrow == 0 ? 
                    <div className={classes.tiqubalance}>
                        <span>{t('BXH.maxWithdrawl')}:</span> {SaveToTwoWei(_getValueDivided3(balance, loanBalance), 6)} {symbol}
                    </div>
                    :
                    null
                }

                {/* 安全最大值 */}
                {
                    totalBorrow > 0 ? 
                    <div className={classes.tiqubalance}>
                        <span>{t('BXH.maxSafetyValue')}:</span> {SaveToTwoWei(balance, 6)} {symbol}
                    </div>
                    :
                    null
                }
            </div>
            <div className={classes.cardInput}>
                <TextField
                    fullWidth
                    style={{ right: '0px' }}
                    id={ '' + type }
                    value={ inputVal || '' }
                    onChange={ this.onChangeTo.bind(this, balance ? (Math.floor(balance*10000)/10000): '0.00') }
                    placeholder="0.00"
                    variant="outlined"
                    inputProps={{
                        pattern:"^[0-9]*[.]?[0-9]*$",
                        inputMode:'decimal',
                        autoComplete: 'off',
                    }}
                    />
                <div className={[classes.bxhmax, chainID === '56' ? 'bscPCDialogmax' : chainID === '66' ? 'okexPCDialogmax' : chainID === '1' ? 'ethPCDialogmax' : 'hecoPCDialogmax'].join(' ')} onClick={ this.MAXBalance }>MAX</div>
            </div>
            <div className={classes.progressContent}>
                <div className={classes.progressText}>
                    <label onClick={() => { this.refreshCount(0.25) }} className={[progress === 0.25 ? classes.selectType_select : classes.selectType_unselect, progress === 0.25 ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" :  "hecosureDisable"].join(' ')}>25%</label>
                    <label onClick={() => { this.refreshCount(0.5) }} className={[progress === 0.5 ? classes.selectType_select : classes.selectType_unselect, progress === 0.5 ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" :  "hecosureDisable"].join(' ')}>50%</label>
                    <label onClick={() => { this.refreshCount(0.75) }} className={[progress === 0.75 ? classes.selectType_select : classes.selectType_unselect, progress === 0.75 ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" :  "hecosureDisable"].join(' ')}>75%</label>
                    <label onClick={() => { this.refreshCount(1) }} className={[progress === 1 ? classes.selectType_select : classes.selectType_unselect, progress === 1 ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" :  "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" :  "hecosureDisable"].join(' ')}>100%</label>
                </div>
            </div>

            <div className={classes.btnRow}>
                <div onClick={()=>this.back()} className={getStyleClass('PC_new_btn2',classes.btnBorder)}>{t('BXH.cancel')}</div>
                <div className={getStyleClass(sureEnable ? "PC_new_btn1" : "sureDisable",sureEnable ? classes.sure : classes.sureDisable)} onClick={this.nextAction}>{t('BXH.withdraw')}</div>
            </div> 

            {/* 贷款使用率 */}
            {
                totalBorrow > 0 ? 
                this.renderLoanUsageRate()
                :
                null
            }

            {
                totalBorrow > 0 ? 
                <div className={classes.qufexian}>{t('BXH.loanWithdrawTip')}</div>
                :
                null
            }

        </Card>
    )
  }


  //贷款使用率
  renderLoanUsageRate = () => {
    const { totalBorrow, totalDepositVal } = this.state;
    let rate = 0;
    if(isNoEmpty(totalBorrow)&&isNoEmpty(totalDepositVal)&&totalDepositVal>0) {
        rate = _getValuemultip(_getValueDivided(totalBorrow,totalDepositVal,4),100)
    }
    return (
        <LoanUsageRate rate={rate} totalDepositVal={totalDepositVal} />
    )
  }

  // MAX按钮(获取From余额)
  MAXBalance = () => {
    const { balance } = this.state
    this.setState({inputVal: balance, progress: 0});
    this.refreshSureBtn(balance);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    this.setState({sureEnable: inputVal>0});
  }

  refreshCount = (count) => {
    const { balance } = this.state
    const newBalance = _getValuemultip1(balance, count)
    this.setState({inputVal: newBalance, progress: count})
    this.refreshSureBtn(newBalance)
  }
  
  nextAction = () => {
    const { balance, cTokenBalance, moduleList } = this.state
    if(this.state.sureEnable==false){
        return;
    }
    this.back();

    if(moduleList.balanceStored > 0 || this.state.inputVal < balance){
        // 有借贷或者取回部分，传Token余额
        if (this.state.sureEnable&&this.state.onSure != null) {
            this.state.onSure(this.state.inputVal);
        }
    }else{
        // 如果取回全部，传cToken余额
        if (this.state.sureEnable&&this.state.onMAXSure != null) {
            this.state.onMAXSure(cTokenBalance, this.state.inputVal);
        }
    }
  
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(LoanBackDialog)));
