import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Store from "../../stores";
import { getTokenLogoURLWithName,SaveToTwoWei,isNoEmpty,_getValuemultip,_getValueDivided,_getValueMinus4,_getValueAdd2,_getValuePow,getStyleClass,isEmpty, saveToWei } from '../../config/constantFunction'
import { Tooltip } from 'antd';

import {
    
} from '../../constants'

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999999',
    },
    content: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#262946',
        padding: '20px 15px',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            position: 'relative',
            width: '460px',
        }
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
    },
    title: {
        fontSize: '17px',
        fontWeight: 'bold',
    },
    desc: {
        padding: '0 10px',
        fontSize: '12px',
        opacity: '.8',
    },
    listconter: {
        background: '#292d46',
        borderRadius: '12px',
        padding: '15px',
        margin: '20px 0 10px',
    },
    listtitdes: {
        position: 'relative',
        display: 'flex',
        fontSize: '13px',
    },
    listleft1: {
        marginRight: '15px',
        '& img': {
            height: '20px',
            verticalAlign: 'bottom',
            marginRight: '5px',
        }
    },
    listleft2: {
        background: 'none !important',
        borderRadius: '4px',
        padding: '3px 5px',
        fontSize: '12px',
        '& img': {
            height: '15px',
            verticalAlign: 'bottom',
            padding: '0 5px',
        },
    },
    listleft3: {
        width: '14px',
        height: '11px',
        margin: '6px 10px',
    },
    listleft4: {
        position: 'absolute',
        right: '0px',
        '& img': {
            height: '6px',
        },
    },
    liststatus1: {
        color: '#DD4E43',
    },
    liststatus2: {
        color: '#2AA875',
    },
    liststatus3: {
        color: '#D9DAE0',
    },
    listtramnt: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        marginTop: '15px',
        '& span': {
            display: 'block',
        },
        '& i': {
            display: 'block',
            fontStyle: 'inherit',
            opacity: '.8',
            marginBottom: '5px',
        },
        '& em': {
            display: 'block',
            fontStyle: 'inherit',
        },
    },
    listscroll: {
        maxHeight: '365px',
        overflowY: 'scroll',
    },
    detconter: {
        margin: '20px 10px',
    },
    liststuam: {
        display: 'flex',
        fontSize: '13px',
        background: '#2c304b',
        borderRadius: '4px',
        padding: '10px',
        margin: '10px 0',
        '& img': {
            width: '12px',
            height: '12px',
            margin: '0 10px',
            marginTop: '3px',
        }
    },
    listtrams: {
        '& span': {
            fontWeight: 'bold',
        },
        '& em': {
            fontStyle: 'inherit',
            opacity: '.8',
            marginLeft: '5px',
        },
    },
    listsxufei: {
        fontSize: '12px',
        '& span': {
            opacity: '.6',
        },
    },
    listaddress: {
        fontSize: '13px',
        borderTop: '1px solid #2e324b',
        paddingTop: '10px',
        marginTop: '10px',
        '& em': {
            display: 'block',
            fontStyle: 'inherit',
            opacity: '.45',
            fontSize: '12px',
            fontWeight: 'bold',
            marginTop: '5px',
            wordWrap: 'break-word',
        },
    },
    bxhtishiaddress: {
        fontSize: '12px',
        color: '#FF8F6B',
        paddingLeft: '10px',
        paddingTop: '10px',
        '& img': {
          width: '14px',
          marginRight: '5px',
          verticalAlign: 'text-top',
        }
    },
    bxhbottomUnAbleClickflex: {
        flex: '2',
        height: '45px',
        lineHeight: '45px',
        backgroundImage: 'linear-gradient(to right, #4F5257, #4F5257)',
        fontWeight: 'bold',
        fontSize: '15px',
        borderRadius: '6px',
        textAlign: 'center',
        letterSpacing: '1px',
        marginTop: '20px',
        marginLeft: '5px',
        marginBottom: '10px',
        cursor: 'pointer',
    },
})

class ConfirmationMarket extends Component {
    constructor(props) {
        super(props)
        const { onClose, onSure, address, addressSubstr, fromSymbol, bridgeSelect, inputVal, feeToInputVal, feeValue } = this.props;
        this.state = {
            onClose: onClose,
            onSure: onSure,
            address: address,
            addressSubstr: addressSubstr,
            fromSymbol: fromSymbol,
            bridgeSelect: bridgeSelect,
            inputVal: inputVal,
            feeToInputVal: feeToInputVal,
            feeValue: feeValue,
        }
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        const { classes, t, isMobile } = this.props;
        const { address, addressSubstr, fromSymbol, bridgeSelect, inputVal, feeToInputVal, feeValue } = this.state;
        const payChainId = (bridgeSelect&&bridgeSelect.payChainId)||"--";
        //tokenExType=1
        let feeValueType = '0.00'
        feeValueType = (inputVal&&feeToInputVal&&_getValueMinus4(inputVal, feeToInputVal))||'0.00'
        let chainID = localStorage.getItem('chainIDSwitch')

        return (
            <div className={ classes.mainBg } onClick={ (e) => { e.stopPropagation(); if(this.state.onClose!=null){this.state.onClose();}} }>
                <div className={getStyleClass('PCdiagleftbg',classes.content)} onClick= { (e) => { e.stopPropagation() } } >
                    <div className={ classes.top }>
                        <div className={ classes.title }>{t('BXH.BrTransactionConfirm')}</div>
                        <div onClick={ this.state.onClose } style={{padding:'5px',cursor:'pointer'}}>
                            <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                        </div>
                    </div>
                    <div className={ classes.desc }>{t('BXH.BrTransactionPlease')}</div>

                    <div className={getStyleClass('briDialogbg',classes.listconter)}>
                        <div className={ classes.listtitdes }>
                            {
                                chainID==='128'?
                                <div className={[classes.listleft2, 'hecobrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_heco.png')} />
                                    <span>HECO</span>
                                </div>
                                :
                                chainID==='66'?
                                <div className={[classes.listleft2, 'okexbrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                                    <span>OKC</span>
                                </div>
                                :
                                chainID==='56'?
                                <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_bsc.png')} />
                                    <span>BSC</span>
                                </div>
                                :
                                chainID==='137'?
                                <div className={[classes.listleft2, 'polybrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_poly.png')} />
                                    <span>POLYGON</span>
                                </div>
                                :
                                chainID==='43114'?
                                <div className={[classes.listleft2, 'avaxbrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_avax.png')} />
                                    <span>AVAX</span>
                                </div>
                                :
                                <div className={[classes.listleft2, 'ethbrijilu'].join(' ')}>
                                    {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_eth.png')} />
                                    <span>ETH</span>
                                </div>
                            }

                            <img src={require('../../assets/bxh/dao2.png')} className={ classes.listleft3 } />

                            {
                                payChainId===128?
                                <div className={[classes.listleft2, 'hecobrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_heco.png')} />
                                    <span>HECO</span>
                                </div>
                                :
                                payChainId===66?
                                <div className={[classes.listleft2, 'okexbrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                                    <span>OKC</span>
                                </div>
                                :
                                payChainId===56?
                                <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_bsc.png')} />
                                    <span>BSC</span>
                                </div>
                                :
                                payChainId===137?
                                <div className={[classes.listleft2, 'polybrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_poly.png')} />
                                    <span>POLYGON</span>
                                </div>
                                :
                                payChainId===43114?
                                <div className={[classes.listleft2, 'avaxbrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_avax.png')} />
                                    <span>AVAX</span>
                                </div>
                                :
                                <div className={[classes.listleft2, 'ethbrijilu'].join(' ')}>
                                    {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_eth.png')} />
                                    <span>ETH</span>
                                </div>
                            }
                        </div>
                        <div className={getStyleClass('briDialogtitbg',classes.liststuam)}>
                            <div className={ classes.listtrams }>
                                <span>
                                    {
                                        chainID==='128'?
                                        <span>HECO</span>
                                        :
                                        chainID==='66'?
                                        <span>OKC</span>
                                        :
                                        chainID==='56'?
                                        <span>BSC</span>
                                        :
                                        chainID==='137'?
                                        <span>POLYGON</span>
                                        :
                                        chainID==='43114'?
                                        <span>AVAX</span>
                                        :
                                        <span>ETH</span>
                                    }
                                    {t('BXH.BrTransactionTit')}
                                </span>
                                <em>{inputVal} {fromSymbol.symbol}</em>
                            </div>
                            <img src={require('../../assets/bxh/jiantouzuo.png')} />
                            <div className={ classes.listtrams }>
                                <span>
                                    {
                                        payChainId===128?
                                        <span>HECO</span>
                                        :
                                        payChainId===66?
                                        <span>OKC</span>
                                        :
                                        payChainId===56?
                                        <span>BSC</span>
                                        :
                                        payChainId===137?
                                        <span>POLYGON</span>
                                        :
                                        payChainId===43114?
                                        <span>AVAX</span>
                                        :
                                        <span>ETH</span>
                                    }
                                    {t('BXH.BrTransactionEst')}
                                </span>
                                <em>{feeToInputVal} {fromSymbol.symbol}</em>
                            </div>
                        </div>
                        {
                            fromSymbol.tokenExType===0?
                            <div className={ classes.listsxufei }>
                                <span>{t('BXH.BrTransactionFee')}：</span>{feeValue} <span>{fromSymbol.symbol}</span>
                            </div>
                            :
                            <div className={ classes.listsxufei }>
                                <span>{t('BXH.BrTransactionFee')}：</span>{feeValue} <span>{fromSymbol.symbol}</span>
                            </div>
                        }
                        
                        <div className={ classes.listaddress }>
                            <span>{t('BXH.BrCollectionAddress')}</span>
                            {
                                isMobile === 1?
                                <em>{address}</em>
                                :
                                <em>{addressSubstr}</em>
                            }
                        </div>
                    </div>
                    <div className={classes.bxhtishiaddress}>
                        <img src={require('../../assets/bxh/zhuyi.png')} />
                        {
                            bridgeSelect.payChainId === 1?
                            <span>{t('BXH.BrPleaseBe')}ERC20{t('BXH.BrCollection')}</span>
                            :
                            bridgeSelect.payChainId === 56?
                            <span>{t('BXH.BrPleaseBe')}BEP20{t('BXH.BrCollection')}</span>
                            :
                            bridgeSelect.payChainId === 66?
                            <span>{t('BXH.BrPleaseBe')}OKCChain{t('BXH.BrCollection')}</span>
                            :
                            bridgeSelect.payChainId === 137?
                            <span>{t('BXH.BrPleaseBe')}POLYGON{t('BXH.BrCollection')}</span>
                            :
                            bridgeSelect.payChainId === 43114?
                            <span>{t('BXH.BrPleaseBe')}AVAX{t('BXH.BrCollection')}</span>
                            :
                            <span>{t('BXH.BrPleaseBe')}HECO{t('BXH.BrCollection')}</span>
                        }
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className={getStyleClass('PC_new_btn1',classes.bxhbottomUnAbleClickflex)} onClick={this.nextAction}>
                            {t('BXH.confirm')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 
    //返回
    back = () => {
        if (this.state.onClose != null) {
            this.state.onClose();
        }
    }
    nextAction = () => {
        this.back();
        if (this.state.onSure != null) {
            this.state.onSure();
        }
    }

}

export default withNamespaces()(withRouter(withStyles(styles)(ConfirmationMarket)));
