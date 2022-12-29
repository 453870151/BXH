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
import { toShowDollar, formatDate, formatTimeDate, _getValuemultip1, _getValueAdd2 } from '../../config/constantFunction';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
import '../accountDialog/accountDialog.css';

 
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
  jiazai: {
    width:'40px', 
    height: '40px',
    '& img': {
        width:'40px', 
        height: '40px',
    }
  }
});
 
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store
 
class Jiazai extends Component {
 
  constructor(props) {
    super()
    this.state = {
      
    }
  }

  render() {
    const { classes, t, i18n } = this.props;
    return (
        <div className={classes.jiazai}>
            <img src={require('../../assets/bxh/jiazai.png')} alt="" className="sendImage" />
        </div> 
    )
  };
 
}
 
export default withNamespaces()(withRouter(withStyles(styles)(Jiazai)));