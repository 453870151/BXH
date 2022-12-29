import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Card,
} from '@material-ui/core';
import Store from "../../stores";
import moment from 'moment';
import { toShowDollar, SaveToTwoWei } from '../../config/constantFunction';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '999999',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        borderRadius: '22px 22px 0 0',
        overflow: 'hidden',
        background: '#262946',
        color: '#FFFFFF',
        fontSize: '14px',
        [theme.breakpoints.up('sm')]: {
            borderRadius: '22px',
            position: 'relative',
            width: '460px',
        }
    },
    close: {
        position: 'absolute',
        right: '20px',
        top: '15px',
        padding: '5px',
        cursor: 'pointer',
    },
    content: {
        marginTop: '50px',
        padding: '0 20px 40px',
        color: '#FFFFFF',
        maxHeight: '80vh',
        overflowY: 'scroll',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& img': {
            width: '50px',
            height: '50px',
        },
        '& span': {
            marginTop: '12px',
            fontSize: '24px',
            fontWeight: 'bold',
        },
    },
    desc: {
        margin: '25px 5px 0',
        fontSize: '13px',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'justify',
    },
    line: {
        marginTop: '25px',
        backgroundColor: 'rgba(15, 16, 17, 0.4)',
        height: '1px',
    },
    info: {
        margin: '20px 5px 0',
    },
    row: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& div': {
            fontWeight: '400',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.8)',
        },
        '& span': {
            fontWeight: 'bold',
            fontSize: '13px',
            textAlign: 'right',
            wordBreak: 'break-all',
            wordWrap: 'break-word',
        },
    },
    viewProjectWebsite: {
        marginTop: '25px',
        color: '#2EBC84',
        fontWeight: 'bold',
        fontSize: '13px',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(80%)',
        },
        '&:active': {
            filter: 'brightness(50%)',
        },
    },
})

class BurningDigDialog extends Component {
  constructor(props){
    super(props);
    const { onClose, obj } = this.props;
    this.state = {
        onClose: onClose,
        obj: obj,
    };
  }
  close = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
  }
  viewProjectWebsite = () => {
      window.open(this.state.obj.project_url)
  }
  render() {
    const { classes, t } = this.props;
    const { obj } = this.state;
    return (
        <div className={classes.mainBg} onClick={this.close}>
            <Card className={classes.card} onClick={(e) => {e.stopPropagation();}}>
                <div className={classes.close} onClick={ this.close }>
                    <img src={ require('../../assets/bxh/tokenClose.png') } alt='' style={{width:'15px',height:'15px'}}/>
                </div>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <img src={obj.project_icon ? obj.project_icon : ''} alt='' />
                        <span>{obj.project_name}</span>
                    </div>
                    <div className={classes.desc}>{obj.project_info}</div>
                    <div className={classes.line}></div>
                    <div className={classes.info}>
                        <div className={classes.row}>
                            <div>{t('BXH.releaseTime')}</div>
                            <span>{moment(obj.launch_time*1000).format('YYYY/MM/DD HH:mm')}</span>
                        </div>
                        <div className={classes.row}>
                            <div>{t('BXH.quantityForSale')}</div>
                            <span>{toShowDollar(SaveToTwoWei(obj.for_sale,2))} {obj.project_name}</span>
                        </div>
                        <div className={classes.row}>
                            <div>To raise(USDT)</div>
                            <span>${toShowDollar(SaveToTwoWei(obj.to_raise,2))}</span>
                        </div>
                        <div className={classes.row}>
                            <div>{t('BXH.toBeDestroyedBXH')}</div>
                            <span>{toShowDollar(SaveToTwoWei(obj.bxh_burn,2))}</span>
                        </div>
                        <div className={classes.row}>
                            <div>Total raised (% of target)</div>
                            <span>{obj.totalRaised?SaveToTwoWei(obj.totalRaised)+'%':'--'}</span>
                        </div>
                        <div onClick={this.viewProjectWebsite} className={classes.viewProjectWebsite}>{t('BXH.viewProjectWebsite')}</div>
                    </div>
                </div>
            </Card>
        </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(BurningDigDialog)));
