import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './about.scss'
export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    //delay appending CSS fade animator so that it's in sync once the JS interval starts running
    this.unmounted = false
  }

  componentWillUnmount() {
    this.unmounted = true
  }
  render() {
    return <div className={styles.container}>
      <div style={{maxWidth: '700px', backgroundColor:'red'}}>
        <div style={{overflow: 'visible'}}>
          <div style={{position:'relative', overflow: 'visible'}}>
            <p className={`${styles.bigger} ${styles.exist}`}>
              I exist.
            </p>
            <p className={`${styles.existTT}`}>HAHAHA</p>
          </div>
          <div> 
            <p>Thanks for dropping in.</p> 
          </div>
          <div>
            <p>
              Professionally, I'm a software engineer. I work <a href="https://fullstory.com">@FullStory</a> in Atlanta. 
              The side of the stack or language doesn't matter. 
              To me, it's all logic. 
            </p>
          </div>

          <p>
            Computer science fascinates me because of community.
            I view it as modern alchemy- turning "nothing" into something. The pontential to touch an insane number of people all around the world fascinates me.
          </p>
          <p>Unprofessionally, I'm a legendary starfish tamer.</p>
        </div>
      </div>
    </div>
  }
}
