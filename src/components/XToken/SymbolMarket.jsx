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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    sysconter: {
        padding: '0 10px',
        marginTop: '10px',
    },
    syslist: {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        marginBottom: '10px',
        padding: '5px',
        width: '320px',
        [theme.breakpoints.up('sm')]: {
            width: '410px',
        }
    },
    sysicoimg: {
        '& img': {
            height: '20px',
            marginRight: '5px',
        }
    },
    sysicovalue: {
        display: 'flex',
        height: '15px',
        lineHeight: '15px',
        marginTop: '5px',
        opacity: '.8',
        fontSize: '14px',
        '& span': {
            marginRight: '10px',
        },
        '& img': {
            width: '24px',
            marginLeft: '10px',
        }
    }
})

class SymbolMarket extends Component {
    constructor(props) {
        super(props)
        const { onClose, symbolList, toSymbol, onSure } = this.props;
        // console.log('symbolList===>', symbolList)
        this.state = {
            onClose: onClose,
            symbolList: symbolList,
            toSymbol: toSymbol,
            onSure: onSure
        }
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }
    
    render() {
        const { classes, t } = this.props;
        const { symbolList } = this.state;

        return (
            <div className={ classes.mainBg } onClick={ (e) => { e.stopPropagation(); if(this.state.onClose!=null){this.state.onClose();}} }>
                <div className={getStyleClass('PCdiagleftbg',classes.content)} onClick= { (e) => { e.stopPropagation() } } >
                    <div className={ classes.top }>
                        <div className={ classes.title }>{t('BXH.XDTSelect')}</div>
                        <div onClick={ this.state.onClose } style={{padding:'5px',cursor:'pointer'}}>
                            <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                        </div>
                    </div>

                    <div className={classes.sysconter}>
                        {
                            symbolList?symbolList.map((obj,idx)=>this.renderListItem(obj,idx)):null
                        }
                    </div>

                </div>
            </div>
        )
    }

    renderListItem = (obj,idx) => {
        const { classes, t } = this.props;
        const { toSymbol } = this.state;
        const symbol = (obj&&obj.symbolPair)||"--";
        // console.log('toSymbol===>', toSymbol)

        return (
            <label key={idx}>
                <div className={ classes.syslist }>
                    <div className={ classes.sysicoimg }>
                        <img src={getTokenLogoURLWithName(symbol)} /> {symbol}
                    </div>

                    {
                        obj.symbolPair === toSymbol.symbolPair ?
                        <div className={getStyleClass('xdtbrilabel',classes.sysicovalue)} onClick={() => { this.onCheck(obj) }}>
                            <span>{t('BXH.XDTQuota')} {isNoEmpty(obj.contractBalance)?obj.contractBalance:'--'}</span>
                            <input type="radio" id={idx} name="checkfor" defaultChecked />
                            <label htmlFor={idx}></label>
                        </div>
                        :
                        <div className={getStyleClass('xdtbrilabel',classes.sysicovalue)} onClick={() => { this.onCheck(obj) }}>
                            <span>{t('BXH.XDTQuota')} {isNoEmpty(obj.contractBalance)?obj.contractBalance:'--'}</span>
                            <input type="radio" id={idx} name="checkfor" />
                            <label htmlFor={idx}></label>
                        </div>
                    }
                </div>
            </label>
        )
    }

    onCheck = (obj) => {
        if (this.state.onClose != null) {
            this.state.onClose();
        }
        if (this.state.onSure != null) {
            this.state.onSure(obj);
        }
    }
    
}

export default withNamespaces()(withRouter(withStyles(styles)(SymbolMarket)));
