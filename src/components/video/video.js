import React, { Component } from 'react'
import styles from './video.scss'
import Scroll from '../scroll'

export default class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      didLoad: false
    }
  }
  componentWillUnmount() {
    this.didUnmount = true
    this.props.removeLoading('video')
  }
  componentDidMount() {
    this.didUnmount = false
    this.props.pushLoading('video')
  }
  render() {
    return <div className={styles.videoContainer} ref={(r) => this.topFrame = r}>
      <iframe
        onLoad={() => {
          if(this.didUnmount == false) {
            this.setState({
              didLoad: true
            })
            this.props.removeLoading('video')
          }
        }}
        onError={() => {
          if(this.didUnmount == false) {
            this.props.removeLoading('video')
          }
        }}
        width="560" scrolling="no" height="360" src="https://www.youtube.com/embed/6rI4QEeajCA" frameBorder="0" allowfullscreen>
      </iframe>
      <iframe
        src="https://player.vimeo.com/video/196987303"
        width="640"
        height="360"
        scrolling="no"
        frameBorder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
      <iframe src="https://player.vimeo.com/video/135618601"
        width="640"
        height="360"
        frameBorder="0"
        scrolling="no"
        webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
        { this.state.didLoad ? <Scroll container={this.topFrame}/> : null }
    </div>
  }
}
