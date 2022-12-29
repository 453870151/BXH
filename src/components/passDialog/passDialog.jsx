import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import DefaultImage from '../defaultImage/defaultImage';
import { numberDecimal, toolNumber } from '../../config/constantFunction'
import {
  TextField,
  ClickAwayListener,
} from '@material-ui/core';
import CustomTooltip from '../customTooltip/customTooltip.jsx';
import Store from "../../stores";
import '../unlock/rotateTranstion.css';

import {
  GET_PASSEXCHANGE_PERPETUAL,
  GET_PASSEXCHANGE_PERPETUAL_RETURNED,
  GET_PASSEXCHANGE_REFRESH,
  SEARCHSYBMOL,
  SEARCHSYBMOL_RETURNED,
} from '../../constants'

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  bxhtzlistbg: {
    position: 'fixed',
    background: '#0E0F11',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    opacity: '.8',
    zIndex: '9999',
  },
  bxhtzlistcont: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%',
    background: '#262946',
    zIndex: '99999',
    borderRadius: '22px 22px 0 0',
    height: '350px',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
      left: '50%',
      marginLeft: '-150px',
      top: '50%',
      marginTop: '-230px',
      borderRadius: '22px',
      height: '490px',
    }
  },
  bxhtztitle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    padding: '20px 20px 0 20px',
  },
  bxhtzcolse: {
    width: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    '& img': {
      verticalAlign: 'middle',
      width: '15px',
      '&:hover': {
        opacity: '.8',
      }
    },
  },
  bxhtztcols: {
    width: '80%',
    fontSize: '17px',
    color: '#fff',
    fontWeight: '500',
    '& img': {
      width: '14px',
      marginLeft: '5px',
      cursor: 'pointer',
    },
  },
  bxhtzimliso: {
    padding: '20px',
  },
  BXHTokensInput: {
    background: '#1C1E22',
    borderRadius: '6px',
    paddingLeft: '15px',
    paddingRight: '10px',
    '& input': {
      fontFamily: "consola",
      fontSize: '14px',
      lineHeight: '25px',
      height: '25px',
      padding: '5px',
    }
  },
  bxhsyconter: {
    marginTop: '20px',
  },
  bxhsylist: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '25px',
    marginBottom: '20px',
    cursor: 'pointer',
    color: '#FFFFFF',
  },
  bxhsyname: {
    '& img': {
      width: '25px',
      verticalAlign: 'bottom',
      marginRight: '8px'
    },
    '& span': {
      display: 'inline-block',
      opacity: '.8',
      background: '#2EBC84',
      marginLeft: '10px',
      fontSize: '13px',
      lineHeight: '20px',
      padding: '0 8px',
      borderRadius: '8px',
    }
  },
  bxhtzsyscroll: {
    height: '220px',
    overflowY: 'scroll',
    marginTop: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '350px',
    }
  },
})


class PassDialog extends Component {
  constructor(props) {
    super(props);
    const { t, onClose, onSure } = this.props;
    const rewardSymbolList = store.getStore('rewardSymbolList');
    this.state = {
      onClose: onClose,
      onSure: onSure,
      modalMesage: false,
      rewardSymbolList: rewardSymbolList, // 选择通证列表
      searchSymbolList: rewardSymbolList,
      symbolInputValue: '', // 选择通证 输入框value
      notImages: false
    }
  }
  componentWillUnmount() {
    emitter.removeListener(GET_PASSEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);
    emitter.removeListener(GET_PASSEXCHANGE_REFRESH, this.passListRefresh);
    emitter.removeListener(SEARCHSYBMOL_RETURNED, this.resultSearch); // 搜索通证列表
    this.setState = (state, callback) => {
      return;
    }
  };
  componentDidMount() {
    emitter.on(GET_PASSEXCHANGE_PERPETUAL_RETURNED, this.balancesReturned);
    emitter.on(GET_PASSEXCHANGE_REFRESH, this.passListRefresh);
    emitter.on(SEARCHSYBMOL_RETURNED, this.resultSearch); // 搜索通证列表
    let token_list = null;
    if (JSON.parse(localStorage.getItem("symbolList"))) {
      // 取Storage数组
      token_list = JSON.parse(localStorage.getItem("symbolList"));
    }
    const symbolList = this.state.rewardSymbolList;
    dispatcher.dispatch({ type: GET_PASSEXCHANGE_PERPETUAL, content: {token_list: token_list, symbolList: symbolList} })
  }
  passListRefresh = () => {
    this.setState({});
  }
  balancesReturned = (rewardSymbolList) => {
    const{ symbolInputValue } = this.state
    if (rewardSymbolList && symbolInputValue === "") {
      this.setState({
        rewardSymbolList: rewardSymbolList,
        searchSymbolList: rewardSymbolList,
      })
    }
  }
  resultSearch = (rewardSymbolList) => {
    this.setState({
      rewardSymbolList: rewardSymbolList,
    })
  }
  //返回
  close = () => {
    if (this.state.onClose != null) {
      this.state.onClose();
    }
  }
  // 打开通证弹窗时候选中币种
  tokenSymbol = (symbolObj) => {
    this.close();
    if (this.state.onSure) {
      this.state.onSure(symbolObj);
    }
  }
  onSetMessageState = () => {
    this.setState({ modalMesage: true })
  }
  onCloseMessage = () => {
    this.setState({ modalMesage: false })
  }
  onChangeSymbol = (event) => {
    const { searchSymbolList } = this.state
    this.setState({notImages:false})
    this.setState({
      symbolInputValue: event.target.value,
    })
    dispatcher.dispatch({ type: SEARCHSYBMOL, content: { symbolList: searchSymbolList, searchValue: event.target.value } })
  }
  sortNumber = (property, symbol) => {
    return function (a, b) {
      if (b[symbol] != 'HT') {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    }
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  render() {
    const { classes, t } = this.props;
    return (
      <div>
        <div className={classes.bxhtzlistbg} onClick={(e) => { this.close(e) }}></div>
        <div className={classes.bxhtzlistcont}>
          <div className={classes.bxhtztitle}>
            <div className={classes.bxhtztcols}>{t('BXH.dhtongzheng')}
              <ClickAwayListener onClickAway={this.onCloseMessage}>
                <CustomTooltip title='Find a token by searching for its name or symbol or by pasting its address below.'
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
                  <img src={require('../../assets/bxh/wenti.png')} onClick={() => { this.onSetMessageState() }} />
                </CustomTooltip>
              </ClickAwayListener>
            </div>
            <div className={classes.bxhtzcolse} onClick={(e) => { this.close(e) }}>
              <img src={require('../../assets/bxh/tokenClose.png')} />
            </div>
          </div>

          <div className={classes.bxhtzimliso}>
            {/* 输入框 */}
            {this.renderInput()}
            {/* 兑换币种列表 */}
            <div className={classes.bxhtzsyscroll}>
              {this.renderSymbolList()}
            </div>
          </div>

        </div>
      </div>
    )
  };
  renderInput = () => {
    const { classes, t } = this.props
    const { symbolInputValue } = this.state
    return (
      <div className={classes.valContainer}>
        <TextField
          fullWidth
          className={classes.BXHTokensInput}
          placeholder={t('BXH.dhSearch')}
          value={symbolInputValue || ''}
          onChange={this.onChangeSymbol.bind(this)}
          variant="outlined"
        //   inputProps={{
        //     autocomplete: 'off' // 禁掉自动填充
        //   }}
        // autoFocus // 自动获得焦点
        />
      </div>
    )
  }

  // 兑换币种列表
  renderSymbolList = () => {
    const rewardSymbolList = this.state.rewardSymbolList;
    if (rewardSymbolList && rewardSymbolList.length > 0) {
      const sortList = rewardSymbolList.sort(this.sortNumber('balance', 'symbol'))
      return sortList.map((symbolObj, index) => {
        return this.renderSymbolPoolList(symbolObj, index);
      })
    } else {
      return null;
    }
  }
  renderSymbolPoolList = (symbolObj, index) => {
    const { classes } = this.props;
    const { notImages } = this.state
    return (
      <div key={index} onClick={() => { this.tokenSymbol(symbolObj) }}>
        <div className={classes.bxhsylist}>
          <div className={classes.bxhsyname}>
            {/* {
              !notImages ?
                <img src={symbolObj.logoURI}
                  onError={() => { this.handleImageErrored() }}
                />
                :
                <img src={require('../../assets/bxh/BXHtong.png')} />
            } */}
            <DefaultImage key={symbolObj.symbol} src={symbolObj.logoURI} />
            {symbolObj.symbol}
            {
              symbolObj.status === 1 ?
                <span onClick={() => { this.storageAddToken(symbolObj) }}>Add</span>
                :
                null
            }
          </div>
          {
            symbolObj.balance!=undefined&&symbolObj.balance!=null?
            <div>{symbolObj.balance ? numberDecimal(symbolObj.balance) : '0'}</div>
            :
            <div style={{width:'20px',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <img src={ require('../../assets/bxh/send_small.png') } alt='' className='passBalanceRotateImage' />
            </div>
          }
        </div>
      </div>
    )
  }

  // 图片加载失败，将默认值赋值给src
  handleImageErrored() {
    this.setState({ notImages: true });
  }

  storageAddToken = (symbol) => {
    // 取Storage数组
    let getSymbolList = JSON.parse(localStorage.getItem('addSymbolList'))
    // 存Storage数组
    let addArrayList = []
    if(getSymbolList){
      addArrayList = getSymbolList
      addArrayList.push(symbol)
    }else{
      addArrayList.push(symbol)
    }
    localStorage.setItem("addSymbolList", JSON.stringify(addArrayList));
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(PassDialog)));
