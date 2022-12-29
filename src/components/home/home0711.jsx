import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  TextField,
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import OpeningModal from '../unlock/openingModal.jsx'
import Lang from '../unlock/Lang.jsx'
import LangM from '../unlock/LangM.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import CountUp from 'react-countup';
import { toShowDollar, formatDate, formatDate1, formatTimeDate, _getValuemultip1, _getValueAdd2, _getValuemultip, getStyleClass,isEmpty,isNoEmpty } from '../../config/constantFunction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import FooterM from '../unlock/FooterM.jsx';
import FooterPC from '../unlock/FooterPC.jsx';
import getLangURLWithURL from '../../util/linkHelper';
import { getModuleData } from '../../constants/api'
import { client } from '../../constants/apollo/client'
import { Market } from '../../constants/apollo/queries'
  
import allStakeBg from '../../assets/bxh/homenewbg.png'
  
import {
  ERROR,
  BXHGETAIRDROP,
  BXHGETAIRDROP_RETURNED,
  BXHYIELDGETAIRDROP,
  BXHYIELDGETAIRDROP_RETURNED,
  GET_PASSEXCHANGE_PERPETUAL,
  BXH_HOMEBALANCE,
  BXH_HOMEBALANCE_RETURNED,
  BXHCHNAGEACCOUNT,
} from '../../constants'
  
const styles = theme => ({
  root: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#191B2E',
    [theme.breakpoints.up('sm')]: {
      minWidth: '900px',
      justifyContent: 'center',
    }
  },
  content: {
    padding: '10px',
    [theme.breakpoints.up('sm')]: {
      width: '900px',
    }
  },
  pcContent: {
    paddingTop: '65px',
    paddingBottom: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    color: '#FFFFFF',
    zIndex: '99',
  },
  pcBg: {
    position: 'fixed',
    width: '100%',
    left: '0',
    right: '0',
    bottom: '0',
  },
  pcTitle: {
    fontSize: '38px',
    fontWeight: 'bolder',
    marginTop: '32px',
  },
  pcSubTitle: {
    fontSize: '38px',
    fontWeight: '200',
  },
  pcDesc: {
    fontSize: '17px',
    marginTop: '17px',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  pcPriceContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  pcPriceContentItem: {
    width: '520px',
    height: '120px',
    background: 'linear-gradient(to bottom, rgba(35, 38, 65, 0.16), rgba(35, 38, 65, 1))',
    border: '2px solid #2B2F50',
    borderRadius: '6px',
    padding: '30px 25px',
    position: 'relative',
    cursor: 'pointer',
    fontFamily: 'PingFang SC Medium',
    letterSpacing: '1px',
    '&:hover': {
      background: 'none',
      backgroundColor: 'rgba(48, 190, 133, 0.1)',
    },
    '&:active': {
      background: 'none',
      backgroundColor: 'rgba(48, 190, 133, 0.5)',
    },
  },
  pcPriceContentItemTitle: {
    fontSize: '17px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  pcPriceContentItemPrice: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  pcPriceContentPrice: {
    fontWeight: 'bold',
    fontSize: '17px',
  },
  pcPriceContentItemAction: {
    color: '#30BE85',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '25px',
    position: 'absolute',
    bottom: '25px',
    right: '25px',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: '25px',
      height: '25px',
      marginLeft: '10px',
    }
  },
  pcGovernance: {
    marginTop: '35px',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pcGovernanceItem: {
    width: '168px',
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      width: '50px',
      height: '50px',
    },
    '& div': {
      textAlign: 'center',
    },
  },
  pcGovernanceItemTitle: {
    marginTop: '4px',
    fontSize: '17px',
    fontWeight: 'bolder',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  pcGovernanceItemDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  pcLingQuTip: {
    marginTop: '35px',
  },
  pcLingQuTipDesc: {
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center'
  },
  pcLingQuTipBtn: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#30BE85',
    textDecoration: 'underline',
    letterSpacing: '1px',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  },
  pcBXHEmblem: {
    width: '108px',
    height: '47px',
    marginTop: '47px',
  },
  moduleTitle: {
    marginTop: '30px',
    fontSize: '15px',
    color: '#30BE85',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginTop: '70px',
      fontSize: '22px',
    },
  },
  leftLine: {
    width: '102px',
    marginRight: '8px',
    [theme.breakpoints.up('sm')]: {
      width: '226px',
    },
  },
  rightLine: {
    width: '102px',
    marginLeft: '8px',
    [theme.breakpoints.up('sm')]: {
      width: '226px',
    },
  },
  auditLogo: {
    marginTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
    textAlign: 'center',
    width: '50%',
    '& img': {
      width: '100%',
      cursor: 'pointer',
      filter: 'none',
      '&:hover': {
        filter: 'brightness(80%)',
      },
      '&:active': {
        filter: 'brightness(50%)',
      },
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '30px',
      marginLeft: '10px',
      marginRight: '10px',
      '& img': {
        width: '163px',
        height: '60px',
      }
    }
  },
  moduleSubTitle: {
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    width:'100px',
    '& div': {
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255,0.6)',
      [theme.breakpoints.up('sm')]: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: '14px',
      }
    },
    '& img': {
      marginTop: '20px',
      width: '33px',
      height: '40px',
      cursor: 'pointer',
      filter: 'none',
      '&:hover': {
        filter: 'brightness(80%)',
      },
      '&:active': {
        filter: 'brightness(50%)',
      },
      [theme.breakpoints.up('sm')]: {
        width: '46.2px',
        height: '56px',
      },
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '30px',
    }
  },
  BXHHomeCont: {
    display: 'flex',
    background: '#000',
    borderRadius: '17.5px',
    height: '45px',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  BXHPrice: {
    width: '115px',
    padding: '5px 20px',
    backgroundImage: 'linear-gradient(to right, #40A5EE, #48D675)',
    borderRadius: '17.5px',
    '& span': {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    '& i': {
      display: 'block',
      fontStyle: 'inherit',
      color: '#656567',
      fontSize: '12px',
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
      fontWeight: 'bold',
    }
  },
  
  BXHProntms: {
    marginRight: '20px',
    marginTop: '5px',
    textAlign: 'right',
    fontFamily: "consola",
    '& span': {
      display: 'block',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'right'
    },
    '& i': {
      display: 'block',
      fontStyle: 'inherit',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '11px',
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      color: '#FD9877',
      fontSize: '12px',
    }
  },
  BXHFootbg: {
    position: 'fixed',
    right: '0px',
    bottom: '0',
  },
  BXHTitle: {
    fontSize: '28px',
    fontWeight: '700',
  },
  BXHTitdx: {
    fontSize: '17px',
    color: '#949697',
    marginTop: '5px',
  },
  BXHicos: {
    margin: '30px 0px 24px 0px',
    '& img': {
      height: '22px',
    },
  },
  BXHCntmer: {
    color: '#FFFFFF',
    opacity: 0.4,
    marginBottom: '30px'
  },
  btnContent: {
    left: '35px',
    right: '35px',
    position: 'absolute',
    zIndex: '99',
    [theme.breakpoints.up('sm')]: {
      left: '0',
      position: 'relative',
    },
  },
  BXHClickduihuan: {
    width: '100%',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '8px',
    marginBottom: '15px',
    zIndex: '99',
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    '& img': {
      width: '15px',
      verticalAlign: 'sub',
      marginRight: '5px',
    },
    '&:active': {
      filter: 'brightness(50%)',
    },
  },
  BXHClickOption: {
    width: '100%',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '8px',
    marginBottom: '10px',
    zIndex: '99',
    background: '#1B2C37',
    color: '#2EBC84',
    cursor: 'pointer',
    '& img': {
      verticalAlign: 'sub',
      marginRight: '5px',
      height: '17px'
    },
    '&:active': {
      filter: 'brightness(50%)',
    },
  },
  BXHlqcont: {
    marginTop: '40px',
    bottom: '0',
    [theme.breakpoints.up('sm')]: {
      width: '900px',
    }
  },
  BXHlqtit: {
    fontWeight: '500',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  BXHlqtittip: {
    fontWeight: '500',
    fontSize: '11px',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '2px',
    width: '80%'
  },
  BXHlqucont: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#2EBC84',
    textDecoration: 'underline',
    letterSpacing: '1px',
    marginTop: '5px',
    marginLeft: '5px',
  },
  governance: {
    marginTop: '30px',
    display: 'flex',
    width: '100%',
  },
  governanceItem: {
    width: '33.3%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      width: '45px',
      height: '45px',
    },
    '& div': {
      textAlign: 'center',
    },
  },
  governanceItemTitle: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  governanceItemDesc: {
    marginTop: '2px',
    fontSize: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  contactAddress: {
    display: 'flex',
    marginTop: '50px',
  },
  contactAddressLogo: {
    margin: '0 25px',
    color: '#30BE85',
    fontSize: '14px',
    fontWeight: 'bolder',
    cursor: 'pointer',
    filter: 'grayscale(100%)',
    '&:hover': {
      filter: 'none',
    },
    '&:active': {
      filter: 'brightness(50%)',
    },
    '& img': {
      width: '25px',
      height: '25px',
      verticalAlign: 'bottom',
    },
    '& span': {
      marginLeft: '8px',
    },
  },
  strategicCooperation: {
    marginTop: '20px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: '30px',
      fontSize: '14px',
    },
  },
  strategicCooperationContent: {
    marginTop: '20px',
    display: 'grid',
    maxWidth: '100%',
    gridTemplateColumns: 'repeat(6,1fr)',
    gap: '15px',
    justifyItems: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '35px',
      maxHeight: '35px',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(11,40px)',
      gap: '30px',
      '& img': {
        maxWidth: '40px',
        maxHeight: '40px',
      },
    },
  },
  thankSupport: {
    marginTop: '20px',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: '30px',
      fontSize: '14px',
    },
  },
  thankSupportContent: {
    marginTop: '20px',
    display: 'grid',
    maxWidth: '100%',
    gridTemplateColumns: 'repeat(6,1fr)',
    gap: '15px',
    justifyItems: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '35px',
      maxHeight: '35px',
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(11,40px)',
      gap: '30px',
      '& img': {
        maxWidth: '40px',
        maxHeight: '40px',
      },
    },
  },
  iconHasLink: {
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(80%)',
    },
  },
  BXHbanner: {
    marginTop: '10px',
    '& img': {
      width: '100%',
    }
  },
  BXHhtitle: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: '500',
    margin: '15px 0',
    '& div': {
      width: '46%',
      margin: '0 2%',
    },
    '& span': {
      opacity: '.7',
      verticalAlign: 'middle',
    },
    '& em': {
      fontStyle: 'inherit',
      float: 'right',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    '& i': {
      display: 'inline-block',
      background: '#2B2F50',
      width: '1px',
      height: '12px',
      marginTop: '4px',
    }
  },
  BXHzhiyao: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    '& div': {
      background: 'linear-gradient(to bottom, rgba(35, 38, 65, 0.16), rgba(35, 38, 65, 1))',
      fontSize: '15px',
      width: '48%',
      borderRadius: '8px',
      padding: '10px',
      lineHeight: '22px',
      border: '2px solid #2B2F50',
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
      fontSize: '12px',
      opacity: '.7',
    },
    '& span': {
      fontWeight: 'bold',
    }
  },
  BXHzhiyao_noborder: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '7px',
    '& div': {
      // background: 'linear-gradient(to bottom, rgba(35, 38, 65, 0.16), rgba(35, 38, 65, 1))',
      fontSize: '10px',
      width: '48%',
      borderRadius: '8px',
      lineHeight: '18px',
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
      fontSize: '12px',
      opacity: '.7',
    },
    '& span': {
      fontWeight: 'bold',
      fontSize: '14px'
    },
    '& em': {
      display: 'inline-block',
      background: '#2B2F50',
      width: '1px',
      height: '20px',
      marginTop: '15px',
    }
  },
  daijiangliawards: {
    '& span': {
      fontSize: '14px'
    }
  },
  BXHzhiyao2: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    '& div': {
      // backgroundImage: `url(${allStakeBg})`,
      fontSize: '15px',
      width: '48%',
      padding: '10px',
      lineHeight: '22px',
      backgroundSize: '100% 100%'
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
      fontSize: '12px',
      opacity: '.7',
    },
    '& span': {
      fontWeight: 'bold',
    }
  },
  hotdoortuijianitem: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '11px',
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
      fontSize: '12px',
      opacity: '.7',
    },
    '& span': {
      fontWeight: 'bold',
    }
  },
  hotdooritem1: {
    borderRadius: '8px',
    fontSize: '15px',
    width: '48%',
    height: '83px',
    padding: '10px',
    backgroundSize: '100% 100%',
    position: 'relative'
  },
  hotdooritem2: {
    // backgroundImage: `url(https://b1.superrabbits.cn/mos/BXH/Banner/home/H5/b2.png)`,
    background: '#232641',
    borderRadius: '8px',
    fontSize: '15px',
    width: '48%',
    height: '65px',
    padding: '10px',
    lineHeight: '65px',
    backgroundSize: '100% 100%'
  },
  BXHremen: {
    '& div': {
      fontSize: '15px',
      width: '48%',
      borderRadius: '8px',
      padding: '10px',
      lineHeight: '22px',
      float: 'left',
    },
    '& div:nth-child(odd)': {
      marginRight: '2%',
    },
    '& div:nth-child(even)': {
      marginLeft: '2%',
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
      fontSize: '14px',
      height: '22px',
    },
  },
  BXHcontab: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '8px',
  },
  BXHcontab1: {
    marginTop: '5px',
    padding: '10px',
    borderRadius: '8px',
  },
  BSCremen: {
    '& div': {
      fontSize: '15px',
      width: '48%',
      borderRadius: '8px',
      padding: '5px 10px',
      lineHeight: '22px',
      float: 'left',
    },
    '& div:nth-child(odd)': {
      marginRight: '2%',
    },
    '& div:nth-child(even)': {
      marginLeft: '2%',
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
    },
  },
  BSCSingle: {
    '& div:nth-child(odd)': {
      marginRight: '2%',
    },
    '& div:nth-child(even)': {
      marginLeft: '2%',
    },
    '& i': {
      fontStyle: 'inherit',
      display: 'block',
    },
  },
  BSCwidSingle: {
    fontSize: '15px',
    width: '48%',
    borderRadius: '8px',
    padding: '5px 10px',
    lineHeight: '22px',
    float: 'left',
  },
  BXHcondate: {
    '& em': {
      fontSize: '14px'
    },
    '& span': {
      marginLeft: '10px',
      fontSize: '13px',
      fontWeight: '500',
    },
    '& i': {
      fontStyle: 'inherit',
      background: '#181A2D',
      borderRadius: '2px',
      width: '20px',
      height: '20px',
      lineHeight: '20px',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  },
  BXHzhislid: {
    '& div': {
      marginTop: '10px',
    },
    '& em': {
      fontStyle: 'inherit',
      opacity: '.7',
      marginLeft: '3px',
    },
    '& dl': {
      fontSize: '12px',
      margin: '0px',
      lineHeight: '18px',
    },
  },
  BXHzhiacit: {
    '&:hover': {
      border: '1px solid #30BE85',
    },
    '&:active': {
      border: '1px solid #30BE85',
    },
    '&:focus': {
      border: '1px solid #30BE85',
    },
  },
  BXHcontbopem: {
    color: '#30BE85',
    fontSize: '16px',
    marginLeft: '0px !important',
    '& span': {
      fontWeight: 'bold',
      background: 'transparent',
    },
    '& em': {
      fontSize: '12px',
      color: '#fff',
    }
  },
  liosmtop: {
    marginTop: '5px !important',
  },
  BXHcontbckbg: {
    '& span': {
      display: 'inline-block',
      fontWeight: 'bold',
      borderRadius: '8px 0 8px 0',
      width: '200px',
      padding: '8px 10px',
    },
    '& img': {
      marginRight: '5px',
      marginLeft: '5px',
      verticalAlign: 'middle',
    },
    '& i': {
      color: '#fff',
      opacity: '.6',
      fontStyle: 'inherit',
      fontSize: '12px',
      display: 'inline-block',
      float: 'right',
      marginTop: '10px',
      marginRight: '10px',
      cursor: 'pointer',
    },
  },
  BXHcontbckbg1: {
    position: 'absolute',
    right: '0px',
    top: '-3px',
    '& span': {
      display: 'inline-block',
      backgroundImage: 'linear-gradient(to left, rgba(191,45,82,0.1), rgba(191,45,82,0.1))',
      color: '#BF2D52',
      borderRadius: '0px 8px 0px 10px',
      width: '42px',
      height: '16px',
      lineHeight: '16px',
      // padding: '2px 3px',
      textAlign: 'center',
      fontSize: '10px',
    },
    '& img': {
      marginRight: '5px',
      marginLeft: '5px',
      verticalAlign: 'middle',
    },
    '& i': {
      color: '#fff',
      opacity: '.6',
      fontStyle: 'inherit',
      fontSize: '12px',
      display: 'inline-block',
      float: 'right',
      marginTop: '10px',
      marginRight: '10px',
      cursor: 'pointer',
    },
  },
  pcprconter: {
    width: '1060px',
    display: 'flex',
    background: '#1f2139',
    borderRadius: '8px',
    lineHeight: '50px',
    fontSize: '14px',
    margin: '15px',
    '& div': {
      width: '33.3%',
      fontWeight: 'bold',
    },
    '& em': {
      opacity: '.8',
      marginRight: '10px',
      paddingLeft: '25px',
      borderLeft: '2px solid #2B2F50',
      fontStyle: 'inherit',
      fontWeight: '500',
    }
  },
  modulecomton: {
    display: 'flex',
    width: '1060px',
    background: '#20233C',
    borderRadius: '8px',
    margin: '15px 0',
    fontSize: '14px',
    '& div': {
      margin: '20px 0',
      borderLeft: '1px solid #2B2F50',
      paddingLeft: '25px',
      width: '20%',
    },
    '& i': {
      display: 'block',
      fontStyle: 'inherit',
      opacity: '.6',
      fontWeight: '500',
    },
    '& span': {
      display: 'block',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  pcPriceContentImages: {
    width: '1060px',
    '& img': {
      width: '100%',
      cursor: 'pointer',
    }
  },
  pcBXHcontbckchi: {
    width: '1060px',
    marginBottom: '20px',
    background: '#20233C',
    borderRadius: '8px',
    minHeight: '170px',
  },
  pcBXHcontsxianks: {
    width: '98%',
    margin: 'auto',
    paddingBottom: '20px',
  },
  pcBXHconttomu: {
    width: '31.3%',
    border: '1px solid #353864',
    margin: '0 1%',
    borderRadius: '8px',
    padding: '10px 15px',
    float: 'left',
    marginTop: '20px',
    '& h1': {
      fontSize: '17px',
      margin: '0px',
    }
  },
  pcliudxom: {
    display: 'flex',
    '& div': {
      width: '50%',
      fontSize: '12px',
      marginTop: '10px',
    },
    '& span': {
      display: 'block',
      opacity: '.5',
    },
    '& i': {
      fontStyle: 'inherit',
      opacity: '.9',
    }
  },
  tiaomuParent: {
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderBottom: '2px solid rgba(151, 151, 151, 0.15)',
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
      lineHeight: '60px',
      textAlign: 'center',
      fontSize: '15px',
      fontStyle: 'bold',
      width: '15%'
    }
  },
  listItemParent: {
    height: '65px',
    padding: '10px',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      padding: '23px',
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
  pcrmkchi: {
    display: 'flex',
    padding: '0 20px',
    height: '60px',
    lineHeight: '60px',
    fontSize: '15px',
    color: 'rgba(255,255,255,0.45)',
  },
  pcrebotm: {
    borderBottom: '1px solid rgba(151, 151, 151, 0.15)',
  },
  pcreopembotm: {
    borderTop: '1px solid rgba(151, 151, 151, 0.15)',
  },
  pchomeility_new_btn1: {
    position: 'absolute',
    right: '0px',
    width: '70px',
    cursor: 'pointer',
    height: '32px',
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: '32px',
    marginRight: '10px',
    borderRadius: '6px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    color: '#fff',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 1)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  pchomeility_new_btn2: {
    position: 'absolute',
    right: '90px',
    color: '#30BE85',
    width: '90px',
    border: '1px solid #30BE85',
    cursor: 'pointer',
    height: '32px',
    fontSize: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: '28px',
    borderRadius: '6px',
    '&:hover': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(28, 163, 109, 0.3)',
    },
    '&:active': {
      backgroundImage: 'none',
      backgroundColor: 'rgba(19, 119, 80, 1)',
    },
  },
  pcopemico: {
    '& img': {
      width: '25px',
    }
  },
  pcosymbolso: {
    marginLeft: '5px',
    '& span': {
      color: '#fff',
    },
    '& em': {
      fontStyle: 'inherit',
    }
  },
  lisombtm: {
    position: 'relative',
    width: '25%',
    display: 'flex',
    marginTop: '15px',
    paddingLeft: '2%',
  },
  liuxtable1: {
    width: '20%',
    display: 'flex',
  },
  liuxtable2: {
    width: '17%',
    textAlign: 'right'
  },
  liuxtable3: {
    width: '20%',
    textAlign: 'right'
  },
  liuxtable4: {
    width: '12%',
    textAlign: 'right'
  },
  liuxtableAPY: {
    color: '#31BE86',
  },
  hotdoorparent: {
    width: '100%',
    height: '95px',
    // background: 'linear-gradient(to bottom, #253348, #1D1F35)',
    marginTop: '16px',
    // padding: '10px',
    borderRadius: '8px',
  },
  hottuijian: {
    display: 'flex', 
    marginTop: '6px',
    '& img': {
      width: '15px', 
      height: '15px', 
      marginTop: '4px', 
      marginRight: '5px'
    },
    '& span': {
      fontSize: '14px', 
      // color: '#30BE85',
    }
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
  hmSingle: {
    display: 'inline-block',
    color: '#9f3751',
    fontSize: '12px',
    marginLeft: '10px',
    borderRadius: '3px',
    padding: '0px 5px',
    height: '17px',
    lineHeight: '17px',
    fontWeight: 'bold',
  },
  hecobsc: {
    textAlign: 'center',
    marginBottom: '15px',
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      fontSize: '14px',
      color: '#FFFEFF',
      fontWeight: '500',
      marginBottom: '5px',
      paddingTop: '15px',
    },
    '& span': {
      display: 'block',
      color: '#FFFEFF',
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
  bscLoanwimgLink: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    marginTop: '-25px',
    height: '54px',
    '& img': {
      height: '54px',
    }
  },
  loanconter: {
    position: 'relative',
  },
  loantitle: {
    position: 'absolute',
    top: '7px',
    left: '100px',
    background: '#6f4285',
    borderRadius: '4px',
    fontSize: '13px',
    padding: '2px 5px',
    '& em': {
      fontStyle: 'inherit',
    },
    '& span': {
      fontSize: '14px',
      marginLeft: '5px',
      color: '#FDD436',
      fontWeight: 'bold',
    },
  },
  pchometabtvl: {
    width: '1060px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  pchometabwid: {
    width: '49%',
  },
  pchomeconter1: {
    background: '#20253b',
    marginBottom: '10px',
    padding: '20px',
  },
  pchomezytvl: {
    '& i': {
      fontStyle: 'inherit',
      opacity: '.6',
      fontSize: '12px',
    },
    '& img': {
      width: '20px',
      marginRight: '5px',
    }
  },
  pchometvlnum: {
    fontSize: '21px',
    marginTop: '10px',
    marginBottom: '20px',
  },
  pchometvltit: {
    display: 'flex',
    '& div': {
      width: '50%',
    },
    '& img': {
      width: '18px',
    },
    '& i': {
      display: 'block',
      fontStyle: 'inherit',
      fontSize: '13px',
      marginTop: '10px',
    },
    '& span': {
      display: 'block',
    },
    '& em': {
      fontStyle: 'inherit',
      opacity: '.6',
      fontSize: '12px',
      marginLeft: '5px',
    },
  },
  pchomebri: {
    cursor: 'pointer',
    '& img': {
      width: '100%'
    }
  },
  pchomeprci: {
    display: 'flex',
    marginBottom: '20px',
    '& div': {
      width: '40%',
    },
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      opacity: '.6',
      fontSize: '12px',
    },
    '& span': {
      fontSize: '14px',
    },
  },
  pchometime: {
    fontSize: '12px',
    '& em': {
      display: 'block',
      fontStyle: 'inherit',
      opacity: '.6',
      fontSize: '12px',
    },
    '& i': {
      fontStyle: 'inherit',
      background: '#181A2D',
      borderRadius: '2px',
      width: '20px',
      height: '20px',
      lineHeight: '20px',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'bold',
    }
  },
  pcBXHConterPool: {
    display: 'flex',
    width: '1060px',
  },
  pcBXHPool: {
    width: '24%',
    borderRadius: '8px',
    padding: '15px',
    cursor: 'pointer',
    marginRight: '1.5%',
    marginTop: '15px',
  },
  pcpoolico: {
    display: 'flex',
    justifyContent: 'space-between',
    '& img': {
      width: '30px',
    },
    '& span': {
      opacity: '.7',
      fontSize: '14px',
    },
  },
  pcpoolsum: {
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: '1px solid rgba(151, 151, 151, 0.15)',
    '& i': {
      display: 'block',
      fontStyle: 'inherit',
      fontSize: '14px',
      opacity: '.45',
    },
    '& span': {
      display: 'block',
    },
  },
  pcpoolfram: {
    width: '50%',
  },
  pcpoolldu: {
    fontSize: '14px',
    '& em': {
      display: 'inline-block',
      fontStyle: 'inherit',
      opacity: '.45',
    },
    '& i': {
      display: 'inline-block',
      fontStyle: 'inherit',
      marginLeft: '10px',
    },
  },
  mbxhpool: {
    marginLeft: '0px !important',
    padding: '5px 0',
    display: 'flex',
    opacity: '1 !important',
    paddingBottom: '0px !important',
    '& dl': {
      width: '50%',
      '& i': {
        opacity: '.7',
      }
    },
  },
  mbxhliux: {
    marginLeft: '0px !important',
    fontSize: '12px',
    display: 'flex',
    opacity: '1 !important',
    paddingBottom: '5px',
    '& i': {
      opacity: '.7',
      paddingRight: '5px',
    }
  },
});
  
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
  
class Home extends Component {
  
  constructor(props) {
    super()
    const rewardBXHFactory = store.getStore('rewardBXHFactory')
    this.state = {
      isMobile: true,
      modalUnlock: false,
      bxhInfo: {},
      airdrop: {},
      team_lock: {},
      oldBuyHT: 0,
      oldTvl_total: 0,
      oldTotal_ex_volume: 0,
      oldDaoRewardWait: 0,
      oldDao_reward: 0,
      oldTotal_ex_fee: 0,
      oldTotal_black_hole: 0,
      yieldAirDropCount: 0,
      modalSendType: null, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
      modalSend: false,
      msgContent: "",
      txHash: "",
      strategicCooperationList: [{name:'gate'}, {name:'biki'}, {name:'jb'}, {name:'brinkAsset'}, {name:'tokenpockt'}, {name:'bitkeep',link:'https://bitkeep.org/'}, {name:'codebank'}, {name:'bicc'}, {name:'bibox'}, {name:'hotbit'}, {name:'hypay'}],
      thankSupportList: [{name:'cvn'}, {name:'ruff'}, {name:'hpt'}, {name:'earnDefi'}, {name:'converter'}, {name:'pilot'}, {name:'luck'}, {name:'depth'}, {name:'starlink'}, {name:'hbo'}, {name:'solo'}],
      rewardBXHFactory: rewardBXHFactory,
      bxh_ifo_banner: null, //banner
      bxh_ifo_banner_en: null, //banner
      day: '--',
      hour: '--',
      minute: '--',
      second: '--',
      bxh_ex_new: {}, //即将上线矿池
      bxh_ex_pool: {},  //热门矿池
      bscbxh_ex_pool: {},  //bsc热门矿池
      bxh_ex_twist: [],
      bxh_ex_Stake: [],
      tvlTotal: '',
      moduleConfig: [],
      priceOracle: null,//价格预言机
      sumDeposit: '',//总存款
      sumBorrow: '',//总借款
      farmsListArr: [],
      bxh_pool: [],
    }
 
    dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
  }
  
  timer = null;
  createTimer = () => {
    const that = this;
    this.invateTimer();
    this.timer = setInterval(() => {
      // that.refreshData();
    }, 10000);
  }
  invateTimer = () => {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }
  
  componentWillMount() {
    emitter.on(BXHGETAIRDROP_RETURNED, this.airDropReturn);
    emitter.on(ERROR, this.errorReturned);  // 取消合约提示
    emitter.on(BXHYIELDGETAIRDROP_RETURNED, this.checkYieldLpAirDrop)
    emitter.on(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    emitter.on(BXHCHNAGEACCOUNT, this.refreshLoanData);
    this.refreshLoanData();
 
    const { ethereum } = window;
    if(ethereum){
      ethereum.on('accountsChanged', this.handleAccountsChanged);
      // 钱包切换时，实时切换页面链
      ethereum.on("chainChanged", this.handleAccountsChanged);
    }
  }
  
  componentDidMount = () => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: true })
    } else {  // PC端
      this.setState({ isMobile: false })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    this.createTimer();
    this.refreshData();
    this.indexBXHInfo();  // 轮播图、减产倒计时
    this.storageBXHInfo();  // 取storage
    this.requestFarmsInfo();
    const { i18n } = this.props;
    let language = i18n.language;
    let changeLanguage = "";
    if(window.location.hash === "#/?lang=en"){
      changeLanguage = "en";
    }else if(window.location.hash === "#/?lang=zh-CN"){
      changeLanguage = "zh";
    }
    i18n.changeLanguage(changeLanguage)
  }

  componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    emitter.removeListener(BXHGETAIRDROP_RETURNED, this.airDropReturn);
    emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
    emitter.removeListener(BXHYIELDGETAIRDROP_RETURNED, this.checkYieldLpAirDrop)
    emitter.removeListener(BXH_HOMEBALANCE_RETURNED, this.getBalance)
    emitter.removeListener(BXHCHNAGEACCOUNT, this.refreshLoanData);
  
    window.removeEventListener('resize', this.handleResize.bind(this))
    this.invateTimer();
    clearInterval(this.timerDate);
    this.setState = (state, callback) => {
      return;
    }
  }

  // 钱包切换时，实时刷新数据
  handleAccountsChanged = () => {
    setTimeout(()=>{
      this.refreshData();
      this.indexBXHInfo();  // 轮播图、减产倒计时
      this.storageBXHInfo();  // 取storage
      this.requestFarmsInfo();
      clearInterval(this.timerDate);
      dispatcher.dispatch({ type: BXH_HOMEBALANCE, content: {} })
    },100);
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
  indexBXHInfo = () => {
    const that = this;
    store._getIndexBXHInfo((data) => {
      let dataList = data.data
      let sourceData = data.sourceData

      let bannerInfo_zh = []
      let bannerInfo_en = []
      dataList.bxh_ifo_banner.map((obj, idx) => {
        if(obj.languageCode === "zh_CN"){
          bannerInfo_zh.push(obj)
        }else{
          bannerInfo_en.push(obj)
        }
      })
      that.setState({ bxh_ifo_banner: bannerInfo_zh });
      that.setState({ bxh_ifo_banner_en: bannerInfo_en });

      // 减产倒计时
      let timeDate
      timeDate = formatDate1(dataList.bxh_info.minus_time)
      let end = Date.parse(new Date(timeDate))
      this.countFun(end);
      // 即将上线矿池
      that.setState({ bxh_ex_new: dataList.bxh_ex_new });
      // 热门矿池
      let poolArray = []
      let bscpoolArray = []
      for (var g = 0; g < sourceData.pool_6.length; g++) {
        if (sourceData.pool_6[g].is_hot === 1) {
          poolArray.push(sourceData.pool_6[g])
        }
      }
      for (var b = 0; b < sourceData.pool_5.length; b++) {
        if (sourceData.pool_5[b].is_hot === 1) {
          poolArray.push(sourceData.pool_5[b])
        }
      }
      for (var i = 0; i < sourceData.pool_1.length; i++) {
        if (sourceData.pool_1[i].is_hot === 1) {
          poolArray.push(sourceData.pool_1[i])
          bscpoolArray.push(sourceData.pool_1[i])
        }
      }
      for (var j = 0; j < sourceData.pool_2.length; j++) {
        if (sourceData.pool_2[j].is_hot === 1) {
          poolArray.push(sourceData.pool_2[j])
          bscpoolArray.push(sourceData.pool_2[j])
        }
      }
      for (var n = 0; n < sourceData.pool_3.length; n++) {
        if (sourceData.pool_3[n].is_hot === 1) {
          poolArray.push(sourceData.pool_3[n])
          bscpoolArray.push(sourceData.pool_3[n])
        }
      }
      for (var c = 0; c < sourceData.pool_7.length; c++) {
        if (sourceData.pool_7[c].is_hot === 1) {
          poolArray.push(sourceData.pool_7[c])
          bscpoolArray.push(sourceData.pool_7[c])
        }
      }
      if (poolArray.length > 0) {
        let poolArrayLen = []
        let length = poolArray.length > 8 ? 8 : poolArray.length
        for (var m = 0; m < length; m++) {
          poolArrayLen.push(poolArray[m])
        }
        that.setState({ bxh_ex_pool: poolArrayLen });
      }else{
        that.setState({ bxh_ex_pool: [] });
      }

      that.setState({ 
        bxh_ex_twist: sourceData.pool_5,
        bxh_ex_Stake: sourceData.pool_2,
      });
      if (bscpoolArray.length > 0) {
        let bscpoolArrayLen = []
        let bsclength = bscpoolArray.length > 8 ? 8 : bscpoolArray.length
        for (var m = 0; m < bsclength; m++) {
          bscpoolArrayLen.push(bscpoolArray[m])
        }
        that.setState({ bscbxh_ex_pool: bscpoolArrayLen });
      }else{
        that.setState({ bscbxh_ex_pool: [] });
      }
    })

    // 新增质押挖矿 Timo
    store._getBXHPool((data) => {
      let dataList = data.body
      let dataPool = []
      if(dataList.length > 0){
        dataList.map((obj, idx) => {
          if(idx < 4){
            dataPool.push(obj)
          }
        })
        this.setState({
          bxh_pool: dataPool,
        })
      }else{
        this.setState({
          bxh_pool: [],
        })
      }
    });

  }
  storageBXHInfo = () => {
    // 取Storage数组
    let data = JSON.parse(localStorage.getItem('IndexBXHInfo'))
    if (data) {
      const that = this;
      let dataList = data.data
      let sourceData = data.sourceData

      let bannerInfo_zh = []
      let bannerInfo_en = []
      dataList.bxh_ifo_banner.map((obj, idx) => {
        if(obj.languageCode === "zh_CN"){
          bannerInfo_zh.push(obj)
        }else{
          bannerInfo_en.push(obj)
        }
      })
      that.setState({ bxh_ifo_banner: bannerInfo_zh });
      that.setState({ bxh_ifo_banner_en: bannerInfo_en });

      // 热门矿池
      let poolArray = []
      let bscpoolArray = []
      for (var b = 0; b < sourceData.pool_5.length; b++) {
        if (sourceData.pool_5[b].is_hot === 1) {
          poolArray.push(sourceData.pool_5[b])
        }
      }
      for (var i = 0; i < sourceData.pool_1.length; i++) {
        if (sourceData.pool_1[i].is_hot === 1) {
          poolArray.push(sourceData.pool_1[i])
          bscpoolArray.push(sourceData.pool_1[i])
        }
      }
      for (var j = 0; j < sourceData.pool_2.length; j++) {
        if (sourceData.pool_2[j].is_hot === 1) {
          poolArray.push(sourceData.pool_2[j])
          bscpoolArray.push(sourceData.pool_2[j])
        }
      }
      for (var n = 0; n < sourceData.pool_3.length; n++) {
        if (sourceData.pool_3[n].is_hot === 1) {
          poolArray.push(sourceData.pool_3[n])
          bscpoolArray.push(sourceData.pool_3[n])
        }
      }
      if (poolArray.length > 0) {
        let poolArrayLen = []
        let length = poolArray.length > 8 ? 8 : poolArray.length
        for (var m = 0; m < length; m++) {
          poolArrayLen.push(poolArray[m])
        }
        that.setState({ bxh_ex_pool: poolArrayLen });
      }
      if (bscpoolArray.length > 0) {
        let bscpoolArrayLen = []
        let bsclength = bscpoolArray.length > 8 ? 8 : bscpoolArray.length
        for (var m = 0; m < bsclength; m++) {
          bscpoolArrayLen.push(bscpoolArray[m])
        }
        that.setState({ bscbxh_ex_pool: bscpoolArrayLen });
      }
    }
  }
  countFun = (end) => {
    let now_time = Date.parse(new Date());
    var remaining = end - now_time;
 
    this.timerDate = setInterval(() => {
      //防止出现负数
      if (remaining > 1000) {
        remaining -= 1000;
        let day = Math.floor((remaining / 1000 / 3600) / 24);
        let hour = Math.floor((remaining / 1000 / 3600) % 24);
        let minute = Math.floor((remaining / 1000 / 60) % 60);
        let second = Math.floor(remaining / 1000 % 60);
  
        this.setState({
          day: day,
          hour: hour < 10 ? "0" + hour : hour,
          minute: minute < 10 ? "0" + minute : minute,
          second: second < 10 ? "0" + second : second
        })
      } else {
        clearInterval(this.timerDate);
        //倒计时结束时触发父组件的方法
        //this.props.timeEnd();
      }
    }, 1000);
  }
  
  refreshData = () => {
    const that = this;
    store._getBXHInfo((data) => {
      const tempBxhInfo = that.state.bxhInfo;
      if (tempBxhInfo) {
        that.setState({
          oldTvl_total: tempBxhInfo.tvl_total ? tempBxhInfo.tvl_total : 0,
          oldTotal_ex_volume: tempBxhInfo.total_ex_volume ? tempBxhInfo.total_ex_volume : 0,
          oldTotal_ex_fee: tempBxhInfo.total_ex_fee ? tempBxhInfo.total_ex_fee : 0,
          oldBuyHT: tempBxhInfo.buy_ht ? tempBxhInfo.buy_ht : 0,
          oldDaoRewardWait: tempBxhInfo.dao_reward_wait ? tempBxhInfo.dao_reward_wait : 0,
          oldDao_reward: tempBxhInfo.dao_reward ? tempBxhInfo.dao_reward : 0,
        });
      }
      that.setState({ bxhInfo: data.bxh_info, airdrop: data.airdrop, team_lock: data.team_lock, tvlTotal: data.tvlTotal });
  
      const { bxhInfo } = that.state
      // BXHYIELDGETAIRDROP
      const account = store.getStore('account');
      if (account.address && bxhInfo && bxhInfo.air_address) {
        dispatcher.dispatch({ type: BXHYIELDGETAIRDROP, content: { airDropcontractAddress: bxhInfo.air_address } })
      }
      //刷新币余额
      const rewardSymbolList = store.getStore('rewardSymbolList');
      if (account.address && (!rewardSymbolList || rewardSymbolList.length == 0)) {
        dispatcher.dispatch({ type: GET_PASSEXCHANGE_PERPETUAL, content: { token_list: data.token_list, needRefresh: false } })
      }
    });
  }

  refreshLoanData = () => {
    this.setState({
      moduleConfig: [],
    })
    getModuleData((data)=>{
      let loanModule = data.module[0];
      for(let i=0;i<data.module.length;i++){
          if(data.module[i].moduleId==1){
              loanModule = data.module[i];
              break;
          }
      }
      const moduleConfig = data.moduleConfig.filter((obj)=>obj.moduleId==1)
      this.setState({
          moduleConfig:moduleConfig,
          priceOracle:loanModule.param2,
      })
      this.loadData();
    })
  }
  loadData = () => { 
    // this.loadTokenInfo()
    this.getMarkets()
  }
  //获取抵押率相关信息
  getMarkets = async () => {
    const { moduleConfig } = this.state;
    try {
        const result = await client.query({
            query: Market(),
            fetchPolicy: 'network-only',
        })
        const markets = result.data.markets;
        if(markets&&markets.length>0){
            for (let i = 0; i < moduleConfig.length; i++) {
                const obj = moduleConfig[i];
                for (let j = 0; j < markets.length; j++) {
                    const market = markets[j];
                    if(market.symbol===('b'+obj.param2)) {
                        obj.market = market;
                        break;
                    }
                }
            }
            this.setState({
                moduleConfig:[...moduleConfig],
            })
            this.loadTokenInfo()
        }
    } catch (error) {
        console.log('error',error);
    }
  }
  //获取币种信息
  loadTokenInfo = () => {
    const { moduleConfig,priceOracle } = this.state
    let total = 0;
    for(let i=0,count=moduleConfig.length;i<count;i++){
        let obj = moduleConfig[i];
        store._getLoanTokenInfo(obj.param3,obj.param1,priceOracle,(err,info)=>{
            if(err==null){
                obj.price = info.price;
            }
            total += 1;
            if(total===count){//查询完成
                this.setState({
                    moduleConfig:[...moduleConfig],
                })
                this.totalDepositBorrow()
            }
        })
    };
  }
  //计算总存款和总借款
  totalDepositBorrow = () => {
    const { moduleConfig } = this.state;
    let total = 0;
    let sumDeposit = 0;//总存款
    let sumBorrow = 0;//总借款
    for(let i=0,count=moduleConfig.length;i<count;i++){
        total += 1;
        let obj = moduleConfig[i];
        //总存款
        let depositTotal = _getValuemultip(obj.market.totalSupply, obj.market.exchangeRate)
        let depositPrice = _getValuemultip(depositTotal, obj.price) * 1
        sumDeposit += depositPrice;
        //总借款
        let borrowPrice = _getValuemultip(obj.market.totalBorrows, obj.price) * 1
        sumBorrow += borrowPrice
        if(total===count){//查询完成
          this.setState({
            sumDeposit: sumDeposit ? sumDeposit : '',
            sumBorrow: sumBorrow ? sumBorrow : '',
          })
        }
    };
  }
  
  // BXH余额
  getBalance = (data) => {
    // console.log('data====>', data)
    this.setState({ rewardBXHFactory: data })
  }
  
  airDropReturn = (data) => {
    const that = this;
    store._getBXHInfo((data) => {
      that.setState({ bxhInfo: data.bxh_info, airdrop: data.airdrop, team_lock: data.team_lock });
      const { bxhInfo } = that.state
      // BXHYIELDGETAIRDROP
      const account = store.getStore('account');
      if (account.address && bxhInfo && bxhInfo.air_address) {
        dispatcher.dispatch({ type: BXHYIELDGETAIRDROP, content: { airDropcontractAddress: bxhInfo.air_address } })
      }
    });
  }
  checkYieldLpAirDrop = (data) => {
    // yieldAirDrop
    this.setState({ yieldAirDropCount: data[0].tokens[0].amount.amount })
  }
  errorReturned = (error) => {
    this.setState({ modalSend: false })
    this.setState({ modalSend: true, loading: false, modalSendType: -1 })
  };
  
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: true })
    } else {  // PC端
      this.setState({ isMobile: false })
    }
  }
  //兑换
  bxhDuihuan = () => {
    this.getAccount();
    // this.nav('swap')
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "1"){
      window.open(getLangURLWithURL('https://ethswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "137"){
      window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "43114"){
      window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/swap'),'_self')
    }else{
      window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self')
    }
  }
  //流动性
  bxhList = () => {
    this.getAccount();
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('liquidity')
  }
  getAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address == undefined || address == null) {
      this.openUnlockModal()
      return;
    }
  }
  //燃烧铸造
  bxhCombustion = () => {
    this.getAccount();
    this.nav('combustion')
  }
  //造星计划
  bxhStarPlan = () => {
    this.getAccount();
    this.nav('starPlan')
  }
  navigateBXHStakePC = (item) => {
    let chainID = localStorage.getItem('chainIDSwitch')
    store.setStore({ currentdTradePool: item })
    if (item.pair_token_type === 1 && item.pool_type !== 3 && item.pool_type !== 4 && item.pool_type !== 5) { // 单币
      this.props.history.push('/singletoken/' + item.ex_id + '_' + item.id_centerdata)
    } else if(item.pool_type === 3){
      // 单币挖矿
      this.props.history.push('/twist/' + item.ex_id)
    } else if(item.pool_type === 4){
      // 质押挖矿（新）
      if(chainID === '128'){
        this.props.history.push('/pledgeUSDT/' + item.ex_id)
      }else{
        this.props.history.push('/pledge/' + item.ex_id)
      }
    } else if(item.pool_type === 5){
      // 主區(V2)
      this.props.history.push('/bxhstakeUSDTpc/' + item.ex_id)
    } else {  // 双币
      this.props.history.push('/bxhstakepc/' + item.ex_id)
    }
  }
  navigateBXHSinglePC = (item) => {
    store.setStore({ currentdTradePool: item })
    this.props.history.push('/single/' + item.id)
  }

  navigateBXHStake = (item) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.setStore({ currentdTradePool: item })
    if(item.pool_type !== 3 && item.pool_type !== 5){
      // 其他挖矿
      this.props.history.push('/bxhTradeStake/' + item.ex_id)
    }else if(item.pool_type === 5){
       // 主區(V2)
       this.props.history.push('/bxhTradeUSDTStake/' + item.ex_id)
    }else{
      // 单币挖矿（新）
      this.props.history.push('/twist/' + item.ex_id)
    }
  }
  navigateStakeTwist = (item) => {
    let chainID = localStorage.getItem('chainIDSwitch')
    store.setStore({ currentdTradePool: item })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    if(chainID === '128'){
      this.props.history.push('/pledgeUSDT/' + item.ex_id)
    }else{
      this.props.history.push('/pledge/' + item.ex_id)
    }
  }
  contactAddress = (address) => {
    if (address) {
      window.open(address);
    }
  }
  backAddress = () => {
    window.open('https://www.back.finance')
  }
  twistAddress = () => {
    window.open('https://www.twist.finance/')
  }
  zuqiuAddress = () => {
    window.open('https://guess.kimchiii.com/#/')
  }
  loanLink = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('loan')
  }
  //审计
  auditAddress = () => {
    window.open('https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/bxh_audit.pdf');
  }
  auditBSCAddress = () => {
    window.open('https://www.slowmist.com/security-audit-certificate.html?id=2a8aaf33711ba2a978a3e0a56c0a73735ae4acb2fca1c5ad874d9dcec000f0e3');
  }
  auditOECAddress = () => {
    window.open('https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/SlowMist%20Audit%20Report%20-%20BXHash.pdf');
  }
  lingAddress = () => {
    window.open('https://www.fairyproof.com/doc/BXHashV2-%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A-071621.pdf');
  }
  lingAddress1 = () => {
    window.open('https://www.fairyproof.com/doc/BXHLEND-%E5%AE%A1%E8%AE%A1%E6%8A%A5%E5%91%8A-100721.pdf');
  }
  lingOECAddress = () => {
    window.open('https://www.fairyproof.com/doc/BXH-DEX(OKExChain)-Audit-Report-080721%201.pdf');
  }
  saveToTwoWei = (number) => {
    return this.saveToWei(number, 2);
  }
  saveToWei = (number, scale = 4) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }
  
  //banner点击
  bannerClick = (idx) => {
    const { bxh_ifo_banner } = this.state;
    if (bxh_ifo_banner && bxh_ifo_banner.length > idx) {
      const obj = bxh_ifo_banner[idx];
      if (obj && obj.clickUrl && obj.clickUrl.length > 0) {
        window.open(obj.clickUrl);
      }
    }
  }
  bannerClick_en = (idx) => {
    const { bxh_ifo_banner_en } = this.state;
    if (bxh_ifo_banner_en && bxh_ifo_banner_en.length > idx) {
      const obj = bxh_ifo_banner_en[idx];
      if (obj && obj.clickUrl && obj.clickUrl.length > 0) {
        window.open(obj.clickUrl);
      }
    }
  }
  navigateMore = () => {
    this.props.history.push('/liquidity')
  }
  
  sortBanner = (sort) => {
    return function (a, b) {
      var value1 = a[sort];
      var value2 = b[sort];
      return value2 - value1;
    }
  }
 
  render() {
    const { classes, t, i18n } = this.props;
    const { isMobile, modalOpen, modalUnlock, bxhInfo, oldTvl_total, oldTotal_ex_volume, oldTotal_ex_fee, oldBuyHT, 
      airdrop, team_lock, yieldAirDropCount, modalSend, strategicCooperationList, thankSupportList, rewardBXHFactory, 
      bxh_ifo_banner, bxh_ifo_banner_en, oldDaoRewardWait, oldTotal_black_hole, oldDao_reward, bxh_ex_new, bxh_ex_pool, 
      bscbxh_ex_pool, tvlTotal, sumDeposit, sumBorrow, farmsListArr, bxh_pool, bxh_ex_twist, bxh_ex_Stake } = this.state
    // console.log('sumDeposit11===>', sumDeposit)
    // console.log('sumBorrow11===>', sumBorrow)
    let sortBannerArray, sortBannerArray_en
    if (bxh_ifo_banner) {
      sortBannerArray = bxh_ifo_banner.sort(this.sortBanner('sortId'))
    }
    if (bxh_ifo_banner_en) {
      sortBannerArray_en = bxh_ifo_banner_en.sort(this.sortBanner('sortId'))
    }

    let language = i18n.language
    let chainID = localStorage.getItem('chainIDSwitch')
    let loanOpenSatus = localStorage.getItem('loanOpenSatus')

    { this.renderModal() }
    { this.renderUnlockWalletModal() }
    { this.renderSendModal() }

    if (!isMobile) {
      return (
        <div className={getStyleClass('PCConter',classes.root)}>
          <LangM isHome={true} openUnlockModal={this.openUnlockModal} />
          <div className={[classes.pcContent, 'PCConterbg'].join(' ')}>
  
            {/* 轮播 */}
            {
              language === "zh" || language === "zh-CN" ?
              // 中文banner
              <div>
                {
                  bxh_ifo_banner ?
                    (
                      <Carousel className={classes.banner} onClickItem={this.bannerClick} interval={5000} autoPlay={true} showThumbs={false} showIndicators={bxh_ifo_banner.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                        {
                          sortBannerArray.map((obj, idx) => {
                            return <div key={idx} >
                              {
                                obj.clickUrl ?
                                  <img src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ cursor: 'pointer', pointerEvents: 'auto' }} />
                                  :
                                  <img src={isMobile ? obj.imgH5 : obj.imgWeb} />
                              }
                            </div>
                          })
                        }
                      </Carousel>
                    ) :
                    <div>
                      <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-moren.png" />
                    </div>
                }
              </div>
              :
              // 英文banner
              <div>
                {
                  bxh_ifo_banner_en ?
                    (
                      <Carousel className={classes.banner} onClickItem={this.bannerClick_en} interval={5000} autoPlay={true} showThumbs={false} showIndicators={bxh_ifo_banner_en.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                        {
                          sortBannerArray_en.map((obj, idx) => {
                            return <div key={idx} >
                              {
                                obj.clickUrl ?
                                  <img src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ cursor: 'pointer', pointerEvents: 'auto' }} />
                                  :
                                  <img src={isMobile ? obj.imgH5 : obj.imgWeb} />
                              }
                            </div>
                          })
                        }
                      </Carousel>
                    ) :
                    <div>
                      <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-moren.png" />
                    </div>
                }
              </div>
            }
  
            <div className={getStyleClass('PCprrices',classes.pcprconter)}>
              <div>
                <em style={{ borderLeft: 'none' }}>BXH Price</em>
                {bxhInfo && bxhInfo.bxh_price ?
                  (
                    '$' + this.saveToWei(bxhInfo.bxh_price)
                  )
                  : '--'}
              </div>
              <div>
                <em>BXH{t('BXH.listbalance')}</em>
                <span>
                  {
                    rewardBXHFactory ?
                      <span>
                        {
                          rewardBXHFactory[0].tokens[0].bxhbanancehome ?
                            this.saveToWei(rewardBXHFactory[0].tokens[0].bxhbanancehome + "")
                            :
                            '--'
                        }
                      </span>
                      :
                      "0.00"
                  }
                </span>
              </div>
              <div className={getStyleClass('PCdatas',classes.BXHcondate)}>
                <em>{t('BXH.Countdown')}</em>
                <i>{this.state.day}</i>&nbsp;<span style={{ marginLeft: '0px' }}>{t('BXH.daytime')}</span>&nbsp;
                <i>{this.state.hour}</i>
                &nbsp;:&nbsp;<i>{this.state.minute}</i>&nbsp;:&nbsp;
                <i>{this.state.second}</i>
              </div>
            </div>
  
            <div className={classes.pcPriceContent}>
              <div onClick={this.bxhList} className={getStyleClass('PCPriceContent',classes.pcPriceContentItem)}>
                <div className={getStyleClass('PCTitle',classes.pcPriceContentItemTitle)}>
                   {t('BXH.pledgeMulti')}
                </div>
                <div className={classes.pcPriceContentItemPrice} style={{ fontFamily: 'Tahoma-Bold, Tahoma' }}>
                  {tvlTotal ?
                    (
                      <CountUp
                        start={this.saveToTwoWei(oldTvl_total)}
                        end={this.saveToTwoWei(tvlTotal)}
                        duration={2.0}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix="$">
                      </CountUp>
                    )
                    : '--'}
                </div>
              </div>
              <div onClick={this.bxhDuihuan} style={{ marginLeft: '15px' }} className={getStyleClass('PCPriceContent1',classes.pcPriceContentItem)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                   <div className={classes.pcPriceContentItemTitle}>
                      {
                        chainID === '56' ?
                        <span>BSC</span>
                        :
                        chainID === '66' ?
                        <span>OKC</span>
                        :
                        chainID === '1' ?
                        <span>ETH</span>
                        :
                        chainID === '137' ?
                        <span>POLYGON</span>
                        :
                        chainID === '43114' ?
                        <span>AVAX</span>
                        :
                        <span>HECO</span>
                      }
                      {t('BXH.homeliquzhiya1')}
                   </div>
                   <div className={classes.pcPriceContentPrice} style={{ fontFamily: 'Tahoma-Bold, Tahoma' }}>
                     {bxhInfo && bxhInfo.tvl_total ?
                       (
                         <CountUp
                           start={this.saveToTwoWei(oldTvl_total)}
                           end={this.saveToTwoWei(bxhInfo.tvl_total)}
                           duration={2.0}
                           separator=","
                           decimals={2}
                           decimal="."
                           prefix="$">
                         </CountUp>
                       )
                       : '--'}
                   </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <div className={classes.pcPriceContentItemTitle}>{t('BXH.volume')}(24h)</div>
                   <div className={classes.pcPriceContentPrice} style={{ fontFamily: 'Tahoma-Bold, Tahoma' }}>
                     {bxhInfo && bxhInfo.total_ex_volume ?
                       (
                         <CountUp
                           start={this.saveToTwoWei(oldTotal_ex_volume)}
                           end={this.saveToTwoWei(bxhInfo.total_ex_volume)}
                           duration={2.0}
                           separator=","
                           decimals={2}
                           decimal="."
                           prefix="$">
                         </CountUp>
                       )
                       : '--'}
                   </div>
                </div>
              </div>
            </div>

            {/* 质押挖矿 Timo */}
            <div className={[classes.pcBXHConterPool, 'homePCxinzeng'].join(' ')}>
              {
                bxh_pool && bxh_pool.length > 0 ?
                (
                  bxh_pool.map((item, index) => {
                    return (
                      <div className={getStyleClass('PCbckchi',classes.pcBXHPool)} key={index} onClick={() => { this.navigateStakeTwist(item) }}>
                        <div className={classes.pcpoolico}>
                          <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token_0}.png`} />
                          <span>
                            {
                              chainID === '1' ?
                              'ETH'
                              :
                              chainID === '56' ?
                              'BSC'
                              :
                              chainID === '66' ?
                              'OKC'
                              :
                              chainID === '137' ?
                              'POLYGON'
                              :
                              chainID === '43114' ?
                              'AVAX'
                              :
                              'HECO'
                            }
                          </span>
                        </div>
                        <div className={classes.pcpoolsum}>
                          <div className={classes.pcpoolfram}>
                            <i>Farm</i>
                            <span>{item.token_0}</span>
                          </div>
                          <div>
                            <i>APR</i>
                            <CountUp
                              start={0}
                              end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                              duration={2.0}
                              separator=","
                              decimals={2}
                              decimal="."
                              suffix="%">
                            </CountUp>
                          </div>
                        </div>
                        <div className={classes.pcpoolldu}>
                          <em>{t('BXH.homeLiquidity')}</em>
                          <i>
                            $
                            <CountUp
                              start={0}
                              end={this.saveToTwoWei(item.tvl_pool ? item.tvl_pool : 0)}
                              duration={2.0}
                              separator=","
                              decimals={2}
                              decimal="."
                              suffix="">
                            </CountUp>
                          </i>
                        </div>
                      </div>
                    )
                  })
                ) : null
              }
            </div>
 
            {
              chainID === '128' ?
              <div className={[classes.modulecomton, chainID === '56' ? 'bscPCcomton' : 'hecoPCcomton'].join(' ')}>
                <div style={{ borderLeft: 'none' }}>
                  <i>{t('BXH.totalbuybackbxhamount')}</i>
                  {
                      bxhInfo.buy_black_hole ?
                      (
                      <CountUp
                          start={this.saveToTwoWei(oldTotal_black_hole)}
                          end={this.saveToTwoWei(bxhInfo.buy_black_hole)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="">
                      </CountUp>
                      )
                      : '--'
                  }
                </div>
                <div>
                  <i>{t('BXH.listmoney')}</i>
                  {
                    bxhInfo.dao_reward_wait ?
                      (
                        <CountUp
                          start={this.saveToTwoWei(oldDaoRewardWait)}
                          end={this.saveToTwoWei(bxhInfo.dao_reward_wait)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="$">
                        </CountUp>
                      )
                      : '--'
                  }
                </div>
                <div>
                  <i>{t('BXH.amountRewarded')}</i>
                  {
                    bxhInfo.dao_reward ?
                      (
                        <CountUp
                          start={this.saveToTwoWei(oldDao_reward)}
                          end={this.saveToTwoWei(bxhInfo.dao_reward)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="$">
                        </CountUp>
                      )
                      : '--'
                  }
                </div>
                <div>
                  <i>{t('BXH.totalRepurchaseAmount')}</i>
                  {
                    bxhInfo.buy_value ?
                      (
                        <CountUp
                          end={this.saveToTwoWei(bxhInfo.buy_value)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="$">
                        </CountUp>
                      )
                      : '--'
                  }
                </div>
                <div>
                  <i>{t('BXH.dhtimeFee')}</i>
                  {bxhInfo && bxhInfo.total_ex_fee ?
                    (
                      <CountUp
                        start={this.saveToTwoWei(oldTotal_ex_fee)}
                        end={this.saveToTwoWei(bxhInfo.total_ex_fee)}
                        duration={2.0}
                        separator=","
                        decimals={2}
                        decimal="."
                        prefix="$">
                      </CountUp>
                    )
                    : '--'}
                </div>
              </div>
              :
              <div style={{ height: '15px' }}></div>
            }
  
            {/* 热门矿池 */}
            {
              bxh_ex_pool && bxh_ex_pool.length > 0 ?
                <div className={getStyleClass('PCbckchi',classes.pcBXHcontbckchi)}>
                  <div className={getStyleClass('PCbckbg',classes.BXHcontbckbg)}>
                    <span>
                      {
                        chainID === '56' ?
                        <img src={require('../../assets/bxh/home_11.png')} width="13px" />
                        :
                        chainID === '66' ?
                        <img src={require('../../assets/bxh/home_22.png')} width="13px" />
                        :
                        chainID === '1' ?
                        <img src={require('../../assets/bxh/home_33.png')} width="13px" />
                        :
                        chainID === '137' ?
                        <img src={require('../../assets/bxh/home_44.png')} width="13px" />
                        :
                        chainID === '43114' ?
                        <img src={require('../../assets/bxh/home_55.png')} width="13px" />
                        :
                        <img src={require('../../assets/bxh/home_1.png')} width="13px" />
                      }
                      {t('BXH.hotpool')}
                    </span>
                    <i onClick={() => { this.navigateMore() }}>{t('BXH.More')}<img src={require('../../assets/bxh/more.png')} width="6px" /></i>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcrebotm}`}>
                    <div className={classes.liuxtable1}>{t('BXH.jiaoyiduititle')}</div>
                    <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2}>{t('BXH.daylyoutput')}</div>
                    {/* BSC、HECO链显示周期 timo */}
                    {
                      chainID === '56'?
                      <div className={classes.liuxtable4}>{t('BXH.Farming')}</div>
                      :
                      null
                    }
                    <div className={chainID === '56'?classes.liuxtable2:classes.liuxtable3}>TVL</div>
                    <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2}>APR</div>
                  </div>
                  
                  {/* 增加新矿池 timo start */}
                  {/* {
                    chainID === '56'||chainID === '128'?
                    <div>
                      {
                        farmsListArr.map((item, index) => {
                          return this.renderBXHNewsSingle(item, index)
                        })
                        }
                    </div>
                    :
                    null
                  } */}
                  {/* 增加新矿池 timo end */}

                  {
                    bxh_ex_pool && bxh_ex_pool.length > 0 ?
                      (
                        bxh_ex_pool.map((item, index) => {
                          if(item.pool_type === 3 || item.pool_type === 4){
 
                            return (
                              <div key={index} className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                                <div className={classes.liuxtable1}>
                                  <div className={classes.pcopemico}>
                                    <img src={item.symbol0Img_Show} />
                                  </div>
                                  <div className={classes.pcosymbolso}>
                                    <span>{item.symbol0}</span>
                                  </div>
                                </div>

                                {/* HECO链挖矿产出为USDT，把BXH日产量 * BXH单价(V2) */}  
                                {
                                  chainID === '128'&&item.pool_type === 4?
                                  <div className={classes.liuxtable2} style={{ color: '#fff' }}>
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.bxh_day&&bxhInfo.bxh_price ? item.bxh_day * bxhInfo.bxh_price : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>&nbsp;USDT
                                  </div>
                                  :
                                  <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2} style={{ color: '#fff' }}>
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.bxh_day ? item.bxh_day : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>&nbsp;BXH
                                  </div>
                                }

                                {/* BSC、HECO链显示周期 timo */}
                                {
                                  chainID === '56'?
                                  <div className={classes.liuxtable4}>
                                    <span></span>
                                  </div>
                                  :
                                  null
                                }

                                <div className={chainID === '56'?classes.liuxtable2:classes.liuxtable3}>
                                  $
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </div>
                                <div className={getStyleClass('PCtableAPY',chainID === '56'?classes.liuxtable4:classes.liuxtable2, classes.liuxtableAPY)}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="%">
                                  </CountUp>
                                </div>
                                <div className={classes.lisombtm}>
                                  <div className={getStyleClass('PC_new_btn1',classes.pchomeility_new_btn1)} onClick={() => { this.navigateBXHStakePC(item) }}>{t('BXH.diyatitle')}</div>
                                </div>
                              </div>
                            )
 
                          }else{
 
                            return (
                              <div key={index} className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                                <div className={classes.liuxtable1}>
                                  <div className={classes.pcopemico}>
                                    <img src={item.symbol0Img_Show} />
                                    <img src={item.symbol1Img_Show} style={{ marginLeft: '-5px' }} />
                                  </div>
                                  <div className={classes.pcosymbolso}>
                                    <span>{item.symbolPair_Show}</span>
                                  </div>
                                </div>
                                {
                                  chainID === '128'?
                                  <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2} style={{ color: '#fff' }}>
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.bxh_day&&bxhInfo.bxh_price ? item.bxh_day * bxhInfo.bxh_price : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>
                                    &nbsp;USDT
                                  </div>
                                  :
                                  <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2} style={{ color: '#fff' }}>
                                    <CountUp
                                      start={0}
                                      end={this.saveToTwoWei(item.bxh_day ? item.bxh_day : 0)}
                                      duration={2.0}
                                      separator=","
                                      decimals={2}
                                      decimal="."
                                      suffix="">
                                    </CountUp>
                                    &nbsp;BXH
                                  </div>
                                }
                                {
                                  chainID === '56'?
                                  <div className={classes.liuxtable4}>
                                    <span></span>
                                  </div>
                                  :
                                  null
                                }
                                <div className={chainID === '56'?classes.liuxtable2:classes.liuxtable3}>
                                  $
                                <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.tvl_total ? item.tvl_total : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="">
                                  </CountUp>
                                </div>
                                <div className={getStyleClass('PCtableAPY',chainID === '56'?classes.liuxtable4:classes.liuxtable2, classes.liuxtableAPY)}>
                                  <CountUp
                                    start={0}
                                    end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    suffix="%">
                                  </CountUp>
                                </div>
                                <div className={classes.lisombtm}>
                                  <div className={getStyleClass('PC_new_btn1',classes.pchomeility_new_btn1)} 
                                    onClick={() => { this.navigateBXHStakePC(item) }}>
                                      {t('BXH.diyatitle')}
                                  </div>
                                  <div className={getStyleClass('PC_new_btn2',classes.pchomeility_new_btn2)} 
                                    onClick={() => { this.navigateBXHStake(item) }}>
                                      {t('BXH.addzijin')}
                                  </div>
                                </div>
                              </div>
                            )
 
                          }
                        })
                      ) : null
                  }
                </div>
                :
                <div className={getStyleClass('PCbckchi',classes.pcBXHcontbckchi)}>
                  <div className={getStyleClass('PCbckbg',classes.BXHcontbckbg)}>
                    <span>
                      {
                        chainID === '56' ?
                        <img src={require('../../assets/bxh/home_11.png')} width="13px" />
                        :
                        chainID === '66' ?
                        <img src={require('../../assets/bxh/home_22.png')} width="13px" />
                        :
                        chainID === '1' ?
                        <img src={require('../../assets/bxh/home_33.png')} width="13px" />
                        :
                        chainID === '137' ?
                        <img src={require('../../assets/bxh/home_44.png')} width="13px" />
                        :
                        chainID === '43114' ?
                        <img src={require('../../assets/bxh/home_55.png')} width="13px" />
                        :
                        <img src={require('../../assets/bxh/home_1.png')} width="13px" />
                      }
                      {t('BXH.hotpool')}
                    </span>
                    <i onClick={() => { this.navigateMore() }}>{t('BXH.More')}<img src={require('../../assets/bxh/more.png')} width="6px" /></i>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcrebotm}`}>
                    <div className={classes.liuxtable1}>{t('BXH.jiaoyiduititle')}</div>
                    <div className={classes.liuxtable2}>{t('BXH.daylyoutput')}</div>
                    <div className={classes.liuxtable3}>TVL</div>
                    <div className={classes.liuxtable2}>APR</div>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                    <div className={classes.liuxtable1}>
                      <div className={classes.pcopemico}>--</div>
                    </div>
                    <div className={classes.liuxtable2}>--</div>
                    <div className={classes.liuxtable3}>--</div>
                    <div className={classes.liuxtable2}>--</div>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                    <div className={classes.liuxtable1}>
                      <div className={classes.pcopemico}>--</div>
                    </div>
                    <div className={classes.liuxtable2}>--</div>
                    <div className={classes.liuxtable3}>--</div>
                    <div className={classes.liuxtable2}>--</div>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                    <div className={classes.liuxtable1}>
                      <div className={classes.pcopemico}>--</div>
                    </div>
                    <div className={classes.liuxtable2}>--</div>
                    <div className={classes.liuxtable3}>--</div>
                    <div className={classes.liuxtable2}>--</div>
                  </div>
                  <div className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
                    <div className={classes.liuxtable1}>
                      <div className={classes.pcopemico}>--</div>
                    </div>
                    <div className={classes.liuxtable2}>--</div>
                    <div className={classes.liuxtable3}>--</div>
                    <div className={classes.liuxtable2}>--</div>
                  </div>
                </div>
            }
  
            {/* 即将上线矿池 */}
            {
              bxh_ex_new && bxh_ex_new.length > 0 ?
                <div className={classes.pcBXHcontbckchi}>
                  <div className={classes.BXHcontbckbg}>
                    <span>
                      <img src={require('../../assets/bxh/home_2.png')} width="13px" />{t('BXH.Minepool')}
                    </span>
                  </div>
                  <div className={classes.pcBXHcontsxianks}>
                    {
                      bxh_ex_new && bxh_ex_new.length > 0 ?
                        (
                          bxh_ex_new.map((item, index) => {
                            return (
                              <div className={classes.pcBXHconttomu} key={index}>
                                <h1>{item.symbol}</h1>
                                <div className={classes.pcliudxom}>
                                  <div>
                                    <span>{t('BXH.Openliquidity')}</span>
                                    <i>{formatTimeDate(item.liquityTime)}</i>
                                  </div>
                                  <div>
                                    <span>{t('BXH.startmin')}</span>
                                    <i>{formatTimeDate(item.stakeTime)}</i>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        )
                        : null
                    }
                    <div style={{ clear: 'both' }}></div>
                  </div>
                </div>
                :
                null
            }
  
            <div className={getStyleClass('fonttab',classes.moduleTitle)}>
              {
                chainID === '56' ?
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} />
                :
                chainID === '66' ?
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft2.png')} />
                :
                chainID === '1' ?
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft3.png')} />
                :
                chainID === '137' ?
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft4.png')} />
                :
                chainID === '43114' ?
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft5.png')} />
                :
                <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
              }
              <div>{t('BXH.partners')}</div>
              {
                chainID === '56' ?
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} />
                :
                chainID === '66' ?
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight2.png')} />
                :
                chainID === '1' ?
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight3.png')} />
                :
                chainID === '137' ?
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight4.png')} />
                :
                chainID === '43114' ?
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight5.png')} />
                :
                <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
              }
            </div>
             
            {
              chainID === '128' ?
              <div>
                <div style={{display:'flex'}}>
                  <div className={classes.moduleSubTitle}>
                  <div>{t('BXH.leverDig')}</div>
                  <img onClick={this.backAddress} src={require('../../assets/bxh/back_logo.png')} />
                </div>
                <div className={classes.moduleSubTitle}>
                  <div>{t('BXH.danbiwukuang')}</div>
                  <img onClick={this.twistAddress} src={require('../../assets/bxh/twistparentlogo.png')} />
                  </div>
                </div>
              </div>
              :
              null
            }
 
            {
              chainID === '56' || chainID === '66' || chainID === '1' || chainID === '137' || chainID === '43114' ?
              <div>
                <div className={getStyleClass('webhezuo')}>
                  <span className="bscwebheimg1">
                    <img src={require('../../assets/bxh/hezuo1.png')} />
                  </span>
                  <span className="bscwebheimg2">
                    <img src={require('../../assets/bxh/hezuo2.png')} />
                  </span>
                  <span className="bscwebheimg3">
                    <img src={require('../../assets/bxh/hezuo3.png')} />
                  </span>
                  <span className="bscwebheimg4">
                    <img src={require('../../assets/bxh/hezuo4.png')} />
                  </span>
                  {
                    chainID === '66' || chainID === '1' ?
                    <span className="bscwebheimg5">
                      <img src={require('../../assets/bxh/hezuo9.png')} />
                    </span>
                    :
                    null
                  }
                </div>
                <div className={getStyleClass('webhezuo')}>
                  <span className="bscwebheimg1">
                    <img src={require('../../assets/bxh/hezuo5.png')} />
                  </span>
                  <span className="bscwebheimg2">
                    <img src={require('../../assets/bxh/hezuo6.png')} />
                  </span>
                  <span className="bscwebheimg3">
                    <img src={require('../../assets/bxh/hezuo7.png')} />
                  </span>
                  <span className="bscwebheimg4">
                    <img src={require('../../assets/bxh/hezuo8.png')} />
                  </span>
                  {
                    chainID === '66' || chainID === '1' ?
                    <span className="bscwebheimg5">
                      <img src={require('../../assets/bxh/hezuo10.png')} />
                    </span>
                    :
                    null
                  }
                </div>
              </div>
              :
              null
            }
  
            {
              chainID === '128' ?
              <div>
                <div className={classes.strategicCooperation}>
                  <div className={classes.strategicCooperationContent}>
                  {
                  strategicCooperationList.map((obj, idx) => {
                    return <img onClick={()=>{this.contactAddress(obj.link)}} className={obj.link?classes.iconHasLink:null} key={idx} src={require('../../assets/bxh/strategic/' + obj.name + '.png')} />
                  })
                  }
                 </div>
                </div>
                <div className={classes.thankSupport}>
                  <div className={classes.thankSupportContent}>
                  {
                  thankSupportList.map((obj, idx) => {
                    return <img onClick={()=>{this.contactAddress(obj.link)}} className={obj.link?classes.iconHasLink:null} key={idx} src={require('../../assets/bxh/support/' + obj.name + '.png')} />
                  })
                  }
                  </div>
                </div>
                <div className={[classes.moduleTitle, chainID === '56' ? 'bscfonttab' : 'hecofonttab'].join(' ')}>
              {
                chainID === '56' ?
                  <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} /> 
                  :
                  <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
              }
              <div>{t('BXH.listmechanism')}</div>
              {
                chainID === '56' ?
                  <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} /> 
                  :
                  <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
              }
            </div>
            <div className={classes.pcGovernance}>
              <div className={classes.pcGovernanceItem}>
                {
                  chainID === '56' ?
                    <img src={require('../../assets/bxh/huigou1.png')} />
                    :
                    <img src={require('../../assets/bxh/huigou.png')} />
                }
                <div className={classes.pcGovernanceItemTitle}>{t('BXH.listbuyback1')}</div>
                <div className={classes.pcGovernanceItemDesc}>{t('BXH.listbuyback2')}</div>
              </div>
              <div className={classes.pcGovernanceItem}>
                {
                  chainID === '56' ?
                    <img src={require('../../assets/bxh/DAO1.png')} />
                    :
                    <img src={require('../../assets/bxh/DAO.png')} />
                }
                <div className={classes.pcGovernanceItemTitle}>{t('BXH.listDAO1')}</div>
                <div className={classes.pcGovernanceItemDesc}>{t('BXH.listDAO2')}</div>
              </div>
              <div className={classes.pcGovernanceItem}>
                {
                  chainID === '56' ?
                    <img src={require('../../assets/bxh/jiangli1.png')} />
                    :
                    <img src={require('../../assets/bxh/jiangli.png')} />
                }
                <div className={classes.pcGovernanceItemTitle}>{t('BXH.listreward1')}</div>
                <div className={classes.pcGovernanceItemDesc}>{t('BXH.listreward2')}</div>
              </div>
            </div>
              </div>
              :
              null
            }
            
            {
              chainID === '56' || chainID === '66' || chainID === '1' ?
              <div>
                <div className={getStyleClass('fonttab',classes.moduleTitle)}>
                  {
                    chainID === '56' ?
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} />
                    :
                    chainID === '66' ?
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft2.png')} />
                    :
                    chainID === '1' ?
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft3.png')} />
                    :
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
                  }
                  <div>{t('BXH.auditInstitutions')}</div>
                  {
                    chainID === '56' ?
                    <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} />
                    :
                    chainID === '66' ?
                    <img className={classes.rightLine} src={require('../../assets/bxh/lineRight2.png')} />
                    :
                    chainID === '1' ?
                    <img className={classes.rightLine} src={require('../../assets/bxh/lineRight3.png')} />
                    :
                    <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
                  }
                </div>
                {
                  chainID === '56' ?
                  <div style={{ display: 'flex' }}>
                    <div onClick={this.auditBSCAddress} className={classes.auditLogo}><img src={require('../../assets/bxh/slowMistLogo1.png')} /></div>
                    <div onClick={this.lingAddress} className={classes.auditLogo}><img src={"https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling1.png"} /></div>
                    <div onClick={this.lingAddress1} className={classes.auditLogo}><img src={"https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling3.png"} /></div>
                  </div>
                  :
                  chainID === '66' ?
                  <div style={{ display: 'flex' }}>
                    <div onClick={this.auditOECAddress} className={classes.auditLogo}><img src={"http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_2.png"} /></div>
                    <div onClick={this.lingOECAddress} className={classes.auditLogo}><img src={"http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_3.png"} /></div>
                  </div>
                  :
                  chainID === '1' ?
                  <div style={{ display: 'flex' }}>
                    <div onClick={this.auditOECAddress} className={classes.auditLogo}><img src={"http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_4.png"} /></div>
                    <div onClick={this.lingOECAddress} className={classes.auditLogo}><img src={"http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_6.png"} /></div>
                  </div>
                  :
                  <div style={{ display: 'flex' }}>
                    <div onClick={this.auditAddress} className={classes.auditLogo}><img src={require('../../assets/bxh/slowMistLogo.png')} /></div>
                    <div onClick={this.lingAddress} className={classes.auditLogo}><img src={"https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling.png"} /></div>
                  </div>
                }
              </div>
              :
              null
            }

            {/* 点击领取 */}
            {/* {
              (airdrop && yieldAirDropCount && yieldAirDropCount == 0) ?
                (<div className={classes.pcLingQuTip}>
                  <div className={classes.pcLingQuTipDesc}>
                    {t('BXH.homeguli1')}，{t('BXH.homeguli2')} {airdrop && airdrop.airdrop_amount ? this.saveToTwoWei(airdrop.airdrop_amount, 0) : '50'} BXH
                    <span className={classes.pcLingQuTipBtn} onClick={() => { this.lpAirDrop() }}>{t('BXH.homelingqu')}</span>
                    <div>{t('BXH.lingquairdroptip')}</div>
                  </div>
                </div>
                ) : (null)
            } */}
 
          </div>

          <FooterPC />
  
          { modalOpen && this.renderModal()}
          { modalUnlock && this.renderUnlockWalletModal()}
          { modalSend && this.renderSendModal()}
  
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <LangM isHome={true} openUnlockModal={this.openUnlockModal} />

          <div className={getStyleClass('MConterbg',classes.content)}>
            {/* 轮播 */}
            {
              language === "zh" || language === "zh-CN" ? 
              // 中文banner
              <div>
                {
                  bxh_ifo_banner ?
                    (
                      <Carousel className={classes.banner} onClickItem={this.bannerClick} interval={5000} autoPlay={true} showThumbs={false} showIndicators={bxh_ifo_banner.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                        {
                          sortBannerArray.map((obj, idx) => {
                            return <img key={idx} src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ borderRadius: '8px' }} />
                          })
                        }
                      </Carousel>
                    ) :
                    <div>
                      <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-h5-moren.png" />
                    </div>
                }
              </div>
              :
              // 英文banner
              <div>
                {
                  bxh_ifo_banner_en ?
                    (
                      <Carousel className={classes.banner} onClickItem={this.bannerClick_en} interval={5000} autoPlay={true} showThumbs={false} showIndicators={bxh_ifo_banner_en.length > 1} showStatus={false} showArrows={false} infiniteLoop={true}>
                        {
                          sortBannerArray_en.map((obj, idx) => {
                            return <img key={idx} src={isMobile ? obj.imgH5 : obj.imgWeb} style={{ borderRadius: '8px' }} />
                          })
                        }
                      </Carousel>
                    ) :
                    <div>
                      <img src="https://b1.superrabbits.cn/mos/BXH/picture/banner-h5-moren.png" />
                    </div>
                }
              </div>
            }
 
            {/* 新版移动端BSC start */}
            {
              chainID === '56' || chainID === '66' || chainID === '1' || chainID === '137' || chainID === '43114' ?
              <div>
                 
                <div>
                  {/* 总流动性质押 */}
                  <div className={getStyleClass('total')}>
                     <h2>{t('BXH.pledgeMulti')}</h2>
                     <div className={"bsctotqian"}>
                        <img src={ require('../../assets/bxh/qianbi.png') } alt='' />
                        <span>
                            {tvlTotal ?
                              (
                                <CountUp
                                    start={this.saveToTwoWei(oldTvl_total)}
                                    end={this.saveToTwoWei(tvlTotal)}
                                    duration={2.0}
                                    separator=","
                                    decimals={2}
                                    decimal="."
                                    prefix="$">
                                </CountUp>
                              )
                            : '--'}
                        </span>
                    </div>
                  </div>
                  {/* TVL、价格等 */}
                  <div className={[chainID === '1' ? 'ethtvlbg' : 'bsctvlbg'].join(' ')} >
                    <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                      <div className={getStyleClass('tvlback',classes.BXHzhiacit)}>
                        {
                          chainID === '56' ?
                          <i>{t('BXH.bscTVL')}</i>
                          :
                          chainID === '1' ?
                          <i>{t('BXH.ethTVL')}</i>
                          :
                          chainID === '137' ?
                          <i>{t('BXH.ethTVL')}</i>
                          :
                          chainID === '43114' ?
                          <i>{t('BXH.avaxTVL')}</i>
                          :
                          <i>{t('BXH.oecTVL')}</i>
                        }
                        {bxhInfo && bxhInfo.tvl_total ?
                        (
                           <CountUp
                             start={this.saveToTwoWei(oldTvl_total)}
                             end={this.saveToTwoWei(bxhInfo.tvl_total)}
                             duration={2.0}
                             separator=","
                             decimals={2}
                             decimal="."
                             prefix="$">
                          </CountUp>
                       )
                       : '--'}
                      </div>
                      <div className={getStyleClass('tvlback',classes.BXHzhiacit)}>
                        <i>{t('BXH.bscTrade')}</i>
                        {bxhInfo && bxhInfo.total_ex_volume ?
                        (
                           <CountUp
                             start={this.saveToTwoWei(oldTotal_ex_volume)}
                             end={this.saveToTwoWei(bxhInfo.total_ex_volume)}
                             duration={2.0}
                             separator=","
                             decimals={2}
                             decimal="."
                             prefix="$">
                           </CountUp>
                        )
                        : '--'}
                      </div>
                      <div className={getStyleClass('tvlback',classes.BXHzhiacit)}>
                        <i>{t('BXH.bscBXHValue')}</i>
                        <span>
                        {
                           bxhInfo && bxhInfo.bxh_price ?
                             (
                               '$' + this.saveToWei(bxhInfo.bxh_price)
                             )
                             : '--'
                        }
                        </span>
                      </div>
                      <div className={getStyleClass('tvlback',classes.BXHzhiacit)}>
                        <i>{t('BXH.bscMining')}</i>
                        {bxhInfo && bxhInfo.bxh_total_mine ?
                        (
                          <CountUp
                             start={this.saveToTwoWei(oldTvl_total)}
                             end={this.saveToTwoWei(bxhInfo.bxh_total_mine)}
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
                    <div style={{ clear:'both' }}></div>
                  </div>
                </div>

                {/* 借贷 */}
                {/* {
                  loanOpenSatus === '1' ?
                  <div style={{ marginTop: '10px' }}>
                    {
                      language === "zh" || language === "zh-CN" ?
                      <div className={classes.loanconter} onClick={this.loanLink}>
                        <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/mloan5.png" style={{ width: '100%' }} />
                        <div className={classes.loantitle}>
                          <em>存借总量</em>
                          {
                            sumDeposit&&sumBorrow?
                            <span>${_getValueAdd2(sumDeposit, sumBorrow)}</span>
                            :
                            <span>--</span>
                          }
                        </div>
                      </div>
                      :
                      <div className={classes.loanconter} onClick={this.loanLink}>
                        <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/mloan6.png" style={{ width: '100%' }} />
                        <div className={classes.loantitle}>
                          <em>total</em>
                          {
                            sumDeposit&&sumBorrow?
                            <span>${_getValueAdd2(sumDeposit, sumBorrow)}</span>
                            :
                            <span>--</span>
                          }
                        </div>
                      </div>
                    }
                  </div>
                  :
                  null
                } */}
 
                {/* 减产倒计时 */}
                <div className={getStyleClass('jianchan')}>
                  <div className={getStyleClass('jiantit')}>
                    <span>{t('BXH.daytit1')}</span>
                    <span>{t('BXH.daytit2')}</span>
                  </div>
                  <div className={"bscjianday"}>
                    <span>{this.state.day}</span>
                    <i>{t('BXH.dayhour1')}</i>
                    <span>{this.state.hour}</span>
                    <i>{t('BXH.dayhour2')}</i>
                    <span>{this.state.minute}</span>
                    <i>{t('BXH.dayhour3')}</i>
                    <span>{this.state.second}</span>
                    <i>{t('BXH.dayhour4')}</i>
                  </div>
                </div>

                  {/* 质押挖矿 */}
                  {
                    chainID !== '66' && chainID !== '128' && chainID !== '1' ?
                    <div className={getStyleClass('minbg')}>
                      <div className={[classes.BXHcontbckbg, "bscChain"].join(' ')}>
                          <span className={getStyleClass('hometit')}>
                            {t('BXH.homePledge')}
                          </span>
                      </div>
                      <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          bxh_pool && bxh_pool.length > 0 ?
                              (
                                bxh_pool.map((item, index) => {
                                  return (
                                    <div className={getStyleClass('lists',classes.BXHzhiacit)} key={index} onClick={() => { this.navigateStakeTwist(item) }}>
                                      <span>
                                          <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token_0}.png`} />
                                          <i className={"bscsymname"}>{item.token_0}</i>
                                      </span>
                                      <span>
                                          <i className={"bscsymfenbi"}>
                                            <span style={{ float: 'left' }}>
                                              <CountUp
                                              start={0}
                                              end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                              duration={2.0}
                                              separator=","
                                              decimals={2}
                                              decimal="."
                                              suffix="%">
                                              </CountUp>
                                            </span>
                                            <div style={{ clear:'both', marginTop: '0px',padding: '0px' }}></div>
                                          </i>
                                          <i className={getStyleClass('symAPY')}>APR</i>
                                      </span>
                                      <em className={classes.mbxhliux}>
                                        <i>{t('BXH.homeLiquidity')}</i>
                                        $<CountUp
                                          start={0}
                                          end={this.saveToTwoWei(item.tvl_pool ? item.tvl_pool : 0)}
                                          duration={2.0}
                                          separator=","
                                          decimals={2}
                                          decimal="."
                                          suffix="">
                                        </CountUp>
                                      </em>
                                    </div>
                                  )
                                })
                              )
                              :
                              null
                        }           
                      </div>
                      <div style={{ clear:'both' }}></div>
                    </div>
                    :
                    null
                  }
                
                  {/* 单币挖矿 */}
                  {
                    chainID !== '56' && bxh_ex_twist && bxh_ex_twist.length > 0 ?
                    <div className={getStyleClass('minbg')}>
                      <div className={[classes.BXHcontbckbg, "bscChain"].join(' ')}>
                        <span className={getStyleClass('hometit')}>
                            {t('BXH.Singletit')}
                        </span>
                        <i onClick={() => { this.navigateMore() }} className={getStyleClass('minmores')}>
                            <em>{t('BXH.More')}</em>
                            <img src={require('../../assets/bxh/more1.png')} />
                        </i>
                      </div>
                      
                      <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          bxh_ex_pool && bxh_ex_pool.length > 0 ?
                            (
                                bxh_ex_pool.map((item, index) => {
                                  if(item.pool_type === 3){
                                    return (
                                      <div className={getStyleClass('lists',classes.BXHzhiacit)} key={index} onClick={() => { this.navigateBXHStake(item) }} >
                                        <span>
                                          <img src={item.symbol0Img_Show} />
                                          <i className={"bscsymname"}>{item.symbol0}</i>
                                        </span>
                                        <span>
                                          <i className={"bscsymfenbi"}>
                                            <span style={{ float: 'left' }}>
                                            <CountUp
                                              start={0}
                                              end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                              duration={2.0}
                                              separator=","
                                              decimals={2}
                                              decimal="."
                                              suffix="%">
                                            </CountUp>
                                            </span>
                                            {
                                              item.style_type === 2 ?
                                              <img src={require('../../assets/bxh/huo.png')} style={{ width: '10px', marginLeft: '10px' }} />
                                              :
                                              null
                                            }
                                            <div style={{ clear:'both', marginTop: '0px',padding: '0px' }}></div>
                                          </i>
                                          <i className={getStyleClass('symAPY')}>APR</i>
                                        </span>
                                      </div>
                                    )
                                  }
                                })
                            )
                            :
                            null
                        }           
                      </div>
                      <div style={{ clear:'both' }}></div>
                    </div>
                    :
                    null
                  }
 
                  {/* 流动性挖矿 */}
                  {
                    chainID !== '56' && bxh_ex_Stake && bxh_ex_Stake.length > 0 ?
                    <div className={[chainID === '1' ? 'ethminbg' : 'bscminbg'].join(' ')}>
                      <div className={[classes.BXHcontbckbg, "bscChain"].join(' ')}>
                        <span className={getStyleClass('hometit')}>
                            {t('BXH.bscliquidity')}
                        </span>
                        <i onClick={() => { this.navigateMore() }} className={getStyleClass('minmores')}>
                            <em>{t('BXH.More')}</em>
                            <img src={require('../../assets/bxh/more1.png')} />
                        </i>
                      </div>
                      <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          bscbxh_ex_pool && bscbxh_ex_pool.length > 0 ?
                            (
                                bscbxh_ex_pool.map((item, index) => {
                                  if(item.pool_type !== 3){
                                    return (
                                      <div className={getStyleClass('lists',classes.BXHzhiacit)} key={index} onClick={() => { this.navigateBXHStake(item) }}>
                                        <span>
                                          <img src={item.symbol0Img_Show} />
                                          <img src={item.symbol1Img_Show} style={{     marginLeft: '-10px' }} />
                                          <i className={"bscsymname"}>
                                              {item.symbol0}-{item.symbol1}
                                          </i>
                                        </span>
                                        <span>
                                          <i className={"bscsymfenbi"}>
                                            <CountUp
                                              start={0}
                                              end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                              duration={2.0}
                                              separator=","
                                              decimals={2}
                                              decimal="."
                                              suffix="%">
                                            </CountUp>
                                          </i>
                                          <i className={[chainID === '56' ? 'bscsymAPY' : 'okexsymAPY'].join(' ')}>APR</i>
                                        </span>
                                      </div>
                                    )
                                  }
                                })
                            )
                            :
                            null
                        }           
                      </div>
                      <div style={{ clear:'both' }}></div>
                    </div>
                    :
                    null
                  }
 
                  {/* 合作伙伴 */}
                  <div className={[chainID === '1' ? 'ethminbg' : 'bscminbg'].join(' ')}>
                    <div className={[classes.BXHcontbckbg, "bscChain"].join(' ')}>
                       <span className={getStyleClass('hometit')}>
                          {t('BXH.bscPartners')}
                       </span>
                    </div>
                    <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo1.png')} style={{     marginTop: '6px' }} />
                      </div>      
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo2.png')} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo3.png')} style={{     marginTop: '8px' }} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo4.png')} style={{     marginTop: '5px' }} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo5.png')} style={{     marginTop: '5px' }} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo6.png')} style={{     marginTop: '5px' }} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo7.png')} style={{     marginTop: '5px' }} />
                      </div>
                      <div className={[classes.BXHzhiacit, chainID === '56' ? 'bschezuolists' : chainID === '1' ? 'ethhezuolists' : 'okexhezuolists'].join(' ')} >
                         <img src={require('../../assets/bxh/hezuo8.png')} style={{     marginTop: '5px' }} />
                      </div>
                      {
                        chainID === '66' ?
                        <div className={[classes.BXHzhiacit, 'okexhezuolists'].join(' ')}>
                            <img src={require('../../assets/bxh/hezuo9.png')} style={{     marginTop: '5px' }} />
                        </div>
                        :
                        null
                      }
                      {
                        chainID === '66' ?
                        <div className={[classes.BXHzhiacit, 'okexhezuolists'].join(' ')}>
                            <img src={require('../../assets/bxh/hezuo10.png')} style={{     marginTop: '5px' }} />
                        </div>
                        :
                        null
                      }
                    </div>
                    <div style={{ clear:'both' }}></div>
                  </div>
 
                  {/* 审计机构 */}
                  {
                    chainID === '137' || chainID === '43114' ?
                    null
                    :
                    <div className={[chainID === '1' ? 'ethminbg' : 'bscminbg'].join(' ')}>
                      <div className={[classes.BXHcontbckbg, "bscChain"].join(' ')}>
                        <span className={[chainID === '56' ? 'bschometit' : chainID === '1' ? 'ethhometit' : 'okexhometit'].join(' ')}>
                            {t('BXH.bscAudited')}
                        </span>
                      </div>
                      <div className={`${classes.BSCremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          chainID === '56' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px', width: '31%' }} onClick={this.lingAddress}>
                            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/lingzong.png" />
                          </div>      
                          :
                          chainID === '1' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px' }} onClick={this.lingOECAddress}>
                            <img src="http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_7.png" />
                          </div>   
                          :
                          chainID === '66' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px' }} onClick={this.lingOECAddress}>
                            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_33.png" />
                          </div>      
                          :
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px' }} onClick={this.lingOECAddress}>
                            <img src="http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_33.png" />
                          </div>      
                        }

                        {
                          chainID === '56' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px', width: '31%', marginLeft: '1%' }} onClick={this.auditBSCAddress} >
                            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/manwu.png" />
                          </div>  
                          :
                          chainID === '1' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px'  }} onClick={this.auditOECAddress} >
                            <img src="http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_8.png" />
                          </div>
                          :
                          chainID === '66' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px' }} onClick={this.auditOECAddress}>
                            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_22.png" />
                          </div>  
                          :
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px'  }} onClick={this.auditOECAddress} >
                            <img src="http://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/group_22.png" />
                          </div>
                        }
                        
                        {
                          chainID === '56' ?
                          <div className={[classes.BXHzhiacit, 'bscshenhelists'].join(' ')} style={{ marginTop: '0px', padding: '0px', width: '31%', marginRight: '0px', marginLeft: '3%'  }} onClick={this.lingAddress1} >
                            <img src="https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling4.png" />
                          </div>  
                          :
                          null
                        }
                      </div>
                      <div style={{ clear:'both' }}></div>
                    </div>
                  }
                 
              </div>
              :
              null
            }
            {/* 新版移动端BSC end */}
  
 
            {/* 移动端 HECO start */}
            {
              chainID === '128' ?
              <div>
 
                {/* 当前价格、余额 */}
                <div className={classes.BXHhtitle}>
                  <div>
                    <span>{t('DFKII.dtprice')}(BXH)</span>
                    <em>
                      {
                        bxhInfo && bxhInfo.bxh_price ?
                          (
                            '$' + this.saveToWei(bxhInfo.bxh_price)
                          )
                          : '--'
                      }
                    </em>
                  </div>
                  <i></i>
                  <div>
                    <span>{t('BXH.bxhbalance')}</span>
                    <em>
                      {
                        rewardBXHFactory ?
                          <em>
                            {
                              rewardBXHFactory[0].tokens[0].bxhbanancehome ?
                                this.saveToWei(rewardBXHFactory[0].tokens[0].bxhbanancehome + "")
                                :
                                '--'
                            }
                          </em>
                          :
                          "0.00"
                      }
                    </em>
                  </div>
                </div>
  
                <div className={chainID === '56' ? 'bscfontzyabg' : 'hecofontzyabg'}>    
                  {/* Heco&BSC&OEC总流动性质押  */}
                  <div className={classes.hecobsc}>
                    <em>{t('BXH.pledgeTotal')}</em>
                    {tvlTotal ?
                      (
                        <CountUp
                          start={this.saveToTwoWei(oldTvl_total)}
                          end={this.saveToTwoWei(tvlTotal)}
                          duration={2.0}
                          separator=","
                          decimals={2}
                          decimal="."
                          prefix="$">
                        </CountUp>
                      )
                      : '--'}
                  </div>
                  
                  {/* 流动性质押、总成交量 */}
                  <div className={classes.BXHzhiyao2}>
                    <div className={chainID === '56' ? 'bscfontzhiyaobg' : 'hecofontzhiyaobg'} onClick={this.bxhList}>
                      <i>{t('BXH.homecurrent')}</i>
                      {bxhInfo && bxhInfo.tvl_total ?
                        (
                          <CountUp
                            start={this.saveToTwoWei(oldTvl_total)}
                            end={this.saveToTwoWei(bxhInfo.tvl_total)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="$">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                    <div className={chainID === '56' ? 'bscfontzhiyaobg' : 'hecofontzhiyaobg'} onClick={this.bxhDuihuan}>
                      <i>{t('BXH.volume')}(24h)</i>
                      {bxhInfo && bxhInfo.total_ex_volume ?
                        (
                          <CountUp
                            start={this.saveToTwoWei(oldTotal_ex_volume)}
                            end={this.saveToTwoWei(bxhInfo.total_ex_volume)}
                            duration={2.0}
                            separator=","
                            decimals={2}
                            decimal="."
                            prefix="$">
                          </CountUp>
                        )
                        : '--'}
                    </div>
                  </div>
                </div>
  
                {/* 热门推荐 */}
                <div className={classes.hotdoorparent}>
                  <div className={[classes.hottuijian, chainID === '56' ? 'bscChain' : 'hecoChain'].join(' ')}>
                    <em className={chainID === '56' ? 'bscremenico' : 'hecoremenico'}></em>
                    <span className="fontcolor">{t('BXH.hotdoortuijian')}</span>
                  </div>
      
                  <div className={classes.hotdoortuijianitem}>
                    <div onClick={this.backAddress} className={[classes.hotdooritem1, chainID === '56' ? 'bscfonthotbg' : 'hecofonthotbg'].join(' ')} >
                      <div className={classes.BXHcontbckbg1}>
                        <span style={{ fontSize: '10px', textAlign: 'center' }}>
                          {t('BXH.jingxuantitle')}
                        </span>
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={require('../../assets/bxh/backlogo.png')} style={{ width: '18px', height: '18px', marginTop: '7px' }} alt="" />
                        </div>
      
                        <span style={{ marginLeft: '5px', fontSize: '15px', marginTop: '5px' }}>BACK</span>
                      </div>
                      <div style={{ fontSize: '10px', marginLeft: '2px', marginTop: '1px', color: 'rgba(254, 255, 255, 0.6)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                        {t('BXH.homehotdoortip1')}
                      </div>
                    </div>
                    <div onClick={this.twistAddress} className={[classes.hotdooritem1, chainID === '56' ? 'bscfonthotbg' : 'hecofonthotbg'].join(' ')}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ position: 'relative' }}>
                          <img src={require('../../assets/bxh/twistlogo.png')} style={{ width: '18px', height: '18px', marginTop: '7px' }} alt="" />
                        </div>
      
                        <span style={{ marginLeft: '5px', fontSize: '15px', marginTop: '5px' }}>Twist AI Earn</span>
                      </div>
                      <div style={{ fontSize: '10px', marginLeft: '2px', marginTop: '1px', color: 'rgba(254, 255, 255, 0.6)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                        {t('BXH.homehotdoortip2')}
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* 热门矿池 */}
                {
                  bxh_ex_pool && bxh_ex_pool.length > 0 ?
                    <div className={[classes.BXHcontab, chainID === '56' ? 'bscfonthotbg' : 'hecofonthotbg'].join(' ')} style={{ padding: '0 0 10px 0px', marginTop: '30px'}} >
                      <div className={[classes.BXHcontbckbg, chainID === '56' ? 'bscChain' : 'hecoChain'].join(' ')}>
                        <span className={["fontcolor", "fontrmks"].join(' ')} style={{ fontSize: '14px', padding: '5px 10px' }}>
                          <em className="fontkchis"></em>
                          {t('BXH.hotpool')}
                        </span>
                        <i onClick={() => { this.navigateMore() }}>{t('BXH.More')}<img src={require('../../assets/bxh/more.png')} width="6px" /></i>
                      </div>
                      <div className={`${classes.BXHremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          bxh_ex_pool && bxh_ex_pool.length > 0 ?
                            (
                              bxh_ex_pool.map((item, index) => {
                                if(item.pool_type === 3){
    
                                  return (
                                    <div key={index} className={[classes.BXHzhiacit, chainID === '56' ? 'bscfontremenbd' : 'hecofontremenbd'].join(' ')} onClick={() => { this.navigateBXHStake(item) }}>
                                      <i>{item.symbol0}
                                        {
                                          item.style_type === 2 ?
                                          <img src={require('../../assets/bxh/huo.png')} style={{ width: '10px', marginLeft: '10px' }} />
                                          :
                                          <span className={classes.hmSingle}>
                                            {t('BXH.Single')}
                                          </span>
                                        }
                                      </i>
                                      <em className={classes.BXHcontbopem}>
                                        <CountUp
                                          start={0}
                                          end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                          duration={2.0}
                                          separator=","
                                          decimals={2}
                                          decimal="."
                                          suffix="%">
                                        </CountUp>
                                        <em>&nbsp;APR</em>
                                      </em>
                                    </div>
                                  )
    
                                }else{
    
                                  return (
                                    <div key={index} className={[classes.BXHzhiacit, chainID === '56' ? 'bscfontremenbd' : 'hecofontremenbd'].join(' ')} onClick={() => { this.navigateBXHStakePC(item) }}>
                                      {
                                        item.pool_type===4?
                                        <i>{item.symbol0}</i>
                                        :
                                        <i>{item.symbolPair_Show}</i>
                                      }
                                      <em className={classes.BXHcontbopem}>
                                        <CountUp
                                          start={0}
                                          end={this.saveToTwoWei(item.apy_pool ? item.apy_pool : 0)}
                                          duration={2.0}
                                          separator=","
                                          decimals={2}
                                          decimal="."
                                          suffix="%">
                                        </CountUp>
                                        <em>&nbsp;APR</em>
                                      </em>
                                    </div>
                                  )
    
                                }
                              })
                            ) : null
                        }
                      </div>
                      <div style={{ clear: 'both' }}></div>
                    </div>
                    :
                    <div className={[classes.BXHcontab, "fonthotbg"].join(' ')} style={{ padding: '0 0 10px 0px' }} >
                      <div className={classes.BXHcontbckbg}>
                        <span className={["fontcolor", "fontrmks"].join(' ')} style={{ fontSize: '14px', padding: '5px 10px' }}>
                          <img src={require('../../assets/bxh/home_1.png')} width="10px" style={{ verticalAlign: 'baseline' }} />{t('BXH.hotpool')}
                        </span>
                        <i onClick={() => { this.navigateMore() }}>{t('BXH.More')}<img src={require('../../assets/bxh/more.png')} width="6px" /></i>
                      </div>
                      <div className={`${classes.BXHremen} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        <div>
                          <i>--</i>
                          <em className={classes.BXHcontbopem}>--<em>&nbsp;APR</em>
                          </em>
                        </div>
                        <div>
                          <i>--</i>
                          <em className={classes.BXHcontbopem}>--<em>&nbsp;APR</em>
                          </em>
                        </div>
                        <div>
                          <i>--</i>
                          <em className={classes.BXHcontbopem}>--<em>&nbsp;APR</em>
                          </em>
                        </div>
                        <div>
                          <i>--</i>
                          <em className={classes.BXHcontbopem}>--<em>&nbsp;APR</em>
                          </em>
                        </div>
                      </div>
                      <div style={{ clear: 'both' }}></div>
                    </div>
                }
  
                {/* 即将上线矿池 */}
                {
                  bxh_ex_new && bxh_ex_new.length > 0 ?
                    <div className={classes.BXHcontab} style={{ padding: '0 0 10px 0px' }} >
                      <div className={classes.BXHcontbckbg}>
                        <span style={{ fontSize: '14px', padding: '5px 10px' }}>
                          <img src={require('../../assets/bxh/home_2.png')} width="10px" style={{ verticalAlign: 'baseline' }} />{t('BXH.Minepool')}
                        </span>
                      </div>
                      <div className={`${classes.BXHzhiyao} ${classes.BXHzhislid}`} style={{ padding: '0 10px' }}>
                        {
                          bxh_ex_new && bxh_ex_new.length > 0 ?
                            (
                              bxh_ex_new.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <i style={{ opacity: 1, fontSize: '14px' }}>{item.symbol}</i>
                                    <dl className={classes.liosmtop} style={{ opacity: .5 }}>{t('BXH.Openliquidity')}</dl>
                                    <dl style={{ opacity: .9 }}>{formatTimeDate(item.liquityTime)}</dl>
                                    <dl className={classes.liosmtop} style={{ opacity: .5 }}>{t('BXH.startmin')}</dl>
                                    <dl style={{ opacity: .9 }}>{formatTimeDate(item.stakeTime)}</dl>
                                  </div>
                                )
                              })
                            ) : null
                        }
                      </div>
                    </div>
                    :
                    null
                }
 
                {/* 减产倒计时、回购信息 */}
                <div className={[classes.BXHcontab1, chainID === '56' ? 'bscfonthotbg' : 'hecofonthotbg'].join(' ')}  style={{marginTop: '10px'}}>
                  <div className={[classes.BXHcondate, chainID === '56' ? 'bscdaojishcont' : ''].join(' ')} style={{ color: '#fff', fontSize: '15px', fontWeight: '500', marginLeft: '5px' }}>
                    <em style={{ fontStyle: 'inherit', fontSize: '14px' }}>{t('BXH.Countdown')}</em>
                    <span className={[chainID === '56' ? 'bscdaojishch' : ''].join(' ')}>
                      <i className="fontcolor">{this.state.day}</i>&nbsp;{t('BXH.daytime')}&nbsp;
                      <i className="fontcolor">{this.state.hour}</i>
                      &nbsp;:&nbsp;<i className="fontcolor">{this.state.minute}</i>&nbsp;:&nbsp;
                      <i className="fontcolor">{this.state.second}</i>
                    </span>
                  </div>
                  {
                    chainID === '128' ?
                    <div className={classes.BXHzhiyao_noborder}>
                      <div style={{ marginLeft: '5px' }}>
                        <i>{t('BXH.totalRepurchaseDestructionCount')}</i>
                        <div style={{ width: '100%' }}>
                          {
                            bxhInfo.buy_black_hole ?
                              (
                                <CountUp
                                  start={this.saveToTwoWei(oldTotal_black_hole)}
                                  end={this.saveToTwoWei(bxhInfo.buy_black_hole)}
                                  duration={2.0}
                                  separator=","
                                  decimals={2}
                                  decimal="."
                                  prefix="BXH：">
                                </CountUp>
                              )
                              : '--'
                          }
                        </div>
                      </div>
                      <em></em>
                      <div style={{ marginLeft: '12px' }} className={classes.daijiangliawards}>
                        <i>{t('BXH.listmoney')}</i>
                        {
                          bxhInfo.dao_reward_wait ?
                            (
                              <CountUp
                                start={this.saveToTwoWei(oldDaoRewardWait)}
                                end={this.saveToTwoWei(bxhInfo.dao_reward_wait)}
                                duration={2.0}
                                separator=","
                                decimals={2}
                                decimal="."
                                prefix="$">
                              </CountUp>
                            )
                            : '--'
                        }
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
      
                <div className={[classes.moduleTitle, chainID === '56' ? 'bscfonttab' : 'hecofonttab'].join(' ')}>
                  {
                    chainID === '56' ?
                      <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} />
                      :
                      <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
                  }
                  <div>{t('BXH.partners')}</div>
                  {
                    chainID === '56' ?
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} />
                      :
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
                  }
                </div>
                {
                  isMobile ?
                    null
                    :
                    <div className={classes.moduleSubTitle}>
                      <div>{t('BXH.leverDig')}</div>
                      <img onClick={this.backAddress} src={require('../../assets/bxh/back_logo.png')} />
                    </div>
                }
                <div className={classes.strategicCooperation}>
                  <div className={classes.strategicCooperationContent}>
                    {
                      strategicCooperationList.map((obj, idx) => {
                        return <img onClick={()=>{this.contactAddress(obj.link)}} className={obj.link?classes.iconHasLink:null} key={idx} src={require('../../assets/bxh/strategic/' + obj.name + '.png')} />
                      })
                    }
                  </div>
                </div>
                <div className={classes.thankSupport}>
                  {/* <span>{t('BXH.thankSupport')}</span> */}
                  <div className={classes.thankSupportContent}>
                    {
                      thankSupportList.map((obj, idx) => {
                        return <img onClick={()=>{this.contactAddress(obj.link)}} className={obj.link?classes.iconHasLink:null} key={idx} src={require('../../assets/bxh/support/' + obj.name + '.png')} />
                      })
                    }
                  </div>
                </div>
                <div className={[classes.moduleTitle, chainID === '56' ? 'bscfonttab' : 'hecofonttab'].join(' ')}>
                  {
                    chainID === '56' ?
                      <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} /> 
                      :
                      <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
                  }
                  <div>{t('BXH.listmechanism')}</div>
                  {
                    chainID === '56' ?
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} /> 
                      :
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
                  }
                </div>
                <div className={classes.governance}>
                  <div className={classes.governanceItem}>
                    {
                      chainID === '56' ? 
                        <img src={require('../../assets/bxh/huigou1.png')} />
                        :
                        <img src={require('../../assets/bxh/huigou.png')} />
                    }
                    <div className={classes.governanceItemTitle}>{t('BXH.listbuyback1')}</div>
                    <div className={classes.governanceItemDesc}>{t('BXH.listbuyback2')}</div>
                  </div>
                  <div className={classes.governanceItem}>
                    {
                      chainID === '56' ?
                        <img src={require('../../assets/bxh/DAO1.png')} />
                        :
                        <img src={require('../../assets/bxh/DAO.png')} />
                    }
                    <div className={classes.governanceItemTitle}>{t('BXH.listDAO1')}</div>
                    <div className={classes.governanceItemDesc}>{t('BXH.listDAO2')}</div>
                  </div>
                  <div className={classes.governanceItem}>
                    {
                      chainID === '56' ?
                        <img src={require('../../assets/bxh/jiangli1.png')} />
                        :
                        <img src={require('../../assets/bxh/jiangli.png')} />
                    }
                    <div className={classes.governanceItemTitle}>{t('BXH.listreward1')}</div>
                    <div className={classes.governanceItemDesc}>{t('BXH.listreward2')}</div>
                  </div>
                </div>
                <div className={[classes.moduleTitle, chainID === '56' ? 'bscfonttab' : 'hecofonttab'].join(' ')} >
                  {
                    chainID === '56' ?
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft1.png')} />
                    :
                    <img className={classes.leftLine} src={require('../../assets/bxh/lineLeft.png')} />
                  }
                  <div>{t('BXH.auditInstitutions')}</div>
                  {
                    chainID === '56' ?
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight1.png')} />
                      :
                      <img className={classes.rightLine} src={require('../../assets/bxh/lineRight.png')} />
                  }
                </div>
                {
                  chainID === '56' ?
                    <div style={{ display: 'flex', width: '300px', margin: 'auto', marginBottom: '20px' }}>
                      <div className={classes.auditLogo}><img onClick={this.auditBSCAddress} src={require('../../assets/bxh/slowMistLogo1.png')} /></div>
                      <div className={classes.auditLogo}><img onClick={this.lingAddress} src={"https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling1.png"} /></div> 
                    </div>
                    :
                    <div style={{ display: 'flex', width: '300px', margin: 'auto', marginBottom: '20px'  }}>
                      <div className={classes.auditLogo}><img onClick={this.auditAddress} src={require('../../assets/bxh/slowMistLogo.png')} /></div>
                      <div className={classes.auditLogo}><img onClick={this.lingAddress} src={"https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/ling.png"} /></div> 
                    </div>
                }
                {
                  (airdrop && yieldAirDropCount && yieldAirDropCount == 0) ?
                    (<div className={classes.BXHlqcont}>
                      <div className={classes.BXHlqtit}>
                        {t('BXH.homeguli1')}<br />{t('BXH.homeguli2')} {airdrop && airdrop.airdrop_amount ? airdrop.airdrop_amount : '50'} BXH
                      {/* 点击领取 */}
                        <span className={classes.BXHlqucont} onClick={() => { this.lpAirDrop() }}>{t('BXH.homelingqu')}</span>
                      </div>
                      <div className={classes.BXHlqtittip}>{t('BXH.lingquairdroptip')}</div>
                    </div>
                    ) : (null)
                }
 
              </div>
              :
              null
            }
            {/* 移动端 HECO end */}
 
          </div>
  
          { modalOpen && this.renderModal()}
          { modalUnlock && this.renderUnlockWalletModal()}
          { modalSend && this.renderSendModal()}
  
          <FooterM pagetype="home" />
  
        </div>
      )
    }
  
  };
  
  renderBXHNewsSingle = (item, index) => {
    const { classes, t } = this.props
    let chainID = localStorage.getItem('chainIDSwitch')
    let timeDate = Date.parse(new Date())/1000
    return (
      <div key={item.id} className={`${classes.pcrmkchi} ${classes.pcreopembotm}`}>
        <div className={classes.liuxtable1}>
          <div className={classes.pcopemico}>
            {/* <img src={`https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/${item.token0}.png`} /> */}
            <img src={`https://bxh-images.s3.ap-east-1.amazonaws.com/coin/${item.token0}.png`} />
          </div>
          <div className={classes.pcosymbolso}>
            <span>{item.token0}</span>
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
        <div className={chainID === '56'?classes.liuxtable4:classes.liuxtable2} style={{ color: '#fff' }}>
          <CountUp
            start={0}
            end={this.saveToTwoWei(item ? item.amountDay : 0)}
            duration={2.0}
            separator=","
            decimals={2}
            decimal="."
            prefix="$">
          </CountUp>&nbsp;{isNoEmpty(item.userInfo)?item.userInfo.rewardSymbol:'--'}
        </div>

        {/* 周期 */}
        {
          chainID === '56'?
          <div className={classes.liuxtable4}>
            <span>{isNoEmpty(item)&&isNoEmpty(item.userInfo)?item.userInfo.cycle:'--'} {t('BXH.day')}</span>
          </div>
          :
          null
        }

        {/* TVL */}
        <div className={chainID === '56'?classes.liuxtable2:classes.liuxtable3}>
          <CountUp
            start={0}
            end={this.saveToTwoWei(item ? item.tvlPool : 0)}
            duration={2.0}
            separator=","
            decimals={2}
            decimal="."
            prefix="$">
          </CountUp>
        </div>

        {/* APR */}
        <div className={getStyleClass('PCtableAPY',chainID === '56'?classes.liuxtable4:classes.liuxtable2, classes.liuxtableAPY)}> 
          <CountUp
            start={0}
            end={this.saveToTwoWei(item ? item.apyPool : 0)}
            duration={2.0}
            separator=","
            decimals={2}
            decimal="."
            suffix="%">
          </CountUp>
        </div>

        <div className={classes.lisombtm}>
          <div className={getStyleClass('PC_new_btn1',classes.pchomeility_new_btn1)} onClick={() => { this.navigateBXHSinglePC(item) }}>{t('BXH.diyatitle')}</div>
        </div>
      </div>
    )
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
  nav = (screen) => {
    this.props.history.push('/' + screen)
  }
  
  renderModal = () => {
    return (
      <OpeningModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }
  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={this.closeUnlockModal} modalOpen={this.state.modalUnlock} />
    )
  }
  
  closeModal = () => {
    this.setState({ modalOpen: false })
  }
  openUnlockModal = () => {
    this.setState({ modalUnlock: true })
  }
  closeUnlockModal = () => {
    this.setState({ modalUnlock: false })
  }
  
  lpAirDrop = () => {
    //BXHGETAIRDROP
    //
    store._getBXHAirDropSuccess((data) => {
  
    })
    const { bxhInfo, airdrop, team_lock } = this.state
    dispatcher.dispatch({ type: BXHGETAIRDROP, content: { airDropContractAddress: bxhInfo.air_address, msgContent: "AirDrop BXH" } })
  }
}
  
export default withNamespaces()(withRouter(withStyles(styles)(Home)));