import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { numberDecimal,toolNumber } from '../../config/constantFunction'
import {
    Card,
    TextField,
    ClickAwayListener,
} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import moment from 'moment';

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
    questionImage: {
        cursor: 'pointer',
        marginLeft:'5px',
        width:'15px',
        height:'15px',
        verticalAlign:'middle',
    },
})


class BXHMortgageBackLockupDialog extends Component {
  constructor(props){
    super(props);
    const { t, onClose, onSure, type, bxhAsset, balance, lockUpSecond} = this.props;
    var title = '';
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
            title = t('BXH.pledge');
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
        balance: tmpBalance,
        inputVal: null,
        sureEnable: false,
        bxhAsset: bxhAsset,
        lockUpSecond: lockUpSecond,
        withdrawShowTooltip: false,//取回提示
        lockUpShowTooltip: false,//提示
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
    this.setState({inputVal: balance});
    this.refreshSureBtn(balance);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    this.setState({sureEnable: inputVal>0});
  }
  handleWithdrawTooltipClose = () => {
    this.setState({withdrawShowTooltip: false});
  };
  handleWithdrawTooltipOpen = () => {
    this.setState({withdrawShowTooltip: true});
  };
  handleTooltipClose = () => {
    this.setState({lockUpShowTooltip: false});
  };
  handleTooltipOpen = () => {
    this.setState({lockUpShowTooltip: true});
  };
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  render() {
    const { classes } = this.props;
    const { title } = this.state;
    const isMobile = this._isMobile();
    return (
        <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
            {
                isMobile ?
                (
                    <div className={ classes.content } >
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
    const { type, title, sureEnable, balance, inputVal, bxhAsset, lockUpSecond} = this.state;
    const isMobile = this._isMobile();
    return (
        <Card className={classes.card}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                <div>{title}</div>
                <div style={{padding:'5px',height:'25px',cursor:'pointer',display: isMobile ? 'none': 'block'}} onClick={ this.back }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
            </div>
            <div className={classes.cardRow}>
                <img src={ bxhAsset.logoURI } alt='' className={classes.coinLogo}/>
                <label style={{marginLeft:'5px'}}>
                    {
                        bxhAsset.symbol||" "
                    }
                </label>
            </div>
            <div className={classes.cardTipInput}>
                <label>{t('BXH.input')}</label>
                <div><span style={{color:'rgba(255,255,255,0.4)',marginRight:'5px'}}>{type==='0' ? t('BXH.canMortgageNumber') : t('BXH.canRetrieveNumber')}:</span>{numberDecimal(parseFloat(balance))||"--"}
                    {
                        type==='1'?
                        <ClickAwayListener onClickAway={this.handleWithdrawTooltipClose}>
                            <CustomTooltip title={t('BXH.retrieveBXHDesc')}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={this.handleWithdrawTooltipClose}
                                open={this.state.withdrawShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={this.handleWithdrawTooltipOpen} className={classes.questionImage} src={require('../../assets/bxh/question.png')} />
                            </CustomTooltip>
                        </ClickAwayListener>
                        :null
                    }
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
                <div className={ classes.bxhmax } onClick={ this.MAXBalance }>MAX</div>
            </div>
            {
                lockUpSecond&&lockUpSecond<0||type==='0'?
                (
                    <div className={ sureEnable ? classes.sure : classes.sureDisable } onClick={this.nextAction}>{t('BXH.confirm')}</div>
                ):(
                    <ClickAwayListener onClickAway={this.handleTooltipClose}>
                        <CustomTooltip title={t('BXH.expect') + ' ' + (lockUpSecond?moment(new Date().getTime()+lockUpSecond*1000).format('YYYY/MM/DD HH:mm'):'--') + ' ' + t('BXH.desirable')}
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onClose={this.handleTooltipClose}
                            open={this.state.lockUpShowTooltip}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            arrow 
                            placement="bottom">
                            <div className={ classes.sureDisable } onClick={this.handleTooltipOpen}>{t('BXH.confirm')}</div>
                        </CustomTooltip>
                    </ClickAwayListener>
                )
            }
        </Card>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(BXHMortgageBackLockupDialog)));
