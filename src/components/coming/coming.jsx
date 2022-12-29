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
import Header from '../unlock/Header.jsx';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import SendDialog from '../sendDialog/sendDialog.jsx';
import CountUp from 'react-countup';
import { toShowDollar, formatDate, formatTimeDate, _getValuemultip1, _getValueAdd2 } from '../../config/constantFunction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Footer from '../unlock/Footer.jsx';
import getLangURLWithURL from '../../util/linkHelper';
  
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
    backgroundColor: '#191B2E',
    [theme.breakpoints.up('sm')]: {
      minWidth: '900px',
      justifyContent: 'center',
    }
  },
  commist: {
    position: 'fixed',
    height: '200px',
    top: '50%',
    marginTop: '-150px',
  }
  
});
  
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
  
class Coming extends Component {
  
  constructor(props) {
    super()
    this.state = {
      isMobile: true,
    }
  }
  
  componentWillMount() {

  }

  componentDidMount = () => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: true })
    } else {  // PC端
      this.setState({ isMobile: false })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
  }

  componentWillUnmount() {

  }

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


  render() {
    const { classes, t, i18n } = this.props;
    const { isMobile } = this.state
   
    if (!isMobile) {
      return (
        <div className={'okexPCConter'}>
          <Header openUnlockModal={this.openUnlockModal} />
          <img src={require('../../assets/bxh/coming_web.png')} width="250px" />
        </div>
      )
    } else {
      return (
        <div className={classes.root}>
          <Header openUnlockModal={this.openUnlockModal} />
  
          <img src={require('../../assets/bxh/coming_h5.png')} className={classes.commist} />
  
          <Footer pagetype="coming" />
  
        </div>
      )
    }
  
  };
  
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
  
export default withNamespaces()(withRouter(withStyles(styles)(Coming)));