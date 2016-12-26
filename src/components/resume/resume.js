import React, { Component } from 'react'

export default class Resume extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', height:'100vh'}}>
        <iframe src="http://docs.google.com/gview?url=http://static.awhoof.com/Linnane_Ryan_Resume.pdf&embedded=true"
          style={{width:'100%', flex:'1'}} frameborder="0"></iframe>
      </div>
    )
  }
}
