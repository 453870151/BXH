import React, { PureComponent } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import Store from "../../stores";
import { getTokenLogoURLWithName,SaveToTwoWei,isNoEmpty,_getValuemultip,_getValueDivided,_getValueMinus4,_getValueAdd2,_getValuePow,getStyleClass,isEmpty,saveToWei,filterByName } from '../../config/constantFunction'

import LoanDepositAlert from './alert/LoanDepositAlert.jsx';
import LoanBorrowAlert from './alert/LoanBorrowAlert.jsx';
import { Tooltip } from 'antd';

import {
    BXHLoanDeposit_RETURN,
} from '../../constants'

const emitter = Store.emitter;
const store = Store.store;
const dispatcher = Store.dispatcher;

const styles = theme => ({
    root: {
        marginTop: '30px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '40px',
        }
    },
    switch: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
    },
    switchContent: {
        borderRadius: '4px',
        padding: '1px',
        display: 'flex',
        fontSize: '24px',
        fontWeight: '600',
        [theme.breakpoints.up('sm')]: {
            padding: '2px',
        },
        '& div': {
            padding: '0 10px',
            minWidth: '100px',
            height: '30px',
            lineHeight: '30px',
            borderRadius: '4px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                minWidth: '160px',
                lineHeight: '36px',
                height: '36px',
            },
            '&:hover': {
                filter: 'brightness(80%)',
            },
            '&:active': {
                filter: 'brightness(50%)',
            },        
        },
    },
    content: {
        background: '#20233C',
        borderRadius: '12px',
        marginTop: '16px',
        [theme.breakpoints.up('sm')]: {
            // marginTop: '38px',
        }
    },
    header: {
        display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'cneter',
        // padding: '16px 12px 8px',
        fontSize: '12px',
        fontWeight: 'bold',
        // textAlign: 'right',
        '& div': {
            opacity: '0.45',
        },
        [theme.breakpoints.up('sm')]: {
            height: '52px',
            padding: '18px 34px 0',
        }
    },
    hedaerItem1: {
        // flex: '1',
        textAlign: 'left',
        width: '12%',
    },
    hedaerItem2: {
        // flex: '1.8',
        width: '12%',
        textAlign: 'right',
        '& img': {
            width: '12px',
            marginLeft: '5px',
            cursor: 'pointer',
        },
        [theme.breakpoints.up('sm')]: {
            // flex: '1',
        }
    },
    hedaerItem3: {
        // flex: '1.5',
        width: '8%',
        textAlign: 'center',
    },
    hedaerItem5: {
        // flex: '1.5',
        width: '20%',
        textAlign: 'center',
    },
    hedaerItem4: {
        // flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        '& img': {
            cursor: 'pointer',
            marginLeft: '5px',
            width: '16px',
            height: '16px',
        },
        [theme.breakpoints.up('sm')]: {
            // flex: '1.5',
        }
    },
    line: {
        width: '100%',
        height: '2px',
        background: '#979797',
        opacity: '0.15',
    },
    list: {
        padding: '7px 10px 10px',
        [theme.breakpoints.up('sm')]: {
            padding: '2px 17px 0 20px',
        }
    },
    item: {
        position: 'relative',
        display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'cneter',
        height: '52px',
        [theme.breakpoints.up('sm')]: {
            height: '70px',
            padding: '0 8px',
        }
    },
    item1: {
        // flex: '1',
        display: 'flex',
        alignItems: 'center',
        width: '12%',
        '& span': {
            fontSize: '13px',
            fontWeight: 'bold',
            marginLeft: '5px',
            [theme.breakpoints.up('sm')]: {
                marginLeft: '8px',
                fontSize: '16px',
            }
        }
    },
    item2: {
        // flex: '1.8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px',
        // fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            // flex: '1',
            fontSize: '13px',
            width: '8%',
            color: '#FDD436',
        }
    },
    item3: {
        flex: '1.5',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '& em': {
            fontStyle: 'inherit',
            fontSize: '10px',
            color: '#FFF',
        },
        '& img': {
            marginLeft: '5px',
            width: '16px',
            height: '16px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '17px',
            '& span': {
                fontSize: '16px',
            }
        }
    },
    item4: {
        // flex: '1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20%',
        '& div': {
            cursor: 'pointer',
            width: '55px',
            height: '25px',
            lineHeight: '25px',
            textAlign: 'center',
            borderRadius: '4px',
            // background: '#30BD85',
            fontSize: '13px',
            fontWeight: 'bold',
            [theme.breakpoints.up('sm')]: {
                width: '90px',
                height: '32px',
                lineHeight: '32px',
                fontSize: '15px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            // flex: '1.5',
        }
    },
    itemMarket: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'cneter',
        height: '52px',
        [theme.breakpoints.up('sm')]: {
            height: '70px',
            padding: '0 8px',
        }
    },
    itemMarket1: {
        flex: '1',
        display: 'flex',
        alignItems: 'center',
        '& span': {
            fontSize: '13px',
            fontWeight: 'bold',
            marginLeft: '5px',
            [theme.breakpoints.up('sm')]: {
                marginLeft: '8px',
                fontSize: '16px',
            }
        }
    },
    itemMarket2: {
        // flex: '1.8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        fontSize: '13px',
        // fontWeight: 'bold',
        '& span': {
            marginTop: '2px',
            fontSize: '12px',
            // fontWeight: 'bold',
            opacity: '0.6',
        },
        [theme.breakpoints.up('sm')]: {
            // flex: '1',
            fontSize: '13px',
            width: '12%',
            textAlign: 'right',
        }
    },
    itemMarket3: {
        cursor: 'pointer',
        flex: '1.5',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        wordBreak: 'break-all',
        textAlign: 'right',
        '& em': {
            fontStyle: 'inherit',
            fontSize: '10px',
            color: '#FFF',
        },
        '& img': {
            marginLeft: '5px',
            width: '16px',
            height: '16px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '17px',
            '& span': {
                fontSize: '16px',
            }
        }
    },
    itemMarket4: {
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& div': {
            cursor: 'pointer',
            width: '52px',
            height: '25px',
            lineHeight: '25px',
            textAlign: 'center',
            borderRadius: '4px',
            background: '#30BD85',
            fontSize: '12px',
            fontWeight: 'bold',
            [theme.breakpoints.up('sm')]: {
                width: '90px',
                height: '32px',
                lineHeight: '32px',
                fontSize: '15px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            flex: '1.5',
        }
    },
    itemLine: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '1px',
        background: '#979797',
        opacity: '0.08',
    },
    logo: {
        width: '25px',
        height: '25px',
        [theme.breakpoints.up('sm')]: {
            width: '28px',
            height: '28px',
        }
    },
    loanContent: {
        display: 'flex',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '34px',
        }
    },
    loansecont: {
        display: 'flex',
        flex: '2',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'start',
        },
    },
    loantitle: {
        [theme.breakpoints.up('sm')]: {
            marginRight: '50px',
        },
        '& span': {
            display: 'block',
            opacity: '.6',
            fontSize: '14px',
            fontWeight: '500',
        },
        '& em': {
            fontStyle: 'inherit',
            fontWeight: 'bold',
        },
    },
    depConTit: {
        fontSize: '19px',
        fontWeight: 'bold',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    deploanTit: {
        '& img': {
          width: '35px',
          verticalAlign: 'middle',
          marginRight: '10px',
        }
    },
    depcomti: {
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #2D2F45',
        paddingBottom: '6px',
        marginBottom: '6px',
        '& img': {
          width: '12px',
          height: '12px',
          marginLeft: '5px',
          cursor: 'pointer',
        }
    },
    deptitop: {
        opacity: '.8',
        fontSize: '14px',
        lineHeight: '35px',
    },
    deplvse: {
        fontStyle: 'inherit',
        textAlign: 'right',
        '& div': {
            fontSize: '14px',
        },
        '& span': {
            fontSize: '13px',
            opacity: '0.6',
        },
    },
    depbottom: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    bxh_new_btn: {
        width: '45%',
        height: '40px',
        lineHeight: '40px',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        fontWeight: 'bold',
        fontSize: '15px',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'center',
        marginRight: '10px',
        color: '#FFFFFF',
        textDecoration: 'none',
        '&:hover': {
          backgroundImage: 'none',
          backgroundColor: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
          backgroundImage: 'none',
          backgroundColor: 'rgba(19, 119, 80, 1)',
        },
    },
    bxh_new_btn2: {
        width: '45%',
        height: '40px',
        lineHeight: '36px',
        border: '1px solid #30BE85',
        fontWeight: 'bold',
        fontSize: '15px',
        borderRadius: '6px',
        cursor: 'pointer',
        textAlign: 'center',
        color: '#30BE85',
        textDecoration: 'none',
        '&:hover': {
          backgroundImage: 'none',
          backgroundColor: 'rgba(28, 163, 109, 0.3)',
        },
        '&:active': {
          backgroundImage: 'none',
          backgroundColor: 'rgba(19, 119, 80, 1)',
        },
    },
    bxhInput: {
        height: '25px',
        borderRadius: '15px',
        '& input': {
          fontSize: '12px',
          borderRadius: '15px',
          height: '25px',
          lineHeight: '20px',
          padding: '0px 6px',
        }
    },
    loansearch: {
        position: 'relative',
        marginTop: '7px',
        '& img': {
            position: 'absolute',
            right: '10px',
            top: '7px',
            width: '15px',
        }
    }
})

class LoanMarket extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isMobile: true,
            selectedIndex: 0,
            modalDepositAlert: false,
            modalBorrowAlert: false,
            depositToken: {},//选中的token
            borrowToken: {},//选中的token
            inputSearchVal: "",
        }
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    componentDidMount() {
        emitter.on(BXHLoanDeposit_RETURN,this.approveReturn)
        if (this._isMobile()) { // 移动端
            this.setState({ isMobile: true })
        } else {  // PC端
            this.setState({ isMobile: false })
        }
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }
    componentWillUnmount() {
        emitter.removeListener(BXHLoanDeposit_RETURN,this.approveReturn)
        window.removeEventListener('resize', this.handleResize.bind(this))
    }
    handleResize = e => {
        if (this._isMobile()) { // 移动端
          this.setState({ isMobile: true })
        } else {  // PC端
          this.setState({ isMobile: false })
        }
    }
    switch = (idx) => {
        this.setState({selectedIndex:idx});
    }
    openDepositAlert = (obj) => {
        this.setState({modalDepositAlert: true, depositToken: obj})
        document.body.style.overflow = 'hidden';
    }
    openBorrowAlert = (obj) => {
        this.setState({modalBorrowAlert: true, borrowToken: obj})
        document.body.style.overflow = 'hidden';
    }
    approve = (obj) => {
        if(isEmpty(obj.allowance)){
            return;
        }
        const msgContent = "Approve "+obj.param2;
        this.props.contractRequst(msgContent);
        store.loanApproveToken({contractAddress:obj.param1,token:obj.param3,msgContent})
    }
    approveReturn = (data) => {
        this.props.txReturnRefresh(data)
    }
    depositAction = (amount) => {
        const { depositToken } = this.state;
        const msgContent = "Deposit "+amount+depositToken.param2;
        this.props.contractRequst(msgContent);
        store.loanDepositToken({contractAddress:depositToken.param1,token:depositToken.param3,msgContent,amount})
    }
    depositReturn = (data) => {
        this.props.txReturnRefresh(data)
    }
    borrowAction = (amount) => {
        const { borrowToken } = this.state;
        const msgContent = "Borrow "+amount+borrowToken.param2;
        this.props.contractRequst(msgContent);
        store.loanBorrowToken({contractAddress:borrowToken.param1,token:borrowToken.param3,msgContent,amount})
    }
    borrowReturn = (data) => {
        this.props.txReturnRefresh(data)
    }
    render() {
        const { classes, t, sumDeposit, sumBorrow } = this.props;
        const { modalDepositAlert, modalBorrowAlert, inputSearchVal } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.switch}>
                    <div className={classes.switchContent}>
                        {t('BXH.loanMarkets')}
                    </div>
                </div>
                <div className={classes.loanContent}>
                    <div className={classes.loansecont}>
                        <div className={classes.loantitle}>
                            <span>{t('BXH.loanDepositTotal')}</span>
                            <em>{sumDeposit?'$'+sumDeposit.toFixed(2):'--'}</em>
                        </div>
                        <div className={classes.loantitle}>
                            <span>{t('BXH.loanLoanTotal')}</span>
                            <em>{sumBorrow?'$'+sumBorrow.toFixed(2):'--'}</em>
                        </div>
                    </div>
                    {/* <div className={classes.loansearch}>
                        <TextField
                            fullWidth
                            className={getStyleClass('serInput',classes.bxhInput)}
                            value={inputSearchVal || ''}
                            onChange={this.onChange.bind(this, "")}
                            placeholder={t('BXH.searchtitle')}
                            variant="outlined"
                        />
                        <img src={require('../../assets/bxh/search.png')} alt="" className={classes.searchImg} />
                    </div> */}
                </div>
                { this.renderDeposit() }
                { modalDepositAlert&&this.renderDepositAlert() }
                { modalBorrowAlert&&this.renderBorrowAlert() }
            </div>
        )
    }
    renderDeposit = () => {
        const { classes, t, moduleConfig } = this.props;
        const { isMobile } = this.state;
        const depositArr = moduleConfig;
        if(!isMobile){
            // PC
            return (
                <>
                    <div className={getStyleClass('listConter',classes.content)}>
                        <div className={classes.header}>
                            <div className={classes.hedaerItem1}>{t('BXH.assets')}</div>
                            <div className={classes.hedaerItem2}>{t('BXH.loanTotaldeposit')}</div>
                            <div className={classes.hedaerItem2}>{t('BXH.loanTotalborrowings')}</div>
                            <div className={classes.hedaerItem2}>{t('BXH.loanLiquidity')}</div>
                            {/* <div className={classes.hedaerItem2}>钱包</div> */}
                            <div className={classes.hedaerItem2}>{t('BXH.loanSavingsRate')}
                                <Tooltip overlayClassName="global_tooltip" title={t('BXH.loanDepositSubsidized')}>
                                    <img src={require('../../assets/bxh/question.png')}/>
                                </Tooltip>
                            </div>
                            <div className={classes.hedaerItem2}>{t('BXH.loanBorrowCost')}
                                <Tooltip overlayClassName="global_tooltip" title={t('BXH.loanLoanSubsidized')}>
                                    <img src={require('../../assets/bxh/question.png')}/>
                                </Tooltip>
                            </div>
                            <div className={classes.hedaerItem3}>{t('BXH.loanUtilization')}</div>
                            <div className={classes.hedaerItem5}>{t('BXH.loanDepositBorrow')}</div>
                        </div>
                        <div className={classes.line}/>
                        <div className={classes.list}>
                            {
                                depositArr?depositArr.map((obj,idx)=>this.renderDepositItem(obj,idx)):null
                            }
                        </div>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div>
                        {
                            depositArr?depositArr.map((obj,idx)=>this.renderDepositItem(obj,idx)):null
                        }
                    </div>
                </>
            )
        }
        
    }

    renderDepositItem = (obj,idx) => {
        const { classes, t, openUnlockModal, address, bxhInfo } = this.props;
        const { isMobile } = this.state;
        const symbol = (obj&&obj.param2)||"--";
        let supplyRate = null;//存款利率
        // 【（每日产出数量*价格）/存款总TVL】*100%*365=年化补贴利率  
        // 每日产出数量=【当前区块高度的奖励*单币份额比*3600*24】/3
        let subsidyRate = null;//补贴利率
        let totalRate = null;//存款总利率
        if(obj.market&&isNoEmpty(obj.market.supplyRate)){
            supplyRate = _getValuemultip(obj.market.supplyRate,100,6);
            if(bxhInfo&&bxhInfo.bxh_price>0&&isNoEmpty(obj.compSpeed)&&isNoEmpty(obj.price)&&obj.price>0&&isNoEmpty(obj.market.cash)&&obj.market.cash>0){
                const dayOutput = _getValueDivided(_getValuemultip(_getValuemultip(obj.compSpeed,3600,18),24,18),3,18)
                const tvl = _getValuemultip(obj.market.cash,obj.price,18)
                subsidyRate = _getValuemultip(_getValueDivided(_getValuemultip(dayOutput,bxhInfo.bxh_price,18),tvl,18),36500,18)
                totalRate = _getValueAdd2(supplyRate,subsidyRate,4);
            }else{
                totalRate = supplyRate;
            }
        }
        let borrowRate = null;//贷款利率
        let totalLoanRate = null;//借款总利率
        if(obj.market&&isNoEmpty(obj.market.borrowRate)){
            borrowRate = _getValuemultip(obj.market.borrowRate,100,6);
            if(bxhInfo&&bxhInfo.bxh_price>0&&isNoEmpty(obj.compSpeed)&&isNoEmpty(obj.price)&&obj.price>0&&isNoEmpty(obj.market.cash)&&obj.market.cash>0){
                totalLoanRate = _getValueMinus4(borrowRate,subsidyRate);
            }else{
                totalLoanRate = borrowRate;
            }
        }
        const supplyRateStr = isNoEmpty(supplyRate)?SaveToTwoWei(supplyRate)+'%':'0.00%';
        const subsidyRateStr = isNoEmpty(subsidyRate)?SaveToTwoWei(subsidyRate)+'%':'0.00%';
        const tooltipStr = t('BXH.depositRate')+':'+supplyRateStr+(isNoEmpty(subsidyRate)?(' + '+t('BXH.subsidyRate')+':'+subsidyRateStr):'');
        const borrowRateStr = isNoEmpty(borrowRate)?SaveToTwoWei(borrowRate)+'%':'0.00%';
        const million = _getValuePow(10,7,0)//百万
        const wan = _getValuePow(10,4,0)//万
        const thousand = _getValuePow(10,3,0)//千
        //总存款
        let depositTotal = null;
        let totalDepositUsd = '--';
        if(obj.market&&isNoEmpty(obj.market.totalSupply)&&isNoEmpty(obj.market.exchangeRate)){
            depositTotal = _getValuemultip(obj.market.totalSupply, obj.market.exchangeRate)
            if(parseFloat(depositTotal)>parseFloat(million)){
                totalDepositUsd = _getValueDivided(depositTotal,million,2)+"M"
            }else if(parseFloat(depositTotal)>parseFloat(wan)){
                totalDepositUsd = _getValueDivided(depositTotal,thousand,2)+"K"
            }else{
                totalDepositUsd = saveToWei(depositTotal,depositTotal<1?4:2);
            }
        }
        //总借款
        let borrowTotal = null;
        let totalBorrowUsd = '--';
        if(obj.market&&isNoEmpty(obj.market.totalBorrows)){
            borrowTotal = (obj.market.totalBorrows * 1).toFixed(2)
            if(parseFloat(borrowTotal)>parseFloat(million)){
                totalBorrowUsd = _getValueDivided(borrowTotal,million,2)+"M"
            }else if(parseFloat(borrowTotal)>parseFloat(wan)){
                totalBorrowUsd = _getValueDivided(borrowTotal,thousand,2)+"K"
            }else{
                totalBorrowUsd = saveToWei(borrowTotal,borrowTotal<1?4:2);
            }
        }
        //流动性(可借)
        let totalSupplyUsd = '--';
        if(obj.market&&isNoEmpty(obj.market.cash)&&isNoEmpty(obj.price)&&obj.price>0){
            totalSupplyUsd = _getValuemultip(obj.market.cash,obj.price,4);
            if(parseFloat(totalSupplyUsd)>parseFloat(million)){
                totalSupplyUsd = _getValueDivided(totalSupplyUsd,million,2)+"M"
            }else if(parseFloat(totalSupplyUsd)>parseFloat(wan)){
                totalSupplyUsd = _getValueDivided(totalSupplyUsd,thousand,2)+"K"
            }else{
                totalSupplyUsd = saveToWei(totalSupplyUsd,totalSupplyUsd<1?4:2);
            }
        }
        //使用率
        let totalRateUse = null
        if(depositTotal&&borrowTotal){
            totalRateUse = _getValuemultip(_getValueDivided(borrowTotal, depositTotal, 4), 100)
        }

        if(!isMobile){
            // PC
            return (
                <div className={classes.item} key={idx}>
                    <div className={classes.item1}>
                        <img className={classes.logo} src={getTokenLogoURLWithName(symbol)} alt="" />
                        <span>{symbol}</span>
                    </div>
                    {/* 总存款 */}
                    <div className={classes.itemMarket2}>
                        <div>${totalDepositUsd}</div>
                        <span>{depositTotal?depositTotal:'--'} {symbol}</span>
                    </div>
                    {/* 总借款 */}
                    <div className={classes.itemMarket2}>
                        <div>${totalBorrowUsd}</div>
                        <span>{borrowTotal?borrowTotal:'--'} {symbol}</span>
                    </div>
                    {/* 流动性 */}
                    <div className={classes.itemMarket2}>
                        <div>${totalSupplyUsd}</div>
                        <span>{obj.market&&isNoEmpty(obj.market.cash)?SaveToTwoWei(obj.market.cash,obj.market.cash<1?4:2):'--'} {symbol}</span>
                    </div>
                    {/* <div className={classes.item2}>{isNoEmpty(obj.balance)?obj.balance:'--'}</div> */}
                    {/* 存款收益 */}
                    <div className={classes.itemMarket2}>
                        <div>{isNoEmpty(totalRate)?SaveToTwoWei(totalRate)+'%':'0.00%'} APR</div>
                        <span>{supplyRateStr} + {subsidyRateStr}</span>
                    </div>
                    {/* 借款成本 */}
                    <div className={classes.itemMarket2}>
                        <div>{isNoEmpty(totalLoanRate)?SaveToTwoWei(totalLoanRate)+'%':'0.00%'} APR</div>
                        <span>{borrowRateStr} - {subsidyRateStr}</span>
                    </div>
                    {/* 使用率 */}
                    <div className={classes.item2}>{totalRateUse?totalRateUse:'0.00'}%</div>
                    <div className={classes.item4}>
                        {
                            address?(
                                (!obj.param3||obj.param3==='')||(obj.allowance&&obj.allowance>0)?
                                <div className={getStyleClass('PC_new_btn1')} onClick={()=>this.openDepositAlert(obj)}>{t('BXH.deposit')}</div>
                                :
                                <div className={getStyleClass('PC_new_btn1')} onClick={()=>this.approve(obj)}>Approve</div>
                            ):(
                                <div className={getStyleClass('PC_new_btn1')} onClick={()=>openUnlockModal()}>Unlock</div>
                            )
                        }
                        <div onClick={()=>this.openBorrowAlert(obj)} className={getStyleClass('PC_new_btn2')}>{t('BXH.borrowing')}</div>
                    </div>
                    <div className={classes.itemLine}/>
                </div>
            )
        }else{
            return (
                <div className={getStyleClass('listConter',classes.content)} key={idx} style={{ padding:'20px' }}>
                    <div className={classes.depConTit}>
                        <div className={classes.deploanTit}>
                            <img src={getTokenLogoURLWithName(symbol)} />
                            {symbol}
                        </div>
                    </div>
                    {/* 总存款 */}
                    <div className={classes.depcomti}>
                        <div className={classes.deptitop}>{t('BXH.loanTotaldeposit')}</div>
                        <div className={classes.deplvse}>
                            <div>${totalDepositUsd}</div>
                            <span>{depositTotal?depositTotal:'--'} {symbol}</span>
                        </div>
                    </div>
                    {/* 总借款 */}
                    <div className={classes.depcomti}>
                        <div className={classes.deptitop}>{t('BXH.loanTotalborrowings')}</div>
                        <div className={classes.deplvse}>
                            <div>${totalBorrowUsd}</div>
                            <span>{borrowTotal?borrowTotal:'--'} {symbol}</span>
                        </div>
                    </div>
                    {/* 流动性 */}
                    <div className={classes.depcomti}>
                        <div className={classes.deptitop}>{t('BXH.loanLiquidity')}</div>
                        <div className={classes.deplvse}>
                            <div>${totalSupplyUsd}</div>
                            <span>{obj.market&&isNoEmpty(obj.market.cash)?SaveToTwoWei(obj.market.cash,obj.market.cash<1?4:2):'--'} {symbol}</span>
                        </div>
                    </div>
                    {/* 存款收益 */}
                    <div className={classes.depcomti}>
                        <div className={classes.deptitop}>{t('BXH.loanSavingsRate')}
                            <Tooltip overlayClassName="global_tooltip" title={t('BXH.loanDepositSubsidized')}>
                                <img src={require('../../assets/bxh/question.png')}/>
                            </Tooltip>  
                        </div>
                        <div className={classes.deplvse}>
                            <div>{isNoEmpty(totalRate)?SaveToTwoWei(totalRate)+'%':'0.00%'} APR</div>
                            <span>{supplyRateStr} + {subsidyRateStr}</span>
                        </div>
                    </div>
                    {/* 借款成本 */}
                    <div className={classes.depcomti}>
                        <div className={classes.deptitop}>{t('BXH.loanBorrowCost')}
                            <Tooltip overlayClassName="global_tooltip" title={t('BXH.loanLoanSubsidized')}>
                                <img src={require('../../assets/bxh/question.png')}/>
                            </Tooltip>
                        </div>
                        <div className={classes.deplvse}>
                            <div>{isNoEmpty(totalLoanRate)?SaveToTwoWei(totalLoanRate)+'%':'0.00%'} APR</div>
                            <span>{borrowRateStr} - {subsidyRateStr}</span>
                        </div>
                    </div>
                    {/* 使用率 */}
                    <div className={classes.depcomti} style={{lineHeight: '30px' }}>
                        <div className={classes.deptitop}>{t('BXH.loanUtilization')}</div>
                        <div className={classes.deplvse}>
                            <div>{totalRateUse?totalRateUse:'0.00'}%</div>
                        </div>
                    </div>

                    <div className={classes.depbottom}>
                        <div className={getStyleClass('PC_new_btn3', classes.bxh_new_btn2)} onClick={()=>this.openBorrowAlert(obj)}>
                            {t('BXH.borrowing')}
                        </div>
                        {
                            address?(
                                (!obj.param3||obj.param3==='')||(obj.allowance&&obj.allowance>0)?
                                <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} onClick={()=>this.openDepositAlert(obj)}>{t('BXH.deposit')}</div>
                                :
                                <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} onClick={()=>this.approve(obj)}>Approve</div>
                            ):(
                                <div className={getStyleClass('PC_new_btn1', classes.bxh_new_btn)} onClick={()=>openUnlockModal()}>Unlock</div>
                            )
                        }
                    </div>
                </div>
            )
        }
        
    }
    
    renderDepositAlert = () => {
        const { depositToken } = this.state;
        return <LoanDepositAlert tokenInfo={depositToken} onClose={()=>{this.setState({ modalDepositAlert: false });document.body.style.overflow = 'auto';}} onSure={this.depositAction} />
    }
    renderBorrowAlert = () => {
        const { borrowToken } = this.state;
        const {totalBorrow,highestCanBorrowUsd,totalDepositVal} = this.props;
        return <LoanBorrowAlert 
            totalBorrow={totalBorrow} 
            highestCanBorrowUsd={highestCanBorrowUsd}
            totalDepositVal={totalDepositVal}
            tokenInfo={borrowToken} 
            onClose={()=>{this.setState({ modalBorrowAlert: false });document.body.style.overflow = 'auto';}}
            onSure={this.borrowAction} />
    }

    onChange = (value, event) => {
        const { moduleConfig } = this.props;
        this.setState({ inputSearchVal: event.target.value })
        // console.log(event.target.value)
        // console.log(moduleConfig)
        
        // console.log(filterByName(moduleConfig, event.target.value))
    }

}

export default withNamespaces()(withRouter(withStyles(styles)(LoanMarket)));
