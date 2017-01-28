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

      <div style={{flex:'1', display:'flex', flexDirection:'column', overflow:'auto', alignItems:'center'}} onLoad={() => this.props.removeLoading('resume')}>

        <div className={styles.container}>
          <div className={styles.resumeToolbar}>
            <a href={'http://static.awhoof.com/Linnane_Ryan_Resume.pdf'} download={true} target="_blank">
            <img src={require('./download.png')} style={{position:'absolute', top:'5px', left:'5px', width:'45px'}}/>
            </a>
          </div>
          <img src="http://static.awhoof.com/Linnane_Ryan_Resume.jpg" style={{width:'100%', maxWidth:'800px'}}/>
        </div>
      {/*
          <div style={{width:'100%', maxWidth:'800px', height: '100px', position:'absolute', top:'0px', backgroundColor:'red'}}>
          asdf
            <img src={require('./download.png')} style={{position:'absolute', bottom:'0px', right:'30%'}}/>
          </div>
        */}

      </div>
    )
  }
}
