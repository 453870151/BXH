import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { getStyleClass,numberDecimal,toolNumber,_getValueDivided,_getValueDivided1,_getValuemultip,_getValuemultip1 } from '../../config/constantFunction'
import {
    Card,
} from '@material-ui/core';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999999',
    },
    content: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#262946',
        padding: '30px 15px',
        color: '#FFFFFF',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '12px',
            position: 'relative',
            width: '460px',
        }
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
    },
    title: {
        fontSize: '17px',
        fontWeight: 'bold',
    },
    desc: {
        padding: '0 10px',
        marginTop: '35px',
        fontSize: '15px',
    },
    coinLogo: {
        width:'22px',
        height:'22px',
        position:'absolute',
        border: '1px solid #2C3036',
        borderRadius: '11px',
    },
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: '12px',
        background: 'rgba(28, 30, 34, 0.3)',
        marginTop: '25px',
        padding: '20px 35px 20px 25px',
        width: '100%',
        height: '180px',
    },
    rowTitle: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
        height: '24px',
    },
    row: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
        fontWeight: 'bold',
        height: '20px',
    },
    rowItemCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    rowItemTitle: {
        fontSize: '13px',
        fontWeight: 'normal',
    },
    rowBoldText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    line: {
        background: 'rgba(55, 60, 69, 0.6)',
        height: '1px',
    },
    nextBtn: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        margin: '30px 10px 0',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
})


class ReduceDialog extends Component {
  constructor(props){
    super(props);
    const { onClose, onNext ,tokensData,pairData,amount,isHave} = this.props;
    // console.log("sdfdsfsfgdgf----->>>>>>>",tokensData)
    this.state = {
        onClose: onClose,
        onNext: onNext,
        tokensData:tokensData,
        pairData:pairData,
        amount:amount,
        tokenAAmount:"",
        tokenBAmount:"",
        isHave:isHave
    }
  }

  render() {
    const { classes, t } = this.props;
    const { tokensData,pairData,amount,tokenAAmount,tokenBAmount,isHave } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    
    return (
        <div className={ classes.mainBg } onClick={ (e) => { e.stopPropagation(); if(this.state.onClose!=null){this.state.onClose();}} }>
            <div className={getStyleClass('PCdiagleftbg',classes.content)} onClick= { (e) => { e.stopPropagation() } } >
                <div className={ classes.top }>
                    <div className={ classes.title }>{t('BXH.confirm')}</div>
                    <div onClick={ this.state.onClose } style={{padding:'5px',cursor:'pointer'}}>
                        <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                    </div>
                </div>
                <div className={ classes.desc }>{t('BXH.reductionLiquidity1') + pairData.symbolPair + t('BXH.reductionLiquidity2')}</div>
                <Card className={getStyleClass('PCDialogbg',classes.card)}>
                    <div className={classes.rowTitle, classes.rowItemCenter}>
                        <img src={ require('../../assets/bxh/countdown.png') } alt='' style={{width:'14px',height:'16px'}}/>
                        <label style={{marginLeft:'5px'}}>{t('BXH.closingPosition')}</label>
                    </div>
                    <div className={classes.row}>
                        <span className={classes.rowItemCenter}>
                            <div style={{width:'36px',height:'22px',position:'relative'}}>
                                <img src={ pairData?pairData.symbol0ImgURl:"" } alt='' className={classes.coinLogo} style={{left:'0',zIndex:'1'}}/>
                                <img src={ pairData?pairData.symbol1imgURl:"" } alt='' className={classes.coinLogo} style={{right:'0'}}/>
                            </div>
                            <span style={{marginLeft:'5px'}}>
                                <label className={classes.rowBoldText}>{pairData.symbol0}</label>
                                <label className={classes.rowItemTitle}>/{pairData.symbol1}</label>
                            </span>
                        </span>
                        <div className={classes.rowBoldText}>{numberDecimal(parseFloat(amount))}</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.rowItemTitle}>{pairData.symbol0}</div>
                        {
                            isHave?
                            <div>{tokensData?numberDecimal(parseFloat((amount/tokensData.poolTotal)*tokensData.reserveA)):"0"}</div>
                            :
                        <div>{pairData?_getValuemultip(pairData.lpzanbi,pairData.reserveA,6):"0"}</div>
                        }
                    </div>
                    <div className={classes.row}>
                        <div className={classes.rowItemTitle}>{pairData.symbol1}</div>
                        {
                            isHave?
                            <div>{tokensData?numberDecimal(parseFloat((amount/tokensData.poolTotal)*tokensData.reserveB)):"0"}</div>
                            :
                            <div>{pairData?_getValuemultip(pairData.lpzanbi,pairData.reserveB,6):"0"}</div>
                        }
                    </div>
                </Card>
                <div className={getStyleClass('PC_new_btn1',classes.nextBtn)} onClick={this.nextAction}>{t('BXH.nextStep')}</div>
            </div>
        </div>
    )
  };
  nextAction = () => {
    this.state.onNext();
  }

  checkZanBi = (isbool) =>{
      const{ pairData } = this.state
      let bili = pairData.myLpAmount / pairData.poolTotal
      if(isbool){
        return bili * pairData.fee0
      }else{
        return bili * pairData.fee1
      }
  }

  getyuJiAsset = (inputVal) => {
    // (inputVal/pairData.poolTotal)*pairData.reserveA
    // (inputVal/pairData.poolTotal)*pairData.reserveB
    const{ pairData } = this.state
    // let chu = _getValueDivided1(inputVal,pairData.poolTotal)

    let chengA = _getValuemultip(pairData.lpzanbi,pairData.reserveA,6)
    let chengB = _getValuemultip(pairData.lpzanbi,pairData.reserveB,6)

    this.setState({tokenAAmount:chengA,tokenBAmount:chengB})
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(ReduceDialog)));
