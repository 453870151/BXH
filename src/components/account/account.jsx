import React, { Component, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
  Typography,
  Button,
} from '@material-ui/core';
import { colors } from '../../theme/theme'

import UnlockModal from '../unlock/unlockModal.jsx'
import RefreshIcon from '@material-ui/icons/Refresh';
import Lang from '../unlock/Lang.jsx'
import LangM from '../unlock/LangM.jsx'

import {
  ERROR,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE,
  CONFIGURE_RETURNED
} from '../../constants/constants'

import Store from "../../stores/store";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vw',
    padding: '20px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '600px',
    }
  },
  connectHeading: {
    maxWidth: '300px',
    textAlign: 'center',
    color: '#FFFFFE',
    margin: '30px 0',
    '& h3': {
      fontWeight: '1',
      fontSize: '18px',
    },
  },
  connectContainer: {
    padding: '20px',
    width: '100%',
    textAlign: 'center',
  },
  actionButton: {
    color: '#2E80EC',
    // border: '1px solid #2E80EC',
    borderRadius: '10px',
    width: '100%',
    '& p': {
      fontSize: '18px',
    },
  },
  actionPCButton: {
    maxWidth: '300px'
  },
  notConnectedRoot: {
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  connectedRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  },
  address: {
    color: colors.white,
    width: '100%',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  balances: {
    color: colors.white,
    width: '100%',
    padding: '12px'
  },
  balanceContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  accountHeading: {
    paddingBottom: '6px'
  },
  icon: {
    cursor: 'pointer'
  },
  disclaimer: {
    position: 'relative',
    padding: '70px 30px',
    border: '1px solid #0F2A40',
    borderRadius: '0.75rem',
    marginBottom: '24px',
    color: '#FFFFFE',
    fontSize: '21px',
    width: '100%',
    textAlign: 'center',
    lineHeight: '30px',
    height: '200px',
    '& img': {
      marginBottom: '10px'
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: '110px',
      height: '150px',
      padding: '30px',
    }
  },
  connectImg: {
    position: 'absolute',
    top: '-50px',
    left: '50%',
    marginLeft: '-45px',
  },
  footLan: {
    position: 'fixed',
    bottom: '30px',
    display: 'none',
    '& em': {
      fontStyle: 'inherit',
    },
    '& langzhu': {
      top: '-230px',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  lanMg: {
    position: 'absolute',
    top: '25px',
    right: '10px',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  }
});

class Account extends Component {

  constructor(props) {
    super()

    const account = store.getStore('account')

    this.state = {
      loading: false,
      account: account,
      assets: store.getStore('assets'),
      modalOpen: false,
      isMobile: 1,
    }
  }
  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    window.removeEventListener('resize', this.handleResize.bind(this))
  };

  connectionConnected = () => {
    // this.setState({ account: store.getStore('account') })
  };

  configureReturned = () => {
    // this.props.history.push('/')
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account'), loading: false })
  }

  errorReturned = (error) => {
    //TODO: handle errors
  };

  componentDidMount = () => {
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
    const { classes } = this.props;
    const {
      account,
      modalOpen,
    } = this.state

    return (
      <div className={ classes.root }>
        { this.renderNotConnected() }
        { modalOpen && this.renderModal() }
      </div>
    )
  };

  renderNotConnected = () => {
    const { classes, t } = this.props
    const { loading,  isMobile} = this.state
    
    return (
      <div className={ classes.notConnectedRoot }>
        
        <div>
          <img
              src={ require('../../assets/bxh/logo.png') }
              width="76px"
            />
        </div>

        <div className={ classes.connectContainer }>
          <Button
            className={ classes.actionButton }
            variant="outlined"
            color="primary"
            onClick={ this.unlockClicked }
            disabled={ loading }
            >
            <Typography>{t('account.Connect')}</Typography>
          </Button>
        </div>
        
      </div>
    )
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  unlockClicked = () => {
    this.setState({ modalOpen: true, loading: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false, loading: false })
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Account)));
