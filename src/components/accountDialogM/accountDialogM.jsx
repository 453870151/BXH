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
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#262946',
        color: '#FFFFFF',
        fontSize: '14px',
        padding: '15px',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '6px',
            position: 'relative',
            width: '460px',
            padding: '20px',
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
})

class AccountDialogM extends Component {
  constructor(props){
    super(props);
    const { onClose } = this.props;
    this.state = {
        onClose: onClose,
        address: null,
        snackbarMessage: null, 
        snackbarType: null,
        transactionList: null,
        copySuccess: false,
        modalOpen: false,
    };
  }
  close = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
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
  txViewOnHECO = (txHash) => {
    window.open("https://hecoinfo.com/tx/"+txHash);
  }
  clearAll = () => {
    store.clearAllCookieData()
  }
  render() {
    const { classes } = this.props;
    const { modalOpen, copySuccess, address, onClose, transactionList } = this.state;
    return (
        <div className={classes.mainBg} onClick={(e) => {e.stopPropagation();if (onClose!=null) {onClose();}}}>
            <Card className={classes.card} onClick={(e) => {e.stopPropagation();}}>
                <div className={classes.close} onClick={ this.close }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
                <div className={classes.header}>My Account</div>
                <div className={classes.content}>
                    <div style={{color:'rgba(255, 255, 255, 0.8)'}}>Connected with Heco</div>
                    <div className={classes.addressRow}>
                        <div className={classes.addressContent}>
                            <img src={ require('../../assets/bxh/tesol.png') } alt=''/>
                            <span>{address}</span>
                        </div>
                        <div onClick={this.change} className={classes.change}>Change</div>
                    </div>
                    <div className={classes.addressCopy}>
                        <div onClick={this.copyAddress} className={classes.addressCopyItem}>
                            <img src={ require('../../assets/bxh/' + (copySuccess ? 'copied_success.png' : 'copy.png')) } alt=''/>
                            <span>{copySuccess ? 'Copied' : 'Copy Address'}</span>
                        </div>
                        <div onClick={this.viewOnHECO} className={classes.addressCopyItem}>
                            <img src={ require('../../assets/bxh/share.png') } alt=''/>
                            <span>View on HECO</span>
                        </div>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div>Your transactions will appear here…</div>
                    <div style={{display: transactionList ? 'block' : 'none'}} onClick={this.clearAll} className={classes.clearAll}>(clear all)</div>
                </div>
                <div className={classes.txList}>
                    { transactionList && this.renderTxList(transactionList) }
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

export default withNamespaces()(withRouter(withStyles(styles)(AccountDialogM)));
