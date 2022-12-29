import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  TextField,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme/theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import Header from '../unlock/Header.jsx';
import Store from "../../stores/store";

import ReduceDialog from '../reduceDialog/reduceDialog.jsx'; //移除流动性确认
import MortgageBackDialog from '../mortgageSingleBackDialog/mortgageSingleBackDialog.jsx'; //抵押 取回流动性
import LiquidityDialog from '../liquidityDialog/liquidityDialog.jsx';  //减少流动性
import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import { numberDecimal, toolNumber } from '../../config/constantFunction'

import {
  GET_TOKENBALANCEANOUNT,
  GET_TOKENBALANCEANOUNT_RETURNED,
  APPROVEDFK,
  APPROVEDFK_RETURNED,
  GETDFK_REWARDS,//领取收益
  GETDFK_REWARDS_RETURNED,
  STAKEDFK,//抵押
  STAKEDFK_RETURNED,
  BXHREMOVELIQUIDITY,//减少流动性
  BXHREMOVELIQUIDITY_RETURNED,
  EXITDFK,
  EXITDFK_RETURNED,
  BXHALLOWANCEREMOVELIQUIDITY, //授权减少流动性
  BXHALLOWANCEREMOVELIQUIDITY_RETURNED,
  BXHPAGEREFRESH_RETURN,
  ERROR,
  BXHSINGLETOKENINFO,
  BXHSINGLETOKENINFO_RETURNED,
  BXHGETSINGLEPOOLINFOBUID,
  BXHGETSINGLEPOOLINFOBUID_RETURNED,
  BXHCHNAGEACCOUNT

} from '../../constants/constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',

    [theme.breakpoints.up('sm')]: {
      maxWidth: '1200px',
      padding: '26px 24px',
    }
  },
  root1: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '260px',
    }
  },
  bxhTopM: {
    display: 'block',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
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
      fontWeight: '400',
      [theme.breakpoints.up('sm')]: {
        opacity: 0.6,
        fontSize: '20px',
        marginTop: '5px'
      }
    },
    '& h4': {
      fontSize: '14px',
      opacity: 0.6,
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '70px'
    }
  },
  itemparent: {
    display: 'block',


    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: '300px',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      marginTop: '80px',
    }
  },
  itembg: {
    flex: '2',
    background: 'rgba(32, 35, 60, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    // marginLeft:'20px',
    textAlign: 'center',
    marginTop: '10px',
    '& img': {
      width: '60px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
      height: '290px'
    }
  },
  itembg2: {
    flex: '2',
    background: 'rgba(32, 35, 60, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    // marginLeft:'20px',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '40px',
    '& img': {
      width: '60px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
      height: '290px'
    }
  },
  amountvalue: {
    fontSize: '30px',
    marginTop: '10px'
  },
  amounttip: {
    fontSize: '14px',
    marginTop: '20px'
  },
  sure: {
    backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
    marginTop: '30px',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
    width: '90%',
    display: 'inline-block',
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
  sureDisable: {
    backgroundColor: '#4F5257',
    marginTop: '30px',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  bottomparent: {
    display: 'flex',
    '& img': {
      width: '40px',
      height: '40px',
      marginLeft: '10px',
      position: 'relative',
      top: '12px'
    }
  },
  coinLogo: {
    width: '60px',
    borderRadius: '11px',
    cursor: 'pointer',
  },
  coinLogo1: {
    width: '60px',
    borderRadius: '11px',
    marginLeft: '-10px'
  },
  DKFIIbtnimg: {
    marginTop: '15px',
    position: 'relative',
    height: '40px',
  },
  DKFIIimg1: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-30px',
  },
  DKFIIimg2: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-2px',
  },
  toPledge: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '42%',
    marginTop: '30px',
    '& img': {
      width: '10px',
      verticalAlign: 'sub',
      marginLeft: '5px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '48%',
    }
  },

});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class SingleToken extends Component {

  constructor(props) {
    super()
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    const rewardBXHFactory = store.getStore('rewardBXHFactory')

    // if(!pair) {
    //   props.history.push('/bxhList')
    // }

    const { match } = props;
    store.setStore({ rewardBXHTokens: pair })

    this.state = {
      pair: pair,
      rewardBXHFactory: rewardBXHFactory,
      isNoClickShouQuan: true,
      isShowDeposit: false,
      isShowQuHuiLiuDongXing: false,
      isShowRemoveLiquidity: false,
      isShowRemoveLiquidityConfirm: false,
      removeLiquidityAmount: "",
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
      modalMesage: false,
      isMobile: 1,
      LingQAndDepoAllowanceAmount: 1,
      approve0Title: "Approve",
      match: match,
    }
  }

  componentDidMount() {
    // setTimeout(this.iTimer,0);

    let idArray = this.state.match.params.id.split('_')//0为链上id用于请求数据 1为中心化接口数据用于区分
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "" && pair.symbol0 === pair.symbol1) {
      dispatcher.dispatch({ type: BXHSINGLETOKENINFO, content: { asset: pair, id: idArray[0], id_centerdata: idArray[1] } })
    } else {
      //通过id获取币对及详情
      store._getBXHInfo((data) => {
        dispatcher.dispatch({ type: BXHGETSINGLEPOOLINFOBUID, content: { id: idArray[0], id_centerdata: idArray[1], dao_address: data.bxh_info.dao_address } })
      })

    }
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
  }

  componentWillMount() {
    emitter.on(BXHSINGLETOKENINFO_RETURNED, this.balancesReturned);
    emitter.on(APPROVEDFK_RETURNED, this.showHashByAPPROVEDFK_RETURNED);
    emitter.on(GETDFK_REWARDS_RETURNED, this.showHashByGETDFK_REWARDS_RETURNED); //领取收益
    emitter.on(STAKEDFK_RETURNED, this.showHashBySTAKEDFK_RETURNED);//抵押
    emitter.on(BXHREMOVELIQUIDITY_RETURNED, this.showHashByEXITDFK_RETURNED);//减少流动性
    emitter.on(EXITDFK_RETURNED, this.showHashByEXITDFK_RETURNED); //赎回
    //BXHALLOWANCEREMOVELIQUIDITY_RETURNED
    emitter.on(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.showHash);

    emitter.on(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);

    emitter.on(ERROR, this.errorReturned);  // 取消合约提示

    emitter.on(BXHGETSINGLEPOOLINFOBUID_RETURNED, this.getPoolItemInfo)
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
  }

  componentWillUnmount() {
    emitter.removeListener(BXHSINGLETOKENINFO_RETURNED, this.balancesReturned);
    emitter.removeListener(APPROVEDFK_RETURNED, this.showHashByAPPROVEDFK_RETURNED);
    emitter.removeListener(GETDFK_REWARDS_RETURNED, this.showHashByGETDFK_REWARDS_RETURNED);
    emitter.removeListener(STAKEDFK_RETURNED, this.showHashBySTAKEDFK_RETURNED);
    emitter.removeListener(BXHREMOVELIQUIDITY_RETURNED, this.showHashByEXITDFK_RETURNED);
    emitter.removeListener(EXITDFK_RETURNED, this.showHashByEXITDFK_RETURNED);
    emitter.removeListener(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, this.showHash);

    emitter.removeListener(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);

    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(BXHGETSINGLEPOOLINFOBUID_RETURNED, this.getPoolItemInfo)
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    this.setState = (state, callback) => {
      return;
    }
  };

  changeAccount = () => {
    let idArray = this.state.match.params.id.split('_')//0为链上id用于请求数据 1为中心化接口数据用于区分
    const pair = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    if (pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
      dispatcher.dispatch({ type: BXHSINGLETOKENINFO, content: { asset: pair, id: idArray[0], id_centerdata: idArray[1] } })
    } else {
      //通过id获取币对及详情
      store._getBXHInfo((data) => {
        dispatcher.dispatch({ type: BXHGETSINGLEPOOLINFOBUID, content: { id: idArray[0], id_centerdata: idArray[1], dao_address: data.bxh_info.dao_address } })
      })
    }
  }

  getPoolItemInfo = (data) => {
    // console.log("pool data ---->>>>>",data)
    let pool = data[0].tokens[0].poolItemInfo
    let idArray = this.state.match.params.id.split('_')//0为链上id用于请求数据 1为中心化接口数据用于区分
    this.setState({ pair: pool })
    store.setStore({ rewardBXHTokens: pool })
    dispatcher.dispatch({ type: BXHSINGLETOKENINFO, content: { asset: pool, id: idArray[0], id_center_data: idArray[1] } })
  }

  pageRefreshEvent = (data) => {
    const { pair } = this.state
    let idArray = this.state.match.params.id.split('_')//0为链上id用于请求数据 1为中心化接口数据用于区分
    if (data && pair && pair.symbol0Address && pair.symbol1Address && pair.symbol0Address !== "" && pair.symbol1Address !== "") {
      this.setState({ modalSend: false })
      this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: data })
      dispatcher.dispatch({ type: BXHSINGLETOKENINFO, content: { asset: pair, id: idArray[0], id_center_data: idArray[1] } })
    }
  }

  balancesReturned = (data) => {
    data[0].tokens[0].mineLpAmount = data[0].tokens[0].symbol0balance
    // data[0].tokens[0].oldBalance = data[0].tokens[0].symbol0balance
    const { classes, t } = this.props
    this.setState({ approve0Title: t('BXH.allowanccetitle') })
    this.setState({ rewardBXHFactory: data, LingQAndDepoAllowanceAmount: data[0].tokens[0].alloWance })

    // store._getBXHInfo((data) => {
    //   console.log("中心化 data--->>>>>>>",data)

    //   let rewardBXHFactory_temp = this.state.rewardBXHFactory
    //   rewardBXHFactory_temp[0].tokens[0].token_list = data.token_list
    //   this.setState({rewardBXHFactory:rewardBXHFactory_temp})

    // })
  }
  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };
  //授权
  showHashByAPPROVEDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickShouQuan:true})
    // this.showHash(txHash)
  }

  //领取奖励
  showHashByGETDFK_REWARDS_RETURNED = (txHash) => {
    // this.setState({isNoClickLingqu:true})
    // this.setState({isOpertioning:false})
    // this.showHash(txHash)
  }
  //抵押
  showHashBySTAKEDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickZhuanRu:true})
    // const idType = this.state.assetId+ '_' +this.state.assetType
    // this.state[idType] =""
    // this.showHash(txHash)
  }
  //取回流动性
  showHashByEXITDFK_RETURNED = (txHash) => {
    // this.setState({isNoClickZhuanChu:true})
    // this.state.isOpertioning = false
    // this.showHash(txHash)
  }
  showHash = (txHash) => {

  }

  render() {
    const { classes, t, location } = this.props;
    const { pair, rewardBXHFactory, modalSend, modalMesage, isMobile, isShowDeposit, isShowQuHuiLiuDongXing, LingQAndDepoAllowanceAmount, approve0Title } = this.state
    // console.log("pair--->>>>>>",pair)
    return (
      <div className={classes.root}>
        <Header />

        <div className={classes.root1}>
          <div className={classes.bxhtTit}>
            <h2>BXH Pool</h2>
            <h3>{t('BXH.diyatitle')} {pair && pair.symbol0 && pair.symbol0 !== "" ? pair.symbol0 : ""} {t('BXH.zhiyapctipsingle')}</h3>
            <h4>{pair && pair.pair_token_type && pair.pair_token_type === 1 ? t('BXH.dao30tip') : ""}</h4>
          </div>

          <div className={classes.itemparent}>
            <div className={classes.itembg}>
              <img src={"https://bxh-images.s3.ap-east-1.amazonaws.com/coin/BXH.png"} className={classes.coinLogo} style={{ left: '0', zIndex: '1' }} alt="dfgfgf" />
              <div className={classes.amountvalue}>{rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi > 0.0001 ? this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].shouyi, 4) : "0.0000"}</div>
              <div className={classes.amounttip}>
                Deposit {pair && pair.symbol0 ? pair.symbol0 : ""} Tokens Earned
                </div>

              {/* <div className={classes.sure}>{t('BXH.lingqushouyititle')}</div> */}

              <div>
                {
                  rewardBXHFactory && LingQAndDepoAllowanceAmount == 0 ?
                    <div className={classes.sure} onClick={() => { this.onApprove() }}>{approve0Title}</div>
                    :
                    <div className={classes.sure} onClick={() => { this.onWithDrawShouYi() }}>{t('BXH.lingqushouyititle')}</div>
                }
              </div>
            </div>
            <div className={classes.itembg2}>
              {
                pair && pair.symbol0Img_Show && pair.symbol0Img_Show !== "" ?
                  <img src={pair ? pair.symbol0Img_Show : ""} className={classes.coinLogo} />
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} className={classes.coinLogo} />
              }
              {/* {
                pair && pair.symbol1Img_Show && pair.symbol1Img_Show !== "" ?
                  <img src={pair ? pair.symbol1Img_Show : ""} className={classes.coinLogo1} />
                  :
                  <img src={require('../../assets/bxh/BXHtong.png')} className={classes.coinLogo1} />
              } */}


              <div className={classes.amountvalue}>
                {
                  rewardBXHFactory && rewardBXHFactory[0].tokens[0].userInfo && rewardBXHFactory[0].tokens[0].userInfo.amount && rewardBXHFactory ?
                    numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].userInfo.amount))
                    :
                    "0.0000"
                }
              </div>
              <div className={classes.amounttip}>
                {pair && pair.symbol0 && pair.symbol0 !== "" ? pair.symbol0 : ""} Tokens Staked
                </div>
              <div className={classes.bottomparent}>
                {
                  rewardBXHFactory && LingQAndDepoAllowanceAmount == 0 ?
                    <div className={classes.sure} onClick={() => { this.onApprove() }}>{approve0Title}</div>
                    :
                    <div className={classes.sure} onClick={() => { this.onDeposit() }}>{t('BXH.pledge')}</div>
                }

                <img src={require('../../assets/bxh/recaption.png')} className={classes.coinLogo} style={{ left: '0', zIndex: '1' }} onClick={() => { this.onWithDraw() }} />
              </div>
            </div>
          </div>

          {/* <div style={{width:'100%',textAlign:'center',marginLeft:'10px'}}>
            <div style={{display:'flex'}}>
                            <div>{t('BXH.gosuocang')}</div>
            <img src={require('../../assets/bxh/more.png')} />
            </div>
          </div> */}
          {
            pair&&pair.pool_type&&pair.pool_type === 2 ?
              <div className={classes.toPledge} onClick={() => { this.toDao('/dao') }}>
                <span>{t('BXH.gosuocang')}</span>
                <img src={require('../../assets/bxh/more.png')} />
              </div>
              :
              null
          }



          {modalSend && this.renderSendModal()}
          {modalMesage && this.renderMessageModal()}
          <div>
            {
              isShowDeposit && this.renderMortgageModal()  //抵押弹窗
            }
            {
              isShowQuHuiLiuDongXing && this.renderBackModal() //取回流动性弹窗
            }
            {/* {
            isShowRemoveLiquidity && this.renderLiquidityModal()//减少流动性1
          }
          {
            isShowRemoveLiquidityConfirm && this.renderModal()//减少流动性2
          } */}
          </div>
        </div>

      </div>
    )

  };
  toDao = (link) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(link)
  }

  onSetMessageState = () => {
    this.setState({ modalMesage: true })
  }
  renderMessageModal = () => {
    return (
      <MessageDialog message="当您增加流动性时，将获得代表您比例的资产池代币。这些令牌会自动赚取与您池中有占份额成比例的费用。" onClose={this.onCloseMessage} />
    )
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }

  //抵押弹窗
  renderMortgageModal = () => {
    const { rewardBXHFactory, pair } = this.state
    return (
      <MortgageBackDialog type='0' onClose={this.onCloseMortgage} onSure={this.onSureMortgage} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} />
    )
  }
  onCloseMortgage = () => {
    this.setState({ isShowDeposit: false })
  }
  //抵押
  onSureMortgage = (inputVal) => {
    this.onCloseMortgage();
    const { rewardBXHFactory, pair, msgContent } = this.state
    const { classes, t } = this.props
    let isDAOOperation = store.checkCurrentIsDaoOperation(pair.id_centerdata)
    store._getAllowanceCount(pair.lptokenAddress, isDAOOperation ? pair.dao_address : pair.pool_address, inputVal, 18, (data) => {
      if (data.isEnough) {
        this.setState({ LingQAndDepoAllowanceAmount: data.allow_decimals })
        this.sendStake(inputVal)
      } else {
        this.setState({ LingQAndDepoAllowanceAmount: 0, approve0Title: t('BXH.allowanceamountup') })
      }

    });
  }

  sendStake = (inputVal) => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    let msg = "Deposit " + inputVal + " " + pair.symbol0
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0 })
    dispatcher.dispatch({ type: STAKEDFK, content: { asset: rewardBXHFactory, pair: pair, amount: inputVal, msgContent: msg, oldAmount: rewardBXHFactory[0].tokens[0].symbol0balance } })
  }
  //取回流动性弹窗
  renderBackModal = () => {
    const { rewardBXHFactory, pair } = this.state
    return (
      <MortgageBackDialog type='1' onClose={this.onCloseBack} onSure={this.onSureBack} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} />
    )
  }

  renderLiquidityModal = () => {
    //isShowRemoveLiquidity
    const { rewardBXHFactory, pair } = this.state
    return (
      <LiquidityDialog onClose={this.onCloseLiquidity} onSure={this.onSureLiquidity} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} />
    )
  }
  renderModal = () => {
    //removeLiquidityAmount
    const { rewardBXHFactory, pair, removeLiquidityAmount } = this.state
    return (
      <ReduceDialog onClose={this.onClose} onNext={this.onNext} tokensData={rewardBXHFactory[0].tokens[0]} pairData={pair} amount={removeLiquidityAmount} />
    )
  }
  onClose = () => {
    this.setState({ isShowRemoveLiquidityConfirm: false })
  }
  onNext = () => {
    this.onClose();

    const { rewardBXHFactory, pair, removeLiquidityAmount } = this.state

    let token1Amount = 0
    let token2Amount = 0
    let tokensData = rewardBXHFactory[0].tokens[0]
    if (tokensData) {
      token1Amount = numberDecimal(parseFloat((removeLiquidityAmount / tokensData.poolTotal) * tokensData.reserveA))
      token2Amount = numberDecimal(parseFloat((removeLiquidityAmount / tokensData.poolTotal) * tokensData.reserveB))
    }
    let msg = "Get " + token1Amount + " " + pair.symbol0 + " and " + token2Amount + " " + pair.symbol1
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    var senddata = {
      amount: removeLiquidityAmount,
      amountAMin: "0",
      amountBMin: "0",
      msgContent: msg
    }
    dispatcher.dispatch({ type: BXHREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: pair, senddata: senddata } })
  }
  onOpenLiquidity = () => {
    this.setState({ isShowRemoveLiquidity: true })
  }
  onCloseLiquidity = () => {
    this.setState({ isShowRemoveLiquidity: false })
  }
  onSureLiquidity = (inputVal) => {
    this.onCloseLiquidity();
    this.setState({ isShowRemoveLiquidityConfirm: true, removeLiquidityAmount: inputVal });
  }
  onCloseBack = () => {
    this.setState({ isShowQuHuiLiuDongXing: false })
  }
  onSureBack = (inputVal) => {
    this.onCloseBack();

    const { rewardBXHFactory, pair, msgContent } = this.state

    let msg = "Unstake " + inputVal + " " + pair.symbol0
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    dispatcher.dispatch({ type: EXITDFK, content: { asset: rewardBXHFactory, pair: pair, amount: inputVal, msgContent: msg, oldamount: rewardBXHFactory[0].tokens[0].userInfo.oldamount } })
  }

  renderNoHaveTrade = () => {
    const { classes, t } = this.props
    const { pair, rewardBXHFactory } = this.state

    return (
      <div>
        <div className={classes.bxhaddmobility} onClick={() => { this.nav() }}>{t('BXH.addzijin')}</div>
      </div>
    )
  }




  nav = () => {
    this.props.history.push('/bxhTradeStake')
  }

  //领取收益授权
  onApprove = () => {
    this.setState({ amountError: false })
    const { rewardBXHFactory, pair, msgContent } = this.state

    this.setState({ loading: true })
    this.setState({ isNoClickShouQuan: false })

    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve" })

    dispatcher.dispatch({ type: APPROVEDFK, content: { asset: rewardBXHFactory, pair: pair, msgContent: "Approve" } })
  }
  // 领取收益
  onWithDrawShouYi = () => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    const { classes, t } = this.props

    let isDAOOperation = store.checkCurrentIsDaoOperation(pair.id_centerdata)
    store._getAllowanceCount(pair.lptokenAddress, isDAOOperation ? pair.dao_address : pair.pool_address, rewardBXHFactory[0].tokens[0].shouyi, 18, (data) => {
      if (data.isEnough) {
        this.setState({ LingQAndDepoAllowanceAmount: data.allow_decimals })
        this.sendWithdrawSY()
      } else {
        this.setState({ LingQAndDepoAllowanceAmount: 0, approve0Title: t('BXH.allowanceamountup') })
      }

    });
  }
  sendWithdrawSY = () => {
    const { rewardBXHFactory, pair, msgContent } = this.state
    this.setState({ modalSend: false })
    let msg = ""

    if (rewardBXHFactory && rewardBXHFactory[0].tokens[0].shouyi) {
      msg = "Claim " + rewardBXHFactory[0].tokens[0].shouyi + " BXH"
    } else {
      msg = "Claim 0 BXH"
    }
    this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    dispatcher.dispatch({ type: STAKEDFK, content: { asset: rewardBXHFactory, pair: pair, amount: "0", msgContent: msg } })
  }
  //抵押 LP
  onDeposit = () => {
    this.setState({ isShowDeposit: true })
  }
  //赎回 LP
  onWithDraw = () => {

    const { rewardBXHFactory, LingQAndDepoAllowanceAmount } = this.state
    //renderBackModal
    if (rewardBXHFactory && LingQAndDepoAllowanceAmount > 0) {
      this.setState({ isShowQuHuiLiuDongXing: true })
    }

  }
  //减少流动性
  onRemoveLiquidity = () => {
    this.onOpenLiquidity()
  }

  onAllowanceRemoveLiquidity = () => {
    //BXHALLOWANCEREMOVELIQUIDITY
    const { rewardBXHFactory, pair } = this.state
    dispatcher.dispatch({ type: BXHALLOWANCEREMOVELIQUIDITY, content: { asset: rewardBXHFactory, pair: pair } })
  }

  renderSendModal = () => {
    const { rewardSymbolPrice, modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} rewardSymbolPrice={rewardSymbolPrice} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }
  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(SingleToken)));
