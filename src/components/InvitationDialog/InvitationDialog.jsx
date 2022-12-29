import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Card,
    ClickAwayListener,
} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import Snackbar from '../snackbar/snackbar'

import {
    ERROR,
    BXH_HOMEBALANCE,
    BXH_HOMEBALANCE_RETURNED,
  } from '../../constants'

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999999',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        background: '#262946',
        padding: '15px',
        fontSize: '14px',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            position: 'relative',
            width: '560px',
        }
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    closeon: {
        cursor: 'pointer',
        '& img': {
            width: '15px',
            cursor: 'pointer',
            '&:hover': {
                opacity: '.8',
            }
        }
    },
    balancebg: {
        background: '#171c32',
        borderRadius: '12px',
        padding: '10px 15px',
        margin: '10px 0',
        '& h1': {
            fontSize: '13px',
            margin: '0px',
            marginBottom: '10px',
            opacity: '.8',
        }
    },
    balancecmnt: {
        display: 'flex',
        justifyContent: 'space-between',
        '& img': {
            width: '15px',
            marginRight: '5px',
            verticalAlign: 'bottom',
        }
    },
    balancemkso: {
        width: '50%',
        fontSize: '13px',
        letterSpacing: '1px',
        '& span': {
            marginLeft: '5px',
            color: '#2EBC84',
            fontWeight: 'bold',
            letterSpacing: '0px',
        }
    },
    balancelqu: {
        width: '50%',
        '& span': {
            fontSize: '12px',
            color: '#7B7C8D',
        },
        '& em': {
            fontStyle: 'inherit',
            float: 'right',
        },
        '& i': {
            fontStyle: 'inherit',
            backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84)',
            borderRadius: '2px',
            fontSize: '12px',
            padding: '2px 8px',
            cursor: 'pointer',
            marginLeft: '10px',
        }
    },
    myconts: {
        background: '#171c32',
        borderRadius: '12px',
        padding: '10px 15px',
        margin: '10px 0',
    },
    myinsomt: {
        display: 'flex',
        justifyContent: 'space-between',
        '& h1': {
            width: '15%',
            fontSize: '13px',
            margin: '0px',
            opacity: '.8',
            lineHeight: '30px',
        }
    },
    mycopytm: {
        width: '85%',
        textAlign: 'right',
        '& span': {
            background: '#1b2c3c',
            color: '#31BE86',
            borderRadius: '2px',
            fontSize: '12px',
            padding: '2px 8px',
            cursor: 'pointer',
            marginLeft: '10px',
        },
        '& input': {
            width: '80%',
            lineHeight: '30px',
            background: 'none',
            color: '#9d9fae',
            border: '1px solid #24293f',
            borderRadius: '2px',
            padding: '0 10px',
            textAlign: 'right',
            fontSize: '12px',
        }
    }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class InvitationDialog extends Component {
    constructor(props) {
        super(props);

        const { onClose } = this.props;
        const rewardBXHFactory = store.getStore('rewardBXHFactory')
        this.state = {
            onClose: onClose,
            rewardBXHFactory: rewardBXHFactory,
            address: null,
            modalSend: false,  // 合约调用后弹窗
            modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
            snackbarMessage: false,
        }

        dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
    }


    componentWillMount() {
        emitter.on(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    }

    componentWillUnmount() {
        emitter.removeListener(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    };

    componentDidMount() {
        this.refreshAccount()
    }

    refreshAccount = () => {
        const account = store.getStore('account');
        this.setState({address: account.address})
    }
    
    // BXH余额
    getBalance = (data) => {
        this.setState({ rewardBXHFactory: data })
    }

    SaveToTwoWei = (number) => {
        return this.saveToWei(number, 4);
    }
    saveToWei = (number, scale) => {
        var scaleP = Math.pow(10, scale);
        var result = Math.floor(number * scaleP) / scaleP;
        return result;
    }


    render() {
        const { classes, t } = this.props;
        const { rewardBXHFactory, address, snackbarMessage, modalSend } = this.state;

        return (
            <div className={classes.mainBg} onClick={(e) => { e.stopPropagation(); if (this.state.onClose != null) { this.state.onClose(); } }}>
                <div className={classes.content} 
                     onClick={(e) => { e.stopPropagation() }} >
                    <div className={classes.top}>
                        <div className={classes.title}>{t('BXH.Invite')}</div>
                        <div onClick={this.state.onClose} className={classes.closeon}>
                            <img src={require('../../assets/bxh/tokenClose.png')} />
                        </div>
                    </div>

                    {/* 我的余额、未领取邀请奖励 */}
                    <div className={classes.balancebg}>
                        <h1>{t('BXH.myBalance')}</h1>
                        <div className={classes.balancecmnt}>
                            <div className={classes.balancemkso}>
                                <img src={ require('../../assets/bxh/BXH.png') } />
                                BXH
                                {
                                    rewardBXHFactory ?
                                        <span>
                                            {
                                              rewardBXHFactory[0].tokens[0].bxhbanancehome ?
                                                 this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].bxhbanancehome + "")
                                                 :
                                                 '--'
                                            }
                                        </span>
                                        :
                                        <span>0.00</span>
                                }
                                
                            </div>
                            <div className={classes.balancelqu}>
                                <span>{t('BXH.Award')}</span>
                                <em>
                                    10.00
                                    <i onClick={() => { this.lquReceive() }}>{t('BXH.inreceive')}</i>
                                </em>
                            </div>
                        </div>
                    </div>

                    {/* 我的邀请码 */}
                    <div className={classes.myconts}>
                        <div className={classes.myinsomt}>
                            <h1>{t('BXH.invitationCode')}</h1>
                            <div className={classes.mycopytm}>
                                <input value={address ? address : ''} disabled />
                                <span onClick={() => { this.walletCopy() }}>{t('BXH.inCopy')}</span>
                            </div>
                        </div>
                    </div>

                    {/* 我的邀请人 */}
                    <div className={classes.myconts}>
                        <div className={classes.myinsomt}>
                            <h1>{t('BXH.invitees')}</h1>
                            <div className={classes.mycopytm}>
                                <input placeholder={t('BXH.textvalue')} />
                                <span onClick={() => { this.walletBinding() }}>{t('BXH.binding')}</span>
                            </div>
                        </div>
                    </div>
                
                </div>

                { snackbarMessage && this.renderSnackbar() }
                { modalSend && this.renderSendModal()}

            </div>
        )
    };


    // 复制邀请码
    walletCopy = () => {
        const account = store.getStore('account')
        const spanText = account.address;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        this.setState({ snackbarMessage: true })
    }
    renderSnackbar = () => {
        var snackbarType = 'Success'
        var message = '复制成功'
        return <Snackbar type={ snackbarType } message={ message } open={true}/>
    };
    
    // 绑定弹窗
    renderSendModal = () => {
        const { modalSendType } = this.state
        return (
            <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent='invitation' />
        )
    }
    onCloseSend = () => {
        this.setState({ modalSend: false })
    }

    // 绑定邀请人
    walletBinding = () => {
        this.setState({ 
           modalSend: true, 
           modalSendType: 0 
        })
    }

    // 领取奖励
    lquReceive = () => {
        alert('领取奖励')
    }

}

export default withNamespaces()(withRouter(withStyles(styles)(InvitationDialog)));
