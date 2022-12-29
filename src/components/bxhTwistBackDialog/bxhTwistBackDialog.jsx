import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { getStyleClass,numberDecimal,toolNumber } from '../../config/constantFunction'
import {
    Card,
    TextField,
} from '@material-ui/core';
import Store from "../../stores";
import {
    GET_BXHTWIST,
    GET_BXHTWIST_RETURNED,
} from '../../constants';

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
        alignItems: 'center',
        zIndex: '999999',
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
        width:'22px',
        height:'22px',
        border: '1px solid #2C3036',
        borderRadius: '11px',
    },
    card: {
        marginTop: '15px',
        borderRadius: '12px',
        background: '#232640',
        padding: '25px 20px',
        [theme.breakpoints.up('sm')]: {
            width: '460px',
        }
    },
    cardRowPC: {
        // display: 'inline-block;',
        display: 'flex',
        marginTop: '15px',
        fontSize: '15px',
        color: 'rgba(255,255,255,0.6)',
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
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '15px',
        color: 'rgba(255,255,255,0.6)',
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
    cardTips: {
        marginTop: '10px',
        color: 'red',
        fontSize: '12px',
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
        marginTop: '30px',
        width: '100%',
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
        marginTop: '30px',
        width: '100%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
})

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

class bxhTwistBackDialog extends Component {
  constructor(props){
    super(props);
    const { t, onClose, onSure, type, bxhAsset, balance, pool } = this.props;
    var title = '';
    var conters = '';
    var tmpType = type;
    var tmpBalance = balance;
    if (tmpType===undefined||tmpType===null||tmpType==='') {
        tmpType = '0'
    }
    if (tmpBalance===undefined||tmpBalance===null||tmpBalance==='') {
        tmpBalance = '0'
    }
    switch(tmpType) {
        case '0':
            title = t('BXH.shoudaocunru')
            conters = t('BXH.availableCunruQuantity')
            break;
        case '1':
            title = t('BXH.cancelDeposit')
            conters = t('BXH.availableCancelQuantity')
            break;
        case '2':
            title = t('BXH.pledge')
            conters = t('BXH.availablePledgeQuantity')
            break;
        case '3':
            title = t('BXH.cancelPledge')
            conters = t('BXH.availableCancelQuantity')
            break;
        default:
            break;
    }
    this.state = {
        onClose: onClose,
        onSure: onSure,
        type: tmpType,
        title: title,
        conters: conters,
        balance: tmpBalance,
        inputVal: null,
        sureEnable: false,
        bxhAsset: bxhAsset,
        pool: pool,
    }

    dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pool } })
  }

  componentWillMount() {
    emitter.on(GET_BXHTWIST_RETURNED, this.balancesReturned);  
  }
  componentWillUnmount() {
    emitter.removeListener(GET_BXHTWIST_RETURNED, this.balancesReturned);
  }

  balancesReturned = (data) => {
    const { type } = this.state;
    if(type === '0'){
        this.setState({ balance: data ? data[0].tokens[0].symbol0balance||"--" : "0.0000" })
    }else if(type === '1'){
        this.setState({ balance: data ? data[0].tokens[0].symbol0balanceDeposit||"--" : "0.0000" })
    }else if(type === '2'){
        this.setState({ balance: data ? data[0].tokens[0].symbol0balanceDeposit||"--" : "0.0000" })
    }else if(type === '3'){
        this.setState({ balance: data ? data[0].tokens[0].canWithdrawAmount||data[0].tokens[0].userInfo.amount||"--" : "0.0000" })
    }
  }

  //返回
  back = () => {
    if (this.state.onClose != null) {
        this.state.onClose();
    }
  }
  nextAction = () => {
    if(this.state.sureEnable==false){
        return;
    }
    this.back();
    if (this.state.sureEnable&&this.state.onSure != null) {
        this.state.onSure(this.state.inputVal);
    }
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
  // MAX按钮(获取From余额)
  MAXBalance = () => {
    const { type, balance } = this.state
    console.log('MAXBalance');
    console.log(balance);
    this.setState({inputVal: balance});
    this.refreshSureBtn(balance);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    this.setState({sureEnable: inputVal>0});
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  render() {
    const { classes } = this.props;
    const { title } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')
    
    return (
        <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
            {
                isMobile ?
                (
                    <div className={getStyleClass('PCbroot',classes.content)}>
                        <div className={classes.top}>
                            <img onClick={this.back} alt='' src={require('../../assets/bxh/back.png')} />
                            <label>{title}</label>
                            <span></span>
                        </div>
                        { this.renderCard() }
                    </div>
                ):(
                    this.renderCard()
                )
            }
        </div>
    )
  };
  renderCard = () => {
    const { classes, t } = this.props;
    const { type, title, conters, sureEnable, balance, inputVal, bxhAsset, pool } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
        <Card className={getStyleClass('PCDialogbg',classes.card)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div>
                    <span>{title}</span>
                </div>
                <div style={{padding:'5px',height:'25px',cursor:'pointer',display: isMobile ? 'none': 'block'}} onClick={ this.back }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
            </div>
            <div>
                {
                    !isMobile && (
                    <span className={classes.cardRowPC}>
                        <img src={ pool ? pool.symbol0Img_Show : null } alt='' className={classes.coinLogo}/>
                        {
                            type === '0' || type === '1' ?
                            <span style={{marginLeft:'5px'}}>
                                {
                                    pool ? pool.symbol0||" " : null
                                }
                            </span>
                            :
                            <span style={{marginLeft:'5px'}}>
                                {
                                    pool ? pool.symbol1||" " : null
                                }
                            </span>
                        }
                    </span>
                )}
            </div>
            {
                isMobile && (
                <div className={classes.cardRow}>
                    <img src={ pool ? pool.symbol0Img_Show : null } alt='' className={classes.coinLogo}/>
                    <div style={{marginLeft:'5px'}}>
                        {
                            type === '0' || type === '1' ?
                            <span>
                                {
                                    pool ? pool.symbol0||" " : null
                                }
                            </span>
                            :
                            <span>
                                {
                                    pool ? pool.symbol1||" " : null
                                }
                            </span>
                        }
                    </div>
                </div>
                )
            }
            <div className={classes.cardTipInput}>
                <label>{t('BXH.input')}</label>
                <label>
                    <span style={{color:'rgba(255,255,255,0.4)',marginRight:'5px'}}>
                    {conters}:
                    </span>
                    {numberDecimal(parseFloat(balance))||"--"}
                </label>
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
                <div className={getStyleClass('PCDialogmax',classes.bxhmax)} onClick={ this.MAXBalance }>MAX</div>
            </div>
            {
                pool && pool.depositMin && (type === '2' || type === '3') ?
                <div className={classes.cardTips}>{t('BXH.minDeposit')}{pool.depositMin}
                    {
                        pool ? pool.symbol1||" " : null
                    }
                </div>
                : null
            }
            {
                chainID === '56' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "bscPC_new_btn1" : "bscsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                :
                chainID === '66' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "okexPC_new_btn1" : "okexsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                :
                chainID === '1' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "ethPC_new_btn1" : "ethsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                :
                chainID === '137' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "polyPC_new_btn1" : "polysureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                :
                chainID === '43114' ?
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "avaxPC_new_btn1" : "avaxsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                :
                <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "hecoPC_new_btn1" : "hecosureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
            }
        </Card>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(bxhTwistBackDialog)));
