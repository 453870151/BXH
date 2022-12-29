import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  ClickAwayListener
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import Header from '../unlock/Header.jsx';
import Store from "../../stores";

import SendDialog from '../sendDialog/sendDialog.jsx';
import MessageDialog from '../messageDialog/messageDialog.jsx';
import { numberDecimal } from '../../config/constantFunction'

import BottomReceivedDialog from '../dialog/receivedialog.jsx'
import CustomTooltip from '../customTooltip/customTooltip.jsx';

import cookie from 'react-cookies'
import {
  ERROR,
  GET_BXHTRADESTAKEINIT,
  GET_BXHTRADESTAKEINIT_RETURNED,
  GET_BXHTRADESTAKEApprove,
  GET_BXHTRADESTAKEApprove_RETURNED,
  GET_BXHTRADESTAKEApprove1,
  GET_BXHTRADESTAKEApprove1_RETURNED,
  BXHADDLIQUIDITY,
  BXHADDLIQUIDITY_RETURNED,
  BXHREMOVELIQUIDITY,//减少流动性
  BXHREMOVELIQUIDITY_RETURNED,
  BXHCALCULATION,
  BXHCALCULATION_RETURNED,
  BXHPAGEREFRESH_RETURN,
  BXHGETPAIRBYTOKENS,
  BXHGETPAIRBYTOKENS_RETURNED,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      padding: '26px 24px',
    }
  },
  root1: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '260px',
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
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '70px'
    }
  },
  bxhtConter: {
    background: 'rgba(38, 41, 70, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: '20px'
    }
  },
  imgparent: {
    position: 'absolute',
    top: '20px',
    right: '25px',
    '& img': {
      width: '20px',
      cursor: 'pointer',
    }
  },
  bxhttabs: {
    position: 'relative',
    display: 'flex',
    marginBottom: '30px',
    '& span': {
      position: 'relative',
      display: 'block',
      fontSize: '15px',
      opacity: '.6',
      marginRight: '30px',
      cursor: 'pointer',
    },
    '& i': {
      position: 'absolute',
      right: '0px',
    },
    '& img': {
      width: '15px',
    }
  },
  TabOn: {
    color: '#2EBC84',
    opacity: '1 !important',
    '& em': {
      display: 'block',
      position: 'absolute',
      background: '#2EBC84',
      width: '16px',
      height: '3px',
      left: '50%',
      marginLeft: '-8px',
      bottom: '-8px',
    }
  },
  bxhshuruks: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '10px',
    '& span': {
      display: 'block',
      fontSize: '13px',
      fontWeight: 'bold',
      fontFamily: "consola",
    },
    '& em': {
      fontStyle: 'inherit',
      opacity: '.4',
      paddingRight: '5px',
    }
  },
  bxhbtestm: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #1C1E22'
  },
  bxhbtestmFocus: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    background: '#1C1E22',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #2ebc84'
  },
  bxhicosl: {
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '27px',
    cursor: 'pointer',
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& svg': {
      marginTop: '10px',
      marginLeft: '5px',
    }
  },
  bxhicosl_pc: {
    fontSize: '14px',
    fontWeight: 'bold',
    '& img': {
      width: '25px',
      verticalAlign: 'middle',
      marginRight: '5px',
    },
    '& em': {
      fontStyle: 'normal',
      position: 'relative',
      top: '2px'
    }
  },
  bxhfield: {
    position: 'relative',
    width: '40%',
    paddingTop: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
    }
  },
  bxhInput: {
    width: '90%',
    '& input': {
      fontFamily: "consola",
      padding: '0px',
    }
  },
  bxhmax: {
    display: 'inline-block',
    marginRight: '10px',
    background: '#1E2D2B',
    borderRadius: '6px',
    color: '#2EBC84',
    width: '50px',
    textAlign: 'center',
    cursor: 'pointer',

  },
  bxhjgfen: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontSize: '12px',
    marginBottom: '10px',
    position: 'relative',
    textAlign: 'left',
    '& div': {
      width: '100%'
    },
    '& span': {
      opacity: '.7',
    },
    '& em': {
      fontStyle: 'inherit',
      position: 'absolute',
      right: '0px',
      fontFamily: "consola",
    },
    '& img': {
      height: '14px',
      verticalAlign: 'middle',
      margin: '0 8px',
    }
  },
  bxhjiamt: {
    textAlign: 'right',
    paddingRight: '10px',
    margin: '10px 0',
    '& img': {
      width: '13px',
    }
  },
  bxhjghei: {
    height: '20px',
  },
  bxhbottomUnAbleClickflex: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #4F5257, #4F5257)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px'
  },
  bxhbottomUnAbleClick: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #4F5257, #4F5257)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '10px 0 10px',
  },
  bxhbottom: {
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #2EBC84)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '20px 0 10px',
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
  bxhbottomUnAbleClickflex2: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px',
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
  bxhbottomApproval0: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginRight: '5px',
    marginBottom: '10px'

  },
  bxhbottomApproval1: {
    flex: '2',
    height: '45px',
    lineHeight: '45px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    textAlign: 'center',
    letterSpacing: '1px',
    marginTop: '20px',
    marginLeft: '5px',
    marginBottom: '10px'
  },
  bxhCangwei: {
    background: 'rgba(38, 41, 70, 0.3)',
    borderRadius: '12px',
    marginTop: '20px',
    padding: '20px',
    marginBottom: '30px',
  },
  bxhcwtit: {
    fontSize: '14px',
    '& img': {
      height: '14px',
      marginRight: '5px',
      position: 'relative',
      top: '3px'
    }
  },
  bxhcwshumg: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    fontWeight: '400',
    marginTop: '10px',
    '& span': {
      fontSize: '13px',
      opacity: '.7',
      fontFamily: "consola",
    },
    '& img': {
      width: '25px',
    },
    '& i': {
      display: 'inline-block',
      fontStyle: 'inherit',
      marginLeft: '50px',
      paddingTop: '5px',
    },
    '& em': {
      fontStyle: 'inherit',
      color: '#FFF',
      fontSize: '13px',
      fontFamily: "consola",
    }
  },
  bxhmos1: {
    position: 'absolute',
    left: '0px',
  },
  bxhmos2: {
    position: 'absolute',
    left: '20px',
  },
  approvalparent: {
    display: 'flex'
  },
  bxhTopM: {
    display: 'block',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  btnwenti: {

  },
  toolmsgdialog: {
    background: 'red'
  },
  tooltip: {
    backgroundColor: '#000000'
  },

});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class BxhLiquidity extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const pool = store.getStore('currentdTradePool')  //上页面传来的两个币的数据
    const rewardBXHPools = store.getStore('rewardBXHPools')
    const rewardBXHTokens = store.getStore('rewardBXHTokens')
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const router_address = store.getStore('router_address')
    const pool_address = store.getStore('pool_address')

    // if (!pool) {
    //   props.history.push('/bxhList')
    // }

    store.setStore({ rewardBXHTokens: pool })
    this.state = {
      rewardBXHPools: rewardBXHPools,
      pool: pool,
      rewardBXHTokens: rewardBXHTokens,
      rewardBXHFactory: rewardBXHFactory,
      isNoClickShouQuan: true,
      tokenCalculaResult: null,
      isReserve: false,
      isCanShow: false,
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
      isBtnStateNnormal: true,
      btnTextContent: "",
      modalMesage: false,
      modalReceiveDialog: false,
      isMobile: 1,
      open: false,
      value: 0,
      amount0Focus: 0,
      amount1Focus: 0,
      formOnFocus:0,
      toOnFocus:0,
      isAllowance0Enough:true,
      isAllowance1Enough:true,
      token0AllowanceAmount:1,
      token1AllowanceAmount:1,
      approve0Title:"Approve",
      approve1Title:"Approve",
      upTokenInfo:{
        symbol: 'HLTC',
        address: '0xecb56cf772B5c9A6907FB7d32387Da2fCbfB63b4',  // HT主链地址为WHT地址
        decimals: 18,
        logoURI: 'https://bxh-images.s3.ap-east-1.amazonaws.com/coin/HT.png',
        balance: 0,
        allowance:0,
      },
      bottomTokenInfo:{
        symbol: 'HFIL',
        address: '0xae3a768f9aB104c69A7CD6041fE16fFa235d1810',  // HT主链地址为WHT地址
        decimals: 18,
        logoURI: 'https://bxh-images.s3.ap-east-1.amazonaws.com/coin/HT.png',
        balance: 0,
        allowance:0,
      },
      lpcontractAddress:"0",
      isHave:false,
      router_address:router_address,
      pool_address:pool_address
    }

  }


  // 组件加载完毕 启动定时器
  componentDidMount() {
    setTimeout(this.iTimer, 0);
    this.selectTwoToken()
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
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
  }

  timer = null;
  // 定时器
  iTimer = () => {
    this.timer = setInterval(() => {

    }, 5000);
  }


  componentWillMount() {
    emitter.on(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示

    emitter.on(BXHGETPAIRBYTOKENS_RETURNED,this.getTokensPairAndAllowance) //获取两个token资产和授权
  }

  componentWillUnmount() {
    emitter.removeListener(BXHPAGEREFRESH_RETURN, this.pageRefreshEvent);
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示

    emitter.removeListener(BXHGETPAIRBYTOKENS_RETURNED,this.getTokensPairAndAllowance) //获取两个token资产和授权
    clearInterval(this.timer);
    this.setState = (state, callback) => {
      return;
    }
  };

  pageRefreshEvent = (data) => {
    const { pool } = this.state
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: 1, txHash: data })

    this.selectTwoToken()
  }
  // 新加的
  getTokensPairAndAllowance = (data) => {
    const { t } = this.props
    this.setState({approve0Title:t('BXH.allowanccetitle')})
    this.setState({approve1Title:t('BXH.allowanccetitle')})
    // console.log("查询token的数据----->>>>>",data)
    this.setState({upTokenInfo:data.upTokenInfo,bottomTokenInfo:data.bottomTokenInfo,lpcontractAddress:data.lpTokenAddress,isHave:data.isHave})

    if(this.state.upTokenInfo && this.state.upTokenInfo.address){
      this.setState({token0AllowanceAmount:data.upTokenInfo.allowance})
    }

    if(this.state.bottomTokenInfo && this.state.bottomTokenInfo.address){
      this.setState({token1AllowanceAmount:data.bottomTokenInfo.allowance})
    }
  }

  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };

  render() {
    const { classes, t, location } = this.props;
    const { upTokenInfo,bottomTokenInfo,isMobile,isCanShow,modalSend,modalMesage,modalReceiveDialog } = this.state

    return (
      <div className={classes.root}>
        <Header />

        <div className={classes.root1}>
          <div className={classes.bxhtTit}>
            <h2>{t('BXH.tigongliudongxing')}</h2>
            <h3>{t('BXH.tigongtip')} 换 {t('BXH.zhuanqubxh')}</h3>
          </div>

          <div className={classes.bxhtConter}>
            <div className={classes.bxhttabs}>
              <span className={classes.TabOn}>
                {t('BXH.addzijin')}<em></em>
              </span>
              <span>
                {isMobile == 2 ? t('BXH.mineliudongxing') : t('BXH.jianshaoliudong')}
              </span>

            </div>

            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <CustomTooltip title={t('BXH.msgtip1')}
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
                <i className={classes.imgparent}>
                  <img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.handleTooltipOpen() }} />
                </i>

              </CustomTooltip>
            </ClickAwayListener>

            {/* 流动资金 */}
            {
              this.renderWorking()
            }
          </div>

          {/* 我的仓位 */}
          {
            isCanShow ?
              this.renderPosition()
              :
              null
          }

          {/* 发送中弹窗 */}
          {modalSend && this.renderSendModal()} 
          {/* 按钮弹窗 */}
          {modalMesage && this.renderMessageModal()}
          {/* 预计收到多少弹窗 */}
          {modalReceiveDialog && this.renderReceiveModal()}
        </div>

      </div>
    )

  };

  //按钮提示的显示与隐藏
  handleTooltipOpen = () => {
    this.setState({ open: true });
  };
  handleTooltipClose = () => {
    this.setState({ open: false });
  };
  //预计收到弹窗的关闭与确定
  renderReceiveModal = () => {
    // tokenCalculaResult && currentAmountSymbol0   rewardBXHFactory[0].tokens[0].symbol0balance
    const { tokenCalculaResult, pool, rewardBXHFactory, currentAmountSymbol0, currentAmountSymbol1 } = this.state
    return (
      <BottomReceivedDialog onClose={this.closeSeceive} onSure={this.sureSeceive} caluData={tokenCalculaResult} tokensData={rewardBXHFactory} pairData={pool} amount0={currentAmountSymbol0} amount1={currentAmountSymbol1} />
    )
  }
  closeSeceive = () => {
    this.setState({ modalReceiveDialog: false })
  }
  sureSeceive = () => {
    this.closeSeceive()
    const {
      rewardBXHFactory,
      upTokenInfo,
      bottomTokenInfo,
      router_address
    } = this.state

    const amount0 = this.state["currentAmountSymbol0"]
    const amount1 = this.state["currentAmountSymbol1"]

    // let msg = "Supplying " + amount0 + " " + pool.symbol0 + " for " + amount1 + " " + pool.symbol1
    // this.setState({ modalSend: false })
    // this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: msg })

    // if (!amount0 || !amount1 || amount1 <= 0 || amount0 <= 0) {
    //   return;
    // }
    var senddata = {
      amountADesired: amount0 + "",
      amountBDesired: amount1 + "",
      amountAMin: 0,
      amountBMin: 0,
      msgContent: "ceshi",
      isOut: true,
    }

    let pool = {
      decimals0:upTokenInfo.decimals,
      decimals1:bottomTokenInfo.decimals,
      symbol0Address:upTokenInfo.address,
      symbol1Address:bottomTokenInfo.address,
      symbol0:upTokenInfo.symbol,
      symbol1:bottomTokenInfo.symbol,
      router_address:router_address
    }
    dispatcher.dispatch({ type: BXHADDLIQUIDITY, content: { asset: rewardBXHFactory, pair: pool, senddata: senddata } })
  }

  //发送中弹窗的显示与隐藏
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

  // 流动资金
  renderWorking = () => {
    const { classes, t } = this.props
    
    const { upTokenInfo,bottomTokenInfo,rewardBXHFactory, tokenCalculaResult, isReserve, currentAmountSymbol0, isCanShow, isBtnStateNnormal,formOnFocus,toOnFocus,token0AllowanceAmount,token1AllowanceAmount,approve0Title,approve1Title } = this.state

    const amount0 = this.state["currentAmountSymbol0"]
    const amount1 = this.state["currentAmountSymbol1"]
    return (
      <div>
        {/* 第一个输入 */}
        <div className={classes.bxhcfetm}>
          <div className={classes.bxhshuruks}>
            <span>{t('BXH.inputtitle')}</span>
            <span>
              <em>{t('BXH.yuetitle')}</em>
              { upTokenInfo && upTokenInfo.balance > 0.0001 ? this.SaveToTwoWei(upTokenInfo.balance, 4) : "0.0000" }
            </span>
          </div>

          <div className={formOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus} >
            {this.renderAssetInput1()}
            <div className={classes.bxhicosl} >
                  <span className={classes.bxhmax} onClick={() => { this.MaxValue0() }}>MAX</span>
                  <span>
                    <img src={ upTokenInfo.logoURI } />
                    { upTokenInfo.symbol }
                  </span>
              </div>
          </div>
        </div>

        <div className={classes.bxhjiamt}>
          <img src={require('../../assets/bxh/Combined.png')} />
        </div>

        {/* 第二个输入 */}
        <div className={classes.bxhcfetm}>
          <div className={classes.bxhshuruks}>
            <span>{t('BXH.inputtitle')}</span>
            <span>
              <em>{t('BXH.yuetitle')}</em>
              { bottomTokenInfo && bottomTokenInfo.balance > 0.0001 ? this.SaveToTwoWei(bottomTokenInfo.balance, 4) : "0.0000"}
            </span>
          </div>
          <div className={ toOnFocus === 0 ? classes.bxhbtestm : classes.bxhbtestmFocus }>
            { this.renderAssetInput2() }
            <div className={classes.bxhicosl}>
                <span className={classes.bxhmax} onClick={() => { this.MaxValue1() }}>MAX</span>
                  <span>
                    <img src={ bottomTokenInfo.logoURI } />
                    { bottomTokenInfo.symbol }
                </span>
            </div>
          </div>
        </div>

        <div className={classes.bxhjghei}></div>
        {/* 价格 创建流动性不显示也不用获取数据 */}
        {/* <div>
          {
            isCanShow ?
              <div className={classes.bxhjgfen}>
                <span>{t('BXH.jiagetitle')}</span>
                {
                  isReserve ?
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? numberDecimal(parseFloat(tokenCalculaResult[0].tokens[0].tokenB / tokenCalculaResult[0].tokens[0].tokenA)) : "0"} &nbsp;
              {pool ? pool.symbol1 + " per " + pool.symbol0 : ""}
                    </em>
                    :
                    <em>
                      <i><img src={require('../../assets/bxh/ziyuan.png')} onClick={() => { this.changeReverse() }} /></i>
                      {tokenCalculaResult ? numberDecimal(parseFloat(tokenCalculaResult[0].tokens[0].tokenA / tokenCalculaResult[0].tokens[0].tokenB)) : "0"} &nbsp;
              {pool ? pool.symbol0 + " per " + pool.symbol1 : ""}
                    </em>
                }
              </div>
              :
              null
          }
        </div> */}

        {/* 预计份额 创建流动性不显示也不用获取数据 */}
        {/* <div className={classes.bxhjgfen}>
          {
            isCanShow ?
              <div>
                <span>
                  {t('BXH.yujititle')}
                  <img src={require('../../assets/bxh/wenti.png')} />
                </span>
                <em>
                  {
                    tokenCalculaResult && currentAmountSymbol0 && numberDecimal(parseFloat((currentAmountSymbol0 / tokenCalculaResult[0].tokens[0].reserveA) * 100)) > 0.01 ?
                      numberDecimal(parseFloat((currentAmountSymbol0 / tokenCalculaResult[0].tokens[0].reserveA) * 100)) + "%"
                      :
                      "<0.01%"
                  }
                </em>
              </div>
              :
              null
          }

        </div> */}

        {/* 确认按钮 */}
        <div>
          {
            isBtnStateNnormal ?
              <div>
                {
                  //两个币都没授权
                  token0AllowanceAmount == 0 && token1AllowanceAmount == 0 ?
                    <div>
                      <div className={classes.approvalparent}>
                        {
                          token0AllowanceAmount == 0 && upTokenInfo.symbol != 'HT' ?
                          <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{ approve0Title } {upTokenInfo.symbol}</div>
                          :
                          null
                        }
                        {
                          token1AllowanceAmount == 0 && bottomTokenInfo.symbol != 'HT' ?
                            <div className={classes.bxhbottomApproval1} onClick={() => { this.onApprove1() }}>{ approve1Title } {bottomTokenInfo.symbol}</div>
                            :
                            null
                        }
                      </div>
                      {
                        amount0 == 0 || amount1 == 0 || !isCanShow ?
                          <div className={classes.bxhbottomUnAbleClick}>{t('BXH.weishurutitle')}</div>
                          :
                          <div className={classes.bxhbottom} onClick={() => { this.onAddLiquidity() }}>{t('BXH.confirmtitle')}</div>
                      }
                    </div>
                    :
                    <div className={classes.approvalparent}>
                      {
                        token0AllowanceAmount == 0 && upTokenInfo.symbol != 'HT' ?
                          <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{approve0Title} {upTokenInfo.symbol}</div>
                          :
                          null
                      }
                      {
                        token1AllowanceAmount == 0 && bottomTokenInfo.symbol != 'HT' ?
                          <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove1() }}>{approve1Title} {bottomTokenInfo.symbol}</div>
                          :
                          null
                      }

                      {
                        amount0 == 0 || amount1 == 0 || !isCanShow ?
                          <div className={classes.bxhbottomUnAbleClickflex}>{t('BXH.weishurutitle')}</div>
                          :
                          <div className={classes.bxhbottomUnAbleClickflex2} onClick={() => { this.onAddLiquidity() }}>{t('BXH.confirmtitle')}</div>
                      }
                    </div>
                }
              </div>
              :
              <div>
                {
                  token0AllowanceAmount == 0 && token1AllowanceAmount == 0 ?
                    <div>
                      <div className={classes.approvalparent}>
                        {
                          token0AllowanceAmount == 0 && upTokenInfo.symbol != 'HT' ?
                            <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{approve0Title} {upTokenInfo.symbol}</div>
                            :
                            null
                        }
                        {
                          token1AllowanceAmount == 0 && bottomTokenInfo.symbol != 'HT' ?
                            <div className={classes.bxhbottomApproval1} onClick={() => { this.onApprove1() }}>{approve1Title} {bottomTokenInfo.symbol}</div>
                            :
                            null
                        }
                      </div>
                      {
                        amount0 == 0 && amount1 == 0?
                        <div className={classes.bxhbottomUnAbleClickflex}>{t('BXH.weishurutitle')}</div>
                        :
                        <div className={classes.bxhbottomUnAbleClickflex}>{t('BXH.yuebuzutitle')}</div>
                      }
                    </div>
                    :
                    <div className={classes.approvalparent}>
                      {
                        token0AllowanceAmount == 0 && upTokenInfo.symbol != 'HT' ?
                          <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove0() }}>{approve0Title} {upTokenInfo.symbol}</div>
                          :
                          null
                      }
                      {
                        token1AllowanceAmount == 0 && bottomTokenInfo.symbol != 'HT' ?
                          <div className={classes.bxhbottomApproval0} onClick={() => { this.onApprove1() }}>{approve1Title} {bottomTokenInfo.symbol}</div>
                          :
                          null
                      }

                      {
                        amount0 == 0 && amount1 == 0?
                        <div className={classes.bxhbottomUnAbleClickflex}>{t('BXH.weishurutitle')}</div>
                        :
                        <div className={classes.bxhbottomUnAbleClickflex}>{t('BXH.yuebuzutitle')}</div>
                      }
                    </div>
                }
              </div>
          }
        </div>
      </div>
    )
  }

  // 我的仓位
  renderPosition = () => {
    const { classes, t } = this.props
    const {
      rewardBXHFactory,
      pool,
      tokenCalculaResult
    } = this.state
    return (
      <div className={classes.bxhCangwei}>
        <div className={classes.bxhcwtit}>
          <img src={require('../../assets/bxh/Fill.png')} />
          {t('BXH.minecangweititle')}
        </div>
        <div className={classes.bxhcwshumg}>
          <em>
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/HT%402x.png" className={classes.bxhmos1} />
            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/%E5%9B%BE%E6%A0%87/USDT%402x.png" className={classes.bxhmos2} />
            <i>{pool ? pool.symbolPair : ""}</i>
          </em>
          <em>{rewardBXHFactory && rewardBXHFactory[0].tokens[0].mineLpAmount ?
            numberDecimal(parseFloat(rewardBXHFactory[0].tokens[0].mineLpAmount))
            :
            0.00}</em>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool ? pool.symbol0 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].mineLpAmount / rewardBXHFactory[0].tokens[0].poolTotal) * tokenCalculaResult[0].tokens[0].reserveA + "")) : "0"}</span>
        </div>
        <div className={classes.bxhcwshumg}>
          <span>{pool ? pool.symbol1 : ""}</span>
          <span>{rewardBXHFactory && tokenCalculaResult ? numberDecimal(parseFloat((rewardBXHFactory[0].tokens[0].mineLpAmount / rewardBXHFactory[0].tokens[0].poolTotal) * tokenCalculaResult[0].tokens[0].reserveB + "")) : "0"}</span>
        </div>
      </div>
    )
  }
  //控件相关方法

  // 第一个输入
  renderAssetInput1 = (asset, type) => {
    const { classes, t } = this.props
    const amount0 = this.state["currentAmountSymbol0"]
    const {
      rewardBXHFactory,
    } = this.state

    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          // disabled={ loading }
          className={classes.bxhInput}
          // id={ '' + asset.id + '_' + type }
          value={amount0 || ''}
          // error={ amountError }
          onChange={this.onChange0.bind(this, rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? (Math.floor(rewardBXHFactory[0].tokens[0].symbol0balance * 10000) / 10000) : '0.00')}
          onFocus={ this.onFocusFrom.bind() }  // 获得焦点
          onBlur={ this.onBlurFrom.bind() } // 失去焦点
          placeholder="0.00"
          variant="outlined"
        />
        {/* <div className={classes.bxhmax} onClick={() => { this.MaxValue0() }}>MAX</div> */}
      </div>
    )
  }
  // 第二个输入
  renderAssetInput2 = (asset, type) => {
    const { classes, t } = this.props
    const amount1 = this.state["currentAmountSymbol1"]
    const {
      rewardBXHFactory,
    } = this.state
    return (
      <div className={classes.bxhfield}>
        <TextField
          fullWidth
          // disabled={ loading }
          className={classes.bxhInput}
          // id={ '' + asset.id + '_' + type }
          value={amount1 || ''}
          // error={ amountError }
          onChange={this.onChange1.bind(this, rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? (Math.floor(rewardBXHFactory[0].tokens[0].symbol1balance * 10000) / 10000) : '0.00')}
          onFocus={ this.onFocusTo.bind() }  // 获得焦点
          onBlur={ this.onBlurTo.bind() } // 失去焦点
          placeholder="0.00"
          variant="outlined"
        />
        {/* <div className={classes.bxhmax} onClick={() => { this.MaxValue1() }}>MAX</div> */}
      </div>
    )
  }
  MaxValue0 = (assetId, type) => {
    const {
      rewardBXHFactory,
      tokenCalculaResult
    } = this.state

    let balance = rewardBXHFactory[0].tokens[0].symbol0balance && rewardBXHFactory[0].tokens[0].symbol0balance > 0.0001 ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let val = []
    val["currentAmountSymbol0"] = balance + ''
    val["currentAmountSymbol1"] = this._getToolNumber(val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili)
    this.setState(val)

    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (balance0 >= parseFloat(val["currentAmountSymbol0"]) && balance1 >= parseFloat(val["currentAmountSymbol1"])) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false
    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

  }
  MaxValue1 = (assetId, type) => {
    const {
      rewardBXHFactory,
      tokenCalculaResult
    } = this.state

    let balance = rewardBXHFactory[0].tokens[0].symbol1balance && rewardBXHFactory[0].tokens[0].symbol1balance > 0.0001 ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"
    let val = []
    val["currentAmountSymbol1"] = balance + ''
    val["currentAmountSymbol0"] = this._getToolNumber(val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili)
    this.setState(val)
    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if (balance0 >= parseFloat(val["currentAmountSymbol0"]) && balance1 >= parseFloat(val["currentAmountSymbol1"])) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false
    }

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

  }
  onChange0 = (value, event) => {
    let val = []
    const {
      rewardBXHFactory,
      tokenCalculaResult,
      isBtnStateNnormal, btnTextContent, pool,isHave
    } = this.state
    val["currentAmountSymbol0"] = event.target.value
    this.setState(val)

    if(isHave){
      val["currentAmountSymbol1"] = tokenCalculaResult ? val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili : "0.00"
    }
    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])

    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

    let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
    let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"

    if(!pool){
      return;
    }
    if (!tokenCalculaResult) {
      return;
    }
    if (parseFloat(balance0) >= parseFloat(event.target.value) && parseFloat(balance1) >= parseFloat(val["currentAmountSymbol0"] * tokenCalculaResult[0].tokens[0].bili)) {
      this.state.isBtnStateNnormal = true
    } else {
      this.state.isBtnStateNnormal = false

      if (balance0 < event.target.value && pool) {
        this.state.btnTextContent = pool.symbol0
      } else if (pool) {
        this.state.btnTextContent = pool.symbol1
      }
    }


  }

  onChange1 = (value, event) => {
    let val = []
    const {
      rewardBXHFactory,
      tokenCalculaResult,
      pool,
      isHave
    } = this.state
    val["currentAmountSymbol1"] = event.target.value
    this.setState(val)


    this.onCheckAllowance0IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])
    this.onCheckAllowance1IsEnough(val["currentAmountSymbol0"],val["currentAmountSymbol1"])

    if(!pool){
      return;
    }
    if(isHave){
      val["currentAmountSymbol0"] = tokenCalculaResult ? val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili : "0.00"
      let balance0 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol0balance ? rewardBXHFactory[0].tokens[0].symbol0balance : "0"
      let balance1 = rewardBXHFactory && rewardBXHFactory[0].tokens[0].symbol1balance ? rewardBXHFactory[0].tokens[0].symbol1balance : "0"
      if (parseFloat(balance0) >= parseFloat(val["currentAmountSymbol1"] / tokenCalculaResult[0].tokens[0].bili) && parseFloat(balance1) >= parseFloat(event.target.value)) {
        this.state.isBtnStateNnormal = true
      } else {
        this.state.isBtnStateNnormal = false
  
        if (balance0 < event.target.value && pool) {
          this.state.btnTextContent = pool.symbol0
        } else if (pool) {
          this.state.btnTextContent = pool.symbol1
        }
      }
    }


    if (val["currentAmountSymbol0"] > 0 || val["currentAmountSymbol1"] > 0) {
      this.state.isCanShow = true
    } else {
      this.state.isCanShow = false
    }

  }
  onFocusFrom = () => {
    const formOnFocus = this.state
    this.setState({
      formOnFocus: 1
    })
  }
  onBlurFrom = () => {
    const formOnFocus = this.state
    this.setState({
      formOnFocus: 0
    })
  }
  onFocusTo = () => {
    const toOnFocus = this.state
    this.setState({
      toOnFocus: 1
    })
  }
  onBlurTo = () => {
    const toOnFocus = this.state
    this.setState({
      toOnFocus: 0
    })
  }
  onFocusAmount0 = () => {
    const amount0Focus = this.state
    this.setState({
      amount0Focus: 1
    })
  }
  onBlurAmount0 = () => {
    const amount0Focus = this.state
    this.setState({
      amount0Focus: 0
    })
  }
  onFocusAmount1 = () => {
    const amount1Focus = this.state
    this.setState({
      amount1Focus: 1
    })
  }
  onBlurAmount1 = () => {
    const amount1Focus = this.state
    this.setState({
      amount1Focus: 0
    })
  }

  selectTwoToken = () => {
    const{ upTokenInfo,bottomTokenInfo } = this.state
    dispatcher.dispatch({ type: BXHGETPAIRBYTOKENS, content: {upTokenInfo:upTokenInfo,bottomTokenInfo:bottomTokenInfo} })
  }  

    //跳转到我的流动性和移除流动性界面
    nav = (pairData) => {
      store.setStore({ currentdTradePool: pairData })
      this.props.history.push('/bxhTradeMobility')
    }
    //改变 token0 per token1 的显方式
    changeReverse = () => {
      this.setState({ isReserve: !this.state.isReserve })
    }
  //控件相关方法结束

  //点击添加流动性和发送的弹窗 开始
  onAddLiquidity = () => {
    // this.setState({ modalReceiveDialog: true })
    this.sureSeceive()
  }
  renderSendModal = () => {
    const { rewardSymbolPrice, modalSendType, msgContent, txHash } = this.state
    return (
      <SendDialog onClose={this.onCloseSend} type={modalSendType} symbolContent={msgContent} txHash={txHash} />
    )
  }
  onCloseSend = () => {
    this.setState({ modalSend: false })
  }
  //点击添加流动性和发送的弹窗 结束


  //操作方法开始

    //授权 token0
    onApprove0 = () => {
      this.setState({ amountError: false })
      const { rewardBXHFactory,upTokenInfo } = this.state
  
      this.setState({ loading: true })
      this.setState({ isNoClickShouQuan: false })
  
      this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve " + upTokenInfo.symbol })
      let pool = {
        router_address : store.getStore('router_address'),
        symbol0Address: upTokenInfo.address
      }

      dispatcher.dispatch({ type: GET_BXHTRADESTAKEApprove, content: { asset: rewardBXHFactory, pair: pool, msgContent: "Approve " + upTokenInfo.symbol, } })
    }
    //授权 token1
    onApprove1 = () => {
      this.setState({ amountError: false })
      const { rewardBXHFactory, bottomTokenInfo, msgContent } = this.state
  
      this.setState({ loading: true })
      this.setState({ isNoClickShouQuan: false })
  
      this.setState({ modalSend: true, loading: false, modalSendType: 0, msgContent: "Approve " + bottomTokenInfo.symbol })
      let pool = {
        router_address : store.getStore('router_address'),
        symbol1Address: bottomTokenInfo.address
      }
      dispatcher.dispatch({ type: GET_BXHTRADESTAKEApprove1, content: { asset: rewardBXHFactory, pair: pool, msgContent: "Approve " + bottomTokenInfo.symbol } })
    }

  //操作方法结束


  //通用方法

  _getToolNumber = (num_str) => {
    num_str = num_str.toString();
    if (num_str.indexOf("+") != -1) {
      num_str = num_str.replace("+", "");
    }
    if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
      var resValue = "",
        power = "",
        result = null,
        dotIndex = 0,
        resArr = [],
        sym = "";
      var numStr = num_str.toString();
      if (numStr[0] == "-") {
        // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
        numStr = numStr.substr(1);
        sym = "-";
      }
      if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
        var regExp = new RegExp(
          "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
          "ig"
        );
        result = regExp.exec(numStr);
        if (result != null) {
          resValue = result[2];
          power = result[5];
          result = null;
        }
        if (!resValue && !power) {
          return false;
        }
        dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
        resValue = resValue.replace(".", "");
        resArr = resValue.split("");
        if (Number(power) >= 0) {
          var subres = resValue.substr(dotIndex);
          power = Number(power);
          //幂数大于小数点后面的数字位数时，后面加0
          for (var i = 0; i < power - subres.length; i++) {
            resArr.push("0");
          }
          if (power - subres.length < 0) {
            resArr.splice(dotIndex + power, 0, ".");
          }
        } else {
          power = power.replace("-", "");
          power = Number(power);
          //幂数大于等于 小数点的index位置, 前面加0
          for (var i = 0; i < power - dotIndex; i++) {
            resArr.unshift("0");
          }
          var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
          resArr.splice(n, 0, ".");
        }
      }
      resValue = resArr.join("");

      return sym + resValue;
    } else {
      return num_str;
    }
  }
  
  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }
  
  //判断token0授权额度是否足够
  onCheckAllowance0IsEnough = (amount0,amount1) => {
    const{ upTokenInfo,router_address } = this.state
    const { t } = this.props
    if (!amount0 || amount0 === "" || amount0 ==="0" || amount0==="0.") {
      amount0 = "0"
    }

    store._getAllowanceCount(upTokenInfo.address,router_address,amount0,upTokenInfo.decimals,(data) => {
      this.setState({isAllowance0Enough:data.isEnough})
      // sureSeceiveStepTwo

      if (data.isEnough) {
        this.setState({token0AllowanceAmount:data.allow_decimals})
      }else{
        this.setState({token0AllowanceAmount:0,approve0Title:t('BXH.allowanceamountup')})
      }

    });
  }
  //判断token1授权额度是否足够
  onCheckAllowance1IsEnough = (amount0,amount1) => {
    const{ bottomTokenInfo,router_address } = this.state
    const { t } = this.props
    if (!amount1 || amount1 === "" || amount1 ==="0" || amount1==="0.") {
      amount1 = "0"
    }

    store._getAllowanceCount(bottomTokenInfo.address,router_address,amount1,bottomTokenInfo.decimals,(data) => {
      this.setState({isAllowance1Enough:data.isEnough})
      if (data.isEnough) {
        this.setState({token1AllowanceAmount:data.allow_decimals})
      }else{
        this.setState({token1AllowanceAmount:0,approve1Title:t('BXH.allowanceamountup')})
      }

    });

  }

  //通用方法结束


}

export default withNamespaces()(withRouter(withStyles(styles)(BxhLiquidity)));
