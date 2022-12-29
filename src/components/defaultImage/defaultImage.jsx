import React, { Component } from "react";

class DefaultImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: this.props.src ? this.props.src : '',
        }
    
    }

    handleImageLoaded() {
        //加载完毕
    }

    handleImageErrored() {
        //加载失败
        this.setState({
            src: require('../../assets/bxh/BXHtong.png')
        });
    }

    render() {
        let props = this.props;
        let {src} = this.state;
        return (
            <img
                {...props}
                src={src}
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
            />
        );
    }
}

export default DefaultImage;