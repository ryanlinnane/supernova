/**
 * Created by MagicAntler on 10/14/15.
 */
import React, { Component } from "react";
import 'whatwg-fetch'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import reducer from './reducers/index.js';
import { render } from 'react-dom'

import colorPulse from './lib/color'
import Photo from './components/photo/photo'
import Video from './components/video/video'
import About from './components/about/about'
import Resume from './components/resume/resume'
import Nav from './components/nav/nav'
import './analytics'

import styles from './app.scss';

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      routeID: 'about',
      loadingIDs: []
    }
    this.setRouteID = this.setRouteID.bind(this)
    this.pushLoading = this.pushLoading.bind(this)
    this.removeLoading = this.removeLoading.bind(this)
    this.animateBG = this.animateBG.bind(this)
  }
  animateBG(backgroundPosition) {
    requestAnimationFrame(() => {
      let bgPos = backgroundPosition + 0.3
      this.setState({
        backgroundPosition: bgPos
      })
      this.animateBG(bgPos)
    })
  }
  pushLoading(id) {
    this.setState({
      loadingIDs: [...this.state.loadingIDs.slice(), id]
    })
  }
  removeLoading(id) {
    this.setState({
      loadingIDs: this.state.loadingIDs.filter(lID => lID != id)
    })
  }
  componentWillMount() { }
  componentWillUpdate(nextProps, nextState) {
  }
  componentDidMount() {
    this.animateBG(0)
  }
  setRouteID(id) {
    this.setState({
      routeID: id.toLowerCase(),
      loadingIDs: []
    })
  }
  render(){
    let rightContentStyles = {
      backgroundImage:`url(${require('./public/images/star2.png')})`,
      backgroundPosition:`center ${this.state.backgroundPosition}px`
    }
    return(
      <div className={styles.main}>
        <Nav onRouteClick={(routeID) => {
            this.setRouteID(routeID)
          }}
          routeID={this.state.routeID}
          isLoading={this.state.loadingIDs.length > 0}
        />
        <div className={styles.rightContent}
          style={rightContentStyles}
        >
          {
            () => {
              switch(this.state.routeID) {
                case 'photo':
                  return <Photo removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                case 'video':
                  return <Video removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                return
                case 'about':
                  return <About/>
                case 'resume':
                  return <Resume removeLoading={this.removeLoading} pushLoading={this.pushLoading} />
                default:
                  return null
              }
            }()
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
const mapStateToProps = (state) => {
  return {
  }
}
const MainContainer =
  connect(mapStateToProps,
   mapDispatchToProps)(Main);

render(<Provider store={createStore(reducer)}>
  <MainContainer />
</Provider>, document.getElementById('root'));
