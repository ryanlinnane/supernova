import React, { Component } from 'react'
export default class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div style={{color:'black',  width:'640px', margin:'auto auto'}}>
      <iframe src="https://player.vimeo.com/video/196987303" width="640" height="640" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
      </iframe>
    </div>
  }
}
