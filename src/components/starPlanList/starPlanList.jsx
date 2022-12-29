import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    TextField,
} from '@material-ui/core';
import Header from '../unlock/Header.jsx';
import Store from "../../stores/store";
import UnlockModal from '../unlock/unlockModal.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import StarPlanDialog from '../starPlanDialog/starPlanDialog';
import StarPlanVoteDialog from '../starPlanVoteDialog/starPlanVoteDialog.jsx';
import { SaveToTwoWei } from '../../config/constantFunction';

import {
    ERROR,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    BXHStarPlanApprove,
    BXHStarPlanApprove_RETURNED,
    BXHStarPlanVote,
    BXHStarPlanVote_RETURNED,
    BXHStarPlanWithdraw,
    BXHStarPlanWithdraw_RETURNED,
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
        paddingBottom: '10px',
        [theme.breakpoints.up('sm')]: {
            padding: '120px 0 50px',
            maxWidth: '1100px',
            minWidth: '1000px',
            paddingLeft:'260px',
        }
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bolder',
        textAlign: 'center',
    },
    period: {
        marginTop: '15px',
        padding: '0 16px',
        height: '32px',
        lineHeight: '32px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
        fontSize: '20px',
        fontWeight: 'bold',
        borderRadius: '6px',
    },
    desc: {
        fontSize: '15px',
        marginTop: '35px',
        fontSize: '15px',
        textAlign: 'center',
        color: '#FFF',
    },
    subTitle: {
        fontSize: '17px',
        fontWeight: 'bolder',
        marginTop: '0',
        [theme.breakpoints.up('sm')]: {
            fontSize: '26px',
            marginTop: '55px',
        }
    },
    line: {
        width: '100%',
        marginTop: '30px',
    },
    searchRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '17px',
        marginLeft: '15px',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            marginTop: '20px',
            marginLeft: '0',
        }
    },
    search: {
        width: '150px',
        height: '30px',
        borderRadius: '15px',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#22253F',
        '& img': {
            width: '12px',
            height: '12px',
        },
    },
    searchTF: {
        height: '100%',
        marginLeft: '5px',
        '& input': {
            fontSize: '12px',
            height: '30px',
            lineHeight: '20px',
            padding: '0px 6px',
        }
    },
    mobileHeader: {
        padding: '0 15px',
        position: 'relative',
    },
    mobileHeaderBg: {
        height: '80px',
        '& img': {
            width: '100%',
            height: '80px',
        }, 
    },
    mobileHeaderBgContent: {
        position: 'absolute',
        left: '40px',
        top: '0',
        right: '10px',
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    mobileHeaderBgTitle: {
        color: '#4AE47B',
        fontWeight: 'bolder',
        fontSize: '20px',
    },
    mobileHeaderBgStep: {
        color: '#000',
        backgroundColor: '#4AE47B',
        height: '16px',
        lineHeight: '16px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '0 8px',
        marginLeft: '5px',
    },
    mobileHeaderBgDesc: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '12px',
    },
    content: {
        margin: '15px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px',
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            margin: '25px 0',
        },
    },
    item: {
        backgroundColor: 'rgba(32, 35, 60, 0.6)',
        borderRadius: '12px',
        position: 'relative',
        padding: '25px 20px 20px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
        },
    },
    rank: {
        position: 'absolute',
        top: '0',
        right: '0',
        backgroundColor: 'rgba(48, 190, 134, 0.1)',
        borderRadius: '0 12px',
        width: '80px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        }
    },
    itemHeader: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '17px',
        '& img': {
            width: '35px',
            height: '35px',
        },
        '& span': {
            marginLeft: '8px',
        },
    },
    itemContent: {
        marginTop: '16px',
        backgroundColor: 'rgba(28, 31, 57, 0.95)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: 'transparent',
        },
    },
    itemContentItem: {
        width: '50%',
        marginLeft: '20px',
        '& div': {
            fontSize: '10px',
            fontWeight: 'bolder',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2px',
            [theme.breakpoints.up('sm')]: {
                marginBottom: '5px',
            },
        },
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
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
    btn: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        margin: '20px 0',
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
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        },
    },
    btnDisable: {
        background: '#4A4C5E',
        margin: '20px 0',
        height: '45px',
        lineHeight: '45px',
        borderRadius: '6px',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'no-drop',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        },
    },
});

class StarPlan extends Component {
    constructor(props) {
        super()
        this.state = {
            step: null,
            address: null,
            modalUnlock: false,
            modalStarPlan: false,
            modalObj: null,
            modalVote: false,
            searchVal: null,
            modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
            modalSend: false,
            msgContent: "",
            txHash: "",
            isMobile: false,
            bxh_star_projects: null,
            searchList: null,
            bxhBalance: "0",
            bxhAsset: null,//BXH
        }
    }
    componentWillMount() {
        emitter.on(ERROR, this.errorReturned);
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.on(BXHStarPlanApprove_RETURNED, this.approveReturn);
        emitter.on(BXHStarPlanVote_RETURNED, this.voteReturn);
        emitter.on(BXHStarPlanWithdraw_RETURNED, this.claimReturn);
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        const { match:{params:{ step }}} = this.props;
        this.setState({step:step});
    }
    componentWillUnmount() {
        emitter.removeListener(ERROR, this.errorReturned);
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.removeListener(BXHStarPlanApprove_RETURNED, this.approveReturn);
        emitter.removeListener(BXHStarPlanVote_RETURNED, this.voteReturn);
        emitter.removeListener(BXHStarPlanWithdraw_RETURNED, this.claimReturn);
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
        const step = this.state.step;
        if(step==undefined||step==null){
            return;
        }
        const that = this;
        store.getBXHStarProjects(step,(data)=>{
            if(that.setState&&data){
                that.setState({bxh_star_projects:data.bxh_star_projects});
                that.refreshAllAlloWance();
            }
        });
        store._getBXHInfo((data) => {
            if(data&&data.token_list){
                let bxhAsset = that.initBXHAsset(data.token_list, "BXH");
                bxhAsset.logoURI = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/BXH.png";
                that.setState({ bxhAsset: bxhAsset });
                that.refreshAllAlloWance();
                that.refreshBXHBalance();
            }
        });
    }
    //赋值BXH
    initBXHAsset = (tokenList, name) => {
        for (let i = 0; i < tokenList.length; i++) {
            var item = tokenList[i];
            if (item.symbol === name) {
                return item
            }
        }
        return null;
    }
    //刷新bxh余额
    refreshBXHBalance = () => {
        const that = this;
        store.getDaoBXHBalance(this.state.bxhAsset, (err, balance) => {
            if (err == null) {
                that.setState({ bxhBalance: balance });
            }
        })
    }
    //刷新所有item信息
    refreshAllItemData() {
        const bxh_star_projects = this.state.bxh_star_projects;
        if(bxh_star_projects){
            bxh_star_projects.map((obj)=>{
                
            });
        }
    }
    refreshAllAlloWance() {
        const bxh_star_projects = this.state.bxh_star_projects;
        if(bxh_star_projects){
            bxh_star_projects.map((obj)=>{
                this.loadAlloWance(obj);
            });
        }
    }
    //加载是否授权
    loadAlloWance(obj) {
        const bxhAsset = this.state.bxhAsset;
        if(!obj.contract_address||!bxhAsset.token_address||obj.contract_address==''||bxhAsset.token_address==''){
            return;
        }
        const that = this;
        store.getStarPlanAlloWance(obj.contract_address, bxhAsset.token_address,(err,alloWance)=>{
            if(err==null){
                obj.alloWance = alloWance;
                that.setState({});
            }
        });
    }
    //授权
    approve = (obj) => {
        if (this.state.address==null) {
            this.openUnlockModal();
            return;
        }
        const bxhAsset = this.state.bxhAsset;
        if(!obj.contract_address||!bxhAsset.token_address||obj.contract_address==''||bxhAsset.token_address==''){
            return;
        }
        console.log('--=====');
        this.setState({ modalSend: false })
        const msgContent = "Approve " + (bxhAsset.symbol?bxhAsset.symbol:'');
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
        dispatcher.dispatch({ type: BXHStarPlanApprove, content: { contractAddress: obj.contract_address, lpToken: bxhAsset.token_address, msgContent: msgContent} })
    }
    //授权返回
    approveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshAllAlloWance();
            }
        }
    }
    //Vote或领取
    voteClaim = (obj) => {
        this.setState({modalObj:obj});
        if (obj.offeringTokenAmount&&obj.offeringTokenAmount>0) {//领取
            this.setState({ modalSend: false })
            const msgContent = "Claim " + (obj.project_name?obj.project_name:'');
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
            dispatcher.dispatch({ type: BXHStarPlanWithdraw, content: {contractAddress: obj.contract_address, msgContent: msgContent}});
        }else{
            this.setState({modalVote: true});
        }
    }
    //Vote输入数量
    onSureVote = (val) => {
        const {modalObj} = this.state;
        if (modalObj==null) {
            return;
        }
        const bxhAsset = this.state.bxhAsset;
        if(!modalObj.contract_address||!bxhAsset.token_address||modalObj.contract_address==''||bxhAsset.token_address==''){
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Vote " + val + " " + (bxhAsset.symbol?bxhAsset.symbol:'');
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent})
        dispatcher.dispatch({ type: BXHStarPlanVote, content: {contractAddress: modalObj.contract_address, amount: val, msgContent: msgContent, lpToken: bxhAsset.token_address}})
    }
    voteReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshAllItemData();
                this.refreshBXHBalance();
            }
        }
    }
    //领取返回
    claimReturn = (data) => {
        const {modalObj} = this.state;
        this.setState({ modalSend: false })
        if (data) {
            if(!data.isHideDialog){
                this.setState({ 
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            }else{
                this.refreshAllItemData();
                this.refreshBXHBalance();
            }
        }
    }
    openStarPlanModal = (obj) => {
        this.setState({modalObj:obj});
        this.setState({modalStarPlan:true});
    }
    onChangeTo = (value, event) => {
        var val = event.target.value;
        this.setState({searchVal:val});
        const bxh_star_projects = this.state.bxh_star_projects;
        if(bxh_star_projects&&val!=null&&val!=undefined) {
            let searchList = [];
            bxh_star_projects.map((obj)=>{
                if(obj.project_name.toUpperCase().includes(val.toUpperCase())){
                    searchList.push(obj);
                }
            });
            this.setState({searchList:searchList});
        }else{
            this.setState({searchList:null});
        }
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    render() {
        const { classes, t } = this.props;
        const { isMobile, modalUnlock, modalSend, modalStarPlan, modalVote, bxh_star_projects, searchList } = this.state;
        return (
            <div className={classes.root}>
                <Header />

                {
                    isMobile ?
                    this.renderMobileHeader()
                    :
                    this.renderHeader()
                }
                {
                    searchList?
                    (
                        this.renderList(searchList)
                    ):(
                        this.renderList(bxh_star_projects)
                    )
                }
                { modalStarPlan && this.renderModal() }
                { modalUnlock && this.renderUnlockWalletModal() }
                { modalSend && this.renderSendModal() }
                { modalVote && this.renderVoteModal() }
            </div>
        )
    }
    renderHeader = () => {
        const { classes, t } = this.props;
        const { searchVal, step } = this.state;
        return (
            <div className={classes.header}>
                <div className={classes.title}>{t('BXH.bxhStarPlan')}</div>
                <span className={classes.period}>No.{step}</span>
                <div className={classes.desc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                <div className={classes.subTitle}>{t('BXH.optimizingProject')}</div>
                <img className={classes.line} src={require('../../assets/bxh/starPlan_line.png')} />
                <div className={classes.searchRow}>
                    <div></div>
                    <div className={classes.search}>
                        <img src={require('../../assets/bxh/search.png')} />
                        <TextField
                            className={classes.searchTF}
                            fullWidth
                            id={ '' }
                            value={ searchVal || '' }
                            onChange={ this.onChangeTo.bind(this,'') }
                            placeholder={t('BXH.searchtitle')}
                            variant="outlined"
                            inputProps={{
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
    renderMobileHeader = () => {
        const { classes, t } = this.props;
        const { searchVal, step } = this.state;
        return (
            <div className={classes.mobileHeader}>
                <div className={classes.mobileHeaderBg}>
                    <img src={'https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/zaoxing-top-h5.png'} />
                    <div className={classes.mobileHeaderBgContent}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div className={classes.mobileHeaderBgTitle}>{t('BXH.starPlan')}</div>
                            <div className={classes.mobileHeaderBgStep}>No.{step}</div>
                        </div>
                        <div className={classes.mobileHeaderBgDesc}>{t('BXH.starPlanSubTitle1')}<br/>{t('BXH.starPlanSubTitle2')}</div>
                    </div>
                </div>
                <div className={classes.searchRow}>
                    <div className={classes.subTitle}>{t('BXH.optimizingProject')}</div>
                    <div className={classes.search}>
                        <img src={require('../../assets/bxh/search.png')} />
                        <TextField
                            className={classes.searchTF}
                            fullWidth
                            id={ '' }
                            value={ searchVal || '' }
                            onChange={ this.onChangeTo.bind(this,'') }
                            placeholder={t('BXH.searchtitle')}
                            variant="outlined"
                            inputProps={{
                                autoComplete: 'off',
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
    renderList = (list) => {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        if(!list||list.length==0){
            return null;
        }
        return (
            <div className={classes.content} style={{gridTemplateColumns:!isMobile&&list&&list.length>1?'repeat(2, 1fr)':'1fr'}}>
                {
                    list.map((obj,idx)=>{
                        return this.renderItem(obj,idx,list)
                    })
                }
            </div>
        )
    }
    //item
    renderItem = (obj,idx,list) => {
        const { classes, t } = this.props;
        const { isMobile,address } = this.state;
        return (
            <div style={{width:!isMobile&&list&&list.length==1?'435px':'100%'}} className={classes.item} key={idx}>
                <div className={classes.rank}>NO.{obj.star_id||''}</div>
                <div className={classes.itemHeader}>
                    <img src={obj.icon_url} />
                    <span>{obj.project_name}</span>
                </div>
                <div className={classes.itemContent}>
                    <div className={classes.itemContentItem}>
                        <div>BXH Tokens To Stake</div>
                        <span>0</span>
                    </div>
                    <div style={{width:'2px',height:'60%',backgroundImage:'linear-gradient(to bottom,rgba(86,92,136,0),rgba(43,47,80,1),rgba(82,88,131,0))'}}></div>
                    <div className={classes.itemContentItem}>
                        <div>BXH Tokens to My Stake</div>
                        <span>0</span>
                    </div>
                </div>
                {
                    address ?
                    (
                        this.renderItemBtn(obj)
                    ):(
                        <div onClick={this.openUnlockModal} className={classes.btn}>Unlock Wallet</div>
                    )
                }
                <div onClick={()=>{this.openStarPlanModal(obj)}} className={classes.projectDetail}>{t('BXH.projectDetail')}</div>
            </div>
        )
    }
    renderItemBtn(obj) {
        const { classes } = this.props;
        const alloWance = obj.alloWance;
        return (
            <div>
                {
                    true ?
                    (
                        alloWance ?
                        (
                            <div onClick={()=>{this.voteClaim(obj)}} className={classes.btn}>{true?'Claim':'Vote'}</div>
                        ):(
                            <div onClick={()=>{this.approve(obj)}} className={classes.btn}>Approve</div>
                        )
                    ):(//暂未开始
                        <div className={classes.btnDisable}>Nothing to Claim</div>
                    )
                }
            </div>
        )
    }
    renderModal = () => {
        const { modalObj } = this.state;
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
    renderVoteModal = () => {
        const {bxhAsset,bxhBalance} = this.state;
        return (
            <StarPlanVoteDialog onSure={this.onSureVote} onClose={ ()=>{this.setState({modalVote: false})} } balance={bxhBalance} bxhAsset={bxhAsset}/>
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