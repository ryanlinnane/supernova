import React, { Component } from 'react'
import styles from './resume.scss'

export default class Resume extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.pushLoading('resume')
  }
  componentWillUnmount() {
    this.props.removeLoading('resume')
  }
  render() {
    return (
      <div style={{flex:'1', display:'flex', flexDirection:'column', overflow:'auto', alignItems:'center'}}>
        <div className={styles.container}>
          <div className={styles.resumeToolbar}>
            <a href={'http://static.awhoof.com/Linnane_Ryan_Resume.pdf'} download={true} target="_blank">
            <img src={require('./download.png')} style={{position:'absolute', top:'5px', left:'5px', width:'45px'}}  onLoad={() => { this.props.removeLoading('resume') }}/>
            </a>
          </div>
          <img src="http://static.awhoof.com/Linnane_Ryan_Resume.jpg" style={{width:'100%', maxWidth:'800px'}}/>
        </div>
      </div>
    )
  }
}
