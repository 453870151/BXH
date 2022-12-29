import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { 
    getTokenLogoURLWithName, 
    _getValuemultip1,
    _getValueDivided3,
    _getValuemultip,
    _getValueDivided,
    SaveToTwoWei,
    isNoEmpty,
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
    walletofbalance: {
        textAlign: 'right',
        fontSize: '12px',
        opacity: '.6',
        marginTop: '10px',
    },
    plshouquan: {
        width: '70%',
        margin: 'auto',
        textAlign: 'center',
        fontSize: '14px',
        padding: '15px 0',
    },
    plstijiao: {
        display: 'flex',
        width: '280px',
        margin: 'auto',
        marginBottom: '20px',
    },
    yuecomt: {
        position: 'relative',
    },
    yuecomttishi: {
        position: 'absolute',
        fontSize: '12px',
        color: '#DD5044',
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
    const { t, onClose, onSure, onMAXSure, onApprove, type, moduleList } = this.props;
    var conters = '';
    var tmpType = type;
    let cTokenBalance = null;
    let cBalance = null;
    if (tmpType===undefined||tmpType===null||tmpType==='') {
        tmpType = '0'
    }
    if(moduleList){
        cTokenBalance = moduleList.accountCTokens[0].cTokenBalance
        cBalance = _getValuemultip1(moduleList.balanceStored, 1)
    }
    this.state = {
        onClose: onClose,
        onSure: onSure,
        onMAXSure: onMAXSure,
        onApprove: onApprove,
        type: tmpType,
        conters: conters,
        balance: cBalance,
        inputVal: null,
        sureEnable: false,
        progress: '0',
        moduleList: moduleList,
        cTokenBalance: cTokenBalance,
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
        if (parseFloat(val)<0||parseFloat(val)>=parseFloat(balance)) {
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

  render() {
    const { classes, t } = this.props;
    const { title } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
        <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
            { this.renderCard() }
        </div>
    )
  };

  renderChange = () => {
    const { classes, t } = this.props;
    const { sureEnable } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <Card className={[classes.card, chainID === '56' ? 'bscPCDialogbg' : chainID === '66' ? 'okexPCDialogbg' : chainID === '1' ? 'ethPCDialogbg' : 'hecoPCDialogbg'].join(' ')}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div>
                    {t('BXH.mentEXRepayment')} 
                </div>
                <div style={{padding:'5px',height:'25px',cursor:'pointer',display: isMobile ? 'none': 'block'}} onClick={ this.back }>
                    <img src={ require('../../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <span className={classes.cardRowPC}>
                    <img src={ require('../../../assets/bxh/lonezhuyi.png') } className={classes.coinLogo}/>
                </span>
            </div>
            <div className={classes.plshouquan}>需要对HRC20代币进行一次性批准授权才能进行换币还款</div>

            <div className={classes.plstijiao}>
              <div className={[classes.cardclose, "bscPC_new_btn2"].join(' ')} onClick={this.back}>
                  取消
              </div>
              {
                chainID === '56' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, "bscPC_new_btn1"].join(' ')} onClick={this.approve}>{t('BXH.mentApprove')}</div>
                :
                chainID === '66' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, "bscPC_new_btn1"].join(' ')} onClick={this.approve}>{t('BXH.mentApprove')}</div>
                :
                chainID === '1' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, "bscPC_new_btn1"].join(' ')} onClick={this.approve}>{t('BXH.mentApprove')}</div>
                :
                <div className={[sureEnable ? classes.sure : classes.sureDisable, "bscPC_new_btn1"].join(' ')} onClick={this.approve}>{t('BXH.mentApprove')}</div>
              }
            </div>
        </Card>
    )
  }

  renderCard = () => {
    const { classes, t } = this.props;
    const { type, sureEnable, balance, inputVal, progress, moduleList } = this.state;
    const isMobile = this._isMobile();
    const symbol = moduleList.param2
    const walletbalance = moduleList.balance
    let chainID = localStorage.getItem('chainIDSwitch')
    // console.log(moduleList)

    return (
        <Card className={getStyleClass('PCDialogbg',classes.card)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div style={{fontWeight:'bold'}}>
                    {
                        type === '0' ?
                        <span>{t('BXH.mentRepayment')}</span>
                        :
                        <span>{t('BXH.mentEXRepayment')}</span>
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
                <div className={classes.tiqubalance}>
                    <span>{t('BXH.repaymentAssetsIncludingInterest')}:</span> {balance} {symbol}
                </div>
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


            <div className={classes.yuecomt}>
                {/* 钱包余额不足提示 */}
                <div className={classes.yuecomttishi}>
                    {
                        !sureEnable && inputVal>walletbalance ?
                        <div>{t('BXH.intbalance')}</div>
                        :
                        null
                    }
                </div>
                <div className={classes.walletofbalance}>{t('BXH.walletBalance')}: {SaveToTwoWei(walletbalance, walletbalance<1?6:2)} {symbol}</div>
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
                <div className={getStyleClass(sureEnable ? "PC_new_btn1" : "sureDisable",sureEnable ? classes.sure : classes.sureDisable)} onClick={this.nextAction}>{t('BXH.mentRepayment')}</div>
            </div> 

            <div className={classes.qufexian}>{t('BXH.Payable')}: {balance} {symbol}</div>
        </Card>
    )
  }

  //返回
  back = () => {
    if (this.state.onClose != null) {
        this.state.onClose();
    }
  }

  // MAX按钮(获取From余额)
  MAXBalance = () => {
    const { balance } = this.state
    this.setState({inputVal: balance, progress: 0});
    this.refreshSureBtn(balance);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    const { moduleList } = this.state;
    const walletbalance = moduleList.balance
    this.setState({sureEnable: inputVal>0&&inputVal<=walletbalance});
  }

  refreshCount = (count) => {
    const { balance } = this.state
    const newBalance = _getValuemultip1(balance, count)
    this.setState({inputVal: newBalance, progress: count})
    this.refreshSureBtn(newBalance)
  }

  approve = () => {
    this.back();
    this.state.onApprove();
  }
  
  nextAction = () => {
    const { balance } = this.state
    if(this.state.sureEnable==false){
        return;
    }
    this.back();

    if (this.state.sureEnable&&this.state.onSure != null) {
        // 如果全部还款，可以传值 -1
        if(parseFloat(this.state.inputVal) === parseFloat(balance)){
            this.state.onMAXSure(this.state.inputVal);
        }else{
            this.state.onSure(this.state.inputVal);
        }
    }
  
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(LoanBackDialog)));
