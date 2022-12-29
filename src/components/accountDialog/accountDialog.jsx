import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import '../../config/constantFunction.jsx';
import {
    Card,
} from '@material-ui/core';
import Store from "../../stores";
import './accountDialog.css';
import cookie from 'react-cookies';
import UnlockModal from '../unlock/unlockModal.jsx';
import { _getValueDivided1, getStyleClass } from '../../config/constantFunction'

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHCOOKIEREFRESHEVENT,
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '60px',
        left: '0',
        right: '10px',
        bottom: '0',
        zIndex: '99999',
        [theme.breakpoints.up('sm')]: {
            right: '-50px',
        }
    },
    card: {
        position: 'absolute',
        bottom: '0',
        left: '15%',
        right: '0',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#262946',
        color: '#FFFFFF',
        fontSize: '14px',
        padding: '15px',
        top: '0px',
        height: '300px',
        width: '85%',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            position: 'absolute',
            width: '300px',
            padding: '4px 12px 12px 12px',
            paddingLeft: '20px',
            paddingBottom: '0',
            left: 'calc(100% - 32%)',
            top: '10px',
            height: '270px',
        }
    },
    close: {
        position: 'absolute',
        right: '20px',
        top: '15px',
        padding: '5px',
        cursor: 'pointer',
    },
    header: {
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: '5px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '30px',
        height: '135px',
        borderRadius: '6px',
        border: '1px solid rgba(151, 151, 151, 0.1)',
        padding: '15px 20px',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            border: 'none',
            backgroundColor: 'rgba(20, 22, 47, 0.6)',
        }
    },
    addressRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '18px',
    },
    addressContent: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '5px',
        '& img': {
            width: '20px',
            height: '20px',
        },
        '& span': {
            marginLeft: '6px',
        },
    },
    change: {
        height: '26px',
        lineHeight: '26px',
        borderRadius: '13px',
        padding: '0 10px',
        color: '#30BE85',
        backgroundColor: 'rgba(48, 190, 133, 0.1)',
        cursor: 'pointer',
    },
    addressCopy: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
        fontSize: '12px',
        fontWeight: '400',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start',
        },
    },
    addressCopyItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '32px',
        '& img': {
            width: '13px',
            height: '13px',
        },
        '& span': {
            marginLeft: '5px',
        },
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.7)',
        margin: '10px 18px 15px',
    },
    clearAll: {
        fontWeight: 'bold',
        color: '#30BE85',
        cursor: 'pointer',
    },
    txList: {
        maxHeight: '250px',
        overflowY: 'scroll',
    },
    txItem: {
        margin: '0 15px 20px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '& img': {
            width: '16px',
            height: '16px',
        },
        '& span': {
            marginLeft: '12px',
        },
    },
    ifpzCc: {
        paddingTop: '12px',
        paddingBottom: '12px',
        borderBottom: '1px solid #4A4C5E',
        fontSize: '14px',
        lineHeight: '24px',
        fontWeight: '500',
        color: '#FFFFFF',
    },
    title: {
        color: '#888D9B',
    },
    subtitle: {
        display: 'flex',
        justifyContent: 'space-between',
        '& img': {
            height: '18px',
            cursor: 'pointer',
        }
    },
    money: {
        fontSize: '16px',
    },
    usdt: {
        fontSize: '12px',
        color: '#888D9B',
    },
    iUCSnY: {
        display: 'block',
        marginTop: '20px',
        color: '#30BE85',
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 'bolder',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    outs: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ccxtUj: {
        margin: '12px 0',
        padding: '0px 12px',
        border: '1px solid #7f868f',
        color: '#FFFFFF',
        textAlign: 'center',
        borderRadius: '24px',
        cursor: 'pointer',
        lineHeight: '34px',
    }
})

class AccountDialog extends Component {
  constructor(props){
    super(props);
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const { onClose, bxhbanance, bxh_price } = this.props;
    this.state = {
        onClose: onClose,
        address: null,
        snackbarMessage: null, 
        snackbarType: null,
        transactionList: null,
        copySuccess: false,
        modalOpen: false,
        rewardBXHFactory: rewardBXHFactory,
        bxhbanance: bxhbanance,
        bxh_price: bxh_price
    };
  }
  onPresentAccount = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
    // store.SignOutAccount((data) => {
        
    // })
    // emitter.emit(CONNECTION_DISCONNECTED)
  }
  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.on(BXHCOOKIEREFRESHEVENT, this.refreshCookies);
  }
  componentDidMount() {
    this.refreshAccount();
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
    emitter.removeListener(BXHCOOKIEREFRESHEVENT, this.refreshCookies);
  }

  refreshAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address != undefined && address !== null && address != '') {
      var tempAddr = null
      const digits = 4
      tempAddr = address.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += address.substr(address.length-digits, digits)
      this.setState({address: tempAddr})
      this.refreshCookies();
    }else{
      this.setState({address: null});
    }
  }
  refreshCookies = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address != undefined && address !== null && address != '') {
        const transactionList = cookie.load(address)
        if (transactionList) {
            this.setState({ transactionList: transactionList });
        }else{
            this.setState({ transactionList: null });
        }
    }else{
        this.setState({ transactionList: null });
    }
  }
  //change
  change = () => {
    this.openUnlockModal()
  }
  //复制地址
  copyAddress = () => {
    const account = store.getStore('account')
    const spanText = account.address;
    const oInput = document.createElement('input');
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    oInput.style.display = 'none';
    document.body.removeChild(oInput);
    const that = this;
    this.setState({copySuccess: true});
    setTimeout(()=>{
        that.setState({copySuccess: false});
    },1000);
  }
  viewOnHECO = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://hecoinfo.com/address/"+address);
  }
  viewOnBSC = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://bscscan.com/address/"+address);
    this.state.onClose();
  }
  viewOnOKEX = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://www.oklink.com/okexchain/address/"+address);
    this.state.onClose();
  }
  viewOnETH = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://cn.etherscan.com/address/"+address);
    this.state.onClose();
  }
  txViewOnHECO = (txHash) => {
    window.open("https://hecoinfo.com/tx/"+txHash);
    this.state.onClose();
  }
  viewOnPoly = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://polygonscan.com/address/"+address);
    this.state.onClose();
  }
  viewOnAvax = () => {
    const account = store.getStore('account')
    const address = account.address;
    window.open("https://snowtrace.io/address/"+address);
    this.state.onClose();
  }
  clearAll = () => {
    store.clearAllCookieData()
  }
  saveToWei = (number, scale = 4) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }
  render() {
    const { classes, t } = this.props;
    const { modalOpen, address, onClose, bxhbanance, bxh_price } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
        <div className={classes.mainBg} onClick={(e) => {e.stopPropagation();if (onClose!=null) {onClose();}}}>
            <Card className={getStyleClass('PCaddressbg',classes.card)} onClick={(e) => {e.stopPropagation();}}>

                <div className={classes.ifpzCc}>
                    <div className={classes.title}>Your wallet</div>
                    <div className={classes.subtitle}>
                        <span>{address}</span>
                        {
                            chainID === '56' ?
                            <img src={ require('../../assets/bxh/copy2.png') } onClick={this.copyAddress} />
                            :
                            chainID === '66' ?
                            <img src={ require('../../assets/bxh/copy3.png') } onClick={this.copyAddress} />
                            :
                            chainID === '1' ?
                            <img src={ require('../../assets/bxh/copy4.png') } onClick={this.copyAddress} />
                            :
                            <img src={ require('../../assets/bxh/copy1.png') } onClick={this.copyAddress} />
                        }
                    </div>
                </div>
                <div className={classes.ifpzCc}>
                    <div className={classes.title}>Your BXH Balance</div>
                    <div className={classes.money}>
                        {
                            bxhbanance ?
                            <span>
                                {
                                bxhbanance ?
                                    this.saveToWei(bxhbanance + "")
                                    :
                                    '--'
                                }
                            </span>
                            :
                            "0.00"
                        }
                    </div>
                    <div className={classes.usdt}>
                        =$
                        {
                            bxh_price ? 
                                bxh_price * bxhbanance
                                : 
                                '--'
                        }
                    </div>
                    {
                        chainID === '56' ?
                        <a className={[classes.iUCSnY, "bscfonttab"].join(' ')} onClick={this.viewOnBSC}>{t('BXH.BscScan')}</a>
                        :
                        chainID === '66' ?
                        <a className={[classes.iUCSnY, "okexfonttab"].join(' ')} onClick={this.viewOnOKEX}>{t('BXH.OkexScan')}</a>
                        :
                        chainID === '1' ?
                        <a className={[classes.iUCSnY, "ethfonttab"].join(' ')} onClick={this.viewOnETH}>{t('BXH.ETHScan')}</a>
                        :
                        chainID === '137' ?
                        <a className={[classes.iUCSnY, "polyfonttab"].join(' ')} onClick={this.viewOnPoly}>{t('BXH.POLYGONScan')}</a>
                        :
                        chainID === '43114' ?
                        <a className={[classes.iUCSnY, "avaxfonttab"].join(' ')} onClick={this.viewOnAvax}>{t('BXH.AVAXScan')}</a>
                        :
                        <a className={[classes.iUCSnY, "hecofonttab"].join(' ')} onClick={this.viewOnHECO}>{t('BXH.HecoScan')}</a>
                    }
                </div>
                <div className={classes.outs}>
                    <div className={classes.ccxtUj} onClick={ this.onPresentAccount }>{t('BXH.signOut')}</div>
                </div>
            </Card>
            { modalOpen && this.renderUnlockWalletModal() }
        </div>
    )
  }
  renderTxList = (list) => {
    return list.map((obj,idx) => {
        return this.renderTxItem(obj,idx);
    })
  }
  renderTxItem = (obj,idx) => {
    const { classes } = this.props;
    return (
        <div onClick={ ()=>{this.txViewOnHECO(obj.hash)}} className={classes.txItem} key={idx}>
            {
                obj.isPending ?
                (
                    <img className="sendImage" src={ require('../../assets/bxh/send_small.png') } alt=''/>
                ):(
                    <img src={ require('../../assets/bxh/' + (obj.isSuccess ? 'success_small.png' : 'fail_small.png')) } alt=''/>
                )
            }
            <span style={{color: true ? '#30BE85' : '#DE5246'}}>{obj.msg}</span>
        </div>
    )
  }
  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }
  //授权账号
  openUnlockModal = () => {
    this.setState({ modalOpen: true })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(AccountDialog)));
