import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { getStyleClass,numberDecimal,toolNumber } from '../../config/constantFunction'
import {
    Card,
    TextField,
} from '@material-ui/core';

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
        zIndex: '999',
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
        position:'absolute',
        border: '1px solid #2C3036',
        borderRadius: '11px',
    },
    card: {
        marginTop: '15px',
        height: '285px',
        borderRadius: '12px',
        background: '#232640',
        padding: '25px 20px',
        [theme.breakpoints.up('sm')]: {
            width: '460px',
        }
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


class MortgageBackDialog extends Component {
  constructor(props){
    super(props);
    const { t, onClose, onSure, type ,tokensData,pairData} = this.props;
    
    var title = '';
    var tmpType = type;
    if (tmpType===undefined||tmpType===null||tmpType==='') {
        tmpType = '0'
    }
    switch(tmpType) {
        case '0':
            title = t('BXH.mortgage');
            break;
        case '1':
            title = t('BXH.retrieve');
            break;
        default:
            break;
    }
    this.state = {
        onClose: onClose,
        onSure: onSure,
        type: tmpType,
        title: title,
        balance: '5',
        inputVal: null,
        sureEnable: false,
        tokensData:tokensData,
        pairData:pairData,
    }
  }
  //??????
  back = () => {
    if (this.state.onClose != null) {
        this.state.onClose();
    }
  }
  nextAction = () => {
    this.back();
    if (this.state.sureEnable&&this.state.onSure != null) {
        this.state.onSure(this.state.inputVal);
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
    // this.state.tokensData.userInfo.amount //???????????????
    // this.state.tokensData.mineLpAmount //??????
    // type==='0' ? '??????' : '??????'
    const { type } = this.state
    const balance = type==='0' ? this.state.tokensData.mineLpAmount : this.state.tokensData.userInfo.amount;
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
  // MAX??????(??????From??????)
  MAXBalance = () => {
      const { type } = this.state
    const balance = type==='0' ? this.state.tokensData.mineLpAmount : this.state.tokensData.userInfo.amount;
    this.setState({inputVal: balance});
    this.refreshSureBtn(balance);
  }

  SaveToTwoWei = (number,scale) => {
    var scaleP = Math.pow(10,scale);
    var result = Math.floor(number * scaleP) /scaleP;
    return result;
  }
  //??????????????????
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
    const { type, title, sureEnable, balance, inputVal,tokensData,pairData } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <Card className={getStyleClass('PCDialogbg',classes.card)}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div>{title}</div>
                <div style={{padding:'5px',height:'25px',cursor:'pointer',display: isMobile ? 'none': 'block'}} onClick={ this.back }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
            </div>
            <div className={classes.cardRow}>
                <div style={{width:'36px',height:'22px',position:'relative'}}>
                    <img src={ pairData?pairData.symbol0ImgURl:"" } alt='' className={classes.coinLogo} style={{left:'0',zIndex:'1'}}/>
                    <img src={ pairData?pairData.symbol1imgURl:"" } alt='' className={classes.coinLogo} style={{right:'0'}}/>
                </div>
                <label style={{marginLeft:'5px'}}>
                    {
                        pairData.symbolPair||" "
                    }
                </label>
            </div>
            <div className={classes.cardTipInput}>
                <label>{t('BXH.input')}</label>
                <label><span style={{color:'rgba(255,255,255,0.4)',marginRight:'5px'}}>{type==='0' ? t('BXH.canMortgageNumber') : t('BXH.canRetrieveNumber')}:</span>{type==='0'?this.SaveToTwoWei(tokensData.mineLpAmount,6):this.SaveToTwoWei(tokensData.userInfo.amount,6)||"0.00"}</label>
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

export default withNamespaces()(withRouter(withStyles(styles)(MortgageBackDialog)));
