import React, { Component } from 'react'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        'Fullstack Engineer @ Austin Sigma',
        'CS MS Canditate @ GATech',
        'Food, drink, hacking'
      ],
      index: null,
      intervalID: null
    }
  }
  componentDidMount() {

    //delay appending CSS fade animator so that it's in sync once the JS interval starts running

    const initInterval = () => {
      const intervalID = setInterval(() => {


        let index = 0
        if(this.state.index != null) {
          index = (this.state.index + 1) % this.state.messages.length
        }
        this.setState({
            index
        })
      }, 3000)
      this.setState({
        intervalID
      })
    }

    requestAnimationFrame(initInterval, 0)
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
    return <div className={styles.container}>
      <div className={this.state.index != null ? styles.text : {}}>{this.state.messages[this.state.index]}</div>
    </div>
  }
}
