import React, { Component } from 'react'
import styles from './video.scss'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div style={{color:'black', display:'flex', justifyContent:'center', alignItems:'center', flex:'1'}} className={styles.videoContainer}>
      <iframe style={{maxWidth:'850px', maxHeight:'480px'}} src="https://player.vimeo.com/video/196987303" width="640" height="640" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
    </div>
  }
}
