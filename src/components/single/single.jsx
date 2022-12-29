import React, { Component } from "react";
import { Tooltip } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import SingleAlert from '../singleAlert/singleAlert.jsx';
import LeftPC from '../unlock/LeftPC.jsx';
import CountUp from 'react-countup';
import { toShowDollar, _getValueAdd4,_getValuemultip1,_getValueAdd2,isNoEmpty,isEmpty,_toPrecision,_getValueMinus } from '../../config/constantFunction';
import Footer from '../unlock/Footer.jsx';
import {ClickAwayListener} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import { getStyleClass,numberDecimal,toolNumber } from '../../config/constantFunction'
 
import {
    ERROR,
    BXHCHNAGEACCOUNT,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    SINGLETOKENAPPROVE,
    SINGLETOKENAPPROVE_RETURN,
    SINGLETOKENDEPOSIT,
    SINGLETOKENDEPOSIT_RETURN,
    SINGLETOKENWITHDRAW,
    SINGLETOKENWITHDRAW_RETURN,
    SINGLETOKENWITHDRAWUNLOCK,
    SINGLETOKENWITHDRAWUNLOCK_RETURN,
    SINGLETOKENCLAIMREWARD,
    SINGLETOKENCLAIMREWARD_RETURN,
    SINGLEXTOKENAPPROVE,
    SINGLEXTOKENAPPROVE_RETURN,
    SINGLEXTOKENSTAKE,
    SINGLEXTOKENSTAKE_RETURN,
    SINGLEXTOKENWITHDRAW,
    SINGLEXTOKENWITHDRAW_RETURN,
} from '../../constants';
 
const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;
 
const styles = theme => ({
    root: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        [theme.breakpoints.up('sm')]: {
            padding: '65px 0',
            width: '1060px',
            margin: 'auto',
        },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '80px',
        padding: '0 30px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '55px',
        }
    },
    headerTitle: {
        fontWeight: 'bold', 
        fontSize: '19px', 
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '25px',
        }
    },
    headerDesc: {
        marginTop: '2px', 
        fontSize: '14px', 
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.6)',
        [theme.breakpoints.up('sm')]: {
            fontSize: '20px', 
        }
    },
    content: {
        padding: '0 15px 15px',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            padding: '0',
            marginTop: '55px',
            display: 'flex',
        }
    },
    singContent: {
        width: 'auto',
        margin: 'auto',
        padding: '0 15px 15px',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            width: '700px',
            padding: '0',
            marginTop: '55px',
            display: 'flex',
        }
    },
    bxhDaoCard: {
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px 20px',
        marginBottom: '10px',
        [theme.breakpoints.up('sm')]: {
            padding: '18px 20px 40px',
            width: '100%',
            margin: '0 10px',
            height: '300px',
        }
    },
    bxhicosimg: {
        textAlign: 'center',
        '& img': {
            width: '40px',
            height: '40px',
            borderRadius: '20px',
        },
        [theme.breakpoints.up('sm')]: {
            '& img': {
                width: '60px',
                height: '60px',
                marginTop: '20px',
            } 
        }
    },
    bxhsumzhi: {
        fontSize: '20px',
        marginTop: '6px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '30px',
            marginTop: '10px',
        }
    },
    bxhshuom: {
        marginTop: '6px',
        fontSize: '10px',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            marginTop: '20px',
        }
    },
    rewardCardBtnContentRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        }
    },
    rewardCardPledge: {
        background: '#2EBC84',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(19, 119, 80, 1)',
        },
    },
    rewardCardRecaption: {
        width: '35px',
        height: '35px',
        marginLeft: '20px',
        marginRight: '10px',
        cursor: 'pointer',
    },
    headerData: {
        fontSize: '14px',
        marginTop: '10px',
        '& span': {
            color: 'rgba(255, 255, 255, 0.6)',
            marginRight: '10px',
        },
        '& em': {
            fontStyle: 'inherit',
            color: '#FDD436',
        },
        '& i': {
            fontStyle: 'inherit',
            color: 'rgba(255, 255, 255, 0.6)',
        },
    },
    rewardportn: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
        '& span': {
            fontSize: '12px',
            opacity: '.7',
        },
        '& em': {
            fontStyle: 'inherit',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
        },
        '& img': {
            width: '15px',
            marginLeft: '5px',
            cursor: 'pointer',
        }
    },
});
 
class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: true,
            modalMortgageBack: false,
            modalMortgageBackType: '0',
            showPending: false,
            pendingType: 0,
            pendingMessage: '',
            txHash: "",
            showSingleAlert: false,
            singleAlertType: 0,//0-deposit 1-withdraw
            day: '--',
            hour: '--',
            minute: '--',
            seconds: '--',
            dayStart: '--',
            hourStart: '--',
            minuteStart: '--',
            secondsStart: '--',
            // farmsContract: '0x30c6e1a43e4A93Bab7Fd15c5b55A753342e10207',
            farmsContract: '',
            singleItem: null,
        }
    }
    tokenTypeAlert = 0;//代币质押，质押到xtoken
    countdownTimer = null;
    createTimer = (singleItem=this.state.singleItem)=>{
        this.invateTimer();
        const that = this;
        this.countdownTimer = setInterval(()=>{
            let totalSeconds = (singleItem.userInfo.seconds)--;
            let totalSecondsStart = (singleItem.userInfo.secondsStart)--;
            if (isNoEmpty(totalSeconds)) {
                if(totalSeconds>=1){
                    singleItem.userInfo.seconds = totalSeconds;
                    let day = Math.floor((totalSeconds / 3600) / 24);
                    let hour = Math.floor((totalSeconds / 3600) % 24);
                    let minute = Math.floor((totalSeconds / 60) % 60);
                    let seconds = Math.floor(totalSeconds % 60);
                    that.setState({
                        singleItem: singleItem,
                        day: day,
                        hour: hour < 10 ? "0" + hour : hour,
                        minute: minute < 10 ? "0" + minute : minute,
                        seconds: seconds < 10 ? "0" + seconds : seconds
                    });
                }else{
                    if (that.countdownTimer != null) {
                        clearInterval(that.countdownTimer);
                    }
                    that.setState({
                        day: '0',
                        hour: '00',
                        minute: '00',
                        seconds: '00'
                    });
                }
            }

            if (isNoEmpty(totalSecondsStart)) {
                if(totalSecondsStart>=1){
                    singleItem.userInfo.seconds = totalSecondsStart;
                    let dayStart = Math.floor((totalSecondsStart / 3600) / 24);
                    let hourStart = Math.floor((totalSecondsStart / 3600) % 24);
                    let minuteStart = Math.floor((totalSecondsStart / 60) % 60);
                    let secondsStart = Math.floor(totalSecondsStart % 60);
                    that.setState({
                        singleItem: singleItem,
                        dayStart: dayStart,
                        hourStart: hourStart < 10 ? "0" + hourStart : hourStart,
                        minuteStart: minuteStart < 10 ? "0" + minuteStart : minuteStart,
                        secondsStart: secondsStart < 10 ? "0" + secondsStart : secondsStart
                    });
                }else{
                    if (that.countdownTimer != null) {
                        clearInterval(that.countdownTimer);
                    }
                    that.setState({
                        dayStart: '0',
                        hourStart: '00',
                        minuteStart: '00',
                        secondsStart: '00'
                    });
                }
            }
        }, 1000);
    }
    invateTimer = () => {
        if (this.countdownTimer != null) {
            clearInterval(this.countdownTimer);
        }
    }

    // 组件加载完毕 启动定时器
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()

        emitter.on(BXHCHNAGEACCOUNT, this.refreshAccount) //切换账户
        emitter.on(ERROR,this.errorReturn)
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.on(SINGLETOKENAPPROVE_RETURN, this.approveReturn);
        emitter.on(SINGLETOKENDEPOSIT_RETURN, this.txDataReturn);
        emitter.on(SINGLETOKENWITHDRAW_RETURN, this.txDataReturn);
        emitter.on(SINGLETOKENWITHDRAWUNLOCK_RETURN, this.txDataReturn);
        emitter.on(SINGLETOKENCLAIMREWARD_RETURN, this.txDataReturn);
        emitter.on(SINGLEXTOKENAPPROVE_RETURN, this.approveReturn);
        emitter.on(SINGLEXTOKENSTAKE_RETURN, this.txDataReturn);
        emitter.on(SINGLEXTOKENWITHDRAW_RETURN, this.txDataReturn);
        this.refreshAccount();

        const { ethereum } = window;
        if(ethereum){
            ethereum.on('accountsChanged', this.handleAccountsChanged);
            // 钱包切换时，实时切换页面链
            ethereum.on("chainChanged", this.handleAccountsChanged);
        }
    }
    componentWillUnmount() {
        emitter.removeListener(BXHCHNAGEACCOUNT, this.refreshAccount) //切换账户
        emitter.removeListener(ERROR, this.errorReturn);  // 取消合约提示
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.removeListener(SINGLETOKENAPPROVE_RETURN, this.approveReturn);
        emitter.removeListener(SINGLETOKENDEPOSIT_RETURN, this.txDataReturn);
        emitter.removeListener(SINGLETOKENWITHDRAW_RETURN, this.txDataReturn);
        emitter.removeListener(SINGLETOKENWITHDRAWUNLOCK_RETURN, this.txDataReturn);
        emitter.removeListener(SINGLETOKENCLAIMREWARD_RETURN, this.txDataReturn);
        emitter.removeListener(SINGLEXTOKENAPPROVE_RETURN, this.approveReturn);
        emitter.removeListener(SINGLEXTOKENSTAKE_RETURN, this.txDataReturn);
        emitter.removeListener(SINGLEXTOKENWITHDRAW_RETURN, this.txDataReturn);
        this.invateTimer();
        window.addEventListener('resize', this.handleResize)
        this.setState = (state, callback) => {
            return;
        }
    }
    handleAccountsChanged = () => {
        this.props.history.push('/liquidity')
    }
    refreshAccount = () => {
        this.requestFarmsInfo();
    }
    requestFarmsInfo = ()=>{
        const {farmsContract} = this.state;
        const {id} = this.props.match.params;
        store._getFarmsPoolItem(id,data=>{
            let singleItem = data.pool;
            // console.log('1111singleItem====>', singleItem)
            store._getSingleInfo(singleItem.contractAddress,singleItem.exId,(err,info)=>{
                if(isEmpty(err)){
                    singleItem.userInfo = info;
                    let lpTokenAmount = info.lpTokenAmount;
                    let lpTokenDecimals = info.lpTokenDecimals;
                    let lpTokenActualAmount = lpTokenAmount;
                    let lockAmount = info.lockAmount;
                    lpTokenActualAmount = _toPrecision(_getValueMinus(lpTokenAmount,lockAmount,lpTokenDecimals));
                    singleItem.userInfo.lpTokenActualAmount = lpTokenActualAmount;
                    let tempItem = Object.assign({},singleItem);
                    // console.log('aaa====>', tempItem)
                    // console.log('bbb====>', tempItem.contractAddress)
                    this.setState({
                        singleItem:tempItem, 
                        farmsContract:tempItem.contractAddress,
                    });
                    this.refreshApprove(tempItem);
                    this.createTimer(tempItem);
                }
            });
        });
    }
    refreshApprove = (singleItem=this.state.singleItem)=>{
        const {farmsContract} = this.state;
        if(isNoEmpty(farmsContract)){
            store._getApprove(singleItem.pairToken,farmsContract,(err,allowance)=>{
                if(isEmpty(err)){
                    singleItem.lpAllowance = allowance;
                    this.setState({singleItem:singleItem});
                }
            });
            if(singleItem.userInfo.lpTokenType==1){
                store._getApprove(singleItem.userInfo.lpTokenFrom,singleItem.userInfo.lpToken,(err,allowance)=>{
                    if(isEmpty(err)){
                        singleItem.lpTokenFromAllowance = allowance;
                        this.setState({singleItem:singleItem});
                    }
                });
            }
        }
    }
    errorReturn = ()=>{
        this.setState({showPending:false})
        this.setState({showPending:true,pendingType:-1})
    }
    approve = ()=>{
        const {farmsContract,singleItem} = this.state;
        if(isNoEmpty(farmsContract)){
            const msgContent = `Approve ${singleItem.token0}`;
            this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
            dispatcher.dispatch({
                type:SINGLETOKENAPPROVE,
                content:{
                    senderToken:singleItem.pairToken,
                    contractAddress:farmsContract,
                    msgContent:msgContent,
                },
            });
        }
    }
    approveXToken = ()=>{
        const {singleItem} = this.state;
        if(isNoEmpty(singleItem.userInfo)){
            const msgContent = `Approve ${singleItem.userInfo.lpTokenFromSymbol}`;
            this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
            dispatcher.dispatch({
                type:SINGLEXTOKENAPPROVE,
                content:{
                    senderToken:singleItem.userInfo.lpTokenFrom,
                    contractAddress:singleItem.userInfo.lpToken,
                    msgContent:msgContent,
                },
            });
        }
    }
    approveReturn = (data)=>{
        this.setState({showPending:false})
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    showPending: true,
                    pendingType: 1,
                })
            }else{
                this.refreshApprove();
            }
        }
    }
    showSingleDepositAlert = ()=>{
        this.tokenTypeAlert = 0;
        this.setState({
            singleAlertType:0,
            showSingleAlert:true,
        });
    }
    showSingleWithdrawAlert = ()=>{
        this.tokenTypeAlert = 0;
        this.setState({
            singleAlertType:1,
            showSingleAlert:true,
        });
    }
    showSingleXTokenStakeAlert = ()=>{
        this.tokenTypeAlert = 1;
        this.setState({
            singleAlertType:0,
            showSingleAlert:true,
        });
    }
    showSingleXTokenWithdrawAlert = ()=>{
        this.tokenTypeAlert = 1;
        this.setState({
            singleAlertType:1,
            showSingleAlert:true,
        });
    }
    sureDepositWithdraw = (amount)=>{
        const {singleAlertType,farmsContract,singleItem} = this.state;
        this.setState({showSingleAlert:false});
        if(isNoEmpty(farmsContract)){
            if(singleAlertType==0){
                let type = SINGLETOKENDEPOSIT;
                let contractAddress = farmsContract;
                let tokenAddress = singleItem.pairToken;
                let symbol = singleItem.token0;
                if(this.tokenTypeAlert==1){
                    type = SINGLEXTOKENSTAKE;
                    contractAddress = singleItem.pairToken;
                    tokenAddress = singleItem.userInfo.lpTokenFrom;
                    symbol = singleItem.userInfo.lpTokenFromSymbol;
                }
                const msgContent = `Deposit ${amount} ${symbol}`;
                this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
                dispatcher.dispatch({
                    type:type,
                    content:{
                        contractAddress:contractAddress,
                        tokenAddress:tokenAddress,
                        pid:singleItem.exId,
                        amount:amount,
                        msgContent:msgContent,
                    }
                })
            }else{
                let type = SINGLETOKENWITHDRAW;
                let contractAddress = farmsContract;
                let tokenAddress = singleItem.pairToken;
                let symbol = singleItem.token0;
                if(this.tokenTypeAlert==1){
                    type = SINGLEXTOKENWITHDRAW;
                    contractAddress = singleItem.pairToken;
                    tokenAddress = singleItem.userInfo.lpTokenFrom;
                    symbol = singleItem.userInfo.lpTokenFromSymbol;
                }
                const msgContent = `UnStake ${amount} ${symbol}`;
                this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
                dispatcher.dispatch({
                    type:type,
                    content:{
                        contractAddress:contractAddress,
                        tokenAddress:tokenAddress,
                        pid:singleItem.exId,
                        amount:amount,
                        msgContent:msgContent,
                    }
                })
            }
        }
    }
    unlockWithdraw = ()=>{
        const {farmsContract,singleItem} = this.state;
        this.setState({showSingleAlert:false});
        if(isNoEmpty(farmsContract)&&isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)&&singleItem.userInfo.pendingUnlock>0){
            let tokenAddress = singleItem.pairToken;
            let symbol = singleItem.token0;
            const msgContent = `UnStake ${singleItem.userInfo.pendingUnlock} ${symbol}`;
            this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
            dispatcher.dispatch({
                type:SINGLETOKENWITHDRAWUNLOCK,
                content:{
                    contractAddress:farmsContract,
                    tokenAddress:tokenAddress,
                    pid:singleItem.exId,
                    msgContent:msgContent,
                }
            })
        }
    }
    txDataReturn = (data)=>{
        this.setState({showPending:false})
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    showPending: true,
                    pendingType: 1,
                })
            }else{
                this.refreshSingleInfo();
            }
        }
    }
    claimReward = ()=>{
        const {farmsContract,singleItem} = this.state;
        if(isNoEmpty(farmsContract)&&isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)&&singleItem.userInfo.rewardAmount>0){
            const msgContent = 'Withdrawal Reward';
            this.setState({showPending:true,pendingType:0,pendingMessage:msgContent});
            dispatcher.dispatch({
                type:SINGLETOKENCLAIMREWARD,
                content:{
                    contractAddress:farmsContract,
                    tokenAddress:singleItem.pairToken,
                    pid:singleItem.exId,
                    msgContent:msgContent,
                },
            });
        }
    }
    
    handleResize = () => {
        if (this._isMobile()) { // 移动端
            this.setState({ isMobile: true })
        } else {  // PC端
            this.setState({ isMobile: false })
        }
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
 
    render() {
        const { classes, t } = this.props;
        const { isMobile, showSingleAlert, showPending } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        let singleStatus = 2

        return (
            <div style={{ width: '100%' }}>   
                <div className={getStyleClass('PCbroot',classes.root)}>
                    <Header openUnlockModal={this.openUnlockModal} pagetype="liquidity" />

                    {this.renderHeader()}
                    {
                        // 判断是显示2个还是3个
                        singleStatus === 1?
                        <div className={classes.content}>
                           {/* 领取 */}
                           {this.renderReceive()}
                           {/* 质押 */}
                           {this.renderPledge()}
                           {/* 存入 */}
                           {this.renderDeposit()}
                        </div>
                        :
                        <div className={classes.singContent}>
                           {/* 领取 */}
                           {this.renderReceive()}
                           {/* 质押 */}
                           {this.renderSingle()}
                        </div>
                    }
                    
                    { showSingleAlert && this.renderMortgageBack()}
                    { showPending && this.renderSendModal()}
                </div>
                {
                    !isMobile ?
                    <Footer />
                    :
                    null
                }
            </div>
        )
    };
    renderHeader = () => {
        const { classes, t } = this.props;
        const { singleItem,day,hour,minute,seconds,dayStart,hourStart,minuteStart,secondsStart } = this.state;
        let symbol = '--';
        let rewardSymbol = '--';
        let lpTokenType = 0;
        // console.log('singleItem===>', singleItem)
        if(isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)){
            if(singleItem.userInfo.lpTokenType==1){
                symbol = singleItem.userInfo.lpTokenFromSymbol;
            }else{
                symbol = singleItem.token0;
            }
            rewardSymbol = singleItem.userInfo.rewardSymbol;
            lpTokenType = singleItem.userInfo.lpTokenType;
        }
        let timeDate = Date.parse(new Date())/1000
        return (
            <div className={classes.header}>
                <div className={classes.headerTitle}>
                    {isNoEmpty(singleItem)?singleItem.token0:'--'} Pool
                </div>
                {
                    lpTokenType==1?
                    <div className={classes.headerDesc}>
                        {t('BXH.shoudaocunru')} {symbol} {t('BXH.twget')} {isNoEmpty(singleItem)?singleItem.token0:'--'},{t('BXH.pledge')} {isNoEmpty(singleItem)?singleItem.token0:'--'} {t('DFKII.earn')} {rewardSymbol}
                    </div>
                    :
                    <div className={classes.headerDesc}>
                        {t('BXH.shoudaocunru')} {symbol} {t('DFKII.earn')} {rewardSymbol}
                    </div>
                }
                {
                    isNoEmpty(singleItem)?
                    <div>
                        {
                            // 挖礦已結束
                            timeDate > singleItem.userInfo.timeEnd ?
                            <div className={classes.headerData}>
                                <span>{t('BXH.FarmTimeMining')}</span>
                            </div>
                            :
                            // 距離挖礦結束
                            timeDate < singleItem.userInfo.timeEnd && timeDate > singleItem.userInfo.timeStart ?
                            <div className={classes.headerData}>
                                <span>{t('BXH.FarmTimeUntil')}</span>
                                <em>
                                    {day} <i>{t('BXH.FarmDay')}</i> {hour} <i>{t('BXH.FarmTime')}</i> {minute} <i>{t('BXH.FarmBranch')}</i> {seconds} <i>{t('BXH.FarmSecond')}</i>
                                </em>
                            </div>
                            :
                            // 距離開始還剩餘
                            <div className={classes.headerData}>
                                <span>{t('BXH.FarmTimeBeginning')}</span>
                                <em>
                                    {dayStart} <i>{t('BXH.FarmDay')}</i> {hourStart} <i>{t('BXH.FarmTime')}</i> {minuteStart} <i>{t('BXH.FarmBranch')}</i> {secondsStart} <i>{t('BXH.FarmSecond')}</i>
                                </em>
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>
        )
    }

    // 存入
    renderDeposit() {
        const { classes, t } = this.props;
        const { singleItem } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        let symbol = '';
        let balance = '--';
        let allowance = '0';
        if(isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)){
            symbol = singleItem.userInfo.lpTokenFromSymbol;
            balance = singleItem.userInfo.lpTokenBalance;
            allowance = singleItem.lpTokenFromAllowance;
        }
        return (
            <div className={getStyleClass('PCTDaoCard',classes.bxhDaoCard)}>
                <div className={classes.bxhicosimg}>
                    <img src={isNoEmpty(symbol)?`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${symbol}.png`:''} />
                </div>
                <div className={classes.bxhsumzhi}>
                    {balance}
                </div>
                <div className={classes.bxhshuom}>
                    Deposit {isNoEmpty(symbol)?symbol:'--'} harvest {isNoEmpty(singleItem)?singleItem.token0:'--'}
                </div>
                {
                    allowance > 0 ?
                    // 已授权
                    <div className={classes.rewardCardBtnContentRow}>
                        <div onClick={() => { this.showSingleXTokenStakeAlert()} } className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>{t('BXH.shoudaocunru')}</div>
                        {
                            chainID === '56' ?
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                            :
                            chainID === '66' ?
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption2.png')} alt='' />
                            :
                            chainID === '1' ?
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption3.png')} alt='' />
                            :
                            chainID === '137' ?
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption4.png')} alt='' />
                            :
                            chainID === '43114' ?
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption5.png')} alt='' />
                            :
                            <img onClick={() => { this.showSingleXTokenWithdrawAlert() }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                        }
                    </div>     
                    :
                    // 未授权
                    <div className={classes.rewardCardBtnContentRow} onClick={() => { this.approveXToken() }} >
                        <div className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>Approve</div>
                    </div>
                }
            </div>
        )
    }

    // 质押
    renderPledge() {
        const { classes, t } = this.props;
        const { singleItem } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        let allowance = isNoEmpty(singleItem)?singleItem.lpAllowance:'0';
        let symbol = '';
        let lpTokenAmount = '';
        if(isNoEmpty(singleItem)){
            symbol = singleItem.token0;
            if(isNoEmpty(singleItem.userInfo)){
                lpTokenAmount = singleItem.userInfo.lpTokenActualAmount;
            }
        }
        return (
            <div className={getStyleClass('PCTDaoCard',classes.bxhDaoCard)} style={{height: 'auto'}}>
                <div className={classes.bxhicosimg}>
                    <img src={isNoEmpty(symbol)?`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${symbol}.png`:''} />
                </div>
                <div className={classes.bxhsumzhi}>
                    {lpTokenAmount}
                </div>
                <div className={classes.bxhshuom}>
                    {symbol} Tokens Staked
                </div>
                <div>
                    <div>
                        {
                            allowance > 0 ?
                            // 已授权
                            <div className={classes.rewardCardBtnContentRow}>
                                <div onClick={() => { this.showSingleDepositAlert() }} className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>{t('BXH.pledge')}</div>
                                {
                                    chainID === '56' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                                    :
                                    chainID === '66' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption2.png')} alt='' />
                                    :
                                    chainID === '1' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption3.png')} alt='' />
                                    :
                                    chainID === '137' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption4.png')} alt='' />
                                    :
                                    chainID === '43114' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption5.png')} alt='' />
                                    :
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                                }
                            </div> 
                            :
                            // 未授权
                            <div className={classes.rewardCardBtnContentRow} onClick={() => { this.approve() }} >
                                <div className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>Approve</div>
                            </div>
                        }
                    </div>
                    {/* 锁仓 */}
                    {this.renderLock()}
                </div>
            </div>
        )
    }

    // 质押
    renderSingle() {
        const { classes, t } = this.props;
        const { singleItem } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        let allowance = isNoEmpty(singleItem)?singleItem.lpAllowance:'0';
        let symbol = '';
        let lpTokenAmount = '--';
        if(isNoEmpty(singleItem)){
            symbol = singleItem.token0;
            if(isNoEmpty(singleItem.userInfo)){
                lpTokenAmount = singleItem.userInfo.lpTokenActualAmount;
            }
        }
        // console.log('loop==>', singleItem)
        return (
            <div className={getStyleClass('PCTDaoCard',classes.bxhDaoCard)} style={{height: 'auto'}}>
                <div className={classes.bxhicosimg}>
                    <img src={isNoEmpty(symbol)?`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${symbol}.png`:require('../../assets/bxh/BXHtong.png')} />
                </div>
                <div className={classes.bxhsumzhi}>
                    {lpTokenAmount}
                </div>
                <div className={classes.bxhshuom}>
                    {isNoEmpty(symbol)?symbol:'--'} Tokens Staked
                </div>
                <div>
                    <div>
                        {
                            allowance > 0 ?
                            // 已授权
                            <div className={classes.rewardCardBtnContentRow}>
                                <div onClick={() => { this.showSingleDepositAlert() }} className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>{t('BXH.pledge')}</div>
                                {
                                    chainID === '56' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                                    :
                                    chainID === '66' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption2.png')} alt='' />
                                    :
                                    chainID === '1' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption3.png')} alt='' />
                                    :
                                    chainID === '137' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption4.png')} alt='' />
                                    :
                                    chainID === '43114' ?
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption5.png')} alt='' />
                                    :
                                    <img onClick={() => { this.showSingleWithdrawAlert() }}  className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                                }
                            </div> 
                            :
                            // 未授权
                            <div className={classes.rewardCardBtnContentRow} onClick={() => { this.approve() }} >
                                <div className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>Approve</div>
                            </div>
                        }
                    </div>
                    {/* 锁仓 */}
                    {
                        singleItem&&singleItem.lockedSeconds!==0?
                        this.renderLock()
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    renderLock = () => {
        const { classes, t, i18n } = this.props;
        let chainID = localStorage.getItem('chainIDSwitch')
        const { singleItem } = this.state;
        let symbol = '--';
        if(isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)){
            if(singleItem.userInfo.lpTokenType==1){
                symbol = singleItem.userInfo.lpTokenFromSymbol;
            }else{
                symbol = singleItem.token0;
            }
        }
        return (
            <div>
                <div className={classes.rewardportn}>
                    <span>
                        {t('BXH.Period')}({symbol})
                        {
                            i18n.language==='en'?
                            <Tooltip overlayClassName="global_tooltip" title={`Each withdrawal will be locked up for 7 days} ，Normal earnings during the period.`}>
                                <img src={require('../../assets/yiwen.png')}/>
                            </Tooltip>
                            :
                            <Tooltip overlayClassName="global_tooltip" title={`每比提取将經歷${7+'天'+0+'時'+0+'分'+0+'秒'}冷靜期，期間收益正常`}>
                                <img src={require('../../assets/yiwen.png')}/>
                            </Tooltip>
                        }
                    </span>
                    <em>0</em>
                </div>
                <div className={classes.rewardportn}>
                    <span>{t('BXH.Extractable')}({symbol})</span>
                    <em>0</em>
                </div>
                <div className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)} style={{marginTop:'15px'}}>{t('Insure.ClaimInsurance')}</div>
            </div>
        )
    }

    // 领取
    renderReceive() {
        const { classes, t } = this.props;
        const { singleItem } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        let rewardSymbol = isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)?singleItem.userInfo.rewardSymbol:'';
        let enableBtn = isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)&&singleItem.userInfo.rewardAmount>0?0:1;
        return (
            <div className={getStyleClass('PCTDaoCard',classes.bxhDaoCard)}>
                <div className={classes.bxhicosimg}>
                    <img src={isNoEmpty(rewardSymbol)?`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${rewardSymbol}.png`:require('../../assets/bxh/BXHtong.png')} />
                </div>
                <div className={classes.bxhsumzhi}>
                    {isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)?singleItem.userInfo.rewardAmount:'--'}
                </div>
                <div className={classes.bxhshuom}>Deposit Tokens Earned {isNoEmpty(rewardSymbol)?rewardSymbol:'--'}</div>
                <div className={classes.rewardCardBtnContentRow} style={{filter:`grayscale(${enableBtn})`}} onClick={() => { this.claimReward() }}>
                    <div className={getStyleClass('PC_new_btn1',classes.rewardCardPledge)}>{t('BXH.claim')}</div>
                </div>
            </div>
        )
    }

    renderMortgageBack = () => {
        const { singleAlertType,singleItem } = this.state
        let balance = '';
        let symbol = isNoEmpty(singleItem)?singleItem.token0:'';
        if(isNoEmpty(singleItem)&&isNoEmpty(singleItem.userInfo)){
            balance = singleAlertType==0?singleItem.userInfo.lpTokenBalance:singleItem.userInfo.lpTokenActualAmount;
        }
        if(this.tokenTypeAlert==1) {
            balance = singleAlertType==0?singleItem.userInfo.lpTokenFromBalance:singleItem.userInfo.lpTokenBalance;
            symbol = singleItem.userInfo.lpTokenFromSymbol;
        }
        // console.log('balance===>', balance)
        return (
            <SingleAlert type={this.tokenTypeAlert==1&&singleAlertType==0?2:singleAlertType} balance={balance} symbol={symbol} onSure={this.sureDepositWithdraw} onClose={()=>{this.setState({showSingleAlert:false})}}/>
        )
    }
    renderSendModal = () => {
        const { pendingType, pendingMessage, txHash } = this.state
        return (
            <SendDialog onClose={this.onCloseSend} type={pendingType} symbolContent={pendingMessage} txHash={txHash} />
        )
    }
    onCloseSend = () => {
        this.setState({ showPending: false })
    }

}
 
export default withNamespaces()(withRouter(withStyles(styles)(Single)));