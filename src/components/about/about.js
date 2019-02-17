import React, { Component } from 'react'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = { fadeContent: 'I exist'}
    this.addDots = this.addDots.bind(this)
  }

  componentDidMount() {
    //delay appending CSS fade animator so that it's in sync once the JS interval starts running
    this.unmounted = false
    this.addDots()
  }

  addDots(startTime = Date.now()) {
    if(Date.now() - startTime > 800) {
      return true;
    }
    this.setState({
      fadeContent: this.state.fadeContent + '.'
    })
    setTimeout(() => this.addDots(startTime), 450)
  }

  componentWillUnmount() {
    this.unmounted = true
  }
  render() {
    return <div className={styles.container}>
      <div style={{maxWidth: '700px', margin: 'auto'}}>
          <div style={{position:'relative', overflow: 'visible'}} >
            <p className={`${styles.bigger} ${styles.exist} ${styles.fadeOut}`}>
              { this.state.fadeContent }
            </p>
          </div>
          <div className={`${styles.aboutContent} ${styles.fadeIn}`}>
            <p>With that existential crisis out of the way, I welcome you.</p>
            <p>
              To me, programming is the modern-day alchemy of turning "nothing" into something ✊🏻.
              I love creating abstractions and how at my fingertips, there's this potential to touch an insane number of people across worlds. That's the dream. Just not sure how this will manifest yet :).
            </p>
            <p>I've got a B.S. in Math and Computer Science from UGA and an M.S. in Machine Learning from the Georgia Institute of Technology.</p>
            <p>Beyond programming, I love experiencing new cultures, calisthenics, and trying new foods. Also I really dig scenic landscapes and cities.</p>
            <p>Shoot me an <a href="mailto:ry@awhoof.com">email</a> to connect.</p>
            <div style={{textAlign:'right'}}>
              -Legendary starfish tamer
            </div>
          </div>
      </div>
    </div>
  }
}