import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        'Fullstack Engineer @ Austin Sigma',
        'Computer Science MS Canditate @ GATech',
        'Food, Drink, Hack'
      ],
      index: 0,
      intervalID: null,
      opacity: 0
    }
    this.fade = this.fade.bind(this)
  }

  fade(val, isIncreasing) {
    if(val <= 0 && isIncreasing == false) {
      //transition to next message
      let index = (this.state.index + 1) % this.state.messages.length
      this.setState({
          index
      })
      isIncreasing = true
    }
    else if(val >= 1  && isIncreasing == true) {
      isIncreasing = false
    }
    if(isIncreasing) {
      val += 0.01
    }
    else {
      val -= 0.01
    }
    requestAnimationFrame(() => {
      this.setState({
        opacity: val
      })
      this.fade(val, isIncreasing)
    })
  }


  componentDidMount() {

    //delay appending CSS fade animator so that it's in sync once the JS interval starts running
    this.fade(0, true)
  }
  clear() {
    if(this.state.intervalID != null) {
      clearInterval(this.state.intervalID)
    }
  }
  componentWillUnmount() {
    this.clear.call(this)
  }
  render() {

    let content = (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{opacity: this.state.opacity, fontSize:'29px', textAlign:'center'}}>
            {this.state.messages[this.state.index]}
          </div>
          <div style={{display:'flex', justifyContent:'center', fontSize:'15px', opacity:'0.5', position:'absolute', bottom:'10px', left:'0px', right:'0px'}}>
            <div> {this.state.index + 1} / {this.state.messages.length} </div>
          </div>
        </div>
      )

    return <div className={styles.container}>
    <ReactCSSTransitionGroup
      transitionName={ {
        enter: 'enter',
        enterActive: 'enterActive',
        leave: 'leave',
        leaveActive: 'leaveActive',
        appear: 'appear',
        appearActive: 'appearActive'
      } }>
      { content }
      </ReactCSSTransitionGroup>
    </div>
  }
}
