import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Header from '../unlock/Header.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import BXHMortgageBackDialog from '../bxhMortgageBackDialog/bxhMortgageBackDialog.jsx';
import BXHV2MortgageBackDialog from '../bxhV2MortgageBackDialog/bxhV2MortgageBackDialog.jsx'
import BXHMortgageBackLockupDialog from '../bxhMortgageBackLockupDialog/bxhMortgageBackLockupDialog';
import LeftPC from '../unlock/LeftPC.jsx';
import './dao.css';
import CountUp from 'react-countup';
import { toShowDollar,SaveToTwoWei, _getValueAdd4,_getValuemultip,_getValuemultip1,_getValueAdd2,_getValueDivided,_getValueMinus4,_getValuePow } from '../../config/constantFunction';
import Footer from '../unlock/Footer.jsx';
import {ClickAwayListener} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';

import {
    ERROR,
    CONNECTION_CONNECTED,
    CONNECTION_DISCONNECTED,
    BXHCHNAGEACCOUNT,
    BXHDAOUSERINFO,
    BXHDAOUSERINFO_RETURNED,
    BXHDAOUSERPending,
    BXHDAOUSERPending_RETURNED,
    BXHDAOTRADESTAKEApprove,
    BXHDAOTRADESTAKEApprove_RETURNED,
    BXHDAOBXHDeposit,
    BXHDAOBXHDeposit_RETURNED,
    BXHDAOBXHRetrieve,
    BXHDAOBXHRetrieve_RETURNED,
    BXHDAOLockupApprove,
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
    BXHDAOBXHClaim,//BXH领取
    BXHDAOBXHClaim_RETURNED,
    BXHDAOBXHUnStake,//BXH提取质押
    BXHDAOBXHUnStake_RETURNED,
    BXHDAOBXHTeamRewards,
    BXHDAOBXHTeamRewards_RETURNED,
    //V3
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
        [theme.breakpoints.up('sm')]: {
            paddingTop: '65px',
        }
    },
    content: {
        padding: '0 15px 15px',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            width: '1050px',
            margin: 'auto',
            marginTop: '55px',
            marginBottom: '55px',
        }
    },
    contentTop: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
        }
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '0',
        padding: '0 30px',
        [theme.breakpoints.up('sm')]: {
            width: '1100px',
            margin: 'auto',
            marginTop: '55px',
        }
    },
    headerTitle: {
        fontWeight: 'bold', 
        fontSize: '19px', 
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            fontSize: '28px',
        }
    },
    headerDesc: {
        marginTop: '2px', 
        fontSize: '17px', 
        textAlign: 'center', 
        color: 'rgba(255, 255, 255, 0.6)',
        [theme.breakpoints.up('sm')]: {
            fontSize: '28px', 
        }
    },
    headerTip: {
        marginTop: '12px',
        fontSize: '14px',
        color: '#30BE85',
        fontWeight: 'bold',
        textAlign: 'center',
        '& img': {
            width: '16px',
            height: '16px',
            marginRight: '5px',
            verticalAlign: 'text-bottom',
        },
        '& u': {
            cursor: 'pointer',
            color: '#fff',
            opacity: '0.8',
            fontWeight: 'normal',
        }
    },
    headerCard: {
        display: 'flex',
        marginTop: '20px',
        width: '100%',
        padding: '0 15px 15px',
    },
    headerCardItem: {
        background: '#20233C',
        borderRadius: '12px',
        height: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '15px',
    },
    headerCardItemTitle: {
        fontSize: '11px',
        fontWeight: '500',
        opacity: '0.7',
    },
    switch: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
    },
    switchContent: {
        borderRadius: '4px',
        padding: '1px',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            padding: '2px',
        },
        '& div': {
            width: '100px',
            height: '30px',
            lineHeight: '30px',
            borderRadius: '4px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                width: '160px',
                lineHeight: '36px',
                height: '36px',
            },
            '&:hover': {
                filter: 'brightness(80%)',
            },
            '&:active': {
                filter: 'brightness(50%)',
            },        
        },
    },
    switchhecoContent: {
        backgroundColor: '#22253F',
    },
    switchbscContent: {
        backgroundColor: '#141517',
    },
    gradientBg: {
        width: '128px',
        height: '34px',
        position: 'absolute',
        left: '0',
        top: '12px',
        backgroundImage: 'linear-gradient(to right, #30BE85, #1D1F36)',
        opacity: '0.1',
    },
    bscgradientBg: {
        width: '128px',
        height: '34px',
        position: 'absolute',
        left: '0',
        top: '12px',
        backgroundImage: 'linear-gradient(to right, #FDD436, #1D1F36)',
        opacity: '0.1',
    },
    bxhDaoCard: {
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px 20px',
        [theme.breakpoints.up('sm')]: {
            padding: '18px 20px 40px',
        }
    },
    bxhDaoCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        }
    },
    bxhDaoCardHeaderText: {
        fontSize: '15px',
        fontWeight: 'bold', 
        color: 'rgba(255, 255, 255, 0.8)',
        '& img': {
            width: '15px',
            height: '16px',
            marginRight: '10px',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '25px',
            color: '#FFF',
        }
    },
    bxhDaoCardContent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: '15px',
        padding: '0 5px',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    bxhDaoCardContentLine: {
        width: 'auto', 
        height: '1px', 
        background: 'linear-gradient(to right,transparent 0%,transparent 50%,#3c3c3c 50%,#3c3c3c 100%)',
        backgroundSize: '20px 1px',
        backgroundRepeat: 'repeat-x',
        marginTop: '25px',
        [theme.breakpoints.up('sm')]: {
            width: '1px', 
            height: 'auto', 
            margin: '0 40px',
            background: 'linear-gradient(to bottom,transparent 0%,transparent 50%,#3c3c3c 50%,#3c3c3c 100%)',
            backgroundSize: '1px 20px',
            backgroundRepeat: 'repeat-y',
        }
    },
    bxhDaoCardContentLeft: {
        position: 'relative',
        flex: '1',
    },
    bxhDaoCardContentRight: {
        flex: '1',
        marginTop: '20px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0',
        }
    },
    bxhDaoCardRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        [theme.breakpoints.up('sm')]: {
            padding: '10px 0',
        }
    },
    bxhDaoCardRowItem: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            cursor: 'pointer',
            marginLeft: '5px',
            width: '12px',
            height: '12px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        }
    },
    bxhDaoCardRowItemVal: {
        fontSize: '12px',
        color: '#FFF',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        }
    },
    bxhDaoBtnReceive: {
        marginTop:'15px',
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
        [theme.breakpoints.up('sm')]: {
            marginTop:'22px',
        }
    },
    bxhDaoBtnReceiveDisabled: {
        background:'#4A4C5E',
        cursor:'default',
        marginTop:'15px',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        opacity: '0.5',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        [theme.breakpoints.up('sm')]: {
            marginTop:'22px',
        }
    },
    bscbxhDaoBtnReceive: {
        marginTop:'15px',
        background: '#FDD436',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#212833',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(255, 206, 78, 0.8)',
        },
        '&:active': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(19, 119, 80, 1)',
        },
        [theme.breakpoints.up('sm')]: {
            marginTop:'22px',
        }
    },
    bxhDaoBtnApprove: {
        marginTop: '15px',
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
        [theme.breakpoints.up('sm')]: {
            marginTop: '62px',
        }
    },
    bxhDaoBtnPledge: {
        marginTop: '15px',
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
        [theme.breakpoints.up('sm')]: {
            marginTop: '5px',
        }
    },
    bxhDaoBtn: {
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
    bxhDaoBtnBorder: {
        marginTop: '15px',
        border: '1px solid #30BE85',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#30BE85',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            color: 'rgba(19, 119, 80, 1)',
        },
    },
    bscbxhDaoBtnBorder: {
        marginTop: '15px',
        border: '1px solid #FDD436',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#FDD436',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(255, 206, 78, 0.8)',
        },
        '&:active': {
            color: 'rgba(255, 206, 78, 0.8)',
        },
    },
    rewardCard: {
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        }
    },
    rewardCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    rewardCardHeaderAwardedAmount: {
        display: 'none',
        fontSize: '15px',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'right',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    rewardCardAmount: {
        marginTop: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0 5px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '20px',
        },
    },
    rewardCardAmountTitle: {
        fontSize: '12px',
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        },
    },
    rewardCardAmountDesc: {
        fontSize: '12px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    },
    rewardCardApk: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0 5px',
        fontSize: '13px',
        color: '#2EBC84',
        fontWeight: '500',
    },
    rewardCardApkDesc: {
        // width: '50%',
        wordBreak: 'keep-all',
        wordWrap: 'break-word',
        '& span': {
            fontWeight: 'bolder',
        }
    },
    rewardCardCoin: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    rewardCardCoinItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        flex: '1',
        '& span': {
            marginTop: '6px', 
            fontSize: '19px', 
            fontWeight: 'bold'
        },
    },
    coinLogo: {
        width: '40px',
        height: '40px',
        border: '2px solid #2C3036',
        borderRadius: '20px',
    },
    rewardCardBtnContent: {
        marginTop: '30px',
        width: '100%',
    },
    rewardCardApprove: {
        background: '#2EBC84',
        width: '100%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
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
    rewardCardBtnContentRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
    rewardCardReceive: {
        marginTop: '15px',
        border: '1px solid #2EBC84',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#2EBC84',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            color: 'rgba(19, 119, 80, 1)',
        },
    },
    bscrewardCardReceive: {
        marginTop: '15px',
        border: '1px solid #FDD436',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#FDD436',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            color: 'rgba(19, 119, 80, 1)',
        },
    },
    rewardCardReceiveDisable: {
        marginTop: '15px',
        border: '1px solid #4A4C5E',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#4A4C5E',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'default',
    },
    buyBackV2: {
        marginTop: '10px',
        borderRadius: '12px',
        backgroundColor: '#20233C',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            marginTop: '20px',
        }
    },
    buyBack: {
        marginTop: '10px',
        borderRadius: '12px',
        backgroundColor: '#20233C',
        overflow: 'hidden',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '25px',
            marginTop: '0',
            width: '50%',
        }
    },
    buyBackCard: {
        position: 'relative',
        // background: '#1E2139',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px',
    },
    buyBackCardContent: {
        margin: '0 5px 5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    buyBackCardContentRow: {
        marginTop: '15px',
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            marginTop: '20px',
        },
    },
    buyBackV2CardContentRowItem: {
        display: 'flex',
        flex: '1',
        width: '50%',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    },
    buyBackV2CardContentRowItemDesc: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginLeft: '0',
        wordBreak: 'keep-all',
        wordWrap: 'break-word',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '8px',
            fontSize: '16px',
        },
    },
    buyBackV2PCListContent: {
        padding: '0 20px',
        marginTop: '36px',
    },
    buyBackV2PCListContentHeader: {
        marginBottom: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        '& div': {
            width: '33.3%',
            textAlign: 'right',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.5)',
        }
    },
    v2ListAddress: {
        padding: '15px 20px',
    },
    v2ListAddressTitle: {
        fontSize: '13px',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        }
    },
    v2PCAddressItem: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '55px',
        '& div': {
            width: '33.3%',
            textAlign: 'right',
        }
    },
    v2PCAddressItemInfoTitle: {
        color: '#2EBC84',
        fontWeight: 'bold',
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    v2PCAddressItemInfoDesc: {
        fontSize: '15px',
    },
    v2PCAddressItemAmount: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: '15px',
    },
    buyBackCardContentRowItem: {
        display: 'flex',
        flex: '1',
        width: '50%',
        flexDirection: 'column',
    },
    buyBackCardContentRowItemTiltle: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        },
    },
    buyBackCardContentRowItemDesc: {
        fontSize: '14px',
        fontWeight: 'bold',
        width: '100%',
        wordBreak: 'keep-all',
        wordWrap: 'break-word',
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    },
    lockUp: {
        marginTop: '10px',
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 0',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            marginTop: '25px',
            paddingBottom: '30px',
        }
    },
    lockUpTitle: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '15px',
        padding: '0 20px',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    lockUpTitleDesc: {
        marginTop: '20px',
        marginLeft: '0',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0',
            marginLeft: '20px',
        },
    },
    lockUpItem: {
        padding: '0 20px',
    },
    lockUpItemHeader: {
        marginTop: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& span': {
            marginTop: '5px',
            fontSize: '15px',
            fontWeight: 'bold',
        },
    },
    lockUpItemRowItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '15px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px',
        '& span': {
            fontWeight: 'bold',
            color: '#FFF',
        },
    },
    lockUpItemVerticalLine: {
        width:'1px',
        height:'16px',
        background:'rgba(151, 151, 151, 0.1)',
    },
    lockUpItemLine: {
        marginTop: '20px',
        width: '100%',
        height: '1px',
        background: 'rgba(151, 151, 151, 0.1)'
    },
    lockUpItemPCName: {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            marginLeft: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#FFF',
        },
    },
    lockUpItemPCRowItem: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '13px',
        '& span': {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#FFF',
        },
    },
    lockUpBtnContent: {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        flex: '1',
        [theme.breakpoints.up('sm')]: {
            marginTop: '0',
        }
    },
    lockUpBtn: {
        background: '#2EBC84',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        flexGrow: '1',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            backgroundImage: 'none',
            backgroundColor: 'rgba(19, 119, 80, 1)',
        },
        [theme.breakpoints.up('sm')]: {
            height: '35px',
            lineHeight: '35px',
        }
    },
    lockUpBtnDisable: {
        background: '#4A4C5E',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        opacity: '0.5',
        fontSize: '15px',
        fontWeight: 'bold',
        flexGrow: '1',
        cursor: 'default',
        [theme.breakpoints.up('sm')]: {
            height: '35px',
            lineHeight: '35px',
        }
    },
    lockUpBtnBorder: {
        border: '1px solid #2EBC84',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#2EBC84',
        fontSize: '15px',
        fontWeight: 'bold',
        flexGrow: '1',
        cursor: 'pointer',
        '&:hover': {
            color: 'rgba(28, 163, 109, 1)',
        },
        '&:active': {
            color: 'rgba(19, 119, 80, 1)',
        },
        [theme.breakpoints.up('sm')]: {
            height: '35px',
            lineHeight: '35px',
        }
    },
    lockUpBtnBorderDisable: {
        border: '1px solid #4A4C5E',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#4A4C5E',
        fontSize: '15px',
        fontWeight: 'bold',
        flex: '1',
        cursor: 'default',
        [theme.breakpoints.up('sm')]: {
            height: '35px',
            lineHeight: '35px',
        }
    },
    toPledge: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        '& img':{
            width: '10px',
            verticalAlign: 'sub',
            marginLeft: '5px',
        },
    },
    lockUpAttentionContent: {
        marginTop: '20px',
        padding: '0 20px',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
        }
    },
    lockUpAttention: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    lockUpAttentionDesc: {
        marginTop: '15px',
        fontSize: '12px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.7)',
        [theme.breakpoints.up('sm')]: {
            marginTop: '5px',
            color: '#FFF',
        }
    },
    listAddress: {
        padding: '15px 20px',
    },
    listAddressTitle: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
    viewMore: {
        marginTop: '5px',
        fontSize: '12px',
        color: '#2EBC84',
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        }
    },
    addressItem: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '52px',
    },
    addressItemInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    addressItemInfoTitle: {
        color: '#2EBC84',
        fontWeight: 'bold',
        fontSize: '12px',
        maxWidth: '120px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    addressItemInfoDesc: {
        fontSize: '12px',
    },
    addressItemAmount: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: '12px',
        textAlign: 'right',
    },
    teamRewardsCard: {
        marginTop: '10px',
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            marginTop: '25px',
            paddingBottom: '30px',
        }
    },
    teamRewardsCardTitle: {
        fontWeight: 'bold',
        color: '#E3E4E5',
    },
    teamRewardsCardContent: {
        margin: '15px 5px 0',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'space-start',
            alignItems: 'center',
            marginTop: '25px',
        }
    },
    teamRewardsCardContentText: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
        '& span': {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            marginRight: '10px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        }
    },
    teamRewardsCardContentLine: {
        width: '1px',
        height: '12px',
        backgroundColor: 'rgba(164, 165, 174, 0.2)',
    },
    teamRewardsCardContentWithdraw: {
        color: '#2EBC84',
        backgroundColor: 'rgba(74, 235, 118, 0.2)',
        borderRadius: '14px',
        height: '25px',
        lineHeight: '25px',
        padding: '0 15px',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            right: '25px',
            bottom: '30px',
        }
    },
    v3Root: {
        color: '#FFF',
        position: 'relative',
        background: '#20233C',
        borderRadius: '12px',
        padding: '12px 20px 30px',
        [theme.breakpoints.up('sm')]: {
            padding: '26px 30px 35px',
        }
    },
    v3Title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#E3E4E5',
    },
    v3GradientBg: {
        width: '225px',
        height: '65px',
        position: 'absolute',
        left: '0',
        top: '12px',
        backgroundImage: 'linear-gradient(to right, #30BE85, #1D1F36)',
        opacity: '0.1',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    v3Content: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        padding: '0',
        [theme.breakpoints.up('sm')]: {
            marginTop: '30px',
            padding: '0 10px',
        }
    },
    v3Row1: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    v3Row2: {
        marginTop: '15px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            marginTop: '30px',
        }
    },
    v3ApyPledgeAmountContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '55%',
        },
    },
    v3RewardContainer: {
        marginLeft: '0',
        marginTop: '20px',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to bottom, rgba(35, 38, 65, 0.16), #232641)',
        border: '1px solid #2B2F50',
        borderRadius: '4px',
        padding: '10px 15px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '20px',
            marginTop: '0',
            width: '45%',
            padding: '15px 25px',
        },
    },
    v3BxhDaoApyBody: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    v3BxhDaoApy: {
        fontWeight: 'bold',
        fontSize: '22px',
        color: '#30BE86',
        [theme.breakpoints.up('sm')]: {
            fontSize: '34px',
        }
    },
    v3BxhDaoCardApy: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        '& img': {
            cursor: 'pointer',
            marginLeft: '5px',
            width: '12px',
            height: '12px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '14px',
        }
    },
    v3PledgeAmount: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to bottom, rgba(35, 38, 65, 0.16), #232641)',
        border: '1px solid #2B2F50',
        borderRadius: '4px',
        padding: '12px 14px',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '13px',
        '& span': {
            fontWeight: 'bold',
            color: '#FFF',
            fontSize: '16px',
            marginTop: '5px',
            [theme.breakpoints.up('sm')]: {
                fontSize: '21px',
                marginTop: '10px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            padding: '12px 18px 16px',
            width: '80%',
            fontSize: '15px',
        }
    },
    v3RewardItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        width: '100%',
        height: '100%',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '13px',
        '& span': {
            color: '#FFF',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '5px',
            [theme.breakpoints.up('sm')]: {
                fontSize: '19px',
                marginTop: '10px',
            }
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
        }
    },
    v3VerticalLine: {
        height: '80%',
        width: '1px',
        backgroundColor: 'rgba(151, 151, 151, 0.1)',
        margin: '0 30px',
        minHeight: '30px',
    },
    v3CoinCardFirst: {
        padding: '20px 25px',
        width: '100%',
        background: '#242846',
        borderRadius: '8px',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#30BE85',
        [theme.breakpoints.up('sm')]: {
            padding: '15px 20px',
        }
    },
    v3CoinCard: {
        marginLeft: '0',
        marginTop: '15px',
        padding: '20px 25px',
        width: '100%',
        background: '#242846',
        borderRadius: '8px',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#30BE85',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '25px',
            marginTop: '0',
            padding: '15px 20px 20px',
        }
    },
    v3CoinRow: {
        margin: '15px 0 30px',
        display: 'flex',
        alignItems: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: '32px',
        '& span': {
            marginLeft: '10px',
        },
    },
    v3BtnRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    v3Btn: {
        background: '#2EBC84',
        height: '35px',
        lineHeight: '35px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        flexGrow: '1',
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
    v3BtnApprove: {
        background: '#2EBC84',
        height: '35px',
        lineHeight: '35px',
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
    v3RewardCardRecaption: {
        width: '35px',
        height: '35px',
        marginLeft: '15px',
        cursor: 'pointer',
    },
});
 
class Dao extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            address: null,
            modalUnlock: false,
            bxhInfo: {},
            teamLock: null,
            bxhRebuy: [],
            bxhBalance: "0",
            selectedIndex: 0,
            amount: null,//总质押
            oldEarned: 0,//未领取奖励
            earned: null,//未领取奖励
            rewardDebt: null,//团队已经领取的额度
            userReward: null,//团队可以领取的奖励
            bxhAsset: null,
            defaultLogo: 'https://mos-wallet-public.oss-cn-hangzhou.aliyuncs.com/mos/BXH/picture/default.png',
            daoV2Address: '0x5BE6C47aF513BaD24cB4b80082730e74234C66c9',
            v2AlloWance: 0,
            myStake: null,//总质押
            daoInfo: {},
            day: '--',
            hour: '--',
            minute: '--',
            second: '--',
            rewardsInfo: {},
            bonusToken: null,//本期dao收益：合约里面bonus token余额
            bonusTokenSymbol: null,
            bonusTokenBalance: null,//本期dao收益
            modalV2MortgageBack: false,
            modalV2MortgageBackType: '0',
            alloWance: 0,
            modalMortgageBack: false,
            modalMortgageBackType: '0',
            modalSendType: 0, // 合约调用后弹窗状态（0发送中 1成功 -1失败）
            modalSend: false,
            msgContent: "",
            txHash: "",
            isMobile: true,
            tokenList: [],
            bxh_dao_pool: null,//锁仓列表
            modalLockUpObj: null,//抵押obj
            modalLockUpMortgageBack: false,
            currentIncomeShowTooltip: false,
            priorUnclaimedIncomeShowTooltip: false,
            apyShowTooltip: false,
            cancelingStakingShowTooltip: false,
            canWithdrewStakingShowTooltip: false,
            //V3
            daoV3Address: "0xf3c35Fc42B2b457dFabc0A4c277C747D9E550E1E",//XBXHToken BXH质押
            daoV3XBXHAddress: "0x0Ef67c16904Af312796560dF80E60581C43C4e24",//XBXH质押地址
            v3AlloWance: 0,
            daoV3XBXHInfo: {},
            v3ApyTooltip: false,
            modalV3MortgageBack: false,
            modalV3MortgageBackType: '0',
            modalV3PledgeType: 0,//0质押BXH 1质押XBXH
        }
    }
    timer = null;
    countdownTimer = null;
    createTimer = () => {
        const { selectedIndex } = this.state;
        const that = this;
        this.invateTimer();
        this.timer = setInterval(() => {
            if(selectedIndex==0) {
                that.getV3XBXHUserInfo();
            }else if(selectedIndex==2) {
                that.refreshData();
            }
        }, 20000);
        this.countdownTimer = setInterval(()=>{
            const {daoInfo} = this.state;
            //防止出现负数
            if (that.isNoEmpty(daoInfo.remainingSecond)) {
                if(daoInfo.remainingSecond>=1){
                    daoInfo.remainingSecond--;
                    let day = Math.floor((daoInfo.remainingSecond / 3600) / 24);
                    let hour = Math.floor((daoInfo.remainingSecond / 3600) % 24);
                    let minute = Math.floor((daoInfo.remainingSecond / 60) % 60);
                    let second = Math.floor(daoInfo.remainingSecond % 60);
                    that.setState({
                        daoInfo: daoInfo,
                        day: day,
                        hour: hour < 10 ? "0" + hour : hour,
                        minute: minute < 10 ? "0" + minute : minute,
                        second: second < 10 ? "0" + second : second
                    });
                }else{
                    if (that.countdownTimer != null) {
                        clearInterval(that.countdownTimer);
                    }
                    that.setState({
                        day: '0',
                        hour: '00',
                        minute: '00',
                        second: '00'
                    });
                }
            }
        }, 1000);
    }
    invateTimer = () => {
        if (this.timer != null) {
            clearInterval(this.timer);
        }
        if (this.countdownTimer != null) {
            clearInterval(this.countdownTimer);
        }
    }
    componentDidMount() {
        emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.on(BXHCHNAGEACCOUNT, this.refreshData);
        emitter.on(BXHDAOUSERINFO_RETURNED, this.userInfo);
        emitter.on(BXHDAOUSERPending_RETURNED, this.userPending);
        emitter.on(BXHDAOTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
        emitter.on(BXHDAOV2PledgeApprove_RETURNED, this.v2PledgeApprove_RETURNED);
        emitter.on(BXHDAOV2BXHDeposit_RETURNED, this.bxhV2DepositReturn)
        emitter.on(BXHDAOV2BXHRetrieve_RETURNED, this.bxhV2RetrieveReturn)
        emitter.on(BXHDAOBXHClaim_RETURNED, this.bxhV2ClaimReturn)
        emitter.on(BXHDAOBXHUnStake_RETURNED, this.bxhV2UnStakeReturn)
        emitter.on(ERROR, this.errorReturned);  // 取消合约提示
        emitter.on(BXHDAOBXHDeposit_RETURNED, this.bxhDepositReturn)
        emitter.on(BXHDAOBXHRetrieve_RETURNED, this.bxhRetrieveReturn)
        emitter.on(BXHDAOLockupApprove_RETURNED, this.bxhLockupApproveReturn)
        emitter.on(BXHDAOBXHLockUpDeposit_RETURNED, this.bxhLockupDepositReturn)
        emitter.on(BXHDAOBXHLockUpRetrieve_RETURNED, this.bxhLockupRetrieveReturn)
        emitter.on(BXHDAOBXHTeamRewards_RETURNED, this.bxhTeamRewardsReturn)
        //V3
        emitter.on(BXHDAOV3PledgeApprove_RETURNED, this.v3ApproveReturn);
        emitter.on(BXHDAOV3PledgeXBXHApprove_RETURNED, this.v3XBXHApproveReturn);
        emitter.on(BXHDAOV3BXHClaim_RETURNED, this.v3ClaimReturn);
        emitter.on(BXHDAOV3BXHDeposit_RETURNED, this.v3DepositReturn);
        emitter.on(BXHDAOV3BXHRetrieve_RETURNED, this.v3RetrieveReturn);
        emitter.on(BXHDAOV3XBXHDeposit_RETURNED, this.v3XBXHDepositReturn);
        emitter.on(BXHDAOV3XBXHRetrieve_RETURNED, this.v3XBXHRetrieveReturn);
        //监听窗口大小改变
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.createTimer();
        this.refreshData();
        this.refreshAccount(false);
    }
    componentWillUnmount() {
        emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
        emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
        emitter.removeListener(BXHCHNAGEACCOUNT, this.refreshData);
        emitter.removeListener(BXHDAOUSERINFO_RETURNED, this.userInfo);
        emitter.removeListener(BXHDAOUSERPending_RETURNED, this.userPending);
        emitter.removeListener(BXHDAOTRADESTAKEApprove_RETURNED, this.showHashByAPPROVEBXH_RETURNED);
        emitter.removeListener(BXHDAOV2PledgeApprove_RETURNED, this.v2PledgeApprove_RETURNED);
        emitter.removeListener(BXHDAOV2BXHDeposit_RETURNED, this.bxhV2DepositReturn)
        emitter.removeListener(BXHDAOV2BXHRetrieve_RETURNED, this.bxhV2RetrieveReturn)
        emitter.removeListener(BXHDAOBXHClaim_RETURNED, this.bxhV2ClaimReturn)
        emitter.removeListener(BXHDAOBXHUnStake_RETURNED, this.bxhV2UnStakeReturn)
        emitter.removeListener(ERROR, this.errorReturned);  // 取消合约提示
        emitter.removeListener(BXHDAOBXHDeposit_RETURNED, this.bxhDepositReturn)
        emitter.removeListener(BXHDAOBXHRetrieve_RETURNED, this.bxhRetrieveReturn)
        emitter.removeListener(BXHDAOLockupApprove_RETURNED, this.bxhLockupApproveReturn)
        emitter.removeListener(BXHDAOBXHLockUpDeposit_RETURNED, this.bxhLockupDepositReturn)
        emitter.removeListener(BXHDAOBXHLockUpRetrieve_RETURNED, this.bxhLockupRetrieveReturn)
        emitter.removeListener(BXHDAOBXHTeamRewards_RETURNED, this.bxhTeamRewardsReturn)
        //V3
        emitter.removeListener(BXHDAOV3PledgeApprove_RETURNED, this.v3ApproveReturn);
        emitter.removeListener(BXHDAOV3PledgeXBXHApprove_RETURNED, this.v3XBXHApproveReturn);
        emitter.removeListener(BXHDAOV3BXHClaim_RETURNED, this.v3ClaimReturn);
        emitter.removeListener(BXHDAOV3BXHDeposit_RETURNED, this.v3DepositReturn);
        emitter.removeListener(BXHDAOV3BXHRetrieve_RETURNED, this.v3RetrieveReturn);
        emitter.removeListener(BXHDAOV3XBXHDeposit_RETURNED, this.v3XBXHDepositReturn);
        emitter.removeListener(BXHDAOV3XBXHRetrieve_RETURNED, this.v3XBXHRetrieveReturn);
        window.addEventListener('resize', this.handleResize)
        this.invateTimer();
        this.setState = (state, callback) => {
            return;
        }
    }
    //刷新数据
    refreshData = () => {
        const that = this;
        store._getBXHInfo((data) => {
            that.setState({ bxhInfo: data.bxh_info, bxhRebuy: data.bxh_rebuy, teamLock: data.team_lock, tokenList: data.token_list });
            var bxhAsset = that.initBXHAsset(data.token_list, "BXH");            
            bxhAsset.logoURI = "https://bxh-images.s3.ap-east-1.amazonaws.com/coin/BXH.png";
            that.setState({ bxhAsset: bxhAsset });
            that.refreshAccount();
        });
        store._getBXHDaoPool((data) => {
            if (!that.state.bxh_dao_pool||(data&&data.bxh_dao_pool&&that.state.bxh_dao_pool&&data.bxh_dao_pool.length!=that.state.bxh_dao_pool.length)) {
                that.setState({bxh_dao_pool: data.bxh_dao_pool});
            }
        });
    }
    //赋值BXH
    initBXHAsset = (tokenList, name) => {
        for (let i = 0; i < tokenList.length; i++) {
            var item = tokenList[i];
            if (item.symbol === name) {
                return item
            }
        }
        return null;
    }
    handleResize = () => {
        if (this._isMobile()) { // 移动端
            this.setState({ isMobile: true })
        } else {  // PC端
            this.setState({ isMobile: false })
        }
    }
    //刷新账户相关信息
    refreshAccount = (isLoad=true) => {
        const account = store.getStore('account');
        const address = account.address;
        if (address != undefined && address !== null && address != '') {
            this.setState({ address: address });
            if(isLoad){
                this.loadData();
            }
        } else {
            this.setState({ address: null });
        }
    }
    loadData = () => {
        this.refreshAlloWance();
        this.refreshV2AlloWance();
        this.getUserInfo();
        this.getV2UserInfo();
        this.refreshUserBalance();
        this.refreshLockupList();
        this.getV3Approve();
        this.getV3XBXHUserInfo();
    }
    refreshLockupList = () => {
        const bxh_dao_pool = this.state.bxh_dao_pool;
        if(bxh_dao_pool&&bxh_dao_pool.length>0){
            bxh_dao_pool.map((obj,idx)=>{
                this.refreshLockupAlloWance(obj);
                this.getLockUpBasicInfo(obj);
                this.getLockUpInfo(obj);
                this.getLockUpLockBlocks(obj);
                this.getLockUpMortgageAmount(obj);
            });
        }
    }
    refreshAllLockupAlloWance = () => {
        const bxh_dao_pool = this.state.bxh_dao_pool;
        if(bxh_dao_pool&&bxh_dao_pool.length>0){
            bxh_dao_pool.map((obj)=>{
                this.refreshLockupAlloWance(obj);
            });
        }
    }
    refreshLockupAlloWance = (obj) => {
        let contractAddress = obj.daoLp;
        let lpAddress = obj.lpAddress;
        if (!contractAddress || contractAddress == "" || !lpAddress || lpAddress == "") {
            return;
        }
        const that = this;
        store.daoBXHLockUpAlloWance(contractAddress, lpAddress, (err, alloWance) => {
            if (err == null) {
                obj.lockUpAlloWance = alloWance;
                that.setState({});
            }
        })
    }
    //获取抵押数
    getLockUpMortgageAmount = (obj) => {
        let contractAddress = obj.daoLp;
        let dao_address = this.state.bxhInfo.dao_address;
        const that = this;
        store.getDaoBXHLockUpPoolAmount(contractAddress, obj.exId, obj.poolId, dao_address, (err, amount)=>{
            if(!err){
                obj.lockUpMortgageAmount = amount;
                that.setState({});
            }
        });
    }
    getLockUpLockBlocks = (obj) => {
        let contractAddress = obj.daoLp;
        if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
            return;
        }
        const that = this;
        store.daoBXHLockUpLockBlocks(contractAddress, (err, second)=>{
            if(!err){
                obj.lockUpSecond = second;
                that.setState({});
            }
        });
    }
    getLockUpBasicInfo = (obj) => {
        let contractAddress = obj.daoLp;
        if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
            return;
        }
        const that = this;
        store.daoBXHLockUpLockTime(contractAddress, (err, day)=>{
            if(!err){
                obj.lockUpDay = day;
                that.setState({});
            }
        });
    }
    refreshAllLockUpInfo = () => {
        const bxh_dao_pool = this.state.bxh_dao_pool;
        if(bxh_dao_pool&&bxh_dao_pool.length>0){
            bxh_dao_pool.map((obj)=>{
                this.getLockUpInfo(obj);
            });
        }
    }
    getLockUpInfo = (obj) => {
        let contractAddress = obj.daoLp;
        if (contractAddress == undefined || contractAddress == null || contractAddress == "") {
            return;
        }
        const that = this;
        store.daoBXHLockUpTotalSupply(contractAddress, (err, totalSupply)=>{
            if(!err){
                obj.lockUpTotalSupply = totalSupply;
                that.setState({});
            }
        });
        store.getDaoBXHLockUpBalance(contractAddress, (err, balance)=>{
            if(!err){
                obj.lockUpBalance = balance;
                that.setState({});
            }
        });
        let lpAddress = obj.lpAddress;
        if (!lpAddress || lpAddress == "") {
            return;
        }
        store.getDaoBXHLockUpBalance(lpAddress, (err, balance)=>{
            if(!err){
                obj.lockUpCurrencyBalance = balance;
                that.setState({});
            }
        });
        store.daoBXHLockUpLpSymbol(lpAddress, (err, symbol) => {
            if (err == null) {
                obj.lpSymbol = symbol;
                that.setState({});
            }
        });
    }
    //获取用户数据盈利和抵押
    getUserInfo = () => {
        const { bxhInfo } = this.state;
        if (bxhInfo.dao_address != undefined && bxhInfo.dao_address != null && bxhInfo.dao_address != "") {
            dispatcher.dispatch({ type: BXHDAOUSERINFO, content: { contractAddress: bxhInfo.dao_address, asset: this.state.bxhAsset } })
            dispatcher.dispatch({ type: BXHDAOUSERPending, content: { contractAddress: bxhInfo.dao_address, asset: this.state.bxhAsset } })
        }
        this.refreshUserReward();
    }
    getV2UserInfo = () => {
        const { daoV2Address,bxhAsset } = this.state;
        if (this.isNoEmpty(daoV2Address)) {
            const that = this;
            store._getDaoUserInfo(daoV2Address,bxhAsset,(data)=>{
                that.setState({ myStake: data.amount });
            });
            store._getDaoBonusToken(daoV2Address,(bonusToken)=>{
                that.setState({bonusToken:bonusToken});
                store._getDaoShareAndRewardsInfo(daoV2Address,bonusToken,(rewardsInfo)=>{
                    that.setState({rewardsInfo:rewardsInfo});
                });
                store._getDaoBonusTokenInfo(bonusToken,daoV2Address,(data)=>{
                    that.setState({bonusTokenBalance:data.balance,bonusTokenSymbol:data.symbol});
                });
            });
            store._getDaoInfo(daoV2Address,this.state.bxhAsset,(data)=>{
                that.setState({daoInfo: data});
            });
        }
    }
    //用户可以领取的奖励
    refreshUserReward = () => {
        const { teamLock } = this.state;
        if (teamLock == undefined || teamLock == null) {
            return;
        }
        const that = this;
        store.getDaoTeamCanRewards(teamLock.lock_contract, this.state.bxhAsset, (val) => {
            that.setState({ userReward: val });
        });
    }
    //用户盈利和抵押
    userInfo = (data) => {
        this.setState({ amount: data.amount, rewardDebt: data.rewardDebt });
    }
    //用户未领取收益
    userPending = (data) => {
        if (this.state.earned) {
            this.setState({ oldEarned: this.state.earned });
        }
        this.setState({ earned: data });
    }
    //授权状态
    refreshAlloWance = () => {
        const { bxhInfo } = this.state;
        const that = this;
        if (bxhInfo.dao_address == undefined || bxhInfo.dao_address == null || bxhInfo.dao_address == "") {
            return;
        }
        store.getDaoBXHAlloWance(bxhInfo.dao_address, this.state.bxhAsset, (err, alloWance) => {
            if (err == null) {
                that.setState({ alloWance: alloWance });
            }
        })
    }
    //授权状态
    refreshV2AlloWance = () => {
        const { daoV2Address,bxhAsset } = this.state;
        const that = this;
        if (daoV2Address == undefined || daoV2Address == null || daoV2Address == "") {
            return;
        }
        store.getDaoBXHAlloWance(daoV2Address, bxhAsset, (err, alloWance) => {
            if (err == null) {
                that.setState({ v2AlloWance: alloWance });
            }
        })
    }
    v2PledgeApprove_RETURNED = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                //刷新授权
                this.refreshV2AlloWance();
            }
        }
    }
    //刷新bxh余额
    refreshUserBalance = () => {
        const that = this;
        store.getDaoBXHBalance(this.state.bxhAsset, (err, balance) => {
            if (err == null) {
                that.setState({ bxhBalance: balance });
            }
        })
    }
    //授权成功
    bxhLockupApproveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                //刷新授权
                this.refreshAllLockupAlloWance();
            }
        }
    }
    showHashByAPPROVEBXH_RETURNED = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                //刷新授权
                this.refreshAlloWance();
            }
        }
    }
    errorReturned = (error) => {
        this.setState({ modalSend: false })
        this.setState({ modalSend: true, modalSendType: -1 })
    };
    //锁仓授权
    lockUpApprove = (obj) => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        const contractAddress = obj.daoLp;
        const lpAddress = obj.lpAddress;
        if (!contractAddress || contractAddress == "" || 
            !lpAddress || lpAddress == "") {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve " + obj.lpSymbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOLockupApprove, content: { contractAddress: contractAddress, msgContent: msgContent, symbolAddress: lpAddress } })
    }
    approve = () => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        const { bxhInfo, bxhAsset } = this.state;
        if (bxhInfo.dao_address == undefined || bxhInfo.dao_address == null || bxhInfo.dao_address == "") {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOTRADESTAKEApprove, content: { contractAddress: bxhInfo.dao_address, msgContent: msgContent, asset: bxhAsset } })
    }
    v2Approve = () => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        const { daoV2Address, bxhAsset } = this.state;
        if (daoV2Address == undefined || daoV2Address == null || daoV2Address == "" || bxhAsset == null) {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOV2PledgeApprove, content: { contractAddress: daoV2Address, msgContent: msgContent, asset: bxhAsset } })
    }
    onV2SureMortgageBack = (val) => {
        const { daoV2Address, bxhAsset, modalV2MortgageBackType } = this.state
        let contractAddress = daoV2Address;
        if (!contractAddress || contractAddress == "") {
            return;
        }
        this.setState({ modalSend: false })
        if (modalV2MortgageBackType == '0') {
            const msgContent = "Deposit " + val + " " + bxhAsset.symbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOV2BXHDeposit, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
        } else {
            const msgContent = "Unstake " + val + " " + bxhAsset.symbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOV2BXHRetrieve, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
        }
    }
    //质押返回数据
    bxhV2DepositReturn = (data) => {
        this.txReturnRefresh(data);
    }
    //取回返回数据
    bxhV2RetrieveReturn = (data) => {
        this.txReturnRefresh(data);
    }
    //领取奖励
    v2Claim = () => {
        const { daoV2Address, bxhAsset, daoInfo } = this.state
        if (daoInfo.pendingReward == undefined || daoInfo.pendingReward == null || daoInfo.pendingReward == 0 || daoV2Address == undefined || daoV2Address == null || daoV2Address == "") {
            return
        }
        const msgContent = "Harvest " + this.saveToWei(daoInfo.pendingReward, 4) + " " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOBXHClaim, content: { contractAddress: daoV2Address, msgContent: msgContent } })
    }
    //提取质押
    v2UnStake = () => {
        const { daoV2Address, bxhAsset, daoInfo } = this.state
        if (daoV2Address == undefined || daoV2Address == null || daoV2Address == "" || !this.isNoEmpty(daoInfo.unstakableAmount)) {
            return
        }
        if (daoInfo.unstakableAmount > 0) {
            const msgContent = "Unstake " + this.saveToWei(daoInfo.unstakableAmount, 4) + " " + bxhAsset.symbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOBXHUnStake, content: { contractAddress: daoV2Address, msgContent: msgContent } })
        }
    }
    bxhV2ClaimReturn = (data) => {
        this.txReturnRefresh(data);
    }
    bxhV2UnStakeReturn = (data) => {
        this.txReturnRefresh(data);
    }
    txReturnRefresh = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.getV2UserInfo();
                this.refreshUserBalance();
            }
        }
    }
    //质押/取回输入的数量
    onSureLockupMortgageBack = (val) => {
        const { modalMortgageBackType, modalLockUpObj } = this.state;
        let contractAddress = modalLockUpObj.daoLp;
        if (!contractAddress || contractAddress == "") {
            return;
        }
        this.setState({ modalSend: false })
        if (modalMortgageBackType == '0') {
            const msgContent = "Deposit " + val + " " + modalLockUpObj.lpSymbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOBXHLockUpDeposit, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent } })
        } else {
            const msgContent = "Unstake " + val + " " + modalLockUpObj.lpSymbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOBXHLockUpRetrieve, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent } })
        }
    }
    //质押返回数据
    bxhLockupDepositReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.refreshUserBalance();
                this.refreshAllLockUpInfo();
            }
        }
    }
    //取回返回数据
    bxhLockupRetrieveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.refreshUserBalance();
                this.refreshAllLockUpInfo();
            }
        }
    }
    onSureMortgageBack = (val) => {
        const { bxhInfo, bxhAsset, modalMortgageBackType } = this.state
        let contractAddress = bxhInfo.dao_address;
        if (!contractAddress || contractAddress == "") {
            return;
        }
        this.setState({ modalSend: false })
        if (modalMortgageBackType == '0') {
            const msgContent = "Deposit " + val + " " + bxhAsset.symbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOBXHDeposit, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
        } else {
            const msgContent = "Unstake " + val + " " + bxhAsset.symbol;
            this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
            dispatcher.dispatch({ type: BXHDAOBXHRetrieve, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
        }
    }
    //质押返回数据
    bxhDepositReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.getUserInfo();
                this.refreshUserBalance();
                this.refreshAllLockUpInfo();
            }
        }
    }
    //取回返回数据
    bxhRetrieveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.getUserInfo();
                this.refreshUserBalance();
                this.refreshAllLockUpInfo();
            }
        }
    }
    //领取奖励
    claim = (obj) => {
        const { bxhInfo, bxhAsset, earned } = this.state
        if (earned == undefined || earned == null || earned == 0 || bxhInfo.dao_address == undefined || bxhInfo.dao_address == null || bxhInfo.dao_address == "") {
            return
        }
        const msgContent = "Harvest " + this.saveToWei(earned, 4) + " " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOBXHDeposit, content: { contractAddress: bxhInfo.dao_address, amount: '0', msgContent: msgContent, asset: bxhAsset } })
    }
    //撤回并领取奖励
    settleWithdraw = (obj) => {
        const { bxhInfo, bxhAsset, amount, earned } = this.state
        if (amount == undefined || amount == null || amount == 0 || bxhInfo.dao_address == undefined || bxhInfo.dao_address == null || bxhInfo.dao_address == "") {
            return
        }
        const msgContent = "Harvest " + this.saveToWei(earned, 4) + " " + bxhAsset.symbol + " and  Unstake " + this.saveToWei(amount, 4) + " " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOBXHRetrieve, content: { contractAddress: bxhInfo.dao_address, amount: amount, msgContent: msgContent, asset: bxhAsset } })
    }
    //地址点击
    addressClick = (obj) => {
        window.open("https://hecoinfo.com/tx/" + obj.txHash);
    }
    //查看更多
    moreCick = () => {
        window.open("https://hecoinfo.com/address/0x7479bAA5727d13bc864e09d6b8035971cca1df2E");
    }
    //领取团队奖励
    receiveTeamRewards = () => {
        const { bxhAsset, teamLock, userReward } = this.state;
        const msgContent = "Harvest " + this.saveToTwoWei(userReward) + " " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOBXHTeamRewards, content: { contractAddress: teamLock.lock_contract, msgContent: msgContent, asset: bxhAsset } })
    }
    //领取返回
    bxhTeamRewardsReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.refreshUserBalance();
                this.refreshUserReward();
                this.refreshAllLockUpInfo();
            }
        }
    }
    //去质押
    toStake = (obj) => {
        this.props.history.push('/singletoken/'+obj.exId+'_'+obj.poolId);
    }
    isNoEmpty = (value) => {
        if(value==null||value==undefined||value===''){
            return false
        }
        return true
    }
    saveToTwoWei = (number) => {
        return this.saveToWei(number, 2);
    }
    saveToWei = (number, scale) => {
        var scaleP = Math.pow(10, scale);
        var result = Math.floor(number * scaleP) / scaleP;
        return result;
    }
    _isMobile = () => {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
    }
 
    render() {
        const { classes, t } = this.props;
        const { modalV3MortgageBack, selectedIndex, isMobile, modalUnlock, modalV2MortgageBack, modalMortgageBack, modalLockUpMortgageBack, modalSend, teamLock, bxh_dao_pool } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={[classes.root, chainID === '56' ? 'bscPCbroot' : 'hecoPCbroot'].join(' ')}>
                <Header openUnlockModal={this.openUnlockModal} />

                {this.renderHeader()}
                <div className={classes.content}>
                    {
                        selectedIndex==0?(
                            <div>
                                {this.renderV3()}
                                {this.renderV2BuyBackCard()}
                            </div>
                        ):(
                            selectedIndex==1?
                            (
                                <div>
                                    {this.renderBXHDaoCard()}
                                    {this.renderV2BuyBackCard()}
                                </div>
                            ):(
                                isMobile ?
                                (
                                    <div>
                                        {this.renderRewardCard()}
                                        {
                                            bxh_dao_pool&&bxh_dao_pool.length>0?this.renderLockUp():null
                                        }
                                        {this.renderBuyBackCard()}
                                    </div>
                                ):(
                                    <div>
                                        <div className={classes.contentTop}>
                                            {this.renderRewardCard()}
                                            {this.renderBuyBackCard()}
                                        </div>
                                        {
                                            bxh_dao_pool&&bxh_dao_pool.length>0?this.renderLockUp():null
                                        }
                                    </div>
                                )
                            )
                        )
                    }
                    {teamLock && this.renderTeamRewards()}
                </div>
                { modalUnlock && this.renderUnlockWalletModal()}
                { modalSend && this.renderSendModal()}
                { modalV3MortgageBack && this.renderV3MortgageBack()}
                { modalV2MortgageBack && this.renderV2MortgageBack()}
                { modalMortgageBack && this.renderMortgageBack()}
                { modalLockUpMortgageBack && this.renderLockUpMortgageBack()}
                
                <Footer pagetype="dao" />
            </div>
        )
    };
    renderMobileHeader = () => {
        const { classes, t } = this.props;
        const { bxhInfo } = this.state;
        return (
            <div className="header">
                <div style={{ fontWeight: 'bold', fontSize: '19px', textAlign: 'center' }}>{t('BXH.daoTitle')}</div>
                <div style={{ fontSize: '17px', textAlign: 'center' }}>{t('BXH.daoDesc')}</div>
                <div className={classes.headerCard}>
                    <div className={classes.headerCardItem} style={{ flex: '1' }}>
                        <div className={classes.headerCardItemTitle}>{t('BXH.latestPrice')}</div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{bxhInfo.bxh_price ? '$' + this.saveToTwoWei(bxhInfo.bxh_price) : '--'}</div>
                    </div>
                    <div className={classes.headerCardItem} style={{ flex: '1.2', marginLeft: '10px' }}>
                        <div className={classes.headerCardItemTitle}>{t('BXH.awardedAmount')}</div>
                        <div style={{ fontSize: '15px', fontWeight: 'bold' }}>
                            {bxhInfo.dao_reward_wait ?
                                (
                                    '$'+toShowDollar(this.saveToTwoWei(bxhInfo.dao_reward_wait))
                                )
                                : '--'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderHeader = () => {
        const { classes, t } = this.props;
        const { selectedIndex } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.header}>
                <div className={classes.headerTitle}>{t('BXH.daoTitle')}</div>
                <div className={classes.headerDesc}>{t('BXH.daoDesc')}</div>
                {
                    chainID === '56' ?
                    <div className={classes.headerTip} style={{ color: '#FDD436', opacity: '.8' }}>
                       <img src={require('../../assets/bxh/exclamation1.png')} />{t('BXH.daoV2Tip')}
                    </div>
                    :
                    <div className={classes.headerTip} style={{ color: '#30BE85' }}>
                       <img src={require('../../assets/bxh/exclamation.png')} />{t('BXH.daoV2Tip')}
                    </div>
                }
                <div className={classes.switch}>
                    {
                        chainID === '56' ?
                        <div className={[classes.switchContent, classes.switchbscContent].join(' ')}>
                            <div onClick={()=>{this.setState({selectedIndex:0})}} style={{backgroundColor:(selectedIndex==0?'rgb(253 212 54 / 80%)':null)}}>V3</div>
                            <div onClick={()=>{this.setState({selectedIndex:1})}} style={{backgroundColor:(selectedIndex==1?'rgb(253 212 54 / 80%)':null)}}>V2</div>
                            <div onClick={()=>{this.setState({selectedIndex:2})}} style={{backgroundColor:(selectedIndex==2?'rgb(253 212 54 / 80%)':null)}}>V1</div>
                        </div>
                        :
                        <div className={[classes.switchContent, classes.switchhecoContent].join(' ')}>
                            <div onClick={()=>{this.setState({selectedIndex:0})}} style={{backgroundColor:(selectedIndex==0?'#35C288':null)}}>V3</div>
                            <div onClick={()=>{this.setState({selectedIndex:1})}} style={{backgroundColor:(selectedIndex==1?'#35C288':null)}}>V2</div>
                            <div onClick={()=>{this.setState({selectedIndex:2})}} style={{backgroundColor:(selectedIndex==2?'#35C288':null)}}>V1</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
    //BXH DAO
    renderBXHDaoCard() {
        const { classes, t } = this.props;
        const { rewardsInfo } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={[classes.bxhDaoCard, chainID === '56' ? 'bscPCheaderbg' : 'hecoPCheaderbg'].join(' ')}>
                {
                    chainID === '56' ?
                    <div className={classes.bscgradientBg}></div>
                    :
                    <div className={classes.gradientBg}></div>
                }
                <div className={classes.bxhDaoCardHeader}>
                    <div style={{ fontWeight: 'bold', color: '#E3E4E5' }}>BXH DAO</div>
                    <div className={classes.bxhDaoCardHeaderText}>
                        {
                            chainID === '56' ?
                            <img src={require('../../assets/bxh/huodong1.png')} />
                            :
                            <img src={require('../../assets/bxh/huodong.png')} />
                        }
                        {rewardsInfo&&rewardsInfo.lastUpdatedEpochFlag!=undefined?'NO.'+rewardsInfo.lastUpdatedEpochFlag:'--'}
                    </div>
                </div>
                <div className={classes.bxhDaoCardContent}>
                    {this.renderBXHDaoLeftCard()}
                    <div className={classes.bxhDaoCardContentLine}></div>
                    {this.renderBXHDaoRightCard()}
                </div>
            </div>
        )
    }
    renderBXHDaoLeftCard() {
        const { classes, t } = this.props;
        const { daoInfo,bonusTokenBalance,bonusTokenSymbol,myStake,rewardsInfo,bxhInfo,day,hour,minute,second } = this.state;
        let currentDAORevenue = null;//本期dao收益
        let notClaimed = null;//上期未领取
        if(this.isNoEmpty(rewardsInfo.rewards)&&this.isNoEmpty(rewardsInfo.claimedRewards)){
            notClaimed = _getValueMinus4(rewardsInfo.rewards,rewardsInfo.claimedRewards);
            if(this.isNoEmpty(bonusTokenBalance)){
                currentDAORevenue = _getValueMinus4(bonusTokenBalance,notClaimed);
            }
        }
        //年化率=本期DAO收益*收益币价($)/质押总价值($)/周期天数*365*100%    (质押总价值不包含取消质押中)
        let apy = '--';
        //M = 本期DAO收益/质押总价值/周期天数
        //复利年化=[(1+M)∧365-1]*100%
        let compoundApy = '--';
        if(this.isNoEmpty(currentDAORevenue)&&this.isNoEmpty(bxhInfo.bxh_price)&&this.isNoEmpty(rewardsInfo.pledgeAmount)&&this.isNoEmpty(daoInfo.cycleNumber)){
            const val1 = _getValuemultip(currentDAORevenue,1.0,4);//本期DAO收益*收益币价($)
            const val2 = _getValuemultip(bxhInfo.bxh_price,rewardsInfo.pledgeAmount,4);//质押总价值
            if(val2>0&&daoInfo.cycleNumber>0){
                const val3 = _getValueDivided(val1,val2,8);
                const val4 = _getValueDivided(val3,daoInfo.cycleNumber,8);
                const val5 = _getValuemultip(val4,365,4);
                apy = this.saveToTwoWei(_getValuemultip(val5,100,2))+'%';
                const cVal1 = _getValueDivided(currentDAORevenue,val2,8);
                const cVal2 = _getValueDivided(cVal1,daoInfo.cycleNumber,8);
                const cVal3 = _getValuePow((1+cVal2*1),365,4);
                compoundApy = this.saveToTwoWei((cVal3-1)*100)+'%';
            }else{
                apy = '0.00%';
                compoundApy = '0.00%';
            }
        }
        //每bxh获得收益=本期DAO收益/bxh质押总量    （质押总量不包含取消质押中）
        //预估待领取收益=每BXH获得收益*本人质押BXH的数量
        let bxhReward = '--'; //每BXH获得收益
        let estimateClaim = '--';
        if(this.isNoEmpty(currentDAORevenue)&&this.isNoEmpty(rewardsInfo.pledgeAmount)){
            if(rewardsInfo.pledgeAmount>0){
                bxhReward = this.saveToWei(_getValueDivided(currentDAORevenue,rewardsInfo.pledgeAmount,6),6);
                if(this.isNoEmpty(myStake)) {
                    estimateClaim = this.saveToWei(_getValuemultip(bxhReward,myStake,6),6);
                }
            }else{
                bxhReward = '0';
                estimateClaim = '0';
            }
        }
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.bxhDaoCardContentLeft}>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2Countdown')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>
                        {day} {t('BXH.day')} {hour}:{minute}:{second}
                    </div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>
                        {t('BXH.daoV2CurrentIncome')}
                        <ClickAwayListener onClickAway={()=>{this.setState({currentIncomeShowTooltip:false})}}>
                            <CustomTooltip title={t('BXH.daoV2CurrentIncomeTip')}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={()=>{this.setState({currentIncomeShowTooltip:false})}}
                                open={this.state.currentIncomeShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={()=>{this.setState({currentIncomeShowTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                            </CustomTooltip>
                        </ClickAwayListener>
                    </div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(currentDAORevenue)?this.saveToWei(currentDAORevenue,4):'--'} {bonusTokenSymbol}</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2PriorIncome')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(rewardsInfo.rewards)?this.saveToWei(rewardsInfo.rewards,4):'--'} {bonusTokenSymbol}</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>
                        {t('BXH.daoV2PriorUnclaimedIncome')}
                        <ClickAwayListener onClickAway={()=>{this.setState({priorUnclaimedIncomeShowTooltip:false})}}>
                            <CustomTooltip title={t('BXH.daoV2PriorUnclaimedIncomeTip')}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={()=>{this.setState({priorUnclaimedIncomeShowTooltip:false})}}
                                open={this.state.priorUnclaimedIncomeShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={()=>{this.setState({priorUnclaimedIncomeShowTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                            </CustomTooltip>
                        </ClickAwayListener>
                    </div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(notClaimed)?this.saveToWei(notClaimed,4):'--'} {bonusTokenSymbol}</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2RewardBXH')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{bxhReward} {bonusTokenSymbol}</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>
                        {t('BXH.daoV2CompoundApy')}
                        <ClickAwayListener onClickAway={()=>{this.setState({apyShowTooltip:false})}}>
                            <CustomTooltip title={t('BXH.daoV2SimpleApy') + ':' + apy + ' ' + t('BXH.daoV2CompoundApy') + ':' + compoundApy}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={()=>{this.setState({apyShowTooltip:false})}}
                                open={this.state.apyShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={()=>{this.setState({apyShowTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                            </CustomTooltip>
                        </ClickAwayListener>
                    </div>
                    <div className={classes.bxhDaoCardRowItemVal}>{compoundApy}</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    {/* <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2ClaimIncome')}</div> */}
                    {/* <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(daoInfo.pendingReward)?this.saveToWei(daoInfo.pendingReward, 4):'--'} {bonusTokenSymbol}</div> */}
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2EstimateClaimIncome')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{estimateClaim} {bonusTokenSymbol}</div>
                </div>
                {
                    chainID === '56' ?
                    <div onClick={() => { this.v2Claim() }} className={daoInfo.pendingReward>0?classes.bscbxhDaoBtnReceive:classes.bxhDaoBtnReceiveDisabled}>{t('BXH.claim')}</div>
                    :
                    <div onClick={() => { this.v2Claim() }} className={daoInfo.pendingReward>0?classes.bxhDaoBtnReceive:classes.bxhDaoBtnReceiveDisabled}>{t('BXH.claim')}</div>
                }
            </div>
        )         
    }
    renderBXHDaoRightCard() {
        const { classes, t } = this.props;
        const { v2AlloWance,myStake,rewardsInfo,bxhInfo,daoInfo } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.bxhDaoCardContentRight}>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2TotalStaking')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(rewardsInfo.pledgeAmount)?this.saveToWei(rewardsInfo.pledgeAmount,4):'--'} BXH</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2TotalStakeVal')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(bxhInfo.bxh_price)&&this.isNoEmpty(rewardsInfo.pledgeAmount)?this.saveToWei(_getValuemultip(bxhInfo.bxh_price,rewardsInfo.pledgeAmount),4):'--'} $</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2GovernanceVotes')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(myStake)?this.saveToWei(myStake,4):'--'} BXH</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>{t('BXH.daoV2MyStaking')}</div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(myStake)?this.saveToWei(myStake,4):'--'} BXH</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>
                        {t('BXH.daoV2CancelingStaking')}
                        <ClickAwayListener onClickAway={()=>{this.setState({cancelingStakingShowTooltip:false})}}>
                            <CustomTooltip title={t('BXH.daoV2CancelingStakingTip')}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={()=>{this.setState({cancelingStakingShowTooltip:false})}}
                                open={this.state.cancelingStakingShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={()=>{this.setState({cancelingStakingShowTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                            </CustomTooltip>
                        </ClickAwayListener>
                    </div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(daoInfo.unlockingAmount)?this.saveToWei(daoInfo.unlockingAmount,4):'--'} BXH</div>
                </div>
                <div className={classes.bxhDaoCardRow}>
                    <div className={classes.bxhDaoCardRowItem}>
                        {t('BXH.daoV2CanWithdrewStaking')}
                        <ClickAwayListener onClickAway={()=>{this.setState({canWithdrewStakingShowTooltip:false})}}>
                            <CustomTooltip title={t('BXH.daoV2CanWithdrewStakingTip')}
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={()=>{this.setState({canWithdrewStakingShowTooltip:false})}}
                                open={this.state.canWithdrewStakingShowTooltip}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                arrow 
                                placement="bottom-end">
                                <img onClick={()=>{this.setState({canWithdrewStakingShowTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                            </CustomTooltip>
                        </ClickAwayListener>
                    </div>
                    <div className={classes.bxhDaoCardRowItemVal}>{this.isNoEmpty(daoInfo.unstakableAmount)?this.saveToWei(daoInfo.unstakableAmount,4):'--'} BXH</div>
                </div>
                {
                    v2AlloWance == 0 ?
                    (
                        <div onClick={() => { this.v2Approve() }} className={[classes.bxhDaoBtnApprove, chainID === '56' ? 'bscPC_new_btn1' : 'hecoPC_new_btn1'].join(' ')}>Approve BXH</div>
                    ) : (
                        <div>
                            <div onClick={() => { this.openV2MortgageBack('0') }} className={[classes.bxhDaoBtnPledge, chainID === '56' ? 'bscPC_new_btn1' : 'hecoPC_new_btn1'].join(' ')}>{t('BXH.pledge')} BXH</div>
                            <div style={{display:'flex'}}>
                                {
                                    chainID === '56' ?
                                    <div onClick={() => { this.openV2MortgageBack('1') }} className={classes.bscbxhDaoBtnBorder}>{t('BXH.cancelPledge')}</div>
                                    :
                                    <div onClick={() => { this.openV2MortgageBack('1') }} className={classes.bxhDaoBtnBorder}>{t('BXH.cancelPledge')}</div>
                                }
                                {
                                    chainID === '56' ?
                                    <div onClick={() => { this.v2UnStake() }} style={{marginLeft:'15px'}} className={daoInfo.unstakableAmount > 0 ? classes.bscrewardCardReceive : classes.rewardCardReceiveDisable}>{t('BXH.daoV2WithdrawStaking')}</div>
                                    :
                                    <div onClick={() => { this.v2UnStake() }} style={{marginLeft:'15px'}} className={daoInfo.unstakableAmount > 0 ? classes.rewardCardReceive : classes.rewardCardReceiveDisable}>{t('BXH.daoV2WithdrawStaking')}</div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        ) 
    }
    //奖励
    renderRewardCard() {
        const { classes, t } = this.props;
        const { bxhInfo, bxhAsset, defaultLogo, alloWance, amount, oldEarned, earned } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={[classes.rewardCard, chainID === '56' ? 'bscPCheaderbg' : 'hecoPCheaderbg'].join(' ')} key=''>
                {
                    chainID === '56' ?
                    <div className={classes.bscgradientBg}></div>
                    :
                    <div className={classes.gradientBg}></div>
                }
                <div className={classes.rewardCardHeader}>
                    <div style={{ fontWeight: 'bold', color: '#E3E4E5' }}>BXH {t('BXH.listreward1')}</div>
                    <div className={classes.rewardCardHeaderAwardedAmount}>
                        {t('BXH.awardedAmount')}<div style={{ marginLeft: '5px', color: '#FFFFFF', fontWeight: 'bold', display: 'inline-block' }}>
                            {bxhInfo.dao_reward_wait ?
                                '$' + toShowDollar(this.saveToTwoWei(bxhInfo.dao_reward_wait)) : '--'}
                        </div>
                    </div>
                </div>
                <div className={classes.rewardCardAmount}>
                    <div className={classes.rewardCardAmountTitle}>{t('BXH.amountRewarded')}</div>
                    <div className={classes.rewardCardAmountDesc}>
                        {bxhInfo.dao_reward ?
                            '$' + toShowDollar(this.saveToTwoWei(bxhInfo.dao_reward)) : '--'}
                    </div>
                </div>
                <div className={classes.rewardCardAmount}>
                    <div className={classes.rewardCardAmountTitle}>{t('BXH.todayRewardAmount')}</div>
                    <div className={classes.rewardCardAmountDesc}>
                        {bxhInfo.dao_reward_day ?
                            '$' + toShowDollar(this.saveToTwoWei(bxhInfo.dao_reward_day)) : '--'}
                    </div>
                </div>
                <div className={classes.rewardCardAmount}>
                    <div className={classes.rewardCardAmountTitle}>{t('BXH.monthEstimatedReward')}</div>
                    <div className={classes.rewardCardAmountDesc}>
                        {bxhInfo.dao_reward_wait ?
                            '$' + toShowDollar(this.saveToTwoWei(bxhInfo.dao_reward_wait)) : '--'}
                    </div>
                </div>
                <div style={{ width: '100%', height: '20px', borderBottom: '1px dashed rgba(151, 151, 151, 0.2)' }}></div>
                <div className={[classes.rewardCardApk, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>
                    <div style={{ width: '40%' }} className={classes.rewardCardApkDesc}>APY：<span>{bxhInfo.dao_apy ? this.saveToTwoWei(bxhInfo.dao_apy) + '%' : '--'}</span></div>
                    <div style={{ width: '60%', textAlign: 'right', marginLeft: '10px' }} className={classes.rewardCardApkDesc}>
                        TVL：<span>
                            {bxhInfo.dao_tvl ?
                                '$' + toShowDollar(this.saveToTwoWei(bxhInfo.dao_tvl)) : '--'}
                        </span>
                    </div>
                </div>
                <div className={classes.rewardCardCoin}>
                    <div className={classes.rewardCardCoinItem}>
                        <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                        <span>
                            {earned ?
                                (
                                    <CountUp
                                        start={this.saveToWei(oldEarned, 4)}
                                        end={this.saveToWei(earned, 4)}
                                        duration={2.0}
                                        separator=","
                                        decimals={4}
                                        decimal=".">
                                    </CountUp>
                                )
                                : '--'}
                        </span>
                        <div className={[chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')} style={{ marginTop: '6px', fontSize: '12px', fontWeight: 'bolder' }}>BXH Earned</div>
                    </div>
                    <div style={{ width: '1px', height: '66px', background: '#393C3F' }}></div>
                    <div className={classes.rewardCardCoinItem}>
                        <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                        <span>
                            {amount ?
                                (
                                    // this.saveToWei(amount,4) 
                                    <CountUp
                                        start={0}
                                        end={this.saveToWei(amount, 4)}
                                        duration={2.0}
                                        separator=","
                                        decimals={4}
                                        decimal=".">
                                    </CountUp>
                                )
                                : '--'}
                        </span>
                        <div className={[chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')} style={{ marginTop: '6px', fontSize: '12px', fontWeight: 'bolder' }}>BXH Staked</div>
                    </div>
                </div>
                <div className={classes.rewardCardBtnContent}>
                    {
                        alloWance == 0 ?
                            (
                                <div onClick={() => { this.approve() }} className={[classes.rewardCardApprove, chainID === '56' ? 'bscPC_new_btn1' : 'hecoPC_new_btn1'].join(' ')}>Approve BXH</div>
                            ) : (
                                <div>
                                    <div className={classes.rewardCardBtnContentRow}>
                                        <div onClick={() => { this.openMortgageBack('0') }}  className={[classes.rewardCardPledge, chainID === '56' ? 'bscPC_new_btn1' : 'hecoPC_new_btn1'].join(' ')}>{t('BXH.pledge')} BXH</div>
                                        {
                                            chainID === '56' ?
                                            <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption1.png')} alt='' />
                                            :
                                            <img onClick={() => { this.openMortgageBack('1') }} className={classes.rewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                                        }
                                    </div>
                                    <div className={classes.rewardCardBtnContentRow}>
                                        {
                                            chainID === '56' ?
                                            <div onClick={() => { this.claim() }} className={earned > 0 ? classes.bscrewardCardReceive : classes.rewardCardReceiveDisable}>{t('BXH.claim')}</div>
                                            :
                                            <div onClick={() => { this.claim() }} className={earned > 0 ? classes.rewardCardReceive : classes.rewardCardReceiveDisable}>{t('BXH.claim')}</div>
                                        }
                                        {
                                            chainID === '56' ?
                                            <div onClick={() => { this.settleWithdraw() }} className={amount > 0 ? classes.bscrewardCardReceive : classes.rewardCardReceiveDisable} style={{ marginLeft: '15px' }}>{t('BXH.settleWithdraw')}</div>
                                            :
                                            <div onClick={() => { this.settleWithdraw() }} className={amount > 0 ? classes.rewardCardReceive : classes.rewardCardReceiveDisable} style={{ marginLeft: '15px' }}>{t('BXH.settleWithdraw')}</div>
                                        }
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
    //锁仓
    renderLockUp() {
        const { classes, t } = this.props;
        const { bxh_dao_pool } = this.state;
        if(!bxh_dao_pool||bxh_dao_pool.length==0){
            return null;
        }
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.lockUp}>
                {
                    chainID === '56' ?
                    <div className={classes.bscgradientBg}></div>
                    :
                    <div className={classes.gradientBg}></div>
                }
                <div className={classes.lockUpTitle}>
                    <div style={{fontWeight: 'bold', color: '#E3E4E5' }}>{t('BXH.daoLockup')}</div>
                    <div className={classes.lockUpTitleDesc}>{t('BXH.daoLockupTitle')}</div>
                </div>
                {
                    bxh_dao_pool.map((obj,idx)=>{
                        return this.renderLockUpItem(obj,idx,(bxh_dao_pool.length-1==idx))
                    })
                }
                <div className={classes.lockUpAttentionContent}>
                    <div className={classes.lockUpAttention}>{t('BXH.attention')}</div>
                    <div className={classes.lockUpAttentionDesc}>{t('BXH.lockupAttention1')}</div>
                    <div className={classes.lockUpAttentionDesc}>{t('BXH.lockupAttention2')}</div>
                    <div className={classes.lockUpAttentionDesc}>{t('BXH.lockupAttention3')}</div>
                </div>
            </div>
        )
    }
    renderLockUpItem(obj,idx,isLast) {
        const { classes, t } = this.props;
        const { isMobile, defaultLogo, bxhAsset } = this.state;
        return (
            isMobile ?
            (
                <div key={idx}>
                    <div className={classes.lockUpItem}>
                        <div className={classes.lockUpItemHeader}>
                            <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                            <span>{obj.symbol?obj.symbol:'--'}</span>
                        </div>
                        <div className={classes.lockUpItemRowItem}>
                            <div>{t('BXH.lockupCycle')}</div>
                            <span>{obj.lockUpDay?obj.lockUpDay+' '+t('BXH.day'):'--'}</span>
                        </div>
                        <div style={{ width: '100%', height: '10px', borderBottom: '1px dashed rgba(151, 151, 151, 0.2)' }}></div>
                        <div className={classes.rewardCardCoin}>
                            <div className={classes.rewardCardCoinItem}>
                                <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                                <span>{obj.lockUpTotalSupply?this.saveToWei(obj.lockUpTotalSupply,4) : '--'}</span>
                                <div style={{ marginTop: '6px', fontSize: '12px', fontWeight: 'bolder', color: '#2EBC84' }}>{t('BXH.totalLockup')}</div>
                            </div>
                            <div style={{ width: '1px', height: '66px', background: 'rgba(151, 151, 151, 0.1)' }}></div>
                            <div className={classes.rewardCardCoinItem}>
                                <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                                <span>{obj.lockUpBalance&&obj.lockUpMortgageAmount?this.saveToWei(_getValueAdd4(obj.lockUpBalance,obj.lockUpMortgageAmount),4) : '--'}</span>
                                <div style={{ marginTop: '6px', fontSize: '12px', fontWeight: 'bolder', color: '#2EBC84' }}>{t('BXH.yourLockup')}</div>
                            </div>
                        </div>
                        {this.renderLockUpItemBtn(obj)}
                        <div style={{marginTop:'15px',display:'flex',justifyContent:'space-between'}}>
                            <div></div>
                            <div onClick={()=>{this.toStake(obj)}} className={classes.toPledge}>
                                <span>{t('BXH.toStake')}</span>
                                <img src={require('../../assets/bxh/more.png')} />
                            </div>
                        </div>
                    </div>
                    {!isLast?<div className={classes.lockUpItemLine}></div>:null}
                </div>
            ):(
                <div className={classes.lockUpItem} key={idx}>
                    <div style={{marginTop:'20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div className={classes.lockUpItemPCName}>
                            <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                            <span>{obj.symbol?obj.symbol:'--'}</span>
                        </div>
                        <div onClick={()=>{this.toStake(obj)}} className={classes.toPledge}>
                            <span>{t('BXH.toStake')}</span>
                            <img src={require('../../assets/bxh/more.png')} />
                        </div>
                    </div>
                    <div style={{marginTop:'10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div className={classes.lockUpItemPCRowItem}>
                            {t('BXH.lockupCycle')}
                            <span>{obj.lockUpDay?obj.lockUpDay+' '+t('BXH.day'):'--'}</span>
                        </div>
                        <div className={classes.lockUpItemVerticalLine}></div>
                        <div className={classes.lockUpItemPCRowItem}>
                            {t('BXH.totalLockup')}
                            <span>{obj.lockUpTotalSupply?this.saveToWei(obj.lockUpTotalSupply,4) : '--'}</span>
                        </div>
                        <div className={classes.lockUpItemVerticalLine}></div>
                        <div className={classes.lockUpItemPCRowItem}>
                            {t('BXH.yourLockup')}
                            <span>{obj.lockUpBalance&&obj.lockUpMortgageAmount?this.saveToWei(_getValueAdd4(obj.lockUpBalance,obj.lockUpMortgageAmount),4) : '--'}</span>
                        </div>
                        {this.renderLockUpItemBtn(obj)}
                    </div>
                    {isLast?<div className={classes.lockUpItemLine}></div>:null}
                </div>
            )
        )
    }
    renderLockUpItemBtn(obj) {
        const { classes, t } = this.props;
        return (
            !obj.lockUpAlloWance||obj.lockUpAlloWance==0 ?
            (
                <div className={classes.lockUpBtnContent}>
                    <div onClick={()=>{this.lockUpApprove(obj)}} className={classes.lockUpBtn}>Approve</div>
                </div>
            ):(
                <div className={classes.lockUpBtnContent}>
                    <div onClick={() => { this.openLockupMortgageBack('1',obj) }} className={classes.lockUpBtnBorder}>{t('BXH.retrieve')}</div>
                    {/* <div onClick={() => { this.openLockupMortgageBack('0',obj) }} style={{marginLeft:'10px'}} className={classes.lockUpBtn}>{t('BXH.shoudaocunru')}</div> */}
                    <div style={{marginLeft:'10px'}} className={classes.lockUpBtnDisable}>{t('BXH.shoudaocunru')}</div>
                </div>
            )
        )
    }
    //回购
    renderV2BuyBackCard() {
        const { classes, t } = this.props;
        const { bxhInfo, bxhRebuy } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={[classes.buyBackV2, chainID === '56' ? 'bscPCheaderbg' : 'hecoPCheaderbg'].join(' ')}>
                <div className={classes.buyBackCard}>
                    {
                        chainID === '56' ?
                        <div className={classes.bscgradientBg}></div>
                        :
                        <div className={classes.gradientBg}></div>
                    }
                    <div style={{ fontWeight: 'bold', color: '#E3E4E5' }}>{t('BXH.buybackxh')}</div>
                    <div className={classes.buyBackCardContent}>
                        <div className={classes.buyBackCardContentRow}>
                            <div className={classes.buyBackV2CardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackbxhamount')}</div>
                                <div className={classes.buyBackV2CardContentRowItemDesc}>{bxhInfo.buy_amount&&bxhInfo.buy_bxh ? _getValueAdd2(_getValuemultip1(bxhInfo.buy_amount,0.5),bxhInfo.buy_bxh) : '--'}</div>
                            </div>
                            {/* <div className={classes.buyBackV2CardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackhtamount')}</div>
                                <div className={classes.buyBackV2CardContentRowItemDesc}>{bxhInfo.buy_ht ? this.saveToTwoWei(bxhInfo.buy_ht) : '--'}</div>
                            </div> */}
                        </div>
                    </div>
                </div>
                { bxhRebuy.length > 0 && this.renderV2BuyBackAddress(bxhRebuy)}
            </div>
        )
    }
    //回购地址
    renderV2BuyBackAddress(list) {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        if (!isMobile) {
            return this.renderV2PCBuyBackAddress(list)
        }
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.v2ListAddress}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={classes.v2ListAddressTitle}>{t('BXH.repurchaseAddress')}</div>
                    <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'none' : 'block') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
                </div>
                <div>
                    {this.renderV2AddressList(list)}
                </div>
                <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'block' : 'none') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
            </div>
        )
    }
    //回购地址
    renderV2PCBuyBackAddress(list) {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.v2ListAddress}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={classes.v2ListAddressTitle}>{t('BXH.repurchaseAddress')}</div>
                    <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'none' : 'block') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
                </div>
                <div className={classes.buyBackV2PCListContent}>
                    <div className={classes.buyBackV2PCListContentHeader}>
                        <div style={{textAlign:'left'}}>{t('BXH.txHash')}</div>
                        <div>{t('BXH.block')}</div>
                        <div>{t('BXH.count')}(BXH)</div>
                        {/* <div>{t('BXH.count')}(HT)</div> */}
                    </div>
                    <div style={{height:'1px',background:'#393C3F'}}></div>
                    <div>
                        {this.renderV2AddressList(list)}
                    </div>
                    <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'block' : 'none') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
                </div>
            </div>
        )
    }
    //地址列表
    renderV2AddressList = (list) => {
        return list.map((obj, idx, arr) => {
            return this.renderV2AddressItem(obj, idx, (arr.length - 1) === idx);
        })
    }
    renderV2AddressItem = (obj, idx, isLast) => {
        const { classes } = this.props;
        const { isMobile } = this.state;
        if (!isMobile) {
            return this.renderV2PCAddressItem(obj, idx, isLast);
        }
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.addressItem} key={idx}>
                <div className={classes.addressItemInfo}>
                    <div onClick={() => { this.addressClick(obj) }} className={[classes.addressItemInfoTitle, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{obj.txHash}</div>
                    <div className={classes.addressItemInfoDesc}>At block {obj.block}</div>
                </div>
                <div className={classes.addressItemInfo}>
                    <div className={classes.addressItemAmount}>Amount(BXH)：{this.saveToTwoWei(obj.bxhAmount)}</div>
                    {/* <div className={classes.addressItemAmount}>Amount(HT)：{this.saveToTwoWei(obj.htAmount)}</div> */}
                </div>
                <div style={{ display: (isLast ? 'none' : 'block'), position: 'absolute', left: '0', bottom: '0', right: '0', background: '#979797', opacity: '0.1', height: '1px' }}></div>
            </div>
        )
    }
    renderV2PCAddressItem = (obj, idx, isLast) => {
        const { classes } = this.props;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.v2PCAddressItem} key={idx}>
                <div onClick={() => { this.addressClick(obj) }} style={{textAlign:'left'}} className={[classes.v2PCAddressItemInfoTitle, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{obj.txHash}</div>
                <div className={classes.v2PCAddressItemInfoDesc}>{obj.block}</div>
                <div className={classes.v2PCAddressItemAmount}>{this.saveToTwoWei(obj.bxhAmount)}</div>
                {/* <div className={classes.v2PCAddressItemAmount}>{this.saveToTwoWei(obj.htAmount)}</div> */}
                <span style={{ display: (isLast ? 'none' : 'block'), position: 'absolute', left: '0', bottom: '0', right: '0', background: '#979797', opacity: '0.1', height: '1px' }}></span>
            </div>
        )
    }
    //V3
    getV3Approve = () => {
        const { daoV3Address,bxhAsset } = this.state;
        store.getDaoBXHAlloWance(daoV3Address, bxhAsset, (err, alloWance) => {
            if (err == null) {
                this.setState({ v3AlloWance: alloWance });
            }
        })
    }
    getV3XBXHUserInfo = () => {
        const { daoV3XBXHAddress,daoV3Address,bxhAsset } = this.state;
        store._getDaoV3XBXHInfo(daoV3XBXHAddress,daoV3Address,bxhAsset,(data)=>{
            this.setState({daoV3XBXHInfo: data});
        });
    }
    v3Approve = () => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        const { daoV3Address, bxhAsset } = this.state;
        if (daoV3Address == undefined || daoV3Address == null || daoV3Address == "" || bxhAsset == null) {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOV3PledgeApprove, content: { contractAddress: daoV3Address, msgContent: msgContent, symbolAddress: bxhAsset.token_address } })
    }
    v3ApproveXBXH = () => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        const { daoV3Address, bxhInfo } = this.state;
        if (!bxhInfo || daoV3Address == undefined || daoV3Address == null || daoV3Address == "") {
            return;
        }
        this.setState({ modalSend: false })
        const msgContent = "Approve XBXH";
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOV3PledgeXBXHApprove, content: { contractAddress: bxhInfo.dao_address, msgContent: msgContent, symbolAddress: daoV3Address } })
    }
    v3Claim = ()=>{
        const { daoV3XBXHAddress, bxhAsset, daoV3XBXHInfo } = this.state
        if (daoV3XBXHInfo.pendingReward == undefined || daoV3XBXHInfo.pendingReward == null || daoV3XBXHInfo.pendingReward == 0 || daoV3XBXHAddress == undefined || daoV3XBXHAddress == null || daoV3XBXHAddress == "") {
            return
        }
        this.setState({ modalSend: false })
        const msgContent = "Harvest " + this.saveToWei(daoV3XBXHInfo.pendingReward, 4) + " " + bxhAsset.symbol;
        this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
        dispatcher.dispatch({ type: BXHDAOV3BXHClaim, content: { contractAddress: daoV3XBXHAddress, msgContent: msgContent, asset: bxhAsset } })
    }
    onSureV3MortgageBack = (val) => {
        const { bxhAsset, modalV3MortgageBackType, daoV3Address, daoV3XBXHAddress, modalV3PledgeType } = this.state;
        if (modalV3PledgeType==0) {//BXH
            let contractAddress = daoV3Address;
            if (!contractAddress || contractAddress == "") {
                return;
            }
            this.setState({ modalSend: false })
            if (modalV3MortgageBackType == '0') {
                const msgContent = "Deposit " + val + " " + bxhAsset.symbol;
                this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
                dispatcher.dispatch({ type: BXHDAOV3BXHDeposit, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
            } else {
                const msgContent = "Unstake " + val + " " + bxhAsset.symbol;
                this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
                dispatcher.dispatch({ type: BXHDAOV3BXHRetrieve, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
            }
        }else{//XBXH
            let contractAddress = daoV3XBXHAddress;
            if (!contractAddress || contractAddress == "") {
                return;
            }
            this.setState({ modalSend: false })
            if (modalV3MortgageBackType == '0') {
                const msgContent = "Deposit " + val + " XBXH";
                this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
                dispatcher.dispatch({ type: BXHDAOV3XBXHDeposit, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
            } else {
                const msgContent = "Unstake " + val + " XBXH";
                this.setState({ modalSend: true, modalSendType: 0, msgContent: msgContent })
                dispatcher.dispatch({ type: BXHDAOV3XBXHRetrieve, content: { contractAddress: contractAddress, amount: val, msgContent: msgContent, asset: bxhAsset } })
            }
        }
    }
    v3ApproveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {//刷新授权
                this.getV3Approve();
            }
        }
    }
    v3XBXHApproveReturn = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {//刷新授权
                this.getV3ApproveXBXH();
            }
        }
    }
    v3ClaimReturn = (data) => {
        this.v3TxReturnRefresh(data);
    }
    v3DepositReturn = (data) => {
        this.v3TxReturnRefresh(data);
    }
    v3RetrieveReturn = (data) => {
        this.v3TxReturnRefresh(data);
    }
    v3XBXHDepositReturn = (data) => {
        this.v3TxXBXHReturnRefresh(data);
    }
    v3XBXHRetrieveReturn = (data) => {
        this.v3TxXBXHReturnRefresh(data);
    }
    v3TxReturnRefresh = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.getV3XBXHUserInfo();
                this.refreshUserBalance();
            }
        }
    }
    v3TxXBXHReturnRefresh = (data) => {
        this.setState({ modalSend: false })
        if (data) {
            if (!data.isHideDialog) {
                this.setState({
                    txHash: data,
                    modalSend: true,
                    modalSendType: 1,
                })
            } else {
                this.getV3XBXHUserInfo();
            }
        }
    }
    renderV3() {
        const { classes, t } = this.props;
        return (
            <div className={classes.v3Root}>
                <div className={classes.v3GradientBg}></div>
                <div className={classes.v3Title}>BXH {t('BXH.daoV3Dao')}</div>
                <div className={classes.v3Content}>
                    {this.renderV3Top()}
                    {this.renderV3Bottom()}
                </div>
            </div>
        )
    }
    renderV3Top() {
        const { classes, t } = this.props;
        const { daoV3XBXHInfo } = this.state;
        let apyStr = daoV3XBXHInfo.apy?SaveToTwoWei(daoV3XBXHInfo.apy)+'%':'--';
        let aprStr = daoV3XBXHInfo.apr?SaveToTwoWei(daoV3XBXHInfo.apr)+'%':'--';
        return (
            <div className={classes.v3Row1}>
                <div className={classes.v3ApyPledgeAmountContainer}>
                    <div className={classes.v3BxhDaoApyBody}>
                        <span className={classes.v3BxhDaoApy}>{apyStr}</span>
                        <div className={classes.v3BxhDaoCardApy}>
                            {t('BXH.daoV3Apy')}
                            <ClickAwayListener onClickAway={()=>{this.setState({v3ApyTooltip:false})}}>
                                <CustomTooltip title={t('BXH.daoV2SimpleApy') + ':' + aprStr + ' ' + t('BXH.daoV2CompoundApy') + ':' + apyStr}
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={()=>{this.setState({v3ApyTooltip:false})}}
                                    open={this.state.v3ApyTooltip}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    arrow 
                                    placement="bottom-end">
                                    <img onClick={()=>{this.setState({v3ApyTooltip:true})}} src={require('../../assets/bxh/question.png')}/>
                                </CustomTooltip>
                            </ClickAwayListener>
                        </div>
                    </div>
                    <div className={classes.v3PledgeAmount}>
                        <div>{t('BXH.daoV2TotalStaking')}(BXH)</div>
                        <span>{daoV3XBXHInfo.pledgeAmount?toShowDollar(SaveToTwoWei(daoV3XBXHInfo.pledgeAmount)):'--'}</span>
                    </div>
                </div>
                <div className={classes.v3RewardContainer}>
                    <div className={classes.v3RewardItem}>
                        <div>{t('BXH.awardedAmount')}($)</div>
                        <span>{daoV3XBXHInfo.toBeAwarded?toShowDollar(SaveToTwoWei(daoV3XBXHInfo.toBeAwarded)):'--'}</span>
                    </div>
                    <div className={classes.v3VerticalLine} />
                    <div className={classes.v3RewardItem}>
                        <div>{t('BXH.daoV3RewardToday')}(BXH)</div>
                        <span>{daoV3XBXHInfo.todayRewards?toShowDollar(SaveToTwoWei(daoV3XBXHInfo.todayRewards)):'--'}</span>
                    </div>
                </div>
            </div>
        )
    }
    renderV3Bottom() {
        const { classes, t } = this.props;
        const { defaultLogo, bxhAsset, v3AlloWance, daoV3XBXHInfo } = this.state;
        return (
            <div className={classes.v3Row2}>
                <div className={classes.v3CoinCardFirst}>
                    <div>BXH Earned</div>
                    <div className={classes.v3CoinRow}>
                        <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                        <span>{daoV3XBXHInfo.pendingReward?SaveToTwoWei(daoV3XBXHInfo.pendingReward,4):'--'}</span>
                    </div>
                    <div onClick={this.v3Claim} className={classes.v3Btn}>{t('BXH.claim')}</div>
                </div>
                <div className={classes.v3CoinCard}>
                    <div>XBXH Staked</div>
                    <div className={classes.v3CoinRow}>
                        <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                        <span>{daoV3XBXHInfo.amount?SaveToTwoWei(daoV3XBXHInfo.amount):'--'}</span>
                    </div>
                    <div className={classes.v3BtnRow}>
                        <div onClick={() => { this.openV3MortgageBack('0',1) }} className={classes.v3Btn}>{t('BXH.pledge')} XBXH</div>
                        <img onClick={() => { this.openV3MortgageBack('1',1) }} className={classes.v3RewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                    </div>
                </div>
                <div className={classes.v3CoinCard}>
                    <div>BXH Staked</div>
                    <div className={classes.v3CoinRow}>
                        <img src={bxhAsset && bxhAsset.logoURI ? bxhAsset.logoURI : defaultLogo} alt='' className={classes.coinLogo} />
                        <span>{daoV3XBXHInfo.balance?SaveToTwoWei(daoV3XBXHInfo.balance):'--'}</span>
                    </div>
                    <div className={classes.v3BtnRow}>
                        {
                            v3AlloWance == 0 ?
                            (
                                <div onClick={this.v3Approve} className={classes.v3BtnApprove}>Approve BXH</div>
                            ):(
                                <>
                                    <div onClick={() => { this.openV3MortgageBack() }} className={classes.v3Btn}>{t('BXH.pledge')} BXH</div>
                                    <img onClick={() => { this.openV3MortgageBack('1') }} className={classes.v3RewardCardRecaption} src={require('../../assets/bxh/recaption.png')} alt='' />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
    renderV3MortgageBack = () => {
        const { bxhAsset, modalV3MortgageBackType, modalV3PledgeType, bxhBalance, daoV3XBXHInfo } = this.state
        let balance = 0;
        if(modalV3PledgeType==0) {
            balance = modalV3MortgageBackType == '0' ? bxhBalance : daoV3XBXHInfo.balance;
        }else{
            balance = modalV3MortgageBackType == '0' ? daoV3XBXHInfo.balance : daoV3XBXHInfo.amount;
        }
        if(balance==null||balance==undefined||balance<0){
            return null;
        }
        const xBxhAsset = {logoURI:bxhAsset.logoURI,symbol:"XBXH"}
        return (
            <BXHMortgageBackDialog type={modalV3MortgageBackType} balance={balance} bxhAsset={xBxhAsset} onClose={()=>{this.setState({ modalV3MortgageBack: false })}} onSure={this.onSureV3MortgageBack} />
        )
    }
    openV3MortgageBack = (type='0',pledgeType=0) => {
        if (this.state.address == null) {
            this.openUnlockModal();
            return;
        }
        this.setState({ modalV3MortgageBackType: type, modalV3MortgageBack: true, modalV3PledgeType: pledgeType })
    }
    renderBuyBackCard() {
        const { classes, t } = this.props;
        const { bxhInfo, bxhRebuy } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={[classes.buyBack, chainID === '56' ? 'bscPCheaderbg' : 'hecoPCheaderbg'].join(' ')}>
                <div className={classes.buyBackCard}>
                    {
                        chainID === '56' ?
                        <div className={classes.bscgradientBg}></div>
                        :
                        <div className={classes.gradientBg}></div>
                    }
                    <div style={{ fontWeight: 'bold', color: '#E3E4E5' }}>{t('BXH.buybackxh')}</div>
                    <div className={classes.buyBackCardContent}>
                        {/* <div className={classes.buyBackCardContentRow}>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.repurchasedAmount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_value_wait ? '$' + toShowDollar(this.saveToTwoWei(bxhInfo.buy_value_wait)) : '--'}</div>
                            </div>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackbxhamount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_amount&&bxhInfo.buy_bxh ? _getValueAdd2(_getValuemultip1(bxhInfo.buy_amount,0.5),bxhInfo.buy_bxh) : '--'}</div>
                            </div>
                        </div>
                        <div className={classes.buyBackCardContentRow}>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.repurchasePrice72')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_price ? '$' + toShowDollar(this.saveToTwoWei(bxhInfo.buy_price)) : '--'}</div>
                            </div>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalRepurchaseAmount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_value ? '$' + toShowDollar(this.saveToTwoWei(bxhInfo.buy_value)) : '--'}</div>
                            </div>
                        </div>
                        <div className={classes.buyBackCardContentRow}>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackhtamount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_ht ? this.saveToTwoWei(bxhInfo.buy_ht) : '--'}</div>
                            </div>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalRepurchaseDividendsCount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_share ? this.saveToTwoWei(bxhInfo.buy_share) : '--'}</div>
                            </div>
                        </div> */}
                        <div className={classes.buyBackCardContentRow}>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackbxhamount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_amount&&bxhInfo.buy_bxh ? _getValueAdd2(_getValuemultip1(bxhInfo.buy_amount,0.5),bxhInfo.buy_bxh) : '--'}</div>
                            </div>
                            <div className={classes.buyBackCardContentRowItem}>
                                <div className={classes.buyBackCardContentRowItemTiltle}>{t('BXH.totalbuybackhtamount')}</div>
                                <div className={classes.buyBackCardContentRowItemDesc}>{bxhInfo.buy_ht ? this.saveToTwoWei(bxhInfo.buy_ht) : '--'}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* { this.renderBonusAddress([1,2,3,4]) }
                <div style={{height:'2px',backgroundColor:'#979797',opacity:'0.2'}}></div> */}
                { bxhRebuy.length > 0 && this.renderBuyBackAddress(bxhRebuy)}
            </div>
        )
    }
    //分红地址
    renderBonusAddress(list) {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.listAddress}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={classes.listAddressTitle}>{t('BXH.dividendsAddress')}</div>
                    <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'none' : 'block') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
                </div>
                <div>
                    {this.renderAddressList(list)}
                </div>
                <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'block' : 'none') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
            </div>
        )
    }
    //回购地址
    renderBuyBackAddress(list) {
        const { classes, t } = this.props;
        const { isMobile } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.listAddress}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={classes.listAddressTitle}>{t('BXH.repurchaseAddress')}</div>
                    <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'none' : 'block') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
                </div>
                <div>
                    {this.renderAddressList(list)}
                </div>
                <div onClick={() => { this.moreCick() }} style={{ display: (isMobile ? 'block' : 'none') }} className={[classes.viewMore, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{t('BXH.viewMore')}</div>
            </div>
        )
    }
    //地址列表
    renderAddressList = (list) => {
        return list.map((obj, idx, arr) => {
            return this.renderAddressItem(obj, idx, (arr.length - 1) === idx);
        })
    }
    renderAddressItem = (obj, idx, isLast) => {
        const { classes } = this.props;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.addressItem} key={idx}>
                <div className={classes.addressItemInfo}>
                    <div onClick={() => { this.addressClick(obj) }} className={[classes.addressItemInfoTitle, chainID === '56' ? 'bscPCTabOn' : 'hecoPCTabOn'].join(' ')}>{obj.txHash}</div>
                    <div className={classes.addressItemInfoDesc}>At block {obj.block}</div>
                </div>
                <div className={classes.addressItemInfo}>
                    <div className={classes.addressItemAmount}>Amount(BXH)：{this.saveToTwoWei(obj.bxhAmount)}</div>
                    <div className={classes.addressItemAmount}>Amount(HT)：{this.saveToTwoWei(obj.htAmount)}</div>
                </div>
                <div style={{ display: (isLast ? 'none' : 'block'), position: 'absolute', left: '0', bottom: '0', right: '0', background: '#979797', opacity: '0.1', height: '1px' }}></div>
            </div>
        )
    }
    //团队奖励
    renderTeamRewards = () => {
        const { classes, t } = this.props;
        const { isMobile, userReward, teamLock } = this.state;
        let chainID = localStorage.getItem('chainIDSwitch')
        return (
            <div className={classes.teamRewardsCard}>
                {
                    chainID === '56' ?
                    <div className={classes.bscgradientBg}></div>
                    :
                    <div className={classes.gradientBg}></div>
                }
                <div className={classes.teamRewardsCardTitle}>{t('BXH.teamRewards')}</div>
                {
                    isMobile ?
                        (
                            <div className={classes.teamRewardsCardContent}>
                                <div className={classes.teamRewardsCardContentText}><span>{t('BXH.yourLockupTotalAmount')}(BXH)</span><br />{teamLock && teamLock.lock_amount ? this.saveToTwoWei(teamLock.lock_amount) : '--'}</div>
                                {/* <div style={{marginTop:'15px'}} className={classes.teamRewardsCardContentText}><span>{t('BXH.stayReleasedQuantity')}(BXH)</span>0</div> */}
                                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className={classes.teamRewardsCardContentText}><span>{t('BXH.unclaimedQuantity')}(BXH)</span>{userReward ? this.saveToTwoWei(userReward) : '--'}</div>
                                    <div onClick={this.receiveTeamRewards} className={classes.teamRewardsCardContentWithdraw}>{t('BXH.receive')}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={classes.teamRewardsCardContent}>
                                <div style={{ width: '50%' }} className={classes.teamRewardsCardContentText}><span>{t('BXH.yourLockupTotalAmount')}(BXH)</span>{teamLock && teamLock.lock_amount ? this.saveToTwoWei(teamLock.lock_amount) : '--'}</div>
                                {/* <div className={classes.teamRewardsCardContentLine}></div>
                            <div className={classes.teamRewardsCardContentText}><span>{t('BXH.stayReleasedQuantity')}(BXH)</span>0</div> */}
                                <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                                    <div className={classes.teamRewardsCardContentLine}></div>
                                    <div style={{ marginLeft: '25px' }} className={classes.teamRewardsCardContentText}><span>{t('BXH.unclaimedQuantity')}(BXH)</span>{userReward ? this.saveToTwoWei(userReward) : '--'}</div>
                                </div>
                                <div onClick={this.receiveTeamRewards} className={classes.teamRewardsCardContentWithdraw}>{t('BXH.claim')}</div>
                            </div>
                        )
                }
            </div>
        )
    }
    renderV2MortgageBack = () => {
        const { bxhAsset, modalV2MortgageBackType, bxhBalance, myStake } = this.state
        let balance = modalV2MortgageBackType == '0' ? bxhBalance : myStake;
        if(balance==null||balance==undefined||balance<0){
            return null;
        }
        return (
            <BXHV2MortgageBackDialog type={modalV2MortgageBackType} balance={balance} bxhAsset={bxhAsset} onClose={()=>{this.setState({ modalV2MortgageBack: false })}} onSure={this.onV2SureMortgageBack} />
        )
    }
    openV2MortgageBack = (type) => {
        this.setState({ modalV2MortgageBackType: type, modalV2MortgageBack: true })
    }
    renderMortgageBack = () => {
        const { bxhAsset, modalMortgageBackType, bxhBalance, amount } = this.state
        let balance = modalMortgageBackType == '0' ? bxhBalance : amount;
        if(balance==null||balance==undefined||balance<0){
            return null;
        }
        console.log(bxhAsset)
        return (
            <BXHMortgageBackDialog type={modalMortgageBackType} balance={balance} bxhAsset={bxhAsset} onClose={()=>{this.setState({ modalMortgageBack: false })}} onSure={this.onSureMortgageBack} />
        )
    }
    renderLockUpMortgageBack = () => {
        const { bxhAsset, modalMortgageBackType, modalLockUpObj } = this.state
        let balance = modalMortgageBackType == '0' ? modalLockUpObj.lockUpCurrencyBalance : modalLockUpObj.lockUpBalance;
        let lockUpSecond = modalLockUpObj.lockUpSecond;
        if(balance==null||balance==undefined||balance<0){
            return null;
        }
        if(!lockUpSecond){
            return null;
        }
        return (
            <BXHMortgageBackLockupDialog type={modalMortgageBackType} balance={balance} bxhAsset={{logoURI:bxhAsset.logoURI,symbol:modalLockUpObj.lpSymbol}} lockUpSecond={lockUpSecond} onClose={()=>{this.setState({ modalLockUpMortgageBack: false })}} onSure={this.onSureLockupMortgageBack} />
        )
    }
    openMortgageBack = (type) => {
        this.setState({ modalMortgageBackType: type, modalMortgageBack: true })
    }
    openLockupMortgageBack = (type,obj) => {
        this.setState({ modalLockUpObj: obj });
        this.setState({ modalMortgageBackType: type, modalLockUpMortgageBack: true })
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
    renderUnlockWalletModal = () => {
        return (
            <UnlockModal closeModal={this.closeUnlockModal} modalOpen={this.state.modalUnlock} />
        )
    }
    openUnlockModal = () => {
        this.setState({ modalUnlock: true })
    }
    closeUnlockModal = () => {
        this.setState({ modalUnlock: false })
    }
}
 
export default withNamespaces()(withRouter(withStyles(styles)(Dao)));