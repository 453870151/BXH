import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

import { SaveToTwoWei,isNoEmpty,isEmpty, getStyleClass } from '../../config/constantFunction'

const styles = theme => ({
    usageRate: {
        marginTop: '20px',
    },
    usageRateTitle: {
        fontSize: '13px',
        textAlign: 'center',
        '& span': {
            color: '#30BD85',
            fontSize: '14px',
            fontWeight: 'bold',
            marginLeft: '5px',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '15px',
            '& span': {
                fontSize: '17px',
                marginLeft: '10px',
            }
        }
    },
    progressBar: {
        position: 'relative',
        height: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            height: '24px',
        }
    },
    progressBarBackLow: {
        position: 'absolute',
        left: '0',
        height: '5px',
        background: '#30BE85',
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            height: '8px',
        }
    },
    progressBarBackMedium: {
        position: 'absolute',
        left: '50%',
        height: '5px',
        background: '#FD770E',
        width: '35.5%',
        [theme.breakpoints.up('sm')]: {
            height: '8px',
        }
    },
    progressBarBackHigh: {
        position: 'absolute',
        right: '0',
        height: '5px',
        background: '#DD5044',
        width: '15.5%',
        [theme.breakpoints.up('sm')]: {
            height: '8px',
        }
    },
    progressBarArticle: {
        left: '0%',
        position: 'absolute',
        transform: 'translateX(-50%)',
        width: '12px',
        height: '15px',
        background: '#191B2E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '18px',
            height: '22px',
        }
    },
    progressBarArticleFore: {
        width: '4px',
        height: '15px',
        borderRadius: '2px',
        background: '#FFF',
        [theme.breakpoints.up('sm')]: {
            width: '10px',
            height: '22px',
            borderRadius: '5px',
        }
    },
    progressBarMark: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: '8px 5px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#A7A8B2',
        '& div': {
            flex: '1',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '8px 0',
        }
    },
})

class LoanUsageRate extends Component {
    render() {
        const { classes, t, totalDepositVal } = this.props;
        let { rate } = this.props;
        if (isEmpty(rate)) {
            rate = 0;
        }
        if (rate<0) {
            rate = 0;
        }else if(rate>100){
            rate = 100;
        }
        return (
            <div className={classes.usageRate}>
                <div className={classes.progressBarMark}>
                    <div>$0</div>
                    <div style={{flex:'2'}} className={classes.usageRateTitle}>{t('BXH.creditUtilizationRate')}<span>{SaveToTwoWei(rate)}%</span></div>
                    <div style={{textAlign:'right'}}>${isNoEmpty(totalDepositVal)?SaveToTwoWei(totalDepositVal,totalDepositVal<1?4:2):'0'}</div>
                </div>
                <div className={classes.progressBar}>
                    <div className={classes.progressBarBackLow} />
                    <div className={classes.progressBarBackMedium} />
                    <div className={classes.progressBarBackHigh} />
                    <div className={getStyleClass('PCbroot',classes.progressBarArticle)} style={{left:`${rate}%`}}>
                        <div className={classes.progressBarArticleFore} />
                    </div>
                </div>
                <div className={classes.progressBarMark}>
                    <div>{t('BXH.lowRisk')}</div>
                    <div style={{textAlign:'center'}}>{t('BXH.mediumRisk')}</div>
                    <div style={{textAlign:'right'}}>{t('BXH.highRisk')}</div>
                </div>
            </div>
        )
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(LoanUsageRate)));
