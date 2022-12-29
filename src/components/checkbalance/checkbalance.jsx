import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  ClickAwayListener
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
import { colors } from '../../theme'
import Link from '@material-ui/core/Link';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import DetailsIcon from '@material-ui/icons/Details';
import Lang from '../unlock/Lang.jsx'
import LangM from '../unlock/LangM.jsx';
import Store from "../../stores";

import { numberDecimal, _getValueDivided, _getValuemultip, _getValueMinus, _getValuemultip1, _getValueDivided1 } from '../../config/constantFunction'
import {
  GET_BXHTRADESTAKEINIT_RETURNED,
} from '../../constants'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      padding: '26px 24px',
    }
  },
  root1: {
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '260px',
    }
  },
  bxhfield: {
    position: 'relative',
    width: '100%',
    height:'50px',
    paddingTop: '4px',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    }
  },
  bxhInput: {
    width: '100%',
    height:'50px',
    '& input': {
      fontFamily: "consola",
      padding: '0px',
    }
  },


});

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class checkbalance extends Component {

  constructor(props) {
    super()
    this.state = {
      amount0:""
    }

    // console.log("cookie --->>>>> ",_getValueDivided('0.1' , 100,6) * 100 > 0.01)

  }


  // 组件加载完毕 启动定时器
  componentDidMount() {


  }


  componentWillMount() {
    emitter.on(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);

  }

  componentWillUnmount() {
    emitter.removeListener(GET_BXHTRADESTAKEINIT_RETURNED, this.balancesReturned);

    this.setState = (state, callback) => {
      return;
    }
  };

  balancesReturned = () =>{

  }

  render() {
    const { classes, t, location } = this.props;
    // const { amount0 } = this.state

    // if (!pool) {
    //   return null;
    // }
    const address = this.state["currentAddress"]
    return (
      <div className={classes.root}>
        <div className={classes.bxhfield}>
          <TextField
            fullWidth
            // disabled={ loading }
            className={classes.bxhInput}
            // id={ '' + asset.id + '_' + type }
            value={address || ''}
            // error={ amountError }
            onChange={this.onChange0.bind(this,"")}
            onFocus={this.onFocusFrom.bind()}  // 获得焦点
            onBlur={this.onBlurFrom.bind()} // 失去焦点
            placeholder="输入Token合约地址"
            variant="outlined"
          />
          {/* <div className={classes.bxhmax} onClick={() => { this.MaxValue0() }}>MAX</div> */}
        </div>

        <div style={{width:'200px',height:'80px',background:'red',textAlign:'center',lineHeight:'80px'}} onClick={this.startCheckBalance}>开始查询</div>
      </div>
    )

  };

  startCheckBalance = ()=>{
    const address = this.state["currentAddress"]
    store.checkBalanceByTokenContractAddress(address)
  }

  onChange0 = (value, event) => {
    // console.log("111111111111111111")
    let val = []
    val["currentAddress"] = event.target.value
    this.setState(val)

  }
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


}

export default withNamespaces()(withRouter(withStyles(styles)(checkbalance)));
