import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    ClickAwayListener,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme';
import ReduceDialog from '../reduceDialog/reduceDialog.jsx';
import ExchangeDialog from '../exchangeDialog/exchangeDialog.jsx';
import MortgageBackDialog from '../mortgageBackDialog/mortgageBackDialog.jsx';
import LiquidityDialog from '../liquidityDialog/liquidityDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import Store from "../../stores";
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import AccountDialog from '../accountDialog/accountDialog.jsx';
import PassDialog from '../passDialog/passDialog.jsx';
import DefaultImage from '../defaultImage/defaultImage';

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
    root: {
        background: "green",
        padding: '5px 10px',
    },
    img: {
        width: '50px',
        heigth: '50px',
    },
})

class Dig extends Component {
    constructor(props) {
        super()
        
        this.state = {
            modalOpen: false,
            modalExchange: false,
            modalMortgage: false,
            modalBack: false,
            modalLiquidity: false,
            modalMesage: false,
            modalSend: false,
            open: false,
            modalAccount: false,
            modalPass: false,
        }
    }
    handleTooltipClose = () => {
        this.setState({open: false});
    };
    
    handleTooltipOpen = () => {
        this.setState({open: true});
    };
    componentDidMount() {
        const account = store.getStore('account')
        console.log(account.address)
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
    render() {
        const { modalOpen, modalExchange, modalMortgage, modalBack, modalLiquidity, modalMesage, modalSend, modalAccount, modalPass } = this.state
        const { classes, t } = this.props;
        const isMobile = this._isMobile();
        return (
            <div style={{display:'flex',flexDirection:'column',height:'500px',justifyContent:'space-between'}}>
                <Button className={ classes.root } onClick={ this.onOpening }>测试弹窗</Button>
                <Button className={ classes.root } onClick={ this.onOpenExchange }>测试兑换弹窗</Button>
                <Button className={ classes.root } onClick={ this.onOpenMortgage }>测试抵押</Button>
                <Button className={ classes.root } onClick={ this.onOpenBack }>测试取回</Button>
                <Button className={ classes.root } onClick={ this.onOpenLiquidity }>测试流动资金</Button>
                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                    <CustomTooltip title="测试弹窗" 
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={this.handleTooltipClose}
                        open={this.state.open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        arrow 
                        placement="bottom-end">
                        <Button className={ classes.root } onClick={this.handleTooltipOpen}>测试消息弹窗</Button>
                    </CustomTooltip>
                </ClickAwayListener>
                <Button className={ classes.root } onClick={ this.onOpenSend }>测试发送</Button>
                <Button className={ classes.root } onClick={ this.onOpenAccount }>测试账户</Button>
                <Button className={ classes.root } onClick={ ()=>{this.setState({ modalPass: true })} }>测试通行证</Button>
                <DefaultImage className={classes.img} src={'https://bxh-images.s3.ap-east-1.amazonaws.com/coin/ASS.png'} />
                { modalOpen && this.renderModal() }
                { modalExchange && this.renderExchangeModal() }
                { modalMortgage && this.renderMortgageModal() }
                { modalBack && this.renderBackModal() }
                { modalLiquidity && this.renderLiquidityModal() }
                { modalMesage && this.renderMessageModal() }
                { modalSend && this.renderSendModal() }
                { modalAccount && this.renderAccountModal() }
                { modalPass && this.renderPassModal() }
            </div>
        )
    }
    renderModal = () => {
        return (
            <ReduceDialog tokensData={{}} pairData={{}} onClose={ this.onClose } onNext={ this.onNext } />
        )
    }
    renderExchangeModal = () => {
        return (
            <ExchangeDialog onClose={ this.onCloseExchange } onNext={ this.onNextExchange } />
        )
    }
    renderMortgageModal = () => {
        return (
            <MortgageBackDialog type='0' tokensData={{}} pairData={{}} onClose={ this.onCloseMortgage } onSure={ this.onSureMortgage } />
        )
    }
    renderBackModal = () => {
        return (
            <MortgageBackDialog type='1' tokensData={{}} pairData={{}} onClose={ this.onCloseBack } onSure={ this.onSureBack } />
        )
    }
    renderLiquidityModal = () => {
        return (
            <LiquidityDialog tokensData={{}} pairData={{}} onClose={ this.onCloseLiquidity } onSure={ this.onSureLiquidity } />
        )
    }
    renderMessageModal = () => {
        return (
            <MessageDialog message="测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗测试弹窗" onClose={ this.onCloseMessage }/>
        )
    }
    renderSendModal = () => {
        return (
            <SendDialog onClose={ this.onCloseSend } type={0}/>
        )
    }
    renderAccountModal = () => {
        return (
            <AccountDialog onClose={ this.onCloseAccount }/>
        )
    }
    renderPassModal = () => {
        return (
            <PassDialog onClose={ ()=>{this.setState({ modalPass: false })}} onSure={ (val)=>{
                console.log('PassDialog-Sure:',val)
            } }  />
        )
    }
    onClose = () => {
        this.setState({ modalOpen: false })
    }
    onOpening = () => {
        this.setState({ modalOpen: true })
    }
    onNext = () => {
        this.onClose();
    }
    //兑换
    onOpenExchange = () => {
        this.setState({ modalExchange: true })
    }
    onCloseExchange = () => {
        this.setState({ modalExchange: false })
    }
    onNextExchange = () => {
        this.onCloseExchange();
    }
    onOpenMortgage = () => {
        this.setState({ modalMortgage: true })
    }
    onCloseMortgage = () => {
        this.setState({ modalMortgage: false })
    }
    onSureMortgage = (inputVal) => {
        console.log(inputVal);
        this.onCloseMortgage();
    }
    onOpenBack = () => {
        this.setState({ modalBack: true })
    }
    onCloseBack = () => {
        this.setState({ modalBack: false })
    }
    onSureBack = (inputVal) => {
        console.log(inputVal);
        this.onCloseBack();
    }
    onOpenLiquidity = () => {
        this.setState({ modalLiquidity: true })
    }
    onCloseLiquidity = () => {
        this.setState({ modalLiquidity: false })
    }
    onSureLiquidity = (inputVal) => {
        console.log(inputVal);
        this.onCloseLiquidity();
        this.setState({modalOpen:true});
    }
    onOpenMessage = () => {
        this.setState({ modalMesage: true })
    }
    onCloseMessage = () => {
        this.setState({ modalMesage: false })
    }
    onOpenSend = () => {
        this.setState({ modalSend: true })
    }
    onCloseSend = () => {
        this.setState({ modalSend: false })
    }
    onOpenAccount = () => {
        this.setState({ modalAccount: true })
    }
    onCloseAccount = () => {
        this.setState({ modalAccount: false })
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(Dig)));
