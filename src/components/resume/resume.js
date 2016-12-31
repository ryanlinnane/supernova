import React, { Component } from 'react'

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
      <div style={{display:'flex', flexDirection:'column', height:'100vh'}} onLoad={() => this.props.removeLoading('resume')}>
        <iframe src="http://docs.google.com/gview?url=http://static.awhoof.com/Linnane_Ryan_Resume.pdf&embedded=true"
          style={{width:'100%', flex:'1'}} frameBorder="0" allowTransparency="true"></iframe>
      </div>
    )
  }
}
