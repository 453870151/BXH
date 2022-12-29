import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  DialogContent,
  Dialog,
  Slide
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  langConter: {
    position: 'relative',
    margin: '0 40px',
    cursor: 'pointer',
    display: 'inline-block',
    width: '110px',
    textAlign: 'left',
    '& img':{
      height: '20px',
      marginRight: '5px',
      marginLeft: '5px',
      verticalAlign: 'sub',
    },
  },
  langzhu: {
    position: 'absolute',
    right: '-30px',
    top: '-215px',
    background: '#072747',
    padding: '0 20px',
    width: '150px',
    borderRadius: '5px',
    zIndex: '999',
    '& div':{
      textAlign: 'left',
      padding: '15px 0',
    }
  }
})


class Lang extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: false,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.hideAllMenu);
  }

  hideAllMenu = () => {
    this.setState({
      isShow: false,
    })
  }

  componentWillUnmount(){
        this.setState = (state,callback) =>{
            return;
          }
  }

  lagClick = (e) => {
    // 阻止事件冒泡
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      isShow: !this.state.isShow,
    })
  }

  notClick = (value) => {
    const { i18n } = this.props;
    i18n.changeLanguage(value)
    this.setState({
      isShow: false,
    })
  }

  render() {
    const { classes, t, i18n } = this.props;
    let language = i18n.language
    let langet, lanimg;
    if(language == "en"){ // 英文
      langet = "English"
      lanimg = require('../../assets/en.png')
    }else if(language == "zh"){ // 中文
      langet = "简体中文"
      lanimg = require('../../assets/zh.png')
    }else if(language == "ko"){ // 韩文
      langet = "한국어"
      lanimg = require('../../assets/ko.png')
    }else if(language == "ru"){ // 俄文
      langet = "Russian"
      lanimg = require('../../assets/ru.png')
    }else if(language == "zh-CN"){
      langet = "简体中文"
      lanimg = require('../../assets/zh.png')
    }else if(language == "en-CN"){
      langet = "English"
      lanimg = require('../../assets/en.png')
    }else{
      langet = "English"
      lanimg = require('../../assets/en.png')
    }

    return (
      <span className={ classes.langConter }>
        <em onClick={ (e) => { this.lagClick(e) } } >
          <img src={ lanimg }/>
          { langet }

          {
            this.state.isShow ? (
              <img
                src={ require('../../assets/down2.png') }
                style={{ position: 'absolute',top: '5px',width: '15px',height: '15px' }}
              />
            ) : (
              <img
                src={ require('../../assets/down1.png') }
                style={{ position: 'absolute',top: '5px',width: '15px',height: '15px' }}
              />
            ) 
          }
        </em>

        {
            this.state.isShow ? (
              
              <div className={ classes.langzhu }>
                <div onClick={ () => { this.notClick('en') } }>
                  <img
                    src={ require('../../assets/en.png') }
                  />English
                </div>
                <div onClick={ () => { this.notClick('zh') } }>
                  <img
                    src={ require('../../assets/zh.png') }
                  />简体中文
                </div>
                <div onClick={ () => { this.notClick('ko') } }>
                  <img
                    src={ require('../../assets/ko.png') }
                  />한국어
                </div>
                <div onClick={ () => { this.notClick('ru') } }>
                  <img
                    src={ require('../../assets/ru.png') }
                  />Russian
                </div>
              </div>

            ) : null
        }
      </span>
    )
  };
}

export default withNamespaces()(withRouter(withStyles(styles)(Lang)));
