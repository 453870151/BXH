import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Card,
    TextField,
} from '@material-ui/core';

import { getTokenLogoURLWithName,getStyleClass,isNoEmpty,isEmpty,_getValueMinus4 } from '../../../config/constantFunction'

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
        width:'45px',
        height:'45px',
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
        justifyContent: 'flex-end',
        marginTop: '10px',
        padding: '0 10px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.6)',
    },
    cardInput: {
        position: 'relative',
        marginTop: '20px',
        paddingRight: '70px',
        height: '45px',
        borderRadius: '6px',
        backgroundColor: '#1C1E22',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        }
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
    percentage: {
        display: 'flex',
        marginTop: '24px',
        justifyContent: 'space-between',
        padding: '0 10px',
        fontSize: '15px',
        fontWeight: 'bold',
        '& div': {
            cursor: 'pointer',
            flex: '1',
            marginLeft: '10px',
            height: '36px',
            lineHeight: '36px',
            textAlign: 'center',
            borderRadius: '18px',
        },
        '& div.first': {
            marginLeft: '0',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '13px',
            '& div': {
                marginLeft: '18px',
            }
        }
    },
    percentageNoChecked: {
        background: '#404256',
        color: '#FFF',
    },
    percentageChecked: {
        background: 'rgba(48, 190, 133, 0.1)',
        color: '#30BE85',
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
    sure: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        width: '50%',
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
        width: '50%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
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
        fontWeight: 'bold',
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
})

class LoanDepositAlert extends Component {
    constructor(props){
        super(props);
        const { t, onClose, onSure, tokenInfo} = this.props;
        let tmpBalance = null;
        if(tokenInfo){
            tmpBalance = tokenInfo.balance;
        }
        if (tmpBalance===undefined||tmpBalance===null||tmpBalance==='') {
            tmpBalance = '0'
        }
        this.state = {
            onClose: onClose,
            onSure: onSure,
            balance: tmpBalance,
            inputVal: null,
            sureEnable: false,
            percentageIndex: -1,
        }
    }
    //??????
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
    // true:???????????????false???????????????
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
    // MAX??????(??????From??????)
    MAXBalance = async () => {
        const { tokenInfo } = this.props;
        let { balance } = this.state
        if(isEmpty(tokenInfo.param3)){
            balance = _getValueMinus4(balance,0.01)
            if(balance<0) {
                balance = "0";
            }
        }
        this.setState({inputVal: balance});
        this.refreshSureBtn(balance);
    }
    percentageAction = (rate, idx) => {
        const { tokenInfo } = this.props;
        const { balance } = this.state
        let newBalance = balance*rate;
        if(isEmpty(tokenInfo.param3)&&rate==1){
            newBalance = _getValueMinus4(newBalance,0.01)
            if(newBalance<0) {
                newBalance = "0";
            }
        }
        this.setState({inputVal: newBalance, percentageIndex: idx})
        this.refreshSureBtn(newBalance);
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
        return (
            <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
                {this.renderCard()}
            </div>
        )
    };
    renderCard = () => {
        const { classes, t, tokenInfo } = this.props;
        const { sureEnable, balance, inputVal, percentageIndex } = this.state;
        const symbol = (tokenInfo&&tokenInfo.param2)||"--";
        return (
            <Card className={getStyleClass('PCDialogbg',classes.card)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                    <div style={{fontWeight:'bold'}}>{t('BXH.deposit')}</div>
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
                <div className={classes.cardInput}>
                    <TextField
                        fullWidth
                        style={{ right: '0px' }}
                        id={ '' }
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
                <div className={classes.cardTipInput}>
                    <label>{t('BXH.walletBalance')}???{balance}{symbol}</label>
                </div>
                <div className={classes.progressContent}>
                    <div className={classes.progressText}>
                        <label onClick={()=>this.percentageAction(0.25,0)} className={getStyleClass(percentageIndex===0?'PC_new_btn1':'sureDisable',percentageIndex===0?classes.selectType_select:classes.selectType_unselect)}>25%</label>
                        <label onClick={()=>this.percentageAction(0.5,1)} className={getStyleClass(percentageIndex===1?'PC_new_btn1':'sureDisable',percentageIndex===1?classes.selectType_select:classes.selectType_unselect)}>50%</label>
                        <label onClick={()=>this.percentageAction(0.75,2)} className={getStyleClass(percentageIndex===2?'PC_new_btn1':'sureDisable',percentageIndex===2?classes.selectType_select:classes.selectType_unselect)}>75%</label>
                        <label onClick={()=>this.percentageAction(1,3)} className={getStyleClass(percentageIndex===3?'PC_new_btn1':'sureDisable',percentageIndex===3?classes.selectType_select:classes.selectType_unselect)}>100%</label>
                    </div>
                </div>
                <div className={classes.btnRow}>
                    <div onClick={()=>this.back()} className={getStyleClass('PC_new_btn2',classes.btnBorder)}>{t('BXH.cancel')}</div>
                    <div className={getStyleClass(sureEnable ? "PC_new_btn1" : "sureDisable",sureEnable ? classes.sure : classes.sureDisable)} onClick={this.nextAction}>{t('BXH.deposit')}</div>
                </div>
            </Card>
        )
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(LoanDepositAlert)));
