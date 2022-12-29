import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import Footer from '../unlock/Footer.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import SendDialog from '../sendDialog/sendDialog'
import LoanDeposit from './deposit/LoanDeposit.jsx';
import Store from "../../stores";
import { getModuleData } from '../../constants/api'
import { client } from '../../constants/apollo/client'
import { AccountCTokens,Market } from '../../constants/apollo/queries'

import DepositLogo from '../../assets/bxh/loan/deposit.png';
import LoanLogo from '../../assets/bxh/loan/loan.png';
import RewardBgLogo from '../../assets/bxh/loan/reward_bg.png';
import BXHLogo from '../../assets/bxh/loan/bxh.png';

import LoanMarket from './LoanMarket';
import LoanUsageRate from './LoanUsageRate'

import { SaveToTwoWei,_getValueAdd,_getValueMinus4,_getValuemultip,_getValueDivided,isNoEmpty,getStyleClass, isEmpty } from '../../config/constantFunction'

import {
    CONFIGURE_RETURNED,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    BXHCHNAGEACCOUNT,
    ERROR,
    BXHLoanClaim_RETURN,
} from '../../constants'

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

const styles = theme => ({
    root: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        paddingBottom: '20px',
        [theme.breakpoints.up('sm')]: {
            margin: 'auto',
            maxWidth: '1060px',
            paddingTop: '65px',
        }
    },
    content: {
        padding: '0 15px 15px',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '55px',
            minWidth: '1000px',
        }
    },
    title: {
        fontSize: '32px',
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            marginBottom: '30px',
        }
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        '& :first-child': {
            marginLeft: '0',
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    reward: {
        position: 'relative',
        display: 'flex',
        padding: '10px 15px',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#20233C',
        borderRadius: '12px',
    },
    rewardLeft: {
        display: 'flex',
        flexDirection: 'column',
        '& div': {
            fontSize: '13px',
            fontWeight: '500',
            opacity: '0.4',
        },
        '& label': {
            marginTop: '2px',
            fontSize: '13px',
            '& b': {
               fontSize: '19px',
               fontWeight: 'bold',
               marginRight: '2px', 
            },
        }
    },
    rewardClaim: {
        position: 'absolute',
        right: '20px',
        cursor: 'pointer',
        background: 'linear-gradient(to right, #2EBC84, #35C288)',
        width: '85px',
        height: '30px',
        fontSize: '13px',
        fontWeight: 'bold',
        borderRadius: '15px',
        textAlign: 'center',
        lineHeight: '30px',
        [theme.breakpoints.up('sm')]: {
            width: '55px',
            height: '32px',
            borderRadius: '4px',
        }
    },
    rewardBg: {
        position: 'absolute',
        top: '0',
        right: '0',
    },
    lendingDeposit: {
        display: 'flex',
        marginTop: '15px',
        justifyContent: 'space-between',
        '& :first-child': {
            marginLeft: '0',
        },
    },
    lendingDepositItem: {
        position: 'relative',
        marginLeft: '10px',
        display: 'flex',
        alignItems: 'center',
        background: '#20233C',
        borderRadius: '12px',
        width: '100%',
        padding: '10px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '20px',
            borderRadius: '6px',
            border: '1px solid #2B2F50',
            padding: '15px',
        }
    },
    lendingDepositItemImg: {
        width: '32px',
        height: '32px',
    },
    lendingDepositItemVal: {
        marginLeft: '5px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '11px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: '1',
        '& label': {
            color: '#FFF',
            fontSize: '15px',
            fontWeight: 'bold',
            [theme.breakpoints.up('sm')]: {
                fontSize: '17px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '10px',
            fontSize: '13px',
        }
    },
    lendingDepositItemValReward: {
        marginLeft: '5px',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '11px',
        flex: '1',
        '& label': {
            marginTop: '2px',
            color: '#FFF',
            fontSize: '15px',
            fontWeight: 'bold',
            [theme.breakpoints.up('sm')]: {
                fontSize: '17px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '10px',
            fontSize: '13px',
        }
    },
});

class Loan extends Component {
    state = {
        address: null,
        modalUnlock: false,
        isMobile: true,
        totalDeposit: null,//总存款
        totalBorrow: null,//总贷款
        totalDepositVal: null,//总抵押价值
        highestCanBorrowUsd: null,//最高可借usd
        moduleConfig: [],
        comptrollerAddress: null,//用户收益
        priceOracle: null,//价格预言机
        modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
        modalSend: false,
        msgContent: "",
        txHash: "",
        userReward: null,
        bxhInfo: {},
        sumDeposit: '',//总存款
        sumBorrow: '',//总借款
    }
    timer = null;
    bxhTimer = null;
    componentDidMount() {
        emitter.on(CONFIGURE_RETURNED, this.configureReturned);
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.on(BXHCHNAGEACCOUNT, this.refreshData);
        emitter.on(ERROR, this.errorReturned)
        emitter.on(BXHLoanClaim_RETURN, this.userRewardClaimReturn)
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.refreshData();
        this.refreshAccount();
        this.bxhTimer = setInterval(() => {
            this.loadBxhInfoData()
        }, 20000);
        this.timer = setInterval(() => {
            this.refreshAccount(true);
        }, 10000);
        this.loadBxhInfoData();
    }
    componentWillUnmount() {
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.removeListener(BXHCHNAGEACCOUNT, this.refreshData);
        emitter.removeListener(ERROR, this.errorReturned)
        emitter.removeListener(BXHLoanClaim_RETURN, this.userRewardClaimReturn)
        window.addEventListener('resize', this.handleResize)
        clearInterval(this.bxhTimer)
        clearInterval(this.timer)
    }
    configureReturned = () => {
        let chainID = localStorage.getItem('chainIDSwitch')
        if(chainID !== 56 && chainID !== '56'){
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            this.props.history.push('/')
        }
    }
    loadBxhInfoData = () => {
        store._getBXHInfo((data) => {
            this.setState({ bxhInfo: data.bxh_info });
        })
    }
    //刷新账户相关信息
    refreshAccount = (isLoad=false) => {
        const account = store.getStore('account');
        const address = account.address;
        if (isNoEmpty(address)) {
            this.setState({ address: address });
            if(isLoad){
                this.loadData();
            }
        } else {
            this.setState({ address: null });
        }
    }
    //刷新数据
    refreshData = () => {
        this.setState({
            totalDeposit: null,
            totalBorrow: null,
            userReward: null,
            moduleConfig: [],
        })
        getModuleData((data)=>{
            let loanModule = data.module[0];
            for(let i=0;i<data.module.length;i++){
                if(data.module[i].moduleId==1){
                    loanModule = data.module[i];
                    break;
                }
            }
            const moduleConfig = data.moduleConfig.filter((obj)=>obj.moduleId==1)
            this.setState({
                moduleConfig:moduleConfig,
                comptrollerAddress:loanModule.param1,
                priceOracle:loanModule.param2,
            })
            this.refreshAccount(true);
        })
    }
    loadData = () => { 
        this.getUserReward()
        this.getLoanCompSpeeds()
        this.getUserInfo()
        this.loadTokenInfo()
        this.getMarkets()
    }
    //获取币种信息
    loadTokenInfo = () => {
        const { moduleConfig,priceOracle } = this.state
        let total = 0;
        let sumDeposit = 0;//总存款
        let sumBorrow = 0;//总借款
        for(let i=0,count=moduleConfig.length;i<count;i++){
            let obj = moduleConfig[i];
            store._getLoanTokenInfo(obj.param3,obj.param1,priceOracle,(err,info)=>{
                if(err==null){
                    obj.balance = info.balance;
                    obj.price = info.price;
                    obj.amount = info.amount;
                    obj.allowance = info.allowance;
                    obj.balanceStored = info.balanceStored;
                }
                total += 1;
                 //总存款
                let depositTotal = _getValuemultip(obj.market.totalSupply, obj.market.exchangeRate)
                let depositPrice = _getValuemultip(depositTotal, obj.price) * 1
                sumDeposit += depositPrice;
                //总借款
                let borrowPrice = _getValuemultip(obj.market.totalBorrows, obj.price) * 1
                sumBorrow += borrowPrice
                if(total===count){//查询完成
                    this.setState({
                        moduleConfig:[...moduleConfig],
                        sumDeposit: sumDeposit ? sumDeposit : '',
                        sumBorrow: sumBorrow ? sumBorrow : '',
                    })
                    this.sumTotalDepositBorrow();
                }
            })
        };
    }
    errorReturned = (error) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: -1 })
    };
    //获取用户存贷总量信息
    getUserInfo = async () => {
        const { address,moduleConfig } = this.state;
        try {
            for(let i=0,count=moduleConfig.length;i<count;i++){
                const obj = moduleConfig[i];
                const result = await client.query({
                    query: AccountCTokens(address,obj.param2),
                    fetchPolicy: 'network-only',
                })
                obj.accountCTokens = result.data.accountCTokens;
            }
            this.setState({
                moduleConfig:[...moduleConfig],
            })
            this.sumTotalDepositBorrow();
        } catch (error) {
            console.log('error',error);
        }
    }
    //获取抵押率相关信息
    getMarkets = async () => {
        const { moduleConfig } = this.state;
        try {
            const result = await client.query({
                query: Market(),
                fetchPolicy: 'network-only',
            })
            const markets = result.data.markets;
            if(markets&&markets.length>0){
                for (let i = 0; i < moduleConfig.length; i++) {
                    const obj = moduleConfig[i];
                    for (let j = 0; j < markets.length; j++) {
                        const market = markets[j];
                        if(market.symbol===('b'+obj.param2)) {
                            obj.market = market;
                            break;
                        }
                    }
                }
                this.setState({
                    moduleConfig:[...moduleConfig],
                })
                this.sumTotalDepositBorrow();
            }
        } catch (error) {
            console.log('error',error);
        }
    }
    //计算总存款和总借款
    sumTotalDepositBorrow = () => {
        const { moduleConfig } = this.state;
        let allTotalUnderlyingSupplied = 0;
        let allTotalUnderlyingBorrowed = 0;
        for(let i=0,count=moduleConfig.length;i<count;i++){
            const obj = moduleConfig[i];
            if(obj.accountCTokens&&obj.accountCTokens.length>0&&obj.market&&isNoEmpty(obj.market.exchangeRate)&&isNoEmpty(obj.price)&&obj.price>0){
                const actualSupplied = _getValuemultip(obj.accountCTokens[0].cTokenBalance,obj.market.exchangeRate,6);
                const actualBorrowed = obj.balanceStored;
                allTotalUnderlyingSupplied = _getValueAdd(allTotalUnderlyingSupplied,_getValuemultip(actualSupplied,obj.price,6));
                allTotalUnderlyingBorrowed = _getValueAdd(allTotalUnderlyingBorrowed,_getValuemultip(actualBorrowed,obj.price,6));
            }
        }
        if(allTotalUnderlyingSupplied>0||allTotalUnderlyingBorrowed>0){
            this.setState({
                totalDeposit: allTotalUnderlyingSupplied,
                totalBorrow: allTotalUnderlyingBorrowed,
            })
        }
        this.sumHighestCanBorrow();
    }
    //最高可借
    sumHighestCanBorrow = () => {
        const { moduleConfig } = this.state;
        let highestCanBorrowUsd = 0;
        let totalDepositVal = 0;
        const safetyCanBorrow = 0.85;//最高可借安全系数
        for (let i = 0; i < moduleConfig.length; i++) {
            const obj = moduleConfig[i];
            if(obj.accountCTokens&&obj.accountCTokens.length>0&&obj.market&&isNoEmpty(obj.market.collateralFactor)&&isNoEmpty(obj.market.exchangeRate)&&isNoEmpty(obj.market.underlyingPriceUSD)&&isNoEmpty(obj.price)&&obj.accountCTokens&&obj.accountCTokens.length>0){
                if(obj.accountCTokens[0].enteredMarket==true){
                    const actualSupplied = _getValuemultip(obj.accountCTokens[0].cTokenBalance,obj.market.exchangeRate,6);
                    const actualBorrowed = obj.balanceStored;
                    const depositVal = _getValuemultip(_getValuemultip(actualSupplied,obj.market.collateralFactor,18),obj.price,18);
                    totalDepositVal = _getValueAdd(totalDepositVal,depositVal);
                    const temp1 = _getValuemultip(_getValuemultip(actualSupplied,obj.market.collateralFactor,18),safetyCanBorrow,18)
                    const canBorrowed = _getValueMinus4(temp1,actualBorrowed,18);//可借
                    const canBorrowedDepositVal = _getValuemultip(canBorrowed,obj.price,18);
                    highestCanBorrowUsd = _getValueAdd(highestCanBorrowUsd,canBorrowedDepositVal,18);
                }
            }
        }
        if(highestCanBorrowUsd>0||totalDepositVal>0){
            this.setState({totalDepositVal:totalDepositVal,highestCanBorrowUsd:highestCanBorrowUsd})
        }
    }
    getUserReward = () => {
        const { comptrollerAddress } = this.state
        store.getLoanUserReward(comptrollerAddress,(err,data)=>{
            if(err==null){
                this.setState({userReward:data})
            }
        })
    }
    getLoanCompSpeeds = () => {
        const { comptrollerAddress,moduleConfig } = this.state
        let total = 0;
        for(let i=0,count=moduleConfig.length;i<count;i++){
            const obj = moduleConfig[i];
            store.getLoanCompSpeeds(comptrollerAddress,obj.param1,(err,data)=>{
                if(err==null){
                    obj.compSpeed = data;
                }
                total += 1;
                if(total===count){//查询完成
                    this.setState({
                        moduleConfig:[...moduleConfig],
                    })
                }
            })
        }
    }
    //领取奖励
    userRewardClaim = () => {
        const { comptrollerAddress,userReward } = this.state
        if(isEmpty(userReward)) {
            return;
        }
        const amount = SaveToTwoWei(userReward,userReward<1?4:2);
        this.setState({ modalSend: false })
        const msgContent = "Claim " + amount + " BXH";
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        store.loanClaimUserReward({contractAddress:comptrollerAddress,msgContent})
    }
    userRewardClaimReturn = (data) => {
        this.txReturnRefresh(data)
    }
    txReturnRefresh = (data,time=3000) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                setTimeout(() => {
                    this.refreshAccount(true)
                }, time);
            }
        }
    }
    contractRequst = (msgContent) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
    }
    contractMsg = (msgContent) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: -2, msgContent: msgContent })
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
        const { address,isMobile,modalUnlock,modalSend,moduleConfig,totalBorrow,totalDepositVal,totalDeposit,highestCanBorrowUsd,comptrollerAddress,bxhInfo,sumDeposit,sumBorrow } = this.state;
        let loanOpenSatus = localStorage.getItem('loanOpenSatus')
        return (
            <div style={{ width: '100%' }}>
                <div className={getStyleClass('PCbroot',classes.root)}>
                    <Header openUnlockModal={this.openUnlockModal} />

                    <div className={classes.content}>
                        <div className={classes.title}>{t('BXH.loan')}</div>
                        {
                            isMobile ?
                            this.renderMobileHeader()
                            :
                            this.renderPCHeader()
                        }
                        {this.renderLoanUsageRate()}
                        
                        {/* 我的存款、借贷 */}   
                        <LoanDeposit address={address} 
                            bxhInfo={bxhInfo}
                            totalBorrow={totalBorrow}
                            totalDepositVal={totalDepositVal}
                            totalDeposit={totalDeposit}
                            openUnlockModal={this.openUnlockModal} 
                            contractRequst={this.contractRequst} 
                            contractMsg={this.contractMsg}
                            txReturnRefresh={this.txReturnRefresh} 
                            moduleConfig={moduleConfig}
                            comptrollerAddress={comptrollerAddress}/>

                        <LoanMarket address={address} 
                            bxhInfo={bxhInfo}
                            totalBorrow={totalBorrow}
                            totalDepositVal={totalDepositVal}
                            highestCanBorrowUsd={highestCanBorrowUsd}
                            openUnlockModal={this.openUnlockModal} 
                            contractRequst={this.contractRequst} 
                            txReturnRefresh={this.txReturnRefresh} 
                            moduleConfig={moduleConfig}
                            sumDeposit={sumDeposit}
                            sumBorrow={sumBorrow}/>

                    </div>
                    { modalUnlock && this.renderUnlockWalletModal() }
                    { modalSend && this.renderSendModal()}

                </div>

                {
                    !isMobile ?
                    <Footer />
                    :
                    null
                }
                
            </div>
        )
    }
    renderMobileHeader = () => {
        const { classes, t } = this.props;
        const { userReward,totalDeposit,totalBorrow } = this.state;
        return (
            <div className={classes.header}>
                <div className={getStyleClass('listConter',classes.reward)}>
                    <div className={classes.rewardLeft}>
                        <div>{t('BXH.listreward1')}</div>
                        <label><b>{isNoEmpty(userReward)?SaveToTwoWei(userReward,userReward<1?6:4):'0.000000'}</b>BXH</label>
                    </div>
                    <img className={classes.rewardBg} src={RewardBgLogo} alt=""/>
                    <div onClick={this.userRewardClaim} className={getStyleClass('PC_new_btn1',classes.rewardClaim)}>{t('BXH.ClaimRewards')}</div>
                </div>
                <div className={classes.lendingDeposit}>
                    <div className={getStyleClass('listConter',classes.lendingDepositItem)}>
                        <img className={classes.lendingDepositItemImg} src={DepositLogo} alt=""/>
                        <div className={classes.lendingDepositItemVal}>
                            <div>{t('BXH.depositAmount')}</div>
                            <label>${isNoEmpty(totalDeposit)?SaveToTwoWei(totalDeposit,totalDeposit<1?6:2):'0.0000'}</label>
                        </div>
                    </div>
                    <div className={getStyleClass('listConter',classes.lendingDepositItem)}>
                        <img className={classes.lendingDepositItemImg} src={LoanLogo} alt=""/>
                        <div className={classes.lendingDepositItemVal}>
                            <div>{t('BXH.loanAmount')}</div>
                            <label>${isNoEmpty(totalBorrow)?SaveToTwoWei(totalBorrow,totalBorrow<1?6:2):'0.0000'}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderPCHeader = () => {
        const { classes, t } = this.props;
        const { userReward,totalDeposit,totalBorrow } = this.state;
        return (
            <div className={classes.header}>
                <div className={getStyleClass('listConter',classes.lendingDepositItem)}>
                    <img className={classes.lendingDepositItemImg} src={DepositLogo} alt=""/>
                    <div className={classes.lendingDepositItemVal}>
                        <div>{t('BXH.depositAmount')}</div>
                        <label>${isNoEmpty(totalDeposit)?SaveToTwoWei(totalDeposit,totalDeposit<1?6:2):'0.0000'}</label>
                    </div>
                </div>
                <div className={getStyleClass('listConter',classes.lendingDepositItem)}>
                    <img className={classes.lendingDepositItemImg} src={BXHLogo} alt=""/>
                    <div className={classes.lendingDepositItemValReward}>
                        <div>{t('BXH.listreward1')}</div>
                        <label>{isNoEmpty(userReward)?SaveToTwoWei(userReward,userReward<1?4:2):'0.0000'}</label>
                    </div>
                    <div onClick={this.userRewardClaim} className={getStyleClass('PC_new_btn1',classes.rewardClaim)}>{t('BXH.receive')}</div>
                </div>
                <div className={getStyleClass('listConter',classes.lendingDepositItem)}>
                    <img className={classes.lendingDepositItemImg} src={LoanLogo} alt=""/>
                    <div className={classes.lendingDepositItemVal}>
                        <div>{t('BXH.loanAmount')}</div>
                        <label>${isNoEmpty(totalBorrow)?SaveToTwoWei(totalBorrow,totalBorrow<1?6:2):'0.0000'}</label>
                    </div>
                </div>
            </div>
        )
    }
    //贷款使用率
    renderLoanUsageRate = () => {
        const {totalBorrow,totalDepositVal} = this.state;
        let rate = 0;
        if(isNoEmpty(totalBorrow)&&isNoEmpty(totalDepositVal)&&totalBorrow>0&&totalDepositVal>0) {
            rate = _getValuemultip(_getValueDivided(totalBorrow,totalDepositVal,4),100)
        }
        return (
            <LoanUsageRate rate={rate} totalDepositVal={totalDepositVal} />
        )
    }
    renderSendModal = () => {
        const { modalSendType, msgContent, txHash } = this.state
        return (
            <SendDialog onClose={()=>{this.setState({modalSend:false})}} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
        )
    }
    renderUnlockWalletModal = () => {
        return (
            <UnlockModal closeModal={this.closeUnlockModal} modalOpen={this.state.modalUnlock} />
        )
    }
    openUnlockModal = () => {
        this.setState({ modalUnlock: true })
    }
    closeUnlockModal = () => {
        this.setState({ modalUnlock: false })
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(Loan)));
