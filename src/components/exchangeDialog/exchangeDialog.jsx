import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Card,
    ClickAwayListener,
} from '@material-ui/core';
import {
    numberDecimal,
    _getValuemultip1,
    _getValueDivided1,
    _getValueDivided3,
    _getValueAdd,
  } from '../../config/constantFunction'
import CustomTooltip from '../customTooltip/customTooltip.jsx';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999999',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        background: '#262946',
        padding: '15px',
        paddingBottom: '30px',
        fontSize: '14px',
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
    exchangeContent: {
        margin: '20px 25px 0',
        fontSize: '13px',
    },
    exchangeContentCoin: {
        padding: '0 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '45px',
        fontWeight: 'bold',
    },
    exchangeContentCoinCount: {
        fontFamily: "consola",
        marginLeft: '8px',
        fontSize: '16px',
    },
    exchangeContentCoinName: {
        marginLeft: '8px',
        fontSize: '15px',
    },
    exchangeDesc: {
        marginTop: '20px',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '500',
    },
    exchangeDescCount: {
        fontFamily: "consola",
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '12px',
        background: '#21233C',
        marginTop: '12px',
        padding: '20px',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    cardRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
    },
    cardRowTitle: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            cursor: 'pointer',
        }
    },
    cardBoldText: {
        fontFamily: "consola",
        fontWeight: 'bold',
        fontSize: '14px',
    },
    nextBtn: {
        backgroundImage: 'linear-gradient(to right, #2EBC84 , #35C288)',
        margin: '30px 20px 0',
        height: '45px',
        lineHeight: '45px',
        textAlign: 'center',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #10754c, #1a9564)',
        }
    },
    closeon: {
        cursor: 'pointer',
        '& img': {
            width: '15px',
            cursor: 'pointer',
            '&:hover': {
                opacity: '.8',
            }
        }
    }
})

class ExchangeDialog extends Component {
    constructor(props) {
        super(props);
        const {
            onClose,
            onNext,
            dialogArray,
            point,
            symbolStatus,
            formSymbol,
            toSymbol,
            formInputValue,
            toInputValue,
            valuePriceInput,
        } = this.props;

        this.state = {
            onClose: onClose,
            onNext: onNext,
            priceChange: "<0.01%",
            dialogArray: dialogArray,
            point: point,
            symbolStatus: symbolStatus,
            formSymbol: formSymbol,
            toSymbol: toSymbol,
            formInputValue: formInputValue,
            toInputValue: toInputValue,
            symbolArray: [],
            openMiniAmountQuestion: false,
            openCostQuestion: false,
            openPriceQuestion: false,
            priceMath: '',
            valuePriceInput:valuePriceInput
        }
        setTimeout(() => {
            this.calcPriceChangeValue(1, formInputValue, toInputValue, valuePriceInput)
          }, 1)
        
    }

    handleMiniAmountTooltipClose = () => {
        this.setState({ openMiniAmountQuestion: false });
    };

    handleMiniAmountTooltipOpen = () => {
        this.setState({ openMiniAmountQuestion: true });
    };
    handleCostQuestionTooltipClose = () => {
        this.setState({ openCostQuestion: false });
    };

    handleCostQuestionTooltipOpen = () => {
        this.setState({ openCostQuestion: true });
    };
    handlePriceQuestionTooltipClose = () => {
        this.setState({ openPriceQuestion: false });
    };

    handlePriceQuestionTooltipOpen = () => {
        this.setState({ openPriceQuestion: true });
    };

    componentWillMount() {
        const { t } = this.props;
        const {
            symbolStatus,
            dialogArray,
            point,
            formSymbol,
            toSymbol,
            formInputValue,
            toInputValue
        } = this.state
        if (!dialogArray) {
            return
        }
        // console.log('dialogArray==>', dialogArray)
        this.setState({
            symbolArray: {
                fromSymbol: dialogArray.formSymbol['symbol'],
                fromLogoURI: dialogArray.formSymbol ? dialogArray.formSymbol['logoURI'] : null,
                fromPrice: dialogArray.formInputValue,
                toSymbol: dialogArray.toSymbol['symbol'],
                toLogoURI: dialogArray.toSymbol ? dialogArray.toSymbol['logoURI'] : null,
                toPrice: dialogArray.toInputValue,
                // 到账最少数量 To数量 - （To数量 * 滑点大小 / 100）
                fromtoNumber: Math.abs(dialogArray.toInputValue - (dialogArray.toInputValue * point / 100)),
                // 卖出最多数量 From数量 + (From数量 * 0.003) +（From数量 * 滑点大小 / 100）
                fromtoNumber2: dialogArray.formInputValue * 1 + dialogArray.formInputValue * 0.003 + (dialogArray.formInputValue * point / 100),
                fromtoDesc1: t('BXH.exchangeDesc1'),
                fromtoDesc2: t('BXH.dhSales'),
                symbolStatus: dialogArray.symbolStatus,
                // 流动资金提供者费用
                formInputValue: numberDecimal(dialogArray.formInputValue * 0.003),
                // 价格
                // priceFromSymbol: dialogArray.fromPrice,
                // priceFromSymbol: formSymbol.symbol,
                // priceToSymbol: toSymbol.symbol,
                // priceNumber: numberDecimal(rewardSymbolPrice.fromToPrice),
            }
        })
    }

    SaveToTwoWei = (number, scale) => {
        var scaleP = Math.pow(10, scale);
        var result = Math.floor(number * scaleP) / scaleP;
        return result;
    }

    render() {
        const { classes, t } = this.props;
        const { priceChange, reservesSuan, point, symbolStatus, symbolArray, priceMath } = this.state;

        return (
            <div className={classes.mainBg} onClick={(e) => { e.stopPropagation(); if (this.state.onClose != null) { this.state.onClose(); } }}>
                <div className={classes.content} onClick={(e) => { e.stopPropagation() }} >
                    <div className={classes.top}>
                        <div className={classes.title}>{t('BXH.confirmExchange')}</div>
                        <div onClick={this.state.onClose} className={classes.closeon}>
                            <img src={require('../../assets/bxh/tokenClose.png')} />
                        </div>
                    </div>

                    <div className={classes.exchangeContent}>
                        {/* From 币种 */}
                        <div className={classes.exchangeContentCoin}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={symbolArray.fromLogoURI ? symbolArray.fromLogoURI : require('../../assets/bxh/BXHtong.png')} style={{ width: '25px', height: '25px' }} />
                                <label className={classes.exchangeContentCoinCount}>
                                    {symbolArray.fromPrice}
                                </label>
                            </span>
                            <div className={classes.exchangeContentCoinName}>
                                {symbolArray.fromSymbol}
                            </div>
                        </div>
                        <div style={{ margin: '5px 18px', height: '18px' }}><img src={require('../../assets/exchange_down.png')} alt='' style={{ width: '8px', height: '18px' }} /></div>
                        {/* To 币种 */}
                        <div className={classes.exchangeContentCoin}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={symbolArray.toLogoURI ? symbolArray.toLogoURI : require('../../assets/bxh/BXHtong.png')} style={{ width: '25px', height: '25px' }} />
                                <label className={classes.exchangeContentCoinCount}>
                                    {symbolArray.toPrice}
                                </label>
                            </span>
                            <div className={classes.exchangeContentCoinName}>
                                {symbolArray.toSymbol}
                            </div>
                        </div>
                        {/* 到账最少数量 or 卖出最多数量 */}
                        {
                            symbolArray.symbolStatus === 1 ?
                                <div className={classes.exchangeDesc}>
                                    {symbolArray.fromtoDesc1}
                                    <span className={classes.exchangeDescCount}>
                                        &nbsp;{numberDecimal(symbolArray.fromtoNumber)}&nbsp;
                                    {symbolArray.toSymbol}&nbsp;
                                </span>
                                    {t('BXH.dhrestoreds')}
                                </div>
                                :
                                <div className={classes.exchangeDesc}>
                                    {symbolArray.fromtoDesc2}
                                    <span className={classes.exchangeDescCount}>
                                        &nbsp;{numberDecimal(symbolArray.fromtoNumber2)}&nbsp;
                                    {symbolArray.fromSymbol}&nbsp;
                                </span>
                                    {t('BXH.dhrestoreds')}
                                </div>
                        }
                    </div>
                    <Card className={classes.card}>
                        {/* 价格 */}
                        <div className={classes.cardRow}>
                            <div className={classes.cardRowTitle}>{t('BXH.price')}</div>
                            <div className={classes.cardBoldText} style={{ color: '#FFFFFF', fontSize: '12px' }}>{numberDecimal(_getValueDivided1(symbolArray.fromPrice, symbolArray.toPrice))} {symbolArray.fromSymbol} per {symbolArray.toSymbol}</div>
                        </div>
                        {/* 预计到账最少数量 */}
                        <div className={classes.cardRow}>
                            <div className={classes.cardRowTitle}>
                                {
                                    symbolArray.symbolStatus === 1 ?
                                        <label>{symbolArray.fromtoDesc1}</label>
                                        :
                                        <label>{symbolArray.fromtoDesc2}</label>
                                }
                                <ClickAwayListener onClickAway={this.handleMiniAmountTooltipClose}>
                                    <CustomTooltip title="Your transaction will revert if there is a large，unfavorable price movement before it is confirmed."
                                        PopperProps={{
                                            disablePortal: true,
                                        }}
                                        onClose={this.handleMiniAmountTooltipClose}
                                        open={this.state.openMiniAmountQuestion}
                                        disableFocusListener
                                        disableHoverListener
                                        disableTouchListener
                                        arrow
                                        placement="bottom-end">
                                        <img onClick={this.handleMiniAmountTooltipOpen} src={require('../../assets/bxh/wenti.png')} alt='' style={{ marginLeft: '2px', width: '14px', height: '14px' }} />
                                    </CustomTooltip>
                                </ClickAwayListener>
                            </div>
                            <div className={classes.cardBoldText}>
                                {
                                    symbolArray.symbolStatus === 1 ?
                                        <span>
                                            {numberDecimal(symbolArray.fromtoNumber)}&nbsp;
                                        {symbolArray.toSymbol}
                                        </span>
                                        :
                                        <span>
                                            {numberDecimal(symbolArray.fromtoNumber2)}&nbsp;
                                        {symbolArray.fromSymbol}
                                        </span>
                                }
                            </div>
                        </div>
                        {/* 价格变动 */}
                        <div className={classes.cardRow}>
                            <div className={classes.cardRowTitle}>
                                <label>{t('BXH.priceChange')}</label>
                                <ClickAwayListener onClickAway={this.handlePriceQuestionTooltipClose}>
                                    <CustomTooltip title="The difference between the market price and estimated price due to rade size."
                                        PopperProps={{
                                            disablePortal: true,
                                        }}
                                        onClose={this.handlePriceQuestionTooltipClose}
                                        open={this.state.openPriceQuestion}
                                        disableFocusListener
                                        disableHoverListener
                                        disableTouchListener
                                        arrow
                                        placement="bottom-end">
                                        <img onClick={this.handlePriceQuestionTooltipOpen} src={require('../../assets/bxh/wenti.png')} alt='' style={{ marginLeft: '2px', width: '14px', height: '14px' }} />
                                    </CustomTooltip>
                                </ClickAwayListener>
                            </div>
                            <div className={classes.cardBoldText} style={{ color: '#35C288', opacity: '.7' }}>
                                {/* {
                                numberDecimal(rewardSymbolPrice.priceChangeMath) < '0.02' ?
                                    <span>{ priceChange }</span>
                                    :
                                    <span>{ this.SaveToTwoWei(rewardSymbolPrice.priceChangeMath,2) }%</span>
                            } */}
                                {
                                    priceMath < 0.01 ?
                                        <span>{priceChange}</span>
                                        :
                                        <span>{this.SaveToTwoWei(priceMath, 2)}%</span>
                                }
                            </div>
                        </div>
                        {/* 流动资金提供者费用 */}
                        <div className={classes.cardRow}>
                            <div className={classes.cardRowTitle}>
                                <label>{t('BXH.workingCapitalProviderFees')}</label>
                                <ClickAwayListener onClickAway={this.handleCostQuestionTooltipClose}>
                                    <CustomTooltip title="A portion of each trade(0.30%) goes to liquidity providers as a protocol incentive."
                                        PopperProps={{
                                            disablePortal: true,
                                        }}
                                        onClose={this.handleCostQuestionTooltipClose}
                                        open={this.state.openCostQuestion}
                                        disableFocusListener
                                        disableHoverListener
                                        disableTouchListener
                                        arrow
                                        placement="bottom-end">
                                        <img onClick={this.handleCostQuestionTooltipOpen} src={require('../../assets/bxh/wenti.png')} alt='' style={{ marginLeft: '2px', width: '14px', height: '14px' }} />
                                    </CustomTooltip>
                                </ClickAwayListener>
                            </div>
                            <div className={classes.cardBoldText}>
                                {symbolArray.formInputValue}
                            &nbsp;{symbolArray.fromSymbol}
                            </div>
                        </div>
                    </Card>
                    <div className={classes.nextBtn} onClick={this.nextAction}>
                        {t('BXH.confirmExchange')}
                    </div>
                </div>
            </div>
        )
    };
    nextAction = () => {
        this.state.onNext();
    }


    calcPriceChangeValue = (symbolStatus, formInputValue, toInputValue, amount) => {
        let priceMath
        if (symbolStatus === 1) {
            // priceMath = parseFloat(numberDecimal(_getValueDivided3(formInputValue/toInputValue, 1/amount) * 100))

            let currentPrice = _getValueDivided1(0.001, amount) //除 得到当前价格
            let laterPrice_temp = _getValueDivided1(formInputValue, toInputValue)
            let laterPrice = Math.abs(_getValueDivided3(laterPrice_temp, currentPrice)) //减
            // let currentPrice100 = _getValuemultip1(currentPrice,100) //乘
            priceMath = _getValuemultip1(_getValueDivided1(laterPrice, currentPrice), 100)
        } else {
            // priceMath = parseFloat(numberDecimal(_getValueDivided3(formInputValue/toInputValue, amount/1) * 100))

            let currentPrice = _getValueDivided1(amount, 0.001) //除
            let laterPrice_temp = _getValueDivided1(formInputValue, toInputValue)
            let laterPrice = Math.abs(_getValueDivided3(laterPrice_temp, currentPrice)) //减
            // let currentPrice100 = _getValuemultip1(currentPrice,100)
            priceMath = _getValuemultip1(_getValueDivided1(laterPrice, currentPrice), 100)
        }

        this.setState({ priceMath: priceMath })
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(ExchangeDialog)));
