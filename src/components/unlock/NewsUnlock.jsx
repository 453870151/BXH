import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withNamespaces } from 'react-i18next';

import {
  Web3ReactProvider,
  useWeb3React,
} from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "./hooks";

import {
  ERROR,
  CONNECTION_DISCONNECTED,
  CONNECTION_CONNECTED
} from '../../constants/constants'

import Store from "../../stores/store";
const emitter = Store.emitter
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    height: 'auto',
    display: 'flex',
    position: 'relative',
    color: '#999',
  },
  contentContainer: {
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    '& p': {
      margin: '0px',
      marginTop: '20px',
      wordBreak: 'break-all',
    }
  },
  cardContainer: {
    marginTop: '60px',
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  unlockCard: {
    padding: '24px'
  },
  buttonText: {
    marginLeft: '12px',
    fontWeight: '700',
  },
  instruction: {
    maxWidth: '400px',
    marginBottom: '32px',
    marginTop: '32px'
  },
  actionButton: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '3rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  connect: {
    width: '100%'
  },
  closeIcon: {
    position: 'fixed',
    right: '12px',
    top: '12px',
    cursor: 'pointer'
  }
});

class NewsUnlock extends Component {

  constructor(props) {
    super()

    this.state = {
      error: null,
      metamaskLoading: false,
      ledgerLoading: false
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(ERROR, this.error);
  };

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(ERROR, this.error);
  };

  error = (err) => {
    this.setState({ loading: false, error: err, metamaskLoading: false, ledgerLoading: false })
  };

  connectionConnected = () => {
    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  connectionDisconnected = () => {
    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  metamaskUnlocked = () => {
    this.setState({ metamaskLoading: false })
    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  ledgerUnlocked = () => {
    this.setState({ ledgerLoading: false })
    if(this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  cancelLedger = () => {
    this.setState({ ledgerLoading: false })
  }

  cancelMetamask = () => {
    this.setState({ metamaskLoading: false })
  }

  render() {
    const { classes, closeModal, t } = this.props;

    return (
      <div className={ classes.root }>
        <div className={ classes.closeIcon } onClick={ closeModal }><CloseIcon /></div>
        <div className={ classes.contentContainer }>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MyComponent closeModal={ closeModal} t={t} />
          </Web3ReactProvider>
        </div>
      </div>
    )
  };
}

function getLibrary(provider) {

  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function onConnectionClicked(currentConnector, name, setActivatingConnector, activate) {
  const connectorsByName = store.getStore('connectorsByName')
  setActivatingConnector(currentConnector);
  activate(connectorsByName[name]);
}

function onDeactivateClicked(deactivate, connector) {
  if(deactivate) {
    deactivate()
  }
  if(connector && connector.close) {
    connector.close()
  }
  store.setStore({ account: { }, web3context: null })
  emitter.emit(CONNECTION_DISCONNECTED)
}

function MyComponent(props) {

  const context = useWeb3React();
  const localContext = store.getStore('web3context');
  var localConnector = null;
  if (localContext) {
    localConnector = localContext.connector
  }
  const {
    connector,
    library,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;
  var connectorsByName = store.getStore('connectorsByName')

  const { closeModal, t } = props

  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    if (account && active && library) {
      store.setStore({ account: { address: account }, web3context: context })
      emitter.emit(CONNECTION_CONNECTED)
    }
  }, [account, active, closeModal, context, library]);

  // React.useEffect(() => {
  //   if (storeContext && storeContext.active && !active) {
  //     console.log("we are deactive: "+storeContext.account)
  //     store.setStore({ account: {}, web3context: null })
  //   }
  // }, [active, storeContext]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector);
  const width = window.innerWidth

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', color: '#333', justifyContent: 'space-between', alignItems: 'center' }}>
      【{t('News.conter1')}】
      <p>
        {t('News.conter2')}
      </p>
      <p>
        {t('News.conter3')}<br/> 
        {t('News.conter4')}<br/>
        {t('News.conter5')} <br/>
        {t('News.conter6')}<br/>
        {t('News.conter7')}<br/>
      </p>
      <p>
        {t('News.conter8')}
      </p>
      <p>
        {t('News.conter9')}
      </p>
      <p>
        {t('News.conter10')}
      </p>
      <p>
        {t('News.conter11')}
      </p>
      <p>
        {t('News.conter12')}
      </p>
      <p>
        {t('News.conter13')}
      </p>
      <p>
        {t('News.conter14')}
      </p>
      <p style={{ width: '100%' }}>
        {t('News.conter15')}<br/>
        {t('News.conter16')}
      </p>
      <br/>
      <p>
        {t('News.conter17')}<br/>
        {t('News.conter18')}
      </p>
    </div>
  )

}

export default withNamespaces()(withRouter(withStyles(styles)(NewsUnlock)));
