import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
    Card,
} from '@material-ui/core';

const styles = theme => ({
    mainBg: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(12, 13, 14, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:'999999',
    },
    content: {
        borderRadius: '12px',
        background: '#262946',
        padding: '20px',
        fontSize: '14px',
        fontWeight: '500',
        color: 'rgba(255,255,255,0.7)',
        width: '80%',
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '60%',
            maxWidth: '600px',
        }
    },
})

class MessageDialog extends Component {
  constructor(props){
    super(props);
    const { onClose, message } = this.props;
    var tempMsg = message
    if (tempMsg==undefined||tempMsg==null) {
        tempMsg = "";
    }
    this.state = {
        onClose: onClose,
        message: tempMsg,
    };
  }
  close = (e) => {
    e.stopPropagation();
    if (this.state.onClose!=null) {
        this.state.onClose();
    }
  }
  render() {
    const { classes, t } = this.props;
    const { message } = this.state;
    return (
        <div className={classes.mainBg} onClick={this.close}>
            <Card className={classes.content}>{message}</Card>
        </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(MessageDialog)));
