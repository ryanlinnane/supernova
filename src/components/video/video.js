import React, { Component } from 'react'
import styles from './video.scss'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className={styles.videoContainer}>
      <iframe style={{}}
        src="https://player.vimeo.com/video/196987303"
        width="640"
        height="360"
        frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
      <iframe src="https://player.vimeo.com/video/135618601"
        width="640"
        height="360"
        frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
    </div>
  }
}
