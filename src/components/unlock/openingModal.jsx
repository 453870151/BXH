import React, { Component } from "react";
import {
  DialogContent,
  Dialog,
  Slide
} from '@material-ui/core';

import OpeningUnlock from './openingUnlock.jsx';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class OpeningModal extends Component {
  render() {
    const { closeModal, modalOpen } = this.props;

    const fullScreen = window.innerWidth < 450;

    return (
      <Dialog open={ modalOpen } onClose={ closeModal } fullWidth={ true } maxWidth={ 'sm' } TransitionComponent={ Transition } fullScreen={ fullScreen }>
        <DialogContent>
          <OpeningUnlock closeModal={ closeModal } />
        </DialogContent>
      </Dialog>
    )
  };
}

export default OpeningModal;
