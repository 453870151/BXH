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
import Lang from '../unlock/Lang.jsx'
import LangM from '../unlock/LangM.jsx';
import LeftPC from '../unlock/LeftPC.jsx'
import CountUp from 'react-countup';
import cookie from 'react-cookies'
import { numberDecimal, toolNumber, addCookie, removeCookie, isEmpty, isNoEmpty, getStyleClass } from '../../config/constantFunction'
import FooterM from '../unlock/FooterM.jsx';
import FooterPC from '../unlock/FooterPC.jsx';

import {
  ERROR,
  CONFIGURE_RETURNED,

  // BXH start
  GET_BXHList_PERPETUAL,
  GET_BXHList_PERPETUAL_RETURNED,
  BXHLISTBALANCEHOME,
  BXHLISTBALANCEHOME_RETURNED,
  BXHCHNAGEACCOUNT
} from '../../constants'
import { Dispatcher } from "flux";

const styles = theme => ({
  root: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
    justifyContent: 'flex-start',
    background: '#191B2E',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '65px',
      maxWidth: '1060px',
      margin: 'auto',
    }
  },
  rightcontent: {

  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px',
    }
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#2F80ED",
    },
    padding: '12px',
    backgroundColor: "#2F80ED",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  },
  title: {
    padding: '12px',
    textAlign: 'center'
  },
  subtitle: {
    padding: '12px',
    borderRadius: '0.75rem',
    textAlign: 'center'
  },
  walletAddress: {
    padding: '0px 12px'
  },
  walletTitle: {
    flex: 1,
    fontSize: '18px',
  },
  rewardPools: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '20px',
    flexWrap: 'wrap'
  },
  rewardPoolContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: '28px 30px',
    borderRadius: '10px',
    border: '1px solid #0F2A40',
    margin: '20px 0',
    minHeight: '300px',
    minWidth: '200px',
  },
  text: {
    width: '100%',
    color: '#FFFFFE',
    minWidth: '100%',
    marginLeft: '20px',
    fontSize: '14px',
  },
  poolName: {
    paddingBottom: '20px',
    color: colors.text
  },
  tokensList: {
    color: colors.darkGray,
    paddingBottom: '20px',
    opacity: '0.7',
  },
  poolWebsite: {
    color: colors.darkGray,
    paddingBottom: '20px',
    textDecoration: 'none'
  },
  openBtn: {
    border: '1px solid #2E80EC',
    color: '#2E80EC',
    borderWidth: '1px !important',
    padding: '5px 50px',
    borderRadius: '10px',
    '&:hover': {
      border: '1px solid #2F80ED',
    }
  },
  DFKIITopPC: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  DFKIIint: {
    position: 'absolute',
    width: '190px',
    top: '110px',
    '& img': {
      width: '100%',
    }
  },
  DFKIIfonts: {
    width: '100%',
    fontWeight: '700',
    fontSize: '18px',
    textAlign: 'center',
    margin: '20px 0',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginTop: '150px',
      textAlign: 'center',
      opacity: '.7',
      fontWeight: '500',
      letterSpacing: '1px',
    }
  },
  DKFIIsumont: {
    width: '100%',
    borderRadius: '8px',
    margin: '0',
    textAlign: 'center',
    padding: '20px 0',
    background: 'none',
    border: '2px solid #35373A',
    '& span': {
      display: 'block',
      fontWeight: '500',
      opacity: '.4',
      fontSize: '15px',
      margin: '0',
      letterSpacing: '1px',
      [theme.breakpoints.up('sm')]: {
        margin: '30px 0 20px',
      }
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      fontSize: '50px',
      fontWeight: 'bold',
      marginBottom: '0px',
      [theme.breakpoints.up('sm')]: {
        marginBottom: '40px',
      }
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0',
      margin: '40px 0',
      background: '#3E414A',
      border: 'none',
    }
  },
  DKFIIzichan: {
    width: '100%',
    marginTop: '50px',
    backgroundColor: '#282A2E', /* 不支持线性的时候显示 */
    // backgroundImage: 'linear-gradient(to left, #666 , #000)',
    padding: '20px',
    borderRadius: '8px',
  },
  DKFIIzctit: {
    fontWeight: '500',
    opacity: '.8',
  },
  DKFIIzcsum: {
    fontSize: '24px',
    borderBottom: '1px solid #1B1D21',
    paddingBottom: '10px',
    marginBottom: '10px',
    marginTop: '10px',
    letterSpacing: '1px',
  },
  DKFIIziwei: {
    '& span': {
      display: 'inline-block',
      width: '50%',
    },
    '& em': {
      fontStyle: 'inherit',
      display: 'inline-block',
      textAlign: 'right',
      width: '50%',
      opacity: '.8',
      fontWeight: 'bold',
    }
  },
  DKFIIbtnquan: {
    marginTop: '15px',
    position: 'relative',
    // display: 'flex',
    // justifyContent: 'space-between',  // 左右平均布局
  },
  DKFIInulsm: {
    position: 'absolute',
    top: '0px',
    width: '100%',
    height: '100%',
    zIndex: '99999',
    background: '#333',
    borderRadius: '8px',
    opacity: '.7',
  },
  DKFIIxiaosuo: {
    position: 'absolute',
    zIndex: '99999',
    left: '45%',
    top: '45%',
    '& img': {
      width: '20px',
    }
  },
  DKFIIbtnsmit: {
    position: 'relative',
    background: '#2C3036',
    borderRadius: '8px',
    textAlign: 'center',
    padding: '30px 0',
    marginBottom: '15px',
    width: '100%',
    height: '180px',
    '& img': {
      width: '35px',
    },
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '10px 0',
    },
    '& i': {
      fontStyle: 'inherit',
      opacity: '.4',
    }
  },
  DKFIIlestbut: {
    display: 'flex',
    fontSize: '16px',
    margin: '0 5px',
  },
  DKFIIlestleft: {
    width: '100%',
    display: 'flex',
  },
  DKFIIlestright: {
    width: '50%',
    display: 'flex',
  },
  DKFIIlestlv: {
    width: '100%',
    fontWeight: '400',
    fontSize: '13px',
    opacity: '.8',
  },
  DKFIIlestcls: {
    color: '#EC5340',
    fontWeight: 'bold',
    fontStyle: 'inherit',
    fontSize: '14px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  DKFIIlestolme: {
    fontWeight: '700',
    opacity: '.8',
    color: '#D2D3D4',
    fontStyle: 'inherit',
    marginLeft: '5%',
  },
  DKFIIbtncont: {
    display: 'flex',
    margin: '30px 20px 0',
    fontWeight: 'bold',
  },
  DKFIIDeposit: {
    width: '47%',
    borderRadius: '10px',
    backgroundColor: '#DE2438',
    backgroundImage: 'linear-gradient(to right, #DE2438 , #F97E47)',
    lineHeight: '40px',
    marginRight: '3%',
  },
  DKFIITransaction: {
    width: '47%',
    color: '#FF4734',
    border: '1px solid #FF4734',
    borderRadius: '10px',
    lineHeight: '40px',
    marginLeft: '3%',
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
  DKFIIimg3: {
    position: 'absolute',
    zIndex: '9999',
    left: '50%',
    marginLeft: '-7px',
    top: '25px',
    width: '15px !important',
  },
  DKFIIsmbt: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: '#FF007A',
    borderRadius: '0 10px 0 15px',
    padding: '5px',
    fontSize: '13px',
    opacity: '.8',
    '& i': {
      opacity: '.8',
    }
  },
  DKFIIsmbtTwo: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: '#EC5340',
    borderRadius: '0 10px 0 15px',
    padding: '5px',
    fontSize: '13px',
    opacity: '.8',
    '& i': {
      opacity: '.8',
    }
  },
  DKFIIconflix: {
    display: 'flex',
  },
  DKFIIconleft: {
    width: 'calc(50% - 5px)',
    marginRight: '5px',
  },
  DKFIIconright: {
    width: 'calc(50% - 5px)',
    marginLeft: '5px',
  },
  xiufu: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: '999999',
    left: '0px',
    top: '0px',
    color: '#666',
    fontWeight: 'bold;'
  },
  xiufusize: {
    lineHeight: '30px',
    margin: '0 20px',
    marginTop: '20px',
    fontSize: '16px',
  },
  bxhbtntit: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: '18px',
    marginBottom: '20px',
    paddingTop: '18px',

    '& span': {
      display: 'block',
      fontSize: '15px',
      fontWeight: '400',
      color: '#FFFFFF',
      marginTop: '5px',
    },

  },
  bxhfootico: {
    display: 'flex',
    marginTop: '30px'
  },
  bxhicocont: {
    flex: '3',
    textAlign: 'center',
    '& img': {
      width: '50%',
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      color: '#FFFFFFS',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '5px'
    },
    '& span': {
      display: 'block',
      fontSize: '12px',
      color: '#FFFFFF',
      opacity: 0.6,
      marginTop: '3px'
    }
  },
  bxhfoticos: {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '40px',
    '& img': {
      height: '60px',
    }
  },
  bxhtit: {
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: 'bold',
    paddingTop: '20px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '25px',
    }
  },
  bxhconmt: {
    textAlign: 'center',
    fontSize: '17px',
    fontWeight: '400',
    [theme.breakpoints.up('sm')]: {
      opacity: 0.6,
      marginTop: '10px'
    }
  },
  bxhcontopms: {
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      padding: '20px 0px 20px 20px'
    }
  },
  bxhprices: {
    display: 'flex',
    borderRadius: '4px',
    height: '35px',
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
    }
  },
  listitem: {
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      boxSizing: 'border-box',
      width: '50%',
      paddingRight: '5px'
    },

  },
  listitem1: {
    [theme.breakpoints.up('sm')]: {
      float: 'left',
      boxSizing: 'border-box',
      width: '50%',
      paddingLeft: '5px'
    }
  },
  BXHziincont: {
    display: 'flex',
    marginTop: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
      width: '48%',
      marginRight: '10px',
    }
  },
  BXHziincont1: {
    display: 'flex',
    marginTop: '10px',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
      width: '48%',
    }
  },
  BXHzixonm: {
    flex: '2',
    borderRadius: '5px',
    fontSize: '.8rem',
    marginRight: '10px',
    padding: '10px',
    textAlign: 'center',
    height: '70px',
    '& span': {
      display: 'block',
      fontWeight: '500',
      opacity: .7,
      marginTop: '8px',
      fontSize: '11px',
      color: '#FFFFFF'
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      fontWeight: 'bold',
      fontSize: '17px',
      fontFamily: "consola",
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    }
  },
  refreshcount: {
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      opacity: '1',
      marginTop: '2px',
      fontSize: '16px',
      color: '#FFFFFF'
    }
  },
  BXHzixonm1: {
    flex: '2',
    borderRadius: '5px',
    fontSize: '.8rem',
    padding: '10px',
    textAlign: 'center',
    height: '70px',
    '& span': {
      display: 'block',
      fontWeight: '500',
      opacity: '.7',
      marginTop: '8px',
      fontSize: '11px',
      color: '#FFFFFF'
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      fontWeight: 'bold',
      fontSize: '17px',
      fontFamily: "consola",
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    }
  },
  refreshcount1: {
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      opacity: '1',
      marginTop: '2px',
      fontSize: '16px',
      color: '#FFFFFF'
    }
  },
  BXHziright: {
    marginRight: '0px',
  },
  bxhpostom: {
    position: 'relative',
  },
  bxhabouslp: {
    // position: 'absolute',
    top: '0px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '50px'
    }
  },
  bxhpoolswms: {
    margin: '0 10px 50px 10px',
    borderRadius: '5px',
  },
  bxhbtnquan: {
    marginTop: '15px',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      marginTop: '0px',
    }
  },
  bxhbtnsmit: {
    position: 'relative',
    background: 'rgba(38, 41, 70, 0.6)',
    borderRadius: '12px',
    textAlign: 'center',
    padding: '30px 0',
    marginBottom: '15px',
    width: '100%',
    '& img': {
      width: '50px',
    },
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '18px',
      padding: '20px 0 0',
    },
    '& i': {
      fontStyle: 'inherit',
      opacity: '.4',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: '10px',
      // '&:hover': {
      //   backgroundImage: 'none',
      //   backgroundColor: 'rgba(48, 190, 133, 0.1)',
      // },
      // '&:active': {
      //   backgroundImage: 'none',
      //   backgroundColor: 'rgba(48, 190, 133, 0.5)',
      // },
    }
  },
  bxhbtnimg: {
    position: 'relative',
    height: '40px',
  },
  bxhimg1: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-40px',
    border: '1px solid #2C3036',
    borderRadius: '25px',
  },
  bxhimgsingle: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-25px',
    border: '1px solid #2C3036',
    borderRadius: '25px',
  },
  bxhimg2: {
    position: 'absolute',
    left: '50%',
    marginLeft: '-2px',
    border: '1px solid #2C3036',
    borderRadius: '25px',
  },
  bxhimg3: {
    position: 'absolute',
    zIndex: '1',
    left: '50%',
    marginLeft: '-7px',
    top: '35px',
    width: '15px !important',
  },
  bxhsmbtTwo: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: '#1E2024',
    borderRadius: '0 12px 0 18px',
    padding: '5px 10px',
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    '& i': {
      opacity: '.8',
    }
  },
  bxhPAY: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    // background: '#1C1E22',
    border: '1px solid #30BE85',
    margin: '20px 20px 10px',
    borderRadius: '6px',
    '& em': {
      fontStyle: 'inherit',
      color: 'rgba(255,255,255,0.8)',
      height: '35px',
      lineHeight: '35px',
      padding: '0 10px',
      fontFamily: "consola",
    }
  },
  bxhPAYtwo: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    // background: '#1C1E22',
    border: '1px solid #30BE85',
    margin: '10px 20px 10px 20px',
    borderRadius: '6px',
    '& em': {
      fontStyle: 'inherit',
      color: 'rgba(255,255,255,0.8)',
      height: '35px',
      lineHeight: '35px',
      padding: '0 10px',
      fontFamily: "consola",
    }
  },
  bxhPAY1: {
    display: 'flex',
    flex: '2',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    // background: '#1C1E22',
    border: '1px solid #30BE85',
    margin: '0px 5px 10px 20px',
    borderRadius: '6px',
    '& em': {
      fontStyle: 'inherit',
      color: 'rgba(255,255,255,0.8)',
      height: '35px',
      lineHeight: '35px',
      padding: '0 10px',
      fontSize: '12px',
      fontFamily: "consola",
      fontWeight: 'bold'
    }
  },
  bxhPAY2: {
    display: 'flex',
    flex: '2',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    // background: '#1C1E22',
    border: '1px solid #30BE85',
    margin: '0px 20px 10px 10px',
    borderRadius: '6px',
    '& em': {
      fontStyle: 'inherit',
      color: 'rgba(255,255,255,0.8)',
      height: '35px',
      lineHeight: '35px',
      padding: '0 10px',
      fontSize: '12px',
      fontFamily: "consola",
      fontWeight: 'bold'
    }
  },
  apyparent: {
    display: 'flex',

  },
  bxhaddmobility: {
    margin: '20px 20px 0px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '45px',
    lineHeight: '45px',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
  },
  countparent: {
    textAlign: 'right',
    marginRight: '20px',
    fontWeight: 'bold'
  },
  counttitle: {
    fontSize: '12px',
    color: '#FFFFFF',
    opacity: 0.7
  },
  wakuangparent: {
    // backgroundImage: 'linear-gradient(to bottom, #24282c, #000000)',
    borderRadius: '10px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  wakuangparent_pc: {
    borderRadius: '10px',
    justifyContent: 'center'
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
    width: '100%',//'100%',
    textAlign: 'center',//'center',
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
  TabOn: {
    opacity: '1 !important',
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '15px',
    position: 'relative',
    cursor: 'pointer',
    '& em': {
      position: 'absolute',
      width: '16px',
      height: '3px',
      bottom: '-8px',
      left: '50%',
      marginLeft: '-10px',
    }
  },
  TabOff: {
    color: '#FFFFFF',
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '15px',
    opacity: 0.6,
    cursor: 'pointer',
  },
  deatiltitle: {
    marginTop: '20px',
    color: '#BBBBBD',
    '& em': {
      fontStyle: 'normal',
      fontSize: '16px',
      fontWeight: 'bold',
      marginLeft: '3px',
      marginRight: '3px',
      color: '#FFFFFF',
      fontFamily: "consola",
    }
  },
  deatiltitle1: {
    color: '#BBBBBD',
    '& em': {
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '3px',
      marginRight: '3px',
      color: '#FFFFFF',
      fontFamily: "consola",
    }
  },
  btnparent: {
    display: 'flex'
  },
  btnparent_new: {
    marginTop: '-8px',
    display: 'flex'
  },
  bxhaddmobility_pc_left: {
    flex: '2',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '45px',
    lineHeight: '45px',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    marginLeft: '20px',
    marginRight: '10px',
    marginTop: '20px',
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
  bxhaddmobility_pc_right: {
    flex: '2',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '45px',
    lineHeight: '45px',
    fontWeight: 'bold',
    fontSize: '15px',
    borderRadius: '6px',
    marginLeft: '10px',
    marginRight: '20px',
    marginTop: '20px',
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
  clear_both: {
    clear: 'both',
  },
  titlemobil: {
    // paddingTop:'60px'
  },
  countparentnew: {
    '& span': {
      display: 'inherit',
      padding: '20px 0 0',
      fontSize: '18px',
      fontWeight: 'bold'
    }
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
      fontStyle: 'bold',
      width: '15%'
    }
  },
  tiaomuflex2: {
    width: '40%',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.45)'
  },
  poollistImgParent: {

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
    // '&:active': {
    //   backgroundImage: 'none',
    //   backgroundColor: 'rgba(19, 119, 80, 0.3)',
    // },
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
  bxhaddmobility_new: {
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    height: '32px',
    width: '80px',
    lineHeight: '32px',
    fontWeight: 'bold',
    fontSize: '13px',
    borderRadius: '6px',
    textAlign: 'center',
    float: 'right'
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
    // backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
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
  }
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
    const StakedPoolList = JSON.parse(localStorage.getItem("StakedPoolList"))//store.getStore('StakedPoolList')
    const SinglePoolList = JSON.parse(localStorage.getItem("SinglePoolList"))

    let myAllLiquidity = JSON.parse(localStorage.getItem("myAllLiquidity"));
    // console.log("myAllLiquidity-------->>>>>>>",myAllLiquidity)

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

    emitter.on(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
  }

  componentWillUnmount() {
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(BXHLISTBALANCEHOME_RETURNED, this.getBXHbalance);
    emitter.removeListener(GET_BXHList_PERPETUAL_RETURNED, this.updateList);
    emitter.removeListener(BXHCHNAGEACCOUNT, this.changeAccount) //切换账户
    // clearInterval(this.timer);
    this.setState = (state, callback) => {
      return;
    }
  };

  changeAccount = () => {
    dispatcher.dispatch({ type: GET_BXHList_PERPETUAL, content: {} })  //中心化数据
  }

  showHash = (txHash) => {
    this.setState({ snackbarMessage: null, snackbarType: null, loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  };

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
    // console.log("data ------>>>>>> ",data)
    const that = this
    const tempBxhInfo = that.state.PoolList;
    if (tempBxhInfo) {
      that.setState({ oldPoolList: tempBxhInfo })
    }
    this.setState({ PoolList: data })
    const { PoolList } = this.state
    // console.log(PoolList)
    if (PoolList) {
      dispatcher.dispatch({ type: BXHLISTBALANCEHOME, content: { asset: PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_token } })
    }
  }

  closeAlert = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变

    dispatcher.dispatch({ type: GET_BXHList_PERPETUAL, content: {} })  //中心化数据

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


  render() {
    const { classes, t, i18n } = this.props;
    const {
      value,
      account,
      loading,
      modalOpen,
      open,
      currentSelectindex,
      PoolList,
      oldPoolList,
      isMobile,
      isOnlyShowMyJoin,
      inputSearchVal,
      currentType_sort,
      currentIndex_sort,
      footerMShow,
      farmsListArr,
    } = this.state
    var address = null;
    if (account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    }
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div style={{ width: '100%' }}>
        <div className={getStyleClass('PCbroot',classes.root)}>
          <LangM isHome={true} openUnlockModal={this.openUnlockModal} />

          <div className={classes.rightcontent}>

            <div className={classes.bxhpostom}>
              <div className={classes.bxhabouslp}>
                {
                  isMobile == 2 ?
                    <div className={classes.titlemobil}>
                      <div className={classes.bxhtit}>{t('BXH.liquidityminingtitle')}</div>
                    </div>
                    :
                    <div>
                      <div className={classes.bxhtit}>{t('BXH.liquidityminingtitle')}</div>
                    </div>
                }

                {/* 当前价格、BXH余额、当前挖矿产出、当前挖矿产出市值、待奖励金额、总回购销毁数量 */}
                {
                  this.renderTransaction()
                }
                <div className={isMobile == 2 ? classes.wakuangparent : classes.wakuangparent_pc}>

                  <div className={classes.areaconter}>
                    <div className={getStyleClass('TabConter',classes.areatype)}>
                      {/* 单币切换 */}
                      {
                        (chainID === '56' || chainID === '128') && PoolList && PoolList[0].tokens[0].symbolTokens.pool_6.length > 0 ?
                          <span className={currentSelectindex === 6 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(6) }}>{t('BXH.liqPool')}<em></em></span>
                          :
                          null
                      }
                      {
                        (chainID === '137' || chainID === '43114') && PoolList && PoolList[0].tokens[0].symbolTokens.pool_6.length > 0 ?
                          <span className={currentSelectindex === 6 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(6) }}>{t('BXH.Single')}<em></em></span>
                          :
                          null
                      }
                      {
                        (chainID === '56' || chainID === '128') && PoolList && PoolList[0].tokens[0].symbolTokens.pool_5.length > 0 ?
                          <span className={currentSelectindex === 5 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(5) }}>{t('BXH.Single1')}<em></em></span>
                          :
                          PoolList && PoolList[0].tokens[0].symbolTokens.pool_5.length > 0 ?
                          <span className={currentSelectindex === 5 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(5) }}>{t('BXH.Single')}<em></em></span>
                          :
                          null
                      }
                      {/* HECO链，增加主區(V2) Timo */}
                      {
                        chainID === '128' && PoolList && PoolList[0].tokens[0].symbolTokens.pool_7.length > 0  ?
                        <span className={currentSelectindex === 7 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(7) }}>{t('BXH.mainareaV2')}<em></em></span>
                        :
                        null
                      }
                      {
                        (PoolList && PoolList[0].tokens[0].symbolTokens.pool_1.length > 0) || (PoolList && PoolList[0].tokens[0].symbolTokens.pool_2.length > 0) ?
                          <i style={{fontStyle: 'inherit'}}>
                            {/* HECO链，把‘主區’修改为‘主區(V1)’，增加主區(V2) Timo */}
                            {
                            chainID === '128' ?
                            <span className={currentSelectindex === 0 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(0) }}>{t('BXH.mainareaV1')}<em></em></span>
                            :
                            <span className={currentSelectindex === 0 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(0) }}>{t('BXH.mainarea')}<em></em></span>
                            }
                          </i>
                          :
                          null
                      }
                      {/* {
                        PoolList && PoolList[0].tokens[0].symbolTokens.pool_2.length > 0 ?
                          <span className={currentSelectindex === 1 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(1) }}>FARMS<em></em></span>
                          :
                          null
                      } */}
                      {
                        PoolList && PoolList[0].tokens[0].symbolTokens.pool_3.length > 0 ?
                          <span className={currentSelectindex === 2 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(2) }}>{t('BXH.chuangxinqu')}<em></em></span>
                          :
                          null
                      }
                      {
                        PoolList && PoolList[0].tokens[0].symbolTokens.pool_4.length > 0 ?
                          <span className={currentSelectindex === 3 ? "bxhTabOn" : "bxhTabOff"} onClick={() => { this.changeSelectIndex(3) }}>LP<em></em></span>
                          :
                          null
                      }

                    </div>
                    {
                      isMobile === 2 ?
                        null
                        :
                        <div className={classes.areass}>
                          <div className={classes.arealistss} onClick={() => { this.changeListSS() }}>
                            {
                              chainID === '56' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable1.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '66' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable2.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '1' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable3.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '137' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable4.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '43114' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable5.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable.png') : require('../../assets/bxh/unselect.png')} alt="" />
                            }
                            <span style={{ position: 'relative', top: '1px' }}>{t('BXH.selectziya')}</span>
                          </div>

                          <TextField
                            fullWidth
                            // disabled={ loading }
                            className={getStyleClass('serInput',classes.bxhInput)}
                            // id={ '' + asset.id + '_' + type }
                            value={inputSearchVal || ''}
                            // error={ amountError }
                            onChange={this.onChange.bind(this, "")}
                            onFocus={this.onFocusFrom.bind()}  // 获得焦点
                            onBlur={this.onBlurFrom.bind()} // 失去焦点
                            placeholder={t('BXH.searchtitle')}
                            variant="outlined"
                          />
                          <img src={require('../../assets/bxh/search.png')} alt="" className={classes.searchImg} />
                        </div>
                    }
                  </div>

                  <div className={getStyleClass('listConter',classes.bxhpoolswms)}>
                    {
                      isMobile === 2 ?
                        <div className={classes.areass}>
                          <div className={classes.arealistss} onClick={() => { this.changeListSS() }}>
                            {
                              chainID === '56' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable1.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '1' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable3.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '137' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable4.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              chainID === '43114' ? 
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable5.png') : require('../../assets/bxh/unselect.png')} alt="" />
                              :
                              <img src={isOnlyShowMyJoin ? require('../../assets/bxh/selectable.png') : require('../../assets/bxh/unselect.png')} alt="" />
                            }
                            <span style={{ position: 'relative', top: '1px' }}>{t('BXH.selectziya')}</span>
                          </div>

                          <TextField
                            fullWidth
                            // disabled={ loading }
                            className={getStyleClass('serInput',classes.bxhInput)}
                            // id={ '' + asset.id + '_' + type }
                            value={inputSearchVal || ''}
                            // error={ amountError }
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

                    {
                      isMobile === 2 ?
                        <div className={classes.tiaomuParent}>
                          {/* 交易对/TVL */}
                          <div className={classes.tiaomuflex2}>
                            <div style={{ display: 'flex' }}>
                              <div onClick={() => { this.changeSortType(1) }}>{t('BXH.jiaoyiduititle')}/TVL</div>
                              {
                                currentType_sort === 1 ?
                                  currentIndex_sort !== 1 ?
                                    currentIndex_sort === 2 ?
                                      <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                    :
                                    <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                  :
                                  <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                              }
                            </div>
                          </div>
                          {/* 产量 */}
                          <div className={classes.tiaomu} style={{ position: 'relative' }} >
                            <div style={{ position: 'absolute', right: '0px', display: 'flex' }}>

                              {
                                (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                                <div style={{ textAlign: 'right' }} onClick={() => { this.changeSortType(2) }}>{t('BXH.chanliangtitle')}/{t('BXH.Farming')}</div>
                                :
                                chainID === '128'?
                                <div style={{ textAlign: 'right' }} onClick={() => { this.changeSortType(2) }}>{t('BXH.chanliangtitle')}(USDT)</div>
                                :
                                <div style={{ textAlign: 'right' }} onClick={() => { this.changeSortType(2) }}>{t('BXH.chanliangtitle')}(BXH)</div>
                              }
                              
                              {
                                currentType_sort === 2 ?
                                  currentIndex_sort !== 1 ?
                                    currentIndex_sort === 2 ?
                                      <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                    :
                                    <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                  :
                                  <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                              }
                            </div>
                          </div>
                          {/* apy */}
                          <div className={classes.tiaomu}>
                            {
                              currentSelectindex !== 5 ?
                                <div style={{ position: 'relative', right: '0px', zIndex: '1' }}>
                                  <div style={{ position: 'absolute', right: '0px', display: 'flex' }}>
                                    <div style={{ textAlign: 'right' }} onClick={() => { this.changeSortType(3) }}>APR</div>
                                    {
                                      currentType_sort === 3 ?
                                        currentIndex_sort !== 1 ?
                                          currentIndex_sort === 2 ?
                                            <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                            :
                                            <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                          :
                                          <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                        :
                                        <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                    }
                                  </div>
                                </div>
                                :
                                <div style={{ position: 'relative', right: '0px', zIndex: '1' }}>
                                  <div style={{ position: 'absolute', right: '0px', display: 'flex' }}>
                                    <div style={{ textAlign: 'right' }} onClick={() => { this.changeSortType(3) }}>APR</div> 
                                  {
                                    currentType_sort === 3 ?
                                      currentIndex_sort !== 1 ?
                                        currentIndex_sort === 2 ?
                                          <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                          :
                                          <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                        :
                                        <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '4px', marginLeft: '2px' }} />
                                  }
                                </div>
                              </div>
                            }
                            
                          </div>
                        </div>
                        :
                        <div className={classes.tiaomuParent}>
                          <div className={classes.tiaomu} style={{ textAlign: 'left', marginLeft: '10px', width: '20%' }}>{t('BXH.jiaoyiduititle')}</div>
                          {/* 产量 */}
                          <div className={classes.tiaomu} style={{ position: 'relative', marginLeft: '-8px', width: (chainID === '56'||chainID === '128')&&currentSelectindex===5 ? '10%' : '20%' }}>
                            <div style={{ position: 'absolute', right: '0px', display: 'flex' }}>
                              {/* BSC、HECO链单币只显示日产量 */}
                              {
                                (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                                <div style={{ textAlign: 'right', cursor: 'pointer', }} onClick={() => { this.changeSortType(2) }}>{t('BXH.daylyoutput')}</div>
                                :
                                <div style={{ textAlign: 'right', cursor: 'pointer', }} onClick={() => { this.changeSortType(2) }}>{t('BXH.daymonthlyoutput')}</div>
                              }
                              {
                                currentType_sort === 2 ?
                                  currentIndex_sort !== 1 ?
                                    currentIndex_sort === 2 ?
                                      <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(2) }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(2) }} />
                                    :
                                    <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(2) }} />
                                  :
                                  <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(2) }} />
                              }
                            </div>
                          </div>

                          {/* 周期 */}
                          {
                            (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                            <div className={classes.tiaomu} style={{ position: 'relative', width: '15%', marginLeft: '0px' }}>
                              <div style={{ position: 'absolute', right: '0px', display: 'flex' }}>
                                <div style={{ textAlign: 'right', zIndex: '1' }}>{t('BXH.Farming')}</div>
                              </div>
                            </div>
                            :
                            null
                          }

                          {/* TVL */}
                          <div className={classes.tiaomu} style={{ position: 'relative', width: '20%', zIndex: '9999' }}>
                            <div style={{ position: 'absolute', right: '5px', display: 'flex' }}>
                              <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={() => { this.changeSortType(1) }}>TVL</div>
                              {
                                currentType_sort === 1 ?
                                  currentIndex_sort !== 1 ?
                                    currentIndex_sort === 2 ?
                                      <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(1) }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(1) }} />
                                    :
                                    <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(1) }} />
                                  :
                                  <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', cursor: 'pointer' }} onClick={() => { this.changeSortType(1) }} />
                              }
                            </div>
                          </div>

                          {/* APY */}
                          {
                            currentSelectindex !== 5 ?
                              <div className={getStyleClass('pcjmosl',classes.tiaomu)}>
                                <div style={{ position: 'absolute', right: '7px', display: 'flex' }}>
                                  <div style={{ textAlign: 'right', cursor: 'pointer', zIndex: '1' }} onClick={() => { this.changeSortType(3) }}>APR</div>
                                  
                                  {
                                    currentType_sort === 3 ?
                                      currentIndex_sort !== 1 ?
                                        currentIndex_sort === 2 ?
                                          <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                          :
                                          <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                        :
                                        <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                  }

                                </div>
                              </div>
                              :
                              <div className={classes.tiaomu} style={{ position: 'relative', width: '15%', marginLeft: '0px' }}>
                                <div style={{ position: 'absolute', right: '7px', display: 'flex' }}>
                                  <div style={{ textAlign: 'right', cursor: 'pointer', zIndex: '1' }} onClick={() => { this.changeSortType(3) }}>APR</div>
                                  
                                  {
                                    currentType_sort === 3 ?
                                      currentIndex_sort !== 1 ?
                                        currentIndex_sort === 2 ?
                                          <img src={require('../../assets/bxh/sort_up.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                          :
                                          <img src={require('../../assets/bxh/sort_down.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                        :
                                        <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                      :
                                      <img src={require('../../assets/bxh/sort_normal.png')} style={{ width: '7px', height: '10px', marginTop: '25px', marginLeft: '2px', zIndex: '9999', cursor: 'pointer' }} onClick={() => { this.changeSortType(3) }} />
                                  }
                                  {
                                    currentSelectindex !== 5 ?
                                      <div style={{ width: '200px', position: 'absolute', marginLeft: '-50px', whiteSpace: 'pre', cursor: 'pointer' }}>
                                        <ClickAwayListener onClickAway={this.handleTooltipClose}>
                                          {
                                            chainID === '56' || chainID === '66' || chainID === '1' ?
                                            <BscCustomTooltip title={t('BXH.apyshuomingcontent')}
                                              PopperProps={{
                                                disablePortal: true,
                                              }}
                                              onClose={this.handleTooltipClose}
                                              open={this.state.open}
                                              disableFocusListener
                                              disableHoverListener
                                              disableTouchListener
                                              arrow
                                              placement="bottom">
                                              <i className={classes.imgparent}>
                                                <img src={require('../../assets/bxh/wenti.png')} style={{ width: '13px', height: '13px', marginTop: '24px', marginLeft: '5px' }} onClick={() => { this.handleTooltipOpen() }} />
                                              </i>

                                            </BscCustomTooltip>
                                            :
                                            <CustomTooltip title={t('BXH.apyshuomingcontent')}
                                              PopperProps={{
                                                disablePortal: true,
                                              }}
                                              onClose={this.handleTooltipClose}
                                              open={this.state.open}
                                              disableFocusListener
                                              disableHoverListener
                                              disableTouchListener
                                              arrow
                                              placement="bottom">
                                              <i className={classes.imgparent}>
                                                <img src={require('../../assets/bxh/wenti.png')} style={{ width: '13px', height: '13px', marginTop: '24px', marginLeft: '5px' }} onClick={() => { this.handleTooltipOpen() }} />
                                              </i>

                                            </CustomTooltip>
                                          }
                                        </ClickAwayListener>
                                      </div>
                                      :
                                      null
                                  }
                                </div>
                              </div>
                          }

                        </div>
                    }
                    <div style={{ background: 'rgba(151,151,151,0.15)', width: '96%', height: '2px', marginLeft: '2%', marginTop: '5px' }}></div>
                    {/* 质押池列表 */}
                    {
                      currentSelectindex === 6 ?
                        this.renderBXHPledge()
                        :
                        null
                    }
                    {/* 单币挖矿 */}
                    {
                      currentSelectindex === 5 ?
                        <div style={{ minHeight: '200px' }}>
                          {/* 单币里增加新矿池 */}
                          {
                            chainID === '56'?
                            <div>
                              {/* {
                                farmsListArr.map((item, index) => {
                                  return this.renderBXHNewsSingle(item, index)
                                })
                              } */}
                              {this.renderBXHDataSingle()}
                            </div>
                            :
                            null
                          }
                          {this.renderBXHSingle()}
                        </div>
                        :
                        null
                    }
                    {/* 流动性列表 主區(V2) Timo */}
                    {
                      currentSelectindex === 7 ?
                        this.renderMainBXH2()
                        :
                        null
                    }
                    {/* 流动性列表 */}
                    {
                      currentSelectindex === 0 ?
                        this.renderBXH()
                        :
                        null
                    }
                    {/* FARMS */}
                    {/* {
                      currentSelectindex === 1 ?
                        this.renderBXHPingTai()
                        :
                        null
                    } */}
                    {
                      currentSelectindex === 2 ?
                        this.renderBXHChuangXin()
                        :
                        null
                    }
                    {
                      currentSelectindex === 3 ?
                        this.renderSingle()
                        :
                        null
                    }
                  </div>

                  <div className={classes.clear_both}></div>

                </div>

              </div>
            </div>


            {modalOpen && this.renderModal()}

            {
              isMobile == 1 ?
                null
                :
                <div>
                  {
                    footerMShow ?
                      <FooterM pagetype="liquidity" />
                      :
                      null
                  }
                </div>

            }

          </div>

        </div>

          {/* pc底部 */}
          {
            isMobile == 1 ?
            <FooterPC />
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

  onChange = (value, event) => {
    // console.log("改变-------->>>>>>", event.target.value)
    this.setState({ inputSearchVal: event.target.value })

    this.reRenderList(this.state.isOnlyShowMyJoin, event.target.value)
  }

  // 当前价格、BXH余额、当前挖矿产出、当前挖矿产出市值、待奖励金额、总回购销毁数量
  renderTransaction = () => {

    const { classes, t } = this.props
    const {
      rewardBXHFactory,
      PoolList,
      oldPoolList,
      isMobile
    } = this.state
    // console.log("PoolList--->>>>>",PoolList)
    let chainID = localStorage.getItem('chainIDSwitch')

    if (isMobile == 2) {
      return (
        <div className={classes.bxhcontopms}>
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
              <span className={classes.countparent}>{
                rewardBXHFactory ?
                  this.SaveToTwoWei(rewardBXHFactory[0].tokens[0].bxhbanance + "") + ""
                  :
                  "0.00"
              }
              </span>
            </em>

          </div>
          <div className={classes.BXHziincont}>
            <div className={getStyleClass('bxhlistbg',classes.BXHzixonm)}>
              <span>{t('BXH.homeliquzhiya')}($)</span>
              <em className={classes.refreshcount}>{PoolList ?
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
              </em>
            </div>
            <div className={getStyleClass('bxhlistbg',classes.BXHzixonm1)}>
              <span>{t('BXH.listproduce')}</span>
              <em className={classes.refreshcount1}>{PoolList ?
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
              </em>
            </div>
          </div>
          <div className={classes.BXHziincont1}>
            <div className={getStyleClass('bxhlistbg',classes.BXHzixonm)}>
              <span>{t('BXH.listmarket')}($)</span>
              <em className={classes.refreshcount}>{PoolList ?
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
              </em>
            </div>
            <div className={getStyleClass('bxhlistbg',classes.BXHzixonm1)}>
              <span>{t('BXH.listmoney')}($)</span>
              <em className={classes.refreshcount1}>{PoolList ?
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
              </em>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={classes.bxhcontopms}>

          <div className={classes.BXHziincont}>
            <div className={getStyleClass('PClisttitbg',classes.BXHzixonm)}>
              <span>{t('BXH.homeliquzhiya')}($)</span>
              <em className={classes.refreshcount}>{PoolList ?
                (
                  <CountUp
                    start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? PoolList[0].tokens[0].symbolTokens.bxh_info.tvl_total : 0)}
                    end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.tvl_total : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>
            <div className={getStyleClass('PClisttitbg',classes.BXHzixonm1)}>
              <span>{t('BXH.listproduce')}</span>
              <em className={classes.refreshcount1}>{PoolList ?
                (
                  <CountUp
                    start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine : 0)}
                    end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>
          </div>
          <div className={classes.BXHziincont1}>
            <div className={getStyleClass('PClisttitbg',classes.BXHzixonm)}>
              <span>{t('BXH.listmarket')}($)</span>
              <em className={classes.refreshcount}>{PoolList ?
                (
                  <CountUp
                    start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                    end={this.SaveToTwoWei(PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>
            <div className={getStyleClass('PClisttitbg',classes.BXHzixonm1)}>
              <span>{t('BXH.listmoney')}($)</span>
              <em className={classes.refreshcount1}>{PoolList ?
                (
                  <CountUp
                    start={this.SaveToTwoWei(oldPoolList && oldPoolList.length > 0 && oldPoolList[0].tokens.length > 0 ? (820000000 - PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine) * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                    end={this.SaveToTwoWei(PoolList ? (820000000 - PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_total_mine) * PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>
          </div>
        </div>
      )
    }

  }
  //判断当前矿池自己是否参与过
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

  //选择只显示已质押
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

      if (isSelect && keyStr !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isSelect && keyStr === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          // console.log('aaaa===========>', dataList)
          dataList_ss.push(dataList[i])
        }
      } else if (!isSelect && keyStr !== "") { //关键字搜索，参与没参与的都可以
        if (isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else {
        dataList_ss.push(dataList[i])
      }
    }

    // console.log("dataList_ss-->>>>>",dataList_ss)
    return dataList_ss
  }
  reRenderList = (isSelect, keyStr) => {
    // console.log("wdwd")

    const { currentSelectindex, PoolList, farmsListArr } = this.state

    let dataList_main = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_1, isSelect, keyStr)
    let dataList_flat = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_2, isSelect, keyStr)
    let dataList_innov = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_3, isSelect, keyStr)
    let dataList_single = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_4, isSelect, keyStr)
    let dataList_Twist = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_5, isSelect, keyStr)
    let dataList_Pledge = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_6, isSelect, keyStr)
    let dataList_flat2 = this.ssListByState(PoolList[0].tokens[0].symbolTokens.pool_7, isSelect, keyStr)
    let dataList_singTwist = this.ssListByState(farmsListArr, isSelect, keyStr)

    if (currentSelectindex == 0) { //主区

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

    } else if (currentSelectindex == 2) {//创新区

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

    } else if (currentSelectindex == 3) {//创新区

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

    } else if (currentSelectindex == 5) {//单币

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

    } else if (currentSelectindex == 6) {//质押池

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

    } else if (currentSelectindex == 7) {//主區(V2) Timo

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

  //TVL=1 产量=2 APY=3 初始值0
  //正常=1 正序=2 倒序=3 初始值1
  changeSortType = (type) => {
    //currentType_sort
    //currentIndex_sort
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
  //TVL=1 产量=2 APY=3 初始值0
  //正常=1 正序=2 倒序=3 初始值1
  sortListByType = (index) => {
    const { currentType_sort, currentIndex_sort, PoolList } = this.state
    // console.log('PoolList====>', PoolList)
    if (!PoolList || !PoolList[0].tokens[0].symbolTokens || (PoolList[0].tokens[0].symbolTokens.pool_1.length <= 0 && PoolList[0].tokens[0].symbolTokens.pool_6.length <= 0) ) {
      return;
    }
    let dataList = []
    if (index == 1) {
      // 将矿池里面的'FARMS'放到'主区'里面，排序为在主区最前面
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

    let tempArray = []

    if (currentType_sort === 0 && currentIndex_sort === 1) {
      return dataList
    } else if (currentType_sort === 1) { //按照TVL排序

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.tvl_total) - parseFloat(b.tvl_total)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.tvl_total) - parseFloat(b.tvl_total)) > 0 ? -1 : 1 })
      }

    } else if (currentType_sort === 2) { //产量排序

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.bxh_day) - parseFloat(b.bxh_day)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.bxh_day) - parseFloat(b.bxh_day)) > 0 ? -1 : 1 })
      }

    } else if (currentType_sort === 3) { //APY排序

      if (currentIndex_sort == 2) {
        return dataList.sort((a, b) => { return (parseFloat(a.totalapy) - parseFloat(b.totalapy)) > 0 ? 1 : -1 })
      } else if (currentIndex_sort == 3) {
        return dataList.sort((a, b) => { return (parseFloat(a.totalapy) - parseFloat(b.totalapy)) > 0 ? -1 : 1 })
      }

    }
    return dataList
  }

  // 流动性列表 主区
  renderBXH = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, StakedPoolList } = this.state
    // if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_1.length <= 0) {
    //   return;
    // }
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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

  // 流动性列表 主區(V2)  Timo
  renderMainBXH2 = () => {
    const { PoolList, isOnlyShowMyJoin, inputSearchVal, StakedPoolList } = this.state
    // if (!PoolList || !PoolList[0].tokens[0].symbolTokens || PoolList[0].tokens[0].symbolTokens.pool_1.length <= 0) {
    //   return;
    // }
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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

  // 质押池列表
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

        if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
          if (isShow && isInputVal) {
            dataList_ss.push(dataList[i])
          }
        } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
          if (isShow) {
            dataList_ss.push(dataList[i])
          }
        } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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
  //渲染列表 原版
  renderBXHPool = (rewardDFKiiPool, index) => {
    const { classes, t } = this.props
    const { isMobile, isOnlyShowMyJoin, inputSearchVal } = this.state

    return (

      <div key={rewardDFKiiPool.id} className={index % 2 == 0 ? classes.listitem : classes.listitem1}>
        <div className={classes.bxhbtnquan}>
          <div className={classes.bxhbtnsmit}>
            <div className={classes.bxhbtnimg}>
              <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.bxhimg1} />
              <img src={require('../../assets/renzhen.png')} className={classes.bxhimg3} />
              <img src={rewardDFKiiPool.symbol1Img_Show} className={classes.bxhimg2} />
            </div>

            <span>{rewardDFKiiPool.symbolPair}</span>
            <div className={classes.deatiltitle}>
              Earn
              <em className={classes.countparentnew}>{rewardDFKiiPool ?
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
              BXH (Per Day)
            </div>
            <div className={classes.deatiltitle1}>
              Earn
              <em className={classes.countparentnew}>{rewardDFKiiPool ?
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
              BXH (Per Month)
            </div>

            <div className={classes.bxhPAY}>
              <em>APR</em>
              <em className={classes.rightparent}>{rewardDFKiiPool ?
                (
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.totalapy : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    suffix="%">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>

            <div className={classes.bxhPAYtwo}>
              <em>TVL</em>
              <em className={classes.rightparent}>{rewardDFKiiPool ?
                (
                  <CountUp
                    start={0}
                    end={this.SaveToTwoWei(rewardDFKiiPool ? rewardDFKiiPool.tvl_total : 0)}
                    duration={2.0}
                    separator=","
                    decimals={2}
                    decimal="."
                    prefix="$">
                  </CountUp>
                )
                : '--'}
              </em>
            </div>

            {
              isMobile == 2 ?
                <div className={classes.bxhaddmobility} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>{t('BXH.diyatitle')}</div>
                :
                <div className={classes.btnparent}>
                  <div className={classes.bxhaddmobility_pc_left} onClick={() => { this.navigateBXHStakePC(rewardDFKiiPool) }}>{t('BXH.diyatitle')}</div>
                  <div className={classes.bxhaddmobility_pc_right} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>{t('BXH.addzijin')}</div>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
  //新版渲染
  renderBXHPool_New = (rewardDFKiiPool, index, isLast) => {
    const { classes, t } = this.props
    const { isMobile, isOnlyShowMyJoin, inputSearchVal, currentSelectindex, PoolList } = this.state
    let miningAPY = t('BXH.miningAPY') + this.SaveTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_pool : 0) + '% + ' + t('BXH.ServiceAPY') + this.SaveTwoWei(rewardDFKiiPool ? rewardDFKiiPool.apy_ex : 0) + '%'
    let chainID = localStorage.getItem('chainIDSwitch')
    let bxh_price = PoolList ? PoolList[0].tokens[0].symbolTokens.bxh_info.bxh_price : 0

    if (isMobile === 2) {
      return (
        <div key={rewardDFKiiPool.id}>
          <div key={rewardDFKiiPool.id} className={classes.listItemParent}>
            {/* 第一列 */}
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
            {/* 第二列 */}
            <div style={{ textAlign: 'right', width: '30%', paddingTop: '5px' }} onClick={() => { this.navigateBXHStake(rewardDFKiiPool) }}>
              {/* HECO链挖矿产出为USDT，把BXH日产量 * BXH单价 */}
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

              {/* 移动端周期 */}
              {
                (chainID === '56'||chainID === '128')&&currentSelectindex===5?
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <em className={classes.rightparent_new}>
                    <span>10</span>
                  </em>
                  (day)
                </div>
                :
                // HECO链挖矿产出为USDT，把BXH日产量 * BXH单价
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
            {/* 第三列 */}
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
            {/* 交易对 */}
            <div style={{ display: 'flex', width: '20%' }}>
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

            {/* BSC、HECO链单币只显示日产量 */}
            {
              (chainID === '56'||chainID === '128')&&currentSelectindex===5?  
              // 日产量
              <div style={{ width: (chainID === '56'||chainID === '128')&&currentSelectindex===5 ? '10%' : '20%' }}>
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
              <div style={{ width: '20%', marginTop: '-10px' }}>
                {/* HECO链挖矿产出为USDT，把BXH日产量 * BXH单价 Timo */}
                {
                  chainID === '128'?
                  // 只有單幣(V2)、主區(V2)需要转换成USDT挖矿
                  <div>
                    {
                        currentSelectindex===6 || currentSelectindex===7 ?
                        <div>
                    {/* 日产量 */}
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
                    {/* 月产量 */}
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
                    {/* 日产量 */}
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
                    {/* 月产量 */}
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
                    {/* 日产量 */}
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
                    {/* 月产量 */}
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

            {/* 周期 */}
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

            <div style={{ position: 'relative', width: '20%' }}>
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

  // 单币里增加新矿池
  renderBXHNewsSingle = (item, index) => {
    const { classes, t } = this.props
    const { isMobile } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    let timeDate = Date.parse(new Date())/1000
    if (isMobile === 2) {
      return (
        <div key={item.id}>
          <div className={classes.listItemParent}>

            {/* 第一列 */}
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
                    // Finshed表示已经结束的
                    <span style={{background: '#363636',color:'#999'}}>Finshed</span>
                    :
                    // Live表示正在挖矿
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

            {/* 第二列 */}
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
              {/* 移动端周期 */}
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                <em className={classes.rightparent_new}>{isNoEmpty(item)&&isNoEmpty(item.userInfo)?item.userInfo.cycle:'--'}
                </em>
                (day)
              </div>
            </div>

            {/* 第三列 */}
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

            {/* 交易对 */}
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
                  // Finshed表示已经结束的
                  <span style={{background: '#363636',color:'#999'}}>Finshed</span>
                  :
                  // Live表示正在挖矿
                  timeDate < item.timeEnd &&  timeDate > item.timeStart ?
                  <span>Live</span>
                  :
                  <span>News</span>
                }
              </div>
            </div>

            {/* 日产量 */}
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

            {/* 周期 */}
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

  // 单币挖矿
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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

  //平台区 流动性列表
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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

  //创新区 流动性列表
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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
  //单币挖矿
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

      if (isOnlyShowMyJoin && inputSearchVal !== "") {  //仅显示参加过的并且输入关键字
        if (isShow && isInputVal) {
          dataList_ss.push(dataList[i])
        }
      } else if (isOnlyShowMyJoin && inputSearchVal === "") {//仅显示参加过的，关键字为空
        if (isShow) {
          dataList_ss.push(dataList[i])
        }
      } else if (!isOnlyShowMyJoin && inputSearchVal !== "") { //关键字搜索，参与没参与的都可以
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
            {/* 第一列 */}
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
            {/* 第二列 */}
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
            {/* 交易对 */}
            <div style={{ display: 'flex', width: '20%' }}>
              <div className={classes.poollistImgParent}>
                <img src={rewardDFKiiPool.symbol0Img_Show} className={classes.imgStyleNew} />
              </div>

              <div style={{ marginLeft: '2px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{rewardDFKiiPool.symbol0}</span>
              </div>
            </div>

            <div style={{ width: '20%', marginTop: '-10px' }}>
              {/* 日产量 */}
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
              {/* 月产量 */}
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
    // console.log("rewardPool--->>>>>>",rewardPool)
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

}

export default withNamespaces()(withRouter(withStyles(styles)(BxhList)));