import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { numberDecimal,toolNumber,_getValueDivided,_getValueDivided1,_getValuemultip,_getValuemultip1 } from '../../config/constantFunction'
import {
    Card,
    TextField,
    ClickAwayListener,
} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import BscCustomTooltip from '../customTooltip/bscCustomTooltip.jsx';
import OKEXCustomTooltip from '../customTooltip/okexCustomTooltip.jsx';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        top: '150px',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#191B2E',
        padding: '15px',
        color: '#FFFFFF',
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        heigth: '50px',
        color: '#FFFFFFF',
        fontSize: '17px',
        fontWeight: 'bold',
        '& img': {
            width: '16px',
            heigth: '16px',
            cursor: 'pointer',
        },
    },
    scrollContent: {
        position: 'absolute',
        top: '55px',
        left: '0',
        right: '0',
        bottom: '0',
        overflowY: 'scroll',
        padding: '0 15px 15px',
        [theme.breakpoints.up('sm')]: {
            width: '460px',
            position: 'relative',
            top: '0',
        }
    },
    coinLogo: {
        width:'22px',
        height:'22px',
        position:'absolute',
        border: '1px solid #2C3036',
        borderRadius: '11px',
    },
    card: {
        borderRadius: '12px',
        background: '#232640',
        marginTop: '10px',
        padding: '25px 20px',
    },
    cardRow: {
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '15px',
        color: 'rgba(255,255,255,0.6)',
    },
    cardTipInput: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        padding: '0 5px',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    cardInput: {
        position: 'relative',
        marginTop: '10px',
        paddingRight: '70px',
        height: '45px',
        borderRadius: '6px',
        backgroundColor: '#1C1E22',
    },
    bxhmax: {
        position: 'absolute',
        right: '15px',
        top: '8px',
        background: 'rgba(46, 188, 132, 0.1)',
        borderRadius: '6px',
        color: '#2EBC84',
        width: '50px',
        height: '30px',
        lineHeight: '30px',
        textAlign: 'center',
        fontSize: '13px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    progressContent: {
        margin: '20px 5px',
    },
    progress: {
        position: 'relative',
        height: '6px',
    },
    progressBack: {
        position: 'absolute',
        left: '0',
        right: '0',
        backgroundColor: '#1C1E22',
        borderRadius: '5px',
        height: '6px',
    },
    progressFront: {
        position: 'absolute',
        left: '0',
        right: '0',
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        borderRadius: '5px',
        height: '6px',
        width: '0%',
    },
    progressText: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        // color: 'rgba(255,255,255,0.3)',
        marginTop: '12px',
        '& label': {
            // width: '20%',
            // textAlign: 'center',
        }
    },
    selectType_select:{
        flex:'2',
        width: '20%',
        textAlign: 'center',
        cursor: 'pointer',
        marginLeft:'5px',
        marginRight:'5px',
        paddingTop:'8px',
        paddingBottom:'8px',
        borderRadius: '5px',
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
      },
      selectType_unselect:{
        flex:'2',
        width: '20%',
        textAlign: 'center',
        cursor: 'pointer',
        marginLeft:'5px',
        marginRight:'5px',
        paddingTop:'8px',
        paddingBottom:'8px',
        borderRadius: '5px',
        backgroundImage: 'linear-gradient(to right, #373950 , #373950)',
      },
    sure: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        marginTop: '30px',
        width: '100%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom:'30px'
    },
    sureDisable: {
        backgroundColor: '#4A4C5E',
        marginTop: '30px',
        width: '100%',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    bottomCard: {
        margin: '15px 0 50px',
        height: '160px',
        background: '#21233C',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderRadius: '12px',
        padding: '25px 35px 20px 25px',
        width: '100%',
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
    titleParent:{
        color:'#FFFFFF',
        fontSize:'15px',
        marginBottom:'5px',
        '& img':{
            width:'15px',
            marginLeft:'5px',
            position:'relative',
            top:'3px'
        }
    },
    line:{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
        fontWeight: 'bold',
        height: '0.5px',
        background:'#FFFFFF',
        opacity: '0.1',
        marginTop:'15px'
    },
    bxhjgfen: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        fontSize: '12px',
        marginTop: '10px',

        '& span': {
          opacity: '.7',
        },
        '& em': {
          fontStyle: 'inherit',
        },
        '& img': {
          height: '14px',
          verticalAlign: 'middle',
          margin: '0 8px',
        }
      },
})


class LiquidityDialog extends Component {
  constructor(props){
    super(props);

    const { onClose, onSure ,tokensData,pairData,isHave} = this.props;
    console.log("pairdata ---->>>>>>>> ",pairData)
    console.log("tokensData--->>>>>",tokensData)

    this.state = {
        onClose: onClose,
        onSure: onSure,
        inputVal: null,
        progress: '0%',
        sureEnable: false,
        tokensData:tokensData,
        pairData:pairData,
        isReserve:false,
        modalMesage:false,
        tokenAAmount:"",
        tokenBAmount:"",
        isHave:isHave
    }
  }
  //返回
  back = () => {
    if (this.state.onClose != null) {
        this.state.onClose();
    }
  }
  nextAction = () => {
    if (this.state.sureEnable&&this.state.onSure != null) {
        this.state.onSure(this.state.inputVal);
    }
  }
  // true:数值型的，false：非数值型
  myIsNumber = (value) => {
    if (value==undefined||value==null) {
        return false;
    }
    return !isNaN(value);
  }
  onChangeTo = (value, event) => {
    const balance = this.state.pairData.myLpAmount;
    var val = event.target.value;
    if (this.myIsNumber(val)&&this.myIsNumber(balance)) {
        if (parseFloat(val)<0||parseFloat(val)>parseFloat(balance)) {
            val = balance;
        }
    }else{
        val = null;
    }
    this.setState({inputVal: val});
    this.getyuJiAsset(val)
    this.refreshSureBtn(val);
  }
  // MAX按钮(获取From余额)
  MAXBalance = () => {
    const{isHave,tokensData} = this.state
    const balance = isHave?tokensData.mineLpAmount:this.state.pairData.myLpAmount;
    this.setState({inputVal: balance});
    this.getyuJiAsset(balance)
    this.refreshSureBtn(balance);
  }
  //刷新确认按钮
  refreshSureBtn = (inputVal) => {
    const{isHave,tokensData} = this.state
    const balance = isHave?tokensData.mineLpAmount:this.state.pairData.myLpAmount;
    // _getValueDivided1 _getValuemultip1
    // let bg1 = _getValuemultip1(balance,100)
    // const radio = _getValueDivided1(inputVal,bg1)//inputVal/balance*100;
    // var progress = radio+'%';
    this.setState({sureEnable: inputVal>0});
  }
  refreshCount = (count) => {
    const{isHave,tokensData} = this.state
    var progress = _getValuemultip1(count,1);
    // this.setState({});

    let temp_count = _getValueDivided1(count,100)
    var val = _getValuemultip1(isHave?tokensData.mineLpAmount:this.state.pairData.myLpAmount,temp_count)//parseFloat(this.state.tokensData.mineLpAmount) * (count / 100)
    this.setState({inputVal: val,progress: progress});
    this.getyuJiAsset(val)

    this.refreshSureBtn(val);
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  
  render() {
    const { classes, t } = this.props;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <div className={ classes.mainBg } onClick= { (e) => { e.stopPropagation() } } >
            { isMobile ? 
                (
                    <div className={[classes.content, chainID === '56' ? 'bscPCbroot' : chainID === '66' ? 'okexPCbroot' : chainID === '1' ? 'ethPCbroot' : 'hecoPCbroot'].join(' ')} >
                        <div className={classes.top}>
                            <img onClick={this.back} alt='' src={require('../../assets/bxh/back.png')} />
                            <label>- {t('BXH.workingCapital')}</label>
                            <span></span>
                        </div>
                        { this.renderCard() }
                    </div>
                ):(
                    this.renderCard()
                ) 
            }
        </div>
    )
  };
  renderCard = () => {
    const { classes, t } = this.props;
    const { sureEnable, balance, inputVal, progress ,tokensData,pairData,isReserve,tokenAAmount,tokenBAmount,isHave } = this.state;
    const isMobile = this._isMobile();
    let chainID = localStorage.getItem('chainIDSwitch')
      return (
        <div className={classes.scrollContent}>
            <Card className={[classes.card, chainID === '56' ? 'bscPCDialogbg' : chainID === '66' ? 'okexPCDialogbg' : chainID === '1' ? 'ethPCDialogbg' : 'hecoPCDialogbg'].join(' ')}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 5px'}}>
                    <div>- {t('BXH.workingCapital')}</div>
                    <div style={{padding:'5px',height:'25px',display: isMobile ? 'none': 'block'}} onClick={ this.back }>
                        <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                    </div>
                </div>
                <div className={classes.cardRow}>
                    <div style={{width:'36px',height:'22px',position:'relative'}}>
                        <img src={ pairData?pairData.symbol0ImgURl:"" } className={classes.coinLogo} style={{left:'0',zIndex:'1'}}/>
                        <img src={ pairData?pairData.symbol1imgURl:"" } className={classes.coinLogo} style={{right:'0'}}/>
                    </div>
                    <label style={{marginLeft:'5px'}}>{pairData?pairData.symbolPair || "":""}-LP</label>
                </div>
                <div className={classes.cardTipInput}>
                    <label>{t('BXH.input')}</label>
                    {
                        isHave?
                    <label><span style={{color:'rgba(255,255,255,0.4)',marginRight:'5px'}}>{t('BXH.balance')}:</span>{tokensData?numberDecimal(parseFloat(tokensData.mineLpAmount))||"0.00":"0.00"}</label>
                    :
                    <label><span style={{color:'rgba(255,255,255,0.4)',marginRight:'5px'}}>{t('BXH.balance')}:</span>{pairData?numberDecimal(parseFloat(pairData.myLpAmount))||"0.00":"0.00"}</label>
                    }
                </div>
                <div className={classes.cardInput}>
                    <TextField
                        fullWidth
                        style={{ right: '0px' }}
                        id={ '' }
                        value={ inputVal || '' }
                        onChange={ this.onChangeTo.bind(this, balance ? (Math.floor(balance*10000)/10000): '0.00') }
                        placeholder="0.00"
                        variant="outlined"
                        />
                    <div className={[classes.bxhmax, chainID === '56' ? 'bscPC_new_btn2' : chainID === '66' ? 'okexPC_new_btn2' : chainID === '1' ? 'ethPC_new_btn2' : 'hecoPC_new_btn2', chainID === '56' ? 'bscmaxbg' : chainID === '66' ? 'okexmaxbg' : chainID === '1' ? 'ethmaxbg' : ''].join(' ')} onClick={ this.MAXBalance }>MAX</div>
                </div>
                <div className={classes.progressContent}>
                    <div className={classes.progressText}>
                        <label onClick={()=>{this.refreshCount('0')}} className={[progress === "0" ? classes.selectType_select : classes.selectType_unselect, progress === "0" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? 'okexPC_new_btn1' : chainID === '1' ? 'ethPC_new_btn1' : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? 'okexsureDisable' : chainID === '1' ? 'ethsureDisable' : "hecosureDisable"].join(' ')}>0%</label>
                        <label onClick={()=>{this.refreshCount('25')}} className={[progress === "25" ? classes.selectType_select : classes.selectType_unselect, progress === "25" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : "hecosureDisable"].join(' ')}>25%</label>
                        <label onClick={()=>{this.refreshCount('50')}} className={[progress === "50" ? classes.selectType_select : classes.selectType_unselect, progress === "50" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : "hecosureDisable"].join(' ')}>50%</label>
                        <label onClick={()=>{this.refreshCount('75')}} className={[progress === "75" ? classes.selectType_select : classes.selectType_unselect, progress === "75" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : "hecosureDisable"].join(' ')}>75%</label>
                        <label onClick={()=>{this.refreshCount('100')}} className={[progress === "100" ? classes.selectType_select : classes.selectType_unselect, progress === "100" ? chainID === '56' ? "bscPC_new_btn1" : chainID === '66' ? "okexPC_new_btn1" : chainID === '1' ? "ethPC_new_btn1" : "hecoPC_new_btn1" : chainID === '56' ? "bscsureDisable" : chainID === '66' ? "okexsureDisable" : chainID === '1' ? "ethsureDisable" : "hecosureDisable"].join(' ')}>100%</label>
                    </div>
                </div>
                {
                    sureEnable?
                    <div>
                        <div className={classes.titleParent}>
                            {t('BXH.expectedAssetsAcquired')}
                            <ClickAwayListener onClickAway={this.onCloseMessage}>
                                {
                                chainID === '56' ?
                                <BscCustomTooltip title={t('BXH.expectedAssetsAcquiredDesc')} 
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={this.onCloseMessage}
                                    open={this.state.modalMesage}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    arrow 
                                    placement="bottom-end">
                                    <img src={ require('../../assets/bxh/wenti.png') } onClick={ () =>{ this.onSetMessageState()}}/>
                                </BscCustomTooltip>
                                :
                                chainID === '66' ?
                                <OKEXCustomTooltip title={t('BXH.expectedAssetsAcquiredDesc')} 
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={this.onCloseMessage}
                                    open={this.state.modalMesage}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    arrow 
                                    placement="bottom-end">
                                    <img src={ require('../../assets/bxh/wenti.png') } onClick={ () =>{ this.onSetMessageState()}}/>
                                </OKEXCustomTooltip>
                                :
                                <CustomTooltip title={t('BXH.expectedAssetsAcquiredDesc')} 
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={this.onCloseMessage}
                                    open={this.state.modalMesage}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    arrow 
                                    placement="bottom-end">
                                    <img src={ require('../../assets/bxh/wenti.png') } onClick={ () =>{ this.onSetMessageState()}}/>
                                </CustomTooltip>
                                }
                            </ClickAwayListener>
                        </div>
                        {
                            isHave?
                            <div>
                                                        <div className={classes.row}>
                            <label className={classes.rowItemTitle}>{pairData?pairData.symbol0:""}</label>
                            <label>{tokensData?numberDecimal(parseFloat((inputVal/tokensData.poolTotal)*tokensData.reserveA)):"0"}</label>
                        </div>
                        <div className={classes.row}>
                            <label className={classes.rowItemTitle}>{pairData?pairData.symbol1:""}</label>
                            <label>{tokensData?numberDecimal(parseFloat((inputVal/tokensData.poolTotal)*tokensData.reserveB)):"0"}</label>
                        </div>
                            </div>
                            :
                            <div>
                        <div className={classes.row}>
                            <label className={classes.rowItemTitle}>{pairData?pairData.symbol0:""}</label>
                            <label>{pairData?tokenAAmount:"0"}</label>
                        </div>
                        <div className={classes.row}>
                            <label className={classes.rowItemTitle}>{pairData?pairData.symbol1:""}</label>
                            <label>{pairData?tokenBAmount:"0"}</label>
                        </div>
                            </div>
                        }


                        <em className={classes.line}/>
                        {/* 价格 */}
                        <div className={ classes.bxhjgfen }>
                            <span>{t('BXH.price')}</span>
                            {
                                isHave?
                                isReserve?
                                <em>
                                <i><img src={ require('../../assets/bxh/ziyuan.png') } onClick={ () => { this.changeReverse() } }/></i>
                                { tokensData?numberDecimal(parseFloat(((tokensData.tokenB/tokensData.tokenA)))):"0" } &nbsp;
                                { pairData?pairData.symbol1+" per "+pairData.symbol0:"" }
                                </em>
                                :
                                <em>
                                <i><img src={ require('../../assets/bxh/ziyuan.png') } onClick={ () => { this.changeReverse() } }/></i>
                                { tokensData?numberDecimal(parseFloat(((tokensData.tokenA/tokensData.tokenB)))):"0" } &nbsp;
                                { pairData?pairData.symbol0+" per "+pairData.symbol1:"" }
                                </em>
                                :
                                isReserve?
                                <em>
                                <i><img src={ require('../../assets/bxh/ziyuan.png') } onClick={ () => { this.changeReverse() } }/></i>
                                { pairData?pairData.count_nor:"0" } &nbsp;
                                { pairData?pairData.symbol1+" per "+pairData.symbol0:"" }
                                </em>
                                :
                                <em>
                                <i><img src={ require('../../assets/bxh/ziyuan.png') } onClick={ () => { this.changeReverse() } }/></i>
                                { pairData?pairData.count_rever:"0" } &nbsp;
                                { pairData?pairData.symbol0+" per "+pairData.symbol1:"" }
                                </em>
                            }
                        </div>
                    </div>
                    :
                    null
                }
                {
                    chainID === '56' ?
                    <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "bscPC_new_btn1" : "bscsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                    :
                    chainID === '66' ?
                    <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "okexPC_new_btn1" : "okexsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                    :
                    chainID === '1' ?
                    <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "ethPC_new_btn1" : "ethsureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                    :
                    <div className={[sureEnable ? classes.sure : classes.sureDisable, sureEnable ? "hecoPC_new_btn1" : "hecosureDisable"].join(' ')} onClick={this.nextAction}>{t('BXH.confirm')}</div>
                }
                
            </Card>
            { sureEnable && isHave && this.renderBottomCard() }
        </div>
      )
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
  onSetMessageState = () => {
    this.setState({ modalMesage: true })
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }
  changeReverse = () => {
    this.setState({ isReserve: !this.state.isReserve })
  }
  SaveToTwoWei = (number,scale) => {
    var scaleP = Math.pow(10,scale);
    var result = Math.floor(number * scaleP) /scaleP;
    return result;
  }
  //减少流动性确定后的弹窗
  renderBottomCard = () => {
    const { classes, t, i18n} = this.props;
    const { inputVal,tokensData,pairData,isHave} = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
        <Card className={[classes.bottomCard, chainID === '56' ? 'bscPCTDaoCard' : chainID === '66' ? 'okexPCTDaoCard' : chainID === '1' ? 'ethPCTDaoCard' : 'hecoPCTDaoCard'].join(' ')}>
            <div className={classes.rowTitle, classes.rowItemCenter}>
                <img src={ require('../../assets/bxh/countdown.png') } alt='' style={{width:'14px',height:'16px'}}/>
                <label style={{marginLeft:'5px'}}>{t('BXH.minecangweititle')}</label>
            </div>
            <div className={classes.row}>
                <span className={classes.rowItemCenter}>
                    <div style={{width:'36px',height:'22px',position:'relative'}}>
                        <img src={ pairData?pairData.symbol0ImgURl:"" } alt='' className={classes.coinLogo} style={{left:'0',zIndex:'1'}}/>
                        <img src={ pairData?pairData.symbol1imgURl:"" } alt='' className={classes.coinLogo} style={{right:'0'}}/>
                    </div>
                    <span style={{marginLeft:'5px'}}>
                        <label className={classes.rowBoldText}>{pairData?pairData.symbol0:""}</label>
                        <label className={classes.rowItemTitle}>/{pairData?pairData.symbol1:""}</label>
                    </span>
                </span>
                {
                    isHave?
                <label className={classes.rowBoldText}>{tokensData?numberDecimal(parseFloat((tokensData.mineLpAmount)))||"0.00":"0.00"}</label>
                    :
                <label className={classes.rowBoldText}>{pairData?numberDecimal(parseFloat((pairData.myLpAmount)))||"0.00":"0.00"}</label>
                }
            </div>
            {
                isHave?
                <div>
                                <div className={classes.row}>
                <label className={classes.rowItemTitle}>{pairData?pairData.symbol0:""}</label>
                <label>{tokensData?numberDecimal(parseFloat(((tokensData.mineLpAmount/tokensData.poolTotal)*tokensData.reserveA))):"0"}</label>
            </div>
            <div className={classes.row}>
                <label className={classes.rowItemTitle}>{pairData?pairData.symbol1:""}</label>
                <label>{tokensData?numberDecimal(parseFloat(((tokensData.mineLpAmount/tokensData.poolTotal)*tokensData.reserveB))):"0"}</label>
            </div>
                </div>
                :
                <div>
                                <div className={classes.row}>
                <label className={classes.rowItemTitle}>{pairData?pairData.symbol0:""}</label>
                <label>{pairData?pairData.lptotoken0Amount:"0"}</label>
            </div>
            <div className={classes.row}>
                <label className={classes.rowItemTitle}>{pairData?pairData.symbol1:""}</label>
                <label>{pairData?pairData.lptotoken1Amount:"0"}</label>
            </div>
                </div>
            }

        </Card>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(LiquidityDialog)));
