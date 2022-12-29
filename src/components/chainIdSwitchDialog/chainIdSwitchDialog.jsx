import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import '../../config/constantFunction.jsx';
import {
    Card,
} from '@material-ui/core';
import Store from "../../stores";
import cookie from 'react-cookies';
import UnlockModal from '../unlock/unlockModal.jsx';

import {
    STAKEBXH_CHAINID,
    STAKEBXH_CHAINID_RETURNED,
    CONNECTION_CONNECTED,
    BXHCHNAGEACCOUNT,
    GET__BXHBRIDGEMAIN,
} from '../../constants';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher
const store = Store.store;

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '50px',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '99999',
    },
    card: {
        position: 'absolute',
        bottom: '0',
        right: '80px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#414040',
        color: '#FFFFFF',
        fontSize: '14px',
        padding: '10px',
        top: '0px',
        // height: '195px',
        height: '165px',
        width: '110px',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '8px',
            position: 'absolute',
            width: '120px',
            padding: '10px',
            paddingLeft: '20px',
            paddingBottom: '0',
            top: '10px',
            height: '135px',
            left: 'calc(100% - 18%)',
        }
    },
    cardpoly: {
        position: 'absolute',
        bottom: '0',
        right: '100px',
        borderRadius: '8px',
        overflow: 'hidden',
        background: '#414040',
        color: '#FFFFFF',
        fontSize: '14px',
        padding: '10px',
        top: '0px',
        height: '195px',
        width: '110px',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '8px',
            position: 'absolute',
            width: '120px',
            padding: '10px',
            paddingLeft: '20px',
            paddingBottom: '0',
            top: '10px',
            height: '135px',
            left: 'calc(100% - 18%)',
        }
    },
    chainlog: {
        marginBottom: '10px',
        cursor: 'pointer',
        lineHeight: '20px',
        fontWeight: '500',
        '& img': {
            verticalAlign: 'middle',
            marginRight: '8px',
        }
    }
})


class ChainIdSwitchDialog extends Component {
  constructor(props){
    super(props);
    const { onClose } = this.props;
    console.log(onClose)
    this.state = {
        onClose: onClose,
    };
  }
  close = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
  }
  componentWillMount() {
    emitter.on(STAKEBXH_CHAINID_RETURNED, this.chainReturned);
  }
  componentWillUnmount() {
    emitter.removeListener(STAKEBXH_CHAINID_RETURNED, this.chainReturned);
  }


  render() {
    const { classes, t } = this.props;
    const { onClose } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
        <div className={classes.mainBg} onClick={(e) => {e.stopPropagation();if (onClose!=null) {onClose();}}}>
            <Card className={[chainID === '137' ? classes.cardpoly : classes.card].join(' ')} onClick={(e) => {e.stopPropagation();}}>
                <div>
                    <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('128')}}>
                        <img src={require('../../assets/bxh/huobi.png')} style={{ width: '10px' }} />
                        HECO
                    </div>
                    <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('56')}}>
                        <img src={require('../../assets/bxh/bian.png')} style={{ width: '10px' }} />
                        BSC
                    </div>
                    <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('66')}}>
                        <img src={require('../../assets/bxh/okex.png')} style={{ width: '10px' }} />
                        OKC
                    </div>
                    <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('1')}}>
                        <img src={require('../../assets/bxh/eth.png')} style={{ width: '10px' }} />
                        ETH
                    </div>
                    {/* <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('137')}}>
                        <img src={require('../../assets/bxh/polygon.png')} style={{ width: '10px' }} />
                        POLYGON
                    </div> */}
                    <div className={classes.chainlog} onClick={ ()=>{this.storageChainID('43114')}}>
                        <img src={require('../../assets/bxh/AVAX.png')} style={{ width: '10px' }} />
                        AVAX
                    </div>
                </div>
            </Card>
        </div>
    )
  }

  storageChainID = (chainID) => {
    if (this.state.onClose!=null) {
        this.state.onClose()
    }
    if(chainID === '1'){
        alert('请手动将当前网络设置为Ethereum')
    }else{
        dispatcher.dispatch({ type: STAKEBXH_CHAINID, content: {chainID: chainID} })
    }
  }

  chainReturned = () => {
    emitter.emit(CONNECTION_CONNECTED)
    emitter.emit(BXHCHNAGEACCOUNT)
    emitter.emit(GET__BXHBRIDGEMAIN)
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(ChainIdSwitchDialog)));
