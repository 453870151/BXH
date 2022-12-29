import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  DialogContent,
  Dialog,
  Slide,
  Button,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Snackbar from '../snackbar/snackbar';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import cookie from 'react-cookies';
import './rotateTranstion.css';
import getLangURLWithURL from '../../util/linkHelper';
import { getStyleClass } from '../../config/constantFunction';

import {
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  BXHCOOKIEREFRESHEVENT,
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
  footerHeight: {
    height: '55px',
  },
  footerConter: {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    display: 'flex',
    width: '100%',
    background: '#1D1F36',
    padding: '12px 0',
    zIndex: '999',
    '& div': {
      width: '20%',
      textAlign: 'center',
    },
    '& span': {
      display: 'block',
      fontSize: '12px',
      fontWeight: '500',
    }
  },
  selectColor: {
    color: '#30BD85',
  }
})

class FooterM extends Component {
  constructor(props){
    super(props);
    const { openUnlockModal, pagetype } = this.props;
    this.state = {
      isShow: false,
      address: null,
      snackbarMessage: null, 
      snackbarType: null,
      modalOpen: false,
      isMobile: true,
      openUnlockModal: openUnlockModal,
      pagetype,pagetype,
      wHeight: '',
      hh: '',
      type: 1,
    }
  }
  
  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.on(CONNECTION_DISCONNECTED, this.refreshAccount);
  }
  componentDidMount() {
    this.refreshAccount()

    this.state.wHeight = window.innerHeight; //获取初始可视窗口高度 
    //监听窗口大小改变
    window.addEventListener('resize', this.handleResize) 
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.refreshAccount);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.refreshAccount);
    this.setState = (state,callback) =>{
      return;
    }
  }
  handleResize = () => {
    const { wHeight } = this.state;
    var hh = window.innerHeight; //当前可视窗口高度 
    this.state.hh = hh
    this.state.type = 4
    if(wHeight > hh){ //可以作为虚拟键盘弹出事件 
      this.state.type = 3
      // $('.footerConter').css('position','static');
    }else{ //可以作为虚拟键盘关闭事件 
      // $('.footerConter').css('position','fixed');
      this.state.type = 2
     } 
    //  this.state.wHeight = hh; 
  }
  refreshAccount = () => {
    const account = store.getStore('account');
    const address = account.address;
    if (address != undefined && address !== null && address != '') {
      var tempAddr = null
      const digits = 4
      tempAddr = address.substr(0, digits+2)
      tempAddr += '...'
      tempAddr += address.substr(address.length-digits, digits)
      this.setState({address: tempAddr})
    }else{
      this.setState({address: null});
    }
  }

  //授权账号
  openUnlockModal = () => {
    if (this.state.openUnlockModal) {
      this.state.openUnlockModal();
    }else{
      this.setState({ modalOpen: true })
    }
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderUnlockWalletModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }


  render() {
    const { classes, t } = this.props
    const { modalOpen, pagetype, type, wHeight, hh } = this.state;
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div>
        <div className={classes.footerHeight}></div>
        <div className={getStyleClass('footer',classes.footerConter)}>
          <div onClick={ () => { this.navigateStake('/') } } className={getStyleClass('Chain')}>
            {
              chainID === '56' ?
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_on1_1.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
              :
              chainID === '66' ?
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_1_1.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
              :
              chainID === '1' ?
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_2_1.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
              :
              chainID === '137' ?
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_on6.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
              :
              chainID === '43114' ?
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_on7.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
              :
              <img src={ pagetype=='home' ? require('../../assets/bxh/footer_on1.png') : require('../../assets/bxh/footer_1.png') } style={{height:'15px'}} />
            }
            <span className={pagetype=='home' ? 'fontcolor': '' }>BXH</span>
          </div>
          {
            chainID === '56' ?
            <div onClick={ () => { window.open(getLangURLWithURL('https://bscswap.bxh.com/#/swap'),'_self') } } className={ 'bscChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_on2_2.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
            :
            chainID === '66' ?
            <div onClick={ () => { window.open(getLangURLWithURL('https://okswap.bxh.com/#/swap'),'_self') } } className={ 'okexChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_2_2.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
            :
            chainID === '1' ?
            <div onClick={ () => { window.open(getLangURLWithURL('https://ethswap.bxh.com/#/swap'),'_self') } } className={ 'ethChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_2_3.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
            :
            chainID === '137' ?
            <div onClick={ () => { window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/swap'),'_self') } } className={ 'ethChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_2_3.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
            :
            chainID === '43114' ?
            <div onClick={ () => { window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/swap'),'_self') } } className={ 'ethChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_2_3.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
            :
            <div onClick={ () => { window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self') } } className={ 'hecoChain' }>
              <img src={ pagetype=='swap' ? require('../../assets/bxh/footer_on2.png') : require('../../assets/bxh/footer_2.png') } style={{height:'15px'}} />
              <span className={pagetype=='swap' ? 'fontcolor' : '' }>{t('BXH.swap')}</span>
            </div>
          }
          <div onClick={ () => { this.navigateStake('/liquidity') } } className={getStyleClass('Chain')}>
            {
              chainID === '56' ?
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_on3_3.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
              :
              chainID === '66' ?
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_3_3.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
              :
              chainID === '1' ?
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_3_4.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
              :
              chainID === '137' ?
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_on6_1.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
              :
              chainID === '43114' ?
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_on7_1.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
              :
              <img src={ pagetype=='liquidity' ? require('../../assets/bxh/footer_on3.png') : require('../../assets/bxh/footer_3.png') } style={{height:'15px'}} />
            }
            <span className={pagetype=='liquidity' ? 'fontcolor' : '' }>{t('BXH.hkuangchi')}</span>
          </div>
          <div onClick={ () => { this.navigateStake('/bridge') } } className={getStyleClass('Chain')}>
            {
              chainID === '56' ?
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_11.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
              :
              chainID === '66' ?
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_2.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
              :
              chainID === '1' ?
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_3.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
              :
              chainID === '137' ?
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_5.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
              :
              chainID === '43114' ?
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_6.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
              :
              <img src={ pagetype=='bridge' ? require('../../assets/bxh/footer_on6_4.png') : require('../../assets/bxh/footer_6.png') } style={{height:'18px'}} />
            }
            <span className={pagetype=='bridge' ? 'fontcolor' : '' }>{t('BXH.mbridge')}</span>
          </div>
          {
            chainID === '128' ?
            <div onClick={ () => { this.navigateStake('/dao') } } className={getStyleClass('Chain')}>
              <img src={ pagetype=='dao' ? require('../../assets/bxh/footer_on4.png') : require('../../assets/bxh/footer_4.png') } style={{height:'15px'}} />
              <span className={pagetype=='dao' ? 'fontcolor' : '' }>DAO</span>
            </div>
            :
            null
          }
          {
            chainID === '66' ?
            <div onClick={ () => { this.market() } } className={'okexChain'}>
              <img src={ pagetype=='coming' ? require('../../assets/bxh/footer_5_51.png') : require('../../assets/bxh/footer_5.png') } style={{height:'15px'}} />
              <span className={pagetype=='coming' ? 'fontcolor' : '' }>{t('BXH.hangqing')}</span>
            </div>
            :
            chainID === '1' || chainID === '56' || chainID === '128' || chainID === '43114' ?
            <div onClick={ () => { this.market() } }>
              <img src={ require('../../assets/bxh/footer_5.png') } style={{height:'15px'}} />
              <span>{t('BXH.hangqing')}</span>
            </div>
            :
            null
          }
          
        </div>

        { modalOpen && this.renderUnlockWalletModal() }
      </div>
    )
  };

  navigateStake = (link) => {
    if (this.state.address==null) {
      this.openUnlockModal()
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.history.push(link)
  }

  market = () => {
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open('https://bscinfo.bxh.com')
    }else if(chainID === "66"){
      window.open('https://okinfo.bxh.com')
    }else if(chainID === "1"){
      window.open('https://ethinfo.bxh.com')
    }else if(chainID === "137"){
      // window.open('https://ethinfo.bxh.com')
    }else if(chainID === "43114"){
      window.open('https://avaxinfo.bxh.com')
    }else{
      window.open('https://hecoinfo.bxh.com')
    }
  }

}

export default withNamespaces()(withRouter(withStyles(styles)(FooterM)));
