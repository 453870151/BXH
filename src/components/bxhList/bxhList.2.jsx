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
  }

  componentWillMount() {
    emitter.on(BXHLISTBALANCEHOME_RETURNED, this.getBXHbalance);
  }

  componentWillUnmount() {
    emitter.removeListener(BXHLISTBALANCEHOME_RETURNED, this.getBXHbalance);
  };

  componentDidMount() {
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

  getBXHbalance = (data) => {
    console.log(data)
    this.setState({ rewardBXHFactory: data })
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID==='66' || chainID==='1'){
      this.setState({ currentSelectindex: 5 });
    }else{
      this.setState({ currentSelectindex: 6 });
    }
  }

  onChange = (value, event) => {
    this.setState({ inputSearchVal: event.target.value })
    this.reRenderList(this.state.isOnlyShowMyJoin, event.target.value)
  }
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


  render() {
    const { t } = this.props;
    const { modalOpen } = this.state
    return (
      <div style={{ width: '100%' }}>
        {/* 头部导航 */}
        <Header openUnlockModal={this.openUnlockModal} pagetype="liquidity" />

        <div className="pcContent">
          <div className="container kc-main">
            <div className="title12">{t('BXH.liquidityminingtitle')}</div>
            {/* 當前流動性質押、當前挖礦產出、當前挖礦產出市值、待獎勵金額、当前价格、BXH余额 */}
            {this.renderTransaction()}
            {/* 列表数据 */}
            {this.renderDate()}
          </div>
        </div>

        {/* 底部菜单 */}
        <Footer pagetype="liquidity"/>

        {modalOpen && this.renderModal()}
      </div>
    )
  }

  // 當前流動性質押、當前挖礦產出、當前挖礦產出市值、待獎勵金額、当前价格、BXH余额
  renderTransaction = () => {
    const { classes, t } = this.props
    const { rewardBXHFactory, PoolList, oldPoolList } = this.state
    return (
      <div className={getNewStyleClass('kc-chianitem1', 'kc-item1')}>
          {/* 移动端显示 start */}
          <div className={getStyleClass('bxhlistbg',classes.bxhprices)}>
            {/* 当前价格 */}
            <em>
              <span className={classes.counttitle}>{t('BXH.listprice')}</span>
              <span className={classes.countparent}>
                ${PoolList ? this.SaveToTwoWei(PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price, 4) : "0"}
              </span>
            </em>
            {/* 余额 */}
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
          {/* 移动端显示 end */}

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

  // 列表数据
  renderDate = () => {
    const { classes, t } = this.props
    const { isMobile, currentSelectindex, PoolList, isOnlyShowMyJoin, inputSearchVal } = this.state
    let PoolDataList = PoolList && PoolList[0].tokens[0].symbolTokens
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div className={classes.wakuangparent}>
        {/* Table、已質押筛选 */}
        <div className={classes.areaconter}>
          <div className={getStyleClass('TabConter',classes.areatype)}>
              {/* 单币质押v2 */}
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
              {/* HECO链，增加主區(V2),产出为USDT */}
              {
                chainID === '128' && PoolDataList && PoolDataList.pool_7.length > 0 ?
                <span className={currentSelectindex === 7 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(7) }}>
                  {t('BXH.mainarea')}<em></em>
                </span>
                :
                null
              }
              {/* 主區 */}
              {
                chainID !== '128' ?
                <span className={currentSelectindex === 0 ? "bxhTabOn" : "bxhTabOff"} 
                onClick={() => { this.changeSelectIndex(0) }}>
                  {t('BXH.mainarea')}<em></em>
                </span>
                :
                null
              }
              {/* 旧矿池 */}
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
                onFocus={this.onFocusFrom.bind()}  // 获得焦点
                onBlur={this.onBlurFrom.bind()} // 失去焦点
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
          {/* 移动端已質押筛选 */}
          {this.renderSelect()}
          {/* 列表Data */}
          {this.renderListData()}
        </div>
      </div>
    )
  }

  // 移动端已質押筛选
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
                onFocus={this.onFocusFrom.bind()}  // 获得焦点
                onBlur={this.onBlurFrom.bind()} // 失去焦点
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

  // 列表Data
  renderListData = () => {
    const { classes, t } = this.props
    const { isMobile, PoolList, currentSelectindex, currentType_sort, currentIndex_sort } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        {
          isMobile === 2 ?
          <div className={classes.tiaomuParent}>
            {/* 交易对/TVL */}
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
            {/* 产量 */}
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
            {/* 交易对 */}
            <div className={[classes.tiaomu, 'pooldui'].join(' ')}>
              {t('BXH.jiaoyiduititle')}
            </div>
            {/* 产量 */}
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
            {/* 待领取 */}
            <div className={classes.tiaomu}>
              <div className="poolapr1">
                <div className="poolapr2">{t('BXH.StayClaim')}(BXH)</div>
              </div>
            </div>

          </div>
        }
        <div className="poolxian"></div>

        {/* 單幣質押v2 */}
        {
          currentSelectindex === 6 ?
          <div style={{ minHeight: '70px' }}>
            {this.renderBXHPledge()}
          </div>
          :
          null
        }
        {/* 單幣質押v1 */}
        {/* {
          currentSelectindex === 5 ?
          <div style={{ minHeight: '70px' }}>
            {this.renderBXHSingle()}
          </div>
          :
          null
        } */}
        {/* 主區(V2) */}
        {/* {
          currentSelectindex === 7 ?
          this.renderMainBXH2()
          :
          null
        } */}
        {/* 主區(V1) */}
        {/* {
          currentSelectindex === 0 ?
          this.renderBXH()
          :
          null
        } */}
      </div>
    )
  }

  // 單幣質押v2
  renderBXHPledge = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, cPoolArray } = this.state
  }

  renderBXHPool_New = (rewardDFKiiPool, index, isLast) => {
    console.log('123')
    return (
      <div>123</div>
    )
  }

  renderEmptyData = () => {
    const { t } = this.props
    return (
      <div className="emptyConter">
        <div className="emptylist">
          <div className={getNewStyleClass('emptyImg')}></div>
          <div className="emptysize">{t('BXH.nodatatitle')}</div>
        </div>
      </div>
    )
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
      // 其他挖矿
      this.props.history.push('/bxhTradeStake/' + rewardPool.id)
    }else if(rewardPool.pool_type === 4){
      // 质押挖矿（新）
      if(chainID === '128'){
        this.props.history.push('/pledgeUSDT/' + rewardPool.ex_id)
      }else{
        this.props.history.push('/pledge/' + rewardPool.id)
      }
    }else if(rewardPool.pool_type === 5){
      // 主區(V2)
      this.props.history.push('/bxhTradeUSDTStake/' + rewardPool.id)
    }else{
      // 单币挖矿（新）
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
      // 主區(V2)
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