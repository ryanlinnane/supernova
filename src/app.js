/**
 * Created by MagicAntler on 10/14/15.
 */
import React from "react";
let { Component } = React;
import styles from './sass/main.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import reducer from './reducers/index.js';
import { render } from 'react-dom'
import * as homeActions from './actions/home.js';
import colorPulse from './lib/color'
import Modal from './components/modal/modal'
import 'whatwg-fetch'
const flickrRoute = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=24084cab33ca5e8de996a7c9d393d81b&user_id=133508911%40N08&format=json&nojsoncallback=1&api_sig=b554f59fb31caf59f377674d840cb9d1'
import Gallery from './components/gallery/gallery'
import Home from './components/home/home'
import About from './components/about/about'

class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      routeID: 'home',
      loadingIDs: []
    }
    this.setRouteID = this.setRouteID.bind(this)
    this.pushLoading = this.pushLoading.bind(this)
    this.removeLoading = this.removeLoading.bind(this)

  }

  pushLoading(id) {
    this.setState({
      loadingIDs: [...this.state.loadingIDs, id]
    })
  }
  removeLoading(id) {
    this.setState({
      loadingIDs: this.state.loadingIDs.filter(lID => lID != id)
    })
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentDidUpdate() { }

  setRouteID(id) {
    this.setState({
      routeID: id.toLowerCase()
    })
  }

  render(){

    return(
      <div className={styles.main}>
        <div className={`${styles.leftPanel}`} >
          <div className={styles.about}>
              <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <div style={{marginRight:'3px', fontSize:'20px', fontWeight:'500'}}>RYAN LINNANE</div>
                <img src={this.state.loadingIDs.length == 0 ? require('./public/images/source_code_filled.png'): require('./crazyLoading.gif')} style={{width:'30px'}}/>
              </div>
              {/*left*/}
              {
                () => {
                  const routes = ['HOME', 'GALLERY', 'ABOUT', 'BLOG']
                  return routes.map(route => {
                    let style = {}
                    if(route.toLowerCase() == this.state.routeID) {
                      style['backgroundColor'] = 'rgb(161, 161, 161)'
                    }
                    return <div key={route} className={styles.leftSelector} style={style} onClick={() => {
                      if(route.toLowerCase() == 'blog') {
                        //exit early if blog site
                        window.open('https://ryanlinnane.github.io', '__blank')
                        return
                      }
                      this.setRouteID(route)
                    }}>
                      {route}
                    </div>
                  })
                }()
              }
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', maxWidth:'100%', minWidth:'210px', margin:'0px auto', padding:'5px 0px'}}>
            <a href="https://google.com"><img src={require('./public/images/white-social/github.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/instagram.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/linkedin.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/medium.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/snapchat.png')} style={{width:'25px', opacity:'.8'}}/></a>
            <a><img src={require('./public/images/white-social/twitter.png')} style={{width:'25px', opacity:'.8'}}/></a>
          </div>
        </div>
        <div className={styles.rightPanel} style={{backgroundImage:`url(${require('./public/images/star2.png')})`}}>
          {
            () => {
              switch(this.state.routeID) {
                case 'gallery':
                  return <Gallery removeLoading={this.removeLoading} pushLoading={this.pushLoading}/>
                case 'home':
                  return <Home />
                return
                case 'about':
                  return <About />
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
    imageSrc: state.home.imageSrc
  }
}

const MainContainer =
  connect(mapStateToProps,
   mapDispatchToProps)(Main);

render(<Provider store={createStore(reducer)}>
  <MainContainer />
</Provider>, document.getElementById('root'));
