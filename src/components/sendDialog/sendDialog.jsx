import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import './sendDialog.css';
import {
    Card,
} from '@material-ui/core';
import { getStyleClass } from '../../config/constantFunction';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999999',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#262946',
        height: '325px',
        color: '#FFFFFF',
        fontSize: '15px',
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            width: '460px',
        }
    },
    close: {
        position: 'absolute',
        right: '20px',
        top: '15px',
        padding: '5px',
        cursor: 'pointer',
        '& img': {
            '&:hover': {
                opacity: '.8',
            }
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    stateImage: {
        width: '50px',
        height: '50px',
        marginTop: '70px',
    },
    viewOnHECO: {
        color:'#2EBC84',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    viewOnBSC: {
        color:'#FDD436',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    viewOnOKEX: {
        color:'#3E7EFF',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    viewOnETH: {
        color:'#7E8CCB',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    viewOnPoly: {
        color:'#8841FF',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    viewOnAvax: {
        color:'#E84142',
        fontWeight:'bold',
        marginTop:'15px',
        cursor: 'pointer',
    },
    closeBtn: {
        position: 'absolute',
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        bottom: '58px',
        width: '205px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
            // backgroundImage: 'linear-gradient(to right, #10754c, #1a9564)',
        }
    },
})

class SendDialog extends Component {
  constructor(props){
    super(props);
    const { onClose, type } = this.props;
    this.state = {
        onClose: onClose,
        type: type,//0发送中 1成功 -1失败
    };
  }
  SaveToTwoWei = (number,scale) => {
    var scaleP = Math.pow(10,scale);
    var result = Math.floor(number * scaleP) /scaleP;
    return result;
  }
  close = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
  }
  viewOnHECO = () => {
    const { txHash } = this.props;
    window.open("https://hecoinfo.com/tx/"+txHash);
  }
  viewOnBSC = () => {
    const { txHash } = this.props;
    window.open("https://bscscan.com/tx/"+txHash);
  }
  viewOnOKEX = () => {
    const { txHash } = this.props;
    window.open("https://www.oklink.com/okexchain/tx/"+txHash);
  }
  viewOnETH = () => {
    const { txHash } = this.props;
    window.open("https://cn.etherscan.com/tx/"+txHash);
  }
  viewOnPoly = () => {
    const { txHash } = this.props;
    window.open("https://polygonscan.com/tx/"+txHash);
  }
  viewOnAvax = () => {
    const { txHash } = this.props;
    window.open("https://snowtrace.io/tx/"+txHash);
  }
  render() {
    const { classes } = this.props;
    const { type, onClose } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <div className={classes.mainBg} onClick={(e) => {e.stopPropagation();if (onClose!=null) {onClose();}}}>
            <Card className={getStyleClass('PCDialogbg',classes.card)} onClick={(e) => {e.stopPropagation();}}>
                <div className={classes.close} onClick={ this.close }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
                { type==0 && this.sendView() }
                { type>0 && this.successView() }
                { type<0&&type!==-2 && this.failView() }
                { type==-2 && this.openView() }
            </Card>
        </div>
    )
  }
  sendView() {
    const { classes, t, symbolContent } = this.props;

    return (
        <div className={classes.content}>
            <div className='father'>
                <img src={ require('../../assets/bxh/send.png') } alt='' className='stateImage'/>
            </div>
            <div>
                <div style={{fontSize:'21px',marginTop:'20px',textAlign:'center'}}>{t('BXH.sending')}</div>
                <div style={{fontWeight:'bold',marginTop:'15px',textAlign:'center'}}>
                    { symbolContent }
                </div>
            </div>
            <div style={{fontSize:'12px',opacity:'0.3',marginTop:'48px'}}>{t('BXH.confirmTransaction')}</div>
        </div>
    )
  }
  successView() {
    const { classes, t } = this.props;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <div className={classes.content}>
            {
                chainID === '66' ?
                <img src={ require('../../assets/bxh/success1.png') } alt='' className={classes.stateImage}/>
                :
                chainID === '1' ?
                <img src={ require('../../assets/bxh/success2.png') } alt='' className={classes.stateImage}/>
                :
                <img src={ require('../../assets/bxh/success.png') } alt='' className={classes.stateImage}/>
            }
            
            <div style={{fontSize:'21px',marginTop:'20px'}}>{t('BXH.transactionSubmitted')}</div>
            {
                chainID === '56' ?
                <div onClick={this.viewOnBSC} className={classes.viewOnBSC}>View on BSC</div>
                :
                chainID === '66' ?
                <div onClick={this.viewOnOKEX} className={classes.viewOnOKEX}>View on OK Link</div>
                :
                chainID === '1' ?
                <div onClick={this.viewOnETH} className={classes.viewOnETH}>View on ETH</div>
                :
                chainID === '137' ?
                <div onClick={this.viewOnPoly} className={classes.viewOnPoly}>View on POLYGON</div>
                :
                chainID === '43114' ?
                <div onClick={this.viewOnAvax} className={classes.viewOnAvax}>View on AVAX</div>
                :
                <div onClick={this.viewOnHECO} className={classes.viewOnHECO}>View on HECO</div>
            }
            <div className={getStyleClass('PC_new_btn1',classes.closeBtn)} onClick={this.close}>{t('BXH.close')}</div>
        </div>
    )
  }
  failView() {
    const { classes, t } = this.props;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <div className={classes.content}>
            <img src={ require('../../assets/bxh/fail.png') } alt='' className={classes.stateImage}/>
            <div style={{fontWeight:'bold',marginTop:'28px'}}>Swap failed：canceled</div>
            <div className={getStyleClass('PC_new_btn1',classes.closeBtn)} onClick={this.close}>{t('BXH.close')}</div>
        </div>
    )
  }
  openView() {
    const { classes, t, symbolContent } = this.props;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <div className={classes.content}>
            <img src={ require('../../assets/bxh/fail.png') } alt='' className={classes.stateImage}/>
            <div style={{fontWeight:'bold',marginTop:'28px'}}>
                {symbolContent}
            </div>
            <div className={getStyleClass('PC_new_btn1',classes.closeBtn)} onClick={this.close}>{t('BXH.close')}</div>
        </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(SendDialog)));
