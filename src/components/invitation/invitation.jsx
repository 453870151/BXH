import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'
import Store from "../../stores";
import Header from '../unlock/Header.jsx';
import Footer from '../unlock/Footer.jsx';
import SendDialog from '../sendDialog/sendDialog.jsx';
import Snackbar from '../snackbar/snackbar'

import {
  ERROR,
  GET_BXHEXCHANGE_PERPETUAL,
  BXHCHNAGEACCOUNT,
  BXH_HOMEBALANCE,
  BXH_HOMEBALANCE_RETURNED,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vw',
    [theme.breakpoints.up('sm')]: {
      minWidth: '480px',
      paddingTop: '65px',
    }
  },
  content: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
      marginLeft: '260px',
    }
  },
  bxhtTit: {
    marginBottom: '20px',
    '& h2': {
      fontSize: '25px',
      margin: '0px',
    },
    '& h3': {
      fontSize: '17px',
      margin: '0px',
      fontWeight: '500',
      [theme.breakpoints.up('sm')]: {
        fontSize: '20px',
        opacity: '.6',
        marginTop: '5px',
      }
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '30px',
    }
  },
  bxhtConter: {
    background: '#232641',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '10px',
    [theme.breakpoints.up('sm')]: {
      borderRadius: '15px',
    },
    '& h5': {
      margin: '0px',
      fontSize: '15px',
      marginBottom: '15px',
    }
  },
  bxhinsomt: {
    '& span': {
      fontSize: '14px',
    },
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& i': {
      display: 'inline-block',
      fontStyle: 'inherit',
      float: 'right',
      fontWeight: 'bold',
      fontSize: '17px',
    }
  },
  bxhweilqu: {
    position: 'relative',
    borderTop: '1px solid #30344d',
    paddingTop: '15px',
    marginTop: '20px',
    paddingBottom: '15px',
    '& span': {
      position: 'absolute',
      left: '0px',
      fontSize: '12px',
      color: '#7B7C8D',
    },
    '& i': {
      position: 'absolute',
      right: '0px',
      display: 'inline-block',
      fontStyle: 'inherit',
      fontSize: '12px',
    },
    '& em': {
      fontStyle: 'inherit',
      color: '#30BE85',
      background: '#273649',
      padding: '3px 10px',
      borderRadius: '12px',
      marginLeft: '10px',
    }
  },
  bxhqianbao: {
    wordBreak: 'break-all',
    border: '1px solid #30344d',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '13px',
    opacity: '.8',
  },
  bxxcopy: {
    backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84)',
    fontSize: '15px',
    lineHeight: '40px',
    textAlign: 'center',
    borderRadius: '6px',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  bxhttarea: {
    width: '100%',
    padding: '10px',
    height: '50px',
    background: 'none',
    color: '#fff',
    borderRadius: '6px',
    opacity: '.8',
    resize: 'none',
  }
});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Invitation extends Component {

  constructor(props) {
    super()

    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    this.state = {
      isMobile: 1,
      footerMShow: true,
      rewardBXHFactory: rewardBXHFactory,
      address: null,
      modalSend: false,  // 合约调用后弹窗
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      snackbarMessage: false,
    }

    dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
  }

  componentWillMount() {
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    emitter.on(BXH_HOMEBALANCE_RETURNED, this.getBalance)
  }

  componentWillUnmount() {
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    emitter.removeListener(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    this.setState = (state, callback) => {
      return;
    }
  };

  changeAccount = () => {
    dispatcher.dispatch({ type: GET_BXHEXCHANGE_PERPETUAL, content: {} })
  }

  componentDidMount() {
    this.refreshAccount()
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }

    const { wHeight } = this.state;
    var hh = window.innerHeight; //当前可视窗口高度 
    if (wHeight > hh) {
      this.setState({
        footerMShow: false,
      })
    } else {
      this.setState({
        footerMShow: true,
      })
    }
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

  refreshAccount = () => {
    const account = store.getStore('account');
    this.setState({address: account.address})
  }


  render() {
    const { classes, t } = this.props;
    const { 
      isMobile, 
      footerMShow,
      rewardBXHFactory,
      address,
      modalSend,
      snackbarMessage,
    } = this.state

    return (
      <div className={classes.root}>
        <Header pagetype="invitation" />

        <div className={classes.content}>
          <div className={classes.bxhtTit}>
            <h2>{t('BXH.Invite')}</h2>
          </div>

          <div className={classes.bxhtConter}>
            <h5>{t('BXH.myBalance')}</h5>
            <div className={classes.bxhinsomt}>
              <span>
                <img src={ require('../../assets/bxh/BXH.png') } />
                BXH
              </span>
              {
                rewardBXHFactory ?
                  <i>
                    {
                      rewardBXHFactory[0].tokens[0].bxhbanancehome ?
                        this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].bxhbanancehome + "")
                        :
                        '--'
                    }
                  </i>
                  :
                  <i>0.00</i>
              }
            </div>
            <div className={classes.bxhweilqu}>
              <span>{t('BXH.Award')}</span>
              <i>
                10.00
                <em onClick={() => { this.lquReceive() }}>{t('BXH.inreceive')}</em>
              </i>
            </div>
          </div>
          
          {/* 我的邀请码 */}
          <div className={classes.bxhtConter}>
            <h5>{t('BXH.invitationCode')}</h5>
            <div className={classes.bxhqianbao}>
              {
                address ? address : ''
              }
            </div>
            <div className={classes.bxxcopy} onClick={() => { this.walletCopy() }}>{t('BXH.inCopy')}</div>
          </div>
          
          {/* 我的邀请人 */}
          <div className={classes.bxhtConter}>
            <h5>{t('BXH.invitees')}</h5>
            <div>
              <textarea rows="3" cols="20" placeholder={t('BXH.textvalue')} className={classes.bxhttarea}></textarea>
            </div>
            <div className={classes.bxxcopy} onClick={() => { this.walletBinding() }}>{t('BXH.binding')}</div>
          </div>

        </div>

        {
          isMobile == 1 ?
            null
            :
            <div>
              {
                footerMShow ?
                  <Footer pagetype="invitation" />
                  :
                  null
              }
            </div>
        }

        { snackbarMessage && this.renderSnackbar() }
        { modalSend && this.renderSendModal()}

      </div>
    )
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

export default withNamespaces()(withRouter(withStyles(styles)(Invitation)));