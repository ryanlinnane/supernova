import React, { Component } from 'react'

export default class Resume extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <iframe src="http://docs.google.com/gview?url=http://static.awhoof.com/Linnane_Ryan_Resume.pdf&embedded=true"
          style={{width:'100%', height:'900px'}} frameborder="0"></iframe>
      </div>
    )
  }
}
