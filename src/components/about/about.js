import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        'Fullstack Engineer',
        'Computer Science MS Candidate @ GATech',
        'Food, Drink, Hack',
      ],
      index: 0,
      intervalID: null,
      opacity: 0
    }
    this.fade = this.fade.bind(this)
  }

  fade(val, isIncreasing) {
    if(this.unmounted == true) {
      return
    }
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
      if(this.unmounted == false) {
        this.setState({
          opacity: val
        })
      }
      this.fade(val, isIncreasing)
    })
  }
  componentDidMount() {
    //delay appending CSS fade animator so that it's in sync once the JS interval starts running
    this.fade(0, true)
    this.unmounted = false
  }

  componentWillUnmount() {
    this.unmounted = true
  }
  render() {
    return <div className={styles.container}>
      <div style={{}}>
        <div
         style={{opacity: this.state.opacity}}
         className={styles.centerText}>
          {this.state.messages[this.state.index]}
        </div>
        <div className={styles.cardIndex}>
          <div> {this.state.index + 1} / {this.state.messages.length} </div>
        </div>
      </div>
    </div>
  }
}
