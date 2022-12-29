import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Store from "../../stores";
import { getTokenLogoURLWithName,SaveToTwoWei,isNoEmpty,_getValuemultip,_getValueDivided,_getValueDivided1,_getValueDivided3,_getValueMinus4,_getValueAdd2,_getValuePow,getStyleClass,isEmpty, saveToWei } from '../../config/constantFunction'
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
        marginBottom: '10px',
    },
    listconter: {
        background: '#292d46',
        borderRadius: '12px',
        boxShadow: '2px 2px 5px #20233c',
        padding: '15px',
        margin: '10px 0 15px',
    },
    listtitdes: {
        position: 'relative',
        display: 'flex',
        fontSize: '13px',
        cursor: 'pointer',
    },
    listleft1: {
        marginRight: '5px',
        '& img': {
            height: '20px',
            verticalAlign: 'bottom',
            marginRight: '5px',
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: '15px',
        }
    },
    listleft2: {
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
    start: {
        display: 'flex',
        '& em': {
            fontStyle: 'inherit',
            fontWeight: 'bold',
        },
    },
    startsymbol: {
        display: 'inline-block',
        height: '16px',
        width: '16px',
        marginRight: '5px',
        '& img': {
            height: '16px',
        },
    },
    schedule: {
        width: '25px',
        height: '88px',
        '& img': {
            width: '28px',
            height: '28px',
        },
        '& p': {
            background: '#4db18b',
            width: '2px',
            height: '60px',
            marginLeft: '13px',
        }
    },
    detStatus: {
        width: '100%',
        fontSize: '14px',
        marginLeft: '20px',
        marginTop: '3px',
    },
    dettitcont: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    detLine: {
        display: 'flex',
        width: '100%',
        height: '7px',
        background: '#2f3448',
        borderRadius: '7px',
        margin: '10px 0',
        '& span': {
            display: 'inline-block',
            height: '7px',
            background: '#03ad90',
            borderRadius: '7px',
        }
    },
    confides: {
        fontSize: '12px',
        opacity: '.8',
        paddingTop: '2px',
    },
    dettx: {
        color: '#30BE85',
        fontSize: '12px',
        cursor: 'pointer',
        '& span': {
            opacity: '.6',
        },
        '& img': {
            width: '20px',
        }
    },
    detaddress: {
        fontSize: '12px',
        opacity: '.5',
        margin: '5px 0',
        whiteSpace: 'nowrap',
    }
})

class TransactionMarket extends Component {
    constructor(props) {
        super(props)
        const { onClose, bridgeSymbolConfig } = this.props;
        this.state = {
            address: null,
            onClose: onClose,
            listShow: true,
            detailsShow: false,
            detailsIdx: 0,
            bridgeSymbolConfig: bridgeSymbolConfig,
            symbolBlockNumber: '0',
        }
    }
    componentDidMount() {
        this.refreshAccount();
    }
    componentWillUnmount() {
        
    }

    //刷新账户相关信息
    refreshAccount = (isLoad=false) => {
        const account = store.getStore('account');
        const address = account.address;
        if (isNoEmpty(address)) {
            this.setState({ address: address });
        } else {
            this.setState({ address: null });
        }
    }


    render() {
        const { classes, t, bridgeOrderList } = this.props;
        const { listShow, detailsShow } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')

        let orderList = bridgeOrderList&&bridgeOrderList.bridge_order_list
        // let storage = JSON.parse(localStorage.getItem('bridgeBottomArray'))
        // let storageSenderTx = storage&&storage[0]['senderTx']
        // if(storageSenderTx){
        //     let item = bridgeOrderList&&bridgeOrderList.bridge_order_list.find(item => {
        //         return item.senderTx == storageSenderTx;
        //     });
        //     //获取数据里是否包含storage里数据
        //     if(item){
        //         //包含
        //         orderList = bridgeOrderList&&bridgeOrderList.bridge_order_list
        //     }else{
        //         orderList.unshift(storage[0])
        //     }
        // }

        return (
            <div className={ classes.mainBg } onClick={ (e) => { e.stopPropagation(); if(this.state.onClose!=null){this.state.onClose();}} }>
                <div className={getStyleClass('PCdiagleftbg',classes.content)} onClick= { (e) => { e.stopPropagation() } } >
                    <div className={ classes.top }>
                        <div className={ classes.title }>{t('BXH.BrTransactionRecord')}</div>
                        <div onClick={ this.state.onClose } style={{padding:'5px',cursor:'pointer'}}>
                            <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                        </div>
                    </div>
                    <div className={ classes.desc }>{t('BXH.BrTransactionOnly')}</div>

                    {/* 交易记录列表 */}
                    {
                        orderList&&orderList.length===0?
                        <div style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px'  }}>
                            {
                                chainID === '56' ? 
                                <img src={require('../../assets/bxh/emptydata1.png')} alt="" style={{ width: '30px', }} />
                                :
                                chainID === '66' ? 
                                <img src={require('../../assets/bxh/emptydata2.png')} alt="" style={{ width: '30px', }} />
                                :
                                chainID === '1' ? 
                                <img src={require('../../assets/bxh/emptydata3.png')} alt="" style={{ width: '30px', }} />
                                :
                                chainID === '137' ? 
                                <img src={require('../../assets/bxh/emptydata4.png')} alt="" style={{ width: '30px', }} />
                                :
                                chainID === '43114' ? 
                                <img src={require('../../assets/bxh/emptydata5.png')} alt="" style={{ width: '30px', }} />
                                :
                                <img src={require('../../assets/bxh/emptydata.png')} alt="" style={{ width: '30px', }} />
                            }
                            <div style={{ fontSize: '14px', marginTop: '5px' }}>
                                {t('BXH.nodatatitle')}
                            </div>
                        </div>
                        :
                        listShow?
                        <div className={ classes.listscroll } style={{minHeight: '200px'}}>
                            {
                                orderList?orderList.map((obj,idx)=>this.renderListItem(obj,idx)):null
                            }
                        </div>
                        :
                        null
                    }
                </div>

                {/* 交易记录详情 */}
                {
                    detailsShow && this.renderDetails()
                }

            </div>
        )
    }

    renderListItem = (obj,idx) => {
        const { classes, t } = this.props;
        const { bridgeSymbolConfig } = this.state;
        const bridgeFee = bridgeSymbolConfig&&_getValueDivided1(bridgeSymbolConfig.bridgeFee, 1000)

        return (
            <div key={idx} className={getStyleClass('briDialogProbg',classes.listconter)}>
                <div className={ classes.listtitdes } onClick={() => { this.itemDetailsShow(idx, obj) }}>
                    <div className={ classes.listleft1 }>
                        <img src={getTokenLogoURLWithName(obj.symbol)} /> {obj.symbol}
                    </div>
                    {
                        obj&&obj.senderChainId===128?
                        <div className={[classes.listleft2, 'hecobrijilu'].join(' ')}>
                            {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_heco.png')} />
                            <span>HECO</span>
                        </div>
                        :
                        obj&&obj.senderChainId===66?
                        <div className={[classes.listleft2, 'okexbrijilu'].join(' ')}>
                            {t('BXH.BrFrom')} <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                            <span>OKC</span>
                        </div>
                        :
                        obj&&obj.senderChainId===56?
                        <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                            {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_bsc.png')} />
                            <span>BSC</span>
                        </div>
                        :
                        obj&&obj.senderChainId===137?
                        <div className={[classes.listleft2, 'polybrijilu'].join(' ')}>
                            {t('BXH.BrFrom')} <img src={require('../../assets/bxh/ico_poly.png')} />
                            <span>POLYGON</span>
                        </div>
                        :
                        obj&&obj.senderChainId===43114?
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
                        obj&&obj.payChainId===128?
                        <div className={[classes.listleft2, 'hecobrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_heco.png')} />
                            <span>HECO</span>
                        </div>
                        :
                        obj&&obj.payChainId===66?
                        <div className={[classes.listleft2, 'okexbrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                            <span>OKC</span>
                        </div>
                        :
                        obj&&obj.payChainId===56?
                        <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_bsc.png')} />
                            <span>BSC</span>
                        </div>
                        :
                        obj&&obj.payChainId===137?
                        <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_poly.png')} />
                            <span>POLYGON</span>
                        </div>
                        :
                        obj&&obj.payChainId===43114?
                        <div className={[classes.listleft2, 'bscbrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_avax.png')} />
                            <span>AVAX</span>
                        </div>
                        :
                        <div className={[classes.listleft2, 'ethbrijilu'].join(' ')}>
                            {t('BXH.BrTo')} <img src={require('../../assets/bxh/ico_eth.png')} />
                            <span>ETH</span>
                        </div>
                    }

                    {/* errStatus 0表示成功 继续执行下面逻辑，否则失败 */}
                    {
                        obj&&obj.errStatus===0?
                        <div>
                            {/* orderStatus 订单状态：0表示等待处理，1表示审核通过，正在跨链；2表示跨链成功；-1表示审核失败，订单退回 */}
                            {
                                obj&&obj.orderStatus===0?
                                <div className={[classes.listleft4, classes.liststatus1].join(' ')}>
                                    {t('BXH.BrTransactionWaiting')} <img src={require('../../assets/bxh/brstatus1.png')} />
                                </div>
                                :
                                obj&&obj.orderStatus===1?
                                <div className={[classes.listleft4, classes.liststatus1].join(' ')}>
                                    {t('BXH.BrTransactionProcessing')} <img src={require('../../assets/bxh/brstatus1.png')} />
                                </div>
                                :
                                obj&&obj.orderStatus===2?
                                <div className={[classes.listleft4, classes.liststatus2].join(' ')}>
                                    {t('BXH.BrTransactionCompleted')} <img src={require('../../assets/bxh/brstatus2.png')} />
                                </div>
                                :
                                <div className={[classes.listleft4, classes.liststatus3].join(' ')}>
                                    {t('BXH.BrTransactionfail')} <img src={require('../../assets/bxh/brstatus3.png')} />
                                </div>
                            }
                        </div>
                        :
                        <div className={[classes.listleft4, classes.liststatus1].join(' ')}>
                            {t('BXH.BrTransactionCross')} <img src={require('../../assets/bxh/brstatus1.png')} />
                        </div>
                    }
                </div>
                <div className={ classes.listtramnt }>
                    <span>
                        <i>{t('BXH.BrTransactionAssets')}</i>
                        <em>{obj&&obj.senderTokenAmount.toFixed(4)}</em>
                    </span>
                    <span>
                        <i>{t('BXH.BrTransactionArrival')}</i>
                        <em>{obj&&obj.payTokenAmount.toFixed(4)}</em>
                    </span>
                    <span>
                        <i>{t('BXH.BrTransactionFee')}</i>
                        <em>{obj&&_getValuemultip(obj.senderTokenAmount, bridgeFee, 4)}</em>
                    </span>
                </div>
            </div>
        )
    }

    // 交易记录详情
    renderDetails = () => {
        const { classes, t, bridgeOrderList, isMobile } = this.props;
        const { detailsIdx, address, symbolBlockNumber } = this.state;
        let orderList = []
        orderList.push(bridgeOrderList.bridge_order_list[detailsIdx])
        let baifenbi = _getValuemultip(_getValueDivided(symbolBlockNumber, 21, 4), 100) + '%'
        {/* orderStatus 订单状态：0表示等待处理，1表示审核通过，正在跨链；2表示跨链成功；-1表示审核失败，订单退回 */}
        let statusOrder = orderList[0].orderStatus
        //收款地址
        let addressTo, addressSubstr;
        // if(statusOrder===2){
        //     addressTo = address
        //     const digits = 10
        //     addressSubstr = addressTo.substr(0, digits+2)
        //     addressSubstr += '...'
        //     addressSubstr += addressTo.substr(addressTo.length-digits, digits)
        // }else{
        //     addressTo = orderList[0].payAddress
        //     const digits = 10
        //     addressSubstr = addressTo.substr(0, digits+2)
        //     addressSubstr += '...'
        //     addressSubstr += addressTo.substr(addressTo.length-digits, digits)
        // }
        addressTo = orderList[0].payAddress
        const digits = 10
        addressSubstr = addressTo.substr(0, digits+2)
        addressSubstr += '...'
        addressSubstr += addressTo.substr(addressTo.length-digits, digits)
        
        return (
            <div className={ classes.mainBg } onClick={ (e) => { e.stopPropagation(); if(this.state.onClose!=null){this.itemDetailsClose()}} }>
                <div className={getStyleClass('PCdiagleftbg',classes.content)} onClick= { (e) => { e.stopPropagation() } } >
                    <div className={ classes.top }>
                        <div className={ classes.title }>
                            {t('BXH.BrTransactionDetails')}
                        </div>
                        <div onClick={ this.itemDetailsClose } style={{padding:'5px',cursor:'pointer'}}>
                            <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                        </div>
                    </div>

                    <div className={ classes.detconter }>
                    
                        {/* 第一个 */}
                        <div className={ classes.start }>
                            {
                                statusOrder===0&&symbolBlockNumber<21?
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status2.png') } />
                                    <p style={{ background: '#30354b' }}></p>
                                </div>
                                :
                                statusOrder===1&&symbolBlockNumber<21?
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status2.png') } />
                                    <p style={{ background: '#30354b' }}></p>
                                </div>
                                :
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p></p>
                                </div>
                            }
                            <div className={ classes.detStatus }>
                                <div className={ classes.dettitcont }>
                                    {
                                        orderList[0].senderChainId===128?
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src={require('../../assets/bxh/ico_heco.png')} />
                                            </span>
                                            <em>HECO</em>
                                        </div>
                                        :
                                        orderList[0].senderChainId===66?
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                                            </span>
                                            <em>OKC</em>
                                        </div>
                                        :
                                        orderList[0].senderChainId===56?
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src={require('../../assets/bxh/ico_bsc.png')} />
                                            </span>
                                            <em>BSC</em>
                                        </div>
                                        :
                                        orderList[0].senderChainId===137?
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src={require('../../assets/bxh/ico_poly.png')} />
                                            </span>
                                            <em>POLYGON</em>
                                        </div>
                                        :
                                        orderList[0].senderChainId===43114?
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src={require('../../assets/bxh/ico_avax.png')} />
                                            </span>
                                            <em>AVAX</em>
                                        </div>
                                        :
                                        <div className={ classes.start }>
                                            <span className={ classes.startsymbol }>
                                                <img src={require('../../assets/bxh/ico_eth.png')} />
                                            </span>
                                            <em>ETH</em>
                                        </div>
                                    }
                                    {
                                        statusOrder===2?
                                        <div className={ classes.confides }>21/21 Confirmed</div>
                                        :
                                        statusOrder!==0&&symbolBlockNumber>=21?
                                        <div className={ classes.confides }>21/21 Confirmed</div>
                                        :
                                        <div className={ classes.confides }>{symbolBlockNumber}/21 Confirmed</div>
                                    }
                                </div>
                                <div className={ classes.detLine }>
                                    {
                                        (statusOrder===0||statusOrder===1)&&symbolBlockNumber<21?
                                        <span style={{ width: baifenbi }}></span>
                                        :
                                        <span style={{ width: '100%' }}></span>
                                    }
                                </div>
                                <div className={ classes.dettx } onClick={() => { this.addressTxHash(orderList[0].senderChainId, orderList[0].senderTx) }}>
                                    <span>{t('BXH.BrTransactionHash')}</span>
                                    <img src={require('../../assets/bxh/jiantou.png')} />
                                </div>
                            </div>
                        </div>

                        {/* 第二个 */}
                        <div className={ classes.start }>
                            {
                                (statusOrder===0||statusOrder===1)&&symbolBlockNumber<21?
                                <div className={ classes.schedule } style={{ height: '68px' }}>
                                    <img src={ require('../../assets/bxh/status3.png') } />
                                    <p style={{ background: '#30354b' }}></p>
                                </div>
                                :
                                (statusOrder===0||statusOrder===1)&&symbolBlockNumber>=21?
                                <div className={ classes.schedule } style={{ height: '68px' }}>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p></p>
                                </div>
                                :
                                statusOrder===-1?
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p></p>
                                </div>
                                :
                                <div className={ classes.schedule } style={{ height: '68px' }}>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p></p>
                                </div>
                            }
                            <div className={ classes.detStatus }>
                                <div className={ classes.dettitcont }>
                                    <div className={ classes.start }>
                                        <span className={ classes.startsymbol }>
                                            <img src={getTokenLogoURLWithName(orderList[0].symbol)} />
                                        </span>
                                        <em>BXH labs</em>
                                    </div>
                                    {
                                        (statusOrder===0||statusOrder===1||statusOrder===-1)&&symbolBlockNumber<21?
                                        <div className={ classes.confides }>0/1 Confirmed</div>
                                        :
                                        <div className={ classes.confides }>1/1 Confirmed</div>
                                    }
                                </div>
                                <div className={ classes.detLine }>
                                    {
                                        (statusOrder===0||statusOrder===1)&&symbolBlockNumber<21?
                                        <span style={{ width: '0%' }}></span>
                                        :
                                        statusOrder===-1?
                                        <span style={{ width: '100%',background: '#DD4E43' }}></span>
                                        :
                                        <span style={{ width: '100%' }}></span>
                                    }
                                </div>
                                {
                                    statusOrder===-1?
                                    <div className={ classes.dettx } style={{ cursor: 'auto' }}>
                                        <span style={{ color: '#FF8F6B',opacity: '1' }}>
                                            <img src={require('../../assets/bxh/zhuyi.png')} style={{ width: '12px',marginRight: '5px' }} />
                                            {t('BXH.BrTransactionFailure')}
                                        </span>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>

                        {/* 第三个 */}
                        <div className={ classes.start }>
                            {
                                statusOrder===2?
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p style={{ height: '95px' }}></p>
                                </div>
                                :
                                statusOrder===-1?
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                    <p></p>
                                </div>
                                :
                                <div className={ classes.schedule }>
                                    <img src={ require('../../assets/bxh/status3.png') } />
                                    <p style={{ background: '#30354b' }}></p>
                                </div>
                            }
                            <div className={ classes.detStatus }>
                                {
                                    statusOrder===-1?
                                    <div className={ classes.dettitcont }>
                                        {
                                            orderList[0].senderChainId===128?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_heco.png')} />
                                                </span>
                                                <em>HECO</em>
                                            </div>
                                            :
                                            orderList[0].senderChainId===66?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                                                </span>
                                                <em>OKC</em>
                                            </div>
                                            :
                                            orderList[0].senderChainId===56?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_bsc.png')} />
                                                </span>
                                                <em>BSC</em>
                                            </div>
                                            :
                                            orderList[0].senderChainId===137?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_poly.png')} />
                                                </span>
                                                <em>POLYGON</em>
                                            </div>
                                            :
                                            orderList[0].senderChainId===43114?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_avax.png')} />
                                                </span>
                                                <em>AVAX</em>
                                            </div>
                                            :
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_eth.png')} />
                                                </span>
                                                <em>ETH</em>
                                            </div>
                                        }
                                        {
                                            orderList[0].payTx!==''?
                                            <div className={ classes.confides }>1/1 Confirmed</div>
                                            :
                                            <div className={ classes.confides }>0/1 Confirmed</div>
                                        }
                                    </div>
                                    :
                                    <div className={ classes.dettitcont }>
                                        {
                                            orderList[0].payChainId===128?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_heco.png')} />
                                                </span>
                                                <em>HECO</em>
                                            </div>
                                            :
                                            orderList[0].payChainId===66?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src="https://bxh-images.s3.ap-east-1.amazonaws.com/OEC/okc.jpg" />
                                                </span>
                                                <em>OKC</em>
                                            </div>
                                            :
                                            orderList[0].payChainId===56?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_bsc.png')} />
                                                </span>
                                                <em>BSC</em>
                                            </div>
                                            :
                                            orderList[0].payChainId===137?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_poly.png')} />
                                                </span>
                                                <em>POLYGON</em>
                                            </div>
                                            :
                                            orderList[0].payChainId===43114?
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_avax.png')} />
                                                </span>
                                                <em>AVAX</em>
                                            </div>
                                            :
                                            <div className={ classes.start }>
                                                <span className={ classes.startsymbol }>
                                                    <img src={require('../../assets/bxh/ico_eth.png')} />
                                                </span>
                                                <em>ETH</em>
                                            </div>
                                        }
                                        {
                                            statusOrder===2?
                                            <div className={ classes.confides }>1/1 Confirmed</div>
                                            :
                                            <div className={ classes.confides }>0/1 Confirmed</div>
                                        }
                                    </div>
                                }
                                <div className={ classes.detLine }>
                                    {
                                        statusOrder===2?
                                        <span style={{ width: '100%' }}></span>
                                        :
                                        statusOrder===-1&&orderList[0].payTx!==''?
                                        <span style={{ width: '100%' }}></span>
                                        :
                                        <span style={{ width: '0%' }}></span>
                                    }
                                </div>
                                {
                                    statusOrder===2?
                                    <div className={ classes.dettx } onClick={() => { this.addressTxHash(orderList[0].payChainId, orderList[0].payTx) }}>
                                        <span>{t('BXH.BrTransactionHash')}</span>
                                        <img src={require('../../assets/bxh/jiantou.png')} />
                                    </div>
                                    :
                                    statusOrder===-1&&orderList[0].payTx!==''?
                                    <div className={ classes.dettx } onClick={() => { this.addressTxHash(orderList[0].senderChainId, orderList[0].payTx) }}>
                                        <span>{t('BXH.BrTransactionHash')}</span>
                                        <img src={require('../../assets/bxh/jiantou.png')} />
                                    </div>
                                    :
                                    null
                                }
                                {
                                    isMobile === 1?
                                    <div className={ classes.detaddress }>
                                        {t('BXH.BrCollectionAddress')}: {addressTo}
                                    </div>
                                    :
                                    <div className={ classes.detaddress }>
                                        {t('BXH.BrCollectionAddress')}: {addressSubstr}
                                    </div>
                                }
                            </div>
                        </div>
                        
                        {/* 第四个 */}
                        <div className={ classes.start }>
                            {
                                statusOrder===2||statusOrder===-1?
                                <div className={ classes.schedule } style={{ height: '30px' }}>
                                    <img src={ require('../../assets/bxh/status1.png') } />
                                </div>
                                :
                                <div className={ classes.schedule } style={{ height: '30px' }}>
                                    <img src={ require('../../assets/bxh/status3.png') } />
                                </div>
                            }
                            <div className={ classes.detStatus }>
                                <div className={ classes.dettitcont }>
                                    <div className={ classes.start }>
                                        <em>{t('BXH.BrTransactionlete')}</em>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    timer = null;
    //定时刷新当前hash值进度（ （当前区块高度-hash值区块高度）>= 21 ）
    iTimer = (idx) => {
        const { bridgeOrderList } = this.props;
        let currentBlockkNumber = '0'
        let orderList = []
        orderList.push(bridgeOrderList.bridge_order_list[idx])
        let statusOrder = orderList[0].orderStatus
        this.timer = setInterval(() => {
            store.bridgeBlockNumber(orderList[0].senderTx,(err,info)=>{
                currentBlockkNumber = _getValueDivided3(info.currentBlock, info.blockNumber)
                if(currentBlockkNumber >= 21){
                    this.setState({ symbolBlockNumber: '21' })
                    clearInterval(this.timer);  //关闭定时器  
                }else{
                    this.setState({ symbolBlockNumber: currentBlockkNumber })
                }
            })
        }, 1000);
    }

    itemDetailsShow = (idx, obj) => {
        if(obj.errStatus === 0){
            this.setState({ detailsShow: true, detailsIdx: idx, listShow: false })
            setTimeout(this.iTimer(idx), 0); //启动定时器
        }
    }
    itemDetailsClose = () => {
        this.setState({ detailsShow: false, detailsIdx: 0, listShow: true, symbolBlockNumber: '0' })
        clearInterval(this.timer);  //关闭定时器  
    }

    addressTxHash = (chainId, txHash) => {
        if(chainId===128){
            window.open("https://hecoinfo.com/tx/"+txHash);
        }else if(chainId===66){
            window.open("https://www.oklink.com/okexchain/tx/"+txHash);
        }else if(chainId===56){
            window.open("https://bscscan.com/tx/"+txHash);
        }else if(chainId===137){
            window.open("https://polygonscan.com/tx/"+txHash);
        }else if(chainId===43114){
            window.open("https://snowtrace.io/tx/"+txHash);
        }else{
            window.open("https://cn.etherscan.com/tx/"+txHash);
        }
    }
    
}

export default withNamespaces()(withRouter(withStyles(styles)(TransactionMarket)));
