import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Card,
  TextField,
  ClickAwayListener
} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import BscCustomTooltip from '../customTooltip/bscCustomTooltip.jsx';
import Link from '@material-ui/core/Link';
import { withNamespaces } from 'react-i18next';
import { Tooltip } from 'antd';

import UnlockModal from '../unlock/unlockModal.jsx'
import Store from "../../stores";
import { colors } from '../../theme'
import Header from '../unlock/Header.jsx';
import Footer from '../unlock/Footer.jsx';
import CountUp from 'react-countup';
import cookie from 'react-cookies'
import { numberDecimal, toolNumber, addCookie, removeCookie, isEmpty, isNoEmpty, getStyleClass, getNewStyleClass } from '../../config/constantFunction'


import {
  ERROR,
  CONFIGURE_RETURNED,
  GET_BXHList_PERPETUAL,
  GET_BXHList_PERPETUAL_RETURNED,
  BXHLISTBALANCEHOME,
  BXHLISTBALANCEHOME_RETURNED,
  BXHCHNAGEACCOUNT,
  BXHSHOUYI_RETURN
} from '../../constants'
import { Dispatcher } from "flux";

const styles = theme => ({
  root: {
    
  },
  bxhprices: {
    display: 'flex',
    borderRadius: '4px',
    height: '35px',
    marginBottom: '10px',
    '& span': {
      display: 'block',
      flex: '2',
      lineHeight: '35px',
      marginLeft: '20px',
      fontSize: '12px',
      fontFamily: "consola",
    },
    '& em': {
      display: 'contents',
      fontStyle: 'normal'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  counttitle: {
    fontSize: '12px',
    color: '#FFFFFF',
    opacity: 0.7
  },
  countparent: {
    textAlign: 'right',
    marginRight: '20px',
    fontWeight: 'bold'
  },
  wakuangparent: {
    borderRadius: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  areaconter: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      display: 'flex',
      margin: '0 10px',
    }
  },
  areatype: {
    width: '100%',
    textAlign: 'center',
    '& span': {
      marginLeft: '10px',
      marginRight: '10px',
      fontSize: '15px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginBottom: '20px',
      marginTop: '30px',
      textAlign: 'center',
    }
  },
  areass: {
    width: '100%',
    display: 'flex',//'none',
    padding: '10px 0px',
    marginTop: '20px',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: '20px',
      right: '0px',
      width: '190px',
      marginTop: '0px',
    }
  },
  arealistss: {
    width: '50%',
    color: '#BCBEC5',
    fontSize: '13px',
    lineHeight: '20px',
    marginLeft: '10px',
    cursor: 'pointer',
    '& img': {
      width: '12px',
      margin: '0 5px',
      verticalAlign: 'middle',
      marginLeft: '0px'
    },
    '& span': {
      marginRight: '5%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '80px'
    }
  },
  bxhInput: {
    width: '45%',
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


  btnparent_new: {
    marginTop: '-8px',
    display: 'flex'
  },
  rightparent: {
    '& span': {
      display: 'initial',
      padding: '20px 0 0',
      fontSize: '18px',
      fontWeight: 'bold'
    }
  },
  searchImg: {
    width: '15px',
    height: '15px',
    position: 'relative',
    right: '20px',
    top: '7px'
  },
  tiaomuParent: {
    display: 'flex',
    marginLeft: '10px',
    marginRight: '10px',
    [theme.breakpoints.up('sm')]: {
      height: '60px'
    }
  },
  tiaomu: {
    width: '30%',
    fontSize: '12px',
    textAlign: 'right',
    color: 'rgba(255,255,255,0.45)',
    [theme.breakpoints.up('sm')]: {
      position: 'relative',
      lineHeight: '60px',
      textAlign: 'center',
      fontSize: '15px',
      width: '15%'
    }
  },
  tiaomuflex2: {
    width: '40%',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.45)'
  },
  homeSingle: {
    '& span': {
      background: '#2f273e',
      color: '#9f3751',
      fontSize: '12px',
      marginLeft: '10px',
      borderRadius: '3px',
      padding: '2px 5px',
      fontWeight: 'bold',
    }
  },
  ethhomeSingle: {
    '& span': {
      background: '#413644',
      color: '#c04b51',
      fontSize: '12px',
      marginLeft: '10px',
      borderRadius: '3px',
      padding: '2px 5px',
      fontWeight: 'bold',
    }
  },
  imgStyleNew: {
    width: '15px',
    verticalAlign: 'middle',
    [theme.breakpoints.up('sm')]: {
      width: '25px',
      verticalAlign: 'middle',
    }
  },
  listItemParent: {
    height: '65px',
    padding: '10px',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      padding: '23px',
      '&:active': {
        backgroundImage: 'none',
        backgroundColor: 'rgba(19, 119, 80, 0)',
      },
    }
  },
  rightparent_new: {
    fontStyle: 'normal',
    '& span': {
      display: 'initial',
      padding: '20px 0 0',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,1)',
      [theme.breakpoints.up('sm')]: {
        fontSize: '15px',
        color: 'rgba(255,255,255,1)',

      }
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15px',
      color: 'rgba(255,255,255,1)'
    }
  },
  rightparent_new_new: {
    fontStyle: 'normal',
    '& span': {
      display: 'initial',
      padding: '20px 0 0',
      fontSize: '11px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.6)',
      [theme.breakpoints.up('sm')]: {
        fontSize: '11px',
        color: 'rgba(255,255,255,0.6)',

      }
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15px',
      color: 'rgba(255,255,255,1)'
    }
  },
  rightparent_new_new1: {
    '& span': {
      color: 'rgba(255,255,255,1)',
      [theme.breakpoints.up('sm')]: {
        color: 'rgba(255,255,255,1)',
      }
    },
  },
  rightparent_new_hint: {
    fontStyle: 'normal',
    '& span': {
      display: 'initial',
      padding: '20px 0 0',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,1)',
      [theme.breakpoints.up('sm')]: {
        fontSize: '15px',
        color: 'rgba(255,255,255,0.6)',

      }
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15px',
      color: 'rgba(255,255,255,1)'
    }
  },
  rightparent_new_green: {
    fontStyle: 'normal',
    '& span': {
      display: 'initial',
      padding: '20px 0 0',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,1)',
      [theme.breakpoints.up('sm')]: {
        fontSize: '15px',
        color: '#31BE86',

      }
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '15px',
      color: 'rgba(255,255,255,1)'
    }
  },
  bxhaddmobility_new_btn: {
    flex: '1',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '32px',
    width: '70px',
    lineHeight: '32px',
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
  bxhaddmobility_new_btn2: {
    border: '1px solid #30BE85',
    height: '32px',
    width: '90px',
    lineHeight: '28px',
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
  btntool: {
    marginLeft: '10px',
    '& img': {
      width: '13px',
      cursor: 'pointer',
      verticalAlign: 'revert',
      paddingTop: '5px',
    }
  },
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class BxhList extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    const PoolList = store.getStore('PoolList')
    const StakedPoolList = JSON.parse(localStorage.getItem("StakedPoolList"))
    const SinglePoolList = JSON.parse(localStorage.getItem("SinglePoolList"))
    let myAllLiquidity = JSON.parse(localStorage.getItem("myAllLiquidity"));

    this.state = {
      loading: !(account),
      account: account,
      poolBalance: '0.00',
      curPrice: '0.0000',
      TotalSupply: '0.00',
      CalcDFK: '0.00',
      bonusPer: '--',
      rewardBXHFactory: rewardBXHFactory,
      PoolList: PoolList,
      oldPoolList: null,
      currentSelectindex: 6,
      isMobile: 1,
      myAllLiquidity: myAllLiquidity,
      isOnlyShowMyJoin: false,
      inputSearchVal: "",
      StakedPoolList: StakedPoolList,
      SinglePoolList: SinglePoolList,
      currentType_sort: 0,
      currentIndex_sort: 1,
      open: false,
      footerMShow: true,
      wHeight: '',
      farmsListArr: [],
      cPoolArray: [],
    }

    store._getMineStakedPool((stakedList) => {
      localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
      store.setStore({ StakedPoolList: stakedList })
      this.setState({ StakedPoolList: stakedList })
    })

    store._getSingleStakedPool((stakedList) => {
      localStorage.setItem("SinglePoolList", JSON.stringify(stakedList));
      store.setStore({ SinglePoolList: stakedList })
      this.setState({ SinglePoolList: stakedList })
    })
  }

  componentWillMount() {
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(BXHLISTBALANCEHOME_RETURNED, this.getBXHbalance);
    emitter.on(GET_BXHList_PERPETUAL_RETURNED, this.updateList);
    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //????????????
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(BXHLISTBALANCEHOME_RETURNED, this.getBXHbalance);
    emitter.removeListener(GET_BXHList_PERPETUAL_RETURNED, this.updateList);
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //????????????
    // this.setState = (state, callback) => {
    //   return;
    // }
  };

  changeAccount = () => {
    dispatcher.dispatch({ type: GET_BXHList_PERPETUAL, content: {} })  //???????????????
  }

  getBXHbalance = (data) => {
    this.setState({ rewardBXHFactory: data })
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID==='66' || chainID==='1'){
      this.setState({ currentSelectindex: 5 });
    }else{
      this.setState({ currentSelectindex: 6 });
    }
  }

  configureReturned = () => {
    this.setState({ loading: false })
  }

  updateList = (data) => {
    const that = this
    const tempBxhInfo = that.state.PoolList;
    if (tempBxhInfo) {
      that.setState({ oldPoolList: tempBxhInfo })
    }
    this.setState({ PoolList: data })
    const { PoolList } = this.state
    if (PoolList) {
      // dispatcher.dispatch({ type: BXHLISTBALANCEHOME, content: { asset: PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_token } })
    }
  }

  closeAlert = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: 2 })
    } else {  // PC???
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //?????????????????????????????? 
    window.addEventListener('resize', this.handleResize.bind(this)) //????????????????????????

    dispatcher.dispatch({ type: GET_BXHList_PERPETUAL, content: {} })  //???????????????

    const { i18n } = this.props;
    let language = i18n.language;
    let changeLanguage = "";
    if(window.location.hash === "#/liquidity?lang=en"){
      changeLanguage = "en";
    }else if(window.location.hash === "#/liquidity?lang=zh-CN"){
      changeLanguage = "zh";
    }
    i18n.changeLanguage(changeLanguage)
    this.requestFarmsInfo();

    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID==='66' || chainID==='1'){
      this.setState({ currentSelectindex: 5 });
    }else{
      this.setState({ currentSelectindex: 6 });
    }
  }
  requestFarmsInfo = ()=>{
    let farmsContract = '0x30c6e1a43e4A93Bab7Fd15c5b55A753342e10207';
    store._getFarmsPool(data=>{
      let farmsListArr = data.pool;
      for(let i=0;i<farmsListArr.length;i++){
        let item = farmsListArr[i];
        store._getSingleSimpleInfo(farmsContract,item.exId,(err,info)=>{
          if(isEmpty(err)){
            item.userInfo = info;
            this.setState({farmsListArr:[...farmsListArr]});
          }
        });
      }
      this.setState({farmsListArr});
    });
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // ?????????
      this.setState({ isMobile: 2 })
    } else {  // PC???
      this.setState({ isMobile: 1 })
    }

    const { wHeight } = this.state;
    var hh = window.innerHeight; //???????????????????????? 
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


  render() {
    const { classes, t, i18n } = this.props;
    const { account, modalOpen } = this.state
    var address = null;
    if (account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    }
    return (
      <div style={{ width: '100%' }}>
        {/* ???????????? */}
        <Header openUnlockModal={this.openUnlockModal} pagetype="liquidity" />

        <div className="pcContent">
          <div className="container kc-main">
            <div className="title12">{t('BXH.liquidityminingtitle')}</div>
            {/* ?????????????????????????????????????????????????????????????????????????????????????????????????????????BXH?????? */}
            {this.renderTransaction()}
            {/* ???????????? */}
            {this.renderDate()}
          </div>
        </div>

        {/* ???????????? */}
        <Footer pagetype="liquidity"/>

        {modalOpen && this.renderModal()}
      </div>
    )
  }

  // ?????????????????????????????????????????????????????????????????????????????????????????????????????????BXH??????
  renderTransaction = () => {
    const { classes, t } = this.props
    const { rewardBXHFactory, PoolList, oldPoolList } = this.state
    return (
      <div className={getNewStyleClass('kc-chianitem1', 'kc-item1')}>
          {/* ??????????????? start */}
          <div className={getStyleClass('bxhlistbg',classes.bxhprices)}>
            {/* ???????????? */}
            <em>
              <span className={classes.counttitle}>{t('BXH.listprice')}</span>
              <span className={classes.countparent}>
                ${PoolList ? this.SaveToTwoWei(PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price, 4) : "0"}
              </span>
            </em>
            {/* ?????? */}
            <em>
              <span className={classes.counttitle}>{t('BXH.listbalance')}</span>
              <span className={classes.countparent}>
                {
                  rewardBXHFactory && rewardBXHFactory[0].tokens[0].bxhbanance ?
                    this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].bxhbanance + "") + ""
                    :
                    "0.00"
                }
              </span>
            </em>
          </div>
          {/* ??????????????? end */}

          <ul className="row">
              <li className="col-md-3 col-xs-6">
                  <div className="bg1">
                    <div className="n">{t('BXH.homeliquzhiya')}($)</div>
                    <div className="s">
                      {PoolList ?
                        (
                          <CountUp
                            start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? oldPoolList[0].tokens[0].symbolTokens.bxh_info.tvl_total : 0)}
                            end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.tvl_total : 0)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                  </div>
              </li>
              <li className="col-md-3 col-xs-6">
                  <div className="bg1">
                    <div className="n">{t('BXH.listproduce')}</div>
                    <div className="s">
                      {PoolList ?
                        (
                          <CountUp
                            start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? oldPoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine : 0)}
                            end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine : 0)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                  </div>
              </li>
              <li className="col-md-3 col-xs-6">
                  <div className="bg1">
                    <div className="n">{t('BXH.listmarket')}($)</div>
                    <div className="s">
                      {PoolList ?
                        (
                          <CountUp
                            start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? oldPoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine * oldPoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                            end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                  </div>
              </li>
              <li className="col-md-3 col-xs-6">
                  <div className="bg1">
                    <div className="n">{t('BXH.listmoney')}($)</div>
                    <div className="s">
                      {PoolList ?
                        (
                          <CountUp
                            start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? (820000000 - oldPoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine) * oldPoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                            end={this.SaveToTwoWei(PoolList ? (820000000 - PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine) * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                  </div>
              </li>
          </ul>
      </div>
    )
  }

  // ????????????
  renderDate = () => {
    const { classes, t } = this.props
    const { isMobile, currentSelectindex, PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    let PoolDataList = PoolList && PoolList[0].tokens[0].symbolTokens
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={classes.wakuangparent}>
        {/* Table?????????????????? */}
        <div className={classes.areaconter}>
          <div className={getStyleClass('TabConter',classes.areatype)}>
              {/* ????????????v2 */}
              {
                chainID === '56' || chainID === '128' || chainID === '43114' ?
                <span className={currentSelectindex === 6 ? "bxhTabOn" : "bxhTabOff"} 
                onClick={() => {this.changeSelectIndex(6)}}>
                  {t('BXH.liquerPool')}<em></em>
                </span>
                :
                <span className={currentSelectindex === 5 ? "bxhTabOn" : "bxhTabOff"} 
                onClick={() => { this.changeSelectIndex(5) }}>
                  {t('BXH.liquerPool')}<em></em>
                </span>
              }
              {/* HECO??????????????????(V2),?????????USDT */}
              {
                chainID === '128' && PoolDataList && PoolDataList.pool_7.length > 0 ?
                <span className={currentSelectindex === 7 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(7) }}>
                  {t('BXH.mainarea')}<em></em>
                </span>
                :
                null
              }
              {/* ?????? */}
              {
                chainID !== '128' ?
                <span className={currentSelectindex === 0 ? "bxhTabOn" : "bxhTabOff"} 
                onClick={() => { this.changeSelectIndex(0) }}>
                  {t('BXH.mainarea')}<em></em>
                </span>
                :
                null
              }
              {/* ????????? */}
              {
                chainID === '56' || chainID === '128' ?
                <span className="bxhTabOff" onClick={() => {this.nav('liquidityv1')}}>
                  {t('BXH.OldPool')}<em></em>
                </span>
                :
                null
              }
          </div>
          {
            isMobile === 1 ?
            <div className={classes.areass}>
              <div className={classes.arealistss} onClick={() => {this.changeListSS()}}>
                <span className={getNewStyleClass(isOnlyShowMyJoin?'selectable':'unselect')}></span>
                <span style={{ position: 'relative', top: '1px' }}>{t('BXH.selectziya')}</span>
              </div>

              <TextField
                fullWidth
                className={getStyleClass('serInput',classes.bxhInput)}
                value={inputSearchVal || ''}
                onChange={this.onChange.bind(this, "")}
                onFocus={this.onFocusFrom.bind()}  // ????????????
                onBlur={this.onBlurFrom.bind()} // ????????????
                placeholder={t('BXH.searchtitle')}
                variant="outlined"
              />
              <img src={require('../../assets/bxh/search.png')} alt="" className={classes.searchImg} />
            </div>
            :
            null
          }
        </div>

        <div className={getStyleClass('listConter', 'bxhpoolswms')}>
          {/* ???????????????????????? */}
          {this.renderSelect()}
          {/* ??????Data */}
          {this.renderListData()}
        </div>
      </div>
    )
  }

  // ????????????????????????
  renderSelect = () => {
    const { classes, t } = this.props
    const { isMobile, isOnlyShowMyJoin, inputSearchVal } = this.state
    return (
      <div>
        {
          isMobile === 2 ?
            <div className={classes.areass}>
              <div className={classes.arealistss} onClick={() => {this.changeListSS()}}>
                <span className={getNewStyleClass(isOnlyShowMyJoin?'selectable':'unselect')}></span>
                <span style={{ position: 'relative', top: '1px' }}>{t('BXH.selectziya')}</span>
              </div>

              <TextField
                fullWidth
                className={getStyleClass('serInput',classes.bxhInput)}
                value={inputSearchVal || ''}
                onChange={this.onChange.bind(this, "")}
                onFocus={this.onFocusFrom.bind()}  // ????????????
                onBlur={this.onBlurFrom.bind()} // ????????????
                placeholder={t('BXH.searchtitle')}
                variant="outlined"
              />
              <img src={require('../../assets/bxh/search.png')} alt="" className={classes.searchImg} />
            </div>
            :
            null
        }
      </div>
    )
  }

  // ??????Data
  renderListData = () => {
    const { classes, t } = this.props
    const { isMobile, PoolList, currentSelectindex, currentType_sort, currentIndex_sort } = this.state
    let PoolDataList = PoolList && PoolList[0].tokens[0].symbolTokens
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        {
          isMobile === 2 ?
          <div className={classes.tiaomuParent}>
            {/* ?????????/TVL */}
            <div className={classes.tiaomuflex2}>
              <div className="mPoolflex">
                <div onClick={() => {this.changeSortType(1)}}>
                  {t('BXH.jiaoyiduititle')}/TVL
                </div>
                {
                  currentType_sort === 1 ?
                    currentIndex_sort !== 1 ?
                      currentIndex_sort === 2 ?
                        <img src={require('../../assets/bxh/sort_up.png')} className="mPooltou"/>
                        :
                        <img src={require('../../assets/bxh/sort_down.png')} className="mPooltou"/>
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                    :
                    <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                }
              </div>
            </div>
            {/* ?????? */}
            <div className={[classes.tiaomu, 'mPoolchan'].join(' ')}>
              <div className="mPoollam">
                {
                  (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                  <div className="mPoolRight" onClick={() => {this.changeSortType(2)}}>
                    {t('BXH.chanliangtitle')}/{t('BXH.Farming')}
                  </div>
                  :
                  <div className="mPoolRight" onClick={() => {this.changeSortType(2)}}>
                    {t('BXH.chanliangtitle')}(BXH)
                  </div>
                }
                {
                  currentType_sort === 2 ?
                    currentIndex_sort !== 1 ?
                      currentIndex_sort === 2 ?
                        <img src={require('../../assets/bxh/sort_up.png')} className="mPooltou"/>
                        :
                        <img src={require('../../assets/bxh/sort_down.png')} className="mPooltou"/>
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                    :
                    <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                }
              </div>
            </div>
            {/* apy */}
            <div className={classes.tiaomu}>
              <div className="mPoolapr1">
                  <div className="mPoolapr2">
                    <div className="mPoolRight" onClick={() => {this.changeSortType(3)}}>APR</div> 
                  {
                    currentType_sort === 3 ?
                      currentIndex_sort !== 1 ?
                        currentIndex_sort === 2 ?
                          <img src={require('../../assets/bxh/sort_up.png')} className="mPooltou"/>
                          :
                          <img src={require('../../assets/bxh/sort_down.png')} className="mPooltou"/>
                        :
                        <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="mPooltou"/>
                  }
                </div>
              </div>
              
            </div>
          </div>
          :
          <div className={classes.tiaomuParent}>
            {/* ????????? */}
            <div className={[classes.tiaomu, 'pooldui'].join(' ')}>
              {t('BXH.jiaoyiduititle')}
            </div>
            {/* ?????? */}
            <div className={classes.tiaomu}>
              <div className="poollam">
                {
                  (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                  <div onClick={() => { this.changeSortType(2) }}>{t('BXH.daylyoutput')}</div>
                  :
                  <div onClick={() => { this.changeSortType(2) }}>{t('BXH.daymonthlyoutput')}</div>
                }
                {
                  currentType_sort === 2 ?
                    currentIndex_sort !== 1 ?
                      currentIndex_sort === 2 ?
                        <img src={require('../../assets/bxh/sort_up.png')} className="pooltou" onClick={() => { this.changeSortType(2) }} />
                        :
                        <img src={require('../../assets/bxh/sort_down.png')} className="pooltou" onClick={() => { this.changeSortType(2) }} />
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(2) }} />
                    :
                    <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(2) }} />
                }
              </div>
            </div>
            {/* TVL */}
            <div className={classes.tiaomu}>
              <div className="pooltvl1">
                <div className="pooltvl2" onClick={() => { this.changeSortType(1) }}>TVL</div>
                {
                  currentType_sort === 1 ?
                    currentIndex_sort !== 1 ?
                      currentIndex_sort === 2 ?
                        <img src={require('../../assets/bxh/sort_up.png')} className="pooltou" onClick={() => { this.changeSortType(1) }} />
                        :
                        <img src={require('../../assets/bxh/sort_down.png')} className="pooltou" onClick={() => { this.changeSortType(1) }} />
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(1) }} />
                    :
                    <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(1) }} />
                }
              </div>
            </div>
            {/* APY */}
            <div className={classes.tiaomu}>
              <div className="poolapr1">
                <div className="poolapr2" onClick={() => {this.changeSortType(3)}}>APR</div>
                {
                  currentType_sort === 3 ?
                    currentIndex_sort !== 1 ?
                      currentIndex_sort === 2 ?
                        <img src={require('../../assets/bxh/sort_up.png')} className="pooltou" onClick={() => { this.changeSortType(3) }} />
                        :
                        <img src={require('../../assets/bxh/sort_down.png')} className="pooltou" onClick={() => { this.changeSortType(3) }} />
                      :
                      <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(3) }} />
                    :
                    <img src={require('../../assets/bxh/sort_normal.png')} className="pooltou" onClick={() => { this.changeSortType(3) }} />
                }
              </div>
            </div>
            {/* ????????? */}
            <div className={classes.tiaomu}>
              <div className="poolapr1">
                <div className="poolapr2">{t('BXH.StayClaim')}(BXH)</div>
              </div>
            </div>

          </div>
        }
        <div className="poolxian"></div>

        {/* ????????????v2 */}
        {
          currentSelectindex === 6 ?
          <div style={{ minHeight: '70px' }}>
            {this.renderBXHPledge()}
          </div>
          :
          null
        }
        {/* ????????????v1 */}
        {
          currentSelectindex === 5 ?
          <div style={{ minHeight: '70px' }}>
            {this.renderBXHSingle()}
          </div>
          :
          null
        }
        {/* ??????(V2) */}
        {
          currentSelectindex === 7 ?
          this.renderMainBXH2()
          :
          null
        }
        {/* ??????(V1) */}
        {
          currentSelectindex === 0 ?
          this.renderBXH()
          :
          null
        }
      </div>
    )
  }


  handleTooltipOpen = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }

  };
  handleTooltipClose = () => {
    this.setState({ open: false });
  };
  onFocusFrom = () => {
    this.setState({
      formOnFocus: 1
    })
  }
  onBlurFrom = () => {
    this.setState({
      formOnFocus: 0
    })
  }

  onChange = (value, event) => {
    this.setState({ inputSearchVal: event.target.value })
    this.reRenderList(this.state.isOnlyShowMyJoin, event.target.value)
  }

  //???????????????????????????????????????
  cheakPoolIsHaveByName = (contractAddress) => {
    const { myAllLiquidity } = this.state
    if (!myAllLiquidity || myAllLiquidity.length == 0) {
      return false
    }
    for (let i = 0; i < myAllLiquidity.length; i++) {
      let item = myAllLiquidity[i]
      if (contractAddress && contractAddress !== "" && (item.lptokenAddress).toUpperCase() === contractAddress.toUpperCase()) {
        return true
      }
    }
    return false
  }
  checkPoolIsHaveById = (id) => {
    const { StakedPoolList } = this.state
    if (!StakedPoolList || StakedPoolList.length == 0) {
      return false
    }

    for (let i = 0; i < StakedPoolList.length; i++) {
      let item = StakedPoolList[i]
      if (parseFloat(item.id) === parseFloat(id)) {
        return true
      }
    }
    return false
  }
  checkSinglePoolById = (id) => {
    const { SinglePoolList } = this.state
    if (!SinglePoolList || SinglePoolList.length == 0) {
      return false
    }

    for (let i = 0; i < SinglePoolList.length; i++) {
      let item = SinglePoolList[i]
      if (parseFloat(item.id) === parseFloat(id)) {
        return true
      }
    }
    return false
  }
  checkSymbolbyKey = (keyStr, currentName) => {
    // console.log(keyStr, currentName)
    if (String(currentName).indexOf(keyStr.toUpperCase()) !== -1) {
      return true
    }
    return false
  }

  //????????????????????????
  changeListSS = () => {
    let currenttype = this.state.isOnlyShowMyJoin
    this.setState({ isOnlyShowMyJoin: !currenttype })

    const StakedPoolList = JSON.parse(localStorage.getItem("StakedPoolList"))
    this.setState({ StakedPoolList: StakedPoolList })

    this.reRenderList(!currenttype, this.state.inputSearchVal)
  }

  ssListByState = (dataList, isSelect, keyStr) => {
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      const isShow = isSelect ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = keyStr === "" ? true : this.checkSymbolbyKey(keyStr, dataList[i].symbolPair)

      if (isSelect && keyStr !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isSelect && keyStr === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isSelect && keyStr !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }
    return dataList_ss
  }
  reRenderList = (isSelect, keyStr) => {
    const { currentSelectindex, PoolList, farmsListArr } = this.state

    let dataList_main = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_1, isSelect, keyStr)
    let dataList_flat = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_2, isSelect, keyStr)
    let dataList_innov = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_3, isSelect, keyStr)
    let dataList_single = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_4, isSelect, keyStr)
    let dataList_Twist = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_5, isSelect, keyStr)
    let dataList_Pledge = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_6, isSelect, keyStr)
    let dataList_flat2 = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_7, isSelect, keyStr)
    let dataList_singTwist = this.ssListByState(farmsListArr, isSelect, keyStr)

    if (currentSelectindex == 0) { //??????

      if (dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_main.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_main.length == 0 && dataList_flat.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_main.length == 0 && dataList_flat.length == 0 && dataList_innov.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if(dataList_main.length == 0 && dataList_flat.length == 0 && dataList_innov.length == 0 && dataList_single.length == 0 && dataList_Twist.length > 0){
        this.setState({ currentSelectindex: 5 })
      }  else if(dataList_main.length == 0 && dataList_flat.length == 0 && dataList_innov.length == 0 && dataList_single.length == 0 && dataList_Twist.length == 0 && dataList_Pledge.length > 0){
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 0 })
      }

    } else if (currentSelectindex == 1) {//flat

      if (dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_flat.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_flat.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_flat.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_flat.length == 0 && dataList_Twist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else if (dataList_flat.length == 0 && dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 1 })
      }

    } else if (currentSelectindex == 2) {//?????????

      if (dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_innov.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_innov.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_innov.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_innov.length == 0 && dataList_Twist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else if (dataList_innov.length == 0 && dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 2 })
      }

    } else if (currentSelectindex == 3) {//?????????

      if (dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_single.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_single.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_single.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_single.length == 0 && dataList_Twist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else if (dataList_single.length == 0 && dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 3 })
      }

    } else if (currentSelectindex == 5) {//??????

      if (dataList_Twist.length > 0 || dataList_singTwist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else if (dataList_Twist.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_Twist.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_Twist.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_Twist.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_Twist.length == 0 && dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 5 })
      }

    } else if (currentSelectindex == 6) {//?????????

      if (dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else if (dataList_Pledge.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_Pledge.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_Pledge.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_Pledge.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_Pledge.length == 0 && dataList_Twist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else {
        this.setState({ currentSelectindex: 6 })
      }

    } else if (currentSelectindex == 7) {//??????(V2) Timo

      if (dataList_flat2.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else if (dataList_flat2.length == 0 && dataList_main.length > 0) {
        this.setState({ currentSelectindex: 0 })
      } else if (dataList_flat2.length == 0 && dataList_flat.length > 0) {
        this.setState({ currentSelectindex: 1 })
      } else if (dataList_flat2.length == 0 && dataList_single.length > 0) {
        this.setState({ currentSelectindex: 3 })
      } else if (dataList_flat2.length == 0 && dataList_innov.length > 0) {
        this.setState({ currentSelectindex: 2 })
      } else if (dataList_flat2.length == 0 && dataList_Twist.length > 0) {
        this.setState({ currentSelectindex: 5 })
      } else if (dataList_flat2.length == 0 && dataList_Pledge.length > 0) {
        this.setState({ currentSelectindex: 6 })
      } else {
        this.setState({ currentSelectindex: 7 })
      }

    } else {
      this.setState({ currentSelectindex: currentSelectindex })
    }
  }

  //TVL=1 ??????=2 APY=3 ?????????0
  //??????=1 ??????=2 ??????=3 ?????????1
  changeSortType = (type) => {
    const { currentType_sort, currentIndex_sort } = this.state
    if (type === currentType_sort) {
      let currentIndex_sort_temp = 0
      if (currentIndex_sort == 3) {
        currentIndex_sort_temp = 2
      } else if (currentIndex_sort == 2) {
        currentIndex_sort_temp = 1
      } else if (currentIndex_sort == 1) {
        currentIndex_sort_temp = 3
      }
      if (currentIndex_sort_temp > 3) {
        currentIndex_sort_temp = 1
      }
      this.setState({ currentIndex_sort: currentIndex_sort_temp })
    } else {
      this.setState({ currentType_sort: type, currentIndex_sort: 3 })
    }
  }
  //TVL=1 ??????=2 APY=3 ?????????0
  //??????=1 ??????=2 ??????=3 ?????????1
  sortListByType = (index) => {
    const { currentType_sort, currentIndex_sort, PoolList } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || (PoolList[0].tokens[0].symbolTokens.pool_1.length <= 0 && PoolList[0].tokens[0].symbolTokens.pool_6.length <= 0) ) {
      return;
    }
    let dataList = []
    if (index == 1) {
      // ??????????????????'FARMS'??????'??????'????????????????????????????????????
      PoolList[0].tokens[0].symbolTokens.pool_2.map((item) => {
        dataList.push(item)
      })
      PoolList[0].tokens[0].symbolTokens.pool_1.map((item) => {
        dataList.push(item)
      })
    } else if (index == 2) {
      PoolList[0].tokens[0].symbolTokens.pool_2.map((item) => {
        dataList.push(item)
      })
    } else if (index == 3) {
      PoolList[0].tokens[0].symbolTokens.pool_3.map((item) => {
        dataList.push(item)
      })
    } else if (index == 4) {
      PoolList[0].tokens[0].symbolTokens.pool_4.map((item) => {
        dataList.push(item)
      })
    } else if (index == 5) {
      PoolList[0].tokens[0].symbolTokens.pool_5.map((item) => {
        dataList.push(item)
      })
    } else if (index == 6) {
      PoolList[0].tokens[0].symbolTokens.pool_6.map((item) => {
        dataList.push(item)
      })
    } else if (index == 7) {
      PoolList[0].tokens[0].symbolTokens.pool_7.map((item) => {
        dataList.push(item)
      })
    }
// console.log('bb=>', dataList)
// ?????????????????????
// this.renderShouyi(dataList)
    if (currentType_sort === 0 && currentIndex_sort === 1) {
      return dataList
    } else if (currentType_sort === 1) { //??????TVL??????

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.tvl_total) - parseFloat(b.tvl_total)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.tvl_total) - parseFloat(b.tvl_total)) > 0 ? -1 : 1 })
      }

    } else if (currentType_sort === 2) { //????????????

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.bxh_day) - parseFloat(b.bxh_day)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.bxh_day) - parseFloat(b.bxh_day)) > 0 ? -1 : 1 })
      }

    } else if (currentType_sort === 3) { //APY??????

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.totalapy) - parseFloat(b.totalapy)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.totalapy) - parseFloat(b.totalapy)) > 0 ? -1 : 1 })
      }

    }
    
    return dataList
  }

  // ??????????????? ??????
  renderBXH = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, StakedPoolList } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens) {
      return;
    }
    let dataList = this.sortListByType(1)
    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    // ?????????????????????
    // this.renderShouyi(dataList_ss)

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
      })
    } else {
      return this.renderEmptyData()
    }

  }

  // ??????????????? ??????(V2)  
  renderMainBXH2 = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, StakedPoolList } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens) {
      return;
    }
    let dataList = this.sortListByType(7)
    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    // ?????????????????????
    // this.renderShouyi(dataList_ss)

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
      })
    } else {
      return this.renderEmptyData()
    }

  }

  // ????????????v2
  renderBXHPledge = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_6.length <= 0) {
      return;
    }
    let dataList = this.sortListByType(6)
    let dataCount = 0
    let dataList_ss = []
    if(dataList){
      for (let i = 0; i < dataList.length; i++) { 
        if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
          dataCount = dataCount + 1
        }
        const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
        const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)
        if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
          if (isShow && isInputVal) {
            dataList_ss.push(dataList[i])
          }
        } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
          if (isShow) {
            dataList_ss.push(dataList[i])
          }
        } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
          if (isInputVal) {
            dataList_ss.push(dataList[i])
          }
        } else {
          dataList_ss.push(dataList[i])
        }
      }

    //   // ?????????????????????
      // console.log('aaaaaaa===>', dataList)
      // this.setState({
      //   cPoolArray: PoolList[0].tokens[0].symbolTokens.pool_6
      // })
    //   // console.log('bbbbbbbbb===>', cPoolArray)
      // this.renderShouyi(dataList_ss)

      if (dataCount > 0) {
        return dataList_ss.map((rewardDFKiiPool, index) => {
          return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
        })
      } else{
        return this.renderEmptyData()
      }
    }
  }

  claimBXH = (rewardDFKiiPool) => {
    // let shouyi = '0.00'
    store._getBXHShouYi(rewardDFKiiPool, (err,value)=>{
      if(isEmpty(err)){
        // console.log(value)
        // shouyi = value
      }
      // console.log(shouyi)
    });
    emitter.on(BXHSHOUYI_RETURN, this.shouyiReturn)
    return 3
  }

  shouyiReturn = (shouyi) => {
    // this.setState({cPoolArray: [...this.state.cPoolArray, shouyi],});
    // console.log(this.state.cPoolArray)
    return shouyi
  }

  // ?????????????????????
  renderShouyi = (dataList_ss) => {
    // console.log('111111======>',dataList_ss)
    for(let i=0;i<dataList_ss.length;i++){
      let item = dataList_ss[i];
      store._getBXHShouYi(item, (err,value)=>{
        if(isEmpty(err)){
          item.shouyi = value;
          this.setState({cPoolArray: [...dataList_ss]});
        }
      });
    }
    // console.log('22222222======>',this.state.cPoolArray)
  }

  renderEmptyData = () => {
    const { t } = this.props
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div style={{ height: "300px" }}>
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          {
            chainID === '56' ? 
            <img src={require('../../assets/bxh/emptydata1.png')} alt="" style={{ width: '30px', }} />
            :
            chainID === '66' ? 
            <img src={require('../../assets/bxh/emptydata2.png')} alt="" style={{ width: '30px', }} />
            :
            chainID === '1' ? 
            <img src={require('../../assets/bxh/emptydata3.png')} alt="" style={{ width: '30px', }} />
            :
            chainID === '137' ? 
            <img src={require('../../assets/bxh/emptydata4.png')} alt="" style={{ width: '30px', }} />
            :
            chainID === '43114' ? 
            <img src={require('../../assets/bxh/emptydata5.png')} alt="" style={{ width: '30px', }} />
            :
            <img src={require('../../assets/bxh/emptydata.png')} alt="" style={{ width: '30px', }} />
          }
          <div style={{ fontSize: '14px', marginTop: '5px' }}>{t('BXH.nodatatitle')}</div>
        </div>
      </div>
    )
  }

  //????????????
  renderBXHPool_New = (rewardDFKiiPool, index, isLast) => {
    const { classes, t } = this.props
    const { isMobile, currentSelectindex, PoolList, cPoolArray } = this.state
    let miningAPY = t('BXH.miningAPY') + this.SaveTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_pool : 0) + '% + ' + t('BXH.ServiceAPY') + this.SaveTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_ex : 0) + '%'
    let chainID = localStorage.getItem('chainIDSwitch')
    let bxh_price = PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0

    if (isMobile === 2) {
      return (
        <div key={rewardDFKiiPool.id}>
          <div key={rewardDFKiiPool.id} className={classes.listItemParent}>
            {/* ????????? */}
            <div style={{ width: '40%' }} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.poollistImgParent}>
                  <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.imgStyleNew} />
                  {
                    rewardDFKiiPool.pool_type !== 3 && rewardDFKiiPool.pool_type !== 4 ?
                    <img src={rewardDFKiiPool.symbol1Img_Show} className={classes.imgStyleNew} style={{ marginLeft: '-3px' }} />
                    : 
                    null  
                  }
                </div>
                <div style={{ marginLeft: '3px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rewardDFKiiPool.symbolPair}</span>
                </div>
              </div>
              <div className={classes.rightparent_new}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.tvl_total : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$">
                </CountUp>
              </div>
            </div>
            {/* ????????? */}
            <div style={{ textAlign: 'right', width: '30%', paddingTop: '5px' }} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>
              {/* HECO??????????????????USDT??????BXH????????? * BXH?????? */}
              {
                chainID === '128'?
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                    (
                      <CountUp
                        start={0}
                        end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day * bxh_price : 0)}
                        duration={2.0}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix="">
                      </CountUp>
                    )
                    : '--'}
                  </em>
                  (1d)
                </div>
                :
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                    (
                      <CountUp
                        start={0}
                        end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                        duration={2.0}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix="">
                      </CountUp>
                    )
                    : '--'}
                  </em>
                  (1d)
                </div>
              }

              {/* ??????????????? */}
              {
                (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>
                    <span>10</span>
                  </em>
                  (day)
                </div>
                :
                // HECO??????????????????USDT??????BXH????????? * BXH??????
                chainID === '128'?
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month * bxh_price : 0)}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                  </em>
                  (1m)
                </div>
                :
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month : 0)}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                  </em>
                  (1m)
                </div>
              }
              
            </div>
            {/* ????????? */}
            {
              rewardDFKiiPool.pool_type !== 3 ?
              <div style={{ width: '30%', textAlign: 'right' }}>
                {
                  chainID === '56' || chainID === '66' || chainID === '1' ?
                  <div className={[classes.rightparent_new_new, classes.rightparent_new_new1].join(' ')} style={{ fontSize: '13px', color: 'rgba(255,255,255,1)', marginTop: '10px' }}>
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_pool : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                </div>
                  :
                  <div style={{ marginTop: '10px', display: 'flex', float: 'right' }}>
                    <div className={classes.rightparent_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                  </div>
                  <div className={classes.btntool}>
                    <Tooltip overlayClassName="mglobal_tooltip" title={miningAPY}>
                      <img src={require('../../assets/bxh/wenti.png')}/>
                    </Tooltip>
                  </div>
                  </div>
                }
              </div>
              :
              <div style={{ width: '30%', marginTop: '10px', textAlign: 'right' }}>
                <div className={classes.rightparent_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                </div>
              </div>
            }

          </div>
          {
            isLast ?
              <div style={{ background: 'rgba(151,151,151,0)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
              :
              <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
          }
        </div>
      )
    } else {
      return (
        <div key={rewardDFKiiPool.id}>
          <div key={rewardDFKiiPool.id} className={classes.listItemParent}>
            {/* ????????? */}
            <div style={{ display: 'flex', width: '15%' }}>
              <div className={classes.poollistImgParent}>
                <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.imgStyleNew} />
                {
                  rewardDFKiiPool.pool_type !== 3 && rewardDFKiiPool.pool_type !== 4 ?
                  <img src={rewardDFKiiPool.symbol1Img_Show} className={classes.imgStyleNew} style={{ marginLeft: '-3px' }} />
                  : 
                  null 
                }
              </div>

              <div style={{ marginLeft: '2px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rewardDFKiiPool.symbolPair}</span>
              </div>
            </div>

            {/* BSC???HECO??????????????????????????? */}
            {
              (chainID === '56'||chainID === '128')&&currentSelectindex===5?  
              // ?????????
              <div style={{ width: (chainID === '56'||chainID === '128')&&currentSelectindex===5 ? '10%' : '15%' }}>
                <div style={{ fontSize: '15px', textAlign: 'right' }}>
                  <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                    (
                      <CountUp
                        start={0}
                        end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                        duration={2.0}
                        separator=","
                        decimals={0}
                        decimal="."
                        prefix="">
                      </CountUp>
                    )
                    : '--'}
                  </em>
                  (BXH)
                </div>
              </div>
              :
              <div style={{ width: '15%', marginTop: '-10px' }}>
                {/* HECO??????????????????USDT??????BXH????????? * BXH?????? Timo */}
                {
                  chainID === '128'?
                  // ????????????(V2)?????????(V2)???????????????USDT??????
                  <div>
                    {
                        currentSelectindex===6 || currentSelectindex===7 ?
                        <div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day * bxh_price : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (USDT)
                    </div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month * bxh_price : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (USDT)
                    </div>
                  </div>
                        :
                        <div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (BXH)
                    </div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (BXH)
                    </div>
                  </div>
                    }
                  </div>
                  :
                  <div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (BXH)
                    </div>
                    {/* ????????? */}
                    <div style={{ fontSize: '15px', textAlign: 'right' }}>
                      <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                        (
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month : 0)}
                            duration={2.0}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="">
                          </CountUp>
                        )
                        : '--'}
                      </em>
                      (BXH)
                    </div>
                  </div>
                }
              </div>
            }

            {/* ?????? */}
            {
                (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                <div style={{ width: '15%', fontSize: '15px', textAlign: 'right' }}>
                  <div className={classes.rightparent_new_hint}>
                    <span></span>
                  </div>
                </div>
                :
                null
            }
              
            {/* tvl */}
            <div style={{ fontSize: '15px', width: '15%', textAlign: 'right' }}>
              <div className={classes.rightparent_new_hint}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.tvl_total : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$">
                </CountUp>
              </div>
            </div>
            {/* apy */}
            {
              rewardDFKiiPool.pool_type !== 3 ?
                <div style={{ width: '15%' }}>
                  {
                    chainID === '56' || chainID === '66' || chainID === '1' ?
                    <div style={{ fontSize: '15px', textAlign: 'right', marginTop: '0px' }}>
                      <div className={getStyleClass('PCnew_green',classes.rightparent_new_green)}>
                        <CountUp
                          start={0}
                          end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_pool : 0)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          suffix="%">
                        </CountUp>
                      </div>
                    </div>
                    :
                    <div>
                      <div style={{ fontSize: '15px', float: 'right', display: 'flex' }}>
                        <div className={getStyleClass('PCnew_green',classes.rightparent_new_green)}>
                          <CountUp
                            start={0}
                            end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            suffix="%">
                          </CountUp>
                        </div>
                        <div className={classes.btntool}>
                          <Tooltip overlayClassName="global_tooltip" title={miningAPY}>
                            <img src={require('../../assets/bxh/wenti.png')}/>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                :
                <div style={{ width: '15%' }}>
                  <div style={{ fontSize: '15px', textAlign: 'right', marginTop: '0px' }}>
                    <div className={getStyleClass('PCnew_green',classes.rightparent_new_green)}>
                      <CountUp
                        start={0}
                        end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                        duration={2.0}
                        separator=","
                        decimals={2}
                        decimal="."
                        suffix="%">
                      </CountUp>
                    </div>
                  </div>
                </div>
            }
            {/* ????????? */}
            <div style={{ width: '15%', textAlign: 'right', opacity: '.6' }}>
              {this.claimBXH(rewardDFKiiPool)}
              {/* {
                cPoolArray&&cPoolArray.length> 0 ? 
                <CountUp
                  start={0}
                  end={this.SaveTwoWei(cPoolArray[index].shouyi ? cPoolArray[index].shouyi : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="">  
                </CountUp>
                :
                '0.00'
              } */}
            </div>

            <div style={{ position: 'relative', width: (chainID === '56'||chainID === '128')&&currentSelectindex===5 ? '20%' : '25%' }}>
              <div className={classes.btnparent_new} style={{ position: 'absolute', right: '0px', top: '5px' }}>
                {
                  currentSelectindex !== 5 && currentSelectindex !== 6 ?
                    <div style={{ display: 'flex' }}>
                      <div className={getStyleClass('PC_new_btn1',classes.bxhaddmobility_new_btn)} onClick={() => { this.navigateBXHStakePC(rewardDFKiiPool) }}>{t('BXH.diyatitle')}</div>
                      <div className={getStyleClass('PC_new_btn2',classes.bxhaddmobility_new_btn2)} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>{t('BXH.addzijin')}</div>
                    </div>
                    :
                    <div className={getStyleClass('PC_new_btn1',classes.bxhaddmobility_new_btn)} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>{t('BXH.diyatitle')}</div>
                }
              </div>
            </div>

          </div>
          {
            isLast ?
              <div style={{ background: 'rgba(151,151,151,0)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
              :
              <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
          }
        </div>
      )
    }

  }

  // ????????????????????????
  renderBXHNewsSingle = (item, index) => {
    const { classes, t } = this.props
    const { isMobile } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    let timeDate = Date.parse(new Date())/1000
    if (isMobile === 2) {
      return (
        <div key={item.id}>
          <div className={classes.listItemParent}>

            {/* ????????? */}
            <div style={{ width: '40%' }} onClick={() => { this.navigateBXHSinglePC(item) }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.poollistImgParent}>
                  <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token0}.png`} className={classes.imgStyleNew} />
                </div>
                <div style={{ marginLeft: '3px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.token0}</span>
                </div>
                <div className={[chainID === '1' ? classes.ethhomeSingle : classes.homeSingle].join(' ')}>
                  {
                    timeDate > item.timeEnd ?
                    // Finshed?????????????????????
                    <span style={{background: '#363636',color:'#999'}}>Finshed</span>
                    :
                    // Live??????????????????
                    timeDate < item.timeEnd &&  timeDate > item.timeStart ?
                    <span>Live</span>
                    :
                    <span>News</span>
                  }
                </div>
              </div>
              <div className={classes.rightparent_new}>
                <CountUp
                  start={0}
                  end={this.SaveTwoWei(item ? item.tvlPool : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$">
                </CountUp>
              </div>
            </div>

            {/* ????????? */}
            <div style={{ textAlign: 'right', width: '30%', paddingTop: '5px' }} onClick={() => { this.navigateBXHSinglePC(item) }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <em className={classes.rightparent_new}>{item ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveTwoWei(item ? item.amountDay : 0)}
                      duration={2.0}
                      separator=","
                      decimals={2}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                </em>
                (1d)
              </div>
              {/* ??????????????? */}
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <em className={classes.rightparent_new}>{isNoEmpty(item)&&isNoEmpty(item.userInfo)?item.userInfo.cycle:'--'}
                </em>
                (day)
              </div>
            </div>

            {/* ????????? */}
            <div style={{ width: '30%', textAlign: 'right' }}>
              <div style={{ marginTop: '10px', display: 'flex', float: 'right' }}>
                <div className={classes.rightparent_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                  <CountUp
                    start={0}
                    end={this.SaveTwoWei(item ? item.apyPool : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                </div>
              </div>
            </div>

          </div>
          <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
        </div>
      )
    } else {
      return (
        <div key={item.id}>
          <div className={classes.listItemParent}>

            {/* ????????? */}
            <div style={{ display: 'flex', width: '20%' }}>
              <div className={classes.poollistImgParent}>
                <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token0}.png`} className={classes.imgStyleNew} />
              </div>
              <div style={{ marginLeft: '2px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.token0}</span>
              </div>
              <div className={[chainID === '1' ? classes.ethhomeSingle : classes.homeSingle].join(' ')}>
                {
                  timeDate > item.timeEnd ?
                  // Finshed?????????????????????
                  <span style={{background: '#363636',color:'#999'}}>Finshed</span>
                  :
                  // Live??????????????????
                  timeDate < item.timeEnd &&  timeDate > item.timeStart ?
                  <span>Live</span>
                  :
                  <span>News</span>
                }
              </div>
            </div>

            {/* ????????? */}
            <div style={{ width: '10%' }}>
              <div style={{ fontSize: '15px', textAlign: 'right' }}>
                <em className={classes.rightparent_new}>{item ?
                    (
                      <CountUp
                        start={0}
                        end={this.SaveTwoWei(item ? item.amountDay : 0)}
                        duration={2.0}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix="">
                      </CountUp>
                    )
                    : '--'}
                </em>
                ({isNoEmpty(item)&&isNoEmpty(item.userInfo)?item.userInfo.rewardSymbol:'--'})
              </div>
            </div>

            {/* ?????? */}
            <div style={{ width: '15%', fontSize: '15px', textAlign: 'right' }}>
              <div className={classes.rightparent_new_hint}>
                <span>{isNoEmpty(item)&&isNoEmpty(item.userInfo)?item.userInfo.cycle:'--'} {t('BXH.day')}</span>
              </div>
            </div>

            {/* tvl */}
            <div style={{ fontSize: '15px', width: '20%', textAlign: 'right' }}>
               <div className={classes.rightparent_new_hint}>
                 <CountUp
                   start={0}
                   end={this.SaveTwoWei(item ? item.tvlPool : 0)}
                   duration={2.0}
                   separator=","
                   decimals={2}
                   decimal="."
                   prefix="$">
                 </CountUp>
               </div>
            </div>

            {/* apy */}
            <div style={{ width: '15%' }}>
              <div style={{ fontSize: '15px', textAlign: 'right', marginTop: '0px' }}>
                <div className={getStyleClass('PCnew_green',classes.rightparent_new_green)}>
                  <CountUp
                    start={0}
                    end={this.SaveTwoWei(item ? item.apyPool : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', width: '20%' }}>
              <div className={classes.btnparent_new} style={{ position: 'absolute', right: '0px', top: '5px' }}>
                <div className={getStyleClass('PC_new_btn1',classes.bxhaddmobility_new_btn)} onClick={() => { this.navigateBXHSinglePC(item) }}>
                   {t('BXH.diyatitle')}
                </div>
              </div>
            </div>

          </div>
          <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
        </div>
      )
    }
  }

  // ????????????
  renderBXHSingle = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_5.length <= 0) {
      return;
    }
    let dataList = this.sortListByType(5)

    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) { 
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
      })
    } else{
      return this.renderEmptyData()
    }
  }

  renderBXHDataSingle = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, farmsListArr } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_5.length <= 0) {
      return;
    }
    let dataList = farmsListArr

    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) { 
      if (this.checkSinglePoolById(dataList[i].exId) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkSinglePoolById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    if (dataCount > 0) {
      return dataList_ss.map((item, index) => {
        return this.renderBXHNewsSingle(item, index)
      })
    } else{
      return this.renderEmptyData()
    }
  }

  //????????? ???????????????
  renderBXHPingTai = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_2.length <= 0) {
      return;
    }
    let dataList = this.sortListByType(2)

    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
      })
    } else {
      return this.renderEmptyData()
    }
  }

  //????????? ???????????????
  renderBXHChuangXin = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_3.length <= 0) {
      return;
    }
    let dataList = this.sortListByType(3)
    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPool_New(rewardDFKiiPool, index, index === dataCount - 1)
      })
    } else {
      return this.renderEmptyData()
    }
  }
  //????????????
  renderSingle = (rewardDFKiiPool, index) => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_4.length <= 0) {
      return;
    }
    let dataList = this.sortListByType(4)
    let dataCount = 0
    let dataList_ss = []
    for (let i = 0; i < dataList.length; i++) {
      if (this.checkPoolIsHaveById(dataList[i].id) || !isOnlyShowMyJoin) {
        dataCount = dataCount + 1
      }

      const isShow = isOnlyShowMyJoin ? this.checkPoolIsHaveById(dataList[i].id) : true
      const isInputVal = inputSearchVal === "" ? true : this.checkSymbolbyKey(inputSearchVal, dataList[i].symbolPair)

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //??????????????????????????????????????????
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//???????????????????????????????????????
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //?????????????????????????????????????????????
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    if (dataCount > 0) {
      return dataList_ss.map((rewardDFKiiPool, index) => {
        return this.renderBXHPoolSingle(rewardDFKiiPool, index, dataCount - 1 === index)
      })
    } else {
      return this.renderEmptyData()
    }
  }
  
  renderBXHPoolSingle = (rewardDFKiiPool, index, isLast) => {
    const { classes, t } = this.props
    const { isMobile, currentSelectindex, isOnlyShowMyJoin, inputSearchVal } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')

    if (isMobile === 2) {
      return (
        <div key={rewardDFKiiPool.id}>
          <div key={rewardDFKiiPool.id} className={classes.listItemParent} onClick={() => { this.navigateBXHSingleToken(rewardDFKiiPool) }}>
            {/* ????????? */}
            <div style={{ width: '40%' }}>
              <div style={{ display: 'flex' }}>
                <div className={classes.poollistImgParent}>
                  <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.imgStyleNew} />

                </div>
                <div style={{ marginLeft: '3px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rewardDFKiiPool.symbol0}</span>
                </div>
              </div>
              <div className={classes.rightparent_new}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.tvl_total : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$">
                </CountUp>
              </div>
            </div>
            {/* ????????? */}
            <div style={{ textAlign: 'right', width: '30%', paddingTop: '5px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                </em>
                (1d)
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                (
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month : 0)}
                    duration={2.0}
                    separator=","
                    decimals={0}
                    decimal="."
                    prefix="">
                  </CountUp>
                )
                : '--'}
                </em>
                (1m)
              </div>
            </div>
            <div style={{ width: '30%', marginTop: '-2px', textAlign: 'right' }}>
              <div className={classes.rightparent_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%">
                </CountUp>
                (tot)
              </div>
              <div className={classes.rightparent_new_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_pool : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%">
                </CountUp>
                (st)
              </div>
              <div className={classes.rightparent_new_new} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_ex : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%">
                </CountUp>
                (ex)
              </div>
            </div>

          </div>
          {
            isLast ?
              <div style={{ background: 'rgba(151,151,151,0)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
              :
              <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
          }

        </div>
      )
    } else {
      return (
        <div key={rewardDFKiiPool.id}>
          <div key={rewardDFKiiPool.id} className={classes.listItemParent}>
            {/* ????????? */}
            <div style={{ display: 'flex', width: '20%' }}>
              <div className={classes.poollistImgParent}>
                <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.imgStyleNew} />
              </div>

              <div style={{ marginLeft: '2px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rewardDFKiiPool.symbol0}</span>
              </div>
            </div>

            <div style={{ width: '20%', marginTop: '-10px' }}>
              {/* ????????? */}
              <div style={{ fontSize: '15px', textAlign: 'right' }}>
                <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_day : 0)}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                </em>
                (BXH)
              </div>
              {/* ????????? */}
              <div style={{ fontSize: '15px', textAlign: 'right' }}>
                <em className={classes.rightparent_new}>{rewardDFKiiPool ?
                  (
                    <CountUp
                      start={0}
                      end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.bxh_month : 0)}
                      duration={2.0}
                      separator=","
                      decimals={0}
                      decimal="."
                      prefix="">
                    </CountUp>
                  )
                  : '--'}
                </em>
                (BXH)
              </div>
            </div>

            {/* tvl */}
            <div style={{ fontSize: '15px', width: '20%', textAlign: 'right' }}>
              <div className={classes.rightparent_new_hint}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.tvl_total : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  prefix="$">
                </CountUp>
              </div>
            </div>
            {/* apy */}
            <div style={{ fontSize: '15px', width: '15%', textAlign: 'right' }}>
              <div className={classes.rightparent_new_green}>
                <CountUp
                  start={0}
                  end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                  duration={2.0}
                  separator=","
                  decimals={2}
                  decimal="."
                  suffix="%">
                </CountUp>
              </div>
            </div>

            <div style={{ position: 'relative', width: '25%' }}>
              <div className={classes.btnparent_new} style={{ position: 'absolute', right: '0px' }}>
                <div className={classes.bxhaddmobility_new_btn} onClick={() => { this.navigateBXHSingleToken(rewardDFKiiPool) }}>{t('BXH.diyatitle')}</div>
              </div>
            </div>

          </div>
          {
            isLast ?
              <div style={{ background: 'rgba(151,151,151,0)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
              :
              <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '1px', marginLeft: '2%', marginTop: '5px' }}></div>
          }

        </div>
      )
    }
  }


  SaveToTwoWei = (number) => {
    return this.saveToWei(number, 4);
  }
  SaveTwoWei = (number) => {
    return this.saveToWei(number, 2);
  }
  saveToWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  navigateBXHStake = (rewardPool) => {
    store.setStore({ currentdTradePool: rewardPool })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    let chainID = localStorage.getItem('chainIDSwitch')
    if(rewardPool.pool_type !== 3 && rewardPool.pool_type !== 4 && rewardPool.pool_type !== 5){
      // ????????????
      this.props.history.push('/bxhTradeStake/' + rewardPool.id)
    }else if(rewardPool.pool_type === 4){
      // ?????????????????????
      if(chainID === '128'){
        this.props.history.push('/pledgeUSDT/' + rewardPool.ex_id)
      }else{
        this.props.history.push('/pledge/' + rewardPool.id)
      }
    }else if(rewardPool.pool_type === 5){
      // ??????(V2)
      this.props.history.push('/bxhTradeUSDTStake/' + rewardPool.id)
    }else{
      // ?????????????????????
      this.props.history.push('/twist/' + rewardPool.id)
    }
  }
  navigateBXHSinglePC = (item) => {
    store.setStore({ currentdTradePool: item })
    this.props.history.push('/single/' + item.id)
  }

  navigateBXHStakePC = (rewardPool) => {
    // console.log("1111")
    store.setStore({ currentdTradePool: rewardPool })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    if(rewardPool.pool_type === 5){
      // ??????(V2)
      this.props.history.push('/bxhstakeUSDTpc/' + rewardPool.id)
    }else{
      this.props.history.push('/bxhstakepc/' + rewardPool.id)
    }
  }

  //singletoken
  navigateBXHSingleToken = (rewardPool) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.setStore({ currentdTradePool: rewardPool })
    this.props.history.push('/singletoken/' + rewardPool.id + "_" + rewardPool.id_centerdata)
  }
  renderModal = () => {
    return (
      <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  changeSelectIndex = (index) => {
    this.setState({ currentSelectindex: index })
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(BxhList)));