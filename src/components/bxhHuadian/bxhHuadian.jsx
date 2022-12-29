import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  TextField,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import MessageDialog from '../messageDialog/messageDialog.jsx';

const styles = theme => ({
    cookbg: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0',
        bottom: '0',
        zIndex: '999',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    cookcont: {
        position: 'fixed',
        bottom: '0%',
        left: '0px',
        right: '0px',
        background: '#262946',
        fontWeight: '500',
        borderRadius: '22px 22px 0 0',
        zIndex:'99999',
        [theme.breakpoints.up('sm')]: {
          width: '480px',
          left: '50%',
          marginLeft: '-130px',
          top: '50%',
          marginTop: '-165px',
          // height: '330px',
          height: '260px',
          borderRadius: '22px',
        }
    },
    toptitle:{
        marginLeft:'25px',
        marginTop:'17px',
        '& span': {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '17px',
          },
    },
    CloseImg:{
        position: 'absolute',
        left: '90%',
        marginLeft: '0px',
        top: '19px',
        width: '15px !important',
        cursor: 'pointer',
        '&:hover': {
          opacity: '.8',
        }
    },
    titleParent:{
        marginLeft:'25px',
        marginTop:'20px',
        '& span': {
          fontSize: '14px',
        }
    },
    QuestionImg:{
        position: 'fixed',
        marginTop: '4px',
        marginLeft:'5px',
        width: '15px !important',
        cursor: 'pointer',
    },
    HuaDianList:{
        position: 'relative',
        display: 'flex',
        marginTop: '20px',
        marginLeft:'25px',
        marginRight:'25px',
        marginBottom:'10px',
        '& span': {
          position: 'absolute',
          right: '10px',
          top: '7px',
        }
    },
    huadianItemSelect:{
        flex: '1',
        borderRadius: '20px',
        fontSize: '13px',
        textAlign: 'center',
        marginRight:'15px',
        padding: '0 13px',
        lineHeight:'35px',
        backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84)',
        cursor: 'pointer',
    },
    huadianItemUnSelect:{
        flex: '1',
        borderRadius: '20px',
        fontSize: '13px',
        textAlign: 'center',
        marginRight:'15px',
        lineHeight:'35px',
        padding: '0 13px',
        backgroundImage: 'linear-gradient(to right, #66696C, #66696C)',
        cursor: 'pointer',
    },
    huadianItem1:{
        flex: '2',
        borderRadius: '20px',
        fontSize: '13px',
        textAlign: 'center|left',
        paddingLeft:'20px',
        lineHeight:'35px',
        backgroundImage: 'linear-gradient(to right, #1C1E22, #1C1E22)'
    },
    TokenInput:{
        background: '#1C1E22',
        borderRadius: '20px',
        marginLeft:'25px',
        marginRight:'5px',
        width:'138px',
        lineHeight:'35px',
        height:'35px',
        marginTop:'16px',
        fontSize:'12px',
        padding:'0px 0px 0px 20px',
        '& input': { 
            fontSize:'13px' ,
            marginTop:'4px',
        }
    },
    TokenInput1:{
        flex: '2',
        background: '#1C1E22',
        borderRadius: '20px',
        lineHeight:'35px',
        fontSize:'12px',
        padding:'0px 30px 0 15px',
        '& input': { 
            fontSize:'13px' ,
            marginTop:'4px',
            textAlign: 'right',
        }
    },
    miao:{
        position:'relative',
        top:'23px'
    },
    titltishi: {
      marginLeft: '25px',
      marginRight: '25px',
      color: '#F97E47',
      opacity: '.8',
      fontSize: '13px',
    },
    titexpcont: {
      marginTop: '5px',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      marginRight: '25px',
    },
    titexp: {
      fontSize: '15px !important',
      lineHeight: '30px',
    },
    tittabexp: {
      background: 'rgb(237, 238, 242)',
      borderRadius: '12px',
      border: 'none',
      color: 'rgb(72, 88, 123)',
      fontWeight: '500',
      cursor: 'pointer',
      opacity: '.8',
      '& i': {
        display: 'inline-block',
        fontStyle: 'inherit',
        borderRadius: '12px',
        background: 'rgb(237, 238, 242)',
        height: '30px',
        lineHeight: '30px',
        padding: '0 8px',
        width: '35px',
      },
    },
    expOn: {
      background: 'rgb(195, 197, 203) !important',
    },
    expstrongOn: {
      backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84) !important',
    },
    settingtitle: {
      marginTop: '17px',
      '& span': {
        display: 'block',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '500',
      }
    },
    settingConter: {
      borderTop: '1px solid rgba(151, 151, 151, 0.15)',
      padding: '20px',
      marginTop: '20px',
      fontSize: '15px',
    },
    settingCpent: {
      margin: '15px 0',
      fontWeight: '600',
    },
    settingbottom: {
      height: '45px',
      lineHeight: '45px',
      backgroundImage: 'linear-gradient(to right, #35C288, #2EBC84)',
      fontWeight: 'bold',
      fontSize: '15px',
      borderRadius: '6px',
      textAlign: 'center',
      letterSpacing: '1px',
      margin: '30px 0 10px',
      cursor: 'pointer',
      '&:hover': {
        backgroundImage: 'linear-gradient(to right, #10754c, #1a9564)',
      }
    },
    setcookcont: {
      position: 'fixed',
      bottom: '0%',
      left: '0px',
      right: '0px',
      background: '#262946',
      fontWeight: '500',
      borderRadius: '22px 22px 0 0',
      zIndex:'99999',
      [theme.breakpoints.up('sm')]: {
        width: '480px',
        left: '50%',
        marginLeft: '-130px',
        top: '50%',
        marginTop: '-165px',
        height: '330px',
        borderRadius: '22px',
      }
  },
})


class BxhHuadian extends Component {
  constructor(props){
    super(props);
    const { onClose, point, transactionTime, onShow } = this.props;
    this.state = {
      aboutlink: false,
      onClose: onClose,
      modalMesage: false,
      message: '',
      huadianPlace: point,
      huadianValue: '',
      huadianChange: point,
      huadianTishi: 'Your transaction may fail', // 滑点设置小于0.5%，提示 (您的交易可能会失败)
      huandiantiShow: false,
      transactionPlace: transactionTime,  // 交易截止时间，默认20分钟
      transactionValue: '',
      settingMesage: false,
      settingStorage: 0,
    }
  }

  componentWillMount() {
    // 状态： 1 专家模式 0 普通模式
    let setting = localStorage.getItem("setting")
    if(setting === '1'){
      this.setState({
        settingStorage: 1
      })
    }
  }

  render() {
    const { classes, t, i18n ,closeListener,openListener, onClose } = this.props;
    const {
        loading,
        modalMesage,
        huadianPlace,
        huadianValue,
        huadianChange,
        huadianTishi,
        huandiantiShow,
        transactionValue,
        transactionPlace,
        settingMesage,
        settingStorage,
      } = this.state

    return (
        <div>
          <div className={ classes.cookbg }></div>
            <div className={ classes.cookcont }>
                <div className={ classes.toptitle}>
                    <span onClick={ closeListener }>{t('BXH.dhSettings')}</span>
                    <img src={ require('../../assets/bxh/dialogclose.png') } className={ classes.CloseImg } onClick={ () => { this.onExitClose() }} />
                </div>
                
                <div className={classes.titleParent}>
                <span onClick={ closeListener }>{t('BXH.dhtolerance')}</span>
                    <img src={ require('../../assets/bxh/question.png') } className={ classes.QuestionImg } onClick={ () => { this.onOpenMessage('Your transaction will revert if the price changes unfavorably by more than this percentage.') }} />
                </div>

                <div className={classes.HuaDianList}>
                    {
                        huadianChange === '0.1'?(<div className={classes.huadianItemSelect} onClick={ () => { this.ClickChangeType('0.1') } }>0.1%</div>):(<div className={classes.huadianItemUnSelect } onClick={ () => { this.ClickChangeType('0.1') } }>0.1%</div>)
                    }
                    {
                        huadianChange === '0.5'?(<div className={classes.huadianItemSelect} onClick={ () => { this.ClickChangeType('0.5') } }>0.5%</div>):(<div className={classes.huadianItemUnSelect} onClick={ () => { this.ClickChangeType('0.5') } }>0.5%</div>)
                    }
                    {
                        huadianChange === '1'?(<div className={classes.huadianItemSelect } onClick={ () => { this.ClickChangeType('1') } }>1%</div>):(<div className={classes.huadianItemUnSelect} onClick={ () => { this.ClickChangeType('1') } }>1%</div>)
                    }

                    <TextField
                      fullWidth
                      disabled={ loading }
                      className={ classes.TokenInput1 }
                      placeholder={ huadianPlace }
                      value={ huadianValue || '' }
                      onChange={ this.onChangehuadian.bind(this) }
                    />
                    <span>%</span>
                </div>
                {
                  huandiantiShow ?
                    <div>
                      {
                        huadianChange < 50 ?
                          <div className={classes.titltishi}>{ huadianTishi }</div>
                          :
                          <div className={classes.titltishi} style={{ color: '#EC5340', opacity: '1' }}>{ huadianTishi }</div>
                      }
                    </div>
                    :
                    null
                }
                <div className={classes.titleParent}>
                  <span onClick={ closeListener }>{t('BXH.dhdeadline')}</span>
                    <img src={ require('../../assets/bxh/question.png') } className={ classes.QuestionImg } onClick={ () => { this.onOpenMessage('Your transaction will revert if it is pending for more than this long.') }} />
                </div>

                <div>
                  <TextField
                    fullWidth
                    disabled={ loading }
                    className={ classes.TokenInput }
                    placeholder={ transactionPlace }
                    value={ transactionValue || '' } 
                    onChange={ this.onChangeTran.bind(this) }
                    style={{ marginBottom: '30px' }}
                  />
                  <span className={classes.miao}>{t('BXH.dhminute')}</span>
                </div>

                {/* <div className={classes.titleParent} style={{ marginBottom: '30px' }}>
                    <span onClick={ closeListener }>{t('BXH.insetting')}</span>
                    <img src={ require('../../assets/bxh/question.png') } className={ classes.QuestionImg } onClick={ () => { this.onOpenMessage('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.') }} />
                    <div className={classes.titexpcont}>
                      <span className={classes.titexp}>{t('BXH.Expert')}</span>
                      <span className={classes.tittabexp} onClick={ () => { this.ClickChangeSetting() }}>
                        {
                          settingStorage === 1 ?
                          <span>
                            <i className={classes.expstrongOn}>On</i>
                            <i>Off</i>
                          </span>
                          :
                          <span>
                            <i>On</i>
                            <i className={classes.expOn}>Off</i>
                          </span>
                        }
                      </span>
                    </div>
                </div> */}

            </div>
            
            { modalMesage && this.renderMessageModal() }
            { settingMesage && this.renderSeetingModal() }
        </div>
    )
  };

  renderSeetingModal = () => {
    const { classes, t } = this.props;
    return (
        <div>
          <div className={ classes.cookbg }></div>
          <div className={ classes.setcookcont }>
              <div className={ classes.settingtitle}>
                  <span>Are you sure?</span>
                  <img src={ require('../../assets/bxh/dialogclose.png') } className={ classes.CloseImg } onClick={ () => { this.onExitClose() }} />
              </div>
              <div className={ classes.settingConter}>
                <div>Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.</div>
                <div className={ classes.settingCpent}>ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</div>
                <div className={ classes.settingbottom} onClick={ () => { this.setClick() }}>Turn On Expert Mode</div>
              </div>
          </div>
        </div>
    )
  }

  ClickChangeType = (value) => {
    this.setState({ 
      huadianPlace: value,
      huadianValue: '',
      huadianChange: value,
    })
    if(value === '0.1'){
      this.setState({
        huandiantiShow: true,
        huadianTishi: 'Your transaction may fail',
      })
    }else{
      this.setState({
        huandiantiShow: false,
        huadianTishi: '',
      })
    }
  }

  onChangehuadian = (event) => {
    this.setState({
      huadianValue: event.target.value,
      huadianChange: event.target.value,
    })
    if(event.target.value){
      if(event.target.value < 0.5 && event.target.value >= 0){
        this.setState({
          huandiantiShow: true,
          huadianTishi: 'Your transaction may fail',
        })
      }else if(event.target.value >= 6 && event.target.value < 50){
        this.setState({
          huandiantiShow: true,
          huadianTishi: 'Your transaction may be frontrun',
        })
      }else if(event.target.value >= 50){
        this.setState({
          huandiantiShow: true,
          huadianTishi: 'Enter a valid slippage percentage',
        })
      }else{
        this.setState({
          huandiantiShow: false,
          huadianTishi: '',
        })
      }
    }
  }

  ClickChangeSetting = () => {
    // 状态： 1 专家模式 0 普通模式
    const { settingStorage } = this.state
    if(settingStorage === 1){
      this.setState({
        settingMesage: false,
        settingStorage: 0
      })
      localStorage.setItem("setting", 0);
    }else{
      this.setState({
        settingMesage: true,
      })
    }
  }

  setClick = () => {
    // 状态： 1 专家模式 0 普通模式
    localStorage.setItem("setting", 1);
    this.onExitClose()
    
    // this.$prompt(
    //   '请输入文件夹名称：', 
    //   '提示',
    //   {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消'
    //   }
    // ).then(({value}) => {
    //   console.log(value);
    //   // TO DO DO ...
    // });     
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  renderMessageModal = () => {
    return (
        <MessageDialog message={ this.state.message } onClose={ this.onCloseMessage }/>
    )
  }

  onOpenMessage = (msg) => {
    this.setState({ 
      message: msg,
      modalMesage: true 
    })
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }

  onChangeTran = (event) => {
    this.setState({ 
      transactionPlace: event.target.value,
      transactionValue: event.target.value,
    })
  }

  onExitClose = () => {
    const { huadianChange, transactionPlace } = this.state
    let data = {
      huadianValue: huadianChange,
      transactionValue: transactionPlace,
    }
    this.props.onClose(data)
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(BxhHuadian)));

