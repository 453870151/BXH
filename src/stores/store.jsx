import config from "../config";
import async from 'async';
import * as moment from 'moment';
import axios from 'axios';
import cookie from 'react-cookies'
import { numberDecimal } from '../config/constantFunction'
import BigNumber from 'bignumber.js'

import ComptrollerABI from '../constants/abi/loan/Comptroller.json'
import { getModuleData } from '../constants/api'
import CTokenABI from '../constants/abi/loan/CToken.json'
import CEtherABI from '../constants/abi/loan/CEther.json'
import PriceOracleABI from '../constants/abi/loan/PriceOracle.json'
import BridgeABI from '../constants/abi/bridge/BridgeABI.json'
import XTokenABI from '../constants/abi/twist/XTokenABI.json'
import XSwapTokenABI from '../constants/abi/twist/XSwapTokenABI.json'

import ERC20ABI from '../constants/abi/ERC20.json'
import SinglePoolABI from '../constants/abi/farms/SinglePool.json'
import SingleXTokenABI from '../constants/abi/farms/SingleXToken.json'
  
import { addCookie, removeCookieAndSetnewData, removeCookieListlast, removeCookieWithKey, _getValuemultip1, _getValueDivided1, _getValuemultip, _getValueDivided, _getValuePow, isNoEmpty, isEmpty, saveToWei, _toPrecision, _getValueMultipZero } from '../config/constantFunction'
import {
  ERROR,
  BXHMENUHEADER,
  BXHMENUHEADER_RETURN,
  BXHINDEXBANNER,
  BXHINDEXBANNER_RETURN,
  BXHINDEXNOTICE,
  BXHINDEXNOTICE_RETURN,
  BXHSHOUYI_RETURN,
  CONNECTION_CONNECTED,
  BXHTOKENLIST,
  CONFIGURE,
  CONFIGURE_RETURNED,
  CHANINID_RETURNED,
  GET_BALANCES,
  GET_BALANCES_RETURNED,
  APPROVE,
  APPROVE_RETURNED,
  APPROVEDFK,
  APPROVEDFK_RETURNED,
  STAKEDFK,
  STAKEDFK_RETURNED,
  STAKEBXH,
  STAKEBXH_RETURNED,
  GET_REWARDS,
  GET_REWARDS_RETURNED,
  GETDFK_REWARDS,
  GETDFK_REWARDS_RETURNED,
  EXITDFK,
  EXITDFK_RETURNED,
  GET_CLAIMABLE,
  GET_CLAIMABLE_RETURNED,
  GET_YCRV_REQUIREMENTS,
  GET_YCRV_REQUIREMENTS_RETURNED,
  STAKEUSDTDFK,
  STAKEUSDTDFK_RETURNED,
  APPUSDTROVEDFK,
  APPUSDTROVEDFK_RETURNED,
  STAKEDFKUSDT,
  STAKEDFKUSDT_RETURNED,
  EXITUSDTDFK,
  EXITUSDTDFK_RETURNED,
  APPSELLROVEDFK,
  APPSELLROVEDFK_RETURNED,
  
  // BXH start
  GET_BXHList_PERPETUAL,
  GET_BXHList_PERPETUAL_RETURNED,
  GET_TOKENBALANCEANOUNT,
  GET_TOKENBALANCEANOUNT_RETURNED,
  GET_BXHTRADESTAKEINIT,
  GET_BXHTRADESTAKEINIT_RETURNED,
  GET_BXHTRADESTAKEApprove,
  GET_BXHTRADESTAKEApprove1,
  BXHADDLIQUIDITY,
  BXHADDLIQUIDITY_RETURNED,
  BXHREMOVELIQUIDITY,//减少流动性
  BXHREMOVELIQUIDITY_RETURNED,
  BXHCALCULATION,
  BXHCALCULATION_RETURNED,
  BXHCALCULATION2,
  BXHCALCULATION2_RETURNED,
  BXHALLOWANCEREMOVELIQUIDITY, //授权减少流动性
  BXHALLOWANCEREMOVELIQUIDITY_RETURNED,
  BXHLISTBALANCEHOME,
  BXHLISTBALANCEHOME_RETURNED,
  BXHPAGEREFRESH_RETURN,
  BXHDAOUSERINFO,//获取dao数据
  BXHDAOUSERINFO_RETURNED,
  BXHDAOUSERPending,
  BXHDAOUSERPending_RETURNED,
  BXHDAOTRADESTAKEApprove,//dao质押授权
  BXHDAOTRADESTAKEApprove_RETURNED,
  BXHDAOBXHDeposit,
  BXHDAOBXHDeposit_RETURNED,
  BXHDAOBXHRetrieve,
  BXHDAOBXHRetrieve_RETURNED,
  BXHDAOLockupApprove,//dao锁仓授权
  BXHDAOLockupApprove_RETURNED,
  BXHDAOBXHLockUpDeposit,
  BXHDAOBXHLockUpDeposit_RETURNED,
  BXHDAOBXHLockUpRetrieve,
  BXHDAOBXHLockUpRetrieve_RETURNED,
  BXHDAOV2PledgeApprove,
  BXHDAOV2PledgeApprove_RETURNED,
  BXHDAOV2BXHDeposit,
  BXHDAOV2BXHDeposit_RETURNED,
  BXHDAOV2BXHRetrieve,
  BXHDAOV2BXHRetrieve_RETURNED,
  //DaoV3
  BXHDAOV3PledgeApprove,
  BXHDAOV3PledgeApprove_RETURNED,
  BXHDAOV3PledgeXBXHApprove,
  BXHDAOV3PledgeXBXHApprove_RETURNED,
  BXHDAOV3BXHClaim,
  BXHDAOV3BXHClaim_RETURNED,
  BXHDAOV3BXHDeposit,
  BXHDAOV3BXHDeposit_RETURNED,
  BXHDAOV3BXHRetrieve,
  BXHDAOV3BXHRetrieve_RETURNED,
  BXHDAOV3XBXHDeposit,
  BXHDAOV3XBXHDeposit_RETURNED,
  BXHDAOV3XBXHRetrieve,
  BXHDAOV3XBXHRetrieve_RETURNED,

  BXHDAOBXHClaim,//BXH领取
  BXHDAOBXHClaim_RETURNED,
  BXHDAOBXHUnStake,//BXH提取质押
  BXHDAOBXHUnStake_RETURNED,
  BXHDAOBXHTeamRewards,//团队奖励
  BXHDAOBXHTeamRewards_RETURNED,
  BXHCOOKIEREFRESHEVENT,
  BXHGETAIRDROP,//领取空投
  BXHGETAIRDROP_RETURNED,
  BXHYIELDGETAIRDROP,//查询是否领取过空投
  BXHYIELDGETAIRDROP_RETURNED,
  BXHGETPOOLINFOBYID,
  BXHGETPOOLINFOBYID_RETURNED,
  BXHUSDTGETPOOLINFOBYID,
  BXHUSDTGETPOOLINFOBYID_RETURNED,
  BXHGETSINGLEPOOLINFOBUID,
  BXHGETSINGLEPOOLINFOBUID_RETURNED,
  BXHSINGLETOKENINFO,
  BXHSINGLETOKENINFO_RETURNED,
  GET_BXHTWIST,
  GET_BXHTWIST_RETURNED,
  GET_REGULAR,
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
  GET_TWISTPOOLINFOBYID,
  GET_TWISTPOOLINFOBYID_RETURNED,
  GET_PLEDGEPOOLINFOBYID,
  GET_PLEDGEPOOLINFOBYID_RETURNED,
  GET_USDTPLEDGEPOOLINFOBYID,
  GET_USDTPLEDGEPOOLINFOBYID_RETURNED,
  STAKEBXH_CHAINID,
  STAKEBXH_CHAINID_RETURNED,
  // BXH end
  
  //燃烧挖矿
  BXHCombustionApprove,//抵押授权
  BXHCombustionApprove_RETURNED,
  BXHCombustionDeposit,
  BXHCombustionDeposit_RETURNED,
  BXHCombustionWithdraw,
  BXHCombustionWithdraw_RETURNED,
  BXH_HOMEBALANCE,
  BXH_HOMEBALANCE_RETURNED,

  //借贷
  BXHLoanClaim_RETURN,
  BXHLoanDeposit_RETURN,

  //造星计划
  BXHStarPlanApprove,
  BXHStarPlanApprove_RETURNED,
  BXHStarPlanVote,
  BXHStarPlanVote_RETURNED,
  BXHStarPlanWithdraw,
  BXHStarPlanWithdraw_RETURNED,
 
  // Timo BXH
  GET_BXHEXCHANGE_PERPETUAL,
  GET_BXHEXCHANGE_PERPETUAL_RETURNED,
  GET_PASSEXCHANGE_PERPETUAL,
  GET_PASSEXCHANGE_PERPETUAL_RETURNED,
  GET_PASSEXCHANGE_REFRESH,
  STAKESYMBOLTOKNES,
  STAKESYMBOLTOKNES_RETURNED,
  APPEXCHANGETOKENS,
  APPEXCHANGETOKENS_RETURNED,
  GET_WRAPTOKENS,
  GET_WRAPTOKENS_RETURNED,
  GET_SYMBOL_RETURNED,
  APPALLOWANCE,
  APPALLOWANCE_RETURNED,
  APPSWAPALLOWANCE,
  SEARCHSYBMOL,
  SEARCHSYBMOL_RETURNED,
  BXHBALANCE_RETURNED,
  BXHGETPAIRBYTOKENS,//查询流动池是否存在 参数token0和token1地址
  BXHGETPAIRBYTOKENS_RETURNED,
  BXHSWAPSYBMOL,
  BXHSWAPSYBMOL_RETURNED,
  GET_TOKENPRICE_RETURNED,
  GET_TOKENPAYPRICE_RETURNED,
  GET__BRIDGEMAINRETURNED,

  GET_XDTALLOWANCE,
  GET_XDTALLOWANCE_RETURNED,
  GET_XDTSTATRE,
  GET_XDTSTATRE_RETURNED,
  GET_XDTSUCCEE_RETURNED,
  GET_XTOKENPRICE,
  GET_XTOKENPRICE_RETURNED,
  GET_XTOKENSTATRE,
  GET_XTOKENSTATRE_RETURNED,
  GET_XTOKENALLOWANCE,
  // Timo BXH
  //SINGLE
  SINGLETOKENAPPROVE,
  SINGLETOKENAPPROVE_RETURN,
  SINGLETOKENDEPOSIT,
  SINGLETOKENDEPOSIT_RETURN,
  SINGLETOKENWITHDRAW,
  SINGLETOKENWITHDRAW_RETURN,
  SINGLETOKENWITHDRAWUNLOCK,
  SINGLETOKENWITHDRAWUNLOCK_RETURN,
  SINGLETOKENCLAIMREWARD,
  SINGLETOKENCLAIMREWARD_RETURN,
  SINGLEXTOKENAPPROVE,
  SINGLEXTOKENAPPROVE_RETURN,
  SINGLEXTOKENSTAKE,
  SINGLEXTOKENSTAKE_RETURN,
  SINGLEXTOKENWITHDRAW,
  SINGLEXTOKENWITHDRAW_RETURN,
  BXHBRIDGESTAKE_RETURN,
  //ENDSINGLE
} from '../constants';
import Web3 from 'web3';
  
import {
  injected,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  frame,
  fortmatic,
} from "./connectors";
import { truncate } from "fs";
  
const rp = require('request-promise');
const ethers = require('ethers');
  
const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;
  
const dispatcher = new Dispatcher();
const emitter = new Emitter();
 
const routingToken = {
  '0XA71EDC38D189767582C38A3145B5873052C3E47A': '0XA71EDC38D189767582C38A3145B5873052C3E47A'  // USDT
}
const maxRoutingStep = 4;
  
class Store {
  constructor() {
  
    this.store = {
      currentBlock: 0,
      universalGasPrice: '70',
      account: {},
      web3: null,
      connectorsByName: {
        MetaMask: injected,
        // BitKeep: injected,
        // TokenPocket: injected,
        // TrustWallet: injected,
        WalletConnect: walletconnect,
        WalletLink: walletlink,
        Ledger: ledger,
        Trezor: trezor,
        Fortmatic: fortmatic,
        Frame: frame,
      },
      web3context: null,
      languages: [
        {
          language: 'English',
          code: 'en'
        },
        {
          language: 'Japanese',
          code: 'ja'
        },
        {
          language: 'Chinese',
          code: 'zh'
        },
        {
          language: 'korea',
          code: 'ko'
        },
        {
          language: 'Russia',
          code: 'ru'
        }
      ],
      proposals: [],
  
      // BXH 
  
      // 兑换 Timo
      rewardBXHPools: [
        {
          id: 'BXH',
          name: 'BXH Pool',
          tokens: [
            {
              id: 'BXH',
              address: '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c',  // HT(火币生态链)网络
              // address: '0x2E90FF584Bbe93709fFc8577E7b58d921Da6A4ce',  // HT(火币生态链)网络
              symbol: 'BXH',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.BXHRouterRewardsAddress,
              rewardsABI: config.BXHRouterRewardsABI,
              rewardsPairABI: config.BXHPairRewardsABI,
              rewardsSymbol: 'BXH',
              rewardsSymbolList: config.BXHTokensList,
              whtABIAddress: config.BXHWhtRewardsAddress,
              whtABI: config.BXHWhtRewardsABI,
              rewardsFactoryAddress: config.BXHFactoryRewardsAddress,
              rewardsFactoryABI: config.BXHFactory,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
            }
          ]
        },
      ],
      rewardSymbolList: [],
      rewardSymbolPrice: [],
      rewardSymbolConter: [],
      rewardSymbolPairs: [],
      // end Timo
  
      rewardBXHFactory: [
        {
          id: 'BXH',
          name: 'BXH Pool',
          website: '',   //点击这个跳转到link
          link: '',
          YieldCalculatorLink: "",   //收益率器地址
          depositsEnabled: true,
          tokens: [
            {
              id: 'BXH',
              address: '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c',  // HT(火币生态链)网络
              // address: '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c', // 测试网络
              symbol: 'BXH',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.BXHHepoolRewardsAddress,
              rewardsABI: config.BXHHepoolRewardsABI,
              pairABI: config.BXHPairABI,
              rewardsSymbol: 'BXH',
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0,
              StakedPoolList: []
            }
          ]
        },
      ],
      
      //128  axios
      pool_address: "0x55bf276e2a2e10AEB62c0Ed37D36585cB24d9cC1",
      router_address: "0x00eFB96dBFE641246E961b472C0C3fC472f6a694",
      factory_address: "0xe0367ec2bd4Ba22B1593E4fEFcB91D29DE6C512a",
      air_address: "0xcA1530D5282C703bf3c73c6A08794020dae8b397",
      //256 axios
      // pool_address:"0x1bCb6DF7Cdd74E391d809C167a8E262709614985",
      // router_address:"0x9fE4C3F35a92F7C7278BB951adABb5Bd438A0637",
      // factory_address:"0xB6B1fE87cAa52D968832a5053116af08f4601475",
      // air_address:"0x5391B31762cCD7544a9C2044807632f33a9C33b6",
      
      //56  BSC
      pool_address_BSC: "0xF573fB071305909ab48889F45fFcd8ec63Dd6040",
      router_address_BSC: "0x6A1A6B78A57965E8EF8D1C51d92701601FA74F01",
      factory_address_BSC: "0x7897C32cbda1935e97c0B59F244747562D4d97c1",

      //66  OKEX
      pool_address_OKEX: "0x006854D77b0710859Ba68b98d2c992ea2837c382",
      router_address_OKEX: "0x56cdDEAa7344498a24E3303333DCAa46fDeD1707",
      factory_address_OKEX: "0xff65BC42c10dcC73aC0924B674FD3e30427C7823",
      
      //1  ETH
      pool_address_ETH: "0xCD5fab58847FCCB5c6DB45746220E90A61B16806",
      router_address_ETH: "0x69CD48f775E10651855cDe0fBF4Afe50a7d839E0",
      factory_address_ETH: "0x8d0fCA60fDf50CFE65e3E667A37Ff3010D6d1e8d",

      //43114  AVAX
      pool_address_AVAX: "0x0199bb251A190134f36Bab3fdEE557498EbC9aE5",
      router_address_AVAX: "0x14f800843F7d70C911d4ec728f2F839c264A9895",
      factory_address_AVAX: "0xDeC9231b2492ccE6BA01376E2cbd2bd821150e8C",

      // 单币质押--定期 合约
      pool_address_regular: "0x1cf8522bf2145b57dad53e486f4158f1d8192473",
  
      PoolList: null,
      tokenList: null,
      MyLiquidityPoolList: null,
      tokenList_centerData:null,
      //ht，usdt，husd，hbtc，hltc，hbch，hbsv，hdot，hfil，eth，
      MainStreamTokenList: ["HT", "USDT", "HUSD", "HBTC", "HLTC", "HBCH", "HBSV", "HDOT", "HFIL", "ETH"]
  
    }
  
    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case BXHMENUHEADER:
            this._getMenuHeader(payload);
            break;
          case BXHINDEXBANNER:
            this._getBannerIndex(payload);
            break;
          case BXHINDEXNOTICE:
            this._getIndexBXHNotice(payload);
            break;
          case BXHTOKENLIST:
            this._getTokensList(payload);
            break;
          case CHANINID_RETURNED:
            this.chaninID_configure(payload);
            break;
          case GET_BALANCES:
            // this.getBalances(payload);
            break;
          case APPROVE:
            this.approve(payload);
            break;
          case APPROVEDFK:
            this.approveDFK(payload);
            break;
          case STAKEDFK:
            this.stakeDFK(payload);
            break;
          case GETDFK_REWARDS:
            this.getRewardDFK(payload);
            break;
          case EXITDFK:
            this.exitDFK(payload);
            break;
          case GET_CLAIMABLE:
            this.getClaimable(payload)
            break;
          case GET_YCRV_REQUIREMENTS:
            this.getYCRVRequirements(payload)
            break;
          case STAKEUSDTDFK:
            this.getStakeUSDTDFK(payload)
            break;
          case APPUSDTROVEDFK:
            this.approveUSDTDFK(payload)
            break;
          case APPSELLROVEDFK:
            this.approveSellDFK(payload)
            break;
          case STAKEDFKUSDT:
            this.getUSDTDFKStake(payload)
            break;
          case EXITUSDTDFK:
            this.exitUSDTDFK(payload)
            break;
  
          // BXH start
          case GET_BXHList_PERPETUAL:
            this.getBXHBalancesList(payload)
            break;
          case GET_TOKENBALANCEANOUNT:
            this.getTokenAmount(payload)
            break;
          case BXHSINGLETOKENINFO:
            this.singleTokenInfo(payload)
            break;
            case GET_BXHTWIST:
            this.getBXHStakeInfo(payload)
            break;
          case GET_TWISTALLOWANCE:
            this.getTwAllowance(payload)
            break;
          case GET_TWISTALLOWANCE1:
            this.getTwAllowance1(payload)
            break;
          case GET_BXHDEPOSITTWIST:
            this.getBXHDEPOSIT(payload)
            break;
          case GET_TWISTCANCEL:
              this.getTwistCancel(payload)
              break;
          case GET_TWISTPLEDGE:
              this.getTwistPledge(payload)
              break;
          case GET_TWISTPLEDGECANCEL:
              this.getTwistPledgeCancel(payload)
              break;
          case STAKEBXH:
            this.stakeBXH(payload);
            break;
          case GET_BXHTRADESTAKEINIT:
            this.getBXHTradeStakeInfo(payload)
            break;
          case GET_BXHTRADESTAKEApprove:
            this.approveBXH(payload);
            break;
          case GET_BXHTRADESTAKEApprove1:
            this.approveBXH1(payload);
            break;
          case BXHADDLIQUIDITY:
            this.addLiquidityBXH(payload);
            break;
          case BXHREMOVELIQUIDITY:
            this.removeLiquidityBXH(payload);
            break;
          case BXHCALCULATION:
            this.getBXHTradeStakeAmountCalcula(payload);
            break;
          case BXHCALCULATION2:
            this.getBXHTradeStakeAmountCalcula2(payload);
            break;
          case BXHALLOWANCEREMOVELIQUIDITY:
            this.approveBXHRemoveLiquidity(payload);
            break;
          case BXHLISTBALANCEHOME:
            this.getBXHHomeBanalce(payload);
            break;
          case BXHDAOUSERINFO:
            this.getDaoUserInfo(payload);
            break;
          case BXHDAOUSERPending:
            this.getDaoUserPending(payload);
            break;
          case BXHDAOTRADESTAKEApprove:
            this.daoApproveBXH(payload);
            break;
          case BXHDAOBXHDeposit:
            this.daoBXHDeposit(payload);
            break;
          case BXHDAOBXHRetrieve:
            this.daoBXHRetrieve(payload);
            break;
          case BXHDAOLockupApprove:
            this.daoLockUpApprove(payload);
            break;
          case BXHDAOBXHLockUpDeposit:
            this.daoBXHLockUpDeposit(payload);
            break;
          case BXHDAOBXHLockUpRetrieve:
            this.daoBXHLockUpRetrieve(payload);
            break;
          case BXHDAOV2PledgeApprove:
            this.daoV2ApproveBXH(payload);
            break;
          case BXHDAOV2BXHDeposit:
            this.daoV2BXHDeposit(payload);
            break;
          case BXHDAOV2BXHRetrieve:
            this.daoV2BXHRetrieve(payload);
            break;
          //DaoV3
          case BXHDAOV3PledgeApprove:
            this.v3PledgeApprove(payload);
            break;
          case BXHDAOV3PledgeXBXHApprove:
            this.v3PledgeXBXHApprove(payload);
            break;
          case BXHDAOV3BXHClaim:
            this.v3Claim(payload);
            break;
          case BXHDAOV3BXHDeposit:
            this.v3Deposit(payload);
            break;
          case BXHDAOV3BXHRetrieve:
            this.v3Retrieve(payload);
            break;
          case BXHDAOV3XBXHDeposit:
            this.v3XBXHDeposit(payload);
            break;
          case BXHDAOV3XBXHRetrieve:
            this.v3XBXHRetrieve(payload);
            break;

          case BXHDAOBXHClaim:
            this.daoBXHClaim(payload);
            break;
          case BXHDAOBXHUnStake:
            this.daoBXHUnStake(payload);
            break;
          case BXHDAOBXHTeamRewards:
            this.getDaoBXHTeamRewards(payload);
            break;
          case BXHGETAIRDROP:
            this.getAirDrop(payload);
            break;
          case BXHYIELDGETAIRDROP:
            this.checkAirDrop(payload);
            break;
          case BXHGETPOOLINFOBYID:
            this.getPoolInfoByID(payload);
            break;
          case BXHUSDTGETPOOLINFOBYID:
            this.getPoolInfoByUSDTID(payload);
            break;
          case GET_TWISTPOOLINFOBYID:
            this.getTwistPoolInfoByID(payload);
            break;
          case GET_PLEDGEPOOLINFOBYID:
            this.getPledgepPoolInfoByID(payload);
            break;
          case GET_USDTPLEDGEPOOLINFOBYID:
            this.getPledgepUSDTPoolInfoByID(payload);
            break;
          case BXHGETSINGLEPOOLINFOBUID:
              this.getSinglePoolInfoByID(payload)
              break;
          case BXH_HOMEBALANCE:
            this.getHomeBalance(payload)
            break;
          case STAKEBXH_CHAINID:
            this.getChainid(payload)
            break;
          // BXH end
  
          //燃烧挖矿
          case BXHCombustionApprove:
            this.approveCombustion(payload);
            break;
          case BXHCombustionDeposit:
            this.combustionDeposit(payload);
            break;
          case BXHCombustionWithdraw:
            this.combustionWithdraw(payload);
            break;

          //造星计划
          case BXHStarPlanApprove:
            this.approveStarPlan(payload);
            break;
          case BXHStarPlanVote:
            this.starPlanVote(payload);
            break;
          case BXHStarPlanWithdraw:
            this.starPlanWithdraw(payload);
            break;
          case SEARCHSYBMOL:
            this.getSearchSybmol(payload)
            break;
          case GET_XDTALLOWANCE:
            this.getXDTAllowance(payload)
            break;
          case GET_XDTSTATRE:
            this.getXDTSwap(payload)
            break;
          case GET_XTOKENPRICE:
            this.getXTokenPrice(payload)
            break;
          case GET_XTOKENALLOWANCE:
            this.getXTokenAllowance(payload)
            break;
          case GET_XTOKENSTATRE:
            this.getXTokenSwap(payload)
            break;
          //SINGLE
          case SINGLETOKENAPPROVE:
            this.singleApprovalToken(payload);
            break;
          case SINGLETOKENDEPOSIT:
            this.singleDeposit(payload);
            break;
          case SINGLETOKENWITHDRAW:
            this.singleWithdraw(payload);
            break;
          case SINGLETOKENWITHDRAWUNLOCK:
            this.singleWithdrawUnlock(payload);
            break;
          case SINGLETOKENCLAIMREWARD:
            this.singleClaimReward(payload);
            break;
          case SINGLEXTOKENAPPROVE:
            this.singleApprovalXToken(payload);
            break;
          case SINGLEXTOKENSTAKE:
            this.singleXTokenStake(payload);
            break;
          case SINGLEXTOKENWITHDRAW:
            this.singleXTokenWithdraw(payload);
            break;
          //ENDSINGLE
          default: {
          }
        }
      }.bind(this)
    );
  }
  
  getStore(index) {
    return (this.store[index]);
  };
  
  setStore(obj) {
    this.store = { ...this.store, ...obj }
  
    return emitter.emit('StoreUpdated');
  };
  
  configure = async () => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const currentBlock = await web3.eth.getBlockNumber()
    store.setStore({ currentBlock: currentBlock })

    this.updateMyLiquidityPool()
    this._getMineStakedPool((stakedList) => {
      localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
      store.setStore({ StakedPoolList: stakedList })
    })
    window.setTimeout(() => {
      emitter.emit(CONFIGURE_RETURNED)
    }, 100)

    // 获取当前钱包链接的链ID，（128 heco，56 bsc）
    const { ethereum } = window;
    let chainId = await ethereum.networkVersion;
    if(chainId){
      chainId = await ethereum.networkVersion;
    }else{
      // 火币钱包直接获取chainId
      chainId = await ethereum.chainId;
    }
    if(chainId){
      localStorage.setItem("chainIDSwitch", chainId)
      // 根据openSatus判断是否显示借贷（openSatus=1：开启，0：关闭）
      getModuleData((data)=>{
        const loanModule = data.module[0];
        localStorage.setItem("loanOpenSatus", loanModule.openSatus)
      })
    }
  }

  chaninID_configure = async () => {
    // 获取当前钱包链接的链ID，（128 heco，56 bsc）
    const { ethereum } = window;
    let chainId 
    if(ethereum){
      chainId = await ethereum.networkVersion;
      if(chainId){
        chainId = await ethereum.networkVersion;
      }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
      }
    }else{
      chainId = '56'
    }
    if(chainId){
      localStorage.setItem("chainIDSwitch", chainId)
      // 根据openSatus判断是否显示借贷（openSatus=1：开启，0：关闭）
      getModuleData((data)=>{
        const loanModule = data.module[0];
        localStorage.setItem("loanOpenSatus", loanModule.openSatus)
      })
    }
  }
  
  updateMyLiquidityPool = () => {
    // console.log("刷新我的流动吃")
    const account = store.getStore("account")
    this._getMyAllLiquidity((data) => {
      if (data) {
        localStorage.setItem(account.address+"_myAllLiquidity", JSON.stringify(data));
        store.setStore({ MyLiquidityPoolList: data })
      }
    })
  }
  
  // BXH start
  // 首页币对列表
  getBXHBalancesList = async () => {
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')

    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const currentBlock = await web3.eth.getBlockNumber()
    store.setStore({ currentBlock: currentBlock })
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getMinePoolBXHList(web3, token, account, callbackInnerInner) },
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.symbolTokens = data[0]
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
  
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        console.log(err)
        return emitter.emit(ERROR, err)
      }
      emitter.emit(GET_BXHList_PERPETUAL_RETURNED, poolData)
    })
  }
  
  //DAOV2
  _getDaoUserInfo = async (contractAddress,asset,callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null
      || account.address == undefined || account.address == null
      || contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    try {
      const data = await erc20Contract.methods.userInfo(account.address).call({ from: account.address });
      let { amount } = data;
      if (parseFloat(amount) > 0) {
        amount = this._getValueDivided(amount, 10 ** asset.token_decimal);
      }
      callback({amount});
    } catch (ex) {
      console.log(ex);
    }
  }
  _getDaoInfo = async (contractAddress,asset,callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    try {
      let pendingReward = await erc20Contract.methods.pendingReward(account.address).call({ from: account.address });
      let unlockingAmount = await erc20Contract.methods._unlockingAmount(account.address).call({ from: account.address });
      let unstakableAmount = await erc20Contract.methods.unstakableAmount(account.address).call({ from: account.address });
      const startTime = await erc20Contract.methods.startTime().call();
      const epochLength = await erc20Contract.methods.epochLength().call();//时间间隔秒
      const currentEpoch = await erc20Contract.methods.currentEpoch().call();
      const timestamp = Date.parse(new Date())/1000;
      const remainingSecond = epochLength-(timestamp-currentEpoch*epochLength-startTime);//倒计时应该剩余时间：=当前timestamp - 期数*epcotime-startime
      // console.log('remainingSecond',remainingSecond)
      const cycleNumber = epochLength/3600/24;//周期天数
      // console.log('cycleNumber',cycleNumber)
      pendingReward = this._getValueDivided(pendingReward, 10 ** asset.token_decimal);
      unlockingAmount = this._getValueDivided(unlockingAmount, 10 ** asset.token_decimal);
      unstakableAmount = this._getValueDivided(unstakableAmount, 10 ** asset.token_decimal);
      callback({remainingSecond,pendingReward,unlockingAmount,unstakableAmount,cycleNumber});
    } catch (ex) {
      console.log(ex);
    }
  }
  _getDaoShareAndRewardsInfo = async (contractAddress,token,callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    try {
      let decimals = await this._getDecimals(token);
      const data = await erc20Contract.methods.sharesAndRewardsInfo().call();
      let { activeShares,pendingSharesToAdd,pendingSharesToReduce,rewards,claimedRewards,lastUpdatedEpochFlag } = data;
      activeShares = this._getValueDivided(activeShares, 10 ** decimals);
      pendingSharesToAdd = this._getValueDivided(pendingSharesToAdd, 10 ** decimals);
      pendingSharesToReduce = this._getValueDivided(pendingSharesToReduce, 10 ** decimals);
      rewards = this._getValueDivided(rewards, 10 ** decimals);
      claimedRewards = this._getValueDivided(claimedRewards, 10 ** decimals);
      const pledgeAmount = this._getValueMinus(this._getValueAdd(activeShares,pendingSharesToAdd),pendingSharesToReduce);//质押总量
      lastUpdatedEpochFlag = parseInt(lastUpdatedEpochFlag)+1;
      // console.log('sharesAndRewardsInfo',data)
      callback({pledgeAmount,rewards,claimedRewards,lastUpdatedEpochFlag});
    } catch (ex) {
      console.log(ex);
    }
  }
  _getDaoBonusToken = async (contractAddress,callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    try {
      const token = await erc20Contract.methods.BonusToken().call();
      callback(token);
    } catch (ex) {
      console.log(ex);
    }
  }
  _getDaoBonusTokenInfo = async (token, contract, callback) => {
    if (contract == undefined || contract == null || contract == "" ||
      token == undefined || token == null || token == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, token);
    try {
      const decimals = await this._getDecimals(token);
      let balance = await erc20Contract.methods.balanceOf(contract).call({ from: contract }); //abi地址
      const symbol = await erc20Contract.methods.symbol().call();
      balance = this._getValueDivided(balance, 10 ** decimals);
      callback({balance,symbol});
    } catch (ex) {
      console.log(ex);
    }
  }
  //授权抵押BXH
  daoV2ApproveBXH = (payload) => {
    const asset = payload.content.asset;
    const account = store.getStore('account')
    const contractAddress = payload.content.contractAddress;
    const amount = '100000000000000000000000000000000'//测试授权
    this._callDaoApprovalBXH(asset, account, amount, asset.token_address, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV2PledgeApprove_RETURNED, res)
    })
  }
  daoBXHClaim = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    this._callDaoBXHMethod('claim', contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHClaim_RETURNED, res)
    })
  }
  daoBXHUnStake = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    this._callDaoBXHMethodNoParam('unStake', contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHUnStake_RETURNED, res)
    })
  }
  _callDaoBXHMethodNoParam = async (method, contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    erc20Contract.methods[method]().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  _callDaoBXHMethod = async (method, contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    erc20Contract.methods[method](account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //BXH抵押
  daoV2BXHDeposit = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    const amount = payload.content.amount;
    this._callDaoV2BXHDepositRetrieve('stake', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV2BXHDeposit_RETURNED, res)
    })
  }
  _callDaoV2BXHDepositRetrieve = async (method, contractAddress, asset, amount, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    // console.log(method, amount)
    var amountToSend = amount;
    if (amount != 0) {
      amountToSend = web3.utils.toWei(amount, "ether")
      if (asset.token_decimal != 18) {
        amountToSend = this._getValueDecimals(amount, asset.token_decimal);
      }
    }
    // console.log(method, amountToSend)
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV2ABI, contractAddress);
    erc20Contract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //BXH取回
  daoV2BXHRetrieve = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const amount = payload.content.amount;
    this._callDaoV2BXHDepositRetrieve('unlock', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV2BXHRetrieve_RETURNED, res)
    })
  }
  //DaoV3
  v3PledgeApprove = async (payload) => {
    const { symbolAddress, contractAddress } = payload.content;
    const account = store.getStore('account')
    const amount = '100000000000000000000000000000000'//测试授权
    this._callDaoV3ApprovalBXH(account, amount, symbolAddress, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3PledgeApprove_RETURNED, res)
    })
  }
  v3PledgeXBXHApprove = async (payload) => {
    const { symbolAddress, contractAddress } = payload.content;
    console.log('===',payload.content)
    // return 
    const account = store.getStore('account')
    const amount = '100000000000000000000000000000000'//测试授权
    this._callDaoV3ApprovalBXH(account, amount, symbolAddress, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3PledgeXBXHApprove_RETURNED, res)
    })
  }
  _callDaoV3ApprovalBXH = async (account, amount, symbolAddress, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, symbolAddress)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = this._getValueDecimals(amount, asset.decimals);
    // }
  
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  _getDaoV3XBXHInfo = async (contractAddress,daoV3Address,bxhAsset,callback) => {
    const account = store.getStore('account');
    if (daoV3Address == undefined || daoV3Address == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV3ABI, contractAddress);
    let erc20XBXHContract = new web3.eth.Contract(config.BXHTwABI, daoV3Address);
    let erc20BXHContract = new web3.eth.Contract(config.erc20ABI, bxhAsset.token_address);
    try {
      let pending = await erc20Contract.methods.pending(5,account.address).call({ from: account.address });
      let userInfo = await erc20Contract.methods.userInfo(5,account.address).call({ from: account.address });
      let bonusPerBlock = await erc20Contract.methods.bonusPerBlock().call();
      let poolInfo = await erc20Contract.methods.poolInfo(5).call();
      let totalAllocPoint = await erc20Contract.methods.totalAllocPoint().call();
      let pledgeAmount = await erc20XBXHContract.methods.balanceOf(contractAddress).call();//质押总量
      let balance = await erc20XBXHContract.methods.balanceOf(account.address).call({ from: account.address });
      let toBeAwarded = await erc20BXHContract.methods.balanceOf(contractAddress).call();//带奖励金额
      let pendingReward = this._getValueDivided(pending, 10 ** 18);
      let amount = this._getValueDivided(userInfo.amount, 10 ** 18);
      pledgeAmount = this._getValueDivided(pledgeAmount, 10 ** 18);
      balance = this._getValueDivided(balance, 10 ** 18);
      toBeAwarded = this._getValueDivided(toBeAwarded, 10 ** 18);
      let todayRewards = bonusPerBlock*1200*24*poolInfo.allocPoint/totalAllocPoint;
      todayRewards = this._getValueDivided(todayRewards, 10 ** 18);
      const apr = todayRewards*365/pledgeAmount*100;
      // M = 今日奖励数量/质押总数量
      // 复利年化=[(1+M)∧365-1]*100%
      const m = todayRewards/pledgeAmount;
      const apy = (_getValuePow((1+m*1),365,4)-1)*100;
      callback({pendingReward,balance,amount,pledgeAmount,toBeAwarded,todayRewards,apr,apy});
    } catch (ex) {
      console.log(ex);
    }
  }
  v3Claim = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    this._callDaoV3XBXHDepositRetrieve('deposit', contractAddress, asset, '0', (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3BXHClaim_RETURNED, res)
    })
  }
  v3Deposit = async (payload) => {
    const account = store.getStore('account');
    const {contractAddress, asset, amount} = payload.content;
    this._callDaoV3BXHDepositRetrieve('stake', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3BXHDeposit_RETURNED, res)
    })
  }
  v3Retrieve = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const amount = payload.content.amount;
    this._callDaoV3BXHDepositRetrieve('withdraw', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3BXHRetrieve_RETURNED, res)
    })
  }
  v3XBXHDeposit = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    const amount = payload.content.amount;
    this._callDaoV3XBXHDepositRetrieve('deposit', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3XBXHDeposit_RETURNED, res)
    })
  }
  v3XBXHRetrieve = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const amount = payload.content.amount;
    this._callDaoV3XBXHDepositRetrieve('withdraw', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOV3XBXHRetrieve_RETURNED, res)
    })
  }
  _callDaoV3BXHDepositRetrieve = async (method, contractAddress, asset, amount, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    var amountToSend = amount;
    if (amount != 0) {
      amountToSend = web3.utils.toWei(amount, "ether")
      if (asset.token_decimal != 18) {
        amountToSend = this._getValueDecimals(amount, asset.token_decimal);
      }
    }
    const yCurveFiContract = new web3.eth.Contract(config.BXHTwABI, contractAddress)
    yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash) {
      // console.log(hash)
      callback(null, hash)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      // console.log(confirmationNumber, receipt);
      // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    })
    .on('receipt', function (receipt) {
      // console.log("receipt----->>>>>>",receipt);
      receipt.isHideDialog = true
      callback(null, receipt)
    })
    .on('error', function (error) {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
    .catch((error) => {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
  }
  _callDaoV3XBXHDepositRetrieve = async (method, contractAddress, asset, amount, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    // console.log(method, amount)
    var amountToSend = amount;
    if (amount != 0) {
      amountToSend = web3.utils.toWei(amount, "ether")
      if (asset.token_decimal != 18) {
        amountToSend = this._getValueDecimals(amount, asset.token_decimal);
      }
    }
    // console.log(method, amountToSend)
    let erc20Contract = new web3.eth.Contract(config.BXHDaoV3ABI, contractAddress);
    erc20Contract.methods[method](5,amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //DAO
  getDaoUserInfo = async (payload) => {
    const asset = payload.content.asset;
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    if (asset == undefined || asset == null
      || account.address == undefined || account.address == null
      || contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoABI, contractAddress);
    try {
      const data = await erc20Contract.methods.userInfo(0, account.address).call({ from: account.address });
      let { amount, rewardDebt } = data;
      if (parseFloat(amount) > 0) {
        amount = this._getValueDivided(amount, 10 ** asset.token_decimal);
      }
      if (parseFloat(rewardDebt) > 0) {
        rewardDebt = this._getValueDivided(rewardDebt, 10 ** asset.token_decimal);
      }
      const returnVal = { amount: amount, rewardDebt: rewardDebt };
      // console.log(returnVal)
      emitter.emit(BXHDAOUSERINFO_RETURNED, returnVal);
    } catch (ex) {
      console.log(ex);
    }
  }
  getDaoUserPending = async (payload) => {
    const asset = payload.content.asset;
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDaoABI, contractAddress);
    try {
      const data = await erc20Contract.methods.pending(0, account.address).call({ from: account.address });
      const returnVal = this._getValueDivided(data, 10 ** asset.token_decimal);
      // console.log('userPending', returnVal)
      emitter.emit(BXHDAOUSERPending_RETURNED, returnVal);
    } catch (ex) {
      console.log(ex);
    }
  }
  //获取BXH是否授权
  getDaoBXHAlloWance = async (contractAddress, asset, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.token_address)
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** asset.token_decimal
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      callback(ex)
    }
  }
  getDaoBXHBalance = async (asset, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null || account.address == undefined || account.address == null) {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.token_address)
    try {
      let balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = this._getValueDivided(balance, 10 ** asset.token_decimal);
      callback(null, balance)
    } catch (ex) {
      callback(ex)
    }
  }
  //授权抵押BXH
  daoApproveBXH = (payload) => {
    const asset = payload.content.asset;
    const account = store.getStore('account')
    const contractAddress = payload.content.contractAddress;
    const amount = '100000000000000000000000000000000'//测试授权
    this._callDaoApprovalBXH(asset, account, amount, asset.token_address, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOTRADESTAKEApprove_RETURNED, res)
    })
  }
  checkBalanceByTokenContractAddress = async (contractAddress) => {
    console.log("查询的contractAddress--->>>>", contractAddress)
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, contractAddress)

    let myAddress = config.MyAddress

    for (let index = 0; index < myAddress.length; index++) {
      const item = myAddress[index];
      // console.log("item.address--->>>>",item.address)
      let balance = await erc20Contract.methods.balanceOf(item.address).call({ from: item.address });
      if (balance > 0) {
        let decimal = await erc20Contract.methods.decimals().call();
        let balance1 = this._getValueDivided(balance, 10 ** decimal);
        console.log("地址：" + item.address + " 余额：-->>" + balance1)
      }
    }
    console.log("查询结束")
  }
  _callDaoApprovalBXH = async (asset, account, amount, symbolAddress, contractAddress, callback) => {
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, symbolAddress)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = this._getValueDecimals(amount, asset.decimals);
    // }
  
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //BXH抵押
  daoBXHDeposit = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    const amount = payload.content.amount;
    this._callDaoBXHDepositRetrieve('deposit', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHDeposit_RETURNED, res)
    })
  }
  _callDaoBXHDepositRetrieve = async (method, contractAddress, asset, amount, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    // console.log(method, amount)
    var amountToSend = amount;
    if (amount != 0) {
      amountToSend = web3.utils.toWei(amount, "ether")
      if (asset.token_decimal != 18) {
        amountToSend = this._getValueDecimals(amount, asset.token_decimal);
      }
    }
    // console.log(method, amountToSend)
    let erc20Contract = new web3.eth.Contract(config.BXHDaoABI, contractAddress);
    erc20Contract.methods[method](0, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //BXH取回
  daoBXHRetrieve = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const asset = payload.content.asset;
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const amount = payload.content.amount;
    this._callDaoBXHDepositRetrieve('withdraw', contractAddress, asset, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHRetrieve_RETURNED, res)
    })
  }
  //获取某个币种是否授权
  daoBXHLockUpAlloWance = async (contractAddress, lpAddress, callback) => {
    const account = store.getStore('account');
    if (!lpAddress || lpAddress == "" ||
      !account || !account.address || account.address == "" ||
      !contractAddress || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpAddress);
    try {
      let decimal = await erc20Contract.methods.decimals().call();
      let alloWance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** decimal;
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      callback(ex)
    }
  }
  //授权抵押BXH
  daoLockUpApprove = (payload) => {
    const symbolAddress = payload.content.symbolAddress;
    const account = store.getStore('account')
    const contractAddress = payload.content.contractAddress;
    const amount = '100000000000000000000000000000000'//测试授权
    this._callDaoLockUpApprove(account, amount, symbolAddress, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOLockupApprove_RETURNED, res)
    })
  }
  _callDaoLockUpApprove = async (account, amount, symbolAddress, contractAddress, callback) => {
    if (!account || !account.address || account.address == "" ||
      !contractAddress || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, symbolAddress)
    let decimals = await yCurveFiContract.methods.decimals().call();
    let amountToSend = this._getValueDecimals(amount, decimals)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = this._getValueDecimals(amount, asset.decimals);
    // }
  
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //获取symbol
  daoBXHLockUpLpSymbol = async (lpAddress, callback) => {
    if (!lpAddress || lpAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpAddress);
    try {
      let symbol = await erc20Contract.methods.symbol().call();
      callback(null, symbol)
    } catch (ex) {
      callback(ex)
    }
  }
  daoBXHLockUpLockBlocks = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (contractAddress == undefined || contractAddress == null || contractAddress == "" || account.address == undefined || account.address == null) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDAOLockUpABI, contractAddress);
    try {
      const currentBlock = await web3.eth.getBlockNumber();
      const lockBlocks = await erc20Contract.methods.lockBlocks(account.address).call({ from: account.address }); //abi地址
      const blockDifference = this._getValueDivided3(lockBlocks,currentBlock);
      const timeSecond = this._getValueMultipliedZero(blockDifference,3);
      callback(null, timeSecond);
    } catch (ex) {
      callback(ex)
    }
  }
  //获取锁仓获取抵押的数量
  getDaoBXHLockUpPoolAmount = async (contractAddress, exId, poolId, dao_address, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account');
    let pool_address = store.getStore('pool_address');
    if (!account || !account.address || account.address=="" || 
    !contractAddress || contractAddress === "" || 
    !pool_address || pool_address === "" || 
    !dao_address || dao_address === "") {
      return callback('error')
    }
    let isDAOOperation = this.checkCurrentIsDaoOperation(poolId);
    let HepoolContract = null;
    if (!isDAOOperation) {
      HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    }else{
      HepoolContract = new web3.eth.Contract(config.BXHDaoABI, dao_address)
    }
    try {
      let userInfo = await HepoolContract.methods.userInfo(exId, account.address).call({ from: account.address });
      let amount = this._getValueDivided(userInfo.amount, 10**18);
      callback(null, amount)
    } catch (ex) {
      return callback(ex)
    }
  }
  daoBXHLockUpLockTime = async (contractAddress, callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    this._callDaoBXHLockUp('lockTime', contractAddress, (err, result)=>{
      if(err==null) {
        let lockTime = this._getValueMultiplied(result, 3);
        let day = this._getValueDividedZero(lockTime,86400);
        callback(null, day);
      }else{
        callback(err, null);
      }
    });
  }
  daoBXHLockUpTotalSupply = async (contractAddress, callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDAOLockUpABI, contractAddress)
    try {
      let decimal = await erc20Contract.methods.decimals().call();
      let result = await erc20Contract.methods.totalSupply().call(); //abi地址
      let balance = this._getValueDivided(result, 10**decimal);
      callback(null, balance);
    } catch (ex) {
      callback(ex)
    }
  }
  getDaoBXHLockUpBalance = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (contractAddress == undefined || contractAddress == null || contractAddress == "" || account.address == undefined || account.address == null) {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, contractAddress)
    try {
      let decimal = await erc20Contract.methods.decimals().call();
      let balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = this._getValueDivided(balance, 10**decimal);
      callback(null, balance)
    } catch (ex) {
      callback(ex)
    }
  }
  _callDaoBXHLockUp = async (method, contractAddress, callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDAOLockUpABI, contractAddress);
    try {
      let result = await erc20Contract.methods[method]().call(); //abi地址
      callback(null, result);
    } catch (ex) {
      callback(ex)
    }
  }
  //BXH锁仓抵押
  daoBXHLockUpDeposit = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const amount = payload.content.amount;
    this._callDaoLockUpBXHDepositRetrieve('deposit', contractAddress, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHLockUpDeposit_RETURNED, res)
    })
  }
  //BXH锁仓取回
  daoBXHLockUpRetrieve = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    const amount = payload.content.amount;
    this._callDaoLockUpBXHDepositRetrieve('withdraw', contractAddress, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHLockUpRetrieve_RETURNED, res)
    })
  }
  _callDaoLockUpBXHDepositRetrieve = async (method, contractAddress, amount, callback) => {
    const account = store.getStore('account');
    if (!account || !account.address || account.address == "" ||
      !contractAddress || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHDAOLockUpABI, contractAddress);
    let decimal = await erc20Contract.methods.decimals().call();
    let amountToSend = this._getValueMultipliedZero(amount, 10**decimal);
    erc20Contract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //查询获取可以领取的奖励额度
  getDaoTeamCanRewards = async (contractAddress, asset, callback) => {
    const account = store.getStore('account');
    if (asset == undefined || asset == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHTeamLockABI, contractAddress);
    try {
      const data = await erc20Contract.methods.getCurrentUserReward(account.address).call({ from: account.address });
      let val = this._getValueDivided(data, 10 ** asset.token_decimal);
      callback(val);
    } catch (ex) {
      console.log(ex);
    }
  }
  //领取团队奖励
  getDaoBXHTeamRewards = async (payload) => {
    const account = store.getStore('account');
    const contractAddress = payload.content.contractAddress;
    this._callDaoBXHTeamLock('withDraw', contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHDAOBXHTeamRewards_RETURNED, res)
    })
  }
  _callDaoBXHTeamLock = async (method, contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHTeamLockABI, contractAddress);
    erc20Contract.methods[method](account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //燃烧挖矿
  //查询lpToken
  getCombustionLpToken = async (contractAddress, callback) => {
    this._callCombustion("lpToken", contractAddress, callback);
  }
  getCombustionBlockNumber = async (callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    try {
      const currentBlock = await web3.eth.getBlockNumber();
      callback(null, currentBlock);
    } catch (ex) {
      callback(ex)
    }
  }
  getCombustionStartBlock = async (contractAddress, callback) => {
    this._callCombustion("startBlock", contractAddress, callback);
  }
  getCombustionEndBlock = async (contractAddress, callback) => {
    this._callCombustion("endBlock", contractAddress, callback);
  }
  getCombustionTotalRaised = async (contractAddress, callback) => {
    const that = this;
    this._callCombustion("totalAmount", contractAddress, (err, totalAmount) => {
      if (err == null) {
        that._callCombustion("raisingAmount", contractAddress, (err, raisingAmount) => {
          if (err == null) {
            const value = that._getValueDivided(totalAmount, raisingAmount);
            const totalRaised = that._getValueMultiplied(value, 100);
            callback(null, totalRaised);
          } else {
            callback(err, null);
          }
        });
      } else {
        callback(err, null);
      }
    });
  }
  //BXHP To Claim
  getCombustionOfferingAmount = async (contractAddress, lpToken, callback) => {
    try {
      let decimals = await this._getDecimals(lpToken);
      this._callCombustionNeedAccount("getOfferingAmount", contractAddress, (err, result) => {
        if (err) {
          callback('Error', null);
          return;
        }
        let amount = this._getValueDivided(result, 10 ** decimals);
        callback(err, amount);
      });
    } catch (ex) {
      callback(ex)
    }
  }
  getCombustionRefundingAmount = async (contractAddress, lpToken, callback) => {
    try {
      let decimals = await this._getDecimals(lpToken);
      this._callCombustionNeedAccount("getRefundingAmount", contractAddress, (err, result) => {
        if (err) {
          callback('Error', null);
          return;
        }
        let amount = this._getValueDivided(result, 10 ** decimals);
        callback(err, amount);
      });
    } catch (ex) {
      callback(ex)
    }
  }
  _callCombustion = async (method, contractAddress, callback) => {
    if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionABI, contractAddress);
    try {
      let result = await erc20Contract.methods[method]().call({ from: contractAddress }); //abi地址
      callback(null, result)
    } catch (ex) {
      callback(ex)
    }
  }
  _callCombustionNeedAccount = async (method, contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionABI, contractAddress);
    try {
      let result = await erc20Contract.methods[method](account.address).call({ from: contractAddress }); //abi地址
      callback(null, result)
    } catch (ex) {
      callback(ex)
    }
  }
  //获取是否UserInfo
  getUserInfoCombustion = async (contractAddress, lpToken, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      lpToken == undefined || lpToken == null || lpToken == "" ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionABI, contractAddress);
    let claimContract = new web3.eth.Contract(config.BXHCombustionClaimABI,'0x3FabA5d9bDF195E44FaA7048000835FD16A81C7D');
    try {
      let decimals = await this._getDecimals(lpToken);
      let result = await erc20Contract.methods.userInfo(account.address).call({ from: account.address }); //abi地址
      let claimUserInfo = await claimContract.methods.userInfo(account.address).call({ from: account.address }); //abi地址
      let refundClaimed = claimUserInfo.refundClaimed;
      let resultDict = result;
      if (result) {
        const amount = this._getValueDivided(result.amount, 10 ** decimals);
        const amountDept = this._getValueDivided(result.amountDept, 10 ** decimals);
        const offeringTokenAmount = this._getValueDivided(result.offeringTokenAmount, 10 ** decimals);
        resultDict = { amount: amount, amountDept: amountDept, offeringTokenAmount: offeringTokenAmount, refundClaimed: refundClaimed };
      }
      callback(null, resultDict);
    } catch (ex) {
      callback(ex)
    }
  }
  //获取燃烧挖矿是否授权
  getCombustionAlloWance = async (contractAddress, lpToken, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      lpToken == undefined || lpToken == null || lpToken == "" ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpToken);
    try {
      let alloWance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** 18;
      callback(null, alloWance > 0);
    } catch (ex) {
      callback(ex)
    }
  }
  //获取lp余额
  getCombustionLpBalance = async (lpToken, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      lpToken == undefined || lpToken == null || lpToken == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpToken);
    try {
      let decimals = await this._getDecimals(lpToken);
      let balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address }); //abi地址
      balance = this._getValueDivided(balance, 10 ** decimals);
      callback(null, balance);
    } catch (ex) {
      callback(ex)
    }
  }
  //获取lpSymbol
  getCombustionLpTokenSymbol = async (lpToken, callback) => {
    if (lpToken == undefined || lpToken == null || lpToken == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpToken);
    try {
      let symbol = await erc20Contract.methods.symbol().call(); //abi地址
      callback(null, symbol);
    } catch (ex) {
      callback(ex)
    }
  }
  //授权抵押燃烧挖矿
  approveCombustion = (payload) => {
    const lpToken = payload.content.lpToken;
    const account = store.getStore('account')
    const contractAddress = payload.content.contractAddress;
    const amount = '100000000000000000000000000000000'//测试授权
    this._callGeneralApproval(account, amount, lpToken, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHCombustionApprove_RETURNED, res)
    })
  }
  _callGeneralApproval = async (account, amount, lpToken, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      lpToken == undefined || lpToken == null || lpToken == "" ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, lpToken)
  
    var amountToSend = this._getValueDecimals(amount, 18)
  
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //燃烧挖矿抵押
  combustionDeposit = async (payload) => {
    const account = store.getStore('account');
    const { contractAddress, lpToken, amount, msgContent } = payload.content;
    this._callCombustionDeposit('deposit', contractAddress, lpToken, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHCombustionDeposit_RETURNED, res)
    })
  }
  _callCombustionDeposit = async (method, contractAddress, lpToken, amount, callback) => {
    const account = store.getStore('account');
    if (lpToken == undefined || lpToken == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    let decimals = await this._getDecimals(lpToken);
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const amountToSend = this._getValueDecimals(amount, decimals);
    console.log(amountToSend, decimals);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionABI, contractAddress);
    erc20Contract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //燃烧挖矿领取
  combustionWithdraw = async (payload) => {
    const account = store.getStore('account');
    const { msgContent } = payload.content;
    this._callCombustionWithdraw('0x3FabA5d9bDF195E44FaA7048000835FD16A81C7D', (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHCombustionWithdraw_RETURNED, res)
    })
  }
  _callCombustionWithdraw = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionClaimABI, contractAddress);
    erc20Contract.methods.harvestAll().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //造星计划
  //获取造星计划是否授权
  getStarPlanAlloWance = async (contractAddress, lpToken, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      lpToken == undefined || lpToken == null || lpToken == "" ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lpToken);
    try {
      let alloWance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** 18;
      callback(null, alloWance > 0);
    } catch (ex) {
      callback(ex)
    }
  }
  //授权造星计划
  approveStarPlan = (payload) => {
    const lpToken = payload.content.lpToken;
    const account = store.getStore('account')
    const contractAddress = payload.content.contractAddress;
    const amount = '10000000000'//测试授权
    this._callGeneralApproval(account, amount, lpToken, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, payload.content.msgContent);
      return emitter.emit(BXHStarPlanApprove_RETURNED, res)
    })
  }
  //造星计划Vote
  starPlanVote = async (payload) => {
    const account = store.getStore('account');
    const { contractAddress, lpToken, amount, msgContent } = payload.content;
    this._callStarPlanVote('deposit', contractAddress, lpToken, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHStarPlanVote_RETURNED, res)
    })
  }
  _callStarPlanVote = async (method, contractAddress, lpToken, amount, callback) => {
    const account = store.getStore('account');
    if (lpToken == undefined || lpToken == null ||
      account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    let decimals = await this._getDecimals(lpToken);
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const amountToSend = this._getValueDecimals(amount, decimals);
    console.log(amountToSend, decimals);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionABI, contractAddress);
    erc20Contract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  starPlanWithdraw = async (payload) => {
    const account = store.getStore('account');
    const { msgContent } = payload.content;
    this._callStarPlanWithdraw('0x3FabA5d9bDF195E44FaA7048000835FD16A81C7D', (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHStarPlanWithdraw_RETURNED, res)
    })
  }
  _callStarPlanWithdraw = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.BXHCombustionClaimABI, contractAddress);
    erc20Contract.methods.harvestAll().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //中心化接口获取造星计划
  getBXHStar = async (callback) => {
    const account = store.getStore('account');
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-star',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", 256);
        return oMyForm;
      }],
    }).then(function (data) {
      let testData = [{
        "id": 1,
        "step": 1,  //第几期
        "star_count": 1,  //项目数量
        "bxh_amount": "0.00000000", 
        "apply_start": 1618884160, //申请开始时间
        "apply_end": 1618992160,//申请结束时间
        "vote_start": 1618992160,//投票开始时间
        "vote_end": 1619078560,//投票结束时间
        "step_status": 3,// 0表示未启动，1表示招募中，2表示投票中，3表示投票结束
        "chain_id": 128 ,
        "contract_address": "0x1bCb6DF7Cdd74E391d809C167a8E262709614985"  //本期投票合约地址
      },
      {
        "id": 2,
        "step": 2,  //第几期
        "star_count": 2,  //项目数量
        "bxh_amount": "0.00000000", 
        "apply_start": 1618884160, //申请开始时间
        "apply_end": 1618992160,//申请结束时间
        "vote_start": 1618992160,//投票开始时间
        "vote_end": 1619078560,//投票结束时间
        "step_status": 2,// 0表示未启动，1表示招募中，2表示投票中，3表示投票结束
        "chain_id": 128 ,
        "contract_address": "0x1bCb6DF7Cdd74E391d809C167a8E262709614985"  //本期投票合约地址
      },
      ]
      callback({bxh_stat:testData});
      // callback(data.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }
  //查询借贷收益
  getLoanUserReward = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(ComptrollerABI, contractAddress);
    try {
      let comp = await erc20Contract.methods.getUnclaimedComp(account.address).call({ from: account.address }); //abi地址
      comp = this._getValueDivided(comp, 10 ** 18);
      callback(null, comp);
    } catch (ex) {
      callback(ex)
    }
  }
  getLoanCompSpeeds = async (contractAddress, cToken, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      isEmpty(contractAddress) || isEmpty(cToken)) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const erc20Contract = new web3.eth.Contract(ComptrollerABI, contractAddress);
    try {
      let comp = await erc20Contract.methods.compSpeeds(cToken).call({ }); //abi地址
      comp = this._getValueDivided(comp, 10 ** 18);
      callback(null, comp);
    } catch (ex) {
      callback(ex)
    }
  }
  //领取
  loanClaimUserReward = async ({contractAddress,msgContent}) => {
    const account = store.getStore('account');
    this._callLoanClaimUserReward(contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanClaim_RETURN, res)
    })
  }
  _callLoanClaimUserReward = async (contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(ComptrollerABI, contractAddress);
    erc20Contract.methods.claimComp(account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  _getLoanTokenInfo = async (token, contractAddress, priceOracle, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null ||
      priceOracle == undefined || priceOracle == null || priceOracle == "" ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = null
    if(token && token !== "") {
      erc20Contract = new web3.eth.Contract(CTokenABI, token);
    }
    const priceContract = new web3.eth.Contract(PriceOracleABI, priceOracle)
    try {
      let price = await priceContract.methods.getUnderlyingPrice(contractAddress).call({ from: account.address });//价格
      price = this._getValueDivided(price, 10 ** 8, 18);
      let balance = 0;
      let allowance = 0;
      let decimals = 18;
      if(erc20Contract){
        decimals = await this._getDecimals(token);
        balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address }); //abi地址
        allowance = await erc20Contract.methods.allowance(account.address,contractAddress).call({ from: account.address });//是否授权
      }else{
        balance = await new web3.eth.getBalance(account.address)
        allowance = '100000000000000000000000000000000'
      }
      balance = this._getValueDivided(balance, 10 ** decimals);
      const amount = this._getValueMultiplied(balance,price);
      const balanceStored = await this.loanBalanceStoredToken(web3, account, token, contractAddress, callback);//查询用户未还款的金额，包含利息的
      callback(null,{balance,price,amount,allowance,balanceStored});
    } catch (ex) {
      console.log(ex);
    }
  }
  //查询用户未还款的金额，包含利息的
  loanBalanceStoredToken = async (web3, account, token, contractAddress, callback) => {
    // console.log(token)
    // console.log(contractAddress)
    if(token&&token!==''){
      let erc20Contract = new web3.eth.Contract(CTokenABI, contractAddress);
      try {
        let balanceStored = await erc20Contract.methods.borrowBalanceStored(account.address).call({ from: account.address }); 
        let _Decimals = await this._getDecimals(token)
        balanceStored = this._getValueDivided1(balanceStored, 10 ** _Decimals)
        return balanceStored
      } catch (ex) {
        return callback(ex)
      }
    }else{
      let erc20Contract = new web3.eth.Contract(CEtherABI, contractAddress);
      try {
        let balanceStored = await erc20Contract.methods.borrowBalanceStored(account.address).call({ from: account.address }); 
        balanceStored = parseFloat(balanceStored) / 10 ** 18
        return balanceStored
      } catch (ex) {
        return callback(ex)
      }
    }
  }
  loanDepositToken = ({contractAddress,token,msgContent,amount}) => {
    const account = store.getStore('account')
    this._callLoanDepositBorrowToken(account, 'mint', amount, token, contractAddress, (err, res) => {
      console.log('====',err)
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  loanBorrowToken = ({contractAddress,token,msgContent,amount}) => {
    const account = store.getStore('account')
    this._callLoanDepositBorrowToken(account, 'borrow', amount, token, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanDepositBorrowToken = async (account, method, amount, token, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    if(isNoEmpty(token)||method!='mint'){
      const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
      let amountToSend = 0;
      if(isNoEmpty(token)){
        const decimals = await this._getDecimals(token);
        amountToSend =this._getValueDecimals(amount, decimals)
      }else{
        amountToSend = web3.utils.toWei(saveToWei(amount,18).toString(), 'ether')
      }
      yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }else{
      const yCurveFiContract = new web3.eth.Contract(CEtherABI, contractAddress)
      const amountToSend = web3.utils.toWei(saveToWei(amount,18).toString(), 'ether')
      yCurveFiContract.methods[method]().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: amountToSend })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }
  }
  loanApproveToken = ({token,contractAddress,msgContent}) => {
    const account = store.getStore('account')
    const amount = '100000000000000000000000000000000'//测试授权
    this._callLoanApprovalToken(account, amount, token, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanApprovalToken = async (account, amount, symbolAddress, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, symbolAddress)
    const decimals = await this._getDecimals(symbolAddress);
    var amountToSend = this._getValueDecimals(amount, decimals)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = this._getValueDecimals(amount, asset.decimals);
    // }
  
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  //查询指定某一期的所有造星项目列表
  getBXHStarProjects = async (step,callback) => {
    //step指定期数
    const account = store.getStore('account');
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-star-projects',
      method: 'post',
      data: { step: step, offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", 256);
        return oMyForm;
      }],
    }).then(function (data) {
      callback(data.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }
  //中心化接口获取BXHIfm
  getBXHIfm = async (callback) => {
    const account = store.getStore('account');
    const { ethereum } = window;
    let chainId
    if(ethereum){
      chainId = await ethereum.networkVersion;
      if(chainId){
        chainId = await ethereum.networkVersion;
      }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
      }
    }else{
      chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-ifm',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    }).then(function (data) {
      callback(data.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  //中心化接口获取BXH信息
  _getBXHInfo = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    let that = this
    const account = store.getStore('account')
    axios({
      // url: 'https://test-app.bxh.com/api/m1/main/bxh-info',  // 测试站接口
      // 'https://api.bxh.xyz/api/m1/main/bxh-info',
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const tokenList = JSON.parse(localStorage.getItem('tokenList'))
        let sourceData = that.fengzhuangData(data, tokenList)
        let tempData = [{
          tokens: [{
            symbolTokens: sourceData
          }]
        }]
        store.setStore({
          PoolList: tempData,
          TokenList_Local: tokenList,
        })
        data = data.data
        let current_array = []
        current_array.push(...data.data.bxh_ex_pool_1)
        current_array.push(...data.data.bxh_ex_pool_2)
        current_array.push(...data.data.bxh_ex_pool_3)
 
        store.setStore({tokenList_centerData:current_array})
 
        const bxh_info = data.data.bxh_info;
        const bxh_rebuy = data.data.bxh_rebuy;//回购记录
        const airdrop = data.data.airdrop;
        const team_lock = data.data.team_lock;
        const bxh_ex_pool_type_3 = data.data.bxh_ex_pool_type_3;
        const bxh_ex_pool_4 = data.data.bxh_ex_pool_4;
        cookie.save("bxhaddress", data.data.bxh_info.bxh_token)
        callback({ bxh_info: bxh_info, bxh_rebuy: bxh_rebuy, airdrop: airdrop, team_lock: team_lock, token_list: tokenList, bxh_ex_pool_type_3: bxh_ex_pool_type_3, bxh_ex_pool_4: bxh_ex_pool_4 });
        emitter.emit(STAKEBXH_CHAINID_RETURNED)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getIndexBXHInfo = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let that = this
    const account = store.getStore('account')
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const tokenList = JSON.parse(localStorage.getItem('tokenList'))
        let sourceData = that.fengzhuangData(data, tokenList)
        data = data.data.data
        // 存Storage数组
        let storageArray = {
          data: data,
          sourceData: sourceData,
        }
        localStorage.setItem("IndexBXHInfo", JSON.stringify(storageArray));
        callback({ data, sourceData });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getBXHDaoPool = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    const account = store.getStore('account')
    axios({
      url: 'https://api.bxh.com/bxh/api/bxhinfo/dao/pool',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const bxh_dao_pool = data.data.data.bxh_dao_pool;
        callback({ bxh_dao_pool: bxh_dao_pool });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getTokensList = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    const account = store.getStore('account')
    axios({
      url: 'https://api.bxh.com/bxh/api/bxhinfo/tokens',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const token_list = data.data.data.token_list;
        localStorage.setItem("tokenList", JSON.stringify(token_list));
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // 新增拆分接口 start
  _getMenuHeader = async () => {
    let storageLang = localStorage.getItem('i18nextLng')
    let lang = 'zh_CN'
    if(storageLang){
      if(storageLang === 'zh' || storageLang === 'zh-CN' || storageLang === 'zh-HK'){
        lang = 'zh_CN'
      }else{
        lang = 'en_US'
      }
    }

    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/bxh/api/main/menu/list',
      method: 'post',
      data: {
        "chainId": chainId
      },
      headers: {'lang': lang},
    }).then(function (data) {
        localStorage.setItem("menuList", JSON.stringify(data.data.body.data));
        emitter.emit(BXHMENUHEADER_RETURN, data.data.body.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getBannerIndex = async () => {
    let storageLang = localStorage.getItem('i18nextLng')
    let lang = 'zh_CN'
    if(storageLang){
      if(storageLang === 'zh' || storageLang === 'zh-CN'){
        lang = 'zh_CN'
      }else{
        lang = 'en_US'
      }
    }

    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/bxh/api/main/banner/list',
      method: 'post',
      data: {
        "chainId": chainId
      },
      headers: {'lang': lang},
    }).then(function (data) {
        localStorage.setItem("bxhBanner", JSON.stringify(data.data.body.bxh_ifo_banner));
        emitter.emit(BXHINDEXBANNER_RETURN, data.data.body.bxh_ifo_banner)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getIndexBXHNotice = async () => {
    let storageLang = localStorage.getItem('i18nextLng')
    let lang = 'zh_CN'
    if(storageLang){
      if(storageLang === 'zh' || storageLang === 'zh-CN' || storageLang === 'zh-HK'){
        lang = 'zh_CN'
      }else{
        lang = 'en_US'
      }
    }

    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/bxh/api/main/notice/list',
      method: 'post',
      data: {
        "chainId": chainId,
        "pageIndex": 1,
        "pageSize": 5,
      },
      headers: {'lang': lang},
    }).then(function (data) {
        localStorage.setItem("bxhNotice", JSON.stringify(data.data.body));
        emitter.emit(BXHINDEXNOTICE_RETURN, data.data.body)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getIndexBXHTvlList = async (language, callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/bxh/api/main/tvl/list',
      method: 'post',
      data: {
        "chainId": chainId
      },
      headers: {'lang': language},
    }).then(function (data) {
        callback({ data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _getIndexBXHBridgeTotal = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/bxh/api/main/bridge/total',
      method: 'post',
      data: {
        "chainId": chainId
      },
    }).then(function (data) {
        callback({ data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 查询矿池列表收益
  _getBXHShouYi = async (tokenPair, callback)=>{
    // console.log('tokenPair=====>', tokenPair)
    const account = store.getStore('account')
    if (isEmpty(account.address)) {
      callback('error');
      return;
    }
    if (!tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" || tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000") {
      return callback(null, "")
    }

    const web3 = new Web3(store.getStore('web3context').library.provider);
    let id
    if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
      id = tokenPair.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, tokenPair.pool_address)
    }
    let isDAOOperation = this.checkCurrentIsDaoOperation(tokenPair.id_centerdata)
    let HepoolContract = new web3.eth.Contract(isDAOOperation ? config.BXHDaoABI : config.BXHHepoolRewardsABI, isDAOOperation ? tokenPair.dao_address : tokenPair.pool_address)
    try {
      var shouyi = await HepoolContract.methods.pending(id, account.address).call({ from: account.address });
      if (isDAOOperation) {
        shouyi = await this._getToolNumber(parseFloat(shouyi) / 10 ** 18)
      }else{
        shouyi = await this._getToolNumber(parseFloat(shouyi[0]) / 10 ** 18)
      }
       
      // console.log("shouyi---->>>>>>",shouyi)
      callback(null, shouyi)
    } catch (ex) {
      return callback(ex)
    }
  }
  // 新增拆分接口 end


  // 质押挖矿中心化接口
  _getBXHPool = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    axios({
      url: 'https://api.bxh.com/bxh/api/bxhinfo/chain/pool',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        callback(data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  _getBXHAirDropSuccess = async (callback) => {
    const account = store.getStore('account')
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/api/m1/main/submit-bxh-airdrop',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        // console.log("记录成功-----------------", data);
        callback(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  _getMinePoolBXHList = async (web3, asset, account, callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let that = this
    axios({
      // url: '/api/m1/main/bxh-info',
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const tokenList = JSON.parse(localStorage.getItem('tokenList'))
        let sourceData = that.fengzhuangData(data, tokenList)
        let tempData = [{
          tokens: [{
            symbolTokens: sourceData
          }]
        }]
        store.setStore({ PoolList: tempData })
        callback(null, sourceData)
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }
  //封装中心化列表
  fengzhuangData = (data, tokenList) => {
    let that = this
    data = data.data
    let lpTokenSymbolPair = {}
    let pool_1 = []
    let pool_2 = []
    let pool_3 = []
    let bxh_info = data.data.bxh_info
    let bxh_info_usdt = data.data.bxh_info_usdt
    let token_list = tokenList
  
    let pool_4_data = []
    let pool_4 = []
    let pool_5 = []
    let pool_6 = []
    let pool_7 = []  //增加主區(V2)
    let bxh_new_staking_pool = []
  
    data.data.bxh_ex_pool_1.map((item) => {
      if (item.pair_token_type === 1) {
        pool_4_data.push(item)
      } else {
        var tokenImgList = this.getShowImgByPairSymbol(item.pair_show)
        // console.log("efsdfgdfghfhhj---->>>>>",tokenImgList)
        var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
        var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
        if (item.pair_show == "HT/HUSD") {
          console.log("tokenItem1---->>>>>",tokenItem1)
        }
         
        var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
        if (tokenItem0 && tokenItem1) {
          pool_1.push({
            symbol0: item.token_0,//token0 name
            symbol1: item.token_1,//token1 name
            symbol0Address: tokenItem0.token_address, //token0 address
            symbol1Address: tokenItem1.token_address,//token1 address
            id: item.ex_id, //pid
            id_centerdata:item.id,
            is_hot: item.is_hot,
            ex_id: item.ex_id,
            symbol0ImgURl: tokenItem0.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
            symbol1imgURl: tokenItem1.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
            symbolPair: item.pair_show,//合并的名字
            decimals0: tokenItem0.token_decimal, //token0 精度
            decimals1: tokenItem1.token_decimal, //token1 精度
            symbol0Amount: 0,
            symbol1Amount: 0,
            balance0: 0,
            balance1: 0,
            lptokenAddress: item.pair_token, //lp address
            pool_address: bxh_info.pool_address,//0xFB03e11D93632D97a8981158A632Dd5986F5E909  //abi 地址
            router_address: bxh_info.router_address,
            factory_address: bxh_info.factory_address,
            dao_address:bxh_info.dao_address,
            // pool_address:"0xFB03e11D93632D97a8981158A632Dd5986F5E909",
            // router_address:"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
            // factory_address:"0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
            totalapy: total,
            miningapy: item.apy_pool,
            fees: item.apy_ex,
            bxh_day: item.bxh_day,
            bxh_month: item.bxh_month,
            is_open: item.is_open,
            tvl_total: item.tvl_pool,
            apy_pool: item.apy_pool,
            apy_ex: item.apy_ex,
            symbolPair_Show: item.pair_show,
            symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
            symbol1Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[1] : "",
            pair_token_type:item.pair_token_type,
            pool_type:item.pool_type,
            style_type:item.style_type,
          })
        }
      }
    })
  
    data.data.bxh_ex_pool_2.map((item) => {
      if (item.pair_token_type === 1) {
        pool_4_data.push(item)
      } else {
        var tokenImgList = this.getShowImgByPairSymbol(item.pair_show)
        var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
        var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
        var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
        if (tokenItem0 && tokenItem1) {
          pool_2.push({
            symbol0: item.token_0,//token0 name
            symbol1: item.token_1,//token1 name
            symbol0Address: tokenItem0.token_address, //token0 address
            symbol1Address: tokenItem1.token_address,//token1 address
            id: item.ex_id, //pid
            id_centerdata:item.id,
            is_hot: item.is_hot,
            ex_id: item.ex_id,
            symbol0ImgURl: tokenItem0.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
            symbol1imgURl: tokenItem1.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
            symbolPair: item.pair_show,//合并的名字
            decimals0: tokenItem0.token_decimal, //token0 精度
            decimals1: tokenItem1.token_decimal, //token1 精度
            symbol0Amount: 0,
            symbol1Amount: 0,
            balance0: 0,
            balance1: 0,
            lptokenAddress: item.pair_token, //lp address
            pool_address: bxh_info.pool_address,//0xFB03e11D93632D97a8981158A632Dd5986F5E909  //abi 地址
            router_address: bxh_info.router_address,
            factory_address: bxh_info.factory_address,
            dao_address:bxh_info.dao_address,
            // pool_address:"0xFB03e11D93632D97a8981158A632Dd5986F5E909",
            // router_address:"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
            // factory_address:"0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
            totalapy: total,
            miningapy: item.apy_pool,
            fees: item.apy_ex,
            bxh_day: item.bxh_day,
            bxh_month: item.bxh_month,
            is_open: item.is_open,
            tvl_total: item.tvl_pool,
            apy_pool: item.apy_pool,
            apy_ex: item.apy_ex,
            symbolPair_Show: item.pair_show,
            symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
            symbol1Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[1] : "",
            pair_token_type:item.pair_token_type,
            pool_type:item.pool_type,
            style_type:item.style_type,
          })
        }
      }
    })

    //增加主區(V2)
    data.data.bxh_ex_pool_5&&data.data.bxh_ex_pool_5.map((item) => {
      if (item.pair_token_type === 1) {
        pool_4_data.push(item)
      } else {
        var tokenImgList = this.getShowImgByPairSymbol(item.pair_show)
        var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
        var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
        var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
        if (tokenItem0 && tokenItem1) {
          pool_7.push({
            symbol0: item.token_0,//token0 name
            symbol1: item.token_1,//token1 name
            symbol0Address: tokenItem0.token_address, //token0 address
            symbol1Address: tokenItem1.token_address,//token1 address
            id: item.ex_id, //pid
            id_centerdata:item.id,
            is_hot: item.is_hot,
            ex_id: item.ex_id,
            symbol0ImgURl: tokenItem0.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
            symbol1imgURl: tokenItem1.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
            symbolPair: item.pair_show,//合并的名字
            decimals0: tokenItem0.token_decimal, //token0 精度
            decimals1: tokenItem1.token_decimal, //token1 精度
            symbol0Amount: 0,
            symbol1Amount: 0,
            balance0: 0,
            balance1: 0,
            lptokenAddress: item.pair_token, //lp address
            pool_address: bxh_info_usdt.pool_address,
            router_address: bxh_info_usdt.router_address,
            factory_address: bxh_info_usdt.factory_address,
            dao_address:bxh_info_usdt.dao_address,
            totalapy: total,
            miningapy: item.apy_pool,
            fees: item.apy_ex,
            bxh_day: item.bxh_day,
            bxh_month: item.bxh_month,
            is_open: item.is_open,
            tvl_total: item.tvl_pool,
            apy_pool: item.apy_pool,
            apy_ex: item.apy_ex,
            symbolPair_Show: item.pair_show,
            symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
            symbol1Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[1] : "",
            pair_token_type:item.pair_token_type,
            pool_type:item.pool_type,
            style_type:item.style_type,
          })
        }
      }
    })
  
    data.data.bxh_ex_pool_3.map((item) => {
      if (item.pair_token_type === 1) {
        pool_4_data.push(item)
      } else {
        var tokenImgList = this.getShowImgByPairSymbol(item.pair_show)
        var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
        var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
        // console.log("tokenItem0 ---->>>>> ",tokenItem0)
        // console.log("tokenItem1 ------->>>>",tokenItem1)
        var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
  
        if (tokenItem0 && tokenItem1) {
          pool_3.push({
            symbol0: item.token_0,//token0 name
            symbol1: item.token_1,//token1 name
            symbol0Address: tokenItem0.token_address, //token0 address
            symbol1Address: tokenItem1.token_address,//token1 address
            id: item.ex_id, //pid
            is_hot: item.is_hot,
            ex_id: item.ex_id,
            id_centerdata:item.id,
            symbol0ImgURl: tokenItem0.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
            symbol1imgURl: tokenItem1.symbol != "WHT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
            symbolPair: item.pair_show,//合并的名字
            decimals0: tokenItem0.token_decimal, //token0 精度
            decimals1: tokenItem1.token_decimal, //token1 精度
            symbol0Amount: 0,
            symbol1Amount: 0,
            balance0: 0,
            balance1: 0,
            lptokenAddress: item.pair_token, //lp address
            pool_address: bxh_info.pool_address,//0xFB03e11D93632D97a8981158A632Dd5986F5E909  //abi 地址
            router_address: bxh_info.router_address,
            factory_address: bxh_info.factory_address,
            dao_address:bxh_info.dao_address,
            // pool_address:"0xFB03e11D93632D97a8981158A632Dd5986F5E909",
            // router_address:"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
            // factory_address:"0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
            totalapy: total,
            miningapy: item.apy_pool,
            fees: item.apy_ex,
            bxh_day: item.bxh_day,
            bxh_month: item.bxh_month,
            is_open: item.is_open,
            tvl_total: item.tvl_pool,
            apy_pool: item.apy_pool,
            apy_ex: item.apy_ex,
            symbolPair_Show: item.pair_show,
            symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
            symbol1Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[1] : "",
            pair_token_type:item.pair_token_type,
            pool_type:item.pool_type,
            style_type:item.style_type,
          })
        }
      }
    })
  
    pool_4_data.map((item) => {
      // var tokenImgList = this.getShowImgByPairSymbol(item.pair_show)
      var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
      var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
      var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
      if (tokenItem0 && tokenItem1) {
        pool_4.push({
          symbol0: item.token_0,//token0 name
          symbol1: item.token_1,//token1 name
          symbol0Address: tokenItem0.token_address, //token0 address
          symbol1Address: tokenItem1.token_address,//token1 address
          id: item.ex_id, //pid
          id_centerdata:item.id,
          symbol0ImgURl: tokenItem0.symbol != "WHT" || tokenItem0.symbol != "HT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
          symbol1imgURl: tokenItem1.symbol != "WHT" || tokenItem1.symbol != "HT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
          symbolPair: item.pair_show,//合并的名字
          decimals0: tokenItem0.token_decimal, //token0 精度
          decimals1: tokenItem1.token_decimal, //token1 精度
          symbol0Amount: 0,
          symbol1Amount: 0,
          balance0: 0,
          balance1: 0,
          lptokenAddress: item.pair_token, //lp address
          pool_address: bxh_info.pool_address,//0xFB03e11D93632D97a8981158A632Dd5986F5E909  //abi 地址
          router_address: bxh_info.router_address,
          factory_address: bxh_info.factory_address,
          dao_address:bxh_info.dao_address,
          // pool_address:"0xFB03e11D93632D97a8981158A632Dd5986F5E909",
          // router_address:"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300",
          // factory_address:"0xb0b670fc1F7724119963018DB0BfA86aDb22d941",
          totalapy: total,
          miningapy: item.apy_pool,
          fees: item.apy_ex,
          bxh_day: item.bxh_day,
          bxh_month: item.bxh_month,
          is_open: item.is_open,
          tvl_total: item.tvl_pool,
          apy_pool: item.apy_pool,
          apy_ex: item.apy_ex,
          // symbolPair_Show:item.pair_show,
          symbol0Img_Show: tokenItem0.symbol != "WHT" || tokenItem0.symbol != "HT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
          symbol1Img_Show: tokenItem1.symbol != "WHT" || tokenItem1.symbol != "HT" ? "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
          pair_token_type:item.pair_token_type,
          pool_type:item.pool_type,
          style_type:item.style_type,
        })
      }
    })
    // console.log("pool_4------>>>>>>",pool_4)

    // 单币 (新 - pool_type === 3) timo
    data.data.bxh_ex_pool_type_3.map((item) => {
      if(item.pool_type === 3){   //单币 
        var tokenImgList = this.getShowImgByPairSymbol(item.token_0)
        var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
        // var tokenItem1 = that.checkTokenListForName(item.token_1 == 'HT' ? 'WHT' : item.token_1, token_list)
        // console.log("tokenItem1 ------->>>>",tokenItem1)
        var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)

        pool_5.push({
          symbol0: item.token_0,//token0 name
          symbol1: item.token_1,//token1 name
          symbol0Address: tokenItem0.token_address, //token0 address
          id: item.ex_id, //pid
          is_hot: item.is_hot,
          ex_id: item.ex_id,
          id_centerdata:item.id,
          // symbol0ImgURl: tokenItem0.symbol != "WHT" ? "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/" + tokenItem0.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token0 img
          // symbol1imgURl: tokenItem1.symbol != "WHT" ? "https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/" + tokenItem1.symbol + ".png" : "https://s2.coinmarketcap.com/static/img/coins/64x64/2502.png",//token1 img
          symbolPair: item.token_0,//token_0的名字
          decimals0: tokenItem0.token_decimal, //token0 精度
          symbol0Amount: 0,
          symbol1Amount: 0,
          balance0: 0,
          balance1: 0,
          lptokenAddress: item.pair_token, //lp address
          pool_address: bxh_info.pool_address, //abi 地址
          // router_address: bxh_info.router_address,
          // factory_address: bxh_info.factory_address,
          // dao_address:bxh_info.dao_address,
          totalapy: total,
          miningapy: item.apy_pool,
          fees: item.apy_ex,
          bxh_day: item.bxh_day,
          bxh_month: item.bxh_month,
          is_open: item.is_open,
          tvl_total: item.tvl_pool,
          apy_pool: item.apy_pool,
          apy_ex: item.apy_ex,
          symbolPair_Show: item.pair_show,
          symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
          pair_token_type:item.pair_token_type,
          pool_type:item.pool_type,
          style_type:item.style_type,
        })
      } 
    })

    data.data.bxh_new_staking_pool.map((item) => {
      var tokenItem0 = {}
      var tokenItem1 = {}
      var tokenItemReward = {}
      for (let i = 0; i < token_list.length; i++) {
        if (item.preToken && token_list[i].token_address.toUpperCase() === item.preToken.toUpperCase()) { // 存入
          tokenItem0 = token_list[i]
        }
        if (token_list[i].token_address.toUpperCase() === item.lpToken.toUpperCase()) { // 质押
          tokenItem1 = token_list[i]
        }
        if (token_list[i].token_address.toUpperCase() === item.rewardToken.toUpperCase()) { // 收益
          tokenItemReward = token_list[i]
        }
      }
      bxh_new_staking_pool.push({
        pool_type: 4,
        is_bxh_new_staking_pool: true,
        symbol0: tokenItem0 && tokenItem0.symbol ? tokenItem0.symbol : '',//token1 name
        symbol1: tokenItem1.symbol,//token1 name
        symbol0Address: tokenItem0 && tokenItem0.token_address ? tokenItem0.token_address : '',
        symbolPair_Show: item.preToken,
        symbolReward: tokenItemReward.symbol,//token1 name
        pool_address: item.poolAddress, //abi 地址
        lptokenAddress: item.lpToken, //lp address
        balance1: 0,
        decimals0: tokenItem1 ? tokenItem1.token_decimal : 18, //token 精度
        symbol0Img_Show: 
                  tokenItem0 && tokenItem0.symbol ? 
                  "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : 
                  "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png",
        id: item.indexNum,
        ex_id: item.id,

        allocPoint: item.allocPoint,
        apyPool: item.apyPool,
        bonusToken: item.bonusToken,
        chainId: item.chainId,
        depositMax: item.depositMax,
        depositMin: item.depositMin,
        enableBonus: item.enableBonus,
        icon: item.icon,
        indexNum: item.indexNum,
        lockSeconds: item.lockSeconds,
        lpToken: item.lpToken,
        outputDay: item.outputDay,
        poolAddress: item.poolAddress,
        rewardToken: item.rewardToken,
        stakingId: item.stakingId,
        swapPairAddress: item.swapPairAddress,
        totalAmount: item.totalAmount,
        tvlPool: item.tvlPool,
      })
    })

    if (data.data.bxh_new_staking_pool && data.data.bxh_new_staking_pool[0] && data.data.bxh_new_staking_pool[0].poolAddress) {
      store.setStore({ pool_address_regular: data.data.bxh_new_staking_pool[0].poolAddress })
    }

    // 质押池 - timo
    data.data.bxh_ex_pool_4.map((item) => {
      var tokenImgList = this.getShowImgByPairSymbol(item.token_0)
      var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
      var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)

      pool_6.push({
        symbol0: item.token_0,//token0 name
        symbol1: item.token_1,//token1 name
        symbol0Address: tokenItem0.token_address, //token0 address
        id: item.ex_id, //pid
        is_hot: item.is_hot,
        ex_id: item.ex_id,
        id_centerdata:item.id,
        symbolPair: item.token_0,//token_0的名字
        decimals0: tokenItem0.token_decimal, //token0 精度
        symbol0Amount: 0,
        symbol1Amount: 0,
        balance0: 0,
        balance1: 0,
        lptokenAddress: item.pair_token, //lp address
        pool_address: bxh_info.pool_address, //abi 地址
        totalapy: total,
        miningapy: item.apy_pool,
        fees: item.apy_ex,
        bxh_day: item.bxh_day,
        bxh_month: item.bxh_month,
        is_open: item.is_open,
        tvl_total: item.tvl_pool,
        apy_pool: item.apy_pool,
        apy_ex: item.apy_ex,
        symbolPair_Show: item.pair_show,
        symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
        pair_token_type:item.pair_token_type,
        pool_type:item.pool_type,
        style_type:item.style_type,
      })
    })
  
    lpTokenSymbolPair = {
      bxh_info: data.data.bxh_info,
      pool_1: pool_1,
      pool_2: pool_2,
      pool_3: pool_3,
      pool_4: pool_4,
      pool_5: pool_5, // 单币，pool_type = 3
      pool_6: pool_6, // 质押池
      pool_7: pool_7, // 主區(V2)
      bxh_new_staking_pool: bxh_new_staking_pool
    }
  
    return lpTokenSymbolPair
  }
  
  getShowImgByPairSymbol = (symbolPair) => {
    let imgList = []
    symbolPair.split("/").map((item) => {
      // imgList.push("https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/" + item + ".png")
      imgList.push("https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + item + ".png")
    })
    // console.log("imgList------>>>>>>",imgList)
    return imgList
  }
  
  checkTokenListForName = (name, token_list) => {
    // console.log("config.BXHTokensList--->>>>>",token_list)
    // console.log(name)
    for (let i = 0; i < token_list.length; i++) {
      var item = token_list[i];
      if (item.symbol === name) {
        return item
      }
    }
  }
  
  singleTokenInfo = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair || !tokenPair.symbol0Address) {
      return;
    }
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset,id,id_centerdata } = payload.content
 
    const web3 = new Web3(store.getStore('web3context').library.provider);
 
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getHTERC20SingleBalance(tokenPair.symbol0, tokenPair.symbol0Address, tokenPair.decimals0, callbackInnerInner) }, //查询token0余额
          (callbackInnerInner) => { this._getHTERC20SingleBalance(tokenPair.symbol1, tokenPair.symbol1Address, tokenPair.decimals1, callbackInnerInner) }, //查询token1余额
          (callbackInnerInner) => { this._getAlloWance(web3, asset, account, callbackInnerInner) },  // 查询领取收益和抵押授权
          (callbackInnerInner) => { this._getAllBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
          (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          // console.log("获取到的data----->>>>>>",data)
          token.symbol0balance = data[0].balance     // 查询授权
          token.symbol1balance = data[1].balance     // 钱包当前代币余额
          token.alloWance = data[2]         // 授权
          token.userInfo = data[3]           //用户数据 
          token.shouyi = data[4]             //收益
          token.oldBalance = data[0].oldBalance    //去精度之前的数据
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXHSINGLETOKENINFO_RETURNED, poolData)
    })
  }
  // 新加的
  getTokenAmount = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
    // console.log("tokenPair--->>>>>>",tokenPair)
    if (!tokenPair || !tokenPair.symbol0Address) {
      return;
    }

    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset } = payload.content
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.symbol0Address, tokenPair.decimals0, callbackInnerInner) }, //查询token0余额
          (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol1, tokenPair.symbol1Address, tokenPair.decimals1, callbackInnerInner) }, //查询token1余额
          (callbackInnerInner) => { this._getAlloWance(web3, asset, account, callbackInnerInner) },  // 查询领取收益和抵押授权 
          (callbackInnerInner) => { this._getStakeBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
          (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
          (callbackInnerInner) => { this._getTotalBXHSupply(web3, asset, account, callbackInnerInner) },  //池子总量
          (callbackInnerInner) => { this._getRemoveLiquidityAllowance(web3, asset, account, callbackInnerInner) },  // 查询移除流动性授权
          (callbackInnerInner) => { this._getPoolFeeCount(web3, asset, account, callbackInnerInner) },
          (callbackInnerInner) => { this._getBXHReserveAndQuote(asset, tokenPair, "1", callbackInnerInner) },
          (callbackInnerInner) => { this._getMinePoolBXHList(web3, token, account, callbackInnerInner) },
          // (callbackInnerInner) => { this._getMineBXHLPAmount(web3, asset, account, callbackInnerInner) },  //我的lp数量
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          // console.log("获取到的data----->>>>>>",data)
          token.symbol0balance = data[0]     // 查询授权
          token.symbol1balance = data[1]     // 钱包当前代币余额
          token.alloWance = data[2]         // 授权
          token.userInfo = data[3]           //用户数据 
          token.shouyi = data[4]             //收益
          token.poolTotal = data[5].poolTotal         //池子总量
          token.mineLpAmount = data[5].balance       //我的数量
          token.oldBalance = data[5].oldBalance    //去精度之前的数据
          token.zanbi = data[5].zanbi       //我的数量
          token.removeLiquidAllowance = data[6] //移除流动性的授权
          token.fee0 = data[7].fee0
          token.fee1 = data[7].fee1
  
          token.tokenA = data[8].tokenA
          token.tokenB = data[8].tokenB
          token.reserveA = data[8].reserveA
          token.reserveB = data[8].reserveB
          token.bili = _getValueDivided1(data[8].count, 10 ** 18)//parseFloat(data[0].count) / 10 ** 18
          token.bili_decimal = data[8].count_decimal
          token.symbolTokens = data[9]
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(GET_TOKENBALANCEANOUNT_RETURNED, poolData)
    })
  }
  
  checkAirDrop = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    const { airDropcontractAddress } = payload.content
    const account = store.getStore('account')
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getCheckAirDropProgress(airDropcontractAddress, callbackInnerInner) }, //查询是否领过去空投
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.amount = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      // store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXHYIELDGETAIRDROP_RETURNED, poolData)
    })
  }
  _getCheckAirDropProgress = async (airDropcontractAddress, callback) => {
  
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    let erc20Contract = new web3.eth.Contract(config.BXHAirDropABI, airDropcontractAddress)
    var balance = await erc20Contract.methods.userRequestInfo("1", account.address).call({ from: account.address });
  
    // let cons = await this._getValueDecimals('2000', 18)
    // console.log("cons---->>>>>>",cons)
  
    return callback(null, balance)
  }


  // 单币,通过ID获取pool数据
  getTwistPoolInfoByID = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { id } = payload.content
    // console.log("id--->>>>", id)
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getTwistPoolInfo(web3, account, id, callbackInnerInner) }, //通过ID获取pool数据
  
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.poolItemInfo = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(GET_TWISTPOOLINFOBYID_RETURNED, poolData)
    })
  }
  _getTwistPoolInfo = async (web3, account, id, callback) => {
    let that = this
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    axios({
      // url: '/api/m1/main/bxh-info',
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
    .then(function (data) {
      let token_list = JSON.parse(localStorage.getItem('tokenList'))
      let bxh_info = data.data.data.bxh_info
      data.data.data.bxh_ex_pool_type_3.map((item) => {
        if(parseFloat(item.ex_id) === parseFloat(id)){
          if(item.pool_type === 3){   //单币 
            var tokenImgList = that.getShowImgByPairSymbol(item.token_0)
            var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
            var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)

            let poolItemInfo = []
            poolItemInfo.push({
              symbol0: item.token_0,//token0 name
              symbol1: item.token_1,//token1 name
              symbol0Address: tokenItem0.token_address, //token0 address
              id: item.ex_id, //pid
              is_hot: item.is_hot,
              ex_id: item.ex_id,
              id_centerdata:item.id,
              symbolPair: item.token_0,//token_0的名字
              decimals0: tokenItem0.token_decimal, //token0 精度
              symbol0Amount: 0,
              symbol1Amount: 0,
              balance0: 0,
              balance1: 0,
              lptokenAddress: item.pair_token, //lp address
              pool_address: bxh_info.pool_address, //abi 地址
              totalapy: total,
              miningapy: item.apy_pool,
              fees: item.apy_ex,
              bxh_day: item.bxh_day,
              bxh_month: item.bxh_month,
              is_open: item.is_open,
              tvl_total: item.tvl_pool,
              apy_pool: item.apy_pool,
              apy_ex: item.apy_ex,
              symbolPair_Show: item.pair_show,
              symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
              pair_token_type:item.pair_token_type,
              pool_type:item.pool_type
            })

            return callback(null, poolItemInfo)
          }
        }
      })
    })

  }

  // 质押池,通过ID获取pool数据--产量为usdt（新 - timo）
  getPledgepUSDTPoolInfoByID = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { id } = payload.content
    // console.log("id--->>>>", id)
    const web3 = new Web3(store.getStore('web3context').library.provider);
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getPledgepUSDTPoolInfo(web3, account, id, callbackInnerInner) }, //通过ID获取pool数据
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.poolItemInfo = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(GET_USDTPLEDGEPOOLINFOBYID_RETURNED, poolData)
    })
  }

  // 质押池,通过ID获取pool数据（新 - timo）
  getPledgepPoolInfoByID = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    console.log('rewardBXHFactory');
    console.log(pools);
    const account = store.getStore('account')
    const { id, typeStr } = payload.content
    // console.log("id--->>>>", id)
    const web3 = new Web3(store.getStore('web3context').library.provider);
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getPledgepPoolInfo(web3, account, id, typeStr, callbackInnerInner) }, //通过ID获取pool数据
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.poolItemInfo = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(GET_PLEDGEPOOLINFOBYID_RETURNED, poolData)
    })
  }
  _getPledgepPoolInfo = async (web3, account, id, typeStr, callback) => {
    console.log('zhixing');
    let that = this
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
    .then(function (data) {
      let token_list = JSON.parse(localStorage.getItem('tokenList'))
      let bxh_info = data.data.data.bxh_info
      if (typeStr && typeStr === 'pledgeRegular') {
        data.data.data.bxh_new_staking_pool.map((item) => {
          if(parseFloat(item.id) === parseFloat(id)){
              // 质押池
              var tokenItem0 = {}
              var tokenItem1 = {}
              var tokenItemReward = {}
              for (let i = 0; i < token_list.length; i++) {
                if (item.preToken && token_list[i].token_address.toUpperCase() === item.preToken.toUpperCase()) { // 存入
                  tokenItem0 = token_list[i]
                }
                if (token_list[i].token_address.toUpperCase() === item.lpToken.toUpperCase()) {
                  tokenItem1 = token_list[i]
                }
                if (token_list[i].token_address.toUpperCase() === item.rewardToken.toUpperCase()) {
                  tokenItemReward = token_list[i]
                }
              }
              let poolItemInfo = []
              poolItemInfo.push({
                pool_type: 4,
                is_bxh_new_staking_pool: true,
                symbol0: tokenItem0 && tokenItem0.symbol ? tokenItem0.symbol : '',//token1 name
                symbol1: tokenItem1.symbol,//token1 name
                symbol0Address: tokenItem0 && tokenItem0.token_address ? tokenItem0.token_address : '',
                symbolPair_Show: item.preToken,
                symbolReward: tokenItemReward.symbol,//token1 name
                pool_address: item.poolAddress, //abi 地址
                lptokenAddress: item.lpToken, //lp address
                balance1: 0,
                decimals0: tokenItem1 ? tokenItem1.token_decimal : 18, //token 精度
                symbol0Img_Show: 
                  tokenItem0 && tokenItem0.symbol ? 
                  "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem0.symbol + ".png" : 
                  "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + tokenItem1.symbol + ".png",
                id: item.indexNum,
                ex_id: item.id,

                allocPoint: item.allocPoint,
                apyPool: item.apyPool,
                bonusToken: item.bonusToken,
                chainId: item.chainId,
                depositMax: item.depositMax,
                depositMin: item.depositMin,
                enableBonus: item.enableBonus,
                icon: item.icon,
                indexNum: item.indexNum,
                lockSeconds: item.lockSeconds,
                lpToken: item.lpToken,
                outputDay: item.outputDay,
                poolAddress: item.poolAddress,
                rewardToken: item.rewardToken,
                stakingId: item.stakingId,
                swapPairAddress: item.swapPairAddress,
                totalAmount: item.totalAmount,
                tvlPool: item.tvlPool,
              })
  
              return callback(null, poolItemInfo)
          }
        })
        if (data.data.bxh_new_staking_pool && data.data.bxh_new_staking_pool[0] && data.data.bxh_new_staking_pool[0].poolAddress) {
          store.setStore({ pool_address_regular: data.data.bxh_new_staking_pool[0].poolAddress })
        }
      } else {
        data.data.data.bxh_ex_pool_4.map((item) => {
          if(parseFloat(item.ex_id) === parseFloat(id)){
              // 质押池
              var tokenImgList = that.getShowImgByPairSymbol(item.token_0)
              var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
              var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
              let poolItemInfo = []
              poolItemInfo.push({
                symbol0: item.token_0,//token0 name
                symbol1: item.token_1,//token1 name
                symbol0Address: tokenItem0.token_address, //token0 address
                id: item.ex_id, //pid
                is_hot: item.is_hot,
                ex_id: item.ex_id,
                id_centerdata:item.id,
                symbolPair: item.token_0,//token_0的名字
                decimals0: tokenItem0.token_decimal, //token0 精度
                symbol0Amount: 0,
                symbol1Amount: 0,
                balance0: 0,
                balance1: 0,
                lptokenAddress: item.pair_token, //lp address
                pool_address: bxh_info.pool_address, //abi 地址
                totalapy: total,
                miningapy: item.apy_pool,
                fees: item.apy_ex,
                bxh_day: item.bxh_day,
                bxh_month: item.bxh_month,
                is_open: item.is_open,
                tvl_total: item.tvl_pool,
                apy_pool: item.apy_pool,
                apy_ex: item.apy_ex,
                symbolPair_Show: item.pair_show,
                symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
                pair_token_type:item.pair_token_type,
                pool_type:item.pool_type
              })

              return callback(null, poolItemInfo)
          }
        })
      }
    })

  }


  _getPledgepUSDTPoolInfo = async (web3, account, id, callback) => {
    let that = this
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
    .then(function (data) {
      let token_list = JSON.parse(localStorage.getItem('tokenList'))
      let bxh_info = data.data.data.bxh_info_usdt

      data.data.data.bxh_ex_pool_4.map((item) => {
        if(parseFloat(item.ex_id) === parseFloat(id)){
            // 质押池
            var tokenImgList = that.getShowImgByPairSymbol(item.token_0)
            var tokenItem0 = that.checkTokenListForName(item.token_0 == 'HT' ? 'WHT' : item.token_0, token_list)
            var total = parseFloat(item.apy_pool) + parseFloat(item.apy_ex)
            let poolItemInfo = []
            poolItemInfo.push({
              symbol0: item.token_0,//token0 name
              symbol1: item.token_1,//token1 name
              symbol0Address: tokenItem0.token_address, //token0 address
              id: item.ex_id, //pid
              is_hot: item.is_hot,
              ex_id: item.ex_id,
              id_centerdata:item.id,
              symbolPair: item.token_0,//token_0的名字
              decimals0: tokenItem0.token_decimal, //token0 精度
              symbol0Amount: 0,
              symbol1Amount: 0,
              balance0: 0,
              balance1: 0,
              lptokenAddress: item.pair_token, //lp address
              pool_address: bxh_info.pool_address, //abi 地址
              bxh_price: bxh_info.bxh_price,
              totalapy: total,
              miningapy: item.apy_pool,
              fees: item.apy_ex,
              bxh_day: item.bxh_day,
              bxh_month: item.bxh_month,
              is_open: item.is_open,
              tvl_total: item.tvl_pool,
              apy_pool: item.apy_pool,
              apy_ex: item.apy_ex,
              symbolPair_Show: item.pair_show,
              symbol0Img_Show: tokenImgList && tokenImgList.length > 0 ? tokenImgList[0] : "",
              pair_token_type:item.pair_token_type,
              pool_type:item.pool_type
            })

            return callback(null, poolItemInfo)
        }
      })
    })

  }


  // 单币
  getBXHStakeInfo = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair) {
      return;
    }

    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset } = payload.content
    const web3 = new Web3(store.getStore('web3context').library.provider);
    async.map(pools, (pool, callback) => {
      async.map(pool.tokens, (token, callbackInner) => {
        if (tokenPair.is_bxh_new_staking_pool) {
          if (tokenPair.symbol0) {
            async.parallel([
              (callbackInnerInner) => { this._getBXHSTAKEAll0(web3, asset, account, callbackInnerInner) },  // token0 查询授权
              (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.symbol0Address, tokenPair.decimals0, callbackInnerInner) }, //查询token0余额
              (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.lptokenAddress, tokenPair.decimals0, callbackInnerInner) }, //查询token0存入余额、质押余额
              (callbackInnerInner) => { this._getAllBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
              (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
              (callbackInnerInner) => { this._getBXHSTAKEAll1(web3, asset, account, callbackInnerInner) },  // token0 查询质押授权
              (callbackInnerInner) => { this._getBXHLockedToken(web3, asset, tokenPair, account, callbackInnerInner) },  // token0 查询质押授权
            ], (err, data) => {
              if (err) {
                return callbackInner(err)
              }
              token.alloWance0 = data[0]         // 查询token0授权
              token.symbol0balance = data[1]     // 查询token0余额
              token.symbol0balanceDeposit = data[2]     // 查询token0存入余额、质押余额
              token.userInfo = data[3]           //用户数据 
              token.shouyi = data[4]             //收益
              token.alloWance1 = data[5]         // token0 查询质押授权
              token.lockedTokenAmount = data[6]         // 查询质押锁仓金额
              token.canWithdrawAmount = this._getValueMinus(data[3].amount, data[6])        // 计算质押锁仓当前可赎回金额
              callbackInner(null, token)
            })
          } else {
            async.parallel([
              (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol1, tokenPair.lptokenAddress, tokenPair.decimals0, callbackInnerInner) },
              (callbackInnerInner) => { this._getAllBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
              (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
              (callbackInnerInner) => { this._getBXHSTAKEAll1(web3, asset, account, callbackInnerInner) },  // token0 查询质押授权
              (callbackInnerInner) => { this._getBXHLockedToken(web3, asset, tokenPair, account, callbackInnerInner) },  // token0 查询质押授权
            ], (err, data) => {
              if (err) {
                return callbackInner(err)
              }
              token.symbol0balanceDeposit = data[0]           //用户钱包里的质押代币余额
              token.userInfo = data[1]           //用户数据 
              token.shouyi = data[2]             //收益
              token.alloWance1 = data[3]         // token 查询质押授权
              token.lockedTokenAmount = data[4]         // 查询质押锁仓金额
              token.canWithdrawAmount = this._getValueMinus(data[1].amount, data[4])        // 计算质押锁仓当前可赎回金额
              callbackInner(null, token)
            })
          }
        } else {
          async.parallel([
            (callbackInnerInner) => { this._getBXHSTAKEAll0(web3, asset, account, callbackInnerInner) },  // token0 查询授权
            (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.symbol0Address, tokenPair.decimals0, callbackInnerInner) }, //查询token0余额
            (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.lptokenAddress, tokenPair.decimals0, callbackInnerInner) }, //查询token0存入余额、质押余额
            (callbackInnerInner) => { this._getAllBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
            (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
            (callbackInnerInner) => { this._getBXHSTAKEAll1(web3, asset, account, callbackInnerInner) },  // token0 查询质押授权
          ], (err, data) => {
            if (err) {
              return callbackInner(err)
            }
            // console.log(data)
            token.alloWance0 = data[0]         // 查询token0授权
            token.symbol0balance = data[1]     // 查询token0余额
            token.symbol0balanceDeposit = data[2]     // 查询token0存入余额、质押余额
            token.userInfo = data[3]           //用户数据 
            token.shouyi = data[4]             //收益
            token.alloWance1 = data[5]         // token0 查询质押授权
            callbackInner(null, token)
          })
        }
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(GET_BXHTWIST_RETURNED, poolData)
    })
  }

  // 单币授权
  getTwAllowance = (payload) => {
    const account = store.getStore('account')
    const { asset, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'

    this._callTwAllowance(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
    })
  }

  _callTwAllowance = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    let yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.symbol0Address)
    var amountToSend = this._getValueDecimals(amount, 18)
    let contractAddress = asset.lptokenAddress;
    if(asset.pool_type === 4){  //质押池
      console.log(444);
      yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.symbolPair_Show)
      contractAddress = asset.lptokenAddress;
    }else{
      if(asset&&asset.symbolPair_Show.indexOf('0x')===0) {//0x开头
        console.log('000');
        yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress)
        contractAddress = asset.symbolPair_Show;
      }
    }
    console.log('授权开始');
    console.log(asset.symbol0Address);
    console.log(contractAddress);
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // 单币token0查询授权
  _getBXHSTAKEAll0 = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.symbol0Address) //lp地址
    let contractAddress = asset.lptokenAddress;
    if(asset.pool_type === 4){  //质押池
      erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.symbolPair_Show)
      contractAddress = asset.lptokenAddress;
    }else{
      if(asset&&asset.symbolPair_Show.indexOf('0x')===0) {//0x开头
        erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress)
        contractAddress = asset.symbolPair_Show;
      }
    }

    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }

  // 单币token1查询质押授权
  _getBXHSTAKEAll1 = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress) //lp地址
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, asset.pool_address).call({ from: account.address }); //abi地址
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
      console.log('授权1');
      console.log(asset.lptokenAddress);
      console.log(asset.pool_address);
      console.log(alloWance);
      // console.log('alloWance==>', alloWance)
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }

  // 单币质押授权
  getTwAllowance1 = (payload) => {
    const account = store.getStore('account')
    const { asset, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'

    this._callTwAllowance1(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_TWISTALLOWANCE_RETURNED1, res)
    })
  }

  _callTwAllowance1 = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress)
    var amountToSend = this._getValueDecimals(amount, 18)
    yCurveFiContract.methods.approve(asset.pool_address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // 单币存入
  getBXHDEPOSIT = (payload) => {
    const account = store.getStore('account')
    const { asset, amount, msgContent } = payload.content
    this._callTwistStakeBXH(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
    })
  }
  
  // 存入方法
  _callTwistStakeBXH = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    var amountToSend = this._getValueDecimals(amount, asset.decimals0);

    const yCurveFiContract = new web3.eth.Contract(config.BXHTwABI, asset.lptokenAddress)
    yCurveFiContract.methods.stake(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // 执行成功立即执行
        // console.log('hash111=>',hash);
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // 执行成功，等结果返回在执行
        // console.log(confirmationNumber, receipt);
      })
      .on('receipt', function (receipt) {
        // 执行成功，等结果返回在执行
        // console.log('hash222=>',receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 单币取消存入 （新 - timo）
  getTwistCancel = (payload) => {
    const account = store.getStore('account')
    const { asset, amount, msgContent } = payload.content
    // 只有pair_show是0x开头的合约地址时，才需要用新方法，如果不是0x开头的合约地址，还是原来的接口调用
    if(asset&&asset.symbolPair_Show.indexOf('0x')===0 && asset.pool_type===3) {//0x开头
      this._callNewTwistCancel(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        this._refreshCookieData(res, account, msgContent)
        return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
      })
    }else{
      this._callTwistCancel(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        this._refreshCookieData(res, account, msgContent)
        return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
      })
    }
  }
  // 新取消存入方法
  _callNewTwistCancel = async (asset, account, amount, callback) => {  
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    // var amountToSend = this._getValueDecimals(amount, asset.decimals0);

    const yCurveFiContract = new web3.eth.Contract(XTokenABI, asset.symbolPair_Show)
    let pid = '';
    try {
      pid = await yCurveFiContract.methods.LpOfPid(asset.lptokenAddress).call();
    } catch (ex) {
      return callback(ex)
    }

    yCurveFiContract.methods.deposit(pid,account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // 执行成功立即执行
        // console.log('hash111=>',hash);
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // 执行成功，等结果返回在执行
        // console.log(confirmationNumber, receipt);
      })
      .on('receipt', function (receipt) {
        // 执行成功，等结果返回在执行
        // console.log('hash222=>',hash);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  // 取消存入方法
  _callTwistCancel = async (asset, account, amount, callback) => {  
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    var amountToSend = this._getValueDecimals(amount, asset.decimals0);

    const yCurveFiContract = new web3.eth.Contract(config.BXHTwABI, asset.lptokenAddress)
    yCurveFiContract.methods.withdraw(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // 执行成功立即执行
        // console.log('hash111=>',hash);
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // 执行成功，等结果返回在执行
        // console.log(confirmationNumber, receipt);
      })
      .on('receipt', function (receipt) {
        // 执行成功，等结果返回在执行
        // console.log('hash222=>',hash);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        // 取消执行
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // 单币质押
  getTwistPledge = (payload) => {
    const account = store.getStore('account')
    const { asset, amount, msgContent } = payload.content
    this._callTwistPledge(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._refreshCookieData(res, account, msgContent)
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      this._getMineStakedPool((stakedList) => {
        localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
        store.setStore({ StakedPoolList: stakedList })
      })

      return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
    })
  }

  // 质押方法
  _callTwistPledge = async (asset, account, amount, callback) => {  
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    var amountToSend = this._getValueDecimals(amount, asset.decimals0);
    console.log('开始质押')
    console.log(asset)
    console.log(amountToSend)
    console.log(asset.pool_address)
    const yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
    yCurveFiContract.methods.deposit(asset.id, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // 单币取消质押 （新 - timo）
  getTwistPledgeCancel = (payload) => {
    const account = store.getStore('account')
    const { asset, amount, msgContent } = payload.content
    this._callTwistPledgeCancel(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
    })
  }

  // 取消质押方法
  _callTwistPledgeCancel = async (asset, account, amount, callback) => {  
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    var amountToSend = this._getValueDecimals(amount, asset.decimals0);

    const yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
    yCurveFiContract.methods.withdraw(asset.id, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: asset } })
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // 单币领取奖励 （新 - timo）
  stakeBXH = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, amount, msgContent, oldAmount } = payload.content
    this._callStakeTwistBXH(asset, account, amount, oldAmount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_TWISTALLOWANCE_RETURNED, res)
    })
  }
  _callStakeTwistBXH = async (asset, account, amount, oldamount, pair, callback) => {
    // amount = 0.101
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
    let yCurveFiContract = null
    yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pair.pool_address)
     
    let _Decimals = await this._getDecimals(pair.lptokenAddress)
    var amountToSend = this._getValueDecimals(amount, _Decimals)
    if (amountToSend > asset.oldBalance) {
      amountToSend = asset.oldBalance
    }
    // console.log("amountToSend--->>>>>",amountToSend)
    yCurveFiContract.methods.deposit(pair.id, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        dispatcher.dispatch({ type: GET_BXHTWIST, content: { asset: pair } })
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  
  }


  
  // 新加的
  getBXHTradeStakeInfo = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
  
    if (!tokenPair) {
      return;
    }
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset } = payload.content
    // console.log("查询---》》》》》》",tokenPair)
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol0, tokenPair.symbol0Address, tokenPair.decimals0, callbackInnerInner) }, //查询token0余额
          (callbackInnerInner) => { this._getHTERC20Balance2(tokenPair.symbol1, tokenPair.symbol1Address, tokenPair.decimals1, callbackInnerInner) }, //查询token1余额
          (callbackInnerInner) => { this._getBXHSTAKEAlloWance0(web3, asset, account, callbackInnerInner) },  // token0 查询授权
          (callbackInnerInner) => { this._getBXHSTAKEAlloWance1(web3, asset, account, callbackInnerInner) },  // token1 查询授权
          (callbackInnerInner) => { this._getAllBXHUserInfo(web3, asset, tokenPair, account, callbackInnerInner) },  //查询用户的数据
          (callbackInnerInner) => { this._getAllBXHShouYi(web3, asset, account, callbackInnerInner) },  //查询可领取的收益
          (callbackInnerInner) => { this._getTotalBXHSupply(web3, asset, account, callbackInnerInner) },  //池子总量
  
          // (callbackInnerInner) => { this._getMineBXHLPAmount(web3, asset, account, callbackInnerInner) },  //我的lp数量
        ], (err, data) => {
          if (err) {
            return callbackInner(err)
          }
          token.symbol0balance = data[0]     // 查询授权
          token.symbol1balance = data[1]     // 钱包当前代币余额
          token.alloWance0 = data[2]         // 授权
          token.alloWance1 = data[3]         // 授权
          token.userInfo = data[4]           //用户数据 
          token.shouyi = data[5]             //收益
          token.poolTotal = data[6].poolTotal         //池子总量
          token.mineLpAmount = data[6].balance       //我的数量
          token.zanbi = data[6].zanbi       //我的数量
          token.oldBalance = data[6].oldBalance //去精度之前的数据
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(GET_BXHTRADESTAKEINIT_RETURNED, poolData)
    })
  }
  
  getBXHHomeBanalce = async (payload) => {
    // let amountToSend = 34163311266642088000
    // let oldBalance =   34163311266642086558
  
    // if (amountToSend > oldBalance) {
    //   console.log("进来了")
    // }else{
    //   console.log("下面11111")
    // }
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset } = payload.content
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getBalanceForBXH(asset, 18, callbackInnerInner) }, //查询token0余额
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.bxhbanance = data[0]     // 查询授权
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        console.log(err)
        return emitter.emit(ERROR, err)
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXHLISTBALANCEHOME_RETURNED, poolData)
    })
  }
  
  getBXHTradeStakeAmountCalcula = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
  
    if (!tokenPair || !tokenPair.symbol0Address) {
      return;
    }
    // console.log("tokenPair--->>>>",tokenPair)
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset, amount } = payload.content
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getBXHReserveAndQuote2(asset, tokenPair, amount, callbackInnerInner) }, //
  
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
  
          token.tokenA = data[0].tokenA
          token.tokenB = data[0].tokenB
          token.reserveA = data[0].reserveA
          token.reserveB = data[0].reserveB
          token.bili = _getValueDivided1(data[0].count, 10 ** 18)//parseFloat(data[0].count) / 10 ** 18
          token.bili_decimal = data[0].count_decimal
          token.isReserve = data[0].isReserve
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXHCALCULATION_RETURNED, poolData)
    })
  }
 
  getBXHTradeStakeAmountCalcula2 = async (payload) => {
    const tokenPair = store.getStore('rewardBXHTokens')
  
    if (!tokenPair || !tokenPair.symbol0Address) {
      return;
    }
    // console.log("tokenPair--->>>>",tokenPair)
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { asset, amount } = payload.content
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getBXHReserveAndQuote(asset, tokenPair, amount, callbackInnerInner) }, //
  
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
  
          token.tokenA = data[0].tokenA
          token.tokenB = data[0].tokenB
          token.reserveA = data[0].reserveA
          token.reserveB = data[0].reserveB
          token.bili = _getValueDivided1(data[0].count, 10 ** 18)//parseFloat(data[0].count) / 10 ** 18
          token.bili_decimal = data[0].count_decimal
          token.isReserve = data[0].isReserve
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXHCALCULATION2_RETURNED, poolData)
    })
  }
  
  getPoolInfoByID = async (payload) => {
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { id } = payload.content
    // console.log("id--->>>>", id)
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getPoolInfo(web3, account, id, callbackInnerInner) }, //通过ID获取pool数据
  
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.poolItemInfo = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(BXHGETPOOLINFOBYID_RETURNED, poolData)
    })
  }
  _getPoolInfo = async (web3, account, id, callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let pool_address = store.getStore('pool_address')
    let router_address = store.getStore('router_address')
    let factory_address = store.getStore('factory_address')

    if(chainId === '56'){
      pool_address = store.getStore('pool_address_BSC')
      router_address = store.getStore('router_address_BSC')
      factory_address = store.getStore('factory_address_BSC')
    }else if(chainId === '66'){
      pool_address = store.getStore('pool_address_OKEX')
      router_address = store.getStore('router_address_OKEX')
      factory_address = store.getStore('factory_address_OKEX')
    }else if(chainId === '1'){
      pool_address = store.getStore('pool_address_ETH')
      router_address = store.getStore('router_address_ETH')
      factory_address = store.getStore('factory_address_ETH')
    }else if(chainId === '43114'){
      pool_address = store.getStore('pool_address_AVAX')
      router_address = store.getStore('router_address_AVAX')
      factory_address = store.getStore('factory_address_AVAX')
    }else{
      pool_address = store.getStore('pool_address')
      router_address = store.getStore('router_address')
      factory_address = store.getStore('factory_address')
    }
 
    let poolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    let poolInfo = await poolContract.methods.poolInfo(id).call({ from: account.address }) //查询poolinfo 获取合约地址
 
    let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, poolInfo.lpToken)    //获取token0 token1的token地址
    var token0_chainup = await bxhfactoryContract.methods.token0().call();
    var token1_chainup = await bxhfactoryContract.methods.token1().call();
  
    let erc20ABI0 = new web3.eth.Contract(config.erc20ABI, token0_chainup)
    let erc20ABI1 = new web3.eth.Contract(config.erc20ABI, token1_chainup)
    //获取两个token的名字
    let symbol0 = await erc20ABI0.methods.symbol().call()
    let symbol1 = await erc20ABI1.methods.symbol().call()
    //获取两个token的精度
    let decimals0 = await erc20ABI0.methods.decimals().call()
    let decimals1 = await erc20ABI1.methods.decimals().call()
  
    let imgList = this.checkTokenPairSX(symbol0, symbol1)
  
    // fees bxh_day  bxh_month  miningapy  totalapy  tvl_total
    let poolItemInfo = {
      pool_address: pool_address,
      router_address: router_address,
      factory_address: factory_address,
      balance0: 0,
      balance1: 0,
      decimals0: decimals0,
      decimals1: decimals1,
      id: id,
      is_open: 1,
      lptokenAddress: poolInfo.lpToken,
      symbol0: symbol0,
      symbol1: symbol1,
      symbol0Address: token0_chainup,
      symbol1Address: token1_chainup,
      symbol0Amount: 0,
      symbol1Amount: 0,
      symbol0ImgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1imgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png",
      symbolPair: symbol0 + "/" + symbol1,
      symbolPair_Show: imgList && imgList.tokenPair_Show && imgList.tokenPair_Show !== "" ? imgList.tokenPair_Show : symbol0 + "/" + symbol1,
      symbol0Img_Show: imgList && imgList.symbol0Img && imgList.symbol0Img !== "" ? imgList.symbol0Img : "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1Img_Show: imgList && imgList.symbol1Img && imgList.symbol1Img !== "" ? imgList.symbol1Img : "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png",
    }
  
    return callback(null, poolItemInfo)
  }


  getPoolInfoByUSDTID = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { id } = payload.content
    // console.log("id--->>>>", id)
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getPoolUSDTInfo(web3, account, id, callbackInnerInner) }, //通过ID获取pool数据
          (callbackInnerInner) => { this._getMinePoolBXHList(web3, token, account, callbackInnerInner) },
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          // console.log('data=======>', data)
          token.poolItemInfo = data[0]
          token.symbolTokens = data[1]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(BXHUSDTGETPOOLINFOBYID_RETURNED, poolData)
    })
  }
  _getPoolUSDTInfo = async (web3, account, id, callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let _this = this
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
    .then(function (data) {
      let bxh_info_usdt = data.data.data.bxh_info_usdt
      _this._getPoolUSDTList(web3, account, id, bxh_info_usdt, callback)
    })
  }

  _getPoolUSDTList = async (web3, account, id, bxh_info_usdt, callback) => {
    let pool_address = bxh_info_usdt.pool_address
    let router_address = bxh_info_usdt.router_address
    let factory_address = bxh_info_usdt.factory_address
    // console.log('pool_address1111===>', pool_address)
    // console.log('router_address===>', router_address)
    // console.log('factory_address===>', factory_address)

    let poolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    let poolInfo = await poolContract.methods.poolInfo(id).call({ from: account.address }) //查询poolinfo 获取合约地址
 
    let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, poolInfo.lpToken)    //获取token0 token1的token地址
    var token0_chainup = await bxhfactoryContract.methods.token0().call();
    var token1_chainup = await bxhfactoryContract.methods.token1().call();
  
    let erc20ABI0 = new web3.eth.Contract(config.erc20ABI, token0_chainup)
    let erc20ABI1 = new web3.eth.Contract(config.erc20ABI, token1_chainup)
    //获取两个token的名字
    let symbol0 = await erc20ABI0.methods.symbol().call()
    let symbol1 = await erc20ABI1.methods.symbol().call()
    //获取两个token的精度
    let decimals0 = await erc20ABI0.methods.decimals().call()
    let decimals1 = await erc20ABI1.methods.decimals().call()
  
    let imgList = this.checkTokenPairSX(symbol0, symbol1)
  
    // fees bxh_day  bxh_month  miningapy  totalapy  tvl_total
    let poolItemInfo = {
      pool_address: pool_address,
      router_address: router_address,
      factory_address: factory_address,
      balance0: 0,
      balance1: 0,
      decimals0: decimals0,
      decimals1: decimals1,
      id: id,
      is_open: 1,
      lptokenAddress: poolInfo.lpToken,
      symbol0: symbol0,
      symbol1: symbol1,
      symbol0Address: token0_chainup,
      symbol1Address: token1_chainup,
      symbol0Amount: 0,
      symbol1Amount: 0,
      symbol0ImgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1imgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png",
      symbolPair: symbol0 + "/" + symbol1,
      symbolPair_Show: imgList && imgList.tokenPair_Show && imgList.tokenPair_Show !== "" ? imgList.tokenPair_Show : symbol0 + "/" + symbol1,
      symbol0Img_Show: imgList && imgList.symbol0Img && imgList.symbol0Img !== "" ? imgList.symbol0Img : "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1Img_Show: imgList && imgList.symbol1Img && imgList.symbol1Img !== "" ? imgList.symbol1Img : "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png",
    }
  
    return callback(null, poolItemInfo)
  }


  _getPoolInfoByTwoTokenAddress = async (token0Address,token1Address,callback) =>{
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let router_address = store.getStore('router_address')
    let factory_address = store.getStore('factory_address')
    let pool_address = store.getStore('pool_address')
    if(chainId === '56'){
      router_address = store.getStore('router_address_BSC')
      factory_address = store.getStore('factory_address_BSC')
      pool_address = store.getStore('pool_address_BSC')
    }else if(chainId === '66'){
      router_address = store.getStore('router_address_OKEX')
      factory_address = store.getStore('factory_address_OKEX')
      pool_address = store.getStore('pool_address_OKEX')
    }else if(chainId === '1'){
      router_address = store.getStore('router_address_ETH')
      factory_address = store.getStore('factory_address_ETH')
      pool_address = store.getStore('pool_address_ETH')
    }else if(chainId === '43114'){
      router_address = store.getStore('router_address_AVAX')
      factory_address = store.getStore('factory_address_AVAX')
      pool_address = store.getStore('pool_address_AVAX')
    }else{
      router_address = store.getStore('router_address')
      factory_address = store.getStore('factory_address')
      pool_address = store.getStore('pool_address')
    }

    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account')
  
    // 先查询出交易对地址是否为0x0000000000000000000000000000000000000000
    // 是的话先提示 流动性不足
    const cRewardsContract = new web3.eth.Contract(config.BXHFactory, factory_address)
    var getPair = await cRewardsContract.methods.getPair(token0Address, token1Address).call();//lpaddress
    // console.log("getPair ---->>>>>>> ", getPair)
 
    let erc20ABI0 = new web3.eth.Contract(config.erc20ABI, token0Address)
    let erc20ABI1 = new web3.eth.Contract(config.erc20ABI, token1Address)
    //获取两个币的详情pool
    //symbol
    let symbol0 = await erc20ABI0.methods.symbol().call()
    let symbol1 = await erc20ABI1.methods.symbol().call()
    //symboladdress
    let symbol0Address = token0Address
    let symbol1Address = token1Address
    //img
    let symbol0ImgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/"+symbol0+".png"
    let symbol1imgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/"+symbol1+".png"
    //decimals
    let decimals0 = await erc20ABI0.methods.decimals().call()
    let decimals1 = await erc20ABI1.methods.decimals().call()
    //balance 默认为0
    let balance0 = 0
    let balance1 = 0 
 
    let pool = {
      symbol0:symbol0,
      symbol1:symbol1,
      symbol0Address:symbol0Address,
      symbol1Address:symbol1Address,
      symbol0ImgURl:symbol0ImgURl,
      symbol1imgURl:symbol1imgURl,
      decimals0:decimals0,
      decimals1:decimals1,
      balance0:balance0,
      balance1:balance1,
      router_address:router_address,
      factory_address:factory_address,
      pool_address:pool_address,
      lptokenAddress:getPair
    }
 
    return callback(pool)
  }
  
  //单币挖矿
  getSinglePoolInfoByID = async (payload) => {
  
    const pools = store.getStore('rewardBXHFactory')
    const account = store.getStore('account')
    const { id,dao_address,id_centerdata } = payload.content
     
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    async.map(pools, (pool, callback) => {
  
      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getSinglePoolInfo(web3, account, id,id_centerdata,dao_address, callbackInnerInner) }, //通过ID获取pool数据
  
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.poolItemInfo = data[0]
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        return
      }
      emitter.emit(BXHGETSINGLEPOOLINFOBUID_RETURNED, poolData)
    })
  }
  _getSinglePoolInfo = async (web3, account, id,id_centerdata,dao_address, callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let pool_address = store.getStore('pool_address')
    let router_address = store.getStore('router_address')
    let factory_address = store.getStore('factory_address')

    if(chainId === '56'){
      pool_address = store.getStore('pool_address_BSC')
      router_address = store.getStore('router_address_BSC')
      factory_address = store.getStore('factory_address_BSC')
    }else if(chainId === '66'){
      pool_address = store.getStore('pool_address_OKEX')
      router_address = store.getStore('router_address_OKEX')
      factory_address = store.getStore('factory_address_OKEX')
    }else if(chainId === '1'){
      pool_address = store.getStore('pool_address_ETH')
      router_address = store.getStore('router_address_ETH')
      factory_address = store.getStore('factory_address_ETH')
    }else if(chainId === '43114'){
      pool_address = store.getStore('pool_address_AVAX')
      router_address = store.getStore('router_address_AVAX')
      factory_address = store.getStore('factory_address_AVAX')
    }else{
      pool_address = store.getStore('pool_address')
      router_address = store.getStore('router_address')
      factory_address = store.getStore('factory_address')
    }

    let isDAOOperation = this.checkCurrentIsDaoOperation(id_centerdata)
    let item = this.getDAOContractByID(id_centerdata)
 
    if (!item) {
      return
    }
 
    let poolContract = new web3.eth.Contract(isDAOOperation?config.BXHDaoABI:config.BXHHepoolRewardsABI, isDAOOperation?dao_address:pool_address)
    let poolInfo = await poolContract.methods.poolInfo(id).call({ from: account.address }) //查询poolinfo 获取合约地址
  
    // let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, poolInfo.lpToken)    //获取token0 token1的token地址
    // var token0_chainup = await bxhfactoryContract.methods.token0().call();
    // var token1_chainup = await bxhfactoryContract.methods.token1().call();
    // console.log("token0_chainup--->>>>>>",token0_chainup)
    // console.log("token1_chainup----->>>>",token1_chainup)
  
    let erc20ABI0 = new web3.eth.Contract(config.erc20ABI, poolInfo.lpToken)
    // let erc20ABI1 = new web3.eth.Contract(config.erc20ABI, token1_chainup)
    // //获取两个token的名字
    let symbol0 = await erc20ABI0.methods.symbol().call()
    // let symbol1 = await erc20ABI1.methods.symbol().call()
    // //获取两个token的精度
    let decimals0 = await erc20ABI0.methods.decimals().call()
    // let decimals1 = await erc20ABI1.methods.decimals().call()
  
    // let imgList = this.checkTokenPairSX(symbol0,symbol1)
    // console.log("imgList---->>>>>>>>",imgList)
  
    // // fees bxh_day  bxh_month  miningapy  totalapy  tvl_total
     
    let poolItemInfo = {
      pool_address: pool_address,
      router_address: router_address,
      factory_address: factory_address,
      dao_address:dao_address,
      balance0: 0,
      balance1: 0,
      decimals0: decimals0,
      decimals1: decimals0,
      id: id,
      id_centerdata:id_centerdata,
      is_open: 1,
      lptokenAddress: poolInfo.lpToken,
      symbol0: symbol0,
      symbol1: symbol0,
      symbol0Address: poolInfo.lpToken,
      symbol1Address: poolInfo.lpToken,
      symbol0Amount: 0,
      symbol1Amount: 0,
      symbol0ImgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1imgURl: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbolPair: symbol0,
      symbolPair_Show: symbol0,
      symbol0Img_Show: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1Img_Show: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      pair_token_type:item.pair_token_type,
      pool_type:item.pool_type
    }
  
    return callback(null, poolItemInfo)
  }
  
  checkTokenPairSX = (symbol0, symbol1) => {
    let MainStreamTokenList = store.getStore('MainStreamTokenList')
    let imgList = null
    if (symbol0 === "BXH") {
      if (MainStreamTokenList.indexOf(symbol1) > -1) {
        imgList = {
          tokenPair_Show: symbol0 + "/" + symbol1,
          symbol0Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
          symbol1Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png"
        }
        return imgList
      }
    } else if (symbol1 === "BXH") {
      if (MainStreamTokenList.indexOf(symbol0) > -1) {
        imgList = {
          tokenPair_Show: symbol1 + "/" + symbol0,
          symbol0Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png",
          symbol1Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png"
        }
        return imgList
      }
    }
  
    imgList = {
      tokenPair_Show: symbol0 + "/" + symbol1,
      symbol0Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png",
      symbol1Img: "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png"
    }
    return imgList
  
  }

  _getHTERC20Balance = async (address, decimals) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
    var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
    balance = this._getValueDivided(balance, 10 ** decimals)//parseFloat(balance) / 10 ** decimals
    return balance
  }
  
  //1: token地址   2:token精度 
  _getHTERC20Balance2 = async (symbol, address, decimals, callback) => {
    if (!symbol || !address || address === "") {
      return callback(null, '0.0000');
    }
    // if (!decimals || decimals === undefined || decimals === NaN || decimals === 0) {
    //   decimals = await this._getDecimals(address)
    // }
    decimals = await this._getDecimals(address)
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);

    if (symbol !== 'HT') {
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      // console.log("balance--->>>>",balance+"  symbol--->>>",symbol)
      balance = this._getValueDivided1(balance, 10 ** decimals)//await this._getToolNumber(parseFloat(balance) / 10 ** decimals)
      return callback(null, balance)
    } else {
      const HTBalance = await new web3.eth.getBalance(account.address)
      // console.log("ht count --->>>>>>>",HTBalance)
      var etcHTBalance = await this._getToolNumber(parseFloat(HTBalance) / 10 ** 18)
  
      return callback(null, etcHTBalance)
    }
  
  }
    //1: token地址   2:token精度 
    _getHTERC20Balance3 = async (symbol, address, decimals, callback) => {
      if (!symbol || !address || address === "") {
        return callback(null, '0.0000');
      }
      if (!decimals || decimals === undefined || decimals === NaN || decimals === 0) {
        decimals = await this._getDecimals(address)
      }
      const account = store.getStore('account')
      const web3 = new Web3(store.getStore('web3context').library.provider);
    
      if (symbol !== 'HT' && symbol!=="WHT") {
        let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
        var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
        balance = this._getValueDivided1(balance, 10 ** decimals)//await this._getToolNumber(parseFloat(balance) / 10 ** decimals)
        return callback(null, balance)
      } else {
        const HTBalance = await new web3.eth.getBalance(account.address)
        // console.log("ht count --->>>>>>>",HTBalance)
        var etcHTBalance = await this._getToolNumber(parseFloat(HTBalance) / 10 ** 18)
    
        return callback(null, etcHTBalance)
      }
    
    }
  _getHTERC20SingleBalance = async (symbol, address, decimals, callback) => {
    if (!symbol || !address || address === "" || !decimals) {
      return callback(null, '0.0000');
    }
    // console.log("查询余额---->>>>>>>>>>>",address)
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    if (symbol !== 'HT') {
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
      var oldBalance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      // console.log("balance------>>>>>",oldBalance)
      var balance = this._getValueDivided1(oldBalance, 10 ** decimals)//await this._getToolNumber(parseFloat(balance) / 10 ** decimals)
      // console.log("symbol---->>>>>>",symbol)
      // console.log("balance------>>>>>",balance)
      let result = {
        oldBalance: oldBalance,
        balance: balance
      }
      return callback(null, result)
    } else {
      const HTBalance = await new web3.eth.getBalance(account.address)
      // console.log("ht count --->>>>>>>",HTBalance)
      var etcHTBalance = await this._getToolNumber(parseFloat(HTBalance) / 10 ** 18)
      let result = {
        oldBalance: HTBalance,
        balance: etcHTBalance
      }
      return callback(null, result)
    }
  
  }
  _getBalanceForBXH = async (address, decimals, callback) => {
    // console.log("address --- - - - - >>>>>>",address)
    if (!address || address === "" || address === "0x0000000000000000000000000000000000000000") {
      return callback(null, "0.0000")
    }
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
    var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
    balance = await this._getToolNumber(parseFloat(balance) / 10 ** decimals)
  
    return callback(null, balance)
  }
  
  
  getHomeBalance = async (payload) => {
    const pools = store.getStore('rewardBXHFactory')
    async.map(pools, (pool, callback) => {

      async.map(pool.tokens, (token, callbackInner) => {
        async.parallel([
          (callbackInnerInner) => { this._getBXHBalance(callbackInnerInner) },
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }
          token.bxhbanancehome = data[0]
          token.bxhbanance = data[0]
  
          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }
        pool.tokens = tokensData
        callback(null, pool)
      })
  
    }, (err, poolData) => {
      if (err) {
        console.log(err)
        return emitter.emit(ERROR, err)
      }
      store.setStore({ rewardBXHFactory: poolData })
      emitter.emit(BXH_HOMEBALANCE_RETURNED, poolData)
    })
  }
  _getBXHBalance = async (callback) => {
    const account = store.getStore('account')
    let web3 = store.getStore('web3context');
    const { ethereum } = window;
    let chainId
    if(ethereum){
      chainId = await ethereum.networkVersion;
      if(chainId){
        chainId = await ethereum.networkVersion;
      }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
      }
    }else{
      chainId = '56'
    }
    
    let bxh_token = "0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0"
    if(chainId === '56'){
      bxh_token = "0x6d1b7b59e3fab85b7d3a3d86e505dd8e349ea7f3"
    }else if(chainId === '66'){
      bxh_token = "0x145ad28a42bf334104610f7836d0945dffb6de63"
    }else if(chainId === '1'){
      bxh_token = "0xEb637A9Ab6Be83c7F8c79fdAA62E1043b65534F0"
    }else if(chainId === '128'){
      bxh_token = "0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0"
    }else if(chainId === '137'){
      bxh_token = "0x8b57051F8071aad893d59Ba44A598fdD1c4128dc"
    }else if(chainId === '43114'){
      bxh_token = "0x90a424754ad0D72CebD440Faba18cDC362BFE70a"
    }
    if(web3){
      web3 = new Web3(store.getStore('web3context').library.provider);
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, bxh_token)
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = await this._getToolNumber(parseFloat(balance) / 10 ** 18)
      return callback(null, balance)
    }
  }
  
  _getBXHReserveAndQuote = async (asset, pair, amount, callback) => {
    // console.log("asset---->>>>>>",asset)
    if (!pair.lptokenAddress || pair.lptokenAddress === "") {
      return;
    }
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
   
    let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, pair.lptokenAddress)
    var reserveArr = await bxhfactoryContract.methods.getReserves().call({ from: account.address });
    var token0_chainup = await bxhfactoryContract.methods.token0().call();
    var token1_chainup = await bxhfactoryContract.methods.token1().call();
  
    let tokenItem0 = await this.getTokenItembyAddress(token0_chainup)
    let tokenItem1 = await this.getTokenItembyAddress(token1_chainup)
    // console.log("tokenItem0--->>>>>",tokenItem0)
    // console.log("tokenItem1--->>>>>",tokenItem1)
  
    let currentDecimal0 = 0
    let currentDecimal1 = 0
  
    if (tokenItem0) {
      currentDecimal0 = tokenItem0.token_decimal
    }else{
      currentDecimal0 = await this._getDecimals(token0_chainup)
    }
  
    if (tokenItem1) {
      currentDecimal1 = tokenItem1.token_decimal
    }else{
      currentDecimal1 = await this._getDecimals(token1_chainup)
    }
  
  
    var amountToSend
    pair.decimals0 = currentDecimal0
    pair.decimals1 = currentDecimal1
    // if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
    //   amountToSend = _getValuemultip1(amount,pair.decimals0)
    // }else{
    //   amountToSend = _getValuemultip1(amount,pair.decimals1)
    // }
   
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (currentDecimal0 != 18) {
      amountToSend = (amount * 10 ** currentDecimal0).toFixed(0);
    }
    // console.log("pair--->>>>>>>",pair)
    // console.log("amountToSend--->>>>>",amountToSend)
    // console.log("reserveArr--->>>>>>",reserveArr)
    let bxhrouterContract = new web3.eth.Contract(config.BXHRouterRewardsABI, asset.router_address)
    var count_nor = await bxhrouterContract.methods.quote(amountToSend, reserveArr._reserve0, reserveArr._reserve1).call({ from: account.address });
    var count1_rever = await bxhrouterContract.methods.quote(amountToSend, reserveArr._reserve1, reserveArr._reserve0).call({ from: account.address });
    let count
    let count_decimal
    // console.log("token0_chainup address ---->>>>>>>",token0_chainup)
    // console.log("pair.symbol0Address---->>>>>>>",pair.symbol0Address)
    if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
      count = count_nor
      // console.log("count_nor---->>>>>>",count_nor)
      count_decimal = _getValueDivided1(count_nor, 10 ** pair.decimals1)
    } else {
      count = count1_rever
      // console.log("count1_rever---->>>>>>",count1_rever)
      count_decimal = _getValueDivided1(count1_rever, 10 ** pair.decimals1)
    }
   
   
    // 查询token0、token1币种address
    // console.log("count_decimal--->>>>>",count_decimal)
   
    // console.log("reserveArr----->>>",reserveArr)
    // console.log("pair ---------- >>>>>>>>>",pair)
    let tokenA_no = await this._getToolNumber(parseFloat(amountToSend) / 10 ** pair.decimals0)
    let tokenB_no = await this._getToolNumber(parseFloat(count) / 10 ** pair.decimals1)
    let reserveA_no = 0//await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals0)
    let reserveB_no = 0//await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals1)
   
    if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
      reserveA_no = await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals0)
      reserveB_no = await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals1)
    } else {
      reserveA_no = await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals1)
      reserveB_no = await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals0)
    }
   
    let result = {
      tokenA: tokenA_no,
      tokenB: tokenB_no,
      reserveA: reserveA_no,
      reserveB: reserveB_no,
      count: count,
      count_decimal: count_decimal,
      tokenAAddress: pair.symbol0Address,
      tokenBAddress: pair.symbol1Address,
      tokenASymbol: pair.symbol0,
      tokenBSymbol: pair.symbol1
    }
   
    return callback(null, result)
  }
  _getBXHReserveAndQuote2 = async (asset, pair, amount, callback) => {
    // console.log("pair---->>>>>>",pair)
    if (!pair.lptokenAddress || pair.lptokenAddress === "" || pair.lptokenAddress === "0x0000000000000000000000000000000000000000") {
      return;
    }
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, pair.lptokenAddress)
    var reserveArr = await bxhfactoryContract.methods.getReserves().call({ from: account.address });
    var token0_chainup = await bxhfactoryContract.methods.token0().call();
    var token1_chainup = await bxhfactoryContract.methods.token1().call();
 
    let tokenItem0 = await this.getTokenItembyAddress(token0_chainup)
    let tokenItem1 = await this.getTokenItembyAddress(token1_chainup)
    // console.log("tokenItem0--->>>>>",tokenItem0)
    // console.log("tokenItem1--->>>>>",tokenItem1)
 
    // let currentDecimal0 = 0
    // let currentDecimal1 = 0
 
    // if (tokenItem0) {
    //   currentDecimal0 = tokenItem0.token_decimal
    // }else{
    //   currentDecimal0 = await this._getDecimals(token0_chainup)
    // }
 
    // if (tokenItem1) {
    //   currentDecimal1 = tokenItem1.token_decimal
    // }else{
    //   currentDecimal1 = await this._getDecimals(token1_chainup)
    // }
 
 
    var amountToSend
    var amountToSend1
    // pair.decimals0 = currentDecimal0
    // pair.decimals1 = currentDecimal1
    // if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
    //   amountToSend = _getValuemultip1(amount,pair.decimals0)
    // }else{
    //   amountToSend = _getValuemultip1(amount,pair.decimals1)
    // }
  
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (pair.decimals0 != 18) {
      amountToSend = (amount * 10 ** pair.decimals0).toFixed(0);
    }
 
    // console.log("pair--->>>>>>>",pair)
    // console.log("amountToSend--->>>>>",amountToSend)
    let bxhrouterContract = new web3.eth.Contract(config.BXHRouterRewardsABI, asset.router_address)
    var count_nor = await bxhrouterContract.methods.quote(amountToSend, reserveArr._reserve0, reserveArr._reserve1).call({ from: account.address });
    var count1_rever = await bxhrouterContract.methods.quote(amountToSend, reserveArr._reserve1, reserveArr._reserve0).call({ from: account.address });
    let count
    let count_decimal
    // console.log("token0_chainup address ---->>>>>>>",token0_chainup)
    // console.log("pair.symbol0Address---->>>>>>>",pair.symbol0Address)
    if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
      count = count_nor
      // console.log("count_nor---->>>>>>",count_nor)
      count_decimal = _getValueDivided1(count_nor, 10 ** pair.decimals1)
    } else {
      count = count1_rever
      // console.log("count1_rever---->>>>>>",count1_rever)
      //count_decimal = _getValueDivided1(1,_getValueDivided1(count_nor, 10 ** pair.decimals1))
      count_decimal = _getValueDivided1(count1_rever, 10 ** pair.decimals1)
    }
  
  
    // 查询token0、token1币种address
    // console.log("count_decimal--->>>>>",count_decimal)
  
 
    let tokenA_no = await this._getToolNumber(parseFloat(amountToSend) / 10 ** pair.decimals0)
    let tokenB_no = await this._getToolNumber(parseFloat(count) / 10 ** pair.decimals1)
    let reserveA_no = 0//await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals0)
    let reserveB_no = 0//await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals1)
  
    let isReserve = false
    if (pair.symbol0Address.toUpperCase() === token0_chainup.toUpperCase()) {
      reserveA_no = await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals0)
      reserveB_no = await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals1)
      isReserve = false
    } else {
      reserveA_no = await this._getToolNumber(parseFloat(reserveArr._reserve0) / 10 ** pair.decimals1)
      reserveB_no = await this._getToolNumber(parseFloat(reserveArr._reserve1) / 10 ** pair.decimals0)
      isReserve = true
    }
 
    // let erc20Contract = new web3.eth.Contract(config.erc20ABI, pair.lptokenAddress) //token 地址
    // var poolTotal = await erc20Contract.methods.totalSupply().call();
  
    let result = {
      tokenA: tokenA_no,
      tokenB: tokenB_no,
      reserveA: reserveA_no,
      reserveB: reserveB_no,
      count: count,
      count_decimal: count_decimal,
      tokenAAddress: pair.symbol0Address,
      tokenBAddress: pair.symbol1Address,
      tokenASymbol: pair.symbol0,
      tokenBSymbol: pair.symbol1,
      isReserve:isReserve
    }
  
    return callback(null, result)
  }
  
  _getMyAllLiquidityFirest = async (callback) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const pool_address = store.getStore('pool_address')
    const router_address = store.getStore("router_address")
    const factory_address = store.getStore("factory_address")
  
    let bxhrouterContract = new web3.eth.Contract(config.BXHFactory, config.BXHFactoryRewardsAddress)
  
    var pools = await bxhrouterContract.methods.allPairsLength().call({ from: account.address });
  
    var pairs = []
  
    for (let i = 0; i < pools; i++) {
      var pool = await bxhrouterContract.methods.allPairs(i).call({ from: account.address });
  
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, pool)
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });  //我的令牌数量
  
      let amountReceice = _getValueDivided1(balance, 10 ** 18)
  
      if (amountReceice < 0.000000001) {
        continue
      }
  
      let pairContract = new web3.eth.Contract(config.BXHPairABI, pool)
  
      var token0 = await pairContract.methods.token0().call()//token0地址
      var token1 = await pairContract.methods.token1().call()//token1地址
  
  
      let erc20Contract0
      var symbol0
      let erc20Contract1
      var symbol1
      if (token0 < token1) {
        erc20Contract0 = new web3.eth.Contract(config.erc20ABI, token0)
        symbol0 = await erc20Contract0.methods.symbol().call();//token0 名字
  
        erc20Contract1 = new web3.eth.Contract(config.erc20ABI, token1)
        symbol1 = await erc20Contract1.methods.symbol().call(); //token1 名字
      } else {
        erc20Contract0 = new web3.eth.Contract(config.erc20ABI, token1)
        symbol0 = await erc20Contract0.methods.symbol().call();//token0 名字
  
        erc20Contract1 = new web3.eth.Contract(config.erc20ABI, token0)
        symbol1 = await erc20Contract1.methods.symbol().call(); //token1 名字
      }
  
  
      //token0精度
      let _Decimals0 = await this._getDecimals(token0)
      //token1精度
      let _Decimals1 = await this._getDecimals(token1)
      //lp token 精度
      let _lpDecimals = await this._getDecimals(pool)
  
  
      let erc20ContractRemoveLiquidity = new web3.eth.Contract(config.erc20ABI, pool) //token 地址
      var removeLiquidityAllowance = await erc20ContractRemoveLiquidity.methods.allowance(account.address, router_address).call({ from: account.address });
      var removeLiquidityAllowanceAmount = _getValueDivided1(removeLiquidityAllowance, 10 * 18)
      //id
      let id = await this._getIdByLpContractAddress(web3, account, pool, pool_address)
  
      //池中令牌总数
      var poolTotal = await erc20Contract.methods.totalSupply().call();
  
      //reverseA reverseB
      var reserveArr = await pairContract.methods.getReserves().call({ from: account.address });
  
      let poolItem = {}
  
      poolItem.symbol0ImgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png"
      poolItem.symbol0 = symbol0 === "WHT" ? "HT" : symbol0
      poolItem.symbol0Address = token0
      poolItem.decimals0 = _Decimals0
      poolItem.balance0 = 0
      poolItem.pool_address = pool_address
      poolItem.router_address = router_address
      poolItem.factory_address = factory_address
      poolItem.lptokenAddress = pool
      poolItem.symbol1 = symbol1 === "WHT" ? "HT" : symbol1
      poolItem.symbol1Address = token1
      poolItem.decimals1 = _Decimals1
      poolItem.balance1 = 0
      poolItem.symbol1imgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png"
      poolItem.symbolPair = symbol0 + "-" + symbol1
      poolItem.myLpAmount = amountReceice
      poolItem.id = id
  
      let lpZanbi = _getValueDivided1(balance, poolTotal)
      let lptoken0 = _getValuemultip1(lpZanbi, reserveArr._reserve0)
      let lptoken1 = _getValuemultip1(lpZanbi, reserveArr._reserve1)
      poolItem.lptotoken0Amount = _getValueDivided1(lptoken0, 10 ** _Decimals0)
      poolItem.lptotoken1Amount = _getValueDivided1(lptoken1, 10 ** _Decimals1)
      poolItem.lpzanbi = lpZanbi   //暂比
  
      poolItem.poolTotal = _getValueDivided1(poolTotal, 10 * 18)
      poolItem.reserveA = _getValueDivided1(reserveArr._reserve0, 10 ** _Decimals0)
      poolItem.reserveB = _getValueDivided1(reserveArr._reserve1, 10 ** _Decimals1)
      poolItem.selected = false
      // console.log(poolItem.symbolPair+" lp balance ===>>>>> ",balance)
      // console.log(poolItem.symbolPair+" lp ===>>>>> ",amountReceice)
  
      let bxhrouterContract1 = new web3.eth.Contract(config.BXHRouterRewardsABI, router_address)
      let amount = 1
      let amountToSend0 = _getValuemultip1(amount, 10 ** _Decimals0)
      let amountToSend1 = _getValuemultip1(amount, 10 ** _Decimals1)
      var count_nor = await bxhrouterContract1.methods.quote(amountToSend0, reserveArr._reserve0, reserveArr._reserve1).call({ from: account.address });
      var count_rever = await bxhrouterContract1.methods.quote(amountToSend1, reserveArr._reserve1, reserveArr._reserve0).call({ from: account.address });
      poolItem.count_nor = _getValueDivided1(count_nor, 10 ** _Decimals1)
      poolItem.count_rever = _getValueDivided1(count_rever, 10 ** _Decimals0)
      poolItem.removeLiquidityAllowanceAmount = removeLiquidityAllowanceAmount
  
      //(tokensData.mineLpAmount / tokensData.poolTotal) * tokensData.reserveA
      pairs.push(poolItem)
    }
    // console.log("获取到的我的资金池---->>>>>>>",pairs)
    callback(pairs)
  }
  
  _getMyAllLiquidity = async (callback) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const pool_address = store.getStore('pool_address')
    const router_address = store.getStore("router_address")
    const factory_address = store.getStore("factory_address")
  
    let bxhrouterContract = new web3.eth.Contract(config.BXHFactory, config.BXHFactoryRewardsAddress)
  
    var pools = await bxhrouterContract.methods.allPairsLength().call({ from: account.address });
    // console.log("allPairsLength--->>>>>",pools)
    var pairs = []
  
    for (let i = 0; i < pools; i++) {
      var pool = await bxhrouterContract.methods.allPairs(i).call({ from: account.address });
  
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, pool)
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });  //我的令牌数量
  
      let amountReceice = _getValueDivided1(balance, 10 ** 18)
  
      if (amountReceice < 0.0000000001) {
        continue
      }
  
      let pairContract = new web3.eth.Contract(config.BXHPairABI, pool)
  
      var token0 = await pairContract.methods.token0().call()//token0地址
      var token1 = await pairContract.methods.token1().call()//token1地址
  
      var token0Item = this.checkTokenListForAddress(token0)
      var token1Item = this.checkTokenListForAddress(token1)
  
      let erc20Contract0
      var symbol0
      let _Decimals0
      let erc20Contract1
      var symbol1
      let _Decimals1
  
      if (token0Item) {
        symbol0 = token0Item.symbol
        _Decimals0 = token0Item.decimals
      } else {
        erc20Contract0 = new web3.eth.Contract(config.erc20ABI, token0)
        symbol0 = await erc20Contract0.methods.symbol().call();//token0 名字
        //token0精度
        _Decimals0 = await this._getDecimals(token0)
      }
      // console.log("symbol0--->>>>>>",symbol0)
  
      if (token1Item) {
        symbol1 = token1Item.symbol
        _Decimals1 = token1Item.decimals
      } else {
        erc20Contract1 = new web3.eth.Contract(config.erc20ABI, token1)
        symbol1 = await erc20Contract1.methods.symbol().call(); //token1 名字
        //token1精度
        _Decimals1 = await this._getDecimals(token1)
      }
      // console.log("symbol1--->>>>>>",symbol1)
      // console.log("-------------------------------------")
  
      //lp token 精度
      let _lpDecimals = 18
  
      let poolItem = {}
      poolItem.symbol0ImgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol0 + ".png"
      poolItem.symbol0 = symbol0 === "WHT" ? "HT" : symbol0
      poolItem.symbol0Address = token0
      poolItem.decimals0 = _Decimals0
      poolItem.balance0 = 0
      poolItem.pool_address = pool_address
      poolItem.router_address = router_address
      poolItem.factory_address = factory_address
      poolItem.lptokenAddress = pool
      poolItem.symbol1 = symbol1 === "WHT" ? "HT" : symbol1
      poolItem.symbol1Address = token1
      poolItem.decimals1 = _Decimals1
      poolItem.balance1 = 0
      poolItem.symbol1imgURl = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/" + symbol1 + ".png"
      poolItem.symbolPair = symbol0 + "-" + symbol1
  
      //(tokensData.mineLpAmount / tokensData.poolTotal) * tokensData.reserveA
      pairs.push(poolItem)
    }
    // console.log("获取到的我的资金池---->>>>>>>",pairs)
    callback(pairs)
  }
  
  _getMyliquidityPoolbalance = async (poollist, callback) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const pool_address = store.getStore('pool_address')
    const router_address = store.getStore("router_address")
    const factory_address = store.getStore("factory_address")
  
    let pairs = []
    for (let i = 0; i < poollist.length; i++) {
      let poolItem = poollist[i]
      // console.log("poolItem--->>>>>>",poolItem)
      let pool = poolItem.lptokenAddress
      let _Decimals0 = poolItem.decimals0
      let _Decimals1 = poolItem.decimals1
  
      if (!_Decimals0 || _Decimals0 === undefined || _Decimals0 === NaN) {
        _Decimals0 = await this._getDecimals(poolItem.symbol0Address)
      }
  
      if (!_Decimals1 || _Decimals1 === undefined || _Decimals1 === NaN) {
        _Decimals1 = await this._getDecimals(poolItem.symbol1Address)
      }
  
      // console.log("_Decimals0--->>>>>",_Decimals0)
      // console.log("_Decimals1--->>>>>",_Decimals1)
  
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, pool)
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });  //我的令牌数量
  
      let amountReceice = _getValueDivided1(balance, 10 ** 18)
  
      if (amountReceice < 0.0000000001) {
        continue
      }
  
      let pairContract = new web3.eth.Contract(config.BXHPairABI, pool)
  
      let erc20ContractRemoveLiquidity = new web3.eth.Contract(config.erc20ABI, pool) //token 地址 
      var removeLiquidityAllowance = await erc20ContractRemoveLiquidity.methods.allowance(account.address, router_address).call({ from: account.address });//可
      var removeLiquidityAllowanceAmount = _getValueDivided1(removeLiquidityAllowance, 10 * 18)
      //id
      let id = await this._getIdByLpContractAddress(web3, account, pool, pool_address)//可
      poolItem.id = id
  
      //池中令牌总数
      var poolTotal = await erc20Contract.methods.totalSupply().call();//可
  
      //reverseA reverseB
      var reserveArr = await pairContract.methods.getReserves().call({ from: account.address });
      // console.log("reserveArr--->>>>>",reserveArr)
  
      let lpZanbi = _getValueDivided1(balance, poolTotal)
      let lptoken0 = _getValuemultip1(lpZanbi, reserveArr._reserve0)
      let lptoken1 = _getValuemultip1(lpZanbi, reserveArr._reserve1)
      poolItem.myLpAmount = amountReceice//令牌数量
      poolItem.lptotoken0Amount = _getValueDivided1(lptoken0, 10 ** _Decimals0) //令牌可以兑换的token0的数量
      poolItem.lptotoken1Amount = _getValueDivided1(lptoken1, 10 ** _Decimals1) //令牌可以兑换的token1的数量
      poolItem.lpzanbi = lpZanbi   //暂比
  
      poolItem.poolTotal = _getValueDivided1(poolTotal, 10 * 18)
      poolItem.reserveA = _getValueDivided1(reserveArr._reserve0, 10 ** _Decimals0)
      poolItem.reserveB = _getValueDivided1(reserveArr._reserve1, 10 ** _Decimals1)
      let isSelected = poolItem.selected
      poolItem.selected = isSelected
      // console.log(poolItem.symbolPair+" lp balance ===>>>>> ",balance)
      // console.log(poolItem.symbolPair+" lp ===>>>>> ",amountReceice)
  
      let bxhrouterContract1 = new web3.eth.Contract(config.BXHRouterRewardsABI, router_address)
      let amount = 1
      let amountToSend0 = _getValuemultip1(amount, 10 ** _Decimals0)
      let amountToSend1 = _getValuemultip1(amount, 10 ** _Decimals1)
      // console.log("amountToSend1--->>>>>>>>",amountToSend1)
      var count_nor = await bxhrouterContract1.methods.quote(amountToSend0, reserveArr._reserve0, reserveArr._reserve1).call({ from: account.address });
      var count_rever = await bxhrouterContract1.methods.quote(amountToSend1, reserveArr._reserve1, reserveArr._reserve0).call({ from: account.address });
      poolItem.count_nor = _getValueDivided1(count_nor, 10 ** _Decimals1)
      poolItem.count_rever = _getValueDivided1(count_rever, 10 ** _Decimals0)
      poolItem.removeLiquidityAllowanceAmount = removeLiquidityAllowanceAmount
  
      pairs.push(poolItem)
    }
    callback(pairs)
  }
  
  checkTokenListForAddress = (address) => {
    if (!store.getStore('TokenList_Local')) {
      return null
    }
    let token_list = store.getStore('TokenList_Local')
    for (let i = 0; i < token_list.length; i++) {
      var item = token_list[i];
      if ((item.token_address).toUpperCase() === (address).toUpperCase()) {
        return item
      }
    }
  }
  
  // BXH end
  
  
  _checkApproval = async (asset, account, amount, contract, callback) => {
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);
  
      const erc20Contract = new web3.eth.Contract(asset.abi, asset.address)
      const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })
  
      const ethAllowance = web3.utils.fromWei(allowance, "ether")
  
      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei("10000000", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        callback()
      } else {
        callback()
      }
    } catch (error) {
      console.log(error)
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }
  
  _checkApprovalWaitForConfirmation = async (asset, account, amount, contract, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })
  
    const ethAllowance = web3.utils.fromWei(allowance, "ether")
  
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      erc20Contract.methods.approve(contract, web3.utils.toWei("10000000", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          callback()
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    } else {
      callback()
    }
  }
  
  approveBXHRemoveLiquidity = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'//测试授权
  
    this._callAppRemoveLiquidity(asset, account, amount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(BXHALLOWANCEREMOVELIQUIDITY_RETURNED, res)
    })
  }
  
  _callAppRemoveLiquidity = async (asset, account, amount, pair, callback) => {
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, pair.lptokenAddress)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    // }
  
    yCurveFiContract.methods.approve(pair.router_address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  approveBXH = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, msgContent } = payload.content
    let amount = '100000000000000000000000000000000'//授权
    // ETH链UNI授权判断
    // UNI合约地址：0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984
    if(pair && (pair.symbol0Address === "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" || pair.symbol0Address === "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984")){
      amount = '1000000000'
    }else{
      amount = '100000000000000000000000000000000'
    }
  
    this._callApprovalBXH(asset, account, amount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      this._refreshCookieData(res, account, msgContent)
  
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(APPROVEDFK_RETURNED, res)
  
    })
  }
  _callApprovalBXH = async (asset, account, amount, pair, callback) => {
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, pair.symbol0Address)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    // }
    // console.log("amountToSend---->>>>>>>>",amountToSend)
    yCurveFiContract.methods.approve(pair.router_address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  
  approveBXH1 = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'//测试授权
    //console.log("pair---->>>>>",pair)
    this._callApprovalBXH1(asset, account, amount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
  
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(APPROVEDFK_RETURNED, res)
    })
  }
  _callApprovalBXH1 = async (asset, account, amount, pair, callback) => {
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, pair.symbol1Address)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    // }
  
    // console.log("amountToSend---->>>>>>>>",amountToSend)
    //console.log("pair.symbol1Address----->>>>>>",pair.symbol1Address)
    //console.log("pair.router_address----->>>>>>",pair.router_address)
    //console.log("account.address----->>>>>>",account.address)
    yCurveFiContract.methods.approve(pair.router_address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  removeLiquidityBXH = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, senddata, msgContent } = payload.content
    const amount = senddata.amount
  
    this._callRemoveLiQuidityBXH(asset, account, amount, pair, senddata, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      this._refreshCookieData(res, account, msgContent)
      this.updateMyLiquidityPool()
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(BXHREMOVELIQUIDITY_RETURNED, res)
    })
  }
  _callRemoveLiQuidityBXH = async (asset, account, amount, pair, senddata, callback) => {
    // console.log("senddata--->>>>>",senddata)
    // console.log("amount--->>>>>",amount)
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
  
    const yCurveFiContract = new web3.eth.Contract(config.BXHRouterRewardsABI, pair.router_address)
  
    var amountToSend = this._getValueDecimals(amount, asset.decimals)
    var amountAMin = "0"
    var amountBMin = "0"
    if (asset.decimals != 18) {
      amountToSend = this._getValueDecimals(amount, asset.decimals)//(amount * 10 ** asset.decimals).toFixed(0);
    }
  
    let bg1 = new BigNumber(amountToSend)
  
    if (bg1.minus(asset.oldBalance).toFixed() > 0) {
      amountToSend = asset.oldBalance
    } else {
    }
  
    const getBlockArray = await this._getGetBlock()
    const timestamp = getBlockArray.timestamp + 60

    let isToken0TypeIsOne = this.checkCurrentTokenTypeIsOne(pair.symbol0Address)
    let isToken1TypeIsOne = this.checkCurrentTokenTypeIsOne(pair.symbol1Address)
  
    if (pair.symbol1 !== "HT" && pair.symbol0 !== "HT") {
      yCurveFiContract.methods.removeLiquidity(pair.symbol0Address, pair.symbol1Address, amountToSend, amountAMin, amountBMin, account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: BXHREMOVELIQUIDITY_RETURNED, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
          receipt.isHideDialog = true
          callback(null, receipt)
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    } else {
      var tokenAddress = ""
      // var amountToSend = web3.utils.toWei(amount, "ether")
      // if (asset.decimals != 18) {
      //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
      // }
  
      var amountToken = 0
      var amountTokenMin = 0
      var amountETHMin = 0
      var htcount = 0
  
      // if (pair.symbol0 === "HT") {
      //   tokenAddress = pair.symbol1Address
      //   tokenAmount = senddata.amountBDesired * (10**pair.decimals1)
      //   amountTokenMin = senddata.amountBMin * (10**pair.decimals1)
      //   amountETHMin = senddata.amountAMin * (10**pair.decimals1)
      //   htcount = senddata.amountADesired
      // } else {
      //   tokenAddress = pair.symbol0Address
      //   tokenAmount = senddata.amountADesired * (10**pair.decimals0)
      //   amountTokenMin = senddata.amountAMin * (10**pair.decimals0)
      //   amountETHMin = senddata.amountBMin * (10**pair.decimals0)
      //   htcount = senddata.amountBDesired
      // }
  
      if (pair.symbol0 === "HT") {
        tokenAddress = pair.symbol1Address
        amountToken = this._getValueDecimals(senddata.amountBDesired, pair.decimals1)//senddata.amountBDesired * (10 ** pair.decimals1)
        amountTokenMin = "1"
        amountETHMin = "1"
        // htcount = senddata.amountADesired
      } else {
        tokenAddress = pair.symbol0Address
        amountToken = this._getValueDecimals(senddata.amountADesired, pair.decimals0)//senddata.amountADesired * (10 ** pair.decimals0)
        amountTokenMin = "1"
        amountETHMin = "1"
        // htcount = senddata.amountBDesired
      }
  
      // console.log("tokenAddress----->>>>>>>" ,tokenAddress)
      // console.log("amountTokenMin---->>>>>", amountTokenMin)
      // console.log("amountETHMin--->>>>>", amountETHMin)
      // console.log("htcount--->>>>>", htcount)
      // console.log("timestamp----->>>>",timestamp)
  
      if (isToken0TypeIsOne || isToken1TypeIsOne) {
        // console.log("1")
        // console.log("tokenAddress--->>>>>",tokenAddress)
        // console.log("amountToSend-->>>>",amountToSend)
        // console.log("amountTokenMin---->>>>>>",amountTokenMin)
        // console.log("amountETHMin---->>>>>>",amountETHMin)
        // console.log("timestamp---->>>>>>",timestamp)
        // yCurveFiContract.methods.removeLiquidityHTSupportingFeeOnTransferTokens(tokenAddress, amountToSend.toString(), amountTokenMin.toString(), amountETHMin.toString(), account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        // .on('transactionHash', function (hash) {
        //   // console.log(hash)
        //   callback(null, hash)
        // })
        // .on('confirmation', function (confirmationNumber, receipt) {
        //   // console.log(confirmationNumber, receipt);
        //   if (confirmationNumber == 2) {
        //     dispatcher.dispatch({ type: BXHREMOVELIQUIDITY_RETURNED, content: {} })
        //   }
        // })
        // .on('receipt', function (receipt) {
        //   // console.log(receipt);
        //   receipt.isHideDialog = true
        //   callback(null, receipt)
        // })
        // .on('error', function (error) {
        //   if (!error.toString().includes("-32601")) {
        //     if (error.message) {
        //       return callback(error.message)
        //     }
        //     callback(error)
        //   }
        // })
        // .catch((error) => {
        //   if (!error.toString().includes("-32601")) {
        //     if (error.message) {
        //       return callback(error.message)
        //     }
        //     callback(error)
        //   }
        // })
        yCurveFiContract.methods.removeLiquidity(pair.symbol0Address, pair.symbol1Address, amountToSend, amountTokenMin, amountETHMin, account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: BXHREMOVELIQUIDITY_RETURNED, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
          receipt.isHideDialog = true
          callback(null, receipt)
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
      }else{
        // console.log("2")
        yCurveFiContract.methods.removeLiquidityHT(tokenAddress, amountToSend.toString(), amountTokenMin.toString(), amountETHMin.toString(), account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: BXHREMOVELIQUIDITY_RETURNED, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
          receipt.isHideDialog = true
          callback(null, receipt)
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
      }
    }
  }
  
  addLiquidityBXH = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, senddata } = payload.content
    const amount = '10000000'
  
    this._callAddLiQuidityBXH(asset, account, amount, pair, senddata, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, senddata.msgContent)
      this.updateMyLiquidityPool()
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(BXHADDLIQUIDITY_RETURNED, res)
    })
  }
  _callAddLiQuidityBXH = async (asset, account, amount, pair, senddata, callback) => {
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
  
    const yCurveFiContract = new web3.eth.Contract(config.BXHRouterRewardsABI, pair.router_address)
  
    // var amountToSend = web3.utils.toWei(amount.toString(), "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    // }
    //min   *0.995
    const getBlockArray = await this._getGetBlock()
    const timestamp = getBlockArray.timestamp + 60
  
    // console.log("senddata.amountADesired--->>>>>",senddata.amountADesired)
    let amountADesired = this._getValueDecimals(senddata.amountADesired, pair.decimals0)//(parseFloat(senddata.amountADesired) * 10 ** pair.decimals0).toFixed(0)
    // console.log("senddata.amountADesired--->>>>>",amountADesired)
    let amountBDesired = this._getValueDecimals(senddata.amountBDesired, pair.decimals1)
    let minA_no = this._getValueDecimals2(senddata.amountADesired, 0.6)//(parseFloat(senddata.amountADesired)) * 0.5
    let minB_no = this._getValueDecimals2(senddata.amountBDesired, 0.6)//(parseFloat(senddata.amountBDesired)) * 0.5
    let amountAMin = '0'//((parseFloat(senddata.amountADesired) * 0.995) * 10 * pair.decimals0).toFixed(0)
    let amountBMin = '0'//((parseFloat(senddata.amountBDesired) * 0.995) * 10 * pair.decimals1).toFixed(0)
  
    let msgContent = senddata.msgContent
    let isOut = senddata.isOut
  
    // console.log('amountADesired--->>>>>>',amountADesired)
    // console.log('amountBDesired--->>>>>>',amountBDesired)
    // console.log('minA_no--->>>>>>',minA_no)
    // console.log('minB_no--->>>>>>',minB_no)
    // console.log('amountAMin--->>>>>>',amountAMin)
    // console.log('amountBMin--->>>>>>',amountBMin)
    // console.log('pair.symbol0Address--->>>>>>',pair.symbol0Address)
    // console.log('pair.symbol1Address--->>>>>>',pair.symbol1Address)
  
    if (pair.symbol1 !== "HT" && pair.symbol0 !== "HT") {
      yCurveFiContract.methods.addLiquidity(pair.symbol0Address, pair.symbol1Address, amountADesired.toString(), amountBDesired.toString(), amountAMin.toString(), amountBMin.toString(), account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          // console.log("transactionHash ---->>>>>> ",hash)
  
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          // if(confirmationNumber == 2) {
          //   dispatcher.dispatch({ type: BXHADDLIQUIDITY_RETURNED, content: {} })
          // }
          // console.log("confirmation------>>>>>>>",receipt)
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
          receipt.isHideDialog = true
          receipt.msgContent = msgContent
          receipt.isOut = isOut
  
          callback(null, receipt)
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    } else {
  
      // let amountADesired = await this._getValueDecimals(senddata.amountADesired, pair.decimals0)
      // let amountBDesired = await this._getValueDecimals(senddata.amountBDesired, pair.decimals1)
      // let minA_no =  (parseFloat(senddata.amountADesired))* 0.5
      // let minB_no = (parseFloat(senddata.amountBDesired))* 0.5
      // let amountAMin =  await this._getValueDecimals(minA_no, pair.decimals0)
      // let amountBMin = await this._getValueDecimals(minB_no, pair.decimals1)
  
      var tokenAddress = ""
      var tokenAmount = 0
      var amountTokenMin = ""
      var amountETHMin = ""
      var htcount = 0
      if (pair.symbol0 === "HT") {
        tokenAddress = pair.symbol1Address
        tokenAmount = this._getValueDecimals(senddata.amountBDesired, pair.decimals1)
        amountTokenMin = 0
        amountETHMin = 0
        htcount = _getValuemultip(senddata.amountADesired,1,15)
      } else {
        tokenAddress = pair.symbol0Address
        tokenAmount = this._getValueDecimals(senddata.amountADesired, pair.decimals0)
        amountTokenMin = 0
        amountETHMin = 0
        htcount = _getValuemultip(senddata.amountBDesired,1,15)
      }
  
      // console.log("tokenAmount---->>>>>>>",tokenAmount)
      // console.log("amountTokenMin---->>>>>>>",amountTokenMin)
      // console.log("amountETHMin---->>>>>>>",amountETHMin)
      // console.log("htcount---->>>>>>>",htcount)
  
  
      yCurveFiContract.methods.addLiquidityHT(tokenAddress, tokenAmount.toString(), amountTokenMin.toString(), amountETHMin.toString(), account.address, timestamp).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: web3.utils.toWei(htcount.toString(), 'ether') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: BXHADDLIQUIDITY_RETURNED, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    }
  }
  // 获取区块链当前时间戳
  _getGetBlock = async () => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    try {
      const getBlock = web3.eth.getBlock('latest')
      return getBlock
    } catch (e) {
      console.log(e)
    }
  }
 
  checkCurrentIsDaoOperation = (id) => {
    let token_list = store.getStore('tokenList_centerData')
 
    if (token_list && token_list !== null) {
      for(let i = 0;i<token_list.length;i++){
        let item = token_list[i]
 
        if (parseFloat(item.id) === parseFloat(id) && item.pool_type === 2) {
          return true
        }
      }
 
      return false
    }
  }
  getDAOContractByID = (id) => {
    let token_list = store.getStore('tokenList_centerData')
    // console.log("token_list--->>>>>",token_list)
    if (token_list && token_list !== null) {
      for(let i = 0;i<token_list.length;i++){
        let item = token_list[i]
 
        if (parseFloat(item.id) === parseFloat(id) && item.pool_type === 2) {
          return item
        }
      }
 
      return null
    }
  }
  
  // 授权
  approveDFK = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'//测试授权
  
    this._callAppROVEDFK(asset, account, amount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      this._refreshCookieData(res, account, msgContent)
  
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(APPROVEDFK_RETURNED, res)
    })
  }
  
  // 授权方法
  _callAppROVEDFK = async (asset, account, amount, pair, callback) => {
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, pair.lptokenAddress)
  
    var amountToSend = this._getValueDecimals(amount, 18)//web3.utils.toWei(amount, "ether")
    // if (asset.decimals != 18) {
    //   amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    // }
    let isDAOOperation = this.checkCurrentIsDaoOperation(pair.id_centerdata)
    yCurveFiContract.methods.approve(isDAOOperation?pair.dao_address:pair.pool_address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  getAirDrop = (payload) => {
    const account = store.getStore('account')
    const { airDropContractAddress, msgContent } = payload.content
    this._callAirDrop(account, airDropContractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
  
      return emitter.emit(BXHGETAIRDROP_RETURNED, res)
    })
  }
  _callAirDrop = async (account, airDropContractAddress, callback) => {
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(config.BXHAirDropABI, airDropContractAddress)
  
    yCurveFiContract.methods.requestWithdraw().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 抵押代币
  stakeDFK = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, amount, msgContent, oldAmount } = payload.content
    this._callStakeBXH(asset, account, amount, oldAmount, pair, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._refreshCookieData(res, account, msgContent)
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      this._getMineStakedPool((stakedList) => {
        localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
        store.setStore({ StakedPoolList: stakedList })
      })
      
      return emitter.emit(STAKEDFK_RETURNED, res)
    })
  }
  
  _callStakeBXH = async (asset, account, amount, oldamount, pair, callback) => {
    // amount = 0.101

    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
 
    let isDAOOperation = this.checkCurrentIsDaoOperation(pair.id_centerdata)
    let yCurveFiContract = null
    if (!isDAOOperation) { //正常
      yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pair.pool_address)
    }else{ //操作DAO
      yCurveFiContract = new web3.eth.Contract(config.BXHDaoABI, pair.dao_address)
    }
     
    let _Decimals = await this._getDecimals(pair.lptokenAddress)
    var amountToSend = this._getValueDecimals(amount, _Decimals)//web3.utils.toWei(amount.toString(), "ether")
    // if (_Decimals != 18) {
    //   amountToSend = (amount * 10 ** _Decimals).toFixed(0);
    // }
    if (amountToSend > asset.oldBalance) {
      amountToSend = asset.oldBalance
    }
    console.log("amountToSend--->>>>>",amountToSend)
    yCurveFiContract.methods.deposit(pair.id, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  
  }
  
  // 存入流动性（代币）方法
  _callStakeDFK = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
  
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }
  
    // console.log("抵押代币 ====>>>>>",amountToSend)
    yCurveFiContract.methods.addLiquid(asset.address, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 领取收益
  getRewardDFK = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content
  
    this._callGetRewardDFK(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(GETDFK_REWARDS_RETURNED, res)
    })
  }
  
  // 领取收益方法
  _callGetRewardDFK = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(asset.dtrademinerABI, asset.dtrademine)
  
    yCurveFiContract.methods.withdrawBonus().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 转出（流动性）
  exitDFK = (payload) => {
    const account = store.getStore('account')
    const { asset, pair, amount, msgContent, oldamount } = payload.content
  
    this._callExitBXH(asset, account, pair, amount, oldamount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      this._getMineStakedPool((stakedList) => {
        localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
        store.setStore({ StakedPoolList: stakedList })
      })
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      return emitter.emit(EXITDFK_RETURNED, res)
    })
  }
  
  // 转出（流动性）方法
  _callExitBXH = async (asset, account, pair, amount, oldamount, callback) => {
  
    asset = asset[0].tokens[0]
    const web3 = new Web3(store.getStore('web3context').library.provider);
    this._clearCookieData(account)
 
    let isDAOOperation = this.checkCurrentIsDaoOperation(pair.id_centerdata)
    let yCurveFiContract = null
    if (!isDAOOperation) {
      yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pair.pool_address)
    }else{
      yCurveFiContract = new web3.eth.Contract(config.BXHDaoABI, pair.dao_address)
    }
 
    // const yCurveFiContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pair.pool_address)
  
    let _Decimals = await this._getDecimals(pair.lptokenAddress)
    console.log("amount--->>>>>",amount)
  
    var amountToSend = this._getValueDecimals(amount, _Decimals)//web3.utils.toWei(amount.toString(), "ether")
    // if (_Decimals != 18) {
    //   amountToSend = (amount * 10 ** _Decimals).toFixed(0);
    // }
 
    if (amountToSend > asset.userInfo.oldamount) {
      amountToSend = asset.userInfo.oldamount
    }
 
    yCurveFiContract.methods.withdraw(pair.id, amountToSend).send({ from: account.address })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  //-----------------------------------------------------------------------------------------------------
  
  
  // 授权方法
  approveUSDTDFK = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content
    const amount = '10000000'
  
    this._callAppROVEUSDTDFK(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(APPUSDTROVEDFK_RETURNED, res)
    })
  }
  
  // 授权方法
  _callAppROVEUSDTDFK = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.address)
  
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }
  
    yCurveFiContract.methods.approve(asset.rewardsAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 授权方法
  approveSellDFK = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content
    const amount = '10000000'
  
    this._callAppROVESELLDFK(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(APPSELLROVEDFK_RETURNED, res)
    })
  }
  
  // 授权方法
  _callAppROVESELLDFK = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.address1)
  
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }
  
    yCurveFiContract.methods.approve(asset.rewardsAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 存入
  getUSDTDFKStake = (payload) => {
    const account = store.getStore('account')
    const { asset, amount } = payload.content
    this._callOntStakeDFK(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(STAKEDFKUSDT_RETURNED, res)
    })
  }
  
  // 存入方法
  _callOntStakeDFK = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
  
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)
    var pooldecimals = await erc20Contract.methods.decimals().call({ from: asset.address });
  
    var amountToSend
    // 查询当前交易对的精度
    if (asset.address == "0x0000000000000000000000000000000000000000") {
      amountToSend = web3.utils.toWei(amount, "ether")
    } else {
      if (pooldecimals != 18) {
        amountToSend = (amount * 10 ** pooldecimals).toFixed(0);
      } else {
        amountToSend = web3.utils.toWei(amount, "ether")
      }
    }
  
    if (asset.address1 == "0x0000000000000000000000000000000000000000") {
      amountToSend = web3.utils.toWei(amount, "ether")
    } else {
  
      if (pooldecimals != 18) {
        amountToSend = (amount * 10 ** pooldecimals).toFixed(0);
      } else {
        amountToSend = web3.utils.toWei(amount, "ether")
      }
    }
  
    if (asset.address == "0x0000000000000000000000000000000000000000" || asset.address1 == "0x0000000000000000000000000000000000000000") {
  
      yCurveFiContract.methods.addLiquid(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: GET_BALANCES, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
  
    } else {
  
      yCurveFiContract.methods.addLiquid(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: GET_BALANCES, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
  
    }
  }
  
  // 转出
  exitUSDTDFK = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content
  
    this._callExitUSDTDFK(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(EXITUSDTDFK_RETURNED, res)
    })
  }
  
  // 转出方法
  _callExitUSDTDFK = async (asset, account, callback) => {
  
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
  
    yCurveFiContract.methods.removeLiquid(asset.stakedExitBalance).send({ from: account.address })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // 根据Token获取精度
  _getDecimals = async (address) => {
    if (!address || address === "" || address === "0x0000000000000000000000000000000000000000") {
      return 0;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
    try {
      const decimals = await erc20Contract.methods.decimals().call({ from: address });
      return decimals*1;
    } catch (e) {
      console.log(e)
      return 18;
    }
  }
  
  // 交易-买、卖
  getStakeUSDTDFK = (payload) => {
    const account = store.getStore('account')
    const { asset, amount, type } = payload.content
    this._callStakeUSDTDFK(asset, account, amount, type, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(STAKEUSDTDFK_RETURNED, res)
    })
  }
  
  _callStakeUSDTDFK = async (asset, account, amount, type, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    var amountToSend, amountToSend1
    //token0 decimals
    if (asset.address == "0x0000000000000000000000000000000000000000") {
      amountToSend = web3.utils.toWei(amount, "ether")
    }
    else {
      // 查询当前交易对的精度(买)
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)
      var pooldecimals = await erc20Contract.methods.decimals().call({ from: asset.address });
      if (pooldecimals != 18) {
        amountToSend = (amount * 10 ** pooldecimals).toFixed(0);
      } else {
        amountToSend = web3.utils.toWei(amount, "ether")
      }
    }
  
    //token1 decimals
    if (asset.address1 == "0x0000000000000000000000000000000000000000") {
      amountToSend1 = web3.utils.toWei(amount, "ether")
    }
    else {
      // 查询当前交易对的精度(卖)
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address1)
      var pooldecimals1 = await erc20Contract.methods.decimals().call({ from: asset.address1 });
      if (pooldecimals1 != 18) {
        amountToSend1 = (amount * 10 ** pooldecimals1).toFixed(0);
      } else {
        amountToSend1 = web3.utils.toWei(amount, "ether")
      }
    }
  
    let parameterOne, parameterTwo
    if (type == "Buy") {  // 买
      parameterOne = amountToSend
      parameterTwo = 0
    } else { // 卖
      parameterOne = 0
      parameterTwo = amountToSend1
    }
  
  
    if (asset.address == "0x0000000000000000000000000000000000000000") {
  
      const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
      yCurveFiContract.methods.swap(parameterOne, parameterTwo, false).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: GET_BALANCES, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
  
      return false
    }
  
  
    if (asset.address1 == "0x0000000000000000000000000000000000000000") {
  
      const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
      yCurveFiContract.methods.swap(parameterOne, parameterTwo, false).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', function (hash) {
          // console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          // console.log(confirmationNumber, receipt);
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: GET_BALANCES, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          // console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
  
      return false
    }
  
    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
    yCurveFiContract.methods.swap(parameterOne, parameterTwo, false).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  
  
  //-----------------------------------------------------------------------------------------------------
  
  
  _getRemoveLiquidityAllowance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress) //lp地址
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, asset.router_address).call({ from: account.address });
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
  
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }
  
  _getPoolFeeCount = async (web3, asset, account, callback) => {
  
    try {
  
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.symbol0Address)
      var balance0 = await erc20Contract.methods.balanceOf(asset.lptokenAddress).call({ from: asset.lptokenAddress });
      balance0 = parseFloat(balance0) / 10 ** asset.decimals0
      // console.log("balance0---->>>>>",balance0)
  
      let erc20Contract1 = new web3.eth.Contract(config.erc20ABI, asset.symbol1Address)
      var balance1 = await erc20Contract1.methods.balanceOf(asset.lptokenAddress).call({ from: asset.lptokenAddress });
      balance1 = parseFloat(balance1) / 10 ** asset.decimals1
      // console.log("balance1---->>>>>",balance1)
  
      let bxhfactoryContract = new web3.eth.Contract(config.BXHPairABI, asset.lptokenAddress)
      var reserveArr = await bxhfactoryContract.methods.getReserves().call({ from: account.address });
      // console.log("reserveArr---->>>>>",reserveArr)
  
      let reserve0 = parseFloat(reserveArr._reserve0) / 10 ** asset.decimals0
      let reserve1 = parseFloat(reserveArr._reserve1) / 10 ** asset.decimals1
  
      let fee0 = balance0 - reserve0
      let fee1 = balance1 - reserve1
  
      let feeData = {
        fee0: fee0,
        fee1: fee1
      }
  
      callback(null, feeData)
    } catch (ex) {
      return callback(ex)
    }
  
  }
  
  _getAlloWance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.lptokenAddress) //lp地址
 
    let isDAOOperation = this.checkCurrentIsDaoOperation(asset.id_centerdata)
    // console.log("isDAOOperation--->>>>>>",isDAOOperation)
    // console.log("asset.id_centerdata--->>>>>",asset.id_centerdata)
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, isDAOOperation?asset.dao_address:asset.pool_address).call({ from: account.address }); //abi地址
 
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }
  
  _getAllowanceCount = async (constructorAddress, paramsAddress, amount, decimals, callback) => {
    try {
  
      const web3 = new Web3(store.getStore('web3context').library.provider);
  
      const account = store.getStore('account')
  
      let erc20Contract = new web3.eth.Contract(config.erc20ABI, constructorAddress)
  
      var alloWance = await erc20Contract.methods.allowance(account.address, paramsAddress).call({ from: account.address });
  
      // var needAllowance = this._getValueDecimals(amount,decimals)
  
      let decimalstotal = 10 ** decimals
      let params1 = new BigNumber(amount)
      let needAllowance = params1.multipliedBy(decimalstotal).toFixed(0)
  
      var allow_decimals = this._getValueDivided(alloWance, 10 ** decimals)
  
      let isEnough = true
      let bg1 = new BigNumber(alloWance)
  
      if (bg1.minus(needAllowance).toFixed() > 0) {
        isEnough = true
      } else {
        isEnough = false
      }
      if (constructorAddress.toUpperCase() === "0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f".toUpperCase()) {
        isEnough = true
        allow_decimals = 100000000000000
      }
      callback({ isEnough: isEnough, allow_decimals: allow_decimals, constructorAddress: constructorAddress })
    } catch (ex) {
      return callback(ex)
    }
  
  }
  _getBXHSTAKEAlloWance0 = async (web3, asset, account, callback) => {
    if (!asset.symbol0Address || asset.symbol0Address === "" || !asset.router_address) { return callback(null, '1'); }
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.symbol0Address) //token 地址
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, asset.router_address).call({ from: account.address }); //router abi地址
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
      if (asset.symbol0 == 'HT') {
        alloWance = '10000000'
      }
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }
  _getBXHSTAKEAlloWance1 = async (web3, asset, account, callback) => {
    if (!asset.symbol1Address || asset.symbol1Address === "" || !asset.router_address) { return callback(null, '1'); }
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.symbol1Address) //token 地址
    try {
      var alloWance = await erc20Contract.methods.allowance(account.address, asset.router_address).call({ from: account.address }); //router abi地址
      alloWance = parseFloat(alloWance) / 10 ** asset.decimals0
      if (asset.symbol1 == 'HT') {
        alloWance = '10000000'
      }
      callback(null, parseFloat(alloWance))
    } catch (ex) {
      return callback(ex)
    }
  }
  _getMineStakedPool = async (callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account')
    let pool_address = store.getStore('pool_address')

    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    if(chainId === '56'){
      pool_address = store.getStore('pool_address_BSC')
    }else if(chainId === '66'){
      pool_address = store.getStore('pool_address_OKEX')
    }else if(chainId === '1'){
      pool_address = store.getStore('pool_address_ETH')
    }else if(chainId === '43114'){
      pool_address = store.getStore('pool_address_AVAX')
    }else{
      pool_address = store.getStore('pool_address')
    }
    
    let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
    let mineStakedPool = []
    for (let i = 0; i < poolLength; i++) {
      var userInfo = await HepoolContract.methods.userInfo(i, account.address).call({ from: account.address });
      userInfo.id = i

      let amount = this._getValueDivided2(userInfo.amount, 10 ** 18)//await this._getToolNumber(parseFloat(userInfo.amount) / 10 ** 18)
      if (amount > 0) {
        mineStakedPool.push(userInfo)
      }
    }
  
    return callback(mineStakedPool)
  }

  _getMineStakedPoolRegular = async (callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account')
    let pool_address = store.getStore('pool_address_regular')
    
    let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
    let mineStakedPool = []
    for (let i = 0; i < poolLength; i++) {
      var userInfo = await HepoolContract.methods.userInfo(i, account.address).call({ from: account.address });
      userInfo.id = i

      let amount = this._getValueDivided2(userInfo.amount, 10 ** 18)//await this._getToolNumber(parseFloat(userInfo.amount) / 10 ** 18)
      if (amount > 0) {
        mineStakedPool.push(userInfo)
      }
    }
  
    return callback(mineStakedPool)
  }

  _getSingleStakedPool = async (farmsListArr, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account')
    let pool_address = store.getStore('pool_address')

    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    if(chainId === '56'){
      // let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, '0x30c6e1a43e4a93bab7fd15c5b55a753342e10207')
      let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, farmsListArr&&farmsListArr['contractAddress'])
      var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
      let mineStakedPool = []
      for (let i = 0; i < poolLength; i++) {
        var userInfo = await HepoolContract.methods.userInfo(i, account.address).call({ from: account.address });
        userInfo.id = i

        let amount = this._getValueDivided2(userInfo.amount, 10 ** 18)
        if (amount > 0) {
          mineStakedPool.push(userInfo)
        }
      }

      return callback(mineStakedPool)
    }
  }

  _getStakeBXHUserInfo = async (web3, asset, tokenPair, account, callback) => {
    // const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" ||tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000" || !asset.pool_address || asset.pool_address === "") {
      return callback(null, "")
    }
    let id
    if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
      id = tokenPair.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
    }

    let isDAOOperation = this.checkCurrentIsDaoOperation(asset.id_centerdata)
    let HepoolContract = null
    if (!isDAOOperation) {
      HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
    }else{
      HepoolContract = new web3.eth.Contract(config.BXHDaoABI, asset.dao_address)
    }
    // var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
    // console.log("")
    try {
      var userInfo = await HepoolContract.methods.userInfo(id, account.address).call({ from: account.address });
      // let _Decimals = asset.decimals0 ? asset.decimals0 : 18
      let _Decimals = 18
      let amount = await this._getValueDivided1(userInfo.amount , 10 ** _Decimals)//this._getValueDivided(userInfo.amount,10 ** _Decimals)
      let multLpRewardDebt = this._getValueDivided(userInfo.multLpRewardDebt, 10 ** _Decimals)//await this._getToolNumber(parseFloat(userInfo.multLpRewardDebt) / 10 ** _Decimals)
      let rewardDebt = this._getValueDivided(userInfo.rewardDebt, 10 ** _Decimals)//await this._getToolNumber(parseFloat(userInfo.rewardDebt) / 10 ** _Decimals)
  
      userInfo = {
        amount: amount,
        multLpRewardDebt: multLpRewardDebt,
        rewardDebt: rewardDebt,
        oldamount: userInfo.amount
      }
      callback(null, userInfo)
    } catch (ex) {
      return callback(ex)
    }
  }
  _getAllBXHUserInfo = async (web3, asset, tokenPair, account, callback) => {
    console.log(tokenPair);
    // const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" ||tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000" || !asset.pool_address || asset.pool_address === "") {
      return callback(null, "")
    }
    let id
    if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
      id = tokenPair.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
    }

    let isDAOOperation = this.checkCurrentIsDaoOperation(asset.id_centerdata)
    let HepoolContract = null
    if (!isDAOOperation) {
      HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
    }else{
      HepoolContract = new web3.eth.Contract(config.BXHDaoABI, asset.dao_address)
    }
    // var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
    // console.log("",asset.pool_addressx)
    try {
      var userInfo = await HepoolContract.methods.userInfo(id, account.address).call({ from: account.address });
      let _Decimals = asset.decimals0 ? asset.decimals0 : 18
      // let _Decimals = 18
      let amount = await this._getValueDivided1(userInfo.amount , 10 ** _Decimals)//this._getValueDivided(userInfo.amount,10 ** _Decimals)
      let multLpRewardDebt = this._getValueDivided(userInfo.multLpRewardDebt, 10 ** _Decimals)//await this._getToolNumber(parseFloat(userInfo.multLpRewardDebt) / 10 ** _Decimals)
      let rewardDebt = this._getValueDivided(userInfo.rewardDebt, 10 ** _Decimals)//await this._getToolNumber(parseFloat(userInfo.rewardDebt) / 10 ** _Decimals)
  
      userInfo = {
        amount: amount,
        multLpRewardDebt: multLpRewardDebt,
        rewardDebt: rewardDebt,
        oldamount: userInfo.amount
      }
      console.log('uuuuuuuu');
      console.log(id);
      console.log(asset.pool_address);
      console.log(account.address);
      console.log(userInfo);
      callback(null, userInfo)
    } catch (ex) {
      return callback(ex)
    }
  }
  // 获取锁仓金额--单币质押--定期
  _getBXHLockedToken = async (web3, asset, tokenPair, account, callback) => {
    console.log(tokenPair);
    // const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" ||tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000" || !asset.pool_address || asset.pool_address === "") {
      return callback(null, "")
    }
    let id
    if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
      id = tokenPair.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
    }

    let isDAOOperation = this.checkCurrentIsDaoOperation(asset.id_centerdata)
    let HepoolContract = null
    if (!isDAOOperation) {
      HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
    }else{
      HepoolContract = new web3.eth.Contract(config.BXHDaoABI, asset.dao_address)
    }
    // var poolLength = await HepoolContract.methods.poolLength().call({ from: account.address })
    // console.log("",asset.pool_addressx)
    try {
      var lockedToken = await HepoolContract.methods.lockedToken(id, account.address).call({ from: account.address });
      let _Decimals = asset.decimals0 ? asset.decimals0 : 18
      // let _Decimals = 18
      let lockedTokenAmount = await this._getValueDivided1(lockedToken , 10 ** _Decimals)//this._getValueDivided(userInfo.amount,10 ** _Decimals)
      callback(null, lockedTokenAmount)
    } catch (ex) {
      return callback(ex)
    }
  }
  _getIdByLpContractAddress = async (web3, account, lpContractAddress, pool_address) => {
    let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, pool_address)
    let id = await HepoolContract.methods.LpOfPid(lpContractAddress).call({ from: account.address })
    return id
  }
  _getAllBXHShouYi = async (web3, asset, account, callback) => {
    const tokenPair = store.getStore('rewardBXHTokens')
    if (!tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" || tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000") {
      return callback(null, "")
    }
    let id
    if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
      id = tokenPair.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
    }
    let isDAOOperation = this.checkCurrentIsDaoOperation(tokenPair.id_centerdata)
    // console.log("id--->>>>>",id)
    let HepoolContract = new web3.eth.Contract(isDAOOperation?config.BXHDaoABI:config.BXHHepoolRewardsABI, isDAOOperation?asset.dao_address:asset.pool_address)
    try {
      var shouyi = await HepoolContract.methods.pending(id, account.address).call({ from: account.address });
      if (isDAOOperation) {
        shouyi = await this._getToolNumber(parseFloat(shouyi) / 10 ** 18)
      }else{
        shouyi = await this._getToolNumber(parseFloat(shouyi[0]) / 10 ** 18)
      }
      // console.log("shouyi---->>>>>>",shouyi)
      callback(null, shouyi)
    } catch (ex) {
      return callback(ex)
    }
  }
  _getTotalBXHSupply = async (web3, asset, account, callback) => {
    const tokenPair = store.getStore('rewardBXHTokens')
  
    if (!tokenPair || !tokenPair.lptokenAddress || tokenPair.lptokenAddress === "" || tokenPair.lptokenAddress === "0x0000000000000000000000000000000000000000") {
      return callback(null, "")
    }
  
    let id
    if (asset.id !== '' && asset.id !== undefined && asset.id !== null) {
      id = asset.id
    } else {
      id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
    }
  
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, tokenPair.lptokenAddress) //lp地址
    try {
      var poolTotal = await erc20Contract.methods.totalSupply().call();
  
      let _Decimals = await this._getDecimals(asset.lptokenAddress)
      // 查询当前交易对的精度
      var pooldecimals = _Decimals;
      poolTotal = parseFloat(poolTotal) / 10 ** pooldecimals
  
      var balancetotal = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      var balance = (parseFloat(balancetotal) / 10 ** _Decimals)
      let HepoolContract = new web3.eth.Contract(config.BXHHepoolRewardsABI, asset.pool_address)
  
      let id
      if (tokenPair.id !== '' && tokenPair.id !== undefined && tokenPair.id !== null) {
        id = tokenPair.id
      } else {
        id = await this._getIdByLpContractAddress(web3, account, tokenPair.lptokenAddress, asset.pool_address)
      }
  
      var userInfo = await HepoolContract.methods.userInfo(id, account.address).call({ from: account.address });
  
      let amount = await this._getToolNumber(parseFloat(userInfo.amount) / 10 ** _Decimals)
  
      var zanbi = await this._getToolNumber((parseFloat(balance) + parseFloat(amount)) / parseFloat(poolTotal))
  
      let total = await this._getToolNumber(poolTotal)
      let balance_no = await this._getToolNumber(balance)
  
      let dataArr = {
        poolTotal: total,
        balance: balance_no,
        zanbi: zanbi,
        oldBalance: balancetotal
      }
  
      callback(null, dataArr)
    } catch (ex) {
      return callback(ex)
    }
  }
  // _getMineBXHLPAmount = async (web3, asset, account, callback) => {
  //   const tokenPair = store.getStore('rewardBXHTokens')
  
  //   let erc20Contract = new web3.eth.Contract(config.erc20ABI, tokenPair.lptokenAddress)
  //   var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
  //   balance = parseFloat(balance)/10**tokenPair.decimals0
  //   console.log("我的lp数量---->>>>>>",balance)
  //   callback(null,balance)
  // }
  
  _checkIfApprovalIsNeeded = async (asset, account, amount, contract, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })
  
    const ethAllowance = web3.utils.fromWei(allowance, "ether")
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      asset.amount = amount
      callback(null, asset)
    } else {
      callback(null, false)
    }
  }
  
  _callApproval = async (asset, account, amount, contract, last, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
    try {
      if (last) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei("10000000", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        callback()
      } else {
        erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999999 10000000", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
          .on('transactionHash', function (hash) {
            callback()
          })
          .on('error', function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message)
              }
              callback(error)
            }
          })
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }
  
  approve = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content
    const amount = '10000000'
  
    this._callAppROVE(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
  
      return emitter.emit(APPROVE_RETURNED, res)
    })
  }
  
  // 授权
  _callAppROVE = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, asset.address)
  
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }
  
    yCurveFiContract.methods.approve(asset.rewardsAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log('1111111')
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log('2222222')
        // console.log(confirmationNumber, receipt);
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        }
      })
      .on('receipt', function (receipt) {
        // console.log('333333')
        // console.log(receipt);
      })
      .on('error', function (error) {
        // console.log('44444')
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        // console.log('55555')
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  
  _getToolNumber = async (num_str) => {
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
        dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");//0
        resValue = resValue.replace(".", "");
        resArr = resValue.split("");
        if (Number(power) >= 0) {//power 21
          var subres = resValue.substr(dotIndex);//1
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
 
  _reRequrieStatusByTxHash = (txHash) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    console.log("当前txHash----->>>>>>",txHash)
    let erc20Contract = new web3.eth.getTransactionReceipt(txHash,(error,result)=>{
      if (result && result.transactionHash!==null) {
        this._refreshCookieData(result,account,"")
      }
       
    })
  }
  
  _refreshCookieData = (res, account, msgContent) => {
    // console.log("res--->>>",res)
    if (res.transactionHash) {  //结束pending
      this._clearAllStatusToComplete(account.address)
      emitter.emit(BXHCOOKIEREFRESHEVENT, res)
    } else { //开始pending
      this._recordeNewTransaction(account.address, res, msgContent)
      emitter.emit(BXHCOOKIEREFRESHEVENT, res)
    }
  }

  _clearCookieData = (account) => {
    this._clearAllStatusToComplete(account.address)
    emitter.emit(BXHCOOKIEREFRESHEVENT)
  }
  
  _recordeNewTransaction = (address, hash, msg) => {
    if (cookie.load(address) && cookie.load(address).length >= 5) {
      removeCookieListlast(address)
    }
    //新的交易
    let transactionData = {
      address: address,
      hash: hash,
      isPending: true,
      // isOut: isOut,
      isSuccess: true,
      msg: msg
    }
    addCookie(address, transactionData, false)
  }
  //删除当前账户交易缓存
  clearAllCookieData = () => {
    const account = store.getStore('account');
    removeCookieWithKey(account.address);
    emitter.emit(BXHCOOKIEREFRESHEVENT, null);
  }
  
  _moditfyTransactionData = (address, hash, isSuccess, msg) => {
    //交易结束
    let transactionData = {
      address: address,
      hash: hash,//data.transactionHash
      isPending: false,
      isSuccess: isSuccess,
      msg: msg
    }
    addCookie(address, transactionData, true)
  }
  
  //强制更新所有交易的状态为完成pending
  _clearAllStatusToComplete = (address) => {
    let data1 = cookie.load(address)
    let data_temp = []
    if(data1){
      data1.map((item) => {
        item.isPending = false
        data_temp.push(item)
      })
      removeCookieAndSetnewData(address, data_temp)
    }
  }


  _getHTBalance = async (callback) => {
    try {
      const account = store.getStore('account')
      const web3 = new Web3(store.getStore('web3context').library.provider);
      // 查询HT余额（HT是主链，需要单独查询）
      const HTBalance = await new web3.eth.getBalance(account.address);
      // var etcHTBalance = parseFloat(HTBalance) / 10 ** 18
      const etcHTBalance = this._getValueDivided(HTBalance, 10 ** 18);
      callback(etcHTBalance);
    }catch{
 
    }
  }
  
  getTokenItembyAddress = async (address) => {
    if (!address) {
      return null;
    }
    let TokenList = store.getStore('TokenList_Local')?store.getStore('TokenList_Local').token_list:null
    if (!TokenList) {
      return null
    }
    var addSymbolList = JSON.parse(localStorage.getItem('addSymbolList'))
    if (addSymbolList) {
      for (var k = 0; k < addSymbolList.length; k++) {
        TokenList.push({
          symbol: addSymbolList[k]['symbol'],
          token_address: addSymbolList[k]['address'],
          token_decimal: addSymbolList[k]['decimals'],
        })
      }
    }
  
    for (let i = 0; i < TokenList.length; i++) {
      if (TokenList[i] && (TokenList[i].token_address).toUpperCase() === (address).toUpperCase()) {
        return TokenList[i]
      }
    }
    return null;
  }

  checkCurrentTokenTypeIsOne = (token_address) => {
    let centerData = store.getStore('TokenList_Local')

    if (!token_address || token_address === "") {
      return false
    }
    if (centerData && centerData.token_list) {
      for (let index = 0; index < centerData.token_list.length; index++) {
        const item = centerData.token_list[index];
        if (item.token_address.toUpperCase() === token_address.toUpperCase() && item.token_type === 1) {
          return true
        }
      }
    }

    return false
  }
  
  // 当前数字加上精度后的值
  _getValueDecimals = (value, decimals) => {
    //BigNumber
    let decimalstotal = 10 ** decimals
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(decimalstotal).toFixed(0, 1)
    return valueDecimals
  }
  //除法
  _getValueDivided6 = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed();
    return amount;
  }
  _getValueDivided = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(4, 1);
    return amount;
  }
  _getValueDivided1 = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(12, 1);
    return amount;
  }
  _getValueDivided5 = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(20, 1);
    return amount;
  }
  //保留0位小数
  _getValueDividedZero = (value,value2)=> {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(0, 1);
    return amount;
  }
  _getValueMultipliedZero(value, value2) {
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed(0, 1)
    return valueDecimals
  }
  //相乘两位小数
  _getValueMultiplied(value, value2) {
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed(2, 1)
    return valueDecimals
  }
  _getValueDecimals2 = (value, value2) => {
    //BigNumber
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed(0, 1)
    return valueDecimals
  }
  _getValueDivided2 = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.dividedBy(bg2).toFixed(18, 1);
    return amount;
  }
  _getValuemultip1 = (value, value2) => {
    //BigNumber
    let params1 = new BigNumber(value)
    let valueDecimals = params1.multipliedBy(value2).toFixed()
    return valueDecimals
  }
 
  _getValueAdd2(value, value2) {
    var bg1 = new BigNumber(value);
    var bg2 = new BigNumber(value2);
    let amount = bg1.plus(bg2).toFixed(4, 1);
    return amount;
  }
  //加法
  _getValueAdd(value, value2) {
    var bg1 = new BigNumber(value);
    var bg2 = new BigNumber(value2);
    let amount = bg1.plus(bg2).toFixed(12, 1);
    return amount;
  }
  _getValueAddToFixed0(value, value2) {
    var bg1 = new BigNumber(value);
    var bg2 = new BigNumber(value2);
    let amount = bg1.plus(bg2).toFixed(0, 1);
    return amount;
  }
  // 减法
  _getValueMinus = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.minus(value2).toFixed(12, 1);
    return amount;
  }
  _getValueDivided3 = (value, value2) => {
    let bg1 = new BigNumber(value)
    let bg2 = new BigNumber(value2)
    let amount = bg1.minus(value2).toFixed();
    return amount;
  }


  // 还款--部分
  loanRactRequstToken = ({contractAddress, token, msgContent, amount}) => {
    const account = store.getStore('account')
    this._callLoanWithdrawToken(account, 'repayBorrow', amount, token, contractAddress, (err, res) => {
        if (err) {
            return emitter.emit(ERROR, err);
        }
        this._refreshCookieData(res, account, msgContent);
        return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanWithdrawToken = async (account, method, cTokenBalance, token, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);

    if(token&&token!==''){
      const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
      const decimals = await this._getDecimals(token);
      const amountToSend = this._getValueDecimals(cTokenBalance, decimals)
      yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }else{
      const yCurveFiContract = new web3.eth.Contract(CEtherABI, contractAddress)
      const amountToSend = web3.utils.toWei(saveToWei(cTokenBalance,18).toString(), 'ether')
      yCurveFiContract.methods[method]().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: amountToSend })
      .on('transactionHash', function (hash) {
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        
      })
      .on('receipt', function (receipt) {
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }
  }

  // 还款--全部
  loanRactRequstMAXToken = ({contractAddress, token, msgContent, amount}) => {
    const account = store.getStore('account')
    this._callLoanWithdrawMAXToken(account, 'repayBorrow', token, contractAddress, amount, (err, res) => {
        if (err) {
            return emitter.emit(ERROR, err);
        }
        this._refreshCookieData(res, account, msgContent);
        return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanWithdrawMAXToken = async (account, method, token, contractAddress, amount, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);

    //全部还款时候，传值-1（如下）
    let repayAll = new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)

    if(token&&token!==''){
      const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
      const decimals = await this._getDecimals(token);
      const amountToSend = this._getValueDecimals(amount, decimals)
      yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      // const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
      // yCurveFiContract.methods[method](repayAll).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
      })
      .on('receipt', function (receipt) {
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }else{
      const yCurveFiContract = new web3.eth.Contract(CEtherABI, contractAddress)
      // 全部还款
      const amountToSend = web3.utils.toWei(saveToWei(amount,18).toString(), 'ether')
      // console.log(amountToSend)
      yCurveFiContract.methods[method]().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei'), value: amountToSend })
      .on('transactionHash', function (hash) {
        callback(null, hash)
        })
      .on('confirmation', function (confirmationNumber, receipt) {
      
      })
      .on('receipt', function (receipt) {
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
        callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })  
    }
  }

  // 取款--全部
  loanWithdrawMAXToken = ({contractAddress, token, msgContent, cTokenBalance}) => {
    const account = store.getStore('account')
    this._callLoanRedeemMAXToken(account, 'redeem', token, contractAddress, cTokenBalance, (err, res) => {
        if (err) {
            return emitter.emit(ERROR, err);
        }
        this._refreshCookieData(res, account, msgContent);
        return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanRedeemMAXToken = async (account, method, token, contractAddress, cTokenBalance, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
    const decimals = await this._getDecimals(contractAddress);
    const amountToSend = this._getValueDecimals(cTokenBalance, decimals)
    yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash) {
      callback(null, hash)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
    })
    .on('receipt', function (receipt) {
      receipt.isHideDialog = true
      callback(null, receipt)
    })
    .on('error', function (error) {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
    .catch((error) => {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })

  }

  // 取款--部分
  loanWithdrawToken = ({contractAddress, token, msgContent, amount}) => {
    const account = store.getStore('account')
    this._callLoanRedeemToken(account, 'redeemUnderlying', amount, token, contractAddress, (err, res) => {
        if (err) {
            return emitter.emit(ERROR, err);
        }
        this._refreshCookieData(res, account, msgContent);
        return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callLoanRedeemToken = async (account, method, cTokenBalance, token, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);

    if(token&&token!==''){
      const yCurveFiContract = new web3.eth.Contract(CTokenABI, contractAddress)
      const decimals = await this._getDecimals(token);
      const amountToSend = this._getValueDecimals(cTokenBalance, decimals)
      yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }else{
      const yCurveFiContract = new web3.eth.Contract(CEtherABI, contractAddress)
      const amountToSend = web3.utils.toWei(saveToWei(cTokenBalance,18).toString(), 'ether')
      yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        
      })
      .on('receipt', function (receipt) {
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
    }
  }


  // 开启 抵押
  loanOpenMarkets = ({contractAddress, comptrollerAddress, msgContent, type}) => {
    const account = store.getStore('account');
    this._callLoanEnterMarkets(contractAddress, comptrollerAddress, 'enterMarkets', type, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanClaim_RETURN, res)
    })
  }
  // 关闭 抵押
  loanCloseMarkets = ({contractAddress, comptrollerAddress, msgContent, type}) => {
    const account = store.getStore('account');
    this._callLoanEnterMarkets(contractAddress, comptrollerAddress, 'exitMarket', type, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanClaim_RETURN, res)
    })
  }
  _callLoanEnterMarkets = async (contractAddress, comptrollerAddress, method, type ,callback) => {
    const account = store.getStore('account');
    let web3, erc20Contract

    if(type === 0){
      if (account.address == undefined || account.address == null || contractAddress.length == 0) {
        callback('error');
        return;
      }
      web3 = new Web3(store.getStore('web3context').library.provider);
      erc20Contract = new web3.eth.Contract(ComptrollerABI, comptrollerAddress);

    }else{
      if (account.address == undefined || account.address == null ||
        contractAddress == undefined || contractAddress == null || contractAddress == "") {
        callback('error');
        return;
      }
      web3 = new Web3(store.getStore('web3context').library.provider);
      erc20Contract = new web3.eth.Contract(ComptrollerABI, comptrollerAddress);

    }

    erc20Contract.methods[method](contractAddress).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash) {
      // console.log(hash)
      callback(null, hash)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      // console.log(confirmationNumber, receipt);
      // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    })
    .on('receipt', function (receipt) {
      // console.log("receipt----->>>>>>",receipt);
      receipt.isHideDialog = true
      callback(null, receipt)
    })
    .on('error', function (error) {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
    .catch((error) => {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
  }


  //跨链中心化接口
  getBXHBridgeMain = async (callback) => {
    const account = store.getStore('account');
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/api/bxh/bridge/main',
      method: 'post',
      data: {
          sender: account.address,
          senderChainId: chainId,
      },
    }).then(function (data) {
      callback(data.data.body);
    }).catch(function (error) {
      console.log(error);
    });
  }

  //获取跨链交易对价格
  getBXHTokenPrice = async (chainId, symbol, callback) => {
    axios({
      url: 'https://api.bxh.com/bxh/api/bxhinfo/token/price',
      method: 'post',
      data: {
          chainId:  chainId,
          symbol: symbol,
      },
    }).then(function (data) {
      return emitter.emit(GET_TOKENPRICE_RETURNED, data.data.data)
    }).catch(function (error) {
      console.log(error);
    });
  }
  getBXHTokenPayPrice = async (chainId, symbol, callback) => {
    axios({
      url: 'https://api.bxh.com/bxh/api/bxhinfo/token/price',
      method: 'post',
      data: {
          chainId:  chainId,
          symbol: symbol,
      },
    }).then(function (data) {
      return emitter.emit(GET_TOKENPAYPRICE_RETURNED, data.data.data)
    }).catch(function (error) {
      console.log(error);
    });
  }

  //跨链交易记录列表
  getBXHBridgeOrder = async (callback) => {
    const account = store.getStore('account');
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      url: 'https://api.bxh.com/api/bxh/bridge/order',
      method: 'post',
      data: {
          sender: account.address,
          senderChainId: chainId,
      },
    }).then(function (data) {
      callback(data.data.body);
    }).catch(function (error) {
      console.log(error);
    });
  }

  //跨链币种信息
  _getBridgeTokenInfo = async (senderToken, contractAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }
console.log('senderToken===>', senderToken)
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, senderToken)
    try {
      let balance = 0;
      let allowance = 0;  
      let decimals = 18;
      decimals = await this._getDecimals(senderToken);
      balance = await this._getHTERC20Balance(senderToken, decimals)
      allowance = await erc20Contract.methods.allowance(account.address, contractAddress).call({ from: account.address });//是否授权
      callback(null,{ balance, allowance });  
    } catch (ex) {
      console.log(ex);
    }
  }

  //跨链授权
  bridgeApproveToken = ({senderToken, contractAddress, msgContent}) => {
    const account = store.getStore('account')
    const amount = '100000000000000000000000000000000'
    this._callBridgeApprovalToken(account, amount, senderToken, contractAddress, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHLoanDeposit_RETURN, res)
    })
  }
  _callBridgeApprovalToken = async (account, amount, senderToken, contractAddress, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
  
    const yCurveFiContract = new web3.eth.Contract(config.erc20ABI, senderToken)
    yCurveFiContract.methods.approve(contractAddress, amount).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  //获取签名（生成v,r,s）
  _getBridgeSign = async (payChainId, senderToken, address, inputVal, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const account = store.getStore('account');
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    
    let amountToSend = 0;
    if(isNoEmpty(senderToken)){
      const decimals = await this._getDecimals(senderToken);
      amountToSend =this._getValueDecimals(inputVal, decimals)
    }else{
      amountToSend = web3.utils.toWei(saveToWei(inputVal,18).toString(), 'ether')
    }

    axios({
      url: 'https://api.bxh.com/api/bxh/bridge/sign',
      method: 'post',
      data: {
          chainId: chainId,
          tokenAddr: senderToken,
          toChainID: payChainId,
          toAddr: address,
          tokenAmount: amountToSend,
          gasAmount: '0',
      },
    }).then(function (data) {
      callback(data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  //跨链确定提交
  bridgeBottomToken = ({contractAddress, token, payToken, payChainId, msgContent, inputVal, address, r, s, v}) => {
    const account = store.getStore('account')
    this._callBridgeToken(account, address, inputVal, contractAddress, token, payToken, payChainId, r, s, v, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(BXHBRIDGESTAKE_RETURN, res)
    })
  }
  _callBridgeToken = async (account, address, inputVal, contractAddress, token, payToken, payChainId, r, s, v, callback) => {
    if (account.address == undefined || account.address == null ||
      contractAddress == undefined || contractAddress == null || contractAddress == "") {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(BridgeABI, contractAddress)
    let amountToSend = 0;
    if(isNoEmpty(token)){
      const decimals = await this._getDecimals(token);
      amountToSend =this._getValueDecimals(inputVal, decimals)
    }else{
      amountToSend = web3.utils.toWei(saveToWei(inputVal,18).toString(), 'ether')
    }

    // console.log('BridgeABI==>', BridgeABI)
    // console.log(contractAddress)
    // console.log(payToken)
    
    // console.log('_tokenAddr===>', token)
    // console.log('_toChainID===>', payChainId)
    // console.log('_toAddr===>', address)
    // console.log('_amount===>', amountToSend) 
    // console.log('r====>', r)
    // console.log('s====>', s)
    // console.log('v====>', v)
     
    yCurveFiContract.methods.lock(token, payChainId, address, amountToSend, 0, v, r, s).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
    .on('transactionHash', function (hash) {
      callback(null, hash)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      // console.log(confirmationNumber, receipt);
      // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    })
    .on('receipt', function (receipt) {
      // console.log("receipt----->>>>>>",receipt);
      receipt.isHideDialog = true
      // callback(null, receipt.transactionHash)
    })
    .on('error', function (error) {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
    .catch((error) => {
      if (!error.toString().includes("-32601")) {
        if (error.message) {
          return callback(error.message)
        }
        callback(error)
      }
    })
  }

  //检查修改的收款地址是否有效
  bridgeAddressToken = async (address, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    var isAddress = web3.utils.isAddress(address);
    callback(isAddress);  
  }

  //获取当前hash值进度（ （当前区块高度-hash值区块高度）>= 21 ）
  bridgeBlockNumber = async (senderTx, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    try {
      const currentBlock = await web3.eth.getBlockNumber();  //当前区块高度
      const lockBlock = await web3.eth.getTransaction(senderTx);
      let blockNumber = lockBlock.blockNumber;  //hash值区块高度
      callback(null, { currentBlock, blockNumber });
    } catch (ex) {
      callback(ex)
    }
  }

  _getXDTInfo = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }

    let that = this
    const account = store.getStore('account')
    axios({
      url: 'https://api.bxh.com/api/m1/main/bxh-info',
      method: 'post',
      data: { offset: 0, limit: 9999, roomCode: "", roomtypeId: 0, floorId: 0 },
      transformRequest: [function (data) {
        var oMyForm = new FormData();
        oMyForm.append("wallet_address", account.address);
        oMyForm.append("chain_id", chainId);
        return oMyForm;
      }],
    })
      .then(function (data) {
        const tokenList = JSON.parse(localStorage.getItem('tokenList'))
        let sourceData = that.fengzhuangData(data, tokenList)
        callback({ bxh_ex_pool_type_3: sourceData.pool_5 });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //XDT兑换币种余额
  _getXDTTokenBalance = async (symbol0Address, symbolPair_Show, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }

    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, symbol0Address)
    try {
      let balance = 0;
      let contractBalance = 0;
      let decimals = 18;
      decimals = await this._getDecimals(symbol0Address);
      balance = await this._getHTERC20Balance(symbol0Address, decimals)
      contractBalance = await this._getContractBalance(symbol0Address, symbolPair_Show, decimals)
      callback(null,{ balance, contractBalance });  
    } catch (ex) {
      console.log(ex);
    }
  }

  // XDT查询授权
  _getXDTAllowance = async (lptokenAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lptokenAddress)
    try {
      let allowance = 0;  
      allowance = await erc20Contract.methods.allowance(account.address, lptokenAddress).call({ from: account.address });//XDT是否授权
      callback(null,{ allowance });  
    } catch (ex) {
      console.log(ex);
    }
  }

  // XDT合约余额
  _getContractBalance = async (address, symbolPair_Show, decimals) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, address)
    var balance = await erc20Contract.methods.balanceOf(symbolPair_Show).call({ from: symbolPair_Show });
    balance = this._getValueDivided(balance, 10 ** decimals)//parseFloat(balance) / 10 ** decimals
    return balance
  }

  //XToken兑换币种余额
  _getXTokenBalance = async (lptokenAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }

    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lptokenAddress)
    try {
      let XTokenBalance = 0;
      let decimals = 18;
      decimals = await this._getDecimals(lptokenAddress);
      XTokenBalance = await this._getXBalance(lptokenAddress, decimals, callback)
      callback(null,{ XTokenBalance });  
    } catch (ex) {
      console.log(ex);
    }
  }

  // XToken余额
  _getXBalance = async (lptokenAddress, decimals) => {
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lptokenAddress)
    var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
    balance = this._getValueDivided(balance, 10 ** decimals)
    return balance
  }

  // XDT查询当前价格
  _getXDTTokenPrice = async (asset, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(XTokenABI, asset.symbolPair_Show)
    let decimals = 18;
    decimals = await this._getDecimals(asset.symbol0Address);
    var amountToSend = this._getValueDecimals(1, decimals)
    let price = '';
    try {
      price = await yCurveFiContract.methods.queryExchangeAmount(amountToSend,asset.symbol0Address).call();
      // price = this._getValueDivided1(price.tokenPrice, 10 ** decimals);
      price = this._getValueDivided(price.tokenPrice, 10 ** 8);
      callback(null,{ price });  
    } catch (ex) {
      return callback(ex)
    }
  }

  // XDT授权
  getXDTAllowance = (payload) => {
    const account = store.getStore('account')
    const { contract, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'

    this._callXDTAllowance(contract, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_XDTALLOWANCE_RETURNED, res)
    })
  }

  _callXDTAllowance = async (contract, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    let yCurveFiContract = new web3.eth.Contract(XTokenABI, contract)
    var amountToSend = this._getValueDecimals(amount, 18)
    let contractAddress = contract;
    yCurveFiContract.methods.approve(contractAddress, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        emitter.emit(GET_XDTALLOWANCE_RETURNED)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  
  // XDT兑换
  getXDTSwap = (payload) => {
    const account = store.getStore('account')
    const { amount, XDTContract, toSymbol, msgContent } = payload.content

    this._callXDTSwap(amount, XDTContract, toSymbol, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_XDTSTATRE_RETURNED, res)
    })
  }
  _callXDTSwap = async (amount, XDTContract, toSymbol, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let yCurveFiContract = new web3.eth.Contract(XTokenABI, XDTContract)
    var amountToSend = this._getValueDecimals(amount, 18)
    yCurveFiContract.methods.exchange(amountToSend,toSymbol.symbol0Address,account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        emitter.emit(GET_XDTSUCCEE_RETURNED)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // XToken兑换比例
  getXTokenPrice = async (id, xTokenAmount, destToken, callback) => {
    // xUSDT，pid=0；XBUSD， pid=1；XBTC，pid =2；XETH，pid =3； XWBNB，pid =4， XCAKE，pid =5， XUSDC，pid = 6
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }
    var pid = 0
    if(id===0){ //XWBNB
      pid = 4
    }else if(id===20){ //XCAKE
      pid = 5
    }else if(id===5){ //XUSDC
      pid = 6
    }else{
      pid = id - 1
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(XSwapTokenABI, "0xa5d7b0032bE749580082D030B75d265E4034b59A")
    let decimals = 18;
    decimals = await this._getDecimals(destToken);
    var amountToSend = this._getValueDecimals(xTokenAmount, decimals)
    try {
      let amount = 0;  
      amount = await erc20Contract.methods.queryExchangePrice(pid, amountToSend, destToken).call({ from: account.address });
      amount = this._getValueDivided1(amount.exchangeAmount, 10 ** decimals)
      callback(null,{ amount });  
    } catch (ex) {
      console.log(ex);
    }
  }

  // XToken查询授权
  _getXTokenAllowance = async (lptokenAddress, callback) => {
    const account = store.getStore('account');
    if (account.address == undefined || account.address == null) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, lptokenAddress)
    try {
      let allowance = 0;  
      allowance = await erc20Contract.methods.allowance(account.address, "0xa5d7b0032bE749580082D030B75d265E4034b59A").call({ from: account.address });
      callback(null,{ allowance });  
    } catch (ex) {
      console.log(ex);
    }
  }

  // XToken授权
  getXTokenAllowance = (payload) => {
    const account = store.getStore('account')
    const { contract, msgContent } = payload.content
    const amount = '100000000000000000000000000000000'

    this._callXTokenAllowance(contract, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_XDTALLOWANCE_RETURNED, res)
    })
  }
  
  _callXTokenAllowance = async (contract, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    let yCurveFiContract = new web3.eth.Contract(config.erc20ABI, contract)
    var amountToSend = this._getValueDecimals(amount, 18)
    let contractAddress = contract;
    yCurveFiContract.methods.approve("0xa5d7b0032bE749580082D030B75d265E4034b59A", amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        emitter.emit(GET_XDTALLOWANCE_RETURNED)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  // XToken兑换
  getXTokenSwap = (payload) => {
    const account = store.getStore('account')
    const { pid, amount, destToken, msgContent } = payload.content

    this._callXTokenSwap(pid, amount, destToken, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent)
      return emitter.emit(GET_XDTSTATRE_RETURNED, res)
    })
  }
  _callXTokenSwap = async (pid, amount, destToken, account, callback) => {
    // xUSDT，pid=0；XBUSD， pid=1；XBTC，pid =2；XETH，pid =3； XWBNB，pid =4， XCAKE，pid =5， XUSDC，pid = 6
    var pidid = 0
    if(pid===0){ //XWBNB
      pidid = 4
    }else if(pid===20){ //XCAKE
      pidid = 5
    }else if(pid===5){ //XUSDC
      pidid = 6
    }else{
      pidid = pid - 1
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let yCurveFiContract = new web3.eth.Contract(XSwapTokenABI, "0xa5d7b0032bE749580082D030B75d265E4034b59A")
    var amountToSend = this._getValueDecimals(amount, 18)
    yCurveFiContract.methods.swap(pidid, amountToSend, destToken, account.address).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // if(confirmationNumber == 2) {
        //   dispatcher.dispatch({ type: GET_BALANCES, content: {} })
        // }
      })
      .on('receipt', function (receipt) {
        // console.log(receipt);
        emitter.emit(GET_XDTSUCCEE_RETURNED)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  //BeginSingle
  _getFarmsPool = async (callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    axios({
      // url: 'https://test-app.bxh.com/api/bxh/farms/pool',
      url: 'https://api.bxh.com/api/bxh/farms/pool',
      method: 'post',
      data: {},
      headers: {'chainId':chainId},
    }).then(function (data) {
      callback(data.data.body);
    }).catch(function (error) {
      console.log(error);
    });
  }
  _getFarmsPoolItem = async (id,callback) => {
    const { ethereum } = window;
    let chainId
    if(ethereum){
        chainId = await ethereum.networkVersion;
        if(chainId){
        chainId = await ethereum.networkVersion;
        }else{
        // 火币钱包直接获取chainId
        chainId = await ethereum.chainId;
        }
    }else{
        chainId = '56'
    }
    const account = store.getStore('account')
    axios({
      // url: 'https://test-app.bxh.com/api/bxh/farms/pool/item',
      url: 'https://api.bxh.com/api/bxh/farms/pool/item',
      method: 'post',
      data: {id,fromAddress:account.address},
      headers: {'chainId':chainId},
    }).then(function (data) {
      callback(data.data.body);
    }).catch(function (error) {
      console.log(error);
    });
  }
  _getApprove = async (senderToken, contractAddress, callback) => {
    const account = store.getStore('account');
    if (isEmpty(account.address)) {
      callback('error');
      return;
    }
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);
      let erc20Contract = new web3.eth.Contract(ERC20ABI, senderToken);
      let allowance = await erc20Contract.methods.allowance(account.address, contractAddress).call();
      callback(null,allowance);
    } catch (ex) {
      console.log(ex);
    }
  }
  _getSingleSimpleInfo = async (contractAddress,exId,callback)=>{
    const account = store.getStore('account')
    if (isEmpty(account.address)||isEmpty(contractAddress)) {
      callback('error');
      return;
    }
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);
      let erc20Contract = new web3.eth.Contract(SinglePoolABI, contractAddress);
      let poolInfo = await erc20Contract.methods.poolInfo(exId).call();
      let cycleSeconds = poolInfo.timeEnd-poolInfo.timeStart;
      poolInfo.cycle = _toPrecision(_getValueDivided(cycleSeconds,86400,2),2);
      let tempContract = new web3.eth.Contract(ERC20ABI, poolInfo.rewardToken);
      let rewardSymbol = await tempContract.methods.symbol().call();
      poolInfo.rewardSymbol = rewardSymbol;
      let seconds = poolInfo.timeEnd-(Date.parse(new Date())/1000);
      poolInfo.seconds = seconds;
      let result = Object.assign({},poolInfo);
      // console.log('result====>', result)
      callback(null,result);
    } catch (ex) {
      console.log(ex);
      callback(ex);
    }
  }
  _getSingleInfo = async (contractAddress,exId,callback)=>{
    const account = store.getStore('account')
    if (isEmpty(account.address)||isEmpty(contractAddress)) {
      callback('error');
      return;
    }
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);
      let erc20Contract = new web3.eth.Contract(SinglePoolABI, contractAddress);
      let poolInfo = await erc20Contract.methods.poolInfo(exId).call();
      let tokenContract = new web3.eth.Contract(ERC20ABI, poolInfo.lpToken);
      let lpTokenDecimals = 18;
      if(isNoEmpty(poolInfo.lpToken)){
        lpTokenDecimals = await this._getDecimals(poolInfo.lpToken);
      }
      let lpTokenBalance = await tokenContract.methods.balanceOf(account.address).call();
      lpTokenBalance = _toPrecision(_getValueDivided(lpTokenBalance,10**lpTokenDecimals,lpTokenDecimals));
      let cycleSeconds = poolInfo.timeEnd-poolInfo.timeStart;
      poolInfo.cycle = _toPrecision(_getValueDivided(cycleSeconds,86400,2),2);
      let seconds = poolInfo.timeEnd-(Date.parse(new Date())/1000);
      let secondsStart = poolInfo.timeStart-(Date.parse(new Date())/1000);
      poolInfo.seconds = seconds;
      poolInfo.secondsStart = secondsStart;
      let lockedSeconds = poolInfo.lockedSeconds;
      let lockDay = Math.floor((lockedSeconds / 3600) / 24);
      let lockHour = Math.floor((lockedSeconds / 3600) % 24);
      let lockMinute = Math.floor((lockedSeconds / 60) % 60);
      let lockSeconds = Math.floor(lockedSeconds % 60);
      let lockInfo = {lockDay,lockHour,lockMinute,lockSeconds};
      if(isNoEmpty(poolInfo.lpTokenFrom)&&poolInfo.lpTokenFrom!='0x0000000000000000000000000000000000000000'){
        let tempContract = new web3.eth.Contract(ERC20ABI, poolInfo.lpTokenFrom);
        let lpTokenFromBalance = await tempContract.methods.balanceOf(account.address).call();
        poolInfo.lpTokenFromSymbol = await tempContract.methods.symbol().call();
        let lpTokenFromDecimals = await this._getDecimals(poolInfo.lpTokenFrom);
        poolInfo.lpTokenFromDecimals = lpTokenFromDecimals;
        lpTokenFromBalance = _toPrecision(_getValueDivided(lpTokenFromBalance,10**lpTokenFromDecimals,lpTokenFromDecimals));
        poolInfo.lpTokenFromBalance = lpTokenFromBalance;
      }
      let tempContract = new web3.eth.Contract(ERC20ABI, poolInfo.rewardToken);
      let rewardSymbol = await tempContract.methods.symbol().call();
      let rewardDecimals = await this._getDecimals(poolInfo.rewardToken);
      let rewardAmount = await erc20Contract.methods.pending(exId,account.address).call();
      rewardAmount = _toPrecision(_getValueDivided(rewardAmount,10**rewardDecimals,rewardDecimals));
      poolInfo.rewardSymbol = rewardSymbol;
      poolInfo.rewardDecimals = rewardDecimals;
      let userInfo = await erc20Contract.methods.userInfo(exId,account.address).call();
      let pendingUnlock = await erc20Contract.methods.pendingUnlock(exId,account.address).call();
      let lpTokenAmount = userInfo.amount;
      let lockAmount = userInfo.lockAmount;
      lpTokenAmount = _toPrecision(_getValueDivided(lpTokenAmount,10**lpTokenDecimals,lpTokenDecimals));
      lockAmount = _toPrecision(_getValueDivided(lockAmount,10**lpTokenDecimals,lpTokenDecimals));
      pendingUnlock = _toPrecision(_getValueDivided(pendingUnlock,10**lpTokenDecimals,lpTokenDecimals));
      let result = Object.assign({},poolInfo,lockInfo,{lpTokenAmount,lockAmount,pendingUnlock,lpTokenDecimals,rewardAmount,lpTokenBalance});
      callback(null,result);
    } catch (ex) {
      console.log(ex);
      callback(ex);
    }
  }
  singleApprovalToken = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleApprovalToken(account, payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLETOKENAPPROVE_RETURN, res)
    })
  }
  _callSingleApprovalToken = async (account, {senderToken, contractAddress}, callback) => {
    if (isEmpty(account.address)||isEmpty(contractAddress)) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(ERC20ABI, senderToken)
    const amount = '100000000000000000000000000000000'
    yCurveFiContract.methods.approve(contractAddress, amount).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }

  singleDeposit = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleDepositWithdraw(account, 'deposit', payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      emitter.emit(BXHPAGEREFRESH_RETURN, res)
      this._getMineStakedPool((stakedList) => {
        localStorage.setItem("StakedPoolList", JSON.stringify(stakedList));
        store.setStore({ StakedPoolList: stakedList })
      })

      return emitter.emit(SINGLETOKENDEPOSIT_RETURN, res)
    })
  }
  singleWithdraw = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleDepositWithdraw(account, 'withdraw', payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLETOKENWITHDRAW_RETURN, res)
    })
  }
  singleClaimReward = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    let params = Object.assign({},payload.content,{amount:0});
    this._callSingleDepositWithdraw(account, 'deposit', params, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLETOKENCLAIMREWARD_RETURN, res)
    })
  }
  _callSingleDepositWithdraw = async (account, method, {pid, amount, tokenAddress, contractAddress}, callback) => {
    if (isEmpty(account.address)||isEmpty(contractAddress)||isEmpty(tokenAddress)||isEmpty(pid)||isEmpty(amount)) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(SinglePoolABI, contractAddress)
    let amountToSend = 0;
    if(amount>0){
      let decimals = await this._getDecimals(tokenAddress);
      amountToSend = _getValueMultipZero(amount, 10**decimals);
    }
    yCurveFiContract.methods[method](pid, amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  singleWithdrawUnlock = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleDepositWithdrawUnlock(account, 'withdrawUnlock', payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLETOKENWITHDRAWUNLOCK_RETURN, res)
    })
  }
  _callSingleDepositWithdrawUnlock = async (account, method, {pid, tokenAddress, contractAddress}, callback) => {
    if (isEmpty(account.address)||isEmpty(contractAddress)||isEmpty(tokenAddress)||isEmpty(pid)) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(SinglePoolABI, contractAddress)
    // let amountToSend = 0;
    // if(amount>0){
    //   let decimals = await this._getDecimals(tokenAddress);
    //   amountToSend = _getValueMultipZero(amount, 10**decimals);
    // }
    yCurveFiContract.methods[method](pid).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //XToken
  singleApprovalXToken = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleApprovalToken(account, payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLEXTOKENAPPROVE_RETURN, res)
    })
  }
  singleXTokenStake = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleXTokenStakeWithdraw(account, 'stake', payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLEXTOKENSTAKE_RETURN, res)
    })
  }
  singleXTokenWithdraw = (payload) => {
    const {msgContent} = payload.content;
    const account = store.getStore('account')
    this._callSingleXTokenStakeWithdraw(account, 'withdraw', payload.content, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._refreshCookieData(res, account, msgContent);
      return emitter.emit(SINGLEXTOKENWITHDRAW_RETURN, res)
    })
  }
  _callSingleXTokenStakeWithdraw = async (account, method, {amount, tokenAddress, contractAddress}, callback) => {
    if (isEmpty(account.address)||isEmpty(contractAddress)||isEmpty(tokenAddress)||isEmpty(amount)) {
      callback('error');
      return;
    }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(SingleXTokenABI, contractAddress)
    let amountToSend = 0;
    if(amount>0){
      let decimals = await this._getDecimals(tokenAddress);
      amountToSend = _getValueMultipZero(amount, 10**decimals);
    }
    console.log('method===>', method)
    console.log('contractAddress===>', contractAddress)
    yCurveFiContract.methods[method](amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        // console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(confirmationNumber, receipt);
        // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
      })
      .on('receipt', function (receipt) {
        // console.log("receipt----->>>>>>",receipt);
        receipt.isHideDialog = true
        callback(null, receipt)
      })
      .on('error', function (error) {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
      .catch((error) => {
        if (!error.toString().includes("-32601")) {
          if (error.message) {
            return callback(error.message)
          }
          callback(error)
        }
      })
  }
  //EndSingle

  // SignOutAccount = async () => {  
  //   const web3 = new Web3(store.getStore('web3context').library.provider);
  //   console.log('kkkk===>', web3)
  //   const account = store.getStore("account")
  //   console.log('address1111===>', account.address)
  //   store.setStore({ account: { address: "" }, web3context: null })
  //   console.log('address2222===>', account.address)
  //   emitter.emit(CONNECTION_CONNECTED)
  // }

  _getGasPrice = async (id) => {    
    // 获取当前钱包链接的链ID，（128 heco，56 bsc）
    const { ethereum } = window;
    let chainId = await ethereum.networkVersion;
    if(chainId){
      chainId = await ethereum.networkVersion;
    }else{
      // 火币钱包直接获取chainId
      chainId = await ethereum.chainId;
    }

    if(chainId === '56'){
      // BSC GasPrice (url https://coinphd.com/api/bscgasprice)
      let gasPrice = 5
      return gasPrice.toFixed(0)
    }else if(chainId === '66'){
      let gasPrice = 1
      return gasPrice.toFixed(0)
    }else if(chainId === '1'){
      // ETH GasPrice
      try {
        const url = 'https://gasprice.poa.network/'
        const priceString = await rp(url);
        const priceJSON = JSON.parse(priceString)
        if(priceJSON) {
          // return priceJSON.fast.toFixed(0)
          return (priceJSON.standard.toFixed(0) * 1 + priceJSON.standard.toFixed(0) * 0.1).toFixed(0)
        }
        return store.getStore('universalGasPrice')
      } catch(e) {
        console.log(e)
        return store.getStore('universalGasPrice')
      }
    }else if(chainId === '128'){
      // HECO GasPrice
      try {
        const url = 'https://tc.hecochain.com/price/prediction'
        const priceString = await rp(url);
        const priceJSON = JSON.parse(priceString)
        if (priceJSON) {
          return priceJSON.prices.fast.toFixed(0)
        }
        return store.getStore('universalGasPrice')
      } catch (e) {
        console.log(e)
        return store.getStore('universalGasPrice')
      }  
    }else if(chainId === '137'){
      let gasPrice = 100
      return gasPrice.toFixed(0)
    }else if(chainId === '43114'){
      let gasPrice = 100
      return gasPrice.toFixed(0)
    }else{
      let gasPrice = 1
      return gasPrice.toFixed(0)
    }
  }

  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  // 切换网络(heco 128, bsc 56, okex 66, polygon 137, avax 43114)
  getChainid = (payload) => {  
    if(payload.content.chainID === '56'){

       // BSC网络
       window.ethereum &&
       window.ethereum
       .request({
           method: 'wallet_addEthereumChain',
           params: [
               {
                   chainId: '0x38',
                   chainName: 'BSC',
                   nativeCurrency: {
                       name: 'BNB',
                       symbol: 'BNB',
                       decimals: 18,
                   },
                   rpcUrls: ['https://bsc-dataseed.binance.org/'],
                   blockExplorerUrls: ['https://bscscan.com/'],
               },
           ],
       })
       .then(() => {
          //  localStorage.setItem("chainIDSwitch", 56)
           console.log('BSC网络切换成功')
           if (this._isMobile()) { // 移动端
            window.location.reload(); 
           }
          //  emitter.emit(STAKEBXH_CHAINID_RETURNED)
       })
       .catch((e) => {

       })
       
    } else if(payload.content.chainID === '66'){

      // OKEX网络
      window.ethereum &&
      window.ethereum
      .request({
          method: 'wallet_addEthereumChain',
          params: [
              {
                  chainId: '0x42',
                  chainName: 'OKExChain',
                  nativeCurrency: {
                      name: 'OKT',
                      symbol: 'OKT',
                      decimals: 18,
                  },
                  rpcUrls: ['https://exchainrpc.okex.org'],
                  blockExplorerUrls: ['https://www.oklink.com/okexchain'],
              },
          ],
      })
      .then(() => {
          console.log('OKEX网络切换成功')
          if (this._isMobile()) { // 移动端
            window.location.reload(); 
          }
          // emitter.emit(STAKEBXH_CHAINID_RETURNED)
      })
      .catch((e) => {

      })

    } else if(payload.content.chainID === '128') {

      // HECO网络
      window.ethereum &&
      window.ethereum
      .request({
          method: 'wallet_addEthereumChain',
          params: [
              {
                  chainId: '0x80',
                  chainName: 'HECO',
                  nativeCurrency: {
                      name: 'HT',
                      symbol: 'HT',
                      decimals: 18,
                  },
                  rpcUrls: ['https://http-mainnet.hecochain.com'],
                  blockExplorerUrls: ['https://hecoinfo.com'],
              },
          ],
      })
      .then(() => {
          console.log('HECO网络切换成功')
          if (this._isMobile()) { // 移动端
            window.location.reload(); 
          }
          // emitter.emit(STAKEBXH_CHAINID_RETURNED)
      })
      .catch((e) => {

      })
    
    } else if(payload.content.chainID === '137') {

      // POLYGON网络
      window.ethereum &&
       window.ethereum
       .request({
           method: 'wallet_addEthereumChain',
           params: [
               {
                   chainId: '0x89',
                   chainName: 'POLYGON',
                   nativeCurrency: {
                       name: 'MATIC',
                       symbol: 'MATIC',
                       decimals: 18,
                   },
                   rpcUrls: ['https://polygon-rpc.com'],
                   blockExplorerUrls: ['https://polygonscan.com'],
               },
           ],
       })
       .then(() => {
           console.log('POLYGON网络切换成功')
           if (this._isMobile()) { // 移动端
            window.location.reload(); 
          }
          //  emitter.emit(STAKEBXH_CHAINID_RETURNED)
       })
       .catch((e) => {

       })

    } else if(payload.content.chainID === '43114') {

      // AVAX网络  
      window.ethereum &&
       window.ethereum
       .request({
           method: 'wallet_addEthereumChain',
           params: [
               {
                   chainId: '0xa86a',
                   chainName: 'AVAX',
                   nativeCurrency: {
                       name: 'AVAX',
                       symbol: 'AVAX',
                       decimals: 18,
                   },
                   rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                   blockExplorerUrls: ['https://snowtrace.io'],
               },
           ],
       })
       .then(() => {
           console.log('AVAX网络切换成功')
           if (this._isMobile()) { // 移动端
            window.location.reload(); 
          }
          // emitter.emit(STAKEBXH_CHAINID_RETURNED)
       })
       .catch((e) => {

       })

    }
  }
  
  
}
  
var store = new Store();
  
export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};