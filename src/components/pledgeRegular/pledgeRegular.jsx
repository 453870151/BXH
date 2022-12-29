import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import BXHTwistBackDialog from '../bxhTwistBackDialog/bxhTwistBackDialog.jsx';
import BXHMortgageBackLockupDialog from '../bxhMortgageBackLockupDialog/bxhMortgageBackLockupDialog';
import LeftPC from '../unlock/LeftPC.jsx';
import CountUp from 'react-countup';
import { getStyleClass, toShowDollar, _getValueAdd4, _getValuemultip1, _getValueAdd2 } from '../../config/constantFunction';
import Footer from '../unlock/Footer.jsx';
import { ClickAwayListener } from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import { numberDecimal, toolNumber } from '../../config/constantFunction'

import {
  ERROR,
  BXHCHNAGEACCOUNT,
  GET_PLEDGEPOOLINFOBYID,
  GET_PLEDGEPOOLINFOBYID_RETURNED,
  GET_BXHTWIST,
  GET_BXHTWIST_RETURNED,
  GET_BXHDEPOSITTWIST,
  GET_BXHDEPOSITTWIST_RETURNED,
  GET_TWISTALLOWANCE,
  GET_TWISTALLOWANCE_RETURNED,
  GET_TWISTALLOWANCE1,
  GET_TWISTALLOWANCE_RETURNED1,
  GET_TWISTCANCEL,
  GET_TWISTCANCEL_RETURNED,
  GET_TWISTPLEDGE,
  GET_TWISTPLEDGE_RETURNED,
  GET_TWISTPLEDGECANCEL,
  GET_TWISTPLEDGECANCEL_RETURNED,
  STAKEBXH,
  STAKEBXH_RETURNED,
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
    padding: '65px 0',
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
    marginTop: '20px',
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
      height: '300px',
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
    }
  },
  bxhicosimg: {
    textAlign: 'center',
    '& img': {
      width: '40px',
      borderRadius: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      '& img': {
        width: '60px',
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
});

class Pledge extends Component {
  constructor(props) {
    super(props);

    const account = store.getStore('account')
    const pool = store.getStore('currentdTradePool')  //上页面传来的币的数据
    console.log('pool');
    console.log(pool);
    const rewardBXHTokens = store.getStore('rewardBXHTokens')
    const rewardBXHFactory = store.getStore('rewardBXHFactory')

    //获取携带的id参数BXHGETPOOLINFOBYID
    const { match } = props;
    store.setStore({ rewardBXHTokens: pool })
    this.state = {
      isMobile: true,
      pool: pool,
      rewardBXHTokens: rewardBXHTokens,
      bxhBalance: "0",
      bxhAsset: null,
      amount: null,
      modalMortgageBack: false,
      modalMortgageBackType: '0',
      bxhInfo: {},
      match: match,
      modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
    }

    dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pool } })
  }

  // 组件加载完毕 启动定时器
  componentDidMount() {
    setTimeout(this.iTimer, 0);

    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    //通过id获取币对及详情
    dispatcher.dispatch({ type: GET_PLEDGEPOOLINFOBYID, content: { id: this.state.match.params.id, typeStr: 'pledgeRegular' } })
  }

  componentWillMount() {
    emitter.on(GET_BXHTWIST_RETURNED, this.balancesReturned);
    emitter.on(GET_TWISTALLOWANCE_RETURNED, this.showHashROVETWIST);
    emitter.on(GET_TWISTALLOWANCE_RETURNED1, this.showHashROVETWIST);
    emitter.on(GET_PLEDGEPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    //监听窗口大小改变
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    const { ethereum } = window;
    if(ethereum){
        ethereum.on('accountsChanged', this.handleAccountsChanged);
        // 钱包切换时，实时切换页面链
        ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }
  componentWillUnmount() {
      emitter.removeListener(GET_BXHTWIST_RETURNED, this.balancesReturned);
      emitter.removeListener(GET_TWISTALLOWANCE_RETURNED, this.showHashROVETWIST);
      emitter.removeListener(GET_TWISTALLOWANCE_RETURNED1, this.showHashROVETWIST);
      emitter.removeListener(GET_PLEDGEPOOLINFOBYID_RETURNED, this.getPoolItemInfo)
      emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户

      emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
      window.addEventListener('resize', this.handleResize)
      this.setState = (state, callback) => {
          return;
      }
  }
  handleAccountsChanged = () => {
    this.props.history.push('/liquidity')
  }
  getPoolItemInfo = (data) => {
    let pool = data[0].tokens[0].poolItemInfo[0]
    this.setState({ pool: pool })
    store.setStore({ rewardBXHTokens: pool })
    dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pool } })
  }
  changeAccount = () => {
    const pool = store.getStore('currentdTradePool')  //上页面传来的币的数据
    dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pool } })

    //通过id获取币对及详情
    dispatcher.dispatch({ type: GET_PLEDGEPOOLINFOBYID, content: { id: this.state.match.params.id, typeStr: 'pledgeRegular' } })
  }
  balancesReturned = (data) => {
    // console.log('123123=====>', data)
    this.setState({ rewardBXHFactory: data })
    const { pool, rewardBXHFactory } = this.state;
    console.log('.............');
    console.log(rewardBXHFactory);
  }

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

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

  timer = null;
  // 定时器
  iTimer = () => {
    // this.timer = setInterval(() => {
    //     const { pool } = this.state
    //     if (pool) {
    //         dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pool } })
    //     }   
    // }, 5000);
  }

  showHashROVETWIST = (data) => {
    this.setState({ modalSend: false })
    if (data) {
      if (!data.isHideDialog) {
        this.setState({
          txHash: data,
          modalSend: true,
          modalSendType: 1,
        })
      } else {
        // 刷新授权
        // this.refreshAlloWance();
      }
    }
  }

  render() {
    const { classes, t } = this.props;
    const { isMobile, modalMortgageBack, modalLockUpMortgageBack, modalSend, pool } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div style={{ width: '100%' }}>
        <div className={getStyleClass('PCbroot', classes.root)}>
          <Header openUnlockModal={this.openUnlockModal} />

          {this.renderHeader()}
          <div className={classes.content}>
            {/* 领取 */}
            {this.renderReceive()}
            {/* 质押 */}
            {this.renderPledge()}
            {/* 存入 */}
            {
              pool && pool.symbol0 ?
              this.renderDeposit()
              : null
            }
          </div>
          {modalMortgageBack && this.renderMortgageBack()}
          {modalSend && this.renderSendModal()}
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
    const { pool } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    // console.log('pool=====>', pool)
    return (
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {pool ? pool.symbol1 : null} Pool
        </div>
        {
          pool && pool.symbol0 ?
          <div className={classes.headerDesc}>
            {t('BXH.shoudaocunru')} {pool ? pool.symbol0 : null} {t('BXH.twget')} {pool ? pool.symbol1 : null},
            {t('BXH.pledge')} {pool ? pool.symbol1 : null} {t('DFKII.earn')}&nbsp;
            {pool ? pool.symbolReward : null}
          </div>
          :
          <div className={classes.headerDesc}>
            {t('BXH.pledge')} {pool ? pool.symbol1 : null} {t('DFKII.earn')}&nbsp;
            {pool ? pool.symbolReward : null}
          </div>
        }
      </div>
    )
  }

  // 存入
  renderDeposit() {
    const { classes, t } = this.props;
    const { pool, rewardBXHFactory } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={getStyleClass('PCTDaoCard', classes.bxhDaoCard)}>
        <div className={classes.bxhicosimg}>
          {/* <img src={pool ? pool.symbol0Img_Show : null} /> */}
          <img src={"https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + pool.symbol0 + ".png"} alt="" />
        </div>
        <div className={classes.bxhsumzhi}>
          {rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balanceDeposit > 0.0001 ? numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].symbol0balanceDeposit)) || "--" : "0.0000"}
        </div>
        <div className={classes.bxhshuom}>
          Deposit {pool ? pool.symbol0 : null} harvest {pool ? pool.symbol1 : null}
        </div>
        {
          rewardBXHFactory ?
            <div>
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].alloWance0 !== 0 ?
                  // 已授权
                  <div className={classes.rewardCardBtnContentRow}>
                    <div onClick={() => { this.openMortgageBack('0') }} className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>{t('BXH.shoudaocunru')}</div>
                    {
                      chainID === '56' ?
                        <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                        :
                        chainID === '66' ?
                          <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption2.png')} alt='' />
                          :
                          chainID === '1' ?
                            <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption3.png')} alt='' />
                            :
                            chainID === '137' ?
                              <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption4.png')} alt='' />
                              :
                              chainID === '43114' ?
                                <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption5.png')} alt='' />
                                :
                                <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                    }
                  </div>
                  :
                  // 未授权
                  <div className={classes.rewardCardBtnContentRow} onClick={() => { this.twistAlloWance() }} >
                    <div className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>Approve</div>
                  </div>
              }
            </div>
            :
            // 未授权
            <div className={classes.rewardCardBtnContentRow} onClick={() => { this.twistAlloWance() }} >
              <div className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>Approve</div>
            </div>
        }
      </div>
    )
  }

  // 质押
  renderPledge() {
    const { classes, t } = this.props;
    const { pool, rewardBXHFactory } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={getStyleClass('PCTDaoCard', classes.bxhDaoCard)}>
        <div className={classes.bxhicosimg}>
          {/* <img src={pool ? pool.icon : null} /> */}
          {
            pool && pool.symbol0 ?
            <img src={"https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + pool.symbol0 + ".png"} alt="" />
            :
            pool && pool.symbol1 ?
            <img src={"https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + pool.symbol1 + ".png"} alt="" />
            : null
          }
        </div>
        <div className={classes.bxhsumzhi}>
          {rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo.amount > 0.0001 ? numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].userInfo.amount)) || "--" : "0.0000"}
        </div>
        <div className={classes.bxhshuom}>
          {pool ? pool.symbol1 : null} Tokens Staked
        </div>
        {
          rewardBXHFactory ?
            <div>
              {
                rewardBXHFactory && rewardBXHFactory[0].tokens[0].alloWance1 !== 0 ?
                  // 已授权
                  <div className={classes.rewardCardBtnContentRow}>
                    <div onClick={() => { this.openMortgageBack('2') }} className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>{t('BXH.pledge')}</div>
                    {
                      rewardBXHFactory[0].tokens[0].canWithdrawAmount > 0 ?
                        chainID === '56' ?
                          <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                          :
                          chainID === '66' ?
                            <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption2.png')} alt='' />
                            :
                            chainID === '1' ?
                              <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption3.png')} alt='' />
                              :
                              chainID === '137' ?
                                <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption4.png')} alt='' />
                                :
                                chainID === '43114' ?
                                  <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption5.png')} alt='' />
                                  :
                                  <img onClick={() => { this.openMortgageBack('3') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                                    : null
                    }
                  </div>
                  :
                  // 未授权
                  <div className={classes.rewardCardBtnContentRow} onClick={() => { this.twistAlloWance1() }} >
                    <div className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>Approve</div>
                  </div>
              }
            </div>
            :
            // 未授权
            <div className={classes.rewardCardBtnContentRow} onClick={() => { this.twistAlloWance1() }} >
              <div className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>Approve</div>
            </div>
        }
      </div>
    )
  }

  // 领取
  renderReceive() {
    const { classes, t } = this.props;
    const { pool, rewardBXHFactory } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    const tokenList = JSON.parse(localStorage.getItem('tokenList'))
    let tokenPrice = 1
    if (pool && pool.enableBonus && pool.enableBonus == 1 && pool.swapPairAddress) {
      for (let i = 0; i < tokenList.length; i++) {
        if (tokenList[i].price_pair && (tokenList[i].price_pair.toUpperCase() === pool.swapPairAddress.toUpperCase()) && tokenList[i].token_price) {
          tokenPrice = tokenList[i].token_price
          break;
        }
      }
    }
    return (
      <div className={getStyleClass('PCTDaoCard', classes.bxhDaoCard)}>
        <div className={classes.bxhicosimg}>
          {
            pool && pool.symbolReward ?
            <img src={"https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + pool.symbolReward + ".png"} alt="" />
            : null
          }
        </div>
        <div className={classes.bxhsumzhi}>
          {rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi > 0.0001 ? numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].shouyi)*tokenPrice) || "--" : "0.0000"}
        </div>
        <div className={classes.bxhshuom}>Deposit Tokens Earned&nbsp;
          {pool ? pool.symbolReward : null}
        </div>
        <div className={classes.rewardCardBtnContentRow} onClick={() => { this.openClaim() }}>
          <div className={getStyleClass('PC_new_btn1', classes.rewardCardPledge)}>{t('BXH.claim')}</div>
        </div>
      </div>
    )
  }

  openMortgageBack = (type) => {
    this.setState({
      modalMortgageBackType: type,
      modalMortgageBack: true
    })
  }

  // 授权0
  twistAlloWance = () => {
    const { pool } = this.state
    this.setState({ modalSend: false })
    const msgContent = "Approve " + pool.symbol0;
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
    dispatcher.dispatch({ type: GET_TWISTALLOWANCE, content: { asset: pool, msgContent: msgContent } })
  }
  // 授权1
  twistAlloWance1 = () => {
    const { pool } = this.state
    this.setState({ modalSend: false })
    const msgContent = "Approve " + pool.symbol1;
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
    dispatcher.dispatch({ type: GET_TWISTALLOWANCE1, content: { asset: pool, msgContent: msgContent } })
  }

  renderMortgageBack = () => {
    const { modalMortgageBackType, pool, rewardBXHFactory } = this.state
    var balance = ''

    if (modalMortgageBackType === '0') {
      // 存入余额
      balance = rewardBXHFactory ? rewardBXHFactory[0].tokens[0].symbol0balance || "--" : "0.0000"
    } else if (modalMortgageBackType === '1') {
      // 取消存入余额
      balance = rewardBXHFactory ? rewardBXHFactory[0].tokens[0].symbol0balanceDeposit || "--" : "0.0000"
    } else if (modalMortgageBackType === '2') {
      // 质押
      balance = rewardBXHFactory ? rewardBXHFactory[0].tokens[0].symbol0balanceDeposit || "--" : "0.0000"
    } else if (modalMortgageBackType === '3') {
      // 取消质押
      balance = rewardBXHFactory ? rewardBXHFactory[0].tokens[0].canWithdrawAmount || "--" : "0.0000"
    }
    return (
      <BXHTwistBackDialog type={modalMortgageBackType} onClose={() => { this.setState({ modalMortgageBack: false }) }} pool={pool} balance={balance} onSure={this.onSureMortgageBack} />
    )
  }

  onSureMortgageBack = (val) => {
    const { pool, modalMortgageBackType } = this.state
    this.setState({ modalSend: false })

    if (modalMortgageBackType === '0') {
      // 存入余额
      const msgContent = "Deposit " + val + " " + pool.symbol0;
      this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
      dispatcher.dispatch({ type: GET_BXHDEPOSITTWIST, content: { asset: pool, amount: val, msgContent: msgContent } })
    } else if (modalMortgageBackType === '1') {
      // 取消存入余额
      const msgContent = "Cancel " + val + " " + pool.symbol0;
      this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
      dispatcher.dispatch({ type: GET_TWISTCANCEL, content: { asset: pool, amount: val, msgContent: msgContent } })
    } else if (modalMortgageBackType === '2') {
      // 质押
      const msgContent = "Deposit " + val + " " + pool.symbol1;
      this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
      dispatcher.dispatch({ type: GET_TWISTPLEDGE, content: { asset: pool, amount: val, msgContent: msgContent } })
    } else if (modalMortgageBackType === '3') {
      // 取消质押
      const msgContent = "Unstake " + val + " " + pool.symbol1;
      this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
      dispatcher.dispatch({ type: GET_TWISTPLEDGECANCEL, content: { asset: pool, amount: val, msgContent: msgContent } })
    }
  }

  renderSendModal = () => {
    const { modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }

  // 领取奖励
  openClaim = () => {
    const { pool, rewardBXHFactory } = this.state
    this.setState({ modalSend: false })
    const msgContent = "Claim " + rewardBXHFactory[0].tokens[0].shouyi + " BXH"
    this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })

    dispatcher.dispatch({ type: STAKEBXH, content: { asset: rewardBXHFactory, pair: pool, amount: "0", msgContent: msgContent } })
  }

  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(Pledge)));