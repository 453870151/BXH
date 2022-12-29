import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import NewsDFKII from '../unlock/NewsDFKII.jsx'

const styles = theme => ({
    cookbg: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    cookcont: {
        position: 'fixed',
        bottom: '40%',
        left: '20px',
        right: '20px',
        background: '#2C2F38',
        padding: '20px',
        fontWeight: '500',
        borderRadius: '8px 8px 8px 8px',
        zIndex:'99999',
    },
    cooktit: {
        fontSize: '17px',
        '& img': {
            width:'24px',
            lineHeight:'24px',
            verticalAlign: 'middle',
            float: 'right',
        }
    },
    cookaddb: {
        margin: '10px 0 20px 0',
        fontSize: '17px',
        color:'#ffffff'
    },
    gongnengcontent:{
        width:'100%',
        textAlign:'center'
    },
    DKFIIipcont: {
        position: 'relative',
        marginBottom: '20px',
    },
    DKFIIInput: {
        background: '#1C1E22',
        borderRadius: '10px',
    },
    cookbtnsk: {
        width: '100%',
        lineHeight: '40px',
        borderRadius: '10px',
        // backgroundColor: '#DE2438',
        // backgroundImage: 'linear-gradient(to right, #DE2438 , #F97E47)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '19px',
        color: '#DE2438',
    },
    cookquxiao: {
        fontSize: '18px',
        textAlign: 'center',
        marginTop: '20px',
        marginRight:'100px',
        opacity: '.4',
    }
})


class BottomDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: false,
      aboutlink: false,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideAllMenu);
  }

  hideAllMenu = () => {
    this.setState({
      isShow: false,
      aboutlink: false,
    })
  }

  lagClick = (e) => {
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isShow: !this.state.isShow,
      aboutlink: false,
    })
  }

  buttonLinkShow = (e) => {
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    setTimeout(()=>{
      this.setState({ 
        aboutlink: !this.state.aboutlink ,
        isShow: false,
      })
    },0)
  }

  notClick = (value) => {
    const { i18n } = this.props;
    i18n.changeLanguage(value)
    this.setState({
      isShow: false,
    })
  }

  render() {
    const { classes, t, i18n ,closeListener,openListener} = this.props;

    return (
        <div>
        <div className={ classes.cookbg }></div>
        <div className={ classes.cookcont }>
          <div className={ classes.cookaddb }>取回流动性，尚未领取的收益可能会丢失，确定要取回流动性吗？</div>
          <div className={ classes.gongnengcontent}>
            <span className={ classes.cookquxiao } onClick={ closeListener }>暂不</span>
            <span className={ classes.cookbtnsk }>确定</span>
          </div>

        </div>
      </div>
    )
  };


  // onNews = () => {
  //   this.setState({ modalOpen: true })
  // }

  // closeModal = () => {
  //   this.setState({ modalOpen: false })
  // }

  // renderModal = () => {
  //   return (
  //     <NewsDFKII closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
  //   )
  // }

}

export default withNamespaces()(withRouter(withStyles(styles)(BottomDialog)));
