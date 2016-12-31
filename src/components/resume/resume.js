import React, { Component } from 'react'

export default class Resume extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{overflowY:'auto'}}>

          <iframe src='http://static.awhoof.com/Linnane_Ryan_Resume/1.svg' frameBorder="0" style={{display:'flex', justifyContent:'center', width:'100%', maxWidth:'700px', margin:'0px auto'}}>
            Your browser does not support iframes
          </iframe>
      </div>
    )
  }
}
