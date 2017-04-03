import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

    this.addDots(Date.now())
  }


  addDots(startTime) {
    if(Date.now() - startTime > 4000) {
      return true;
    }
    this.setState({
      fadeContent: this.state.fadeContent + '.'
    })
    setTimeout(() => this.addDots(startTime), 1000)
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
            <div> 
              <p>Ah yes.. with that existential crisis introduction out of the way, I thank you for dropping by to my portal-thingy, <a href="https://github.com/ryanlinnane/supernova" target="_blank">supernova</a>.</p> 
            </div>
            <div>
              <p>
                Professionally, I'm a software engineer <a href="https://fullstory.com" target="_blank">@FullStory</a> in Atlanta. 
              </p>
              <p>
                I'm writing in typescript and golang these days, but I'm programming language agnostic. It's all logic.
                What really excites me about computer science is the community behind it. People coming together to collectively grow and push the boundaries of ways to communicate information.
              </p>
            </div>
            <div>
              <p>
                But it doesn't stop there. I view programming as modern alchemy- turning "nothing" into something. 
                Bringing things to life along with the potential to touch an insane number of people all over the world fascinates me.
              </p>
            </div>
            <div>
              <p>Unprofessionally, I like working out! Focusing my mind and energy in that exact moment of time- it's meditative. I also love coffee, trying new foods, lo-fi music, plain t-shirts, and traveling. 
                Other than that, I spend a good chunk of time working on a part-time master's through georgia tech to add more degrees to my degree belt and to expand my academic mind.</p>
            </div>
            <div>
              <p>Feel free to direct message me on twitter or shoot me an <a href="mailto:ry@awhoof.com">email</a>. I'm open to freelancing, friendships, whatever.</p>
            </div>
            <div>
              <p>So.. yeah.. everything is chill.
                Here, have a <a href="http://static.awhoof.com/shooter/" target="_blank">gamez</a>. Shake your phone really hard to activate mobile-gawd-mode ;). Peace.
              </p>
            </div>
            <div style={{textAlign:'right'}}>
              -Legendary starfish tamer
            </div>
          </div>
      </div>
    </div>
  }
}
