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
    if(Date.now() - startTime > 800) {
      return true;
    }
    this.setState({
      fadeContent: this.state.fadeContent + '.'
    })
    setTimeout(() => this.addDots(startTime), 400)
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
            <p>Ah yes.. with that existential crisis out of the way, I thank you for dropping by my portal-thingy, <a href="https://github.com/ryanlinnane/supernova" target="_blank">supernova</a>.</p> 
            <p>
              I'm a software engineer <a href="https://fullstory.com" target="_blank">@FullStory</a> in Atlanta. 
            </p>
            <p>
              I'm writing in TypeScript and Go these days (yeppers, one of the cool kids). To me, programming is the modern-day alchemy of turning "nothing" into something ✊🏻.
                I love creating abstractions and knowing that at my fingertips, there's this potential to touch an insane number of people across worlds.
            </p>
            <p>So yeah, at this point, you probably want to my dream? You want to know, don't you? It's okay, we're at that level now. My dream within my heart of hearts, is to sparkle!!!</p>
            <p>In my free time, I like working out, drinking caffee, trying new foods, lo-fi music, plain t-shirts, traveling, and peering into the soul of the universe.
              Other than that, I moonlight a part-time master's through Georgia Tech to add more degrees to my degree belt and to expand my academic mind.</p>
            <p>Feel free to direct message me on twitter or shoot me an <a href="mailto:ry@awhoof.com">email</a>. I'm open to freelancing, friendships, whatever.</p>
            <p>So.. yeah.. everything is chill.
              Here, have a <a href="http://static.awhoof.com/shooter/" target="_blank">gamez</a>. Shake your phone really hard to activate mobile-gawd-mode ;). Peace.
            </p>
            <div style={{textAlign:'right'}}>
              -Legendary starfish tamer
            </div>
          </div>
      </div>
    </div>
  }
}
