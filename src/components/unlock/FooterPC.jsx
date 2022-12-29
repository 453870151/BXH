import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  DialogContent,
  Dialog,
  Slide,
  Button,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import Snackbar from '../snackbar/snackbar';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from "../../stores";
import cookie from 'react-cookies';
import './rotateTranstion.css';
import getLangURLWithURL from '../../util/linkHelper';
import { getStyleClass } from '../../config/constantFunction';

import {
  
} from '../../constants';

const emitter = Store.emitter;
const store = Store.store;

const styles = theme => ({
  pcfoot_conter: {
    width: '100%',
    borderTop: '1px solid #374151',
    color: '#FFFFFF',
    display: 'flex',
    zIndex: '99',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '30px 0',
    background: '#191B2E',
  },
  pcfoot_wiold: {
    width: '1060px',
  },
  pcfoot_logo: {
    width: '136px',
    cursor: 'pointer',
  },
  pcfoot_lotsrmt: {
    float: 'left',
    width: '400px',
    marginRight: '50px',
  },
  pcfoot_lxiomw: {
    float: 'left',
    width: '100px',
    marginLeft: '20px',
    marginTop: '20px',
    marginLeft: '100px',
    '& h1': {
      color: '#fff',
      margin: '0px',
      fontSize: '16px',
      marginBottom: '20px',
    },
    '& span': {
      display: 'block',
      opacity: '.8',
      fontSize: '14px',
      marginBottom: '15px',
      cursor: 'pointer',
    },
  },
  titopls: {
    color: '#9D9EAB',
    fontSize: '14px',
    marginTop: '10px',
  },
  titfrirt: {
    margin: '10px 0',
    '& img': {
      width: '20px',
      marginRight: '8px',
      cursor: 'pointer',
    }
  },
  pcfoot_allright: {
    fontSize: '14px',
    opacity: '.5',
  }
})

class FooterPC extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  
  componentWillMount() {
    
  }
  componentDidMount() {
    
  }
  componentWillUnmount() {
    
  }

  linkClick = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.nav('liquidity')
  }

  market = () => {
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open('https://bscinfo.bxh.com')
    }else if(chainID === "66"){
      window.open('https://okinfo.bxh.com')
    }else if(chainID === "1"){
      window.open('https://ethinfo.bxh.com')
    }else if(chainID === "137"){
      
    }else if(chainID === "43114"){
      window.open('https://avaxinfo.bxh.com')
    }else{
      window.open('https://hecoinfo.bxh.com')
    }
  }

  linkSwap = () => {
    let chainID = localStorage.getItem('chainIDSwitch')
    if(chainID === "56"){
      window.open(getLangURLWithURL('https://bscswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "66"){
      window.open(getLangURLWithURL('https://okswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "137"){
      window.open(getLangURLWithURL('http://polygonswap.bxh.com/#/swap'),'_self')
    }else if(chainID === "43114"){
      window.open(getLangURLWithURL('http://avaxswap.bxh.com/#/swap'),'_self')
    }else{
      window.open(getLangURLWithURL('https://swap.bxh.com/#/swap'),'_self')
    }
  }

  nav = (screen) => {
    this.props.history.push('/' + screen)
  }

  contactAddress = (address) => {
    window.open(address);
  }


  render() {
    const { classes, t, i18n } = this.props
    let language = i18n.language
    let chainID = localStorage.getItem('chainIDSwitch')

    return (
      <div className={getStyleClass('PCbroot',classes.pcfoot_conter)}>
        <div className={classes.pcfoot_wiold}>

          <div className={classes.pcfoot_lotsrmt}>
            <div>
              <img className={classes.logo} src={require('../../assets/bxh/logo.png')} onClick={ () => { this.props.history.push('/'); document.documentElement.scrollTop = document.body.scrollTop = 0; }} className={classes.pcfoot_logo} />
            </div>
            <div className={classes.titopls}>{t('BXH.footercolt')}</div>
            <div className={classes.titfrirt}>
              <span onClick={()=>{this.contactAddress('https://twitter.com/BXH_Blockchain')}}>
                {
                  chainID === '56' ?
                  <img src={ require('../../assets/bxh/menu_2_2.png') } />
                  :
                  chainID === '66' ? 
                  <img src={ require('../../assets/bxh/menu_2_3.png') } />
                  :
                  chainID === '1' ? 
                  <img src={ require('../../assets/bxh/menu_2_4.png') } />
                  :
                  chainID === '137' ? 
                  <img src={ require('../../assets/bxh/menu_5_1.png') } />
                  :
                  chainID === '43114' ? 
                  <img src={ require('../../assets/bxh/menu_6_1.png') } />
                  :
                  <img src={ require('../../assets/bxh/menu_on2.png') } />
                }
              </span>
              <span onClick={()=>{this.contactAddress('https://t.me/BXH_global')}}>
                {
                  chainID === '56' ?
                  <img src={ require('../../assets/bxh/menu_3_3.png') } />
                  :
                  chainID === '66' ?
                  <img src={ require('../../assets/bxh/menu_3_4.png') } />
                  :
                  chainID === '1' ?
                  <img src={ require('../../assets/bxh/menu_3_5.png') } />
                  :
                  chainID === '137' ?
                  <img src={ require('../../assets/bxh/menu_5_2.png') } />
                  :
                  chainID === '43114' ?
                  <img src={ require('../../assets/bxh/menu_6_2.png') } />
                  :
                  <img src={ require('../../assets/bxh/menu_on3.png') } />
                }
              </span>
            </div>
            <div className={classes.pcfoot_allright}>© 2022 BXH. All righs reserved.</div>
          </div>
          
          {
            language === "zh" ?
            <div className={getStyleClass('PC_footer',classes.pcfoot_lxiomw)}>
              <h1>{t('BXH.About')}</h1>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/')}}>
                笨小孩(BXH)
              </span>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/whitepaper')}}>
                白皮書
              </span>
              <span onClick={()=>{this.contactAddress('https://weibo.com/u/7610664942')}}>
                博客
              </span>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/contact')}}>
                聯繫我們
              </span>
            </div>
            :
            <div className={getStyleClass('PC_footer',classes.pcfoot_lxiomw)}>
              <h1>{t('BXH.About')}</h1>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/')}}>
                BXH
              </span>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/whitepaper')}}>
                Whitepaper
              </span>
              <span onClick={()=>{this.contactAddress('https://weibo.com/u/7610664942')}}>
                Blog
              </span>
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/contact')}}>
                Contact us
              </span>
            </div>
          }
          
          <div className={getStyleClass('PC_footer',classes.pcfoot_lxiomw)}>
            <h1>{t('BXH.file')}</h1>
            {
              language === "zh" ?
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/help')}}>
                {t('BXH.help')}
              </span>
              :
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/help')}}>
                {t('BXH.help')}
              </span>
            }
            {
              language === "zh" ?
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/zhong-wen-ou/notice')}}>
                {t('BXH.announcement')}
              </span>
              :
              <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/v/english/notice')}}>
                {t('BXH.announcement')}
              </span>
            }
            <span onClick={()=>{this.contactAddress('https://github.com/BXHash/contracts')}}>
              GitHub
            </span>
            <span onClick={()=>{this.contactAddress('https://bxh.gitbook.io/bxh/audit')}}>
              {t('BXH.auditInstitutions')}
            </span>
          </div>

          <div className={getStyleClass('PC_footer',classes.pcfoot_lxiomw)}>
            <h1>{t('BXH.Navigation')}</h1>
            <span onClick={ this.linkSwap }>Swap</span>
            <span onClick={ this.linkClick }>{t('BXH.fluidMining')}</span>
            <span onClick={ this.market }>{t('BXH.hangqing')}</span>
          </div>

          <div style={{ clear: 'both' }}></div>

        </div>
      </div>
    )
  };


}

export default withNamespaces()(withRouter(withStyles(styles)(FooterPC)));
