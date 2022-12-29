import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import Store from "../../stores/store";
import UnlockModal from '../unlock/unlockModal.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import StarPlanDialog from '../starPlanDialog/starPlanDialog';
import { SaveToTwoWei } from '../../config/constantFunction';
import moment from 'moment';

import {
    ERROR,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
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
            padding: '120px 0 50px',
            maxWidth: '1100px',
            minWidth: '1000px',
            paddingLeft:'260px',
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
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '35px',
        },
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
    gradientBg: {
        width: '65px',
        height: '26px',
        position: 'absolute',
        left: '0px',
        backgroundImage: 'linear-gradient(to right, #30BE85, #1D1F36)',
        opacity: '0.2',
        borderRadius: '2px',
    },
    headerBgSingle: {
        position: 'relative',
        height: '135px',
        '& img': {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
        },
    },
    headerBg: {
        position: 'relative',
        height: '95px',
        '& img': {
            objectFit: 'cover',
            width: '100%',
            height: '95px',
        },
    },
    headerBgContentSingle: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 25px',
        width: '100%',
        top: '15px',
        alignItems: 'center',
    },
    headerBgTitleSingle: {
        color: '#4AE47B',
        fontWeight: 'bolder',
        fontSize: '48px',
    },
    headerBgDescSingle: {
        display: 'inline-block',
        fontWeight: 'bolder',
        textAlign: 'center',
        padding: '0 20px',
        backgroundColor: '#31BE86',
        height: '35px',
        lineHeight: '35px',
        fontSize: '18px',
        borderRadius: '6px',
    },
    headerBgStatusSingle: {
        position: 'absolute',
        right: '0',
        top: '0',
        textAlign: 'center',
        color: '#141525',
        backgroundColor: '#4AE47B',
        borderRadius: '0 12px',
        fontWeight: 'bold',
        paddingLeft: '30px',
        paddingRight: '20px',
        height: '36px',
        lineHeight: '36px',
        fontSize: '24px',
    },
    headerBgContent: {
        position: 'absolute',
        top: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0 25px',
        width: '100%',
    },
    headerBgTitle: {
        color: '#4AE47B',
        fontSize: '32px',
        fontWeight: 'bolder',
    },
    headerBgDesc: {
        display: 'inline-block',
        fontSize: '14px',
        fontWeight: 'bolder',
        textAlign: 'center',
        padding: '0 15px',
        height: '25px',
        lineHeight: '25px',
        backgroundColor: '#31BE86',
        borderRadius: '6px',
    },
    headerBgStatus: {
        position: 'absolute',
        right: '0',
        top: '0',
        paddingLeft: '20px',
        paddingRight: '15px',
        height: '25px',
        lineHeight: '25px',
        textAlign: 'center',
        color: '#141525',
        backgroundColor: '#4AE47B',
        borderRadius: '0 12px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    contentCardSingle: {
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'rgba(38,41,70,0.8)',
        paddingBottom: '25px',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '50px',
        },
    },
    contentCard: {
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'rgba(38,41,70,0.8)',
        paddingBottom: '25px',
        color: '#FFFFFF',
    },
    recruitmentCardContentSingle: {
        margin: '25px',
        [theme.breakpoints.up('sm')]: {
            margin: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    recruitmentCardContent: {
        margin: '25px',
        [theme.breakpoints.up('sm')]: {
            margin: '50px 25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    recruitmentCardProjectDesc: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
        },
    },
    recruitmentCardTitle: {
        fontSize: '18px',
        fontWeight: 'bolder',
        marginTop: '22px',
    },
    recruitmentCardDesc: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        marginTop: '15px',
    },
    recruitmentCardApplicationDeadline: {
        fontSize: '12px',
        fontWeight: 'bolder',
        marginTop: '10px',
    },
    cardBtnSingle: {
        margin: '0 20px',
        maxWidth: '430px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
        },
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    cardBtn: {
        margin: '0 20px',
        maxWidth: '430px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            margin: '0 20px',
        },
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    cardNoMaxBtn: {
        margin: '0 20px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    next: {
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '25px',
        },
    },
    inProgressCardProjectDesc: {
        margin: '25px 25px 0',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            marginTop: '50px',
            color: '#FFF',
        },
    },
    inProgressCardSingleAmount: {
        margin: '18px 20px 25px',
        backgroundColor: 'rgba(28, 31, 57, 0.95)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        [theme.breakpoints.up('sm')]: {
            height: '120px',
            margin: '25px 100px 35px',
        },
    },
    inProgressCardSingleAmountItem: {
        width: '50%',
        marginLeft: '20px',
        '& div': {
            fontSize: '10px',
            fontWeight: 'bolder',
            color: 'rgba(255, 255, 255, 0.6)',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '8px',
            },
        },
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '50px',
        },
    },
    inProgressCardAmount: {
        margin: '18px 20px 25px',
        backgroundColor: 'rgba(28, 31, 57, 0.95)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        [theme.breakpoints.up('sm')]: {
            height: '105px',
            margin: '30px 20px 40px',
        },
    },
    inProgressCardAmountItem: {
        width: '50%',
        marginLeft: '20px',
        '& div': {
            fontSize: '10px',
            fontWeight: 'bolder',
            color: 'rgba(255, 255, 255, 0.6)',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '8px',
            },
        },
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '30px',
        },
    },
    inProgressCardTip: {
        margin: '15px 25px 0',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            marginTop: '20px',
            color: '#FFF',
        },
    },
    //往期
    past: {
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '25px',
        },
    },
    pastCardProjectDesc: {
        margin: '25px 25px 0',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.8)',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            marginTop: '30px',
            color: '#FFF',
        },
    },
    pastCardSingleAmount: {
        margin: '18px 20px 25px',
        backgroundColor: 'rgba(28, 31, 57, 0.95)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        [theme.breakpoints.up('sm')]: {
            height: '120px',
            margin: '25px 100px 35px',
        },
    },
    pastCardSingleAmountItem: {
        width: '50%',
        marginLeft: '20px',
        '& div': {
            fontSize: '10px',
            fontWeight: 'bolder',
            color: 'rgba(255, 255, 255, 0.6)',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '8px',
            },
        },
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: '30px',
        },
    },
    pastCardAmount: {
        margin: '18px 20px 25px',
        backgroundColor: 'rgba(28, 31, 57, 0.95)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        [theme.breakpoints.up('sm')]: {
            height: '105px',
            margin: '30px 18px 40px',
        },
    },
    pastCardAmountItem: {
        width: '50%',
        marginLeft: '20px',
        '& div': {
            fontSize: '10px',
            fontWeight: 'bolder',
            color: 'rgba(255, 255, 255, 0.6)',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '8px',
            },
        },
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
        },
    },
    pastCardTip: {
        margin: '15px 25px 0',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '500',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            marginTop: '20px',
            color: '#FFF',
        },
    },
    //加入
    joinStarPlan: {
        marginTop: '35px',
        padding: '0 10px 15px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '70px',
            textAlign: 'center',
            padding: '0 150px 30px',
        },
    },
    joinStarPlanTitle: {
        fontSize: '19px',
        fontWeight: 'bolder',
        [theme.breakpoints.up('sm')]: {
            fontSize: '21px',
        },
    },
    joinStarPlanDesc: {
        marginTop: '12px',
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        fontSize: '13px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '35px',
            fontSize: '15px',
        },
    },
    joinStarPlanApplicationDeadline: {
        marginTop: '15px',
        fontWeight: '500',
        fontSize: '13px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '28px',
            fontSize: '15px',
        },
    },
    joinStarPlanBtn: {
        marginTop: '20px',
        maxWidth: '155px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        fontSize: '15px',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '230px',
            margin: 'auto',
            marginTop: '25px',
        },
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
    planRules: {
        margin: '35px 10px',
    },
    planRulesTitle: {
        fontSize: '19px',
        fontWeight: 'bolder',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
        },
    },
    planRulesLine: {
        width: '100%',
        marginTop: '5px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        },
    },
    planRulesContent: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '35px',
        marginTop: '26px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '110px',
            marginTop: '30px',
        },
    },
    planRulesItem: {
        marginTop: '6px',
    },
    planRulesContentSubtitle: {
        paddingLeft: '10px',
        height: '26px',
        lineHeight: '26px',
        fontSize: '14px',
        fontWeight: 'bolder',
        position: 'relative',
    },
    planRulesContentDesc: {
        margin: '15px 10px 0',
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
        fontSize: '13px',
    },
});

class StarPlan extends Component {
    constructor(props) {
        super()
        this.state = {
            selectedIndex: 0,
            address: null,
            modalUnlock: false,
            modalStarPlan: false,
            modalObj: null,
            modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
            modalSend: false,
            msgContent: "",
            txHash: "",
            isMobile: false,
            nextList: null,
            pastList: null,
            recruitmentList: null,//招募中
        }
    }
    componentWillMount() {
        emitter.on(ERROR, this.errorReturned);
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }
    componentWillUnmount() {
        emitter.removeListener(ERROR, this.errorReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        window.removeEventListener('resize', this.handleResize)
    }
    componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.refreshAccount();
    }
    errorReturned = (error) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: -1 })
    };
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
    loadData() {
        const that = this;
        store.getBXHStar((data)=>{
            if(data&&data.bxh_stat){
                let nextList = [];
                let pastList = [];
                let recruitmentList = [];
                data.bxh_stat.map((obj,idx)=>{
                    if(obj.step_status==3){
                        pastList.push(obj);
                    }else if(obj.step_status==1){
                        if(data.bxh_stat.length==1){
                            nextList.push(obj);
                        }else{
                            recruitmentList.push(obj);
                        }
                    }else if(obj.step_status==2){
                        nextList.push(obj);
                    }
                });
                that.setState({nextList:nextList,pastList:pastList,recruitmentList:recruitmentList});
            }
        });
    }
    vote = (obj) => {
        this.props.history.push('/starPlanList/'+obj.step);
    }
    toView = (obj) => {
        this.props.history.push('/starPlanList/'+obj.step);
    }
    //我要加入
    wantJoin = () => {
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSemL8y01LimB309zh0l2EtMaaay09sYONDxTWEQR7DeaAlE2Q/viewform');
    }
    switch = (idx) => {
        this.setState({selectedIndex:idx});
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    render() {
        const { classes, t } = this.props;
        const { isMobile, selectedIndex, modalUnlock, modalSend, pastList } = this.state;
        return (
            <div className={classes.root}>
                <Header />

                <div>
                    <div className={classes.titleContent}>
                        <div className={classes.title}>{t('BXH.bxhStarPlan')}</div>
                        <div className={classes.desc}>{t('BXH.starPlanDesc')}</div>
                    </div>
                    {
                        pastList&&pastList.length>0?
                        <div className={classes.switch}>
                            <div className={classes.switchContent}>
                                <div onClick={()=>{this.switch(0)}} style={{backgroundColor:(selectedIndex==0?'#35C288':null)}}>{t('BXH.ongoing')}</div>
                                <div onClick={()=>{this.switch(1)}} style={{backgroundColor:(selectedIndex==1?'#35C288':null)}}>{t('BXH.past')}</div>
                            </div>
                        </div>
                        :null
                    }
                </div>
                {
                    selectedIndex==0?
                    (
                        <div className={classes.content}>
                            {this.renderList()}
                            {this.renderPlanRules()}
                        </div>
                    ):(
                        <div className={classes.content}>
                            {this.renderPast()}
                        </div>
                    )
                }
                { modalUnlock && this.renderUnlockWalletModal() }
                { modalSend && this.renderSendModal() }
            </div>
        )
    }
    renderList = () => {
        const { classes, t } = this.props;
        const { isMobile, nextList, recruitmentList } = this.state;
        if (!nextList||nextList.length==0) {
            return null;
        }
        return (
            <div>
                <div className={classes.next} style={{gridTemplateColumns:!isMobile&&nextList&&nextList.length>1?'repeat(2, 1fr)':'1fr'}}>
                    {
                        nextList.map((obj,idx)=>{
                            if(obj.step_status==1){
                                if(nextList.length==1){
                                    return this.renderSingleInTheRecruitmentCard(obj,idx)
                                }
                                // return this.renderInTheRecruitmentCard(obj,idx)
                                return null
                            }else{
                                if(nextList.length==1){
                                    return this.renderSingleInProgress(obj,idx)
                                }
                                return this.renderInProgress(obj,idx)
                            }
                        })
                    }
                </div>
                {
                    recruitmentList&&recruitmentList.length>=1?
                    (
                        this.renderJoinStarPlan(recruitmentList[0])
                    )
                    :null
                }
            </div>
        );
    }
    //顶部背景图
    renderHaderBg = (obj,showPc) => {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        return (
            <div className={showPc&&!isMobile?classes.headerBgSingle:classes.headerBg}>
                <img src={showPc&&!isMobile?'https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/zaoxing-top.png':'https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/zaoxing-top-h5.png'} />
                <div className={showPc&&!isMobile?classes.headerBgContentSingle:classes.headerBgContent}>
                    <div className={showPc&&!isMobile?classes.headerBgTitleSingle:classes.headerBgTitle}>{t('BXH.starPlan')}</div>
                    <div className={showPc&&!isMobile?classes.headerBgDescSingle:classes.headerBgDesc}>No.{obj.step}</div>
                </div>
                {
                    obj.step_status==1?
                    <div className={showPc&&!isMobile?classes.headerBgStatusSingle:classes.headerBgStatus}>{t('BXH.recruiting')}</div>
                    :null
                }
            </div>
        )
    }
    //招募中
    renderSingleInTheRecruitmentCard = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCardSingle} key={idx}>
                {this.renderHaderBg(obj,true)}
                <div className={classes.recruitmentCardContentSingle}>
                    <div className={classes.recruitmentCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                    <div className={classes.recruitmentCardTitle}>{t('BXH.joinStarPlan')}</div>
                    <div className={classes.recruitmentCardDesc}>{t('BXH.joinStarPlanDesc1')}</div>
                    <div className={classes.recruitmentCardApplicationDeadline}>{t('BXH.applicationDeadline')}：{moment(obj.apply_end*1000).format('YYYY/MM/DD')}</div>
                </div>
                <div onClick={this.wantJoin} className={classes.cardBtnSingle}>{t('BXH.iWantJoin')}</div>
            </div>
        )
    }
    //招募中
    renderInTheRecruitmentCard = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCard} key={idx}>
                {this.renderHaderBg(obj)}
                <div className={classes.recruitmentCardContent}>
                    <div className={classes.recruitmentCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                    <div className={classes.recruitmentCardTitle}>{t('BXH.joinStarPlan')}</div>
                    <div className={classes.recruitmentCardDesc}>{t('BXH.joinStarPlanDesc2')}</div>
                    <div className={classes.recruitmentCardApplicationDeadline}>{t('BXH.applicationDeadline')}：{moment(obj.apply_end*1000).format('YYYY/MM/DD')}</div>
                </div>
                <div onClick={this.wantJoin} className={classes.cardBtn}>{t('BXH.iWantJoin')}</div>
            </div>
        )
    }
    //进行中
    renderSingleInProgress = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCardSingle} key={idx}>
                {this.renderHaderBg(obj,true)}
                <div className={classes.inProgressCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                <div className={classes.inProgressCardSingleAmount}>
                    <div className={classes.inProgressCardSingleAmountItem}>
                        <div>Items Amount</div>
                        <span>{obj.star_count}</span>
                    </div>
                    <div style={{width:'2px',height:'60%',backgroundImage:'linear-gradient(to bottom,rgba(86,92,136,0),rgba(43,47,80,1),rgba(82,88,131,0))'}}></div>
                    <div className={classes.inProgressCardSingleAmountItem}>
                        <div>BXH Tokens To Stake</div>
                        <span>0</span>
                    </div>
                </div>
                <div onClick={()=>{this.vote(obj)}} className={classes.cardBtnSingle}>Vote</div>
                <div className={classes.inProgressCardTip}>{t('BXH.starPlanVoteTip')}</div>
            </div>
        )
    }
    //进行中
    renderInProgress = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCard} key={idx}>
                {this.renderHaderBg(obj)}
                <div className={classes.inProgressCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                <div className={classes.inProgressCardAmount}>
                    <div className={classes.inProgressCardAmountItem}>
                        <div>Items Amount</div>
                        <span>{obj.star_count}</span>
                    </div>
                    <div style={{width:'2px',height:'60%',backgroundImage:'linear-gradient(to bottom,rgba(86,92,136,0),rgba(43,47,80,1),rgba(82,88,131,0))'}}></div>
                    <div className={classes.inProgressCardAmountItem}>
                        <div>BXH Tokens To Stake</div>
                        <span>0</span>
                    </div>
                </div>
                <div onClick={()=>{this.vote(obj)}} className={classes.cardBtn}>Vote</div>
                <div className={classes.inProgressCardTip}>{t('BXH.starPlanVoteTip')}</div>
            </div>
        )
    }
    renderPast = () => {
        const { classes, t } = this.props;
        const { isMobile, pastList } = this.state;
        return (
            <div style={{gridTemplateColumns:!isMobile&&pastList&&pastList.length>1?'repeat(2, 1fr)':'1fr'}} className={classes.past}>
                {
                    pastList.map((obj,idx)=>{
                        if (pastList.length==1) {
                            return this.renderSinglePastItem(obj,idx);
                        }
                        return this.renderPastItem(obj,idx)
                    })
                }
            </div>
        )
    }
    renderSinglePastItem = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCardSingle} key={idx}>
                {this.renderHaderBg(obj,true)}
                <div className={classes.pastCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                <div className={classes.pastCardSingleAmount}>
                    <div className={classes.pastCardSingleAmountItem}>
                        <div>Items Amount</div>
                        <span>{obj.star_count}</span>
                    </div>
                    <div style={{width:'2px',height:'60%',backgroundImage:'linear-gradient(to bottom,rgba(86,92,136,0),rgba(43,47,80,1),rgba(82,88,131,0))'}}></div>
                    <div className={classes.pastCardSingleAmountItem}>
                        <div>BXH Tokens To Stake</div>
                        <span>0</span>
                    </div>
                </div>
                <div onClick={()=>{this.toView(obj)}} className={classes.cardNoMaxBtn}>{t('BXH.toView')}</div>
                <div className={classes.pastCardTip}>{t('BXH.starPlanVoteTip')}</div>
            </div>
        )
    }
    renderPastItem = (obj,idx) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.contentCard} key={idx}>
                {this.renderHaderBg(obj)}
                <div className={classes.pastCardProjectDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                <div className={classes.pastCardAmount}>
                    <div className={classes.pastCardAmountItem}>
                        <div>Items Amount</div>
                        <span>{obj.star_count}</span>
                    </div>
                    <div style={{width:'2px',height:'60%',backgroundImage:'linear-gradient(to bottom,rgba(86,92,136,0),rgba(43,47,80,1),rgba(82,88,131,0))'}}></div>
                    <div className={classes.pastCardAmountItem}>
                        <div>BXH Tokens To Stake</div>
                        <span>0</span>
                    </div>
                </div>
                <div onClick={()=>{this.toView(obj)}} className={classes.cardNoMaxBtn}>{t('BXH.toView')}</div>
                <div className={classes.pastCardTip}>{t('BXH.starPlanVoteTip')}</div>
            </div>
        )
    }
    //加入造星计划
    renderJoinStarPlan = (obj) => {
        const { classes, t } = this.props;
        return (
            <div className={classes.joinStarPlan}>
                <div className={classes.joinStarPlanTitle}>{t('BXH.joinStarPlan')}</div>
                <div className={classes.joinStarPlanDesc}>{t('BXH.joinStarPlanDesc2')}</div>
                <div className={classes.joinStarPlanApplicationDeadline}>{t('BXH.applicationDeadline')}：{moment(obj.apply_end*1000).format('YYYY/MM/DD')}</div>
                <div onClick={this.wantJoin} className={classes.joinStarPlanBtn}>{t('BXH.iWantJoin')}</div>
            </div>
        )
    }
    //计划规则
    renderPlanRules = () => {
        const { classes, t } = this.props;
        return (
            <div className={classes.planRules}>
                <div className={classes.planRulesTitle}>{t('BXH.starPlanRules')}</div>
                <img className={classes.planRulesLine} src={require('../../assets/bxh/starPlan_line.png')} />
                <div className={classes.planRulesContent}>
                    <div className={classes.planRulesItem}>
                        <div className={classes.planRulesContentSubtitle}>
                            <div className={classes.gradientBg}></div>
                            {t('BXH.participateProjects')}
                        </div>
                        <div className={classes.planRulesContentDesc}>
                            {t('BXH.participateProjectsDesc1')}<br/>
                            {t('BXH.participateProjectsDesc2')}
                        </div>
                        <div style={{marginTop:'20px'}} className={classes.planRulesContentSubtitle}>
                            <div className={classes.gradientBg}></div>
                            {t('BXH.projectVote')}
                        </div>
                        <div className={classes.planRulesContentDesc}>
                            {t('BXH.projectVoteDesc')}
                        </div>
                    </div>
                    <div className={classes.planRulesItem}>
                        <div className={classes.planRulesContentSubtitle}>
                            <div className={classes.gradientBg}></div>
                            {t('BXH.optimizingProject')}
                        </div>
                        <div className={classes.planRulesContentDesc}>
                            {t('BXH.optimizingProjectDesc1')}<br/><br/>
                            {t('BXH.optimizingProjectDesc2')}<br/><br/>
                            {t('BXH.optimizingProjectDesc3')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderModal = () => {
        const { modalStarPlan, modalObj } = this.state;
        return (
            <StarPlanDialog onClose={()=>{this.setState({modalStarPlan:false})}} obj={modalObj} />
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

export default withNamespaces()(withRouter(withStyles(styles)(StarPlan)));