import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import {
  Switch,
  HashRouter,
  Route,
  withRouter,
} from "react-router-dom";

import './i18n';
import interestTheme from './theme';

import Account from './components/account';
import Home from './components/home';
import Coming from './components/coming';
import Dig from './components/dig';
import Dao from './components/dao';
import Combustion from './components/combustion';
import Invitation from './components/invitation';
import Jiazai from './components/jiazai';
import Bridge from './components/bridge';
// import StarPlan from './components/starPlan';
// import StarPlanList from './components/starPlanList';

import NUMBERSCOUNT from './components/numbersCount/numbersCount';
import BXHLIST from './components/bxhList/bxhList';
import BXHLISTV1 from './components/bxhListV1/bxhListV1';
import BXHTradeStake from './components/bxhTradeStake/bxhTradeStake';
import BXHTradeUSDTStake from './components/bxhTradeUSDTStake/bxhTradeUSDTStake';
import BXHLiquidity from './components/bxhLiquidity/bxhLiquidity'
import CreateLiquidityPool from './components/CreateLiquidityPool/CreateLiquidityPool'
import BXHTradeMobility from './components/bxhTradeMobility/bxhTradeMobility';
import BxhTradeUSDTMobility from './components/bxhTradeUSDTMobility/bxhTradeUSDTMobility';
import XSWAP from './components/XSwap/XSwap';
import XTOKEN from './components/XToken/XToken';
import Twist from './components/twist';
import Pledge from './components/pledge';
import PledgeUSDT from './components/pledgeUSDT';
import PledgeRegular from './components/pledgeRegular';
import Single from './components/single';
import Loan from './components/loan';

import BXHStakePC from './components/bxhstakepc/bxhstakepc';
import BxhStakeUSDTPC from './components/bxhstakeUSDTpc/bxhstakeUSDTpc';
import BXHSingleToken from './components/singleToken/singletoken'
import BXHcheckbalance from './components/checkbalance'
import { getUrlToken } from './config/constantFunction';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED,
  CHANINID_RETURNED,
  GET_PASSEXCHANGE_PERPETUAL,
  GET_PASSEXCHANGE_PERPETUAL_RETURNED,
  BXHCHNAGEACCOUNT,
  GET__BXHBRIDGEMAIN,
  BXHMENUHEADER,
  BXHTOKENLIST,
} from './constants'

import { injected } from "./stores/connectors";

import Store from "./stores";
import  "./theme/bsccolor.css";
import  "./theme/hecocolor.css";
import  "./theme/okexcolor.css";
import  "./theme/ethcolor.css";
import  "./theme/polycolor.css";
import  "./theme/avaxcolor.css";

import  "./theme/css/base.css";
import  "./theme/comm.css";
import  "./theme/HECO/style.css";
import  "./theme/BSC/style.css";
import  "./theme/ETH/style.css";
import  "./theme/OKC/style.css";
import  "./theme/AVAX/style.css";

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class App extends Component {
  state = {
    account: null,
    urlhash: null,
    chainIDbackground: '',
  };

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_PASSEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);

    const params = getUrlToken(window.location.href)
    let i18Lng
    if(params){
      if(params==='en'){
        i18Lng = 'en'
        localStorage.setItem("i18nextLng", i18Lng);
      }else{
        i18Lng = 'zh'
        localStorage.setItem("i18nextLng", i18Lng);
      }
    }

    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        injected.activate()
        .then((a) => {
          store.setStore({ account: { address: a.account }, web3context: { library: { provider: a.provider } } })
          // 导航
          dispatcher.dispatch({ type: BXHMENUHEADER, content: {} })
          // tokenlist
          dispatcher.dispatch({ type: BXHTOKENLIST, content: {} })
          emitter.emit(CONNECTION_CONNECTED)
          emitter.emit(BXHCHNAGEACCOUNT)
          emitter.emit(GET__BXHBRIDGEMAIN)
        })
        .catch((e) => {
          // console.log(e)
          this.refreshAccount();
        })
      } else {
        this.refreshAccount();
      }
    });
    dispatcher.dispatch({ type: CHANINID_RETURNED, content: {} })

    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // 钱包切换heco、bsc时，实时切换页面链
      ethereum.on("chainChanged", this.chainChanged);
    }
  }

  handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      emitter.emit(CONNECTION_DISCONNECTED);
      // window.location.href = '/'
    }else{
      // window.location.reload(); 
      this.refreshAccount()
    }
  }
  chainChanged = () => {
    this.refreshAccount()
  }
  refreshAccount = () => {
    const { ethereum } = window;
    localStorage.setItem("loanOpenSatus", 0)
    // 导航
    dispatcher.dispatch({ type: BXHMENUHEADER, content: {} })
    // tokenlist
    dispatcher.dispatch({ type: BXHTOKENLIST, content: {} })
    if(ethereum){
      injected.getAccount().then(account => {
        let chainId = ethereum.networkVersion;
        if(chainId){
          chainId = ethereum.networkVersion;
        }else{
          // 火币钱包直接获取chainId
          chainId = ethereum.chainId;
        }
        if(chainId){
          localStorage.setItem("chainIDSwitch", chainId)
          this.setState({ chainIDbackground: chainId })
        }
        if (account) {
          injected.getProvider().then(provider => {
            if (provider) {
              store.setStore({ account: { address: account }, web3context: { library: { provider: provider } } })
              emitter.emit(CONNECTION_CONNECTED)
              emitter.emit(BXHCHNAGEACCOUNT)
              emitter.emit(GET__BXHBRIDGEMAIN)
            }
          });
        }
      });
    }
  }

  componentDidMount() {
    this.setState({ urlhash: window.location.hash })
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_PASSEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);
  };

  configureReturned = () => {
    
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })
    dispatcher.dispatch({ type: CONFIGURE, content: {} })
    // 获取当前钱包链接的链ID，（128 heco，56 bsc）
    const { ethereum } = window;
    let chainId = ethereum.networkVersion;
    if(chainId){
      chainId = ethereum.networkVersion;
    }else{
      // 火币钱包直接获取chainId
      chainId = ethereum.chainId;
    }
    if(chainId){
      this.setState({ chainIDbackground: chainId })
    }
  };

  connectionDisconnected = () => {
    this.setState({ account: null});
    store.setStore({ account: {}, web3context: null});
    store.setStore({rewardSymbolList: null})
  }
  balancesReturned = (rewardSymbolList) => {
    store.setStore({rewardSymbolList: rewardSymbolList})
  }

  render() {
    const { account, urlhash, chainIDbackground } = this.state
    return (
      <MuiThemeProvider theme={ createMuiTheme(interestTheme) }>
        <CssBaseline />
        <HashRouter>
          { !account &&
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              minWidth: '100vw',
              justifyContent: 'center',
              alignItems: 'center',
              // background: "#191B2E"
            }} className={[chainIDbackground === '56' ? 'bscPCbroot' : chainIDbackground === '66' ? 'okexPCbroot' : chainIDbackground === '1' ? 'ethPCbroot' : chainIDbackground === '137' ? 'polyPCbroot' : chainIDbackground === '43114' ? 'avaxPCbroot' : 'hecoPCbroot'].join(' ')}>
              {
                urlhash !== '#/' ?
                  <Jiazai />
                  :
                  <Home />
              }
            </div>
          }
          { account &&
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              // justifyContent: 'center',
              // alignItems: 'center',
              // background: "#191B2E"
            }} 
            className={[chainIDbackground === '56' ? 'bscPCbroot' : chainIDbackground === '66' ? 'okexPCbroot' : chainIDbackground === '1' ? 'ethPCbroot' : chainIDbackground === '43114' ? 'avaxPCbroot' : 'hecoPCbroot'].join(' ')}
            >
              <Switch>
                <Route path="/numbersCount">
                  <NUMBERSCOUNT />
                </Route>
                <Route path="/liquidity">
                  <BXHLIST />
                </Route>
                <Route path="/liquidityV1">
                  <BXHLISTV1 />
                </Route>
                <Route path="/bxhTradeStake/:id">
                  <BXHTradeStake />
                </Route>
                <Route path="/bxhTradeUSDTStake/:id">
                  <BXHTradeUSDTStake />
                </Route>
                <Route path="/bxhLiquidity">
                  <BXHLiquidity/>
                </Route>
                {/* <Route path='/createliquiditypool/:token0address/:token1address'>
                  <CreateLiquidityPool/>
                </Route>
                <Route path='/createliquiditypool/:token0address'>
                  <CreateLiquidityPool/>
                </Route>
                <Route path='/createliquiditypool'>
                  <CreateLiquidityPool/>
                </Route> */}
                <Route path="/bxhStakePC/:id">
                  <BXHStakePC />
                </Route>
                <Route path="/bxhStakeUSDTPC/:id">
                  <BxhStakeUSDTPC />
                </Route>
                <Route path="/singletoken/:id">
                  <BXHSingleToken />
                </Route>
                <Route path="/checkbalance">
                  <BXHcheckbalance />
                </Route>
                <Route path="/bxhTradeMobility/:id">
                  <BXHTradeMobility />
                </Route>
                <Route path="/bxhTradeUSDTMobility/:id">
                  <BxhTradeUSDTMobility />
                </Route>
                <Route path="/XSWAP">
                  <XSWAP />
                </Route>
                <Route path="/XTOKEN">
                  <XTOKEN />
                </Route>
                <Route path="/dao">
                  <Dao />
                </Route>
                <Route path="/pledge/:id">
                  <Pledge />
                </Route>
                <Route path="/pledgeUSDT/:id">
                  <PledgeUSDT />
                </Route>
                <Route path="/pledgeRegular/:id">
                  <PledgeRegular />
                </Route>
                <Route path="/twist/:id">
                  <Twist />
                </Route>
                <Route path="/single/:id">
                  <Single />
                </Route>
                {/* <Route path="/combustion">
                  <Combustion />
                </Route> */}
                <Route path="/invitation">
                  <Invitation />
                </Route>
                {/* <Route path="/starPlan">
                  <StarPlan />
                </Route>
                <Route path="/starPlanList/:step">
                  <StarPlanList />
                </Route> */}
                {/* <Route path="/dig">
                  <Dig />
                </Route> */}
                <Route path="/coming">
                  <Coming />
                </Route>
                <Route path="/loan">
                  <Loan/>
                </Route>
                <Route path="/bridge">
                  <Bridge />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          }
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}


export default App;
// export default withRouter(App);
