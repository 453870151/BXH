import React, { Component } from "react";
import {
  DialogContent,
  Dialog,
  Slide
} from '@material-ui/core';

import Unlock from './unlock.jsx';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class UnlockModal extends Component {
  _isMobile = () => {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  }

  render() {
    const { closeModal, modalOpen } = this.props;
    const fullScreen = window.innerWidth < 450;
    const isMobile = this._isMobile();

    return (
      <div>
        {
          isMobile ?
            // 移动
            <Dialog open={ modalOpen } onClose={ closeModal } >
              <Unlock closeModal={ closeModal } />
            </Dialog>
            :
            // PC
            <Dialog open={ modalOpen } onClose={ closeModal } fullWidth={ true } maxWidth={ 'sm' } TransitionComponent={ Transition } fullScreen={ fullScreen }>
              <DialogContent>
                <Unlock closeModal={ closeModal } />
              </DialogContent>
            </Dialog>
        }
      </div>
    )
  };
}

export default UnlockModal;
