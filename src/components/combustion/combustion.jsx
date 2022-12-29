import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import Store from "../../stores/store";
import BurningDigDialog from '../burningDigDialog/burningDigDialog.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import CombustionStakeDialog from '../combustionStakeDialog/combustionStakeDialog.jsx';
import { SaveToTwoWei } from '../../config/constantFunction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Footer from '../unlock/Footer.jsx';
import getLangURLWithURL from '../../util/linkHelper';

import {
    ERROR,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    BXHCHNAGEACCOUNT,
    BXHCombustionApprove,
    BXHCombustionApprove_RETURNED,
    BXHCombustionDeposit,
    BXHCombustionDeposit_RETURNED,
    BXHCombustionWithdraw,
    BXHCombustionWithdraw_RETURNED,
} from '../../constants';

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
    root: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            paddingTop: '120px',
            maxWidth: '1100px',
            minWidth: '1000px',
            paddingLeft:'260px',
        }
    },
    banner: {
        widht: '100%',
        margin: '0 15px',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        '& img': {
            height: '80px',
            widht: '100%',
            objectFit: 'cover',
            [theme.breakpoints.up('sm')]: {
                height: '150px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: '20px',
        }
    },
    titleContent: {
        width: '100%',
        padding: '15px 25px',
    },
    title: {
        fontSize: '19px',
        fontWeight: 'bolder',
        [theme.breakpoints.up('sm')]: {
            fontSize: '32px',
            textAlign: 'center',
        },
    },
    desc: {
        fontSize: '17px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '5px',
            fontSize: '32px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
        },
    },
    switch: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
    },
    switchContent: {
        backgroundColor: '#22253F',
        borderRadius: '4px',
        padding: '1px',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            padding: '2px',
        },
        '& div': {
            width: '100px',
            height: '30px',
            lineHeight: '30px',
            borderRadius: '4px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                width: '160px',
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
        margin: '0 15px 15px',
    },
    next: {
        color: '#FFFFFF',
    },
    nextPastContent: {
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '10px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '22px',
            marginTop: '30px',
        },
    },
    nextBottom: {
        margin: '35px 10px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '35px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '62px',
        },
    },
    item:  {
        borderRadius: '12px',
        backgroundColor: '#262946',
        marginLeft: 'auto',
        marginRight: 'auto',
        overflow: 'hidden',
        maxWidth: '437px',
    },
    itemBg: {
        width: '100%',
        maxHeight: '112px',
        minHeight: '70px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    itemContent: {
        padding: '15px 15px 20px',
    },
    itemInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            padding: '0 15px',
        },
    },
    itemTitle: {
        fontSize: '21px',
        fontWeight: 'bold',
    },
    itemDesc: {
        marginTop: '5px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    itemIcon: {
        width: '50px',
        height: '50px',
    },
    lpInfo: {
        borderTop: '1px solid rgba(151, 151, 151, 0.1)',
        marginTop: '20px',
        paddingTop: '20px',
        [theme.breakpoints.up('sm')]: {
            padding: '20px 15px 0',
        },
    },
    lpInfoRow: {
        display: 'flex',
    },
    lpInfoItem: {
        width: '50%',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px',
        fontWeight: 'bold',
        '& span': {
            color: '#FFFFFF',
            marginTop: '6px',
            fontSize: '18px',
            fontWeight: 'bolder',
        },
    },
    lpInfoClaim: {
        marginTop: '15px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        '& span': {
            color: '#FFFFFF',
            marginLeft: '10px',
            fontSize: '18px',
            fontWeight: 'bolder',
        },
    },
    btn: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        margin: '20px 5px 15px',
        height: '45px',
        lineHeight: '45px',
        borderRadius: '6px',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    btnDisable: {
        background: '#4A4C5E',
        margin: '20px 5px 15px',
        height: '45px',
        lineHeight: '45px',
        borderRadius: '6px',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'no-drop',
    },
    tip: {
        marginTop: '15px',
        marginBottom: '20px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            padding: '0 15px',
        },
    },
    projectDetail: {
        color: '#2EBC84',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: 'auto',
        width: 'fit-content',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    overview: {
        marginTop: '35px',
    },
    overviewTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    overviewContent: {
        margin: '20px 10px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '20px',
    },
    overviewItem: {

    },
    overviewSubtitle: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    overviewDesc: {
        marginTop: '12px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '160%',
        '& span': {
            fontWeight: 'bold',
            color: '#FFF',
        },
    },
    theirLaunch: {
        color: '#FFFFFF',
    },
    theirLaunchTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    theirLaunchDesc: {
        marginTop: '12px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px',
        fontWeight: '400',
    },
    theirLaunchApply: {
        marginTop: '22px',
        color: '#FFFFFF',
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '6px',
        width: '155px',
        height: '35px',
        lineHeight: '35px',
        background:'linear-gradient(to bottom, #2EBC84, #35C288)',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    howParticipate: {
        color: '#FFFFFF',
    },
    howParticipateTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    howParticipateSubtitle: {
        marginTop: '15px',
        paddingLeft: '10px',
        height: '26px',
        lineHeight: '26px',
        fontSize: '14px',
        fontWeight: 'bold',
        position: 'relative',
    },
    gradientBg: {
        width: '65px',
        height: '26px',
        position: 'absolute',
        left: '0px',
        backgroundImage: 'linear-gradient(to right, #30BE85, #1D1F36)',
        opacity: '0.2',
        borderRadius: '2px',
    },
    howParticipateDesc: {
        margin: '15px 10px',
        fontSize: '14px',
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.8)',
    },
    howParticipateBtn: {
        color: '#2EBC84',
        fontSize: '15px',
        fontWeight: 'bold',
        textDecoration: 'underline',
        display: 'flex',
        marginLeft: '10px',
        '& div': {
            cursor: 'pointer',
            '&:hover': {
                filter: 'brightness(80%)',
            },
            '&:active': {
                filter: 'brightness(50%)',
            },
        },
    },
});

class Combustion extends Component {
    constructor(props) {
        super()
        this.state = {
            selectedIndex: 0,
            modalBurningDig: false,
            modalObj: null,//弹窗项目
            blockNumber: null,//当前区块高度
            bxhIfm: null,
            bxh_ifm_banner: null,//banner
            nextList: [],
            pastList: [],
            address: null,
            modalCombustionStake: false,//质押
            modalCombustionObj: null,//质押领取obj
            modalUnlock: false,
            modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
            modalSend: false,
            msgContent: "",
            txHash: "",
            isMobile: false,
        }
    }
    componentWillMount() {
        emitter.on(ERROR, this.errorReturned);
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.on(BXHCHNAGEACCOUNT, this.loadData);
        emitter.on(BXHCombustionApprove_RETURNED, this.approveSuccess);
        emitter.on(BXHCombustionDeposit_RETURNED, this.stakeReturn);
        emitter.on(BXHCombustionWithdraw_RETURNED, this.claimReturn);
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }
    componentWillUnmount() {
        emitter.removeListener(ERROR, this.errorReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.removeListener(BXHCHNAGEACCOUNT, this.loadData);
        emitter.removeListener(BXHCombustionApprove_RETURNED, this.approveSuccess);
        emitter.removeListener(BXHCombustionDeposit_RETURNED, this.stakeReturn);
        emitter.removeListener(BXHCombustionWithdraw_RETURNED, this.claimReturn);
        window.removeEventListener('resize', this.handleResize)
    }
    handleResize = () => {
        if (this._isMobile()) { // 移动端
          this.setState({ isMobile: true })
        } else {  // PC端
          this.setState({ isMobile: false })
        }
    }
    //刷新账户相关信息
    refreshAccount = () => {
        const account = store.getStore('account');
        const address = account.address;
        if (address != undefined && address !== null && address != '') {
            this.setState({address: address});
        }else{
            this.setState({address: null});
        }
        this.loadData();
    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.refreshAccount();
    }
    loadData() {
        const that = this;
        store.getBXHIfm((data)=>{
            if(that.setState){
                that.setState({bxhIfm:data.bxh_ifm,bxh_ifm_banner:data.bxh_ifm_banner});
                that.refreshData();
                that.filterData();
            }
        });
        store.getCombustionBlockNumber((err,blockNumber)=>{
            if (err==null) {
                that.setState({blockNumber: blockNumber});
                that.filterData();
            }
        });
    }
    filterData() {
        const {bxhIfm,blockNumber} = this.state;
        if (bxhIfm) {
            let nextList = []
            let pastList = []
            bxhIfm.map((obj,idx)=>{
                if(blockNumber&&obj.endBlock){
                    if(blockNumber>=obj.endBlock){
                        pastList.push(obj);
                    }else{
                        nextList.push(obj);
                    }
                }
            });
            this.setState({nextList:nextList,pastList:pastList});
        }
    }
    refreshData() {
        const {bxhIfm} = this.state;
        const count = bxhIfm.length;
        bxhIfm.map((obj,idx)=>{
            this.loadLpToken(obj, idx==count-1);
            this.loadContractStartEndBlock(obj, idx==count-1);
            this.loadTotalRaised(obj);
        });
    }
    //刷新改变
    refreshChanage() {
        const {bxhIfm} = this.state;
        bxhIfm.map((obj,idx)=>{
            this.loadUserInfo(obj);
            this.loadUserHarvestV(obj);
            this.loadLpBalance(obj, true);
        });
    }
    //BXHP To Claim
    loadUserHarvestV(obj) {
        const that = this;
        if (!obj||!obj.contract_address||obj.contract_address==''||!obj.lpToken||obj.lpToken=='') {
            return;
        }
        store.getCombustionOfferingAmount(obj.contract_address,obj.lpToken,(err,amount)=>{
            if (err==null) {
                obj.offeringTokenAmount = amount;
                that.setState({});
            }
        });
        store.getCombustionRefundingAmount(obj.contract_address,obj.lpToken,(err,amount)=>{
            if (err==null) {
                obj.refundingTokenAmount = amount;
                that.setState({});
            }
        });
    }
    loadTotalRaised(obj) {
        const that = this;
        store.getCombustionTotalRaised(obj.contract_address,(err,totalRaised)=>{
            if (err==null) {
                obj.totalRaised = totalRaised;
                that.setState({});
            }
        });
    }
    //加载lpToken
    loadLpToken(obj, needRefresh) {
        const that = this;
        store.getCombustionLpToken(obj.contract_address,(err,lpToken)=>{
            if (err==null) {
                obj.lpToken = lpToken;
                that.loadAlloWance(obj);
                that.loadLpBalance(obj, needRefresh);
                that.loadLpSymbol(obj, needRefresh);
                that.loadUserInfo(obj);
                that.loadUserHarvestV(obj);
            }
            if (needRefresh) {
                that.setState({});
            }
        });
    }
    //加载startBlock/endBlock
    loadContractStartEndBlock(obj, needRefresh) {
        const that = this;
        store.getCombustionStartBlock(obj.contract_address,(err,block)=>{
            if (err==null) {
                obj.startBlock = block;
                if (needRefresh) {
                    that.setState({});
                }
            }
        });
        store.getCombustionEndBlock(obj.contract_address,(err,block)=>{
            if (err==null) {
                obj.endBlock = block;
                that.filterData();
            }
        });
    }
    //加载是否授权
    loadAlloWance(obj) {
        const that = this;
        store.getCombustionAlloWance(obj.contract_address,obj.lpToken,(err,alloWance)=>{
            if (err==null) {
                obj.alloWance = alloWance;
                that.setState({});
            }
        });
    }
    //加载余额
    loadLpBalance(obj, needRefresh) {
        const that = this;
        store.getCombustionLpBalance(obj.lpToken,(err,balance)=>{
            if (err==null) {
                obj.lpBalance = balance;
                if (needRefresh) {
                    that.setState({});
                }
            }
        });
    }
    //加载lpSymbol
    loadLpSymbol(obj, needRefresh) {
        const that = this;
        store.getCombustionLpTokenSymbol(obj.lpToken,(err,lpSymbol)=>{
            if (err==null) {
                obj.lpSymbol = lpSymbol;
                if (needRefresh) {
                    that.setState({});
                }
            }
        });
    }
    //加载userinfo
    loadUserInfo(obj) {
        const that = this;
        store.getUserInfoCombustion(obj.contract_address,obj.lpToken,(err,result)=>{
            if (err==null) {
                obj.userInfo = result;
                that.setState({});
            }
        });
    }
    refreshAlloWance() {
        const nextList = this.state.nextList;
        nextList.map((obj,idx)=>{
            this.loadAlloWance(obj);
        });
    }
    //授权
    approve = (obj) => {
        if (this.state.address==null) {
            this.openUnlockModal();
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve " + (obj.lpSymbol?obj.lpSymbol:'');
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
        dispatcher.dispatch({ type: BXHCombustionApprove, content: { contractAddress: obj.contract_address, lpToken: obj.lpToken, msgContent: msgContent} })
    }
    //授权成功
    approveSuccess = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshAlloWance();
            }
        }
    }
    //领取
    claim = (obj) => {
        this.setState({modalCombustionObj:obj});
        this.setState({ modalSend: false })
        const msgContent = "Claim " + (obj.project_name?obj.project_name:'');
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
        dispatcher.dispatch({ type: BXHCombustionWithdraw, content: {msgContent: msgContent}});
    }
    //质押
    stake = (obj) => {
        this.setState({modalCombustionObj:obj});
        this.setState({modalCombustionStake: true});
    }
    //质押输入数量
    onSureStake = (val) => {
        const {modalCombustionObj} = this.state;
        if (modalCombustionObj==null) {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Deposit " + val + " " + (modalCombustionObj.lpSymbol?modalCombustionObj.lpSymbol:'');
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
        dispatcher.dispatch({ type: BXHCombustionDeposit, content: {contractAddress: modalCombustionObj.contract_address, amount: val, msgContent: msgContent, lpToken: modalCombustionObj.lpToken}})
    }
    stakeReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshChanage();
            }
        }
    }
    //领取返回
    claimReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshChanage();
            }
        }
    }
    errorReturned = (error) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: -1 })
    };
    switch = (idx) => {
        this.setState({selectedIndex:idx});
    }
    openBurningDigModal = (obj) => {
        this.setState({modalObj:obj});
        this.setState({modalBurningDig:true});
    }
    //自己发起
    applyFor = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSepfwOoXR9EBAS8DM5LzBLQYXpaLXQpW7yiGgzDTnsYqWVjWg/viewform');
    }
    buyBXH = () => {
        // this.props.history.push('/swap');
        window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self')
    }
    getLPTokens = () => {
        this.props.history.push('/bxhTradeStake/'+1);
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    //banner点击
    bannerClick = (idx) => {
        const {bxh_ifm_banner} = this.state;
        if (bxh_ifm_banner&&bxh_ifm_banner.length>idx) {
            const obj = bxh_ifm_banner[idx];
            if(obj&&obj.click_url&&obj.click_url.length>0) {
                window.open(obj.click_url);
            }
        }
    }
    render() {
        const { classes, t } = this.props;
        const { isMobile, selectedIndex, modalBurningDig, pastList, modalUnlock, modalSend, modalCombustionStake, bxh_ifm_banner } = this.state;
        return (
            <div className={classes.root}>
                <Header />

                {
                    bxh_ifm_banner ?
                    (
                        <Carousel className={classes.banner} onClickItem={this.bannerClick} interval={5000} autoPlay={true} showThumbs={false} showIndicators={bxh_ifm_banner.length>1} showStatus={false} showArrows={false} infiniteLoop={true}>
                            {
                                bxh_ifm_banner.map((obj,idx)=>{
                                    return <img key={idx} src={isMobile?obj.img_h5:obj.img_web} />
                                })
                            }
                        </Carousel>
                    ):null
                }
                <div>
                    <div className={classes.titleContent}>
                        <div className={classes.title}>{t('BXH.combustionTitle')}</div>
                        <div className={classes.desc}>{t('BXH.combustionDesc')}</div>
                    </div>
                    <div className={classes.switch}>
                        <div className={classes.switchContent}>
                            <div onClick={()=>{this.switch(0)}} style={{backgroundColor:(selectedIndex==0?'#35C288':null)}}>Next</div>
                            {
                                pastList&&pastList.length>0 ?
                                (
                                    <div onClick={()=>{this.switch(1)}} style={{backgroundColor:(selectedIndex==1?'#35C288':null)}}>Past</div>
                                ):null
                            }
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    {
                        selectedIndex==0 ? this.renderNext() : this.renderPast()
                    }
                </div>
                { modalBurningDig && this.renderBurningDigModal() }
                { modalUnlock && this.renderUnlockWalletModal() }
                { modalSend && this.renderSendModal() }
                { modalCombustionStake && this.renderCombustionStakeModal() }

                {
                    isMobile ?
                    <Footer pagetype="combustion" />
                    :
                    null
                }
            </div>
        )
    }
    renderNext() {
        const { classes } = this.props;
        const { isMobile, nextList } = this.state;
        return (
            <div className={classes.next}>
                {
                    nextList&&nextList.length>0 ?
                    <div style={{gridTemplateColumns:!isMobile&&nextList&&nextList.length>1?'repeat(2, 1fr)':'1fr'}} className={classes.nextPastContent}>
                        {
                            nextList.map((obj,idx)=>{
                                return this.renderItem(obj,idx)
                            })
                        }
                    </div>
                    :null
                }
                {this.renderOverview()}
                <div className={classes.nextBottom}>
                    {
                        isMobile?
                        this.renderTheirLaunch()
                        :
                        this.renderHowParticipate()
                    }
                    {
                        isMobile?
                        this.renderHowParticipate()
                        :
                        this.renderTheirLaunch()
                    }
                </div>
            </div>
        )
    }
    renderPast() {
        const { classes } = this.props;
        const { isMobile, pastList } = this.state;
        if (!pastList||pastList.length==0) {
            return null;
        }
        return (
            <div style={{gridTemplateColumns:!isMobile&&pastList&&pastList.length>1?'repeat(2, 1fr)':'1fr'}} className={classes.nextPastContent}>
                {
                    pastList.map((obj,idx)=>{
                        return this.renderItem(obj,idx)
                    })
                }
            </div>
        )
    }
    //card
    renderItem(obj,idx) {
        const { classes, t } = this.props;
        const { address, selectedIndex } = this.state;
        const alloWance = obj.alloWance;
        return (
            <div className={classes.item} key={idx}>
                <img className={classes.itemBg} src={obj.project_back_url ? obj.project_back_url : ''} />
                <div className={classes.itemContent}>
                    <div className={classes.itemInfo}>
                        <div>
                            <div className={classes.itemTitle}>{obj.project_name}</div>
                            <div className={classes.itemDesc}>{obj.project_slogan}</div>
                        </div>
                        <img className={classes.itemIcon} src={obj.project_icon ? obj.project_icon : ''} />
                    </div>
                    {
                        address&&alloWance ?
                        <div className={classes.lpInfo}>
                            <div className={classes.lpInfoRow}>
                                <div className={classes.lpInfoItem}>
                                    <div>LP Tokens COMMITTED</div>
                                    <span>{obj.userInfo&&obj.userInfo.amount?SaveToTwoWei(obj.userInfo.amount):'--'}</span>
                                </div>
                                <div style={{marginLeft:'10px'}} className={classes.lpInfoItem}>
                                    <div>{obj.project_name} To Claim</div>
                                    <span>{obj.offeringTokenAmount?SaveToTwoWei(obj.offeringTokenAmount):'--'}</span>
                                </div>
                            </div>
                            <div className={classes.lpInfoClaim}><div>To Claim</div><span>{obj.refundingTokenAmount?SaveToTwoWei(obj.refundingTokenAmount):'--'}</span></div>
                            <div className={classes.lpInfoClaim}>
                                <div>Total raised (% of target)</div>
                                <span>{obj.totalRaised?SaveToTwoWei(obj.totalRaised)+'%':'--'}</span>
                            </div>
                        </div>
                        : null
                    }
                    { 
                        address ?
                        (
                            selectedIndex==0 ?
                            (
                                this.renderNextBtn(obj)
                            ):(
                                this.renderPastBtn(obj)
                            )
                        ):(
                            <div onClick={this.openUnlockModal} className={classes.btn}>Unlock Wallet</div>
                        )
                    }
                    <div className={classes.tip}>You'll be refunded any excess tokens when you claim</div>
                    <div onClick={()=>{this.openBurningDigModal(obj)}} className={classes.projectDetail}>{t('BXH.projectDetail')}</div>
                </div>
            </div>
        )
    }
    renderNextBtn(obj) {
        const { classes } = this.props;
        const { blockNumber } = this.state;
        const alloWance = obj.alloWance;
        return (
            <div>
                {
                    blockNumber&&obj.startBlock&&blockNumber>obj.startBlock ?
                    (
                        alloWance ?
                        (
                            <div onClick={()=>{this.stake(obj)}} className={classes.btn}>Stake</div>
                        ):(
                            <div onClick={()=>{this.approve(obj)}} className={classes.btn}>Approve</div>
                        )
                    ):(//暂未开始
                        <div className={classes.btnDisable}>Is about to begin</div>
                    )
                }
            </div>
        )
    }
    renderPastBtn(obj) {
        const { classes } = this.props;
        const alloWance = obj.alloWance;
        return (
            <div>
                {
                    (obj.userInfo&&obj.userInfo.refundClaimed!=undefined&&obj.userInfo.refundClaimed==false)&&((obj.offeringTokenAmount&&obj.offeringTokenAmount>0)||(obj.refundingTokenAmount&&obj.refundingTokenAmount>0)) ?
                    (
                        alloWance ?
                        (
                            <div onClick={()=>{this.claim(obj)}} className={classes.btn}>Claim</div>
                        ):(
                            <div onClick={()=>{this.approve(obj)}} className={classes.btn}>Approve</div>
                        )
                    ):(
                        <div className={classes.btnDisable}>Nothing to Claim</div>
                    )
                }
            </div>
        )
    }
    //概述
    renderOverview() {
        const { classes, t } = this.props;
        return (
            <div className={classes.overview}>
                <div className={classes.overviewTitle}>{t('BXH.bigBangTitle')}</div>
                <div className={classes.overviewContent}>
                    <div className={classes.overviewItem}>
                        <div className={classes.overviewSubtitle}>{t('BXH.overview')}</div>
                        <div className={classes.overviewDesc}>{t('BXH.bigBangOverviewDesc')}</div>
                    </div>
                    <div className={classes.overviewItem}>
                        <div className={classes.overviewSubtitle}>{t('BXH.bigBangDetailRules')}</div>
                        <div className={classes.overviewDesc}>
                            <span>{t('BXH.bigBangDetailRulesTitle1')}：</span>{t('BXH.bigBangDetailRulesDesc1')}<br/>
                            <span>{t('BXH.bigBangDetailRulesTitle2')}：</span>{t('BXH.bigBangDetailRulesDesc2')}<br/>
                            <span>{t('BXH.bigBangDetailRulesTitle3')}：</span>{t('BXH.bigBangDetailRulesDesc3')}<br/>
                            <span>{t('BXH.bigBangDetailRulesTitle4')}：</span>{t('BXH.bigBangDetailRulesDesc4')}<br/>
                            <span>{t('BXH.bigBangDetailRulesTitle5')}：</span>{t('BXH.bigBangDetailRulesDesc5')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //自己发起
    renderTheirLaunch() {
        const { classes, t } = this.props;
        return (
            <div className={classes.theirLaunch}>
                <div className={classes.theirLaunchTitle}>{t('BXH.wantToStartMyOwn')}</div>
                <div className={classes.theirLaunchDesc}>{t('BXH.wantToStartMyOwnDesc')}</div>
                <div onClick={this.applyFor} className={classes.theirLaunchApply}>{t('BXH.applyFor')}</div>
            </div>
        )
    }
    //如何参与
    renderHowParticipate() {
        const { classes, t } = this.props;
        return (
            <div className={classes.howParticipate}>
                <div className={classes.howParticipateTitle}>{t('BXH.howToParticipate')}</div>
                <div className={classes.howParticipateSubtitle}>
                    <div className={classes.gradientBg}></div>
                    {t('BXH.beforeSale')}
                </div>
                <div className={classes.howParticipateDesc}>
                    {t('BXH.beforeSaleDesc1')}<br/>
                    {t('BXH.beforeSaleDesc2')}
                </div>
                <div className={classes.howParticipateBtn}>
                    <div onClick={this.buyBXH}>Buy BXH</div>
                    {/* <div onClick={this.getLPTokens} style={{marginLeft:'20px'}}>Get LP tokens</div> */}
                </div>
                <div className={classes.howParticipateSubtitle}>
                    <div className={classes.gradientBg}></div>
                    {t('BXH.sellingPeriod')}
                </div>
                <div className={classes.howParticipateDesc}>
                    {t('BXH.sellingPeriodDesc')}
                </div>
                <div className={classes.howParticipateSubtitle}>
                    <div className={classes.gradientBg}></div>
                    {t('BXH.afterSale')}
                </div>
                <div className={classes.howParticipateDesc}>
                    {t('BXH.afterSaleDesc1')}<br/>
                    {t('BXH.afterSaleDesc2')}
                </div>
            </div>
        )
    }
    renderBurningDigModal = () => {
        const modalObj = this.state.modalObj;
        return (
            <BurningDigDialog obj={modalObj} onClose={ ()=>{this.setState({ modalBurningDig: false })}} />
        )
    }
    renderCombustionStakeModal = () => {
        const {modalCombustionObj} = this.state;
        return (
            <CombustionStakeDialog onSure={this.onSureStake} onClose={ ()=>{this.setState({modalCombustionStake: false})} } type={0} obj={modalCombustionObj}/>
        )
    }
    renderSendModal = () => {
        const { modalSendType, msgContent, txHash} = this.state
        return (
            <SendDialog onClose={ this.onCloseSend } type={modalSendType} symbolContent={msgContent} txHash={txHash}/>
        )
    }
    onCloseSend = () => {
        this.setState({ modalSend: false })
    }
    renderUnlockWalletModal = () => {
        return (
          <UnlockModal closeModal={ this.closeUnlockModal } modalOpen={ this.state.modalUnlock } />
        )
    }
    openUnlockModal = () => {
        this.setState({modalUnlock: true})
    }
    closeUnlockModal = () => {
        this.setState({modalUnlock: false})
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(Combustion)));