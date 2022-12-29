import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { numberDecimal, toolNumber,_getValuemultip1, _getValueDivided1,_getValuemultip } from '../../config/constantFunction'
import {
  TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  cookbg: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '999',
  },
  cookcont: {
    position: 'fixed',
    bottom: '0%',
    left: '0px',
    right: '0px',
    background: '#262946',
    fontWeight: '500',
    borderRadius: '8px 8px 8px 8px',
    zIndex: '99999',
  },
  cookcont_pc: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    background: '#262946',
    fontWeight: '500',
    borderRadius: '8px 8px 8px 8px',
    zIndex: '99999',
    width: '400px',
    marginLeft: '-200px',
    marginTop: '-200px'

  },
  toptitle: {
    marginLeft: '25px',
    marginTop: '15px',
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '17px',
    },
  },
  CloseImg: {
    position: 'absolute',
    left: '90%',
    marginLeft: '0px',
    top: '19px',
    width: '15px !important',
    cursor: 'pointer',
  },
  CountParent: {
    marginTop: '20px',
    marginLeft: '25px',
    '& i': {
      fontStyle: 'inherit',
      color: '#30BE85',
      fontWeight: 'bold',
      fontSize: '32px',
      display: 'inline-block',
      verticalAlign: 'middle',
      fontFamily: "consola",
    }
  },
  AmountUnit: {
    fontStyle: 'inherit',
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: '12px',
    display: 'inline-block',
    verticalAlign: 'sub',
    marginLeft: '5px'
  },
  Tip1: {
    color: '#FFFFFF',
    opacity: 0.4,
    fontSize: '14px',
    fontWeight: 'bold',
    marginLeft: '25px'
  },
  Tip2: {
    color: '#FFFFFF',
    opacity: 0.3,
    fontSize: '11px',
    marginLeft: '25px'
  },
  detailInfo: {
    background: 'rgba(20, 22, 47, 0.6)',
    padding: '20px 20px 20px 20px',
    borderRadius: '8px 8px 8px 8px',
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '26px',
  },
  tiptitle: {
    color: '#FFFFFF',
    opacity: 0.4,
    fontSize: '13px',
    paddingTop: '-2px'
  },
  tiptitle1: {
    color: '#FFFFFF',
    opacity: 0.4,
    fontSize: '13px',
    paddingTop: '3px'
  },
  contentdetail: {
    color: '#FFFFFF',
    fontSize: '13px',
    position: 'absolute',
    right: 35,
    marginTop: '3px',
    fontFamily: "consola",
  },
  parent1: {
    marginTop: '7px'
  },
  parent2: {
    marginTop: '20px',
    display: 'flex'
  },
  confirmbtn: {
    width: '80%',
    height: '45px',
    borderRadius: '8px 8px 8px 8px',
    backgroundImage: 'linear-gradient(to right, #2EBC84, #35C288)',
    fontSize: '16px',
    textAlign: 'center',
    margin: '0 auto',
    lineHeight: '45px',
    marginTop: '30px',
    marginBottom: '15px',
    cursor: 'pointer',
  },
  changeParent: {
    '& span': {
      display: 'block',
      fontWeight: 'bold',
      fontSize: '17px',
    },
  },
  changeImg: {
    width: '15px !important',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  huilvParent: {
    position: 'absolute',
    right: '35px',
    marginLeft: '0px'
  },
  huilv1: {
    color: '#D2D3D4',
    fontSize: '13px',
    fontFamily: "consola",
  },
  huilv2: {
    color: '#D2D3D4',
    fontSize: '13px',
    opacity: 0.6,
    fontFamily: "consola",
  }

})


class BottomReceivedDialog extends Component {
  constructor(props) {
    super(props);

    const { onClose, onSure, caluData, tokensData, pairData, amount0, amount1, isHave } = this.props;

    this.state = {
      isShow: false,
      aboutlink: false,
      onClose: onClose,
      onSure: onSure,
      tokensData: tokensData,
      pairData: pairData,
      caluData: caluData,
      amount0: amount0,
      amount1: amount1,
      isReserve: false,
      isMobile: null,
      isHave: isHave
    }

  }

  // 组件加载完毕 启动定时器
  componentDidMount() {
    setTimeout(this.iTimer, 0);

    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
  }
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }
  handleResize = e => {
    if (this._isMobile()) { // 移动端
      this.setState({ isMobile: 2 })
    } else {  // PC端
      this.setState({ isMobile: 1 })
    }
  }

  render() {
    const { classes, t, i18n, closeListener, openListener } = this.props;
    const { caluData, tokensData, pairData, amount0, amount1, isReserve, isMobile, isHave } = this.state
    let chainID = localStorage.getItem('chainIDSwitch')
    return (
      <div>
        <div className={classes.cookbg}></div>
        <div className={[isMobile == 2 ? classes.cookcont : classes.cookcont_pc, chainID === '56' ? "bscPCdiagleftbg" : chainID === '66' ? "okexPCdiagleftbg" : chainID === '1' ? "ethPCdiagleftbg" : "hecoPCdiagleftbg"].join(' ')}>
          <div className={classes.toptitle}>
            {
              isHave ?
                <span onClick={closeListener}>{t('BXH.jiangshoudao')}</span>
                :
                <span onClick={closeListener}>{t('BXH.confirm')}</span>
            }
            <img src={require('../../assets/bxh/dialogclose.png')} className={classes.CloseImg} onClick={() => { this.close() }} />
          </div>

          {
            isHave ?
              <div>
                <div className={classes.CountParent}>
                  <i className={[chainID === '56' ? 'bscfonttab' : chainID === '66' ? 'okexfonttab' : chainID === '1' ? 'ethfonttab' : 'hecofonttab'].join(' ')}>
                    {
                      caluData && amount0 && amount1 ?
                      _getValuemultip(_getValueDivided1(caluData[0].tokens[0].isReserve?amount1:amount0,caluData[0].tokens[0].reserveA),caluData[0].tokens[0].poolTotal,8)
                        :
                        "0"
                    }
                  </i>

                  <span className={classes.AmountUnit}>{pairData ? pairData.symbolPair : ""}</span>
                </div>

                <div className={classes.Tip1}>{t('BXH.shoudaotip1')}</div>
                <div className={classes.Tip2}>{t('BXH.shoudaotip2')}</div>
              </div>
              :
              null
          }

          <div className={[classes.detailInfo, chainID === '56' ? "bscPCDialogbg" : chainID === '66' ? 'okexPCDialogbg1' : chainID === '1' ? 'ethPCtdDialogbg' : "hecoPCDialogbg"].join(' ')}>
            <div>
              <span className={classes.tiptitle}>{pairData ? pairData.symbol0 : ""}{t('BXH.shoudaocunru')}</span>
              <span className={classes.contentdetail}>{numberDecimal(parseFloat(amount0))}</span>
            </div>
            <div className={classes.parent1}>
              <span className={classes.tiptitle}>{pairData ? pairData.symbol1 : ""}{t('BXH.shoudaocunru')}</span>
              <span className={classes.contentdetail}>{numberDecimal(parseFloat(amount1))}</span>
            </div>
            {
              isHave ?
                <div className={classes.parent2}>
                  <span className={classes.tiptitle1}>{t('BXH.huilvtitle')}</span>
                  {
                    isReserve ?
                      <div className={classes.huilvParent}>
                        <span className={classes.huilv1}>{caluData ? numberDecimal(parseFloat(caluData[0].tokens[0].tokenB / caluData[0].tokens[0].tokenA)) : "0"}</span>
                        <span className={classes.huilv1}></span>&nbsp;
                                <span className={classes.huilv2}>{pairData ? pairData.symbol1 + " per " + pairData.symbol0 : ""}</span>
                        <img src={require('../../assets/bxh/ziyuan.png')} className={classes.changeImg} onClick={() => { this.changeReverse() }} />
                      </div>
                      :
                      <div className={classes.huilvParent}>
                        <span className={classes.huilv1}>{caluData ? numberDecimal(parseFloat(caluData[0].tokens[0].tokenA / caluData[0].tokens[0].tokenB)) : "0"}</span>
                        <span className={classes.huilv1}></span>&nbsp;
                                <span className={classes.huilv2}>{pairData ? pairData.symbol0 + " per " + pairData.symbol1 : ""}</span>
                        <img src={require('../../assets/bxh/ziyuan.png')} className={classes.changeImg} onClick={() => { this.changeReverse() }} />
                      </div>
                  }

                </div>
                :
                <div className={classes.parent2}>
                  <span className={classes.tiptitle1}>{t('BXH.huilvtitle')}</span>
                  {
                    isReserve ?
                      <div className={classes.huilvParent}>
                        <span className={classes.huilv1}>{amount0 && amount1 ? numberDecimal(parseFloat(amount1 / amount0)) : "0"}</span>
                        <span className={classes.huilv1}></span>&nbsp;
                                <span className={classes.huilv2}>{pairData ? pairData.symbol1 + " per " + pairData.symbol0 : ""}</span>
                        <img src={require('../../assets/bxh/ziyuan.png')} className={classes.changeImg} onClick={() => { this.changeReverse() }} />
                      </div>
                      :
                      <div className={classes.huilvParent}>
                        <span className={classes.huilv1}>{amount0 && amount1 ? numberDecimal(parseFloat(amount0 / amount1)) : "0"}</span>
                        <span className={classes.huilv1}></span>&nbsp;
                                <span className={classes.huilv2}>{pairData ? pairData.symbol0 + " per " + pairData.symbol1 : ""}</span>
                        <img src={require('../../assets/bxh/ziyuan.png')} className={classes.changeImg} onClick={() => { this.changeReverse() }} />
                      </div>
                  }

                </div>
            }

            {
              isHave ?
                <div className={classes.parent1}>
                  <span className={classes.tiptitle}>{t('BXH.zijinchifene')}</span>
                  <span className={classes.contentdetail}>
                    {
                      caluData && amount0 && numberDecimal(parseFloat((amount0 / caluData[0].tokens[0].reserveA) * 100)) > 0.01 ?
                        numberDecimal(parseFloat((amount0 / (parseFloat(caluData[0].tokens[0].reserveA) + parseFloat(amount0))) * 100)) + "%"
                        :
                        "<0.01%"
                    }
                  </span>
                </div>
                :
                <div className={classes.parent1}>
                  <span className={classes.tiptitle}>{t('BXH.zijinchifene')}</span>
                  <span className={classes.contentdetail}>
                    100%
            </span>
                </div>
            }

          </div>

          <div className={[classes.confirmbtn, chainID === '56' ? 'bscPC_new_btn1' : chainID === '66' ? 'okexPC_new_btn1' : chainID === '1' ? 'ethPC_new_btn1' : 'hecoPC_new_btn1'].join(' ')} onClick={() => { this.sure() }}>{t('BXH.confirmtitle')}</div>
        </div>
      </div>
    )
  };

  close = () => {
    if (this.state.onClose != null) {
      this.state.onClose();
    }
  }

  sure = () => {
    if (this.state.onSure != null) {
      this.state.onSure();
    }
  }

  changeReverse = () => {
    this.setState({ isReserve: !this.state.isReserve })
  }

  SaveToTwoWei = (number, scale) => {
    var scaleP = Math.pow(10, scale);
    var result = Math.floor(number * scaleP) / scaleP;
    return result;
  }

  _getToolNumber = (num_str) => {
    num_str = num_str.toString();
    if (num_str.indexOf("+") != -1) {
      num_str = num_str.replace("+", "");
    }
    if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
      var resValue = "",
        power = "",
        result = null,
        dotIndex = 0,
        resArr = [],
        sym = "";
      var numStr = num_str.toString();
      if (numStr[0] == "-") {
        // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
        numStr = numStr.substr(1);
        sym = "-";
      }
      if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
        var regExp = new RegExp(
          "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
          "ig"
        );
        result = regExp.exec(numStr);
        if (result != null) {
          resValue = result[2];
          power = result[5];
          result = null;
        }
        if (!resValue && !power) {
          return false;
        }
        dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
        resValue = resValue.replace(".", "");
        resArr = resValue.split("");
        if (Number(power) >= 0) {
          var subres = resValue.substr(dotIndex);
          power = Number(power);
          //幂数大于小数点后面的数字位数时，后面加0
          for (var i = 0; i < power - subres.length; i++) {
            resArr.push("0");
          }
          if (power - subres.length < 0) {
            resArr.splice(dotIndex + power, 0, ".");
          }
        } else {
          power = power.replace("-", "");
          power = Number(power);
          //幂数大于等于 小数点的index位置, 前面加0
          for (var i = 0; i < power - dotIndex; i++) {
            resArr.unshift("0");
          }
          var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
          resArr.splice(n, 0, ".");
        }
      }
      resValue = resArr.join("");

      return sym + resValue;
    } else {
      return num_str;
    }
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(BottomReceivedDialog)));

