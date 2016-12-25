import React, { Component } from 'react'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        'Fullstack Engineer @ Austin Sigma',
        'CS MS Canditate @ GATech',
        'Loves food, drink, javascript'
      ],
      index: 0,
      intervalID: null
    }
  }
  componentDidMount() {
    const intervalID = setInterval(() => {
      this.setState({
          index: (this.state.index + 1) % this.state.messages.length
      })
    }, 3000)
    this.setState({
      intervalID
    })
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
      <div className={styles.text}>{this.state.messages[this.state.index]}</div>
    </div>
  }
}
