import React, { Component } from 'react'
import { mobileAndTabletcheck } from '../../lib/device'


const LARGE = 'LARGE'
const SMALL = 'SMALL'

export default class Orientation {
  constructor() {
    this.state = {
      pivot: 767, //>= 767 implies larger screen
      innerWidth: window.innerWidth,
      deviceType: window.innerWidth >= 767 ? LARGE : SMALL
    }
    this.handleResize = this.handleResize.bind(this)
  }
  componentWillMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUmount() {
    window.removeEventListener('resize', this.handleResize)
  }
  handleResize() {
    if(mobileAndTabletcheck(window)) {
      return
    }
    let state = {}
    if(window.innerWidth >= this.state.pivot && this.state.deviceType == SMALL) {
      state.deviceType = LARGE
    }
    else if(window.innerWidth < this.state.pivot && this.state.deviceType == LARGE){
      state.deviceType = SMALL
    }
    this.setState({
      innerWidth: window.innerWidth,
      ...state
    })
  }

  //TODO: pass innerWidth to children, and also pass
  //TODO: event emitter that emits orientation change.
  //TODO:
  //pass orientation change to children as a prop
  render() {
    return (
      { this.props.children }
    )
  }
}
