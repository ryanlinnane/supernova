import React, { Component } from 'react'
import styles from './video.scss'

export default class Video extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div style={{color:'black', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', flex:'1 0 auto'}} className={styles.videoContainer}>
      <iframe style={{width:'100%',maxWidth:'850px', marginBottom:'15px', maxHeight:'400px'}}
        src="https://player.vimeo.com/video/196987303"
        width="640"
        height="640"
        frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
      <iframe src="https://player.vimeo.com/video/135618601" width="640" height="360" style={{width:'100%',maxWidth:'850px', marginBottom:'15px'}} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
  }
}
